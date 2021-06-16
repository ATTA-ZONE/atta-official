<template>
  <div class="home-page flex">
    <div>
      <div class="home-page-one" id="Introduction">
        <video
          autoplay="autoplay"
          style="width: 100%"
          loop="loop"
          src="@/assets/imgs/nftInfo.mp4"
          muted="muted"
        ></video>
        <div class="mask-container" v-if="showMask">
          <div>
            <a @click="goAnchor('Upcoming')" style="margin-top: 0">
              {{
                $t('Upcoming')
              }}
            </a>
            <a @click="goAnchor('Contents')">
              {{
                $t('NFT Contents')
              }}
            </a>
            <a @click="goAnchor('Service')">
              {{
                $t('Services')
              }}
            </a>
            <a @click="goAnchor('Contact')">
              {{
                $t("Contact")
              }}
            </a>
            <p class="switchlanguagebox">
              <span @click="switchyy('en');">EN</span>
              <span style="margin: 0 16px">|</span>
              <span @click="switchyy('ch');">繁</span>
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
              {{
                $t("Introduce")
              }}
            </a>
            <a @click="goAnchor('Upcoming')">
              {{
                $t("Upcoming")
              }}
            </a>
            <a @click="goAnchor('Contents')">
              {{
                $t("NFT Contents")
              }}
            </a>
            <a @click="goAnchor('Service')">
              {{
                $t("Services")
              }}
            </a>
            <a @click="goAnchor('Contact')">
              {{
                $t("Contact")
              }}
            </a>
            <p class="switchlanguagebox">
              <a @click="switchyy('en')">EN</a>
              <span style="margin: 0 16px">|</span>
              <a @click="switchyy('ch')">繁</a>
            </p>
          </div>
        </div>
        <div class="header-txt">
          <img src="@/assets/imgs/Text.png" />
        </div>
      </div>
      <div class="home-page-two flex" id>
        <div class="page-two flex">
          <img src="@/assets/imgs/pageTwoLeft.png" />
          <img src="@/assets/imgs/pageTworightTop.png" />
          <p v-if="locale == 'en'" class="page-two-en">{{ $t("attaInfo") }}</p>
          <p v-else class="page-two-ch fz-fm-pf">{{ $t("attaInfo") }}</p>
        </div>
      </div>
      <div class="home-page-three" id="Upcoming">
        <div class="onehanglogo">
          <img class="logo1" src="@/assets/imgs/logo01.png" />
          <img class="logo2" src="@/assets/imgs/logo02.png" />
          <img class="logo6" src="@/assets/imgs/logo06.png" />
        </div>
        <div class="twohanglogo">
          <img class="logo7" src="@/assets/imgs/logo07.png" />
          <img class="logo5" src="@/assets/imgs/logo05.png" />
          <img src="@/assets/imgs/pageTwoRightBtm.png" class="start" />
        </div>
      </div>
      <div class="home-page-three threeweb">
        <div class="onehanglogo">
          <img class="logo2" src="@/assets/imgs/logo02.png" />
          <img class="logo6" src="@/assets/imgs/logo06.png" />
        </div>
        <div class="twohanglogo threehanglogo">
          <img class="logo1" src="@/assets/imgs/logo01.png" />
        </div>
        <div class="twohanglogo">
          <img class="logo7" src="@/assets/imgs/logo07.png" />
          <img class="logo5" src="@/assets/imgs/logo05.png" />
          <img src="@/assets/imgs/pageTwoRightBtm.png" class="start" />
        </div>
      </div>
      <div class="home-page-four flex">
        <img class="blur-guang" src="@/assets/imgs/blur.png" />
        <div class="image-left">
          <div>
            <img :class="{ 'image-bottom': transitionImage }" src="@/assets/imgs/swiper03.png" />
            <img :class="{ 'image-middle': transitionImage }" src="@/assets/imgs/swiper02.png" />
            <img :class="{ 'image-top': transitionImage }" src="@/assets/imgs/swiper01.png" />
          </div>
          <img src="@/assets/imgs/binance.png" />
        </div>
        <div class="txt-right">
          <div class="txt-middle">
            <span class="han-son">
              <font style="color: #a8deee;">{{ $t("Upcoming") }} -</font>
              <br />
              {{ $t("O2 Music NFT") }}
            </span>
            <p class="fz-fm-pf">{{ $t('musicInfo') }}</p>
            <a>{{ $t("Coming soon") }}</a>
          </div>
        </div>
      </div>
      <div class="home-page-five" id="Contents">
        <img class="img-search" src="@/assets/imgs/SearchLeft.png" />
        <div class="header flex">
          <span class="han-son">
            {{ $t("Discover ATTA") }}
            <br />
            <font style="color: #a8deee;">{{ $t("NFT Contents") }}</font>
          </span>
          <p>
            {{ $t("ATTA specializes in NFT contents including but not limited to:") }}
            <font
              style="color: #fff"
            >{{ $t("Music, Movies/TV shows, E-sports, Celebrities & Charity.") }}</font>
          </p>
        </div>
        <div class="commodity-list flex">
          <div class="commodity">
            <div class="commodity-top commodity-left">
              <img src="@/assets/imgs/front.png" />
            </div>
            <p>{{ $t("TYLOO CSGO - ESPORTS NFT") }}</p>
            <div class="price-total flex">
              <div>
                <p>Price</p>
                <p>?? BUSD</p>
              </div>
              <div>
                <p>Total Edition</p>
                <p>???</p>
              </div>
            </div>
            <div class="commodity-info flex">
              <img src="@/assets/imgs/Ellipse.png" />
              <div>
                <p>E-sports</p>
                <p>{{ $t("TYLOO CSGO TEAM") }}</p>
              </div>
            </div>
            <a @click="toBaZhuayu">
              {{
                $t("E-SPORT")
              }}
            </a>
          </div>
          <div class="commodity">
            <div class="commodity-top commodity-middle">
              <img src="@/assets/imgs/front02.png" />
            </div>
            <p>{{ $t("April - Experimental Music NFT") }}</p>
            <div class="price-total flex">
              <div>
                <p>Price</p>
                <p>350 BUSD</p>
              </div>
              <div>
                <p>Total Edition</p>
                <p>150</p>
              </div>
            </div>
            <div class="commodity-info flex">
              <img src="@/assets/imgs/Ellipse02.png" />
              <div>
                <p>Musician& Artist</p>
                <p>{{ $t("DING WU") }}</p>
              </div>
            </div>
            <a @click="toBaZhuayu">
              {{
                $t("MUSIC")
              }}
            </a>
          </div>
          <div class="commodity">
            <div class="commodity-top commodity-right">
              <img src="@/assets/imgs/front03.png" />
            </div>
            <p>{{ $t("NIU N.X - Designer Toy NFT") }}</p>
            <div class="price-total flex">
              <div>
                <p>Price</p>
                <p>2039 HKD</p>
              </div>
              <div>
                <p>Total Edition</p>
                <p>200</p>
              </div>
            </div>
            <div class="commodity-info flex">
              <img src="@/assets/imgs/Ellipse03.png" />
              <div>
                <p>Celebrities</p>
                <p>{{ $t('Raquel Xu') }}</p>
              </div>
            </div>
            <a @click="toBaZhuayu">
              {{
                $t('CELEBRITIES')
              }}
            </a>
          </div>
        </div>
        <div class="nft">
          <img src="@/assets/imgs/Group426.png" />
          <p>
            {{
              $t("Find more exclusive NFTs at BAZHUAYU!")
            }}
          </p>
          <a @click="toBaZhuayu">
            {{
              $t("Discover More NFTs")
            }}
          </a>
        </div>
      </div>
      <div class="home-page-six" id="Service">
        <span class="han-son">
          NFT-related
          <br />
          <font style="color: rgb(168, 222, 238);">{{ $t("Services") }}</font>
        </span>
        <img class="mouse" src="@/assets/imgs/MouseLeft.png" />
        <p>
          {{ $t("If you are a content creator, celebrity, artist, or real-world trend label interested in") }}
          <br />
          {{ $t("NFT, ATTA can provide you with a range of the most professional NFT services,which include:") }}
        </p>
        <div class="ntf-services" v-if="locale == 'en'">
          <img src="@/assets/imgs/glossy01.png" />
          <img style="margin: 34px 5% 0" src="@/assets/imgs/glossy02.png" />
          <img src="@/assets/imgs/glossy03.png" />
        </div>
        <div class="ntf-services" v-if="locale == 'en'">
          <img style="margin-right: 5%" src="@/assets/imgs/glossy04.png" />
          <img src="@/assets/imgs/glossy05.png" />
        </div>
        <div class="ntf-services" v-if="locale == 'ch'">
          <img src="@/assets/imgs/ch5.png" />
          <img style="margin: 34px 5% 0" src="@/assets/imgs/ch6.png" />
          <img src="@/assets/imgs/ch7.png" />
        </div>
        <div class="ntf-services" v-if="locale == 'ch'">
          <img style="margin-right: 5%" src="@/assets/imgs/ch8.png" />
          <img src="@/assets/imgs/ch9.png" />
        </div>
      </div>
      <div class="footer flex" id="Contact">
        <div class="footer-left">
          <img src="@/assets/imgs/logo.png" />
          <p v-if="locale == 'en'">
            ATTA is a blockchain-based content
            <br />creator for premium copyright assets.
          </p>
          <p v-else>ATTA是基於區塊鏈NFT技術構建的數字潮流品牌</p>
        </div>
        <div class="footer-right">
          <span>{{ $t("Follow Us") }}</span>
          <div class="foot-imgs">
            <div class="foot-wechat-wrap">
              <img class="foot-wechat" v-if="showWechat" src="@/assets/imgs/wechat.jpeg" />
              <img class="foot-wechat-icon" @click="toPage(1)" src="@/assets/imgs/footer01.png" />
            </div>
            <img @click="toPage(2)" src="@/assets/imgs/footer02.png" />
            <img @click="toPage(3)" src="@/assets/imgs/footer03.png" />
            <img @click="toPage(4)" src="@/assets/imgs/footer04.png" />
            <img @click="toPage(5)" src="@/assets/imgs/footer05.png" />
            <img @click="toPage(6)" src="@/assets/imgs/footer06.png" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <modal v-if="showModal" @closeModal="closeModal" />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from "vue";
