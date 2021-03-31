<template>
  <div class="bsSampleOfferCommodity">
    <div class="hander">
      <div class="left">
        <div
          :class="{ tabs: true, active: typeId === 0 }"
          @click="checkTabstypeId(0)"
        >
          我的收藏
        </div>
        <div
          :class="{ tabs: true, active: typeId === 2 }"
          @click="checkTabstypeId(2)"
        >
          我的找样
        </div>
        <div
          :class="{ tabs: true, active: typeId === 1 }"
          @click="checkTabstypeId(1)"
        >
          所有产品
        </div>
      </div>
      <div class="right">
        <el-button type="primary" round>
          确定已选择({{ myOfferProductList.length }})
        </el-button>
      </div>
    </div>
    <div class="productListBox">
      <!-- 产品列表 -->
      <div class="bsGridComponent">
        <bsSampleOfferProductList
          @ProductList="ProductList"
          v-for="item in productList"
          :key="item.productNumber"
          :item="item"
        />
        <div class="kong"></div>
        <div class="kong"></div>
        <div class="kong"></div>
        <div class="kong"></div>
      </div>

      <!-- 分页 -->
      <center style="padding:20px 0;">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[10, 20, 30, 40]"
          background
          :total="totalCount"
          :page-size="pageSize"
          :current-page.sync="currentPage"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        ></el-pagination>
      </center>
    </div>
  </div>
</template>
<script>
import bsSampleOfferProductList from "@/components/bsComponents/bsSampleComponent/bsSampleOfferProductList";
export default {
  name: "bsSampleOfferCommodity",
  components: {
    bsSampleOfferProductList
  },
  props: {
    item: {
      type: Object
    }
  },
  data() {
    return {
      myOfferProductList: [],
      num: null,
      typeId: 0,
      productList: [],
      isGrid: "bsGridComponent",
      totalCount: 0,
      pageSize: 10,
      currentPage: 1
    };
  },
  created() {},
  mounted() {
    this.getProductList();
  },
  methods: {
    ProductList(data) {
      this.myOfferProductList = data;
    },
    //   产品列表
    async getProductList() {
      const fd = {
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
        typeId: this.typeId
      };
      for (const key in fd) {
        if (fd[key] === null || fd[key] === undefined || fd[key] === "") {
          delete fd[key];
        }
      }
      const res = await this.$http.post("/api/SupplierProduct", fd);
      if (res.data.result.code === 200) {
        this.totalCount = res.data.result.item.totalCount;
        this.productList = res.data.result.item.items;
      }
    },

    //切换
    checkTabstypeId(num) {
      this.typeId = num;
      this.myOfferProductList = [];
      sessionStorage.removeItem("ProductList");
      this.getProductList();
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
    }
  }
};
</script>
<style lang="less" scoped>
.bsSampleOfferCommodity {
  .hander {
    height: 70px;
    font-size: 15px;
    box-sizing: border-box;
    background-color: #fff;
    padding-left: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      border-radius: 4px;
      .tabs {
        width: 100px;
        height: 50px;
        box-sizing: border-box;
        border-bottom: 2px solid transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 15px;
        cursor: pointer;
        &.active {
          font-weight: 700;
          border-color: #3368a9;
          color: #3368a9;
        }
      }
    }
    .right {
      margin-right: 20px;
    }
  }
  .productListBox {
    width: 100%;
    box-sizing: border-box;
    .bsGridComponent {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .kong {
        width: 250px;
        min-width: 250px;
      }
    }
  }
}
</style>
