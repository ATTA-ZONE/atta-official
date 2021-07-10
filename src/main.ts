import { createApp } from 'vue'
import App from './App.vue'
import i18n from './locals'
import axios from './api'
import router from './router'
import VueAxios from 'vue-axios'
import "./assets/css/index.scss";
import { ElLoading } from 'element-plus';
import 'element-plus/packages/theme-chalk/src/base.scss'


let app = createApp(App);
const plugins = [ElLoading]

plugins.forEach(plugin => {
    app.use(plugin)
})
app.use(VueAxios, axios)
app.use(router)
app.use(i18n).mount('#app')
