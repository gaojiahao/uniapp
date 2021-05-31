<template>
	<div id="allmap" style="width: 100%; height: 100%; overflow: hidden"></div>
</template>
<script>
	import BMap from "BMap";
	export default {
		name: 'x-map',
		props: ["address", "isMapClick"],
		data() {
			return {
				zoom: 11,
				restaurants: [],
				map: null
			};
		},
		watch:{
			address:{
				handler(val){
					this.BaiduMap();
				},
				deep:true
			}
		},
		mounted() {
			//this.BaiduMap();
		},
		methods: {
			resetMap(val) {
				const _that = this;
				var geoc = new BMap.Geocoder();
				geoc.getPoint(
					val,
					function(point) {
						if (point) {
							_that.map.clearOverlays(); // 清除地图上所有覆盖物
							_that.map.centerAndZoom(point, 16);
							_that.map.addOverlay(new BMap.Marker(point));
						} else {
							_that.$message.error("您选择地址没有解析到结果!");
						}
					},
					"汕头市"
				);
			},
			BaiduMap() {
				const _that = this;
				this.$nextTick(() => {
					/** 地图初始化 start */
					var map = new BMap.Map("allmap"); // 创建Map实例
					this.map = map;
					// 创建地址解析器实例
					var geoc = new BMap.Geocoder();
					geoc.getPoint(
						_that.address,
						function(point) {
							if (point) {
								map.centerAndZoom(point, 16);
								map.addOverlay(new BMap.Marker(point));
							} else {
								this.$message.error("您选择地址没有解析到结果!");
							}
						},
						"汕头市"
					);
				});
			}
		}
	};
</script>
<style scpoed lang="less">
	/* 去掉地图左下角的百度LOGO */
	/deep/ .anchorBL {
		display: none;
	}
</style>
