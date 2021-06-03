<template>
	<view class="baojia">
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
							<view class="text">报价信息</view>
						</view>
						<view class="wrap">
							<b-row v-if="isMobile">
								<b-col cols="12" sm="3">
									<view class="offer_info_item">
										<view class="offer_info_item_label">
											报价单号：
										</view>
										<view class="active offer_info_item_text">
											{{sampleInfo.offerNumber}}
										</view>
									</view>
								</b-col>
								<b-col cols="12" sm="3">
									<view class="offer_info_item">
										<view class="offer_info_item_label">
											报价时间：
										</view>
										<view class="offer_info_item_text">
											{{sampleInfo.createdOn&&sampleInfo.createdOn.replace(/T/, " ")}}
										</view>
									</view>
								</b-col>
								<b-col cols="12" sm="2" v-if="!isMobile">
									<view class="offer_info_item">
										<view class="offer_info_item_label">
											客户名称：
										</view>
										<view class="offer_info_item_text">
											{{sampleInfo.customerName}}
										</view>
									</view>
								</b-col>
								<b-col cols="6" sm="2">
									<view class="offer_info_item">
										<view class="offer_info_item_label left">
											业务员：
										</view>
										<view class="offer_info_item_text blue_color right">
											{{sampleInfo.linkman}}
										</view>
									</view>
								</b-col>
								<b-col cols="6" sm="2">
									<view class="offer_info_item active_button">
										<view class="offer_info_item_label">
											<u-button class="custom_style" :hair-line="false" @click="toContact" @tab="toContact">查看联系方式</u-button>
										</view>
									</view>
								</b-col>
							</b-row>
							<view class="pc_offer_info_list2" v-else>
								<view class="left">
									<view class="offer_info_item">
										<view class="offer_info_item_label">
											报价单号：
										</view>
										<view class="offer_info_item_text">
											{{sampleInfo.offerNumber}}
										</view>
									</view>
									<view class="offer_info_item">
										<view class="offer_info_item_label">
											报价时间：
										</view>
										<view class="offer_info_item_text">
											{{sampleInfo.createdOn&&sampleInfo.createdOn.replace(/T/, " ")}}
										</view>
									</view>
									<view class="offer_info_item">
										<view class="offer_info_item_label">
											客户名称：
										</view>
										<view class="offer_info_item_text">
											{{sampleInfo.customerName}}
										</view>
									</view>
									<view class="offer_info_item">
										<view class="offer_info_item_label">
											业务员：
										</view>
										<view class="offer_info_item_text">
											{{sampleInfo.linkman}}
										</view>
									</view>
								</view>
								<view class="offer_info_item active_button">
									<view class="offer_info_item_label">
										<u-button class="custom_style" :hair-line="false" @click="toContact" @tab="toContact">查看联系方式</u-button>
									</view>
								</view>
							</view>
							<div class="row_diver"></div>
							<b-row no-gutters v-if="isMobile">
								<b-col cols="12" sm="2" v-if="isMobile">
									<view class="offer_info_item">
										<view class="offer_info_item_label">
											客户名称：
										</view>
										<view class="offer_info_item_text">
											{{sampleInfo.customerName}}
										</view>
									</view>
								</b-col>
								<b-col cols="12" sm="2">
									<view class="offer_info_item">
										<view class="offer_info_item_label">
											商品总款数：
										</view>
										<view class="offer_info_item_text">
											{{summaryData.totalDegree}}
										</view>
									</view>
								</b-col>
								<b-col cols="12" sm="2">
									<view class="offer_info_item">
										<view class="offer_info_item_label">
											商品总箱数：
										</view>
										<view class="offer_info_item_text">
											{{summaryData.totalCartons}}
										</view>
									</view>
								</b-col>
								<b-col cols="12" sm="3">
									<view class="offer_info_item">
										<view class="offer_info_item_label">
											总体积/总材积：
										</view>
										<view class="offer_info_item_text">
											{{summaryData.totalBulkStere}}(cbm)/{{summaryData.totalBulkFeet}}(cuft)
										</view>
									</view>
								</b-col>
								<b-col cols="12" sm="3">
									<view class="offer_info_item">
										<view class="offer_info_item_label">
											总毛重/总净重：
										</view>
										<view class="offer_info_item_text">
											{{summaryData.totalGrWe}}/{{ summaryData.totalNeWe }}(KG)
										</view>
									</view>
								</b-col>
								<b-col cols="12" sm="2">
									<view class="offer_info_item">
										<view class="offer_info_item_label">
											总金额：
										</view>
										<view class="offer_info_item_text red_color">
											{{ summaryData.cu_de }}{{ summaryData.totalMoney }}
										</view>
									</view>
								</b-col>
							</b-row>
							<view class="pc_offer_info_list" v-else>
								<view class="offer_info_item">
									<view class="offer_info_item_label">
										商品总款数：
									</view>
									<view class="offer_info_item_text">
										{{summaryData.totalDegree}}
									</view>
								</view>
								<view class="offer_info_item">
									<view class="offer_info_item_label">
										商品总箱数：
									</view>
									<view class="offer_info_item_text">
										{{summaryData.totalCartons}}
									</view>
								</view>
								<view class="offer_info_item">
									<view class="offer_info_item_label">
										总体积/总材积：
									</view>
									<view class="offer_info_item_text">
										{{summaryData.totalBulkStere}}(cbm)/{{summaryData.totalBulkFeet}}(cuft)
									</view>
								</view>
								<view class="offer_info_item">
									<view class="offer_info_item_label">
										总毛重/总净重：
									</view>
									<view class="offer_info_item_text">
										{{summaryData.totalGrWe}}/{{ summaryData.totalNeWe }}(KG)
									</view>
								</view>
								<view class="offer_info_item">
									<view class="offer_info_item_label">
										总金额：
									</view>
									<view class="offer_info_item_text red_color">
										{{ summaryData.cu_de }}{{ summaryData.totalMoney }}
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="offer_list">
						<view class="title">
							<view class="text">报价商品</view>
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
								<template v-else>
									<view class="tool_bar_item search">
										<x-search placeholder="请输入关键词" shape="round" height="0.30rem" v-model="keyword" :clearabled="true"
											bg-color="#fff"
											:input-style="{fontSize:'14px'}" 
											:action-style="{fontSize:'14px',width: '1.5rem',
											marginLeft: '0.10rem',
											marginRight: '0.20rem',
											color: '#fff',}"
											@clear="clearKeyWord"
											@search="getProductOfferDetailPage"
											@custom="getProductOfferDetailPage"
											>
										</x-search>
									</view>
								</template>
							</view>
						</view>
						<template v-if="isMobile">
							<view class="tool_bar_mobile">
								<view class="tool_bar_item" :class="[searchType=='zonghe'?'active':'']" @click="change_search_type('zonghe')">综合</view>
								<view class="tool_bar_item" :class="[searchType=='price'?'active':'']" @click="change_search_type('price')">单价<u-icon :name="sortType < 2 ? 'arrow-downward':'arrow-upward'"></u-icon></view>
								<view class="tool_bar_item" :class="[searchType=='time'?'active':'']" @click="change_search_type('time')">时间<u-icon :name="sortOrder < 2 ? 'arrow-downward':'arrow-upward'"></u-icon></view>
								<view class="tool_bar_item_right">
									<view class="tool_bar_item grid" :class="[listShowType=='grid'?'active':'']" @click="change_show_type('grid')"><u-icon name="grid"></u-icon></view>
									<view class="tool_bar_item grid" :class="[listShowType=='list'?'active':'']" @click="change_show_type('list')"><u-icon name="list"></u-icon></view>
								</view>
							</view>
						</template>
						<view class="product_list">
							<b-row v-if="listShowType=='grid'" no-gutters>
								<b-col cols="6" sm="3" v-for="(item,index) in productList" :key='index'>
									<view class="product_list_item">
										<view class="product_list_img" @click="toProductDetail(item.id)" @tap="toProductDetail(item.id)">
											<image class="img" :src="item.imageUrl"></image>
										</view>
										<view class="product_list_info">
											<view class="product_list_info_text active" :title="item.name">
												{{item.name}}
											</view>
											<view class="product_list_info_text">
												报价：<text class="red_color">{{item.cu_de}}{{item.offerAmount}}</text>
											</view>
											<view class="product_list_info_text">
												出厂货号：{{item.fa_no}}
											</view>
											<view class="product_list_info_text">
												装箱量：{{item.in_en}}/{{item.ou_lo}}(PCS)
											</view>
										</view>
									</view>
								</b-col>
							</b-row>
							<u-row v-else-if="listShowType=='list'" class="u_row">
								<u-col span="12" v-for="(item,index) in productList" :key='index'>
									<b-row :style="isMobile ?{border: '1px solid #dcdfe6',borderRadius: '5px',marginBottom:'5px'}:{borderBottom: '1px solid #e9e9e9'}" class="product_list_item2">
										<b-col cols="6" sm="2">
											<image :src="item.imageUrl" class="product_list_img2" @click="toProductDetail(item.id)" @tap="toProductDetail(item.id)"></image>
										</b-col>
										<b-col cols="6" sm="3">
											<view style="margin-left: 40px;" v-if="!isMobile">
												<view class="product_list_info_text2">产品名称：<span>{{item.name}}</span></view>
												<view class="product_list_info_text2">出厂货号：<span>{{item.fa_no}}</span></view>
												<view class="product_list_info_text2">包装方式：<span>{{item.ch_pa}}</span></view>
												<view class="product_list_info_text2">样品规格：<span>{{item.pr_le}}x{{item.pr_wi}}x{{item.pr_hi}}(cm)</span></view>
											</view>
											<view v-else>
												<view class="product_list_info_text2 active"><span>{{item.name}}</span></view>
												<view class="product_list_info_text2">出厂货号：<span>{{item.fa_no}}</span></view>
												<view class="product_list_info_text2 red_color">报价：<span>{{item.cu_de}}{{item.offerAmount}}</span></view>
												<view class="product_list_info_text2 red_color">报价箱数：<span>{{item.boxNumber}}</span></view>
												<view class="product_list_info_text2 red_color">总金额：<span>{{item.cu_de}}{{$calculate.countTotalprice(item.offerAmount,item.ou_lo,item.boxNumber)}}</span></view>
												
											</view>
										</b-col>
										<b-col cols="12" sm="3">
											<view v-if="!isMobile">
												<view class="product_list_info_text2">包装规格：<span>{{item.in_le}}x{{item.in_wi}}x{{item.in_hi}}(cm)</span></view>
												<view class="product_list_info_text2">外箱规格：<span>{{item.ou_le}}x{{item.ou_wi}}x{{item.ou_hi}}(cm)</span></view>
												<view class="product_list_info_text2">装箱量：<span>{{item.in_en}}/{{item.ou_lo}}(PCS)</span></view>
												<view class="product_list_info_text2">体积/材积：<span>{{item.bulk_stere}}(CBM)/{{item.bulk_feet}}(CUFT)</span></view>
											</view>
											<view v-else>
												<view class="product_list_info_text2">包装方式：<span>{{item.ch_pa}}</span></view>
												<view class="product_list_info_text2">样品规格：<span>{{item.pr_le}}x{{item.pr_wi}}x{{item.pr_hi}}(cm)</span></view>
												<view class="product_list_info_text2">包装规格：<span>{{item.in_le}}x{{item.in_wi}}x{{item.in_hi}}(cm)</span></view>
												<view class="product_list_info_text2">外箱规格：<span>{{item.ou_le}}x{{item.ou_wi}}x{{item.ou_hi}}(cm)</span></view>
											</view>
										</b-col>
										<b-col cols="12" sm="3">
											<view v-if="!isMobile">
												<view class="product_list_info_text2">毛重/净重：<span>{{item.gr_we}}/{{item.ne_we}}(KG)</span></view>
												<view class="product_list_info_text2 red_color">报价：<span>{{item.cu_de}}{{item.offerAmount}}</span></view>
												<view class="product_list_info_text2 red_color">报价箱数：<span>{{item.boxNumber}}</span></view>
												<view class="product_list_info_text2 red_color">总金额：<span>{{item.cu_de}}{{$calculate.countTotalprice(item.offerAmount,item.ou_lo,item.boxNumber)}}</span></view>
											</view>
											<view v-else>
												<view class="product_list_info_text2">装箱量：<span>{{item.in_en}}/{{item.ou_lo}}(PCS)</span></view>
												<view class="product_list_info_text2">体积/材积：<span>{{item.bulk_stere}}(CBM)/{{item.bulk_feet}}(CUFT)</span></view>
												<view class="product_list_info_text2">毛重/净重：<span>{{item.gr_we}}/{{item.ne_we}}(KG)</span></view>
											</view>
										</b-col>
									</b-row>
								</u-col>
							</u-row>
						</view>
					</view>
				</view>
			</view>
			<!-- <view class="page_box">
				<uni-pagination @change="handlePage" show-icon="true" :total="totalCount" :current="currentPage" :pageSize="pageSize"></uni-pagination>
			</view> -->
		</view>
		<view class="footer">
			<view class="title">Copyright©2021 深圳小竹熊科技有限公司 粤ICP备13031421号-4</view>
		</view>
	</view>
