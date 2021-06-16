<template>
  <div class="modal-container">
    <div class="modal-wrap">
      <img class="close" src="@/assets/imgs/Close.png" />
      <div class="modal-title">當前空投NFT:</div>
      <div class="content-wrap">
        <img class="banner" src="@/assets/imgs/modal-banner.png" />
        <div class="content-desc">
          <div class="content-desc-title">首次空投NFT介紹</div>
          <div class="content-desc-info">
            ATTA首次空投的NFT由團隊精心製作呈現，融合ATTA品牌元素和即將在幣安NFT首發的O2樂隊的音樂作品片段，永久限量2,000份。O2組合，由兩位中國大陸著名的搖滾音樂人歐洋和鄧謳歌組成，組合名稱取自兩人名字中的“o”字。1989年歐洋與發小鄧謳歌一同組建了中國著名搖滾樂隊-面孔樂隊，作為搖滾樂壇領軍人物，歐洋與謳歌參與
            著名的94香港紅磡“中國搖滾樂勢力”演唱會，這是中國搖滾樂的一個裏程碑。三十二年的貝斯手生涯，使歐洋成為中國搖滾樂中不可取代的業界翹楚。謳歌則在電影音樂的道路上一直頗有作為，先後為《泰囧》、《追兇者也》、《無名之輩》、《人潮洶湧》等電影配樂。
            本次空投NFT限量2,000份。獲得並持有本次空投NFT可在未來解鎖ATTA神秘權益，敬請期待！
          </div>
          <div class="content-desc-cells">
            <content-cell
              v-for="(item, idx) in pageText"
              :key="idx"
              @toggleShow="toggleShow"
              :title="item.title"
              :desc="item.desc"
              :showDesc="showDesc"
              :btn="showDesc == item.title? '-':'+'"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent, ref } from "vue";
import contentCell from "./content-cell.vue";
export default defineComponent({
  components: { contentCell },
  setup() {
    const showDesc = ref('')
    const pageText = ref<any>([
      {
        title: "ATTA NFT专属权益：",
        desc: "ATTA試圖打造一個鏈接現實世界流量入口的NFT品牌。ATTA會將影視明星，歌手，偶像團隊，電競選手，知名主播等現實世界中這些有趣IP，通過NFT的方式，和他們的粉絲完成新的鏈接。通過購買ATTA NFT，並且在ATTA的道具商店頁面進行兌換，可以獲取這些明星名人只在數字世界的出現的專屬權益。同時你也可以通過查詢ATTA的出品的NFT圖鑒來了解這些NFT的精彩玩法和背後的故事。ATTA的強項不僅是頂級影視、音樂、明星等內容資源，而是強大的NFT內容製作和玩法設計能力。ATTA目前擁有兩大類精彩權益：IP粉絲權益（Content-related Benefits）和ATTA品牌權益（ATTA Brand Benefits）。",
      },
      {
        title: "IP粉丝权益：",
        desc: "ATTA將為所有IP開設專屬的NFT權益兌換商店，在該商店不能購物，只能兌換，進行兌換的唯一憑證即為ATTA製作發行該IP的NFT，所以如果你是該IP的粉絲，請你一定要拿好自己手中的NFT。在這裏你可以通過NFT兌換到獨一無二的偶像數字內容。試想你的偶像邀請你作為特約嘉賓在她直播的時候打一局王者榮耀，和你一起分享她/他的專屬秘密，讓你在這個八卦滿天飛的世界裏成為唯一知道事情真相的人。甚至最後，玩家可以通過投票的方式來決定ATTA NFT的權益內容，一切你可以想象，但又無法實現的夢想和機會，將有可能化為NFT，被你擁有。 更多ATTA NFT專屬權益將陸續推出，請關註ATTA的社群和官網。",
      },
      {
        title: "ATTA品牌权益：",
        desc: "ATTA通證若ATTA未來發行屬於自己的通證，通過ATTA空投獲得的NFT持有者都將獲得一定通證獎勵。部分特定ATTA NFT的持有者，則有機會獲得通證的優先認購資格。超稀有NFT購買資格ATTA將不定期推出頂級IP的超稀有NFT 產品，永久限量發售，僅對ATTA NFT持有人開放購買資格。這些NFT將代表著這些現實世界對應IP的超珍貴權益ATTA的 NFT可以在八爪娛，或者幣安的NFT主板市場，和其他的主要NFT 交易市場中購買到。",
      },
    ]);
    const toggleShow = (str: string)=>{
      showDesc.value = str
    }
    
    return { pageText, showDesc, toggleShow };
  },
});
</script>
<style scoped lang='scss'>
.modal-container {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background: rgba($color: #000000, $alpha: 0.9);
  .modal-wrap {
    width: 1300px;
    max-height: 90%;
    overflow-y: scroll;
    position: absolute;
    left: 50%;
    top: 2%;
    z-index: 1000;
    transform: translateX(-50%);
    padding: 40px;
    color: #fff;
    .close {
      float: right;
    }
    .modal-title {
      margin: 10px 0;
    }
    .content-wrap {
      display: flex;
      justify-content: space-between;
      align-content: center;
      .banner {
        width: 530px;
      }
      .content-desc {
        font-size: 12px;
        margin-left: 50px;
        line-height: 1.8;
        &-title {
          font-size: 16px;
          margin-bottom: 10px;
        }
        &-cells {
          border-top: 1px solid rgba($color: #fff, $alpha: 0.15);
          border-bottom: 1px solid rgba($color: #fff, $alpha: 0.15);
          padding: 20px 0;
          margin: 20px 0;
        }
      }
    }
  }
}
</style>