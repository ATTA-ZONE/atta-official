<template>
  <div class="content-cell">
    <div class="content-cell-head">
      <span>{{props.title}}</span>
      <span>更多信息 {{props.btn}}</span>
    </div>
    <div class="content-cell-desc">
      {{props.desc}}
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    title: String,
    desc: String,
    btn: String
  },
  setup(props){
    return {props}
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
    }
  }
</style>