import { useI18n } from 'vue-i18n'
import modal from './modal.vue'

export default defineComponent({
  components: {modal},
  setup: () => {
    const { locale } = useI18n()
    const isMobile = ref(false);
    const showMask = ref(false);
    const showWechat = ref(false);
    const transitionImage = ref(false);
    const showModal = ref(false);
    
    const resizeWindow = () => {
      let width = document.getElementsByTagName("body")[0].offsetWidth;
      if (width < 992) {
        isMobile.value = true;
      } else {
        isMobile.value = false;
      }
    };
    const handleScroll = () => {
      let scrollY = document.documentElement.scrollTop;
      if (scrollY >= 1300) {
        transitionImage.value = true;
      } else {
        transitionImage.value = false;
      }
    };

    onUnmounted(() => {
      window.removeEventListener('resize', resizeWindow)
    })

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
      window.addEventListener('resize', resizeWindow)
      resizeWindow()
    });

    const goAnchor = (id:number|string) => {
      if (id) {
        let homePage = document.querySelector("#" + id);
        console.log(homePage);
        if (homePage) { homePage.scrollIntoView(true) }
      }
    };

    const switchyy = (yy:string) => {
      locale.value = yy;
      showMask.value = false;
    };
    const closeModal = () => {
      showModal.value = false
    };

    const toBaZhuayu = () => {
      window.open("https://www.bazhuayu.io/");
    };
    const toPage = (type:number) => {
      switch (type) {
        case 1:
          showWechat.value = !showWechat.value;
          break;
        case 2:
          window.open("https://weibo.com/attaofficial/");
          break;
        case 3:
          window.open("https://twitter.com/_ATTA_zone");
          break;
        case 4:
          window.open("https://t.me/attaofficialeng1")
          break;
        case 5:
          window.open("https://medium.com/atta-official");
          break;
        case 6:
          window.open("https://www.instagram.com/atta.zone.official/");
          break;
      }
    };
    return {
      goAnchor,
      switchyy,
      toBaZhuayu,
      toPage,
      isMobile,
      showMask,
      showWechat,
      transitionImage,
      locale,
      closeModal,
      showModal
    };
  }
});
</script>


<style lang="scss">
@import "./home.scss";
</style>
