import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index";
import axios from "axios";
// import { Message } from "element-ui";
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
        result(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}
// 刷新个人登录信息
function resetPersonInfo(token) {
  return new Promise((result, reject) => {
    axios
      .post(
        "/api/RefreshToken",
        {
          token: token
        },
        {
          headers: {
            "content-type": "application/json"
          }
        }
      )
      .then(res => {
        result(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}
// 获取菜单
function getUserRoleMenu(token) {
  return new Promise((result, reject) => {
    axios
      .post(
        "/api/GetUserRoleMenu",
        {
          Uoken: token
        },
        {
          headers: {
            "content-type": "application/json",
            Utoken: token
          }
        }
      )
      .then(res => {
        result(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}
// 获取系统参数
// function getClientTypeList(type) {
//   return new Promise((result, reject) => {
//     axios
//       .post(
//         "/api/ServiceConfigurationList",
//         {
//           basisParameters: type
//         },
//         {
//           headers: {
//             "content-type": "application/json",
//             Utoken: store.state.userInfo.accessToken
//           }
//         }
//       )
//       .then(res => {
//         if (res.data.result.code === 200) {
//           result(res.data.result.item);
//         }
//       })
//       .catch(err => {
//         reject(err);
//       });
//   });
// }
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
  if (!store.state.userInfo) {
    const token = Vue.prototype.$cookies.get("userInfo");
    if (token) {
      const res = await resetPersonInfo(token);
      console.log("有cookit_token", res, token);
      Vue.prototype.$cookies.remove("userInfo");
      console.log("删除了 cookit_token", token);
      if (res.data.result.isLogin) {
        console.log("有登录成功标识符");
        store.commit("handlerLogin", true);
        // 设置token
        store.commit("setToken", res.data.result);
        store.commit(
          "setComparnyId",
          res.data.result.commparnyList[0].commparnyId
        );
        const localKey = res.data.result.uid;
        let localShoppingCart = localStorage.getItem(localKey);
        if (localShoppingCart) {
          localShoppingCart = JSON.parse(localShoppingCart);
          store.commit("initShoppingCart", localShoppingCart);
        } else {
          store.commit("initShoppingCart", []);
        }
        // 登录成功获取系统参数
        // const Json = {};
        // Json.MessageRestriction = await getClientTypeList("MessageRestriction");
        // Json.UserRestrictions = await getClientTypeList("UserRestrictions");
        // Json.NoticeRestrictions = await getClientTypeList("NoticeRestrictions");
        // Json.CompanyRestrictions = await getClientTypeList(
        //   "CompanyRestrictions"
        // );
        // Json.PlatForm = await getClientTypeList("PlatForm");
        // Json.packageManage = await getClientTypeList("packageManage");
        // console.log(Json);
        // store.commit("globalJson/setGlobalJson", Json);
        // 登录成功获取菜单
        const menus = await getUserRoleMenu(token);
        if (menus.data.result.code === 200) {
          store.commit("setRouters", menus.data.result.item.modulesList || []);
          await getMenuFuc();
        }
        next();
      } else {
        console.log("刷新token失败");
        return next({ path: "/login" });
      }
    } else {
      console.log("没有cookit_token", store.state);
      const res = await getToken();
      console.log(res, "没有cookit_Token获取到的临时token");
      if (res.data.result.code === 200) {
        const obj = { accessToken: res.data.result.item };
        store.commit("setToken", obj);
      }
      if (to.path == "/login") {
        next();
      } else {
        return next({ path: "/login" });
      }
    }
  } else {
    if (store.state.isLogin) {
      next();
    } else {
      console.log(to.path);
      if (to.path == "/login" || to.path == "/loginConfirm") {
        next();
      } else {
        return next({ path: "/login" });
      }
    }
  }
});
export default router;
