<template>
  <div class="home" id="homeBox">
    <li class="item myItem"></li>
  </div>
</template>

<script>
import RMT from "@/assets/js/signalROptions/signalROptions";
export default {
  name: "Home",
  data() {
    return {
      rtc: null
    };
  },
  methods: {
    async initRMT() {
      this.rtc = new RMT({ groupNumber: "111" });
      this.rtc
        .startCall()
        .then(res => console.log(res))
        .catch(err => {
          switch (err.code) {
            case "DEVICE_NOT_FOUND":
              this.$message.error("找不到设备");
              break;
          }
        });
    }
  },
  created() {
    this.initRMT();
  }
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  background: url("~@/assets/images/ag-index-background.png") center no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-wrap: wrap;
  .item {
    width: 300px;
    height: 300px;
    margin: 10px;
  }
}
</style>
