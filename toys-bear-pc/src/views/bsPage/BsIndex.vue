<template>
  <div class="bsIndex">
    <bsTop @handlerIsCollapse="handlerIsCollapse" :isCollapse="isCollapse" />
    <div class="content">
      <div class="leftMenu">
        <bsMenu :isCollapse="isCollapse" />
      </div>
      <div class="rightContent">
        <div class="menuLabels">
          {{ bsMenuLabels }}
        </div>
        <div class="views">
          <div class="viewWrap">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bsTop from "@/components/bsComponents/bsTopComponent/BsTop";
import bsMenu from "@/components/bsComponents/bsMenuComponent/BsMenu";
import { mapState } from "vuex";
export default {
  components: {
    bsTop,
    bsMenu
  },
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    handlerIsCollapse() {
      this.isCollapse = !this.isCollapse;
    }
  },
  computed: {
    ...mapState(["bsMenuLabels"])
  },
  created() {},
  mounted() {}
};
</script>
<style scoped lang="less">
.bsIndex {
  width: 100%;
  height: 100%;
  .content {
    width: 100%;
    height: calc(100% - 70px);
    display: flex;
    min-width: 1350px;
    .leftMenu {
      height: 100%;
      overflow: hidden;
    }
    .rightContent {
      flex: 1;
      height: 100%;
      width: 800px;
      .menuLabels {
        height: 50px;
        width: 100%;
        overflow: hidden;
        background-color: #fff;
      }
      .views {
        padding: 20px;
        box-sizing: border-box;
        height: calc(100% - 50px);
        background-color: #f1f3f6;
        .viewWrap {
          background: #fff;
          height: 100%;
        }
      }
    }
  }
}
</style>
