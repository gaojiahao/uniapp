import Vue from "vue";
import store from "@/store/index";
const v = new Vue();
export default {
  install(Vue) {
    Vue.prototype.$common = this;
  },
  //刷新tab页
  refreshTab(n) {
    let tab = store.state.tabList;
    let a = n || store.state.activeTab;
    for (const i of tab) {
      if (i.name == a) {
        v.$set(i, "refresh", false);
        v.$nextTick(() => {
          v.$set(i, "refresh", true);
          v.$message.success(`${i.label}，刷新成功`);
        });
        break;
      }
    }
  },
  // 新增tab页
  addTab(n) {
    store.commit("myAddTab", n);
  },
  // 关闭tab页
  closeTab(n) {
    store.commit("closeTab", n);
  },
  judgeTab(arr, n) {
    // let s = JSON.parse(sessionStorage.getItem(n));
    // if (s) {
    //   let flag = true;
    //   for (const i of s) {
    //     if (i.name == arr.name) {
    //       flag = false;
    //       break;
    //     }
    //   }
    //   flag && s.push(arr);
    // } else {
    //   s = [arr];
    // }
    // sessionStorage.setItem(n, JSON.stringify(s));
    store.commit("myAddTab", n);
  },
  //获取当前tab id
  getTabNameId(_this) {
    let id = _this.$parent.name.split("-");
    return id[1];
  },
  //获取当前tab name
  getTabName() {
    return store.state.activeTab;
  },
  //获取当前tab参数
  getTabParams() {
    let tab = store.state.tabList;
    let n = store.state.activeTab;
    let a = "";
    for (const i of tab) {
      if (i.name == n) {
        a = i.params;
        break;
      }
    }
    return a;
  },
  //获取当前tab
  getTab() {
    let tab = store.state.tabList;
    let n = store.state.activeTab;
    let a = "";
    for (const i of tab) {
      if (i.name == n) {
        a = i;
        break;
      }
    }
    return a;
  }
};
