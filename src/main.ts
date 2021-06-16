import { createApp } from 'vue'
import App from './App.vue'
import i18n from './locals'

let app = createApp(App);
app.use(i18n).mount('#app')
