import { createRouter, createWebHistory } from 'vue-router'
 
// 引入文件，动态路由
const Home = () => import("../views/Home/index.vue");
const Assets = () => import("../views/Assets/index.vue");
const mynft = () => import("../views/Assets/mynft.vue");
const history = () => import("../views/Assets/history.vue");
const Charity = () => import("../views/Charity/index.vue");
const Esports = () => import("../views/esports/index.vue");
const lpl = () => import("../views/esports/components/lpl/lpl.vue");
const kpl = () => import("../views/esports/components/kpl/kpl.vue");
const Xudongdong = () => import("../views/Xudongdong/index.vue");
const Headportrait = () => import("../views/headportrait/index.vue");
 
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
    path: "/esports",
    name: "esports",
    component: Esports,
    redirect: '/esports/infinity',
    children: [
      {
        path: 'lol',
        name:'lol',
        component: lpl
      },
      {
        path: 'infinity',
        name: 'infinity',
        component: kpl,
      }
    ]
  },
  {
    path: "/charity",
    name: "charity",
    component: Charity,
  },
  {
    path: "/headset",
    name: "headset",
    component: Headportrait,
  },
  {
    path: "/xudongdong",
    name: "xudongdong",
    component: Xudongdong,
  },
  {
    path: "/libraries",
    name: "libraries",
    component: () => import("../views/Library/index.vue")
  }
];
 
const router = createRouter({
    history: createWebHistory(),
    routes
})
 
export default router