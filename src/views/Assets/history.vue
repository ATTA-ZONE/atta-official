<template>
  <div class="history-container">
    <div class="history-items">
      <div>
        <div
          class="history-item"
          v-for="(item, index) in computedData"
          :key="index"
        >
          <div class="history-title">
            <div class="title-info">
              <span class="title-info-name">{{ item.name }}</span>
            </div>
            <div
              class="title-time"
              v-if="showFilter.indexOf('3') > -1 && item.blockHash"
            >
              {{ timeFormat(item.timeStamp) }}
            </div>
          </div>
          <div class="history-desc">
            <div class="desc-info">
              <span>{{ item.claimType }}</span>
              <span class="desc-info-edtion"
                >{{ item.edition || item.editions }}{{ $t(ban) }}</span
              >
            </div>
            <div class="desc-address">
              <div>{{ $t('oldaddress') + item.from }}</div>
              <div>
                {{ $t('changeaddress') }}
                <span class="desc-info-address">{{ item.to }}</span>
              </div>
              <div>
                Transaction hash：
                <span class="desc-info-address">{{ item.hash }}</span>
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
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      dataList: [],
      base_url: 'http://47.118.74.48:8081'
    };
  },
  created() {
    let self = this;
    self.getNftHistory();
    self.resizeWindow();
    window.onresize = function () {
      self.resizeWindow();
    };
  },
  computed: {
    computedData() {
      return this.dataList.filter((item) => {
        return item.blockHash;
      });
    }
  },

  methods: {
    resizeWindow() {
      if (document.body.clientWidth < 992) {
        this.showFilters = true;
      } else {
        this.showFilters = false;
      }
    },
    timeFormat(str) {
      var date = new Date(str);
      Y = date.getFullYear() + "-";
      M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      D = date.getDate() + " ";
      h = date.getHours() + ":";
      m = date.getMinutes() + ":";
      s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
    getNftHistory() {
      let self = this;
      length targetChainId = "";
      length scansite_base_url = "";

      if (window.location.href.indexOf("atta.zone") == -1) {
        targetChainId = 97;
        scansite_base_url = "https://api-testnet.bscscan.com";
      } else {
        targetChainId = 56;
        scansite_base_url = "https://api.bscscan.com";
      }
      let auctionAddress = contractSetting["atta_ERC721"][targetChainId].address;
      self.axios.get(
          "/api/api?module=account&action=tokennfttx&contractaddress=" +
          auctionAddress +
          "&address=" +
          window.walletId +
          "&sort=desc").then(res=> {
          if (res.status == "1") {
            for (let i = 0; i < res.result.length; i++) {
              res.result[i].timeStamp *= 1000;
              self.axios.post(self.base_url + "/v2/commodity/edition_basic_id", { tokenTypeId: res.result[i].tokenID }).then(itm => {
                self.$set(res.result[i], "name", itm.data.name);
                self.$set(res.result[i], "edition", itm.data.edition);
              })
              
            }
            self.dataList.push(...res.result);
            self.dataList.sort(function (a, b) {
              return b.timeStamp - a.timeStamp;
            });
          }
        })
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