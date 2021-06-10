<template>
	<view class="supplier_sharing_detail">
		<!-- pc端 -->
		<xHead active="dontLoadShareFactory" :isMobile="isMobile" :showHead="false"></xHead>
		<template v-if="!isMobile">
			<view class="content">
				<div class="detailBox">
					<div class="left">
						<magnifierComponent ref="magnifierRef" v-if="productDetail.imgUrlList"
							:productInfos="productDetail" />
					</div>
					<div class="right">
						<div class="context">
							<div class="productName">
								<span>{{ productDetail.name
				              }}<i class="newIcon" v-if="productDetail.isNew">新品</i>
									<i class="nowIcon" v-if="productDetail.isSpotGoods">现货</i>
									<i class="vipIcon" v-if="productDetail.isVip">VIP</i></span>
							</div>
							<div class="priceWrap">
								参考单价：
								<span class="priceBox">{{ productDetail.cu_de
				              }}<span class="price">{{ productDetail.price }}</span></span>
							</div>
							<div class="textWrap">
								<div class="textWrap_left">
									<div class="itemText">
										出厂货号：<span>{{ productDetail.fa_no }}</span>
									</div>
									<div class="itemText">
										产品规格：
										<span>{{ productDetail.pr_le }} x {{ productDetail.pr_wi }} x
											{{ productDetail.pr_hi }} (cm)</span>
									</div>
									<div class="itemText">
										包装规格：
										<span>{{ productDetail.in_le }} x {{ productDetail.in_wi }} x
											{{ productDetail.in_hi }} (cm)</span>
									</div>
									<div class="itemText">
										体积/材积：
										<span>{{ productDetail.bulk_stere }} (cbm) /
											{{ productDetail.bulk_feet }} (cuft)</span>
									</div>
								</div>
								<div class="textWrap_right">
									<div class="itemText">
										包装：<span>{{ productDetail.ch_pa }}</span>
									</div>
									<div class="itemText">
										外箱规格：
										<span>{{ productDetail.ou_le }} x {{ productDetail.ou_wi }} x
											{{ productDetail.ou_hi }} (cm)</span>
									</div>
									<div class="itemText">
										装箱量：
										<span>{{ productDetail.in_en }} /
											{{ productDetail.ou_lo }} (pcs)</span>
									</div>
									<div class="itemText">
										毛重/净重：
										<span>{{ productDetail.gr_we }} /
											{{ productDetail.ne_we }} (kg)</span>
									</div>
								</div>
							</div>
						</div>
						<!-- 上架时间，产品认证 -->
						<div class="shelfTimeBox">
							<div class="item">
								<span class="newTime">
									上架时间：
									<span>{{
				                productDetail.newTime &&
				                  productDetail.newTime.replace(/T.*/, "")
				              }}</span>
								</span>
								<span class="stock">
									库存：
									<span class="tockValue">--</span>
								</span>
							</div>
							<div class="item">
								产品认证：
								<i v-if="productDetail.manuCertificateList" class="proveActiveIcon"></i>
								<i v-else class="proveIcon"></i>
							</div>
						</div>
						<!-- 联系方式 -->
						<div class="contactMode">
							<view class="item">
								<i class="factoryIcon"></i>
								<span class="context" @click="toFactory(productDetail)" :title="productDetail.supplierName">{{
								  productDetail.supplierName
								}}</span>
							</view>
							<view class="item myHover" v-if="productDetail.supplierTelephoneNumber">
								<i class="phoneIcon"></i>
								<span class="context">{{
								  productDetail.supplierTelephoneNumber
								}}</span>
							</view>
							<view class="item myHover" v-if="productDetail.supplierPhone">
								<i class="sjIcon"></i>
								<span class="context">{{ productDetail.supplierPhone }}</span>

							</view>
						</div>
					</div>
				</div>
				<div class="productDetails">
					<div class="title">产品资料</div>
					<div class="content">
						<div class="imgItem" v-for="imgItem in productDetail.imgUrlList" :key="imgItem">
							<img style="margin: 0 auto" :src="imgItem" alt="" />
						</div>
					</div>
				</div>
			</view>
			<!-- 尾部 -->
			<xFooter></xFooter>
		</template>
		<template v-else>
			<u-navbar back-text="" title="产品详情" :background="background" title-color="#333333" back-icon-color="#333333"></u-navbar>
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
				<view class="item"><label class="label">报价：</label><text class="red_color text">{{productDetail.cu_de}}{{productDetail.offerAmount||0}}</text></view>
				<view class="item"><label class="label">出厂货号：</label><text class="text">{{productDetail.fa_no}}</text></view>
				<view class="item"><label class="label">包装方式：</label><text class="text">{{productDetail.ch_pa}}</text></view>
				<view class="item"><label class="label">样品规格：</label><text class="text">{{productDetail.pr_le}}x{{productDetail.pr_wi}}x{{productDetail.pr_hi}}(CM)</text></view>
				<view class="item"><label class="label">包装规格：</label><text class="text">{{productDetail.in_le}}x{{productDetail.in_wi}}x{{productDetail.in_hi}}(CM)</text></view>
				<view class="item"><label class="label">外箱规格：</label><text class="text">{{productDetail.ou_le}}x{{productDetail.ou_wi}}x{{productDetail.ou_hi}}(CM)</text></view>
				<view class="item"><label class="label">装箱量：</label><text class="text">{{productDetail.in_en}}/{{productDetail.ou_lo}}(PCS)</text></view>
				<view class="item"><label class="label">体积/材积：</label><text class="text">{{productDetail.bulk_stere}}(CBM)/{{productDetail.bulk_feet}}(CUFT)</text></view>
				<view class="item"><label class="label">毛重/净重：</label><text class="text">{{productDetail.gr_we}}/{{productDetail.ne_we}}(kg)</text></view>
			</view>
			<xFooter :isMobile="isMobile"></xFooter>
			<u-toast ref="uToast" />
		</template>
	</view>
</template>

<script>
	import xHead from "@/components/supplierSharing/x-head.vue"
	import xFooter from "@/components/supplierSharing/x-footer.vue"
	import util from "@/common/js/util.js"
	import customSwiper from '@/components/blackmonth-swiper/index'
	import magnifierComponent from '@/components/supplierSharing/magnifierComponent.vue'
	import xSwiper from "@/components/x-swiper.vue"
	
	export default {
		name: "SupplierSharingDetail",
		components: {
			customSwiper,
			xHead,
			xFooter,
			magnifierComponent,
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
				background:{ background:'#ffffff'},
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
			async init() {
				this.isMobile = util.isMobile();
				// await this.getToken();
				this.isMobile ? this.dealImgUrl():'';
			},
		},
		mounted() {

		},
		created() {
			this.init();
			this.productDetail = JSON.parse(uni.getStorageSync('supplier_sharing_detail'));
		}
	}
</script>
<style lang="less" scoped>
	@import "@/less/supplierSharing/supplierSharingDetail.less";
</style>
