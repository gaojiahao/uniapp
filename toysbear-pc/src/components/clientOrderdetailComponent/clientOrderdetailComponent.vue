<template>
<div>
    <el-card class="box-card">
      <ul class="customerInfoBox">
        <li class="itemBox">
          <span>客户名称：</span>
          <span class="content">{{ tableData.customerName }}</span>
        </li>
        <li class="itemBox">
          <span>订单编号：</span>
          <span class="content">{{ tableData.shareOrderNumber }}</span>
        </li>
        <li class="itemBox">
          <span>生成订单日期：</span>
          <span class="content">{{ tableData.createdOn && tableData.createdOn.replace(/T/, ' ') }}</span>
        </li>
        <li class="itemBox">
          <span>总款数：</span>
          <span class="content">{{ tableData.totalAmount }}</span>
        </li>
      </ul>
    </el-card>
    <el-table
        size="mini"
        :data="tableData.shareOrderDetails && tableData.shareOrderDetails.items"
        style="width:100%"
        ref="dataTable"
        height="600px"
        highlight-current-row
      >
      <el-table-column
      type="selection"
      width="55">
    </el-table-column>
        <el-table-column prop="companyName" label="产品图片" align="center">
          <template slot-scope="scope">
            <el-image fit="contain" style="width: 100px; height:100px;" :preview-src-list="[scope.row.productImage]" :src="scope.row.productImage" lazy>
                    <div
                      slot="placeholder"
                      class="image-slot"
                    >
                      <img
                        class="errorImg"
                        style="width: 100px; height:100px;"
                        src="~@/assets/images/imgError.png"
                        alt
                      />
                    </div>
                    <div
                      slot="error"
                      class="image-slot"
                    >
                      <img
                        class="errorImg"
                        style="width: 100px; height:100px;"
                        src="~@/assets/images/imgError.png"
                        alt
                      />
                    </div>
                  </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="productName" label="产品名称" align="center"></el-table-column>
        <el-table-column prop="productNumber" label="产品编号" align="center"></el-table-column>
        <el-table-column prop="productPrice" label="总价" align="center"></el-table-column>
        <el-table-column prop="productCount" label="产品数" align="center"></el-table-column>
        <!-- <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button
              style="margin-right:10px;"
              size="mini"
              type="primary"
              @click="openOrderDetail(scope.row)"
              >查看订单</el-button
            >
            <el-popconfirm
              title="确定要删除这个版本吗？"
              @onConfirm="handleDelete(scope.row)"
            >
              <el-button size="mini" slot="reference" type="danger"
                >删除</el-button
              >
            </el-popconfirm>
          </template>
        </el-table-column> -->
      </el-table>
      <center style="margin-top:20px;">
         <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          background
          :page-sizes="[10, 20, 30, 50]"
          :page-size="pageSize"
          :total="totalCount"
          :current-page.sync="currentPage"
          @current-change="currentChange"
          @size-change="handleSizeChange"
        ></el-pagination>
      </center>
</div>
</template>

<script>
export default {
  props: ['shareOrderNumber'],
  data () {
    return {
      isOrderDetailDialog: false,
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      totalCount: 0
    }
  },
  methods: {
    // 打开订单详情
    openOrderDetail () {
      this.isOrderDetailDialog = true
    },
    // 获取分享客户订单
    async getSearchCompanyShareOrderDetailsPage () {
      const res = await this.$http.post('/api/SearchCompanyShareOrderDetailsPage', { skipCount: this.currentPage, maxResultCount: this.pageSize, shareOrderNumber: this.shareOrderNumber })
      console.log(res)
      if (res.data.result.code === 200) {
        this.tableData = res.data.result.item
        this.totalCount = res.data.result.item.shareOrderDetails.totalCount
        this.$refs.dataTable.toggleAllSelection()
      } else {
        this.$message.error(res.data.result.msg)
      }
    },
    // 切换当前页
    currentChange (page) {
      this.currentPage = page
      this.getSearchCompanyShareOrderDetailsPage()
    },
    // 切换当前页条数
    handleSizeChange (pageSize) {
      this.pageSize = pageSize
      if (this.currentPage * pageSize > this.totalCount) return false
      this.getSearchCompanyShareOrderDetailsPage()
    }
  },
  created () {
    this.getSearchCompanyShareOrderDetailsPage()
  },
  mounted () {
  }
}
</script>
<style scoped lang='less'>
.customerInfoBox {
  display: flex;
  // align-items: center;
  .itemBox {
    flex: 1;
    margin-right: 5px;
    .content {
      color: #999;
    }
  }
}
</style>
