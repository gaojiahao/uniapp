/** 后台首页 */
const BsHome = () => import("@/views/bsPage/bsHome/BsHome.vue");

/** 产品详情 */
const BsProductDetails = () =>
  import(
    "@/views/bsPage/bsProductSearch/bsProductDetails/BsProductDetails.vue"
  );

/** 客户订单详情 */
const BsClientOrderDetails = () =>
  import(
    "@/views/bsPage/bsSiteSharing/bsCustomerOrder/bsClientOrderDetails/BsClientOrderDetails.vue"
  );

export default [
  {
    path: "/bsIndex/bsHome",
    name: "bsHome",
    component: BsHome
  },
  {
    path: "/bsIndex/bsProductDetails",
    name: "bsProductDetails",
    component: BsProductDetails
  },
  {
    path: "/bsIndex/bsClientOrderDetails",
    name: "bsClientOrderDetails",
    component: BsClientOrderDetails
  },
  {
    path: "/bsIndex",
    redirect: "/bsIndex/bsHome"
  }
];
