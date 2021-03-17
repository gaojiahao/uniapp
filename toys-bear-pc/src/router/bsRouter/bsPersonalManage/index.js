// 账号设置
const BsAccountSettings = () =>
  import(
    "@/views/bsPage/bsPersonalManage/bsAccountSettings/BsAccountSettings.vue"
  );

// 报价设置
const BsQuotationSettings = () =>
  import(
    "@/views/bsPage/bsPersonalManage/bsQuotationSettings/BsQuotationSettings.vue"
  );

// 推送设置
const BsPushSettings = () =>
  import("@/views/bsPage/bsPersonalManage/bsPushSettings/BsPushSettings.vue");

export default [
  {
    path: "/bsIndex/bsAccountSettings",
    name: "bsAccountSettings",
    component: BsAccountSettings,
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/bsIndex/bsQuotationSettings",
    name: "bsQuotationSettings",
    component: BsQuotationSettings,
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/bsIndex/bsPushSettings",
    name: "bsPushSettings",
    component: BsPushSettings,
    meta: {
      keepAlive: true
    }
  }
];
