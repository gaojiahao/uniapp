import http from "./http";

/**
 * 登录模块
 */
export const loginUrl = {
  login: "/api/Authenticate" // 验证码登录
};

// post方法以及传参
export function _POST(api, params) {
  return http("post", api, params);
}
// get方法以及传参
export function _GET(api, params) {
  return http("get", api, params);
}
// delete方法以及传参
export function _DELETE(api, params) {
  return http("delete", api, params);
}
// put方法以及传参
export function _PUT(api, params) {
  return http("delete", api, params);
}
