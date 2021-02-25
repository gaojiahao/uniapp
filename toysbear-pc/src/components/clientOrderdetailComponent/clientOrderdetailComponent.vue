<template>
<div>
    <el-card class="box-card">
      <div class="infoBox">
        <ul class="customerInfoBox">
          <li class="clientName">
            <span>客户名称：</span>
            <span class="content">{{ tableData.customerName }}</span>
          </li>
          <div class="middle">
            <li class="itemBox">
            <span>订单编号：</span>
            <span class="content">{{ tableData.shareOrderNumber }}</span>
          </li>
          <li class="itemBox">
            <span>生成订单日期：</span>
            <span class="content">{{ tableData.createdOn && tableData.createdOn.replace(/T/, ' ') }}</span>
          </li>
          </div>
          <li class="totlePrice">
            <span>总款数：</span>
            <span class="content">{{ tableData.totalAmount }}</span>
          </li>
        </ul>
        <div class="btns">
          <el-button type="primary" @click="openSelectTemplate">
            <i class="iconfont icon-daochujinruchukou"></i>
            导出订单
          </el-button>
        </div>
      </div>
    </el-card>
    <!-- highlight-current-row -->
    <el-table
        size="mini"
        :data="tableData.shareOrderDetails && tableData.shareOrderDetails.items"
        :header-cell-style="{ backgroundColor: '#2468a9', color: '#fff' }"
        style="width:100%"
        ref="dataTable"
        height="500px"
      >
      <!-- <el-table-column
      type="selection"
      width="55">
    </el-table-column> -->
        <el-table-column fixed label="产品图片" width="82" align="center">
          <template slot-scope="scope">
            <el-image fit="contain" style="width: 60px; height:60px;" :preview-src-list="[scope.row.productImage]" :src="scope.row.productImage" lazy>
                    <div
                      slot="placeholder"
                      class="image-slot"
                    >
                      <img
                        class="errorImg"
                        style="width: 60px; height:60px;"
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
                        style="width: 60px; height:60px;"
                        src="~@/assets/images/imgError.png"
                        alt
                      />
                    </div>
                  </el-image>
          </template>
        </el-table-column>
        <el-table-column fixed prop="fa_no" label="产品货号" align="center"></el-table-column>
        <el-table-column fixed prop="productName" label="名称" align="center"></el-table-column>
        <el-table-column prop="costPrice" label="厂价(¥)" align="center"></el-table-column>
        <el-table-column prop="productPrice" :label="tableData.currencyType ? '客价(' + tableData.currencyType + ')' : '客价'" align="center"></el-table-column>
        <el-table-column label="产品规格(CM)" align="center">
          <el-table-column
            label="长"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.pr_le }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="宽"
            align="center">
             <template slot-scope="scope">
              <span>{{ scope.row.pr_wi }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="高"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.pr_hi }}</span>
            </template>
          </el-table-column>
          <!-- <template slot-scope="scope">
            <div>
              {{ scope.row.pr_le }} x {{ scope.row.pr_wi }} x {{ scope.row.pr_hi }}(cm)
            </div>
          </template> -->
        </el-table-column>
        <el-table-column label="包装规格(CM)" align="center">
          <el-table-column
            label="长"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.in_le }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="宽"
            align="center">
             <template slot-scope="scope">
              <span>{{ scope.row.in_wi }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="高"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.in_hi }}</span>
            </template>
          </el-table-column>
          <!-- <template slot-scope="scope">
            <div>
              {{ scope.row.in_le }} x {{ scope.row.in_wi }} x {{ scope.row.in_hi }}(cm)
            </div>
          </template> -->
        </el-table-column>
        <el-table-column label="外箱规格(CM)" align="center">
          <el-table-column
            label="长"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.ou_le }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="宽"
            align="center">
             <template slot-scope="scope">
              <span>{{ scope.row.ou_wi }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="高"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.ou_hi }}</span>
            </template>
          </el-table-column>
          <!-- <template slot-scope="scope">
            <div>
              {{ scope.row.ou_le }} x {{ scope.row.ou_wi }} x {{ scope.row.ou_hi }}(cm)
            </div>
          </template> -->
        </el-table-column>
        <el-table-column label="毛重/净重(KG)" align="center">
          <el-table-column
            label="毛重"
            align="center">
             <template slot-scope="scope">
              <span>{{ scope.row.gr_we }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="净重"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.ne_we }}</span>
            </template>
          </el-table-column>
          <!-- <template slot-scope="scope">
            <div>
              {{ scope.row.gr_we }}/{{ scope.row.ne_we }}(kg)
            </div>
          </template> -->
        </el-table-column>
        <el-table-column label="体积/材积(CBM/CUFT)" align="center">
          <el-table-column
            label="体积"
            align="center">
             <template slot-scope="scope">
              <span>{{ scope.row.bulk_stere }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="材积"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.bulk_feet }}</span>
            </template>
          </el-table-column>
          <!-- <template slot-scope="scope">
            <div>
              {{ scope.row.bulk_stere }}(cbm)/{{ scope.row.bulk_feet }}(cuft)
            </div>
          </template> -->
        </el-table-column>
        <el-table-column label="厂商资料" align="center">
          <el-table-column
            prop="supplierName"
            label="厂名"
            align="center">
          </el-table-column>
          <el-table-column
            prop="supplierTelephoneNumber"
            label="电话"
            align="center">
          </el-table-column>
          <el-table-column
            prop="supplierPhone"
            label="手机"
            align="center">
          </el-table-column>
        </el-table-column>
        <el-table-column label="展厅来源" align="center" prop="exhibitionName">
        </el-table-column>
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
      <!-- 导出订单模板dialog -->
    <transition name="el-zoom-in-center">
      <el-dialog title="订单模板" append-to-body v-show="exportTemplateDialog" :visible.sync="exportTemplateDialog" top="60px" width="80%">
        <!-- <div class="box" style="height:500px;"> -->
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>模板一</span>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              模板一
            </div>
          </el-card>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>模板一</span>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              模板一
            </div>
          </el-card>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>模板一</span>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              模板一
            </div>
          </el-card>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>模板一</span>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              模板一
            </div>
          </el-card>
      </el-dialog>
    </transition>
</div>
</template>

<script>
export default {
  props: ['shareOrderNumber'],
  data () {
    return {
      exportTemplateDialog: false,
      isOrderDetailDialog: false,
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      totalCount: 0
    }
  },
  methods: {
    // 打开选择导出模板
    openSelectTemplate () {
      this.exportTemplateDialog = true
    },
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

  .infoBox {
    display: flex;
    align-items: center;
    .customerInfoBox {
      flex: 1;
      display: flex;
      .middle {
        flex: 1;
        display: flex;
        justify-content: space-evenly;
          .itemBox {
          display: flex;
          justify-content: center;
          font-weight: bold;
          .content {
            color: #999;
            font-weight: normal;
          }
        }
      }
      .totlePrice,
      .clientName {
        font-weight: bold;
        .content {
          color: #999;
          font-weight: normal;
        }
      }
    }
    .btns {
        margin-left: 20px;
        height: 100%;
        display: flex;
        align-items: center;
        .el-button--primary {
          color: #FFF;
          background-color: #2468a9;
          border-color: #2468a9;
        }
      }
  }
</style>
