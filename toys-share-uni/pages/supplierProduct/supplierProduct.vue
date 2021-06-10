<template>
	<view class="supplier_product">
		<!-- pc端 -->
		<template >
			<!-- 头部 -->
			<spHead :contactInfo="contactInfo" :isMobile="isMobile"></spHead>
			<view class="content" v-if="!isMobile">
				<view class="title"><view class="text">产品分享展示</view></view>
				<view class="content_panel">
					<view class="tool_bar">
						<template v-if="!isMobile">
							<view class="tool_bar_item" :class="[sortType==2?'active':'']" @click="change_search_type(2)">时间<u-icon :name="timeType < 2 ? 'arrow-downward':'arrow-upward'"></u-icon></view>
							<view class="tool_bar_item" :class="[sortType==1?'active':'']" @click="change_search_type(1)">价格<u-icon :name="priceType < 2 ? 'arrow-downward':'arrow-upward'"></u-icon></view>
							<view class="tool_bar_item search">
								<x-search placeholder="请输入关键词" height="64" shape="square" v-model="keyword" :clearabled="true"
									bg-color="#fff"
									border-color="#D2D2D2"
									action-text="搜索"
									:input-style="{fontSize:'14px'}" 
									:action-style="{fontSize:'14px',width: '0.5rem',
									marginLeft: '0.10rem',
									marginRight: '0.20rem',
									height:'0.32rem',
									color: '#ffffff',
									background: '#36ade2',
									borderRadius: '4px'}"
									@clear="clearKeyWord"
									@search="getData(1,'')"
									@custom="getData(1,'')"
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
					<view class="product_list" v-if="listShowType=='list'">
						<b-row no-gutters>
							<b-col cols="6" v-for="(item,index) in productList" :key='index'>
								<view class="product_list_item">
									<view class="product_list_img" @click="goDetail(item.id)">
										<image class="img" :src="item.imageUrl"></image>
									</view>
									<view class="product_list_info">
										<view class="product_list_info_text active" :title="item.name">
											{{item.name}}
										</view>
										<view class="product_list_info_plus2">
											<view class="product_list_info_text_left">
												单价：<text class="text red_color">￥{{item.price}}</text>
											</view>
											<view class="product_list_info_text_left">
												出厂货号：<text class="text">{{item.fa_no}}</text>
											</view>
											<view class="product_list_info_text_left">
												包装：<text class="text">{{item.ch_pa}}</text>
											</view>
											<view class="product_list_info_text_left">
												产品规格：<text class="text">{{item.pr_le}}x{{item.pr_wi}}x{{item.pr_hi}}(CM)</text>
											</view>
											<view class="product_list_info_text_left">
												外箱规格：<text class="text">{{item.ou_le}}x{{item.ou_wi}}x{{item.ou_hi}}(CM)</text>
											</view>
											<view class="product_list_info_text_left">
												包装规格：<text class="text">{{item.in_le}}x{{item.in_wi}}x{{item.in_hi}}(CM)</text>
											</view>
											<view class="product_list_info_text_left">
												装箱量：<text class="text">{{item.in_en}}/{{item.ou_lo}}(PCS)</text>
											</view>
											<view class="product_list_info_text_left">
												体积/材积：<text class="text">{{item.bulk_stere}}(CBM)/{{item.bulk_feet}}(CUFT)</text>
											</view>
											<view class="product_list_info_text_left">
												毛重/净重：<text class="text">{{item.gr_we}}/{{item.ne_we}}(KG)</text>
											</view>
										</view>
									</view>
								</view>
							</b-col>
						</b-row>
					</view>
					<view class="product_list" v-else-if="listShowType=='grid'">
						<b-row no-gutters>
							<b-col cols="3" v-for="(item,index) in productList" :key='index'>
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
					<pagination :totalPage="totalPage" :totalElements="total" v-model="currentPage" @change="getData"/>
				</view>
			</view>
			<view class="content" v-else>
				<view class="title"><view class="text">产品分享展示</view></view>
				<view class="content_panel">
					<view class="tool_bar">
						<view class="tool_bar_item search">
							<x-search placeholder="请输入关键词" height="64" shape="square" v-model="keyword" :clearabled="true"
								bg-color="#fff"
								border-color="#D2D2D2"
								action-text="搜索"
								:input-style="{fontSize:'14px'}" 
								:action-style="{fontSize:'14px',width: '50px',
								marginLeft: '10px',
								height:'32px',
								color: '#ffffff',
								background: '#41AAE4',
								borderRadius: '4px'}"
								@clear="clearKeyWord"
								@search="getData(1,'')"
								@custom="getData(1,'')"
								class="x_search"
								>
							</x-search>
						</view>
					</view>
					<view class="tool_bar_mobile">
						<view class="tool_bar_item" :class="[sortType==2?'active':'']" @click="change_search_type(2)">时间<u-icon :name="timeType < 2 ? 'arrow-downward':'arrow-upward'"></u-icon></view>
						<view class="tool_bar_item" :class="[sortType==1?'active':'']" @click="change_search_type(1)">价格<u-icon :name="priceType < 2 ? 'arrow-downward':'arrow-upward'"></u-icon></view>
						<view class="tool_bar_item_right">
							<view class="tool_bar_item grid" :class="[listShowType=='grid'?'active':'']" @click="change_show_type('grid')"><u-icon name="grid"></u-icon></view>
							<view class="tool_bar_item grid" :class="[listShowType=='list'?'active':'']" @click="change_show_type('list')"><u-icon name="list"></u-icon></view>
						</view>
					</view>
					<view class="product_list">
						<b-row v-if="listShowType=='grid'" no-gutters>
							<b-col cols="6" sm="3" v-for="(item,index) in productList" :key='index'>
								<view class="product_list_item">
									<view class="product_list_img" @click="goDetail(item.id)" @tap="goDetail(item.id)">
										<image class="img" :src="item.imageUrl"></image>
									</view>
									<view class="product_list_info">
										<view class="product_list_info_text active" :title="item.name">
											{{item.name}}
										</view>
										<view class="product_list_info_plus">
											<view class="product_list_info_text_left">
												{{item.fa_no}}
											</view>
											<view class="product_list_info_text_right">
												<text class="red_color">￥{{item.price}}</text>
											</view>
										</view>
									</view>
								</view>
							</b-col>
						</b-row>
						<b-row v-else-if="listShowType=='list'" no-gutters>
							<b-col cols="12" v-for="(item,index) in productList" :key='index'>
								<b-row :style="{borderBottom: '1px solid #dcdfe6'}" class="product_list_item2" no-gutters>
									<b-col cols="6" sm="2">
										<image :src="item.imageUrl" class="product_list_img2" @click="goDetail(item.id)" @tap="goDetail(item.id)"></image>
									</b-col>
									<b-col cols="6" sm="3">
										<view class="product_list_info_text2 active"><span>{{item.name}}</span></view>
										<view class="product_list_info_text2">出厂货号：<span>{{item.fa_no}}</span></view>
										<view class="product_list_info_text2">报价：<span class="red_color">￥{{item.offerAmount}}</span></view>
										<view class="product_list_info_text2">包装方式：<span>{{item.ch_pa}}</span></view>
										<view class="product_list_info_text2">产品规格：<span>{{item.pr_le}}x{{item.pr_wi}}x{{item.pr_hi}}(cm)</span></view>
										<view class="product_list_info_text2">包装规格：<span>{{item.in_le}}x{{item.in_wi}}x{{item.in_hi}}(cm)</span></view>
										<view class="product_list_info_text2">外箱规格：<span>{{item.ou_le}}x{{item.ou_wi}}x{{item.ou_hi}}(cm)</span></view>
										<view class="product_list_info_text2">装箱量：<span>{{item.in_en}}/{{item.ou_lo}}(PCS)</span></view>
										<view class="product_list_info_text2">体积/材积：<span>{{item.bulk_stere}}(CBM)/{{item.bulk_feet}}(CUFT)</span></view>
										<view class="product_list_info_text2">毛重/净重：<span>{{item.gr_we}}/{{item.ne_we}}(KG)</span></view>
									</b-col>
								</b-row>
							</b-col>
						</b-row>
					</view>
					<!-- <pagination :totalPage="totalPage" :totalElements="total" v-model="currentPage" @change="getData"/> -->
					<view class="loading_more">
						<u-loadmore :status="status" />
					</view>
				</view>
			</view>
			<!-- 尾部 -->
			<xFooter></xFooter>
		</template>
	</view>
