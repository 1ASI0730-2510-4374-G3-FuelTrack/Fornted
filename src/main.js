import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import pinia from './store'
import { i18n } from './i18n'

// ✅ Ruta corregida (relativa al archivo main.js)
import './assets/styles/global.css'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(i18n)
app.mount('#app')
