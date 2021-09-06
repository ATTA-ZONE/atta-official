<template>
  <header-cell />
  <div class="charitybox">
      <div class="titlebox">
            <h1 class="SiYuan-light">{{$t('charity_tit')}}</h1>
            <img class="bannerimg bannerimg1" src="/imgs/Charity_img1.png" alt="">
            <p v-html="$t('charity_content')"></p>
      </div>
      <img class="bannerimg bannerimg2" src="/imgs/Charity_img1.png" alt="">
      <div class="contentsbox">
          <div class="everybox" v-for="item in contentlist" :key="item.url">
                <h1 v-html="isEn ? item.titleen : item.titlech"></h1>
                <img :src="item.url" alt="" v-if="item.url.indexOf('mp4') == -1">
                <video :src="item.url" v-else autoplay loop muted style="width: 300px;"></video>
                <p v-html="isEn ? item.contenten : item.contentch"></p>
                <img :src="item.url2" alt="" v-if="item.url2">
                <p class="title2">{{isEn ? item.titleen2 : item.titlech2}}</p>
                <p class="content2">{{isEn ? item.contenten2 : item.contentch2}}</p>
          </div>
      </div>
      <div class="tablistbox">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane :label="isEn ? item.namelableen : item.namelablech" :name="index" v-for="(item,index) in tablistdata" :key="item.namelableen">
                    <div class="everytabbox">
                        <div class="everytablist flex" v-for="info in item.list" :key="info.namelablech">
                            <div class="lefttab">
                                <h1>{{isEn ? info.namelableen : info.namelablech}}</h1>
                                <p v-if="info.num1">{{$t('charity2_word1') + info.num1}}</p>
                                <p v-if="info.num2">{{$t('charity2_word2') + info.num2}}</p>
                                <p v-if="info.num3">{{$t('charity2_word3') + info.num3}}</p>
                                <p v-if="info.tipsch" class="xgqy" v-html="isEn ? info.tipsen : info.tipsch"></p>
                            </div>
                            <div class="righttab flex">
                                <div class="everyimgbox" v-for="everyimg in info.imglist" :key="everyimg.titleen" @click="openModal($event,everyimg)">
                                    <img :src="everyimg.url" alt="" v-if="everyimg.url.indexOf('mp4') == -1">
                                    <video :src="everyimg.url" v-else autoplay loop muted></video>
                                    <p>{{isEn ? everyimg.titleen : everyimg.titlech}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
      </div>
  </div>
  <footer-cell />
  {{modelBol}}
  <mediaModal :content="contents" @closeNet="closeNet" v-if="modelBol"></mediaModal>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import headerCell from "@/components/header/index.vue";
import footerCell from "@/components/footer/index.vue";
import {ElTabs,ElTabPane} from 'element-plus';
import mediaModal from "@/components/modals/imgPreview.vue";
// import 'element-plus/packages/theme-chalk/src/base.scss'

export default defineComponent({
  components: { headerCell,footerCell,ElTabs,ElTabPane,mediaModal},
  data() {
      return {
          contentlist : [
                {
                  titleen : '01 Binance NFT for Good: ATTA X Miserable Faith X Smile Angel Foundation - May Love Be Without Worries Special Edition',
                  contenten : 'May Love Be Without Worries was played by Miserable Faith and originally donated to Smile Angel Foundation. This special NFT version is produced by ATTA with only ONE version in the universe. Part of the auction will be donated to the Smile Angel Foundation to support children born with clefts and their families.',
                  titlech : '01 Binance NFT for Good:<br/> 痛仰 - 願愛無憂特別版數字專輯',
                  contentch : '《願愛⽆憂》由痛仰樂團演唱，是痛仰樂團贈送給北京嫣然天使⼉童公益基⾦會的歌曲。該⾸作品的NFT版本由北京嫣然天使⼉童公益基⾦會聯合官⽅合作夥伴ATTA精⼼製作呈現，全球限量1份。本次拍賣部分所得將捐贈北京嫣然天使⼉童公益基⾦會，助⼒慈善。',
                  url:'/Charity_img2.mp4',
                  url2:'/imgs/Charity_img3.png',
                  titleen2 : 'Miserable Faith',
                  contenten2 : 'Miserable faith, founded in 1999, is one of the most prestigious rock bands in China. The team has released six albums and EP so far. Participated in hundreds of special performances and music festivals, and won a large group of music fans covering different ages and identity attributes. They have never left the front line of Chinese Rock N Roll, and they are also a rare Rock N Roll force that has always maintained strong creative energy and successfully realized transformation.',
                  titlech2 : '痛仰樂隊',
                  contentch2 : '成立於1999年的痛仰樂團（Miserable Faith）是當下中國享有最高聲譽的搖滾樂隊之一。組隊至今發行專輯及EP共六張 ，參加各類專場、音樂節演出數百場，獲得了覆蓋不同年齡層和身份内容的龐大樂迷群。他們從未離開中國搖滾第一線，也是其中少有的始終保持旺盛創作精力並成功實現轉型的搖滾勁旅。',
                },
                {
                  titleen : '02 Binance NFT for Good: ATTA x Smile Angel Foundation Childhood Fantasy Mystery Box',
                  contenten : 'ATTA X Smile Angel Foundation Childhood Fantasy Mystery Box includes paintings originally donated to the Smile Angel Foundation and were created by a dozen of boys and girls, including daughter of Faye Wong. Several up-and-coming young artists are also invited to recreate based on these original paintings and include their artwork in the Mystery Box. Part of the sales will be donated to the Smile Angel Foundation to support children born with clefts and their families.<br/><br/>Rules for Redeeming NFT Utilities：<br/>1. For users who are eligible to redeem the benefits, please send your BinanceNFT uid, your location and screenshots of your opened Mystery Box NFTs collection (NFT set that is eligible for relevant utilities) to official ATTA email: nft@atta.zone .<br/>2. According to the rules, ATTA will review the list of winners and make announcement on Twitter and Telegram. The Special Angel NFT will be distributed by Binance NFT to qualifying users’ Binance NFT account.<br/>3. Regarding the physical benefits and utilities, eligible users will receive a confirmation email. Upon receiving the email, users need to reply with their contact information, address, etc. ATTA will send out the rewards after confirming the information.<br/>4. For redeeming the Special Angel NFT, after Binance NFT have opened their claim function, users need to transfer it to ATTA’s official website and redeem the NFT there for concert ticket.<br/>5. If you have further questions, you can directly go through WeChat (atta_official) to contact ATTA customer service staff.<br/>',
                  titlech : '02 Binance NFT for Good: <br/>小小慈善家藝術盲盒',
                  contentch : '小小慈善家藝術盲盒包括由十多位愛心小朋友捐贈的繪畫作品，以及基於這些作品，由ATTA策劃與多位青年藝術家、插畫師共同二次創作的作品。發售部分所得將捐贈北京嫣然天使兒童公益基金會，助力慈善，為唇腭裂出生缺陷兒童及家庭盡一些綿薄之力。<br/><br/>兌換規則：<br/>1.符合兌換權益條件的用戶，請將幣安NFT uid、所在地和已打開盲盒截圖（符合權益組合）發送至官方郵箱 nft@atta.zone<br/>2.根據兌換規則，ATTA將會核對中獎用戶名單，在twitter和telegram社群中公布。其中天使NFT將由幣安NFT空投到用戶幣安賬戶中<br/>3.關於實物權益獎品，符合條件的用戶將會收到確認郵件，用戶收到後需回復聯系和地址等信息，確認後，由ATTA官方統一寄送<br/>4.天使NFT的門票兌換，在幣安NFT開放提取後，由用戶提到ATTA官網平臺進行後續演唱會門票兌換<br/>',
                  url:'/imgs/Charity_img4.png',
                },
          ],
          tablistdata : [
                {
                    namelableen : 'ALL NFT',
                    namelablech : '全部NFT',
                    list : [
                            {
                                    namelableen : 'SSR Series',
                                    namelablech : 'SSR系列',
                                    num1 : '700',
                                    num2 : 'SSR',
                                    num3 : '1.98%',
                                    imglist : [
                                        {
                                            url : '/library/libraryList/cs01.jpg',
                                            titleen : 'Happy Birthady',
                                            titlech : 'Happy Birthady',
                                        },
                                        {
                                            url : '/library/libraryList/cs09.jpg',
                                            titleen : 'Sui Bian',
                                            titlech : '隨便',
                                        },
                                    ]
                            },
                            {
                                    namelableen : 'R Series',
                                    namelablech : 'R系列',
                                    num1 : '2300',
                                    num2 : 'R',
                                    num3 : '6.52%',
                                    imglist : [
                                        {
                                            url : '/library/libraryList/cs03.jpg',
                                            titleen : 'National Day',
                                            titlech : '國慶',
                                        },
                                        {
                                            url : '/library/libraryList/cs08.jpg',
                                            titleen : 'A Panorama of Rivers and Mountains',
                                            titlech : '千裏江山圖',
                                        },
                                        {
                                            url : '/library/libraryList/cs06.jpg',
                                            titleen : 'Girl',
                                            titlech : '女孩',
                                        },
                                    ]
                            },
                            {
                                    namelableen : 'N Series',
                                    namelablech : 'N系列',
                                    num1 : '3000',
                                    num2 : 'N',
                                    num3 : '8.50%',
                                    imglist : [
                                        {
                                            url : '/library/libraryList/cs10.jpg',
                                            titleen : "I'm a little bird",
                                            titlech : '我是一只小小鳥',
                                        },
                                        {
                                            url : '/library/libraryList/cs11.jpg',
                                            titleen : 'Miss You',
                                            titlech : 'Miss You',
                                        },
                                        {
                                            url : '/library/libraryList/cs12.jpg',
                                            titleen : 'Magpie',
                                            titlech : '喜鵲',
                                        },
                                        {
                                            url : '/library/libraryList/cs13.jpg',
                                            titleen : 'Picasso Pigeon',
                                            titlech : '畢加索-鴿子 01',
                                        },
                                        {
                                            url : '/library/libraryList/cs14.jpg',
                                            titleen : 'A Rabbit',
                                            titlech : '一只兔子',
                                        },
                                        {
                                            url : '/library/libraryList/cs07.jpg',
                                            titleen : 'Drummer',
                                            titlech : '鼓手',
                                        },
                                        {
                                            url : '/library/libraryList/cs04.jpg',
                                            titleen : 'Dad I love you',
                                            titlech : '爸爸我愛你',
                                        },
                                        {
                                            url : '/library/libraryList/cs05.jpg',
                                            titleen : 'Picasso Pigeon',
                                            titlech : '畢加索-鴿子 02',
                                        },
                                        {
                                            url : '/library/libraryList/cs02.jpg',
                                            titleen : 'Lovebirds',
                                            titlech : '比翼鳥',
                                        },
                                    ]
                            },
                            {
                                namelableen : 'Souvenir NFT',
                                namelablech : '紀念NFT',
                                tipsen: "1.All Mystery Box purchasers: will receive a special “ATTA X Smile Angel” donation certificate NFT.<br/>2.Collect all SSR+R NFTs: win one “ATTA X Smile Angel” Special Angel NFT, with which you can go to www.atta.zone to redeem VIP tickets for three “Smile Angel Special Concerts”",
                                tipsch : "1.每位購買盲盒者都将獲贈“ATTA X 嫣然愛心捐贈”NFT紀念證書一份<br/>2.集齊所有SSR+R 類NFT：獲贈“ATTA X 嫣然 天使NFT”一枚，憑天使NFT可前往兌換三場“嫣然愛音樂”演唱會VIP門票",
                                imglist : [
                                    {
                                        url : '/imgs/Charity_img5.jpg',
                                        titleen : 'Donation Certificate NFT',
                                        titlech : 'NFT紀念證書',
                                    },
                                    {
                                        url : '/imgs/Charity_img6.jpg',
                                        titleen : 'Special Angel NFT',
                                        titlech : '天使NFT',
                                    },
                                ]
                                                
                            },
                            {
                                namelableen : 'NFT Utilities',
                                namelablech : '權益獎品',
                                tipsen: "1. For users who are eligible to redeem the benefits, please send your BinanceNFT uid, your location and screenshots of your opened Mystery Box NFTs collection (NFT set that is eligible for relevant utilities) to official ATTA email: nft@atta.zone . <br/>2. ATTA will review the list of winners and make announcement on Twitter and Telegram. The Special Angel NFT will be distributed by Binance NFT to qualifying users’ Binance NFT account. <br/>3. Regarding the physical benefits and utilities, eligible users will receive a confirmation email. Upon receiving the email, users need to reply with their contact information, address, etc. ATTA will send out the rewards after confirming the information. <br/>4. For redeeming the Special Angel NFT, after Binance NFT have opened their claim function, users need to transfer it to ATTA’s official website and redeem the NFT there for concert ticket.",
                                tipsch : "1. 符合兌換權益條件的用戶，請將幣安 NFT uid、所在地和已打開盲盒截圖（符合權益組合）發送至官方郵箱 nft@atta.zone； <br/>2. ATTA 將會核對中獎用戶名單，在 twitter 和 telegram 社群中公布。其中天使 NFT 將由幣安 NFT 空投到用戶幣安賬戶中； <br/>3. 關于實物權益獎品，符合條件的用戶將會收到確認郵件，用戶收到後需回複聯系電話和地址等信息，確認後，由 ATTA 官方統一寄送； <br/>4. 天使 NFT 的門票兌換，在幣安 NFT 開放提取後，由用戶提到 ATTA 官網平台進行後續演唱會門票兌換。",
                                imglist : [
                                    {
                                        url : '/imgs/Charity_img7.jpg',
                                        titleen : 'large-size signature version of digital inkjet',
                                        titlech : '藝術家聯名創作的大尺寸簽名版數字',
                                        type:true,
                                        content:'Charity_json_content1'
                                    },
                                    {
                                        url : '/imgs/Charity_img8.jpg',
                                        titleen : 'limited-edition "Sui Bian" T-shirt + one "Sui Bian" digital inkjet',
                                        titlech : '限量版“隨便”T恤 +隨便噴繪',
                                        type:true,
                                        content:'Charity_json_content2'
                                    },
                                    {
                                        url : '/imgs/Charity_img9.jpg',
                                        titleen : 'limited-edition "Snow Kid" T-shirt + any R NFT digital inkjet',
                                        titlech : '限量版“雪孩子“T恤+ 指定R類噴繪”',
                                        type:true,
                                        content:'Charity_json_content3'
                                    },
                                    {
                                        url : '/imgs/Charity_img14.png',
                                        titleen : 'hardcopy of any NFT included in the box',
                                        titlech : '指定NFT的打印版',
                                        type:true,
                                        content:'Charity_json_content4'
                                    },
                                    {
                                        url : '/imgs/Charity_img11.jpg',
                                        titleen : 'illustrator-designed canvas bag',
                                        titlech : '潮流插畫師帆布包',
                                        type:true,
                                        content:'Charity_json_content5'
                                    },
                                    {
                                        url : '/imgs/Charity_img12.jpg',
                                        titleen : '"Xiao Te" Smile Angel 15-year Anniversary Bag',
                                        titlech : '嫣然十五周年“小特”環保包',
                                        type:true,
                                        content:'Charity_json_content6'
                                    },
                                    {
                                        url : '/imgs/Charity_img13.jpg',
                                        titleen : '"Xi Diao" Tibetan Incense by Smile Angel',
                                        titlech : '嫣然典藏“喜調”藏香',
                                        type:true,
                                        content:'Charity_json_content7'
                                    },
                                    
                                ]
                        },
                            
                    ]
                },
                {
                    namelableen : 'SSR',
                    namelablech : 'SSR',
                    list : [
                            {
                                    namelableen : 'SSR Series',
                                    namelablech : 'SSR系列',
                                    num1 : '700',
                                    num2 : 'SSR',
                                    num3 : '1.98%',
                                    imglist : [
                                        {
                                            url : '/library/libraryList/cs01.jpg',
                                            titleen : 'Happy Birthady',
                                            titlech : 'Happy Birthady',
                                        },
                                        {
                                            url : '/library/libraryList/cs09.jpg',
                                            titleen : 'Sui Bian',
                                            titlech : '隨便',
                                        },
                                    ]
                            }
                    ]
                },
                {
                    namelableen : 'R',
                    namelablech : 'R',
                    list : [
                            {
                                    namelableen : 'R Series',
                                    namelablech : 'R系列',
                                    num1 : '2300',
                                    num2 : 'R',
                                    num3 : '6.52%',
                                    imglist : [
                                        {
                                            url : '/library/libraryList/cs03.jpg',
                                            titleen : 'National Day',
                                            titlech : '國慶',
                                        },
                                        {
                                            url : '/library/libraryList/cs08.jpg',
                                            titleen : 'A Panorama of Rivers and Mountains',
                                            titlech : '千裏江山圖',
                                        },
                                        {
                                            url : '/library/libraryList/cs06.jpg',
                                            titleen : 'Girl',
                                            titlech : '女孩',
                                        },
                                    ]
                            },
                    ]
                },
                {
                    namelableen : 'N',
                    namelablech : 'N',
                    list : [
                            {
                                    namelableen : 'N Series',
                                    namelablech : 'N系列',
                                    num1 : '3000',
                                    num2 : 'N',
                                    num3 : '8.50%',
                                    imglist : [
                                        {
                                            url : '/library/libraryList/cs10.jpg',
                                            titleen : "I'm a little bird",
                                            titlech : '我是一只小小鳥',
                                        },
                                        {
                                            url : '/library/libraryList/cs11.jpg',
                                            titleen : 'Miss You',
                                            titlech : 'Miss You',
                                        },
                                        {
                                            url : '/library/libraryList/cs12.jpg',
                                            titleen : 'Magpie',
                                            titlech : '喜鵲',
                                        },
                                        {
                                            url : '/library/libraryList/cs13.jpg',
                                            titleen : 'Picasso Pigeon',
                                            titlech : '畢加索-鴿子 01',
                                        },
                                        {
                                            url : '/library/libraryList/cs14.jpg',
                                            titleen : 'A Rabbit',
                                            titlech : '一只兔子',
                                        },
                                        {
                                            url : '/library/libraryList/cs07.jpg',
                                            titleen : 'Drummer',
                                            titlech : '鼓手',
                                        },
                                        {
                                            url : '/library/libraryList/cs04.jpg',
                                            titleen : 'Dad I love you',
                                            titlech : '爸爸我愛你',
                                        },
                                        {
                                            url : '/library/libraryList/cs05.jpg',
                                            titleen : 'Picasso Pigeon',
                                            titlech : '畢加索-鴿子 02',
                                        },
                                        {
                                            url : '/library/libraryList/cs02.jpg',
                                            titleen : 'Lovebirds',
                                            titlech : '比翼鳥',
                                        },
                                    ]
                            },
                    ]
                },
                {
                    namelableen : 'Souvenir NFT',
                    namelablech : '紀念NFT',
                    list : [
                            {
                                    namelableen : 'Souvenir NFT',
                                    namelablech : '紀念NFT',
                                    tipsen: "1.All Mystery Box purchasers: will receive a special “ATTA X Smile Angel” donation certificate NFT.<br/>2.Collect all SSR+R NFTs: win one “ATTA X Smile Angel” Special Angel NFT, with which you can go to www.atta.zone to redeem VIP tickets for three “Smile Angel Special Concerts”",
                                    tipsch : "1.每位購買盲盒者都将獲贈“ATTA X 嫣然愛心捐贈”NFT紀念證書一份<br/>2.集齊所有SSR+R 類NFT：獲贈“ATTA X 嫣然 天使NFT”一枚，憑天使NFT可前往兌換三場“嫣然愛音樂”演唱會VIP門票",
                                    imglist : [
                                        {
                                            url : '/imgs/Charity_img5.jpg',
                                            titleen : 'Donation Certificate NFT',
                                            titlech : 'NFT紀念證書',
                                        },
                                        {
                                            url : '/imgs/Charity_img6.jpg',
                                            titleen : 'Special Angel NFT',
                                            titlech : '天使NFT',
                                        },
                                    ]
                            },
                    ]
                },
                {
                    namelableen : 'NFT Utilities',
                    namelablech : '權益獎品',
                    list : [
                            {
                                    namelableen : 'NFT Utilities',
                                    namelablech : '權益獎品',
                                    tipsen: "1. For users who are eligible to redeem the benefits, please send your BinanceNFT uid, your location and screenshots of your opened Mystery Box NFTs collection (NFT set that is eligible for relevant utilities) to official ATTA email: nft@atta.zone . <br/>2. ATTA will review the list of winners and make announcement on Twitter and Telegram. The Special Angel NFT will be distributed by Binance NFT to qualifying users’ Binance NFT account. <br/>3. Regarding the physical benefits and utilities, eligible users will receive a confirmation email. Upon receiving the email, users need to reply with their contact information, address, etc. ATTA will send out the rewards after confirming the information. <br/>4. For redeeming the Special Angel NFT, after Binance NFT have opened their claim function, users need to transfer it to ATTA’s official website and redeem the NFT there for concert ticket.",
                                    tipsch : "1. 符合兌換權益條件的用戶，請將幣安 NFT uid、所在地和已打開盲盒截圖（符合權益組合）發送至官方郵箱 nft@atta.zone； <br/>2. ATTA 將會核對中獎用戶名單，在 twitter 和 telegram 社群中公布。其中天使 NFT 將由幣安 NFT 空投到用戶幣安賬戶中； <br/>3. 關于實物權益獎品，符合條件的用戶將會收到確認郵件，用戶收到後需回複聯系電話和地址等信息，確認後，由 ATTA 官方統一寄送； <br/>4. 天使 NFT 的門票兌換，在幣安 NFT 開放提取後，由用戶提到 ATTA 官網平台進行後續演唱會門票兌換。",
                                    imglist : [
                                        {
                                            url : '/imgs/Charity_img7.jpg',
                                            titleen : 'large-size signature version of digital inkjet',
                                            titlech : '藝術家聯名創作的大尺寸簽名版數字',
                                            type:true,
                                            content:'Charity_json_content1'
                                        },
                                        {
                                            url : '/imgs/Charity_img8.jpg',
                                            titleen : 'limited-edition "Sui Bian" T-shirt + one "Sui Bian" digital inkjet',
                                            titlech : '限量版“隨便”T恤 +隨便噴繪',
                                            type:true,
                                            content:'Charity_json_content2'
                                        },
                                        {
                                            url : '/imgs/Charity_img9.jpg',
                                            titleen : 'limited-edition "Snow Kid" T-shirt + any R NFT digital inkjet',
                                            titlech : '限量版“雪孩子“T恤+ 指定R類噴繪”',
                                            type:true,
                                            content:'Charity_json_content3'
                                        },
                                        {
                                            url : '/imgs/Charity_img14.png',
                                            titleen : 'hardcopy of any NFT included in the box',
                                            titlech : '指定NFT的打印版',
                                            type:true,
                                            content:'Charity_json_content4'
                                        },
                                        {
                                            url : '/imgs/Charity_img11.jpg',
                                            titleen : 'illustrator-designed canvas bag',
                                            titlech : '潮流插畫師帆布包',
                                            type:true,
                                            content:'Charity_json_content5'
                                        },
                                        {
                                            url : '/imgs/Charity_img12.jpg',
                                            titleen : '"Xiao Te" Smile Angel 15-year Anniversary Bag',
                                            titlech : '嫣然十五周年“小特”環保包',
                                            type:true,
                                            content:'Charity_json_content6'
                                        },
                                        {
                                            url : '/imgs/Charity_img13.jpg',
                                            titleen : '"Xi Diao" Tibetan Incense by Smile Angel',
                                            titlech : '嫣然典藏“喜調”藏香',
                                            type:true,
                                            content:'Charity_json_content7' 
                                        },
                                        
                                    ]
                            },
                    ]
                },
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
    // const activeName = ref('1');
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
    onMounted(() => {
    });
    const jumppage = () => {
        window.open('https://www.binance.com/en/nft/blindBox/detail?productId=116462123537859584');
    };
    const jumppageAuction = () => {
        window.open('https://www.binance.com/en/nft/goods/detail?productId=4808176&isProduct=1');
    };

    const modelBol = ref(false);
    const contents = ref({});

    // item:父级 index:第几个父级 info:子集  num:第几个子集
    const openModal = (e,info)=>{
        let item = JSON.parse(JSON.stringify(info))
        console.log(item);
      if(!item.type) return;
      console.log(7777777777);
      let data = {
        url:item.url,//大图
        mediaType:'image',
        title:isEn.value ? item.titleen : item.titlech,//标题
        content:item.content?item.content:'',//详情文案
        type:'video'
      }
      console.log(data);
      contents.value = data;
      modelBol.value = true;
    }
    
    const closeNet = ()=>{
      modelBol.value = false;
      contents.value = {};
    }
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
        jumppage,
        jumppageAuction,
        contents,
        modelBol,
        openModal,
        closeNet
    };
  },
});
</script>


<style lang="scss">
@import "./index.scss";
</style>
