<template>
  <div class="home-page flex">
    <div>
      <header-cell />
      <div class="home-page-two flex">
        <div class="page-two flex">
          <img src="@/assets/imgs/pageTwoLeft.png" />
          <img src="@/assets/imgs/pageTworightTop.png" />
          <p :class="[isEn ? 'page-two-en' : 'page-two-ch fz-fm-pf']">
            {{ t("attaInfo") }}
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
          <img class="logo7" src="@/assets/imgs/logo07.png" />
          <img class="logo5" src="@/assets/imgs/logo05.png" />
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
              <font style="color: #a8deee">{{ t("Upcoming") }} -</font>
              <br />
              {{ t("O2 Music NFT") }}
            </span>
            <p class="fz-fm-pf">{{ t("musicInfo") }}</p>
            <a>{{ t("Coming soon") }}</a>
          </div>
        </div>
      </div>
      <home-five />
      <div class="home-page-six" id="Service">
        <span class="han-son">
          NFT-related
          <br />
          <font style="color: rgb(168, 222, 238)">{{ t("Services") }}</font>
        </span>
        <img class="mouse" src="@/assets/imgs/MouseLeft.png" />
        <p>
          {{
            t(
              "If you are a content creator, celebrity, artist, or real-world trend label interested in"
            )
          }}
          <br />
          {{
            t(
              "NFT, ATTA can provide you with a range of the most professional NFT services,which include:"
            )
          }}
        </p>
        <div class="ntf-services" v-if="isEn">
          <img src="@/assets/imgs/glossy01.png" />
          <img style="margin: 34px 5% 0" src="@/assets/imgs/glossy02.png" />
          <img src="@/assets/imgs/glossy03.png" />
        </div>
        <div class="ntf-services" v-if="isEn">
          <img style="margin-right: 5%" src="@/assets/imgs/glossy04.png" />
          <img src="@/assets/imgs/glossy05.png" />
        </div>
        <div class="ntf-services" v-if="!isEn">
          <img src="@/assets/imgs/ch5.png" />
          <img style="margin: 34px 5% 0" src="@/assets/imgs/ch6.png" />
          <img src="@/assets/imgs/ch7.png" />
        </div>
        <div class="ntf-services" v-if="!isEn">
          <img style="margin-right: 5%" src="@/assets/imgs/ch8.png" />
          <img src="@/assets/imgs/ch9.png" />
        </div>
      </div>
      <footer-cell />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import headerCell from "./header.vue";
import homeFive from "./homeFive.vue";
import footerCell from "./footerCell.vue";

export default defineComponent({
  components: { headerCell, homeFive, footerCell },
  setup: () => {
    const { locale, t } = useI18n();
    
    const transitionImage = ref(false);

    const isEn = computed(() => {
      return locale.value.trim() == "en";
    });

    const initWeb3 = () => {
      //判断用户是否安装MetaMask钱包插件
      if (typeof window.ethereum === "undefined") {
        //没安装MetaMask钱包进行弹框提示
        alert("请安装MetaMask");
      } else {
        //如果用户安装了MetaMask，你可以要求他们授权应用登录并获取其账号
        window.ethereum
          .enable()
          .catch(function (reason:any) {
            //如果用户拒绝了登录请求
            if (reason === "User rejected provider access") {
              // 用户拒绝登录后执行语句；
            } else {
              // 本不该执行到这里，但是真到这里了，说明发生了意外
              alert("There was a problem signing you in");
            }
          })
          .then(function (accounts) {
            // 判断是否连接以太
            console.log(accounts);
            return accounts[0];
          });
      }
    };

    initWeb3()

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
      isEn,
      t,
    };
  },
});
</script>


<style lang="scss">
@import "./index.scss";
</style>
