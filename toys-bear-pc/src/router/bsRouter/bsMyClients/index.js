// 我的客户
const BsMyClients = () =>
  import("@/views/bsPage/bsMyClients/bsMyClients/BsMyClients.vue");

// 厂商查询
const BsVendorQuery = () =>
  import("@/views/bsPage/bsMyClients/bsVendorQuery/BsVendorQuery.vue");

export default [
  {
    path: "/bsIndex/bsMyClients",
    name: "bsMyClients",
    component: BsMyClients
  },
  {
    path: "/bsIndex/bsVendorQuery",
    name: "bsVendorQuery",
    component: BsVendorQuery
  }
];
