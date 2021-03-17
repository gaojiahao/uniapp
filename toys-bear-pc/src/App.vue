<template>
  <div
    id="app"
    v-loading="$store.state.AppLoading"
    element-loading-spinner
    element-loading-background="rgba(200, 200, 200, 0.5)"
  >
    <router-view />
  </div>
</template>

<style lang="less" scoped>
@deep: ~">>>";
@{deep} .el-loading-spinner .circular {
  width: 100px;
  height: 100px;
  animation: loading-rotate 2s linear infinite;
  display: none;
}
@{deep} .el-loading-mask {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
}
@{deep} .el-loading-spinner {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: url("~@/assets/images/loadding.gif") no-repeat center center;
  background-size: 100px 100px;
  width: 100%;
  height: 100%;
}
</style>
