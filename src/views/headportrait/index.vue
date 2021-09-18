<template>
    <header-cell />
    <div class="headportraitbox">
        <div class="bannerbox">
            <div class="logobox flex">
                <button>{{$t('faces_1')}}</button>
                <button>{{$t('faces_2')}}</button>
            </div>
        </div>
        <div class="contentbox1 flex">
            <img src="/imgs/headportrait_imgs2.png" alt="">
            <div class="leftbox">
                <p class="titlewords">{{$t('faces_3')}}</p>
                <p class="tipswords">{{$t('faces_4')}}</p>
                <p class="content" v-html="$t('faces_5')"></p>
            </div>
        </div>
        <div class="contentbox1 flex">
            <div class="leftbox">
                <p class="titlewords">{{$t('faces_6')}}</p>
                <p class="tipswords">{{$t('faces_7')}}</p>
                <p class="content" v-html="$t('faces_8')"></p>
            </div>
            <img src="/imgs/headportrait_imgs4.png" alt="">
        </div>


        <div class="contentbox2 flex">
            <img src="/imgs/arrow1.png" alt="">
            <div class="wordsbox">
                <h1>{{$t('faces_9')}}</h1>
                <h3>{{$t('faces_10')}}</h3>
                <p v-html="$t('faces_11')"></p>
                <button>{{$t('faces_12')}}</button>
            </div>
        </div>
        <div class="contentbox3 flex">
            <div class="wordsbox">
                <h1>{{$t('faces_13')}}</h1>
                <h3>{{$t('faces_14')}}</h3>
                <p v-html="$t('faces_15')"></p>
            </div>
            <img src="/imgs/arrow1.png" alt="">
        </div>
        <div class="contentbox4 flex">
            <img src="/imgs/arrow1.png" alt="">
            <div class="wordsbox">
                <h1>{{$t('faces_16')}}</h1>
                <h3>{{$t('faces_17')}}</h3>
                <p v-html="$t('faces_18')"></p>
                <button>{{$t('faces_19')}}</button>
            </div>
        </div>
        <div class="contentbox5">
            <h1>{{$t('faces_20')}}</h1>
            <p>{{$t('faces_21')}}</p>
            <img src="/imgs/Charity_img1.png" alt="">
        </div>
        <div class="contentbox6">
            <h1>{{$t('faces_22')}}</h1>
            <div class="flex imgbox">
                <div class="leftbox">
                    <div>
                        <span>{{$t('faces_23')}}</span>
                        <img src="/imgs/arrow1.png" alt="">
                    </div>
                    <div>
                        <span>{{$t('faces_23')}}</span>
                        <img src="/imgs/arrow1.png" alt="">
                    </div>
                    <div>
                        <span>{{$t('faces_23')}}</span>
                        <img src="/imgs/arrow1.png" alt="">
                    </div>
                </div>
                <img class="centerbox" src="/imgs/arrow1.png" alt="">
                <div class="rightbox">
                    <div>
                        <img src="/imgs/arrow1.png" alt="">
                        <span>{{$t('faces_24')}}</span>
                    </div>
                    <div>
                        <img src="/imgs/arrow1.png" alt="">
                        <span>{{$t('faces_25')}}</span>
                    </div>
                    <div>
                        <img src="/imgs/arrow1.png" alt="">
                        <span>{{$t('faces_26')}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="contentbox7">
            <h1>Q&A</h1>
            <p class="wordsbox" v-html="$t('faces_29')"></p>
        </div>
    </div>
  <footer-cell />
  <mediaModal :content="contents" @closeNet="closeNet" v-if="modelBol"></mediaModal>
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
