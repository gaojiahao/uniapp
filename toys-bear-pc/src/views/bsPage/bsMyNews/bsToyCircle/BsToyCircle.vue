<template>
  <div class="bsToyCircle">
    <div class="topLauot">
      <div class="topLeft">
        <div class="tagItem" @click="searchNotice(null)">
          <i class="icon home"></i>
          <span>玩具圈首页</span>
        </div>
        <div class="tagItem" @click="searchNotice('ordinary')">
          <i class="icon ordinary"></i>
          <span>普通公告</span>
        </div>
        <div class="tagItem" @click="searchNotice('purchase')">
          <i class="icon procurement"></i>
          <span>采购公告</span>
        </div>
        <div class="tagItem" @click="searchNotice('supply')">
          <i class="icon supply"></i>
          <span>供应公告</span>
        </div>
        <div class="tagItem" @click="searchMyNotice">
          <i class="icon myNotice"></i>
          <span>我的公告</span>
        </div>
      </div>
      <div class="topRight">
        <el-button type="primary" size="medium" @click="openSendNotice">
          <i class="iconfont icon-promotionrp"></i>
          我要发布
        </el-button>
      </div>
    </div>
    <div class="noticeContent">
      <waterfall :col="col" :data="findList" height="100%" @loadmore="loadmore">
        <template>
          <div
            class="cell-item-box"
            v-for="(item, index) in findList"
            :key="index"
          >
            <div class="cell-item">
              <div class="item-top">
                <div class="itemTopLeft">
                  <div class="left">
                    <el-avatar
                      style="background-color:#E4EFFF;"
                      :size="50"
                      :src="item.userInfo.image"
                    >
                      <p class="errText">
                        {{ item.userInfo.niceName }}
                      </p>
                    </el-avatar>
                  </div>
                  <div class="right">
                    <p class="name">
                      {{ item.userInfo.niceName }}
                    </p>
                    <p class="date">
                      {{ myDateDiff(item.bearNotice.publishDate) }}
                    </p>
                  </div>
                </div>
                <div class="itemTopRight">
                  <div class="box">
                    <i class="jubaoIcon">
                      <img :src="gongsiIcon[item.bearNotice.noticeType]" alt />
                    </i>
                    <span class="noticeTypeText">{{
                      switchNoticeType(item.bearNotice.noticeType)
                    }}</span>
                    <span
                      @click="show3Active(item.bearNotice.id)"
                      class="el-icon-more iconMore"
                    ></span>
                    <transition name="el-zoom-in-top">
                      <div
                        class="jubaoBox"
                        v-show="showActive === item.bearNotice.id"
                      >
                        <p @click="pingbiEvent(item)">
                          <i class="icon el-icon-remove"></i>
                          <span>屏蔽</span>
                        </p>
                        <p @click="openjubaoEvent(item)">
                          <i class="icon iconfont icon-jubao"></i>
                          举报
                        </p>
                        <p
                          @click="deleteMyNotice(item)"
                          v-if="
                            item.userInfo.companyId == currentComparnyId &&
                              item.userInfo.userId == userInfo.userInfo.id
                          "
                        >
                          <i class="el-icon-delete-solid"></i>
                          删除
                        </p>
                      </div>
                    </transition>
                  </div>
                </div>
              </div>
              <div class="item-body">
                <div class="item-desc">
                  <em>{{ item.bearNotice.notice }}</em>
                </div>
                <div class="item-content">
                  <div class="imgComtent" v-if="item.video">
                    <div class="demo1-video">
                      <video
                        width="100%"
                        height="100%"
                        class="video-js vjs-default-skin vjs-big-play-centered"
                        controls
                        style="object-fit:contain"
                      >
                        <source :src="item.video" type="video/mp4" />
                      </video>
                    </div>
                  </div>
                  <template v-else-if="item.imgList.length > 0">
                    <div class="imgComtent">
                      <el-image
                        fit="cover"
                        v-for="(val, i) in item.imgList.split(',')"
                        :class="{
                          img: item.imgList.split(',').length > 1,
                          multiT: item.imgList.split(',').length == 1
                        }"
                        :key="i"
                        :src="val"
                        alt
                        :preview-src-list="item.imgList.split(',')"
                      >
                        <div slot="placeholder" class="image-slot">
                          <img :src="require('@/assets/images/imgError.png')" />
                        </div>
                        <div slot="error" class="image-slot">
                          <img :src="require('@/assets/images/imgError.png')" />
                        </div>
                      </el-image>
                    </div>
                  </template>
                </div>
                <div class="item-footer">
                  <div class="editNoticeState">
                    <div class="item" @click="openShoucang(item)">
                      <i class="shoucangIcon" v-show="!item.isCollection"></i>
                      <i
                        class="shoucangActiveIcon"
                        v-show="item.isCollection"
                      ></i>
                      <span>收藏</span>
                    </div>
                    <div class="item" @click="openDianZan(item)">
                      <i class="dianzanIcon" v-show="!item.isLike"></i>
                      <i class="dianzanActiveIcon" v-show="item.isLike"></i>
                      <span>点赞</span>
                    </div>
                    <div class="item" @click="openPinglun(item)">
                      <i class="pinglunIcon"></i>
                      <span>评论</span>
                    </div>
                  </div>
                  <!-- 点赞人群 -->
                  <div
                    class="dianzanList"
                    v-if="item.upvoteUserList && item.upvoteUserList.length"
                  >
                    <i class="zans"></i>
                    <span
                      class="userItem"
                      v-for="(val, i) in item.upvoteUserList"
                      :key="i"
                    >
                      {{ val.niceName }}
                      <span v-if="item.upvoteUserList.length - 1 !== i"
                        >、</span
                      >
                      <span v-if="item.upvoteUserList.length - 1 === i"
                        >, 共{{ item.upvoteUserList.length }}人觉得很赞</span
                      >
                    </span>
                  </div>
                  <!-- 评论区 -->
                  <div
                    class="pinglunqu"
                    v-if="
                      item.noticeInteraction && item.noticeInteraction.length
                    "
                  >
                    <div
                      :class="{
                        userItem: val.interactionType == 'Comment'
                      }"
                      v-for="(val, i) in item.noticeInteraction"
                      :key="i"
                    >
                      <template v-if="val.interactionType == 'Comment'">
                        <div class="left">
                          <el-avatar
                            style="background-color:#E4EFFF;"
                            :size="40"
                            :src="val.userImage"
                          >
                            <p class="errText">{{ val.userName }}</p>
                          </el-avatar>
                        </div>
                        <div class="nameAndDate">
                          <div class="nameBox">
                            <span class="name">{{ val.userName }}</span>
                            <span class="comment">
                              {{ val.comment }}
                            </span>
                          </div>
                          <div class="date">
                            {{ myDateDiff(val.createdOn) }}
                          </div>
                        </div>
                      </template>
                      <template v-else>
                        <div class="huifuWrapBox">
                          <span class="myName">{{ val.userName }}:</span>
                          <span class="toName">
                            @{{ val.replyToUserName }}
                          </span>
                          <span class="content">{{ val.comment }}</span>
                        </div>
                      </template>
                      <div
                        class="right"
                        v-show="val.createdBy != userInfo.userInfo.id"
                        @click="openHuiPinglun(item, val)"
                      >
                        <div
                          class="huifu"
                          v-if="val.interactionType == 'Comment'"
                        >
                          回复
                        </div>
                      </div>
                    </div>
                    <div class="userItem"></div>
                  </div>
                  <div
                    class="pinglunInput"
                    v-if="item.isHuiPinglun || item.isPinglun"
                  >
                    <!-- 回复 -->
                    <el-input
                      type="text"
                      v-show="item.isHuiPinglun"
                      placeholder="请输入评论"
                      @keyup.native.enter="subHuiPinglun(item)"
                      v-model="pinglunValue"
                    >
                      <template slot="prepend">
                        <span style="color: #3368A9;">@</span>
                        <span style="color: #3368A9;">{{
                          huifuUser.userName
                        }}</span>
                      </template>
                      <el-button
                        slot="append"
                        type="primary"
                        @click="subHuiPinglun(item)"
                        style="backgroundColor: #3368a9;color: #fff;"
                      >
                        评论
                      </el-button>
                    </el-input>
                    <!-- 评论 -->
                    <el-input
                      type="text"
                      v-show="item.isPinglun"
                      placeholder="请输入评论"
                      @keyup.native.enter="subPinglun(item)"
                      v-model="pinglunValue"
                    >
                      <el-button
                        slot="append"
                        type="primary"
                        @click="subPinglun(item)"
                        style="backgroundColor: #3368a9;color: #fff;"
                      >
                        评论
                      </el-button>
                    </el-input>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </waterfall>
    </div>
    <!-- 举报 -->
    <el-dialog
      title="举报"
      :visible.sync="dialogjubao"
      destroy-on-close
      width="30%"
    >
      <ul class="selectJubaoInfo">
        <li
          v-for="(item, i) in ['政治敏感', '欺诈骗钱', '其他']"
          :key="i"
          @click="checkJubaoInfo($event, item)"
          :class="{ active: jubaoActive === item }"
        >
          {{ item }}
        </li>
        <el-button
          type="primary"
          round
          style="width:100%;height:50px;"
          @click="jubaoEvent"
          >确 定</el-button
        >
      </ul>
    </el-dialog>
    <!-- 发布公告 -->
    <el-dialog
      title="发布公告"
      :visible.sync="sendNoticeDialog"
      v-if="sendNoticeDialog"
      width="40%"
    >
      <bsSendNotice @close="closeSendNotice" />
    </el-dialog>
  </div>
