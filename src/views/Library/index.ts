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
            img01:'/library/libraryTitle/library01.png',//左边大图
            title:'library_copywriting_2',//标题
            text01:'library_copywriting_8',//右侧内容第一段
            remark:'library_copywriting_114',//右侧备注
            detailName:'br',
            logo:'',//右侧logo
            imgsList:[
              {
                url:'/library/libraryList/dw01.png',
                text:'library_copywriting_15'
              },
              {
                url:'/library/libraryList/dw02.png',
                text:'library_copywriting_15_2'
              },
              {
                url:'/library/libraryList/dw03.png',
                text:'library_copywriting_15_3'
              },
              {
                url:'/library/libraryList/dw04.png',
                text:'library_copywriting_15_4'
              }
            ]
          },
          {
            img01:'/library/libraryTitle/library02.png',//左边大图
            title:'library_copywriting_3',//标题
            text01:'library_copywriting_10',//右侧内容第一段
            remark:'',//右侧备注
            logo:'',//右侧logo
            detailName:'br',
            imgsList:[
              {
                url:'/library/libraryList/xdd01.png',
                text:'library_copywriting_16'
              },
              {
                url:'/library/libraryList/xdd02.png',
                text:'library_copywriting_16'
              },
              {
                url:'/library/libraryList/xdd03.png',
                text:'library_copywriting_16'
              }
            ]
          },
          {
            img01:'/library/libraryTitle/library03.png',//左边大图
            title:'library_copywriting_4',//标题
            text01:'library_copywriting_11',//右侧内容第一段
            remark:'library_copywriting_114',//右侧备注
            logo:'',//右侧logo
            detailName:'br',
            imgsList:[
              {
                url:'/library/libraryList/o201.png',
                text:'library_copywriting_17'
              },
              {
                url:'/library/libraryList/o202.png',
                text:'library_copywriting_17'
              },
              {
                url:'/library/libraryList/o203.png',
                text:'library_copywriting_18'
              },
              {
                url:'/library/libraryList/o204.png',
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
            detailName:'br',
            imgsList:[
              {
                url:'/library/libraryList/cs01.png',
                text:'library_copywriting_20'
              },
              {
                url:'/library/libraryList/cs02.png',
                text:'library_copywriting_21'
              },
              {
                url:'/library/libraryList/cs03.png',
                text:'library_copywriting_22'
              },
              {
                url:'/library/libraryList/cs04.png',
                text:'library_copywriting_23'
              },
              {
                url:'/library/libraryList/cs05.png',
                text:'library_copywriting_24'
              },
              {
                url:'/library/libraryList/cs06.png',
                text:'library_copywriting_25'
              },
              {
                url:'/library/libraryList/cs07.png',
                text:'library_copywriting_26'
              },
              {
                url:'/library/libraryList/cs08.png',
                text:'library_copywriting_27'
              },
              {
                url:'/library/libraryList/cs09.png',
                text:'library_copywriting_28'
              },
              {
                url:'/library/libraryList/cs10.png',
                text:'library_copywriting_29'
              },
              {
                url:'/library/libraryList/cs11.png',
                text:'library_copywriting_30'
              },
              {
                url:'/library/libraryList/cs12.png',
                text:'library_copywriting_31'
              },
              {
                url:'/library/libraryList/cs13.png',
                text:'library_copywriting_32'
              },
              {
                url:'/library/libraryList/cs14.png',
                text:'library_copywriting_33'
              },
              
              {
                url:'',
                text:''
              }
            ]
          },
          {
            img01:'/library/libraryTitle/library05.png',//左边大图
            title:'library_copywriting_6',//标题
            text01:'library_copywriting_13',//右侧内容第一段
            remark:'',//右侧备注
            logo:'/library/yanran.png',//右侧logo
            detailName:'',
          },
          {
            img01:'/library/libraryTitle/library06.png',//左边大图
            title:'library_copywriting_7',//标题
            text01:'library_copywriting_14',//右侧内容第一段
            remark:'',//右侧备注
            logo:'',//右侧logo
            imgName:'manghe',
            detailName:'tr',
            imgsList:[
              {
                url:'/library/libraryList/mh01.png',
                text:''
              },
              {
                url:'/library/libraryList/mh02.png',
                text:''
              },
              {
                url:'/library/libraryList/mh03.png',
                text:''
              },
              {
                url:'/library/libraryList/mh04.png',
                text:''
              },
              {
                url:'/library/libraryList/mh05.png',
                text:''
              },
              {
                url:'/library/libraryList/mh06.png',
                text:''
              },
              {
                url:'/library/libraryList/mh07.png',
                text:''
              },
              {
                url:'/library/libraryList/mh08.png',
                text:''
              },
              {
                url:'/library/libraryList/mh09.png',
                text:''
              },
              {
                url:'/library/libraryList/mh10.png',
                text:''
              },
              {
                url:'/library/libraryList/mh11.png',
                text:''
              },
              {
                url:'/library/libraryList/mh12.png',
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
    const modelBol = ref(false);
    const moreNumber = ref(0);
    const moreBtn = (index: number)=>{
      if(moreNumber.value == index){
        moreNumber.value = 0;
      }else{
        moreNumber.value = index;
      }
    }
    const contents = ref({})
    // item:父级 index:第几个父级 info:子集  num:第几个子集
    const openModal = (item,index,info,num)=>{
      console.log(99999999);
      
      let data = {
        url:item.img01,//大图
        title:item.title,//标题
        content:item.text01,//详情文案
        type:!index?'video':index==1?'video':'img',
        total:0,//总版数
        minted:0,//已经铸造数量
        ETH:0,
        BSC:0,
        desc:['01','30','50'],//编号及说明
      }
      contents.value = data;
      modelBol.value = true;
    }
    const closeNet = ()=>{
      modelBol.value = false;
      contents.value = {};
    }

    return {
      moreBtn,
      moreNumber,
      modelBol,
      openModal,
      contents,
      closeNet
    }
  }

});