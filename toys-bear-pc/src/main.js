import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import myAxios from "@/request/http";
import "@/styles/base.less";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/css/theme/index.css";
import { getMenuFuc } from "@/router/index";
Vue.config.productionTip = false;
getMenuFuc();
Vue.use(ElementUI);
Vue.use(myAxios);
new Vue({
  router,
  store,
  render: h => h(App),
  data: {
    eventHub: new Vue()
  }
}).$mount("#app");
