<template>
	<view class="supplier_sharing_list">
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
						<my-link to="{path: '/supplierSharing'}" navType="pushTab">
							<view class="menu_item active">首页</view>
						</my-link>
						<my-link to="{path: '/supplierSharingList',query: {type: 'threeD'}}" navType="pushTab">
							<view class="menu_item">3D产品</view>
						</my-link>
						<my-link to="{path: '/supplierSharingList',query: {type: 'tuijian'}}" navType="pushTab">
							<view class="menu_item">推荐产品</view>
						</my-link>
						<my-link to="{path: '/supplierSharingList',query: {type: 'all'}}" navType="pushTab">
							<view class="menu_item">全部产品</view>
						</my-link>
						<my-link to="{path: '/supplierSharingContact',query: {type: 'tuijian'}}" navType="pushTab">
							<view class="menu_item">联系方式</view>
						</my-link>
					</view>
				</view>
			</view>
			<view class="content">
				<view class="product_box">
					<view class="tool_bar">
						<template v-if="!isMobile">
							<view class="tool_bar_item" :class="[searchType=='zonghe'?'active':'']" @click="change_search_type('zonghe')">综合</view>
							<view class="tool_bar_item" :class="[searchType=='price'?'active':'']" @click="change_search_type('price')">单价<u-icon :name="sortType < 2 ? 'arrow-downward':'arrow-upward'"></u-icon></view>
							<view class="tool_bar_item" :class="[searchType=='time'?'active':'']" @click="change_search_type('time')">时间<u-icon :name="sortOrder < 2 ? 'arrow-downward':'arrow-upward'"></u-icon></view>
							<view class="tool_bar_item grid" :class="[listShowType=='grid'?'active':'']" @click="change_show_type('grid')"><u-icon name="grid"></u-icon></view>
							<view class="tool_bar_item grid" :class="[listShowType=='list'?'active':'']" @click="change_show_type('list')"><u-icon name="list"></u-icon></view>
							<view class="tool_bar_item search">
								<x-search placeholder="请输入关键词" shape="round" height="60" v-model="keyword" :clearabled="true"
									bg-color="#fff"
									:input-style="{fontSize:'14px'}" 
									:action-style="{fontSize:'14px',width: '0.30rem',
									marginLeft: '0.10rem',
									marginRight: '0.20rem',
									color: '#fff',}"
									@clear="clearKeyWord"
									@search="getProductOfferDetailPage"
									@custom="getProductOfferDetailPage"
									class="x_search"
									>
								</x-search>
							</view>
						</template>
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
import xSearch from "@/components/x-search.vue"
import util from "@/common/js/util.js"

export default {
	name: "SupplierSharingList",
	components: {
		xSearch
	},
	data() {
		return {
			logo: require("@/static/logo.png"),
			keyword:'' ,//搜索关键字
			isMobile:false,   //是否移动端
			sortOrder: 0,  //价格搜索
			sortType: 0,   //时间搜索
			searchType:'zonghe',
			listShowType:'list', //列表显示类型 grid list
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
		clearKeyWord(){
			
		},
		getProductOfferDetailPage(){
			
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
@import  "@/less/supplierSharing/supplierSharingList.less";
</style>
