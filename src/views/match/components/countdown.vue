<template>
<el-collapse accordion @change="collapseChange">
    <!-- 循环，多个game列表数据 -->
  <el-collapse-item v-for="item in matchInfoList" :key="item.id" :name="item.id" class="">
    <template #title>
      <div class="match-header flex">
        <div class="match-title hanson">
          <p class="title-top">{{$t("Summer")}}</p>
          <p class="title-bottom">{{$t("Playoffs")}} {{item.name}}</p>
        </div>
        <p class="match-text niunito">{{$t("reward_pool01")}} {{curRewardPool}} BUSD <br> {{$t("reward_pool02")}}<br> {{$t("reward_pool03")}}</p>
      </div>
      <img class="header-icon" src="/match/more.png" alt="">
    </template>
    <div class="match-countdown hanson">
      <p>{{$t("VotingCountdown")}}</p>
      <h5>{{hour}}h:{{minute}}m:{{second}}s</h5>
      <p>{{$t("Match_Start")}}</p> 
      <h5>{{item.gameDate}}</h5>
    </div>
    <div class="game-team flex">
      <div class="team-logo">
        <img class="logo-winner" src="/match/WINNER.png" alt="">
        <div>
          <img :src="'/match/'+(item.teamA?item.teamA:'unGame')+'.png'" alt="">
          <p class="hanson">{{item.teamA}}</p>
        </div>
        <button v-if="allTime > 0" class="niunito">{{item.attaMatchOptions[0]?item.attaMatchOptions[0].bettingItem:'vote to team'}}</button>
        <button v-else class="unVote niunito">{{item.attaMatchOptions[0]?item.attaMatchOptions[0].bettingItem:'vote to team'}}</button>
      </div>
      <div class="team-logo">
        <div>
          <img :src="'/match/'+(item.teamB?item.teamB:'unGame')+'.png'" alt="">
          <p class="hanson">{{item.teamB}}</p>
        </div>
        <button @click="voteTeam" class="niunito">{{item.attaMatchOptions[1]?item.attaMatchOptions[1].bettingItem:'vote to team'}}</button>
      </div>
    </div>
    <h5 class="prize-pools-title hanson">{{$t("pool_status")}}</h5>
    <h6 class="prize-pools-number hanson">{{$t("CurrentNFTvotes")}}</h6>
    <div class="prize-pools flex">
      <div class="prize-pools-list">
        <div class="prize-pools-info hanson">
          <p class="list-title">{{$t("winning_pool01")}}</p>
          <p class="list-number">TEAMSR 69% xx BUSD</p>
          <p class="list-number">R 25% xx BUSD</p>
          <p class="list-number">N 06% xx BUSD</p>
        </div>
        <div class="niunito">
          <p class="info-text">SR (1256个) {{$t("SRRN0")}} 69%.
            <font v-if="isEn"><br>{{$t("SR01")}}XXXX BUSD</font>
            <font v-else>{{$t("SR01")}}XXX BUSD</font>
          </p>
          <p class="info-text">R(125个) {{$t("SRRN0")}} 25%.
            <font v-if="isEn"><br>{{$t("R01")}}XXXX BUSD</font>
            <font v-else>{{$t("R01")}}XXX BUSD</font>
          </p>
          <p class="info-text">N(15个) {{$t("SRRN0")}} 6%.
            <font v-if="isEn"><br>{{$t("N01")}}XXXX BUSD</font>
            <font v-else>{{$t("N01")}}XXX BUSD</font>
          </p>
        </div>
      </div>
      <div class="prize-pools-list">
        <div class="prize-pools-info hanson">
          <p class="list-title">{{$t("winning_pool02")}}</p>
          <p class="list-number">TEAMSR 69% xx BUSD</p>
          <p class="list-number">R 25% xx BUSD</p>
          <p class="list-number">N 06% xx BUSD</p>
        </div>
        <div class="niunito">
          <p class="info-text">SR (1256个) {{$t("SRRN0")}} 69%.
            <font v-if="isEn"><br>{{$t("SR01")}}XXX BUSD</font>
            <font v-else>{{$t("SR01")}}XXX BUSD</font>
          </p>
          <p class="info-text">R(125个) {{$t("SRRN0")}} 25%.
            <font v-if="isEn"><br>{{$t("R01")}}XXX BUSD</font>
            <font v-else>{{$t("R01")}}XXX BUSD</font>
          </p>
          <p class="info-text">N(15个) {{$t("SRRN0")}} 6%.
            <font v-if="isEn"><br>{{$t("N01")}}XXX BUSD</font>
            <font v-else>{{$t("N01")}}XXX BUSD</font>
          </p>
        </div>
      </div>
    </div>
    <h6 class="prize-pools-number hanson">{{$t("MyVotes")}}</h6>
    <div class="prize-pools flex">
      <div class="prize-pools-list">
        <div class="prize-pools-info hanson">
          <p class="list-title">{{$t("winning_pool01")}}</p>
          <p class="list-number">TEAMSR 69% xx BUSD</p>
          <p class="list-number">R 25% xx BUSD</p>
          <p class="list-number">N 06% xx BUSD</p>
        </div>
        <div class="niunito">
          <p class="info-text">SR (5{{$t("SRRN1")}}
            <font v-if="isEn">XXXX BUSD {{$t("SRRN")}}</font>
            <font v-else>XXXX BUSD</font>
          </p>
          <p class="info-text">R (3{{$t("SRRN1")}}
            <font v-if="isEn">XXXX BUSD {{$t("SRRN")}}</font>
            <font v-else>XXXX BUSD</font>
          </p>
          <p class="info-text">N (0{{$t("SRRN1")}}
            <font v-if="isEn">XXXX BUSD {{$t("SRRN")}}</font>
            <font v-else>XXXX BUSD</font>
          </p>
          <p class="info-text-title">{{$t("TotalWinning")}}
            <font v-if="isEn"><br>XXXX BUSD</font>
            <font v-else>XXXX BUSD</font>
          </p>
          <p class="info-text-address">{{$t("distributed")}}<br>{{$t("hrs")}}</p>
        </div>
      </div>
      <div class="prize-pools-list">
        <div class="prize-pools-info hanson">
          <p class="list-title">{{$t("winning_pool02")}}</p>
          <p class="list-number">TEAMSR 69% xx BUSD</p>
          <p class="list-number">R 25% xx BUSD</p>
          <p class="list-number">N 06% xx BUSD</p>
        </div>
        <div class="niunito">
          <p class="info-text">SR (5{{$t("SRRN2")}}
            <font v-if="isEn">XXXX BUSD{{$t("SRRN")}}</font>
            <font v-else>XXXX BUSD</font>
          </p>
          <p class="info-text">R (3{{$t("SRRN2")}}
            <font v-if="isEn">XXXX BUSD{{$t("SRRN")}}</font>
            <font v-else>XXXX BUSD</font>
          </p>
          <p class="info-text">N (0{{$t("SRRN2")}}
            <font v-if="isEn"> XXXX BUSD{{$t("SRRN")}}</font>
            <font v-else>XXXX BUSD</font>
          </p>
          <p class="info-text-title">{{$t("TotalWinning")}}
            <font v-if="isEn"><br>XXXX BUSD</font>
            <font v-else>XXXX BUSD</font>
          </p>
          <p class="info-text-address">{{$t("distributed")}}<br>{{$t("hrs")}}</p>
        </div>
      </div>
    </div>
  </el-collapse-item>
</el-collapse>
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
import { ElInputNumber,ElCollapse,ElCollapseItem } from 'element-plus';
import { useI18n } from "vue-i18n";
import { getCookie, setCookie,getAbi,formatDate } from "../../../utils";
import { initWeb3 } from "../../../assets/js/initweb3";
import axios from "../../../api";

export default defineComponent({
  components: { ElInputNumber,ElCollapse,ElCollapseItem},
  setup(props,{emit}) {
    const matchInfoList = ref();
    const matchList = ()=>{//获取赛事信息列表
      return new Promise((resolve, reject) => {
        axios.post(window.base_url + "/v2/match/list", {})
        .then((res:any) => {
          if(!res.code){
            let data = res.data;
            let idList:any = [];
            data.forEach((item:any)=>{
              idList.push(item.matchTokenId)
            })
            let content = {
              data,idList
            }
            resolve(content);
          }
        });
      })
    };
    const totalRewardPool = ref(0);//总奖池
    const curRewardPool = ref(0);//当前比赛分到的奖池
    const matchBusd = (data:any)=>{
      return new Promise((resolve, reject) => {
        axios.post(window.base_url + "/v2/activity/bet_pool?id=1", {})
        .then((res:any) => {
          totalRewardPool.value = res.data.totalRewardPool;
          emit('totalRewardPool',res.data.totalRewardPool )
          curRewardPool.value = res.data.curRewardPool;
          resolve({res,data})
        });
      })
    }
    const nowDataTime = ref(0);
    const batchRaceInfoFn = (data:any)=>{//通过链调取数据
      return new Promise((resolve, reject) => {
        // abi下的所有方法
        const MerkleDistributionInstance = getAbi("atta_vote_abi");
        console.log(MerkleDistributionInstance);
        // 获取的abi下的vault方法
        MerkleDistributionInstance.methods
          .batchRaceInfo(data.idList)
          .call()
          .then(function (res: any) {
            res[0].forEach((info: any,i:any) => {//遍历比赛时间,并添加到对应数据
              data.data[i].gameTime = info;
            })
            nowDataTime.value = res[2];
            gameLists(data.data);
          }).catch((err:any)=>{
              console.log(err);
          });
      })
    }
    // 对数据进行重装:主要是时间戳
    const gameLists = (data:any)=>{
      data.forEach((info:any,i:any)=>{
        if(info.gameTime > 0){
          info.gameDate = formatDate(info.gameTime*1000);
        }
      })
      matchInfoList.value = data;
    }
    // 展开的时候处理计时器
    const collapseChange = (data:any)=>{
      hours.value = 0;
      minutes.value = 0;
      seconds.value = 0;
      matchInfoList.value.forEach((item:any)=>{
        if(item.id == data){//找到当前打开的数据
          if(item.gameTime && (item.gameTime > (nowDataTime.value + 300))){//比赛时间确认，且比赛时间在当前时间5m之后
            timeDown((nowDataTime.value + 300),item.gameTime)
          }else{
            timeDown((nowDataTime.value + 300),item.gameTime)
          }
        }
      })
    }
          
    onMounted(() => {
      window.clearInterval(timeStart.value);//关闭计时器
      matchList().then(res=>{
        return matchBusd(res)
      }).then((res1:any)=>{
        batchRaceInfoFn(res1.data)
      })
    });

    console.log(window.CHAIN.WALLET);
    // 获取钱包地址
    initWeb3().then((res: any) => {
      console.log(res);
    });
    const { locale, t } = useI18n();
    const isEn = computed(() => {
      return locale.value.trim() == "en";
    });
    const hours = ref(0);
    const minutes = ref(0);
    const seconds = ref(0);
    const timeStart = ref();//计时器
    // 倒计时函数
    const setTime = ()=>{
      timeStart.value = window.setInterval( ()=> {
        if (hours.value !== 0 && minutes.value === 0 && seconds.value === 0) {
            hours.value -= 1;
            minutes.value = 59;
            seconds.value = 59;
        } else if (hours.value === 0 && minutes.value !== 0 && seconds.value === 0) {
            minutes.value -= 1;
            seconds.value = 59;
        } else if (hours.value === 0 && minutes.value === 0 && seconds.value === 0) {
            seconds.value = 0
            window.clearInterval(timeStart.value);//关闭计时器
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
    const timeDown = (startTime:number,endTime:number)=>{
      allTime.value = (endTime - startTime)*1;
      let leftTime = endTime - startTime;
      if(leftTime <= 0) return;
      hours.value = parseInt(((leftTime / (60 * 60)) % 24)+'');
      minutes.value = parseInt(((leftTime / 60) % 60)+'');
      seconds.value = parseInt((leftTime % 60)+'');
      setTime()
    };
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
    // 投票
    const voteTeam = ()=>{
      let currentAddress = getCookie("currentAddress") == "false" ? "" : getCookie("currentAddress");
      if(currentAddress){
        console.log("开启钱包");
      }else{
        console.log("未开启钱包");
      }
    }
    // 获取钱包地址
    const accountAddress = ref('');
    const getAddress = () => {
      if (!accountAddress.value) {
        // 获取钱包地址
        initWeb3().then((res: any) => {
          if (res.length > 0) {
            accountAddress.value = res[0];
            setCookie("currentAddress", res[0]);
            window.location.reload();
          }
        });
      } else {
        window.CHAIN.WALLET.connect("MetaMask").then((res) => {
          if (res.length > 0) {
            accountAddress.value = res[0];
            setCookie("currentAddress", res[0]);
            window.location.reload();
          }
        });
      }
    };
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
      closeDialog,
      voteTeam,
      matchInfoList,
      collapseChange,
      curRewardPool
    }
  }
});
</script>
<style lang="scss">
@import "./countdown.scss";
</style>
