<template>
  <div>
    <el-button type="text" @click="dialogVisible = true"
      >点击打开 Dialog</el-button
    >
    <bsDialog
      :isForm="dialogProp.isForm"
      :isType="dialogProp.isType"
      :dialogMsg="dialogProp.dialogMsg"
      :dialogTitle="dialogProp.dialogTitle"
      :visible.sync="dialogVisible"
      @resetPopupData="resetPopupData"
      @submitPopupData="submitPopupData"
    >
    </bsDialog>
    <el-button type="danger" @click="www">取 消</el-button>
  </div>
</template>

<script>
import bsDialog from "@/components/bsDialog.vue";
export default {
  name: "bsHallSample",
  components: {
    bsDialog
  },
  data() {
    return {
      dialogVisible: false,
      dialogProp: {
        dialogTitle: "删除",
        isType: true,
        isForm: true,
        dialogMsg: ""
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    www() {
      this.$common.handlerDialogState("handlerDialogShow", true);
    },
    // 点击取消事件
    resetPopupData() {
      //  这里可重置数据
      this.dialogVisible = false;
    },
    // 点击确定的按钮
    async submitPopupData(data) {
      this.$common.handlerMsgState({
        msg: "只能上传图片或视频的其中一种文件格式",
        type: "danger"
      });
      console.log(data);
      // this.dialogVisible = false;
    }
  }
};
</script>
<style scoped lang="less"></style>
