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
        <button v-if="nowDataTime <= item.gameTime" @click.stop="openDialog(item.attaMatchOptions[0],item.matchTokenId)" class="niunito">{{item.attaMatchOptions[0]?item.attaMatchOptions[0].bettingItem:'vote to team'}}</button>
        <button v-else class="unVote niunito">{{item.attaMatchOptions[0]?item.attaMatchOptions[0].bettingItem:'vote to team'}}</button>
      </div>
      <div class="team-logo">
        <div>
          <img :src="'/match/'+(item.teamB?item.teamB:'unGame')+'.png'" alt="">
          <p class="hanson">{{item.teamB}}</p>
        </div>
        <button v-if="nowDataTime <= item.gameTime" @click.stop="openDialog(item.attaMatchOptions[1],item.matchTokenId)" class="niunito">{{item.attaMatchOptions[1]?item.attaMatchOptions[1].bettingItem:'vote to team'}}</button>
        <button v-else class="unVote niunito">{{item.attaMatchOptions[1]?item.attaMatchOptions[1].bettingItem:'vote to team'}}</button>
      </div>
    </div>
    <h5 class="prize-pools-title hanson">{{$t("pool_status")}}</h5>
    <h6 class="prize-pools-number hanson">{{$t("CurrentNFTvotes")}}</h6>
    <div class="prize-pools flex">
      <div class="prize-pools-list">
        <div class="prize-pools-info hanson">
          <p class="list-title">{{$t("winning_pool01")}}</p>
          <p class="list-number">SR {{attaMatchGameBet(item.attaMatchGameBet[2],'rewardCount',2)}}% {{attaMatchGameBet(item.attaMatchGameBet,'tickets',2)}} BUSD</p>
          <p class="list-number">R {{attaMatchGameBet(item.attaMatchGameBet,'rewardCount',1)}}% {{attaMatchGameBet(item.attaMatchGameBet,'tickets',1)}} BUSD</p>
          <p class="list-number">N {{attaMatchGameBet(item.attaMatchGameBet,'rewardCount',0)}}% {{attaMatchGameBet(item.attaMatchGameBet,'tickets',0)}} BUSD</p>
        </div>
        <div class="niunito">
          <p class="info-text">SR ({{attaMatchGameBet(item.attaMatchGameBet,'tickets',2)}}{{$t("unitTxt")}}) {{$t("SRRN0")}} 69%.
            <span v-if="isEn"><br>{{$t("SR01")}}XXXX BUSD</span>
            <span v-else>{{$t("SR01")}}XXX BUSD</span>
          </p>
          <p class="info-text">R(125{{$t("unitTxt")}}) {{$t("SRRN0")}} 25%.
            <span v-if="isEn"><br>{{$t("R01")}}XXXX BUSD</span>
            <span v-else>{{$t("R01")}}XXX BUSD</span>
          </p>
          <p class="info-text">N(15{{$t("unitTxt")}}) {{$t("SRRN0")}} 6%.
            <span v-if="isEn"><br>{{$t("N01")}}XXXX BUSD</span>
            <span v-else>{{$t("N01")}}XXX BUSD</span>
          </p>
        </div>
      </div>
      <div class="prize-pools-list">
        <div class="prize-pools-info hanson">
          <p class="list-title">{{$t("winning_pool02")}}</p>
          <p class="list-number">SR {{attaMatchGameBet(item.attaMatchGameBet,'rewardCount',5)}}% {{attaMatchGameBet(item.attaMatchGameBet,'tickets',5)}} BUSD</p>
          <p class="list-number">R {{attaMatchGameBet(item.attaMatchGameBet,'rewardCount',4)}}% {{attaMatchGameBet(item.attaMatchGameBet,'tickets',4)}} BUSD</p>
          <p class="list-number">N {{attaMatchGameBet(item.attaMatchGameBet,'rewardCount',3)}}% {{attaMatchGameBet(item.attaMatchGameBet,'tickets',3)}} BUSD</p>
        </div>
        <div class="niunito">
          <p class="info-text">SR (1256{{$t("unitTxt")}}) {{$t("SRRN0")}} 69%.
            <span v-if="isEn"><br>{{$t("SR01")}}XXX BUSD</span>
            <span v-else>{{$t("SR01")}}XXX BUSD</span>
          </p>
          <p class="info-text">R(125{{$t("unitTxt")}}) {{$t("SRRN0")}} 25%.
            <span v-if="isEn"><br>{{$t("R01")}}XXX BUSD</span>
            <span v-else>{{$t("R01")}}XXX BUSD</span>
          </p>
          <p class="info-text">N(15{{$t("unitTxt")}}) {{$t("SRRN0")}} 6%.
            <span v-if="isEn"><br>{{$t("N01")}}XXX BUSD</span>
            <span v-else>{{$t("N01")}}XXX BUSD</span>
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
            <span v-if="isEn">XXXX BUSD {{$t("SRRN")}}</span>
            <span v-else>XXXX BUSD</span>
          </p>
          <p class="info-text">R (3{{$t("SRRN1")}}
            <span v-if="isEn">XXXX BUSD {{$t("SRRN")}}</span>
            <span v-else>XXXX BUSD</span>
          </p>
          <p class="info-text">N (0{{$t("SRRN1")}}
            <span v-if="isEn">XXXX BUSD {{$t("SRRN")}}</span>
            <span v-else>XXXX BUSD</span>
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
          <p class="list-title">{{$t("winning_pool02")}}</p>
          <p class="list-number">TEAMSR 69% xx BUSD</p>
          <p class="list-number">R 25% xx BUSD</p>
          <p class="list-number">N 06% xx BUSD</p>
        </div>
        <div class="niunito">
          <p class="info-text">SR (5{{$t("SRRN2")}}
            <span v-if="isEn">XXXX BUSD{{$t("SRRN")}}</span>
            <span v-else>XXXX BUSD</span>
          </p>
          <p class="info-text">R (3{{$t("SRRN2")}}
            <span v-if="isEn">XXXX BUSD{{$t("SRRN")}}</span>
            <span v-else>XXXX BUSD</span>
          </p>
          <p class="info-text">N (0{{$t("SRRN2")}}
            <span v-if="isEn"> XXXX BUSD{{$t("SRRN")}}</span>
            <span v-else>XXXX BUSD</span>
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
        <p class="content-bzy">{{$t("voteMystery01")}}<br>{{$t("voteMystery02")}} <a href="bazhuayu.io">bazhuayu.io</a>  {{$t("voteMystery03")}}</p>
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
