
import { createApp } from 'vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import App from './App.vue'
// import router from './router'
import store from './store/store'
import '@/assets/main.css';
const app = createApp(App)

// app.use(router)
app.use(store)


app.mount('#app')
