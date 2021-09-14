<template>
  <header-cell />
  <div class="router-view">
    <div class="tabs-wrap">
      <router-link class="assets-tab" v-for="(item, idx) in tabs" :key="idx" @click="toggleTab(idx)" :to="{path: item.link}">
        <span :class="{'active-text':selectedTab == idx}">{{$t(item.name)}}</span>
        <div v-if="selectedTab == idx" class="active-tab"></div>
      </router-link>
    </div>
  
    <router-view></router-view>
  </div>
  <footer-cell />
</template>
<script lang='ts'>
import { defineComponent, onMounted, ref } from "vue";
import headerCell from "@/components/header/index.vue";
import footerCell from "@/components/footer/index.vue";
export default defineComponent({
  components : {headerCell,footerCell},
  setup(){
    const tabs = [
      {
        name: 'KPL',
        link:'/esports/kpl'
      },
      {
        name: 'LPL',
        link:'/esports/lpl'
      }
    ]
    const selectedTab = ref(0)
    const toggleTab = (idx) => {
			selectedTab.value = idx
		}

    onMounted(()=>{
      const url = window.location.pathname
      if (url.indexOf('kpl')>-1) {
        selectedTab.value = 0
      }
      if (url.indexOf('lpl')>-1) {
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
    justify-content: space-around;
  }
  .assets-tab {
    color: #fff;
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
    min-height: calc(100vh - 490px);
  }
  .el-loading-mask {
    min-height: 300px;
    background-color: rgba(0, 0, 0, 1);
  }
</style>