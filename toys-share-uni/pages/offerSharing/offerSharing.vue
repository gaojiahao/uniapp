<template>
	<view class="baojia">
		<view class="head">
			<view class="head_bakcground">
				<image :src="bg0" class="head_bakcground_0"></image>
			</view>
			<view class="head_bakcground_right">
				<image :src="bg1" class="head_bakcground"></image>
			</view>
			<view class="head_bakcground_right_2">
				<image :src="bg6" class="head_bakcground"></image>
			</view>
			<view class="head_home">
				<view class="icon"><image :src="home_icon" class="head_home_icon"></image></view>
				<view class="title">小竹熊云科技</view>
			</view>
			<view class="title_info">
				<view class="top">
					找样报价分享
				</view>
				<view class="diver">
					<u-divider color="#fa3534" height="3rpx"></u-divider>
				</view>
				<view class="bottom">
					小竹熊玩具云科技公司的分享
				</view>
			</view>
		</view>
		<view class="content">
			<view class="content_bg_0"></view>
			<view class="content_bg_1">
				
			</view>
			<view class="content_bg_2">
				
			</view>
		</view>
		<view class="footer">
			<view class="title">Copyright©2021 深圳小竹熊科技有限公司 粤ICP备13031421号-4</view>
		</view>
	</view>
</template>

<script>
export default {
	name: "OfferSharing",
	components: {

	},
	data() {
		return {
			home_icon: require("@/static/images/home.png"),
			bg0: require("@/static/images/offer_share_0.png"),
			bg1: require("@/static/images/offer_share_1.png"),
			bg6: require("@/static/images/offer_share_6.png"),
		}
	}
}
</script>

<style scoped lang="less">
	.baojia{
		width: 100%;
		opacity: 1;
		background: #5363f6;
		.head{
			height: 251rpx;
			position: relative;
			.head_bakcground{
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				.head_bakcground_0{
					width: 100%;
				}
			}
			.head_bakcground_right{
				position: absolute;
				top: 32rpx;
				left: 1115rpx;
				width: 445rpx;
				height: 385rpx;
				opacity: 1;
				.head_bakcground{
					width: 445rpx;
					height: 385rpx;
				}
			}
			.head_bakcground_right_2{
				position: absolute;
				top: 48rpx;
				right: -260rpx;
				width: 412rpx;
				height: 433rpx;
				opacity: 1;
				.head_bakcground{
					width: 412rpx;
					height: 433rpx;
					opacity: 1;
				}
			}
			.head_home{
				position: absolute;
				top: 23rpx;
				left: 388rpx;
				display: flex;
				height: 20rpx;
				.icon{
					font-size: 0;
					.head_home_icon{
						width: 20rpx;
						height: 18rpx;
						opacity: 1;
					}
				}
				.title{
					height: 20rpx;
					opacity: 1;
					font-size: 14rpx;
					font-weight: 400;
					text-align: center;
					color: #ffffff;
					line-height: 20rpx;
					margin-left: 10px;
				}
			}
			.title_info{
				position: absolute;
				top: 71px;
				left: 412px;
				.top{
					width: 100%;
					height: 118rpx;
					opacity: 1;
					font-size: 86rpx;
					font-weight: 400;
					color: #ffffff;
				}
				.bottom{
					width: 100%;
					height: 54rpx;
					opacity: 1;
					font-size: 39rpx;
					font-weight: 700;
					color: #ffffff;
				}
			}
		}
		.content{
			z-index: 1;
			width: 100%;
			min-height: 595rpx;
			opacity: 1;
			background: #5363f6;
			.content_bg_0{
				
			}
			.content_bg_1{
				width: 1200rpx;
				opacity: 1;
				background: #ffffff;
				border-radius: 10px;
				box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);
				min-height: 200rpx;
				margin: auto;
				margin-top: 83px;
			}
			.content_bg_2{
				
			}
		}
		.footer{
			width: 100%;
			height: 89rpx;
			opacity: 1;
			background: #ffffff;
			.title{
				text-align: center;
				line-height: 89rpx;
				opacity: 1;
				font-size: 16rpx;
				font-weight: 400;
				color: #666666;
			}
		}
	}
	
</style>
