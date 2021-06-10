<template>
  <div class="advertisementComponent">
    <el-carousel height="550px">
      <el-carousel-item v-for="item in 4" :key="item">
        123456
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    async getWebsiteShareAdByShareIdList() {
      const res = await this.$toys.post("/api/GetWebsiteShareAdByShareIdList", {
        shareId: this.userInfo.shareId
      });
      console.log(res);
      if (res.data.result.code === 200) {
        this.list = res.data.result.item;
      } else {
        this.$message.error(res.data.result.msg);
      }
    }
  },
  created() {},
  mounted() {
    this.getWebsiteShareAdByShareIdList();
  },
  computed: {
    ...mapState(["userInfo"])
  }
};
</script>
<style scoped lang="less">
.advertisementComponent {
  width: 100%;
  height: 551px;
  background-color: #ccc;
}
</style>
