<template>
	<view class="supplier_product_detail">
		<!-- pc端 -->
		<template v-if="!isMobile">
			<!-- 头部 -->
			<spHead active="dontLoadShareFactory"></spHead>
			<view class="content">
				<view class="title">
					<view class="text">产品分享展示</view>
				</view>
				<view class="detailBox">
					<view class="tool_bar">
						<view class="item">
							首页>产品详情
						</view>
						<view class="item_right">
							<view class="item_btn return_png" @click="goReturn()"></view>
							<view class="item_btn share_png" @click="copyShare"></view>
						</view>
					</view>
					<view class="product_info">
						<view class="product_info_box">
							<view class="left">
								<spMagnifierComponent ref="magnifierRef" v-if="productDetail.imgUrlList"
									:productInfos="productDetail"></spMagnifierComponent>
							</view>
							<view class="right">
								<view class="context">
									<view class="productName">
										<span>{{ productDetail.name
									  }}<i class="newIcon" v-if="productDetail.isNew">新品</i>
											<i class="nowIcon" v-if="productDetail.isSpotGoods">现货</i>
											<i class="vipIcon" v-if="productDetail.isVip">VIP</i></span>
									</view>
									<view class="priceWrap">
										<!-- 参考单价： -->
										<span class="priceBox">￥<span class="price">{{ productDetail.offerAmount||0 }}</span></span>
									</view>
									<view class="textWrap">
										<view class="textWrap_left">
											<view class="itemText">
												出厂货号：<span>{{ productDetail.fa_no }}</span>
											</view>
											<view class="itemText">
												包装：<span>{{ productDetail.ch_pa }}</span>
											</view>
											<view class="itemText">
												产品规格：
												<span>{{ productDetail.pr_le }} x {{ productDetail.pr_wi }} x
													{{ productDetail.pr_hi }} (cm)</span>
											</view>
											<view class="itemText">
												外箱规格：
												<span>{{ productDetail.ou_le }} x {{ productDetail.ou_wi }} x
													{{ productDetail.ou_hi }} (cm)</span>
											</view>
											<view class="itemText">
												包装规格：
												<span>{{ productDetail.in_le }} x {{ productDetail.in_wi }} x
													{{ productDetail.in_hi }} (cm)</span>
											</view>
											<view class="itemText">
												装箱量：
												<span>{{ productDetail.in_en }} /
													{{ productDetail.ou_lo }} (pcs)</span>
											</view>
											<view class="itemText">
												体积/材积：
												<span>{{ productDetail.bulk_stere }} (cbm) /
													{{ productDetail.bulk_feet }} (cuft)</span>
											</view>
											<view class="itemText">
												毛重/净重：
												<span>{{ productDetail.gr_we }} /
													{{ productDetail.ne_we }} (kg)</span>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- <view class="productDetails">
					<view class="productDetails_title">其他产品</view>
					<view class="productDetails_content">
						<b-row no-gutters>
							<b-col cols="3" v-for="(item,index) in proudctList" :key='index'>
								<view class="product_list_item2" @click="goDetail(item.id)">
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
												<text class="red_color">￥{{item.price}}</text>
											</view>
										</view>
									</view>
								</view>
							</b-col>
						</b-row>
					</view>
				</view> -->
			</view>
			<u-toast ref="uToast" />
			<!-- 尾部 -->
			<xFooter></xFooter>
		</template>
		<template v-else>
			<u-navbar back-text="" title="产品详情" :background="background" title-color="#ffffff" back-icon-color="#ffffff"></u-navbar>
			<view class="mobile_head">
				<xSwiper :list="productDetail.imgUrlList" mode="number" :autoplay="false"  indicator-pos="bottomRight" height="529" border-radius='0' v-if="!is_show_pc_modal"></xSwiper>
				<view class="mobile_sm_panel" v-else>
					<iframe
					  :src="productDetail.threeDimensional"
					  id="map2"
					  scrolling="no"
					  frameborder="0"
					  class="mobild_sm_iframe"
					></iframe>
				</view>
				<view class="three_d" @click='show_mobile_modal' @tap='show_mobile_modal' v-if="productDetail.threeDimensional">{{is_show_pc_modal?'图片展示':'3D展示'}}</view>
			</view>
			<view class="mobile_content">
				<view class="item active">{{productDetail.name}}</view>
				<view class="item"><label class="label">参考报价：</label><text class="red_color text">￥{{productDetail.offerAmount||0}}</text></view>
				<view class="item"><label class="label">出厂货号：</label><text class="text">{{productDetail.fa_no}}</text></view>
				<view class="item"><label class="label">包装方式：</label><text class="text">{{productDetail.ch_pa}}</text></view>
				<view class="item"><label class="label">样品规格：</label><text class="text">{{productDetail.pr_le}}x{{productDetail.pr_wi}}x{{productDetail.pr_hi}}(CM)</text></view>
				<view class="item"><label class="label">包装规格：</label><text class="text">{{productDetail.in_le}}x{{productDetail.in_wi}}x{{productDetail.in_hi}}(CM)</text></view>
				<view class="item"><label class="label">外箱规格：</label><text class="text">{{productDetail.ou_le}}x{{productDetail.ou_wi}}x{{productDetail.ou_hi}}(CM)</text></view>
				<view class="item"><label class="label">装箱量：</label><text class="text">{{productDetail.in_en}}/{{productDetail.ou_lo}}(PCS)</text></view>
				<view class="item"><label class="label">体积/材积：</label><text class="text">{{productDetail.bulk_stere}}(CBM)/{{productDetail.bulk_feet}}(CUFT)</text></view>
				<view class="item"><label class="label">毛重/净重：</label><text class="text">{{productDetail.gr_we}}/{{productDetail.ne_we}}(kg)</text></view>
			</view>
			<xFooter type='absolute'></xFooter>
			<u-toast ref="uToast" />
		</template>
	</view>
