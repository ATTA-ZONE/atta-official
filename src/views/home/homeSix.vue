<template>
  <div class="home-page-six" id="Service">
    <span class="han-son">
      NFT-related
      <br />
      <font style="color: rgb(168, 222, 238)">{{ $t("Services") }}</font>
    </span>
    <img class="mouse" src="@/assets/imgs/MouseLeft.png" />
    <p>
      {{
        $t(
          "If you are a content creator, celebrity, artist, or real-world trend label interested in"
        )
      }}
      <br />
      {{
        $t(
          "NFT, ATTA can provide you with a range of the most professional NFT services,which include:"
        )
      }}
    </p>
    <div class="ntf-services" v-if="isEn">
      <img src="@/assets/imgs/glossy01.png" />
      <img style="margin: 34px 5% 0" src="@/assets/imgs/glossy02.png" />
      <img src="@/assets/imgs/glossy03.png" />
    </div>
    <div class="ntf-services" v-if="isEn">
      <img style="margin-right: 5%" src="@/assets/imgs/glossy04.png" />
      <img src="@/assets/imgs/glossy05.png" />
    </div>
    <div class="ntf-services" v-if="!isEn">
      <img src="@/assets/imgs/ch5.png" />
      <img style="margin: 34px 5% 0" src="@/assets/imgs/ch6.png" />
      <img src="@/assets/imgs/ch7.png" />
    </div>
    <div class="ntf-services" v-if="!isEn">
      <img style="margin-right: 5%" src="@/assets/imgs/ch8.png" />
      <img src="@/assets/imgs/ch9.png" />
    </div>
  </div>
</template>
<script lang='ts'>
import { computed, defineComponent } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  setup() {
    const { locale } = useI18n();
    
    const isEn = computed(() => {
      return locale.value.trim() == "en";
    });

    return {
      isEn
    }
  }
});
</script>
<style scoped lang='scss'>
</style>