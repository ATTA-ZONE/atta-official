<template>
  <div class="footer flex" id="Contact">
    <div class="footer-left">
      <img src="@/assets/imgs/logo.png" />
      <p v-if="isEn">
        ATTA is a blockchain-based content
        <br />creator for premium copyright assets.
      </p>
      <p v-else>ATTA是基於區塊鏈NFT技術構建的數字潮流品牌</p>
    </div>
    <div class="footer-right">
      <span>{{ $t("Follow Us") }}</span>
      <div class="foot-imgs">
        <div class="foot-wechat-wrap">
          <img
            class="foot-wechat"
            v-if="showWechat"
            src="@/assets/imgs/wechat.jpeg"
          />
          <img
            class="foot-wechat-icon"
            @click="toPage(1)"
            src="@/assets/imgs/footer01.png"
          />
        </div>
        <img @click="toPage(2)" src="@/assets/imgs/footer02.png" />
        <img @click="toPage(3)" src="@/assets/imgs/footer03.png" />
        <img @click="toPage(4)" src="@/assets/imgs/footer04.png" />
        <img @click="toPage(5)" src="@/assets/imgs/footer05.png" />
        <img @click="toPage(6)" src="@/assets/imgs/footer06.png" />
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const showWechat = ref(false);

    const toPage = (type: number) => {
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
      toPage
    }
  }
});
</script>
<style scoped lang='scss'>
</style>