<template>
  <div class="mynftbox">
    <ul v-if="assetsList.records && assetsList.records.length > 0">
			<li v-for="(item,idx) in assetsList.records" :key="idx" class="everymynftbox">
				<div class="flex between mobilflex">
					<div class="my-assets-left" v-if="getFormat(item) == 'mp4'">
						<video style="width:100%;" autoplay="autoplay" loop="loop" :src=" item.primaryPic" muted="muted"></video>
						<video class="mohu" style="width:100%;" autoplay="autoplay" loop="loop" :src="item.primaryPic"
							muted="muted"></video>
					</div>
					<div class="my-assets-left" v-else>
						<img :src="item.primaryPic" />
						<img class="mohu" :src="item.primaryPic" />
					</div>
					<div class="my-assets-right">
						<div class="my-assets-right-tit">{{item.name}}</div>
						<div class="my-assets-right-creator flex">
							<div class="details-right-creator-img"><img src="/imgs/t8.png"></div>
							<span>@ATTA</span>
							<div class="my-assets-right-creator-edition">{{$t("common") + item.endEdition + $t("ban")}}</div>
						</div>
						<div class="details-right-des-tit">{{$t("productdescription")}}</div>
						<div class="details-right-des" v-html="getIntroduce(item,'desc','nointroduction')">
						</div>
						<div class="details-right-additional">
							<p class="details-right-additional-more order-content" v-if="showMoreInfo==idx"
								v-html="getIntroduce(item,'detail','noinformation')">
							</p>
						</div>
						<div class="my-assets-right-price">
							<div class="flex my-assets-right-download"><a class="flex download" :download="item.attachment"
									:href="item.attachment">{{$t("down")}}</a></div>
						</div>
						
					</div>
				</div>
				<div class="tablistbox" v-if="item.mintList && item.mintList.length">
					<p class="titlebox flex between">
						<span>{{$t("currentlyholds")}}({{item.mintList.length}}):</span>
						<img src="/imgs/arrow.png" alt="" :class="item.ishide ? 'ishide' : ''" @click="changeishide(item.ishide,idx)">
					</p>
					<div class="listbox" v-if="!item.ishide">
						<div class="everydatabox" v-for="(json,index) in item.mintList" :key="index">
							<p class="tit">
								<span>Token ID :  {{json.edition}}  of {{item.endEdition}}</span>
								<span style="margin-left: 50px;">{{$t("blockchain")}}</span>
							</p>
							<div class="inputbox flex between">
								<div class="srkbox">
									<input type="text" readonly :value="json.status == 1 ? $t('jsaddress') + (json.receiver ? json.receiver : $t('jsaddress2')) : $t('inwallet') +walletId">
									<button v-if="json.status == 1" :data-json="JSON.stringify(json)" onclick="editnftaddress(event)">{{$t("edit")}}</button>
									<span v-if="json.status == 1" :data-json="JSON.stringify(json)" class="clickedit" onclick="editnftaddress(event)">{{$t("clickedit")}}</span>
								</div>
								<button class="ntfbtn kxbor" v-if="json.status == 1">{{$t('mint')}}</button>
								<button class="ntfbtn" v-if="json.status == 2" :data-endedition="item.endEdition" :data-json="JSON.stringify(json)" @click="zhuanyiaddress($event)">{{$t("transfer")}}</button>
							</div>
							<div class="horizontalline"></div>
						</div>
					</div>
				</div>
			</li>
		</ul>
		<ul v-else style="padding-top: 100px;">
			<li class="flex nothing">
				<div style="margin: 0 auto;">{{$t("norecord")}}</div>
			</li>
		</ul>
		<div class="bzy-e-more" v-if="assetsList.total > 9">
			<div class="flex assets-list-load" @click="getMoreList">
				<span class="language-tc">{{$t("more")}}</span>
				<img src="/imgs/next.png">
				<img src="/imgs/xiala2.png">
			</div>
		</div>

		<!-- modify -->
		<div class="modify none">
			<div class="modify-container flex">
				<div class="modify-form">
					<div class="modify-tit flex" data-type="name"><span>title</span><img class="none" @click="cancelMobile()" src="/imgs/Close.png" ></div>
					<div class="modify-ipt"></div>
					<div class="modify-tips"></div>
					<div class="modify-btn flex">
						<button class="add modify-btn-active" type="button" @click="editzyclick($event)"></button>
						<button class="cancel" type="button" onclick="cancel()">{{cancel}}</button>
						<button class="cancel cancel-mobile none" type="button" @click="cancelMobile()">{{cancel}}</button>
					</div>
					<div class="modify-close" @click="cancelMobile()"><img src="/imgs/Close.png" ></div>
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
import { defineComponent ,computed} from "vue";
import { chainSetting } from "../../assets/js/chainSetting";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: 'mynft',
  data: function () {
		return {
			assetsList: {},
			current: 1,
			pageSize: 9,
			showMoreInfo: -1,
			selectedNftName:'',
			selectedNft: null,
			walletId: '',
			tokenarr : [],
			lang:'',
			base_url  : '',
		}
	},
	setup() {
		const { locale ,t} = useI18n();

		const isEn = computed(() => {
			return locale.value.trim() == "en";
		});
		return {
			isEn,
			t
		}
	},
	mounted() {
		this.getAccount();
		if (window.location.href.indexOf('atta.zone') == -1) {
			this.base_url = 'http://47.118.74.48:8081';
		}else{
			this.base_url = 'https://www.bazhuayu.io';
		}
	},
	
	methods: {
		getAccount(){
			let self = this;
			window.CHAIN.WALLET.enable()
			.then(res=>{
				if (res && res.length) {
					self.walletId = res[0];
					self.geteveryqkl();
				}else{
					self.getAssetsList([]);
				}
			})
		},
		geteveryqkl(){
			let self = this
			let targetChainId = '';
			let scansite_base_url = '';
			
			if (window.location.href.indexOf('atta.zone') == -1) {
				targetChainId = '97';
				scansite_base_url = 'https://api-testnet.bscscan.com'
			} else {
				targetChainId = '56';
				scansite_base_url = 'https://api.bscscan.com'
			}
			let auctionAddress = chainSetting['contractSetting']['atta_ERC721'][targetChainId].address;
			let requestUrl = '/api/api?module=account&action=tokennfttx&contractaddress=' + auctionAddress + '&address=' + this.walletId + '&sort=desc'
			
			self.axios.get(requestUrl).then((res)=>{
					let nftData = res.result;
					let obj = {},arr = [],tokenarr = [];
					for (let i = 0; i < nftData.length; i++) {
						if (!obj[nftData[i].tokenID]) {
							obj[nftData[i].tokenID] = true;
							arr.push({tokenID : nftData[i].tokenID,listdata :  [nftData[i]],tojia : 0,fromjian : 0});
						}else{
							arr.forEach(item => {
								if (item.tokenID == nftData[i].tokenID) {
									item.listdata.push(nftData[i]);
								}
							});
						}
					}
					arr.forEach(item => {
						item.listdata.forEach(json => {
							if (json.to.toUpperCase() == self.walletId.toUpperCase()) {
								item.tojia += 1 ;
							}
							if (json.from.toUpperCase() == self.walletId.toUpperCase()) {
								item.fromjian -= 1 ;
							}
						});
						item.jsnum = item.tojia + item.fromjian;
						if (item.jsnum == 1) {
							tokenarr.push(item.tokenID)
						}
					});
					self.tokenarr = tokenarr;
					self.getAssetsList(tokenarr);
				})
		},
		getAllBsc(list){
			let arr = []
			if (list && list.length) {
				list.filter(item => {
					if (arr.indexOf(item.edition)) {
						arr.push(item.edition)
					}
				})
			}
			return arr
		},
		getIntroduce(item,content, str) {
			var s =  this.t(str);
			if (content === 'desc') {
				return item.introduce == '' ? s : item.introduce.replace(/;\|;/g, '<br/>')
			} else {
				return item.content == '' ? s : item.content.replace(/;\|;/g, '<br/>')
			}
		},
		toggleMoreInfo(idx) {
			if (this.showMoreInfo == idx) {
				this.showMoreInfo = -1
			} else {
				this.showMoreInfo = idx
			}
		},
		getMoreList() {
			this.current += 1
			this.getAssetsList(this.tokenarr);
			
		},
		getCookie(cookieName) {
			const strCookie = document.cookie
			const cookieList = strCookie.split('; ')
			var cookieValue = false;
			for (let i = 0; i < cookieList.length; i++) {
				const arr = cookieList[i].split('=')
				if (cookieName === arr[0]) {
					cookieValue = arr[1];
				}
			}

			return cookieValue;
		},
		getFormat(item) {
			return item.primaryPic.substr(item.primaryPic.lastIndexOf('.') + 1)
		},
		getAssetsList(arr) {
			var self = this;
			var bool = self.isEn ? 'en' : 'tc';
			self.axios.post(this.base_url +'/v2/commodity/attaNftInfo', {current: self.current,
					pageSize: self.pageSize,
					tokenIds : arr,lang : bool}).then(res=>{
						if (res.code == 0) {
							self.assetsList = res.data.pageResult
						}
					})
		},
		changeishide(bool,index){
			let obj = this.assetsList.records[index];
			obj.ishide = !bool;
			this.$set(this.assetsList.records,index,obj);
		},
		nftConnect() {
			window.location.href = 'connectWallet.html';
		},
		editzyclick(e){
			let dom1 = document.querySelector('.newaddress2 input');
			let newaddress2 = dom1.value;
			let web3 = new Web3(window.CHAIN.WALLET.provider());
			let obj = JSON.parse(e.target.dataset.type);
			if (!newaddress2 && obj.status == 2) {
				alert(this.t('tipsjs1'));
				return;
			}
			if (!web3.utils.isAddress(newaddress2) && obj.status == 2) {
				alert(this.t('tipsjs2'));
				return;
			}
			if (obj.status == 2) {
				// 确认转移
				this.zyajax(newaddress2,obj);
			}
		},
		// 修改-暂弃
		editajax(newaddress,obj){
			var self = this
			self.axios.post(this.base_url+'/v2/mint/mint/updateAddress',{instanceId:obj.instanceId,
					currentAddress: obj.receiver,
					newAddress : newaddress}).then(res=>{
						if (res.code == 0) {
						alert(tipsjs3);
						setTimeout(function(){
							cancelMobile();
							self.geteveryqkl();
						},1800);
						
					}
					})
		},
		zyajax(newaddress,obj){
			var self = this
			var web3 = new Web3(window.CHAIN.WALLET.provider());
			var chainId = '';
			window.CHAIN.WALLET.chainId()
				.then(function (res) {
					chainId = web3.utils.hexToNumber(res); 
					let targetChainId = '';
					if (window.location.href.indexOf('atta.zone') == -1) {
						targetChainId = '97';
					} else {
						targetChainId = '56';
					} 
					if (chainId != targetChainId) {
						window.CHAIN.WALLET.switchRPCSettings(targetChainId);
					}
					const ERC721Address: any = chainSetting["contractSetting"]["atta_ERC721"][chainId].address;// 监听 网络切换 会 让 用户 处于 正确的网络，这里 只负责 配置 当前网络下正确的 合约地址
					var ERC721ABI = chainSetting["contractSetting"]['atta_ERC721']['abi'];
					var ERC721ContractInstance = new web3.eth.Contract(ERC721ABI, ERC721Address);        
					// busdAddress 供外界使用
					
					ERC721ContractInstance.methods.safeTransferFrom(self.walletId,newaddress,obj.tokenId).send({ 
						from: self.walletId
					})
					.then(function (res) {
						alert(self.t('tipsjs4'));
						self.geteveryqkl();
					});
					setTimeout(() => {
						alert(self.t('tipsjs5'));
						setTimeout(function(){
							self.cancelMobile();
						},1800);
					}, 1000);
				});    

		},
		zhuanyiaddress(e){
			let obj = JSON.parse(e.target.dataset.json);
			let endedition = JSON.parse(e.target.dataset.endedition);
			let dom1 = document.querySelector('.modify-tit span');
			let dom2 = document.querySelector('.modify-ipt');
			let dom3 = document.querySelector('.modify-tips');
			let dom4 = document.querySelector('.modify-btn-active');
			let dom5 = document.querySelector('.cancel');
			let dom6 = document.querySelector('.modify');
			dom1.textContent = this.t('transfer1')+obj.edition+` of `+endedition+this.t('newWallt');
			var html = ``;
			html += `<div class="modify-ipt-add">
						<div class="modify-ipt-tit dqaddress">${this.t('walltAdress')}<span>`+this.walletId+`</span></div>
						<div class="modify-ipt-tit newaddress2">${this.t('transferTo')}<input type="text" value=`+this.walletId+`></div>
					</div>`;
					
			dom2.innerHTML = html;
			dom3.innerHTML = `<span class="modify-tips-content">${this.t('tips02')}</span>`;
			dom4.classList.add('add');
			dom4.textContent = this.t('confirmCurrent');
			dom4.setAttribute('data-type',e.target.dataset.json);
			dom5.style.display = "none";
			dom6.style.display = "block";
		},
		cancelMobile(){
			let dom1 = document.querySelector('.modify');
			dom1.classList.remove('modify-tc-active');
			dom1.style.display = "none";
			// $.each($('.modify input'),function(i,v){
			// 	$(v).val('');
			// })
		}
	}
})
</script>
<style>
@import "@/assets/css/media.scss";
.everymynftbox{
	justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 100px;
}
 .between{
	justify-content: space-between;
	align-items: flex-start;
}
.everymynftbox .my-assets-left{
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
.everymynftbox .my-assets-right{
	width: 40%;
}
.modify-form{
	width: 750px;
}
.titlebox{
	font-weight: bold;
	font-size: 24px;
	color: rgba(255, 255, 255, 0.9);
	margin-bottom: 15px;
}
.titlebox img{
	cursor: pointer;
}
.listbox{
	padding: 26px 0;
	border: 1px solid rgba(255, 255, 255, 0.15);
	border-left: none;
	border-right: none;
}
.everydatabox{
	margin-bottom: 30px;
	font-weight: normal;
	font-size: 20px;
	color: rgba(255, 255, 255, 0.8);
}
.inputbox{
	margin-top: 10px;
	height: 59px;
}
.srkbox{
	width: 80%;
	position: relative;
	height: 100%;
}
.srkbox input{
	width: 100%;
	height: 100%;
	background: #222222;
	border-radius: 4px;
	font-size: 20px;
	color: rgba(255, 255, 255, 0.8);
	border: none;
	padding-left: 14px;
}
.srkbox button{
	position: absolute;
	right: 23px;
	top: 10px;
	width: 73px;
	height: 40px;
	font-size: 16px;
	background: #4E4E4E;
	border-radius: 4px;
	border:none;
}
.srkbox .clickedit{
	color: #9567FF;
	position: absolute;
	right: 0;
	top: 43px;
	display: none;
	cursor: pointer;
}
.my-assets-right-download a{
	color: #A8DEEE;
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
.modify-btn .add{
	background: #A8DEEE !important;
}
.kxbor{
	border: 1px solid #606060;
	background: transparent;
}
.modify-tips{
	text-align: center;
}
.modify-tips-content{
	color: rgba(255, 255, 255, 0.7);
}
.dqaddress{
	font-size: 16px;
}
.dqaddress span{
	font-size: 14px;
}
.newaddress{
	font-size: 18px;
}
.newaddress input{
	width: 75%;
	text-indent: 12px;
}
.newaddress2 input{
	width: 83%;
	text-indent: 12px;
}
.horizontalline{
	width: 122px;
	height: 0px;
	text-align: center;
	opacity: 0.15;
	position: absolute;
	bottom: -15px;
	left: 0;
	right: 0;
	margin: auto;
	border: 1px solid #FFFFFF;
	display: none;
}
.ishide{
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