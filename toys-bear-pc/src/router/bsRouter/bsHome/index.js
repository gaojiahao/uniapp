const BsHome = () => import("@/views/bsPage/bsHome/BsHome.vue");

export default {
  path: "/bsIndex/bsHome",
  name: "bsHome",
  component: BsHome,
  meta: {
    keepAlive: true
  }
};
