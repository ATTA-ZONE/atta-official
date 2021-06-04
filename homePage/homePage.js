var app = new Vue({
	el: '#homePage',
	components: {
	},
	data() {
		return {
			tabs: ['我的藏品', '我的NFT', 'NFT操作記錄'],
			imageIndex: 1,
			long: "",
			showHeadMenu: false
		}
	},
	mounted() {
		this.long = this.getCookie("long") ? this.getCookie("long") : "en";
		document.cookie = "long=" + this.long;
	},
	methods: {
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
	},
	filters: {
		languageswitch: function (value,chval,long) {
		  return long == "ch" ? chval : value;
		}
	}

});
