<template>
  <div class="mask-item"></div>
  <div class="modal-container">
    <img @click="closeNet" class="close-btn" src="/imgs/close.png">
    <div class="modal-content" v-if="data.type == 'video'">
      <div class="modal-left">
        <video v-if="!data.mediaType" autoplay loop muted controls :src="data.url" height="100%"></video>
        <img v-else :src="data.url" alt="">
      </div>
      <div class="modal-right">
        <div class="modal-right-title">{{$t(data.title)}}</div>
        <div class="modal-info">
          <div v-if="data.content" :class="['modal-right-info',isEn ? 'justify' : '']" v-html="$t(data.content)"></div>
          <div class="modal-right-digtials">
            <div v-if="data.APtotal">{{$t('library_copywriting_AP')}}{{$t('library_copywriting_36')}}{{data.APtotal}}</div>
            <div v-if="data.APminted">{{$t('library_copywriting_AP')}}{{$t('library_copywriting_37')}}{{data.APminted}}</div>
            <div v-if="data.APBSC">{{$t('library_copywriting_AP')}}{{$t('library_copywriting_38')}}{{data.APBSC}}</div>
            <div v-if="data.APETH">{{$t('library_copywriting_AP')}}{{$t('library_copywriting_39')}}{{data.APETH}}</div>
            <div v-if="data.APnftnumber">{{$t('library_copywriting_AP')}}{{$t('nftnumber')}}{{data.APnftnumber}}</div>

            <div v-if="data.total">{{$t('library_copywriting_36')}}{{data.total}}</div>
            <div v-if="data.minted">{{$t('library_copywriting_37')}}{{data.minted}}</div>
            <div v-if="data.BSC">{{$t('library_copywriting_38')}}{{data.BSC}}</div>
            <div v-if="data.ETH">{{$t('library_copywriting_39')}}{{data.ETH}}</div>
            <div v-if="data.nftnumber">{{$t('nftnumber')}}{{data.nftnumber}}</div>
            <div v-if="data.APdesc && data.APdesc.length">{{$t('library_copywriting_40')}}{{data.APdesc[0]}}{{$t('library_copywriting_41')}}{{data.APdesc[1]}}{{$t('library_copywriting_42')}}{{data.APdesc[2]}}{{$t('library_copywriting_43AP')}}{{data.APdesc[3]}}{{$t('library_copywriting_44')}}{{data.APdesc[4]}}{{$t('library_copywriting_45')}}</div>

            <div v-if="data.desc && data.desc.length">{{$t('library_copywriting_40')}}{{data.desc[0]}}{{$t('library_copywriting_41')}}{{data.desc[1]}}{{$t('library_copywriting_42')}}{{data.desc[2]}}{{$t('library_copywriting_43')}}{{data.desc[3]}}{{$t('library_copywriting_44')}}{{data.desc[4]}}{{$t('library_copywriting_45')}}</div>
            <div v-if="data.descText && data.descText.length">{{$t('library_copywriting_40')}}{{data.descText}}</div>
            <div v-if="data.rarity && data.rarity.length > 0">{{$t('library_copywriting_86')}}{{data.rarity[0]}}</div>
            <div v-if="data.rarity && data.rarity.length > 0">{{$t('library_copywriting_87')}}{{data.rarity[1]}}</div>
            <div v-if="data.rarity && data.rarity.length > 0">{{$t('library_copywriting_88')}}{{data.rarity[2]}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-banner" v-else>
      <img :src="data.url" >
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent, computed } from "vue";
import { useI18n } from "vue-i18n";
export default defineComponent({
  name: "modal",
  props: {
    content:Object
  },
  setup(props, context) {
    // url://大图
    // title://标题
    // content://详情文案
    // type:!index?'video':index==1?'video':'img',
    // total:0,//总版数
    // minted:0,//已经铸造数量
    // ETH:0,
    // BSC:0,
    // desc:['01','30','50'],//编号及说明
    const { locale, t } = useI18n();
    const isEn = computed(() => {
      return locale.value.trim() == "en";
    });
    const data:any = props.content

    const closeNet = () => {
      context.emit('closeNet')
    }
    return {
      data,
      isEn,
      closeNet
    }
  }
});
</script>
<style scoped lang='scss'>
  @media screen and (max-width: 992px) {
    .modal-container {
      width: 76% !important;
      height: auto !important;
      padding: 20px !important;
      .close-btn {
        right: 0 !important;
        top: 0 !important;
        width: 24px !important;
      }
      .modal-content {
        display: block !important;
        .modal-left, .modal-right {
          width: 100% !important;
        }
        .modal-left {
          height: 300px !important;
        }
         .modal-right {
           padding: 20px !important;
           &-title {
            font-size: 16px !important;
            margin-bottom:10px;
          }
          &-info {
            font-size: 12px !important;
            margin-bottom:10px;
          }
          &-digtials {
            font-size: 12px !important;
            position: relative !important;
            bottom: 0 !important;
          }
         }
      }
    }
  }
  .justify {
    text-align: justify;
  }
  .mask-item {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.8);
    z-index: 101;
  }
  .modal-container {
    background: #323232;
    width: 900px;
    height: 500px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    z-index: 102;
    overflow-y: auto;
    .close-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 30px;
      z-index: 103;
	cursor: pointer;
    }
    .modal-content {
      width: 100%;
      height: 100%;
      display: flex;
      .modal-left {
        width: 60%;
        height: 100%;
        overflow: hidden;
        position: relative;
        background-color: #000;
        img {
          width: auto;
          height: 100%;
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
        }
        video {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          width: 100%;
          height: 100%;
        }
      }
      .modal-right {
        width: 40%;
        height: 100%;
        padding: 30px;
        overflow: hidden;
        position: relative;
        box-sizing: border-box;
        text-align: left;
        background-color: #6b6b6b;
        ::-webkit-scrollbar {
          width:2px;
          height:4px;
          background-color: #fff;
        }
        &-title {
          font-size: 22px;
          margin-bottom:10px;
          font-weight: 400;
        }
        &-info {
          font-size: 16px;
          font-weight: 300;
          padding-right: 6px;
        }
        &-digtials {
          margin-top: 30px;
          font-size: 16px;
          font-weight: 300;
        }
        .modal-info{
          max-height: 400px;
          overflow-y: auto;
        }
      }
    }
    .modal-banner {
      width: 100%;
      height: 100%;
      img {
        width:auto;
        height: 100%;
      }
    }
  }
</style>