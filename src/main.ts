import { createApp } from 'vue'
import App from './App.vue'
import i18n from './locals'
import axios from './api'
import router from './router'
import VueAxios from 'vue-axios'

let app = createApp(App);
app.use(VueAxios, axios)
app.use(router)
app.use(i18n).mount('#app')
