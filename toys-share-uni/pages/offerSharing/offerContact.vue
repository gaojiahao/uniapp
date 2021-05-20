<template>
	<view class="contact">
		<view class="head_bakcground_right_2">
			<image :src="bg6" class="head_bakcground"></image>
		</view>
		<view class="head_bakcground_left_1">
			<image :src="bg2" class="head_bakcground"></image>
		</view>
		<view class="head">
			<view class="head_bakcground">
				<image :src="bg0" class="head_bakcground_0"></image>
			</view>
			<view class="head_bakcground_right">
				<image :src="bg1" class="head_bakcground"></image>
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
			<view class="content_bg_0">
				<image :src="bg8" class="head_bakcground"></image>
			</view>
			<view class="content_bg_4">
				<image :src="bg3" class="head_bakcground"></image>
			</view>
			<view class="content_bg_5">
				<image :src="bg4" class="head_bakcground"></image>
			</view>
			<view class="content_bg_1">
				<view class="content_bg_2">
					
				</view>
				<view class="content_bg_3">
					
				</view>
				<view class="offer_panel">
					
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="title">Copyright©2021 深圳小竹熊科技有限公司 粤ICP备13031421号-4</view>
		</view>
	</view>
</template>

<script>
export default {
	name: "OfferContact",
	components: {

	},
	data() {
		return {
			home_icon: require("@/static/images/home.png"),
			bg0: require("@/static/images/offer_share_0.png"),
			bg1: require("@/static/images/offer_share_1.png"),
			bg2: require("@/static/images/offer_share_2.png"),
			bg3: require("@/static/images/offer_share_3.png"),
			bg4: require("@/static/images/offer_share_4.png"),
			bg6: require("@/static/images/offer_share_6.png"),
			bg8: require("@/static/images/offer_share_8.png"),
		}
	},
}
</script>

<style>
</style>
