<template>
  <div class="bsNewsMessageList">
    <div class="chatMain">
      <div class="head">
        <img
          v-if="dataOption.type === 1"
          :src="dataOption.userInfo.avatar"
          alt=""
        />
        <img
          v-else-if="dataOption.type === 3"
          :src="dataOption.userInfo.userImage"
          alt=""
        />
        <p v-if="dataOption.type === 1">{{ dataOption.userInfo.nickname }}</p>
        <p v-else-if="dataOption.type === 3">
          {{ dataOption.userInfo.linkName }}
        </p>
        <i class="el-icon-more"></i>
      </div>
      <div class="center">
        <el-scrollbar style="height: 100%;" ref="myScrollbar">
          <div ref="scrollMain" class="scrollMain">
            <template v-for="item in chatInfoList">
              <div :key="item.sentTime">
                <!-- 别人 -->
                <div
                  class="others"
                  v-if="item.senderUserId != userInfo.chatUser.chatUserId"
                >
                  <!-- 时间 -->
                  <div class="chart-timer">
                    {{ dateDiff(item.sentTime) }}
                  </div>
                  <div class="item left">
                    <!-- 单聊头像 -->
                    <template v-if="dataOption.type === 1">
                      <img
                        class="header-img"
                        :src="dataOption.userInfo.avatar"
                      />
                    </template>
                    <!-- 群聊头像 -->
                    <template v-else-if="dataOption.type === 3">
                      <!-- {{
                      filterUserInfo(
                        dataOption.userInfo.groupMemberInfos.items,
                        item
                      )
                    }} -->
                      <img
                        class="header-img"
                        :src="
                          filterUserInfo(
                            dataOption.userInfo.groupMemberInfos.items,
                            item
                          ).userImage
                        "
                      />
                    </template>
                    <div class="youChat">
                      <!-- 单聊用户名 -->
                      <template v-if="dataOption.type === 1">
                        <span class="name">
                          {{ dataOption.userInfo.nickname }}
                        </span>
                      </template>
                      <!-- 群聊用户名 -->
                      <template v-else-if="dataOption.type === 3">
                        <span class="name">
                          {{
                            filterUserInfo(
                              dataOption.userInfo.groupMemberInfos.items,
                              item
                            ).linkman
                          }}
                        </span>
                      </template>
                      <!-- 别人的内容 -->
                      <div class="messageBox">
                        <!-- 文本 -->
                        <span
                          class="message"
                          v-if="item.messageType === 'RC:TxtMsg'"
                        >
                          {{ item.content.content }}
                        </span>
                        <!-- 语音 -->
                        <span
                          class="message"
                          v-if="item.messageType === 'RC:VcMsg'"
                        >
                          {{ item.content.content }}
                        </span>
                        <!-- 图片 -->
                        <div
                          class="imgBox"
                          v-else-if="item.messageType === 'RC:ImgMsg'"
                        >
                          <el-image
                            style="width: 300px; height: auto; min-width: 100px;"
                            :src="item.content.imageUri"
                            :preview-src-list="[item.content.imageUri]"
                            fit="contain"
                          >
                            <div
                              slot="placeholder"
                              class="image-slot"
                              style="width: 300px; height: auto; min-width: 100px"
                            >
                              <img
                                style="width: 300px; height: auto; min-width: 100px"
                                :src="require('@/assets/images/imgError.png')"
                              />
                            </div>
                            <div
                              slot="error"
                              class="image-slot"
                              style="width: 300px; height: auto; min-width: 100px"
                            >
                              <img
                                style="width: 300px; height: auto; min-width: 100px"
                                :src="require('@/assets/images/imgError.png')"
                              />
                            </div>
                          </el-image>
                        </div>
                        <!-- 视频 -->
                        <div
                          class="videoBox"
                          v-else-if="item.messageType === 'XZX:VideoMessage'"
                        >
                          <video
                            class="video-js vjs-default-skin vjs-big-play-centered"
                            controls
                            :lazy-src="item.content.videoUrl"
                            style="object-fit: contain; width: 100%;height: 100%;"
                          >
                            <source
                              :src="item.content.videoUrl"
                              type="video/mp4"
                            />
                          </video>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 我 -->
                <div class="my" v-else>
                  <!-- 时间 -->
                  <div class="chart-timer">
                    {{ dateDiff(item.sentTime) }}
                  </div>
                  <div class="item right">
                    <img
                      class="header-img"
                      :src="userInfo.userInfo.userImage"
                    />
                    <div class="meChat">
                      <!-- 我的名字 -->
                      <span class="name">{{ userInfo.userInfo.linkman }}</span>
                      <!-- 我的聊天内容 -->
                      <div class="messageBox">
                        <!-- 文本 -->
                        <span
                          class="message"
                          v-if="item.messageType === 'RC:TxtMsg'"
                        >
                          {{ item.content.content }}
                        </span>
                        <!-- 语音 -->
                        <span
                          class="message"
                          v-if="item.messageType === 'RC:VcMsg'"
                        >
                          {{ item.content.content }}
                        </span>
                        <!-- 图片 -->
                        <div
                          class="imgBox"
                          v-else-if="item.messageType === 'RC:ImgMsg'"
                        >
                          <el-image
                            style="width: 300px; height: auto; min-width: 100px;"
                            :src="item.content.imageUri"
                            :preview-src-list="[item.content.imageUri]"
                            fit="contain"
                          >
                            <div
                              slot="placeholder"
                              class="image-slot"
                              style="width: 300px; height: auto; min-width: 100px"
                            >
                              <img
                                style="width: 300px; height: auto; min-width: 100px"
                                :src="require('@/assets/images/imgError.png')"
                              />
                            </div>
                            <div
                              slot="error"
                              class="image-slot"
                              style="width: 300px; height: auto; min-width: 100px"
                            >
                              <img
                                style="width: 300px; height: auto; min-width: 100px"
                                :src="require('@/assets/images/imgError.png')"
                              />
                            </div>
                          </el-image>
                        </div>

                        <!-- 视频 -->
                        <div
                          class="videoBox"
                          v-else-if="item.messageType === 'XZX:VideoMessage'"
                        >
                          <video
                            class="video-js vjs-default-skin vjs-big-play-centered"
                            controls
                            :lazy-src="item.content.videoUrl"
                            style="object-fit: contain; width: 100%;height: 100%;"
                          >
                            <source
                              :src="item.content.videoUrl"
                              type="video/mp4"
                            />
                          </video>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </el-scrollbar>
      </div>
      <div class="footer">
        <div class="footerHead">
          <!-- <div><img src="@/assets/images/tupian.png" alt="" /></div> -->
          <div><img src="@/assets/images/biaoq.png" alt="" /></div>
          <div><img src="@/assets/images/tupian.png" alt="" /></div>
        </div>
        <div class="input-box">
          <div class="left">
            <el-scrollbar style="height: 100%;">
              <el-input
                class="myInput"
                autosize
                autofocus
                type="textarea"
                @keydown.enter.native="myInputEvent"
                ref="userInfo"
                resize="none"
                placeholder="请输入内容"
                v-model.trim="textInfo"
              >
              </el-input>
            </el-scrollbar>
          </div>
          <div class="right">
            <el-button type="primary">发送</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="chattingRecords">
      <div class="chattingTop">
        <p>聊天记录</p>
      </div>
      <div class="title">
        <div
          :class="{ tabs: true, active: isDiyu === 0 }"
          @click="checkTabs(0)"
        >
          全部
        </div>
        <div
          :class="{ tabs: true, active: isDiyu === 1 }"
          @click="checkTabs(1)"
        >
          全部
        </div>
        <div
          :class="{ tabs: true, active: isDiyu === 2 }"
          @click="checkTabs(2)"
        >
          视频
        </div>
        <div
          :class="{ tabs: true, active: isDiyu === 3 }"
          @click="checkTabs(3)"
        >
          链接
        </div>
      </div>
      <div class="chattingList">
        <div class="recordData">
          <div class="cecorLeft">
            <img src="@/assets/images/imgError.png" alt="" />
          </div>
          <div class="cecorRight">
            <div class="cecorHead">
              <p>名字</p>
              <p>28分钟前</p>
            </div>
            <div class="cecorMain">
              <p>聊天消息</p>
              <!-- <img src="" alt="" /> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import eventBus from "@/assets/js/common/eventBus.js";
