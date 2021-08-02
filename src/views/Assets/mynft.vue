<template>
  <div class="mynftbox" v-loading="loading">
    <ul v-if="assetsList?.records && assetsList.records.length > 0">
      <li
        v-for="(item, idx) in assetsList.records"
        :key="item.name"
        class="everymynftbox"
      >
        <div class="flex between mobilflex">
          <div class="my-assets-left" v-if="getFormat(item) == 'mp4'">
            <video
              autoplay
              loop
              :src="formatVideoUrl(item.primaryPic)"
              muted
            ></video>
            <video
              class="mohu"
              autoplay
              loop
              :src="formatVideoUrl(item.primaryPic)"
              muted
            ></video>
          </div>
          <div class="my-assets-left" v-else>
            <img :src="formatVideoUrl(item.primaryPic)" />
            <img class="mohu" :src="formatVideoUrl(item.primaryPic)" />
          </div>
          <div class="my-assets-right">
            <div class="my-assets-right-tit">{{ item.name }}</div>
            <div class="my-assets-right-creator flex">
              <div class="details-right-creator-img">
                <img src="/imgs/t8.png" />
              </div>
              <span>@ATTA</span>
              <div class="my-assets-right-creator-edition">
                {{ $t("common") + item.endEdition + $t("ban") }}
              </div>
            </div>
            <div class="details-right-des-tit">
              {{ $t("productdescription") }}
            </div>
            <div
              class="details-right-des"
              v-html="getIntroduce(item, 'desc', 'nointroduction')"
            ></div>
            <div class="details-right-additional">
              <p
                class="details-right-additional-more order-content"
                v-if="showMoreInfo == idx"
                v-html="getIntroduce(item, 'detail', 'noinformation')"
              ></p>
            </div>
            <div class="my-assets-right-price">
              <div class="flex my-assets-right-download">
                <a class="flex download" @click="downloadFile(item)">{{
                  $t("down")
                }}</a>
              </div>
            </div>
          </div>
        </div>
        <div class="tablistbox" v-if="item.mintList && item.mintList.length">
          <p class="titlebox flex between">
            <span>{{ $t("currentlyholds") }}({{ item.mintList.length }}):</span>
            <img
              src="/imgs/arrow.png"
              alt=""
              :class="item.ishide ? 'ishide' : ''"
              @click="changeishide(item.ishide, idx)"
            />
          </p>
          <div class="listbox" v-if="!item.ishide">
            <div
              class="everydatabox"
              v-for="(json, index) in item.mintList"
              :key="json.edition"
            >
              <p class="tit">
                <span
                  >{{ $t("banhao2") }}: {{ json.edition }} of
                  {{ item.endEdition }}</span
                >
                <span style="margin-left: 50px">{{ blockText }}</span>
              </p>
              <div class="inputbox flex between">
                <div class="srkbox">
                  <input
                    type="text"
                    readonly
                    :value="
                      json.status == 1
                        ? $t('jsaddress') +
                          (json.receiver ? json.receiver : $t('jsaddress2'))
                        : $t('inwallet') + walletId
                    "
                  />
                  <button
                    v-if="json.status == 1"
                    :data-json="JSON.stringify(json)"
                    onclick="editnftaddress(event)"
                  >
                    {{ $t("edit") }}
                  </button>
                  <span
                    v-if="json.status == 1"
                    :data-json="JSON.stringify(json)"
                    class="clickedit"
                    onclick="editnftaddress(event)"
                    >{{ $t("clickedit") }}</span
                  >
                </div>
                <button class="ntfbtn kxbor" v-if="json.status == 1">
                  {{ $t("mint") }}
                </button>
                <button
                  class="ntfbtn"
                  v-if="json.status == 2"
                  :data-endedition="item.endEdition"
                  :data-json="JSON.stringify(json)"
                  @click="transferAddress($event)"
                >
                  {{ $t("transfer") }}
                </button>
              </div>
              <div class="horizontalline"></div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <ul
      v-if="
        walletBalance == 0 &&
        (!assetsList.records || assetsList.records.length < 1)
      "
      style="padding: 150px 0"
    >
      <li class="flex nothing">
        <div style="margin: 0 auto">{{ $t("norecord") }}</div>
      </li>
    </ul>
    <ul v-if="walletBalance > 0">
      <li class="everymynftbox">
        <div class="flex between mobilflex">
          <div class="my-assets-left">
            <video autoplay loop src="/ATTAdrop.mp4" muted></video>
            <video class="mohu" autoplay loop src="/ATTAdrop.mp4" muted></video>
          </div>
          <div class="my-assets-right">
            <div class="my-assets-right-tit">ATTA Airdrop NFT</div>
            <div class="my-assets-right-creator flex">
              <div class="details-right-creator-img">
                <img src="/imgs/t8.png" />
              </div>
              <span>@ATTA</span>
              <div class="my-assets-right-creator-edition"></div>
            </div>
            <div class="details-right-des-tit">
              {{ $t("productdescription") }}
            </div>
            <div class="details-right-des" v-html="$t('erc1155Desc')"></div>
            <div class="my-assets-right-price">
              <div class="flex my-assets-right-download">
                <a
                  class="flex download"
                  download="ATTAdrop.mp4"
                  href="/ATTAdrop.mp4"
                  >{{ $t("down") }}</a
                >
              </div>
            </div>
          </div>
        </div>
        <div class="tablistbox">
          <div class="listbox">
            <div class="everydatabox">
              <p class="tit">
                <span>{{ $t("currentWallet") }}：{{ walletBalance }}</span>
                <span style="margin-left: 50px">{{ blockText }}</span>
              </p>
              <div class="inputbox flex between">
                <div class="srkbox">
                  <input
                    type="text"
                    readonly
                    :value="$t('inwallet') + walletId"
                  />
                  <span class="clickedit" onclick="editnftaddress(event)">{{
                    $t("clickedit")
                  }}</span>
                </div>
                <button class="ntfbtn" @click="transferAddress">
                  {{ $t("transfer") }}
                </button>
              </div>
              <div class="horizontalline"></div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="bzy-e-more" v-if="assetsList.total > 9">
      <div class="flex assets-list-load" @click="getMoreList">
        <span class="language-tc">{{ $t("more") }}</span>
        <img src="/imgs/next.png" />
        <img src="/imgs/xiala2.png" />
      </div>
    </div>

    <!-- modify -->
    <div
      :class="['modify', { 'modify-tc-active': showTransferModel }]"
      v-show="showTransferModel"
    >
      <div class="modify-container flex">
        <div class="modify-form">
          <div class="modify-tit flex" data-type="name">
            <span>{{ modelTitle }}</span
            ><img class="none" @click="cancelMobile" src="/imgs/close.png" />
          </div>
          <div class="modify-ipt">
            <div class="modify-ipt-add">
              <div class="modify-ipt-tit dqaddress">
                {{ $t("walltAdress") }}
                <span>{{ walletId }}</span>
              </div>
              <div class="modify-ipt-tit newaddress2">
                {{ $t("transferTo")
                }}<input type="text" v-model="transferToAddress" />
              </div>
            </div>
          </div>
          <div class="modify-tips" v-html="modelTips"></div>
          <div class="modify-btn flex">
            <button
              class="add modify-btn-active"
              type="button"
              ref="modifyBtnActive"
              @click="editzyclick($event)"
            ></button>

            <button
              class="cancel cancel-mobile none"
              type="button"
              @click="cancelMobile"
            >
              {{ $t("cancel") }}
            </button>
          </div>
          <div class="modify-close" @click="cancelMobile">
            <img src="/imgs/close.png" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from "vue";
