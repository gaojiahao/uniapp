<template>
  <div class="bsMyCollection">
    <div class="title">我的收藏 ({{ totalCount }})</div>
    <div class="searchBox">
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
      <div class="item" style="width:200px;">
        <span class="label">站点：</span>
        <el-select
          v-model="zhandian"
          size="medium"
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="item in []"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="item">
        <span class="label">时间段：</span>
        <el-date-picker
          size="medium"
          value-format="yyyy-MM-ddTHH:mm:ss"
          v-model="dateTime"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
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
    <div class="tableBox">
      <el-table :data="tableData" style="width:100%;">
        <el-table-column prop="orderNumber" label="订单编号">
          <template slot-scope="scope">
            <div class="orderNumberBox">
              <i class="el-icon-tickets"></i>
              <span>{{ scope.row.orderNumber }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="orderNumber"
          width="150"
          label="站点"
          align="center"
        ></el-table-column>
        <el-table-column prop="orderNumber" label="网址"></el-table-column>
        <el-table-column
          prop="companyName"
          label="客户"
          align="center"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="companyName"
          label="订单总数"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="totalAmount"
          label="总价"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <span style="color:#ff0b00;">
              {{ scope.row.totalAmount }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="totalAmount"
          label="下单时间"
          width="150"
          align="center"
        >
          <template slot-scope="scope">
            <span style="color:#ff0b00;">
              {{ scope.row.totalAmount }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button
              style="margin-right:10px;"
              size="mini"
              type="primary"
              @click="openOrderDetail(scope.row)"
              >导出</el-button
            >
          </template>
        </el-table-column>
      </el-table>
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
export default {
  data() {
    return {
      zhandian: null,
      keyword: null,
      dateTime: null,
      tableData: [],
      totalCount: 0,
      pageSize: 10,
      currentPage: 1
    };
  },
  methods: {
    // 获取列表
    async getSearchCompanyShareOrdersPage() {
      const fd = {
        skipCount: this.currentPage,
        maxResultCount: this.pageSize,
        keyword: this.keyword,
        startTime: this.dateTime && this.dateTime[0],
        endTime: this.dateTime && this.dateTime[1]
      };
      for (const key in fd) {
        if (fd[key] === null || fd[key] === undefined || fd[key] === "") {
          delete fd[key];
        }
      }
      const res = await this.$http.post(
        "/api/SearchCompanyShareOrdersPage",
        fd
      );
      if (res.data.result.code === 200) {
        this.totalCount = res.data.result.item.totalCount;
        this.tableData = res.data.result.item.items;
      }
    },
    // 取消收藏
    async handleDelete(row) {
      const res = await this.$http.post("/api/CreateProductCollection", {
        productNumber: row.productNumber
      });
      if (res.data.result.code === 200) {
        this.$message.success("取消收藏成功");
        this.getSearchCompanyShareOrdersPage();
      } else {
        this.$message.error(res.data.result.msg);
      }
    },
    // 切換頁容量
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      if (this.currentPage * pageSize > this.totalCount) return false;
      this.getSearchCompanyShareOrdersPage();
    },
    // 修改当前页
    handleCurrentChange(page) {
      this.currentPage = page;
      this.getSearchCompanyShareOrdersPage();
    },
    // 搜索
    search() {
      this.currentPage = 1;
      this.getSearchCompanyShareOrdersPage();
    }
  },
  created() {
    this.getSearchCompanyShareOrdersPage();
  },
  mounted() {}
};
</script>
<style scoped lang="less">
@deep: ~">>>";
.bsMyCollection {
  min-height: 100%;
  background-color: #fff;
  padding: 0 20px;
  .title {
    height: 55px;
    line-height: 55px;
    font-size: 15px;
    font-weight: 700;
    padding-left: 15px;
    box-sizing: border-box;
    position: relative;
    border-bottom: 1px solid #e5e5e5;
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
  @{deep} .tableBox {
    .el-table {
      font-size: 13px;
      .imgBox {
        text-align: left;
        display: flex;
        font-size: 14px;
        .productName {
          width: 190px;
          height: 60px;
          margin-left: 15px;
          .name,
          .factory {
            width: 190px;
            max-width: 190px;
            overflow: hidden; /*超出部分隐藏*/
            white-space: nowrap; /*不换行*/
            text-overflow: ellipsis; /*超出部分文字以...显示*/
          }
          .factory {
            color: #3368a9;
          }
          .name {
            margin-top: 8px;
          }
        }
      }
    }
    .errorImg {
      img {
        width: 80px;
        height: 60px;
      }
    }
  }
}
</style>
