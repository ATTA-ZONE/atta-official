<template>
  <div class="modal-container">
    <div class="modal-wrap">
      <div class="modal-wrap-name">
        <div class="modal-wrap-name-text">{{ $t("Claim Your NFT") }}</div>
        <img @click="closeModal" class="close" src="@/assets/imgs/close.png" />
      </div>
      <div class="modal-title">{{ $t("modalTitle") }}</div>
      <div class="content-wrap">
        <img class="banner" src="@/assets/imgs/modal-banner.png" />
        <div class="content-desc">
          <div class="content-desc-title">{{ $t("infoTitle") }}</div>
          <div class="content-desc-info">
            {{ $t("infoDesc") }}
          </div>
          <div class="content-desc-cells">
            <content-cell
              v-for="(item, idx) in pageText"
              :key="idx"
              @toggleShow="toggleShow"
              :title="$t(item.title)"
              :desc="$t(item.desc)"
              :showDesc="showDesc"
              :btn="showDesc == $t(item.title) ? '-' : '+'"
            />
          </div>
          <div class="claim-title">
            {{ $t("Claim deadline") }}: 2021-6-31 20:00
          </div>
          <div class="claim-title" v-if="props.accountAddress">
            {{ $t(claimBtn) }}.
          </div>
          <div class="claim-desc" v-if="props.accountAddress">
            {{ $t("Your receving address is") }}： {{ props.accountAddress }}
          </div>
          <span class="submit-btn" @click="getNftBsc">{{ $t(submitBtn) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent, ref, watch } from "vue";
import contentCell from "./content-cell.vue";
import merkle from "@/assets/js/Merkle.json";
import { getCookie } from "../../utils";
import { chainSetting } from "../../assets/js/chainSetting";
import {initWeb3} from "../../assets/js/initweb3";

export default defineComponent({
  components: { contentCell },
  props: {
    accountAddress: {
      type: String,
      required: true,
    },
  },
  setup(props, context) {
    const showDesc = ref("");
    const pageText = ref([
      {
        title: "ATTA NFT Exclusive Benefits",
        desc: "nftInfo",
      },
      {
        title: "Content-related Benefits",
        desc: "fansInfo",
      },
      {
        title: "ATTA Brand Benefits",
        desc: "brandInfo",
      },
    ]);
    const submitBtn = ref("Connect now");
    const claimBtn = ref("You can claim this NFT airdrop");
    const toggleShow = (str: string) => {
      showDesc.value = str;
    };

    watch(props, (newVal, oldVal) => {
      if (newVal.accountAddress || oldVal.accountAddress) {
        submitBtn.value = "Claim now";
      }
    })

    const getAddress = () => {
      initWeb3().then((res: any) => {
        if (res.length > 0) {
          context.emit('address',res[0])
        }
      });
    };

    const getClaim = (fnc1: any, fnc2: any, address: any) => {
      //---发起 claim
      fnc1.methods
        .claim(
          fnc2["index"],
          fnc2["address"],
          fnc2["tokenIds"],
          fnc2["amounts"],
          fnc2["merkleProof"]
        )
        .send({
          from: address,
        });
      claimBtn.value = 'We have received your claim'
    };

    const getNftBsc = async () => {
      if (submitBtn.value === "Connect now") {
        getAddress();
        return false;
      }
      const accounts = await window.CHAIN.WALLET.accounts();
      const chainId: number | string = await window.CHAIN.WALLET.chainId();

      if (accounts.length > 0) {
        var walletType = getCookie(window.CHAIN.WALLET.__wallet__);
        if (walletType) {
          var web3 = new window.Web3(window.CHAIN.WALLET.provider());
        } else if (window.ethereum) {
          var web3 = new window.Web3(window.ethereum);
        }
        let userAddress = web3.utils.toChecksumAddress(accounts[0])
        let userClaimInput = merkle[chainId][userAddress];
        if (!userClaimInput) {
          claimBtn.value = "not qualified to receive the NFT airdrop."
          submitBtn.value = "Got it";
          return false
        }

        const setting_proof: any = chainSetting["contractSetting"]["atta_ERC1155_Airdrop_MerkleProof"];

        var MerkleDistributionAddress = setting_proof[chainId].address;
        // 监听 网络切换 会 让 用户 处于 正确的网络，这里 只负责 配置 当前网络下正确的 合约地址
        var MerkleDistributionABI = setting_proof["abi"];

        var MerkleDistributionInstance = new web3.eth.Contract(
          MerkleDistributionABI,
          MerkleDistributionAddress
        );

        // 查询是否 claim过
        MerkleDistributionInstance.methods
          .isClaimed(userClaimInput["index"])
          .call()
          .then(function (res: any) {
            //true->已经领取
            console.log(res);
            if (!res) {
              getClaim(MerkleDistributionInstance, userClaimInput, userAddress);
            } else {
              claimBtn.value = 'claimed the NFT airdrop already'
            }
            submitBtn.value = "Got it";
          }); //  返回的是布朗
      }
    };

    const closeModal = () => {
      context.emit("closemodal");
    };

    return {
      pageText,
      showDesc,
      submitBtn,
      props,
      claimBtn,
      toggleShow,
      closeModal,
      getNftBsc,
      getAddress
    };
  },
});
</script>
<style lang='scss'>
.modal-container {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background: rgba($color: #000000, $alpha: 0.9);
  .modal-wrap {
    width: 1300px;
    height: 90%;
    overflow-y: auto;
    position: absolute;
    left: 50%;
    top: 2%;
    z-index: 1000;
    transform: translateX(-50%);
    padding: 40px;
    color: #fff;
    &-name {
      display: flex;
      font-size: 16px;
      justify-content: space-between;
      &-text {
        opacity: 0;
      }
    }
    .modal-title {
      margin: 10px 0;
    }
    .content-wrap {
      display: flex;
      justify-content: space-between;
      align-content: center;
      .banner {
        width: 530px;
      }
      .content-desc {
        font-size: 12px;
        margin-left: 50px;
        line-height: 1.8;
        &-title {
          font-size: 16px;
          margin-bottom: 10px;
        }
        &-cells {
          border-top: 1px solid rgba($color: #fff, $alpha: 0.15);
          border-bottom: 1px solid rgba($color: #fff, $alpha: 0.15);
          padding: 20px 0;
          margin: 20px 0;
        }
        &-info {
          text-align: justify;
          word-break: break-all;
        }
      }
      .claim-title {
        font-size: 16px;
        max-width: 80%;
        margin-bottom: 10px;
      }
      .claim-desc {
        font-size: 12px;
        opacity: 0.6;
      }
      .submit-btn {
        display: inline-block;
        padding: 14px 70px;
        margin-top: 20px;
        cursor: pointer;
        color: rgba(168, 222, 238, 1);
        border: 1px solid rgba(168, 222, 238, 1);
      }
    }
  }
}
</style>