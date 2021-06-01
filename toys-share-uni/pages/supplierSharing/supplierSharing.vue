<template>
	<view class="supplier_sharing">
		<!-- pc端 -->
		<template v-if="!isMobile">
			<!-- 头部 -->
			<xHead :contactInfo="contactInfo"></xHead>
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
							<b-col cols="6" v-for="(item,index) in allProduct.slice(0,2)" :key='index'>
								<view class="product_list_item">
									<view class="product_list_img">
										<image class="img" :src="item.img"></image>
									</view>
									<view class="product_list_info">
										<view class="product_list_info_text active" :title="item.name">
											{{item.name}}
										</view>
										<view class="product_list_info_text">
											出厂货号：{{item.fa_no}}
										</view>
										<view class="product_list_info_text">
											参考单价：<text class="red_color">{{item.cu_de}}{{item.price}}</text>
										</view>
										<view class="product_list_info_text">
											<u-button type="warning" shape="circle" size="mini">查看详情</u-button>
										</view>
									</view>
								</view>
							</b-col>
						</b-row>
						<b-row :style="{marginTop:'25px'}">
							<b-col cols="3" v-for="(item,index) in allProduct.slice(2,6)" :key='index'>
								<view class="product_list_item2">
									<view class="product_list_img">
										<image class="img" :src="item.img"></image>
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
												<text class="red_color">{{item.cu_de}}{{item.price}}</text>
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
							<b-col cols="3" v-for="(item,index) in allProduct" :key='index'>
								<view class="product_list_item">
									<view class="product_list_img">
										<image class="img" :src="item.img"></image>
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
												<text class="red_color">{{item.cu_de}}{{item.price}}</text>
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
							<b-col cols="3" v-for="(item,index) in allProduct" :key='index'>
								<view class="product_list_item">
									<view class="product_list_img">
										<image class="img" :src="item.img"></image>
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
												<text class="red_color">{{item.cu_de}}{{item.price}}</text>
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
						<view class="title" v-if="contactInfo.companyName">{{contactInfo.companyName}}</view>
						<view class="name" v-if="contactInfo.contactsMan">联系人：{{contactInfo.contactsMan}}</view>
					</view>
					<view class="contact_info">
						<view class="item" v-if="contactInfo.telephoneNumber">电话：{{contactInfo.telephoneNumber}}</view>
						<view class="item" v-if="contactInfo.phoneNumber">手机：{{contactInfo.phoneNumber}}</view>
						<view class="item" v-if="contactInfo.address">地址：{{contactInfo.address}}</view>
					</view>
				</view>
			</view>
			<!-- 尾部 -->
			<xFooter></xFooter>
		</template>
	</view>
</template>

<script>
import xHead from "@/components/supplierSharing/x-head.vue"
import xFooter from "@/components/supplierSharing/x-footer.vue"
import util from "@/common/js/util.js"
import customSwiper from '@/components/blackmonth-swiper/index'
import {
  getToken
} from "@/service/common.js"
export default {
	name: "SupplierSharing",
	components: {
		customSwiper,
		xHead,
		xFooter
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
			],
			contactInfo:{}, //联系信息
			recommendProduct:[], //推荐信息
			allProduct:[],	//所有产品
		}
	},
	methods:{
		//获取厂商联系方式
		async getCompanyByIDShare() {
			var me = this;
			const res = await me.$u.api.CompanyByIDShare({
				companyNumber: uni.getStorageSync('supplier_sharing_companyNumber')
			});
			if (res.result.code === 200) {
				this.contactInfo = res.result.item;
			} else {
				uni.showToast({
					icon:'none',
					title: res.result.msg,
					duration: 2000
				});
			}
		},
		// 获取推荐产品
		async getRecommendProductByNumberPage() {
			var me = this;
			const res = await me.$u.api.RecommendProductByNumberPageShare({
				companyNumber: uni.getStorageSync('supplier_sharing_companyNumber'),
				skipCount: 1,
				maxResultCount: 8
			});
			if (res.data.result.code === 200) {
				this.recommendProduct = res.data.result.item.items;
			} else {
				uni.showToast({
					icon:'none',
					title: res.data.result.msg,
					duration: 2000
				});
			}
		},
		// 获取所有产品
		async getSupplierProductShare() {
			var me = this;
			const res = await me.$u.api.SupplierProductShare({
				companyNumber: uni.getStorageSync('supplier_sharing_companyNumber'),
				skipCount: 1,
				maxResultCount: 8
			});
			if (res.result.code === 200) {
				this.allProduct = res.result.item.items;
			} else {
				uni.showToast({
					icon:'none',
					title: res.data.result.msg,
					duration: 2000
				});
			}
		},
		//获取token
		async getToken(){
			var me = this;
			await getToken().then(
				(res) => {
					me.$u.vuex('Utoken', res[1].data.result.item)
				}
			)
		},
		async init(){
			this.isMobile=util.isMobile();
			await this.getToken();
			await this.getCompanyByIDShare();
			//await this.getRecommendProductByNumberPage();
			await this.getSupplierProductShare();
		},
	},
	mounted() {
		
	},
	updated: function () {
	  this.$nextTick(function () {
		
	  })
	},
	created(){
		uni.setStorageSync('supplier_sharing_companyNumber', this.$route.query.id);
		this.init();
	}
}
</script>
<style lang="less" scoped>
@import  "@/less/supplierSharing/supplierSharing.less";
</style>
