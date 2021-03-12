import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import myAxios from "@/request/http";

createApp(App)
  .use(store)
  .use(myAxios)
  .use(router)
  .mount("#app");
