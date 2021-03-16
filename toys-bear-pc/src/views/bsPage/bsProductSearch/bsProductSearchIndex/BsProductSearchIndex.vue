<template>
  <div class="productSearch">
    <div class="advancedSearchBox">
      <bsProductSearch />
      <div class="standardScreening">
        <span class="myLabel">标准筛选:</span>
      </div>
      <div class="productClass">
        <span class="myLabel">产品分类:</span>
        <div :class="{ tags: true, showOneCate: isOneDownCate }">
          <div
            @click="oneTagEvent(i)"
            :class="{ itemTag: true, isActive: currentOneTag === i }"
            v-for="(item, i) in cateList"
            :key="i"
          >
            {{ item }}
          </div>
        </div>
        <div class="develop" @click="handlerOneCateLabel">
          <span class="zhankai">{{ isOneDownCate ? "展开" : "隐藏" }}</span>
          <i v-show="isOneDownCate" class="el-icon-arrow-down"></i>
          <i v-show="!isOneDownCate" class="el-icon-arrow-up"></i>
        </div>
      </div>
      <div class="twoLevelClass">
        <span class="myLabel">二级分类:</span>
        <div :class="{ tags: true, showTwoCate: isTwoDownCate }">
          <div
            @click="twoTagEvent(i)"
            :class="{ itemTag: true, isActive: currentTwoTag === i }"
            v-for="(item, i) in cateList"
            :key="i"
          >
            {{ item }}
          </div>
        </div>
        <div class="develop" @click="handlerTwoCateLabel">
          <span class="zhankai">{{ isTwoDownCate ? "展开" : "隐藏" }}</span>
          <i v-show="isTwoDownCate" class="el-icon-arrow-down"></i>
          <i v-show="!isTwoDownCate" class="el-icon-arrow-up"></i>
        </div>
      </div>
    </div>
    <div class="productsWrap">
      <div class="screenBox">
        <div class="left">
          <div class="screenItem">
            <span :class="{ screenLabel: true, active: isScreen === '综合' }"
              >综合</span
            >
          </div>
          <div class="screenItem">
            <span :class="{ screenLabel: true, active: isScreen === '热度' }"
              >热度</span
            >
            <i class="xiajiantouIcon"></i>
          </div>
          <div class="screenItem">
            <span :class="{ screenLabel: true, active: isScreen === '单价' }"
              >单价</span
            >
            <i class="xiajiantouIcon"></i>
          </div>
          <div class="screenItem">
            <span :class="{ screenLabel: true, active: isScreen === '时间' }"
              >时间</span
            >
            <i class="xiajiantouIcon"></i>
          </div>
          <div class="screenItem">
            <span
              :class="{ screenLabel: true, active: isScreen === '上架时间' }"
              >上架时间</span
            >
            <el-date-picker
              size="mini"
              v-model="searchForm.time"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </div>
          <div class="screenItem">
            <span
              :class="{ screenLabel: true, active: isScreen === '价格区间' }"
              >价格区间</span
            >
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
          <el-button type="primary" style="margin-left: 10px;" size="mini">
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
          <div class="myPagination">
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
      <div class="productListBox">
        <!-- 产品列表 -->
        <component :is="isGrid" :productList="productList"></component>
      </div>
    </div>
  </div>
</template>

