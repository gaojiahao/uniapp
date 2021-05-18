import http from "@/request/http";
import im from "@/request/im";

export default {
  install(Vue) {
    /** 常规请求实例 */
    Vue.prototype.$http = http;
    Vue.prototype.$im_http = im;
  }
};