</template>

<script>
import xSearch from "@/components/x-search.vue"
import spHead from "@/components/supplierProduct/sp_head.vue"
import xFooter from "@/components/supplierProduct/footer.vue"
import Pagination from "@/components/pagination.vue"
import util from "@/common/js/util.js"
import {
  getToken
} from "@/service/common.js"

export default {
	name: "SupplierProduct",
	components: {
		xSearch,
		spHead,
		xFooter,
		Pagination
	},
	data() {
		return {
			logo: require("@/static/images/supplierProduct/logo.png"),
			head_bg: require("@/static/images/supplierProduct/head_bg.png"),
			title_bg: require("@/static/images/supplierProduct/title.png"),
			defaultImg: require("@/static/images/logo.png"),
			isMobile:false,   //是否移动端
			keyword:'',
			sortOrder:1, //1倒序，2升序
			sortType:2,  //1价格，2时间，3热度
			hotType:1,
			priceType:1,
			timeType:1,
			listShowType:'list',
			contactInfo:{},
			currentPage:1,
			totalPage:1, //总页数 (引用页面传递过来)
			total:0, //总记录数 (引用页面传递过来)
			pageSize:8,
			productList:[],
			offerInfo:{},
			status: 'loadmore',
			list: 8,
			page: 1,
			iconType: 'flower',
			loadText: {
				loadmore: '点击或上拉加载更多',
				loading: '努力加载中',
				nomore: '实在没有了'
			},
			id:null
		}
	},
	methods:{
		//搜索清空
		clearKeyWord(){
			this.keyword = "";
			this.getData();
			this.currentPage = 1;
		},
		//修改搜索类
		change_search_type(type){
			// debugger
			if(type==0){
				this.sortType = 0;
				this.sortOrder = 0;
			} else if(type==1){
				this.sortType = 1;
				this.priceType = this.priceType == 1 ? 2:1;
				this.sortOrder = this.priceType;
			} else if(type==2){
				this.sortType = 2;
				this.timeType = this.timeType == 1 ? 2:1;
				this.sortOrder = this.timeType;
			} else if(type==3){
				this.sortType = 3;
				this.hotType = this.hotType == 1 ? 2:1;
				this.sortOrder = this.hotType;
			}
			this.getData();
		},
		//修改显示类型
		change_show_type(type){
			this.listShowType = type;
		},
		//获取厂商联系方式
		// async getCompanyByIDShare() {
		// 	var me = this;
		// 	const res = await me.$u.api.CompanyByIDShare({
		// 		// companyNumber: uni.getStorageSync('supplier_product_shareCode'),
		// 		companyNumber: 'HS0000006',
		// 	});
		// 	if (res.result.code === 200) {
		// 		this.contactInfo = res.result.item;
		// 		uni.setStorageSync('supplier_product_contactInfo',JSON.stringify(this.contactInfo));
		// 	} else {
		// 		uni.showToast({
		// 			icon:'none',
		// 			title: res.result.msg,
		// 			duration: 2000
		// 		});
		// 	}
		// },
		//获取厂商联系方式
		async getProductOfferByNumber() {
			var me = this;
			const res = await me.$u.api.GetProductOfferByNumberInfo({
				offerNumber: uni.getStorageSync('supplier_product_id')
			});
			if (res.result.code === 200) {
				this.offerInfo = res.result.item;
			}
		},
		//获取联系方式
		async getContactInformationListShare(){
			var me = this;
			const res = await me.$u.api.CompanyByIDShare({
				companyNumber: me.offerInfo.companyNumber,
			});
			if (res.result.code === 200) {
				this.contactInfo = res.result.item;
				uni.setStorageSync('supplier_product_contactInfo',JSON.stringify(res.result.item));
			}
		},
		//设置联系方式
		setContact(data){
			for(var i = 0; i < data.length; i++){
				if(data[i]['language']=="zh-CN"){
					this.contactInfo = data[i];
					break;
				} else {
					this.contactInfo = data[i]
				}
			}
		},
		// 获取所有产品
		// async getData(value,keyword) {
		// 	var me = this;
		// 	me.$loading.show();
		// 	const res = await me.$u.api.SupplierShareProducts({
		// 		shareCode: uni.getStorageSync('supplier_product_id'),
		// 		skipCount: value||1,
		// 		maxResultCount: me.pageSize,
		// 		keyword: keyword||me.keyword,
		// 		sortOrder: me.sortOrder,
		// 		sortType: me.sortType,
		// 	});
		// 	if (res.result.code === 200) {
		// 		// me.productList = res.result.item.items;
		// 		// me.total = res.result.item.totalCount;
		// 		// me.totalPage = Math.ceil(me.total / me.pageSize);
		// 		// me.$loading.hide();
		// 		me.productList = res.result.item;
		// 		me.total = res.result.item.length;
		// 		me.totalPage = Math.ceil(me.total / me.pageSize);
		// 		me.$loading.hide();
		// 	} else {
		// 		uni.showToast({
		// 			icon:'none',
		// 			title: res.data.result.msg,
		// 			duration: 2000
		// 		});
		// 		me.$loading.hide();
		// 	}
		// },
		// 获取报价信息产品列表
		async getData(value,keyword) {
			this.$loading.show();
			var me = this;
			const fd = {
				skipCount: value||1,
				maxResultCount: me.pageSize,
				offerNumber: uni.getStorageSync('supplier_product_id'),
				keyword: keyword||me.keyword,
				sortOrder: me.sortOrder,
				sortType: me.sortType,
				// searchType:me.searchType,
				// listShowType:me.listShowType,
				// ...this.packingOptions
			};
			for (const key in fd) {
				if (fd[key] === null || fd[key] === undefined || fd[key] === "")
					delete fd[key];
			}
			const res = await me.$u.api.ProductOfferDetailPage(fd);
			if (res.result.code === 200) {
				this.productList = res.result.item.items;
				me.total = res.result.item.totalCount;
				me.totalPage = Math.ceil(res.result.item.totalCount / me.pageSize);
				this.$loading.hide();
			} else {
				// this.$message.error(res.result.msg);
			}
		},
		async onReachBottom() {
			var me = this;
			if(me.isMobile){
				this.$loading.show();
				const fd = {
					skipCount: me.page,
					maxResultCount: me.list,
					offerNumber: uni.getStorageSync('supplier_product_id'),
					keyword: me.keyword,
					sortOrder: me.sortOrder,
					sortType: me.sortType,
				};
				for (const key in fd) {
					if (fd[key] === null || fd[key] === undefined || fd[key] === "")
						delete fd[key];
				}
				const res = await me.$u.api.ProductOfferDetailPage(fd);
				if (res.result.code === 200) {
					if(res.result.item.items.length){
						for(var i=0;i<res.result.item.items.length;i++){
							me.productList.push(res.result.item.items[i]);
						}
						me.page++;
						me.status = 'loading';
						me.$loading.hide();
					} else {
						me.status = 'nomore';
						me.$loading.hide();
					}
				}
			}
		},
		async getData_mobile() {
			this.$loading.show();
			var me = this;
			const fd = {
				skipCount: me.page,
				maxResultCount: me.list,
				offerNumber: uni.getStorageSync('supplier_product_id'),
				keyword: me.keyword,
				sortOrder: me.sortOrder,
				sortType: me.sortType,
			};
			for (const key in fd) {
				if (fd[key] === null || fd[key] === undefined || fd[key] === "")
					delete fd[key];
			}
			const res = await me.$u.api.ProductOfferDetailPage(fd);
			if (res.result.code === 200) {
				if(res.result.item.items.length){
					for(var i=0;i<res.result.item.items.length;i++){
						me.productList.push(res.result.item.items[i]);
					}
					me.page++;
					me.$loading.hide();
				}
			}
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
		//去详情页
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
		//链接跳转
		toLink(value){
			this.$Router.push({
			    name: value
			})
		},
		async init(){
			var me = this;
			this.$loading.show();
			this.isMobile=util.isMobile();
			await this.getToken();
			await this.getProductOfferByNumber();
			await this.getContactInformationListShare();
			if(me.isMobile){
				me.getData_mobile();
			} else {
				this.getData();
			}
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
		if(uni.getStorageSync('supplier_product_id')||this.$route.query.id){
			this.id = this.$route.query.id
			uni.getStorageSync('supplier_product_id') ?  (this.$route.query.id ? uni.setStorageSync('supplier_product_id', this.$route.query.id):''): uni.setStorageSync('supplier_product_id', this.$route.query.id);
			this.init();
		} else {
			this.$loading.show();
		}
	}
}
</script>
<style lang="less" scoped>
@import  "@/less/supplierProduct/supplierProduct.less";
</style>
