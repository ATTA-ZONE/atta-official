import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import vFooter from "../app/components/footer/footer"
import './app.less';
@Component({
    template: require('./app.html'),
    components:{vFooter}
})
export default class app extends Vue {
    created(){
    } 
}
