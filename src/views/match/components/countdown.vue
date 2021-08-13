<template>
  <div class="match-header flex">
    <div class="match-title" :class="isEn ? 'hanson' : ''">
      <p class="title-top">{{$t("Summer")}}</p>
      <p class="title-bottom">{{$t("Playoffs")}}</p>
    </div>
    <p class="match-text text-r" :class="isEn ? 'niunito' : ''">{{$t("reward_pool01")}}23188 BUSD <br> {{$t("reward_pool02")}}</p>
  </div>
  <div class="match-countdown" :class="isEn ? 'hanson' : ''">
    <p>{{$t("VotingCountdown")}}</p>
    <h5>{{hour}}h:{{minute}}m:{{second}}s</h5>
    <p>{{$t("Match_Start")}}</p> 
    <h5> Aug 21th 17:00</h5>
  </div>
  <!-- 循环，多个game列表数据 -->
  <div>
    <div class="game-team flex">
      <div class="team-logo">
        <img class="logo-winner" src="/match/WINNER.png" alt="">
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
    <h5 class="prize-pools-title" :class="isEn ? 'hanson' : ''">{{$t("pool_status")}}</h5>
    <h6 class="prize-pools-number" :class="isEn ? 'hanson' : ''">{{$t("CurrentNFTvotes")}}</h6>
    <div class="prize-pools flex">
      <div class="prize-pools-list">
        <div class="prize-pools-info" :class="isEn ? 'hanson' : ''">
          <p class="list-title">{{$t("winning_pool01")}}</p>
          <p class="list-number">TEAMSR 69% xx BUSD</p>
          <p class="list-number">R 25% xx BUSD</p>
          <p class="list-number">N 06% xx BUSD</p>
        </div>
        <div :class="isEn ? 'niunito' : ''">
          <p class="info-text">{{$t("SR")}}<br>{{$t("SR01")}}</p>
          <p class="info-text">{{$t("R")}}<br>{{$t("R01")}}</p>
          <p class="info-text">{{$t("N")}}<br>{{$t("N01")}}</p>
        </div>
      </div>
      <div class="prize-pools-list">
        <div class="prize-pools-info" :class="isEn ? 'hanson' : ''">
          <p class="list-title">{{$t("winning_pool02")}}</p>
          <p class="list-number">TEAMSR 69% xx BUSD</p>
          <p class="list-number">R 25% xx BUSD</p>
          <p class="list-number">N 06% xx BUSD</p>
        </div>
        <div :class="isEn ? 'niunito' : ''">
          <p class="info-text">{{$t("SR")}}<br>{{$t("SR01")}}</p>
          <p class="info-text">{{$t("R")}}<br>{{$t("R01")}}</p>
          <p class="info-text">{{$t("N")}}<br>{{$t("N01")}}</p>
        </div>
      </div>
    </div>
    <h6 class="prize-pools-number" :class="isEn ? 'hanson' : ''">{{$t("MyVotes")}}</h6>
    <div class="prize-pools flex">
      <div class="prize-pools-list">
        <div class="prize-pools-info" :class="isEn ? 'hanson' : ''">
          <p class="list-title">{{$t("winning_pool01")}}</p>
          <p class="list-number">TEAMSR 69% xx BUSD</p>
          <p class="list-number">R 25% xx BUSD</p>
          <p class="list-number">N 06% xx BUSD</p>
        </div>
        <div :class="isEn ? 'niunito' : ''">
          <p class="info-text">{{$t("SR1")}}</p>
          <p class="info-text">{{$t("R1")}}</p>
          <p class="info-text">{{$t("N1")}}</p>
          <p class="info-text-title">{{$t("TotalWinning")}}<br>{{$t("Rewards")}}</p>
          <p class="info-text-address">{{$t("distributed")}}<br>{{$t("hrs")}}</p>
        </div>
      </div>
      <div class="prize-pools-list">
        <div class="prize-pools-info" :class="isEn ? 'hanson' : ''">
          <p class="list-title">{{$t("winning_pool02")}}</p>
          <p class="list-number">TEAMSR 69% xx BUSD</p>
          <p class="list-number">R 25% xx BUSD</p>
          <p class="list-number">N 06% xx BUSD</p>
        </div>
        <div :class="isEn ? 'niunito' : ''">
          <p class="info-text">{{$t("SR2")}}</p>
          <p class="info-text">{{$t("R2")}}</p>
          <p class="info-text">{{$t("N2")}}</p>
          <p class="info-text-title">{{$t("TotalWinning")}}<br>{{$t("Rewards")}}</p>
          <p class="info-text-address">{{$t("distributed")}}<br>{{$t("hrs")}}</p>
        </div>
      </div>
    </div>
  </div>
  <!-- 投票NFT -->
  <div v-if="dialogBol" class="match-dialog flex">
    <!-- 可以投票 -->
    <div v-if="dialogBolVote" class="dialog-vote">
      <img @click="closeDialog" class="dialog-close" src="/match/close.png" alt="">
      <!-- 开始投票 -->
      <div v-if="voteType == 1" class="vote-content">
        <p class="vote-title">{{$t("YourNFTsvote")}}</p>
        <p class="content-title">{{$t("YourNFTsvote")}}</p>
        <p class="content-text">{{$t("voteSR")}}&nbsp;&nbsp;&nbsp;&nbsp;(5{{isEn?'':'个'}})</p>
        <p class="content-text">{{$t("voteR")}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(2{{isEn?'':'个'}})</p>
        <p class="content-text">{{$t("voteN")}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(2{{isEn?'':'个'}})</p>
        <p class="content-title">{{$t("voteSelected")}}</p>
        <p class="content-text">{{$t("voteSR")}}<el-input-number v-model="SRNumber" :min="1" :max="10" label=""></el-input-number></p>
        <p class="content-text">{{$t("voteR")}}<el-input-number v-model="RNumber" :min="1" :max="10" label=""></el-input-number></p>
        <p class="content-text">{{$t("voteN")}}<el-input-number v-model="NNumber" :min="1" :max="10" label=""></el-input-number></p>
      </div>
      <!-- 投票数据确认 -->
      <div v-if="voteType == 2" class="vote-content vote-content-result">
        <p class="vote-title vote-result">{{$t("voteFollowing")}}</p>
        <p class="content-text content-result">{{$t("voteSR")}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(5{{isEn?'':'个'}})</p>
        <p class="content-text">{{$t("voteR")}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(2{{isEn?'':'个'}})</p>
        <p class="content-text result-after">{{$t("voteN")}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(2{{isEn?'':'个'}})</p>
      </div>
      <!-- 投票结束 -->
      <div v-if="voteType == 3" class="vote-content vote-content-result">
        <p class="vote-title vote-result">{{$t("voteReceived")}}</p>
        <p class="content-text result-after result-end">{{$t("voteLuck")}}</p>
      </div>
      <button @click="voteStepFn">{{voteType>2?$t("voteOK"):$t("voteSubmit")}}</button>
    </div>
    <!-- 跳转八爪娱 -->
    <div v-else class="dialog-vote">
      <img @click="closeDialog" class="dialog-close" src="/match/close.png" alt="">
      <div class="vote-content">
        <p class="vote-title vote-bzy">{{$t("voteAvailable")}}</p>
        <p class="content-bzy">{{$t("voteMystery01")}}<br>{{$t("voteMystery02")}} <a href="bazhuayu.io">bazhuayu.io</a>  {{$t("voteMystery03")}}</p>
      </div>
      <button @click="closeDialog">{{$t("voteOK")}}</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted,watch } from "vue";
import { ElInputNumber } from 'element-plus';
import { useI18n } from "vue-i18n";

export default defineComponent({
  components: { ElInputNumber},
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


    //停止页面滚动
    const stopMove = ()=>{
      let m = function(e){e.preventDefault();};
      document.body.style.height = "100vh";
      document.body.style.overflow='hidden';
    };
    //开启页面滚动
    const Move = ()=>{
      let m =function(e){e.preventDefault();};
      document.body.style.height = "";
      document.body.style.overflow='';//出现滚动条
    };
    
    // 弹框展示
    const dialogBol = ref(false);//弹框是否展示
    const dialogBolVote = ref(true);//是否有投票权限
    const voteType = ref(1);//投票步骤
    // 继续下一步
    const voteStepFn = ()=>{
      if(voteType.value > 2){
        dialogBol.value = false;
        voteType.value = 1;
      }else{
        voteType.value = voteType.value+1;
      } 
    }
    // 关闭弹框
    const closeDialog = ()=>{
        dialogBol.value = false;
        voteType.value = 1;
    }
    const SRNumber = ref(0);
    const RNumber = ref(0);
    const NNumber = ref(0);
    return {
      hour,
      minute,
      second,
      allTime,
      isEn,
      dialogBol,
      SRNumber,
      RNumber,
      NNumber,
      dialogBolVote,
      voteType,
      voteStepFn,
      closeDialog
    }
  }
});
</script>
<style lang="scss">
@import "./countdown.scss";
</style>
