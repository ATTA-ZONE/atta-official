<template>
  <div class="downbox">
    <div class="titlebox">
        <img class="logo" src="/imgs/logo.png" alt="">
        <img class="head-menu" src="/imgs/menu.png"/>
    </div>
    <div class="attalogo">
      <img src="/imgs/attalogo.png" alt="">
    </div>
    <p class="word">{{$t('downCopywriting')}}</p>
    <div class="btnimg titlebox">
      <a href="https://apps.apple.com/cn/app/id1558403908"><img :src="isEn ? '/imgs/apple_en.png' : '/imgs/apple_ch.png'" alt=""></a>
      <a href="https://www.bazhuayu.io/upload/ATTA.apk" download="https://www.bazhuayu.io/upload/ATTA.apk"><img :src="isEn ? '/imgs/anzhuo_en.png' : '/imgs/anzhuo_ch.png'" alt=""></a>
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
body{
  background-image: url('/imgs/bgdown.png');
  background-size: 100% 100%;
}
.downbox{
  height: 100vh;
  padding: 32px 23px 110px 29px;
  text-align: center;
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
      margin-top: 20.8vw;
      width: 130px;
      img{
        width: 100%;
      }
    }
    .word{
      margin-top: 35vw;
      font-size: 15px;
      color: rgba(255, 255, 255, 0.8);
      text-align: left;
      padding: 0 12px;
      line-height: 21px;
    }
    .btnimg{
      margin-top: 80px;
      padding: 0 5px;
      a{
        display: inline-block;
        width: 43.61%;
        img{
          width: 100%;
        }
      }
    }
}
</style>