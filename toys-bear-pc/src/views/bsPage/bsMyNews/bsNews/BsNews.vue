<template>
  <!-- <div>敬请期待</div> -->
  <div class="bsNews">
    <div class="bsNewsLeft">
      <el-scrollbar style="height: 100%;">
        <div
          class="infinite-list"
          :infinite-scroll-immediate="false"
          v-infinite-scroll="scrollSessionList"
          infinite-scroll-delay="50"
        >
          <div>
            <h3>业务消息</h3>
            <ul class="exhibition">
              <li
                @click="handerIsGrid(item, item.businessType)"
                v-for="(item, i) in businessConversations"
                :key="i"
              >
                <div class="exhibition_left">
                  <div class="_leftImg">
                    <!-- <img :src="item.icon" alt="" /> -->
                    <el-image :src="item.icon">
                      <div slot="error">
                        <img src="~@/assets/images/imgError.png" alt="" />
                      </div>
                      <div slot="placeholder">
                        <img src="~@/assets/images/logo.png" alt="" />
                      </div>
                    </el-image>
                  </div>
                </div>
                <div class="exhibition_right">
                  <el-badge :is-dot="item.unreadCount > 0 ? true : false">
                    <h4>{{ item.title }}</h4>
                  </el-badge>
                  <p>{{ item.subtitle }}</p>
                </div>
              </li>
              <li
                @click="handerIsGrid(item, 2)"
                v-for="item in companyConversations"
                :key="item.client_nu"
              >
                <div class="exhibition_left">
                  <div class="_leftImg">
                    <!-- <img :src="item.companyLogo" alt="" /> -->
                    <el-image :src="item.companyLogo">
                      <div slot="error">
                        <img src="~@/assets/images/imgError.png" alt="" />
                      </div>
                      <div slot="placeholder">
                        <img src="~@/assets/images/logo.png" alt="" />
                      </div>
                    </el-image>
                  </div>
                </div>
                <div class="exhibition_right">
                  <h4>{{ item.client_na }}</h4>
                  <p>{{ item.client_nu }}</p>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h3 style="border-bottom: 1px solid #e5e5e5;margin-bottom: 10px;">
              其他消息
            </h3>
            <ul
              class="exhibition"
              v-if="chatList.length"
              style="border-top: none;"
            >
              <li
                v-for="(item, i) in chatList"
                :key="i"
                @click="handerIsGrid(item, 0)"
              >
                <div class="exhibition_left">
                  <div class="_leftImg">
                    <el-badge
                      :value="item.unreadMessageCount"
                      :hidden="item.unreadMessageCount < 1"
                    >
                      <img :src="item.userInfo.avatar" alt="" />
                    </el-badge>
                  </div>
                </div>
                <div class="exhibition_right">
                  <h4>{{ item.userInfo.nickname }}</h4>
                  <p>{{ myFilterMsgTypes(item.latestMessage) }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <component v-if="isGrid" :is="isGrid" :dataOption="dataOption"></component>
  </div>
</template>

<script>
//系统消息
import System from "@/components/bsComponents/bsNewsComponent/bsNewsSystemMsg";
//展厅业务
import Exhibition from "@/components/bsComponents/bsNewsComponent/bsNewsExhibition";
//公司业务
import Sales from "@/components/bsComponents/bsNewsComponent/bsNewsCompany";
// 厂商业务
import Supplier from "@/components/bsComponents/bsNewsComponent/bsNewsFirm";
//消息列表
import BsNewsMessageList from "@/components/bsComponents/bsNewsComponent/bsNewsMessageList";

import { filterMsgTypes } from "@/assets/js/common/common.js";
import eventBus from "@/assets/js/common/eventBus.js";
/** IM */
import IM from "@/assets/js/common/im.js";
export default {
  name: "bsNews",
  components: {
    System,
    Exhibition,
    Sales,
    Supplier,
    BsNewsMessageList
  },
  data() {
    return {
      chatList: [],
      im: new IM().RongIMClient,
      disabled: false,
      businessConversations: [],
      companyConversations: [],
      colorId: "2",
      isGrid: null,
      isDiyu: "0",
      dataOption: {},
      msgList: [
        {
          id: 1,
          name: "小竹熊大家族",
          img: require("@/assets/images/system.png"),
          message: "收到"
        },
        {
          id: 2,
          name: "耀昇展厅",
          img: require("@/assets/images/system.png"),
          message: "收到"
        },
        {
          id: 3,
          name: "zs3",
          img: require("@/assets/images/system.png"),
          message: "大概是多少？"
        }
      ]
    };
  },
  methods: {
    // IM 添加事件监听
    watchIm() {
      const _that = this;
      // 添加事件监听
      this.im.watch({
        // 监听会话列表变更事件
        async conversation(event) {
          // 发生变更的会话列表
          const updatedConversationList = event.updatedConversationList;
          if (updatedConversationList && updatedConversationList.length) {
            _that.getExistedConversationList().then(async conversationList => {
              // 通过 im.Conversation.merge 计算最新的会话列表
              const latestConversationList = _that.im.Conversation.merge({
                conversationList,
                updatedConversationList
              });
              console.log(latestConversationList, "最新会话列表");
              // for (let i = 0; i < latestConversationList.length; i++) {
              //   latestConversationList[i].userInfo = await _that.getInfoIm(
              //     latestConversationList[i].targetId
              //   );
              // }
              // _that.$store.commit("handlerChatList", latestConversationList);
            });
          }
        },
        // 监听消息通知
        async message(event) {
          // 新接收到的消息内容
          const message = event.message;
          console.log(message);
        },
        // 监听 IM 连接状态变化
        status(event) {
          console.log("connection status:", event.status);
        },
        // 监听聊天室 KV 数据变更
        chatroom(event) {
          /**
           * 聊天室 KV 存储数据更新
           * @example
           * [
           *  {
           *    "key": "name",
           *    "value": "我是小融融",
           *    "timestamp": 1597591258338,
           *    "chatroomId": "z002",
           *    "type": 1 // 1: 更新（ 含:修改和新增 ）、2: 删除
           *  },
           * ]
           */
          const updatedEntries = event.updatedEntries;
          console.log(updatedEntries);
        },
        expansion(event) {
          /**
           * 更新的消息拓展数据
           * @example {
           *    expansion: { key: 'value' },      // 设置或更新的扩展值
           *    messageUId: 'URIT-URIT-ODMF-DURR' // 设置或更新扩展的消息 uid
           * }
           */
          const updatedExpansion = event.updatedExpansion;
          /**
           * 删除的消息拓展数据
           * @example {
           *    deletedKeys: ['key1', 'key2'],    // 设置或更新的扩展值
           *    messageUId: 'URIT-URIT-ODMF-DURR' // 设置或更新扩展的消息 uid
           * }
           */
          const deletedExpansion = event.deletedExpansion;
          console.log(updatedExpansion, deletedExpansion);
        }
      });
      this.im
        .connect({ token: this.userInfo.chatUser.chatUserToken })
        .then(user => {
          console.log("链接成功, 链接用户 id 为: ", user.id);
          this.getExistedConversationList(0).then(async conversationList => {
            if (conversationList) {
              for (let i = 0; i < conversationList.length; i++) {
                conversationList[i].userInfo = await this.getInfoIm(
                  conversationList[i].targetId
                );
              }
              this.$store.commit("handlerChatList", conversationList);
            }
          });
        })
        .catch(error => {
          console.log("链接失败: ", error.code, error.msg);
        });
    },
    // im获取会话列表
    getExistedConversationList(startTime = 0, count = 7) {
      return new Promise((result, reject) => {
        this.im.Conversation.getList({
          count: count,
          startTime: startTime,
          order: 0
        })
          .then(async conversationList => {
            result(conversationList);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // im获取历史消息,聊天窗口消息
    getHistoryChat(targetId, type) {
      var conversation = this.im.Conversation.get({
        targetId: targetId,
        type: type
      });
      var option = {
        timestamp: +new Date(),
        count: 20
      };
      conversation.getMessages(option).then(result => {
        var list = result.list; // 历史消息列表
        var hasMore = result.hasMore; // 是否还有历史消息可以获取
        console.log("获取历史消息成功", list, hasMore);
      });
      // 清除未读
      conversation.read().then(function() {
        console.log("清除未读数成功"); // im.watch conversation 将被触发
      });
    },
    // im获取个人信息
    async getInfoIm(userId) {
      const res = await this.$im_http.post(
        "/api/User/GetUserInfoByChatUserId",
        {
          chatUserId: userId
        }
      );
      const { code, item, msg } = res.data.result;
      if (code === 200) {
        return item;
      } else {
        this.$common.handlerMsgState({
          msg: msg,
          type: "danger"
        });
      }
    },
    // 会话列表滚动到底事件
    scrollSessionList() {
      eventBus.$emit("scrollSessionList");
      // this.getConversationList();
    },
    // 获取业务消息列表
    async getConversationList() {
      const res = await this.$im_http.post("/api/Conversation/List", {});
      const { code, item, msg } = res.data.result;
      if (code === 200) {
        this.businessConversations = item.businessConversations;
        this.companyConversations = item.companyConversations;
        this.dataOption =
          this.businessConversations.find(val => val.businessType == 1) || {};
        this.isGrid = System;
      } else {
        this.$common.handlerMsgState({
          msg: msg,
          type: "danger"
        });
      }
    },
    // 消息筛选
    myFilterMsgTypes(item) {
      return filterMsgTypes(item);
    },
    // 切换
    handerIsGrid(item, num) {
      this.dataOption = item;
      this.isGrid = null;
      this.$nextTick(() => {
        switch (num) {
          case 0:
            this.isGrid = "BsNewsMessageList";
            break;
          case 1:
            this.isGrid = "System";
            break;
          case 2:
            console.log(item.sampleFrom == "EXHIBITION", "展厅对公司");
            this.isGrid = "Exhibition";
            break;
          case 3:
            console.log(item.sampleFrom == "SALES", "公司对厂商");
            console.log(item.sampleFrom == "EXHIBITION", "展厅对厂商");
            this.isGrid = "Supplier";
            break;
          case 4:
            console.log(item.sampleFrom == "EXHIBITION", "展厅对公司");
            this.isGrid = "Sales";
            break;
          case 5:
            this.isGrid = "Supplier";
            break;
        }
      });
    }
  },
  created() {},
  mounted() {
    this.watchIm();
    this.getConversationList();
  },
  computed: {},
  beforeDestroy() {
    this.im.disconnect().then(() => console.log("断开链接成功"));
  }
};
</script>
<style scoped lang="less">
.bsNews {
  min-height: 100%;
  background-color: #f1f2f6;
  display: flex;
  .bsNewsLeft {
    margin-right: 20px;
    background-color: #fff;
    width: 300px;
    height: 770px;
    opacity: 1;
    border-radius: 6px;
    // overflow: hidden;
    h3 {
      height: 55px;
      font-size: 15px;
      font-weight: 700;
      padding-left: 20px;
      line-height: 55px;
    }
    .exhibition {
      border-top: 1px solid #e5e5e5;
      border-bottom: 1px solid #e5e5e5;
    }
    .exhibition li:hover {
      background-color: #eff6ff;
    }
    .exhibition li {
      height: 70px;
      display: flex;
      padding-left: 20px;
      cursor: pointer;
      .exhibition_left {
        width: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
        ._leftImg {
          border-radius: 50%;
          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
        }
      }
      .exhibition_right {
        padding: 13px 0 0 15px;
        h4 {
          font-weight: bold;
          height: 20px;
          line-height: 20px;
          color: #333;
          font-size: 14px;
        }
        p {
          color: #999;
        }
      }
    }
  }
  .bsNewsRight {
    width: 80%;
    margin-left: 20px;
    .right_top {
      height: 56px;
      background-color: #fff;
      padding-left: 20px;
      display: flex;
      ._topAll {
        width: 100px;
        font-size: 15px;
        font-weight: Bold;
        color: #3368a9;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .businessList {
        width: 200px;
        font-size: 15px;
        color: #666666;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .right_bottom {
      ul li {
        height: 146px;
        background-color: #fff;
        margin-top: 20px;
      }
      ul li .tableHead {
        padding: 0 20px;
        height: 50px;
        line-height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: bold;
        font-size: 16px;
        color: #333;
        border-bottom: 2px solid #dcdfe6;
        .tableHeadIcon {
          width: 50px;
          min-width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          cursor: pointer;
        }
      }
      ul li .tablemian {
        display: flex;
        padding: 20px 20px 0 20px;
        p {
          color: #666666;
          font-size: 14px;
          line-height: 34px;
        }
        .mianName {
          margin-right: 150px;
        }
        .mianCode {
          flex: 1;
          .mianCode_top {
            display: flex;
            p:nth-child(1) {
              margin-right: 200px;
            }
          }
        }
      }
    }
  }
}
</style>
