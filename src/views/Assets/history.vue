<template>
  <div class="history-container" v-loading="loading">
    <div class="history-items">
      <div>
        <div
          class="history-item"
          v-for="item in dataList"
          :key="item.timeStamp"
        >
          <div class="history-title">
            <div class="title-info">
              <span class="title-info-name">{{
                item.name || "ATTA Airdrop NFT"
              }}</span>
            </div>
            <div class="title-time">
              {{ timeFormat(item.timeStamp) }}
            </div>
          </div>
          <div class="history-desc">
            <div class="desc-info">
              <span
                class="desc-info-edtion"
                v-if="item.edition || item.editions"
                >{{ $t("ban2") }}{{ item.edition || item.editions
                }}{{ $t("ban") }}</span
              >
              <span class="desc-info-edtion" v-else>{{ $t("number") }}: 1</span>
            </div>
            <div class="desc-address">
              <div>
                {{ $t("oldaddress") }}
                <span class="desc-oldaddress">{{ item.from }}</span>
              </div>
              <div>
                {{ $t("changeaddress") }}
                <span class="desc-info-address">{{ item.to }}</span>
              </div>
            </div>
          </div>
          <div class="history-line"></div>
        </div>
      </div>
    </div>
  </div>
  <ul style="padding: 150px 0" v-if="dataList.length < 1">
    <li class="flex nothing">
      <div style="margin: 0 auto">{{ $t("noOperateRecord") }}</div>
    </li>
  </ul>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import axios from "../../api";
import { chainSetting } from "../../assets/js/chainSetting";
import { getCookie } from "../../utils";

