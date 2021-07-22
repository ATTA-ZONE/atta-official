<template>
  <div class="downbox">
    <div class="titlebox">
        <img class="logo" src="/imgs/logo.png" alt="">
        <img class="head-menu" src="/imgs/menu.png"/>
    </div>
    <div class="attalogo">
      <img src="/imgs/attalogo.png" alt="">
    </div>
    <p class="word">文案文案文案文案文案文案文案</p>
    <div class="btnimg titlebox">
      <a href=""><img src="/imgs/apple.png" alt=""></a>
      <a href=""><img src="/imgs/anzhuo.png" alt=""></a>
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent, onMounted, ref ,computed} from "vue";
import { useI18n } from "vue-i18n";
export default defineComponent({
  setup() {
    const { locale } = useI18n();

    const isEn = computed(() => {
      return locale.value.trim() == "en";
    });


    return {
      isEn,
    };
  },
});
</script>
<style lang='scss'>
.downbox{
  height: 100vh;
  padding: 32px 23px 110px 29px;
  text-align: center;
  // box-sizing: border-box;
    .titlebox{
      display: flex;
      justify-content: space-between;
      .logo{
        height: 34px;
      }
      .head-menu{
        width: 32px;
      }
    }
    .attalogo{
      margin: auto;
      margin-top: 78px;
      width: 130px;
      img{
        width: 100%;
      }
    }
    .word{
      margin-top: 149px;
      font-size: 15px;
      color: rgba(255, 255, 255, 0.8);
    }
    .btnimg{
      margin-top: 115px;

    }
}
</style>