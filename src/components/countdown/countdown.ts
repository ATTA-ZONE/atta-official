import { defineComponent, ref, computed, onMounted,onBeforeUnmount } from "vue";
import { ElInputNumber,ElCollapse,ElCollapseItem } from 'element-plus';
import { useI18n } from "vue-i18n";
import { getCookie, setCookie,getAbi,formatDate,moneyFormat } from "../../utils";
import { chainSetting } from "../../assets/js/chainSetting";
import axios from "../../api";

export default defineComponent({
  components: { ElInputNumber,ElCollapse,ElCollapseItem},
  emits: ["totalRewardPool","loadingBol"],
  setup(props,{emit}) {
    const modelTips = ref('');
    const MerkleDistributionInstance = getAbi("atta_vote_abi");
    const matchInfoList = ref();
    const web3 = ref();
    const matchList = async ()=>{//获取赛事信息列表
      const accounts = await window.CHAIN.WALLET.enable();
      walletId.value = accounts[0];
      
      let lang = getCookie("lg") == "en" ? "EN" : "TC";
      let formData = new FormData();
      formData.append("lang", lang);
      return new Promise((resolve, reject) => {
        axios.post(window.base_url + "/v2/match/list?address="+walletId.value, formData)
        .then((res:any) => {
          if(!res.code){
            let data = res.data;
            let idList:any = [];
            data.forEach((item:any,index:number) => {
              idList.push(item.matchTokenId);
              // if(item.status == 1) collapseIndex.value = index+1;
            })
            let content = {
              data,idList
            }
            resolve(content);
          }
        });
      })
    };
    const totalRewardPool = ref(0);//总奖池
    const curRewardPool = ref(0);//当前比赛分到的奖池
    const matchBusd = (data:any)=>{
      return new Promise((resolve, reject) => {
        axios.post(window.base_url + "/v2/activity/bet_pool?id=1", {})
        .then((res:any) => {
          totalRewardPool.value = res.data?res.data.totalRewardPool:0;
          emit('totalRewardPool',res.data?res.data.totalRewardPool:0 );
          curRewardPool.value = res.data?res.data.curRewardPool:0;
          resolve({res,data})
        });
      })
    }
    const nowDate = ()=>{
      axios.get(window.base_url + "/v2/match/get_cur_time", {})
      .then((res)=>{
        nowDataTime.value = res.data;
      })
      
    }
    const nowDataTime = ref(0);
    const batchRaceInfoFn = (data:any)=>{//通过链调取数据,比赛信息
      return new Promise((resolve, reject) => {
        // abi下的所有方法
        MerkleDistributionInstance.then(res=>{
          res.methods
          .batchRaceInfo(data.idList)
          .call()
          .then(function (res: any) {
            res[0].forEach((info: any,i:any) => {//遍历比赛时间,并添加到对应数据
              data.data[i].gameTime = info*1;
            })
            // nowDataTime.value = res[2];
            gameLists(data.data);
          }).catch((err:any)=>{
          });
        })
      })
    }
    const batchEstimateReward = (data:any,index:number) => {//获取用户当前比赛投注信息 data:当前比赛信息，index当前第几行数据
      const walletType = getCookie(window.CHAIN.WALLET.__wallet__);
      if (walletType) {
        web3.value = new window.Web3(window.CHAIN.WALLET.provider());
      } else if (window.ethereum) {
        web3.value = new window.Web3(window.ethereum);
      }
      return new Promise((resolve, reject) => {
        if(matchInfoList.value[index].attaMatchOptions.length){//存在比赛队伍，且有数据
          // abi下的所有方法
          let matchTokenId = matchInfoList.value[index].matchTokenId;
          let optionId = matchInfoList.value[index].attaMatchOptions;
          // 获取的abi下的batchEstimateReward方法：0：当前钱包，1：matchTokenId  2：比赛战队的id
          MerkleDistributionInstance.then(res=>{
            res.methods
            .batchEstimateReward([walletId.value,walletId.value],[matchTokenId,matchTokenId],[optionId[0].id,optionId[1].id])
            .call()
            .then((res01: any)=>{
              matchInfoList.value[index].temaAAll = moneyFormat(Math.floor(web3.value.utils.fromWei(res01[0])));
              matchInfoList.value[index].temaBAll = moneyFormat(Math.floor(web3.value.utils.fromWei(res01[1])));
            }).catch((err:any)=>{
            });
          })
        }else{
          matchInfoList.value[index].temaAAll = 0;
          matchInfoList.value[index].temaBAll = 0;
        }
      })
    }
    // 对数据进行重装
    const gameLists = (data:any)=>{
      data.forEach((info:any,i:any)=>{
        totalRewardPool.value = info.totalRewardPoolTemp;
        emit('totalRewardPool',info.totalRewardPoolTemp);
        info.attaMatchGameBetNow = ['','','','','',''];
        info.attaMatchGameBet.forEach((item:any)=>{
          if(item.optionsId == 1){
            if(item.betLevel == "N"){//第一队的N
              info.attaMatchGameBetNow[0] = item;
            }
            if(item.betLevel == "R"){//第一队的N
              info.attaMatchGameBetNow[1] = item;
            }
            if(item.betLevel == "SR"){//第一队的N
              info.attaMatchGameBetNow[2] = item;
            }
          }else{
            if(item.betLevel == "N"){//第一队的N
              info.attaMatchGameBetNow[3] = item;
            }
            if(item.betLevel == "R"){//第一队的N
              info.attaMatchGameBetNow[4] = item;
            }
            if(item.betLevel == "SR"){//第一队的N
              info.attaMatchGameBetNow[5] = item;
            }
          }
        })
        info.attaMatchUserBetNow = ['','','','','',''];
        info.attaMatchUserBet.forEach((item:any)=>{
          if(item.optionsId == 1){
            if(item.betLevel == "N"){//第一队的N
              info.attaMatchUserBetNow[0] = item;
            }
            if(item.betLevel == "R"){//第一队的N
              info.attaMatchUserBetNow[1] = item;
            }
            if(item.betLevel == "SR"){//第一队的N
              info.attaMatchUserBetNow[2] = item;
            }
          }else{
            if(item.betLevel == "N"){//第一队的N
              info.attaMatchUserBetNow[3] = item;
            }
            if(item.betLevel == "R"){//第一队的N
              info.attaMatchUserBetNow[4] = item;
            }
            if(item.betLevel == "SR"){//第一队的N
              info.attaMatchUserBetNow[5] = item;
            }
          }
        })
        if(info.startTime > 0){
          info.gameDate = info.startTime?formatDate(((info.startTime*1))*1000):'';
        }
      })
      matchInfoList.value = data;
    }    
    const collapseIndex = ref();
    // 展开的时候处理计时器
    const collapseChange = (data:any)=>{
      nowDate();
      collapseIndex.value = data;
      setTimeout(()=>{
        window.clearInterval(timeStart.value);//关闭计时器
        hours.value = 0;
        minutes.value = 0;
        seconds.value = 0;
        matchInfoList.value.forEach((item:any,index:number)=>{
          if(item.id == data){//找到当前打开的数据
            if(nowDataTime.value <= item.gameTime && item.teamA != 'TBD' && item.teamB != 'TBD'){
              if(item.gameTime && (item.gameTime > (nowDataTime.value - 300))){//比赛时间确认，且比赛时间在当前时间5m之后
                let gameTime = JSON.parse(JSON.stringify(item.gameTime));
                let nowTime = JSON.parse(JSON.stringify(nowDataTime.value));
                timeDown(nowTime,gameTime)
              }
              // else{
              //   let gameTime = JSON.parse(JSON.stringify(item.gameTime));
              //   let nowTime = JSON.parse(JSON.stringify(nowDataTime.value));
              //   timeDown(nowTime,gameTime)
              // }
            }
            batchEstimateReward(item,index)
          }
        })
      },500)
    }
    const timeContent = ref();
    onMounted(() => {
      nowDate();
      window.clearInterval(timeContent.value);//关闭计时器
      window.clearInterval(timeStart.value);//关闭计时器
      emit('loadingBol',true )
      matchList().then(res=>{
        batchRaceInfoFn(res);
      }).then(()=>{
        geteveryqkl();
        onMountedTime();
      })
    });
    const onMountedTime = ()=>{
      timeContent.value = window.setInterval(()=>{
        matchList().then(res=>{
          batchRaceInfoFn(res);
        }).then(()=>{
          geteveryqkl();
          collapseChange(collapseIndex.value)
        })
      },10000)
    }
    onBeforeUnmount(()=>{
      window.clearInterval(timeContent.value);//关闭计时器
      window.clearInterval(timeStart.value);//关闭计时器
    })
    const { locale, t } = useI18n();
    const isEn = computed(() => {
      return locale.value.trim() == "en";
    });
    const hours = ref(0);
    const minutes = ref(0);
    const seconds = ref(0);
    const timeStart = ref();//计时器
    // 倒计时函数
    const setTime = ()=>{
      timeStart.value = window.setInterval( ()=> {
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
      }, 1000)
    };
    // 时间戳转换
    const allTime = ref(0);
    const timeDown = (startTime:number,endTime:number)=>{
      allTime.value = (endTime - startTime)*1;
      let leftTime = endTime - startTime;
      
      if(leftTime <= 0) return;
      hours.value = parseInt(((leftTime / (60 * 60)))+'');
      minutes.value = parseInt(((leftTime / 60) % 60)+'');
      seconds.value = parseInt((leftTime % 60)+'');
      setTime()
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
    const targetChainId = ref('');
    const walletId = ref('');
    const chainId = ref();
    const tokenarr: any = ref([]);
    const geteveryqkl = async () => {
      chainId.value = await window.CHAIN.WALLET.chainId();
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
      let auctionAddress = chainSetting["contractSetting"]["atta_match"][targetChainId.value].address;
      let requestUrl = window.scansite_base_url + "/api?module=account&action=tokennfttx&contractaddress=" +auctionAddress +"&address=" + walletId.value +"&sort=desc&apikey=" + window.apikey;
      axios.get(requestUrl).then((res: any) => {
        let nftData = res.result;
        if (!nftData || nftData.length < 1 || !Array.isArray(nftData)) {
          emit('loadingBol',false )
          return false;
        }
        let obj = {};
        let arr: any = [];
        for (let i = 0; i < nftData.length; i++) {
          const token: any = nftData[i].tokenID;
          const nft: any = nftData[i];
          if (!obj[token]) {
            obj[token] = true;
            let jsonData = {
              tokenID: token,
              listdata: [nft],
              tojia: 0,
              fromjian: 0,
            } as any;
            arr.push(jsonData);
          } else {
            arr.forEach((item: any) => {
              if (item.tokenID == nftData[i].tokenID) {
                item.listdata.push(nftData[i]);
              }
            });
          }
        }
        arr.forEach((item: any) => {
          item.listdata.forEach((json) => {
            if (json.to.toUpperCase() == walletId.value.toUpperCase()) {
              item.tojia += 1;
            }
            if (json.from.toUpperCase() == walletId.value.toUpperCase()) {
              item.fromjian -= 1;
            }
          });
          item.jsnum = item.tojia + item.fromjian;
          if (item.jsnum == 1) {
            tokenarr.value.push(item.tokenID);
          }
        });
        getAssetsList(tokenarr.value);
      });
    };
    const formContent = ref()
    // 获取用户未使用的NFT
    const getAssetsList = (data:any)=>{
      let info = {
        address:walletId.value,
        nftList:data
      };
      axios.post(window.base_url + "/v2/match/getUnusedNft", info)
      .then((res:any) => {
        if(!res.code){
          formContent.value = res.data;
        }else{
          formContent.value = undefined;
        } 
        emit('loadingBol',false )
      }).catch(err=>{
        emit('loadingBol',false )
      });
    }
    
    //停止页面滚动
    const stopMove = ()=>{
      // document.body.style.height = "100vh";
      // document.body.style.overflow='hidden';
    };
    //开启页面滚动
    const Move = ()=>{
      // document.body.style.height = "";
      // document.body.style.overflow='';//出现滚动条
    };
    
    // 弹框展示
    const dialogBol = ref(false);//弹框是否展示
    const dialogBolVote = ref(true);//是否有投票权限
    const voteType = ref(1);//投票步骤
    const dialogOptionId = ref();
    const dialogMatchTokenId = ref();
    const openDialog = (optionId:any,matchTokenId:any)=>{
      stopMove()
      dialogOptionId.value = optionId.id;
      dialogMatchTokenId.value = matchTokenId;
      let bol = formContent.value;
      if(!formContent.value || Object.keys(bol).length <= 0){
        voteType.value = 1;
        dialogBolVote.value = false;
        dialogBol.value = true;
      }else{
        voteType.value = 1;
        dialogBolVote.value = true;
        dialogBol.value = true;
      }
    }
    const loadingDialog = ref(false);
    const axiosFrom = ()=>{//提交数据
      let NFTList = [];
      if(SRNumber.value > 0){
        let arr = formContent.value['SR'].slice(0, SRNumber.value);
        NFTList = NFTList.concat(arr);
      }
      if(RNumber.value > 0){
        let arr = formContent.value['R'].slice(0, RNumber.value);
        NFTList = NFTList.concat(arr);
      }
      if(NNumber.value > 0){
        let arr = formContent.value['N'].slice(0, NNumber.value);
        NFTList = NFTList.concat(arr);
      }  
      loadingDialog.value = true;
      // 监听 网络切换 会 让 用户 处于 正确的网络，这里 只负责 配置 当前网络下正确的 合约地址
      MerkleDistributionInstance.then(res=>{
        res.methods
        .stake(NFTList,dialogOptionId.value,dialogMatchTokenId.value)
        .send({from: walletId.value})
        .then((res: any)=>{
          loadingDialog.value = false;
          voteType.value = voteType.value+1;
        }).catch((err:any)=>{
          loadingDialog.value = false;
          closeDialog();
        })
      })
    }
    // 继续下一步
    const voteStepFn = ()=>{
      modelTips.value = '';
      if(voteType.value == 2){
        if(SRNumber.value > 0 || RNumber.value > 0 || NNumber.value > 0){
          axiosFrom()
        }else{
          if(isEn.value){
            tips("You haven't selected any NFTs to vote.")
          }else{
            tips("您還未選擇任何NFT進行投票~")
          }
        }
      }
      if(voteType.value == 3){
        Move();
        dialogBol.value = false;
        voteType.value = 1;
        SRNumber.value = 0;
        RNumber.value = 0;
        NNumber.value = 0;
        
        window.clearInterval(timeStart.value);//关闭计时器
        emit('loadingBol',true )
        setTimeout(()=>{
          matchList().then(res=>{
            batchRaceInfoFn(res);
          }).then(()=>{
            geteveryqkl();
          })
          collapseChange(collapseIndex.value)
        },3000)
      }else if(voteType.value == 1){
        voteType.value = voteType.value+1;
      } 
    }
    // 关闭弹框
    const closeDialog = ()=>{
      Move()
      dialogBol.value = false;
      voteType.value = 1;
      SRNumber.value = 0;
      RNumber.value = 0;
      NNumber.value = 0;
    }
    const SRNumber = ref(0);
    const RNumber = ref(0);
    const NNumber = ref(0);
    const tips = (txt:string)=>{
      modelTips.value = txt;
      setTimeout(()=>{
        modelTips.value = '';
      },3000)
    }
    const unDialog = ()=>{
      if(isEn.value){
        tips("Voting is not open yet.")
      }else{
        tips("投票尚未開始~")
      }
    }
    const moneyFormatNum = (num)=>{
      return moneyFormat(num*1)
    }
    return {
      hour,
      minute,
      second,
      allTime,
      isEn,
      dialogBol,
      SRNumber,
      RNumber,
      NNumber,
      dialogBolVote,
      voteType,
      voteStepFn,
      closeDialog,
      moneyFormatNum,
      matchInfoList,
      collapseChange,
      nowDataTime,
      curRewardPool,
      formContent,
      openDialog,
      loadingDialog,
      modelTips,
      collapseIndex,
      unDialog
    }
  }
});