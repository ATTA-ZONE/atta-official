export function getCookie(cookieName:string) {
	const strCookie = document.cookie
	const cookieList = strCookie.split('; ')
	var cookieValue = 'false';
	for (let i = 0; i < cookieList.length; i++) {
		const arr = cookieList[i].split('=')
		if (cookieName === arr[0]) {
			cookieValue = arr[1];
		}
	}

	return cookieValue;
}

export function setCookie(name:string, value:string) {
	var Days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toUTCString() + ';path=/;';
}

// 获取abi下所有的方法
import { chainSetting } from "../assets/js/chainSetting";
export async function getAbi(name:string) {
	// 要获取的abi，下面的所有配置都是统一的，都是为了最后一步获取方法
	let setting_proof: any = chainSetting["contractSetting"][name];
	let web3;
	let chainId;
	chainId = await window.CHAIN.WALLET.chainId();
	let MerkleDistributionAddress = setting_proof[chainId].address;
	// 监听 网络切换 会 让 用户 处于 正确的网络，这里 只负责 配置 当前网络下正确的 合约地址
	let MerkleDistributionABI = setting_proof["abi"];
	// 监听 网络切换 会 让 用户 处于 正确的网络，这里 只负责 配置 当前网络下正确的 合约地址
	let walletType = getCookie(window.CHAIN.WALLET.__wallet__);
	if (walletType) {
		web3 = new window.Web3(window.CHAIN.WALLET.provider());
	} else if (window.ethereum) {
		web3 = new window.Web3(window.ethereum);
	}
	// abi下的所有方法
	let MerkleDistributionInstance = new web3.eth.Contract(
		MerkleDistributionABI,
		MerkleDistributionAddress
	);
	return MerkleDistributionInstance;
}

export function moneyFormat(value) { // 金额 格式化 
	if (!value && value !== 0) return '-';
	var intPart = Number(value) | 0; //获取整数部分
	var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //将整数部分逢三一断

	var floatPart = ".00"; //预定义小数部分
	var value2Array = value.toString().split(".");

	//=2表示数据有小数位
	if (value2Array.length == 2) {
			floatPart = value2Array[1].toString(); //拿到小数部分

			if (floatPart.length == 1) { //补0,实际上用不着
					return intPartFormat + "." + floatPart + '0';
			} else {
					return intPartFormat + "." + floatPart;
			}
	} else {
			return intPartFormat;
	}
}

export function formatDate(millinSeconds){
	let date = new Date(millinSeconds);
	let monthArr = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Spt","Oct","Nov","Dec");
	let suffix = new Array("st","nd","rd","th");
	
	let year = date.getFullYear(); //年
	let month = monthArr[date.getMonth()]; //月
	let ddate:any = date.getDate(); //日
	let hours = date.getHours();
	let minute:any = date.getMinutes();
	
	if(ddate % 10 < 1 || ddate % 10 > 3) {
		ddate = ddate + suffix[3];
	}else if(ddate % 10 == 1) {
		ddate = ddate + suffix[0];
	} else if(ddate % 10 == 2) {
		ddate = ddate + suffix[1];
	}else {
		ddate = ddate + suffix[2];
	}
	return month + " "+ ddate + " " + (hours<10?'0'+hours:hours) + ":" + (minute<10?'0'+minute:minute);
}