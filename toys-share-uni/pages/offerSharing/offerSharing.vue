<template>
	<view class="baojia">
		<view class="head_bakcground_right_2">
			<image :src="bg6" class="head_bakcground"></image>
		</view>
		<view class="head_bakcground_left_1">
			<image :src="bg2" class="head_bakcground"></image>
		</view>
		<view class="head">
			<view class="head_bakcground">
				<image :src="bg0" class="head_bakcground_0"></image>
			</view>
			<view class="head_bakcground_right">
				<image :src="bg1" class="head_bakcground"></image>
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
				<image :src="bg8" class="head_bakcground"></image>
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
								<view class="tool_bar_item active">综合</view>
								<view class="tool_bar_item">单价<u-icon name="arrow-downward"></u-icon></view>
								<view class="tool_bar_item">时间<u-icon name="arrow-downward"></u-icon></view>
								<view class="tool_bar_item grid"><u-icon name="grid"></u-icon></view>
								<view class="tool_bar_item grid"><u-icon name="list"></u-icon></view>
								<view class="tool_bar_item search">
									<u-search placeholder="请输入关键词" shape="round" height="30" v-model="keyword" :clearabled="true"
										bg-color="#fff"
										:input-style="{fontSize:'14px'}" 
										:action-style="{fontSize:'14px',width: '30px',
										marginLeft: '10px',
										marginRight: '20px',
										color: '#fff',}">
									</u-search>
								</view>
							</view>
						</view>
						<view class="product_list">
							<view class="product_list_item">
								<image :src="bg2"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="title">Copyright©2021 深圳小竹熊科技有限公司 粤ICP备13031421号-4</view>
		</view>
	</view>
</template>

<script>
export default {
	name: "OfferSharing",
	components: {

	},
	data() {
		return {
			home_icon: require("@/static/images/home.png"),
			bg0: require("@/static/images/offer_share_0.png"),
			bg1: require("@/static/images/offer_share_1.png"),
			bg2: require("@/static/images/offer_share_2.png"),
			bg6: require("@/static/images/offer_share_6.png"),
			bg8: require("@/static/images/offer_share_8.png"),
			keyword:'' ,//搜索关键字
			sampleInfo:{}, //择样信息
			productList:[] //产品列表
		}
	},
	methods:{
		getContentStyle(){
			var content = document.getElementsByClassName('content_bg_1');
			var content3 = document.getElementsByClassName('content_bg_3');
			content3[0].style.height = content[0].clientHeight+"px";
		},
		//获取报价信息
		async getProductOfferByNumber() {
			var me = this;
			const res = await me.$u.api.GetProductOfferByNumberInfo({
				offerNumber: me.$route.query.id
			});
			if (res.result.code === 200) {
				this.sampleInfo = res.result.item;
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
			const fd = {
				skipCount: this.currentPage,
				maxResultCount: this.pageSize,
				offerNumber: this.$route.query.id,
				categoryNumber: this.currentCate && this.currentCate.id,
				keyword: this.keyword,
				sortOrder: this.sortOrder,
				sortType: this.sortType,
				// ...this.packingOptions
			};
			for (const key in fd) {
				if (fd[key] === null || fd[key] === undefined || fd[key] === "")
					delete fd[key];
			}
			console.log(fd);
			const res = await this.$http.post("/api/ProductOfferDetailPage", fd);
			if (res.data.result.code === 200) {
				this.productList = res.data.result.item.items;
				this.totalCount = res.data.result.item.totalCount;
			} else {
				this.$message.error(res.data.result.msg);
			}
		},
		async init(){
			await this.getToken();
			await this.getProductOfferByNumber();
		},
	},
	mounted() {
		this.getContentStyle();
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
		.head{
			height: 251rpx;
			position: relative;
			.head_bakcground{
				display: none;
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				.head_bakcground_0{
					width: 100%;
				}
			}
			.head_bakcground_right{
				display: none;
				position: absolute;
				top: 32rpx;
				left: 1115rpx;
				width: 445rpx;
				height: 385rpx;
				opacity: 1;
				.head_bakcground{
					width: 445rpx;
					height: 385rpx;
				}
			}
			.head_bakcground_right_2{
				display: none;
				position: absolute;
				top: 48rpx;
				right: -260rpx;
				width: 412rpx;
				height: 433rpx;
				opacity: 1;
				.head_bakcground{
					width: 412rpx;
					height: 433rpx;
					opacity: 1;
				}
			}
			.head_home{
				position: absolute;
				top: 23rpx;
				left: 388rpx;
				display: flex;
				display: none;
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
				left: 412px;
				.top{
					width: 100%;
					height: 118rpx;
					opacity: 1;
					font-size: 86rpx;
					font-weight: 400;
					color: #ffffff;
				}
				.bottom{
					width: 100%;
					height: 54rpx;
					opacity: 1;
					font-size: 39rpx;
					font-weight: 700;
					color: #ffffff;
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
			.content_bg_0{
				
			}
			.content_bg_1{
				width: 1200rpx;
				opacity: 1;
				background: #ffffff;
				border-radius: 10px;
				box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);
				min-height: 200rpx;
				margin: auto;
				margin-top: 83px;
			}
			.content_bg_2{
				
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
			.head_bakcground{
				width: 366rpx;
				height: 382rpx;
				opacity: 1;
			}
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
				opacity: 1;
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
					font-size: 39rpx;
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
			margin-top: 95px;
			.content_bg_0{
				width: 1154px;
				height: 65px;
				margin: auto;
				position: relative;
				z-index: 1;
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
									line-height:50px;
									color: #ffffff;
									width: 70px;
									height: 50px;
									text-align: center;
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
					}
				}
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
	margin: 22px 0;
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

.bg-purple {
	background: #d3dce6;
}

.bg-purple-light {
	background: #e5e9f2;
}

.bg-purple-dark {
	background: #99a9bf;
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
</style>
