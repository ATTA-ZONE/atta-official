
import { defineComponent,ref ,onMounted,computed,onBeforeUnmount} from "vue";
import { useI18n } from "vue-i18n";
import axios from "../../../../api";
import kplRanking from "./components/kplRanking/kplRanking.vue";
import { useRouter } from "vue-router";
import { ElMessage } from 'element-plus'
import { getCookie } from "../../../../utils";

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
    const kplinfo = ref([]);
    const kpllist = ref([]);
    const showkplindex = ref(0);
    const kplbsstatus = ref(0); //0 进行中 1 已结束 2 未开始
    const address = ref(getCookie('currentAddress') ? getCookie('currentAddress') : ''); //0 进行中 1 已结束 2 未开始
    const kplRankingshow = ref(false); //0 进行中 1 已结束 2 未开始
    const contents = ref({}); //0 进行中 1 已结束 2 未开始
    const router = useRouter();
    const hours = ref(0);
    const minutes = ref(0);
    const seconds = ref(0);
    const allTime = ref(0);
    const endTimevariable = ref(0);
    const timeStart = ref();//计时器
    const kplpmfour:any = ref([
      {imgUrl : '/kpl/kpl_img1_top.png',pm : 1},
      {imgUrl : '/kpl/kpl_img2_top.png',pm : 2},
      {imgUrl : '/kpl/kpl_img3_top.jpg',pm : 3},
      {imgUrl : '/kpl/kpl_img4_top.jpg',pm : 4},
    ]);
    const kplteamlistimgs:any = ref([
      '/kpl/teams_img1.png',
      '/kpl/teams_img2.png',
      '/kpl/teams_img3.png',
      '/kpl/teams_img4.png',
      '/kpl/teams_img5.png',
      '/kpl/teams_img6.png',
      '/kpl/teams_img7.png',
      '/kpl/teams_img8.png',
      '/kpl/teams_img9.png',
      '/kpl/teams_img10.png',
      '/kpl/teams_img11.png',
      '/kpl/teams_img12.png',
      '/kpl/teams_img13.png',
      '/kpl/teams_img14.png',
      '/kpl/teams_img15.png',
      '/kpl/teams_img16.png',
    ]);
    const kplteamlistimgs2:any = ref([
      '/kpl/teams_img17.png',
      '/kpl/teams_img18.png',
      '/kpl/teams_img19.png',
      '/kpl/teams_img20.png',
      '/kpl/teams_img21.png',
      '/kpl/teams_img22.png',
      '/kpl/teams_img23.png',
      '/kpl/teams_img24.png',
      '/kpl/teams_img25.png',
      '/kpl/teams_img26.png',
      '/kpl/playgon.png',
      '/kpl/teams_img25.png',
    ]);
    const kplteamlistimgs3:any = ref([
      '/kpl/teams_img27.png',
      '/kpl/teams_img28.png',
      '/kpl/teams_img29.png',
      '/kpl/teams_img30.png',
      '/kpl/teams_img31.png',
      '/kpl/teams_img32.png',
      '/kpl/teams_img33.png',
    ]);
    const kplteamlistimgs4:any = ref([
      '/kpl/teams_img34.png',
      '/kpl/teams_img35.png',
      '/kpl/teams_img36.png',
      '/kpl/teams_img37.png'
    ]);
    // nft奖励部分的数据
    
    const isEn = computed(() => {
      return locale.value.trim() == "en";
    });
    const computekpltimeshowword = (data) => {
      let curTime = data.curTime;
      let endTime = data.endTime;
      let startTime = data.startTime;
      if (startTime < curTime && endTime > curTime) {
        kplbsstatus.value = 1;
        return 'esports_kpl23'
      }else if (endTime < curTime){
        return 'esports_kpl22'
      }else{
        kplbsstatus.value = 2;
        return 'esports_kpl22_jia'
      }
    };
    const formatDate = (now) => { 
      now = new Date(now * 1000)
      var year=now.getFullYear(); 
      var month=now.getMonth()+1; 
      var date=now.getDate(); 
      var hour=now.getHours(); 
      var minute=now.getMinutes(); 
      month = month < 10 ? '0'+ month : month;
      date = date < 10 ? '0'+ date : date;
      hour = hour < 10 ? '0'+ hour : hour;
      minute = minute < 10 ? '0'+ minute : minute;
      return year+"/"+month+"/"+date+" "+hour+":"+minute; 
    } 
    const scrollviewbtn = () => {
      let homePage:any = document.querySelector(".kpl-notice-header");
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
    const open2 = () => {
      ElMessage.warning({
        message: t('notBegin'),
        type: 'warning'
      });
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
          if (res.data.length < 10) {
            for (let i = 0; i < 10; i++) {
              if (!res.data[i]) {
                res.data.push({pm : i+1 ,ticketsno : true});
              }
            }
          }
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
          let obj = JSON.parse(JSON.stringify(kplinfo.value[showkplindex.value]))
          if (obj.curTime > obj.voteStartTime && obj.curTime < obj.voteEndTime) {
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
            ElMessage.warning({
              message: t('esports_kpl104'),
              type: 'warning'
            });
          }
          
        }else{
          let data = {titletips : 'esports_kpl68',content : '<span class="framethreejumppage">戳→  <a href="https://www.bazhuayu.io/mobile/tc/specialitem.html" target="_blank" style="color: #a9deee;">bazhuayu.io</a>   立刻購買</span>',rankingtypeshow : 3,btn2show : '1'};
          if(isEn.value){
            data = {titletips : 'esports_kpl68',content : '<span class="framethreejumppage">Visit  <a style="color: #a9deee;" href="https://www.bazhuayu.io/mobile/tc/specialitem.html" target="_blank">bazhuayu.io</a>   to purchase</span>',rankingtypeshow : 3,btn2show : '1'};
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
      if (address.value){
        let data = {titletips : 'esports_kpl86',rankingtypeshow : 3,btn1show : '2',btn2show : '6',address : address.value};
        kplRankingshow.value = true;
        contents.value = data;
      }else{
        ljwatter();
      }
    }
    // 点击 兌換面具
    const exchangemask = () => {
      if (address.value){
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
              // tips : 'esports_kpl79',
              address : address.value
            };
            data.list = res.data;
            kplRankingshow.value = true;
            contents.value = data;
          }else{
            ElMessage.warning({
              message: res.message,
              type: 'warning'
            });
          }
        }).catch(err=>{
          loading.value = false;
        });
      }else{
        ljwatter();
      }
    }
    onMounted(()=>{
      getkpllistdata();
      if(window.location.hash){
        setTimeout(()=>{
          if(document.getElementById("kplRules")){
            document.getElementById("kplRules").scrollIntoView();
          }
        },500)
      }
      window.clearInterval(timeStart.value);
      timeStart.value = window.setInterval(()=>{
        if (kplinfo.value[showkplindex.value]) {
          let obj = JSON.parse(JSON.stringify(kplinfo.value[showkplindex.value]));
            if (endTimevariable.value == 0) {
              endTimevariable.value = obj.curTime;
            }
            timeDown(endTimevariable.value,obj.voteEndTime);
        }
      },1000);
    })
    onBeforeUnmount(()=>{
      window.clearInterval(timeStart.value);//关闭计时器
    })
    const timeDown = (startTime:number,endTime:number)=>{
      allTime.value = (endTime - startTime)*1;
      let leftTime = endTime - startTime;
      if(leftTime <= 0) return;
      hours.value = parseInt(((leftTime / (60 * 60)))+'');
      minutes.value = parseInt(((leftTime / 60) % 60)+'');
      seconds.value = parseInt((leftTime % 60)+'');
      endTimevariable.value = endTimevariable.value + 1;
      setTime()
    };
    // 倒计时函数
    const setTime = ()=>{
      // timeStart.value = window.setInterval( ()=> {
        if (hours.value !== 0 && minutes.value === 0 && seconds.value === 0) {
            hours.value -= 1;
            minutes.value = 59;
            seconds.value = 59;
        } else if (hours.value === 0 && minutes.value !== 0 && seconds.value === 0) {
            minutes.value -= 1;
            seconds.value = 59;
        } else if (hours.value === 0 && minutes.value === 0 && seconds.value === 0) {
            seconds.value = 0
            window.clearInterval(timeStart.value);//关闭计时器
        } else if (hours.value !== 0 && minutes.value !== 0 && seconds.value === 0) {
            minutes.value -= 1;
            seconds.value = 59;
        } else {
            seconds.value -= 1;
        }
      // }, 1000)
    };
    // 防止数值小于10时，出现一位数
    const num = (n)=>{
      return n < 10 ? '0' + n : n
    };
    const second = computed(() => {
      return num(seconds.value)
    });
    const minute = computed(() => {
      return num(minutes.value)
    });
    const hour = computed(() => {
      return num(hours.value)
    });
    const ljwatter = () => {
      if (window.CHAIN.WALLET) {
        window.CHAIN.WALLET.enable().then((res) => {
          if (res && res.length) {
            address.value = res[0];
            getkpllistdata();
          }else{
            ElMessage.error(t('esports_kpl109'));
          }
        });
      }else{
        ElMessage.error(t('esports_kpl109'));
      }
    }
    const getkpllistdata = () => {
      loading.value = true;
      const bool = isEn.value ? "en" : "tc";
      axios
      .post(window.base_url + "/v2/match/list_lol?address="+address.value+'&lang='+bool)
      .then((res: any) => {
          loading.value = false;
          if (res.code == 0) {
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
      window.open("https://www.bazhuayu.io/mobile/tc/specialitem.html")
    }
    const jumppage1 = () => {
      window.open('https://www.atta.zone/headset?scrollview=true')
    }
    const formatVideoUrl = (item) => {
      return window.base_url + item;
    };
    const morerewards = () => {
      let data = {
        titletips : 'esports_kpl110',
        rankingtypeshow : 5,
        btn1show : '999'
      };
      kplRankingshow.value = true;
      contents.value = data;
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
      formatDate,
      loading,
      isEn,
      hours,
      minutes,
      seconds,
      second,
      minute,
      hour,
      toPay,
      jumppage1,
      formatVideoUrl,
      timeDown,
      morerewards,
      kplpmfour,
      kplteamlistimgs,
      kplteamlistimgs2,
      kplteamlistimgs3,
      kplteamlistimgs4
    }
  }
});