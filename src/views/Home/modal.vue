<template>
  <div class="modal-container" v-if="showHomeModal">
    <div class="modal-wrap">
      <div class="modal-wrap-name">
        <div class="modal-wrap-name-text">{{ $t("Claim Your NFT") }}</div>
        <img @click="closeModal" class="modal-close" src="/imgs/close.png" />
      </div>
      <div class="modal-title">{{ $t("modalTitle") }}</div>
      <div class="content-wrap" style="align-items: center">
        <img class="banner" src="/imgs/lingquan.png" />
        <div class="content-desc">
          <div class="content-desc-title">{{ $t("infoTitle") }}</div>
          <div class="content-desc-info" v-html="$t('infoDesc2')"></div>
          <div class="content-desc-info">
            Dear Loot Adventurers, We are excited to invite all of you to join
            the 1st ATTA Infinite Esports Tournament in the metaverse.  All Loot
            NFT and xLoot NFT holders will be airdropped with an invitation that
            comes with entrance tickets in different rarities.  Please hit the
            claim button below for the invitation. See you at the tournament!
          </div>
          <div class="claim-title" v-if="props.accountAddress">
            {{ $t(claimBtn) }}
          </div>
          <span class="submit-btn" @click="getNftBsc">{{ $t(submitBtn) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent, onMounted, ref, watch, h } from "vue";
import contentCell from "./content-cell.vue";
import { getCookie } from "../../utils";
import { chainSetting } from "../../assets/js/chainSetting";
import { initWeb3 } from "../../assets/js/initweb3";
import bus from "../../utils/bus.js";
import { ElNotification } from "element-plus";

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
    const showHomeModal = ref(false);
    const walletBalance = ref(0);
    const targetChainId = ref(0);
    const pageText = ref([
      {
        title: "ATTA NFT Exclusive Benefits",
        desc: "nftInfo",
      },
      {
        title: "ATTA NFT Utility",
        desc: "brandInfo",
      },
    ]);
    const submitBtn = ref("");
    const claimBtn = ref("");
    const accounts = ref<any>([]);
    const chainId = ref(0);
    const web3 = ref();

    bus.on("openHomeModal", () => {
      showHomeModal.value = true;
    });

    const toggleShow = (str: string) => {
      showDesc.value = str;
    };

    watch(props, (newVal, oldVal) => {
      if (newVal.accountAddress || oldVal.accountAddress) {
        submitBtn.value = "Claim now";
      }
    });

    const getAddress = () => {
      initWeb3().then((res: any) => {
        if (res.length > 0) {
          context.emit("address", res[0]);
        }
      });
    };

    const initAccount = async () => {
      accounts.value = await window.CHAIN.WALLET.accounts();
      chainId.value = await window.CHAIN.WALLET.chainId();
      const walletType = getCookie(window.CHAIN.WALLET.__wallet__);
      if (window.location.href.indexOf("atta.zone") == -1) {
        targetChainId.value = 4;
      } else {
        targetChainId.value = 1;
      }

      if (walletType) {
        web3.value = new window.Web3(window.CHAIN.WALLET.provider());
      } else if (window.ethereum) {
        web3.value = new window.Web3(window.ethereum);
      }
    };

    onMounted(() => {
      initAccount();
    });

    if (!props.accountAddress) {
      submitBtn.value = "Connect now";
    } else {
      submitBtn.value = "Claim now";
    }

    const closeModal = () => {
      showHomeModal.value = false;
    };

    const getNftBsc = async () => {
      if (submitBtn.value === "Connect now") {
        getAddress();
        return false;
      }
      if (
        chainId.value != targetChainId.value &&
        window.location.href.indexOf("atta.zone") > -1
      ) {
        window.ethereum &&
          window.ethereum
            .request({
              method: "wallet_switchEthereumChain",
              params: [
                {
                  chainId: "0x1",
                },
              ],
            })
            .then(() => {
              console.log("网络切换成功");
            })
            .catch((e) => {});
      }
      if (submitBtn.value === "Got it") {
        closeModal();
        return false;
      }

      if (accounts.value.length > 0) {
        const userAddress = web3.value.utils.toChecksumAddress(
          accounts.value[0]
        );

        if (chainId.value != targetChainId.value) {
          window.CHAIN.WALLET.switchRPCSettings(targetChainId.value).then(
            () => {
              initAccount();
            }
          );
          return false;
        }

        const setting_proof: any =
          chainSetting["contractSetting"]["atta_ERC1155_Airdrop_MerkleProof"];

        const MerkleDistributionAddress = setting_proof[chainId.value].address;
        const MerkleDistributionABI = setting_proof["abi"];

        const MerkleDistributionInstance = new web3.value.eth.Contract(
          MerkleDistributionABI,
          MerkleDistributionAddress
        );
        ElNotification({
          title: "Tips",
          message: h("i", { style: "color: A8DEEE" }, "Just a moment, please"),
        });
        MerkleDistributionInstance.methods
          .claim()
          .send({
            from: userAddress,
          })
          .then((res) => {
            console.log(res);
            claimBtn.value = "We have received your claim";
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };

    return {
      pageText,
      showDesc,
      submitBtn,
      props,
      claimBtn,
      walletBalance,
      toggleShow,
      closeModal,
      showHomeModal,
      getNftBsc,
      getAddress,
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
  .modal-wrap::-webkit-scrollbar {
    width: 1px !important;
    background: rgba($color: #fff, $alpha: 0.5);
  }
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
    background: #1d1d1d;
    &-name {
      display: flex;
      font-size: 16px;
      justify-content: space-between;
      align-items: center;
      &-text {
        opacity: 0;
      }
    }
    .modal-close {
      width: 37px;
      height: 37px;
    }
    .modal-title {
      font-size: 24px;
      margin: 10px 0;
      color: #fff;
    }
    .content-wrap {
      display: flex;
      justify-content: space-between;
      align-content: center;
      .banner {
        width: 530px;
      }
      .content-desc {
        font-size: 14px;
        margin-left: 50px;
        line-height: 1.8;
        opacity: 0.8;
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
          opacity: 0.6;
          text-align: justify;
          margin-bottom: 10px;
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
      .claimed-text {
        font-size: 16px;
        color: #a8deee;
        text-align: justify;
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