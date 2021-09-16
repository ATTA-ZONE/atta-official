
import { defineComponent,ref ,onMounted,computed} from "vue";
import { useI18n } from "vue-i18n";
import axios from "../../../../api";
export default defineComponent({
  name: "kpl",
  props: {
    msg: String,
  },
  setup(){
    //战队头像
    const { locale, t } = useI18n();
    const teamHeaderB = ref();
    const kplinfo = ref([]);
    const kpllist = ref([]);
    const showkplindex = ref(0);
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
    onMounted(()=>{
      getkpllistdata();
    })
    const getkpllistdata = () => {
      const bool = isEn.value ? "en" : "tc";
      axios
        .post(window.base_url + "/v2/match/list_lol", {
          address : '0x87d0086b833ed0b0f52db3cd296ad89b77ef7c3b',
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
      getkpllistdata,
      kplinfo,
      kpllist,
      showkplindex
    }
  }
});