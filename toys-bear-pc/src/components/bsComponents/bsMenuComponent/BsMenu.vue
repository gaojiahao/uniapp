<template>
  <div class="bsMenu">
    <el-scrollbar style="height: 100%;">
      <el-menu
        unique-opened
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        mode="vertical"
        router
        :collapse="isCollapse"
      >
        <el-menu-item index="/bsIndex/bsHome">
          <i class="icon homeIcon"></i>
          <span slot="title">后台首页</span>
        </el-menu-item>
        <el-submenu
          v-for="item in routers"
          :key="item.parent.id"
          :index="item.parent.linkUrl"
        >
          <template slot="title">
            <i
              :class="{
                icon: true,
                productSearchIcon:
                  item.parent.linkUrl === '/bsIndex/bsProductSearchIndex',
                myInfoIcon: item.parent.linkUrl === '/bsIndex/bsInfo',
                businessManageIcon:
                  item.parent.linkUrl === '/bsIndex/bsBusinessManage',
                bsSiteSharingIcon:
                  item.parent.linkUrl === '/bsIndex/bsSiteSharing',
                bsPersonalManageIcon:
                  item.parent.linkUrl === '/bsIndex/bsPersonalManage',
                bsMyClientsIcon: item.parent.linkUrl === '/bsIndex/bsMyClients'
              }"
            ></i>
            <span slot="title">{{ item.parent.name }}</span>
          </template>
          <el-menu-item
            @click="addRouterEvent(item)"
            v-for="item in item.children"
            :key="item.id"
            :index="item.linkUrl"
            >{{ item.name }}</el-menu-item
          >
        </el-submenu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    isCollapse: {
      type: Boolean
    }
  },
  data() {
    return {};
  },
  methods: {
    // 点击菜单时间
    addRouterEvent(route) {
      this.$store.commit("handlerBsMenuLabels", route);
    }
  },
  created() {},
  mounted() {},
  computed: {
    ...mapState(["routers"])
  }
};
</script>
<style scoped lang="less">
@import "./BsMenu.less";
</style>
