<template>
  <header-cell />
  <div class="stak-container">
    <img class="top-banner" src="/imgs/starkBanner.png" />
    <div class="stak-content">
      <div>LPL明星解說系列盲盒</div>
      <div>火爆來襲，更有LPL季後賽賽事staking大獎，等你來拿~</div>
      <div class="member-list">
        <div class="member-cell">
          <img src="/imgs/rita.png" />
          <div class="member-desc-title">Rita 英雄聯盟官方解說</div>
          <div class="member-desc-info">英雄联盟官方解说冯雨，艺名：Rita小雨桑，曾经是一名《英雄联盟》职业选手，随后转型为比赛解说，英雄联盟赛事职业解说。冯雨毕业于中央戏剧学院，曾以女子战队队员身份参加比赛，在2016年正式转型为比赛解说，在2017年荣获年度最佳新秀赛事解说。</div>
        </div>
        <div class="member-cell">
          <img src="/imgs/rita.png" />
          <div class="member-desc-title">Rita 英雄聯盟官方解說</div>
          <div class="member-desc-info">英雄联盟官方解说冯雨，艺名：Rita小雨桑，曾经是一名《英雄联盟》职业选手，随后转型为比赛解说，英雄联盟赛事职业解说。冯雨毕业于中央戏剧学院，曾以女子战队队员身份参加比赛，在2016年正式转型为比赛解说，在2017年荣获年度最佳新秀赛事解说。</div>
        </div>
        <div class="member-cell">
          <img src="/imgs/rita.png" />
          <div class="member-desc-title">Rita 英雄聯盟官方解說</div>
          <div class="member-desc-info">英雄联盟官方解说冯雨，艺名：Rita小雨桑，曾经是一名《英雄联盟》职业选手，随后转型为比赛解说，英雄联盟赛事职业解说。冯雨毕业于中央戏剧学院，曾以女子战队队员身份参加比赛，在2016年正式转型为比赛解说，在2017年荣获年度最佳新秀赛事解说。</div>
        </div>
      </div>
    </div>
  </div>
  <footer-cell />
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import headerCell from "@/components/header/index.vue";
import footerCell from "@/components/footer/index.vue";

export default defineComponent({
  components: { headerCell,footerCell}
});
</script>


<style lang="scss">
@import "./index.scss";
</style>
