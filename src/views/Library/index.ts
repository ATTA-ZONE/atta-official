import { defineComponent,ref } from "vue";
import headerCell from "@/components/header/index.vue";
import footerCell from "@/components/footer/index.vue";
import mediaModal from "@/components/modals/imgPreview.vue";
export default defineComponent({
  components: { headerCell,footerCell,mediaModal},
  data() {
      return {
        libraryList:[
          {
            img01:'/library/libraryTitle/library04.png',//左边大图
            title:'library_copywriting_2',//标题
            text01:'library_copywriting_8',//右侧内容第一段
            remark:'library_copywriting_114',//右侧备注
            logo:'/library/yanran.png',//右侧logo
            imgsname:'dingwu',
          }
        ],
        imgsList:{
          dingwu:[
            {
              url:'/library/libraryList/glass (1).png',
              text:'library_copywriting_15'
            },
            {
              url:'/library/libraryList/glass (1).png',
              text:'library_copywriting_15_2'
            },
            {
              url:'/library/libraryList/glass (1).png',
              text:'library_copywriting_15_3'
            },
            {
              url:'/library/libraryList/glass (1).png',
              text:'library_copywriting_15_4'
            }
          ]
        }
      }
  },
  name: "library",
  props: {
    msg: String,
  },
  setup() {
    const moreNumber = ref(0);
    const moreBtn = (index: number)=>{
      if(moreNumber.value == index){
        moreNumber.value = 0;
      }else{
        moreNumber.value = index;
      }
    }
    return {
      moreBtn,
      moreNumber
    }
  }


});