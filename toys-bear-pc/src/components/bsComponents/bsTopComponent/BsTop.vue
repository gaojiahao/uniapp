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
    <div class="topContent">
      <div class="left">
        <div class="isOpen" @click="$emit('handlerIsCollapse')">
          <i class="el-icon-s-fold" v-show="!isCollapse"></i>
          <i class="el-icon-s-unfold" v-show="isCollapse"></i>
        </div>
        <div class="isNotice">
          <i class="laba iconfont icon-laba1"></i>
          <p class="noticeContext">热烈庆祝小竹熊签约优选跨界玩具展厅</p>
        </div>
      </div>
      <div class="right">
        <div class="infoItem">
          <div class="iconBox telephoneIcon"></div>
          <span class="content">热线电话：0754-89671122</span>
        </div>
        <div class="infoItem">
          <div class="iconBox QQIcon"></div>
          <span class="content">客服QQ1</span>
        </div>
        <div class="infoItem">
          <div class="iconBox QQIcon"></div>
          <span class="content">客服QQ2</span>
        </div>
        <div class="line"></div>
        <div class="infoItem">
          <div class="iconBox lingdangIcon"></div>
          <span class="content">我的消息</span>
        </div>
        <div class="line"></div>
        <div class="infoItem">
          <div class="userIcon"></div>
          <span class="content userName">小竹熊云科技公司</span>
        </div>
        <div class="moreBox">
          <i class="moreIcon"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isCollapse: {
      type: Boolean
    }
  },
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style scoped lang="less">
@import "./BsTop.less";
</style>
