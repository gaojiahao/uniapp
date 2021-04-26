<template>
  <div class="bsSimilarProduct">
    <div class="topLaout">
      <div class="leftImg">
        <el-image
          style=" width: 222px;
              height: 166px;"
          fit="contain"
          :src="item.img"
        >
          <div slot="placeholder" class="image-slot">
            <img
              style=" width: 222px;
              height: 166px;"
              :src="require('@/assets/images/imgError.png')"
            />
          </div>
          <div slot="error" class="image-slot">
            <img
              style=" width: 222px;
              height: 166px;"
              :src="require('@/assets/images/imgError.png')"
            />
          </div>
        </el-image>
      </div>
      <div class="middleText">
        <div class="productName">99式坦克军事系列积木套装....</div>
        <div class="middleItem">
          出厂货号：<span class="fa_no">123-333</span>
        </div>
        <div class="middleItem">
          参考单价：<span class="price">￥98.00</span>
        </div>
        <div class="contactBox">
          <div class="sourceBox" @click="toFactory(item)">
            <i class="sourceIcon"></i>
            <template v-if="item.isIntegral">
              <span class="text">
                {{ item.supplierName }}
              </span>
            </template>
            <template v-else>
              <span class="text">
                {{ item.exhibitionName }}
              </span>
            </template>
          </div>
          <div class="infoBox">
            <p class="infoItem" @click="toNews(item)">
              <i class="infoIcon"></i>
              <span>在线咨询</span>
            </p>
            <p class="infoItem" v-if="item.supplierTelePhoneNumber">
              <i class="telePhoneIcon"></i>
              <span>{{ item.supplierTelePhoneNumber }}</span>
            </p>
            <p class="infoItem" v-if="item.supplierPhone">
              <i class="phoneIcon"></i>
              <span>{{ item.supplierPhone }}</span>
            </p>
            <p class="infoItem" v-if="item.supplierQQ">
              <i class="qqIcon"></i>
              <span>{{ item.supplierQQ }}</span>
            </p>
            <p class="infoItem" @click="toFactory(item)">
              <i class="shopIcon"></i>
              <span>厂商店铺</span>
            </p>
          </div>
        </div>
      </div>
      <div class="rightSource">
        <div class="line"></div>
        <div class="infoSource">
          <p class="infoTitle">资料来源</p>
          <p>新悦翔展厅</p>
          <p>展厅编号: <span>YX1270275</span></p>
          <p>摊位号: <span>YX1270275</span></p>
        </div>
      </div>
    </div>
    <div class="contentWrap">
      <div class="contentTitle">
        <p class="titleItem">
          相似产品 <span class="productCount">({{ totalCount }})</span>
        </p>
      </div>
      <!-- 筛选 -->
      <div class="screenBox">
        <div class="left">
          <div class="screenItem" @click="sortTypeEvent(null)">
            <span :class="{ screenLabel: true, active: sortOrder === null }"
              >综合</span
            >
          </div>
          <div class="screenItem" @click="sortTypeEvent(3)">
            <span :class="{ screenLabel: true, active: sortOrder === 3 }"
              >热度</span
            >
            <i v-show="isRedu === null" class="jiantou xiajiantouIcon"></i>
            <i v-show="isRedu === 1" class="jiantou xiaActiveIcon"></i>
            <i v-show="isRedu === 2" class="jiantou shangActiveIcon"></i>
          </div>
          <div class="screenItem" @click="sortTypeEvent(1)">
            <span :class="{ screenLabel: true, active: sortOrder === 1 }"
              >单价</span
            >
            <i v-show="isPrice === null" class="jiantou xiajiantouIcon"></i>
            <i v-show="isPrice === 1" class="jiantou xiaActiveIcon"></i>
            <i v-show="isPrice === 2" class="jiantou shangActiveIcon"></i>
          </div>
          <div class="screenItem" @click="sortTypeEvent(2)">
            <span :class="{ screenLabel: true, active: sortOrder === 2 }">
              时间
            </span>
            <i v-show="isTime === null" class="jiantou xiajiantouIcon"></i>
            <i v-show="isTime === 1" class="jiantou xiaActiveIcon"></i>
            <i v-show="isTime === 2" class="jiantou shangActiveIcon"></i>
          </div>
          <div class="screenItem dateTime">
            <span class="screenLabel">上架时间</span>
            <el-date-picker
              size="mini"
              value-format="yyyy-MM-ddTHH:mm:ss"
              v-model="searchForm.time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </div>
          <div class="screenItem priceUnit">
            <span class="screenLabel">价格区间</span>
            <div class="intervalPrice">
              <el-input
                size="mini"
                v-model="searchForm.minPrice"
                placeholder="最低"
              ></el-input>
              <span class="line">-</span>
              <el-input
                size="mini"
                v-model="searchForm.maxPrice"
                placeholder="最高"
              ></el-input>
            </div>
          </div>
          <el-button
            @click="getProductList(false)"
            type="primary"
            style="margin-left: 10px"
            size="mini"
          >
            确定
          </el-button>
        </div>
        <div class="right">
          <div
            :class="{ grid: true, active: isGrid === 'bsGridComponent' }"
            @click="handerIsGrid('bsGridComponent')"
          ></div>
          <div
            :class="{ column: true, active: isGrid === 'bsColumnComponent' }"
            @click="handerIsGrid('bsColumnComponent')"
          ></div>
          <div class="line"></div>
          <div class="totalCount">
            <span class="totalCountText">{{ totalCount }}</span>
            <span>条数据</span>
          </div>
          <div class="myMinPagination">
            <div @click="firstEvent" class="first el-icon-arrow-left"></div>
            <div class="count">
              <span class="pageIndex">{{ currentPage }}</span>
              <span>/</span>
              <span>{{ Math.ceil(totalCount / pageSize) }}</span>
            </div>
            <div @click="nextEvent" class="next el-icon-arrow-right"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 12,
      totalCount: 0,
      sortOrder: null,
      isRedu: null,
      isPrice: null,
      isTime: null,
      isGrid: null,
      searchForm: {
        time: null,
        minPrice: null,
        maxPrice: null
      }
    };
  },
  methods: {
    // 上一页
    firstEvent() {
      if (this.currentPage === 1) {
        this.$common.handlerMsgState({
          msg: "已经是第一页了",
          type: "danger"
        });
        return false;
      }
      this.currentPage--;
      this.getProductList(false);
    },
    // 下一页
    nextEvent() {
      const totalPage = Math.ceil(this.totalCount / this.pageSize);
      if (totalPage <= this.currentPage) {
        this.$common.handlerMsgState({
          msg: "已经是第最后一页了",
          type: "danger"
        });
        return false;
      }
      this.currentPage++;
      this.getProductList(false);
    },
    // 去聊天
    toNews(item) {
      const fd = {
        name: item.supplierNumber + "bsNews",
        linkUrl: "/bsIndex/bsNews",
        component: "bsNews",
        refresh: true,
        label: item.supplierName,
        value: {}
      };
      this.$store.commit("myAddTab", fd);
    },
    // 去厂商
    toFactory(item) {
      const fd = {
        name: item.supplierNumber,
        linkUrl: "/bsIndex/bsVendorQuery",
        component: "bsMyClientsDetail",
        refresh: true,
        noPush: true,
        label: item.supplierName,
        value: {
          companyNumber: item.supplierNumber,
          companyLogo: item.supplierPersonnelLogo,
          companyName: item.supplierName,
          contactsMan: item.supplierPersonnelName,
          phoneNumber: item.supplierPhone,
          address: item.supplierAddres || item.supplierAddress
        }
      };
      this.$store.commit("myAddTab", fd);
      this.$router.push("/bsIndex/bsVendorQuery");
    }
  },
  created() {},
  mounted() {
    console.log(this.item);
  }
};
</script>
<style scoped lang="less">
@deep: "~>>>";
.bsSimilarProduct {
  .topLaout {
    height: 206px;
    width: 100%;
    background-color: #fff;
    box-sizing: border-box;
    display: flex;
    border-radius: 4px;
    padding: 20px;
    .leftImg {
      width: 222px;
      min-width: 222px;
      height: 166px;
    }
    .middleText {
      flex: 1;
      margin-left: 20px;
      height: 166px;
      .productName {
        margin-top: 20px;
        font-size: 18px;
        overflow: hidden;
        white-space: nowrap; /*不换行*/
        text-overflow: ellipsis; /*超出部分文字以...显示*/
      }
      .middleItem {
        margin-top: 12px;
        .price {
          color: #ff4848;
        }
      }
      .contactBox {
        margin-top: 30px;
        display: flex;
        .sourceBox {
          // height: 48px;
          box-sizing: border-box;
          // margin-top: 10px;
          display: flex;
          align-items: center;
          color: #3368a9;
          cursor: pointer;
          .sourceIcon {
            width: 18px;
            min-width: 18px;
            height: 18px;
            margin-right: 16px;
            background: url("~@/assets/images/sourceIcon.png") no-repeat center;
            background-size: contain;
          }
          .text {
            overflow: hidden; /*超出部分隐藏*/
            white-space: nowrap; /*不换行*/
            text-overflow: ellipsis; /*超出部分文字以...显示*/
          }
        }
        .infoBox {
          margin-left: 97px;
          display: flex;
          .infoItem {
            margin-right: 27px;
            display: flex;
            align-items: center;
            color: #666;
            cursor: pointer;
            .factoryIcon {
              min-width: 18px;
              width: 18px;
              height: 18px;
              margin-right: 15px;
              background: url("~@/assets/images/sourceIcon.png") no-repeat
                center;
              background-size: contain;
            }
            .infoIcon {
              min-width: 28px;
              width: 28px;
              height: 28px;
              margin-right: 15px;
              background: url("~@/assets/images/onlineInfoIcon.png") no-repeat
                center;
              background-size: contain;
            }
            .telePhoneIcon {
              min-width: 28px;
              width: 28px;
              height: 28px;
              margin-right: 15px;
              background: url("~@/assets/images/onlinePhoneIcon.png") no-repeat
                center;
              background-size: contain;
            }
            .phoneIcon {
              min-width: 28px;
              width: 28px;
              height: 28px;
              margin-right: 15px;
              background: url("~@/assets/images/moblie.png") no-repeat center;
              background-size: contain;
            }
            .qqIcon {
              min-width: 28px;
              width: 28px;
              height: 28px;
              margin-right: 15px;
              background: url("~@/assets/images/QQ.png") no-repeat center;
              background-size: contain;
            }
            .shopIcon {
              min-width: 28px;
              width: 28px;
              height: 28px;
              margin-right: 15px;
              background: url("~@/assets/images/onlineStoreIcon.png") no-repeat
                center;
              background-size: contain;
            }
          }
        }
      }
    }
    .rightSource {
      width: 519px;
      min-width: 519px;
      display: flex;
      .line {
        width: 1px;
        background-color: #edeff2;
        height: 166px;
        margin: 0 60px;
      }
      .infoSource {
        flex: 1;
        p {
          line-height: 38px;
          color: #666;
        }
        .infoTitle {
          color: #333;
          margin-top: 18px;
          width: 56px;
          font-weight: 700;
        }
      }
    }
  }
  .contentWrap {
    width: 100%;
    margin-top: 20px;
    box-sizing: border-box;
    .contentTitle {
      height: 56px;
      line-height: 56px;
      padding: 0 20px;
      background-color: #fff;
      box-sizing: border-box;
      .titleItem {
        font-weight: 700;
        padding-left: 15px;
        position: relative;
        &::before {
          content: "";
          display: block;
          position: absolute;
          left: 0;
          top: 50%;
          width: 4px;
          height: 11px;
          background-color: #3368a9;
          margin-top: -6px;
          border-radius: 1px;
        }
        .productCount {
          font-weight: 400;
        }
      }
    }
    .screenBox {
      width: 100%;
      height: 50px;
      background-color: #f9fafc;
      display: flex;
      align-items: center;
      .left {
        flex: 1;
        display: flex;
        align-items: center;
        .screenItem {
          margin-left: 20px;
          display: flex;
          align-items: center;
          cursor: pointer;
          padding: 5px;
          &.priceUnit,
          &.dateTime {
            cursor: default;
            @{deep} .el-date-editor {
              width: 210px;
              box-sizing: border-box;
              padding-left: 16px;
              .el-icon-date {
                display: none;
              }
            }
          }
          .screenLabel {
            margin-right: 10px;
            &.active {
              color: #3368a9;
              font-weight: bold;
            }
          }
          .jiantou {
            width: 9px;
            height: 16px;
            opacity: 1;
          }
          .xiajiantouIcon {
            background: url("~@/assets/images/xiajiantou.png") no-repeat center;
            background-size: contain;
          }
          .xiaActiveIcon {
            background: url("~@/assets/images/xiaActive.png") no-repeat center;
            background-size: contain;
          }
          .shangActiveIcon {
            background: url("~@/assets/images/shangActive.png") no-repeat center;
            background-size: contain;
          }
          .el-date-editor {
            width: 210px;
          }
          .intervalPrice {
            width: 130px;
            display: flex;
            align-items: center;
            .line {
              margin: 0 5px;
            }
          }
        }
      }
      .right {
        width: 340px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .grid,
        .column {
          width: 17px;
          height: 17px;
          margin-right: 25px;
          cursor: pointer;
        }
        .grid {
          background: url("~@/assets/images/gridIcon.png") no-repeat center;
          background-size: contain;
          &.active {
            background: url("~@/assets/images/gridActiveIcon.png") no-repeat
              center;
            background-size: contain;
          }
        }
        .column {
          background: url("~@/assets/images/columnIcon.png") no-repeat center;
          background-size: contain;
          &.active {
            background: url("~@/assets/images/columnActiveIcon.png") no-repeat
              center;
            background-size: contain;
          }
        }
        .line {
          width: 1px;
          height: 100%;
          opacity: 1;
          background: #e9e9e9;
        }
        .totalCount {
          margin-left: 15px;
          .totalCountText {
            color: #eb1515;
          }
        }
        .myMinPagination {
          width: 110px;
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          margin-left: 20px;
          .first,
          .next {
            cursor: pointer;
          }
          .count {
            .pageIndex {
              color: #ff760e;
            }
          }
        }
      }
    }
  }
}
</style>
