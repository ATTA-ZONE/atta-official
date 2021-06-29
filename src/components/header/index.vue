<template>
  <div class="home-page-one" id="Introduction">
    <div class="mask-container" v-if="showMask">
      <div class="mask-wrap">
        <a @click="goAnchor('Upcoming')" style="margin-top: 0">
          {{ $t("Upcoming") }}
        </a>
        <a @click="goAnchor('Contents')">
          {{ $t("NFT Contents") }}
        </a>
        <a @click="goAnchor('Contact')">
          {{ $t("Contact") }}
        </a>
        <a @click="goAssets">{{ $t("Asset Management") }}</a>

        <div class="wallet-container" @click="getAddress">
          <div class="wallet-status">
            <div>
              {{
                accountAddress ? $t("Wallet connected") : $t("Connect Wallet")
              }}
            </div>
            <div class="wallet-status-address">{{ accountAddress }}</div>
          </div>
          <img class="connect-status-img" :src="walletStatus" />
        </div>
        <div @click="showModal = true" class="top-btn">
          {{ $t("Claim Your NFT") }}
        </div>
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
      <router-link to="/"
        ><img class="brandLogo" src="/imgs/logo.png"
      /></router-link>
      <img
        class="head-menu"
        @click="showMask = true"
        v-if="isMobile"
        src="/imgs/menu.png"
      />
      <div class="header-links" v-if="!isMobile">
        <a @click="goAnchor('Introduction')">
          {{ $t("Introduce") }}
        </a>
        <a @click="goAnchor('Upcoming')">
          {{ $t("Upcoming") }}
        </a>
        <a @click="goAnchor('Contents')">
          {{ $t("NFT Contents") }}
        </a>
        <a @click="goAnchor('Contact')">
          {{ $t("Contact") }}
        </a>
        <router-link to="/assets">{{ $t("Asset Management") }}</router-link>
        <span @click="showModal = true" class="top-btn">{{
          $t("Claim Your NFT")
        }}</span>
        <div class="wallet-container" @click="getAddress">
          <img class="connect-status-img" :src="walletStatus" />
          <div class="wallet-status">
            <div class="wallet-status-title">
              {{
                accountAddress ? $t("Wallet connected") : $t("Connect Wallet")
              }}
            </div>
            <div class="wallet-status-address">{{ accountAddress }}</div>
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
    v-if="showModal"
    @address="emitAddress"
    @closemodal="closemodal"
  />
</template>
<script lang='ts'>
import { computed, defineComponent, onMounted, onUnmounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import modal from "../../views/Home/modal.vue";
import greenDot from "/imgs/greenDot.png";
import redDot from "/imgs/redDot.png";
import { initWeb3 } from "../../assets/js/initweb3";
import { useRouter } from "vue-router";
import { getCookie, setCookie } from "../../utils";
import axios from "../../api";

export default defineComponent({
  components: { modal },
  setup() {
    const router = useRouter();
    const { locale } = useI18n();
    const showMask = ref(false);
    const isMobile = ref(false);
    const showModal = ref(false);
    const accountAddress = ref("");

    const switchLanauge = () => {
      var lang = getCookie("lang") == 'en' ? "EN" : "TC";
      const json = { lang: lang };
      const formData = new FormData();
      formData.append("lang", lang);
      axios.post(window.base_url + "/v2/user/lang/select", formData);
      
    };

    const switchLang = (str: string) => {
      locale.value = str;
      setCookie("lang", str);
      showMask.value = false;
      switchLanauge();
      window.location.reload()
    };

    const closemodal = () => {
      showModal.value = false;
    };

    const walletStatus = computed(() => {
      return accountAddress.value ? greenDot : redDot;
    });

    const getAddress = () => {
      if (!accountAddress.value) {
        initWeb3().then((res: any) => {
          if (res.length > 0) {
            accountAddress.value = res[0];
            setCookie("currentAddress", res[0]);
          }
        });
      } else {
        window.CHAIN.WALLET.connect("MetaMask")
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

    const resizeWindow = () => {
      let width = document.getElementsByTagName("body")[0].offsetWidth;
      if (width < 992) {
        isMobile.value = true;
      } else {
        isMobile.value = false;
      }
    };

    onUnmounted(() => {
      window.removeEventListener("resize", resizeWindow);
    });

    onMounted(async () => {
      if (window.location.href.indexOf("atta.zone") > -1) {
        window.base_url = "https://www.bazhuayu.io";
        window.scansite_base_url = "https://api.bscscan.com";
        window.locationUrl = window.location.origin;
      } else {
        window.base_url = "http://47.118.74.48:8081";
        window.scansite_base_url = "https://api-testnet.bscscan.com";
        window.locationUrl = "http://47.118.74.48:8081";
      }
      accountAddress.value =
        getCookie("currentAddress") == "false"
          ? ""
          : getCookie("currentAddress");
      console.log(accountAddress.value);
      window.addEventListener("resize", resizeWindow);
      resizeWindow();
      switchLanauge();
    });

    const emitAddress = (str: string) => {
      accountAddress.value = str;
    };

    return {
      switchLang,
      goAnchor,
      closemodal,
      getAddress,
      showMask,
      showModal,
      isMobile,
      accountAddress,
      greenDot,
      redDot,
      walletStatus,
      emitAddress,
      goAssets,
    };
  },
});
</script>
<style lang='scss'>
@import "./index.scss";
</style>