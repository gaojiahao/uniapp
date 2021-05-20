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
							<u-row gutter="16">
								<u-col span="3">
									<view class="offer_info_item">
										<view class="offer_info_item_label">
											报价单号：
										</view>
										<view class="active offer_info_item_text">
											{{sampleInfo.offerNumber}}
										</view>
									</view>
								</u-col>
								<u-col span="3">
									<view class="offer_info_item">
										<view class="offer_info_item_label">
											报价时间：
										</view>
										<view class="offer_info_item_text">
											{{sampleInfo.modifyOn}}
										</view>
									</view>
								</u-col>
								<u-col span="2">
									<view class="offer_info_item">
										<view class="offer_info_item_label">
											客户名称：
										</view>
										<view class="offer_info_item_text">
											{{sampleInfo.customerName}}
										</view>
									</view>
								</u-col>
								<u-col span="2">
									<view class="offer_info_item">
										<view class="offer_info_item_label">
											业务员：
										</view>
										<view class="offer_info_item_text blue_color">
											{{sampleInfo.linkman}}
										</view>
									</view>
								</u-col>
								<u-col span="2">
									<view class="offer_info_item active_button">
										<view class="offer_info_item_label">
											<u-button class="custom_style" :hair-line="false">查看联系方式</u-button>
										</view>
									</view>
								</u-col>
							</u-row>
							<div class="row_diver"></div>
							<u-row gutter="16">
								<u-col span="2">
									<view class="offer_info_item">
										<view class="offer_info_item_label">
											商品总款数：
										</view>
										<view class="offer_info_item_text">
											{{sampleInfo.total}}
										</view>
									</view>
								</u-col>
								<u-col span="2">
									<view class="offer_info_item">
										<view class="offer_info_item_label">
											商品总箱数：
										</view>
										<view class="offer_info_item_text">
											{{sampleInfo.totalCost}}
										</view>
									</view>
								</u-col>
								<u-col span="2.5">
									<view class="offer_info_item">
										<view class="offer_info_item_label">
											总体积/总材积：
										</view>
										<view class="offer_info_item_text">
											{{sampleInfo.aaa/sampleInfo.bbb}}
										</view>
									</view>
								</u-col>
								<u-col span="2.5">
									<view class="offer_info_item">
										<view class="offer_info_item_label">
											总毛重/总净重：
										</view>
										<view class="offer_info_item_text">
											30.02/20.01(KG)
										</view>
									</view>
								</u-col>
								<u-col span="2">
									<view class="offer_info_item">
										<view class="offer_info_item_label">
											总金额：
										</view>
										<view class="offer_info_item_text red_color">
											￥190.00
										</view>
									</view>
								</u-col>
							</u-row>
						</view>
					</view>
					<view class="offer_list">
						<view class="title">
							<view class="text">报价商品</view>
							<view class="tool_bar">
								<view class="tool_bar_item" :class="[searchType=='zonghe'?'active':'']" @click="change_search_type('zonghe')">综合</view>
								<view class="tool_bar_item" :class="[searchType=='price'?'active':'']" @click="change_search_type('price')">单价<u-icon :name="sortOrder < 2 ? 'arrow-downward':'arrow-upward'"></u-icon></view>
								<view class="tool_bar_item" :class="[searchType=='time'?'active':'']" @click="change_search_type('time')">时间<u-icon :name="sortType < 2 ? 'arrow-downward':'arrow-upward'"></u-icon></view>
								<view class="tool_bar_item grid" :class="[listShowType=='grid'?'active':'']" @click="change_show_type('grid')"><u-icon name="grid"></u-icon></view>
								<view class="tool_bar_item grid" :class="[listShowType=='list'?'active':'']" @click="change_show_type('list')"><u-icon name="list"></u-icon></view>
								<view class="tool_bar_item search">
									<x-search placeholder="请输入关键词" shape="round" height="30" v-model="keyword" :clearabled="true"
										bg-color="#fff"
										:input-style="{fontSize:'14px'}" 
										:action-style="{fontSize:'14px',width: '30px',
										marginLeft: '10px',
										marginRight: '20px',
										color: '#fff',}"
										@clear="clearKeyWord"
										@search="getProductOfferDetailPage"
										@custom="getProductOfferDetailPage"
										>
									</x-search>
								</view>
							</view>
						</view>
						<view class="product_list">
							<u-row v-if="listShowType=='grid'">
								<u-col span="3" v-for="(item,index) in productList" :key='index'>
									<view class="product_list_item">
										<view class="product_list_img">
											<image class="img" :src="item.imageUrl"></image>
										</view>
										<view class="product_list_info">
											<view class="product_list_info_text active" :title="item.name">
												{{item.name}}
											</view>
											<view class="product_list_info_text">
												参考单价：<text class="red_color">{{item.cu_de}}{{item.offerAmount}}</text>
											</view>
											<view class="product_list_info_text">
												出厂货号：{{item.fa_no}}
											</view>
											<view class="product_list_info_text">
												装箱量：{{item.in_en}}/{{item.ou_lo}}(PCS)
											</view>
										</view>
									</view>
								</u-col>
							</u-row>
							<u-row v-else-if="listShowType=='list'" class="u_row">
								<u-col span="12" v-for="(item,index) in productList" :key='index'>
									<u-row :style="{borderBottom: '1px solid #e9e9e9'}" class="product_list_item2">
										<u-col span="2">
											<image :src="item.imageUrl" class="product_list_img2"></image>
										</u-col>
										<u-col span="3">
											<view style="margin-left: 40px;">
												<view class="product_list_info_text2">产品名称：<span>{{item.name}}</span></view>
												<view class="product_list_info_text2">产品货号：<span>{{item.fa_no}}</span></view>
												<view class="product_list_info_text2">包装方式：<span>{{item.chinesePack}}</span></view>
												<view class="product_list_info_text2">样品规格：<span>{{item.pr_le}}x{{item.pr_wi}}x{{item.pr_hi}}(cm)</span></view>
											</view>
										</u-col>
										<u-col span="3">
											<view>
												<view class="product_list_info_text2">包装规格：<span>{{item.in_le}}x{{item.in_wi}}x{{item.in_hi}}(cm)</span></view>
												<view class="product_list_info_text2">外箱规格：<span>{{item.ou_le}}x{{item.ou_wi}}x{{item.ou_hi}}(cm)</span></view>
												<view class="product_list_info_text2">装箱量：<span>{{item.in_en}}/{{item.ou_lo}}(PCS)</span></view>
												<view class="product_list_info_text2">体积/材积：<span>{{item.bulk_stere}}(CBM)/{{item.bulk_feet}}(CUFT)</span></view>
											</view>
										</u-col>
										<u-col span="3">
											<view>
												<view class="product_list_info_text2">毛重/净重：<span>{{item.gr_we}}/{{item.ne_we}}(KG)</span></view>
												<view class="product_list_info_text2 red_color">报价：<span>{{item.cu_de}}{{item.offerAmount}}</span></view>
												<view class="product_list_info_text2 red_color">报价箱数：<span>{{item.boxNumber}}</span></view>
												<view class="product_list_info_text2 red_color">总金额：<span>{{item.cu_de}}{{item.offerAmount}}</span></view>
											</view>
										</u-col>
									</u-row>
								</u-col>
							</u-row>
						</view>
					</view>
				</view>
			</view>
			<view class="page_box">
				<uni-pagination @change="handlePage" show-icon="true" :total="totalCount" :current="currentPage" :pageSize="pageSize"></uni-pagination>
			</view>
		</view>
		<view class="footer">
			<view class="title">Copyright©2021 深圳小竹熊科技有限公司 粤ICP备13031421号-4</view>
		</view>
	</view>
