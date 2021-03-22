<template>
  <div class="bsMyCollection">
    <div class="title">展厅业务 ({{ totalCount }})</div>
    <div class="searchBox">
      <div class="item">
        <span class="label">关键字：</span>
        <el-input
          type="text"
          size="medium"
          v-model="searchForm.keyword"
          placeholder="请输入关键词"
          @keyup.native.enter="search"
        ></el-input>
      </div>
      <div class="item">
        <span class="label">择样类型：</span>
        <el-input
          type="text"
          size="medium"
          v-model="searchForm.type"
          placeholder="请输入关键词"
          @keyup.native.enter="search"
        ></el-input>
      </div>
      <div class="item">
        <span class="label">展厅名称：</span>
        <el-input
          type="text"
          size="medium"
          v-model="searchForm.hallName"
          placeholder="请输入关键词"
          @keyup.native.enter="search"
        ></el-input>
      </div>
      <div class="item">
        <span class="label">状态：</span>
        <el-input
          type="text"
          size="medium"
          v-model="searchForm.state"
          placeholder="请输入关键词"
          @keyup.native.enter="search"
        ></el-input>
      </div>
      <div class="item">
        <span class="label">人员：</span>
        <el-input
          type="text"
          size="medium"
          v-model="searchForm.person"
          placeholder="请输入关键词"
          @keyup.native.enter="search"
        ></el-input>
      </div>
      <div class="item date">
        <span class="label">时间段：</span>
        <el-date-picker
          size="medium"
          value-format="yyyy-MM-ddTHH:mm:ss"
          v-model="searchForm.dateTime"
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
      <el-table
        :data="tableData"
        style="width: 100%"
        ref="collecTable"
        :header-cell-style="{ 'font-size': '14px', color: '#666' }"
      >
        <el-table-column label="择样单号">
          <template slot-scope="scope">
            {{ scope.row.orderNumber }}
          </template>
        </el-table-column>
        <el-table-column
          prop="fa_no"
          label="择样类型"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="ch_pa"
          label="本次代号"
          align="center"
          width="100"
        >
        </el-table-column>
        <el-table-column label="择样日期" align="center">
          <template slot-scope="scope">
            <span>
              {{ scope.row.createOn }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="zhekou" label="折扣" align="center" width="100">
        </el-table-column>
        <el-table-column prop="hallName" label="展厅名称" align="center">
        </el-table-column>
        <el-table-column prop="remove" label="备注" align="center">
        </el-table-column>
        <el-table-column prop="state" label="状态" align="center" width="100">
          <template slot-scope="scope">
            <span style="color:#f56c6c"> {{ scope.row.cu_de }} 未查看 </span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          header-align="center"
          align="center"
          width="100"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="warning"
              @click="handleDelete(scope.row)"
            >
              导出
            </el-button>
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
  name: "bsMyCollection",
  data() {
    return {
      searchForm: {
        keyword: null,
        type: null,
        hallName: null,
        state: null,
        person: null,
        dateTime: null
      },
      tableData: [],
      totalCount: 0,
      pageSize: 10,
      currentPage: 1
    };
  },
  methods: {
    // 获取列表
    async getTableDataList() {
      const fd = {
        skipCount: this.currentPage,
        maxResultCount: this.pageSize,
        keyword: this.searchForm.keyword,
        startTime: this.searchForm.dateTime && this.searchForm.dateTime[0],
        endTime: this.searchForm.dateTime && this.searchForm.dateTime[1]
      };
      for (const key in fd) {
        if (fd[key] === null || fd[key] === undefined || fd[key] === "") {
          delete fd[key];
        }
      }
      const res = await this.$http.post("/api/ProductCollectionPage", fd);
      if (res.data.result.code === 200) {
        this.totalCount = res.data.result.item.totalCount;
        this.tableData = res.data.result.item.items;
      }
    },
    // 取消收藏
    handleDelete(row) {
      console.log(row);
    },
    // 切換頁容量
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      if (this.currentPage * pageSize > this.totalCount) return false;
      this.getTableDataList();
    },
    // 修改当前页
    handleCurrentChange(page) {
      this.currentPage = page;
      this.getTableDataList();
    },
    // 搜索
    search() {
      this.currentPage = 1;
      this.getTableDataList();
    }
  },
  created() {
    this.getTableDataList();
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
      max-width: 200px;
      margin-right: 20px;
      &.date {
        min-width: 300px;
      }
      .label {
        width: 70px;
        min-width: 70px;
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
