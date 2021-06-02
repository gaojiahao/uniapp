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
										<BMapComponent
											ref="mapBaiduMap"
											isMapClick="审核"
											:address="defaultContact.contactAddress"
										  ></BMapComponent>
									</view>
								</b-col>
								<b-col cols="12" sm="6">
									<view class="info">
										<view class="item title">联系方式</view>
										<view class="item" v-if="defaultContact.companyName"><view class="label">公司名称：</view><view>{{defaultContact.companyName}}</view></view>
										<view class="item" v-if="defaultContact.contactName"><view class="label">联系人：</view><view>{{defaultContact.contactName}}</view></view>
										<view class="item" v-if="defaultContact.phoneNumber||defaultContact.telephone"><view class="label">联系电话：</view><view>{{defaultContact.phoneNumber||defaultContact.telephone}}</view></view>
										<view class="item" v-if="defaultContact.email"><view class="label">邮箱：</view><view>{{defaultContact.email}}</view></view>
										<view class="item" v-if="defaultContact.contactAddress"><view class="label">地址：</view><view>{{defaultContact.contactAddress}}</view></view>
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
					<!-- <map style="width: 100%; height: 300px;" :latitude="latitude" :longitude="longitude" :markers="covers"></map> -->
					<BMapComponent
						ref="mapBaiduMap"
						isMapClick="审核"
						:address="defaultContact.contactAddress"
					  ></BMapComponent>
				</view>
			</view>
			<view class="mobile_content">
				<view class="item title">联系方式</view>
				<view class="item" v-if="defaultContact.companyName">公司名称：<text>{{defaultContact.companyName}}</text></view>
				<view class="item" v-if="defaultContact.contactName">联系人：<text>{{defaultContact.contactName}}</text></view>
				<view class="item" v-if="defaultContact.phoneNumber||defaultContact.telephone">联系电话：<text>{{defaultContact.phoneNumber||defaultContact.telephone}}</text></view>
				<view class="item" v-if="defaultContact.email">邮箱：<text>{{defaultContact.email}}</text></view>
				<view class="item" v-if="defaultContact.contactAddress">地址：<text>{{defaultContact.contactAddress}}</text></view>
			</view>
			<view class="footer">
				<view class="title">Copyright©2021 深圳小竹熊科技有限公司 粤ICP备13031421号-4</view>
			</view>
		</template>
	</view>
</template>

<script>
import BMapComponent from "@/components/x-map.vue";
import util from "@/common/js/util.js"
export default {
	name: "OfferContact",
	components: {
		BMapComponent
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
			defaultContact:{
				companyName:'小竹熊玩具云科技公司',
				contactName:'李小姐',
				phoneNumber:'',
				telephone:'18902747007',
				email:'aly@alytrading.com',
				contactAddress:'广东省汕头市澄海区莱美路港口路段',
			}
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
			// var id = uni.getStorageSync('offer_sharing_id');
			// this.$Router.push({
			//     path:'/offerSharing',
			// 	query:{
			// 		id:id
			// 	}
			// })
			window.history.go(-1);
		},
		//获取联系方式
		async getContactInformationListShare(){
			var me = this;
			const res = await me.$u.api.ContactInformationListShare({
				CompanyNumber: uni.getStorageSync('offer_sharing_companyNumber'),
				userId: uni.getStorageSync('offer_sharing_userId'),
			});
			if (res.result.code === 200) {
				this.setContact(res.result.item);
			} else {
				// this.$message.error(res.result.msg);
			}
		},
		//设置联系方式
		setContact(data){
			for(var i = 0; i < data.length; i++){
				if(data[i]['language']=="zh-CN"){
					this.defaultContact = data[i];
					break;
				} else {
					this.defaultContact = data[i]
				}
			}
		},
		//初始化
		async init(){
			this.isMobile=util.isMobile();
			this.getContactInformationListShare();
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
