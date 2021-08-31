<template>
<!-- v-model="collapseIndex"-->
<el-collapse accordion @change="collapseChange">
    <!-- 循环，多个game列表数据 -->
  <el-collapse-item v-for="item in matchInfoList" :key="item.id" :name="item.id" class="">
    <template #title>
      <div class="match-header flex">
        <div class="match-title hanson">
          <p class="title-top">{{$t("Summer")}}</p>
          <p class="title-bottom">{{$t("Playoffs")}} {{item.name}}</p>
        </div>
        
        <!-- <br> {{$t("reward_pool02")}} moneyFormatNum(curRewardPool)-->
        <p class="match-text niunito">{{$t("reward_pool01")}} {{item.curRewardPoolTemp?moneyFormatNum(item.curRewardPoolTemp):$t("match-Tbd")}} BUSD <br> {{$t("reward_pool03")}}</p>
      </div>
      <img class="header-icon" src="/match/more.png" alt="">
    </template>
    <div class="match-countdown hanson">
      <p>{{$t("VotingCountdown")}}</p>
      <h5 v-if="(item.curTime+300) >= item.startTime">{{$t("voteOver")}}</h5>
      <h5 v-else>{{hour}}h:{{minute}}m:{{second}}s</h5>
      <p>{{$t("Match_Start")}}</p> 
      <h5>{{item.gameDate?item.gameDate:'TBD'}}</h5>
    </div>
    <div class="game-team flex">
      <div class="team-logo">
        <img v-if="item.result == 1" class="logo-winner" src="/match/WINNER.png" alt="">
        <div>
          <img v-if="item.teamA&&item.teamA.indexOf('LNG')!=-1" src="/match/LNG.png" alt="">
          <img v-if="item.teamA&&item.teamA.indexOf('WE')!=-1" src="/match/WE.png" alt="">
          <img v-if="item.teamA&&item.teamA.indexOf('LNG')==-1 && item.teamA.indexOf('WE')==-1" :src="'/match/'+(item.teamA&&item.teamA != 'TBD'?item.teamA:'unGame')+'.png'" alt="">
          <p class="hanson">{{item.teamA?item.teamA:'TBD'}}</p>
        </div>
        <button v-if="nowDataTime <= item.gameTime && item.teamA != 'TBD' && item.teamB != 'TBD'" @click.stop="openDialog(item.attaMatchOptions[0],item.matchTokenId)" class="niunito">{{item.attaMatchOptions[0]?item.attaMatchOptions[0].bettingItem:'vote to team'}}</button>
        <button @click="unDialog(item)" v-else class="unVote niunito">{{item.attaMatchOptions[0]?item.attaMatchOptions[0].bettingItem:'vote to team'}}</button>
      </div>
      <div class="team-logo">
        <img v-if="item.result == 2" class="logo-winner" src="/match/WINNER.png" alt="">
        <div>
          <img v-if="item.teamB&&item.teamB.indexOf('LNG')!=-1" src="/match/LNG.png" alt="">
          <img v-if="item.teamB&&item.teamB.indexOf('WE')!=-1" src="/match/WE.png" alt="">
          <img v-if="item.teamB&&item.teamB.indexOf('LNG')==-1 && item.teamB.indexOf('WE')==-1" :src="'/match/'+(item.teamB&&item.teamB != 'TBD'?item.teamB:'unGame')+'.png'" alt="">
          <p class="hanson">{{item.teamB?item.teamB:'TBD'}}</p>
        </div>
        <button v-if="nowDataTime <= item.gameTime && item.teamA != 'TBD' && item.teamB != 'TBD'" @click.stop="openDialog(item.attaMatchOptions[1],item.matchTokenId)" class="niunito">{{item.attaMatchOptions[1]?item.attaMatchOptions[1].bettingItem:'vote to team'}}</button>
        <button @click="unDialog(item)"  v-else class="unVote niunito">{{item.attaMatchOptions[1]?item.attaMatchOptions[1].bettingItem:'vote to team'}}</button>
      </div>
    </div>
    <h5 class="prize-pools-title hanson">{{$t("pool_status")}}</h5>
    <h6 class="prize-pools-number hanson">{{$t("CurrentNFTvotes")}}</h6>
    <div class="prize-pools flex">
      <div class="prize-pools-list">
        <div class="prize-pools-info hanson">
          <p class="list-title">{{item.teamA?item.teamA:'TBD'}}{{$t("winning_pool01")}}</p>
          <p class="list-number">SR {{item.attaMatchGameBetNow&&item.attaMatchGameBetNow[2]?item.attaMatchGameBetNow[2].rewardRate:0}}% {{item.attaMatchGameBetNow&&item.attaMatchGameBetNow[2]?moneyFormatNum(item.attaMatchGameBetNow[2].rewardCount):0}} BUSD</p>
          <p class="list-number">R {{item.attaMatchGameBetNow&&item.attaMatchGameBetNow[1]?item.attaMatchGameBetNow[1].rewardRate:0}}% {{item.attaMatchGameBetNow&&item.attaMatchGameBetNow[1]?moneyFormatNum(item.attaMatchGameBetNow[1].rewardCount):0}} BUSD</p>
          <p class="list-number">N {{item.attaMatchGameBetNow&&item.attaMatchGameBetNow[0]?item.attaMatchGameBetNow[0].rewardRate:0}}% {{item.attaMatchGameBetNow&&item.attaMatchGameBetNow[0]?moneyFormatNum(item.attaMatchGameBetNow[0].rewardCount):0}} BUSD</p>
        </div>
        <div class="niunito">
          <p class="info-text">SR ({{item.attaMatchGameBetNow&&item.attaMatchGameBetNow[2]?item.attaMatchGameBetNow[2].tickets:0}}{{$t("unitTxt")}}) {{$t("SRRN0")}} {{item.attaMatchGameBetNow&&item.attaMatchGameBetNow[2]?item.attaMatchGameBetNow[2].rewardRate:0}}%.
            <span v-if="isEn"><br>{{$t("SR01")}}{{item.attaMatchGameBetNow&&item.attaMatchGameBetNow[2]?moneyFormatNum(item.attaMatchGameBetNow[2].rewardForSingle):0}} BUSD</span>
            <span v-else>{{$t("SR01")}}{{item.attaMatchGameBetNow&&item.attaMatchGameBetNow[2]?moneyFormatNum(item.attaMatchGameBetNow[2].rewardForSingle):0}} BUSD</span>
          </p>
          <p class="info-text">R({{item.attaMatchGameBetNow&&item.attaMatchGameBetNow[1]?item.attaMatchGameBetNow[1].tickets:0}}{{$t("unitTxt")}}) {{$t("SRRN0")}} {{item.attaMatchGameBetNow&&item.attaMatchGameBetNow[1]?item.attaMatchGameBetNow[1].rewardRate:0}}%.
            <span v-if="isEn"><br>{{$t("R01")}}{{item.attaMatchGameBetNow&&item.attaMatchGameBetNow[1]?moneyFormatNum(item.attaMatchGameBetNow[1].rewardForSingle):0}} BUSD</span>
            <span v-else>{{$t("R01")}}{{item.attaMatchGameBetNow&&item.attaMatchGameBetNow[1]?moneyFormatNum(item.attaMatchGameBetNow[1].rewardForSingle):0}} BUSD</span>
          </p>
          <p class="info-text">N({{item.attaMatchGameBetNow&&item.attaMatchGameBetNow[0]?item.attaMatchGameBetNow[0].tickets:0}}{{$t("unitTxt")}}) {{$t("SRRN0")}} {{item.attaMatchGameBetNow&&item.attaMatchGameBetNow[0]?item.attaMatchGameBetNow[0].rewardRate:0}}%.
            <span v-if="isEn"><br>{{$t("N01")}}{{item.attaMatchGameBetNow&&item.attaMatchGameBetNow[0]?moneyFormatNum(item.attaMatchGameBetNow[0].rewardForSingle):0}} BUSD</span>
            <span v-else>{{$t("N01")}}{{item.attaMatchGameBetNow&&item.attaMatchGameBetNow[0]?moneyFormatNum(item.attaMatchGameBetNow[0].rewardForSingle):0}} BUSD</span>
          </p>
        </div>
      </div>
      <div class="prize-pools-list">
        <div class="prize-pools-info hanson">
          <p class="list-title">{{item.teamB?item.teamB:'TBD'}}{{$t("winning_pool02")}}</p>
          <p class="list-number">SR {{item.attaMatchGameBetNow&&item.attaMatchGameBetNow[5]?item.attaMatchGameBetNow[5].rewardRate:0}}% {{item.attaMatchGameBetNow&&item.attaMatchGameBetNow[5]?moneyFormatNum(item.attaMatchGameBetNow[5].rewardCount):0}} BUSD</p>
          <p class="list-number">R {{item.attaMatchGameBetNow&&item.attaMatchGameBetNow[4]?item.attaMatchGameBetNow[4].rewardRate:0}}% {{item.attaMatchGameBetNow&&item.attaMatchGameBetNow[4]?moneyFormatNum(item.attaMatchGameBetNow[4].rewardCount):0}} BUSD</p>
          <p class="list-number">N {{item.attaMatchGameBetNow&&item.attaMatchGameBetNow[3]?item.attaMatchGameBetNow[3].rewardRate:0}}% {{item.attaMatchGameBetNow&&item.attaMatchGameBetNow[3]?moneyFormatNum(item.attaMatchGameBetNow[3].rewardCount):0}} BUSD</p>
        </div>
        <div class="niunito">
          <p class="info-text">SR ({{item.attaMatchGameBetNow&&item.attaMatchGameBetNow[5]?item.attaMatchGameBetNow[5].tickets:0}}{{$t("unitTxt")}}) {{$t("SRRN0")}} {{item.attaMatchGameBetNow&&item.attaMatchGameBetNow[5]?item.attaMatchGameBetNow[5].rewardRate:0}}%.
            <span v-if="isEn"><br>{{$t("SR01")}}{{item.attaMatchGameBetNow&&item.attaMatchGameBetNow[5]?moneyFormatNum(item.attaMatchGameBetNow[5].rewardForSingle):0}} BUSD</span>
            <span v-else>{{$t("SR01")}}{{item.attaMatchGameBetNow&&item.attaMatchGameBetNow[5]?moneyFormatNum(item.attaMatchGameBetNow[5].rewardForSingle):0}} BUSD</span>
          </p>
          <p class="info-text">R ({{item.attaMatchGameBetNow&&item.attaMatchGameBetNow[4]?item.attaMatchGameBetNow[4].tickets:0}}{{$t("unitTxt")}}) {{$t("SRRN0")}} {{item.attaMatchGameBetNow&&item.attaMatchGameBetNow[4]?item.attaMatchGameBetNow[4].rewardRate:0}}%.
            <span v-if="isEn"><br>{{$t("R01")}}{{item.attaMatchGameBetNow&&item.attaMatchGameBetNow[4]?moneyFormatNum(item.attaMatchGameBetNow[4].rewardForSingle):0}} BUSD</span>
            <span v-else>{{$t("R01")}}{{item.attaMatchGameBetNow&&item.attaMatchGameBetNow[4]?moneyFormatNum(item.attaMatchGameBetNow[4].rewardForSingle):0}} BUSD</span>
          </p>
          <p class="info-text">N({{item.attaMatchGameBetNow&&item.attaMatchGameBetNow[3]?(item.attaMatchGameBetNow[3].tickets):0}}{{$t("unitTxt")}}) {{$t("SRRN0")}} {{item.attaMatchGameBetNow&&item.attaMatchGameBetNow[3]?item.attaMatchGameBetNow[3].rewardRate:0}}%.
            <span v-if="isEn"><br>{{$t("N01")}}{{item.attaMatchGameBetNow&&item.attaMatchGameBetNow[3]?moneyFormatNum(item.attaMatchGameBetNow[3].rewardForSingle):0}} BUSD</span>
            <span v-else>{{$t("N01")}}{{item.attaMatchGameBetNow&&item.attaMatchGameBetNow[3]?moneyFormatNum(item.attaMatchGameBetNow[3].rewardForSingle):0}} BUSD</span>
          </p>
        </div>
      </div>
    </div>
    <h6 class="prize-pools-number hanson">{{$t("MyVotes")}}</h6>
    <div class="prize-pools flex">
      <div class="prize-pools-list">
        <div class="prize-pools-info hanson">
          <p class="list-title">{{item.teamA?item.teamA:'TBD'}}{{$t("winning_pool01")}}</p>
          <p class="list-number">SR*{{item.attaMatchUserBetNow&&item.attaMatchUserBetNow[2]?item.attaMatchUserBetNow[2].tickets:0}}&nbsp;&nbsp;{{item.attaMatchUserBetNow&&item.attaMatchUserBetNow[2]?moneyFormatNum(item.attaMatchUserBetNow[2].rewardCount):0}} BUSD</p>
          <p class="list-number">R*{{item.attaMatchUserBetNow&&item.attaMatchUserBetNow[1]?item.attaMatchUserBetNow[1].tickets:0}}&nbsp;&nbsp;{{item.attaMatchUserBetNow&&item.attaMatchUserBetNow[1]?moneyFormatNum(item.attaMatchUserBetNow[1].rewardCount):0}} BUSD</p>
          <p class="list-number">N*{{item.attaMatchUserBetNow&&item.attaMatchUserBetNow[0]?item.attaMatchUserBetNow[0].tickets:0}}&nbsp;&nbsp;{{item.attaMatchUserBetNow&&item.attaMatchUserBetNow[0]?moneyFormatNum(item.attaMatchUserBetNow[0].rewardCount):0}} BUSD</p>
        </div>
        <div class="niunito">
          <p class="info-text">SR ({{item.attaMatchUserBetNow&&item.attaMatchUserBetNow[2]?item.attaMatchUserBetNow[2].tickets:0}}{{$t("SRRN1")}}{{item.teamA&&item.teamA!='TBD'?item.teamA:'TEAM TBD'}}{{$t("SRRN01")}}
            <span v-if="isEn">{{item.attaMatchUserBetNow&&item.attaMatchUserBetNow[2]?moneyFormatNum(item.attaMatchUserBetNow[2].rewardCount):0}} BUSD {{$t("SRRN")}}</span>
            <span v-else>{{item.attaMatchUserBetNow&&item.attaMatchUserBetNow[2]?moneyFormatNum(item.attaMatchUserBetNow[2].rewardCount):0}} BUSD</span>
          </p>
          <p class="info-text">R ({{item.attaMatchUserBetNow&&item.attaMatchUserBetNow[1]?item.attaMatchUserBetNow[1].tickets:0}}{{$t("SRRN1")}}{{item.teamA&&item.teamA!='TBD'?item.teamA:'TEAM TBD'}}{{$t("SRRN01")}}
            <span v-if="isEn">{{item.attaMatchUserBetNow&&item.attaMatchUserBetNow[1]?moneyFormatNum(item.attaMatchUserBetNow[1].rewardCount):0}} BUSD {{$t("SRRN")}}</span>
            <span v-else>{{item.attaMatchUserBetNow&&item.attaMatchUserBetNow[1]?moneyFormatNum(item.attaMatchUserBetNow[1].rewardCount):0}} BUSD</span>
          </p>
          <p class="info-text">N ({{item.attaMatchUserBetNow&&item.attaMatchUserBetNow[0]?item.attaMatchUserBetNow[0].tickets:0}}{{$t("SRRN1")}}{{item.teamA&&item.teamA!='TBD'?item.teamA:'TEAM TBD'}}{{$t("SRRN01")}}
            <span v-if="isEn">{{item.attaMatchUserBetNow&&item.attaMatchUserBetNow[0]?moneyFormatNum(item.attaMatchUserBetNow[0].rewardCount):0}} BUSD {{$t("SRRN")}}</span>
            <span v-else>{{item.attaMatchUserBetNow&&item.attaMatchUserBetNow[0]?moneyFormatNum(item.attaMatchUserBetNow[0].rewardCount):0}} BUSD</span>
          </p>
          <p class="info-text-title">{{$t("TotalWinning")}}
            <span v-if="isEn"><br>{{item.rewardPersonalTotalCountA}} BUSD</span>
            <span v-else>{{item.rewardPersonalTotalCountA}} BUSD</span>
          </p>
          <p class="info-text-address">{{$t("distributed")}}<br>{{$t("hrs")}}</p>
        </div>
      </div>
      <div class="prize-pools-list">
        <div class="prize-pools-info hanson">
          <p class="list-title">{{item.teamB?item.teamB:'TBD'}}{{$t("winning_pool02")}}</p>
          <p class="list-number">SR*{{item.attaMatchUserBetNow&&item.attaMatchUserBetNow[5]?item.attaMatchUserBetNow[5].tickets:0}}&nbsp;&nbsp;{{item.attaMatchUserBetNow&&item.attaMatchUserBetNow[5]?moneyFormatNum(item.attaMatchUserBetNow[5].rewardCount):0}} BUSD</p>
          <p class="list-number">R*{{item.attaMatchUserBetNow&&item.attaMatchUserBetNow[4]?item.attaMatchUserBetNow[4].tickets:0}}&nbsp;&nbsp;{{item.attaMatchUserBetNow&&item.attaMatchUserBetNow[4]?moneyFormatNum(item.attaMatchUserBetNow[4].rewardCount):0}} BUSD</p>
          <p class="list-number">N*{{item.attaMatchUserBetNow&&item.attaMatchUserBetNow[3]?item.attaMatchUserBetNow[3].tickets:0}}&nbsp;&nbsp;{{item.attaMatchUserBetNow&&item.attaMatchUserBetNow[3]?moneyFormatNum(item.attaMatchUserBetNow[3].rewardCount):0}} BUSD</p>
        </div>
        <div class="niunito">
          <p class="info-text">SR ({{item.attaMatchUserBetNow&&item.attaMatchUserBetNow[5]?item.attaMatchUserBetNow[5].tickets:0}}{{$t("SRRN1")}}{{item.teamB&&item.teamB!='TBD'?item.teamB:'TEAM TBD'}}{{$t("SRRN01")}}
            <span v-if="isEn">{{item.attaMatchUserBetNow&&item.attaMatchUserBetNow[5]?moneyFormatNum(item.attaMatchUserBetNow[5].rewardCount):0}} BUSD{{$t("SRRN")}}</span>
            <span v-else>{{item.attaMatchUserBetNow&&item.attaMatchUserBetNow[5]?moneyFormatNum(item.attaMatchUserBetNow[5].rewardCount):0}} BUSD</span>
          </p>
          <p class="info-text">R ({{item.attaMatchUserBetNow&&item.attaMatchUserBetNow[4]?item.attaMatchUserBetNow[4].tickets:0}}{{$t("SRRN1")}}{{item.teamB&&item.teamB!='TBD'?item.teamB:'TEAM TBD'}}{{$t("SRRN01")}}
            <span v-if="isEn">{{item.attaMatchUserBetNow&&item.attaMatchUserBetNow[4]?moneyFormatNum(item.attaMatchUserBetNow[4].rewardCount):0}} BUSD{{$t("SRRN")}}</span>
            <span v-else>{{item.attaMatchUserBetNow&&item.attaMatchUserBetNow[4]?moneyFormatNum(item.attaMatchUserBetNow[4].rewardCount):0}} BUSD</span>
          </p>
          <p class="info-text">N ({{item.attaMatchUserBetNow&&item.attaMatchUserBetNow[3]?item.attaMatchUserBetNow[3].tickets:0}}{{$t("SRRN1")}}{{item.teamB&&item.teamB!='TBD'?item.teamB:'TEAM TBD'}}{{$t("SRRN01")}}
            <span v-if="isEn"> {{item.attaMatchUserBetNow&&item.attaMatchUserBetNow[3]?moneyFormatNum(item.attaMatchUserBetNow[3].rewardCount):0}} BUSD{{$t("SRRN")}}</span>
            <span v-else>{{item.attaMatchUserBetNow&&item.attaMatchUserBetNow[3]?moneyFormatNum(item.attaMatchUserBetNow[3].rewardCount):0}} BUSD</span>
          </p>
          <p class="info-text-title">{{$t("TotalWinning")}}
            <span v-if="isEn"><br>{{item.rewardPersonalTotalCountB}} BUSD</span>
            <span v-else>{{item.rewardPersonalTotalCountB}} BUSD</span>
          </p>
          <p class="info-text-address">{{$t("distributed")}}<br>{{$t("hrs")}}</p>
        </div>
      </div>
    </div>
  </el-collapse-item>
</el-collapse>
<!--  全球决赛模块 -->
<div class="global-finals">
  <h5 class="hanson">{{$t("globalFinals01")}}</h5>
  <p class="global-finals-title01">{{$t("globalFinals02")}}</p>
  <p class="global-finals-title02">{{$t("globalFinals03")}}</p>
</div>
  <!-- 投票NFT -->
  <div v-if="dialogBol" class="match-dialog flex" v-loading="loadingDialog">
    <!-- 可以投票 -->
    <div v-if="dialogBolVote" class="dialog-vote">
      <img @click="closeDialog" class="dialog-close" src="/match/close.png" alt="">
      <!-- 开始投票 -->
      <div v-if="voteType == 1" class="vote-content">
        <p class="vote-title">{{$t("YourNFTsvote")}}</p>
        <p class="content-title">{{$t("YourNFTsvote")}}</p>
        <p class="content-text">{{$t("voteSR")}}&nbsp;&nbsp;&nbsp;&nbsp;({{formContent['SR'].length}}{{isEn?'':'个'}})</p>
        <p class="content-text">{{$t("voteR")}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;({{formContent['R'].length}}{{isEn?'':'个'}})</p>
        <p class="content-text">{{$t("voteN")}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;({{formContent['N'].length}}{{isEn?'':'个'}})</p>
        <p class="content-title">{{$t("voteSelected")}}</p>
        <p class="content-text">{{$t("voteSR")}}<el-input-number v-model="SRNumber" :disabled="!formContent['SR'].length" :min="0" :max="formContent['SR'].length" label=""></el-input-number><span class="number-max" @click="maxNumber('SR',formContent['SR'].length)">MAX</span></p>
        <p class="content-text">{{$t("voteR")}}<el-input-number v-model="RNumber" :disabled="!formContent['R'].length" :min="0" :max="formContent['R'].length" label=""></el-input-number><span class="number-max" @click="maxNumber('R',formContent['R'].length)">MAX</span></p>
        <p class="content-text">{{$t("voteN")}}<el-input-number v-model="NNumber" :disabled="!formContent['N'].length" :min="0" :max="formContent['N'].length" label=""></el-input-number><span class="number-max" @click="maxNumber('N',formContent['N'].length)">MAX</span></p>
      </div>
      <!-- 投票数据确认 -->
      <div v-if="voteType == 2" class="vote-content vote-content-result">
        <p class="vote-title vote-result">{{$t("voteFollowing")}}</p>
        <p class="content-text content-result">{{$t("voteSR")}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;({{SRNumber}}{{isEn?'':'个'}})</p>
        <p class="content-text">{{$t("voteR")}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;({{RNumber}}{{isEn?'':'个'}})</p>
        <p class="content-text result-after">{{$t("voteN")}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;({{NNumber}}{{isEn?'':'个'}})</p>
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
        <p class="content-bzy">{{$t("voteMystery01")}}<br>{{$t("voteMystery02")}} <a href="https://www.bazhuayu.io/mobile/tc/blindbox.html" target="_blank">bazhuayu.io</a>  {{$t("voteMystery03")}}</p>
      </div>
      <button @click="closeDialog">{{$t("voteOK")}}</button>
    </div>
  </div>
  <div class="match-modify-tips" v-show="modelTips">{{modelTips}}</div>
</template>

<script lang="ts" src="./countdown.ts"></script>
<style lang="scss">
@import "./countdown.scss";
</style>
