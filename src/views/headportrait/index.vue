<template>
    <header-cell />
    <div class="headportraitbox">
        <div class="bannerbox">
            <div class="logobox flex">
                <a href="https://www.bazhuayu.io/mobile/tc/specialitem.html" target="_blank">{{$t('faces_2')}}</a>
                <a href="/esports/infinity#kplRules" target="_blank">{{$t('faces_1')}}</a>
            </div>
        </div>
        <div class="contentbox1 flex">
            <div class="leftbox leftbox-media">
                <p class="titlewords">{{$t('faces_3')}}</p>
                <p class="tipswords">{{$t('faces_4')}}</p>
            </div>
            <img src="/imgs/headportrait_imgs2.png" alt="">
            <div class="leftbox leftbox-pc">
                <p class="titlewords">{{$t('faces_3')}}</p>
                <p class="tipswords">{{$t('faces_4')}}</p>
                <p class="content" v-html="$t('faces_5')"></p>
            </div>
        </div>
        <div class="contentbox1 flex">
            <div class="leftbox leftbox-media">
                <p class="titlewords">{{$t('faces_6')}}</p>
                <p class="tipswords">{{$t('faces_7')}}</p>
                <p class="content" v-html="$t('faces_8')"></p>
            </div>
            <img src="/imgs/headportrait_imgs4.png" alt="">
            <div class="leftbox leftbox-pc">
                <p class="titlewords">{{$t('faces_6')}}</p>
                <p class="tipswords">{{$t('faces_7')}}</p>
                <p class="content" v-html="$t('faces_8')"></p>
            </div>
        </div>
        <div id="kplRules" class="contentbox1 flex">
            <div class="leftbox leftbox-media">
                <p class="titlewords" style="margin-bottom:20px;">{{$t('faces_9')}}</p>
                <p class="content" v-html="$t('faces_11')"></p>
            </div>
            <img src="/imgs/headportrait_imgs5.png" alt="">
            <div class="leftbox leftbox-pc">
                <p class="titlewords" style="margin-bottom:20px;">{{$t('faces_9')}}</p>
                <p class="content" v-html="$t('faces_11')"></p>
            </div>
        </div>
        <div class="contentbox5">
            <h1>{{$t('faces_12')}}</h1>
            <p v-html="$t('faces_13')"></p>
            <img src="/imgs/headportrait_imgs6.png" alt="">
        </div>
        <div class="contentbox6">
            <h1>{{$t('faces_14')}}</h1>
            <div class="imgbox">
                <div class="leftbox flex">
                    <div>
                        <img src="/imgs/headportrait_imgs7.png" alt="">
                        <p class="title">{{$t('faces_15')}}</p>
                        <p class="content">{{$t('faces_16')}}</p>
                    </div>
                    <div>
                        <img src="/imgs/headportrait_imgs8.png" alt="">
                        <p class="title">{{$t('faces_17')}}</p>
                        <p class="content">{{$t('faces_18')}}</p>
                    </div>
                </div>
                <div class="rightbox flex">
                    <div>
                        <img src="/imgs/headportrait_imgs9.png" alt="">
                        <p class="title">{{$t('faces_19')}}</p>
                        <p class="content">{{$t('faces_20')}}</p>
                    </div>
                    <div>
                        <img src="/imgs/headportrait_imgs10.png" alt="">
                        <p class="title">{{$t('faces_21')}}</p>
                        <p class="content">{{$t('faces_22')}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="contentbox1 contentbox6_jian flex">
            <div class="leftbox leftbox-media">
                <p class="titlewords">{{$t('faces_23')}}</p>
            </div>
            <img src="/imgs/headportrait_imgs11.png" alt="">
            <div class="leftbox leftbox-pc">
                <p class="titlewords">{{$t('faces_23')}}</p>
                <p class="content" v-html="$t('faces_24')"></p>
                <a href="/esports/infinity#kplRules" class="btn" target="_blank">{{$t('faces_26')}}</a>
                <a href="https://www.bazhuayu.io/mobile/tc/specialitem.html" target="_blank" class="btn">{{$t('faces_25')}}</a>
            </div>
        </div>
        <div class="contentbox7">
            <h1>Q&A</h1>
            <p class="wordsbox" v-html="$t('faces_27')"></p>
        </div>
    </div>
  <footer-cell />
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import headerCell from "@/components/header/index.vue";
import footerCell from "@/components/footer/index.vue";

export default defineComponent({
  components: { headerCell,footerCell},
  data() {
      return {};
  },
  setup() {
    const { locale } = useI18n();
    const num = ref(1);
    
    const isEn = computed(() => {
      return locale.value.trim() == "en";
    });
    onMounted(() => {
    });
    const addnum = () => {
        num.value = num.value + 1;
    };
    const subtractnum = computed(() => {
        if (num.value > 0) {
            num.value = num.value - 1;
        }
    });
    
    return {
        addnum,
        subtractnum,
        isEn,
        num
    };
  },
});
</script>


<style lang="scss">
@import "./index.scss";
</style>
