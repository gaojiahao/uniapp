<template>
  <div class="relevanceSiteDialog">
    <div class="head">
      <div class="left">
        <el-button size="medium" style="margin:0 5px">批量删除</el-button>
        <el-button size="medium">批量修改链接</el-button>
      </div>
      <div class="right">
        <el-button type="primary" size="medium">+ 添加关联站点</el-button>
      </div>
    </div>
    <el-table
      size="small"
      height="550px"
      ref="multipleTable"
      :data="relevanceSiteDialogData"
      @selection-change="handleSelectionChange"
      tooltip-effect="dark"
      style="width: 100%"
      :header-cell-style="{ backgroundColor: '#f9fafc' }"
    >
      <el-table-column type="selection" align="center" width="50">
      </el-table-column>
      <el-table-column label="序号" type="index" align="center" width="50">
      </el-table-column>
      <el-table-column
        prop="customerName"
        label="站点/客户"
        align="center"
        width="180"
      >
      </el-table-column>
      <el-table-column prop="linkUrl" label="广告链接地址" align="center">
        <template slot-scope="scope">
          <el-input
            @blur="handleUpdataAdvertising(scope.row)"
            v-model="scope.row.linkUrl"
          >
          </el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="120">
        <template slot-scope="scope">
          <div class="handle">
            <div
              class="delete"
              @click="handleDeleteAdvertising(scope.$index, scope.row)"
            >
              删除
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "relevanceSiteDialog",
  props: {
    relevanceSiteDialogData: {
      type: Array
    }
  },
  data() {
    return {
      multipleSelection: []
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 编辑input
    handleUpdataAdvertising(item) {
      const fd = {
        adId: item.adId,
        type: 1,
        relations: [
          {
            id: this.clienFormData.id,
            linkUrl: item.linkUrl
          }
        ]
      };
      this.getUpdate(fd);
    },
    async getUpdate(fd) {
      const res = await this.$http.post(
        "/api/UpdateWebsiteShareAdRelation",
        fd
      );
      if (res.data.result.code === 200) {
        // this.$common.handlerMsgState({
        //   msg: "编辑成功",
        //   type: "success",
        // });
      } else {
        this.$common.handlerMsgState({
          msg: res.data.result.msg,
          type: "danger"
        });
      }
    },
    // 删除单个广告关联
    handleDeleteAdvertising(index) {
      console.log(index);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>
<style scoped lang="less">
@deep: ~">>>";
.relevanceSiteDialog {
  padding-bottom: 15px;
  @{deep} .el-table__header-wrapper .el-checkbox {
    display: block;
    font-size: 13px;
  }
  .head {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .handle {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .delete {
      color: red;
      width: 30px;
    }
  }
}
</style>
