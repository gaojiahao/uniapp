<template>
  <div class="contentBox">
    <home-top-component />
    <!-- 广告 -->
    <advertisement-component v-if="$route.path === '/index/home'" />
    <advanced-search
      v-if="$route.path === '/index/product' || $route.path === '/index/home'"
    />
    <router-view class="myRouterView"></router-view>
    <myFoot class="myFoot" />
  </div>
</template>

<script>
import homeTopComponent from "@/components/homeTopComponent/homeTopComponent.vue";
import advancedSearch from "@/components/advancedSearch/advancedSearch.vue";
import advertisementComponent from "@/components/advertisementComponent/advertisementComponent.vue";
import myFoot from "@/components/myFoot/myFoot.vue";
export default {
  components: {
    homeTopComponent,
    advancedSearch,
    advertisementComponent,
    myFoot
  },
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {},
  computed: {
    homeLang() {
      return this.$t("lang.home");
    }
  }
};
</script>
<style scoped lang="less">
@deep: ~">>>";
.contentBox {
  height: 100%;
  .myRouterView {
    min-height: calc(100% - 343px);
  }
  .myFoot {
    margin-top: 20px;
  }
}
</style>
