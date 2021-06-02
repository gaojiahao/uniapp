<template>
	<view class="supplier_sharing_list">
		<!-- pc端 -->
		<template v-if="!isMobile">
			<!-- 头部 -->
			<xHead active="supplierSharingRecList"></xHead>
			<view class="content">
				<view class="product_box">
					<view class="tool_bar">
						<template v-if="!isMobile">
							<view class="tool_bar_item" :class="[searchType=='zonghe'?'active':'']" @click="change_search_type('zonghe')">综合</view>
							<view class="tool_bar_item" :class="[searchType=='redu'?'active':'']" @click="change_search_type('redu')">热度</view>
							<view class="tool_bar_item" :class="[searchType=='price'?'active':'']" @click="change_search_type('price')">单价<u-icon :name="sortType < 2 ? 'arrow-downward':'arrow-upward'"></u-icon></view>
							<view class="tool_bar_item" :class="[searchType=='time'?'active':'']" @click="change_search_type('time')">时间<u-icon :name="sortOrder < 2 ? 'arrow-downward':'arrow-upward'"></u-icon></view>
							<view class="tool_bar_item guanjianci">关键词</view>
							<view class="tool_bar_item search">
								<x-search placeholder="请输入关键词" height="64" shape="square" v-model="keyword" :clearabled="true"
									bg-color="#fff"
									border-color="#D2D2D2"
									action-text="确认"
									:input-style="{fontSize:'14px'}" 
									:action-style="{fontSize:'14px',width: '0.5rem',
									marginLeft: '0.10rem',
									marginRight: '0.20rem',
									height:'0.32rem',
									color: '#ffffff',
									background: '#36ade2',
									borderRadius: '4px'}"
									@clear="clearKeyWord"
									@search="getProductOfferDetailPage"
									@custom="getProductOfferDetailPage"
									class="x_search"
									>
								</x-search>
							</view>
							<view class="grid">
								<view class="tool_bar_item grid_item" :class="[listShowType=='grid'?'active':'']" @click="change_show_type('grid')"><u-icon name="grid"></u-icon></view>
								<view class="tool_bar_item grid_item" :class="[listShowType=='list'?'active':'']" @click="change_show_type('list')"><u-icon name="list"></u-icon></view>
							</view>
						</template>
					</view>
					<view class="total">
						120条数据
					</view>
					<view class="product_list">
						<b-row no-gutters>
							<b-col cols="3" v-for="(item,index) in rpList" :key='index'>
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
					</view>
					<pagination :totalPage="totalPage" :totalElements="total" v-model="currentPage" @change="getData"/>
				</view>
			</view>
			<!-- 尾部 -->
			<xFooter></xFooter>
		</template>
	</view>
</template>

<script>
import xSearch from "@/components/x-search.vue"
import Pagination from "@/components/pagination.vue"
import xHead from "@/components/supplierSharing/x-head.vue"
import xFooter from "@/components/supplierSharing/x-footer.vue"
import util from "@/common/js/util.js"

export default {
	name: "SupplierSharingRecList",
	components: {
		xSearch,
		Pagination,
		xHead,
		xFooter
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
				},
				{
					name: "1:14 2.4G攀爬车土/绿",
					cu_de: "¥",
					fa_no: "GM1912-1",
					imageUrl: "http://139.9.71.135:8087/ProductImgCutting//HS0000005/P161232370216465/P161232370216465_Photo03YS0595201.jpg",
					offerAmount: 60.5
				}
			],
			currentPage:1,
			totalPage:20, //总页数 (引用页面传递过来)
			total:200, //总记录数 (引用页面传递过来)
		}
	},
	methods:{
		clearKeyWord(){
			
		},
		getProductOfferDetailPage(){
			
		},
		getData(){
			
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
