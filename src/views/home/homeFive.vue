<template>
  <div class="home-page-five" id="Contents">
        <img class="img-search" src="@/assets/imgs/SearchLeft.png" />
        <div class="header flex">
          <span class="han-son">
            {{ $t("Discover ATTA") }}
            <br />
            <font style="color: #a8deee">{{ $t("NFT Contents") }}</font>
          </span>
          <p>
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
              {{ $t("E-SPORT") }}
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
              {{ $t("MUSIC") }}
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
                <p>{{ $t("Raquel Xu") }}</p>
              </div>
            </div>
            <a @click="toBaZhuayu">
              {{ $t("CELEBRITIES") }}
            </a>
          </div>
        </div>
        <div class="nft">
          <img src="@/assets/imgs/Group426.png" />
          <p>
            {{ $t("Find more exclusive NFTs at BAZHUAYU!") }}
          </p>
          <a @click="toBaZhuayu">
            {{ $t("Discover More NFTs") }}
          </a>
        </div>
      </div>
</template>
<script lang='ts'>
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    const toBaZhuayu = () => {
      window.open("https://www.bazhuayu.io/");
    };

    return {
      toBaZhuayu
    }
  }
});
</script>
<style scoped lang='scss'>
</style>