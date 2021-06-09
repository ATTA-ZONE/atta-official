import Vue, { AsyncComponent } from "vue";
import Router from 'vue-router';

const App: AsyncComponent = (): any => import("../app/app");
Vue.use(Router);

import homePage from '../views/homePage/homePage'  //产品管理

export default new Router({
    routes: [
        {
            path: "*",
            redirect:'/homePage'
        },
        {
            path: "/homePage",
            component: homePage,
            alias: "/homePage",
            // children: [
            //     productManage,
            //     typeManage
            // ]
        }
    ],
});
