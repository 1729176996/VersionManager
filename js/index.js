$(function() {
	mui.init();
	var vm = new Vue({
		el: "#main",
		data() {
			return {
				list: [],
			};
		},
		mounted() {
			this.init();
		},
		created() {

		},
		methods: {
			init() {
				var _this = this;
				var url = 'version.json';
				axios.get(url).then(res => {
					console.log(res)
					console.log(res.data)
					_this.list = res.data && res.data.list && res.data.list.length > 0 ? res
						.data.list : [];
					_this.$forceUpdate();
				}).catch(err => {
					console.log(err);
				})
			},
		},
	})
});
