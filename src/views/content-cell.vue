<template>
  <div class="content-cell">
    <div class="content-cell-head">
      <span>{{props.title}}</span>
      <span @click="toggleDesc(props.title)">更多信息 {{props.btn}}</span>
    </div>
    <div class="content-cell-desc" v-if="props.showDesc == props.title">
      {{props.desc}}
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
<style scoped lang='scss'>
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
  }
</style>