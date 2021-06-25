<template>
  <div class="history-container">
    <div class="history-items">
      <div>
        <div
          class="history-item"
          v-for="(item, index) in dataList"
          :key="index"
        >
          <div class="history-title">
            <div class="title-info">
              <span class="title-info-name">{{ item.name }}</span>
            </div>
            <div
              class="title-time"
            >
              {{ timeFormat(item.timeStamp) }}
            </div>
          </div>
          <div class="history-desc">
            <div class="desc-info">
              <span class="desc-info-edtion"
                >{{ item.edition || item.editions }}{{ $t('ban') }}</span
              >
            </div>
            <div class="desc-address">
              <div>{{ $t('oldaddress') + item.from }}</div>
              <div>
                {{ $t('changeaddress') }}
                <span class="desc-info-address">{{ item.to }}</span>
              </div>
              
            </div>
          </div>
          <div class="history-line"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lanf="ts">
import { defineComponent, ref, watchEffect } from "vue";
import axios from '@/api'

export default defineComponent({
  name: 'history',
  setup(){
    const dataList = ref([
      name:'',
      timeStamp:0
    ])

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
    }

    const getNftHistory = async() => {
      let targetChainId = "";
      let scansite_base_url = "";

      if (window.location.href.indexOf("atta.zone") == -1) {
        targetChainId = 97;
        scansite_base_url = "https://api-testnet.bscscan.com";
      } else {
        targetChainId = 56;
        scansite_base_url = "https://api.bscscan.com";
      }
      let auctionAddress = contractSetting["atta_ERC721"][targetChainId].address;
      let accounts = await window.CHAIN.WALLET.enable()
      let bscAd = "/api/api?module=account&action=tokennfttx&contractaddress=" +auctionAddress +"&address=" +accounts[0] +"&sort=desc"
      axios.get(bscAd).then(res=> {
          if (res.result && res.result.length > 0) {
            let formData = res.result
            for (let i = 0; i < formData.length; i++) {
              formData[i].timeStamp *= 1000;
              axios.get("http://47.118.74.48:8081/v2/commodity/edition_basic_id?tokenTypeId="+ formData[i].tokenID).then(itm => {
                Object.assign(formData[i], {"name": itm.data.name, "edition": itm.data.edition});
              })
            }
            formData.sort( (a, b)=> {
              return b.timeStamp - a.timeStamp;
            });
            setTimeout(()=>{
              dataList.value.push(...formData);
            },100)
          }
        })
    }

    watchEffect(()=>{
      getNftHistory()
    })


    return {
      dataList,
      timeFormat
    }
  }
});
</script>
<style>
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
    max-width: 36% !important;
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
  width: 550px;
}
.desc-info-address {
  color: #9567ff;
}
.selected-tag {
  color: #9567ff !important;
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