import axios from "../../api";
import { chainSetting } from "../../assets/js/chainSetting";
import { useI18n } from "vue-i18n";
import { getCookie } from "../../utils";

export default defineComponent({
  name: "mynft",

  setup() {
    const { locale, t } = useI18n();
    const assetsList: any = ref({});
    const current = ref(1);
    const pageSize = ref(9);
    const showMoreInfo = ref(-1);
    const selectedNftName = ref('');
    const selectedNft = ref();
    const walletId = ref('');
    const tokenarr: any = ref([]);
    const showTransferModel = ref(false);
    const isErc1155 = ref(false);
    const modelTitle = ref('');
    const modelTips = ref('');
    const transferToAddress = ref('');
    const modifyBtnActive: any = ref({});
    const chainId = ref(0);
    const walletBalance = ref(0);
    const targetChainId = ref('');
    const web3 = ref();
    const loading = ref<boolean>(false);

    const isEn = computed(() => {
      return locale.value.trim() == "en";
    });
    
    const blockText = computed(() => {
      return chainId.value == 1 || chainId.value == 4 ? t('ethchain') : t('blockchain')
    });

    const getAssetsList = (arr) => {
      const bool = isEn.value ? "en" : "tc";
      axios
        .post(window.base_url + "/v2/commodity/attaNftInfo", {
          current: current.value,
          pageSize: pageSize.value,
          tokenIds: arr,
          lang: bool,
          chainType: window.chainType,
        })
        .then((res: any) => {
          if (res.code == 0) {
            assetsList.value = res.data.pageResult;
            loading.value = false;
          }
        });
    };

    const geteveryqkl = () => {
      let auctionAddress =
        chainSetting["contractSetting"]["atta_ERC721"][targetChainId.value]
          .address;
      let requestUrl =
        window.scansite_base_url +
        "/api?module=account&action=tokennfttx&contractaddress=" +
        auctionAddress +
        "&address=" +
        walletId.value +
        "&sort=desc&apikey=" +
        window.apikey;

      axios.get(requestUrl).then((res: any) => {
        let nftData = res.result;
        if (!nftData || nftData.length < 1 || !Array.isArray(nftData)) {
          loading.value = false;
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

    const getAccount = async () => {
      chainId.value = await window.CHAIN.WALLET.chainId();
      const accounts = await window.CHAIN.WALLET.enable();
      loading.value = true;
      
      if (accounts[0]) {
        walletId.value = accounts[0];
        transferToAddress.value = accounts[0];
        initAccount();
        geteveryqkl();
      } else {
        getAssetsList([]);
      }
    };

    const initAccount = async () => {
      const walletType = getCookie(window.CHAIN.WALLET.__wallet__);

      if (walletType) {
        web3.value = new window.Web3(window.CHAIN.WALLET.provider());
      } else if (window.ethereum) {
        web3.value = new window.Web3(window.ethereum);
      }
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
      if (chainId.value > 4) {
        getWallet();
      }
    };

    const getWallet = () => {
      const userAddress = web3.value.utils.toChecksumAddress(walletId.value);
      const busdAddress: any =
        chainSetting["contractSetting"]["atta_ERC1155_Airdrop"][chainId.value]
          .address;

      const busdABI =
        chainSetting["contractSetting"]["atta_ERC1155_Airdrop"]["abi"];
      const busdContractInstance = new web3.value.eth.Contract(
        busdABI,
        busdAddress
      );
      busdContractInstance.methods
        .balanceOf(userAddress, 1)
        .call()
        .then((price: any) => {
          walletBalance.value = price;
        });
    };

    onMounted(() => {
      getAccount();
    });

    const getMoreList = () => {
      current.value += 1;
      getAssetsList(tokenarr.value);
    };

    const formatVideoUrl = (item) => {
      return window.base_url + item;
    };

    const downloadFile = (item: any) => {
      const name = item.name.replace(".", "");
      const a = document.createElement("a");
      const url = formatVideoUrl(item.attachment); // 完整的url则直接使用
      fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          // 将链接地址字符内容转变成blob地址
          a.href = URL.createObjectURL(blob);
          a.download = name; // 下载文件的名字
          document.body.appendChild(a);
          a.click();
        });
    };

    const getFormat = (item) => {
      return item.primaryPic.substr(item.primaryPic.lastIndexOf(".") + 1);
    };

    const getIntroduce = (item, content, str) => {
      var s = t(str);
      if (content === "desc") {
        return item.introduce == ""
          ? s
          : item.introduce.replace(/;\|;/g, "<br/>");
      } else {
        return item.content == "" ? s : item.content.replace(/;\|;/g, "<br/>");
      }
    };

    const changeishide = (bool, index) => {
      let obj = assetsList.value.records[index];
      obj.ishide = !bool;
      assetsList.value.records[index] = obj;
    };

    const cancelMobile = () => {
      showTransferModel.value = false;
    };

    const zyajax = (newaddress, obj) => {
      chainId.value = web3.value.utils.hexToNumber(chainId.value);
      if (chainId.value != Number(targetChainId.value)) {
        window.CHAIN.WALLET.switchRPCSettings(targetChainId.value);
      }
      const ERC721Address: any =
        chainSetting["contractSetting"]["atta_ERC721"][chainId.value].address; // 监听 网络切换 会 让 用户 处于 正确的网络，这里 只负责 配置 当前网络下正确的 合约地址
      var ERC721ABI = chainSetting["contractSetting"]["atta_ERC721"]["abi"];
      var ERC721ContractInstance = new web3.value.eth.Contract(
        ERC721ABI,
        ERC721Address
      );
      // busdAddress 供外界使用

      ERC721ContractInstance.methods
        .safeTransferFrom(walletId.value, newaddress, obj.tokenId)
        .send({
          from: walletId.value,
        })
        .then(function (res: any) {
          alert(t("tipsjs4"));
          location.reload();
        });
      setTimeout(() => {
        alert(t("tipsjs5"));
        setTimeout(() => {
          cancelMobile();
        }, 1800);
      }, 1000);
    };

    const transferERC1155 = () => {
      chainId.value = web3.value.utils.hexToNumber(chainId.value);
      if (chainId.value != Number(targetChainId.value)) {
        window.CHAIN.WALLET.switchRPCSettings(targetChainId.value);
      }
      const ERC1155Address: any =
        chainSetting["contractSetting"]["atta_ERC1155_Airdrop"][chainId.value]
          .address; // 监听 网络切换 会 让 用户 处于 正确的网络，这里 只负责 配置 当前网络下正确的 合约地址
      var ERC1155ABI =
        chainSetting["contractSetting"]["atta_ERC1155_Airdrop"]["abi"];
      var ERC1155ContractInstance = new web3.value.eth.Contract(
        ERC1155ABI,
        ERC1155Address
      );
      // busdAddress 供外界使用

      ERC1155ContractInstance.methods
        .safeTransferFrom(walletId.value, transferToAddress.value, 1, 1, "0x")
        .send({
          from: walletId.value,
        })
        .then(() => {
          alert(t("tipsjs4"));
        });
      setTimeout(() => {
        cancelMobile();
      }, 3000);
    };

    const editzyclick = (e) => {
      if (isErc1155.value) {
        transferERC1155();
        return false;
      }
      const newaddress2 = (
        document.querySelector(".newaddress2 input") as HTMLInputElement
      ).value;

      const web3 = new window.Web3(window.CHAIN.WALLET.provider());
      const obj = JSON.parse(e.target.dataset.type);
      if (!newaddress2 && obj.status == 2) {
        alert(t("tipsjs1"));
        return false;
      }
      if (!web3.utils.isAddress(newaddress2) && obj.status == 2) {
        alert(t("tipsjs2"));
        return false;
      }
      if (obj.status == 2) {
        // 确认转移
        zyajax(newaddress2, obj);
      }
    };

    const transferAddress = (e) => {
      showTransferModel.value = true;
      const dom1: any = document.querySelector(".modify-btn-active");
      dom1.textContent = t("confirmCurrent");
      modelTitle.value = t("transfer");
      modelTips.value = `<span class="modify-tips-content">${t(
        "tips02"
      )}</span>`;
      if (!e.target.dataset.json) {
        isErc1155.value = true;
        return false;
      }
      const obj = JSON.parse(e.target.dataset.json);
      const endedition = JSON.parse(e.target.dataset.endedition);
      modelTitle.value =
        t("transfer1") + obj.edition + ` of ` + endedition + t("newWallt");
      dom1.setAttribute("data-type", e.target.dataset.json);
    };

    return {
      isEn,
      modifyBtnActive,
      modelTitle,
      modelTips,
      assetsList,
      walletBalance,
      transferToAddress,
      current,
      pageSize,
      showMoreInfo,
      selectedNftName,
      selectedNft,
      walletId,
      tokenarr,
      getMoreList,
      getFormat,
      getIntroduce,
      changeishide,
      transferAddress,
      editzyclick,
      cancelMobile,
      formatVideoUrl,
      showTransferModel,
      downloadFile,
      loading,
      blockText
    };
  },
});
</script>
<style lang="scss">
@import "./mynft.scss";
</style>