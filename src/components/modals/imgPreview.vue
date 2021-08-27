<template>
  <div class="modal-container">
    <img @click="closeNet" class="close-btn" src="/imgs/close.png">
    <div class="modal-content" v-if="data.title">
      <div class="modal-left">
        <video autoplay loop muted controls src="https://www.bazhuayu.io/upload/other/gs.mp4" height="100%"></video>
      </div>
      <div class="modal-right">
        <div class="modal-right-title">{{$t(data.title)}}</div>
        <div class="modal-right-info" v-html="$t(data.content)"></div>
        <div class="modal-right-digtials">
          <div>{{$t('library_copywriting_36')}}{{data.total}}</div>
          <div>{{$t('library_copywriting_37')}}{{data.minted}}</div>
          <div>{{$t('library_copywriting_38')}}{{data.BSC}}</div>
          <div>{{$t('library_copywriting_39')}}{{data.ETH}}</div>
          <div>{{$t('library_copywriting_40')}}{{data.desc[0]}}{{$t('library_copywriting_41')}}{{data.desc[1]}}{{$t('library_copywriting_42')}}{{data.desc[2]}}{{$t('library_copywriting_43')}}{{data.desc[3]}}{{$t('library_copywriting_44')}}{{data.desc[4]}}{{$t('library_copywriting_45')}}</div>
          <div>{{$t('library_copywriting_86')}}</div>
          <div>{{$t('library_copywriting_87')}}</div>
          <div>{{$t('library_copywriting_88')}}</div>
        </div>
      </div>
    </div>
    <div class="modal-banner" v-else>
      <img src="https://www.bazhuayu.io/upload/v2data/2021-05-02/fcaf13bc-46ed-4bb6-9284-db5985b05a87.png" >
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent } from "vue";
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
    const data:any = props.content
    console.log(data, props);

    const closeNet = () => {
      context.emit('closeNet')
    }
    return {
      data,
      closeNet
    }
  }
});
</script>
<style scoped lang='scss'>
  @media screen and (max-width: 992px) {
    .modal-container {
      width: 70% !important;
      height: 240px !important;
      padding: 30px !important;
      .close-btn {
        width: 24px !important;
      }
      .title {
        font-size: 16px !important;
      }
      .content, .title {
        padding-bottom: 16px !important;
      }
      .content {
        font-size: 14px !important;
        margin-top: 24px !important;
        margin-bottom: 24px !important;
      }
    }
  }
  .modal-container {
    background: #323232;
    width: 900px;
    height: 600px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 30px 90px;
    text-align: center;
    .close-btn {
      position: absolute;
      top: 15px;
      right: 15px;
      width: 36px;
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
        img, video {
          width: auto;
          height: 100%;
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
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
        &-title {
          font-size: 22px;
          margin-bottom:10px;
          font-weight: 400;
        }
        &-info {
          font-size: 16px;
          font-weight: 300;
        }
        &-digtials {
          position: absolute;
          bottom: 0;
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