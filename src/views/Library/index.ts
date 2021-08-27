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
            title:'01 丁武音畫系列：實驗音樂 x 動態繪畫',//标题
            text01:'丁武，中國第一代搖滾音樂人，唐朝樂隊核心人物，中國重金屬搖滾樂的先行者和開創者。丁武對藝術的熱愛和追求決定了他的創作並不局限於音符，他對天空，夢境，記憶有這超乎常人的想象，以自身的觀察和經歷為藍本，丁武從未停止對於繪畫的創作。此次丁武攜手香港文創平台和粉絲社區八爪娛，以音樂人域藝術家的雙重身份，透過NFT資產的形勢，將實驗電子域繪畫結合進行全新音視藝術創作，帶領觀眾一同走進他抽象而又激烈的內心世界。',//右侧内容第一段
            text02:'',//右侧内容第二段
            remark:'備註：用戶在Binance NFT市場購買的ATTA NFT，編號資訊需待幣安NFT提取功能開通後，才可在ATTA網站MYNFT模塊査詢。',//右侧备注
            logo:'/library/yanran.png',//右侧logo
            plan01:'计划铸造数量：300',
            plan02:'BSC网络：',
            plan03:'ETH网络：',
            imgsname:'dingwu'
          }
        ],
        imgsList:{
          dingwu:[
            {
              url:'/library/libraryList/glass (1).png',
              text:'丁武 - International Remix'
            },
            {
              url:'/library/libraryList/glass (1).png',
              text:'Wu Ding - International '
            },
            {
              url:'/library/libraryList/glass (1).png',
              text:'丁武 - International Remix'
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