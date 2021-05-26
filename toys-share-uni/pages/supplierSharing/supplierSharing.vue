<template>
	<view class="supplier_sharing">
		<!-- pc端 -->
		<template v-if="!isMobile">
			<!-- 头部 -->
			<view class="head">
				<view class="head_item_grid">
					<view class="logo">
						<image :src="logo" class="image"></image>
					</view>
					<view class="title">
						凯乐智玩具工厂
					</view>
					<view class="menu">
						<view class="menu_item active">首页</view>
						<view class="menu_item">3D产品</view>
						<view class="menu_item">推荐产品</view>
						<view class="menu_item">全部产品</view>
						<view class="menu_item">联系方式</view>
					</view>
				</view>
			</view>
			<view class="content">
				<!-- 幻灯片 -->
				<view class="content_swiper">
					<image :src="supplier_sharing_3d" class="product_label"></image>
					<customSwiper :swiper-list="swiperList" ></customSwiper>
				</view>
				<!-- 推荐产品 -->
				<view class="content_recommend_product">
					<view class="title rp"></view>
					<view class="product_list">
						<b-row >
							<b-col cols="6" v-for="(item,index) in rpList.slice(0,2)" :key='index'>
								<view class="product_list_item">
									<view class="product_list_img">
										<image class="img" :src="item.imageUrl"></image>
									</view>
									<view class="product_list_info">
										<view class="product_list_info_text active" :title="item.name">
											{{item.name}}
										</view>
										<view class="product_list_info_text">
											出厂货号：{{item.fa_no}}
										</view>
										<view class="product_list_info_text">
											参考单价：<text class="red_color">{{item.cu_de}}{{item.offerAmount}}</text>
										</view>
										<view class="product_list_info_text">
											<u-button type="warning" shape="circle" size="mini">查看详情</u-button>
										</view>
									</view>
								</view>
							</b-col>
						</b-row>
						<b-row :style="{marginTop:'25px'}">
							<b-col cols="3" v-for="(item,index) in rpList.slice(2,6)" :key='index'>
								<view class="product_list_item2">
									<view class="product_list_img">
										<image class="img" :src="item.imageUrl"></image>
									</view>
									<view class="product_list_info">
										<view class="product_list_info_text active" :title="item.name">
											{{item.name}}
										</view>
										<view class="product_list_info_plus">
											<view class="product_list_info_text_left">
												出厂货号：{{item.fa_no}}
											</view>
											<view class="product_list_info_text_right">
												<text class="red_color">{{item.cu_de}}{{item.offerAmount}}</text>
											</view>
										</view>
									</view>
								</view>
							</b-col>
						</b-row>
						<view class="more_btn">
							<u-button class="orange-btn" shape="circle" >查看更多></u-button>
						</view>
					</view>
				</view>
				<!-- 最新产品 -->
				<view class="content_new_product">
					<view class="title rp"></view>
					<view class="product_list">
						<b-row>
							<b-col cols="3" v-for="(item,index) in rpList" :key='index'>
								<view class="product_list_item">
									<view class="product_list_img">
										<image class="img" :src="item.imageUrl"></image>
									</view>
									<view class="product_list_info">
										<view class="product_list_info_text active" :title="item.name">
											{{item.name}}
										</view>
										<view class="product_list_info_plus">
											<view class="product_list_info_text_left">
												出厂货号：{{item.fa_no}}
											</view>
											<view class="product_list_info_text_right">
												<text class="red_color">{{item.cu_de}}{{item.offerAmount}}</text>
											</view>
										</view>
									</view>
								</view>
							</b-col>
						</b-row>
						<view class="more_btn">
							<u-button class="grenn-btn" shape="circle" >查看更多></u-button>
						</view>
					</view>
				</view>
				<!-- 其他产品 -->
				<view class="content_other_product">
					<view class="title rp"></view>
					<view class="product_list">
						<b-row>
							<b-col cols="3" v-for="(item,index) in rpList" :key='index'>
								<view class="product_list_item">
									<view class="product_list_img">
										<image class="img" :src="item.imageUrl"></image>
									</view>
									<view class="product_list_info">
										<view class="product_list_info_text active" :title="item.name">
											{{item.name}}
										</view>
										<view class="product_list_info_plus">
											<view class="product_list_info_text_left">
												出厂货号：{{item.fa_no}}
											</view>
											<view class="product_list_info_text_right">
												<text class="red_color">{{item.cu_de}}{{item.offerAmount}}</text>
											</view>
										</view>
									</view>
								</view>
							</b-col>
						</b-row>
						<view class="more_btn">
							<u-button class="blue-btn" shape="circle" >查看更多></u-button>
						</view>
					</view>
				</view>
				<!-- 联系方式 -->
				<view class="content_contact">
					<view class="contact_img"></view>
					<view class="contact_way">
						<view class="title">凯乐智玩具工厂</view>
						<view class="name">联系人：郑成功</view>
					</view>
					<view class="contact_info">
						<view class="item">电话：85816688</view>
						<view class="item">手机：15986860216</view>
						<view class="item">地址：深圳市龙岗区坂田街道民乐科技大厦205室</view>
					</view>
				</view>
			</view>
			<!-- 尾部 -->
			<view class="footer">
				<view class="item">技术支持：0754-89671122</view>
				<view class="item">Copyright © 2021深圳宏升软件技术开发有限公司 粤ICP备13031421号-4</view>
			</view>
		</template>
		
	</view>
