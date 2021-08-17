<template>
  <header-cell />
  <div class="match-container">
    <!-- <img class="top-banner" src="/match/starkBanner.png" /> -->
    <div class="match-header flex">
      <div class="match-title" :class="isEn ? 'hanson' : ''">
        <p class="title-top">{{$t("match_title01")}}</p>
        <p class="title-bottom">{{$t("match_title02")}}</p>
      </div>
      <p class="match-text" :class="isEn ? 'niunito' : ''">{{$t("match_text")}}</p>
    </div>
    <div class="match-introduce flex">
      <div class="introduce-list">
        <img src="/match/rita.png" alt="">
        <div class="introduce-text">
          <h5>{{$t("match_rita_title")}}</h5>
          <p :class="isEn ? 'niunito' : ''">{{$t("match_rita_text")}}</p>
          <button :class="isEn ? 'niunito' : ''">{{$t("match_draw_now")}}</button>
        </div>
      </div>
      <div class="introduce-list list-middle">
        <img src="/match/aill.png" alt="">
        <div class="introduce-text">
          <h5>{{$t("match_aill_title")}}</h5>
          <p :class="isEn ? 'niunito' : ''">{{$t("match_aill_text")}}</p>
          <button :class="isEn ? 'niunito' : ''"> {{$t("match_draw_now")}} </button>
        </div>
      </div>
      <div class="introduce-list">
        <img src="/match/tx.png" alt="">
        <div class="introduce-text">
          <h5>{{$t("match_tx_title")}}</h5>
          <p :class="isEn ? 'niunito' : ''">{{$t("match_tx_text")}}</p>
          <button :class="isEn ? 'niunito' : ''" type="button">{{$t("match_draw_now")}}</button>
        </div>
      </div>
    </div>
    <div class="match-rule flex">
      <div class="rule-busd flex">
        <div class="rule-number" :class="isEn ? 'hanson' : ''">
          <p class="number-text">{{$t("match_rule_award")}}</p>
          <p class="number-busd">{{totalRewardPoolNumber}} BUSD</p>
        </div>
      </div>
      <div class="rule-text">
        <div class="match-title" :class="isEn ? 'hanson' : ''">
          <p class="title-top">{{$t("match_title001")}}</p>
          <p class="title-bottom">{{$t("match_rule")}}</p>
        </div>
        <div class="rule-list" :class="isEn ? 'niunito' : ''">
          <p>{{$t("match_rule01")}}</p>
          <p>{{$t("match_rule02")}}</p>
          <p>{{$t("match_rule03")}}</p>
          <p>{{$t("match_rule04")}}</p>
          <p>{{$t("match_rule05")}}</p>
        </div>
      </div>
    </div>
    <countdown @totalRewardPool="totalRewardPool"/>
  </div>
  <footer-cell />
</template>

<script lang="ts">
import { defineComponent, computed,ref,onMounted } from "vue";
import { useI18n } from "vue-i18n";
import headerCell from "@/components/header/index.vue";
import footerCell from "@/components/footer/index.vue";
import countdown from "./components/countdown.vue";
import { getCookie,getAbi,moneyFormat } from "../../utils";
import axios from "../../api";
import { chainSetting } from "../../assets/js/chainSetting";

export default defineComponent({
  components: { headerCell,footerCell,countdown},
  setup() {
    const { locale, t } = useI18n();
    const busd = ref('100000');//奖池总数量
    const isEn = computed(() => {
      return locale.value.trim() == "en";
    });
    busd.value = moneyFormat(busd.value)
    // abi下的所有方法
    // const MerkleDistributionInstance = getAbi("atta_vote_abi");
    // console.log(MerkleDistributionInstance);
    // // 获取的abi下的vault方法
    // MerkleDistributionInstance.methods
    //   .batchRaceInfo([1])
    //   .call()
    //   .then(function (res: any) {
    //     console.log(res);
    //   }).catch((err:any)=>{
    //       console.log(err);
    //   });
    const totalRewardPoolNumber = ref(0);
    const totalRewardPool = (res:any)=>{
      totalRewardPoolNumber.value = res;
      console.log(res);
    }
    return {
      isEn,
      busd,
      totalRewardPool,
      totalRewardPoolNumber
    }
  }
});
</script>


<style lang="scss">
@import "./index.scss";
</style>