</template>

<script>
import { dateDiff } from "@/assets/js/common/common";
import { mapState } from "vuex";
import bsSendNotice from "@/components/bsComponents/bsNewsComponent/bsSendNotice/bsSendNotice";
export default {
  name: "bsToyCircle",
  components: { bsSendNotice },
  data() {
    return {
      sendNoticeDialog: false,
      publisher: null,
      issuedCompanyID: null,
      noticeType: null,
      jubaoItem: null,
      jubaoActive: null,
      selectJubaoValue: null,
      dialogjubao: false,
      showActive: null,
      huifuUser: "",
      currentIten: "",
      pinglunValue: "",
      gongsiIcon: {
        Ordinary: require("@/assets/images/ordinaryNoticeIcon.png"),
        Purchase: require("@/assets/images/procurementNoticeIcon.png"),
        Supply: require("@/assets/images/supplyNoticeIcon.png")
      },
      myDateDiff: dateDiff,
      fullWidth: document.documentElement.clientWidth,
      findList: [],
      currentPage: 1,
      pageSize: 20,
      totalCount: 0,
      col: document.documentElement.clientWidth < 1920 ? 2 : 3
    };
  },
  methods: {
    // 查看我的公告
    searchMyNotice() {
      this.noticeType = null;
      this.publisher = this.userInfo.userInfo.id;
      this.issuedCompanyID = this.currentComparnyId;
      this.currentPage = 1;
      this.getDataList();
    },
    // 删除我的公告
    async deleteMyNotice(val) {
      const res = await this.$http.post("/api/DeleteBearBotice", {
        id: val.bearNotice.id
      });
      if (res.data.result.code === 200) {
        this.$message.success("删除成功");
        for (let i = 0; i < this.findList.length; i++) {
          if (val.bearNotice.id == this.findList[i].bearNotice.id) {
            this.findList.splice(i, 1);
            this.showActive = false;
            break;
          }
        }
      } else {
        this.$message.error(res.data.result.msg);
      }
    },
    // 关闭发布公告
    closeSendNotice(flag) {
      if (flag) {
        this.currentPage = 1;
        this.getDataList();
      }
      this.sendNoticeDialog = false;
    },
    // 打开发布公告
    openSendNotice() {
      this.sendNoticeDialog = true;
    },
    // 根据类型搜索公告
    searchNotice(type) {
      this.currentPage = 1;
      this.noticeType = type;
      this.publisher = null;
      this.issuedCompanyID = null;
      this.getDataList();
    },
    // 举报
    async jubaoEvent() {
      if (!this.selectJubaoValue) {
        this.$message.error("请选择举报原因");
        return;
      }
      const res = await this.$http.post("/api/CreateMessageReport", {
        messageID: this.jubaoItem.bearNotice.id,
        reportState: false,
        reportType: "Report",
        reportRemark: this.selectJubaoValue
      });
      if (res.data.result.code === 200) {
        this.$message.success("举报公告成功");
        this.getDataList();
        this.dialogjubao = false;
        this.showActive = null;
      } else {
        this.$message.error("举报公告失败，请检查网路");
      }
    },
    // 屏蔽公告
    async pingbiEvent(item) {
      const res = await this.$http.post("/api/CreateMessageReport", {
        messageID: item.bearNotice.id,
        reportState: true,
        reportType: "Shield"
      });
      if (res.data.result.code === 200) {
        this.$message.success("屏蔽公告成功");
        this.getDataList();
      } else {
        this.$message.error("屏蔽公告失败，请检查网路");
      }
      this.showActive = null;
    },
    // 点击选择举报信息
    checkJubaoInfo(e, item) {
      this.jubaoActive = item;
      this.selectJubaoValue = e.target.innerText;
    },
    // 打开举报公告
    openjubaoEvent(item) {
      this.dialogjubao = true;
      this.jubaoActive = null;
      this.selectJubaoValue = null;
      this.jubaoItem = item;
    },
    // 打开屏蔽
    show3Active(i) {
      this.showActive === i ? (this.showActive = null) : (this.showActive = i);
    },
    // 收藏
    async openShoucang(row) {
      const res = await this.$http.post("/api/CtreteCollection", {
        relatedID: row.bearNotice.id,
        collectionType: "Notice"
      });
      const { code, msg } = res.data.result;
      if (code === 200) {
        row.isCollection = !row.isCollection;
        if (row.isCollection) this.$message.success("收藏成功");
        else this.$message.warning("取消收藏成功");
      } else this.$message.error(msg);
      this.getDataList();
    },
    // 点赞
    async openDianZan(val) {
      console.log(val);
      const res = await this.$http.post("/api/UpdateBearNotice", {
        noticeNumber: val.bearNotice.noticeNumber,
        NoticeType: "Upvote",
        id: val.bearNotice.id
      });
      if (res.data.result.code === 200) {
        if (res.data.result.item.collectTotal)
          this.$message.success("点赞成功");
        else this.$message.warning("取消点赞成功");
        val.isLike = !val.isLike;
      }
    },
    // 打开回复评论
    openHuiPinglun(item, child) {
      if (!this.currentIten) {
        console.log("第一次");
        this.huifuUser = child;
        this.currentIten = item;
        this.$set(this, "currentIten", item);
        this.$set(item, "isHuiPinglun", true);
      } else {
        if (
          this.currentIten.bearNotice.noticeNumber ==
          item.bearNotice.noticeNumber
        ) {
          console.log("是一条公告");
          if (this.huifuUser.id == child.id) {
            item.isHuiPinglun = !item.isHuiPinglun;
          } else {
            item.isHuiPinglun = true;
          }
        } else {
          this.currentIten.isHuiPinglun = false;
          item.isHuiPinglun = true;
          this.currentIten = item;
          console.log("不是一条公告");
        }
      }

      this.currentIten = item;
      this.huifuUser = child;
    },
    // 打开评论
    openPinglun(item) {
      if (!item.isPinglun) this.$set(item, "isPinglun", true);
      else item.isPinglun = false;
    },
    // 提交评论
    async subPinglun(item) {
      let fd = {
        noticeNumber: item.bearNotice.noticeNumber,
        userName: this.userInfo.userInfo.linkman,
        interactionType: "Comment",
        comment: this.pinglunValue
      };
      const res = await this.$http.post("/api/CreateNoticeInteraction", fd);
      if (res.data.result.code === 200) {
        // this.currentPage = 1;
        // this.pageSize = this.findList.length >= 100 ? 10 : this.findList.length;
        // this.getDataList();
        this.$message.success("评论成功");
        item.noticeInteraction.push({
          userImage: this.userInfo.userInfo.userImage,
          userName: this.userInfo.userInfo.linkman,
          interactionType: "Comment",
          comment: this.pinglunValue,
          companyID: this.currentComparnyId,
          createdBy: this.userInfo.userInfo.id
        });
      }
      console.log(item);
      this.pinglunValue = "";
      item.isPinglun = false;
    },
    // 回复评论
    async subHuiPinglun(item) {
      let fd = {
        noticeNumber: item.bearNotice.noticeNumber,
        userName: this.userInfo.userInfo.linkman,
        interactionType: "Reply",
        replyCompanyID: this.huifuUser.companyID,
        replyToUser: this.huifuUser.createdBy,
        replyToUserName: this.huifuUser.userName,
        commentId: this.huifuUser.id,
        comment: this.pinglunValue
      };
      const res = await this.$http.post("/api/CreateNoticeInteraction", fd);
      if (res.data.result.code === 200) {
        item.noticeInteraction.push(fd);
        this.$message.success("回复成功");
      }
      this.pinglunValue = "";
      item.isHuiPinglun = false;
    },
    // 过滤公告类型
    switchNoticeType(type) {
      let msg;
      switch (type) {
        case "Purchase":
          msg = "采购公告";
          break;
        case "Supply":
          msg = "供应公告";
          break;
        default:
          msg = "普通公告";
          break;
      }
      return msg;
    },
    // 到底了
    loadmore() {
      if (this.currentPage >= this.totalCount / this.pageSize) {
        return false;
      }
      this.currentPage++;
      this.getDataList(true);
    },
    // 获取公告列表
    async getDataList(flag) {
      const fd = {
        skipCount: this.currentPage,
        maxResultCount: this.pageSize,
        publisher: this.publisher,
        issuedCompanyID: this.issuedCompanyID,
        noticeType: this.noticeType
      };
      for (const key in fd) {
        if (fd[key] === null || fd[key] === undefined || fd[key] === "") {
          delete fd[key];
        }
      }
      const res = await this.$http.post("/api/BearNoticePage", fd);
      if (res.data.result.code === 200) {
        this.$emit("getNoticeUnreadTotal");
        if (flag) {
          this.findList = this.findList.concat(
            res.data.result.item.result.items
          );
        } else {
          this.findList = res.data.result.item.result.items;
          console.log(this.findList);
          this.loading = false;
        }
        this.totalCount = res.data.result.item.result.totalCount;
      } else {
        this.$message.error(res.data.result.msg);
      }
      this.noticeType = null;
    }
  },
  created() {},
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.fullWidth = document.documentElement.clientWidth;
        that.fullWidth = window.fullWidth;
      })();
    };
    this.getDataList();
  },
  computed: {
    ...mapState(["userInfo"]),
    ...mapState(["currentComparnyId"])
  },
  watch: {
    fullWidth(val) {
      if (val < 1920) this.col = 2;
      this.fullWidth = val;
    }
  }
};
</script>
<style scoped lang="less">
@deep: ~">>>";
.bsToyCircle {
  width: 100%;
  min-height: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  .topLauot {
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    .topLeft {
      flex: 1;
      display: flex;
      align-items: center;
      .tagItem {
        width: 160px;
        height: 50px;
        opacity: 1;
        background: #ffffff;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 16px;
        transition: all 0.3s;
        cursor: pointer;
        &:hover {
          border-radius: 6px;
          margin-top: -5px;
          box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.16);
        }
        .icon {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          margin-right: 16px;
        }
        .home {
          background: url("~@/assets/images/noticeHomeIcon.png") no-repeat
            center;
        }
        .myNotice {
          background: url("~@/assets/images/yonghu.png") no-repeat center;
        }
        .ordinary {
          background: url("~@/assets/images/ordinaryNoticeIcon.png") no-repeat
            center;
        }
        .procurement {
          background: url("~@/assets/images/procurementNoticeIcon.png")
            no-repeat center;
        }
        .supply {
          background: url("~@/assets/images/supplyNoticeIcon.png") no-repeat
            center;
        }
        .icon {
          background-size: contain;
        }
      }
    }
  }
  .noticeContent {
    height: calc(100% - 85px);
    position: relative;
    overflow: hidden;
    padding-right: 20px;
    padding-bottom: 20px;
    border-radius: 4px;
    .vue-waterfall {
      &::-webkit-scrollbar {
        // 谷歌隐藏滚动条
        display: none;
      }
      -ms-overflow-style: none; // ie10隐藏滚动条
      overflow: -moz-scrollbars-none; // Firefox隐藏滚动条
    }
    .item-body {
      height: 100%;
      .item-desc {
        opacity: 1;
        font-size: 16px;
        font-weight: 400;
        color: #333333;
        word-wrap: break-word;
      }
      .item-content {
        padding: 16px 0;
        .imgComtent {
          // margin-left: 50px;
          margin-bottom: 5px;
          width: 480px;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          @{deep} .demo1-video {
            width: 100%;
            height: 277px;
            .video-js {
              width: 100%;
              height: 277px;
            }
          }
          &::after {
            content: "";
            width: 32%;
          }
          .img {
            width: 32%;
            height: 154px;
            margin-bottom: 10px;
            cursor: pointer;
            object-fit: none;
            box-shadow: 0px 0px 3px 0px rgba(42, 69, 116, 0.16);
            img {
              width: 152px;
              object-fit: contain;
            }
          }
          .multiT {
            width: 252px;
            margin-bottom: 10px;
            max-height: 322px;
            box-shadow: 0px 0px 3px 0px rgba(42, 69, 116, 0.16);
            cursor: pointer;
            img {
              width: 252px;
            }
          }
        }
      }
      .item-footer {
        .editNoticeState {
          height: 50px;
          display: flex;
          color: #666;
          align-items: center;
          .item {
            margin-right: 46px;
            display: flex;
            align-items: center;
            cursor: pointer;
            &:last-of-type {
              margin: 0;
            }
            .shoucangIcon,
            .shoucangActiveIcon,
            .dianzanActiveIcon,
            .dianzanIcon,
            .pinglunIcon {
              width: 14px;
              height: 14px;
              margin: 0 5px;
            }
            .shoucangIcon {
              background: url("~@/assets/images/shoucangIcon.png") no-repeat
                center;
            }
            .shoucangActiveIcon {
              background: url("~@/assets/images/shoucangActiveIcon.png")
                no-repeat center;
            }
            .shoucangActiveIcon {
              background: url("~@/assets/images/shoucangActiveIcon.png")
                no-repeat center;
            }
            .dianzanIcon {
              background: url("~@/assets/images/dianzanIcon.png") no-repeat
                center;
            }
            .dianzanActiveIcon {
              background: url("~@/assets/images/dianzanActiveIcon.png")
                no-repeat center;
            }
            .dianzanIcon {
              background: url("~@/assets/images/dianzanIcon.png") no-repeat
                center;
            }
            .dianzanActiveIcon {
              background: url("~@/assets/images/dianzanActiveIcon.png")
                no-repeat center;
            }
            .pinglunIcon {
              background: url("~@/assets/images/pinglunIcon.png") no-repeat
                center;
            }
            .shoucangActiveIcon,
            .dianzanActiveIcon,
            .shoucangIcon,
            .dianzanIcon,
            .pinglunIcon {
              background-size: contain;
            }
          }
        }
        .dianzanList {
          min-height: 40px;
          line-height: 19px;
          .zans {
            display: inline-block;
            vertical-align: top;
            position: relative;
            top: 2px;
            width: 16px;
            height: 16px;
            margin-right: 5px;
            background: url("~@/assets/images/yidianzanIcon.png") no-repeat
              center;
            background-size: contain;
          }
          .userItem {
            color: #3368a9;
          }
        }
        .pinglunqu {
          @{deep} .userItem {
            display: flex;
            // align-items: center;
            margin-bottom: 10px;
            .left,
            .nameAndDate,
            .right {
              .el-avatar {
                margin-right: 8px;
                color: #333;
                img {
                  width: 40px;
                  height: 40px;
                }
                p {
                  width: 40px;
                  height: 40px;
                }
              }
              .date {
                font-size: 12px;
                color: #999999;
                line-height: 20px;
              }
            }
            .left {
              min-width: 48px;
            }
            .nameAndDate {
              flex: 1;
              .nameBox {
                line-height: 22px;
                .name {
                  color: #3368a9;
                  margin-right: 10px;
                }
              }
            }
            .right {
              min-width: 50px;
              text-align: center;
              font-size: 12px;
              line-height: 22px;
              color: #3368a9;
              cursor: pointer;
            }
          }
          .huifuWrapBox {
            width: 441px;
            opacity: 1;
            box-sizing: border-box;
            padding-left: 20px;
            padding-right: 20px;
            padding-top: 20px;
            margin-left: 48px;
            background: #f1f3f6;
            padding-top: 10px;
            padding-bottom: 10px;
            line-height: 10px;
            .myName {
              color: #3368a9;
            }
            .toName {
              margin: 0 10px;
            }
          }
        }
        @{deep} .pinglunInput {
          border: 1px solid #e5e5e5;
          border-radius: 4px;
          .el-input-group__prepend {
            padding-left: 15px;
            padding-right: 0;
          }
          .el-input-group__append {
            border: none;
            .el-button {
              height: 40px;
            }
          }
          .el-input-group__prepend,
          .el-input__inner {
            border: none;
            background-color: #fff;
          }
        }
      }
    }
    .cell-item-box {
      // width: 100%;
      width: 540px;
      min-width: 540px;
      // padding-left: 20px;
      // padding-top: 20px;
      border-radius: 6px;
      overflow: hidden;
      box-sizing: border-box;
    }
    .cell-item {
      background: #ffffff;
      border-radius: 4px;
      box-sizing: border-box;
      padding: 20px;
      width: 520px;
      min-width: 520px;
      .item-top {
        height: 60px;
        display: flex;
        margin-bottom: 5px;
        .itemTopLeft,
        .itemTopRight {
          flex: 1;
          height: 100%;
        }
        .itemTopLeft {
          display: flex;
          .left {
            height: 100%;
            width: 65px;
            min-width: 65px;
            .errText {
              color: #333;
            }
            @{deep} .el-avatar {
              img {
                width: 50px;
                min-height: 50px;
              }
            }
          }
          .right {
            flex: 1;
            height: 100%;
            max-width: 175px;
            p {
              width: 100%;
              line-height: 25px;
              overflow: hidden; /*超出部分隐藏*/
              white-space: nowrap; /*不换行*/
              text-overflow: ellipsis; /*超出部分文字以...显示*/
              &.name {
                color: #3368a9;
                font-weight: 700;
                font-size: 16px;
              }
              &.date {
                color: #999999;
                font-size: 13px;
              }
            }
          }
        }
        .itemTopRight {
          .box {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            position: relative;
            .jubaoIcon {
              width: 16px;
              height: 16px;
              margin-right: 8px;
              img {
                width: 16px;
                height: 16px;
              }
            }
            .noticeTypeText {
              margin-right: 30px;
            }
            .iconMore {
              font-size: 16px;
              cursor: pointer;
              margin-right: 5px;
            }
            .jubaoBox {
              background-color: #656565;
              width: 100px;
              // height: 80px;
              position: absolute;
              top: 25px;
              left: 140px;
              border-radius: 5px;
              z-index: 1;
              color: white;
              p {
                padding: 5px 0;
                line-height: 28px;
                display: flex;
                align-items: center;
                border-radius: 5px;
                justify-content: center;
                // border-radius: 5px;
                border-bottom-left-radius: 5px;
                border-top: 2px solid rgba(255, 255, 255, 0.18);
                &:first-of-type {
                  border: none;
                }
                &:hover {
                  background-color: #767676;
                  cursor: pointer;
                }
                .icon {
                  margin-right: 13px;
                  font-size: 16px;
                  &.icon-jubao {
                    font-size: 18px;
                  }
                }
                .el-icon-delete-solid {
                  margin-right: 13px;
                  font-size: 16px;
                }
              }
              &::before {
                content: "";
                display: block;
                height: 0;
                width: 0;
                border-right: 10px solid transparent;
                border-left: 10px solid transparent;
                border-bottom: 10px #656565 solid;
                position: absolute;
                left: 76px;
                top: -10px;
              }
            }
          }
        }
      }
    }
  }
}
.selectJubaoInfo {
  li {
    height: 80px;
    border-bottom: 1px solid #ccc;
    font-size: 20px;
    display: flex;
    align-items: center;
    text-indent: 50px;
    cursor: pointer;
    &:last-of-type {
      border: none;
    }
    &:hover {
      background-color: #f5f7fa;
    }
    &.active {
      color: red;
    }
  }
}
</style>
