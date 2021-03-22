<template>
  <div class="bsVendorQuery">
    <div class="title">
      <div class="left">厂商查询</div>
    </div>
    <div class="searchBox">
      <div class="left">
        <div class="item">
          <span class="label">关键字：</span>
          <el-input
            type="text"
            size="medium"
            v-model="keyword"
            placeholder="请输入关键词"
            @keyup.native.enter="search"
          ></el-input>
        </div>
        <div class="item">
          <el-button
            @click="search"
            type="primary"
            icon="el-icon-search"
            size="medium"
          >
            搜索
          </el-button>
        </div>
      </div>
    </div>
    <div class="clientList">
      <div class="titleLeft">
        <p>客户列表</p>
        <p>( {{ clienSum }} )</p>
      </div>
    </div>
    <div class="tableBox">
      <!-- 客户列表 -->
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column align="center" prop="user" label="厂商" width="180">
        </el-table-column>
        <el-table-column align="center" prop="name" label="联系人" width="180">
        </el-table-column>
        <el-table-column align="center" prop="phone" label="手机" width="180">
        </el-table-column>
        <el-table-column align="center" prop="tel" label="电话" width="180">
        </el-table-column>
        <el-table-column align="center" prop="site" label="地址">
        </el-table-column>
        <el-table-column
          align="center"
          prop="product"
          label="产品数量"
          width="200"
        >
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <center style="padding:20px 0;">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[12, 24, 36, 48]"
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
export default {
  name: "bsVendorQuery",
  data() {
    return {
      clienSum: "5000",
      totalCount: 0,
      pageSize: 12,
      currentPage: 1,
      keyword: null,
      dateTime: null,
      tableData: [
        {
          user: "厂商",
          name: "王小虎",
          phone: "114",
          tel: "110",
          site: "上海市普陀区金沙江路 1518",
          product: "22"
        },
        {
          user: "厂商",
          name: "王小虎",
          phone: "119",
          tel: "110",
          site: "上海市普陀区金沙江路 1517 ",
          product: "11"
        }
      ]
    };
  },
  methods: {
    // 搜索
    search() {
      this.currentPage = 1;
      // this.getClientsList();
    },
    // 切換頁容量
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      if (this.currentPage * pageSize > this.totalCount) return false;
      this.getProductsList();
    },
    // 修改当前页
    handleCurrentChange(page) {
      this.currentPage = page;
      this.getProductsList();
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped lang="less">
.bsVendorQuery {
  min-height: 100%;
  background-color: #fff;
  padding: 0 20px;
  .title {
    height: 55px;
    font-size: 15px;
    font-weight: 700;
    padding-left: 15px;
    box-sizing: border-box;
    position: relative;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &::before {
      width: 4px;
      height: 14px;
      background-color: #3368a9;
      position: absolute;
      left: 0;
      top: 50%;
      content: "";
      transform: translate(0, -50%);
    }
  }
  .searchBox {
    height: 76px;
    display: flex;
    align-items: center;
    .left {
      flex: 1;
      display: flex;
      align-items: center;
      .item {
        display: flex;
        align-items: center;
        max-width: 258px;
        margin-right: 20px;
        .label {
          width: 58px;
          min-width: 58px;
        }
      }
    }
  }
  .clientList {
    min-height: 100%;
    background-color: #fff;
    padding: 0 20px;
    .titleLeft {
      height: 55px;
      font-size: 15px;
      font-weight: 700;
      padding-left: 15px;
      box-sizing: border-box;
      position: relative;
      border-bottom: 1px solid #e5e5e5;
      display: flex;
      align-items: center;
      p:nth-child(2) {
        font-weight: 500;
      }
    }
  }
}
</style>
