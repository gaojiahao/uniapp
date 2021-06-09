<template>
  <div class="my-outbox">
    <div class="my-inbox" ref="box">
      <div class="my-list" v-for="(item, index) in sendVal" :key="index">
        <span class="my-uname">{{ item.title }}</span>
      </div>
      <div
        class="my-list"
        v-for="(item, index) in sendVal"
        :key="(index + 1) * 100"
      >
        <span class="my-uname">{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "my-marquee-left",
  props: {
    sendVal: Array,
    duration: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      timeID: null
    };
  },
  mounted: function() {
    var that = this;
    var target = this.$refs.box;
    var initLeft = 0;
    this.timeID = setInterval(function() {
      initLeft += 0.1;
      if (initLeft >= target.offsetWidth / 2) {
        initLeft = 0;
      }
      target.style = "transform: translateX(-" + initLeft + "px)";
    }, that.duration);
  },
  beforeDestroy() {
    clearInterval(this.timeID);
  }
};
</script>

<style lang="less" scoped>
.my-outbox {
  overflow: hidden;
  height: 35px;
  position: relative;
  .my-inbox {
    white-space: nowrap;
    position: absolute;
    font-size: 0;
    .my-list {
      margin-right: 25px;
      display: inline-block;
      font-size: 13px;
      height: 35px;
      line-height: 35px;
      .my-uname {
        color: #fff;
      }
    }
  }
}
</style>
