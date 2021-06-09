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
            <h3 class="infinite_title">
              <span>通讯录</span>
              <i class="el-icon-circle-plus-outline"></i>
            </h3>
            <ul class="exhibition" style="border-top: none;">
              <li v-for="(item, i) in chatList" :key="i">
                <div class="exhibition_left">
                  <div class="_leftImg">
                    <el-image
                      class="header-img"
                      style="width: 50px;height: 50px;border-radius: 100px;position:static;"
                      :src="require('../../../../assets/images/imgError.png')"
                      fit="contain"
                    >
                    </el-image>
                  </div>
                </div>
                <div class="exhibition_right">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :disabled="
                      item.userInfo &&
                        item.userInfo.nickname &&
                        item.userInfo.nickname.length < 15
                    "
                    :content="item.userInfo && item.userInfo.nickname"
                    placement="top"
                  >
                    <h4 v-if="item.type === 1">
                      {{ item.userInfo && item.userInfo.nickname }}
                    </h4>
                  </el-tooltip>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :disabled="
                      item.userInfo &&
                        item.userInfo.linkName &&
                        item.userInfo.linkName.length < 15
                    "
                    :content="item.userInfo && item.userInfo.linkName"
                    placement="top"
                  >
                    <h4 v-if="item.type === 3">
                      {{ item.userInfo && item.userInfo.linkName }}
                    </h4>
                  </el-tooltip>
                  <p></p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <component
      v-if="isGrid"
      :is="isGrid"
      :dataOption="dataOption"
      ref="childEvent"
      :im="im"
    ></component>
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

// import { filterMsgTypes } from "@/assets/js/common/common.js";

import { mapState } from "vuex";
export default {
  name: "bsNews",
  components: {
    System,
    Exhibition,
    Sales,
    Supplier,
    BsNewsMessageList
  },
  props: ["im"],
  data() {
    return {
      connectState: false,
      chatList: 4,
      disabled: false,
      colorId: "2",
      isGrid: null,
      isDiyu: "0",
      dataOption: {},
      msgList: []
    };
  },
  methods: {
    scrollSessionList() {
      if (!this.connectState) {
        return false;
      }
    }
  },
  created() {},
  mounted() {
    console.log(this.im);
  },
  computed: {
    ...mapState(["userInfo"])
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
    .infinite_title {
      height: 55px;
      font-size: 15px;
      font-weight: 700;
      padding: 0 20px;
      border-bottom: 1px solid #e5e5e5;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .el-icon-circle-plus-outline {
        font-weight: 600;
      }
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
      padding: 0 20px;
      cursor: pointer;
      box-sizing: border-box;
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
          max-width: 195px;
          overflow: hidden;
          white-space: nowrap; /*不换行*/
          text-overflow: ellipsis; /*超出部分文字以...显示*/
        }
        p {
          color: #999;
          max-width: 195px;
          overflow: hidden;
          white-space: nowrap; /*不换行*/
          text-overflow: ellipsis; /*超出部分文字以...显示*/
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
