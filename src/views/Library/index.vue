<template>
  <header-cell />
  <div class="library-page">
    <h5 class="library-title">探索ATTA NFT</h5>
    <div class="library-list" v-for="item in libraryList">
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
            <img v-if="item.logo" src="" alt="">
            <p class="text-remark"></p>
          </div>
        </div>
      </div>
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