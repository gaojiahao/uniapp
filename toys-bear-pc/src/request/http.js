import axios from "axios";
import store from "@/store";
import { devEnv, testEnv, proEnv } from "@/assets/js/config/config.js";
const env = process.env.NODE_ENV;
let target = "";
// 默认是本地环境
switch (env) {
  case "production": // 生产环境
    target = proEnv.hosturl;
    break;
  case "test": // 测试环境
    target = testEnv.hosturl;
    break;
  default:
    // 本地环境
    target = devEnv.hosturl;
    break;
}
const myAxios = {};
myAxios.install = function(Vue) {
  const instance = axios.create({
    baseURL: target, // 接口统一域名
    timeout: 20000, // 设置超时
    retry: 1, // 超时再次请求次数
    retryDelay: 1000 // 请求间隙
  });

  // 请求拦截
  instance.interceptors.request.use(
    // 使用axios请求拦截器统一设置请求头
    config => {
      config.headers.Utoken = store.state.userInfo.accessToken;
      config.headers["content-type"] = "application/json";
      return config;
    },
    err => {
      // 对请求错误做些什么
      return Promise.reject(err);
    }
  );

  // 响应拦截器
  instance.interceptors.response.use(
    res => {
      return res.data;
    },
    err => {
      // 对响应错误做点什么
      console.log("拦截器报错");
      return Promise.reject(err);
    }
  );
  Vue.prototype.$http = instance;
};
export default myAxios;
