/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-19 15:30:49
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-27 11:56:21
 */
import Fly from "flyio/dist/npm/fly";
// 请求地址引入
import tokenService from "@service/tokenService";
// 弹窗插件引入
import errHandle from "@plugins/errHandle";
//错误提示
import { Message } from "view-design";
import vueMain from '@/main.js'

let qs = require("querystring");
// 请求插件引入
const fly = new Fly();

// reject处理
let rejectError = (reject, message) => {
  if (message && message != "nologin") errHandle(message);
  return Promise.reject({ success: false, message });
};

// fly请求 设置拦截器
fly.interceptors.request.use(request => {
  // 检验 token是否存在
  let token = tokenService.getToken();
  if (window.isApp) {
    request.headers.os = window.device.platform;
  }
  // token 存在则赋值在header当中
  if (token) {
    request.headers.Utoken = token;
  } else {
    // token 不存在，锁住请求，优先请求token，后序请求进入队列
    fly.lock();
    return tokenService
      .login()
      .then(token => {
        if (token) {
          request.headers.Utoken = token;
          // 请求token成功之后，即将进入第一个请求
          if (window.sessionStorage.getItem("shareUrl")) {
            return window.sessionStorage.getItem("shareUrl");
          }
          return request;
        } else {
          return Promise.reject({ success: false, message: "nologin" });
        }
      })
      .finally(() => {
        // 解锁队列，后序请求恢复正常
        fly.unlock();
      })
      .catch(err => {
        // 请求拦截 报错标识
        console.log("req-err:", err);
        return rejectError("reject", err.message);
      });
  }
});

