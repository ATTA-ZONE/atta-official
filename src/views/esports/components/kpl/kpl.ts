
import { defineComponent,ref ,onMounted,computed} from "vue";
import { useI18n } from "vue-i18n";
import axios from "../../../../api";
import kplRanking from "./components/kplRanking/kplRanking.vue";
export default defineComponent({
  components: {kplRanking},
  name: "kpl",
  props: {
    msg: String,
  },
  setup(){
    const loading = ref(false)
    //战队头像
    const { locale, t } = useI18n();
    const teamHeaderB = ref();
    const kplinfo = ref([]);
    const kpllist = ref([]);
    const showkplindex = ref(0);
    const kplbsstatus = ref(0); //0 进行中 1 已结束 2 未开始
    const address = ref(''); //0 进行中 1 已结束 2 未开始
    const kplRankingshow = ref(false); //0 进行中 1 已结束 2 未开始
    const contents = ref({}); //0 进行中 1 已结束 2 未开始
    teamHeaderB.value = [
      '/kpl/header.png','/kpl/header.png','/kpl/header.png','/kpl/header.png','/kpl/header.png'
    ];
    // 用户头像  前四名
    const teamUserA = ref();
    const teamUserB = ref();
    teamUserA.value = [
      '/kpl/header.png','/kpl/header.png','/kpl/header.png','/kpl/header.png'
    ];
    teamUserB.value = [
      '/kpl/header.png','/kpl/header.png','/kpl/header.png','/kpl/header.png'
    ];
    // nft奖励部分的数据
    const kplNft = ref();
    kplNft.value = [
      {
        fromName:'由XXXX提供',
        award:"2000張 卡牌+Key一枚",
        win:"胜方投票NO.3",
        url:"/kpl/test.png"
      },
      {
        fromName:'由XXXX提供',
        award:"2000張 卡牌+Key一枚",
        win:"胜方投票NO.3",
        url:"/kpl/test.png"
      },
      {
        fromName:'由XXXX提供',
        award:"2000張 卡牌+Key一枚",
        win:"胜方投票NO.3",
        url:"/kpl/test.png"
      },
      {
        fromName:'由XXXX提供',
        award:"2000張 卡牌+Key一枚",
        win:"胜方投票NO.3",
        url:"/kpl/test.png"
      }
    ]
    const isEn = computed(() => {
      return locale.value.trim() == "en";
    });
    const computekpltimeshowword = (data) => {
      let curTime = data.curTime;
      let endTime = data.endTime;
      let startTime = data.startTime;
      if (startTime > curTime) {
        if (endTime > curTime) {
          kplbsstatus.value = 1;
          return 'esports_kpl23'
        }
        return 'esports_kpl22'
      }else{
        kplbsstatus.value = 2;
        return 'esports_kpl22_jia'
      }
    };
    const scrollviewbtn = () => {
      let homePage = document.querySelector(".kpl-notice-header");
      homePage.scrollIntoView(true);
    }
    const beforeclick = (index) => {
      if (index == 0) {return;}
      showkplindex.value = index - 1;
    }
    const nextclick = (index) => {
      if (index == kplinfo.value.length - 1) {return;}
      showkplindex.value = index + 1;
    }
    const getkplph = () =>{
      axios
      .post(window.base_url + "/v2/match/bet_sort", {
        pageSize : 10,
      })
      .then((res: any) => {
        if (res.code == 0) {
          let data = {list : [],rankingtypeshow : 1};
          kplRankingshow.value = true;
          data.list = res.data;
          contents.value = data;
        }
      });
    }
    const closeNet = () => {
      kplRankingshow.value = false;
    }
    const confirmbtn = () => {
      kplRankingshow.value = false;
    }
    const voteclick = (tpnum) =>{
      if (address.value) {
        if (tpnum > 0) {
          
        }else{
          alert('您的钱包内没有可以投票的NFT噢~')
        }
      }else{
        ljwatter();
      }
    }
    const collectcouponsbtn = () => {
      axios
      .post(window.base_url + "/attaExchange/getUnclaimedInfo", {
        "address": address.value,
        "type": 2,//1   2
      })
      .then((res: any) => {
        if (res.code == 0) {
          console.log(res.data);
        }
      });
    }
    const exchangemask = () => {
      let requestUrl = window.base_url + '/attaExchange/queryExchangeInfo?address=' + address.value;
      loading.value = true;
      axios.get(requestUrl).then((res: any) => {
        loading.value = false;
        if (res.code == 0) {
          let data = {list : [],rankingtypeshow : 2};
          kplRankingshow.value = true;
          data.list = res.data;
          contents.value = data;
        }
      }).catch(err=>{
        loading.value = false;
      });
    }
    onMounted(()=>{
      if (window.CHAIN.WALLET) {
        ljwatter();
      }else{
        getkpllistdata();
      }
    })
    const ljwatter = () => {
      window.CHAIN.WALLET.enable().then((res) => {
        if (res.length) {
          address.value = res[0];
          getkpllistdata();
        }else{
          getkpllistdata();
        }
      });
    }
    const getkpllistdata = () => {
      const bool = isEn.value ? "en" : "tc";
      axios
        .post(window.base_url + "/v2/match/list_lol", {
          address : address.value,
          lang: bool,
        })
        .then((res: any) => {
          if (res.code == 0) {
            console.log(res);
            let matchId = res.data.matchId;
            res.data.matchRes.forEach((item,index) => {
              if (item.id == matchId) {
                showkplindex.value = index;
                return;
              }
            });
            kplinfo.value = res.data.matchRes;
            kpllist.value = res.data.betOrder;
          }
        });
    };
    return{
      teamHeaderB,
      teamUserB,
      teamUserA,
      kplNft,
      kplinfo,
      kpllist,
      showkplindex,
      kplbsstatus,
      address,
      kplRankingshow,
      contents,
      getkpllistdata,
      computekpltimeshowword,
      beforeclick,
      nextclick,
      scrollviewbtn,
      getkplph,
      voteclick,
      collectcouponsbtn,
      closeNet,
      confirmbtn,
      exchangemask,
      loading
    }
  }
});