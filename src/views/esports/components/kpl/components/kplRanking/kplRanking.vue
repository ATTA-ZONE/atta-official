<template>
  <div class="ranking-dialog">
    <div class="dialog-content">
      <img class="close" src="/match/close.png" alt="">
      <div class="dialog-header margin-auto flex">
        <img src="/kpl/bgi01.png" alt="">
        <p>当前总投票数排行</p>
        <img src="/kpl/bgi01.png" alt="">
      </div>
      <div class="rank-list flex">
        <div class="rank-list-rank">
          <div class="ranking-bumber flex">
            <img src="/kpl/No1.png" alt="">
            <img src="/kpl/header.png" alt="">
            <div>
              <p>32票</p>
            </div>
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