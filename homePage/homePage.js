var app = new Vue({
	el: '#homePage',
	components: {
	},
	data(){
		return {
			tabs: ['我的藏品','我的NFT','NFT操作記錄'],
			imageIndex: 1
		}
	},
	methods: {
		imageHover(idx) {
			console.log(idx);
		}
	}
});
