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
console.log(target);
const options = {
  timeout: 20000, // 设置超时
  retry: 1, // 超时再次请求次数
  retryDelay: 1000 // 请求间隙
};
if (env == "production") options.baseURL = target; // 如果是生产环境，接口统一域名
const instance = axios.create(options);

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
    console.log("响应拦截器报错", err);
    return Promise.reject(err);
  }
);
/**
 * 使用es6的export default导出了一个函数，导出的函数代替axios去帮我们请求数据，
 * 函数的参数及返回值如下：
 * @param {String} method  请求的方法：get、post、delete、put
 * @param {String} url     请求的url:
 * @param {Object} data    请求的参数
 * @returns {Promise}     返回一个promise对象，其实就相当于axios请求数据的返回值
 */
const http = (method, url, data = {}) => {
  method = method.toLowerCase();
  if (method == "post") {
    return instance.post(url, data);
  } else if (method == "get") {
    return instance.get(url, { params: data });
  } else if (method == "delete") {
    return instance.delete(url, { params: data });
  } else if (method == "put") {
    return instance.put(url, data);
  } else {
    return Promise.reject("未知的method" + method);
  }
};
export default http;
