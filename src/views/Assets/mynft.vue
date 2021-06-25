<template>
  <div class="mynftbox">
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
              :src="item.primaryPic"
              muted
            ></video>
            <video
              class="mohu"
              autoplay
              loop
              :src="item?.primaryPic"
              muted
            ></video>
          </div>
          <div class="my-assets-left" v-else>
            <img :src="item.primaryPic" />
            <img class="mohu" :src="item.primaryPic" />
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
                <a
                  class="flex download"
                  :download="item.attachment"
                  :href="item.attachment"
                  >{{ $t("down") }}</a
                >
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
                  >Token ID : {{ json.edition }} of {{ item.endEdition }}</span
                >
                <span style="margin-left: 50px">{{ $t("blockchain") }}</span>
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
                  @click="zhuanyiaddress($event)"
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
    <ul v-else style="padding-top: 100px">
      <li class="flex nothing">
        <div style="margin: 0 auto">{{ $t("norecord") }}</div>
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
    <div class="modify none">
      <div class="modify-container flex">
        <div class="modify-form">
          <div class="modify-tit flex" data-type="name">
            <span>title</span
            ><img class="none" @click="cancelMobile()" src="/imgs/Close.png" />
          </div>
          <div class="modify-ipt"></div>
          <div class="modify-tips"></div>
          <div class="modify-btn flex">
            <button
              class="add modify-btn-active"
              type="button"
              @click="editzyclick($event)"
            ></button>
            
            <button
              class="cancel cancel-mobile none"
              type="button"
              @click="cancelMobile()"
            >
              {{ $t('cancel') }}
            </button>
          </div>
          <div class="modify-close" @click="cancelMobile()">
            <img src="/imgs/Close.png" />
          </div>
        </div>
      </div>
    </div>
    <!--提示弹窗-->
    <div class="hsycms-model-mask" id="mask-tips"></div>
    <div class="hsycms-model hsycms-model-tips" id="tips">
      <div class="hsycms-model-text">这里是提示内容</div>
    </div>
    <!-- foot -->
    <div class="footerpage"></div>

    <!-- <div class="tips"></div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from "vue";
