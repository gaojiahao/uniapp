<template>
  <div class="box">
    <div class="searchInput">
      <span class="label">产品搜索:</span>
      <el-input
        size="medium"
        @keyup.native.enter="searchProducts"
        style="width: 340px; margin: 0 15px;"
        placeholder="请输入搜索内容"
        v-model="searchForm.keyword"
        clearable
      >
      </el-input>
      <el-button
        size="medium"
        @click="searchProducts"
        type="primary"
        icon="el-icon-search"
        >搜 索</el-button
      >
    </div>
    <el-button type="warning" size="medium">
      <i class="whiteCart"></i>
      <span>购物车</span>
      <span>(2)</span>
    </el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {
        keyword: ""
      }
    };
  },
  methods: {
    // 文本搜索产品
    searchProducts() {
      console.log(this.searchForm);
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped lang="less">
.box {
  width: 100%;
  display: flex;
  padding: 20px;
  background: #fff;
  box-sizing: border-box;
  .searchInput {
    flex: 1;
    display: flex;
    align-items: center;
  }
  .whiteCart {
    display: inline-block;
    vertical-align: bottom;
    width: 14px;
    height: 14px;
    background: url("~@/assets/images/whiteCart.png") no-repeat center;
    background-size: contain;
    margin-right: 10px;
  }
}
</style>
