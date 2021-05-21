<template>
	<view class="offer_detail">
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
										<view class="text">产品详情</view>
									</b-col>
									<b-col cols="9" offset-sm="8" sm="2">
										<view class="return" @click="toSharing" @tab="toSharing"><u-icon name="arrow-leftward"></u-icon>返回</view>
									</b-col>
								</b-row>
							</view>
						</view>
						<view class="product_info">
							<b-row class="u_row">
								<b-col cols="12" sm="6">
									<view class="contact_info_image_box">
										<view class="contact_info_single_image_box">
											<image class="contact_info_image" :src="productInfo.imageUrl"></image>
										</view>
									</view>
									<view class="contact_info_mulit_image_box">
										<view class="pre"><u-icon name="arrow-left" :style="{marginTop:'0.2rem'}"></u-icon></view>
										<view class="image_item" v-for="(item,index) in imagesList" :key="index">
											<image class="image" :src="item.image"></image>
										</view>
										<view class="next"><u-icon name="arrow-right" :style="{marginTop:'0.2rem'}"></u-icon></view>
									</view>
								</b-col>
								<b-col cols="12" sm="6">
									<view class="info">
										<view class="item title">{{productInfo.name}}</view>
										<view class="item">出厂货号：<text>{{productInfo.fa_no}}</text></view>
										<view class="item">包装方式：<text>{{productInfo.ch_pa}}</text></view>
										<view class="item">样品规格：<text>{{productInfo.pr_le}}x{{productInfo.pr_wi}}x{{productInfo.pr_hi}}(CM)</text></view>
										<view class="item">包装规格：<text>{{productInfo.in_le}}x{{productInfo.in_wi}}x{{productInfo.in_hi}}(CM)</text></view>
										<view class="item">外箱规格：<text>{{productInfo.ou_le}}x{{productInfo.ou_wi}}x{{productInfo.ou_hi}}(CM)</text></view>
										<view class="item">装箱量：<text>{{productInfo.in_en}}/{{productInfo.ou_lo}}(PCS)</text></view>
										<view class="item">体积/材积：<text>{{productInfo.bulk_stere}}(CBM)/{{productInfo.bulk_feet}}(CUFT)</text></view>
										<view class="item">毛重/净重：<text>{{productInfo.gr_we}}/{{productInfo.gr_we}}(kg)</text></view>
										<view class="item red_color">报价：<text>{{productInfo.cu_de}}{{productInfo.offerAmount}}</text></view>
										<view class="item red_color">报价箱数：<text>{{productInfo.boxNumber}}</text></view>
										<view class="item red_color">总金额：<text>{{productInfo.cu_de}}{{productInfo.offerAmount}}</text></view>
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
			<u-navbar back-text="返回" title="产品详情"></u-navbar>
			<view class="mobile_head">
				<xSwiper :list="imagesList" mode="number" :autoplay="false"  indicator-pos="bottomRight" height="529"></xSwiper>
			</view>
			<view class="mobile_content">
				
			</view>
		</template>
	</view>
</template>

<script>
import xSwiper from "@/components/x-swiper.vue"
import util from "@/common/js/util.js"
export default {
	name: "OfferDetail",
	components: {
		xSwiper
	},
	data() {
		return {
			home_icon: require("@/static/images/home.png"),
			productInfo:{} ,//产品信息
			imagesList:[{
					image:'http://139.9.71.135:8087/ProductImgCutting//HS0000005/P161232370216465/P161232370216465_Photo03YS0595201.jpg',
					name:'111',
				},
				{
					image:'http://139.9.71.135:8087/ProductImgCutting//HS0000005/P161232370216465/P161232370216465_Photo03YS0595201.jpg',
					name:'222',
				},
				{
					image:'http://139.9.71.135:8087/ProductImgCutting//HS0000005/P161232370216465/P161232370216465_Photo03YS0595201.jpg',
					name:'333',
				},
				{
					image:'http://139.9.71.135:8087/ProductImgCutting//HS0000005/P161232370216465/P161232370216465_Photo03YS0595201.jpg',
					name:'444',
				},
				{
					image:'http://139.9.71.135:8087/ProductImgCutting//HS0000005/P161232370216465/P161232370216465_Photo03YS0595201.jpg',
					name:'555',
				},
			],
			isMobile:false   //是否移动端
		}
	},
	methods:{
		//获取content背景高度赋值
		getContentStyle(){
			var content = document.getElementsByClassName('content_bg_1');
			var content3 = document.getElementsByClassName('content_bg_3');
			content3[0].style.height = content[0].clientHeight+"px";
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
		//获取产品信息
		async getProductByProductNumber() {
			var me = this;
			const res = await me.$u.api.GetProductByProductNumber({
				id: me.$route.params.id
			});
			if (res.result.code === 200) {
				this.productInfo = res.result.item;
			} else {
				this.$message.error(res.result.msg);
			}
		},
		//初始化
		async init(){
			this.isMobile=util.isMobile();
			await this.getProductByProductNumber();
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
@import  "@/less/offerSharing/offerDetail.less";
</style>
