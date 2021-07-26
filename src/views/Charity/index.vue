<template>
  <header-cell />
  <div class="charitybox">
      <div class="titlebox">
          <h1 class="Fzlt_Thb">{{$t('charity_tit')}} | {{$t('charity_tit2')}}</h1>
          <p>{{$t('charity_content')}}</p>
          <div class="btnbox">
              <span>{{$t('charity_btnlable')}}</span>
              <button>{{$t('charity_btnname')}}</button>
          </div>
      </div>
      <div class="contentbox">
        <div class="ssrseriesbox">
            <div class="title flexbetween">
                <span class="Fzlt_Thb">{{$t('charity_ssr_tit')}}</span>
                <img :src="showssrbool ? '/imgs/arrow1.png' : '/imgs/arrow2.png'" alt="" @click="showssrbool = !showssrbool">
            </div>
            <div class="imgscontentbox flexbetween">
                <div class="imgsevery series1">
                    <img src="/imgs/series1.png" alt="">
                    <p>{{$t('charity_ssr_content1')}}</p>
                </div>
                <div class="imgsevery series2">
                    <img src="/imgs/series2.png" alt="">
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
                    <img src="/imgs/series3.png" alt="">
                    <p>{{$t('charity_r_content1')}}</p>
                </div>
                <div class="imgsevery series4">
                    <img src="/imgs/series4.png" alt="">
                    <p>{{$t('charity_r_content2')}}</p>
                </div>
                <div class="imgsevery series5">
                    <img src="/imgs/series5.png" alt="">
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
                    <img src="/imgs/series6.png" alt="">
                    <p>{{$t('charity_n_content1')}}</p>
                </div>
                <div class="imgsevery series7">
                    <img src="/imgs/series7.png" alt="">
                    <p>{{$t('charity_n_content2')}}</p>
                </div>
                <div class="imgsevery series8">
                    <img src="/imgs/series8.png" alt="">
                    <p>{{$t('charity_n_content3')}}</p>
                </div>
                <div class="imgsevery series9">
                    <img src="/imgs/series9.png" alt="">
                    <p>{{$t('charity_n_content4')}}</p>
                </div>
                <div class="imgsevery series10">
                    <img src="/imgs/series10.png" alt="">
                    <p>{{$t('charity_n_content5')}}</p>
                </div>
                <div class="imgsevery series11">
                    <img src="/imgs/series11.png" alt="">
                    <p>{{$t('charity_n_content6')}}</p>
                </div>
                <div class="imgsevery series12">
                    <img src="/imgs/series12.png" alt="">
                    <p>{{$t('charity_n_content7')}}</p>
                </div>
                <div class="imgsevery series13">
                    <img src="/imgs/series13.png" alt="">
                    <p>{{$t('charity_n_content8')}}</p>
                </div>
            </div>
        </div>
        <button @click="showssrbool = !showssrbool" class="webh5_foldbtn">
            {{ showssrbool ? $t('charity_open') : $t('charity_retract')}}
            <img :src="!showssrbool ? '/imgs/arrow3.png' : '/imgs/arrow4.png'" alt="">
        </button>
        <div class="nftseriesbox">
            <div class="title flexbetween">
                <span class="Fzlt_Thb">{{$t('charity_nft_tit')}}</span>
                <img :src="showssrbool2 ? '/imgs/arrow1.png' : '/imgs/arrow2.png'" alt="" @click="showssrbool2 = !showssrbool2">
            </div>
            <p class="nft_content_word">{{$t('charity_nft_content')}}</p>
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

