<template>
  <div class="productSearch">
    <div class="advancedSearchBox">
      <bsProductSearch />
      <div class="standardScreening">
        <span class="myLabel">标准筛选:</span>
        <el-checkbox
          v-model="synthesis"
          @change="handleSynthesis"
          style="margin-right: 30px;"
        >
          综合
        </el-checkbox>
        <el-checkbox
          @change="handleCheckedScreensChange"
          v-model="searchForm.fa_no"
        >
          货号
        </el-checkbox>
        <el-checkbox
          @change="handleCheckedScreensChange"
          v-model="searchForm.name"
        >
          名称
        </el-checkbox>
        <el-checkbox
          @change="handleCheckedScreensChange"
          v-model="searchForm.number"
        >
          编号
        </el-checkbox>
        <el-checkbox
          @change="handleCheckedScreensChange"
          v-model="searchForm.packName"
        >
          包装
        </el-checkbox>
      </div>
      <div class="productClass">
        <span class="myLabel">产品分类:</span>
        <div :class="{ tags: true, showOneCate: isOneDownCate }">
          <div
            @click="oneTagEvent(null)"
            :class="{ itemTag: true, isActive: oneCurrentTag === null }"
          >
            全部
          </div>
          <div
            @click="oneTagEvent(item)"
            :class="{
              itemTag: true,
              isActive: oneCurrentTag && oneCurrentTag.id === item.id
            }"
            v-for="item in categoryList"
            :key="item.id"
          >
            {{ item.name }}
          </div>
        </div>
        <div class="develop" @click="handlerOneCateLabel">
          <span class="zhankai">{{ isOneDownCate ? "展开" : "隐藏" }}</span>
          <i v-show="isOneDownCate" class="el-icon-arrow-down"></i>
          <i v-show="!isOneDownCate" class="el-icon-arrow-up"></i>
        </div>
      </div>
      <div class="twoLevelClass" v-if="oneCurrentTag">
        <span class="myLabel">二级分类:</span>
        <div :class="{ tags: true, showTwoCate: isTwoDownCate }">
          <div
            @click="twoTagEvent(null)"
            :class="{ itemTag: true, isActive: currentTwoTag === null }"
          >
            全部
          </div>
          <div
            @click="twoTagEvent(item.id)"
            :class="{ itemTag: true, isActive: currentTwoTag === item.id }"
            v-for="item in oneCurrentTag.children"
            :key="item.id"
          >
            {{ item.name }}
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
              range-separator="-"
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
            @click="getProductList"
            type="primary"
            style="margin-left: 10px;"
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
      <div class="productListBox">
        <!-- 产品列表 -->
        <component :is="isGrid" :productList="productList"></component>
        <!-- 分页 -->
        <center class="myPagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[12, 24, 36, 48]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount"
          >
          </el-pagination>
        </center>
      </div>
    </div>
  </div>
</template>