import axios from '../../api';
import { chainSetting } from "../../assets/js/chainSetting";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "mynft",

  setup() {
    const { locale, t } = useI18n();
		const assetsList: any = ref({})
		const current = ref(1)
    const pageSize = ref(9)
		const showMoreInfo = ref(-1)
    const selectedNftName = ref('')
    const selectedNft = ref()
    const walletId = ref('')
    const tokenarr:any = ref([])
    const lang = ref('')
  	const base_url = ref('')

		const isEn = computed(() => {
      return locale.value.trim() == "en";
    });

		const getAssetsList = (arr) => {
      const bool = isEn.value ? "en" : "tc";
      axios
        .post(base_url.value + "/v2/commodity/attaNftInfo", {
          current: current.value,
          pageSize: pageSize.value,
          tokenIds: arr,
          lang: bool,
        })
        .then((res:any) => {
          if (res.code == 0) {
            assetsList.value = res.data.pageResult;
          }
        });
    }

		const geteveryqkl = () => {
      let targetChainId = "";

      if (window.location.href.indexOf("atta.zone") == -1) {
        targetChainId = "97";
      } else {
        targetChainId = "56";
      }
      let auctionAddress =
        chainSetting["contractSetting"]["atta_ERC721"][targetChainId].address;
      let requestUrl =
        "/api/api?module=account&action=tokennfttx&contractaddress=" +
        auctionAddress +
        "&address=" +
        walletId.value +
        "&sort=desc";

      axios.get(requestUrl).then((res:any) => {
        let nftData = res.result;
        let obj = {}
        let arr = []
        for (let i = 0; i < nftData.length; i++) {
          const token: any = nftData[i].tokenID
          const nft: any = nftData[i]
          if (!obj[token]) {
            obj[token] = true;
            const jsonData = {
              tokenID: token,
              listdata: [nft],
              tojia: 0,
              fromjian: 0
            } as any
            arr.push(jsonData);
          } else {
            arr.forEach((item:any) => {
              if (item.tokenID == nftData[i].tokenID) {
                item.listdata.push(nftData[i]);
              }
            });
          }
        }
        arr.forEach((item:any) => {
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
    }

		const getAccount = () => {
      window.CHAIN.WALLET.enable().then((res:any) => {
        if (res && res.length) {
          walletId.value = res[0];
          geteveryqkl();
        } else {
          getAssetsList([]);
        }
      });
    }

		const getMoreList = () => {
      current.value += 1;
      getAssetsList(tokenarr.value);
    }

		const getFormat = (item) => {
      return item.primaryPic.substr(item.primaryPic.lastIndexOf(".") + 1);
    }

		const getIntroduce = (item, content, str) => {
      var s = t(str);
      if (content === "desc") {
        return item.introduce == ""
          ? s
          : item.introduce.replace(/;\|;/g, "<br/>");
      } else {
        return item.content == "" ? s : item.content.replace(/;\|;/g, "<br/>");
      }
    }

		const changeishide = (bool, index) => {
      let obj = assetsList.value.records[index];
      obj.ishide = !bool;
			assetsList.value.records[index] = obj
    }

		const cancelMobile = () => {
      const dom1: HTMLElement = <HTMLElement>document.querySelector(".modify");
      dom1.classList.remove("modify-tc-active");
      dom1.style.display = "none";
    }

		const zyajax = (newaddress, obj) => {
      var web3 = new window.Web3(window.CHAIN.WALLET.provider());
      var chainId = "";
      window.CHAIN.WALLET.chainId().then(function (res:any) {
        chainId = web3.utils.hexToNumber(res);
        let targetChainId = "";
        if (window.location.href.indexOf("atta.zone") == -1) {
          targetChainId = "97";
        } else {
          targetChainId = "56";
        }
        if (chainId != targetChainId) {
          window.CHAIN.WALLET.switchRPCSettings(targetChainId);
        }
        const ERC721Address: any =
          chainSetting["contractSetting"]["atta_ERC721"][chainId].address; // 监听 网络切换 会 让 用户 处于 正确的网络，这里 只负责 配置 当前网络下正确的 合约地址
        var ERC721ABI = chainSetting["contractSetting"]["atta_ERC721"]["abi"];
        var ERC721ContractInstance = new web3.eth.Contract(
          ERC721ABI,
          ERC721Address
        );
        // busdAddress 供外界使用

        ERC721ContractInstance.methods
          .safeTransferFrom(walletId.value, newaddress, obj.tokenId)
          .send({
            from: walletId.value,
          })
          .then(function (res:any) {
            alert(t("tipsjs4"));
            geteveryqkl();
          });
        setTimeout(() => {
          alert(t("tipsjs5"));
          setTimeout(function () {
            cancelMobile();
          }, 1800);
        }, 1000);
      });
    }

		const editzyclick = (e) => {
      const dom1: HTMLElement = <HTMLElement>document.querySelector(".newaddress2 input");
      
      const newaddress2: any = dom1.value;
      
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
    }

		const zhuanyiaddress = (e) => {
      const obj = JSON.parse(e.target.dataset.json);
      const endedition = JSON.parse(e.target.dataset.endedition);
      const dom1: HTMLElement = <HTMLElement>document.querySelector(".modify-tit span");
      const dom2: HTMLElement = <HTMLElement>document.querySelector(".modify-ipt");
      const dom3: HTMLElement = <HTMLElement>document.querySelector(".modify-tips");
      const dom4: HTMLElement = <HTMLElement>document.querySelector(".modify-btn-active");
      const dom6: HTMLElement = <HTMLElement>document.querySelector(".modify");
      dom1.textContent =
        t("transfer1") +
        obj.edition +
        ` of ` +
        endedition +
        t("newWallt");
      var html = ``;
      html +=
        `<div class="modify-ipt-add">
						<div class="modify-ipt-tit dqaddress">${t("walltAdress")}<span>` +
        walletId.value +
        `</span></div>
						<div class="modify-ipt-tit newaddress2">${t(
              "transferTo"
            )}<input type="text" value=` +
        walletId.value +
        `></div>
					</div>`;

      dom2.innerHTML = html;
      dom3.innerHTML = `<span class="modify-tips-content">${t(
        "tips02"
      )}</span>`;
      dom4.classList.add("add");
      dom4.textContent = t("confirmCurrent");
      dom4.setAttribute("data-type", e.target.dataset.json);
      dom6.style.display = "block";
    }

		onMounted(() => {
			getAccount();
			if (window.location.href.indexOf("atta.zone") == -1) {
				base_url.value = "http://47.118.74.48:8081";
			} else {
				base_url.value = "https://www.bazhuayu.io";
			}
		})

    return {
      isEn,
      t,
			assetsList,
			current,
			pageSize,
			showMoreInfo,
			selectedNftName,
			selectedNft,
			walletId,
			tokenarr,
			lang,
			base_url,
			getMoreList,
			getFormat,
			getIntroduce,
			changeishide,
			zhuanyiaddress,
			editzyclick,
      cancelMobile
    };
  }
});
</script>
<style>
@import "@/assets/css/media.scss";
.everymynftbox{
	justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 100px;
}
.between {
  justify-content: space-between;
  align-items: flex-start;
}
.everymynftbox .my-assets-left {
  width: 50%;
  position: relative;
}
.everymynftbox .my-assets-left video {
  width: 100%;
  position: relative;
  z-index: 3;
}
.everymynftbox .my-assets-left .mohu {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0.7;
  filter: blur(70px);
  z-index: 2;
}
.everymynftbox .my-assets-right {
  width: 40%;
}
.titlebox {
  font-weight: bold;
  font-size: 24px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 15px;
}
.titlebox img {
  cursor: pointer;
}
.listbox {
  padding: 26px 0;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-left: none;
  border-right: none;
}
.everydatabox {
  margin-bottom: 30px;
  font-weight: normal;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.8);
}
.inputbox {
  margin-top: 10px;
  height: 59px;
}
.srkbox {
  width: 80%;
  position: relative;
  height: 100%;
}
.srkbox input {
  width: 100%;
  height: 100%;
  background: #222222;
  border-radius: 4px;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.8);
  border: none;
  padding-left: 14px;
}
.srkbox button {
  position: absolute;
  right: 23px;
  top: 10px;
  width: 73px;
  height: 40px;
  font-size: 16px;
  background: #4e4e4e;
  border-radius: 4px;
  border: none;
}
.srkbox .clickedit {
  color: #9567ff;
  position: absolute;
  right: 0;
  top: 43px;
  display: none;
  cursor: pointer;
}
.ntfbtn{
	width: 17.6%;
	height: 100%;
	border-radius: 2px;
	font-weight: 600;
	font-size: 14px;
	color: #FFFFFF;
	background: #A8DEEE;
	border: none;
	cursor: pointer;
}
.kxbor {
  border: 1px solid #606060;
  background: transparent;
}
.modify-tips {
  text-align: center;
}
.modify-tips-content {
  color: rgba(255, 255, 255, 0.7);
}
.dqaddress {
  font-size: 16px;
}
.dqaddress span {
  font-size: 14px;
}
.newaddress {
  font-size: 18px;
}
.newaddress input {
  width: 75%;
  text-indent: 12px;
}
.newaddress2 input {
  width: 83%;
  text-indent: 12px;
}
.horizontalline {
  width: 122px;
  height: 0px;
  text-align: center;
  opacity: 0.15;
  position: absolute;
  bottom: -15px;
  left: 0;
  right: 0;
  margin: auto;
  border: 1px solid #ffffff;
  display: none;
}
.ishide {
  transform: rotate(180deg);
}
@media only screen and (max-width: 992px){
	.mobilflex{
		flex-direction: column;
		margin-bottom: 50px;
	}
	.everymynftbox .my-assets-left,.everymynftbox .my-assets-right{
		width: 100%;
	}
	.my-assets-right-tit{
		font-size: 32px;
	}
	.modify-form {
		width: 100%;
		height: 100%;
		padding: 0 5%;
	}
	.modify-tit {
		margin-top: 20px;
		font-size: 28px;
		padding-bottom: 24px;
		margin-right: 20px;
	}
	.modify-ipt input {
		width: 100%!important;
		text-align: left!important;
	}
	.titlebox{
		font-size: 16px;
	}
	.titlebox img{
		width: 18px;
		height: 18px;
	}
	.everydatabox{
		font-size: 10px;
		position: relative;
	}
	.inputbox{
		height: auto;
		flex-wrap: wrap;
	}
	.srkbox{
		width: 100%;
		height: 40px;
		font-size: 10px;
	}
	.srkbox input{
		font-size: 10px;
		padding-left: 0;
		text-align: center;
	}
	.srkbox button{
		display: none;
	}
	.srkbox .clickedit,.horizontalline{
		display: inline-block;
	}
	.ntfbtn{
		width: 100%;
		height: 40px;
		margin-top: 12px;
	}
	.kxbor{
		margin-top: 28px;
	}
	.newaddress input,.newaddress2 input{
		text-indent: 12px !important;
	}
}
</style>