import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        textTest:'',//测试
    },
    mutations: {
        textTestHandle (state,n) { //测试
            state.textTest = n
        },
    },
    actions: {

    },
});

