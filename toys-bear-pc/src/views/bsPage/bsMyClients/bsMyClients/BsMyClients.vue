<template>
  <div class="bsMyClients">
    <div class="title">
      <div class="left">我的客户</div>
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
      <div class="right">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="medium"
          @click="dialogVisible = true"
        >
          新增客户
        </el-button>
      </div>
    </div>
    <div class="tableBox">
      <!-- 客户列表 -->
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column
          align="center"
          prop="name"
          label="客户姓名"
          width="180"
        >
        </el-table-column>
        <el-table-column align="center" prop="tel" label="电话" width="180">
        </el-table-column>
        <el-table-column align="center" prop="emai" label="邮箱" width="180">
        </el-table-column>
        <el-table-column align="center" prop="time" label="创建时间">
        </el-table-column>
        <el-table-column align="center" prop="remark" label="备注">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
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
    <!-- 弹框编辑 -->
    <el-dialog
      title="新增客户"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="clients"
        :rules="rules"
      >
        <el-form-item label="客户姓名" prop="name">
          <el-input
            placeholder="请输入客户姓名"
            v-model="clients.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input
            placeholder="请输入客户邮箱"
            v-model="clients.emai"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="clients.remark"
            maxlength="100"
            show-word-limit
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div style="margin: 20px;"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "bsMyClients",
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      totalCount: 0,
      pageSize: 12,
      currentPage: 1,
      keyword: null,
      dateTime: null,
      showOpen: false,
      labelPosition: "right",
      tableData: [
        {
          time: "2016-05-02",
          name: "王小虎",
          tel: "110",
          remark: "上海市普陀区金沙江路 1518",
          emai: "546132"
        },
        {
          time: "2016-05-04",
          name: "王小虎",
          emai: "546132",
          tel: "110",
          remark: "上海市普陀区金沙江路 1517 "
        }
      ],
      clients: {
        name: "",
        region: "",
        type: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入客户名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    getClientsList() {},
    // 搜索
    search() {
      this.currentPage = 1;
      // this.getClientsList();
    },
    //点击弹框事件
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    //编辑客户
    handleEdit(index, row) {
      this.dialogVisible = true;
      this.clients = row;
      console.log(index, row);
    },
    //删除客户
    handleDelete(index, row) {
      console.log(index, row);
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
.el-dialog__header {
  border-bottom: 1px solid #ebebeb;
}
.bsMyClients {
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
    .right {
      display: flex;
      width: 122px;
      min-width: 122px;
      margin-right: 50px;
    }
  }
}
</style>
