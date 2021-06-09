import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store';
import "./assets/css/app.less";
import 'animate.css' // 引入animate动画库
import "./components/filters";
import { get, post } from './api/api';
Vue.prototype.$http = {
    get,
    post
}

Vue.config.productionTip = false;

let index: Vue = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

export default index;
