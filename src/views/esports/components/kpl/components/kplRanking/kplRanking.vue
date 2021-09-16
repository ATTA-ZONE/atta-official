<template>
  <div class="ranking-dialog">
    <div class="dialog-content">
      <img class="close" src="/match/close.png" alt="">
      <div class="dialog-header margin-auto flex">
        <img src="/kpl/bgi01.png" alt="">
        <p>{{$t(title1)}}</p>
        <img src="/kpl/bgi01.png" alt="">
      </div>
      <div v-if="rankingtypeshow == 1">
        <div class="rank-list flex">
          <div class="rank-list-rank">
            <div class="ranking-bumber flex" v-for="item in 5" :key="item">
              <img src="/kpl/No1.png" alt="">
              <img src="/kpl/header.png" alt="">
              <div>
                <p>32{{$t('esports_kpl32')}}</p>
              </div>
            </div>
          </div>
          <div class="rank-list-rank">
            <div class="ranking-bumber flex">
              <img src="/kpl/No1.png" alt="">
              <img src="/kpl/header.png" alt="">
              <div>
                <p>32{{$t('esports_kpl32')}}</p>
              </div>
            </div>
          </div>
        </div>
        <p class="timeword">{{$t('esports_kpl52')}}</p>
      </div>
      <div v-if="rankingtypeshow == 2" class="tipsrankingbox">
          <p class="smolltips">{{$t('esports_kpl63')}}</p>
          <p class="contentwords" v-html="$t('esports_kpl54')"></p>
          <div class="btnbox flex">
            <button v-if="rankingtypeshow == 3 || rankingtypeshow == 5 || rankingtypeshow == 6 || rankingtypeshow == 8 || rankingtypeshow == 10 || rankingtypeshow == 11 || rankingtypeshow == 12" class="btn1">{{$t('esports_kpl56')}}</button>
            <button v-if="rankingtypeshow == 2" class="btn2">{{$t('esports_kpl55')}}</button>
            <button v-if="rankingtypeshow == 7" class="btn2">{{$t('esports_kpl57')}}</button>
            <button v-if="rankingtypeshow == 3" class="btn2">{{$t('esports_kpl58')}}</button>
            <button v-if="rankingtypeshow == 6" class="btn2">{{$t('esports_kpl59')}}</button>
            <button v-if="rankingtypeshow == 6" class="btn2">{{$t('esports_kpl60')}}</button>
            <button v-if="rankingtypeshow == 6" class="btn2">{{$t('esports_kpl61')}}</button>
            <button v-if="rankingtypeshow == 8" class="btn2">{{$t('esports_kpl62')}}</button>
          </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./kplRanking.ts"></script>
<style scoped lang='scss'>
@import "./kplRanking.scss";
</style>