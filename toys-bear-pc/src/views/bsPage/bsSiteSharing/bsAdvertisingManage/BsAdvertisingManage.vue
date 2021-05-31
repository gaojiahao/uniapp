<template>
  <div class="bsLoginHistory">
    <div class="title">广告管理 ({{ totalCount }})</div>
    <div class="searchBox">
      <div class="left">
        <div class="item">
          <span class="label">关键字：</span>
          <el-input
            v-focus
            type="text"
            size="medium"
            v-model="keyword"
            clearable
            placeholder="请输入关键词"
            @keyup.native.enter="search"
          ></el-input>
        </div>
        <div class="item" v-if="userInfo.userInfo.isMain">
          <span class="label">业务员：</span>
          <el-select
            v-model="userId"
            filterable
            size="medium"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in staffList"
              :key="item.id"
              :label="item.linkman"
              :value="item.id"
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
            type="datetimerange"
            range-separator="至"
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
      <el-button
        @click="handleAddAdvertising"
        type="primary"
        icon="el-icon-plus"
        size="medium"
      >
        新增
      </el-button>
    </div>
    <div class="tableBox">
      <Table :table="tableData"></Table>
      <center style="padding: 20px 0">
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
    <!-- 新增弹框 -->
    <el-dialog :title="dialogTitle" :visible.sync="isDialog" width="600px">
      <el-form label-width="100px" :rules="rules" :model="dialogFromData">
        <el-form-item label="图片标题:" prop="name">
          <el-input
            v-model="dialogFromData.name"
            placeholder="请输入图片标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="广告图片:" prop="contactAddress">
          <el-upload
            style="width:100%"
            size="medium"
            action="/api/File/InsertPic"
            list-type="picture-card"
            ref="upload2"
            :auto-upload="false"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            accept=".jpg,.jpeg,.png,.ico,.bmp,.JPG,.JPEG,.PNG,.ICO,.BMP"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="默认链接:" prop="contactAddress">
          <el-input
            v-model="dialogFromData.name"
            placeholder="请输入默认链接"
          ></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Table from "@/components/table";
export default {
  name: "bsLoginHistory",
  components: {
    Table
  },
  data() {
    return {
      dialogTitle: "",
      isDialog: false,
      staffList: [],
      userId: null,
      keyword: null,
      dateTime: null,
      totalCount: 0,
      pageSize: 10,
      currentPage: 1,
      dialogFromData: {},
      rules: {
        name: [{ required: true, message: "请输入图片标题", trigger: "blur" }]
      },
      tableData: {
        data: [],
        showLoading: false,
        sizeMini: "mini",
        isIndex: true,
        columns: [
          {
            prop: "imgUrl",
            label: "图片",
            elImageUrl: true,
            widht: 200,
            style: "width: 150px; height: 43px; min-width: 82px",
            elImage: row => {
              return row.imgUrl;
            }
          },
          { prop: "siteRegion", label: "广告标题" },
          { prop: "createdBy", label: "业务员" },
          { prop: "email", label: "关联站点数" },
          {
            prop: "createdOn",
            label: "登录时间",
            render: row => {
              return row.createdOn.replace(/T.*/, "");
            }
          }
        ],
        btnWidth: 150,
        actions: [
          {
            type: "primary",
            textWrapper() {
              return "编辑";
            },
            methods: row => {
              console.log(row);
            }
          },
          {
            type: "success",
            textWrapper() {
              return "关联站点";
            },
            methods: row => {
              console.log(row);
            }
          },
          {
            type: "danger",
            textWrapper() {
              return "删除";
            },
            methods: row => {
              console.log(row);
            }
          }
        ]
      }
    };
  },
  methods: {
    // 获取公司下的员工列表
    async getStaffList() {
      const res = await this.$http.post("/api/CompanyUserList", {
        orgCompanyID: this.$store.state.userInfo.commparnyList[0].commparnyId
      });
      if (res.data.result.code === 200) {
        this.staffList = res.data.result.item.personnels;
      } else {
        this.$common.handlerMsgState({
          msg: res.data.result.msg,
          type: "danger"
        });
      }
    },
    // 获取列表
    async GetWebsiteShareAdPage() {
      const fd = {
        skipCount: this.currentPage,
        maxResultCount: this.pageSize,
        keyword: this.keyword,
        userId: this.userId,
        startTime: this.dateTime && this.dateTime[0],
        endTime: this.dateTime && this.dateTime[1]
      };
      for (const key in fd) {
        if (fd[key] === null || fd[key] === undefined || fd[key] === "") {
          delete fd[key];
        }
      }
      const res = await this.$http.post("/api/GetWebsiteShareAdPage", fd);
      if (res.data.result.code === 200) {
        this.totalCount = res.data.result.item.totalCount;
        this.tableData.data = res.data.result.item.items;
      } else {
        this.$common.handlerMsgState({
          msg: res.data.result.msg,
          type: "danger"
        });
      }
    },
    //新增
    handleAddAdvertising() {
      this.dialogTitle = "新增广告图";
      this.isDialog = true;
    },

    async successUpload() {
      // const fd = new FormData();
      // fd.append("BusinessType", "Logo");
      // fd.append("file", );
      // return await this.$http.post("/api/File/InsertPic", fd);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 切換頁容量
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      if (
        this.currentPage * pageSize > this.totalCount &&
        this.currentPage != 1
      )
        return false;
      this.GetWebsiteShareAdPage();
    },
    // 修改当前页
    handleCurrentChange(page) {
      this.currentPage = page;
      this.GetWebsiteShareAdPage();
    },
    // 搜索
    search() {
      this.currentPage = 1;
      this.GetWebsiteShareAdPage();
    }
  },
  created() {
    this.GetWebsiteShareAdPage();
  },
  mounted() {
    this.getStaffList();
  },
  computed: {
    ...mapState(["userInfo"])
  }
};
</script>
<style scoped lang="less">
@deep: ~">>>";
.bsLoginHistory {
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
    .left {
      flex: 1;
      display: flex;
      align-items: center;
      .item {
        display: flex;
        align-items: center;
        max-width: 290px;
        margin-right: 20px;
        .label {
          width: 58px;
          min-width: 58px;
        }
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
  @{deep}.el-upload {
    width: 100%;
  }
}
</style>
