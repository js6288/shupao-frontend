import { createApp } from 'vue'
import App from './App.vue'
import * as VueRouter from 'vue-router'
import routes from "./config/route";
import Vant from 'vant';
import 'vant/lib/index.css';
import './global.css'

const app = createApp(App);

const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHistory(),
    routes, // `routes: routes` 的缩写
})
app.use(Vant);
app.use(router)
app.mount('#app')


// createApp(App).mount('#app');

