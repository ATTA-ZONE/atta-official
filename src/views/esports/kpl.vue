<template>
  <div class="banner-container">
    <div class="banner-info">
      <img src="/imgs/alt.jpg" />
      <div>2021nain9yue24ri - 31ri</div>
      <div>
        <span>参与投票</span>
        <span>观看直播</span>
      </div>
      <div>当前对战双方： TEAM1 VS TEAM2</div>
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent } from "vue";
export default defineComponent({
  name: "home",
  props: {
    msg: String,
  },
});
</script>
<style scoped lang='scss'>
@import "./kpl.scss";
</style>