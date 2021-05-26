<template>
  <div class="codeBox">
    <div class="companyInfoBox">
      <el-image
        style="width: 60px;height: 60px;border-radius: 60px;"
        :src="QRcodeValue && QRcodeValue.avatar"
        fit="contain"
      >
        <div
          slot="placeholder"
          class="image-slot"
          style="width: 60px;height: 60px;border-radius: 60px;"
        >
          <img
            style="width: 60px;height: 60px;border-radius: 60px;"
            :src="require('@/assets/images/imgError.png')"
          />
        </div>
        <div
          slot="error"
          class="image-slot"
          style="width: 60px;height: 60px;border-radius: 60px;"
        >
          <img
            style="width: 60px;height: 60px;border-radius: 60px;"
            :src="require('@/assets/images/imgError.png')"
          />
        </div>
      </el-image>
    </div>
    <!-- {{ QRcodeValue }} -->
  </div>
</template>

<script>
export default {
  props: ["QRcodeValue"],
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style scoped lang="less">
.codeBox {
  width: 100%;
  height: 250px;
  .companyInfoBox {
    margin-top: 10px;
    height: 60px;
    background-color: skyblue;
  }
}
</style>
