<template>
  <header-cell />
  <div></div>
  <footer-cell />
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import headerCell from "@/components/header/index.vue";
import footerCell from "@/components/footer/index.vue";

export default defineComponent({
  components: { headerCell,footerCell}
});
</script>


<style lang="scss">
@import "./index.scss";
</style>
