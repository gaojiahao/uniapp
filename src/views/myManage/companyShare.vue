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
        <el-form-item label="关键字查询">
         <el-input
              @keyup.enter.native="search"
              clearable
              v-model="searchForm.keyword"
              placeholder="输入关键字"
              style="width: 90%"
            ></el-input>
        </el-form-item>
        <!-- <el-form-item label="时间段搜索">
          <el-date-picker
            v-model="searchForm.dateTile"
            value-format="yyyy-MM-ddTHH:mm:ss"
            type="daterange"
            :picker-options="pickerOptions"
            range-separator="—"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          ></el-date-picker>
        </el-form-item> -->
        <el-form-item class="btnList">
          <el-button type="primary" @click="search">查询</el-button>
          <el-button type="primary" @click="openAddClien">新增分享</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 列表 -->
    <div class="tableContent">
      <el-table
        size="mini"
        :data="tableData"
        style="width: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column prop="name" label="客户名称"></el-table-column>
        <el-table-column prop="phoneNumber" label="联系方式"></el-table-column>
        <el-table-column
          prop="createdOn"
          label="创建时间"
          sortable
        >
          <template slot-scope="scope">
            {{ scope.row.createdOn && scope.row.createdOn.replace(/T/g, " ") }}
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              style="margin-right:10px;"
              size="mini"
              type="primary"
              @click="openEdit(scope.row)"
              >编辑</el-button
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
        </el-table-column>
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
    </div>
    <!-- <div style="maxWidth:1200px;minWidth:800px;margin:0 auto;">
    </div> -->
    <!-- 新增编辑分享dialog -->
    <el-dialog :title="dialogTitle" :visible.sync="addClienDialog" destroy-on-close width="40%">
      <el-form
        ref="addClientFormRef"
        label-width="120px"
        :rules="addRules"
        :model="clienFormData"
      >
        <el-form-item label="站点域名：" prop="url">
          <el-input v-model="clienFormData.url" placeholder="请输入站点域名" clearable></el-input>
        </el-form-item>
        <el-form-item label="利润率：" prop="profit">
          <el-input type=number v-model.number="clienFormData.profit" clearable placeholder="请输入利润率"></el-input>
        </el-form-item>
        <!-- <el-form-item label="允许大陆访问：" prop="isOpenChina">
          <el-radio v-model="clienFormData.isOpenChina" :label="0">否</el-radio>
          <el-radio v-model="clienFormData.isOpenChina" :label="1">是</el-radio>
        </el-form-item>
        <el-form-item label="允许导出excel：" prop="isExportExcel">
          <el-input v-model.number="clienFormData.isExportExcel" placeholder="请选择"></el-input>
        </el-form-item> -->
        <el-form-item label="过期时间：" prop="expireTime">
          <el-date-picker
            v-model="clienFormData.expireTime"
            type="datetime"
            placeholder="请选择日期时间"
            align="left"
            value-format="yyyy-MM-ddTHH:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="选择客户：" prop="customerInfoIds">
          <el-select v-model="clienFormData.customerInfoIds" multiple :filter-method="filterMethod" filterable clearable placeholder="请输入客户名或选择客户">
            <el-option
              v-for="item in clientList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <center>
          <template>
            <el-button type="primary" @click="subProcessingLog">提 交</el-button>
            <el-button type="danger" @click="addClienDialog = false">取 消</el-button>
          </template>
        </center>
      </el-form>
    </el-dialog>
  </el-main>
    <el-footer style="padding:0;" height="162px">
      <bsFooter></bsFooter>
    </el-footer>
     </el-container>
</template>

