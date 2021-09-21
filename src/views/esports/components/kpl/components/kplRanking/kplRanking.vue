<template>
  <div class="ranking-dialog">
    <div class="dialog-content flex" v-loading="loading">
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
                    <img :src="item.imgUrl ? formatVideoUrl2(item.imgUrl) :'/kpl/header.png'" alt="">
                    <div>
                      <p v-if="item.ticketsno" class="111">{{$t('esports_kpl32_jia')}}</p>
                      <p v-else>{{item.tickets}}{{$t('esports_kpl32')}}</p>
                    </div>
                </div>
              </div>
            </div>
            <div class="rank-list-rank">
              <div v-for="(item,index) in data.list" :key="item">
                <div class="ranking-bumber flex" v-if="index > 4">
                    <img :src="'/kpl/No'+item.pm+'.png'" alt="">
                    <img :src="item.imgUrl ? formatVideoUrl2(item.imgUrl) :'/kpl/header.png'" alt="">
                    <div>
                      <p v-if="item.ticketsno" class="111">{{$t('esports_kpl32_jia')}}</p>
                      <p v-else>{{item.tickets}}{{$t('esports_kpl32')}}</p>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div class="rank-media">
            <div v-for="(item,index) in data.list" :key="item">
                <div class="ranking-bumber flex">
                    <img :src="'/kpl/No'+item.pm+'.png'" alt="">
                    <img :src="item.imgUrl ? formatVideoUrl2(item.imgUrl) :'/kpl/header.png'" alt="">
                    <div>
                      <p>{{item.tickets}}{{$t('esports_kpl32')}}</p>
                    </div>
                </div>
              </div>
          </div>
          <p class="timeword">{{$t('esports_kpl52')}}</p>
        </div>
        <div v-if="data.rankingtypeshow == 2" class="tipsrankingbox">
            <p class="contentwords" v-if="data.content" v-html="$t(data.content)"></p>
            <p class="smolltips" v-if="data.tips">{{$t(data.tips)}}</p>
            <div v-if="data.list" class="tipsrankingbox-content margin-auto">
              <p class="type-number flex">
                <span>SR</span>
                <span>{{data.list.lplNft.SR.length}}{{$t('esports_kpl80')}}</span>
                <span>R</span>
                <span>{{data.list.lplNft.R.length}}{{$t('esports_kpl80')}}</span>
                <span>N</span>
                <span>{{data.list.lplNft.N.length}}{{$t('esports_kpl80')}}</span>
              </p>
              <p class="type-number">{{$t('esports_kpl81')}}{{data.list.points}}{{$t('esports_kpl82')}}</p>
              <p class="type-exchange">{{$t('esports_kpl83')}} {{data.list.amount}} {{$t('esports_kpl84')}}</p>
            </div>
            <div v-if="data.list2" class="tipsrankingbox-content margin-auto">
              <p class="type-number flex type-block">
                <span v-if="data.type == 1">{{data.unclaimed}}{{$t('esports_kpl80')}}</span>
                <span v-if="data.type == 2 && data.unclaimed[2] > 0">{{$t('esports_kpl93')}}{{data.unclaimed[2]}}{{$t('esports_kpl80')}}</span>
                <span v-if="data.type == 2 && data.unclaimed[1] > 0">{{$t('esports_kpl94')}}{{data.unclaimed[1]}}{{$t('esports_kpl80')}}</span>
                <span v-if="data.type == 2 && data.unclaimed[0] > 0">{{$t('esports_kpl95')}}{{data.unclaimed[0]}}{{$t('esports_kpl80')}}</span>
                <span>{{$t('esports_kpl89')}}{{data.ticketAmount}}{{$t('esports_kpl90')}}</span>
              </p>
            </div>
            <div class="btnbox flex" :class="{'centerbtn':data.rankingtypeshow == 2,'btnbox-en':isEn}">
              <button @click="closeNet" v-if="data.btn1show == 1" class="btn1">{{$t('esports_kpl56')}}</button>
              <button @click="nowreceive" v-if="data.btn2show == 2" class="btn2">{{$t('esports_kpl57')}}</button><!-- 現在領取 -->
              <button @click="exchangenowbtn" v-if="data.btn2show == 3 && data.list && data.list.amount > 0" class="btn2">{{$t('esports_kpl58')}}</button><!-- 現在兌換 -->
            </div>
        </div>
        <div v-if="data.rankingtypeshow == 3 || data.rankingtypeshow == 4" class="tipsrankingbox">
            <p class="smolltips" v-if="data.tips">{{$t(data.tips)}}</p>
            <p class="contentwords" v-if="data.content" v-html="$t(data.content)"></p>
            <div v-if="data.tpnum" class="tptkjiajian flex">
              <span>{{$t('esports_kpl72')}}</span>
              <p class="flex">
                <img src="/kpl/subtraction.png" alt="" @click="jiantpnum()">
                <span>{{data.tpnum}}</span>
                <img src="/kpl/addition.png" alt="" @click="addtpnum()">
              </p>
            </div>
            <div class="btnbox flex" :class="{'centerbtn':(data.rankingtypeshow == 3 || data.rankingtypeshow == 4),'btn-box':(data.btn1show == 2 || data.btn2show == 6),'btnbox-en':isEn}">
              <button @click="closeNet" v-if="data.btn1show == 1" class="btn1">{{$t('esports_kpl56')}}</button>
              <button @click="collectvotingticketsbtn(1)" v-if="data.btn1show == 2" class="btn2">{{$t('esports_kpl59')}}</button><!-- ATTA面具 -->
              <button @click="closeNet" v-if="data.btn2show == 1" class="btn2">{{$t('esports_kpl55')}}</button> <!-- 知道了 -->
              <button @click="collectvotingticketsbtn(2)" v-if="data.btn2show == 6" class="btn2">{{$t('esports_kpl61')}}</button><!-- Loot 入場券 -->
              <button @click="closeNet" v-if="data.btn2show == 7" class="btn2">{{$t('esports_kpl62')}}</button><!-- 前往投票 -->
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