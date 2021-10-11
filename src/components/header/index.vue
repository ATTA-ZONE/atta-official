<template>
  <div class="home-page-one" id="Introduction">
    <div class="mask-container" v-if="showMask">
      <div class="mask-wrap">
        <router-link to="/">{{ $t("home") }}</router-link>
        <router-link to="/esports">{{ $t("matchName") }}</router-link>
        <router-link to="/headset">{{ $t("headportrait") }}</router-link>
        <router-link to="/charity">{{ $t("ATTA Charity") }}</router-link>
        <router-link to="/libraries">{{ $t("NFTlibrary") }}</router-link>
        <router-link to="/assets">{{ $t("Asset Management") }}</router-link>
        <div class="wallet-container">
          <div class="wallet-status">
            <div @click="getAddress" style="font-size:16px">
              <img class="connect-status-img" :src="walletStatus" />
              {{
                accountAddress ? $t("Wallet connected") : $t("Connect Wallet")
              }}
            </div>
            <div class="wallet-status-address"><span class="address-start">{{accountAddress}}</span>
                <span class="address-end">{{accountAddress.slice(-4)}}</span></div>
            <div v-if="accountAddress">
              {{ $t("Current network") }} {{ chainId == 1 || chainId == 4? "ETH" : "BSC" }}
              <span
                class="wallet-status-btn"
                @click="showNetworkSwitch = true"
                >{{ $t("Switch") }}</span
              >
            </div>
          </div>
        </div>
        <!-- <a href="https://snapshot.org/#/ihgdao.eth" target="_blank" class="top-btn">
          {{ $t("daoVote") }}
        </a> -->
        <p class="switchlanguagebox">
          <span @click="switchLang('en')">EN</span>
          <span style="margin: 0 16px">|</span>
          <span @click="switchLang('ch')">繁</span>
        </p>
        <img
          class="close-img"
          @click="showMask = false"
          src="/imgs/close.png"
        />
      </div>
    </div>
    <div class="header flex">
      <div class="flex">
        <img class="brandLogo" src="/imgs/logo.png" @click="$router.push({name:'Home'})"/>
        <div class="more-list" :class="['header-links', isEn ? 'hanson' : '']" v-if="!isMobile">
          <div class="more-hover">
            <span class="hanson">{{selectedPath == '/'?$t("home"):selectedPath == '/charity'?$t("ATTA Charity"):selectedPath == '/assets/mynft'?$t("Asset Management"):(selectedPath == '/esports/infinity'||selectedPath == '/esports/lol')?$t("matchName"):selectedPath == '/libraries'?$t("NFTlibrary"):selectedPath == '/headset'?$t("headportrait"):''}}</span>
            <img src="/imgs/arrow.png" alt="">
          </div>
          <div class="more-content">
            <router-link :class="[selectedPath == '/'? 'selected-tab':'']" to="/">{{ $t("home") }}</router-link>
            <router-link :class="[(selectedPath == '/esports/infinity'||selectedPath == '/esports/lol')? 'selected-tab':'']" to="/esports/infinity">{{ $t("matchName") }}</router-link>
            <router-link :class="[selectedPath == '/headset'? 'selected-tab':'']" to="/headset">{{ $t("headportrait") }}</router-link>
            <router-link :class="[selectedPath == '/charity'? 'selected-tab':'']" to="/charity">{{ $t("ATTA Charity") }}</router-link>
            <router-link :class="[selectedPath == '/libraries'? 'selected-tab':'']" to="/libraries">{{ $t("NFTlibrary") }}</router-link>
            <router-link :class="[selectedPath == '/assets/mynft'? 'selected-tab':'']" to="/assets">{{ $t("Asset Management") }}</router-link>
          </div>
        </div>
      </div>
      <img
        class="head-menu"
        @click="showMask = true"
        v-if="isMobile"
        src="/imgs/menu.png"
      />
      <div :class="['header-links flex', isEn ? 'hanson' : '']" v-if="!isMobile">
        <!-- <a href="https://snapshot.org/#/ihgdao.eth" target="_blank" class="top-btn">{{
          $t("daoVote")
        }}</a> -->
        <div class="wallet-container">
          <div class="wallet-pos"></div>
          <div class="wallet-status">
            <div class="wallet-status-title flex" @click="getAddress">
              <img class="connect-status-img" :src="walletStatus" />
                {{
                  accountAddress ? $t("Wallet connected") : $t("Connect Wallet")
                }}
              
              <div v-if="accountAddress" class="wallet-status-address">
                <span class="address-start">{{accountAddress}}</span>
                <span class="address-end">{{accountAddress.slice(-4)}}</span>
              </div>
            </div>
            <div v-if="accountAddress">
              {{ $t("Current network") }} {{ chainId == 1 || chainId == 4 ? "ETH" : "BSC" }}
              <span
                class="wallet-status-btn"
                @click="showNetworkSwitch = true"
                >{{ $t("Switch") }}</span
              >
            </div>
          </div>
        </div>
        <p class="switchlanguagebox">
          <a @click="switchLang('en')">EN</a>
          <span style="margin: 0 16px">|</span>
          <a @click="switchLang('ch')">繁</a>
        </p>
      </div>
    </div>
  </div>
  <modal
    :accountAddress="accountAddress"
    @address="emitAddress"
  />
  <tip-modal
    :title="$t('switch network')"
    :content="currentText"
    v-if="showNetworkSwitch"
    @closeNet="showNetworkSwitch=false"
  >
    <span class="switcher-btn" @click="toggleNetwork"
      >{{targetText}}</span
    >
  </tip-modal>
