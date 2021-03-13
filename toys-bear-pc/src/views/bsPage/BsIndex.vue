<template>
  <div class="bsIndex">
    <bsTop />
    <router-view></router-view>
  </div>
</template>

<script>
import bsTop from "@/components/bsComponents/BsTop";
export default {
  components: {
    bsTop
  },
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style scoped lang="scss">
.bsIndex {
  width: 100%;
  height: 100%;
  background-color: #ccc;
}
</style>