export default defineComponent({
  name: "history",
  setup() {
    const dataList: any = ref([]);
    const loading = ref<boolean>(false);
    const web3 = ref();
    const chainId = ref(0);
    const targetChainId = ref("");

    const timeFormat = (str) => {
      const date = new Date(str);
      const Y = date.getFullYear() + "-";
      const M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      const D = date.getDate() + " ";
      const h = date.getHours() + ":";
      const m = date.getMinutes() + ":";
      const s = date.getSeconds();
      return Y + M + D + h + m + s;
    };

    const getNFT = async () => {
      let auctionAddress =
        chainSetting["contractSetting"]["atta_ERC721"][targetChainId.value]
          .address;
      let auctionAddress2 =
        chainSetting["contractSetting"]["blindbox_ERC721"][targetChainId.value]
          .address;
      let accounts = await window.CHAIN.WALLET.enable();
      let bscAd =
        window.scansite_base_url +
        "/api?module=account&action=tokennfttx&contractaddress=" +
        auctionAddress +
        "&address=" +
        accounts[0] +
        "&sort=desc&apikey=" +
        window.apikey;
      let bscAd2 =
        window.scansite_base_url +
        "/api?module=account&action=tokennfttx&contractaddress=" +
        auctionAddress2 +
        "&address=" +
        accounts[0] +
        "&sort=desc&apikey=" +
        window.apikey;
      return new Promise((resolve, reject) => {
        axios.get(bscAd).then((res: any) => {
          axios.get(bscAd2).then((res2: any) => {
            if (res.length < 1 && res2.length < 1) {
              loading.value = false;
              return false;
            }
            let nftData = res.result;
            nftData = nftData.concat(res2.result);
            let arr: any = [];
            for (let i = 0; i < nftData.length; i++) {
              if (arr.indexOf(nftData[i].timeStamp) < 0) {
                arr.push(nftData[i]);
              }
            }
            resolve(arr);
          });
        });
      });
    };

    const dealNFT = (id) => {
      return new Promise((resolve, reject) => {
        axios
          .get(window.base_url + "/v2/commodity/edition_basic_id", {
            params: {
              tokenTypeId: id,
              chainType: window.chainType,
              lang: getCookie("lg") == "en" ? "EN" : "TC",
            },
          })
          .then((itm) => {
            resolve(itm);
          });
      });
    };

    const getNftHistory = async () => {
      let nftList: any = await getNFT();
        for (let i = 0; i < nftList.length; i++) {
          let itm: any = await dealNFT(nftList[i].tokenID);
          if (itm.data) {
            nftList[i] = Object.assign(nftList[i], 0, {
              name: itm.data.name,
              edition: itm.data.edition,
            });
          }
          nftList[i].timeStamp *= 1000;
        }
        dataList.value.push(...nftList);
        loading.value = false;
      
    };

    const get1155History = async () => {
      let accounts = await window.CHAIN.WALLET.enable();
      const address1 = web3.value.eth.abi.encodeParameter(
        "address",
        accounts[0]
      );
      let bscAd: string = "";
      if (window.location.href.indexOf("atta.zone") > -1) {
        bscAd =
          "https://api.bscscan.com/api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address=0x777a1530ce62b144e083d4a7595f47c99a290a48&topic0=0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62&topic2=" +
          address1 +
          "&topic2_3_opr=or&topic3=" +
          address1 +
          "&apikey=9GRF9Q9HT18PBCHQQD84N7U2MGC6I1NE27";
      } else {
        bscAd =
          window.scansite_base_url +
          "/api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address=0xD752fc21081f154cC7d34f08aA57929A6f18B1Fe&topic0=0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62&topic2=" +
          address1 +
          "&topic2_3_opr=or&topic3=" +
          address1;
      }
      axios.get(bscAd).then((res: any) => {
        if (res.status == 1 && res.result.length > 0) {
          for (let i = 0; i < res.result.length; i++) {
            res.result[i].timeStamp =
              web3.value.utils.hexToNumber(res.result[i].timeStamp) * 1000;
            res.result[i] = Object.assign(res.result[i], 0, {
              from: res.result[i].topics[2]
                .split("000000000000000000000000")
                .join(""),
              to: res.result[i].topics[3]
                .split("000000000000000000000000")
                .join(""),
            });
            //let id = Number(res.result[i].data.slice(-128,-64))
          }
          dataList.value.push(...res.result);
        }
        loading.value = false;
      });
    };

    onMounted(async () => {
      loading.value = true;
      web3.value = new window.Web3(window.ethereum);
      chainId.value = await window.CHAIN.WALLET.chainId();
      switch (chainId.value) {
        case 1:
          targetChainId.value = "1";
          break;
        case 4:
          targetChainId.value = "4";
          break;
        case 56:
          targetChainId.value = "56";
          break;
        case 97:
          targetChainId.value = "97";
          break;
      }
      if (chainId.value == 56 || chainId.value == 97) {
        getNftHistory();
      }
      get1155History();
    });

    return {
      dataList,
      timeFormat,
      loading,
    };
  },
});
</script>
<style lang='scss'>
@media only screen and (max-width: 992px) {
  .history-items {
    font-size: 12px !important;
  }

  .filter-items,
  .filter-items li {
    display: inline-block;
  }
  .filter-items {
    font-size: 14px;
    opacity: 0.8;
    cursor: pointer;
    margin-top: 10px;
    margin-left: 18%;
    line-height: 1;
    display: inline-flex;
    flex: 1;
    justify-content: space-between;
  }
  .filter-wrap {
    font-size: 16px !important;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .filter-control {
    display: inline-block;
  }
  .filter-control img {
    display: none;
  }
  .history-desc {
    display: block !important;
  }
  .desc-info {
    justify-content: space-between;
  }
  .desc-address {
    margin-top: 6px;
  }
  .desc-info-edtion {
    margin-left: 0 !important;
    max-width: 36% !important;
  }
  .desc-info-address {
    display: block !important;
  }
  .desc-oldaddress {
    display: block;
    margin-bottom: 6px;
  }
}

.desc-info {
  display: flex;
  align-items: center;
}

.history-line {
  width: 60%;
  height: 1px;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  margin: 20px auto;
}

.recoverRequest,
.recoverRequest:hover {
  color: #ff1313;
  cursor: pointer;
}

.history-items {
  color: #fff;
  font-size: 16px;
}
.desc-address {
  // width: 550px;
  word-wrap: break-word;
}
.desc-info-address {
  color: #a8deee;
}
.selected-tag {
  color: #a8deee !important;
}
.history-title {
  display: flex;
  margin-top: 10px;
  padding: 0 20px;
  justify-content: space-between;
}
.title-info-name {
  margin-left: 15px;
}
.history-desc {
  background-color: #222;
  padding: 20px;
  margin-top: 8px;
  display: flex;
  align-content: center;
  justify-content: space-between;
}
.desc-info-edtion {
  margin-left: 40px;
  width: 290px;
  display: inline-block;
  vertical-align: middle;
}
.roate {
  transform: rotate(180deg);
}
.filter-wrap {
  font-size: 22px;
  position: relative;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}
.filter-items {
  font-size: 14px;
  opacity: 0.8;
  cursor: pointer;
  margin-top: 10px;
  line-height: 1;
}
.filter-control {
  display: inline-block;
}
.filter-items li {
  margin-bottom: 10px !important;
}
</style>