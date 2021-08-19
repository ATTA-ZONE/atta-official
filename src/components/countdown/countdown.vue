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
        <!-- <br> {{$t("reward_pool02")}} -->
        <p class="match-text niunito">{{$t("reward_pool01")}} {{moneyFormatNum(curRewardPool)}} BUSD <br> {{$t("reward_pool03")}}</p>
      </div>
      <img class="header-icon" src="/match/more.png" alt="">
    </template>
    <div class="match-countdown hanson">
      <p>{{$t("VotingCountdown")}}</p>
      <h5>{{hour}}h:{{minute}}m:{{second}}s</h5>
      <p>{{$t("Match_Start")}}</p> 
      <h5>{{item.gameDate?item.gameDate:'TBD'}}</h5>
    </div>
    <div class="game-team flex">
      <div class="team-logo">
        <img v-if="item.result == 1" class="logo-winner" src="/match/WINNER.png" alt="">
        <div>
          <img :src="'/match/'+(item.teamA&&item.teamA != 'TBD'?item.teamA:'unGame')+'.png'" alt="">
          <p class="hanson">{{item.teamA?item.teamA:'TBD'}}</p>
        </div>
        <button v-if="nowDataTime <= item.gameTime && item.teamA != 'TBD' && item.teamB != 'TBD'" @click.stop="openDialog(item.attaMatchOptions[0],item.matchTokenId)" class="niunito">{{item.attaMatchOptions[0]?item.attaMatchOptions[0].bettingItem:'vote to team'}}</button>
        <button @click="unDialog" v-else class="unVote niunito">{{item.attaMatchOptions[0]?item.attaMatchOptions[0].bettingItem:'vote to team'}}</button>
      </div>
      <div class="team-logo">
        <img v-if="item.result == 2" class="logo-winner" src="/match/WINNER.png" alt="">
        <div>
          <img :src="'/match/'+(item.teamB&&item.teamB != 'TBD'?item.teamB:'unGame')+'.png'" alt="">
          <p class="hanson">{{item.teamB?item.teamB:'TBD'}}</p>
        </div>
        <button v-if="nowDataTime <= item.gameTime && item.teamA != 'TBD' && item.teamB != 'TBD'" @click.stop="openDialog(item.attaMatchOptions[1],item.matchTokenId)" class="niunito">{{item.attaMatchOptions[1]?item.attaMatchOptions[1].bettingItem:'vote to team'}}</button>
        <button @click="unDialog" v-else class="unVote niunito">{{item.attaMatchOptions[1]?item.attaMatchOptions[1].bettingItem:'vote to team'}}</button>
      </div>
    </div>
    <h5 class="prize-pools-title hanson">{{$t("pool_status")}}</h5>
    <h6 class="prize-pools-number hanson">{{$t("CurrentNFTvotes")}}</h6>
    <div class="prize-pools flex">
      <div class="prize-pools-list">
        <div class="prize-pools-info hanson">
          <p class="list-title">{{item.teamA?item.teamA:'TBD'}}{{$t("winning_pool01")}}</p>
          <p class="list-number">SR {{item.attaMatchGameBet&&item.attaMatchGameBet[2]?item.attaMatchGameBet[2].rewardRate:0}}% {{item.attaMatchGameBet&&item.attaMatchGameBet[2]?moneyFormatNum(item.attaMatchGameBet[2].rewardCount):0}} BUSD</p>
          <p class="list-number">R {{item.attaMatchGameBet&&item.attaMatchGameBet[1]?item.attaMatchGameBet[1].rewardRate:0}}% {{item.attaMatchGameBet&&item.attaMatchGameBet[1]?moneyFormatNum(item.attaMatchGameBet[1].rewardCount):0}} BUSD</p>
          <p class="list-number">N {{item.attaMatchGameBet&&item.attaMatchGameBet[0]?item.attaMatchGameBet[0].rewardRate:0}}% {{item.attaMatchGameBet&&item.attaMatchGameBet[0]?moneyFormatNum(item.attaMatchGameBet[0].rewardCount):0}} BUSD</p>
        </div>
        <div class="niunito">
          <p class="info-text">SR ({{item.attaMatchGameBet&&item.attaMatchGameBet[2]?item.attaMatchGameBet[2].tickets:0}}{{$t("unitTxt")}}) {{$t("SRRN0")}} {{item.attaMatchGameBet&&item.attaMatchGameBet[2]?item.attaMatchGameBet[2].rewardRate:0}}%.
            <span v-if="isEn"><br>{{$t("SR01")}}{{item.attaMatchGameBet&&item.attaMatchGameBet[2]?moneyFormatNum(item.attaMatchGameBet[2].rewardForSingle):0}} BUSD</span>
            <span v-else>{{$t("SR01")}}{{item.attaMatchGameBet&&item.attaMatchGameBet[2]?moneyFormatNum(item.attaMatchGameBet[2].rewardForSingle):0}} BUSD</span>
          </p>
          <p class="info-text">R({{item.attaMatchGameBet&&item.attaMatchGameBet[1]?item.attaMatchGameBet[1].tickets:0}}{{$t("unitTxt")}}) {{$t("SRRN0")}} {{item.attaMatchGameBet&&item.attaMatchGameBet[1]?item.attaMatchGameBet[1].rewardRate:0}}%.
            <span v-if="isEn"><br>{{$t("R01")}}{{item.attaMatchGameBet&&item.attaMatchGameBet[1]?moneyFormatNum(item.attaMatchGameBet[1].rewardForSingle):0}} BUSD</span>
            <span v-else>{{$t("R01")}}{{item.attaMatchGameBet&&item.attaMatchGameBet[1]?moneyFormatNum(item.attaMatchGameBet[1].rewardForSingle):0}} BUSD</span>
          </p>
          <p class="info-text">N({{item.attaMatchGameBet&&item.attaMatchGameBet[0]?item.attaMatchGameBet[0].tickets:0}}{{$t("unitTxt")}}) {{$t("SRRN0")}} {{item.attaMatchGameBet&&item.attaMatchGameBet[0]?item.attaMatchGameBet[0].rewardRate:0}}%.
            <span v-if="isEn"><br>{{$t("N01")}}{{item.attaMatchGameBet&&item.attaMatchGameBet[0]?moneyFormatNum(item.attaMatchGameBet[0].rewardForSingle):0}} BUSD</span>
            <span v-else>{{$t("N01")}}{{item.attaMatchGameBet&&item.attaMatchGameBet[0]?moneyFormatNum(item.attaMatchGameBet[0].rewardForSingle):0}} BUSD</span>
          </p>
        </div>
      </div>
      <div class="prize-pools-list">
        <div class="prize-pools-info hanson">
          <p class="list-title">{{item.teamB?item.teamB:'TBD'}}{{$t("winning_pool02")}}</p>
          <p class="list-number">SR {{item.attaMatchGameBet&&item.attaMatchGameBet[5]?item.attaMatchGameBet[5].rewardRate:0}}% {{item.attaMatchGameBet&&item.attaMatchGameBet[5]?moneyFormatNum(item.attaMatchGameBet[5].rewardCount):0}} BUSD</p>
          <p class="list-number">R {{item.attaMatchGameBet&&item.attaMatchGameBet[4]?item.attaMatchGameBet[4].rewardRate:0}}% {{item.attaMatchGameBet&&item.attaMatchGameBet[4]?moneyFormatNum(item.attaMatchGameBet[4].rewardCount):0}} BUSD</p>
          <p class="list-number">N {{item.attaMatchGameBet&&item.attaMatchGameBet[3]?item.attaMatchGameBet[3].rewardRate:0}}% {{item.attaMatchGameBet&&item.attaMatchGameBet[3]?moneyFormatNum(item.attaMatchGameBet[3].rewardCount):0}} BUSD</p>
        </div>
        <div class="niunito">
          <p class="info-text">SR ({{item.attaMatchGameBet&&item.attaMatchGameBet[5]?item.attaMatchGameBet[5].tickets:0}}{{$t("unitTxt")}}) {{$t("SRRN0")}} {{item.attaMatchGameBet&&item.attaMatchGameBet[5]?item.attaMatchGameBet[5].rewardRate:0}}%.
            <span v-if="isEn"><br>{{$t("SR01")}}{{item.attaMatchGameBet&&item.attaMatchGameBet[5]?moneyFormatNum(item.attaMatchGameBet[5].rewardForSingle):0}} BUSD</span>
            <span v-else>{{$t("SR01")}}{{item.attaMatchGameBet&&item.attaMatchGameBet[5]?moneyFormatNum(item.attaMatchGameBet[5].rewardForSingle):0}} BUSD</span>
          </p>
          <p class="info-text">R ({{item.attaMatchGameBet&&item.attaMatchGameBet[4]?item.attaMatchGameBet[4].tickets:0}}{{$t("unitTxt")}}) {{$t("SRRN0")}} {{item.attaMatchGameBet&&item.attaMatchGameBet[4]?item.attaMatchGameBet[4].rewardRate:0}}%.
            <span v-if="isEn"><br>{{$t("R01")}}{{item.attaMatchGameBet&&item.attaMatchGameBet[4]?moneyFormatNum(item.attaMatchGameBet[4].rewardForSingle):0}} BUSD</span>
            <span v-else>{{$t("R01")}}{{item.attaMatchGameBet&&item.attaMatchGameBet[4]?moneyFormatNum(item.attaMatchGameBet[4].rewardForSingle):0}} BUSD</span>
          </p>
          <p class="info-text">N({{item.attaMatchGameBet&&item.attaMatchGameBet[3]?(item.attaMatchGameBet[3].tickets):0}}{{$t("unitTxt")}}) {{$t("SRRN0")}} {{item.attaMatchGameBet&&item.attaMatchGameBet[3]?item.attaMatchGameBet[3].rewardRate:0}}%.
            <span v-if="isEn"><br>{{$t("N01")}}{{item.attaMatchGameBet&&item.attaMatchGameBet[3]?moneyFormatNum(item.attaMatchGameBet[3].rewardForSingle):0}} BUSD</span>
            <span v-else>{{$t("N01")}}{{item.attaMatchGameBet&&item.attaMatchGameBet[3]?moneyFormatNum(item.attaMatchGameBet[3].rewardForSingle):0}} BUSD</span>
          </p>
        </div>
      </div>
    </div>
    <h6 class="prize-pools-number hanson">{{$t("MyVotes")}}</h6>
    <div class="prize-pools flex">
      <div class="prize-pools-list">
        <div class="prize-pools-info hanson">
          <p class="list-title">{{item.teamA?item.teamA:'TBD'}}{{$t("winning_pool01")}}</p>
          <p class="list-number">SR*{{item.attaMatchUserBet&&item.attaMatchUserBet[2]?item.attaMatchUserBet[2].tickets:0}}&nbsp;&nbsp;{{item.attaMatchUserBet&&item.attaMatchUserBet[2]?moneyFormatNum(item.attaMatchUserBet[2].rewardCount):0}} BUSD</p>
          <p class="list-number">R*{{item.attaMatchUserBet&&item.attaMatchUserBet[1]?item.attaMatchUserBet[1].tickets:0}}&nbsp;&nbsp;{{item.attaMatchUserBet&&item.attaMatchUserBet[1]?moneyFormatNum(item.attaMatchUserBet[1].rewardCount):0}} BUSD</p>
          <p class="list-number">N*{{item.attaMatchUserBet&&item.attaMatchUserBet[0]?item.attaMatchUserBet[0].tickets:0}}&nbsp;&nbsp;{{item.attaMatchUserBet&&item.attaMatchUserBet[0]?moneyFormatNum(item.attaMatchUserBet[0].rewardCount):0}} BUSD</p>
        </div>
        <div class="niunito">
          <p class="info-text">SR ({{item.attaMatchUserBet&&item.attaMatchUserBet[2]?item.attaMatchUserBet[2].tickets:0}}{{$t("SRRN1")}}
            <span v-if="isEn">{{item.attaMatchUserBet&&item.attaMatchUserBet[2]?moneyFormatNum(item.attaMatchUserBet[2].rewardCount):0}} BUSD {{$t("SRRN")}}</span>
            <span v-else>{{item.attaMatchUserBet&&item.attaMatchUserBet[2]?moneyFormatNum(item.attaMatchUserBet[2].rewardCount):0}} BUSD</span>
          </p>
          <p class="info-text">R ({{item.attaMatchUserBet&&item.attaMatchUserBet[1]?item.attaMatchUserBet[1].tickets:0}}{{$t("SRRN1")}}
            <span v-if="isEn">{{item.attaMatchUserBet&&item.attaMatchUserBet[1]?moneyFormatNum(item.attaMatchUserBet[1].rewardCount):0}} BUSD {{$t("SRRN")}}</span>
            <span v-else>{{item.attaMatchUserBet&&item.attaMatchUserBet[1]?moneyFormatNum(item.attaMatchUserBet[1].rewardCount):0}} BUSD</span>
          </p>
          <p class="info-text">N ({{item.attaMatchUserBet&&item.attaMatchUserBet[0]?item.attaMatchUserBet[0].tickets:0}}{{$t("SRRN1")}}
            <span v-if="isEn">{{item.attaMatchUserBet&&item.attaMatchUserBet[0]?moneyFormatNum(item.attaMatchUserBet[0].rewardCount):0}} BUSD {{$t("SRRN")}}</span>
            <span v-else>{{item.attaMatchUserBet&&item.attaMatchUserBet[0]?moneyFormatNum(item.attaMatchUserBet[0].rewardCount):0}} BUSD</span>
          </p>
          <p class="info-text-title">{{$t("TotalWinning")}}
            <span v-if="isEn"><br>{{item.temaAAll}} BUSD</span>
            <span v-else>{{item.temaAAll}} BUSD</span>
          </p>
          <p class="info-text-address">{{$t("distributed")}}<br>{{$t("hrs")}}</p>
        </div>
      </div>
      <div class="prize-pools-list">
        <div class="prize-pools-info hanson">
          <p class="list-title">{{item.teamB?item.teamB:'TBD'}}{{$t("winning_pool02")}}</p>
          <p class="list-number">SR*{{item.attaMatchUserBet&&item.attaMatchUserBet[5]?item.attaMatchUserBet[5].tickets:0}}&nbsp;&nbsp;{{item.attaMatchUserBet&&item.attaMatchUserBet[5]?moneyFormatNum(item.attaMatchUserBet[5].rewardCount):0}} BUSD</p>
          <p class="list-number">R*{{item.attaMatchUserBet&&item.attaMatchUserBet[4]?item.attaMatchUserBet[4].tickets:0}}&nbsp;&nbsp;{{item.attaMatchUserBet&&item.attaMatchUserBet[4]?moneyFormatNum(item.attaMatchUserBet[4].rewardCount):0}} BUSD</p>
          <p class="list-number">N*{{item.attaMatchUserBet&&item.attaMatchUserBet[3]?item.attaMatchUserBet[3].tickets:0}}&nbsp;&nbsp;{{item.attaMatchUserBet&&item.attaMatchUserBet[3]?moneyFormatNum(item.attaMatchUserBet[3].rewardCount):0}} BUSD</p>
        </div>
        <div class="niunito">
          <p class="info-text">SR ({{item.attaMatchUserBet&&item.attaMatchUserBet[5]?item.attaMatchUserBet[5].tickets:0}}{{$t("SRRN2")}}
            <span v-if="isEn">{{item.attaMatchUserBet&&item.attaMatchUserBet[5]?moneyFormatNum(item.attaMatchUserBet[5].rewardCount):0}} BUSD{{$t("SRRN")}}</span>
            <span v-else>{{item.attaMatchUserBet&&item.attaMatchUserBet[5]?moneyFormatNum(item.attaMatchUserBet[5].rewardCount):0}} BUSD</span>
          </p>
          <p class="info-text">R ({{item.attaMatchUserBet&&item.attaMatchUserBet[4]?item.attaMatchUserBet[4].tickets:0}}{{$t("SRRN2")}}
            <span v-if="isEn">{{item.attaMatchUserBet&&item.attaMatchUserBet[4]?moneyFormatNum(item.attaMatchUserBet[4].rewardCount):0}} BUSD{{$t("SRRN")}}</span>
            <span v-else>{{item.attaMatchUserBet&&item.attaMatchUserBet[4]?moneyFormatNum(item.attaMatchUserBet[4].rewardCount):0}} BUSD</span>
          </p>
          <p class="info-text">N ({{item.attaMatchUserBet&&item.attaMatchUserBet[3]?item.attaMatchUserBet[3].tickets:0}}{{$t("SRRN2")}}
            <span v-if="isEn"> {{item.attaMatchUserBet&&item.attaMatchUserBet[3]?moneyFormatNum(item.attaMatchUserBet[3].rewardCount):0}} BUSD{{$t("SRRN")}}</span>
            <span v-else>{{item.attaMatchUserBet&&item.attaMatchUserBet[3]?moneyFormatNum(item.attaMatchUserBet[3].rewardCount):0}} BUSD</span>
          </p>
          <p class="info-text-title">{{$t("TotalWinning")}}
            <span v-if="isEn"><br>{{item.temaBAll}} BUSD</span>
            <span v-else>{{item.temaBAll}} BUSD</span>
          </p>
          <p class="info-text-address">{{$t("distributed")}}<br>{{$t("hrs")}}</p>
        </div>
      </div>
    </div>
  </el-collapse-item>
</el-collapse>
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
        <p class="content-text">{{$t("voteSR")}}<el-input-number v-model="SRNumber" :disabled="!formContent['SR'].length" :min="0" :max="formContent['SR'].length" label=""></el-input-number></p>
        <p class="content-text">{{$t("voteR")}}<el-input-number v-model="RNumber" :disabled="!formContent['R'].length" :min="0" :max="formContent['R'].length" label=""></el-input-number></p>
        <p class="content-text">{{$t("voteN")}}<el-input-number v-model="NNumber" :disabled="!formContent['N'].length" :min="0" :max="formContent['N'].length" label=""></el-input-number></p>
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