export default defineComponent({
  components: { headerCell,footerCell},
  data() {
      return {
          nftlist:[
                {
                  titleen : 'ATTA X "ATTA X Smile Angel" donation certificate NFT',
                  contenten : 'All Mystery Box purchasers: win a "ATTA X Smile Angel" donation certificate NFT',
                  titlech : 'ATTA X 嫣然愛心捐贈',
                  contentch : '每位購買盲盒者：獲贈“ATTA X 嫣然愛心捐贈”NFT紀念證書一份',
                  url:'/imgs/series14.png',
                },
                {
                  titleen : '"ATTA X Smile Angel" Special Angel NFT',
                  contenten : 'Collect all SSR+R NFTs: win one "ATTA X Smile Angel" Special Angel NFT to redeem VIP tickets for three "Smile Angel Special Concerts" at www.atta.zone',
                  titlech : 'ATTA X嫣然 天使NFT',
                  contentch : '集齊所有SSR+R 類NFT：獲贈“ATTA X嫣然 天使NFT”一枚，憑天使NFT可前往兌換三場“嫣然愛音樂”演唱會VIP門票',
                  url:'/series20.mp4',
                }
          ],
          nftlist2:[
                {
                  titleen : 'large-size signature version of digital inkjet',
                  contenten : 'Collect two different SSR: win one large-size digital inkjet created by young artists ',
                  titlech : '藝術家聯名創作的大尺寸簽名版數字',
                  contentch : '集齊兩種SSR類NFT：獲贈本次藝術家聯名創作的大尺寸簽名版數字噴繪',
                  url:'/imgs/series14.png',
                },
                {
                  titleen : 'limited-edition "Sui Bian" T-shirt + one "Sui Bian" digital inkjet',
                  contenten : 'Collect "Sui Bian" SSR: win one limited-edition "Sui Bian" T-shirt + one "Sui Bian" digital inkjet',
                  titlech : '限量版“隨便”T恤 +隨便噴繪',
                  contentch : '收集“隨便”SSR NFT：獲贈實物限量版“隨便“T恤 +隨便噴繪一幅',
                  url:'/imgs/series17.png',
                },
                {
                  titleen : 'limited-edition "Snow Kid" T-shirt + any R NFT digital inkjet',
                  contenten : 'Collect all R: win a limited-edition "Snow Kid" T-shirt + any R NFT digital inkjet',
                  titlech : '限量版“雪孩子“T恤+ 指定R類噴繪”',
                  contentch : '集齊所有R類NFT：獲贈實物限量版“雪孩子“T恤+ 指定R類噴繪一幅',
                  url:'/imgs/series18.png',
                },
                {
                  titleen : 'hardcopy of any NFT included in the box',
                  contenten : 'Collect any R + four different N: win one hardcopy of any NFT in the box ',
                  titlech : '指定NFT的打印版”',
                  contentch : '集齊任意一種R+4種N類NFT：獲贈指定NFT的打印版一張',
                  url:'/imgs/series14.png',
                },
                {
                  titleen : 'illustrator-designed canvas bag',
                  contenten : 'Collect five different N: win one illustrator-designed canvas bag ',
                  titlech : '潮流插畫師帆布包',
                  contentch : '集齊5種N類NFT：獲贈潮流插畫師帆布包一件',
                  url:'/imgs/series19.png',
                },
                {
                  titleen : '"Xi Diao" Tibetan Incense by Smile Angel',
                  contenten : ' Collect four different N: win one "Xi Diao" Tibetan Incense by Smile Angel',
                  titlech : '嫣然典藏“喜調”藏香',
                  contentch : '集齊4種N類NFT：獲贈嫣然典藏”喜調”藏香一份',
                  url:'/imgs/series15.png',
                },
                {
                  titleen : '"Xiao Te" Smile Angel 15-year Anniversary Bag',
                  contenten : 'Collect three different N: win one "Xiao Te" Smile Angel 15-year Anniversary Bag',
                  titlech : '嫣然十五周年“小特”環保包',
                  contentch : '集齊3種N類NFT：獲贈嫣然十五周年“小特“環保包',
                  url:'/imgs/series16.png',
                },
          ],
      };
  },
  setup() {
    const { locale } = useI18n();
    const showssrbool = ref(false);
    const showssrbool2 = ref(false);
    const isEn = computed(() => {
        console.log(isEn);
        
      return locale.value.trim() == "en";
    });
    return {
        showssrbool,
        showssrbool2,
        isEn,
    };
  },
});
</script>


