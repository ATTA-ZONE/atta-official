import { createApp } from 'vue'
import App from './App.vue'
import i18n from './locals'
import axios from 'axios'
import VueAxios from 'vue-axios'

let app = createApp(App);
app.use(VueAxios, axios)
app.use(i18n).mount('#app')
