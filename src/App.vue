<template>
  <header-cell />
  <router-view></router-view>
  <footer-cell />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import headerCell from "@/components/header/index.vue";
import footerCell from "@/components/footer/index.vue";

export default defineComponent({
  components: { headerCell, footerCell }
});
</script>