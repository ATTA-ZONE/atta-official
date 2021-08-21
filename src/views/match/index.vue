<template>
  <header-cell />
  <div class="match-container" v-loading="loading">
    <!-- <img class="top-banner" src="/match/starkBanner.png" /> -->
    <!-- <div v-if="false" class="match-header flex">
      <div class="match-title" :class="isEn ? 'hanson' : ''">
        <p class="title-top">{{$t("match_title01")}}</p>
        <p class="title-bottom">{{$t("match_title02")}}</p>
      </div>
      <p class="match-text match-text-header" :class="isEn ? 'niunito' : ''">{{$t("match_text")}}</p>
    </div>
    <div v-if="false" class="match-introduce flex">
      <div class="introduce-list">
        <img src="/match/rita.png" alt="">
        <div class="introduce-text">
          <h5>{{$t("match_rita_title")}}</h5>
          <p :class="isEn ? 'niunito' : ''">{{$t("match_rita_text")}}</p>
          <button @click="toBaZhuaYu" :class="isEn ? 'niunito' : ''">{{$t("match_draw_now")}}</button>
        </div>
      </div>
      <div class="introduce-list list-middle">
        <img src="/match/aill.png" alt="">
        <div class="introduce-text">
          <h5>{{$t("match_aill_title")}}</h5>
          <p :class="isEn ? 'niunito' : ''">{{$t("match_aill_text")}}</p>
          <button @click="toBaZhuaYu" :class="isEn ? 'niunito' : ''"> {{$t("match_draw_now")}} </button>
        </div>
      </div>
      <div class="introduce-list">
        <img src="/match/tx.png" alt="">
        <div class="introduce-text">
          <h5>{{$t("match_tx_title")}}</h5>
          <p :class="isEn ? 'niunito' : ''">{{$t("match_tx_text")}}</p>
          <button @click="toBaZhuaYu" :class="isEn ? 'niunito' : ''" type="button">{{$t("match_draw_now")}}</button>
        </div>
      </div>
    </div> -->
    <div class="match-rule flex">
      <!-- <div class="rule-busd flex">
        <div class="rule-number" :class="isEn ? 'hanson' : ''">
          <p class="number-text">{{$t("match_rule_award")}}</p>
          
          <p class="number-busd">{{totalRewardPoolNumber?totalRewardPoolNumber:$t("match-Tbd")}} BUSD</p>
        </div>
      </div> -->
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
          <p>{{$t("match_rule06")}}</p>
          <button @click="toBaZhuaYu" :class="isEn ? 'niunito' : ''"> {{$t("match_draw_now")}} </button>
        </div>
      </div>
    </div>
    <countdown v-if="childContent && chainId != 1 && chainId != 4" @totalRewardPool="totalRewardPool" @loadingBol="loadingBol"/>
    <div v-if="!childContent" class="null-id">
      <h5>{{$t("voting information")}}</h5>
      <p>{{$t("mainnet only")}}</p>
      <button @click="getAddress">{{$t("ConnectNow")}}</button>
    </div>
  </div>
  <div v-if="chainIdContent == 'ETH' && (chainId == 1 || chainId == 4)" class="bsc-tips">
    <span>{{$t("ethBsc")}}</span>
    <a @click="toggleNetwork">BSC_MAINNET</a>
  </div>
  <footer-cell />
</template>

<script lang="ts">
import { defineComponent, computed,ref,onMounted } from "vue";
import { useI18n } from "vue-i18n";
import headerCell from "@/components/header/index.vue";
import footerCell from "@/components/footer/index.vue";
import countdown from "@/components/countdown/countdown.vue";
import { initWeb3 } from "../../assets/js/initweb3";
import { setCookie,getCookie,getAbi,moneyFormat } from "../../utils";

export default defineComponent({
  components: { headerCell,footerCell,countdown},
  emits: ["totalReward","loadingBol"],
  setup() {
    const childContent = ref(false);//没有链接钱包，部分内容不展示
    const loading = ref(false);
    const { locale, t } = useI18n();
    const busd = ref('100000');//奖池总数量
    const isEn = computed(() => {
      return locale.value.trim() == "en";
    });
    busd.value = moneyFormat(busd.value)
    const totalRewardPoolNumber = ref();
    const totalRewardPool = (res:any)=>{
      totalRewardPoolNumber.value = res?moneyFormat(res):0;
    }
    const loadingBol = (res:any)=>{
      loading.value = res;
    }
    const chainId = ref(1);
    const chainIdContent = ref('BSC')
    onMounted(() => {
      // chainId == 1 || chainId == 4? "ETH" : "BSC"
      window.CHAIN.WALLET.chainId().then((res) => {//判断钱包连接地址，是否是bsc网络
        chainId.value = res;
        chainIdContent.value = chainId.value == 1 || chainId.value == 4? "ETH" : "BSC";
        
      })
      accountAddress.value = getCookie("currentAddress") == "false" ? "" : getCookie("currentAddress");
      if(!accountAddress.value){//判断是否连接钱包
        childContent.value = false;
      }else{
        childContent.value = true;
      }
    })
    // 获取钱包地址
    const accountAddress = ref('');
    const getAddress = () => {
      if (!accountAddress.value) {
        // 获取钱包地址
        initWeb3().then((res: any) => {
          if (res.length > 0) {
            accountAddress.value = res[0];
            setCookie("currentAddress", res[0]);
            window.location.reload();
          }
        });
      } else {
        window.CHAIN.WALLET.connect("MetaMask").then((res) => {
          if (res.length > 0) {
            accountAddress.value = res[0];
            setCookie("currentAddress", res[0]);
            window.location.reload();
          }
        });
      }
    };
    const toBaZhuaYu = ()=>{
      window.open("https://www.bazhuayu.io/mobile/tc/blindbox.html")
    }

    const toggleNetwork = () => {
      let id = chainId.value == 1 ? 56 : 1;

      if (id == 56) {
        window.CHAIN.WALLET.switchRPCSettings(id).then(() => {
          chainId.value = 56;
        });
      } else {
        window.ethereum &&
          window.ethereum
            .request({
              method: "wallet_switchEthereumChain",
              params: [
                {
                  chainId: "0x1",
                },
              ],
            })
            .then(() => {
              chainId.value = 1;
            });
      }
    };
    return {
      isEn,
      busd,
      totalRewardPool,
      totalRewardPoolNumber,
      loading,
      loadingBol,
      childContent,
      getAddress,
      toBaZhuaYu,
      chainId,
      toggleNetwork,
      chainIdContent
    }
  }
});
</script>


<style lang="scss">
@import "./index.scss";
</style>
