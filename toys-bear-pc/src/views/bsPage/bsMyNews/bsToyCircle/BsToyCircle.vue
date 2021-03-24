<template>
  <div class="bsToyCircle">
    <div class="topLauot">
      <div class="topLeft">
        <div class="tagItem">
          <i class="icon home"></i>
          <span>玩具圈首页</span>
        </div>
        <div class="tagItem">
          <i class="icon ordinary"></i>
          <span>普通公告</span>
        </div>
        <div class="tagItem">
          <i class="icon procurement"></i>
          <span>采购公告</span>
        </div>
        <div class="tagItem">
          <i class="icon supply"></i>
          <span>供应公告</span>
        </div>
      </div>
      <div class="topRight">
        <el-button type="primary" size="medium">
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
                    <span class="el-icon-more iconMore"></span>
                  </div>
                </div>
              </div>
              <div class="item-body">
                <div class="item-desc">
                  <em>{{ item.bearNotice.notice }}</em>
                </div>
                <div class="item content">
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
                        v-for="(val, i) in item.imgList.split(',')"
                        class="img"
                        :key="i"
                        :src="val"
                        alt
                        :preview-src-list="item.imgList.split(',')"
                      ></el-image>
                    </div>
                  </template>
                </div>
                <div class="item-footer">
                  <!-- <div class="footer-left">
                    <img :src="item.videoImg" alt="" srcset="" />
                    <div class="name">{{ item.bearNotice.notice }}</div>
                  </div>
                  <div class="like">
                    <img :src="item.videoImg" alt="" />
                    <div class="like-total">{{ item.bearNotice.notice }}</div>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </template>
      </waterfall>
    </div>
  </div>
</template>

<script>
import { dateDiff } from "@/assets/js/common/common";
export default {
  name: "bsToyCircle",
  data() {
    return {
      gongsiIcon: {
        Ordinary: require("@/assets/images/ordinaryNoticeIcon.png"),
        Purchase: require("@/assets/images/procurementNoticeIcon.png"),
        Supply: require("@/assets/images/supplyNoticeIcon.png")
      },
      myDateDiff: dateDiff,
      fullWidth: document.documentElement.clientWidth,
      findList: [],
      col: document.documentElement.clientWidth < 1920 ? 2 : 3
    };
  },
  methods: {
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
      console.log("到底了");
    },
    // 获取公告列表
    async getDataList(flag) {
      const res = await this.$http.post("/api/BearNoticePage", {
        skipCount: this.currentPage,
        maxResultCount: this.pageSize
      });
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
        this.total = res.data.result.item.result.totalCount;
      } else {
        this.$message.error(res.data.result.msg);
      }
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
      .item-desc {
        opacity: 1;
        font-size: 16px;
        font-weight: 400;
        color: #333333;
      }
      .item-content {
        .imgComtent {
          margin-left: 50px;
          margin-bottom: 5px;
          width: 300px;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          &::after {
            content: "";
            width: 30%;
          }
          .img {
            width: 30%;
            height: 90px;
            margin-bottom: 10px;
            cursor: pointer;
          }
        }
      }
      .item-footer {
        display: flex;
        justify-content: space-between;
        .footer-left {
          display: flex;
          align-items: center;
          font-family: SF Pro Display;
          font-style: normal;
          font-weight: normal;
          font-size: 12px;
          line-height: 14px;
          color: rgba(0, 0, 0, 0.6);
          img {
            border-radius: 50%;
            width: 22px;
            height: 22px;
            margin-right: 4px;
          }
        }
        .like {
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: SF Pro Display;
          font-style: normal;
          font-weight: normal;
          font-size: 12px;
          line-height: 14px;
          color: rgba(0, 0, 0, 0.4);
          img {
            margin-right: 4px;
          }
        }
      }
    }
    .cell-item-box {
      // width: 100%;
      width: 540px;
      min-width: 540px;
      padding-left: 20px;
      padding-top: 20px;
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
            }
          }
        }
      }
    }
  }
}
</style>