</template>

<script>
import util from "@/common/js/util.js"
import customSwiper from '@/components/blackmonth-swiper/index'
export default {
	name: "SupplierSharing",
	components: {
		customSwiper
	},
	data() {
		return {
			logo: require("@/static/logo.png"),
			supplier_sharing_3d: require("@/static/images/supplier_sharing_3d.png"),
			isMobile:false,   //是否移动端
			swiperList:[
				{
					name: "1:14 2.4G攀爬车土/绿",
					cu_de: "¥",
					fa_no: "GM1912-1",
					imageUrl: "http://139.9.71.135:8087/ProductImgCutting//HS0000005/P161232370216465/P161232370216465_Photo03YS0595201.jpg",
					offerAmount: 60.5
				},
				{
					name: "1:14 2.4G攀爬车土/绿",
					cu_de: "¥",
					fa_no: "GM1912-1",
					imageUrl: "http://139.9.71.135:8087/ProductImgCutting//HS0000005/P161232370216465/P161232370216465_Photo03YS0595201.jpg",
					offerAmount: 60.5
				},
				{
					name: "1:14 2.4G攀爬车土/绿",
					cu_de: "¥",
					fa_no: "GM1912-1",
					imageUrl: "http://139.9.71.135:8087/ProductImgCutting//HS0000005/P161232370216465/P161232370216465_Photo03YS0595201.jpg",
					offerAmount: 60.5
				},
				{
					name: "1:14 2.4G攀爬车土/绿",
					cu_de: "¥",
					fa_no: "GM1912-1",
					imageUrl: "http://139.9.71.135:8087/ProductImgCutting//HS0000005/P161232370216465/P161232370216465_Photo03YS0595201.jpg",
					offerAmount: 60.5
				},
				{
					name: "1:14 2.4G攀爬车土/绿",
					cu_de: "¥",
					fa_no: "GM1912-1",
					imageUrl: "http://139.9.71.135:8087/ProductImgCutting//HS0000005/P161232370216465/P161232370216465_Photo03YS0595201.jpg",
					offerAmount: 60.5
				}
			],
			rpList:[
				{
					name: "1:14 2.4G攀爬车土/绿",
					cu_de: "¥",
					fa_no: "GM1912-1",
					imageUrl: "http://139.9.71.135:8087/ProductImgCutting//HS0000005/P161232370216465/P161232370216465_Photo03YS0595201.jpg",
					offerAmount: 60.5
				},
				{
					name: "1:14 2.4G攀爬车土/绿",
					cu_de: "¥",
					fa_no: "GM1912-1",
					imageUrl: "http://139.9.71.135:8087/ProductImgCutting//HS0000005/P161232370216465/P161232370216465_Photo03YS0595201.jpg",
					offerAmount: 60.5
				},
				{
					name: "1:14 2.4G攀爬车土/绿",
					cu_de: "¥",
					fa_no: "GM1912-1",
					imageUrl: "http://139.9.71.135:8087/ProductImgCutting//HS0000005/P161232370216465/P161232370216465_Photo03YS0595201.jpg",
					offerAmount: 60.5
				},
				{
					name: "1:14 2.4G攀爬车土/绿",
					cu_de: "¥",
					fa_no: "GM1912-1",
					imageUrl: "http://139.9.71.135:8087/ProductImgCutting//HS0000005/P161232370216465/P161232370216465_Photo03YS0595201.jpg",
					offerAmount: 60.5
				},
				{
					name: "1:14 2.4G攀爬车土/绿",
					cu_de: "¥",
					fa_no: "GM1912-1",
					imageUrl: "http://139.9.71.135:8087/ProductImgCutting//HS0000005/P161232370216465/P161232370216465_Photo03YS0595201.jpg",
					offerAmount: 60.5
				},
				{
					name: "1:14 2.4G攀爬车土/绿",
					cu_de: "¥",
					fa_no: "GM1912-1",
					imageUrl: "http://139.9.71.135:8087/ProductImgCutting//HS0000005/P161232370216465/P161232370216465_Photo03YS0595201.jpg",
					offerAmount: 60.5
				}
			]
		}
	},
	methods:{
		onSwiper(swiper) {
			console.log(swiper);
		},
		onSlideChange() {
			console.log('slide change');
		},
		async init(){
			this.isMobile=util.isMobile();
			// await this.getToken();
		},
	},
	mounted() {
		
	},
	updated: function () {
	  this.$nextTick(function () {
		
	  })
	},
	created(){
		uni.setStorageSync('offer_sharing_id', this.$route.query.id);
		this.init();
	}
}
</script>
<style lang="less" scoped>
@import  "@/less/supplierSharing/supplierSharing.less";
</style>
