<template>
  <!-- <div>敬请期待</div> -->
  <div class="bsNews">
    <div class="bsNewsLeft">
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
          <ul class="exhibition">
            <el-scrollbar style="height: 100%;">
              <li
                class="exhibition_side"
                v-for="(item, i) in chatList"
                :key="i"
              >
                <div class="exhibition_left">
                  <div class="_leftImg">
                    <el-image
                      class="header-img"
                      style="width: 50px;height: 50px;border-radius: 100px;position:static;"
                      :src="item.img"
                      fit="contain"
                    >
                    </el-image>
                  </div>
                </div>
                <div class="exhibition_right">
                  <h4>
                    {{ item.title }}
                  </h4>
                </div>
              </li>
              <li class="exhibition_side">
                <div class="exhibition_left">
                  <div class="_leftImg">
                    <el-image
                      class="header-img"
                      style="width: 50px;height: 50px;border-radius: 50%;position:static;"
                      :src="orgCompany.companyLogo"
                      fit="contain"
                    >
                      <div
                        slot="placeholder"
                        class="image-slot"
                        style="width: 50px;height: 50px;border-radius: 50%;"
                      >
                        <img
                          style="width: 50px;height: 50px;border-radius: 50%;"
                          :src="require('@/assets/images/imgError.png')"
                        />
                      </div>
                      <div
                        slot="error"
                        class="image-slot"
                        style="width: 50px;height: 50px;border-radius: 50%;"
                      >
                        <img
                          style="width: 50px;height: 50px;border-radius: 50%;"
                          :src="require('@/assets/images/imgError.png')"
                        />
                      </div>
                    </el-image>
                  </div>
                </div>
                <div class="exhibition_right">
                  <h4 style="font-weight: 700;">
                    {{ orgCompany.companyName }}
                  </h4>
                </div>
              </li>
              <li class="exhibition_tongxunlu">
                <div class="exhibition_left">
                  <div class="_leftImg">
                    <i class="icon_L"></i>
                  </div>
                </div>
                <div class="exhibition_right" @click="checkTongxunlu">
                  <h4>
                    同事通讯录
                    <i class="el-icon-arrow-up" v-show="isShowTongxunlu"></i>
                    <i class="el-icon-arrow-down" v-show="!isShowTongxunlu"></i>
                  </h4>
                </div>
              </li>
              <!-- 通讯录 -->
              <transition-group name="el-zoom-in-top">
                <li
                  v-show="isShowTongxunlu"
                  class="exhibition_tongxunlu"
                  v-for="item in orgList"
                  :key="item.id"
                >
                  <div class="exhibition_left">
                    <div class="_leftImg">
                      <el-image
                        class="header-img"
                        style="width: 30px;height: 30px;border-radius: 50%;position:static;"
                        :src="item.userImage"
                        fit="contain"
                      >
                        <div
                          slot="placeholder"
                          class="image-slot"
                          style="width: 30px;height: 30px;border-radius: 50%;"
                        >
                          <img
                            style="width: 30px;height: 30px;border-radius: 50%;"
                            :src="require('@/assets/images/imgError.png')"
                          />
                        </div>
                        <div
                          slot="error"
                          class="image-slot"
                          style="width: 30px;height: 30px;border-radius: 50%;"
                        >
                          <img
                            style="width: 30px;height: 30px;border-radius: 50%;"
                            :src="require('@/assets/images/imgError.png')"
                          />
                        </div>
                      </el-image>
                    </div>
                  </div>
                  <div class="exhibition_right" @click="checkTongxunlu">
                    <h4>
                      {{ item.linkman }}
                    </h4>
                  </div>
                </li>
              </transition-group>
            </el-scrollbar>
          </ul>
        </div>
      </div>
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
      isShowTongxunlu: true,
      isGrid: null,
      connectState: false,
      chatList: [
        {
          img: require("@/assets/images/changlianxiren.png"),
          title: "常联系人"
        },
        {
          img: require("@/assets/images/xindehaoyou.png"),
          title: "新的好友"
        },
        {
          img: require("@/assets/images/wodehaoyou.png"),
          title: "我的好友"
        },
        {
          img: require("@/assets/images/wodequnzu.png"),
          title: "我的群组"
        }
      ],
      orgList: [],
      orgCompany: {}
    };
  },
  methods: {
    // 展开通讯录
    checkTongxunlu() {
      this.isShowTongxunlu = !this.isShowTongxunlu;
    },
    // 获取公司架构
    async getOrgList() {
      const res = await this.$http.post("/api/OrgList", {});
      console.log(res);
      if (res.data.result.code === 200) {
        this.orgList = res.data.result.item.personnes;
        this.orgCompany = res.data.result.item.orgCompany;
      } else {
        this.$common.handlerMsgState({
          msg: "取消删除",
          type: "danger"
        });
      }
    },
    // 滚动事件
    scrollSessionList() {
      if (!this.connectState) {
        return false;
      }
    }
  },
  created() {},
  mounted() {
    console.log(this.im);
    this.getOrgList();
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
      height: 715px;
      max-height: 715px;
    }
    .exhibition li:hover {
      background-color: #eff6ff;
    }
    .exhibition .exhibition_side {
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
        padding-left: 15px;
        box-sizing: border-box;
        flex: 1;
        font-size: 15px;
        display: flex;
        align-items: center;
        h4 {
          font-weight: 400;
          color: #333;
          max-width: 190px;
          overflow: hidden;
          white-space: nowrap; /*不换行*/
          text-overflow: ellipsis; /*超出部分文字以...显示*/
        }
      }
    }
    .exhibition .exhibition_tongxunlu {
      height: 40px;
      display: flex;
      padding: 0 20px;
      cursor: pointer;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      .exhibition_left {
        margin-left: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        ._leftImg {
          border-radius: 50%;
          img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }
          .icon_L {
            display: block;
            width: 8px;
            height: 8px;
            background: url("~@/assets/images/erceng.png") no-repeat center;
          }
        }
      }
      .exhibition_right {
        padding-left: 10px;
        box-sizing: border-box;
        flex: 1;
        font-size: 15px;
        display: flex;
        align-items: center;
        h4 {
          font-weight: 400;
          color: #333;
          max-width: 190px;
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
