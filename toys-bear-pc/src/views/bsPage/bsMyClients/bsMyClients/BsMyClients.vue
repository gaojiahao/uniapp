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
        <el-table-column align="center" prop="name" label="电话" width="180">
        </el-table-column>
        <el-table-column
          align="center"
          prop="phoneNumber"
          label="电话"
          width="180"
        >
        </el-table-column>
        <el-table-column align="center" prop="email" label="邮箱" width="180">
        </el-table-column>
        <el-table-column align="center" prop="createdOn" label="创建时间">
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
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        ref="formDataRef"
        :label-position="labelPosition"
        label-width="80px"
        :model="formData"
        :rules="rules"
      >
        <el-form-item label="客户姓名">
          <el-input
            placeholder="请输入客户姓名"
            v-model="formData.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="客户电话">
          <el-input
            placeholder="请输入客户电话"
            v-model="formData.PhoneNumber"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input
            placeholder="请输入客户邮箱"
            v-model="formData.email"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="formData.remark"
            maxlength="100"
            show-word-limit
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div style="margin: 20px;"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <!-- <el-button type="primary" @click="handleAddUpdate">确 定</el-button> -->

        <el-button
          type="primary"
          @click="dialogTitle == '新增客户' ? handleAdd() : handleUpdate()"
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
      dialogTitle: "新增客户",
      dialogVisible: false,
      isEdit: false,
      editRow: {},
      totalCount: 0,
      pageSize: 12,
      currentPage: 1,
      keyword: null,
      dateTime: null,
      showOpen: false,
      labelPosition: "right",
      tableData: [],
      formData: {
        name: null,
        PhoneNumber: null,
        email: null,
        remark: null
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
    async getClientsListPage() {
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
      const res = await this.$http.post("/api/SearchCustomerInfosPage", { fd });
      if (res.data.result.code === 200) {
        this.tableData = res.data.result.item.items;
      }
    },
    // 搜索
    search() {
      this.currentPage = 1;
      this.getClientsListPage();
    },
    //点击弹框事件
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          this.formData = {};
          done();
        })
        .catch(() => {});
    },
    // 关闭弹框
    closeDialog() {
      // console.log(this.formData);
      this.dialogVisible = false;
      this.formData = {
        name: "",
        PhoneNumber: "",
        email: "",
        remark: ""
      };
    },
    //创建客户
    async handleAdd() {
      this.formData = {
        name: "",
        PhoneNumber: "",
        email: "",
        remark: ""
      };
      const data = Object.assign(this.formData, {});
      const res = await this.$http.post("/api/CreateCustomerInfo", data);
      if (res.data.result.code === 200) {
        this.$message.success("新增成功");
        this.closeDialog();
        this.getClientsListPage();
      } else {
        this.$message.error(res.data.result.msg);
      }
    },
    //编辑客户
    async handleEdit(index, row) {
      this.formData = row;
      this.dialogTitle = "编辑客户";
      this.dialogVisible = true;
      this.isEdit = true;
    },
    //编辑客户

    //逻辑还有问题，待解决
    async handleAddUpdate() {
      // this.$refs.formDataRef.validate(async valid => {
      //   if (valid) {
      //     console.log(valid);
      //     let msg = "新增成功";
      //     let url = "/api/CreateCustomerInfo";
      //     if (this.isEdit) {
      //       msg = "编辑成功";
      //       url = "/api/UpdateCustomerInfo";
      //     }
      //     const res = await this.$http.post(url, this.formData);
      //     if (res.data.result.code === 200) {
      //       this.getClientsListPage();
      //       this.showDialog = false;
      //       this.$message.success(msg);
      //     } else {
      //       this.$message.error(res.data.result.msg);
      //     }
      //   }
      // });

      const res = await this.$http.post(
        "/api/UpdateCustomerInfo",
        this.formData
      );
      console.log(res.data, "回调");
      if (res.data.result.code === 200) {
        this.$message.success("编辑成功");
        this.closeDialog();
        this.getClientsListPage();
      } else {
        this.$message.error(res.data.result.msg);
      }
    },
    //删除客户
    async handleDelete(index, row) {
      const res = await this.$http.post("/api/DeleteCustomerInfo?id=" + row.id);
      console.log(res.data, "回调");
      if (res.data.result.code === 200) {
        this.$message.success("删除成功");
        this.getClientsListPage();
      } else {
        this.$message.error(res.data.result.msg);
      }
    },
    // 切換頁容量
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      if (this.currentPage * pageSize > this.totalCount) return false;
      this.getClientsListPage();
    },
    // 修改当前页
    handleCurrentChange(page) {
      this.currentPage = page;
      this.getClientsListPage();
    }
  },
  created() {},
  mounted() {
    this.getClientsListPage();
    // if (this.isEdit) {
    //   for (const key in this.editRow) {
    //     this.formData[key] = this.editRow[key];
    //   }
    // }
  }
};
</script>
<style scoped lang="less">
@deep: ~">>>";
@{deep} .el-table {
  color: #666;
  .nameBox {
    width: 300px;
    display: flex;
    align-items: center;
    .el-avatar {
      color: #3368a9;
      img {
        width: 40px;
        min-height: 40px;
      }
    }
  }
}
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
