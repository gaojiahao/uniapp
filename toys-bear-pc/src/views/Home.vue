<template>
  <div class="home">
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>
  </div>
</template>

<script>
import { _POST, getToken } from "@/request/api";
import { onMounted, getCurrentInstance } from "vue";
import { useStore } from "vuex";
export default {
  name: "Home",
  setup() {
    const _that = getCurrentInstance().appContext.config.globalProperties;
    const store = useStore();
    async function getTokenFunc() {
      const res = await _POST(getToken, {
        companyNum: "LittleBearWeb",
        platForm: "PC"
      });
      const { code, item, msg } = res.result;
      console.log(store.state.userInfo.accessToken);
      if (code) _that.$message.success(msg, item);
    }
    onMounted(() => {
      getTokenFunc();
    });
  }
};
</script>
