<template>
	<view class="supplier_sharing_detail">
		<!-- pc端 -->
		<template v-if="!isMobile">
			<!-- 头部 -->
			<xHead></xHead>
			<view class="content">
				<div class="detailBox">
					<div class="left">
						<magnifierComponent ref="magnifierRef" v-if="productDetail.imgUrlList" :middleImgWidth="524"
							:middleImgHeight="393" :thumbnailHeight="65" :thumbnailWidth="96" :thumbnailCount="5"
							:imageUrls="productDetail.imgUrlList" :videoAddress="productDetail.videoAddress"
							:threeDimensional="productDetail.threeDimensional" />
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
						<div class="myCartBox">
							<div class="myCart" @click="handlerShopping(productDetail)">
								<i class="myCartIcon"></i>
								<span>加入购物车</span>
							</div>
							<div class="myShoucang" @click="addCollect(productDetail)">
								<i class="shoucangActiveIcon" v-if="productDetail.isFavorite"></i>
								<i class="shoucangIcon" v-else></i>
								<span>产品收藏</span>
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

								<div v-if="productDetail.manuCertificateList" class="manuCertificate">
									<div class="cate" v-for="item in productDetail.manuCertificateList"
										:key="item.index">
										<!-- <img
				                  @click="openDialogCertificate(item)"
				                  :src="item.certificateAddres"
				                  alt=""
				                /> -->
										<el-image @click="openDialogCertificate(item)"
											style="width: 21px; height: 30px; min-width: 21px"
											:src="item.certificateAddres" fit="contain">
											<div slot="placeholder" class="image-slot"
												style="width: 82px; height: 62px">
												<img style="width: 21px; height: 30px; min-width: 21px"
													:src="require('@/static/images/PDF.png')" />
											</div>
											<div slot="error" class="image-slot"
												style="width: 21px; height: 30px; min-width: 21px">
												<img style="width: 21px; height: 30px; min-width: 21px"
													:src="require('@/static/images/PDF.png')" />
											</div>
										</el-image>
										<span>{{ item.certificateName }}</span>
									</div>
								</div>
							</div>
						</div>
						<!-- 联系方式 -->
						<div class="contactMode">
							<p class="item">
								<i class="factoryIcon"></i>
								<!-- <el-tooltip effect="dark" :content="productDetail.supplierName" placement="top">
									<span class="context" @click="toFactory(productDetail)">{{
				                productDetail.supplierName
				              }}</span>
								</el-tooltip> -->
							</p>
							<p class="item myHover" @click="toNews(productDetail)">
								<i class="infoIcon"></i>
								<span>在线咨询</span>
							</p>
							<p class="item myHover" v-if="productDetail.supplierTelephoneNumber">
								<i class="phoneIcon"></i>
								<!-- <el-tooltip effect="dark" :content="productDetail.supplierTelephoneNumber"
									placement="top">
									<span class="context">{{
				                productDetail.supplierTelephoneNumber
				              }}</span>
								</el-tooltip> -->
							</p>
							<p class="item myHover" v-if="productDetail.supplierPhone">
								<i class="sjIcon"></i>
								<el-tooltip effect="dark" :content="productDetail.supplierPhone" placement="top">
									<span class="context">{{ productDetail.supplierPhone }}</span>
								</el-tooltip>
							</p>
							<p class="item myHover" v-if="productDetail.supplierQQ">
								<i class="qqIcon"></i>
								<el-tooltip effect="dark" :content="productDetail.supplierQQ" placement="top">
									<span class="context">{{ productDetail.supplierQQ }}</span>
								</el-tooltip>
							</p>
							<p class="item myHover" @click="toFactory(productDetail)">
								<i class="shopIcon"></i>
								<span>厂商店铺</span>
							</p>
						</div>
						<!-- 来源 -->
						<div class="sourceBox">
							<p class="item">
								资源来源：
								<span>{{ productDetail.exhibitionName }}</span>
							</p>
							<p class="item">
								展厅编号：
								<span>{{ productDetail.number }}</span>
							</p>
							<p class="item">
								摊位号：
								<span>{{ productDetail.booth_nu_pro }}</span>
							</p>
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

				<!-- <el-dialog title="证书详情" :visible.sync="dialogCertificate">
					<div class="dialogCertificateCss">
						<img :src="dataCertificate.certificateAddres" alt="" />
					</div>
				</el-dialog> -->
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
	import magnifierComponent from '@/components/supplierSharing/magnifierComponent.vue'
	export default {
		name: "SupplierSharingDetail",
		components: {
			customSwiper,
			xHead,
			xFooter,
			magnifierComponent
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
			}
		},
		methods: {
			onSwiper(swiper) {
				console.log(swiper);
			},
			onSlideChange() {
				console.log('slide change');
			},
			async init() {
				this.isMobile = util.isMobile();
				// await this.getToken();
			},
		},
		mounted() {

		},
		created() {
			this.init();
		}
	}
</script>
<style lang="less" scoped>
	@import "@/less/supplierSharing/supplierSharingDetail.less";
</style>
