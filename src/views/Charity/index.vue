<template>
  <header-cell />
  <div class="charitybox">
      <div class="titlebox">
          <h1 class="Fzlt_Thb">{{$t('charity_tit')}} | {{$t('charity_tit2')}}</h1>
          <p>{{$t('charity_content')}}</p>
          <div class="btnbox">
              <span>{{$t('charity_btnlable')}}</span>
              <button @click="jumppage()">{{$t('charity_btnname')}}</button>
          </div>
      </div>
      <div class="contentbox">
        <div class="ssrseriesbox">
            <div class="title flex">
                <span class="Fzlt_Thb" @click="showssrbool = !showssrbool">{{$t('charity_ssr_tit')}}</span>
                <span class="tips" @click="showssrbool = !showssrbool">{{$t('Click to expand')}}</span>
                <img style="margin-left:41px" :src="showssrbool ? '/imgs/arrow1.png' : '/imgs/arrow2.png'" alt="" @click="showssrbool = !showssrbool">
            </div>
            <div class="imgscontentbox flexbetween">
                <div class="imgsevery series1">
                    <el-carousel indicator-position="none" arrow="never" :height="winW+'px'">
                        <el-carousel-item v-for="item in lbimgs[0]" :key="item">
                            <img :src="item" alt="">
                        </el-carousel-item>
                    </el-carousel>
                    <p>{{$t('charity_ssr_content1')}}</p>
                </div>
                <div class="imgsevery series2">
                    <el-carousel indicator-position="none" arrow="never" :height="(winW02>0?winW02:winW)+'px'">
                        <el-carousel-item v-for="item in lbimgs[1]" :key="item">
                            <img :src="item" alt="">
                        </el-carousel-item>
                    </el-carousel>
                    <p>{{$t('charity_ssr_content2')}}</p>
                </div>
            </div>
        </div>
        <div class="rseriesbox" v-if="!showssrbool">
            <div class="title flexbetween">
                <span class="Fzlt_Thb">{{$t('charity_r_tit')}}</span>
            </div>
            <div class="imgscontentbox flexbetween">
                <div class="imgsevery series3">
                    <el-carousel indicator-position="none" arrow="never"  :height="(winW03>0?winW03:winW)+'px'">
                        <el-carousel-item v-for="item in lbimgs[2]" :key="item">
                            <img :src="item" alt="">
                        </el-carousel-item>
                    </el-carousel>
                    <p>{{$t('charity_r_content1')}}</p>
                </div>
                <div class="imgsevery series4">
                    <el-carousel indicator-position="none" arrow="never" :height="(winW04>0?winW04:winW)+'px'">
                        <el-carousel-item v-for="item in lbimgs[3]" :key="item">
                            <img :src="item" alt="">
                        </el-carousel-item>
                    </el-carousel>
                    <p>{{$t('charity_r_content2')}}</p>
                </div>
                <div class="imgsevery series5">
                    <el-carousel indicator-position="none" arrow="never" :height="winW01+'px'">
                        <el-carousel-item v-for="item in lbimgs[4]" :key="item">
                            <img :src="item" alt="">
                        </el-carousel-item>
                    </el-carousel>
                    <p>{{$t('charity_r_content3')}}</p>
                </div>
            </div>
        </div>
        <div class="nseriesbox" v-if="!showssrbool">
            <div class="title flexbetween">
                <span class="Fzlt_Thb">{{$t('charity_n_tit')}}</span>
            </div>
            <div class="imgscontentbox flexbetween">
                <div class="imgsevery series6">
                    <el-carousel indicator-position="none" arrow="never" :height="(winW05>0?winW05:winW)+'px'">
                        <el-carousel-item v-for="item in lbimgs[5]" :key="item">
                            <img :src="item" alt="">
                        </el-carousel-item>
                    </el-carousel>
                    <p>{{$t('charity_n_content1')}}</p>
                </div>
                <div class="imgsevery series7">
                    <el-carousel indicator-position="none" arrow="never" :height="(winW06>0?winW06:winW)+'px'">
                        <el-carousel-item v-for="item in lbimgs[6]" :key="item">
                            <img :src="item" alt="">
                        </el-carousel-item>
                    </el-carousel>
                    <p>{{$t('charity_n_content2')}}</p>
                </div>
                <div class="imgsevery series8">
                    <el-carousel indicator-position="none" arrow="never" :height="winW+'px'">
                        <el-carousel-item v-for="item in lbimgs[7]" :key="item">
                            <img :src="item" alt="">
                        </el-carousel-item>
                    </el-carousel>
                    <p>{{$t('charity_n_content3')}}</p>
                </div>
                <div class="imgsevery series9">
                    <el-carousel indicator-position="none" arrow="never" :height="winW+'px'">
                        <el-carousel-item v-for="item in lbimgs[8]" :key="item">
                            <img :src="item" alt="">
                        </el-carousel-item>
                    </el-carousel>
                    <p>{{$t('charity_n_content4')}}</p>
                </div>
                <div class="imgsevery series10">
                    <el-carousel indicator-position="none" arrow="never" :height="winW+'px'">
                        <el-carousel-item v-for="item in lbimgs[13]" :key="item">
                            <img :src="item" alt="">
                        </el-carousel-item>
                    </el-carousel>
                    <p>{{$t('charity_n_content4_2')}}</p>
                </div>
                <div class="imgsevery series11">
                    <el-carousel indicator-position="none" arrow="never" :height="(winW07>0?winW07:winW)+'px'">
                        <el-carousel-item v-for="item in lbimgs[10]" :key="item">
                            <img :src="item" alt="">
                        </el-carousel-item>
                    </el-carousel>
                    <p>{{$t('charity_n_content6')}}</p>
                </div>
                <div class="imgsevery series12">
                    <el-carousel indicator-position="none" arrow="never" :height="(winW06>0?winW06:winW)+'px'">
                        <el-carousel-item v-for="item in lbimgs[11]" :key="item">
                            <img :src="item" alt="">
                        </el-carousel-item>
                    </el-carousel>
                    <p>{{$t('charity_n_content7')}}</p>
                </div>
            </div>
        </div>
        <div class="nseriesbox" v-if="!showssrbool">
            <div class="imgscontentbox flex">
                <div class="imgsevery series13" style="margin-right:31.46px">
                    <el-carousel indicator-position="none" arrow="never" :height="winW+'px'">
                        <el-carousel-item v-for="item in lbimgs[12]" :key="item">
                            <img :src="item" alt="">
                        </el-carousel-item>
                    </el-carousel>
                    <p>{{$t('charity_n_content8')}}</p>
                </div>
                <div class="imgsevery series10">
                    <el-carousel indicator-position="none" arrow="never" :height="winW+'px'">
                        <el-carousel-item v-for="item in lbimgs[9]" :key="item">
                            <img :src="item" alt="">
                        </el-carousel-item>
                    </el-carousel>
                    <p>{{$t('charity_n_content5')}}</p>
                </div>
            </div>
        </div>
        <button @click="showssrbool = !showssrbool" class="webh5_foldbtn">
            {{ showssrbool ? $t('charity_open') : $t('charity_retract')}}
            <img :src="!showssrbool ? '/imgs/arrow3.png' : '/imgs/arrow4.png'" alt="">
        </button>
        <div class="nftseriesbox">
            <div class="title flex">
                <span class="Fzlt_Thb" @click="showssrbool2 = !showssrbool2">{{$t('charity_nft_tit')}}</span>
                <span class="tips" @click="showssrbool2 = !showssrbool2">{{$t('Click to expand')}}</span>
                <img style="margin-left:41px" :src="showssrbool2 ? '/imgs/arrow1.png' : '/imgs/arrow2.png'" alt="" @click="showssrbool2 = !showssrbool2">
            </div>
            <div class="rule">
                <p class="rule_title">{{$t("rule_title")}}</p>
                <p class="rule_title">{{$t("rule_tip1")}} nft@atta.zone</p>
                <p class="rule_title">{{$t("rule_tip2")}}</p>
                <p class="rule_title">{{$t("rule_tip3")}}</p>
                <p class="rule_title">{{$t("rule_tip4")}}</p>
                <p class="rule_title">{{$t("rule_tip5")}}</p>
            </div>
            <div class="nftimgsbox imgscontentbox">
                <div v-for="(item,index) in nftlist" :key="index" class="nftimgevery series14 flexbetween">
                    <video autoplay loop
                        :src="item.url"
                        v-if="item.url.indexOf('mp4') != -1"
                        muted
                    ></video>
                    <img v-else :src="item.url" alt="">
                    <div class="wordsbox">
                        <h1>{{isEn ? item.titleen : item.titlech}}</h1>
                        <p>{{isEn ? item.contenten : item.contentch}}</p>
                    </div>
                </div>
                <div v-for="(item,index) in nftlist2" :key="index" class="nftimgevery series14 flexbetween" v-if="!showssrbool2">
                    <img :src="item.url" alt="">
                    <div class="wordsbox">
                        <h1>{{isEn ? item.titleen : item.titlech}}</h1>
                        <p>{{isEn ? item.contenten : item.contentch}}</p>
                    </div>
                </div>
            </div>
        </div>
        <button @click="showssrbool2 = !showssrbool2" class="webh5_foldbtn">
            {{ showssrbool2 ? $t('charity_open') : $t('charity_retract')}}
            <img :src="!showssrbool2 ? '/imgs/arrow3.png' : '/imgs/arrow4.png'" alt="">
        </button>
      </div>
  </div>
  <footer-cell />
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import headerCell from "@/components/header/index.vue";
import footerCell from "@/components/footer/index.vue";
import { ElCarousel, ElCarouselItem } from 'element-plus';
// import 'element-plus/packages/theme-chalk/src/base.scss'

