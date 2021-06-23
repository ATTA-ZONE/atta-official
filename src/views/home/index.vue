<template>
  <div class="home-page flex">
    <div>
      <header-cell />
      <div class="home-page-two flex">
        <div class="page-two flex">
          <img src="@/assets/imgs/pageTwoLeft.png" />
          <img src="@/assets/imgs/pageTworightTop.png" />
          <p :class="[isEn ? 'page-two-en' : 'page-two-ch fz-fm-pf']">
            {{ $t("attaInfo") }}<br/>{{ $t("attaInfo1") }} 
          </p>
        </div>
      </div>
      <div class="home-page-three" id="Upcoming">
        <div class="onehanglogo">
          <img class="logo1" src="@/assets/imgs/logo01.png" />
          <img class="logo2" src="@/assets/imgs/logo02.png" />
          <img class="logo6" src="@/assets/imgs/logo06.png" />
        </div>
        <div class="twohanglogo">
          <img class="logo3" src="@/assets/imgs/bsc.png" />
          <div class="img-center">
            <img class="logo7" src="@/assets/imgs/logo07.png" />
          </div>
          <div class="img-center">
            <img class="logo5" src="@/assets/imgs/logo05.png" />
          </div>
          <img src="@/assets/imgs/pageTwoRightBtm.png" class="start" />
        </div>
      </div>
      <div class="home-page-three threeweb">
        <div class="onehanglogo">
          <img class="logo2" src="@/assets/imgs/logo02.png" />
          <img class="logo3" src="@/assets/imgs/bsc.png" />
        </div>
        <div class="twohanglogo threehanglogo">
          <img class="logo1" src="@/assets/imgs/logo01.png" />
        </div>
        <div class="twohanglogo">
          <img class="logo5" src="@/assets/imgs/logo05.png" />
          <img class="logo6" src="@/assets/imgs/logo06.png" />
          <img class="logo7" src="@/assets/imgs/logo07.png" />
          <img src="@/assets/imgs/pageTwoRightBtm.png" class="start" />
        </div>
      </div>
      <div class="home-page-four flex">
        <img class="blur-guang" src="@/assets/imgs/blur.png" />
        <div class="image-left">
          <div>
            <img
              :class="{ 'image-bottom': transitionImage }"
              src="@/assets/imgs/swiper03.png"
            />
            <img
              :class="{ 'image-middle': transitionImage }"
              src="@/assets/imgs/swiper02.png"
            />
            <img
              :class="{ 'image-top': transitionImage }"
              src="@/assets/imgs/swiper01.png"
            />
          </div>
          <img src="@/assets/imgs/binance.png" />
        </div>
        <div class="txt-right">
          <div class="txt-middle">
            <span class="han-son">
              <font style="color: #a8deee">{{ $t("Upcoming") }} -</font>
              <br />
              {{ $t("O2 Music NFT") }}
            </span>
            <p class="fz-fm-pf">{{ $t("musicInfo") }}</p>
            <a>{{ $t("Coming soon") }}</a>
          </div>
        </div>
      </div>
      <home-five />
      <home-six />
      <footer-cell />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import headerCell from "./header.vue";
import homeFive from "./homeFive.vue";
import homeSix from "./homeSix.vue";
import footerCell from "./footerCell.vue";

export default defineComponent({
  components: { headerCell, homeFive, homeSix, footerCell },
  setup: () => {
    const { locale } = useI18n();

    const transitionImage = ref(false);

    const isEn = computed(() => {
      return locale.value.trim() == "en";
    });

    const handleScroll = () => {
      let scrollY = document.documentElement.scrollTop;
      if (scrollY >= 1300) {
        transitionImage.value = true;
      } else {
        transitionImage.value = false;
      }
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    return {
      transitionImage,
      isEn
    };
  },
});
</script>


<style lang="scss">
@import "./index.scss";
</style>
