<template>
	<view class="offer_contact" :class="[isMobile ? 'gray_bg_color':'']">
		<template v-if="!isMobile">
			<view class="head_bakcground_right_2">
			</view>
			<view class="head_bakcground_left_1">
			</view>
			<view class="head">
				<view class="head_bakcground">
				</view>
				<view class="head_bakcground_right">
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
				</view>
				<view class="content_bg_4">
				</view>
				<view class="content_bg_5">
				</view>
				<view class="content_bg_1">
					<view class="content_bg_2">
						
					</view>
					<view class="content_bg_3">
						
					</view>
					<view class="offer_panel">
						<view class="offer_info">
							<view class="title">
								<b-row>
									<b-col cols="3" sm="2">
										<view class="text">联系方式</view>
									</b-col>
									<b-col cols="9" offset-sm="8" sm="2">
										<view class="return" @click="toSharing" @tab="toSharing"><u-icon name="fanhui" custom-prefix="custom-icon" :style="{marginRight: '10px'}"></u-icon>返回</view>
									</b-col>
								</b-row>
							</view>
						</view>
						<view class="contact_info">
							<b-row class="u_row">
								<b-col cols="12" sm="6">
									<view class="map">
										<map style="width: 100%; height: 300px;" :latitude="latitude" :longitude="longitude" :markers="covers"></map>
									</view>
								</b-col>
								<b-col cols="12" sm="6">
									<view class="info">
										<view class="item title">联系方式</view>
										<view class="item">公司名称：<text>小竹熊玩具云科技公司</text></view>
										<view class="item">联系人：<text>18902747007</text></view>
										<view class="item">邮箱：<text>aly@alytrading.com</text></view>
										<view class="item">地址：<text>广东省汕头市澄海区莱美路港口路段</text></view>
									</view>
								</b-col>
							</b-row>
						</view>
					</view>
				</view>
			</view>
			<view class="footer">
			<view class="title">Copyright©2021 深圳小竹熊科技有限公司 粤ICP备13031421号-4</view>
		</view>
		</template>
		<template v-else>
			<u-navbar back-text="" title="联系方式" :background="background" title-color="#ffffff" back-icon-color="#ffffff"></u-navbar>
			<view class="mobile_head">
				<view class="map">
					<map style="width: 100%; height: 300px;" :latitude="latitude" :longitude="longitude" :markers="covers"></map>
				</view>
			</view>
			<view class="mobile_content">
				<view class="item title">联系方式</view>
				<view class="item">公司名称：<text>小竹熊玩具云科技公司</text></view>
				<view class="item">联系人：<text>18902747007</text></view>
				<view class="item">邮箱：<text>aly@alytrading.com</text></view>
				<view class="item">地址：<text>广东省汕头市澄海区莱美路港口路段</text></view>
			</view>
			<view class="footer">
				<view class="title">Copyright©2021 深圳小竹熊科技有限公司 粤ICP备13031421号-4</view>
			</view>
		</template>
	</view>
</template>

<script>
import util from "@/common/js/util.js"
export default {
	name: "OfferContact",
	components: {
		
	},
	data() {
		return {
			home_icon: require("@/static/images/home.png"),
			latitude: 23.446463,
			longitude: 116.784154,
			covers: [{
				latitude: 23.446463,
				longitude: 116.784154,
				iconPath: '@/static/images/map.png'
			}, {
				latitude: 23.446463,
				longitude: 116.784154,
				iconPath: '@/static/images/map.png'
			}],
			isMobile:false,   //是否移动端
			background:{ background:'#5365f4'},
		}
	},
	methods:{
		//获取content背景高度赋值
		getContentStyle(){
			if(!this.isMobile){
				var content = document.getElementsByClassName('content_bg_1');
				var content3 = document.getElementsByClassName('content_bg_3');
				content3[0].style.height = content[0].clientHeight+"px";
			}
		},
		//to分享首页
		toSharing(){
			var id = uni.getStorageSync('offer_sharing_id');
			this.$Router.push({
			    path:'/offerSharing',
				query:{
					id:id
				}
			})
		},
		//初始化
		async init(){
			this.isMobile=util.isMobile();
		}
	},
	mounted() {
		this.getContentStyle();
	},
	updated: function () {
	  this.$nextTick(function () {
	    this.getContentStyle();
	  })
	},
	created(){
		this.init();
	}
}
</script>

<style lang="less" scoped>
@import  "@/less/offerSharing/offerContact.less";
</style>
