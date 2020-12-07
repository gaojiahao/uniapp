<template>
  <el-container>
    <el-header style="padding:0;">
      <bsTop></bsTop>
    </el-header>
    <el-main style="padding:0;overflow:visible;">
    <!-- 搜索 -->
    <div style="maxWidth:1200px;minWidth:1024px;margin:0 auto;">
      <div class="searchBox">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <div style="display:flex;align-items: center;justify-content: space-between;">
          <div style="display:flex;align-items: center;justify-content: space-between;">
          <el-form-item label="关键字查询">
          <el-input
              @keyup.enter.native="search"
              size="mini"
              clearable
              v-model="searchForm.keyword"
              placeholder="输入关键字"
              style="width: 90%"
            ></el-input>
        </el-form-item>
        </div>
        <div class="btnList">
          <el-button size="mini" type="primary" @click="search">查询</el-button>
        </div>
        </div>
      </el-form>
    </div>
    <!-- 列表 -->
    <div class="tableContent">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        :header-cell-style="headerStyle"
        @row-click="rowClick"
      >
        <el-table-column prop="companyName" label="公司名称" align="center"></el-table-column>
        <el-table-column prop="companyNumber" label="公司编号" align="center"></el-table-column>
        <el-table-column prop="phoneNumber" label="联系方式" align="center"></el-table-column>
        <el-table-column prop="createdOn" label="创建时间" sortable  align="center">
        <template slot-scope="scope">
           {{ scope.row.createdOn.split('T')[0] }}
          </template>
        </el-table-column>
      </el-table>
      <center style="margin-top:20px;">
         <el-pagination
         ref="pageRef"
          layout="total, sizes, prev, pager, next, jumper"
          background
          :page-sizes="[10, 20, 30, 50]"
          :page-size="pageSize"
          :current-page.sync="currentPage"
          :total="totalCount"
          @current-change="currentChange"
          @size-change="handleSizeChange"
        ></el-pagination>
      </center>
    </div>
    </div>
  </el-main>
    <el-footer style="padding:0;" height="162px">
      <bsFooter></bsFooter>
    </el-footer>
    <!-- 子订单列表dialog -->
    <el-dialog title="择样订单列表" :visible.sync="sampleListDialog" destroy-on-close width="50%">
      <el-form
        ref="addVersionForm"
        label-width="100px"
        :model="sampleList"
      >
        <el-form-item label="终端" prop="platform">
          <el-input v-model="sampleList.platform" disabled></el-input>
        </el-form-item>
        <el-form-item label="日志类型" prop="logType">
           <el-input v-model="sampleList.logType" disabled></el-input>
        </el-form-item>
        <el-form-item label="日志标题" prop="title">
          <el-input type="textarea" autosize resize="none" v-model="sampleList.title" disabled></el-input>
        </el-form-item>
        <el-form-item label="请求地址" prop="url">
          <el-input type="textarea" autosize resize="none" v-model="sampleList.url" disabled></el-input>
        </el-form-item>
        <el-form-item label="请求参数" prop="parameters">
          <el-input type="textarea" autosize resize="none" v-model="sampleList.parameters" disabled></el-input>
        </el-form-item>
        <el-form-item label="错误信息" prop="message">
          <el-input type="textarea" autosize resize="none" v-model="sampleList.message" disabled></el-input>
        </el-form-item>
        <el-form-item label="报错时间" prop="createdOn">
          <el-input type="textarea" autosize resize="none" v-model="sampleList.createdOn" disabled></el-input>
        </el-form-item>
        <el-form-item label="处理意见" prop="remark">
          <el-input type="textarea" placeholder="请输入处理意见" :rows="4" resize="none" v-model="sampleList.remark"></el-input>
        </el-form-item>
        <center>
          <template>
            <el-button type="primary" @click="subProcessingLog">提 交</el-button>
            <el-button type="danger" @click="errorLogDialog = false">取 消</el-button>
          </template>
        </center>
      </el-form>
    </el-dialog>
     </el-container>
</template>

<script>
// 获取重复手机号封装
import bsTop from '@/components/BsTop'
import bsFooter from '@/components/oldFooter'
export default {
  components: { bsTop, bsFooter },
  data () {
    return {
      sampleListDialog: false,
      sampleList: [],
      sampleTotal: 0,
      companySamplePage: 1,
      companySamplePageSize: 10,
      totalCount: 0,
      currentPage: 1,
      pageSize: 10,
      tableData: [],
      hallList: [],
      clientTypeList: [],
      searchForm: {
        keyword: '',
        hallNumber: '',
        companyType: '',
        isRepeat: null,
        isInstall: false
      }
    }
  },
  methods: {
    // 表头类名
    headerStyle ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex) {
        return 'background-color:#1989fa;color:#fff;font-weight:400;'
      }
      var list = [
        { id: 0 }
      ]
    },
    // 列表查询
    search () {
      this.currentPage = 1
      this.getCompanySamplelistPage()
    },
    // 点击了某行
    rowClick (row) {
      this.companySamplePage = 1
      this.sampleTotal = 0
      this.sampleListDialog = true
      this.getCompanySamplelistByNumber(row.sampleNumber)
    },
    // 获取子列表
    async getCompanySamplelistByNumber (id) {
      const fd = {
        sampleNumber: id,
        skipCount: this.companySamplePage,
        maxResultCount: this.companySamplePageSize
      }
      const res = await this.$http.post('/api/CompanySamplelistByNumber', fd)
      if (res.data.result.code === 200) {
        this.sampleList = res.data.result.item.items
        this.sampleTotal = res.data.result.item.items
      } else {
        this.$message.error(res.data.result.msg)
      }
    },
    // 获取列表
    async getCompanySamplelistPage () {
      const fd = {
        keyword: this.searchForm.keyword,
        skipCount: this.currentPage,
        maxResultCount: this.pageSize
      }
      for (const key in fd) {
        if (fd[key] === null || fd[key] === undefined || fd[key] === '') {
          delete fd[key]
        }
      }
      const res = await this.$http.post('/api/CompanySamplelistPage', fd)
      if (res.data.result.code === 200) {
        this.tableData = res.data.result.item.items
        this.totalCount = res.data.result.item.totalCount
        console.log(this.tableData)
      } else {
        this.tableData = []
        this.totalCount = 0
        if (fd.hallNumber) this.$message.error(res.data.result.msg)
        else this.$message.error('请选择展厅')
      }
    },
    // 表格排序
    sortMethod (a, b) {
      return Number(a.handset) - Number(b.handset)
    },
    // 切换当前页
    currentChange (page) {
      this.currentPage = page
      this.getCompanySamplelistPage()
    },
    // 切换当前页条数
    handleSizeChange (pageSize) {
      this.pageSize = pageSize
      if (this.currentPage * pageSize > this.totalCount) return false
      this.getCompanySamplelistPage()
    }
  },
  watch: {
  },
  mounted () {
    // this.getOrgCompanyList()
    // this.getClientTypeList()
    this.getCompanySamplelistPage()
  },
  created () {}
}
</script>

<style lang="less" scoped>
@deep: ~">>>";
.searchBox {
  padding-top: 50px;
  .btnList {
    float: right;
  }
  .el-form{
    .el-form-item{
      margin: 0;
    }
  }
}
.tableContent {
  padding: 20px 0;
}
</style>
