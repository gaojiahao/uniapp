<template>
  <div class="bsDialog">
    <el-dialog
      style="min-height:400px"
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form v-if="isForm" label-width="100px" :model="dialogFormData">
        <el-form-item label="客户名称" prop="name">
          <el-input
            v-model="dialogFormData.name"
            placeholder="请输入客户名称"
          ></el-input>
        </el-form-item>
      </el-form>
      <p v-else>{{ dialogMsg }}</p>

      <center>
        <span slot="footer" class="dialog-footer">
          <el-button
            :type="isType == false ? 'primary' : 'danger'"
            @click="Save"
            >确 定</el-button
          >
          <el-button @click="handleClose">取 消</el-button>
        </span>
      </center>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "bsDialog",
  props: {
    isForm: {
      type: Boolean,
      default: false
    },
    isType: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible;
      },
      set() {}
    }
  },

  data() {
    return {
      dialogFormData: {
        name: null
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 点击确定按钮回调
    Save() {
      this.$emit("submitPopupData", this.dialogFormData);
    },
    // 关闭弹框
    handleClose() {
      this.$emit("resetPopupData");
    }
  }
};
</script>
<style lang="less">
@deep: ~">>>";
@{deep} .bsDialog {
  .el-dialog__wrapper {
    .el-dialog__header {
      height: 50px;
      background-color: red;
    }
  }
}
</style>
