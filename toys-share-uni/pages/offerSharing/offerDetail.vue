<template>
	<view class="offer_detail" :class="[isMobile ? 'gray_bg_color':'']">
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
										<view class="return" @click="toSharing" @tab="toSharing"><u-icon name="fanhui" custom-prefix="custom-icon" :style="{marginRight: '10px'}"></u-icon>返回</view>
									</b-col>
								</b-row>
							</view>
						</view>
						<view class="product_info">
							<b-row class="u_row">
								<b-col cols="12" sm="6">
									<view class="contact_info_image_box">
										<view class="contact_info_single_image_box">
											<image class="contact_info_image" :src="nowImg.image"></image>
										</view>
										<image :src="three_d" class="three_d" @click='show_pc_modal' v-if="productInfo.threeDimensional"></image>
									</view>
									<view class="contact_info_mulit_image_box">
										<view class="pre" @click="pre_pc_img"><u-icon name="arrow-left" :style="{marginTop:'0.2rem'}"></u-icon></view>
										<view class="image_item" v-for="(item,index) in productInfo.imgUrlList" :key="index" @click="change_pc_img(item,index)">
											<image class="image" :src="item.image"></image>
										</view>
										<view class="next" @click="next_pc_img"><u-icon name="arrow-right" :style="{marginTop:'0.2rem'}"></u-icon></view>
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
										<view class="item">毛重/净重：<text>{{productInfo.gr_we}}/{{productInfo.ne_we}}(kg)</text></view>
										<view class="item red_color">报价：<text>{{productInfo.cu_de}}{{productInfo.offerAmount}}</text></view>
										<view class="item red_color">报价箱数：<text>{{productInfo.boxNumber}}</text></view>
										<view class="item red_color">总金额：<text>{{productInfo.cu_de}}{{$calculate.countTotalprice(productInfo.offerAmount,productInfo.ou_lo,productInfo.boxNumber)}}</text></view>
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
			<u-modal v-model="is_show_pc_modal" :width="isZoom?'100%':'80%'" :show-confirm-button="false" :mask-close-able="true" :show-title="false">
				<view class="slot-content">
					<view class="sm_btn_item">
						<view class="item active">
							<u-icon name="zhuanfa" @click="change_pc_modal_zoom"></u-icon>
						</view>
						<view class="item">
							<u-icon name="close" @click="close_pc_modal"></u-icon>
						</view>
					</view>
					<view :class="[isZoom ? 'bg_panel' : 'sm_panel']">
						<iframe
						  :src="productInfo.threeDimensional"
						  id="map"
						  scrolling="no"
						  frameborder="0"
						  class="sm_iframe"
						></iframe>
					</view>
				</view>
			</u-modal>
		</template>
		<template v-else>
			<u-navbar back-text="" title="产品详情" :background="background" title-color="#ffffff" back-icon-color="#ffffff"></u-navbar>
			<view class="mobile_head">
				<xSwiper :list="productInfo.imgUrlList" mode="number" :autoplay="false"  indicator-pos="bottomRight" height="529" border-radius='0' v-if="!is_show_pc_modal"></xSwiper>
				<view class="mobile_sm_panel" v-else>
					<iframe
					  :src="productInfo.threeDimensional"
					  id="map2"
					  scrolling="no"
					  frameborder="0"
					  class="mobild_sm_iframe"
					></iframe>
				</view>
				<view class="three_d" @click='show_mobile_modal' @tap='show_mobile_modal' v-if="productInfo.threeDimensional">{{is_show_pc_modal?'图片展示':'3D展示'}}</view>
			</view>
			<view class="mobile_content">
				<view class="item active">{{productInfo.name}}</view>
				<view class="item">出厂货号：{{productInfo.fa_no}}</view>
				<view class="item">包装方式：{{productInfo.ch_pa}}</view>
				<view class="item">样品规格：{{productInfo.pr_le}}x{{productInfo.pr_wi}}x{{productInfo.pr_hi}}(CM)</view>
				<view class="item">包装规格：{{productInfo.in_le}}x{{productInfo.in_wi}}x{{productInfo.in_hi}}(CM)</view>
				<view class="item">外箱规格：{{productInfo.ou_le}}x{{productInfo.ou_wi}}x{{productInfo.ou_hi}}(CM)</view>
				<view class="item">装箱量：{{productInfo.in_en}}/{{productInfo.ou_lo}}(PCS)</view>
				<view class="item">体积/材积：{{productInfo.bulk_stere}}(CBM)/{{productInfo.bulk_feet}}(CUFT)</view>
				<view class="item">毛重/净重：{{productInfo.gr_we}}/{{productInfo.ne_we}}(kg)</view>
				<view class="item red_color">报价：{{productInfo.cu_de}}{{productInfo.offerAmount}}</view>
				<view class="item red_color">报价箱数：{{productInfo.boxNumber}}</view>
				<view class="item red_color">总金额：{{productInfo.cu_de}}{{$calculate.countTotalprice(productInfo.offerAmount,productInfo.ou_lo,productInfo.boxNumber)}}</view>
			</view>
			<view class="footer">
				<view class="title">Copyright©2021 深圳小竹熊科技有限公司 粤ICP备13031421号-4</view>
			</view>
		</template>
		<u-toast ref="uToast" />
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
			three_d: require("@/static/images/3d.png"),
			productInfo:{} ,//产品信息
			// imagesList:[{
			// 		image:'http://139.9.71.135:8087/ProductImgCutting//HS0000005/P161232370216465/P161232370216465_Photo03YS0595201.jpg',
			// 		name:'111',
			// 	},
			// 	{
			// 		image:'http://139.9.71.135:8087/ProductImgCutting//HS0000005/P161232370216465/P161232370216465_Photo03YS0595201.jpg',
			// 		name:'222',
			// 	},
			// 	{
			// 		image:'http://139.9.71.135:8087/ProductImgCutting//HS0000005/P161232370216465/P161232370216465_Photo03YS0595201.jpg',
			// 		name:'333',
			// 	},
			// 	{
			// 		image:'http://139.9.71.135:8087/ProductImgCutting//HS0000005/P161232370216465/P161232370216465_Photo03YS0595201.jpg',
			// 		name:'444',
			// 	},
			// 	{
			// 		image:'http://139.9.71.135:8087/ProductImgCutting//HS0000005/P161232370216465/P161232370216465_Photo03YS0595201.jpg',
			// 		name:'555',
			// 	},
			// ],
			isMobile:false,   //是否移动端
			background:{ background:'#5365f4'},
			is_show_pc_modal:false,  //是否显示3d
			pc_img_index:0, //pc当前图片index
			// three_d_url:'http://139.9.71.135:8087//Product3D/YS0587943',
			nowImg:{}, //pc端当前img
			modalWidth:'80%',
			isZoom: false,//pc3d弹窗放大
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
		//获取产品信息
		async getProductByProductNumber() {
			var me = this;
			const res = await me.$u.api.GetProductByProductNumber({
				id: me.$route.params.id
			});
			if (res.result.code === 200) {
				this.productInfo = res.result.item;
				var imgs = [];
				for(var i=0;i<this.productInfo.imgUrlList.length;i++){
					var obj= {
						type: 'img',
						image: this.productInfo.imgUrlList[i],
					}
					imgs.push(obj);
				}
				this.$set(this.productInfo,'imgUrlList',imgs);
				if(!this.isMobile){
					this.nowImg = this.productInfo.imgUrlList[0];
					this.pc_img_index = 0;
				}
				if(this.productInfo.threeDimensional){ //有3d就默认显示3d
					this.is_show_pc_modal = true;
				}
			} else {
				this.$message.error(res.result.msg);
			}
		},
		//显示pc3d弹窗
		show_pc_modal(){
			if(this.productInfo.threeDimensional){
				this.is_show_pc_modal = true;
			} else {
				this.$refs.uToast.show({
					title: '该产品暂无3D数据！',
					type: 'error',
				});
			}
		},
		//关闭pc3d弹窗
		close_pc_modal(){
			this.is_show_pc_modal = false;
		},
		//移动端端3d显示
		show_mobile_modal(){
			if(this.productInfo.threeDimensional){
				this.is_show_pc_modal = this.is_show_pc_modal ? false:true;
			} else {
				this.$refs.uToast.show({
					title: '该产品暂无3D数据！',
					type: 'error',
				});
			}
		},
		//pc端切换图片
		change_pc_img(item,index){
			this.nowImg = item;
			this.pc_img_index = index;
		},
		//pc端切换上一张图片
		pre_pc_img(){
			if((this.pc_img_index-1)>0){
				this.nowImg = this.productInfo.imgUrlList[this.pc_img_index-1];
				this.pc_img_index--;
			} else {
				this.nowImg = this.productInfo.imgUrlList[0];
				this.pc_img_index=0;
			}
		},
		//pc端切换下一张图片
		next_pc_img(){
			if((this.pc_img_index+1)>=this.productInfo.imgUrlList.length){
				this.nowImg = this.productInfo.imgUrlList[this.productInfo.imgUrlList.length-1];
				this.pc_img_index=this.productInfo.imgUrlList.length-1;
			} else {
				this.nowImg = this.productInfo.imgUrlList[this.pc_img_index+1];
				this.pc_img_index++;
			}
		},
		//pc3d弹窗缩放
		change_pc_modal_zoom(){
			this.isZoom = this.isZoom ? false:true;
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
