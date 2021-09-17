<template>
  <div class="ranking-dialog">
    <div class="dialog-content flex">
      <img class="close" src="/match/close.png" alt="" @click="closeNet">
      <div>
        <div class="dialog-header margin-auto" :class="tipNone?'imgs-none':''" v-if="data.titletips">
          <img src="/kpl/bgi01.png" alt="">
          <p ref="titletipsRef">{{$t(data.titletips)}}</p>
          <img src="/kpl/bgi01.png" alt="">
        </div>
        <div v-if="data.rankingtypeshow == 1">
          <div class="rank-list flex">
            <div class="rank-list-rank">
              <div v-for="(item,index) in data.list" :key="item">
                <div class="ranking-bumber flex" v-if="index < 5">
                    <img :src="'/kpl/No'+item.pm+'.png'" alt="">
                    <img :src="item.imgUrl ? item.imgUrl :'/kpl/header.png'" alt="">
                    <div>
                      <p>{{item.tickets}}{{$t('esports_kpl32')}}</p>
                    </div>
                </div>
              </div>
            </div>
            <div class="rank-list-rank">
              <div v-for="(item,index) in data.list" :key="item">
                <div class="ranking-bumber flex" v-if="index > 4">
                    <img :src="'/kpl/No'+item.pm+'.png'" alt="">
                    <img :src="item.imgUrl ? item.imgUrl :'/kpl/header.png'" alt="">
                    <div>
                      <p>{{item.tickets}}{{$t('esports_kpl32')}}</p>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div class="rank-media">
            <div v-for="(item,index) in data.list" :key="item">
                <div class="ranking-bumber flex">
                    <img :src="'/kpl/No'+item.pm+'.png'" alt="">
                    <img :src="item.imgUrl ? item.imgUrl :'/kpl/header.png'" alt="">
                    <div>
                      <p>{{item.tickets}}{{$t('esports_kpl32')}}</p>
                    </div>
                </div>
              </div>
          </div>
          <p class="timeword">{{$t('esports_kpl52')}}</p>
        </div>
        <div v-if="data.rankingtypeshow == 2" class="tipsrankingbox">
            <p class="smolltips">{{$t('esports_kpl63')}}</p>
            <p class="contentwords" v-html="$t('esports_kpl54')"></p>
            <div class="btnbox flex">
              <button @click="confirmbtn" v-if="data.rankingtypeshow == 3 || data.rankingtypeshow == 5 || data.rankingtypeshow == 6 || data.rankingtypeshow == 8 || data.rankingtypeshow == 10 || data.rankingtypeshow == 11 || data.rankingtypeshow == 12" class="btn1">{{$t('esports_kpl56')}}</button>
              <button @click="confirmbtn" v-if="data.rankingtypeshow == 2" class="btn2">{{$t('esports_kpl55')}}</button>
              <button @click="confirmbtn" v-if="data.rankingtypeshow == 2" class="btn2">{{$t('esports_kpl57')}}</button>
              <button @click="confirmbtn" v-if="data.rankingtypeshow == 3" class="btn2">{{$t('esports_kpl58')}}</button>
              <button @click="confirmbtn" v-if="data.rankingtypeshow == 6" class="btn2">{{$t('esports_kpl59')}}</button>
              <button @click="confirmbtn" v-if="data.rankingtypeshow == 6" class="btn2">{{$t('esports_kpl60')}}</button>
              <button @click="confirmbtn" v-if="data.rankingtypeshow == 6" class="btn2">{{$t('esports_kpl61')}}</button>
              <button @click="confirmbtn" v-if="data.rankingtypeshow == 8" class="btn2">{{$t('esports_kpl62')}}</button>
            </div>
        </div>
        <div v-if="data.rankingtypeshow == 3 || data.rankingtypeshow == 4" class="tipsrankingbox">
            <p class="smolltips" v-if="data.tips">{{$t(data.tips)}}</p>
            <p class="contentwords" v-if="data.content" v-html="$t(data.content)"></p>
            <div v-if="data.tpnum" class="tptkjiajian flex">
              <span>{{$t('esports_kpl72')}}</span>
              <p class="flex">
                <img src="/kpl/addition.png" alt="" @click="addtpnum()">
                <span>{{data.tpnum}}</span>
                <img src="/kpl/subtraction.png" alt="" @click="jiantpnum()">
              </p>
            </div>
            <div :class="(data.rankingtypeshow == 3 || data.rankingtypeshow == 4) ?'btnbox flex centerbtn':'btnbox flex'">
              <button @click="confirmbtn" v-if="data.btn1show == 1" class="btn1">{{$t('esports_kpl56')}}</button>
              <button @click="closeNet" v-if="data.btn2show == 1" class="btn2">{{$t('esports_kpl55')}}</button> <!-- 知道了 -->
              <button @click="confirmbtn" v-if="data.btn2show == 2" class="btn2">{{$t('esports_kpl57')}}</button> <!-- 現在領取 -->
              <button @click="confirmbtn" v-if="data.btn2show == 3" class="btn2">{{$t('esports_kpl58')}}</button> <!-- 現在兌換 -->
              <button @click="confirmbtn" v-if="data.btn2show == 4" class="btn2">{{$t('esports_kpl59')}}</button> <!-- ATTA面具 -->
              <button @click="confirmbtn" v-if="data.btn2show == 5" class="btn2">{{$t('esports_kpl60')}}</button> <!-- 現在兌換 -->
              <button @click="confirmbtn" v-if="data.btn2show == 6" class="btn2">{{$t('esports_kpl61')}}</button> <!-- Loot 入場券 -->
              <button @click="confirmbtn" v-if="data.btn2show == 7" class="btn2">{{$t('esports_kpl62')}}</button> <!-- 前往投票 -->
              <button @click="submitbtn" v-if="data.btn2show == 8" class="btn2">{{$t('esports_kpl71')}}</button> <!-- 提交 -->
              <button @click="confirmbtn" v-if="data.btn2show == 9" class="btn2">{{$t('esports_kpl77')}}</button> <!-- 确认 -->
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./kplRanking.ts"></script>
<style scoped lang='scss'>
@import "./kplRanking.scss";
</style>