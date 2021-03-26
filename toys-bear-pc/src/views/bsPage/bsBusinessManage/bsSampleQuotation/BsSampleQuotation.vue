<template>
  <div class="bsSampleQuotation">
    <div class="bsMyCollection" v-if="isUpdata != 1">
      <div class="title">找样报价 ({{ totalCount }})</div>
      <div class="searchBox">
        <div class="item">
          <span class="label">报价单号：</span>
          <el-input
            type="text"
            size="medium"
            v-model="searchForm.OfferNumber"
            placeholder="请输入关键词"
            @keyup.native.enter="search"
          ></el-input>
        </div>
        <div class="item">
          <span class="label">客户名称：</span>
          <el-input
            type="text"
            size="medium"
            v-model="searchForm.CustomerName"
            placeholder="请输入关键词"
            @keyup.native.enter="search"
          ></el-input>
        </div>
        <div class="item">
          <span class="label">人员：</span>
          <el-input
            type="text"
            size="medium"
            v-model="searchForm.Linkman"
            placeholder="请输入关键词"
            @keyup.native.enter="search"
          ></el-input>
        </div>
        <div class="item">
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
          <el-table-column label="报价单号" align="center" min-width="150">
            <template slot-scope="scope">
              <span style="color:#3368A9;cursor: pointer;">
                {{ scope.row.offerNumber }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="linkman"
            label="客户名称"
            width="100"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="createdOn"
            width="150"
            label="报价时间"
            align="center"
          >
            <template slot-scope="scope">
              {{ scope.row.createdOn.replace(/T/, " ") }}
            </template>
          </el-table-column>
          <el-table-column width="200" align="center" label="操作人员">
            <template slot-scope="scope">
              <span>
                {{ scope.row.companyName }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="报价总数"
            prop="total"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column label="总金额" align="center" width="100">
            <template slot-scope="scope">
              <span style="color:#EB1515;">
                {{ scope.row.cu_de }}
              </span>
              <span style="color:#EB1515;">{{ scope.row.totalCost }}</span>
            </template>
          </el-table-column>
          <el-table-column label="币种" align="center">
            <template slot-scope="scope">
              <span>
                {{ scope.row.cu_deName }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="汇率" align="center" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.exchange }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="profit"
            label="利润"
            align="center"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            align="center"
            width="100"
          >
            <template slot-scope="scope">
              {{ scope.row.status }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            header-align="center"
            align="center"
            width="300"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button size="mini" type="info">推送</el-button>
              <el-button size="mini" type="warning">导出</el-button>
              <el-popconfirm
                title="确定要此报价吗？"
                @confirm="handleDelete(scope.row)"
              >
                <el-button
                  style="margin-left: 10px;"
                  size="mini"
                  type="danger"
                  @click.stop
                  slot="reference"
                  >删除</el-button
                >
              </el-popconfirm>
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
    <bsSampleUpdata
      v-if="isUpdata == 1"
      :rowUpdata="rowUpdata"
      @submit="submit"
    >
    </bsSampleUpdata>
  </div>
</template>

<script>
import bsSampleUpdata from "@/components/bsComponents/bsSampleComponent/bsSampleUpdata";
export default {
  name: "bsSampleQuotation",
  components: {
    bsSampleUpdata
  },
  data() {
    return {
      isUpdata: 0,
      rowUpdata: {},
      searchForm: {
        orderNumber: null,
        clientName: null,
        contacts: null,
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
    async getCompanySamplelistPage() {
      const fd = {
        OfferNumber: this.searchForm.OfferNumber,
        CustomerName: this.searchForm.CustomerName,
        Linkman: this.searchForm.Linkman,
        skipCount: this.currentPage,
        maxResultCount: this.pageSize,
        startTime: this.dateTime && this.dateTime[0],
        endTime: this.dateTime && this.dateTime[1]
      };
      for (const key in fd) {
        if (fd[key] === null || fd[key] === undefined || fd[key] === "") {
          delete fd[key];
        }
      }
      const res = await this.$http.post("/api/ProductOfferListByPage", fd);
      if (res.data.result.code === 200) {
        this.totalCount = res.data.result.item.totalCount;
        this.tableData = res.data.result.item.items;
      }
    },
    // 删除找样报价
    async handleDelete(row) {
      const res = await this.$http.post("/api/DeleteProductOffer", {
        id: row.id
      });
      if (res.data.result.code === 200) {
        this.$message.success("删除成功");
        this.getCompanySamplelistPage();
      } else {
        this.$message.error(res.data.result.msg);
      }
    },
    // 切換頁容量
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      if (this.currentPage * pageSize > this.totalCount) return false;
      this.getCompanySamplelistPage();
    },
    // 修改当前页
    handleCurrentChange(page) {
      this.currentPage = page;
      this.getCompanySamplelistPage();
    },
    //编辑报价
    handleEdit(index, row) {
      this.isUpdata = 1;
      this.rowUpdata = row;
    },
    submit(data) {
      this.isUpdata = data;
    },
    // 搜索
    search() {
      this.currentPage = 1;
      this.getCompanySamplelistPage();
    }
  },
  created() {},
  mounted() {
    this.getCompanySamplelistPage();
  }
};
</script>
<style scoped lang="less">
@deep: ~">>>";
.bsSampleQuotation {
  min-height: 100%;
  background-color: #fff;
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
      max-width: 250px;
      margin-right: 20px;
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
