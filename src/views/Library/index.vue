<template>
  <header-cell />
  <div class="library-page">
    <h5 class="library-title">{{$t('library_copywriting_1')}}</h5>
    <div class="library-list" v-for="(item,index) in libraryList" :key="item.img01">
      <h5 class="list-title">{{$t(item.title)}}</h5>
      <div class="library-list-info flex">
        <div class="library-img">
          <img :src="item.img01" alt="">
        </div>
        <div class="library-text flex">
          <div class="text-top">
            <p v-html="$t(item.text01)"></p>
          </div>
          <div class="text-bottom">
            <img v-if="item.logo" class="mt-15" :src="item.logo" alt="">
          </div>
        </div>
      </div>
      <div class="library-more" v-if="item.imgsList && item.imgsList.length">
        <div class="more-btn flex" @click="moreBtn(index+1)">
          <img class="library-icon" :class="moreNumber&&(moreNumber==index+1)?'more-icon':''" src="/match/more.png" alt="">
          <span>{{moreNumber&&(moreNumber==index+1)?  $t('library_copywriting_116'):  $t('library_copywriting_115')}}</span>
        </div>
        <div class="more-content flex" :class="moreNumber&&(moreNumber==index+1)?'more-content-more':''">
          <div class="content-info" v-for="(info,num) in item.imgsList" :class="[info.url?'':'img-null',item.imgName?'manghe-info':'']" :key="info.url">
            <img v-if="item.detailName" @click="openModal(item,index,info,num)" class="library-pos" :class="item.detailName=='br'?'pos-br':'pos-tr'" src="/library/detail.png" alt="">
            <img :src="info.url" alt="">
            <p class="hanson">{{$t(info.text)}}</p>
          </div>
        </div>
      </div>
      <p class="library-bottom-remark">{{$t(item.remark)}}</p>
    </div>  
  </div>
  <footer-cell />
  <mediaModal :content="contents" @closeNet="closeNet" v-if="modelBol"></mediaModal>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang='scss'>
@import "./index.scss"
</style>