</template>

<script>
import uniPagination from "@/uni_modules/uni-pagination/components/uni-pagination/uni-pagination.vue"
import xSearch from "@/components/x-search.vue"
export default {
	name: "OfferSharing",
	components: {
		uniPagination,
		xSearch
	},
	data() {
		return {
			home_icon: require("@/static/images/home.png"),
			bg0: require("@/static/images/offer_share_0.png"),
			bg1: require("@/static/images/offer_share_1.png"),
			bg2: require("@/static/images/offer_share_2.png"),
			bg3: require("@/static/images/offer_share_3.png"),
			bg4: require("@/static/images/offer_share_4.png"),
			bg6: require("@/static/images/offer_share_6.png"),
			bg8: require("@/static/images/offer_share_8.png"),
			keyword:'' ,//搜索关键字
			sampleInfo:{}, //择样信息
			productList:[] ,//产品列表
			currentPage: 1,
			pageSize: 12,
			categoryNumber: "",
			totalCount: 0,
			sortOrder: 0,  //价格搜索
			sortType: 0,   //时间搜索
			searchType:'zonghe',
			listShowType:'grid', //列表显示类型 grid list
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
			} else if(type=='price'){
				this.searchType = type;
				this.sortOrder = this.sortOrder == 1 ? 2:1;
				this.sortType = 1;
			} else if(type=='time'){
				this.searchType = type;
				this.sortOrder = 1;
				this.sortType = this.sortType == 1 ? 2:1;
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
		},
		//获取报价信息
		async getProductOfferByNumber() {
			var me = this;
			const res = await me.$u.api.GetProductOfferByNumberInfo({
				offerNumber: me.$route.query.id
			});
			if (res.result.code === 200) {
				this.sampleInfo = {
					...res.result.item,
					modifyOn:res.result.item.modifyOn?res.result.item.modifyOn.replace(/T.*/, "") : "",
				};
			} else {
				this.$message.error(res.result.msg);
			}
		},
		//获取token
		async getToken() {
			var me = this;
			let baseUrl = "https://www.toysbear.com"
			if(process.env.NODE_ENV === 'development'){
			  baseUrl = "http://139.9.71.135:8081"
			  // baseUrl = "https://www.toysbear.com"
			}else{
			  baseUrl = "https://www.toysbear.com"
			}
			let httpDefaultOpts = {
				url: baseUrl + '/api/GetToken',
				data: JSON.stringify({
					companyNum: 'LittleBearWeb',
					platForm: 'PC'
				}),
				method: 'post',
				header: {
					'X-Requested-With': 'XMLHttpRequest',
					'Content-Type': 'application/json; charset=utf-8'
				},
				dataType: 'json',
			}
			let promise = new Promise(function(resolve, reject) {
				uni.request(httpDefaultOpts).then(
					(res) => {
						me.$u.vuex('Utoken', res[1].data.result.item)
					}
				).catch(
					(response) => {
						console.log(response)
					}
				)
			})
		},
		// 获取报价信息产品列表
		async getProductOfferDetailPage() {
			var me = this;
			const fd = {
				skipCount: me.currentPage,
				maxResultCount: me.pageSize,
				offerNumber: me.$route.query.id,
				categoryNumber: me.currentCate && me.currentCate.id,
				keyword: me.keyword,
				sortOrder: me.sortOrder,
				sortType: me.sortType,
				// ...this.packingOptions
			};
			for (const key in fd) {
				if (fd[key] === null || fd[key] === undefined || fd[key] === "")
					delete fd[key];
			}
			const res = await me.$u.api.ProductOfferDetailPage(fd);
			if (res.result.code === 200) {
				this.productList = res.result.item.items;
				this.totalCount = res.result.item.totalCount;
			} else {
				this.$message.error(res.result.msg);
			}
		},
		//分页切换
		handlePage(e){
			// console.log(e.type);
			// console.log(e.current);
			this.currentPage = e.current;
			this.getProductOfferDetailPage();
		},
		async init(){
			await this.getToken();
			await this.getProductOfferByNumber();
			await this.getProductOfferDetailPage();
		},
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
@media (max-width: 767px) {
	.baojia{
		width: 100%;
		opacity: 1;
		background: #5363f6;
		position: relative;
		.head_bakcground_right_2{
			display: none;
		}
		.head_bakcground_left_1{
			display: none;
		}
		.head{
			height: 251rpx;
			position: relative;
			.head_bakcground{
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background-image: url(../../static/images/offer_share_0.png);
				background-size:cover;
				background-repeat:no-repeat;
				.head_bakcground_0{
					width: 100%;
				}
			}
			.head_bakcground_right{
				position: absolute;
				top: 35px;
				left: 195px;
				width: 245px;
				height: 212px;
				background-image: url(/static/img/offer_share_1.dc5f07c8.png);
				background-size: cover;
				background-repeat: no-repeat;
				.head_bakcground{
					width: 445rpx;
					height: 385rpx;
				}
			}
			.head_home{
				position: absolute;
				top: 23rpx;
				left: 10px;
				display: flex;
				height: 20rpx;
				.icon{
					font-size: 0;
					.head_home_icon{
						width: 20rpx;
						height: 18rpx;
						opacity: 1;
					}
				}
				.title{
					height: 20rpx;
					opacity: 1;
					font-size: 14rpx;
					font-weight: 400;
					text-align: center;
					color: #ffffff;
					line-height: 20rpx;
					margin-left: 10px;
				}
			}
			.title_info{
				position: absolute;
				top: 71px;
				left: 50rpx/2;
				.top{
					width: 100%;
					height: 41px;
					opacity: 1;
					font-size: 30px;
					font-weight: 400;
					color: #ffffff;
					margin-bottom: 14px;
				}
				.bottom{
					width: 100%;
					height: 29px;
					opacity: 1;
					font-size: 14px;
					font-weight: 700;
					color: #ffffff;
					margin-top: 12px;
				}
			}
		}
		.content{
			z-index: 1;
			width: 100%;
			min-height: 595rpx;
			opacity: 1;
			background: #5363f6;
			position: relative;
			margin-top: 95px;
			margin-bottom: 42px;
			.content_bg_0{
				width: 80%;
				height: 65px;
				margin: auto;
				position: relative;
				z-index: 1;
				background-image: url(../../static/images/offer_share_8_sm.png);
				background-size: cover;
				background-repeat: no-repeat;
				.head_bakcground{
					width: 100%;
					height: 65px;
				}
			}
			.content_bg_1{
				width: 90%;
				opacity: 1;
				background: #ffffff;
				border-radius: 10px;
				box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);
				height: auto;
				margin: auto;
				margin-top: -40px;
				position: relative;
				.content_bg_2{
					width: 1200rpx;
					opacity: 1;
					background: #ffffff;
					border-radius: 10px;
					box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);
					height: 46px;
					margin-left: 20px;
					position: absolute;
					bottom: -23px;
					z-index: -1;
				}
				.content_bg_3{
					width:40rpx;
					opacity: 1;
					background: #ffffff;
					border-radius: 10px;
					//box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);
					height: auto;
					position: absolute;
					bottom: -23px;
					right: -20px;
					z-index: -1;
				}
				.offer_panel{
					padding: 72px 32px 32px 32px;
					.offer_info{
						display: inline-block;
						.title{
							width: 1136px;
							height: 50px;
							opacity: 1;
							background: #6072fc;
							border-radius: 4px;
						}
						.text{
							height: 50px;
							opacity: 1;
							font-size: 16px;
							font-weight: 700;
							color: #ffffff;
							line-height: 50px;
							margin-left: 20px;
						}
					}
					.offer_list{
						display: inline-block;
						.title{
							width: 1136px;
							height: 50px;
							opacity: 1;
							background: #6072fc;
							border-radius: 4px;
							display: flex;
							.tool_bar{
								display: flex;
								margin-left: auto;
								.tool_bar_item{
									margin-left: auto;
									font-size: 14px;
									line-height: 34px;
									color: #ffffff;
									width: 70px;
									height: 34px;
									text-align: center;
									margin-top: 8px;
								}
								.active{
									background: #7d8cff;
									border: 1px solid #6072fc;
									border-radius: 6px;
								}
								.search {
									width: 240px;
								}
								.grid{
									width: 50px !important;
								}
							}
						}
						.text{
							height: 50px;
							opacity: 1;
							font-size: 16px;
							font-weight: 700;
							color: #ffffff;
							line-height: 50px;
							margin-left: 20px;
						}
						.product_list{
							margin: 20px 0;
							.product_list_item{
								height: 304px;
								background: #ffffff;
								border: 1px solid #dcdfe6;
								border-radius: 5px;
								margin-top: 10px;
								margin-bottom: 10px;
								.product_list_img{
									width: 234px;
									height: 176px;
									padding: 17px 17px 1px 17px;
									.img{
										width: 234px;
										height: 176px;
									}
								}
								.product_list_info{
									padding-left: 17px;
									padding-right: 17px;
									margin-top: 14px;
									.product_list_info_text{
										font-size: 13px;
										margin-bottom: 8px;
										color: #666666;
									}
									.active{
										font-size: 14px !important;
										font-weight: 400;
										color: #000000 !important;
										overflow: hidden;
										text-overflow: ellipsis;
										white-space: nowrap;
									}
								}
							}
							.product_list_item2{
								margin: 0!important;
								padding-top: 20px;
								padding-bottom: 13px;
								.product_list_img2{
									width: 180px;
									height: 127px;
								}
								.product_list_info_text2{
									font-size: 13px;
									margin-bottom: 8px;
									color: #666666;
								}
							}
						}
					}
				}
			}
			.content_bg_4{
				width: 272px;
				height: 345px;
				position: absolute;
				left: 196px;
				bottom: 70px;
				display: none;
				.head_bakcground{
					width: 272px;
					height: 345px;
				}
			}
			.content_bg_5{
				width: 236px;
				height: 303px;
				position: absolute;
				right: 177px;
				bottom: 70px;
				z-index: -1;
				display: none;
				.head_bakcground{
					width: 236px;
					height: 303px;
				}
			}
			.page_box{
				margin-top: 62px;
			}
		}
		.footer{
			width: 100%;
			height: 89rpx;
			opacity: 1;
			background: #ffffff;
			.title{
				text-align: center;
				line-height: 89rpx;
				opacity: 1;
				font-size: 16rpx;
				font-weight: 400;
				color: #666666;
			}
		}
	}
 }
