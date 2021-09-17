
import { defineComponent,onMounted,ref } from "vue";
export default defineComponent({
  name: "kplRanking",
  props: {
    contents : Object
  },
  setup(props, context){
    const titletipsRef = ref(null);
    const tipNone = ref(false)
    onMounted(()=>{
      let domText:any = titletipsRef.value;
      console.dir(domText.scrollWidth);
      if(domText.scrollWidth > 180){
        tipNone.value = true;
      }
    });
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
      titletipsRef,
      tipNone
    }
  }
});