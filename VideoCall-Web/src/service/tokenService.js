import Fly from "flyio/dist/npm/fly";
import router from "../router";
import store from "../store";

const fly = new Fly();
// fly请求 设置拦截器
const storage = window["localStorage"]; //window[isPC||window.isApp ? 'localStorage' : 'sessionStorage'];
const SPHY_TOKEN_KEY = "SPHY_LOGIN_TOKEN";

let globalToken;

let tokenService = {
  // 清除token
  clean() {
    storage.removeItem(SPHY_TOKEN_KEY);
    sessionStorage.clear();
    // localStorage.clear();
    // store.commit('clearMenuRouter');
    // store.commit('clearAuth');
  },
  // 设置token
  setToken(data) {
    globalToken = {
      ...data,
      timestamp: data.expiration
    };
    storage.setItem(SPHY_TOKEN_KEY, JSON.stringify(globalToken));
  },
  // 获取token
  getToken() {
    let token =
      globalToken != null
        ? globalToken
        : JSON.parse(storage.getItem(SPHY_TOKEN_KEY)) || {};
    if (token["token"]) {
      let timestamp = token.timestamp;
      let timeCalc = new Date() - timestamp;
      if (timeCalc > (10 * 3600 * 1000)) {
        this.clean();
        return ''
      // } else if (timeCalc > (12 * 3600 * 1000)) { // 设置12小时过期时间
      //   return ''
      }
      return token["token"];
    } else {
      return "";
    }
  },
  // PC端登录，默认返回token
  pcLogin(userInfo, key = "token") {
    var that = this;
    return new Promise((resolve, reject) => {
      let params = {
        method: "post",
        baseURL: process.env.VUE_APP_API,
        url: "/api/TokenAuth/Token",
        headers: {
          "Content-Type": "application/json"
        },
        data: userInfo
      };
      // console.log(params);
      fly
        .request(params, params.data)
        .then(res => {
          let data = res.data;
          this.setToken(data.data || "");
          resolve(data);
        })
        .catch(function(error) {
          let res = error.response;
          let data = (res && res.data) || '请求异常';
          reject({
            success: false,
            data: data
          });
        });
    });
  },
  //发送验证码
  sendTestCode(mobile) {
    return new Promise((resolve, reject) => {
      let params = {
        method: "post",
        baseURL: process.env.VUE_APP_API,
        url: "/H_roleplay-si/sendVerification",
        headers: {
          "Content-Type": "application/json"
        },
        data: {
          userCode: mobile
        }
      };
      fly
        .request(params, params.data)
        .then(res => {
          resolve(res.data);
        })
        .catch(function(error) {
          let res = error.response;
          let data = (res && res.data) || {};
          let message = data.message || "请求异常";
          reject({
            success: false,
            message: message
          });
        });
    });
  },
};
export default tokenService;