/* 小屏幕（平板，大于等于 768px） */
@media screen and (min-width: 768px) {
	.baojia{
		width: 100%;
		opacity: 1;
		background: #5363f6;
		position: relative;
		.head_bakcground_right_2{
			position: absolute;
			top: 48rpx;
			right: -251rpx;
			width: 412rpx;
			height: 433rpx;
			opacity: 1;
			z-index: 2;
			background-image: url(../../static/images/offer_share_6.png);
			.head_bakcground{
				width: 412rpx;
				height: 433rpx;
				opacity: 1;
			}
		}
		.head_bakcground_left_1{
			position: absolute;
			top: 317rpx;
			left: -210rpx;
			width: 366rpx;
			height: 382rpx;
			opacity: 1;
			z-index: 2;
			background-image: url(../../static/images/offer_share_2.png);
			.head_bakcground{
				width: 366rpx;
				height: 382rpx;
				opacity: 1;
			}
		}
		.head{
			height: 350rpx;
			position: relative;
			.head_bakcground{
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background-image: url(../../static/images/offer_share_0.png);
				.head_bakcground_0{
					width: 100%;
				}
			}
			.head_bakcground_right{
				position: absolute;
				top: 32rpx;
				left: 58%;
				width: 445rpx;
				height: 385rpx;
				background-image: url(../../static/images/offer_share_1.png);
				.head_bakcground{
					width: 445rpx;
					height: 385rpx;
				}
			}
			.head_home{
				position: absolute;
				top: 23rpx;
				left: 20%;
				display: flex;
				height: 20rpx;
				.icon{
					font-size: 0;
					.head_home_icon{
						width: 20rpx;
						height: 18rpx;
						opacity: 1;
					}
				}
				.title{
					height: 20rpx;
					opacity: 1;
					font-size: 14rpx;
					font-weight: 400;
					text-align: center;
					color: #ffffff;
					line-height: 20rpx;
					margin-left: 10px;
				}
			}
			.title_info{
				position: absolute;
				top: 71px;
				left: 21%;
				.top{
					width: 100%;
					height: 118rpx;
					opacity: 1;
					font-size: 86rpx;
					font-weight: 400;
					color: #ffffff;
					margin-bottom: 14px;
				}
				.bottom{
					width: 100%;
					height: 54rpx;
					opacity: 1;
					font-size: 1;
					font-weight: 700;
					color: #ffffff;
					margin-top: 24px;
				}
			}
		}
		.content{
			z-index: 1;
			width: 100%;
			min-height: 595rpx;
			opacity: 1;
			background: #5363f6;
			position: relative;
			margin-bottom: 42px;
			.content_bg_0{
				width: 1154px;
				height: 65px;
				margin: auto;
				position: relative;
				z-index: 1;
				background-image: url(../../static/images/offer_share_8.png);
				.head_bakcground{
					width: 1154px;
					height: 65px;
				}
			}
			.content_bg_1{
				width: 1200rpx;
				opacity: 1;
				background: #ffffff;
				border-radius: 10px;
				box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);
				height: auto;
				margin: auto;
				margin-top: -40px;
				position: relative;
				.content_bg_2{
					width: 1200rpx;
					opacity: 1;
					background: #ffffff;
					border-radius: 10px;
					box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);
					height: 46px;
					margin-left: 20px;
					position: absolute;
					bottom: -23px;
					z-index: -1;
				}
				.content_bg_3{
					width:40rpx;
					opacity: 1;
					background: #ffffff;
					border-radius: 10px;
					//box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);
					height: auto;
					position: absolute;
					bottom: -23px;
					right: -20px;
					z-index: -1;
				}
				.offer_panel{
					padding: 72px 32px 32px 32px;
					.offer_info{
						display: inline-block;
						.title{
							width: 1136px;
							height: 50px;
							opacity: 1;
							background: #6072fc;
							border-radius: 4px;
						}
						.text{
							height: 50px;
							opacity: 1;
							font-size: 16px;
							font-weight: 700;
							color: #ffffff;
							line-height: 50px;
							margin-left: 20px;
						}
					}
					.offer_list{
						display: inline-block;
						.title{
							width: 1136px;
							height: 50px;
							opacity: 1;
							background: #6072fc;
							border-radius: 4px;
							display: flex;
							.tool_bar{
								display: flex;
								margin-left: auto;
								.tool_bar_item{
									margin-left: auto;
									font-size: 14px;
									line-height: 34px;
									color: #ffffff;
									width: 70px;
									height: 34px;
									text-align: center;
									margin-top: 8px;
								}
								.active{
									background: #7d8cff;
									border: 1px solid #6072fc;
									border-radius: 6px;
								}
								.search {
									width: 240px;
								}
								.grid{
									width: 50px !important;
								}
							}
						}
						.text{
							height: 50px;
							opacity: 1;
							font-size: 16px;
							font-weight: 700;
							color: #ffffff;
							line-height: 50px;
							margin-left: 20px;
						}
						.product_list{
							margin: 20px 0;
							.product_list_item{
								height: 304px;
								background: #ffffff;
								border: 1px solid #dcdfe6;
								border-radius: 5px;
								margin-top: 10px;
								margin-bottom: 10px;
								.product_list_img{
									width: 234px;
									height: 176px;
									padding: 17px 17px 1px 17px;
									.img{
										width: 234px;
										height: 176px;
									}
								}
								.product_list_info{
									padding-left: 17px;
									padding-right: 17px;
									margin-top: 14px;
									.product_list_info_text{
										font-size: 13px;
										margin-bottom: 8px;
										color: #666666;
									}
									.active{
										font-size: 14px !important;
										font-weight: 400;
										color: #000000 !important;
										overflow: hidden;
										text-overflow: ellipsis;
										white-space: nowrap;
									}
								}
							}
							.product_list_item2{
								margin: 0!important;
								padding-top: 20px;
								padding-bottom: 13px;
								.product_list_img2{
									width: 180px;
									height: 127px;
								}
								.product_list_info_text2{
									font-size: 13px;
									margin-bottom: 8px;
									color: #666666;
								}
							}
						}
					}
				}
			}
			.content_bg_4{
				width: 272px;
				height: 345px;
				position: absolute;
				left: 196px;
				bottom: 70px;
				background-image: url(../../static/images/offer_share_3.png);
				.head_bakcground{
					width: 272px;
					height: 345px;
				}
			}
			.content_bg_5{
				width: 236px;
				height: 303px;
				position: absolute;
				right: 177px;
				bottom: 70px;
				z-index: -1;
				background-image: url(../../static/images/offer_share_4.png);
				.head_bakcground{
					width: 236px;
					height: 303px;
				}
			}
			.page_box{
				margin-top: 62px;
			}
		}
		.footer{
			width: 100%;
			height: 89rpx;
			opacity: 1;
			background: #ffffff;
			.title{
				text-align: center;
				line-height: 89rpx;
				opacity: 1;
				font-size: 16rpx;
				font-weight: 400;
				color: #666666;
			}
		}
	}
}
/deep/ .u-divider-line {
    border-bottom: 3px solid #e4e7ed;
}
.wrap {

}

.u-row {
	margin: 20px 0;
}
.active_button{
	height: 34px !important;
}
.offer_info_item {
	height: 20px;
	display: flex;
	.offer_info_item_label{
		font-size: 14px;
		font-weight: 400;
		color: #333333;
	}
	//加粗
	.active{
		font-size: 16px !important;
		font-weight: 700;
		line-height: 20px;
	}
	.offer_info_item_text{
		font-size: 14px;
		color: #333333;
	}
}
.custom_style {
	font-size: 14px;
	height: 34px;
	line-height: 34px;
	border-radius: 18px;
	background: #6072fc;
	color: #ffffff;
}
.row_diver{
	width: 100%;
	height: 1px;
	border-color: #ebebeb;
	background-color: #ebebeb;
}
.red_color{
	color: #fa3534 !important;
}
.blue_color{
	color: #2b85e4 !important;
}
.u_row{
	margin: 0!important;
}
</style>