<script>
import bsProductSearch from "@/components/bsComponents/bsProductSearchComponent/bsProductSearch";
import bsColumnComponent from "@/components/bsComponents/bsProductSearchComponent/bsColumnComponent";
import bsGridComponent from "@/components/bsComponents/bsProductSearchComponent/bsGridComponent";
import eventBus from "@/assets/js/common/eventBus";
import { mapGetters } from "vuex";
export default {
  name: "bsProductSearchIndex",
  components: {
    bsProductSearch,
    bsColumnComponent,
    bsGridComponent
  },
  data() {
    return {
      oneCurrentTag: null,
      cateChildren: [],
      categoryList: [],
      isPrice: null,
      isTime: null,
      isRedu: null,
      sortOrder: null,
      sortType: null,
      synthesis: true,
      productList: [],
      isGrid: "bsGridComponent",
      currentPage: 1,
      pageSize: 12,
      totalCount: 0,
      searchForm: {
        keyword: "",
        minPrice: "",
        maxPrice: "",
        categoryNumber: null,
        time: [],
        fa_no: 0,
        number: 0,
        name: 0,
        packName: 0
      },
      currentTwoTag: null,
      isOneDownCate: true,
      isTwoDownCate: true
    };
  },
  methods: {
    // 过滤类型
    sortTypeEvent(type) {
      this.sortOrder = type;
      switch (type) {
        case 1:
          this.sortType = this.isPrice =
            this.isPrice === null ? 1 : this.isPrice === 1 ? 2 : null;
          this.sortType = null;
          this.isTime = null;
          this.isRedu = null;
          this.sortType = this.isPrice;
          this.sortType === null && (this.sortOrder = null);
          break;
        case 2:
          this.isTime = this.isTime === null ? 1 : this.isTime === 1 ? 2 : null;
          this.sortType = null;
          this.isPrice = null;
          this.isRedu = null;
          this.sortType = this.isTime;
          this.sortType === null && (this.sortOrder = null);
          break;
        case 3:
          this.isRedu = this.isRedu === null ? 1 : this.isRedu === 1 ? 2 : null;
          this.sortType = null;
          this.isPrice = null;
          this.isTime = null;
          this.sortType = this.isRedu;
          this.sortType === null && (this.sortOrder = null);
          break;
        default:
          this.isPrice = null;
          this.isTime = null;
          this.isRedu = null;
          this.sortType = null;
          this.sortOrder = null;
          break;
      }
      this.getProductList();
    },
    // 获取产品列表请求
    async getProductList() {
      const fd = {
        name: this.searchForm.keyword,
        skipCount: this.currentPage,
        maxResultCount: this.pageSize,
        categoryNumber: this.searchForm.categoryNumber,
        minPrice: this.searchForm.minPrice,
        maxPrice: this.searchForm.maxPrice,
        startTime: this.searchForm.time.length ? this.searchForm.time[0] : null,
        endTime: this.searchForm.time.length ? this.searchForm.time[1] : null,
        precisionSearch: JSON.stringify({
          fa_no: this.searchForm.fa_no ? 1 : 0,
          number: this.searchForm.number ? 1 : 0,
          name: this.searchForm.name ? 1 : 0,
          packName: this.searchForm.packName ? 1 : 0
        }),
        sortOrder: this.sortOrder,
        sortType: this.sortType
      };
      for (const key in fd) {
        if (fd[key] === null || fd[key] === undefined || fd[key] === "")
          delete fd[key];
      }
      const res = await this.$http.post("/api/SearchBearProductPage", fd);
      const { code, item, msg } = res.data.result;
      if (code === 200) {
        if (this.shoppingList) {
          for (let i = 0; i < item.items.length; i++) {
            for (let j = 0; j < this.shoppingList.length; j++) {
              if (
                item.items[i].productNumber ===
                this.shoppingList[j].productNumber
              )
                item.items[i].isShopping = true;
            }
          }
        }
        this.productList = item.items;
        this.totalCount = item.totalCount;
      } else {
        this.totalCount = 0;
        this.$message.error(msg);
      }
    },
    // 切換頁容量
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      if (this.currentPage * pageSize > this.totalCount) return false;
      this.getProductList();
    },
    // 修改当前页
    handleCurrentChange(page) {
      this.currentPage = page;
      this.getProductList();
    },
    // 获取产品类目列表
    async getProductCategoryList() {
      const res = await this.$http.post("/api/ProductCategoryList", {});
      if (res.data.result.code === 200) {
        this.categoryList = res.data.result.item;
      } else {
        this.$message.error(res.data.result.msg);
      }
    },
    // 选择综合
    handleSynthesis(flag) {
      if (flag) {
        this.searchForm.fa_no = 0;
        this.searchForm.number = 0;
        this.searchForm.name = 0;
        this.searchForm.packName = 0;
      }
    },
    // 选择筛选
    handleCheckedScreensChange(flag) {
      if (flag) {
        this.synthesis = null;
      }
    },
    // 切换产品列表样式
    handerIsGrid(type) {
      this.isGrid = type;
    },
    // 上一页
    firstEvent() {
      if (this.currentPage === 1) {
        this.$message.error("已经是第一页了");
        return false;
      }
      this.currentPage--;
      this.getProductList();
    },
    // 下一页
    nextEvent() {
      const totalPage = Math.ceil(this.totalCount / this.pageSize);
      if (totalPage <= this.currentPage) {
        this.$message.error("已经是第最后一页了");
        return false;
      }
      this.currentPage++;
      this.getProductList();
    },
    // 一级分类点击事件
    oneTagEvent(item) {
      this.currentTwoTag = null;
      this.oneCurrentTag = item;
      this.cateChildren = item ? item.children : [];
      this.searchForm.categoryNumber = item.id || null;
    },
    // 二级分类点击事件
    twoTagEvent(id) {
      this.currentTwoTag = id;
      this.searchForm.categoryNumber = id;
    },
    // 展开一级分类
    handlerOneCateLabel() {
      this.isOneDownCate = !this.isOneDownCate;
    },
    // 展开二级分类
    handlerTwoCateLabel() {
      this.isTwoDownCate = !this.isTwoDownCate;
    },
    clearRootEvent() {
      eventBus.$off("searchProducts");
      eventBus.$off("openUpload");
    }
  },
  created() {
    this.getProductCategoryList();
    this.getProductList();
  },
  mounted() {
    // 点击搜索-文字搜索
    eventBus.$on("searchProducts", form => {
      this.searchForm.keyword = form.keyword;
      this.currentPage = 1;
      this.getProductList();
    });
    // 图搜
    eventBus.$on("openUpload", file => {
      console.log(file);
    });
  },
  computed: {
    ...mapGetters({
      shoppingList: "myShoppingList"
    })
  },
  beforeDestroy() {
    this.clearRootEvent();
  }
};
</script>
<style scoped lang="less">
@deep: ~">>>";
.productSearch {
  .advancedSearchBox {
    background-color: #fff;
    width: 100%;
    .standardScreening,
    .productClass,
    .twoLevelClass {
      padding: 20px;
      padding-top: 0;
      .myLabel {
        margin-right: 15px;
      }
    }
    @{deep} .standardScreening {
      display: flex;
      .el-checkbox {
        .el-checkbox__input {
          border-radius: 50%;
          .el-checkbox__inner {
            border-radius: 50%;
          }
        }
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
          &.priceUnit,
          &.dateTime {
            cursor: default;
          }
          .screenLabel {
            margin-right: 10px;
            &.active {
              color: #3368a9;
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
    .productListBox {
      background-color: #fff;
      width: 100%;
      padding: 10px;
      padding-bottom: 0;
      box-sizing: border-box;
      .myPagination {
        padding: 30px 0;
      }
    }
  }
}
</style>