<style lang="scss">
.charitybox{
    padding: 0 10%;
    .flexbetween{
        display: flex;
        justify-content: space-between;
    }
    .Fzlt_Thb{
        font-family: 'Fzlt-Thb';
        color: #A9DEEE;
    }
    .titlebox{
        border-bottom: 1px solid rgba($color: #fff, $alpha: 0.15);
        padding-bottom: 33px;
        h1{
            font-weight: normal;
            font-size: 30px;
        }
        p{
            margin-top: 14px;
            font-family: Inter;
            font-style: normal;
            font-size: 18px;
            line-height: 190%;
            color: rgba(255, 255, 255, 0.7);
        }
        .btnbox{
            margin-top: 33px;
            display: flex;
            align-items: center;
            span{
                font-family: Inter;
                font-style: normal;
                font-weight: bold;
                font-size: 19.5px;
                line-height: 183.5%;
                letter-spacing: 0.01em;
                color: #FFFFFF;
            }
            button{
                background-color: transparent;
                border: 1px solid #A8DEEE;
                padding: 8px 30px;
                font-family: Inter;
                font-style: normal;
                font-weight: 600;
                font-size: 12px;
                line-height: 22px;
                text-align: center;
                letter-spacing: -0.025em;
                color: #A8DEEE;
            }
        }
    }
    .contentbox{
        padding-top: 40px;
        .ssrseriesbox,.rseriesbox,.nseriesbox,.nftseriesbox{
            .title{
                align-items: center;
                font-size: 36px;
                img{
                    cursor: pointer;
                }
            }
            .imgscontentbox{
                margin-top: 25px;
                margin-bottom: 25px;
                flex-wrap: wrap;
                .imgsevery{
                    background: rgba(27,30,31);
                    img{
                        border-color: rgba(150, 150, 150, 0.25);
                        border-style: solid;
                        width: 100%;
                        box-sizing: border-box;
                    }
                    p{
                        font-family: Inter;
                        font-style: normal;
                        font-weight: 600;
                        font-size: 18px;
                        line-height: 190%;
                    }
                }
                .series1,.series8,.series9,.series10,.series13{
                    width: 31.119%;
                    img{
                        border-top-width: 28.6px;
                        border-left-width: 26.15px;
                        border-right-width: 26.15px;
                        border-bottom-width: 27.58px;
                    }
                    p{
                        padding: 22px 28px;
                    }
                }
                .series2{
                    width: 64.793%;
                    img{
                        border-top-width: 29px;
                        border-left-width: 38px;
                        border-right-width: 39px;
                        border-bottom-width: 27.26px;
                    }
                    p{
                        padding: 22px 28.53px;
                    }
                }
                .series3,.series6{
                    width: 50.991%;
                    img{
                        border-top-width: 29px;
                        border-left-width: 42.6px;
                        border-right-width: 43.09px;
                        border-bottom-width: 27.17px;
                    }
                    p{
                        padding: 22px 42px;
                    }
                }
                .series4{
                    width: 43.966%;
                    img{
                        border-top-width: 29px;
                        border-left-width: 36.73px;
                        border-right-width: 36.09px;
                        border-bottom-width: 27.26px;
                    }
                    p{
                        padding: 22px 36.73px;
                    }
                }
                .series5{
                    width: 67.355%;
                    img{
                        border-top-width: 31px;
                        border-left-width: 43px;
                        border-right-width: 49px;
                        border-bottom-width: 27.26px;
                    }
                    p{
                        padding: 22px 43px;
                    }
                }
                .series7{
                    width: 46.115%;
                    img{
                        border-top-width: 29px;
                        border-left-width: 28px;
                        border-right-width: 27px;
                        border-bottom-width: 28.26px;
                    }
                    p{
                        padding: 22px 28px;
                    }
                }
                .series11{
                    width: 50.33%;
                    img{
                        border-top-width: 29px;
                        border-left-width: 26px;
                        border-right-width: 25px;
                        border-bottom-width: 27.26px;
                    }
                    p{
                        padding: 22px 26px;
                    }
                }
                .series12{
                    width: 45.409%;
                    img{
                        border-top-width: 28px;
                        border-left-width: 31px;
                        border-right-width: 30px;
                        border-bottom-width: 27.26px;
                    }
                    p{
                        padding: 22px 31px;
                    }
                }
                .series14{  
                    img,video{
                        border-top-width: 21.78px;
                        border-left-width: 27px;
                        border-right-width: 22px;
                        border-bottom-width: 22.86px;
                    }
                }
                .series5,.series8,.series9,.series10,.series11,.series12,.series13{
                    margin-top: 40px;
                }
            }
            .nft_content_word{
                font-family: Inter;
                font-style: normal;
                font-weight: 500;
                font-size: 18px;
                line-height: 190%;
                color: rgba(255, 255, 255, 0.7);
            }
        }
        .rseriesbox,.nseriesbox,.nftseriesbox{
            margin-top: 25px;
        }
        .nftimgsbox{
            margin-top: 42px;
            .nftimgevery{
                margin-bottom: 40px;
                img,video{
                    border-color: rgba(150, 150, 150, 0.25);
                    border-style: solid;
                    box-sizing: border-box;
                    width: 49.451%;
                }
               .wordsbox{
                   width: 45%;
                   padding-top: 20px;
                   h1{
                        font-weight: bold;
                        font-size: 18px;
                        line-height: 120%;
                   }
                   p{
                        margin-top: 28px;
                        font-family: Inter;
                        font-style: normal;
                        font-weight: 500;
                        font-size: 16px;
                        line-height: 150%;
                        letter-spacing: -0.01em;
                        color: rgba(255, 255, 255, 0.6);
                   }
               }
            }
        }
    }
    .webh5_foldbtn{
        display: none;
    }
}
@media only screen and (max-width: 992px){
    .titlebox{
        padding-bottom: 17px !important;
        h1{
            font-size: 20px !important;
        }
        p{
            margin-top: 10px !important;
            font-size: 12px !important;
        }
        .btnbox{
            margin-top: 24px !important;
            span{
                font-size: 14px !important;
            }
            button{
                font-size: 13px !important;
                padding: 3.5px 22px !important;
            }
        }
    }
    .charitybox .contentbox {
        padding-top: 24px;
        .rseriesbox,.nseriesbox,.nftseriesbox{
            margin-top: 0px !important;
        }
        .ssrseriesbox .title,.rseriesbox .title,.nseriesbox .title, .nftseriesbox .title{
            font-size: 20px;
            img{
                // width: 19px;
                display: none;
            }
        }
        .imgscontentbox{
            margin-top: 10px !important;
            .series1,.series2,.series3,.series4,.series5,.series6,.series7,.series8,.series9,.series10,.series11,.series12,.series13{
                width: 100% !important;
                margin-bottom: 23.05px;
                margin-top: 0px !important;
                img{
                    border-top-width: 25.59px !important;
                    border-left-width: 23.4px !important;
                    border-right-width: 23.4px !important;
                    border-bottom-width: 24.68px !important;
                }
                p{
                    padding: 19.19px 23.4px !important;
                    font-size: 20px !important;
                }
            }
        }
    }
    .webh5_foldbtn{
        border: 1px solid #A8DEEE;
        background-color: transparent;
        font-family: Inter;
        font-style: normal;
        font-weight: 600;
        font-size: 13px;
        line-height: 22px;
        text-align: center;
        letter-spacing: -0.025em;
        color: #A8DEEE;
        padding: 6.5px 21px;
        display: flex;
        align-items: center;
        margin: auto;
        margin-bottom: 20px;
        display: block !important;
        img{
            width: 13px;
            margin-left: 6px;
        }
    }
    .nft_content_word{
        font-size: 12px !important;
    }
    .nftimgsbox.imgscontentbox{
        .nftimgevery{
            flex-direction: column;
            .series14{
                border-top-width: 12px !important;
                border-left-width: 15px !important;
                border-right-width: 15px !important;
                border-bottom-width: 12px !important;
            }
            img,video{
                width: 100% !important;
            }
            .wordsbox{
                background-color: rgb(29, 31, 31);
                width: 100% !important;
                padding: 17.25px 15px;
                box-sizing: border-box;
                h1{
                    font-size: 20px;
                }
                p{
                    margin-top: 4px !important;
                    font-size: 13px !important;
                }
            }
        }
    }
}
</style>
