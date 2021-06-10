<template>
	<view class="supplier_sharing_list">
		<!-- pc端 -->
		<xHead active="supplierSharingRecList" :isMobile="isMobile"></xHead>
		<template v-if="!isMobile">
			<view class="content">
				<view class="product_box">
					<view class="tool_bar">
						<template v-if="!isMobile">
							<view class="tool_bar_item" :class="[sortOrder==0?'active':'']" @click="change_search_type(0)">综合</view>
							<view class="tool_bar_item" :class="[sortOrder==3?'active':'']" @click="change_search_type(3)">热度<u-icon :name="hotType < 2 ? 'arrow-downward':'arrow-upward'"></u-icon></view>
							<view class="tool_bar_item" :class="[sortOrder==1?'active':'']" @click="change_search_type(1)">价格<u-icon :name="priceType < 2 ? 'arrow-downward':'arrow-upward'"></u-icon></view>
							<view class="tool_bar_item" :class="[sortOrder==2?'active':'']" @click="change_search_type(2)">时间<u-icon :name="timeType < 2 ? 'arrow-downward':'arrow-upward'"></u-icon></view>
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
					<view class="total">
						{{total}}条数据
					</view>
					<view class="product_list" v-if="listShowType=='list'">
						<b-row no-gutters>
							<b-col cols="3" v-for="(item,index) in proudctList" :key='index'>
								<view class="product_list_item2">
									<view class="product_list_img" @click="goDetail(item)">
										<image class="img" :src="item.imageUrl"></image>
									</view>
									<view class="product_list_info">
										<view class="product_list_info_text active" :title="item.name">
											{{item.name}}
										</view>
										<view class="product_list_info_plus2">
											<view class="product_list_info_text_left">
												参考报价：<text class="red_color">￥{{item.price}}</text>
											</view>
											<view class="product_list_info_text_left">
												出厂货号：{{item.fa_no}}
											</view>
											<view class="product_list_info_text_left">
												包装：{{item.ch_pa}}
											</view>
											<view class="product_list_info_text_left">
												产品规格：{{item.pr_le}}x{{item.pr_wi}}x{{item.pr_hi}}(CM)
											</view>
											<view class="product_list_info_text_left">
												外箱规格：{{item.ou_le}}x{{item.ou_wi}}x{{item.ou_hi}}(CM)
											</view>
											<view class="product_list_info_text_left">
												包装规格：{{item.in_le}}x{{item.in_wi}}x{{item.in_hi}}(CM)
											</view>
											<view class="product_list_info_text_left">
												装箱量：{{item.in_en}}/{{item.ou_lo}}(PCS)
											</view>
											<view class="product_list_info_text_left">
												体积/材积：{{item.bulk_stere}}(CBM)/{{item.bulk_feet}}(CUFT)
											</view>
											<view class="product_list_info_text_left">
												毛重/净重：{{item.gr_we}}/{{item.ne_we}}(KG)
											</view>
										</view>
									</view>
								</view>
							</b-col>
						</b-row>
					</view>
					<view class="product_list" v-else-if="listShowType=='grid'">
						<b-row no-gutters>
							<b-col cols="3" v-for="(item,index) in proudctList" :key='index'>
								<view class="product_list_item2">
									<view class="product_list_img" @click="goDetail(item)">
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
			<!-- 尾部 -->
			<xFooter></xFooter>
		</template>
		<template v-else>
			<view class="content_mb">
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
						<view class="tool_bar_item" :class="[sortOrder==0?'active':'']" @click="change_search_type(0)">综合</view>
						<view class="tool_bar_item" :class="[sortOrder==3?'active':'']" @click="change_search_type(3)">热度<u-icon :name="hotType < 2 ? 'arrow-downward':'arrow-upward'"></u-icon></view>
						<view class="tool_bar_item" :class="[sortOrder==2?'active':'']" @click="change_search_type(2)">时间<u-icon :name="timeType < 2 ? 'arrow-downward':'arrow-upward'"></u-icon></view>
						<view class="tool_bar_item" :class="[sortOrder==1?'active':'']" @click="change_search_type(1)">价格<u-icon :name="priceType < 2 ? 'arrow-downward':'arrow-upward'"></u-icon></view>
						<view class="tool_bar_item_right">
							<view class="tool_bar_item grid" :class="[listShowType=='grid'?'active':'']" @click="change_show_type('grid')"><u-icon name="grid"></u-icon></view>
							<view class="tool_bar_item grid" :class="[listShowType=='list'?'active':'']" @click="change_show_type('list')"><u-icon name="list"></u-icon></view>
						</view>
					</view>
					<view class="product_list">
						<b-row v-if="listShowType=='grid'" no-gutters>
							<b-col cols="6" sm="3" v-for="(item,index) in proudctList" :key='index'>
								<view class="product_list_item">
									<view class="product_list_img" @click="goDetail(item)" @tap="goDetail(item)">
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
							<b-col cols="12" v-for="(item,index) in proudctList" :key='index'>
								<b-row :style="{borderBottom: '1px solid #dcdfe6'}" class="product_list_item2" no-gutters>
									<b-col cols="6" sm="2">
										<image :src="item.imageUrl" class="product_list_img2" @click="goDetail(item)" @tap="goDetail(item)"></image>
										<view class="time"><view class="time_icon"></view>{{item.createdOn&&item.createdOn.replace(/T/, " ")}}</view>
									</b-col>
									<b-col cols="6" sm="3">
										<view class="product_list_info_text2 active"><span>{{item.name}}</span></view>
										<view class="product_list_info_text2">出厂货号：<span>{{item.fa_no}}</span></view>
										<view class="product_list_info_text2">包装方式：<span>{{item.ch_pa}}</span></view>
										<view class="product_list_info_text2">产品规格：<span>{{item.pr_le}}x{{item.pr_wi}}x{{item.pr_hi}}(cm)</span></view>
										<view class="product_list_info_text2">包装规格：<span>{{item.in_le}}x{{item.in_wi}}x{{item.in_hi}}(cm)</span></view>
										<view class="product_list_info_text2">外箱规格：<span>{{item.ou_le}}x{{item.ou_wi}}x{{item.ou_hi}}(cm)</span></view>
										<view class="product_list_info_text2">装箱量：<span>{{item.in_en}}/{{item.ou_lo}}(PCS)</span></view>
										<view class="product_list_info_text2">体积/材积：<span>{{item.bulk_stere}}(CBM)/{{item.bulk_feet}}(CUFT)</span></view>
										<view class="product_list_info_text2">毛重/净重：<span>{{item.gr_we}}/{{item.ne_we}}(KG)</span></view>
										<view class="product_list_info_text2">参考报价：<span class="red_color">￥{{item.price||0}}</span></view>
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
			<view style="height: 200px;">
				<u-back-top :scroll-top="scrollTop" top="600" z-index="999999"></u-back-top>
			</view>
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
			sortOrder:0, //1倒序，2升序
			sortType:0,  //1价格，2时间，3热度
			searchType:'zonghe',
			listShowType:'list', //列表显示类型 grid list
			proudctList:[],
			currentPage:1,
			totalPage:1, //总页数 (引用页面传递过来)
			total:0, //总记录数 (引用页面传递过来)
			pageSize:8,
			hotType:0,
			priceType:0,
			timeType:0,
			listShowType:'list',
			status: 'loadmore',
			list: 8,
			page: 1,
			iconType: 'flower',
			loadText: {
				loadmore: '点击或上拉加载更多',
				loading: '努力加载中',
				nomore: '实在没有了'
			},
			scrollTop: 0
		}
	},
	methods:{
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		//搜索清空
		clearKeyWord(){
			this.keyword = "";
			this.getData();
			this.currentPage = 1;
		},
		//修改搜索类
		change_search_type(type){
			if(type==0){
				this.sortType = 0;
				this.sortOrder = 0;
			} else if(type==1){
				this.sortOrder = 1;
				this.priceType = this.priceType == 1 ? 2:1;
				this.sortType = this.priceType;
			} else if(type==2){
				this.sortOrder = 2;
				this.timeType = this.timeType == 1 ? 2:1;
				this.sortType = this.timeType;
			} else if(type==3){
				this.sortOrder = 3;
				this.hotType = this.hotType == 1 ? 2:1;
				this.sortType = this.hotType;
			}
			this.getData();
		},
		//修改显示类型
		change_show_type(type){
			this.listShowType = type;
		},
		async getData(value,keyword) {
			var me = this;
			me.$loading.show();
			const res = await me.$u.api.SupplierShareProducts({
				shareCode: uni.getStorageSync('supplier_sharing_shareCode'),
				skipCount: value||1,
				maxResultCount: me.pageSize,
				keyWord: keyword||me.keyword,
				sortOrder: me.sortOrder,
				sortType: me.sortType,
				getProductName: 'RecommendProduct'
			});
			if (res.result.code === 200) {
				me.proudctList = res.result.item.recommendProduct.newList;
				me.total = res.result.item.recommendProduct.totalCount;
				me.totalPage = Math.ceil(me.total / me.pageSize);
				me.$loading.hide();
			} else {
				uni.showToast({
					icon:'none',
					title: res.data.result.msg,
					duration: 2000
				});
				me.$loading.hide();
			}
		},
		async onReachBottom() {
			var me = this;
			if(me.isMobile){
				this.$loading.show();
				const fd = {
					shareCode: uni.getStorageSync('supplier_sharing_shareCode'),
					skipCount: me.page,
					maxResultCount: me.list,
					keyWord: me.keyword,
					sortOrder: me.sortOrder,
					sortType: me.sortType,
					getProductName: 'RecommendProduct'
				};
				for (const key in fd) {
					if (fd[key] === null || fd[key] === undefined || fd[key] === "")
						delete fd[key];
				}
				const res = await me.$u.api.SupplierShareProducts(fd);
				if (res.result.code === 200) {
					if(res.result.item.recommendProduct.newList.length){
						for(var i=0;i<res.result.item.recommendProduct.newList.length;i++){
							me.proudctList.push(res.result.item.recommendProduct.newList[i]);
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
			var me = this;
			this.$loading.show();
			const fd = {
				shareCode: uni.getStorageSync('supplier_sharing_shareCode'),
				skipCount: me.page,
				maxResultCount: me.list,
				keyWord: me.keyword,
				sortOrder: me.sortOrder,
				sortType: me.sortType,
				getProductName: 'RecommendProduct'
			};
			for (const key in fd) {
				if (fd[key] === null || fd[key] === undefined || fd[key] === "")
					delete fd[key];
			}
			const res = await me.$u.api.SupplierShareProducts(fd);
			if (res.result.code === 200) {
				if(res.result.item.recommendProduct.newList.length){
					for(var i=0;i<res.result.item.recommendProduct.newList.length;i++){
						me.proudctList.push(res.result.item.recommendProduct.newList[i]);
					}
					me.page++;
					me.status = 'loading';
					me.$loading.hide();
				}
			}
		},
		//去详情页
		goDetail(item){
			var arr = [];
			var obj = {
				...item
			};
			if(item.imglist.length){
				for(var i=0;i<item.imglist.length;i++){
					
					arr.push(item.imglist[0].imgUrl);
				}
				obj['imgUrlList'] = arr;
			}
			uni.setStorageSync('supplier_sharing_detail',JSON.stringify(obj));
			this.$Router.push({
			    name:'supplierSharingDetail'
			})
		},
		async init(){
			var me = this;
			this.$loading.show();
			this.isMobile=util.isMobile();
			//await this.getData();
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
		uni.setStorageSync('offer_sharing_id', this.$route.query.id);
		this.init();
	}
}
</script>
<style lang="less" scoped>
@import  "@/less/supplierSharing/supplierSharingList.less";
</style>