// fly请求 响应拦截器
fly.interceptors.response.use(
  function(response) {
    let { success = true, message = "请求异常" } = response.data;
    if (success) {
      return response;
    } else {
      return rejectError("reject", message);
    }
  },
  function(error) {
    var userCode = localStorage.getItem("userCode");
    console.log("error:", error);
    // 响应拦截 报错标识
    if (error.status === 401) {
      localStorage.clear();
      sessionStorage.clear();
      if (userCode != null) localStorage.setItem("userCode", userCode);
      if (window.isApp) {
        window.DsService.close();
        window.router.push("/tokenExpiry");
        return;
      }
      this.lock();
      return tokenService.login().then(token => {
        console.log("token已更新");
        this.$Message.info({
          background: true,
          content: "您的登录状态似乎有点问题，不用担心，页面刷新之后就好",
          closable: true,
          onClose() {
            location.reload();
          }
        });
      });
    } else if (error.status === 1) {
      if (error.message.includes("timeout")) {
        return rejectError(
          "reject",
          "不好意思，网络似乎出了点问题，请稍后再试"
        );
      }
    }
    rejectError("reject", error.response && error.response.data.message);
  }
);
// 请求选项列表
let Rxports = {
  /**
   * @param {String} type      请求的类型，默认post
   * @param {String} url        请求地址
   * @param {String} time      超时时间
   * @param {Object} data      请求参数
   * @param {String} dataType    预期服务器返回的数据类型，xml html json ...
   * @param {String} contentType      自定义请求headers
   * @param {Function} success    请求成功后，这里会有两个参数,服务器返回数据，返回状态，[data, res]
   * @param {Function} error      发送请求前
   * @param return
   */

  // 标准请求 （支持GET、POST）
  ajax(opts = {}) {
    return new Promise((resolve, reject) => {
      let params = {
        method: opts.type || opts.method || "GET",
        baseURL: window.baseURL||process.env.VUE_APP_API,
        url: ensureUrl(opts.url),
        headers: {
          "Content-Type": opts.contentType || "*/*"
        },
        timeout: opts.time || 30 * 1000,
        responseType: opts.dataType || "json"
      };
      if (params.method.toUpperCase() === "POST") {
        params.data = qs.stringify(opts.data || opts.body) || {};
        if (opts.contentType === "application/json") {
          params.data = opts.data;
        }
      } else {
        if (typeof opts.data === "object") {
          let query = [];
          for (let [key, value] of Object.entries(opts.data)) {
            query.push(`${key}=${value}`);
          }
          if (params.url.indexOf("?") === -1) {
            // url上没有?
            params.url = encodeURI(`${params.url}?${query.join("&")}`);
          } else {
            // url上有?，给其拼上&
            params.url = encodeURI(`${params.url}&${query.join("&")}`);
          }
        }
      }
      fly
        .request(params, params.data)
        .then(res => {
          if (res) {
            resolve(res);
          } else {
            reject();
          }
        })
        .catch(err => {
          Message.error({
            background: true,
            content: "温馨提示："+err.message,
            duration: 3
          });
          // reject(err);
          // console.log("err:", err);
        });
    });
  },

  // POST请求
  post(opts = {}) {
    return new Promise((resolve, reject) => {
      fly
        .post(ensureUrl(opts.url), opts.data, { baseURL: window.baseURL || process.env.VUE_APP_API ,responseType:opts.responseType})
        .then(res => resolve(res.data))
        .catch(err => {
          // 弹窗提醒
            Message.error({
              background: true,
              content: "温馨提示："+err.message,
              duration: 3
            });
            vueMain.$FromLoading.hide();
          // reject(err);
          // console.log("err:", err);
        });
    });
  },
  put(opts = {}) {
    return new Promise((resolve, reject) => {
      fly
        .put(ensureUrl(opts.url), opts.data, { baseURL: window.baseURL || process.env.VUE_APP_API })
        .then(res => resolve(res.data))
        .catch(err => {
          Message.error({
            background: true,
            content: "温馨提示："+err.response.data.error.message,
            duration: 3
          });
          // reject(err);
          // console.log("err:", err);
        });
    });
  },
  postJSON(opts = {}) {
    return this.ajax({
      type: "POST",
      url: opts.url,
      contentType: "application/json",
      data: opts.data
    });
  },
  request: function(url, data) {
    var xmlhttp = new XMLHttpRequest(),
      params = parseParam(data),
      baseUrl = window.baseURL || process.env.VUE_APP_API,
      token = tokenService.getToken(),
      rs;

    url = ensureUrl(url);
    if (params.length) {
      url += (url.indexOf("?") === -1 ? "?" : "&") + params.join("&");
    }
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        if (xmlhttp.responseText) {
          rs = JSON.parse(xmlhttp.responseText);
        } else {
          rs = {};
        }
      }
    };
    if (token) {
      xmlhttp.open("GET", baseUrl + url, false);
      if (window.isApp) {
        xmlhttp.setRequestHeader("os", window.device.platform);
      }
      xmlhttp.setRequestHeader("Utoken", token);
      xmlhttp.setRequestHeader(
        "Content-Type",
        "application/json;charset=utf-8"
      );
      xmlhttp.send();
    }

    return rs;
    function parseParam(data) {
      var param = [];
      for (var key in data) {
        param.push([key, encode(data[key])].join("="));
      }
      return param;
    }
    function encode(val) {
      return encodeURIComponent(val)
        .replace(/%40/gi, "@")
        .replace(/%3A/gi, ":")
        .replace(/%24/g, "$")
        .replace(/%2C/gi, ",")
        .replace(/%20/g, "+")
        .replace(/%5B/gi, "[")
        .replace(/%5D/gi, "]");
    }
  },
  // 上传图片，单个文件
  upload(data) {
    // 创建form对象
    let param = new FormData(),
      file;

    // 通过append向form对象添加数据
    if (data.file instanceof FileList) {
      for (var i = 0, l = data.file.length; i < l; i++) {
        param.append("file", data.file[i]);
      }
    } else {
      param.append("file", data.file);
    }
    // 添加form表单中其他数据
    if (data.biReferenceId) {
      param.append("biReferenceId", data.biReferenceId);
    }
    let token = tokenService.getToken(true);
    return this.post({
      url: "/H_roleplay-si/ds/upload",
      headers: {
        "Content-Type": "multipart/form-data",
        Utoken: token.token
      },
      data: param
    });
  }
};
function ensureUrl(url) {
  if (/^\/api/i.test(url)) {
    return url;
  } else {
    return "/api" + url;
  }
}
export default Rxports;
