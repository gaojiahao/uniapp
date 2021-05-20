<template>
	<view class="homeBox">
		<view class="header">
			<view class="headerTitle">
				<text class="vendorName">
					成卓玩具厂
				</text>
				<view class="vendorInfo">
					<text class="contact">联系人</text>
					<text>电话</text>
				</view>
			</view>
			<view class="search">
				<u-search
					:action-style="{background:'#1FBFCB',height:'32px',color:'#fff',lineHeight:'32px',borderRadius: '4px'}"
					bg-color="#fff" border-color="#1FBFCB" :clearabled="true" shape="square" placeholder="请输入关键词"
					@clear="clear" v-model="keyword"></u-search>
			</view>

		</view>
		<view class="main">
			<scroll-view :style="{height:'100%'}" :scroll-top="scrollTop" scroll-y="true" class="scroll-Y"
				@scrolltoupper="upper" @scrolltolower="lower">

				<view class="wrap">
					<u-swiper interval="4000" height="350" :border-radius="0" :list="list">


					</u-swiper>

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
						<u-icon @click="switchover" name="grid-fill" color="#666666" size="8"></u-icon>
					</view>
				</view>
				<!-- 产品列表 -->
				<component :is="isGrid" :productList="productList"></component>

				<view class="footer">
					<text>资料来源：耀昇展厅</text>
					<text>技术支持：深圳宏升软件技术开发有限公司</text>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import Detailed from './components/detailed.vue'
	import JaneVersion from './components/JaneVersion.vue'
	export default {
		components: {
			Detailed,
			JaneVersion
		},
		data() {
			return {
				isGrid: "Detailed",
				scrollTop: 0,
				keyGuid: "BE9757F5-E2B7-43DC-BABC-09251BCE3C72",
				old: {
					scrollTop: 0
				},
				productList: [{},
					{},
					{}
				],
				keyword: '',
				list: [{
						image: '../../static/images/offer_share_1_bg.png',
					},
					{
						image: '../../static/images/advertisingIcon.png',
					}
				]
			}
		},
		mounted() {
			this.getProductkeyGuid()
		},
		methods: {
			getProductkeyGuid() {
				uni.request({
					url: "https://hall.toysbear.com/api/Manufacturer/ManufacturerInfo?keyGuid="+this.keyGuid, //仅为示例，并非真实接口地址。
					method: 'GET',
				
					success: (res) => {
						console.log(res.data);

					}
				});

			},


			// 滚动到顶部/左边，会触发 scrolltoupper 事件
			upper: function(e) {
				console.log(e)
			},
			// 滚动到底部/右边，会触发 scrolltolower 事件
			lower: function(e) {
				console.log(111111)
				console.log(e)
			},
			clear() {
				console.log(88888)
			},
			switchover() {

				switch (this.isGrid) {
					case "JaneVersion":
						this.isGrid = "Detailed";
						break;
					case "Detailed":
						this.isGrid = "JaneVersion"
						break;
				}

			},

		}
	}
</script>

<style scoped lang="less">
	.homeBox {
		min-height: 100vh;
		// height: 100%;
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

				.vendorInfo {
					.contact {
						padding-right: 20px;
					}
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
