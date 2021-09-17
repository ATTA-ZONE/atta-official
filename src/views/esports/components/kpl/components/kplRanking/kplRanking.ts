
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
    const data:any = ref(props.contents);
    const numtp = ref(data.tpnum);
    console.log(data);
    const closeNet = () => {
      context.emit('closeNet')
    }
    const confirmbtn = () => {
      context.emit('confirmbtn',data)
    }
    const addtpnum = () => {
      if (data.value.tpnum >= numtp.value) {
        return;
      }
      data.value.tpnum = data.value.tpnum + 1;
    }
    const jiantpnum = () => {
      if (data.value.tpnum <= 1) {return ;}
      data.value.tpnum = data.value.tpnum - 1;
    }
    const submitbtn = () => {
      data.value.titletips = 'esports_kpl75';
      data.value.content = `您選擇了${data.value.tpnum}個投票券，請確認`;
      data.value.rankingtypeshow = 4;
      data.value.btn1show = '1';
      data.value.btn2show = '9';
      data.value.tpnum2 = data.value.tpnum;
      data.value.tpnum = null;
    }
    return{
      title1 : 'esports_kpl51', 
      title2 : 'esports_kpl53', 
      data,
      closeNet,
      confirmbtn,
      addtpnum,
      jiantpnum,
      submitbtn,
      titletipsRef,
      tipNone
      }
  }
});