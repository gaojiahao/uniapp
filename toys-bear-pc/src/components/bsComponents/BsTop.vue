<template>
  <div class="bsTop">
    <div class="logo">
      <el-image
        style="width: 158px;height: 39px;"
        :src="require('@/assets/images/bsLogo.png')"
        fit="contain"
      >
      </el-image>
    </div>
    <div class="topContent"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style scoped lang="scss">
.bsTop {
  width: 100%;
  height: 70px;
  display: flex;
  .logo {
    width: 220px;
    min-width: 220px;
    background-color: #3d76bc;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .topContent {
    height: 100%;
    flex: 1;
    background-color: #3368a9;
  }
}
</style>
