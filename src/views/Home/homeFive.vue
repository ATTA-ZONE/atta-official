<template>
  <div class="home-page-five" id="Contents">
        <img class="img-search" src="/imgs/SearchLeft.png" />
        <div class="header flex between">
          <span class="han-son">
            {{ $t("Discover ATTA") }}
            <br />
            <font style="color: #a8deee">{{ $t("NFT Contents") }}</font>
          </span>
          <p :class="isEn?'niunito':''">
            {{
              $t(
                "ATTA specializes in NFT contents including but not limited to:"
              )
            }}
            <font style="color: #fff">{{
              $t("Music, Movies/TV shows, E-sports, Celebrities & Charity.")
            }}</font>
          </p>
        </div>
        <div class="commodity-list flex">
          <div class="commodity">
            <div class="commodity-top commodity-left">
              <img src="/imgs/front.png" />
            </div>
            <p :class="isEn?'niunito':''">{{ $t("TYLOO CSGO - ESPORTS NFT") }}</p>
            <div class="price-total flex">
              <div>
                <p :class="isEn?'niunito':''">Price</p>
                <p :class="isEn?'hanson':''">?? BUSD</p>
              </div>
              <div>
                <p :class="isEn?'niunito':''">Total Edition</p>
                <p :class="isEn?'hanson':''">???</p>
              </div>
            </div>
            <div class="commodity-info flex">
              <img src="/imgs/Ellipse.png" />
              <div :class="isEn?'niunito':''">
                <p>E-sports</p>
                <p>{{ $t("TYLOO CSGO TEAM") }}</p>
              </div>
            </div>
            <a :class="isEn?'niunito':''" @click="toBaZhuayu">
              {{ $t("E-SPORT") }}
            </a>
          </div>
          <div class="commodity">
            <div class="commodity-top commodity-middle">
              <img src="/imgs/front02.png" />
            </div>
            <p :class="isEn?'niunito':''">{{ $t("April - Experimental Music NFT") }}</p>
            <div class="price-total flex">
              <div>
                <p :class="isEn?'niunito':''">Price</p>
                <p :class="isEn?'hanson':''">350 BUSD</p>
              </div>
              <div>
                <p :class="isEn?'niunito':''">Total Edition</p>
                <p :class="isEn?'hanson':''">150</p>
              </div>
            </div>
            <div class="commodity-info flex">
              <img src="/imgs/Ellipse02.png" />
              <div :class="isEn?'niunito':''">
                <p>Musician& Artist</p>
                <p>{{ $t("DING WU") }}</p>
              </div>
            </div>
            <a :class="isEn?'niunito':''" @click="toBaZhuayu">
              {{ $t("MUSIC") }}
            </a>
          </div>
          <div class="commodity">
            <div class="commodity-top commodity-right">
              <img src="/imgs/front03.png" />
            </div>
            <p :class="isEn?'niunito':''">{{ $t("NIU N.X - Designer Toy NFT") }}</p>
            <div class="price-total flex">
              <div>
                <p :class="isEn?'niunito':''">Price</p>
                <p :class="isEn?'hanson':''">2039 HKD</p>
              </div>
              <div>
                <p :class="isEn?'niunito':''">Total Edition</p>
                <p :class="isEn?'hanson':''">200</p>
              </div>
            </div>
            <div class="commodity-info flex">
              <img src="/imgs/Ellipse03.png" />
              <div :class="isEn?'niunito':''">
                <p>Celebrities</p>
                <p>{{ $t("Raquel Xu") }}</p>
              </div>
            </div>
            <a :class="isEn?'niunito':''" @click="toBaZhuayu">
              {{ $t("CELEBRITIES") }}
            </a>
          </div>
        </div>
        <div class="nft">
          <img src="/imgs/Group426.png" />
          <p :class="isEn?'niunito':''">
            {{ $t("Find more exclusive NFTs at BAZHUAYU!") }}
          </p>
          <a :class="isEn?'niunito':''" @click="toBaZhuayu">
            {{ $t("Discover More NFTs") }}
          </a>
        </div>
      </div>
</template>
<script lang='ts'>
import { defineComponent, computed } from "vue";
import { useI18n } from "vue-i18n";
export default defineComponent({
  setup() {
    const { locale } = useI18n();
    const isEn = computed(() => {
      return locale.value.trim() == "en";
    });
    const toBaZhuayu = () => {
      window.open("https://www.bazhuayu.io/");
    };

    return {
      toBaZhuayu,
      isEn
    }
  }
});
</script>
<style  scoped>
  .between{
    justify-content: space-between;
  }
</style>