</template>
<script lang='ts'>
import { computed, defineComponent, onMounted, ref, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import modal from "../../views/Home/modal.vue";
import tipModal from "../modals/index.vue";
import greenDot from "/imgs/greenDot.png";
import redDot from "/imgs/redDot.png";
import { initWeb3 } from "../../assets/js/initweb3";
import { useRouter } from "vue-router";
import { getCookie, setCookie } from "../../utils";
import axios from "../../api";
import bus from '../../utils/bus.js'

export default defineComponent({
  components: { modal, tipModal },
  setup() {
    const router = useRouter();
    const { locale, t } = useI18n();
    const showMask = ref(false);
    const isMobile = ref(false);
    const showNetworkSwitch = ref(false);
    const accountAddress = ref('');
    const chainId = ref(1);

    const isEn = computed(() => {
      return locale.value.trim() == "en";
    });
    
    const emitShowModal = () => {
      bus.emit('openHomeModal')
    }

    const selectedPath = computed(()=>location.pathname)

    const currentText = computed(()=> {
      const text = chainId.value == 1 || chainId.value == 4 ? "ETH" : "BSC"
      return t('Current network') + ' ' + text + ' ' + t('Mainnet')
    })
    const targetText = computed(()=> {
      const text = chainId.value == 1 || chainId.value == 4 ? "BSC" : "ETH"
      return t('Click to switch to')+ ' ' + text + ' ' + t('Mainnet')
    })

    const switchLanauge = () => {
      var lang = getCookie("lg") == "en" ? "EN" : "TC";
      const json = { lang: lang };
      const formData = new FormData();
      formData.append("lang", lang);
      axios.post(window.base_url + "/v2/user/lang/select", formData);
    };

    const switchLang = (str: string) => {
      locale.value = str;
      setCookie("lg", str);
      showMask.value = false;
      switchLanauge();
      window.location.reload();
    };

    const walletStatus = computed(() => {
      return accountAddress.value ? greenDot : redDot;
    });

    const getAddress = () => {
      let info = {
        address:'',
        chainId:0
      };
      if (!accountAddress.value) {
        // 获取钱包地址
        initWeb3().then((res: any) => {
          if (res.length > 0) {
            accountAddress.value = res[0];
            info.address = res[0];
            info.chainId = chainId.value;
            setCookie("currentAddress", res[0]);
            axios.post(window.base_url + "/atta/addLogin", info)
            .then((res:any) => {
              window.location.reload();
            }).catch(err=>{
              window.location.reload();
            })
          }
        });
      } else {
        window.CHAIN.WALLET.connect("MetaMask").then((res) => {
          if (res.length > 0) {
            accountAddress.value = res[0];
            info.address = res[0];
            info.chainId = chainId.value;
            setCookie("currentAddress", res[0]);
            axios.post(window.base_url + "/atta/addLogin", info)
            .then((res:any) => {
              window.location.reload();
            }).catch(err=>{
              window.location.reload();
            })
          }
        });
      }
    };

    const goAnchor = (id: number | string) => {
      let homePage = document.querySelector("#" + id);
      if (window.location.pathname !== "/") {
        router.push("/");
      } else if (homePage) {
        homePage.scrollIntoView(true);
      }
      showMask.value = false;
    };

    const goAssets = () => {
      router.push("/assets");
      showMask.value = false;
    };

    const toggleNetwork = () => {
      let id = chainId.value == 1 ? 56 : 1;

      if (id == 56) {
        window.CHAIN.WALLET.switchRPCSettings(id).then(() => {
          chainId.value = 56;
          showNetworkSwitch.value = false
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
              showNetworkSwitch.value = false
            });
      }
    };

    const resizeWindow = () => {
      let width = document.getElementsByTagName("body")[0].offsetWidth;
      if (width < 992) {
        isMobile.value = true;
      } else {
        isMobile.value = false;
      }
    };

    const makeCookie = () => {
      let beforeTime = 0;
      let leaveTime = 0;
      window.addEventListener("unload", () => {
        leaveTime = new Date().getTime() - beforeTime;
        alert(leaveTime);
        if (leaveTime <= 5) {
          setCookie("currentAddress", "false");
        }
      });

      window.addEventListener("beforeunload", () => {
        beforeTime = new Date().getTime();
      });
    };

    const getLocation = () => {
      if (window.location.href.indexOf("atta.zone") > -1) {
        window.base_url = "https://www.bazhuayu.io";
        
        window.locationUrl = window.location.origin;
      } else {
        window.base_url = "http://47.118.74.48:8081";
        
        window.locationUrl = "http://47.118.74.48:8081";
      }
      accountAddress.value =
        getCookie("currentAddress") == "false"
          ? ""
          : getCookie("currentAddress");
    };

    onMounted(() => {
      console.log(selectedPath.value);
      getLocation();
      window.addEventListener("resize", resizeWindow);
      resizeWindow();
      switchLanauge();
      makeCookie();

      window.CHAIN.WALLET.chainId().then((res) => {
        if (res) {
          chainId.value = res;
          switch (res) {
            case 1:
              window.scansite_base_url = "https://api-cn.etherscan.com";
              break;
            case 4:
              window.scansite_base_url = "https://api-rinkeby.etherscan.io";
              break;
            case 56:
              window.scansite_base_url = "https://api.bscscan.com";
              break;
            case 97:
              window.scansite_base_url = "https://api-testnet.bscscan.com";
              break;
          }
          if (res == 1 || res == 4) {
            window.apikey = 'B6E489JHYYK4T1AHTGPI3HHRCSD2VX18X4'
            window.chainType = 'eth'
          } else {
            window.apikey = '9GRF9Q9HT18PBCHQQD84N7U2MGC6I1NE27'
            window.chainType = 'bsc'
          }
        }
      });
      window.ethereum.on("networkChanged", function(accounts) {
        location.reload();
      });
    });

    const emitAddress = (str: string) => {
      accountAddress.value = str;
    };

    return {
      currentText,
      selectedPath,
      targetText,
      switchLang,
      goAnchor,
      getAddress,
      showMask,
      isMobile,
      accountAddress,
      greenDot,
      redDot,
      walletStatus,
      emitAddress,
      goAssets,
      isEn,
      chainId,
      toggleNetwork,
      showNetworkSwitch,
      emitShowModal
    };
  },
});
</script>
<style lang='scss'>
@import "./index.scss";
</style>