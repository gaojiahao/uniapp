<template>
	<view class="footer">
		<view class="item"><u-icon name="phone"></u-icon>技术支持：0754-89671122</view>
		<view class="item">Copyright © 2021深圳宏升软件技术开发有限公司 粤ICP备13031421号-4</view>
	</view>
</template>

<script>


export default {
	name: "x-footer",
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
}
</style>
