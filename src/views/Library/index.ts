import { defineComponent,ref } from "vue";
import headerCell from "@/components/header/index.vue";
import footerCell from "@/components/footer/index.vue";
import { getCookie, setCookie,getAbi,formatDate,moneyFormat } from "../../utils";
import mediaModal from "@/components/modals/imgPreview.vue";
export default defineComponent({
  components: { headerCell,footerCell,mediaModal},
  data() {
      return {
        libraryList:[
          {
            img01:'/library/libraryTitle/library01.png',//左边大图
            title:'library_copywriting_2',//标题
            text01:'library_copywriting_8',//右侧内容第一段
            remark:'library_copywriting_114',//右侧备注
            detailName:'br',
            logo:'',//右侧logo
            imgsList:[
              {
                url:'/library/libraryList/dw02.png',
                text:'library_copywriting_15',
                content:'library_copywriting_35',
                mp4Url:'https://www.bazhuayu.io/upload/v2data/2021-05-06/262791a6-8511-43d7-8363-d570d7d1abf3.mp4',
                noAPlist:[6,4,1,0,3],
                APdesc:['005','01','0','000','005'],
                nolist:[45,24,23,1,0],
                desc:['005','01','1','006','050']
              },
              {
                url:'/library/libraryList/dw03.png',
                text:'library_copywriting_15_3',
                content:'library_copywriting_49',
                mp4Url:'https://www.bazhuayu.io/upload/v2data/2021-05-06/0f47d6d0-a9d3-4d95-9650-fb22da6c673b.mp4',
                nolist:[150,80,70,5,5],
                desc:['005','02','1','001','150']
              },
              {
                url:'/library/libraryList/dw04.png',
                text:'library_copywriting_15_4',
                content:'library_copywriting_51',
                mp4Url:'https://www.bazhuayu.io/upload/v2data/2021-05-06/550f7819-6382-4c75-ad4e-836d42729aa7.mp4',
                nolist:[150,85,73,5,7],
                desc:['005','03','1','001','150']
              },
              {
                url:'/library/libraryList/dw01.png',
                text:'library_copywriting_15_2',
                content:'library_copywriting_47',
                mp4Url:'https://www.bazhuayu.io/upload/v2data/2021-05-07/40069c82-2eb8-478e-bff0-c06f466687cf.mp4',
                nolist:[150,80,73,5,2],
                desc:['005','04','1','001','150']
              }
            ]
          },
          {
            img01:'/library/libraryTitle/library02.png',//左边大图
            title:'library_copywriting_3',//标题
            text01:'library_copywriting_10',//右侧内容第一段
            remark:'',//右侧备注
            logo:'',//右侧logo
            detailName:'br',
            imgsList:[
              {
                url:'/library/libraryList/xdd01.png',
                text:'library_copywriting_16'
              },
              {
                url:'https://www.bazhuayu.io/upload/other/xu.png',
                text:'xudongdong_second_img'
              }
            ]
          },
          {
            img01:'/library/libraryTitle/library03.png',//左边大图
            title:'library_copywriting_4',//标题
            text01:'library_copywriting_11',//右侧内容第一段
            remark:'library_copywriting_114',//右侧备注
            logo:'',//右侧logo
            detailName:'br',
            imgsList:[
              {
                url:'/library/libraryList/o201.png',
                text:'library_copywriting_17',
                content:'library_copywriting_53',
                mp4Url:'https://www.bazhuayu.io/upload/other/APCompressed.mp4',
                noAPlist:[6,3,0,0,3],
                APdesc:['011','01','0','000','005'],
                nolist:[45,6,0,5,1],
                desc:['011','01','1','006','050']
              },
              {
                url:'/library/libraryList/o202.png',
                text:'library_copywriting_17',
                content:'library_copywriting_53_bw',
                mp4Url:'https://www.bazhuayu.io/upload/v2data/2021-08-02/54f4822a-046e-4d57-ac2b-fc86916f4ed1.mp4',
                nolist:[45,6,0,5,1],
                desc:['011','01','1','006','050']
              },
              {
                url:'/library/libraryList/o203.png',
                text:'library_copywriting_18',
                content:'library_copywriting_55',
                mp4Url:'https://www.bazhuayu.io/upload/v2data/2021-08-02/1290705b-0231-4a63-a891-b9205a2d1a9d.mp4',
                nolist:[50,8,0,5,3],
                desc:['011','02','1','001','050']
              },
              {
                url:'/library/libraryList/o204.png',
                text:'library_copywriting_19',
                content:'library_copywriting_57',
                mp4Url:'https://www.bazhuayu.io/upload/v2data/2021-08-02/291540c7-8961-40a0-b0a8-59b1f49a67a8.mp4',
                nolist:[50,10,0,5,5],
                desc:['011','03','1','001','050']
              },
              {
                url:'/library/libraryList/o205.png',
                text:'library_copywriting_118',
                content:'library_copywriting_117',
                mp4Url:'https://www.atta.zone/ATTAdrop.mp4',
                // noAPlist:[6,4,1,0,3],
                // APdesc:['005','01','0','000','005'],
                nolist:[2000,2000,2000,0,0],
                descText:'1 （BEP1155 標準鑄造）',
                descTextEn:'1（Minted in BEP1155 standard）'
                
              },
              {
                url:'',
                text:''
              }
            ]
          },
          {
            img01:'/library/libraryTitle/library04.png',//左边大图
            title:'library_copywriting_5',//标题
            text01:'library_copywriting_12',//右侧内容第一段
            remark:'library_copywriting_114',//右侧备注
            logo:'/library/yanran.png',//右侧logo
            detailName:'br',
            imgsList:[
              {
                url:'/library/libraryList/cs01.jpg',
                text:'library_copywriting_20',
                content:'library_copywriting_58',
                mp4Url:'https://www.bazhuayu.io/upload/other/happy.mp4',
                rarity:['700','SSR','1.98%']
              },
              {
                url:'/library/libraryList/cs02.jpg',
                text:'library_copywriting_21',
                content:'library_copywriting_60',
                mp4Url:'https://www.bazhuayu.io/upload/other/biyi.mp4',
                rarity:['3000','N','8.50%']
              },
              {
                url:'/library/libraryList/cs03.jpg',
                text:'library_copywriting_22',
                content:'library_copywriting_62',
                mp4Url:'https://www.bazhuayu.io/upload/other/gq.mp4',
                rarity:['2300','R','6.52%']
              },
              {
                url:'/library/libraryList/cs04.jpg',
                text:'library_copywriting_23',
                content:'library_copywriting_64',
                mp4Url:'https://www.bazhuayu.io/upload/other/baba.mp4',
                rarity:['3000','N','8.50%']
              },
              {
                url:'/library/libraryList/cs05.jpg',
                text:'library_copywriting_24',
                content:'library_copywriting_66',
                mp4Url:'https://www.bazhuayu.io/upload/other/gezi1.mp4',
                rarity:['3000','N','8.50%']
              },
              {
                url:'/library/libraryList/cs06.jpg',
                text:'library_copywriting_25',
                content:'library_copywriting_68',
                mp4Url:'https://www.bazhuayu.io/upload/other/nh.mp4',
                rarity:['2300','R','6.52%']
              },
              {
                url:'/library/libraryList/cs07.jpg',
                text:'library_copywriting_26',
                content:'library_copywriting_70',
                mp4Url:'https://www.bazhuayu.io/upload/other/gs.mp4',
                rarity:['3000','N','8.50%']
              },
              {
                url:'/library/libraryList/cs08.jpg',
                text:'library_copywriting_27',
                content:'library_copywriting_72',
                mp4Url:'https://www.bazhuayu.io/upload/other/jst.mp4',
                rarity:['2300','R','6.52%']
              },
              {
                url:'/library/libraryList/cs09.jpg',
                text:'library_copywriting_28',
                content:'library_copywriting_74',
                mp4Url:'https://www.bazhuayu.io/upload/other/suibian.mp4',
                rarity:['700','SSR','1.98%']
              },
              {
                url:'/library/libraryList/cs10.jpg',
                text:'library_copywriting_29',
                content:'library_copywriting_76',
                mp4Url:'https://www.bazhuayu.io/upload/other/xxn.mp4',
                rarity:['3000','N','8.50%']
              },
              {
                url:'/library/libraryList/cs11.jpg',
                text:'library_copywriting_30',
                content:'library_copywriting_78',
                mp4Url:'https://www.bazhuayu.io/upload/other/missyou.mp4',
                rarity:['3000','N','8.50%']
              },
              {
                url:'/library/libraryList/cs12.jpg',
                text:'library_copywriting_31',
                content:'library_copywriting_80',
                mp4Url:'https://www.bazhuayu.io/upload/other/xq.mp4',
                rarity:['3000','N','8.50%']
              },
              {
                url:'/library/libraryList/cs13.jpg',
                text:'library_copywriting_32',
                content:'library_copywriting_82',
                mp4Url:'https://www.bazhuayu.io/upload/other/gezi.mp4',
                rarity:['3000','N','8.50%']
              },
              {
                url:'/library/libraryList/cs14.jpg',
                text:'library_copywriting_33',
                content:'library_copywriting_84',
                mp4Url:'https://www.bazhuayu.io/upload/other/tz.mp4',
                rarity:['3000','N','8.50%']
              },
              {
                url:'/library/libraryList/cs15.png',
                text:'library_copywriting_119',
                // content:'library_copywriting_84',
                content:'library_copywriting_120',
                mp4Url:'https://www.atta.zone/series20.mp4',
                // nolist:[50,10,0,5,5],
                // desc:['011','03','1','001','050']
              },
            ]
          },
          {
            img01:'/library/libraryTitle/library05.png',//左边大图
            title:'library_copywriting_6',//标题
            text01:'library_copywriting_13',//右侧内容第一段
            remark:'',//右侧备注
            logo:'/library/yanran.png',//右侧logo
            detailName:'',
          },
          {
            img01:'/library/libraryTitle/library06.png',//左边大图
            title:'library_copywriting_7',//标题
            text01:'library_copywriting_14',//右侧内容第一段
            remark:'',//右侧备注
            logo:'',//右侧logo
            imgName:'manghe',
            detailName:'tr',
            imgsList:[
              {
                url:'/library/libraryList/mh01.png',
                text:'library_copywriting_89',
                content:'library_copywriting_90',
                mp4Url:'https://www.bazhuayu.io/upload/v2data/2021-08-19/85310bef-bde7-4eea-b497-f44af33104f7.mp4',
                nolist:[200,50,50,0,''],
                desc:['080','01','1','001','200']
              },
              {
                url:'/library/libraryList/mh06.png',
                text:'library_copywriting_99',
                content:'library_copywriting_100',
                mp4Url:'https://www.bazhuayu.io/upload/v2data/2021-08-19/eb9ba69d-60ac-4ddb-9861-d6821f852127.mp4',
                nolist:[730,100,100,0,''],
                desc:['080','02','1','001','730']
              },
              {
                url:'/library/libraryList/mh07.png',
                text:'library_copywriting_101',
                content:'library_copywriting_102',
                mp4Url:'https://www.bazhuayu.io/upload/v2data/2021-08-19/18f1cb1d-4d54-4f4a-a9d0-5b7b59dfc5a1.mp4',
                nolist:[1200,270,270,0,''],
                desc:['080','03','1','001','1200']
              },
              {
                url:'/library/libraryList/mh10.png',
                text:'library_copywriting_107',
                content:'library_copywriting_108',
                mp4Url:'https://www.bazhuayu.io/upload/v2data/2021-08-19/9dd79a18-68d5-4042-b83b-4cb239655436.mp4',
                nolist:[1200,169,169,0,''],
                desc:['080','04','1','001','1200']
              },
              {
                url:'/library/libraryList/mh02.png',
                text:'library_copywriting_91',
                content:'library_copywriting_92',
                mp4Url:'https://www.bazhuayu.io/upload/v2data/2021-08-19/1c93a571-6db3-4430-baeb-6ac6afdca16e.mp4',
                nolist:[200,56,56,0,''],
                desc:['081','01','1','001','200']
              },
              {
                url:'/library/libraryList/mh04.png',
                text:'library_copywriting_95',
                content:'library_copywriting_96',
                mp4Url:'https://www.bazhuayu.io/upload/v2data/2021-08-19/88ca6573-46de-4330-a9ba-18535fb45cef.mp4',
                nolist:[730,181,181,0,''],
                desc:['081','02','1','001','730']
              },
              {
                url:'/library/libraryList/mh11.png',
                text:'library_copywriting_109',
                content:'library_copywriting_110',
                mp4Url:'https://www.bazhuayu.io/upload/v2data/2021-08-19/483b235e-f366-41d1-b582-af9c5bbdd76f.mp4',
                nolist:[1200,333,333,0,''],
                desc:['081','03','1','001','1200']
              },
              {
                url:'/library/libraryList/mh08.png',
                text:'library_copywriting_103',
                content:'library_copywriting_104',
                mp4Url:'https://www.bazhuayu.io/upload/v2data/2021-08-19/c9119888-959a-4ba7-b7b1-2d81cdd266ce.mp4',
                nolist:[1200,307,307,0,''],
                desc:['081','04','1','001','1200']
              },
              {
                url:'/library/libraryList/mh03.png',
                text:'library_copywriting_93',
                content:'library_copywriting_94',
                mp4Url:'https://www.bazhuayu.io/upload/v2data/2021-08-19/38942816-fa64-4ef7-be36-51955879772e.mp4',
                nolist:[200,54,54,0,''],
                desc:['082','01','1','001','200']
              },
              {
                url:'/library/libraryList/mh05.png',
                text:'library_copywriting_97',
                content:'library_copywriting_98',
                mp4Url:'https://www.bazhuayu.io/upload/v2data/2021-08-19/827a2541-0cd6-4d58-b87d-b964bb656782.mp4',
                nolist:[740,177,177,,0,''],
                desc:['082','02','1','001','740']
              },
              {
                url:'/library/libraryList/mh12.png',
                text:'library_copywriting_112',
                content:'library_copywriting_113',
                mp4Url:'https://www.bazhuayu.io/upload/v2data/2021-08-19/1a05d52e-1edd-4419-a2a4-e9a1f545bfdd.mp4',
                nolist:[1200,300,300,0,''],
                desc:['028','04','1','001','1200']
              },
              {
                url:'/library/libraryList/mh09.png',
                text:'library_copywriting_105',
                content:'library_copywriting_106',
                mp4Url:'https://www.bazhuayu.io/upload/v2data/2021-08-19/9c1e11ec-8162-4af8-8cef-325e5461a045.mp4',
                nolist:[1200,290,290,0,''],
                desc:['082','04','1','001','1200']
              }
            ]
          },
          {
            img01:'/library/libraryTitle/attaGame.jpg',//左边大图
            title:'library_copywriting_8_new',//标题
            text01:'library_copywriting_15_new',//右侧内容第一段
            remark:'',//右侧备注
            logo:'',//右侧logo
            detailName:'br',
            imgsList:[
              {
                url:'/library/libraryList/attaGame1.png',
                text:'library_copywriting_34_7_new',
                content:'library_copywriting_121_7',
                mp4Url:'/library/libraryList/attaGame01.png',
                mediaType:'image',
                nolist:[650,650,'',650,''],
                descText:'2 （ERC1155標準鑄造）',
                descTextEn:'2 （Minted in ERC1155 standard）'
              },
              {
                url:'/library/libraryList/attaGame2.png',
                text:'library_copywriting_35_7_new',
                content:'library_copywriting_122_7',
                mp4Url:'/library/libraryList/attaGame02.png',
                mediaType:'image',
                nolist:[300,300,'',300,''],
                descText:'1 （ERC1155標準鑄造）',
                descTextEn:'1 （Minted in ERC1155 standard）'
              },
              {
                url:'/library/libraryList/attaGame3.jpg',
                text:'library_copywriting_36_7_new',
                content:'library_copywriting_123_7',
                mp4Url:'/library/libraryList/attaGame03.png',
                mediaType:'image',
                nolist:[50,50,'',50,''],
                descText:'0 （ERC1155標準鑄造）',
                descTextEn:'0 （Minted in ERC1155 standard）'
              }
            ]
          },
        ]
      }
  },
  name: "library",
  props: {
    msg: String,
  },
  setup() {
    const lang = getCookie("lg") == "en" ? "EN" : "TC";
    const modelBol = ref(false);
    const moreNumber = ref(0);
    const moreBtn = (index: number)=>{
      if(moreNumber.value == index){
        moreNumber.value = 0;
      }else{
        moreNumber.value = index;
      }
    }
    const contents = ref({})
    // item:父级 index:第几个父级 info:子集  num:第几个子集
    const openModal = (item,index,info,num)=>{
      if(!info.url) return;
      let data = {
        url:index==1?info.url:info.mp4Url,//大图
        title:info.text,//标题
        content:info.content?info.content:'',//详情文案
        type:index&&index==1?'img':'video',
        APtotal:info.noAPlist?info.noAPlist[0]:'',//总版数
        APminted:info.noAPlist?info.noAPlist[1]:'',//已经铸造数量
        APBSC:info.noAPlist?info.noAPlist[2]:'',
        APETH:info.noAPlist?info.noAPlist[3]:'',
        APnftnumber:info.noAPlist?info.noAPlist[4]+'':'',
        APdesc:info.APdesc?info.APdesc:'',//编号及说明
        total:info.nolist?info.nolist[0]:'',//总版数
        minted:info.nolist?info.nolist[1]:'',//已经铸造数量
        BSC:info.nolist?info.nolist[2]:'',
        ETH:info.nolist?info.nolist[3]:'',
        nftnumber:info.nolist?info.nolist[4]+'':'',
        mediaType:info.mediaType?info.mediaType:'',
        desc:info.desc?info.desc:'',//编号及说明
        rarity:info.rarity?info.rarity:'',
        descText:!info.descText?'':lang=='TC'?info.descText:lang=='EN'?info.descTextEn:''
      }
      contents.value = data;
      modelBol.value = true;
    }
    const closeNet = ()=>{
      modelBol.value = false;
      contents.value = {};
    }

    return {
      moreBtn,
      moreNumber,
      modelBol,
      openModal,
      contents,
      closeNet,
      lang
    }
  }

});