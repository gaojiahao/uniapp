<template>
  <div class="bsIndex">
    <bsTop @handlerIsCollapse="handlerIsCollapse" :isCollapse="isCollapse" />
    <div class="content">
      <div class="leftMenu">
        <bsMenu :isCollapse="isCollapse" />
      </div>
      <div class="rightContent">
        <div class="menuLabels">
          <el-scrollbar style="height: 58px;">
            <div
              :class="{ tab: true, isActive: item.linkUrl === $route.path }"
              v-for="item in bsMenuLabels"
              @click="switchTab(item)"
              :key="item.linkUrl"
            >
              <div class="tabItem">
                <span class="tabName">{{ item.name }}</span>
                <i
                  class="closeTab el-icon-error"
                  @click.stop="closeTabEvent(item)"
                ></i>
              </div>
            </div>
          </el-scrollbar>
          <div class="clearAll" @click="closeAll">
            <i class="el-icon-close"></i>
          </div>
        </div>
        <div class="views">
          <el-collapse-transition>
            <div class="positionSearchBox" v-show="showSearch">
              <bsProductSearch />
            </div>
          </el-collapse-transition>
          <el-scrollbar style="height: 100%;" ref="scrollbar">
            <keep-alive :include="keepAliveArr">
              <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bsTop from "@/components/bsComponents/bsTopComponent/BsTop";
import bsMenu from "@/components/bsComponents/bsMenuComponent/BsMenu";
import bsProductSearch from "@/components/bsComponents/bsProductSearchComponent/bsProductSearch";
import { mapState, mapGetters } from "vuex";
export default {
  components: {
    bsTop,
    bsMenu,
    bsProductSearch
  },
  data() {
    return {
      isCollapse: false,
      showSearch: false
    };
  },
  methods: {
    // 滚动事件
    handleScroll() {
      if (this.$route.path === "/bsIndex/bsProductSearchIndex") {
        let scrollbarEl = this.$refs.scrollbar.wrap;
        scrollbarEl.onscroll = () => {
          if (scrollbarEl.scrollTop >= 200) {
            this.showSearch = true;
          } else {
            this.showSearch = false;
          }
        };
      }
    },
    // 关闭所有tab标签
    closeAll() {
      this.$confirm("此操作将关闭所有标签页, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "关闭成功!"
          });
          this.$store.commit("clearAllTab", [
            {
              linkUrl: "/bsIndex/bsHome",
              name: "后台首页"
            }
          ]);
          this.$router.push("/bsIndex/bsHome");
        })
        .catch(() => {
          this.$message({
            type: "warning",
            message: "已取消删除"
          });
        });
    },
    // 展开菜单
    handlerIsCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    // 切换页签
    switchTab(item) {
      this.$router.push(item.linkUrl);
    },
    // 关闭tab页签
    closeTabEvent(item) {
      if (
        this.bsMenuLabels.length === 1 &&
        item.linkUrl === "/bsIndex/bsHome"
      ) {
        return false;
      }
      this.$store.commit("subBsMenuLabels", item);
      if (this.$route.path === item.linkUrl) {
        if (this.bsMenuLabels.length) {
          const routerLink = this.bsMenuLabels[this.bsMenuLabels.length - 1]
            .linkUrl;
          this.$router.push(routerLink);
        } else {
          this.$router.push("/bsIndex/bsHome");
          this.$store.commit("handlerBsMenuLabels", {
            linkUrl: "/bsIndex/bsHome",
            name: "后台首页"
          });
        }
      }
    }
  },
  computed: {
    ...mapState(["bsMenuLabels"]),
    ...mapGetters(["keepAliveArr"])
  },
  created() {},
  mounted() {
    if (!this.bsMenuLabels.length) {
      this.$store.commit("handlerBsMenuLabels", {
        linkUrl: "/bsIndex/bsHome",
        name: "后台首页"
      });
    }
    this.handleScroll();
  }
};
</script>
<style scoped lang="less">
@deep: ~">>>";
.bsIndex {
  width: 100%;
  height: 100%;
  .content {
    width: 100%;
    height: calc(100% - 70px);
    display: flex;
    min-width: 1350px;
    background-color: #fff;
    .leftMenu {
      height: 100%;
      box-sizing: border-box;
      position: relative;
      z-index: 2;
      // box-shadow: 0px 3px 0px 0px rgba(42,69,116,0.16);
    }
    .rightContent {
      flex: 1;
      height: 100%;
      width: 800px;
      .menuLabels {
        height: 50px;
        width: 100%;
        box-sizing: border-box;
        background-color: #fff;
        box-shadow: 0px 0px 2px 0px rgba(42, 69, 116, 0.16);
        position: relative;
        z-index: 1;
        display: flex;
        .el-scrollbar {
          flex: 1;
          overflow: hidden;
          padding-right: 2px;
        }
        .clearAll {
          width: 50px;
          min-width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          cursor: pointer;
        }
        @{deep} .el-scrollbar__wrap {
          width: 100%;
          overflow-x: hidden;
          overflow-y: hidden;
          .el-scrollbar__view {
            width: 100%;
            padding-left: 20px;
            height: 100%;
            white-space: nowrap;
          }
        }
        .tab {
          display: inline-block;
          width: 110px;
          height: 40px;
          opacity: 1;
          background: #ffffff;
          border: 1px solid #dcdfe6;
          border-bottom-color: transparent;
          margin-right: 10px;
          margin-top: 7px;
          text-align: center;
          cursor: pointer;
          &.isActive {
            border-top-width: 2px;
            border-top-color: #3368a9;
            font-weight: 700;
            .tabItem {
              .tabName {
                color: #3368a9;
              }
            }
          }
          .tabItem {
            width: 100%;
            height: 100%;
            position: relative;
            .tabName {
              display: block;
              padding: 0 5px;
              line-height: 40px;
              box-sizing: border-box;
              width: 100%;
              height: 100%;
              overflow: hidden; /*超出部分隐藏*/
              white-space: nowrap; /*不换行*/
              text-overflow: ellipsis; /*超出部分文字以...显示*/
            }
            .closeTab {
              font-size: 16px;
              position: absolute;
              right: -7px;
              top: -5px;
              color: #b9b9b9;
              &:hover {
                color: #3368a9;
              }
            }
          }
        }
      }
      .views {
        padding: 20px;
        box-sizing: border-box;
        height: calc(100% - 50px);
        background-color: #f1f3f6;
        position: relative;
        overflow: hidden;
        box-sizing: border-box;
        .positionSearchBox {
          width: 100%;
          align-items: center;
          justify-content: space-between;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 8888;
          box-shadow: 0px 0px 3px 0px rgba(42, 69, 116, 0.16);
        }
        .viewWrap {
          background: #fff;
          height: 100%;
        }
      }
    }
  }
}
@{deep} .el-scrollbar__wrap {
  overflow-x: hidden;
  .el-scrollbar__view {
    width: 100%;
    height: 100%;
  }
}
</style>
