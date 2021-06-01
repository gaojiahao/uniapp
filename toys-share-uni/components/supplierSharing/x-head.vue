<template>
	<view class="head">
		<view class="head_item_grid">
			<view class="logo">
				<image :src="logo" class="image"></image>
			</view>
			<view class="title">
				凯乐智玩具工厂
			</view>
			<view class="menu">
				<my-link to="{path: '/supplierSharing'}" navType="pushTab">
					<view class="menu_item active">首页</view>
				</my-link>
				<my-link to="{path: '/supplierSharingList',query: {type: 'threeD'}}" navType="pushTab">
					<view class="menu_item">3D产品</view>
				</my-link>
				<my-link to="{path: '/supplierSharingList',query: {type: 'tuijian'}}" navType="pushTab">
					<view class="menu_item">推荐产品</view>
				</my-link>
				<my-link to="{path: '/supplierSharingList',query: {type: 'all'}}" navType="pushTab">
					<view class="menu_item">全部产品</view>
				</my-link>
				<my-link to="{path: '/supplierSharingContact'}" navType="pushTab">
					<view class="menu_item">联系方式</view>
				</my-link>
			</view>
		</view>
	</view>
</template>

<script>

export default {
	name: "x-head",
	data() {
		return {
			logo: require("@/static/logo.png"),
		}
	},
	methods:{

	},
	mounted() {
		
	},
	created(){

	}
}
</script>
<style lang="less" scoped>
.head{
	display: flex;
	padding: 19px 360px 19px 360px;
	background: #ffffff;
	.head_item_grid{
		width: 100%;
		display: flex;
		.logo{
			width: 105px;
			height: 73px;
			.image{
				width: 105px;
				height: 73px;
			}
		}
		.title{
			height: 73px;
			font-size: 32px;
			font-weight: 800;
			text-align: left;
			color: #333333;
			line-height: 73px;
			margin-left: 16px;
		}
		.menu{
			display: flex;
			margin-left: auto;
			height: 73px;
			line-height: 73px;
			.menu_item{
				width: 100px;
				height: 40px;
				margin-top: 16.5px;
				margin-left: 30px;
				line-height: 40px;
				color: #333333;
			}
			.active{
				background: #36ade2;
				border-radius: 20px;
				text-align: center;
				color: #ffffff;
				font-size: 15px;
			}
		}
	}
}
</style>
