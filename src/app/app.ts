import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

import './app.less';
@Component({
    template: require('./app.html')
})
export default class app extends Vue {
    created(){
    } 
}
