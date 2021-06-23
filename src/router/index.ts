import { createRouter, createWebHistory } from 'vue-router'
 
// 引入文件，动态路由
const Home = () => import("../views/Home/index.vue");
const Assets = () => import("../views/Assets/index.vue");
 
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Assets",
    name: "Assets",
    component: Assets,
  }
];
 
const router = createRouter({
    history: createWebHistory(),
    routes
})
 
export default router