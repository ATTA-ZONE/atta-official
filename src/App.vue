<template>
  <header-cell />
  <router-view></router-view>
  <footer-cell />
  <div class="bsc-tips" style="display:none;position:absolute;top:80px;left:50%;transform:translateX(-50%);z-index:9999;color:#fff;background: #9567FF;border-radius: 10px;white-space: nowrap;padding:10px 20px;">
    <span class="rpcname">{{chentext[entclang].tips03+chentext[entclang].tips04}}</span>
    <a @click="changenetwork()" class="target-rpcname">{{chentext[entclang].tips04}}</a>
    <img @click="closeBsc()" style="width: 20px;vertical-align: bottom;" src="/imgs/close.png" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import headerCell from "@/components/header/index.vue";
import footerCell from "@/components/footer/index.vue";

export default defineComponent({
  components: { headerCell, footerCell },
  data(){
    return {
      entclang : 'tc',
      targetChainId : 56,
      chentext : {
        tc :{
          "tips03":"您的錢包當前連接的主網為：[",
          "tips04":"]，ATTA平台當前僅支持BSC主網，點擊切換至BSC主網 "
        },
        en : {
          "tips03":"Your wallet is connected to the [",
          "tips04":"]. To use BSC on ATTA, please switch to"
        }
      }
    }
  },
  mounted (){
    let self = this;
    if (document.cookie.indexOf('lang=en') > -1) {
      self.entclang = 'en';
    }
    if (window.location.href.indexOf('atta.zone') == -1) {
      self.targetChainId = 97;
    }
    window.CHAIN.WALLET.chainId()
      .then(function(res){
        self.RPCSwitchHint(res);
      })
  },
  methods :  {
    closeBsc() {
        let dom:any = document.querySelector('.bsc-tips');
        dom.style.display = 'none';
    },
    showBsc() {
        let dom:any = document.querySelector('.bsc-tips');
        dom.style.display = 'block';
    },
    RPCSwitchHint(res) {
      if (res != this.targetChainId) {
        let dom1:any = document.querySelector('.rpcname');
        let dom2:any = document.querySelector('.target-rpcname');
        dom1.textContent = this.chentext[this.entclang].tips03+RPCSetting[res]['CHAIN_NAME']+this.chentext[this.entclang].tips04;
        dom2.textContent = RPCSetting[targetChainId]['CHAIN_NAME'];
        this.showBsc();
      } else {
        this.closeBsc();
      }
    },
    changenetwork() {
      window.CHAIN.WALLET.switchRPCSettings(this.targetChainId).then(()=>{
        this.closeBsc();
      })
    }
  }
})
</script>

<style lang="scss">
@import '@/assets/css/index.scss';
</style>