<!--  -->
<template>
  <div>
    <component :is="isHome"></component>
  </div>
</template>

<script>
import { mapState } from "vuex";
import bsCompanyHome from "@/components/bsComponents/bsHomeComponent/bsCompanyHome";
import bsHallHome from "@/components/bsComponents/bsHomeComponent/bsHallHome";
export default {
  name: "bsHome",
  components: {
    bsCompanyHome,
    bsHallHome
  },
  data() {
    return {
      isHome: "bsCompanyHome"
    };
  },
  created() {},
  mounted() {
    switch (this.userInfo.commparnyList[0].companyType) {
      case "Exhibition": // 展厅首页
        this.isHome = "bsHallHome";
        break;
      case "Sales": // 公司首页
        this.isHome = "bsCompanyHome";
        break;
      default:
        this.getOrgCompany();
        this.getGetSalesOrderDataStatistics();
        this.getGetSalesHotSample();
    }
    const localKey = this.userInfo.uid;
    let localShoppingCart = localStorage.getItem(localKey);
    if (localShoppingCart) {
      localShoppingCart = JSON.parse(localShoppingCart);
      this.$store.commit("initShoppingCart", localShoppingCart);
    } else {
      this.$store.commit("initShoppingCart", []);
    }
  },
  computed: {
    ...mapState(["userInfo"])
  }
};
</script>
<style scoped lang="less"></style>
