<template>
	<view class="head">
		<view class="head_item_grid">
			<view class="logo">
				<image :src="contactInfo.companyLogo" class="image"></image>
			</view>
			<view class="title">
				{{contactInfo.companyName}}
			</view>
			<view class="menu">
				<!-- <my-link to="{path: '/supplierSharing'}" navType="pushTab"> -->
					<view class="menu_item" :class="[nowActive=='supplierSharing' ? 'active':'']" @click="toLink('supplierSharing')">首页</view>
				<!-- </my-link>
				<my-link to="{path: '/supplierSharingList'}" navType="pushTab"> -->
					<view class="menu_item" :class="[nowActive=='supplierSharingList' ? 'active':'']" @click="toLink('supplierSharingList')">3D产品</view>
				<!-- </my-link>
				<my-link to="{path: '/supplierSharingRecList'}" navType="pushTab"> -->
					<view class="menu_item" :class="[nowActive=='supplierSharingRecList' ? 'active':'']" @click="toLink('supplierSharingRecList')">推荐产品</view>
				<!-- </my-link>
				<my-link to="{path: '/supplierSharingAllList'}" navType="pushTab"> -->
					<view class="menu_item" :class="[nowActive=='supplierSharingAllList' ? 'active':'']" @click="toLink('supplierSharingAllList')">全部产品</view>
				<!-- </my-link>
				<my-link to="{path: '/supplierSharingContact'}" navType="pushTab"> -->
					<view class="menu_item" :class="[nowActive=='supplierSharingContact' ? 'active':'']" @click="toLink('supplierSharingContact')">联系方式</view>
				<!-- </my-link> -->
			</view>
		</view>
	</view>
</template>

<script>

export default {
	name: "x-head",
	props:{
		contactInfo: {
			type: Object,
			default () {
				return {}
			}
		},
		active:{
			type:String,
			default:'supplierSharing',
		}
	},
	watch:{
		active:{
			handler(val){
				this.nowActive = val;
			},
			deep:true,
			immediate:true
		}
	},
	data() {
		return {
			logo: require("@/static/logo.png"),
			nowActive:'',
		}
	},
	methods:{
		//链接跳转
		toLink(value){
			this.$Router.push({
			    name: value
			})
		}
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
			width: 73px;
			height: 73px;
			.image{
				width: 73px;
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
				text-align: center;
			}
			.menu_item:hover{
				cursor: pointer;
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
