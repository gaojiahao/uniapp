// #ifdef H5
import '@/common/js/rem.js'
// #endif
import Vue from 'vue'
import App from './App'
import store from '@/store'
import {router,RouterMount} from './router/router.js'  //路径换成自己的
import BootstrapVue from './common/js/bootstrap-vue.min'
import calculate from "@/common/js/calculate.js";
import Loading from "@/components/Loading/loading.js";
// 引入uView提供的对vuex的简写法文件
let vuexStore = require('@/store/$u.mixin.js')
Vue.mixin(vuexStore);
Vue.use(BootstrapVue,{})
Vue.use(Loading);
Vue.prototype.$calculate = calculate;
// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);

let mpShare = require('uview-ui/libs/mixin/mpShare.js')
Vue.mixin(mpShare);

Vue.use(router)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
// http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
import httpInterceptor from '@/common/js/http.interceptor.js';
Vue.use(httpInterceptor, app);

// http接口API抽离，免于写url或者一些固定的参数
import httpApi from '@/common/js/http.api.js';
Vue.use(httpApi, app);

//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
	RouterMount(app,router,'#app')
// #endif

// #ifndef H5
	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
