<template>
  <div class="homeWrap">
    <new-productList
      v-if="homeData.newProducts.length"
      :products="homeData.newProducts"
    />
    <homeProduct
      v-if="homeData.products.length"
      :products="homeData.products"
    />
  </div>
</template>

<script>
import newProductList from "@/components/newProductList/newProductList.vue";
import homeProduct from "@/components/homeProduct/homeProduct.vue";
import { mapState } from "vuex";
export default {
  components: {
    newProductList,
    homeProduct
  },
  data() {
    return {
      homeData: {
        newProducts: [],
        products: []
      }
    };
  },
  methods: {
    // 获取首页数据
    async getCompanyShareIndex() {
      const res = await this.$http.get(
        "/api/WebsiteShare/GetCompanyShareIndex"
      );
      const { data, code } = res.data.result;
      if (code === 200) {
        this.homeData = data;
      }
    }
  },
  created() {
    document.title = this.homeLang.home;
  },
  computed: {
    homeLang() {
      return this.$t("lang.home");
    },
    ...mapState(["userInfo"])
  },
  watch: {
    "$store.state.globalLang"(val) {
      if (val) document.title = this.homeLang.home;
    }
  },
  mounted() {
    this.getCompanyShareIndex();
    // 加购事件
    this.$root.eventHub.$on("handHomeShopCart", item => {
      let api = "/api/AddShoppingCart";
      if (item.isShop) {
        api = "/api/RemoveShoppingCart";
      }
      this.$toys
        .post(api, {
          shareID: this.userInfo.shareId,
          customerRemarks: this.userInfo.loginEmail,
          sourceFrom: "share",
          shopType: "customersamples",
          number: 1,
          currency: "￥",
          Price: 0,
          productNumber: item.productNumber
        })
        .then(res => {
          if (res.data.result.code === 200) {
            item.isShop = !item.isShop;
            this.$store.commit("handlerShopLength", res.data.result.item);
          } else {
            this.$message.error(res.data.result.msg);
          }
        });
    });
  },
  beforeDestroy() {
    this.$root.eventHub.$off("handHomeShopCart");
  }
};
</script>
<style scoped lang="less">
.homeWrap {
  min-height: calc(100% - 482px) !important;
}
</style>
