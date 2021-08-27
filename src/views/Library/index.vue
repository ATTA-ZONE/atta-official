<template>
  <header-cell />
  <div class="library-page">
    <h5 class="library-title">探索ATTA NFT</h5>
    <div class="library-list" v-for="(item,index) in libraryList" :key="index">
      <h5 class="list-title">{{item.title}}</h5>
      <div class="library-list-info flex">
        <div class="library-img">
          <img :src="item.img01" alt="">
        </div>
        <div class="library-text flex">
          <div class="text-top">
            <p>{{item.text01}}</p>
            <p>{{item.text02}}</p>
          </div>
          <div class="text-bottom">
            <p class="text-remark mt-15">{{item.plan01}}</p>
            <p class="text-remark">{{item.plan02}}</p>
            <p class="text-remark">{{item.plan03}}</p>
            <img v-if="item.logo" class="mt-15" :src="item.logo" alt="">
          </div>
        </div>
      </div>
      <div class="library-more">
        <div class="more-btn flex" @click="moreBtn(index+1)">
          <img class="library-icon" :class="moreNumber&&(moreNumber==index+1)?'more-icon':''" src="/match/more.png" alt="">
          <span>{{moreNumber&&(moreNumber==index+1)?'收起':'展开'}}</span>
        </div>
        <div class="more-content flex" :class="moreNumber&&(moreNumber==index+1)?'more-content-more':''">
          <div class="content-info" v-for="info in imgsList[item.imgsname]">
            <img :src="info.url" alt="">
            <p class="hanson">{{info.text}}</p>
          </div>
        </div>
      </div>
      <p class="library-bottom-remark">{{item.remark}}</p>
    </div>  
  </div>
  <footer-cell />
  <!--
  <mediaModal></mediaModal>
  -->
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang='scss'>
@import "./index.scss"
</style>