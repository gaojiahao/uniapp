import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index";
import axios from "axios";
import { Message } from "element-ui";
import { staticRouters, setMenuTree } from "./routers";
// const originalPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err);
// };
//解决编程式路由往同一地址跳转时会报错的情况
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;
//push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};
//replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalReplace.call(this, location, onResolve, onReject);
  return originalReplace.call(this, location).catch(err => err);
};
Vue.use(VueRouter);
// 获取cookit

// 获取token
function getToken() {
  return new Promise((result, reject) => {
    axios
      .post("/api/GetToken", {
        companyNum: "LittleBearWeb",
        platForm: "PC"
      })
      .then(res => {
        if (res.data.result.code === 200) {
          result(res.data.result.item);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
}
const routes = [...staticRouters];

const router = new VueRouter({
  routes
});
export async function getMenuFuc() {
  const list = store.state.routers;
  await setMenuTree(list, router);
}
// 拦截
router.beforeEach(async (to, from, next) => {
  // 如果没有登录token
  if (!store.state.userInfo || !store.state.userInfo.accessToken) {
    const userInfo = Vue.prototype.$cookies.get("userInfo");
    console.log("没有token", 1324, userInfo);
    if (userInfo) {
      console.log("有cookit_token");
      store.commit("handlerLogin", true);
      store.commit("setToken", userInfo);
      next();
    } else {
      try {
        const res = await getToken();
        const obj =
          typeof res === "string" && res.constructor === String
            ? { accessToken: res }
            : null;
        store.commit("setToken", obj);
        return next({ path: "/login" });
      } catch (error) {
        if (error) Message.error("请求失败，请求接口为/api/GetToken");
        return next({ path: "/login" });
      }
      // 如果有token但是没有经过正规登录
    }
    // if (
    //   to.path.includes("/beforeIndex") ||
    //   to.path.includes("/erp") ||
    //   to.path.includes("/login") ||
    //   to.path.includes("/offer") ||
    //   to.path.includes("/publicChat") ||
    //   to.path.includes("/dontLoad")
    // ) {
    //   next();
    // } else {
    //   return next({ path: "/login" });
    // }
  } else {
    // 有token
    if (
      to.path.includes("/beforeIndex") ||
      to.path.includes("/login") ||
      to.path.includes("/erp") ||
      to.path.includes("/offer") ||
      to.path.includes("/publicChat") ||
      to.path.includes("/dontLoad")
    ) {
      next();
    } else {
      if (store.state.isLogin) {
        next();
      } else {
        const userInfo = Vue.prototype.$cookies.get("userInfo");
        console.log(userInfo);
        if (userInfo) {
          console.log("有token");
          store.commit("handlerLogin", true);
          store.commit("setToken", userInfo);
          next();
        } else {
          console.log("没有登录");
          // 如果有token但是没有经过正规登录
          return next({ path: "/login" });
        }
      }
    }
  }
});
export default router;
