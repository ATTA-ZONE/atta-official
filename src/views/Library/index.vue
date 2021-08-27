<template>
  <div>dd</div>
  <mediaModal></mediaModal>
</template>
<script lang='ts'>
import { defineComponent } from "vue";
import mediaModal from "@/components/modals/imgPreview.vue";
export default defineComponent({
  components: { mediaModal }
});
</script>
<style scoped lang='scss'>
@import "./index.scss"
</style>