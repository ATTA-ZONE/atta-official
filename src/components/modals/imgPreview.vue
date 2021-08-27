<template>
  <div class="modal-container">
    <img @click="closeNet" class="close-btn" src="/imgs/close.png">
    <div v-if="!data.desc">
      <div class="modal-left">
        <img v-if="data.type =='img'" src="https://www.bazhuayu.io/upload/v2data/2021-05-02/fcaf13bc-46ed-4bb6-9284-db5985b05a87.png" />
        <video v-if="data.type == 'video'" src="data.url" height="100%"></video>
      </div>
      <div class="modal-right">
        <div class="modal-right-title">{{data.desc.title}}</div>
        <div class="modal-right-info">{{data.desc.info}}</div>
        <div class="modal-right-digtials">
          <div></div>
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
    url: String,
    type: String,
    desc: Object
  },
  setup(props, context) {
    const data:any = {
      url: props.url,
      type: props.type,
      desc: props.desc
    }

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
    position: absolute;
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
    .modal-banner {
      width: 100%;
      height: 100%;
      img {
        width:auto;
        height: 100%;
      }
    }
    .title {
      font-size: 30px;
    }
    .content, .title {
      padding-bottom: 30px;
      border-bottom: 1px solid rgba($color:#fff, $alpha: 0.2);
    }
    .content {
      opacity: 0.7;
      font-size: 24px;
      margin-top: 32px;
      margin-bottom: 32px;
    }
  }
</style>