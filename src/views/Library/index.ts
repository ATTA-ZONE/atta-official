import { defineComponent } from "vue";
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
            title:'01 丁武音畫系列：實驗音樂 x 動態繪畫',//标题
            text01:'丁武，中國第一代搖滾音樂人，唐朝樂隊核心人物，中國重金屬搖滾樂的先行者和開創者。丁武對藝術的熱愛和追求決定了他的創作並不局限於音符，他對天空，夢境，記憶有這超乎常人的想象，以自身的觀察和經歷為藍本，丁武從未停止對於繪畫的創作。此次丁武攜手香港文創平台和粉絲社區八爪娛，以音樂人域藝術家的雙重身份，透過NFT資產的形勢，將實驗電子域繪畫結合進行全新音視藝術創作，帶領觀眾一同走進他抽象而又激烈的內心世界。',//右侧内容第一段
            text02:'',//右侧内容第二段
            remark:'备注：用户在Binance NFT市场购买的AATTA NFT编号信息需等到币安NFT提取功能开通后前往ATTA网站MYNFT 板块 查询',//右侧备注
            logo:'',//右侧logo
          }
        ]
      }
  },
  name: "library",
  props: {
    msg: String,
  },

});