export default defineComponent({
  components: { headerCell,footerCell,ElCarousel,ElCarouselItem},
  data() {
      return {
          nftlist:[
                {
                  titleen : '"ATTA X Smile Angel" donation certificate NFT',
                  contenten : 'All Mystery Box purchasers: will receive a special “ATTA X Smile Angel” donation certificate NFT',
                  titlech : '嫣然慈善愛心捐贈NFT紀念證書',
                  contentch : '盲盒首次發行期間購買的用戶，都可以獲贈嫣然慈善愛心捐贈NFT紀念證書一份',
                  url:'/imgs/series14.png',
                },
                {
                  titleen : '"ATTA X Smile Angel" Special Angel NFT',
                  contenten : 'Collect all SSR+R NFTs: win one “ATTA X Smile Angel” Special Angel NFT, with which you can go to www.atta.zone to redeem VIP tickets for three “Smile Angel Special Concerts” ',
                  titlech : 'ATTA X 嫣然天使NFT',
                  contentch : '集齊所有SSR+R類NFT的用戶可以獲贈“ATTA X嫣然天使NFT”一枚，憑天使NFT可前往兌換今年三場“嫣然愛音樂”演唱會VIP門票，演出嘉賓包括痛仰樂團，木馬樂隊等。演出詳情和參加辦法請關注ATTA官網。',
                  url:'/series20.mp4',
                }
          ],
          nftlist2:[
                {
                  titleen : 'large-size signature version of digital inkjet',
                  contenten : 'Collect 2 different SSR NFTs: win one large-size signature version of digital inkjet created by young artists',
                  titlech : '藝術家聯名創作的大尺寸簽名版數字噴繪',
                  contentch : '集齊兩種SSR類NFT：獲贈本次藝術家聯名創作的大尺寸簽名版數字噴繪',
                  url:'/imgs/series21.png',
                },
                {
                  titleen : 'limited-edition "Sui Bian" T-shirt + one "Sui Bian" digital inkjet',
                  contenten : 'Collect “Sui Bian” SSR NFT: win one limited-edition “Sui Bian” T-shirt + one “Sui Bian” digital inkjet',
                  titlech : '限量版“隨便”T恤 +隨便噴繪',
                  contentch : '收集“隨便”SSR NFT：獲贈實物限量版“隨便“T恤 +隨便噴繪一幅',
                  url:'/imgs/series17.png',
                },
                {
                  titleen : 'limited-edition "Snow Kid" T-shirt + any R NFT digital inkjet',
                  contenten : 'Collect all R NFTs: win a limited-edition “Snow Kid” T-shirt + any R NFT digital inkjet',
                  titlech : '限量版“雪孩子“T恤+ 指定R類噴繪”',
                  contentch : '集齊所有R類NFT：獲贈實物限量版“雪孩子“T恤+ 指定R類噴繪一幅',
                  url:'/imgs/series18.png',
                },
                {
                  titleen : 'hardcopy of any NFT included in the box',
                  contenten : 'Collect any R and 4 different N items: win one hardcopy of any NFT included in the box',
                  titlech : '指定NFT的打印版',
                  contentch : '集齊任意一種R+4種N類NFT：獲贈指定NFT的打印版一張',
                  url:'/imgs/series22.png',
                },
                {
                  titleen : 'illustrator-designed canvas bag',
                  contenten : 'Collect 5 different N items: win one illustrator-designed canvas bag',
                  titlech : '潮流插畫師帆布包',
                  contentch : '集齊5種N類NFT：獲贈潮流插畫師帆布包一件',
                  url:'/imgs/series19.png',
                },
                {
                  titleen : '"Xi Diao" Tibetan Incense by Smile Angel',
                  contenten : 'Collect 4 different N items: win one “Xi Diao” Tibetan Incense by Smile Angel',
                  titlech : '嫣然典藏“喜調”藏香',
                  contentch : '集齊4種N類NFT：獲贈嫣然典藏”喜調”藏香一份',
                  url:'/imgs/series15.png',
                },
                {
                  titleen : '"Xiao Te" Smile Angel 15-year Anniversary Bag',
                  contenten : 'Collect 3 different N items: win one “Xiao Te” Smile Angel 15-year Anniversary Bag',
                  titlech : '嫣然十五周年“小特”環保包',
                  contentch : '集齊3種N類NFT：獲贈嫣然十五周年“小特“環保包',
                  url:'/imgs/series16.png',
                },
          ],
          lbimgs : [
              ['/imgs/series1.png','/imgs/series1_LB.png'],
              ['/imgs/series2.png','/imgs/series2_LB.png'],
              ['/imgs/series3.png','/imgs/series3_LB.png'],
              ['/imgs/series4.png','/imgs/series4_LB.png'],
              ['/imgs/series5.png','/imgs/series5_LB.png'],
              ['/imgs/series6.png','/imgs/series6_LB.png'],
              ['/imgs/series7.png','/imgs/series7_LB.png'],
              ['/imgs/series8.png','/imgs/series8_LB.png'],
              ['/imgs/series9.png','/imgs/series9_LB.png'],
              ['/imgs/series10.png','/imgs/series10_LB.png'],
              ['/imgs/series11.png','/imgs/series11_LB.png'],
              ['/imgs/series12.png','/imgs/series12_LB.png'],
              ['/imgs/series13.png','/imgs/series13_LB.png'],
              ['/imgs/series9.png','/imgs/series9_LB_2.png'],
          ]
      };
  },
  setup() {
    const { locale } = useI18n();
    const showssrbool = ref(true);
    const showssrbool2 = ref(true);
    
    const winW = ref(1260);
    const winW01 = ref(0);
    const winW02 = ref(0);
    const winW03 = ref(0);
    const winW04 = ref(0);
    const winW05 = ref(0);
    const winW06 = ref(0);
    const winW07 = ref(0);
    if(window.innerWidth){
        if(window.innerWidth > 992){
            winW.value = window.innerWidth*0.29;
            winW01.value = window.innerWidth*0.32;
            winW02.value = 0;
            winW03.value = 0;
            winW04.value = 0;
            winW05.value = 0;
            winW06.value = 0;
            winW07.value = 0;
        }else{
            winW.value = window.innerWidth*0.93;
            winW01.value = window.innerWidth*0.95;
            winW02.value = window.innerWidth*0.5;
            winW03.value = window.innerWidth*0.745;
            winW04.value = window.innerWidth*0.7;
            winW05.value = window.innerWidth*0.63;
            winW06.value = window.innerWidth*0.65;
            winW07.value = window.innerWidth*0.6;
        }
    }else{
        winW.value = 1260*0.29;
    }
    window.onresize = () => {
        if(window.innerWidth){
            if(window.innerWidth > 992){
                winW.value = window.innerWidth*0.29;
                winW01.value = window.innerWidth*0.32;
                winW02.value = 0;
                winW03.value = 0;
                winW04.value = 0;
                winW05.value = 0;
                winW06.value = 0;
                winW07.value = 0;
            }else{
                winW.value = window.innerWidth*0.93;
                winW01.value = window.innerWidth*0.95;
                winW02.value = window.innerWidth*0.5;
                winW03.value = window.innerWidth*0.745;
                winW04.value = window.innerWidth*0.7;
                winW05.value = window.innerWidth*0.63;
                winW06.value = window.innerWidth*0.65;
                winW07.value = window.innerWidth*0.6;
            }
        }else{
            winW.value = 1260*0.29;
        }
    }
    const isEn = computed(() => {
      return locale.value.trim() == "en";
    });
    const jumppage = () => {
        window.open('https://www.binance.com/en/nft/blindBox/detail?productId=116462123537859584');
    };
    return {
        showssrbool,
        showssrbool2,
        isEn,
        winW,
        winW01,
        winW02,
        winW03,
        winW04,
        winW05,
        winW06,
        winW07,
        jumppage
    };
  },
});
</script>


<style lang="scss">
@import "./index.scss";
</style>
