import http from "./http";

/**
 * 登录API模块
 */
export const login = "/api/Authenticate";

/**
 * 公共API模块
 */
export const getToken = "/api/GetToken";

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