</template>

<script>
import uniPagination from "@/uni_modules/uni-pagination/components/uni-pagination/uni-pagination.vue"
import xSearch from "@/components/x-search.vue"
import {
  getToken
} from "@/service/common.js"
import util from "@/common/js/util.js"
export default {
	name: "OfferSharing",
	components: {
		uniPagination,
		xSearch
	},
	data() {
		return {
			id:null, //报价单号码
			home_icon: require("@/static/images/home.png"),
			keyword:'' ,//搜索关键字
			sampleInfo:{}, //择样信息
			productList:[] ,//产品列表
			currentPage: 1,
			pageSize: 9999,
			categoryNumber: "",
			totalCount: 0,
			sortOrder: 0,  //价格搜索标识
			sortType: 0,   //时间搜索标识
			search_sortOrder:'',
			search_sortType:'',
			searchType:'zonghe',
			listShowType:'list', //列表显示类型 grid list
			isMobile:false,   //是否移动端
			summaryData: {
				//汇总数据
				totalDegree: 0, //总款数
				totalCartons: 0, //总箱数
				totalQuantity: 0, //总数量
				totalBulkStere: 0, //总体积
				totalBulkFeet: 0, //总材积
				totalGrWe: 0, //总毛重
				totalNeWe: 0, //总净重
				cu_de: "", //金额单位
				totalMoney: 0 //总金额
				// countData: [],
			}
		}
	},
	methods:{
		//获取content背景高度赋值
		getContentStyle(){
			var content = document.getElementsByClassName('content_bg_1');
			var content3 = document.getElementsByClassName('content_bg_3');
			content3[0].style.height = content[0].clientHeight+"px";
		},
		//修改搜索类
		change_search_type(type){
			// debugger
			if(type=='zonghe'){
				this.searchType = type;
				this.sortOrder = 0;
				this.sortType = 0;
				this.search_sortOrder = '';
				this.search_sortType = '';
			} else if(type=='price'){
				this.searchType = type;
				this.sortOrder = 1;
				this.sortType = this.sortType == 1 ? 2:1;
				this.search_sortOrder = 1;
				this.search_sortType = this.sortType;
			} else if(type=='time'){
				this.searchType = type;
				this.sortOrder = this.sortOrder == 1 ? 2:1;
				this.sortType = 1;
				this.search_sortOrder = 2;
				this.search_sortType = this.sortOrder;
			}
			this.getProductOfferDetailPage();
		},
		//搜索清空
		clearKeyWord(){
			this.keyword = "";
			this.getProductOfferDetailPage();
		},
		//修改显示类型
		change_show_type(type){
			this.listShowType = type;
			var me = this;
			const fd = {
				skipCount: me.currentPage,
				maxResultCount: me.pageSize,
				offerNumber: uni.getStorageSync('offer_sharing_id'),
				categoryNumber: me.currentCate && me.currentCate.id,
				keyword: me.keyword,
				sortOrder: me.search_sortOrder,
				sortType: me.search_sortType,
				searchType:me.searchType,
				listShowType:me.listShowType,
			};
			uni.setStorageSync('offer_search'+this.id,JSON.stringify(fd));
		},
		//获取报价信息
		async getProductOfferByNumber() {
			var me = this;
			const res = await me.$u.api.GetProductOfferByNumberInfo({
				offerNumber: uni.getStorageSync('offer_sharing_id')
			});
			if (res.result.code === 200) {
				this.sampleInfo = {
					...res.result.item,
					modifyOn:res.result.item.modifyOn?res.result.item.modifyOn.replace(/T.*/, "") : "",
				};
				uni.setStorageSync('offer_sharing_companyNumber', this.sampleInfo.companyNumber);
				uni.setStorageSync('offer_sharing_userId', this.sampleInfo.userId);
			} else {
				// this.$message.error(res.result.msg);
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
		// 获取报价信息产品列表
		async getProductOfferDetailPage() {
			this.$loading.show();
			var me = this;
			const fd = {
				skipCount: me.currentPage,
				maxResultCount: me.pageSize,
				offerNumber: uni.getStorageSync('offer_sharing_id'),
				categoryNumber: me.currentCate && me.currentCate.id,
				keyword: me.keyword,
				sortOrder: me.search_sortOrder,
				sortType: me.search_sortType,
				searchType:me.searchType,
				listShowType:me.listShowType,
				// ...this.packingOptions
			};
			uni.setStorageSync('offer_search'+this.id,JSON.stringify(fd));
			for (const key in fd) {
				if (fd[key] === null || fd[key] === undefined || fd[key] === "")
					delete fd[key];
			}
			const res = await me.$u.api.ProductOfferDetailPage(fd);
			if (res.result.code === 200) {
				this.productList = res.result.item.items;
				var session_productList = uni.getStorageSync('offer_sharing_info'+this.id)&&JSON.parse(uni.getStorageSync('offer_sharing_info'+this.id));
				if(session_productList){
					this.summaryData = session_productList;
				} else {
					this.handleCountData(this.productList);
				}
				this.totalCount = res.result.item.totalCount;
				this.$loading.hide();
			} else {
				// this.$message.error(res.result.msg);
			}
		},
		//分页切换
		handlePage(e){
			// console.log(e.type);
			// console.log(e.current);
			this.currentPage = e.current;
			this.getProductOfferDetailPage();
		},
		//to联系页
		toContact(){
			this.$Router.push({
			    name:'offerContact'
			})
		},
		//to产品详情页
		toProductDetail(id) {
		  if (!id) {
			this.$refs.uToast.show({
				title: '温馨提示：该产品没有编号！',
				type:'error'
			})
			return false;
		  }
		  this.$Router.push({
			name: "offerDetail",
			params: { id: id, pid: uni.getStorageSync('offer_sharing_id') }
		  });
		},
		//计算汇总数据
		handleCountData(array) {
			//总款数
			this.summaryData.totalDegree = array.length;
			this.summaryData.cu_de = this.sampleInfo.cu_de;
			//金额单位
			for (let i = 0; i < array.length; i++) {
			//总箱数
				this.summaryData.totalCartons = this.$calculate.add(
					this.summaryData.totalCartons,
					array[i].boxNumber || 0
				);
				//总数量
				this.summaryData.totalQuantity = this.$calculate.add(
					this.summaryData.totalQuantity,
					this.$calculate.multiply(array[i].boxNumber, array[i].ou_lo) || 0
				);
				//总体积
				this.summaryData.totalBulkStere = this.$calculate.add(
					this.summaryData.totalBulkStere,
					this.$calculate.multiply(array[i].boxNumber, array[i].bulk_stere) || 0
				);
				//总材积
				this.summaryData.totalBulkFeet = this.$calculate.add(
					this.summaryData.totalBulkFeet,
					this.$calculate.multiply(array[i].boxNumber, array[i].bulk_feet) || 0
				);
				//总毛重
				this.summaryData.totalGrWe = this.$calculate.add(
					this.summaryData.totalGrWe,
					this.$calculate.multiply(array[i].boxNumber, array[i].gr_we) || 0
				);
				//总净重
				this.summaryData.totalNeWe = this.$calculate.add(
					this.summaryData.totalNeWe,
					this.$calculate.multiply(array[i].boxNumber, array[i].ne_we) || 0
				);
				//总金额
				this.summaryData.totalMoney = this.$calculate.add(
					this.summaryData.totalMoney,
					this.$calculate.multiply(
						this.$calculate.multiply(array[i].offerAmount, array[i].boxNumber),
						array[i].ou_lo
					)
				);
			}
	
			uni.setStorageSync('offer_sharing_info'+this.id,JSON.stringify(this.summaryData));
		},
		//初始化
		async init(){
			this.isMobile=util.isMobile();
			await this.getToken();
			await this.getProductOfferByNumber();
			await this.getProductOfferDetailPage();
		},
	},
	mounted() {
		//this.getContentStyle();
	},
	updated: function () {
	  this.$nextTick(function () {
	    this.getContentStyle();
	  })
	},
	created(){
		this.$loading.show();
		this.id = this.$route.query.id
		uni.setStorageSync('offer_sharing_id', this.$route.query.id);
		var session_offer_search = uni.getStorageSync('offer_search'+this.id)&&JSON.parse(uni.getStorageSync('offer_search'+this.id));
		if(session_offer_search){
			this.sortOrder=session_offer_search.sortOrder;  //价格搜索
			this.sortType=session_offer_search.sortType;   //时间搜索
			this.searchType=session_offer_search.searchType;
			this.keyword=session_offer_search.keyword;
			this.listShowType=session_offer_search.listShowType;
		}
		this.init();
	}
}
</script>

<style lang="less" scoped>
@import  "@/less/offerSharing/offerSharing.less";
</style>
