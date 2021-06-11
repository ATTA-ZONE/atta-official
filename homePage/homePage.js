var app = new Vue({
	el: '#homePage',
	components: {
	},
	data() {
		return {
			tabs: ['我的藏品', '我的NFT', 'NFT操作記錄'],
			imageIndex: 1,
			long: "",
			isMobile: false,
			showMask: false,
			showWechat: false,
			transitionImage:false
		}
	},
	created(){
		let self=this
		self.resizeWindow()
		window.onresize = function (){
			self.resizeWindow()
		}
	},
	mounted() {
		this.long = this.getCookie("long") ? this.getCookie("long") : "en";
		document.cookie = "long=" + this.long;
		window.addEventListener('scroll', this.handleScroll)
	},
	methods: {
		handleScroll(){
			let scrollY = document.documentElement.scrollTop;
			if(scrollY >= 1300){
				this.transitionImage = true;
			}else{
				this.transitionImage = false;
			}
		},
		resizeWindow(){
			let width = document.getElementsByTagName('body')[0].offsetWidth
			if(width < 992){
				this.isMobile = true
			} else {
				this.isMobile = false
			}
		},
		imageHover(idx) {
			console.log(idx);
		},
		switchyy(yy) {
			this.long = yy;
			document.cookie = "long=" + yy
		},
		setCookie: function (cname, cvalue, exdays) {
			var d = new Date();
			d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
			var expires = "expires=" + d.toUTCString();
			console.info(cname + "=" + cvalue + "; " + expires);
			document.cookie = cname + "=" + cvalue + "; " + expires;
			console.info(document.cookie);
		},
		//获取cookie
		getCookie(cname) {
			var name = cname + "=";
			var ca = document.cookie.split(';');
			console.log("获取cookie,现在循环")
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				console.log(c)
				while (c.charAt(0) == ' ') c = c.substring(1);
				if (c.indexOf(name) != -1) {
					return c.substring(name.length, c.length);
				}
			}
			return "";
		},
		//清除cookie
		clearCookie: function () {
			this.setCookie("username", "", -1);
		},
		toBaZhuayu(){
			window.open('https://www.bazhuayu.io/')
		},
		toPage(type){
			if(type == 1){
				this.showWechat = !this.showWechat
			}
			if(type == 2){
				window.open('https://weibo.com/attaofficial/')
			}
			if(type == 3){
				window.open('https://twitter.com/ATTA_NFT')
			}
			if(type == 4){
				window.open('https://t.me/attaofficialeng1')
			}
			if(type == 5){
				window.open('https://medium.com/atta-official')
			}
			if(type == 6){
				window.open('https://www.instagram.com/atta.zone.official/')
			}
		}
	},
	filters: {
		languageswitch: function (value,chval,long) {
		  return long == "ch" ? chval : value;
		}
	}

});
