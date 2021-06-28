<template>
  <div class="tabs-wrap">
    <router-link class="assets-tab" v-for="(item, idx) in tabs" :key="idx" @click="toggleTab(idx)" :to="{path: item.link}">
      <span :class="{'active-text':selectedTab == idx}">{{$t(item.name)}}</span>
      <div v-if="selectedTab == idx" class="active-tab"></div>
    </router-link>
  </div>
  <div class="router-view">
    <router-view></router-view>
  </div>
</template>
<script lang='ts'>
import { defineComponent, onMounted, ref } from "vue";
export default defineComponent({
  setup(){
    const tabs = [
      {
        name: 'My NFT',
        link:'/assets/mynft'
      },
      {
        name: 'NFT Logs',
        link:'/assets/history'
      }
    ]
    const selectedTab = ref(0)
    const toggleTab = (idx) => {
			selectedTab.value = idx
		}

    onMounted(()=>{
      const url = window.location.pathname
      if (url.indexOf('mynft')>-1) {
        selectedTab.value = 0
      }
      if (url.indexOf('history')>-1) {
        selectedTab.value = 1
      }
    })
    return {
      tabs,
      selectedTab,
      toggleTab
    }
  }
});
</script>
<style lang='scss'>
@media only screen and (max-width: 992px) {
  .tabs-wrap {
    font-size: 14px;
    
  }
}
  .tabs-wrap {
    display: flex;
    padding: 0 10%;
    margin-bottom: 30px;
  }
  .assets-tab {
    color: #fff;
    margin-right:100px;
  }
  .active-text {
    display: inline-block;
    margin-bottom: 10px;
    font-weight: bold;
  }
  .active-tab {
    width: 90%;
    height: 1px;
    margin: auto;
    background: #A8DEEE;
  }
  .router-view {
    padding: 0 10%;
  }
</style>