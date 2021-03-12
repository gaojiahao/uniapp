import http from "./http";
import loginModel from "./login/loginApi";

/**
 * 登录模块
 */
export const loginApi = loginModel;

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
