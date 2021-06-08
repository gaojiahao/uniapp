<template>
	<view class="footer" :class="[type=='absolute'?'fixed':'']">
		<view class="item left"><u-icon name="phone"></u-icon>技术支持：0754-89671122</view>
		<view class="item">Copyright © 2021深圳宏升软件技术开发有限公司 粤ICP备13031421号-4</view>
	</view>
</template>

<script>


export default {
	name: "x-footer",
	props: {
		type: {
			type: String,
			default: 'relative'   //页脚固定位置类型
		}
	},
	data() {
		return {

		}
	},
	methods:{

	},
	mounted() {
		
	},
}
</script>
<style lang="less" scoped>
@media screen and (min-width: 768px){
	.footer{
		width: 100%;
		height: 92px;
		background: #FFFFFF;
		color: #333333;
		display: flex;
		justify-content: center;
		line-height: 92px;
		.item{
			// text-align: center;
			// padding: 18px 0 0 0;
		}
		.left{
			flex: 0 0 300px;
		}
	}
}
@media screen and (max-width: 767px){
	.footer{
		width: 100%;
		background: #FFFFFF;
		color: #333333;
		display: flex;
		justify-content: center;
		text-align: center;
		.item{
			font-size: 12px;
			padding: 16px 32px 11px 32px;
			width: 350px;
		}
		.left{
			flex: 0 0 300px;
			display: none;
		}
	}
	.fixed{
		position: fixed;
		bottom: 0;
	}
}
</style>
