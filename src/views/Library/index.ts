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
            imgsList:[
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
          },
          {
            img01:'/library/libraryTitle/library04.png',//左边大图
            title:'library_copywriting_3',//标题
            text01:'library_copywriting_10',//右侧内容第一段
            remark:'library_copywriting_114',//右侧备注
            logo:'/library/yanran.png',//右侧logo
            imgsList:[
              {
                url:'/library/libraryList/glass (1).png',
                text:'library_copywriting_16'
              },
              {
                url:'/library/libraryList/glass (1).png',
                text:'library_copywriting_16'
              },
              {
                url:'/library/libraryList/glass (1).png',
                text:'library_copywriting_16'
              }
            ]
          },
          {
            img01:'/library/libraryTitle/library04.png',//左边大图
            title:'library_copywriting_4',//标题
            text01:'library_copywriting_11',//右侧内容第一段
            remark:'library_copywriting_114',//右侧备注
            logo:'/library/yanran.png',//右侧logo
            imgsList:[
              {
                url:'/library/libraryList/glass (1).png',
                text:'library_copywriting_17'
              },
              {
                url:'/library/libraryList/glass (1).png',
                text:'library_copywriting_17'
              },
              {
                url:'/library/libraryList/glass (1).png',
                text:'library_copywriting_18'
              },
              {
                url:'/library/libraryList/glass (1).png',
                text:'library_copywriting_19'
              }
            ]
          },
          {
            img01:'/library/libraryTitle/library04.png',//左边大图
            title:'library_copywriting_5',//标题
            text01:'library_copywriting_12',//右侧内容第一段
            remark:'library_copywriting_114',//右侧备注
            logo:'/library/yanran.png',//右侧logo
            imgsList:[
              {
                url:'/library/libraryList/glass (1).png',
                text:'library_copywriting_20'
              },
              {
                url:'/library/libraryList/glass (1).png',
                text:'library_copywriting_21'
              },
              {
                url:'/library/libraryList/glass (1).png',
                text:'library_copywriting_22'
              },
              {
                url:'/library/libraryList/glass (1).png',
                text:'library_copywriting_23'
              },
              {
                url:'/library/libraryList/glass (1).png',
                text:'library_copywriting_24'
              },
              {
                url:'/library/libraryList/glass (1).png',
                text:'library_copywriting_25'
              },
              {
                url:'/library/libraryList/glass (1).png',
                text:'library_copywriting_26'
              },
              {
                url:'/library/libraryList/glass (1).png',
                text:'library_copywriting_27'
              },
              {
                url:'/library/libraryList/glass (1).png',
                text:'library_copywriting_28'
              },
              {
                url:'/library/libraryList/glass (1).png',
                text:'library_copywriting_29'
              },
              {
                url:'/library/libraryList/glass (1).png',
                text:'library_copywriting_30'
              },
              {
                url:'/library/libraryList/glass (1).png',
                text:'library_copywriting_31'
              },
              {
                url:'/library/libraryList/glass (1).png',
                text:'library_copywriting_32'
              },
              {
                url:'/library/libraryList/glass (1).png',
                text:'library_copywriting_33'
              }
            ]
          },
          {
            img01:'/library/libraryTitle/library04.png',//左边大图
            title:'library_copywriting_6',//标题
            text01:'library_copywriting_13',//右侧内容第一段
            remark:'library_copywriting_114',//右侧备注
            logo:'/library/yanran.png',//右侧logo
          },
          {
            img01:'/library/libraryTitle/library04.png',//左边大图
            title:'library_copywriting_7',//标题
            text01:'library_copywriting_14',//右侧内容第一段
            remark:'library_copywriting_114',//右侧备注
            logo:'/library/yanran.png',//右侧logo
            imgsList:[
              {
                url:'/library/libraryList/glass (1).png',
                text:''
              },
              {
                url:'/library/libraryList/glass (1).png',
                text:''
              },
              {
                url:'/library/libraryList/glass (1).png',
                text:''
              },
              {
                url:'/library/libraryList/glass (1).png',
                text:''
              }
            ]
          },
        ]
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