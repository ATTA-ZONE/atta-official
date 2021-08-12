<template>
  <div class="match-header flex">
    <div class="match-title" :class="isEn ? 'hanson' : ''">
      <p class="title-top">LPL季後賽</p>
      <p class="title-bottom">GAME 1</p>
    </div>
    <p class="match-text text-r" :class="isEn ? 'niunito' : ''">BSC本场投票奖励池:  23188 BUSD <br> 勝方收益根據您投票的NFT權重發放</p>
  </div>
  <div class="match-countdown" :class="isEn ? 'hanson' : ''">
    <p>投票截止倒计时</p>
    <h5>倒计时：{{hour}}h:{{minute}}m:{{second}}s</h5>
    <p>比赛开始时间</p> 
    <h5>8月xx日 14:00</h5>
  </div>
  <div class="game-team flex">
    <div class="team-logo">
      <img class="logo-winner" src="/imgs/WINNER.png" alt="">
      <div>
        <img src="//img.crawler.qq.com/lolwebvideo/20180925110059/69d20800d8dad53348ff74ce3d1ab737/0" alt="">
        <p :class="isEn ? 'hanson' : ''">TEAM 01</p>
      </div>
      <button v-if="allTime > 0" :class="isEn ? 'niunito' : ''">Vote for Team 01</button>
      <button v-else class="unVote" :class="isEn ? 'niunito' : ''">Vote ENDED</button>
    </div>
    <div class="team-logo">
      <div>
        <img src="//img.crawler.qq.com/lolwebvideo/20210524154625/5856bdab95962f5ac864d284adf6097e/0" alt="">
        <p :class="isEn ? 'hanson' : ''">TEAM 02</p>
      </div>
      <button :class="isEn ? 'niunito' : ''">Vote for Team 02</button>
    </div>
  </div>
  <h5 class="prize-pools-title" :class="isEn ? 'hanson' : ''">本场投票池状态</h5>
  <h6 class="prize-pools-number" :class="isEn ? 'hanson' : ''">当前投票NFT数量</h6>
  <div class="prize-pools flex">
    <div class="prize-pools-list">
      <div class="prize-pools-info" :class="isEn ? 'hanson' : ''">
        <p class="list-title">TEAM1胜利奖励池</p>
        <p class="list-number">TEAMSR 69% xx BUSD</p>
        <p class="list-number">R 25% xx BUSD</p>
        <p class="list-number">N 06% xx BUSD</p>
      </div>
      <div :class="isEn ? 'niunito' : ''">
        <p class="info-text">SR (1256个)  奖励池分配：69%    单SR级NFT奖励 XXX BUSD</p>
        <p class="info-text">R(125个) 奖励池分配：25%   单R级NFT奖励 XXX BUSD</p>
        <p class="info-text">N(15个) 奖励池分配：6%  单N级NFT奖励 XXX BUSD</p>
      </div>
    </div>
    <div class="prize-pools-list">
      <div class="prize-pools-info" :class="isEn ? 'hanson' : ''">
        <p class="list-title">TEAM1胜利奖励池</p>
        <p class="list-number">TEAMSR 69% xx BUSD</p>
        <p class="list-number">R 25% xx BUSD</p>
        <p class="list-number">N 06% xx BUSD</p>
      </div>
      <div :class="isEn ? 'niunito' : ''">
        <p class="info-text">SR (1256个)  奖励池分配：69%    单SR级NFT奖励 XXX BUSD</p>
        <p class="info-text">R(125个) 奖励池分配：25%   单R级NFT奖励 XXX BUSD</p>
        <p class="info-text">N(15个) 奖励池分配：6%  单N级NFT奖励 XXX BUSD</p>
      </div>
    </div>
  </div>

  
  <h6 class="prize-pools-number" :class="isEn ? 'hanson' : ''">我的投票</h6>
  <div class="prize-pools flex">
    <div class="prize-pools-list">
      <div class="prize-pools-info" :class="isEn ? 'hanson' : ''">
        <p class="list-title">TEAM1胜利奖励池</p>
        <p class="list-number">TEAMSR 69% xx BUSD</p>
        <p class="list-number">R 25% xx BUSD</p>
        <p class="list-number">N 06% xx BUSD</p>
      </div>
      <div :class="isEn ? 'niunito' : ''">
        <p class="info-text">SR (5个)     如TEAM2胜利，奖励 XXXX BUSD</p>
        <p class="info-text">R (3个)       如TEAM2胜利，奖励 XXXX BUSD</p>
        <p class="info-text">N (0个)       如TEAM2胜利，奖励 XXXX BUSD</p>
        <p class="info-text-title">总计获胜奖励：XXXX BUSD</p>
        <p class="info-text-address">比赛结束后在2小时内发放至投票钱包地址</p>
      </div>
    </div>
    <div class="prize-pools-list">
      <div class="prize-pools-info" :class="isEn ? 'hanson' : ''">
        <p class="list-title">TEAM1胜利奖励池</p>
        <p class="list-number">TEAMSR 69% xx BUSD</p>
        <p class="list-number">R 25% xx BUSD</p>
        <p class="list-number">N 06% xx BUSD</p>
      </div>
      <div :class="isEn ? 'niunito' : ''">
        <p class="info-text">SR (5个)     如TEAM2胜利，奖励 XXXX BUSD</p>
        <p class="info-text">R (3个)       如TEAM2胜利，奖励 XXXX BUSD</p>
        <p class="info-text">N (0个)       如TEAM2胜利，奖励 XXXX BUSD</p>
        <p class="info-text-title">总计获胜奖励：XXXX BUSD</p>
        <p class="info-text-address">比赛结束后在2小时内发放至投票钱包地址</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted,watch } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  setup() {
    const { locale, t } = useI18n();
    const isEn = computed(() => {
      return locale.value.trim() == "en";
    });
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
    const allTime = ref(0);
    const timeDown = ()=>{
      let endTimes = new Date(endTime.value);
      let nowTime = new Date();
      allTime.value = ((endTimes.getTime() - nowTime.getTime()) / 1000)*1;
      let leftTime = ((endTimes.getTime() - nowTime.getTime()) / 1000)*1;
      if(leftTime <= 0) return;
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
      allTime,
      isEn
    }
  }
});
</script>
<style lang="scss">
@import "./countdown.scss";
</style>