import { dateDiff } from "@/assets/js/common/common.js";
import { mapState } from "vuex";
export default {
  name: "bsNewsMessageList",
  props: ["dataOption", "im"],
  data() {
    return {
      textInfo: "",
      isDiyu: 0,
      chatInfoList: []
    };
  },
  methods: {
    // 解读base64
    unscrambleBase64(code) {
      console.log(window.Base64.decode(code));
    },
    // 筛选群聊聊天用户信息
    filterUserInfo(list, item) {
      const user = list.find(v => v.chatUserId === item.senderUserId);
      if (user) return user;
    },
    // im获取历史消息,聊天窗口消息
    getHistoryChat() {
      var conversation = this.im.Conversation.get({
        targetId: this.dataOption.targetId,
        type: this.dataOption.type
      });
      var option = {
        timestamp: +new Date(),
        count: 20
      };
      conversation.getMessages(option).then(result => {
        var list = result.list; // 历史消息列表
        var hasMore = result.hasMore; // 是否还有历史消息可以获取
        console.log("获取历史消息成功", list, hasMore, this.dataOption);
        this.chatInfoList = list;
      });
      // 清除未读
      const qingchu = this.im.Conversation.get({
        targetId: this.dataOption.targetId,
        type: this.dataOption.type
      });
      qingchu.read().then(function() {
        console.log("清除未读数成功"); // im.watch conversation 将被触发
      });
    },
    // 格式化时间
    dateDiff(time) {
      return dateDiff(time);
    },
    // 切换专区
    checkTabs(num) {
      this.isDiyu = num;
    },
    myInputEvent(e) {
      //阻止默认浏览器动作(W3C)
      if (e && e.preventDefault) e.preventDefault();
      //IE中阻止函数器默认动作的方式
      else window.event.returnValue = false;
      if (e.ctrlKey && e.keyCode == 13) {
        // 用户点击了ctrl+enter触发
        this.textInfo += "\n";
        console.log(this.textInfo);
      } else {
        //用户点击了enter触发
        console.log("用户点击了回车");
      }
    }
  },
  created() {},
  mounted() {
    this.getHistoryChat();
  },
  watch: {
    chatInfoList: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          this.$refs["myScrollbar"].wrap.scrollTop = this.$refs[
            "scrollMain"
          ].scrollHeight;
        });
      }
    }
  },
  computed: {
    ...mapState(["userInfo"])
  }
};
</script>
<style scoped lang="less">
@deep: ~">>>";
.bsNewsMessageList {
  width: 80%;
  display: flex;
  .chatMain {
    border-radius: 4px;
    flex-grow: 1;
    background: #ffffff;
    height: 770px;
    .head {
      height: 54px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #dcdfe6;
      img {
        width: 30px;
        height: 30px;
        margin: 0 13px 0 20px;
        border-radius: 50%;
      }
      p {
        flex: 1;
        font-size: 15px;
        font-weight: 700;
        color: #333333;
        line-height: 34px;
      }
      i {
        width: 50px;
        height: 100%;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .center {
      height: 540px;
      padding: 10px 0;
      box-sizing: border-box;
      overflow-x: hidden;
      overflow-y: auto;
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none; /* IE 10+ */
      &::-webkit-scrollbar {
        display: none; /* Chrome Safari */
      }
      .item {
        display: flex;
        margin-bottom: 10px;
      }
      .left {
        flex-direction: row;
        padding-left: 25px;
        .youChat {
          margin-left: 15px;
          margin-right: 50px;
          .name {
            color: #333;
          }
          .messageBox {
            margin-top: 10px;
            .message {
              color: #666;
              background: #f5f7fa;
              border: 1px solid #e6e9ee;
              word-break: break-word;
            }
            .imgBox {
              box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
            }
            .videoBox {
              width: 400px;
              height: 250px;
            }
          }
        }
      }

      .right {
        flex-direction: row-reverse;
        padding-right: 35px;
        display: flex;
        .meChat {
          flex-direction: row-reverse;
          text-align: right;
          margin-right: 15px;
          margin-left: 50px;
          .name {
            color: #333;
          }
          .messageBox {
            margin-top: 10px;
            .message {
              color: #fff;
              background-color: #3368a9;
              word-break: break-word;
            }
            .imgBox {
              box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
            }
            .videoBox {
              width: 400px;
              height: 250px;
            }
          }
        }
      }

      .header-img {
        width: 50px;
        height: 50px;
        border-radius: 100px;
      }
      .chart-timer {
        text-align: center;
        color: #999;
        font-size: 13px;
        padding: 20px 0;
      }
      .message {
        border-radius: 10px;
        display: flex;
        min-height: 25px;
        padding: 9px 10px;
        align-items: center;
      }
    }
    .footer {
      height: 170px;
      box-sizing: border-box;
      border-top: 1px solid #dcdfe6;
      padding: 0 20px 20px;
      .footerHead {
        display: flex;
        align-items: center;
        height: 46px;
        img {
          width: 18px;
          height: 18px;
          margin-right: 20px;
          cursor: pointer;
        }
      }
      .input-box {
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        height: 115px;
        box-sizing: border-box;
        display: flex;
        .left {
          flex: 1;
          @{deep} .myInput {
            .el-textarea__inner {
              // resize: none; // 去掉右角下的斜线
              min-height: 110px !important;
              border: none;
            }
          }
        }
        .right {
          width: 100px;
          min-width: 100px;
          position: relative;
          .el-button {
            position: absolute;
            right: 0;
            right: 12px;
            bottom: 12px;
            width: 80px;
            height: 36px;
            background: #3368a9;
            border-radius: 6px;
            font-size: 15px;
            font-weight: 400;
            color: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
  }
  .chattingRecords {
    width: 458px;
    height: 770px;
    background: #ffffff;
    border-radius: 4px;
    margin-left: 20px;
    .chattingTop {
      padding-left: 20px;
      height: 54px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #dcdfe6;
      p {
        font-size: 15px;
        font-weight: 700;
        color: #333333;
        line-height: 34px;
      }
    }
    .title {
      height: 50px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #dcdfe6;
      .tabs {
        width: 80px;
        height: 50px;
        box-sizing: border-box;
        border-bottom: 2px solid transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        margin: 0 10px;
        cursor: pointer;
        &.active {
          font-weight: 600;
          border-color: #3368a9;
          color: #3368a9;
        }
      }
    }
    .chattingList {
      padding: 20px;
      box-sizing: border-box;

      .recordData {
        background: #f6f8f9;
        border-radius: 4px;
        padding: 15px 18px;
        display: flex;
        .cecorLeft {
          width: 40px;
          height: 40px;
          margin-right: 8px;
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 1px solid #dcdfe6;
            background: rgba(0, 0, 0, 0);
          }
        }
        .cecorRight {
          width: 100%;
          .cecorHead {
            display: flex;
            justify-content: space-between;
            p {
              height: 17px;
              font-size: 13px;
              font-weight: 400;
              text-align: left;
              color: #999999;
              line-height: 19px;
            }
          }
          .cecorMain {
            padding-top: 10px;
            box-sizing: border-box;
            p {
              color: #666666;
              font-size: 14px;
              line-height: 22px;
            }
          }
        }
      }
    }
  }
}
@{deep} .el-scrollbar__wrap {
  overflow-x: hidden;
  .el-scrollbar__view {
    height: 100%;
  }
}
</style>
