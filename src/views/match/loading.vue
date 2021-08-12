<template>
  <header-cell />
  <div class="match-load flex">
    <p>{{$t('load_text01')}}<br>{{$t('load_text02')}}</p>
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
</style>
