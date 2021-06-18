<template>
  <div class="modal-container">
    <div class="modal-wrap">
      <div class="modal-wrap-name">
        <div class="modal-wrap-name-text">{{$t('Claim Your NFT')}}</div>
        <img @click="closeModal" class="close" src="@/assets/imgs/close.png" />
      </div>
      <div class="modal-title">{{t('modalTitle')}}</div>
      <div class="content-wrap">
        <img class="banner" src="@/assets/imgs/modal-banner.png" />
        <div class="content-desc">
          <div class="content-desc-title">{{t('infoTitle')}}</div>
          <div class="content-desc-info">
            {{t('infoDesc')}}
          </div>
          <div class="content-desc-cells">
            <content-cell
              v-for="(item, idx) in pageText"
              :key="idx"
              @toggleShow="toggleShow"
              :title="t(item.title)"
              :desc="t(item.desc)"
              :showDesc="showDesc"
              :btn="showDesc == $t(item.title)? '-':'+'"
            />
          </div>
          <div class="btc-time">領取截止日期:   2021-6-31  20:00</div>
          <span class="submit-btn" @click="getNftBsc">現在領取</span>
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
  setup(_, context) {
    const showDesc = ref('')
    const pageText = ref([
      {
        title: "ATTA NFT Exclusive Benefits",
        desc: "nftInfo",
      },
      {
        title: "Content-related Benefits",
        desc: "fansInfo",
      },
      {
        title: "ATTA Brand Benefits",
        desc: "brandInfo",
      },
    ]);
    const toggleShow = (str: string)=>{
      showDesc.value = str
    }
    const getNftBsc = ()=>{
      
    }
    const closeModal = ()=>{
      context.emit('closemodal')
    }
    
    return { pageText, showDesc, toggleShow, closeModal, getNftBsc };
  },
});
</script>
<style lang='scss'>
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
    height: 90%;
    overflow-y: auto;
    position: absolute;
    left: 50%;
    top: 2%;
    z-index: 1000;
    transform: translateX(-50%);
    padding: 40px;
    color: #fff;
    &-name {
      display: flex;
      font-size: 16px;
      justify-content: space-between;
      &-text {
        opacity: 0;
      }
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
        &-info {
          text-align: justify;
          word-break: break-all;
        }
      }
      .btc-time {
        font-size: 16px;
      }
      .submit-btn {
        display: inline-block;
        padding: 14px 70px;
        margin-top: 20px;
        cursor: pointer;
        color: rgba(168, 222, 238, 1);
        border: 1px solid rgba(168, 222, 238, 1);
      }
    }
  }
}
</style>