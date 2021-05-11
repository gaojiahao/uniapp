<!--
 * @Description: 
 * @Author: gaojiahao
 * @Date: 2021-05-10 15:23:13
 * @FilePath: \projectd:\LittleBearPC\toys-bear-pc\src\views\bsPage\bsBusinessManage\bsSampleDetail\BsSampleDetail.vue
 * @LastEditTime: 2021-05-11 11:52:26
 * @LastEditors: sueRimn
 * @Descripttion: 
 * @version: 1.0.0
-->
<template>
  <div class="bsSampleDetail">
    <div class="title">择样明细</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "bsSampleDetail",
  components: {},
  data() {
    return {};
  },
  methods: {},
  created() {},
  filters: {},
  mounted() {},
  computed: {
    ...mapState(["userInfo"])
  }
};
</script>
<style scoped lang="less">
@deep: ~">>>";
.bsSampleDetail {
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
}
</style>
