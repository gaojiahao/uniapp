<template>
  <div class="bsSampleOfferCommodity">
    <div class="hander">
      <div class="left">
        <div
          :class="{ tabs: true, active: isDiyu === 0 }"
          @click="checkTabsAll(0)"
        >
          我的收藏
        </div>
        <div
          :class="{ tabs: true, active: isDiyu === 1 }"
          @click="checkTabsEcommend(1)"
        >
          所有产品
        </div>
      </div>
      <div class="right">
        <el-button type="primary" round>
          确定已选择
        </el-button>
      </div>
    </div>
    <div class="picProductListBox">
      <!-- 产品列表 -->
      <component :is="isGrid" :productList="offerCommodityList"></component>
    </div>
  </div>
</template>
<script>
import bsGridComponent from "@/components/bsComponents/bsProductSearchComponent/bsGridComponent";
export default {
  name: "bsSampleOfferCommodity",
  components: {
    bsGridComponent
  },
  data() {
    return {
      isDiyu: 0,
      offerCommodityList: [],
      isGrid: "bsGridComponent"
    };
  },
  created() {},
  mounted() {},
  methods: {
    async getProductList() {},
    //切换
    checkTabsAll(num) {
      this.isDiyu = num;
    },
    //切换
    checkTabsEcommend(num) {
      this.isDiyu = num;
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
}
</style>
