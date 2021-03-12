import http from "./http";
import { AxiosResponse } from "axios";
// post方法以及传参
export function _POST(api: string, params: {}): Promise<AxiosResponse<any>> {
  return http("post", api, params);
}
// get方法以及传参
export function _GET(api: string, params: {}): Promise<AxiosResponse<any>> {
  return http("get", api, params);
}
// delete方法以及传参
export function _DELETE(api: string, params: {}): Promise<AxiosResponse<any>> {
  return http("delete", api, params);
}
// put方法以及传参
export function _PUT(api: string, params: {}): Promise<AxiosResponse<any>> {
  return http("delete", api, params);
}
