<template>
  <div class="footer flex" id="Contact">
    <div class="footer-left">
      <img src="/imgs/logo.png" />
      <p v-if="isEn" class="niunito">
        ATTA is a content creator for premium<br/> copyright assets based on NFT
      </p>
      <p v-else>ATTA是基於NFT的數字娛樂與潮流內容生廠商</p>
    </div>
    <div class="footer-right">
      <span :class="isEn?'niunito':''">{{ $t("Follow Us") }}</span>
      <div class="foot-imgs">
        <div class="foot-wechat-wrap">
          <img
            class="foot-wechat"
            v-if="showWechat"
            src="/imgs/wechat.jpeg"
          />
          <img
            class="foot-wechat-icon"
            @click="toPage(1)"
            src="/imgs/footer01.png"
          />
        </div>
        <img @click="toPage(3)" src="/imgs/footer03.png" />
        <img @click="toPage(4)" src="/imgs/footer04.png" />
        <img @click="toPage(5)" src="/imgs/footer05.png" />
        <img @click="toPage(6)" src="/imgs/footer06.png" />
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { computed, defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  setup() {
    const showWechat = ref(false);
    const { locale } = useI18n();

    const isEn = computed(() => {
      return locale.value.trim() == "en";
    });

    const toPage = (type: number) => {
      switch (type) {
        case 1:
          showWechat.value = !showWechat.value;
          break;
        case 2:
          window.open("https://weibo.com/attaofficial/");
          break;
        case 3:
          window.open("https://twitter.com/ATTA_NFT");
          break;
        case 4:
          window.open("https://t.me/attaofficialeng1");
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
      showWechat,
      isEn,
      toPage
    }
  }
});
</script>
<style lang="scss">
  @import './index.scss'
</style>