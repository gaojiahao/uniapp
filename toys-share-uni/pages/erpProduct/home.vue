<template>
	<view class="homeBox">
		<view class="header">
			<view class="headerTitle">
				<text class="vendorName">
					成卓玩具厂
				</text>
				<view class="vendorInfo">
					<text>联系人</text>
					<text>电话</text>
				</view>
			</view>
			<view class="search">
				<u-search
					:action-style="{background:'#1FBFCB',height:'32px',color:'#fff',lineHeight:'32px',borderRadius: '4px'}"
					bg-color="#fff" border-color="#1FBFCB" :clearabled="true" shape="square" placeholder="请输入关键词"
					v-model="keyword"></u-search>
			</view>

		</view>
		<view class="main">
			<scroll-view :style="{height:'100vh'}" :scroll-top="scrollTop" scroll-y="true" class="scroll-Y"
				@scrolltoupper="upper" @scrolltolower="lower">

				<view class="wrap">
					<u-swiper height="350" :border-radius="0" :list="list"></u-swiper>
				</view>
				<view class="controls">
					<view class="left">
						<view class="itemSearch">
							<text>单价</text>
							<view class="timeIcon">
								<u-icon name="arrow-up" color="#666666" size="8"></u-icon>
								<u-icon name="arrow-down" color="#666666" size="8"></u-icon>
							</view>
						</view>
						<view class="itemSearch">
							<text>时间</text>
							<view class="timeIcon">
								<u-icon name="arrow-up" color="#666666" size="8"></u-icon>
								<u-icon name="arrow-down" color="#666666" size="8"></u-icon>
							</view>
						</view>
					</view>
					<view class="right">
						<u-icon name="grid-fill" color="#666666" size="8"></u-icon>
					</view>
				</view>

				<view class="productList">
					<view class="item" v-for="(item,index) in tableData" :key="index">
						<view class="productImg">
							<view class="itemImg">
								<u-image width="100%" height="156" :src="item.src"></u-image>
							</view>
							<view class="timeTxt">
								<u-icon name="clock-fill" color="#9fd3fb" size="28"></u-icon>
								<text class="text">2020-10-10</text>
							</view>
						</view>
						<view class="productInfo">
							<view class="name">疯狂动物城警察兔朱迪毛绒</view>
							<view>出厂货号：<text class="itemText">我的文档</text></view>
							<view>包装：<text class="itemText">我的文档</text></view>
							<view>装箱量：<text class="itemText">我的文档</text></view>
							<view>样品规格：<text class="itemText">我的文档</text></view>
							<view>包装规格：<text class="itemText">我的文档</text></view>
							<view>外箱规格：<text class="itemText">我的文档</text></view>
							<view>体积/材积：<text class="itemText">我的文档</text></view>
							<view>毛重/净重：<text class="itemText">我的文档</text></view>
							<view>参考单价：<text class="itemText">我的文档</text></view>
							
						</view>

					</view>

				</view>
				<view class="footer">
					<text>资料来源：耀昇展厅</text>
					<text>技术支持：深圳宏升软件技术开发有限公司</text>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				tableData: [{
						img: "",

					},
					{
						img: "",

					}
				],
				keyword: '',
				list: [{
						image: '../../static/images/offer_share_1.png',
					},
					{
						image: '../../static/images/advertisingIcon.png',
					}
				]
			}
		},
		methods: {
			// 滚动到顶部/左边，会触发 scrolltoupper 事件
			upper: function(e) {
				console.log(e)
			},
			// 滚动到底部/右边，会触发 scrolltolower 事件
			lower: function(e) {
				console.log(111111)
				console.log(e)
			},

		}
	}
</script>

<style scoped lang="less">
	.homeBox {
		// min-height: 100vh;
		height: 100%;
		width: 100%;

		.header {
			width: 100%;
			height: 120px;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99;
			background-color: #FFFFFF;

			.headerTitle {
				width: 100%;
				height: 65px;
				color: #fff;
				background-color: #1FBFCB;
				padding: 10px 20px 0;
				box-sizing: border-box;

				.vendorName {
					font-size: 17px;
				}
			}

			.search {
				padding: 10px;
			}
		}

		.main {
			width: 100%;
			// height: calc(100vh - 120px);
			margin-top: 120px;
			overflow-y: auto;
			flex: 1;

			.wrap {
				height: 175px;
			}

			.controls {
				height: 40px;
				display: flex;
				padding: 0 10px;

				.left {
					flex: 1;
					display: flex;
					align-items: center;

					.itemSearch {
						display: flex;
						color: #666666;
						margin-right: 30px;

						.timeIcon {
							margin-left: 5px;
							display: flex;
							flex-direction: column
						}
					}
				}

				.right {
					display: flex;
					align-items: center;
					width: 16px;
				}
			}

			.productList {
				flex: 1;
				overflow: hidden;
				background-color: #F5F5F5;
				padding: 10px 10px 0 10px;

				.item {
					display: flex;
					height: 255px;
					background-color: #fff;
					margin-bottom: 10px;

					.productImg {
						width: 120px;
						padding: 0 5px;

						.itemImg {
							height: 200px;
							display: flex;
							justify-content: center;
							align-items: center;
						}

						.timeTxt {
							display: flex;

							.text {
								margin-left: 5px;
							}
						}
					}

					.productInfo {
						flex: 1;
						color: #999999;
						padding:0 6px;
						.name {
							color: #000000;
							font-size: 16px;
							padding: 10px 0;
							overflow: hidden;
							/*超出部分隐藏*/
							white-space: nowrap;
							/*不换行*/
							text-overflow: ellipsis;
							/*超出部分文字以...显示*/
						}
						.itemText{
							color: #000000;
							line-height: 22px;
						}
					}
				}
			}

			.footer {
				height: 58px;
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				justify-content: center;
				color: #666666;
			}
		}
	}
</style>
