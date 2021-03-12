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
export default {
  name: "Home",
  mounted() {
    _POST(getToken, {
      companyNum: "LittleBearWeb",
      platForm: "PC"
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