<script>
import bsTop from '@/components/BsTop'
import bsFooter from '@/components/oldFooter'
export default {
  components: { bsTop, bsFooter },
  data () {
    return {
      timer: null,
      clientCurrentPage: 1,
      clientPageSize: 20,
      clientKeyword: '',
      clientListTotalCount: 0,
      clientList: [],
      dialogTitle: '新增分享',
      addClienDialog: false,
      clienFormData: {
        url: null,
        profit: null,
        expireTime: null,
        customerInfoIds: null
      },
      totalCount: 0,
      currentPage: 1,
      pageSize: 10,
      tableData: [],
      addRules: {
        url: [
          { required: true, message: '请输入站点域名', trigger: 'blur' }
        ],
        profit: [
          { required: true, message: '请输入利润率', trigger: 'blur' }
        ],
        expireTime: [
          { required: true, message: '请请选择过期时间', trigger: 'blur' }
        ],
        customerInfoIds: [
          { required: true, message: '请选择客户', trigger: 'blur' }
        ]
      },
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      searchForm: {
        keyword: '',
        dateTile: null
      }
    }
  },
  methods: {
    // 获取客户列表
    async getClientList () {
      const fd = {
        keyword: this.clientKeyword,
        skipCount: this.clientCurrentPage,
        maxResultCount: this.clientPageSize
      }
      for (const key in fd) {
        if (fd[key] === null || fd[key] === undefined || fd[key] === '') {
          delete fd[key]
        }
      }
      const res = await this.$http.post('/companyshare/api/SearchCustomerInfosPage', fd)
      if (res.data.result.code === 200) {
        this.clientList = res.data.result.item.items
        this.clientListTotalCount = res.data.result.item.totalCount
      }
    },
    // 搜索客户
    filterMethod (val) {
      this.clientKeyword = val
      console.log(this.clientKeyword)
      if (this.timer) { // 如果存在延时器就清除
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.getClientList()
      }, 1000)
    },
    // 打开新增分享
    openAddClien () {
      this.dialogTitle = '新增分享'
      this.clienFormData = {
        url: null,
        profit: null,
        expireTime: null,
        customerInfoIds: null
      }
      this.addClienDialog = true
    },
    // 列表查询
    search () {
      this.currentPage = 1
      this.getSearchWebsiteShareInfosPage()
    },
    // 获取列表
    async getSearchWebsiteShareInfosPage () {
      const fd = {
        startTime: this.searchForm.dateTile && this.searchForm.dateTile[0],
        endTime: this.searchForm.dateTile && this.searchForm.dateTile[1],
        keyword: this.searchForm.keyword,
        skipCount: this.currentPage,
        maxResultCount: this.pageSize
      }
      for (const key in fd) {
        if (fd[key] === null || fd[key] === undefined || fd[key] === '') {
          delete fd[key]
        }
      }
      const res = await this.$http.post('/companyshare/api/SearchWebsiteShareInfosPage', fd)
      if (res.data.result.code === 200) {
        this.tableData = res.data.result.item.items
        this.totalCount = res.data.result.item.totalCount
      }
    },
    // 切换当前页
    currentChange (page) {
      this.currentPage = page
      this.getSearchWebsiteShareInfosPage()
    },
    // 切换当前页条数
    handleSizeChange (pageSize) {
      this.pageSize = pageSize
      if (this.currentPage * pageSize > this.totalCount) return false
      this.getSearchWebsiteShareInfosPage()
    },
    // 打开编辑客户
    openEdit (row) {
      this.dialogTitle = '编辑分享'
      for (const key in row) {
        this.clienFormData[key] = row[key]
      }
      this.addClienDialog = true
    },
    // 提交新增 | 编辑 客户
    async subProcessingLog () {
      this.$refs.addClientFormRef.validate(async (valid) => {
        if (valid) {
          let url = '/companyshare/api/CreateWebsiteShare'
          if (this.dialogTitle === '编辑分享') url = '/companyshare/api/UpdateCustomerInfo'
          const res = await this.$http.post(url, this.clienFormData)
          if (res.data.result.code === 200) {
            // await this.getSearchWebsiteShareInfosPage()
            this.addClienDialog = false
            this.clienFormData = {
              name: null,
              phoneNumber: null,
              remark: null
            }
            this.$message.success('操作成功')
          } else {
            this.$message.error(res.data.result.msg)
          }
        }
      })
    },
    // 删除
    async handleDelete (row) {
      const res = await this.$http.post('/companyshare/api/DeleteCustomerInfo?id=' + row.id, {})
      if (res.data.result.code === 200) {
        this.$message.success('删除成功')
        this.getSearchWebsiteShareInfosPage()
      } else {
        this.$message.error('删除失败,请检查网络！')
      }
    }
  },
  watch: {
  },
  mounted () {
    this.getSearchWebsiteShareInfosPage()
    this.getClientList()
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
}
.tableContent {
  padding: 20px 0;
}
@{deep} .el-form{
  .el-input, .el-select{
    width: 100%;
  }
}
</style>
