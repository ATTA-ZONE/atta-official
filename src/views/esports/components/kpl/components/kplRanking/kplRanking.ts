
import { defineComponent,ref } from "vue";
export default defineComponent({
  name: "kplRanking",
  props: {
    msg: String,
  },
  setup(){
    return{
      rankingtypeshow : 2,
      title1 : 'esports_kpl51', 
      title2 : 'esports_kpl53', 
    }
  }
});