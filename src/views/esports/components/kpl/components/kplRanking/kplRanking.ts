
import { defineComponent,ref } from "vue";
export default defineComponent({
  name: "kplRanking",
  props: {
    contents : Object
  },
  setup(props, context){
    const data:any = props.contents;
    const numtp = ref(data.tpnum);
    console.log(data);
    const closeNet = () => {
      context.emit('closeNet')
    }
    const confirmbtn = () => {
      context.emit('confirmbtn',data)
    }
    const addtpnum = () => {
      if (data.tpnum >= numtp.value) {
        return;
      }
      data.tpnum = data.tpnum + 1;
    }
    const jiantpnum = () => {
      if (data.tpnum <= 1) {return ;}
      data.tpnum = data.tpnum - 1;
    }
    const submitbtn = () => {
      data.value = {

      }
    }
    return{
      title1 : 'esports_kpl51', 
      title2 : 'esports_kpl53', 
      data,
      closeNet,
      confirmbtn,
      addtpnum,
      jiantpnum,
    }
  }
});