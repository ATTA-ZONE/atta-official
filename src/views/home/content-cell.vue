<template>
  <div class="content-cell">
    <div class="content-cell-head">
      <span>{{$t(props.title)}}:</span>
      <span @click="toggleDesc(props.title)">{{$t('moreInfo')}} {{props.btn}}</span>
    </div>
    <div class="content-cell-desc" v-if="props.showDesc == props.title && props.title === 'ATTA NFT Exclusive Benefits'">
      <div class="atta-nft-desc">{{$t('nftInfo1')}}</div>
      <div class="atta-nft-desc">{{$t('nftInfo2')}}</div>
      <div class="atta-nft-desc">{{$t('nftInfo3')}}</div>
      <div class="atta-nft-desc">{{$t('nftInfo4')}}</div>
    </div>
    <div class="content-cell-desc" v-if="props.showDesc == props.title && props.title === 'ATTA NFT Utility'">
      <div class="atta-nft-desc">{{$t('brandInfo1')}}</div>
      <div class="atta-nft-desc">{{$t('brandInfo2')}}</div>
      <div class="atta-nft-desc">{{$t('brandInfo3')}}</div>
      <div class="atta-nft-desc">{{$t('brandInfo4')}}</div>
      <div class="atta-nft-desc">{{$t('brandInfo5')}}</div>
      <div class="atta-nft-desc">{{$t('brandInfo6')}}</div>
      <div class="atta-nft-desc">{{$t('brandInfo7')}}</div>
      <div class="atta-nft-desc">{{$t('brandInfo8')}}</div>
      <div class="atta-nft-desc">{{$t('brandInfo9')}}</div>
      <div class="atta-nft-desc">{{$t('brandInfo10')}}</div>
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    },
    desc: String,
    btn: String,
    showDesc: String
  },
  setup(props,context){
    const toggleDesc = (str:string) => {
      if (str === props.showDesc) {
        str = ''
      }
      context.emit('toggleShow',str)
    }
    return {props, toggleDesc}
  }
});
</script>
<style lang='scss'>
  .content-cell {
    margin-bottom: 20px;
    &-head {
      display: flex;
      font-size: 16px;
      margin-bottom: 20px;
      justify-content: space-between;
    }
    &-desc {
      opacity: 0.6;
      font-size: 14px;
      text-align: justify;
      word-break: break-all;
    }
    .atta-nft-desc {
      margin-bottom: 10px; 
    }
  }
</style>