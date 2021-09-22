
import { defineComponent,onMounted,ref,computed } from "vue";
import { chainSetting } from "../../../../../../assets/js/chainSetting";
import { useI18n } from "vue-i18n";
import axios from "../../../../../../api";
import { ElMessage } from 'element-plus'
export default defineComponent({
  name: "kplRanking",
  props: {
    contents : Object
  },
  setup(props, context){
    const { locale, t } = useI18n();
    const isEn = computed(() => {
      return locale.value.trim() == "en";
    });
    const titletipsRef = ref(null);
    const tipNone = ref(false);
    const chainId = ref(0);
    const targetChainId = ref('');
    const data:any = ref(props.contents);
    const numtp = ref(data.value.tpnum);
    onMounted(()=>{
      let domText:any = titletipsRef.value;
      console.dir(domText);
      if (data.value.tpnum) {
        data.value.tpnum = 1;
      }
      if(domText && domText.scrollWidth > 180){
        tipNone.value = true;
      }
    });
    const closeNet = () => {
      context.emit('closeNet')
    }
    const confirmbtn = () => {
      context.emit('confirmbtn',data)
    }
    const addtpnum = () => {
      if (data.value.tpnum >= numtp.value) {
        return;
      }
      data.value.tpnum = data.value.tpnum + 1;
    }
    const jiantpnum = () => {
      if (data.value.tpnum <= 1) {return ;}
      data.value.tpnum = data.value.tpnum - 1;
    }
    const submitbtn = () => {
      data.value.titletips = 'esports_kpl75';
      data.value.content = `您選擇了${data.value.tpnum}張投票券，請確認`;
      if(isEn.value){
        data.value.content = `You’ve selected ${data.value.tpnum} voting voucher(s)，please confirm`;
      }
      data.value.rankingtypeshow = 4;
      data.value.btn1show = '1';
      data.value.btn2show = '9';
      data.value.tpnum2 = data.value.tpnum;
      data.value.tpnum = null;
    }
    // 点击兑换面具的兑换
    const exchangenowbtn = async () => {
      chainId.value = await window.CHAIN.WALLET.chainId();
      let arr = data.value.list.lplNft.SR.concat(data.value.list.lplNft.R,data.value.list.lplNft.N);
      let arr2 = [];
      arr.forEach(item => {
        if (chainId.value == 97) {
          arr2.push('0xc591be7A2f0999E0de9Edab0e07bddD4E1ee954f');
        }else{
          arr2.push('0xf576BB0862b53bd5fd55f8E3cd956119aB34a89E');
        }
      });
      const web3 = new window.Web3(window.CHAIN.WALLET.provider());
      chainId.value = web3.utils.hexToNumber(chainId.value);
      switch (chainId.value) {
        case 1:
          targetChainId.value = '1';
          break;
        case 4:
          targetChainId.value = '4';
          break;
        case 56:
          targetChainId.value = '56';
          break;
        case 97:
          targetChainId.value = '97';
          break;
      }
      if (chainId.value != Number(targetChainId.value)) {window.CHAIN.WALLET.switchRPCSettings(targetChainId.value);}
      let auctionAddress =chainSetting["contractSetting"]["blindbox_ERC721"][targetChainId.value].address;
      var auctionAddressABI = chainSetting["contractSetting"]["blindbox_ERC721"]["abi"];
      var auctionAddressInstance = new web3.eth.Contract(
        auctionAddressABI,
        auctionAddress
      );
      auctionAddressInstance.methods
        .safeBatchTransferFrom(data.value.address, arr2, arr)
        .send({
          from: data.value.address,
        })
        .then(function (res: any) {
          if (res.transactionHash && res.from ) {
            dycallinterface(res);
          }
        });
    }
    const dycallinterface = (res) => {
      axios
      .post(window.base_url + "/attaExchange/exchangeMask", {
        "address": res.from ,
        "amount": data.value.list.amount,
        "txhash": res.transactionHash
      })
      .then((res: any) => {
        if (res.code == 0) {
          data.value.titletips = 'esports_kpl53';
          data.value.content = 'esports_kpl85';
          data.value.rankingtypeshow = 4;
          data.value.btn1show = '999';//999 不展示此按钮
          data.value.btn2show = '1';
          data.value.tips = null;
        }
      });
    }
    const loading = ref(false);
    // 点击领取atta面具或者Loot 入場券
    const collectvotingticketsbtn = (type) => {
      loading.value = true;
      axios
      .post(window.base_url + "/attaExchange/getUnclaimedInfo", {
        "address": data.value.address,
        "type": type,//1   2
      })
      .then((res: any) => {
        loading.value = false;
        if (res.code == 0) {
          if (type == 1) {
            data.value.titletips = 'esports_kpl87';
            data.value.content = null;
            data.value.rankingtypeshow = 2;
            data.value.btn1show = '1';//999 不展示此按钮
            data.value.btn2show = '2';
            data.value.tips = 'esports_kpl88';
            data.value.list2 = res.data;
            data.value.unclaimed = res.data.unclaimed;//个
            data.value.ticketAmount = res.data.ticketAmount;//张
            data.value.type = type;
            
          }else{
            data.value.titletips = 'esports_kpl96';
            data.value.rankingtypeshow = 2;
            data.value.btn1show = '1';//999 不展示此按钮
            data.value.btn2show = '2';
            data.value.tips = 'esports_kpl97';
            data.value.list2 = res.data;
            data.value.type = type;
            data.value.unclaimed = res.data.unclaimed;//个
            data.value.ticketAmount = res.data.ticketAmount;//张
          }
        }else if (res.code == 1001) {
          ElMessage.warning({
            message: res.message,
            type: 'warning'
          });
        }
      }).catch(err=>{
        loading.value = false;
      });
    }
    const nowreceive = () => {
      axios
      .post(window.base_url + "/attaExchange/claimTicket", {
        "address": data.value.address,
        "type": data.value.type,//1   2
      })
      .then((res: any) => {
        if (res.code == 0) {
          data.value.titletips = 'esports_kpl91';
          data.value.content = 'esports_kpl92';
          data.value.rankingtypeshow = 4;
          data.value.btn1show = '999';//999 不展示此按钮
          data.value.btn2show = '7';
          data.value.tips = null;
        }else if (res.code == 1001) {
          ElMessage.warning({
            message: res.message,
            type: 'warning'
          });
        }
          
      });
    }
    const formatVideoUrl2 = (item) => {
      return window.base_url + item;
    };
    return{
      title1 : 'esports_kpl51', 
      title2 : 'esports_kpl53', 
      data,
      closeNet,
      confirmbtn,
      addtpnum,
      jiantpnum,
      submitbtn,
      exchangenowbtn,
      dycallinterface,
      collectvotingticketsbtn,
      nowreceive,
      formatVideoUrl2,
      titletipsRef,
      tipNone,
      isEn,
      loading
      }
  }
});