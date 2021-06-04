var app = new Vue({
	el: '#homePage',
	components: {
	},
	data(){
		return {
			tabs: ['我的藏品','我的NFT','NFT操作記錄'],
			imageIndex: 1,
			long : getCookie("long") ? getCookie("long") : "en",
		}
	},
	methods: {
		imageHover(idx) {
			console.log(idx);
		},
		switchyy(yy){
			this.long =yy;
			document.cookie="long="+yy
		}
	}
});
