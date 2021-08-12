<template>
  <header-cell />
  <div class="match-container">
    <!-- <img class="top-banner" src="/imgs/starkBanner.png" /> -->
    <div class="match-header flex">
      <div class="match-title">
        <p class="title-top">{{$t("match_title01")}}</p>
        <p class="title-bottom">{{$t("match_title02")}}</p>
      </div>
      <p class="match-text">{{$t("match_text")}}</p>
    </div>
    <div class="match-introduce flex">
      <div class="introduce-list">
        <img src="/imgs/rita.png" alt="">
        <div class="introduce-text">
          <h5>{{$t("match_rita_title")}}</h5>
          <p>{{$t("match_rita_text")}}</p>
          <button>{{$t("match_draw_now")}}</button>
        </div>
      </div>
      <div class="introduce-list list-middle">
        <img src="/imgs/aill.png" alt="">
        <div class="introduce-text">
          <h5>{{$t("match_aill_title")}}</h5>
          <p>{{$t("match_aill_text")}}</p>
          <button> {{$t("match_draw_now")}} </button>
        </div>
      </div>
      <div class="introduce-list">
        <img src="/imgs/tx.png" alt="">
        <div class="introduce-text">
          <h5>{{$t("match_tx_title")}}</h5>
          <p>{{$t("match_tx_text")}}</p>
          <button type="button">{{$t("match_draw_now")}}</button>
        </div>
      </div>
    </div>
    <div class="match-rule flex">
      <div class="rule-busd flex">
        <div class="rule-number">
          <p class="number-text">{{$t("match_rule_award")}}</p>
          <p class="number-busd">278,257 BUSD</p>
        </div>
      </div>
      <div class="rule-text">
        <div class="match-title">
          <p class="title-top">{{$t("match_title01")}}</p>
          <p class="title-bottom">{{$t("match_rule")}}</p>
        </div>
        <div class="rule-list">
          <p>{{$t("match_rule01")}}</p>
          <p>{{$t("match_rule02")}}</p>
          <p>{{$t("match_rule03")}}</p>
          <p>{{$t("match_rule04")}}</p>
          <p>{{$t("match_rule05")}}</p>
        </div>
      </div>
    </div>
    <div class="match-header flex">
      <div class="match-title">
        <p class="title-top">LPL季後賽</p>
        <p class="title-bottom">GAME 1</p>
      </div>
      <p class="match-text text-r">BSC本场投票奖励池:  23188 BUSD <br> 勝方收益根據您投票的NFT權重發放</p>
    </div>
    <div class="match-countdown">
      <p>投票截止倒计时</p>
      <h5>倒计时：{{hour}}h:{{minute}}m:{{second}}s</h5>
      <p>比赛开始时间</p> 
      <h5>8月xx日 14:00</h5>
    </div>
    <div >
    </div>
  </div>
  <footer-cell />
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted,watch } from "vue";
import headerCell from "@/components/header/index.vue";
import footerCell from "@/components/footer/index.vue";

export default defineComponent({
  components: { headerCell,footerCell},
  setup() {
    const hours = ref(0);
    const minutes = ref(0);
    const seconds = ref(0);
    const endTime = ref('2021/08/12');
    // 倒计时函数
    const add = ()=>{
      let time = window.setInterval( ()=> {
        if (hours.value !== 0 && minutes.value === 0 && seconds.value === 0) {
            hours.value -= 1;
            minutes.value = 59;
            seconds.value = 59;
        } else if (hours.value === 0 && minutes.value !== 0 && seconds.value === 0) {
            minutes.value -= 1;
            seconds.value = 59;
        } else if (hours.value === 0 && minutes.value === 0 && seconds.value === 0) {
            seconds.value = 0
            window.clearInterval(time)
        } else if (hours.value !== 0 && minutes.value !== 0 && seconds.value === 0) {
            minutes.value -= 1;
            seconds.value = 59;
        } else {
            seconds.value -= 1;
        }
      }, 1000)
    };
    // 时间戳转换
    const timeDown = ()=>{
      let endTimes = new Date(endTime.value);
      let nowTime = new Date();
      let leftTime = ((endTimes.getTime() - nowTime.getTime()) / 1000)*1;
      hours.value = parseInt(((leftTime / (60 * 60)) % 24)+'');
      minutes.value = parseInt(((leftTime / 60) % 60)+'');
      seconds.value = parseInt((leftTime % 60)+'');
      add()
    };
    timeDown();
    // 防止数值小于10时，出现一位数
    const num = (n)=>{
        return n < 10 ? '0' + n : n
    };
    const second = computed(() => {
      return num(seconds.value)
    });
    const minute = computed(() => {
      return num(minutes.value)
    });
    const hour = computed(() => {
      return num(hours.value)
    });


    return {
      hour,
      minute,
      second,
    }
  }
});
</script>


<style lang="scss">
@import "./index.scss";
</style>
