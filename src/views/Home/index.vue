<template>
  <header-cell />
  <div class="video-wrap">
    <video class="media-video" autoplay loop src="/nftInfo.mp4" muted></video>
    <div class="header-txt flex" @click="playVideo">
      <img src="/imgs/Text.png" />
    </div>
    <img class="star-image" src="/imgs/pageTworightTop.png" />
  </div>
  <div :class="['home-page flex']">
    <div>
      <div class="home-page-two flex">
        <div :class="['page-two flex',isEn?'hanson':'']">
          <img src="/imgs/pageTwoLeft.png" />
          <p :class="[isEn ? 'page-two-en' : 'page-two-ch fz-fm-pf']">
            {{ $t("attaInfo") }}<br />{{ $t("attaInfo1") }}
          </p>
        </div>
      </div>
      <div class="atta-game">
        <div class="game-title">
          <h5 class="game-pc">{{$t('home_match_words1')}}{{$t('home_match_words1_bz')}}</h5>
          <h5 class="game-mb"><font style="color:#A9DEEE;line-height:36px;">{{$t('home_match_words1')}}</font><br/>{{$t('home_match_words1_bz')}}</h5>
          <p>{{$t('home_match_words2')}}</p>
        </div>
        <div class="game-list flex">
          <div>
            <img src="/imgs/game1.png" alt="">
            <p>{{$t('home_match_words3')}}</p>
          </div>
          <div>
            <img src="/imgs/game2.png" alt="">
            <p>{{$t('home_match_words4')}}</p>
          </div>
          <div>
            <img src="/imgs/game3.png" alt="">
            <p>{{$t('home_match_words5')}}</p>
          </div>     
        </div>
      </div>
      <div class="home-page-three" id="Upcoming">
        <div class="onehanglogo">
          <img class="logo3" src="/imgs/bsc.png" />
          <img class="logo2" src="/imgs/logo02.png" />
          <img class="logo9" src="/imgs/logo09.png" />
          <img class="logo1" src="/imgs/logo01.png" />
        </div>
        <div class="twohanglogo">
          <div class="img-center">
            <img class="logo7" src="/imgs/logo07.png" />
          </div>
          <img class="logo10" src="/imgs/logo10.png" />
          <div class="img-center">
            <img class="logo5" src="/imgs/logo05.png" />
          </div>
          <img class="logo8" src="/imgs/logo08.png" />
          <div class="img-right">
            <img class="logo6" src="/imgs/logo06.png" />
          </div>
          <img src="/imgs/pageTwoRightBtm.png" class="start" />
        </div>
      </div>
      <div class="home-page-three threeweb">
        <div class="onehanglogo">
          <img class="logo3" src="/imgs/bsc.png" />
          <img class="logo2" src="/imgs/logo02.png" />
          <img class="logo8" src="/imgs/logo08.png" />
        </div>
        <div class="twohanglogo">
          <img class="logo1" src="/imgs/logo01.png" />
          <img class="logo9" src="/imgs/logo09.png" />
          <img src="/imgs/pageTwoRightBtm.png" class="start" />
        </div>
        <div class="threehanglogo">
          <img class="logo5" src="/imgs/logo05.png" />
          <img class="logo6" src="/imgs/logo06.png" />
          <img class="logo7" src="/imgs/logo07.png" />
          <img class="logo10" src="/imgs/logo10.png" />
        </div>
      </div>
      <div class="home-page-four flex">
        <img class="blur-guang" src="/imgs/blur.png" />
        <div class="image-left">
          <div>
            <img
              :class="{ 'image-bottom': transitionImage }"
              src="/imgs/swiper03.png"
            />
            <img
              :class="{ 'image-middle': transitionImage }"
              src="/imgs/swiper02.png"
            />
            <img
              :class="{ 'image-top': transitionImage }"
              src="/imgs/swiper01.png"
            />
          </div>
          <img src="/imgs/binance.png" />
        </div>
        <div class="txt-right">
          <div class="txt-middle">
            <span :class="isEn?'hanson':''">
              <font style="color: #a8deee">{{ $t("Upcoming") }} -</font>
              <br />
              {{ $t("O2 Music NFT") }}
            </span>
            <p :class="['fz-fm-pf',isEn?'niunito':'']">{{ $t("musicInfo") }}</p>
            <a @click="jumppage()">{{ $t("Coming soon") }}</a>
          </div>
        </div>
      </div>
      <home-five />
      <home-six />
      <div class="downappbox pcstyle">
        <div class="h5show">
          <p class="fz-fm-zhzh">{{ $t("Scan to download") }}</p>
          <p class="fz-fm-zhzh" style="margin-top: 20px;">ATTA APP</p>
        </div>
        <div class="imgbox">
          <img src="/imgs/code.png" alt="">
        </div>
        <div class="pcshow">
          <p class="fz-fm-zhzh">{{ $t("Scan to download") }}</p>
          <p class="fz-fm-zhzh" style="margin-top: 20px;">ATTA APP</p>
          <p class="content">{{$t("Scan to download2")}}</p>
        </div>
      </div>
    </div>
  </div>
  <footer-cell />
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import homeFive from "./homeFive.vue";
import homeSix from "./homeSix.vue";
import headerCell from "@/components/header/index.vue";
import footerCell from "@/components/footer/index.vue";

export default defineComponent({
  components: { homeFive, homeSix ,headerCell,footerCell},
  setup() {
    const { locale } = useI18n();

    const transitionImage = ref(false);

    const isEn = computed(() => {
      return locale.value.trim() == "en";
    });

    const playVideo = () => {
      let dom: any = document.querySelector(".media-video")
      if (dom.paused) {
        dom.play()
      }
    }

    const handleScroll = () => {
      let scrollY = document.documentElement.scrollTop;
      if (scrollY >= 1300) {
        transitionImage.value = true;
      } else {
        transitionImage.value = false;
      }
    };
    const jumppage = () => {
        window.open('https://www.bazhuayu.io/mobile/tc/artwork.html?id=1');
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    return {
      transitionImage,
      isEn,
      playVideo,
      jumppage
    };
  },
});
</script>


<style lang="scss">
@import "./index.scss";
</style>
