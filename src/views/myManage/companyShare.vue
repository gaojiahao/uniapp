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
          <el-button type="primary" @click="openLoginLog">访问记录</el-button>
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
        ref="multipleTable"
        style="width: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
        @row-click="rowClick"
        >
        <el-table-column type="expand">
           <template slot-scope="props">
             <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="客户：">
                <el-tag style="margin-left:20px;" v-for="(item, i) in props.row.customerInfos" :key="i">{{ item.name }}</el-tag>
              </el-form-item>
            </el-form>
           </template>
        </el-table-column>
        <el-table-column prop="shareUrl" label="网址"></el-table-column>
        <el-table-column prop="verifyCode" label="登录码" width="100"></el-table-column>
        <el-table-column prop="profit" label="利率" width="50"></el-table-column>
        <el-table-column
          prop="createdOn"
          label="创建时间"
          width="150"
          align="center"
          sortable
        >
          <template slot-scope="scope">
            {{ scope.row.createdOn && scope.row.createdOn.replace(/T/g, " ") }}
          </template>
        </el-table-column>
        <el-table-column
          prop="expireTime"
          label="有效期"
          width="150"
          align="center"
          sortable
        >
          <template slot-scope="scope">
            {{ scope.row.expireTime && scope.row.expireTime.replace(/T/g, " ") }}
          </template>
        </el-table-column>
        <el-table-column label="操作"  width="200" align="center">
          <template slot-scope="scope">
            <el-button
              style="margin-right:10px;"
              size="mini"
              type="primary"
              @click.stop="openEdit(scope.row)"
              >编辑</el-button
            >
            <el-popconfirm
              title="确定要删除这个版本吗？"
              @onConfirm="handleDelete(scope.row)"
            >
              <el-button size="mini" @click.stop slot="reference" type="danger"
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
        <div class="formItemBox">
          <el-form-item label="报价方式：" prop="offerMethod">
            <el-select v-model="clienFormData.offerMethod" placeholder="请选择报价方式">
              <el-option
                v-for="(item, i) in options.offerMethod"
                :key="i"
                :label="item.itemCode"
                :value="item.parameter">
            </el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="利润率：" prop="profit">
            <el-input v-model="clienFormData.profit" placeholder="请输入利润率">
              <span slot="suffix">%</span>
            </el-input>
          </el-form-item>
        </div>
        <div class="formItemBox">
          <el-form-item label="币种：" prop="currencyType">
            <el-select v-model="clienFormData.currencyType" placeholder="请选择币种">
              <el-option
                v-for="(item, i) in options.cu_deList"
                :key="i"
                :label="item.itemCode"
                :value="item.parameter">
            </el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="总费用：" prop="totalCost">
            <el-input v-model="clienFormData.totalCost" clearable placeholder="请输入总费用">
            </el-input>
          </el-form-item>
        </div>
        <div class="formItemBox">
          <el-form-item label="汇率：" prop="exchange">
            <el-input v-model="clienFormData.exchange" clearable placeholder="请输入汇率"></el-input>
          </el-form-item>
          <el-form-item label="每车尺码：" prop="size">
            <el-select v-model="clienFormData.size" placeholder="请选择尺码">
              <el-option
                v-for="(item, i) in options.size"
                :key="i"
                :label="item.itemCode"
                :value="item.parameter">
            </el-option>
          </el-select>
          </el-form-item>
        </div>
        <div class="formItemBox">
          <el-form-item label="小数位数：" prop="decimalPlaces">
            <el-select v-model="clienFormData.decimalPlaces" placeholder="请选择小数位数">
              <el-option
                v-for="(item, i) in options.decimalPlaces"
                :key="i"
                :label="item.itemCode"
                :value="item.parameter">
            </el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="取舍方式：" prop="rejectionMethod">
            <el-select v-model="clienFormData.rejectionMethod" placeholder="请选择取舍方式">
              <el-option
                v-for="(item, i) in options.rejectionMethod"
                :key="i"
                :label="item.itemCode"
                :value="item.parameter">
            </el-option>
          </el-select>
          </el-form-item>
        </div>
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
    <!-- 查看访问记录dialog -->
    <el-dialog title="访问记录" :visible.sync="isLoginLog" v-if="isLoginLog" width="50%">
      <accessRecordComponent />
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
import accessRecordComponent from '@/components/accessRecordComponent/accessRecordComponent.vue'
export default {
  components: { bsTop, bsFooter, accessRecordComponent },
  data () {
    return {
      isLoginLog: false,
      options: { // 报价配置项
        cu_deList: [],
        decimalPlaces: [],
        offerMethod: [],
        rejectionMethod: [],
        size: []
      },
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
        customerInfoIds: null,
        offerMethod: '汕头',
        currencyType: '¥',
        currencyTypeName: 'RMB',
        totalCost: '',
        exchange: '',
        size: '24',
        decimalPlaces: '3',
        rejectionMethod: '四舍五入'
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
          { required: true, message: '请选择过期时间', trigger: 'change' }
        ],
        customerInfoIds: [
          { required: true, message: '请选择客户', trigger: 'change' }
        ],
        offerMethod: [
          { required: true, message: '请选择报价方式', trigger: 'change' }
        ],
        currencyType: [
          { required: true, message: '请选择币种', trigger: 'change' }
        ],
        totalCost: [
          { required: true, message: '请输入总费用', trigger: 'blur' }
        ],
        exchange: [
          { required: true, message: '请输入汇率', trigger: 'blur' }
        ],
        size: [
          { required: true, message: '请选择尺寸', trigger: 'change' }
        ],
        decimalPlaces: [
          { required: true, message: '请选择小数位数', trigger: 'change' }
        ],
        rejectionMethod: [
          { required: true, message: '请选择取舍方式', trigger: 'change' }
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
    // 打开查看访问记录
    openLoginLog () {
      this.isLoginLog = true
    },
    // 获取系统配置项
    async getSelectCompanyOffer () {
      const res = await this.$http.post('/api/GetSelectCompanyOffer', {
        basisParameters: 'CompanyProductOffer'
      })
      if (res.data.result.code === 200) this.options = res.data.result.item
      else this.$message.error(res.data.result.msg)
    },
    // 行被点击了
    rowClick (row) {
      this.$refs.multipleTable.toggleRowExpansion(row)
    },
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
      const res = await this.$http.post('/api/SearchCustomerInfosPage', fd)
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
        customerInfoIds: null,
        offerMethod: '汕头',
        currencyType: '¥',
        currencyTypeName: 'RMB',
        totalCost: '',
        exchange: '',
        size: '24',
        decimalPlaces: '3',
        rejectionMethod: '四舍五入'
      }
      this.$nextTick(() => {
        this.addClienDialog = true
      })
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
      const res = await this.$http.post('/api/SearchWebsiteShareInfosPage', fd)
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
      console.log(row)
      this.clienFormData.customerInfoIds = row.customerInfos.map(val => val.id)
      this.addClienDialog = true
    },
    // 提交新增 | 编辑 客户
    async subProcessingLog () {
      this.$refs.addClientFormRef.validate(async (valid) => {
        if (valid) {
          let url = '/api/CreateWebsiteShareInfo'
          if (this.dialogTitle === '编辑分享') url = '/api/UpdateWebsiteShareInfo'
          const res = await this.$http.post(url, this.clienFormData)
          if (res.data.result.code === 200) {
            this.addClienDialog = false
            this.getSearchWebsiteShareInfosPage()
            this.$message.success('操作成功')
          } else {
            this.$message.error(res.data.result.msg)
          }
        }
      })
    },
    // 删除
    async handleDelete (row) {
      const res = await this.$http.post('/api/DeleteWebsiteShareInfo?id=' + row.id, {})
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
  created () {
    this.getSelectCompanyOffer()
  }
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
  .formItemBox {
    display: flex;
    justify-content: space-between;
  }
}
</style>