<script>
import bsProductSearch from "@/components/bsComponents/bsProductSearchComponent/searchBox";
import bsColumnComponent from "@/components/bsComponents/bsProductSearchComponent/bsColumnComponent";
import bsGridComponent from "@/components/bsComponents/bsProductSearchComponent/bsGridComponent";
export default {
  components: {
    bsProductSearch,
    bsColumnComponent,
    bsGridComponent
  },
  data() {
    return {
      productList: [{}, {}, {}, {}, {}, {}, {}, {}, {}],
      isGrid: "bsGridComponent",
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      isScreen: "综合",
      searchForm: {
        keyword: "",
        minPrice: "",
        maxPrice: "",
        time: []
      },
      currentTwoTag: 0,
      currentOneTag: 0,
      isOneDownCate: true,
      isTwoDownCate: true,
      cateList: [
        "全部",
        "电动玩具",
        "电动玩具",
        "电动玩具",
        "电动玩具",
        "电动玩具",
        "电动玩具",
        "电动玩具",
        "电动玩具",
        "电动玩具",
        "电动玩具",
        "电动玩具",
        "电动玩具",
        "电动玩具",
        "电动玩具",
        "电动玩具",
        "电动玩具",
        "电动玩具",
        "电动玩具",
        "电动玩具",
        "电动玩具",
        "电动玩具",
        "电动玩具",
        "电动玩具",
        "电动玩具",
        "电动玩具",
        "电动玩具",
        "电动玩具",
        "电动玩具",
        "电动玩具",
        "电动玩具",
        "电动玩具",
        "电动玩具",
        "电动玩具",
        "电动玩具",
        "电动玩具",
        "电动玩具",
        "电动玩具",
        "电动玩具",
        "电动玩具",
        "电动玩具",
        "电动玩具",
        "电动玩具",
        "电动玩具",
        "电动玩具",
        "电动玩具",
        "电动玩具",
        "电动玩具"
      ]
    };
  },
  methods: {
    // 切换产品列表样式
    handerIsGrid(type) {
      this.isGrid = type;
    },
    // 上一页
    firstEvent() {
      console.log(123);
    },
    // 下一页
    nextEvent() {
      console.log(123);
    },
    // 一级分类点击事件
    oneTagEvent(i) {
      this.currentOneTag = i;
    },
    // 二级分类点击事件
    twoTagEvent(i) {
      this.currentTwoTag = i;
    },
    // 展开一级分类
    handlerOneCateLabel() {
      this.isOneDownCate = !this.isOneDownCate;
    },
    // 展开二级分类
    handlerTwoCateLabel() {
      this.isTwoDownCate = !this.isTwoDownCate;
    },
    // 搜索
    searchProducts() {
      console.log(123);
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped lang="less">
.productSearch {
  .advancedSearchBox {
    background-color: #fff;
    width: 100%;
    min-height: 263px;
    .standardScreening,
    .productClass,
    .twoLevelClass {
      padding: 20px;
      padding-top: 0;
      .myLabel {
        margin-right: 15px;
      }
    }
    .productClass,
    .twoLevelClass {
      display: flex;
      .myLabel {
        padding: 7px 0px;
      }
      .develop {
        background: #ffffff;
        border: 1px solid #dcdfe6;
        border-radius: 5px;
        width: 68px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        box-sizing: border-box;
        cursor: pointer;
        .zhankai {
          margin-right: 5px;
        }
      }
      .tags {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        .itemTag {
          padding: 7px 15px;
          border-radius: 4px;
          cursor: pointer;
          &.isActive {
            background-color: #3368a9;
            color: #fff;
          }
        }
        &.showOneCate {
          max-height: 66px;
          overflow: hidden;
        }
        &.showTwoCate {
          max-height: 33px;
          overflow: hidden;
        }
      }
    }
  }
  .productsWrap {
    margin-top: 20px;
    background-color: #fff;
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
          margin-left: 30px;
          display: flex;
          align-items: center;
          cursor: pointer;
          padding: 5px;
          .screenLabel {
            margin-right: 10px;
            &.active {
              color: #3368a9;
            }
          }
          .xiajiantouIcon {
            width: 9px;
            height: 16px;
            opacity: 1;
            background: url("~@/assets/images/xiajiantou.png") no-repeat center;
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
        width: 350px;
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
        .myPagination {
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
    .productListBox {
      background-color: #fff;
      width: 100%;
      padding: 20px;
      padding-bottom: 0;
      box-sizing: border-box;
    }
  }
}
</style>
