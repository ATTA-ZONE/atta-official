<template>
  <div class="tabs-wrap">
    <div v-for="(item, idx) in tabs" :key="idx" @click="toggleTab(idx)">
      <span>{{item}}</span>
      <div v-if="selectedTab == idx" class="active-tab"></div>
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup(){
    const tabs = ['我的藏品','我的NFT','NFT操作記錄']
    const selectedTab = ref(0)
    const toggleTab = (idx) => {
			selectedTab.value = idx
		}
    return {
      tabs,
      selectedTab,
      toggleTab
    }
  }
});
</script>
<style scoped lang='scss'>
</style>