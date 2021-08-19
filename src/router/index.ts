import { createRouter, createWebHistory } from 'vue-router'
 
// 引入文件，动态路由
const Home = () => import("../views/Home/index.vue");
const Assets = () => import("../views/Assets/index.vue");
const mynft = () => import("../views/Assets/mynft.vue");
const history = () => import("../views/Assets/history.vue");
const Charity = () => import("../views/Charity/index.vue");
const esports = () => import("../views/match/index.vue");
const Xudongdong = () => import("../views/Xudongdong/index.vue");
 
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
        name:'mynft',
        component: mynft
      },
      {
        path: 'history',
        name: 'history',
        component: history
      }
    ]
  },
  {
    path: "/charity",
    name: "charity",
    component: Charity,
  },
  {
    path: "/esports",
    name: "esports",
    component: esports,
  },
  {
    path: "/xudongdong",
    name: "xudongdong",
    component: Xudongdong,
  },
  {
    path: "/esports",
    name: "esports",
    component: esports,
  },
];
 
const router = createRouter({
    history: createWebHistory(),
    routes
})
 
export default router