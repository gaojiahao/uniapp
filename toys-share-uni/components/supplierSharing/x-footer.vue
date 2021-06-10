<template>
	<view class="footer">
		<template v-if="!isMobile">
			<view class="item"><u-icon name="phone"></u-icon>技术支持：0754-89671122</view>
			<view class="item">Copyright © 2021深圳小竹熊科技有限公司 粤ICP备13031421号-4</view>
		</template>
		<template v-else>
			<view class="list">
				<view class="item">Copyright © 2021深圳小竹熊科技有限公司</view>
				<view class="item">粤ICP备13031421号-4</view>
				<view class="item"><u-icon name="phone"></u-icon>技术支持：0754-89671122</view>
			</view>
		</template>
	</view>
</template>

<script>


export default {
	name: "x-footer",
	props:{
		isMobile:{
			type:Boolean,
			default:false
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
		height: 108px;
		background: #333333;
		color: #FFFFFF;
		.item{
			text-align: center;
			padding: 18px 0 0 0;
		}
	}
}
@media screen and (max-width: 767px){
	.footer{
		width: 100%;
		height: 85px;
		background: #333333;
		color: #FFFFFF;
		font-size: 12px;
		font-weight: 400;
		text-align: center;
		color: #999999;
		line-height: 18px;
		.list{
			padding: 10px 0 55px 0;
			.item{
				text-align: center;
				margin-bottom: 5px;
			}
		}
	}
}
</style>
