import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

import './footer.less';

@Component({
    template: require('./footer.html')
})
export default class footer extends Vue {

    showWechat:any = false;
    created() {
    }
    mounted() {
    }
    toPage(type:any){
        if(type == 1){
            this.showWechat = !this.showWechat
        }
        if(type == 2){
            window.open('https://weibo.com/attaofficial/')
        }
        if(type == 3){
            window.open('https://twitter.com/atta_fun')
        }
        if(type == 4){
            window.open('https://t.me/attaofficialeng1')
        }
        if(type == 5){
            window.open('https://medium.com/atta-official')
        }
        if(type == 6){
            window.open('https://www.instagram.com/atta.fun.official/')
        }
    }
}
