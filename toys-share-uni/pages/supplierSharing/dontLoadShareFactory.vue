<template>
	<view class="supplier_sharing">
		<!-- pc端 -->
		<template v-if="!isMobile">
			<!-- 头部 -->
			<xHead :contactInfo="contactInfo" active="dontLoadShareFactory" :threeMenuTemp="threeMenuTemp" :remMenuTemp="remMenuTemp"></xHead>
			<view class="content">
				<!-- 幻灯片 -->
				<view class="content_swiper">
					<image :src="threeProduct.length ? supplier_sharing_3d:recommendProduct.length?supplier_sharing_3d_2:supplier_sharing_3d_3" class="product_label"></image>
					<customSwiper :swiper-lists="threeProduct.length ? threeProduct:recommendProduct.length?recommendProduct:allProduct" @go-detail="goDetail"></customSwiper>
				</view>
				<!-- 推荐产品 -->
				<view class="content_recommend_product" v-if="threeProduct.length&&recommendProduct.length">
					<view class="title rp"></view>
					<view class="product_list">
						<b-row >
							<b-col cols="6" v-for="(item,index) in recommendProduct.slice(0,2)" :key='index'>
								<view class="product_list_item">
									<view class="product_list_img" @click="goDetail(item)">
										<image class="img" :src="item.img?item.img:defaultImg"></image>
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
											<u-button type="warning" shape="circle" size="mini" @click="goDetail(item)">查看详情</u-button>
										</view>
									</view>
								</view>
							</b-col>
						</b-row>
						<b-row :style="{marginTop:'25px'}">
							<b-col cols="3" v-for="(item,index) in recommendProduct.slice(2,6)" :key='index'>
								<view class="product_list_item2">
									<view class="product_list_img" @click="goDetail(item)">
										<image class="img" :src="item.img?item.img:defaultImg"></image>
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
							<u-button class="orange-btn" shape="circle" @click="toLink('supplierSharingRecList')">查看更多></u-button>
						</view>
					</view>
				</view>
				<!-- 最新产品 -->
				<view class="content_new_product" v-if="recommendProduct.length">
					<view class="title rp"></view>
					<view class="product_list">
						<b-row>
							<b-col cols="3" v-for="(item,index) in allProduct" :key='index'>
								<view class="product_list_item">
									<view class="product_list_img" @click="goDetail(item)">
										<image class="img" :src="item.img?item.img:defaultImg"></image>
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
							<u-button class="grenn-btn" shape="circle" @click="toLink('supplierSharingAllList')">查看更多></u-button>
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
									<view class="product_list_img" @click="goDetail(item)">
										<image class="img" :src="item.img?item.img:defaultImg"></image>
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
							<u-button class="blue-btn" shape="circle" @click="toLink('supplierSharingAllList')">查看更多></u-button>
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
	name: "DontLoadShareFactory",
	components: {
		customSwiper,
		xHead,
		xFooter
	},
	data() {
		return {
			logo: require("@/static/logo.png"),
			supplier_sharing_3d: require("@/static/images/supplier_sharing_3d.png"),
			supplier_sharing_3d_2: require("@/static/images/supplier_sharing_3d_2.png"),
			supplier_sharing_3d_3: require("@/static/images/supplier_sharing_3d_3.png"),
			defaultImg: require("@/static/images/logo.png"),
			isMobile:false,   //是否移动端
			contactInfo:{}, //联系信息
			recommendProduct:[], //推荐信息
			allProduct:[],	//所有产品
			threeProduct:[] 	,//3d产品
			threeMenuTemp:0,
			remMenuTemp:0,
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
				uni.setStorageSync('supplier_sharing_contactInfo',JSON.stringify(this.contactInfo));
			} else {
				uni.showToast({
					icon:'none',
					title: res.result.msg,
					duration: 2000
				});
			}
		},
		// 获取推荐产品
		async getThreeDPage() {
			var me = this;
			const res = await me.$u.api.SupplierProducts({
				companyNumber: uni.getStorageSync('supplier_sharing_companyNumber'),
				skipCount: 1,
				maxResultCount: 5,
				isUpInset3D: true,
				isUpInsetImg: true,
				videoId: 1,
			});
			if (res.result.code === 200) {
				this.threeProduct = res.result.item;
				uni.setStorageSync('threeMenu',res.result.item.length);
				this.threeMenuTemp = res.result.item.length;
				//uni.setStorageSync('threeMenu',0);
			} else {
				uni.showToast({
					icon:'none',
					title: res.data.result.msg,
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
			if (res.result.code === 200) {
				this.recommendProduct = res.result.item.items;
				uni.setStorageSync('remMenu',res.result.item.totalCount);
				this.remMenuTemp = res.result.item.totalCount;
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
					//me.$u.vuex('Utoken', res[1].data.result.item)
					uni.setStorageSync('token',res[1].data.result.item);
				}
			)
		},
		//去详情页
		goDetail(item){
			uni.setStorageSync('supplier_sharing_detail',JSON.stringify(item));
			this.$Router.push({
			    name:'supplierSharingDetail'
			})
		},
		//链接跳转
		toLink(value){
			this.$Router.push({
			    name: value
			})
		},
		async init(){
			this.$loading.show();
			this.isMobile=util.isMobile();
			await this.getToken();
			await this.getCompanyByIDShare();
			await this.getThreeDPage();
			await this.getRecommendProductByNumberPage();
			await this.getSupplierProductShare();
			this.$loading.hide();
		},
	},
	mounted() {
		
	},
	updated: function () {
	  this.$nextTick(function () {
		
	  })
	},
	created(){
		if(uni.getStorageSync('supplier_sharing_companyNumber')||this.$route.query.companyNumber){
			uni.getStorageSync('supplier_sharing_companyNumber') ?  (this.$route.query.companyNumber ? uni.setStorageSync('supplier_sharing_companyNumber', this.$route.query.companyNumber):''): uni.setStorageSync('supplier_sharing_companyNumber', this.$route.query.companyNumber);
			this.init();
		} else {
			this.$loading.show();
		}
	}
}
</script>
<style lang="less" scoped>
@import  "@/less/supplierSharing/supplierSharing.less";
</style>
