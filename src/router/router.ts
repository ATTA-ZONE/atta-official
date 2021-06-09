import Vue, { AsyncComponent } from "vue";
import Router from 'vue-router';

const App: AsyncComponent = (): any => import("../app/app");
Vue.use(Router);

const HomePage: AsyncComponent = (): any => import("../views/homePage/homePage");

export default new Router({
    routes: [
        {
            path: "*",
            redirect:'/homePage'
        },
        {
            path: "/homePage",
            component: App,
            alias: "/homePage",
            children: [
                {
                    path: "",
                    component: HomePage,
                }
            ]
        }
    ],
});
