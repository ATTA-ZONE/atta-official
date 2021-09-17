
import { defineComponent,ref } from "vue";
export default defineComponent({
  name: "kplRanking",
  props: {
    contents : Object
  },
  setup(props, context){
    const data:any = props.contents;
    console.log(data);
    const closeNet = () => {
      context.emit('closeNet')
    }
    return{
      title1 : 'esports_kpl51', 
      title2 : 'esports_kpl53', 
      data,
      closeNet
    }
  }
});