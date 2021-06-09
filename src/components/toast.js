import Toast from './toast.vue'
import Vue from 'vue'
var ToastCmp = Vue.extend(Toast)
// Vue.component('ToastCmp',Toast)
function toast(text,whether) {
  // 实例化一个 toast.vue
    // console.log(whether);
    const toastDom = new ToastCmp({
        el: document.createElement('div'),
        data() {
            return {
                text: text,
                showWrap: true, // 是否显示组件
                showContent: true, // 作用:在隐藏组件之前,显示隐藏动画
                whether: whether //是否是登录、注册成功
            }
        }
    })

    // 把 实例化的 toast.vue 添加到 body 里
    document.body.appendChild(toastDom.$el)

    // 提前 250ms 执行淡出动画(因为我们再css里面设置的隐藏动画持续是250ms)
    setTimeout(() => {
        toastDom.showContent = false
    },10000)
    // 过了 duration 时间后隐藏整个组件
    setTimeout(() => {
        toastDom.showWrap = false
        document.body.removeChild(toastDom.$el)
    }, 2000)
}
// 注册为全局组件的函数
function registryToast() {
    // 将组件注册到 vue 的 原型链里去,
    // 这样就可以在所有 vue 的实例里面使用 this.$toast()
    Vue.prototype.$toast = toast
}
export default registryToast;