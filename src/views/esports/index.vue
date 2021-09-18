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
        name: '无限制电竞大会',
        link:'/esports/infinity'
      },
      {
        name: 'LPL季后赛',
        link:'/esports/lol'
      }
    ]
    const selectedTab = ref(0)
    const toggleTab = (idx) => {
			selectedTab.value = idx
		}

    onMounted(()=>{
      const url = window.location.pathname
      if (url.indexOf('infinity')>-1) {
        selectedTab.value = 0
      }
      if (url.indexOf('lol')>-1) {
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
<style lang='scss' scoped>
@media only screen and (max-width: 992px) {
  div.tabs-wrap {
    width: 181px;
    font-size: 12px;
    height:25px;
    top: 30px;
    left: 50%;
    margin-left: -90px;
    z-index: 1;
    a{
      height:25px;
      span{
        font-size: 14px;
        line-height: 25px;
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
}
.active-text {
  display: inline-block;
  font-weight: bold;
  line-height: 34px;
}
.router-view {
  width: 100%;
  min-height: calc(100vh - 490px);
}
.el-loading-mask {
  min-height: 300px;
  background-color: rgba(0, 0, 0, 1);
}
</style>