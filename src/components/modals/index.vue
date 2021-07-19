<template>
  <div class="modal-container">
    <img @click="closeNet" class="close-btn" src="/imgs/close.png">
    <div class="title">{{data.title}}</div>
    <div class="content">{{data.content}}</div>
    <slot></slot>
  </div>
</template>
<script lang='ts'>
import { defineComponent } from "vue";
export default defineComponent({
  name: "modal",
  props: {
    title: String,
    content: String
  },
  setup(props, context) {
    const data:any = {
      title: props.title,
      content: props.content
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
    width: 610px;
    height: 330px;
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