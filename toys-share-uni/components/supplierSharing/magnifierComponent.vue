<template>
	<view class="images_left">
		<view class="contact_info_image_box">
			<view class="contact_info_single_image_box">
				<!-- <image class="contact_info_image" :src="nowImg.image"></image> -->
				<pic-zoom :url="nowImg.image" :scale="3"  v-if="nowImg.type === 'img'"></pic-zoom>
				<video
				  v-else-if="nowImg.type === 'video'"
				  id="example_video"
				  class="video-js vjs-default-skin bigVideo"
				  controls
				  poster=""
				  :src="productInfo.videoAddress"
				  object-fit="cover"
				>
				</video>
			</view>
			<image :src="three_d" class="three_d" @click='show_pc_modal' v-if="productInfo.threeDimensional"></image>
		</view>
		<view class="contact_info_mulit_image_box">
			<view class="pre" @click="pre_pc_img"><u-icon name="arrow-left" :style="{marginTop:'0.2rem'}"></u-icon></view>
			<view class="image_item" v-for="(item,index) in productInfo.imgUrlList" :key="index" @click="change_pc_img(item,index)">
				<view style="width: 100%; height: 100%;" @click="change_pc_img(item,index)" v-if="item.type=='video'">
					<video
					  style="border: 1px solid #dcdfe6"
					  id="example_video2"
					  class="video-js vjs-default-skin minVideo"
					  poster=""
					  :src="productInfo.videoAddress"
					>
					</video>
				</view>
				<image class="image" :src="item.image" v-else></image>
			</view>
			<view class="next" @click="next_pc_img"><u-icon name="arrow-right" :style="{marginTop:'0.2rem'}"></u-icon></view>
		</view>
		<u-modal v-model="is_show_pc_modal" :width="isZoom?'100%':'80%'" :show-confirm-button="false" :mask-close-able="true" :show-title="false">
				<view class="slot-content">
					<view class="sm_btn_item">
						<view class="item active">
							<u-icon name="fangda" custom-prefix="custom-icon" @click="change_pc_modal_zoom"></u-icon>
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
		<u-toast ref="uToast" />
	</view>
</template>

<script>
import xSwiper from "@/components/x-swiper.vue"
import util from "@/common/js/util.js"
import PicZoom from "@/components/x-piczoom.vue";
export default {
	name: "MagnifierComponent",
	components: {
		xSwiper,
		PicZoom
	},
	props: {
		productInfos: {
			type: Object,
			default: {}
		}
	},
	watch:{
		productInfos:{
			handler(val){
				this.productInfo = {...val};
				this.dealData()
			},
			deep:true,
			immediate:true
		}
	},
	data() {
		return {
			home_icon: require("@/static/images/home.png"),
			three_d: require("@/static/images/3d.png"),
			productInfo:{} ,//产品信息
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
		dealData(data){
			var imgs = [];
			if(this.productInfo.videoAddress){
				var obj= {
					type: 'video',
					image: this.productInfo.videoAddress,
				}
				imgs.push(obj);
			}
			for(var i=0;i<this.productInfo.imgUrlList.length;i++){
				var obj= {
					type: 'img',
					image: this.productInfo.imgUrlList[i],
				}
				imgs.push(obj);
			}
			this.$set(this.productInfo,'imgUrlList',imgs);
			this.nowImg = this.productInfo.imgUrlList[0];
			this.pc_img_index = 0;
		},
		//pc端切换图片
		change_pc_img(item,index){
			this.nowImg = item;
			this.pc_img_index = index;
		},
		//初始化
		async init(){
			this.isMobile=util.isMobile();
		}
	},
	created(){
		this.init();
	}
}
</script>

<style lang="less" scoped>
.images_left{
	.contact_info_image_box{
		position: relative;
		.contact_info_single_image_box{
			width:444px;
			height: 3.95rem;
			background: #ffffff;
			border: 1px solid #efefef;
			border-radius: 6px;
			.contact_info_image{
				width: 100%;
				height: 3.95rem;
				border-radius: 5px;
				padding: 5%;
			}
		}
		.three_d{
			position: absolute;
			width: 60px;
			height: 60px;
			bottom: 24px;
			right: 24px;
		}
		.three_d:hover{
			cursor: pointer;
		}
	}
	.contact_info_mulit_image_box{
		width: 100%;
		margin-top: 0.20rem;
		display: flex;
		.pre{
			height: 0.55rem;
			width: 5%;
			border: 1px solid #d2d2d2;
			border-radius: 6px;
			text-align: center;
		}
		.pre:hover{
			cursor: pointer;
		}
		.next{
			height: 0.55rem;
			width: 5%;
			border: 1px solid #d2d2d2;
			border-radius: 6px;
			text-align: center;
			margin-left: auto;
		}
		.next:hover{
			cursor: pointer;
		}
		.image_item{
			width: 18%;
			height: 0.55rem;
			border: 1px solid #d2d2d2;
			margin-left: 1%;
			margin-right: 1%;
			.image{
				width:100%;
				height:0.53rem;
				padding:0.01rem;
			}
		}
		.image_item .image:hover{
			cursor: pointer;
		}
	}
	.video-js {
	    width: 100%;
	    height: 100%;
	    display: inline-block;
	    line-height: 0;
	    overflow: hidden;
	    position: relative;
	}
}
</style>
