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
  .router-view {
    padding: 10px 20px;
  }
  div.tabs-wrap {
    width: 100%;
    font-size: 12px;
    line-height:34px;
    top: 40px !important;
    left: 0;
    z-index: 1;
    a{
      height:14px;
      span{
        font-size: 14px;
        line-height: 100%;
      }
    }
  }
}
.tabs-wrap {
  display: flex;
  justify-content: space-around;
  z-index: 100;
  position: absolute;
  top: 110px;
  left: 350px;
  width: 280px;
  height:34px;
  background: rgba(255, 255, 255, 0.1);
}
.tabs-wrap a{
  text-decoration:none;
}
.assets-tab {
  color: #fff;
}
.assets-tab span{
  line-height: 34px;
  font-size:18px;
  font-weight: 500;
}
.active-text {
  display: inline-block;
  color: #a8deee;
}
.router-view {
  max-width: 1400px;
  margin: 40px auto;
  min-height: calc(100vh - 490px);
}
  .el-loading-mask {
    min-height: 300px;
    background-color: rgba(0, 0, 0, 1);
  }
</style>