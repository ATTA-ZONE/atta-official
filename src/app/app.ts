import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import footer from "./components/footer/footer"
import './app.less';
@Component({
    template: require('./app.html'),
    components:{footer}
})
export default class app extends Vue {
    created(){
    } 
}
