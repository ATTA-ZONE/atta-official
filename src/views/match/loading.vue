<template>
  <header-cell />
  <div class="match-load flex">
    <p class="hanson">{{$t('load_text01')}}<br>{{$t('load_text02')}}</p>
  </div>
  <footer-cell />
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted,watch } from "vue";
import headerCell from "@/components/header/index.vue";
import footerCell from "@/components/footer/index.vue";

export default defineComponent({
  components: { headerCell,footerCell}
});
</script>


<style lang="scss">
.match-load{
  text-align: center;
  width: 100vw;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 552px);
  p{ 
    text-align: center;
    font-size:48px;
    line-height: 80px;
    font-weight:bold;
  }
}
</style>
