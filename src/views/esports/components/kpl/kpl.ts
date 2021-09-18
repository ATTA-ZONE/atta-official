
import { defineComponent,ref ,onMounted,computed} from "vue";
import { useI18n } from "vue-i18n";
import axios from "../../../../api";
import kplRanking from "./components/kplRanking/kplRanking.vue";
import { useRouter } from "vue-router";
export default defineComponent({
  components: {kplRanking},
  name: "kpl",
  props: {
    msg: String,
  },
  data(){
    return {
      kplpmfour : [
        {imgUrl : '/kpl/kpl_img1.png',pm : 1},
        {imgUrl : '/kpl/kpl_img2.png',pm : 2},
        {imgUrl : '/kpl/kpl_img2.png',pm : 3},
        {imgUrl : '/kpl/kpl_img2.png',pm : 4},
      ]
    }
  },
  setup(){
    const loading = ref(false)
    //战队头像
    const { locale, t } = useI18n();
    const kplinfo = ref([]);
    const kpllist = ref([]);
    const showkplindex = ref(0);
    const kplbsstatus = ref(0); //0 进行中 1 已结束 2 未开始
    const address = ref(''); //0 进行中 1 已结束 2 未开始
    const kplRankingshow = ref(false); //0 进行中 1 已结束 2 未开始
    const contents = ref({}); //0 进行中 1 已结束 2 未开始
    const router = useRouter();
    // nft奖励部分的数据
    
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
    // 点击 查看排行
    const getkplph = () =>{
      axios
      .post(window.base_url + "/v2/match/bet_sort", {
        pageSize : 10,
      })
      .then((res: any) => {
        if (res.code == 0) {
          let data = {list : [],rankingtypeshow : 1,titletips : 'esports_kpl51'};
          kplRankingshow.value = true;
          data.list = res.data;
          contents.value = data;
        }
      });
    }
    const closeNet = () => {
      kplRankingshow.value = false;
      getkpllistdata();
    }
    const confirmbtn = (res:any) => {
      console.log(res.value.rankingtypeshow);
      if (res.value.rankingtypeshow == 4) {
        let obj = JSON.parse(JSON.stringify(kplinfo.value[showkplindex.value]))
        axios
        .post(window.base_url + "/v2/match/voting_ticket", {
          "address": address.value,
          "matchId": obj.id,
          "optionsId": res.value.timeid,
          "usedAmount": res.value.tpnum2
        })
        .then((res: any) => {
          if (res.code == 0) {
            let data = {titletips : 'esports_kpl73',content : 'esports_kpl74',rankingtypeshow : 3,btn2show : '1'};
            kplRankingshow.value = true;
            contents.value = data;
          }
        });
      }
      kplRankingshow.value = false;
    }
    // 点击 投票
    const voteclick = (tpnum,timeid) =>{
      if (address.value) {
        if (tpnum > 0) {
          let data = {
            titletips : 'esports_kpl69',
            tips : 'esports_kpl70',
            content : `<span>${tpnum}个</span>`,
            rankingtypeshow : 4,
            btn2show : '8',
            tpnum : tpnum,
            timeid : timeid
          };
          kplRankingshow.value = true;
          contents.value = data;
          
        }else{
          let data = {titletips : 'esports_kpl68',content : '<span class="framethreejumppage">戳→  <a href="https://www.bazhuayu.io/mobile/tc/specialTool.html" target="_blank" style="color: #a9deee;">bazhuayu.io</a>   立刻購買</span>',rankingtypeshow : 3,btn2show : '1'};
          if(isEn.value){
            data = {titletips : 'esports_kpl68',content : '<span class="framethreejumppage">Visit  <a style="color: #a9deee;" href="https://www.bazhuayu.io/mobile/tc/specialTool.html" target="_blank">bazhuayu.io</a>   to purchase</span>',rankingtypeshow : 3,btn2show : '1'};
          }
          kplRankingshow.value = true;
          contents.value = data;
        }
      }else{
        ljwatter();
      }
    }
    // 领取投票券
    const collectcouponsbtn = () => {
      let data = {titletips : 'esports_kpl86',rankingtypeshow : 3,btn1show : '2',btn2show : '6',address : address.value};
      kplRankingshow.value = true;
      contents.value = data;
    }
    // 点击 兌換面具
    const exchangemask = () => {
      let requestUrl = window.base_url + '/attaExchange/queryExchangeInfo?address=' + address.value;
      loading.value = true;
      axios.get(requestUrl).then((res: any) => {
        loading.value = false;
        if (res.code == 0) {
          let data = {
            list:[],
            rankingtypeshow : 2,
            content : 'esports_kpl78',
            btn1show : '1',
            btn2show : '3',
            tips : 'esports_kpl79',
            address : address.value
          };
          data.list = res.data;
          kplRankingshow.value = true;
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
        .post(window.base_url + "/v2/match/list_lol?address="+address.value+'&lang='+bool)
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
    const toPay = ()=>{
      window.open("https://www.bazhuayu.io/mobile/tc/specialTool.html")
    }
    const jumppage1 = () => {
      router.push('/headset');
    }
    return{
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
      loading,
      isEn,
      toPay,
      jumppage1
    }
  }
});