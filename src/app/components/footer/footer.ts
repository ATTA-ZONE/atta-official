import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

import './footer.less';

@Component({
    template: require('./footer.html')
})
export default class vfooter extends Vue {

    showWechat:any = false;
    long:any = "";
    created() {
    }
    mounted() {
        
        this.long = this.getCookie("long") ? this.getCookie("long") : "en";
        document.cookie = "long=" + this.long;
    }
    //获取cookie
    getCookie(cname:any) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        console.log("获取cookie,现在循环")
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            console.log(c)
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
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
