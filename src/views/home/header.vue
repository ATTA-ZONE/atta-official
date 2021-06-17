<template>
  <div class="home-page-one" id="Introduction">
    <video
      autoplay
      style="width: 100%"
      loop
      src="@/assets/imgs/nftInfo.mp4"
      muted
    ></video>
    <div class="mask-container" v-if="showMask">
      <div>
        <a @click="goAnchor('Upcoming')" style="margin-top: 0">
          {{ t("Upcoming") }}
        </a>
        <a @click="goAnchor('Contents')">
          {{ t("NFT Contents") }}
        </a>
        <a @click="goAnchor('Service')">
          {{ t("Services") }}
        </a>
        <a @click="goAnchor('Contact')">
          {{ t("Contact") }}
        </a>
        <p class="switchlanguagebox">
          <span @click="switchLang('en')">EN</span>
          <span style="margin: 0 16px">|</span>
          <span @click="switchLang('ch')">繁</span>
        </p>
        <img @click="showMask = false" src="@/assets/imgs/close.png" />
      </div>
    </div>
    <div class="header flex">
      <img class="brandLogo" src="@/assets/imgs/logo.png" />
      <img
        class="head-menu"
        @click="showMask = true"
        v-if="isMobile"
        src="@/assets/imgs/menu.png"
      />
      <div class="header-links" v-if="!isMobile">
        <a @click="goAnchor('Introduction')">
          {{ t("Introduce") }}
        </a>
        <a @click="goAnchor('Upcoming')">
          {{ t("Upcoming") }}
        </a>
        <a @click="goAnchor('Contents')">
          {{ t("NFT Contents") }}
        </a>
        <a @click="goAnchor('Service')">
          {{ t("Services") }}
        </a>
        <a @click="goAnchor('Contact')">
          {{ t("Contact") }}
        </a>
        <span @click="showModal = true" class="top-btn">{{t('Claim Your NFT')}}</span>
        <p class="switchlanguagebox">
          <a @click="switchLang('en')">EN</a>
          <span style="margin: 0 16px">|</span>
          <a @click="switchLang('ch')">繁</a>
        </p>
      </div>
    </div>
    <div class="header-txt">
      <img src="@/assets/imgs/Text.png" />
    </div>
  </div>
  <modal v-if="showModal" @closemodal="closemodal" />
</template>
<script lang='ts'>
import { defineComponent, onMounted, onUnmounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import modal from "./modal.vue";

export default defineComponent({
  components: { modal },
  setup() {
    const { locale, t } = useI18n();
    const showMask = ref(false);
    const isMobile = ref(false);
    const showModal = ref(false);

    const switchLang = (yy: string) => {
      locale.value = yy;
      showMask.value = false;
    };

    const closemodal = () => {
      showModal.value = false;
    };

    const goAnchor = (id: number | string) => {
      if (id) {
        let homePage = document.querySelector("#" + id);
        console.log(homePage);
        if (homePage) {
          homePage.scrollIntoView(true);
        }
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

    onUnmounted(() => {
      window.removeEventListener("resize", resizeWindow);
    });

    onMounted(() => {
      window.addEventListener("resize", resizeWindow);
      resizeWindow();
    });

    return {
      showMask,
      switchLang,
      goAnchor,
      closemodal,
      showModal,
      isMobile,
      t,
    };
  },
});
</script>
<style scoped lang='scss'>
</style>