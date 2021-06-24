import { createRouter, createWebHistory } from 'vue-router'
 
// 引入文件，动态路由
const Home = () => import("../views/Home/index.vue");
const Assets = () => import("../views/Assets/index.vue");
const mynft = () => import("../views/Assets/mynft.vue");
 
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/assets",
    name: "assets",
    component: Assets,
    redirect: '/assets/mynft',
    children: [
      {
        path: 'mynft',
        component: mynft
      },
      {
        path: 'history',
        component: ()=>{import('../views/Assets/history.vue')}
      }
    ]
  }
];
 
const router = createRouter({
    history: createWebHistory(),
    routes
})
 
export default router