</template>

<script>
	import spHead from "@/components/supplierProduct/sp_head.vue"
	import xFooter from "@/components/supplierProduct/footer.vue"
	import util from "@/common/js/util.js"
	import customSwiper from '@/components/blackmonth-swiper/index'
	import spMagnifierComponent from '@/components/supplierProduct/magnifierComponent.vue'
	import xSwiper from "@/components/x-swiper.vue"
	import {
	  getToken
	} from "@/service/common.js"
	
	export default {
		name: "SupplierProductDetail",
		components: {
			customSwiper,
			spHead,
			xFooter,
			spMagnifierComponent,
			xSwiper
		},
		data() {
			return {
				logo: require("@/static/logo.png"),
				supplier_sharing_3d: require("@/static/images/supplier_sharing_3d.png"),
				isMobile: false, //是否移动端
				productDetail: {

				},
				dialogCertificate: false,
				dataCertificate: {},
				proudctList:[],
				background:{ background:'#84C9EF'},
				is_show_pc_modal:false,  //是否显示3d
			}
		},
		methods: {
			goReturn(){
				window.history.go(-1);
			},
			dealImgUrl() {
				var imgs = [];
				if(this.productDetail.videoAddress){
					var obj= {
						type: 'video',
						imgUrl: this.productDetail.videoAddress,
					}
					imgs.push(obj);
				}
				// for(var i=0;i<this.productDetail.imglist.length;i++){
				// 	var obj= {
				// 		type: 'img',
				// 		image: this.productDetail.imglist[i].imgUrl,
				// 	}
				// 	imgs.push(obj);
				// }
				// this.$set(this.productDetail,'imgUrlList',imgs);
				if(!this.isMobile){
					this.nowImg = this.productDetail.imgUrlList[0];
					this.pc_img_index = 0;
				} else { //有3d就默认显示3d
					if(this.productDetail.threeDimensional){
						this.is_show_pc_modal = true;
					}
				}
			},
			//获取产品信息
			async getProductByProductNumber() {
				var me = this;
				const res = await me.$u.api.GetProductByProductNumber({
					id: me.$route.params.id
				});
				if (res.result.code === 200) {
					this.productDetail = res.result.item;
					var imgs = [];
					if(this.productDetail.videoAddress){
						var obj= {
							type: 'video',
							imgUrl: this.productDetail.videoAddress,
						}
						imgs.push(obj);
					}
					for(var i=0;i<this.productDetail.imgUrlList.length;i++){
						var obj= {
							type: 'img',
							image: this.productDetail.imgUrlList[i],
						}
						imgs.push(obj);
					}
					this.$set(this.productDetail,'imgUrlList',imgs);
					if(!this.isMobile){
						this.nowImg = this.productDetail.imgUrlList[0];
						this.pc_img_index = 0;
					} else { //有3d就默认显示3d
						if(this.productDetail.threeDimensional){
							this.is_show_pc_modal = true;
						}
					}
				} else {
					this.$message.error(res.result.msg);
				}
			},
			// 获取其他产品列表
			async getData() {
				var me = this;
				// me.$loading.show();
				const res = await me.$u.api.SupplierProductShare({
					companyNumber: uni.getStorageSync('supplier_sharing_companyNumber'),
					skipCount: 1,
					maxResultCount: 8,
					sortOrder: 1,
					sortType: 2,
				});
				if (res.result.code === 200) {
					me.proudctList = res.result.item.items;
					me.$loading.hide();
				} else {
					uni.showToast({
						icon:'none',
						title: res.data.result.msg,
						duration: 2000
					});
					// me.$loading.hide();
				}
			},
			//移动端端3d显示
			show_mobile_modal(){
				if(this.productDetail.threeDimensional){
					this.is_show_pc_modal = this.is_show_pc_modal ? false:true;
				} else {
					this.$refs.uToast.show({
						title: '该产品暂无3D数据！',
						type: 'error',
					});
				}
			},
			//分享链接
			copyShare(row) {
				var target = '';
				if(process.env.NODE_ENV === 'development'){
				  target = "http://124.71.6.26:8080"
				  //target = "https://www.toysbear.com"
				}else{
				  //target = "http://124.71.6.26:8080"
				  target = "https://www.toysbear.com"
				}
				var url = target + "/share/#" + this.$route.path;
				const input = document.createElement("input");
				document.body.appendChild(input);
				input.setAttribute("value", url);
				input.select();
				if (document.execCommand("Copy")) {
					document.execCommand("Copy");
					this.$refs.uToast.show({
						title: '温馨提示：复制找样报价分享链接成功！',
						type: 'success',
					});
				}
				document.body.removeChild(input);
			},
			goDetail(id){
				// uni.setStorageSync('supplierP_product_detail',JSON.stringify(item));
				// this.$Router.push({
				//     name:'supplierProductDetail'
				// })
				if (!id) {
					this.$refs.uToast.show({
						title: '温馨提示：该产品没有编号！',
						type:'error'
					})
					return false;
				}
				this.$Router.push({
					name: "supplierProductDetail",
					params: { id: id }
				});
			},
			//获取token
			async getToken(){
				var me = this;
				await getToken().then(
					(res) => {
						uni.setStorageSync('token',res[1].data.result.item);
					}
				)
			},
			async init() {
				this.isMobile = util.isMobile();
				if(!uni.getStorageSync('token')){
					await this.getToken();
				}
				await this.getProductByProductNumber();
				//await this.getData();
			},
		},
		mounted() {

		},
		created() {
			this.init();
			//this.productDetail = JSON.parse(uni.getStorageSync('supplierP_product_detail'));
			//this.isMobile ? this.dealImgUrl():'';
		}
	}
</script>
<style lang="less" scoped>
	@import "@/less/supplierProduct/supplierProductDetail.less";
</style>
