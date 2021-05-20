<template>
	<view class="productDetails">
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
		</view>
		<view class="main">
			<view class="top">
				<u-icon @click="toHome" name="arrow-left" color="#333333" size="28"></u-icon>
				<text class="detailed">产品详情</text>
				<u-icon name="zhuanfa" color="#333333" size="28"></u-icon>
			</view>

			<view class="wrap">

				<swiper @change="topSwiperTab" :current="uCurrent" :indicator-dots="false" :autoplay="autoplay"
					style="height: 280px;">
					<swiper-item v-for="(item, index) in list" :key="index">

						<view v-if="item.vid" style="height: 280px;">
							<video @play="playVideo" style="width:100%; height:280px;" id="myVideo" :src="item.image"
								controls></video>
						</view>
						<view v-else style="height: 280px;">
							<image mode="scaleToFill" style="width:100%; height:280px;" :src="item.image"></image>
						</view>
						<!-- 	<view class="abbr">
							
						</view> -->
					</swiper-item>
				</swiper>
				<!-- <u-swiper mode="number" indicator-pos="bottomRight" height="560" :border-radius="0" :list="list">
				</u-swiper> -->
				<block class="number">
					<view class="u-indicator-item-number">{{ uCurrent + 1 }}/{{ list.length }}</view>
				</block>
			</view>
			<view class="productInfo">
				<view class="head">
					<view class="price">￥20</view>
					<view class="name">疯狂动物城警察兔朱迪毛绒</view>
					<view class="timeTxt">
						<view class="left">
							<text>YS0505408</text>
						</view>
						<view class="right">
							<u-icon name="clock-fill" color="#9fd3fb" size="28"></u-icon>
							<text class="text">2020-10-10</text>
						</view>

					</view>

				</view>
				<view class="textInfo">
					<view class="details">
						产品详情
					</view>
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				player: '',
				autoplay: true,
				interval: 2000,
				uCurrent: null,
				list: [{
						vid: false,
						image: '../../static/images/offer_share_1.png',
					},

					{
						vid: true,
						image: 'https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4'
					},
					{
						vid: false,
						image: '../../static/images/offer_share_1.png',
					},
					{
						vid: false,
						image: '../../static/images/offer_share_1.png',
					},
				]
			}
		},
		mounted() {
			this.player = uni.createVideoContext("firstVideo")
		},
		methods: {
			toHome(){
				uni.navigateTo({
				    url:'/home'
				})
				// this.$Router.push({
				//     name:'home',
				//     params:{
				//         id:12
				//     }
				// })
			},
			topSwiperTab(current, source) {
				this.autoplay = true;
				// 切换如果不是视频位置 暂停视频
				if (current.target.current != 0) {
					this.player?.pause()
				} else {
					this.player?.play()
				}

				this.uCurrent = Number(current.target.current)
			},
			playVideo() {
				this.autoplay = false;
			}

		}
	}
</script>

<style scoped lang="less">
	.productDetails {
		min-height: 100vh;
		// height: 100%;
		width: 100%;

		.header {
			width: 100%;
			height: 65px;
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
		}

		.main {
			width: 100%;
			// height: calc(100vh - 120px);
			margin-top: 65px;
			overflow-y: auto;
			flex: 1;
			background-color: #f5f5f5;

			.top {
				height: 44px;
				color: #333333;
				display: flex;
				align-items: center;
				padding: 0 15px;

				.detailed {
					flex: 1;
					display: flex;
					justify-content: center;
				}
			}

			.wrap {
				height: 280px;

				/* 指示器样式 */
				.u-indicator-item-number {
					width: 40px;
					padding: 6rpx 16rpx;
					line-height: 1;
					background-color: rgba(0, 0, 0, 0.3);
					border-radius: 100rpx;
					font-size: 26rpx;
					color: rgba(255, 255, 255, 0.8);
					position: relative;
					left: 80%;
					top: -30px;
				}

			}

			.productInfo {
				padding: 0 15px;
				margin-bottom: 15px;
				background-color: #fff;

				.head {

					padding-top: 15px;
					height: 103px;
					box-sizing: border-box;

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

					.price {
						color: #F51E12;
					}

					.timeTxt {
						display: flex;
						justify-content: space-between;

						.left {

							padding: 0 8px;
							color: #239BF7;
							background-color: #dff1ff;
							border-radius: 6px;
						}

						.right {
							.text {
								margin-left: 5px;
							}
						}

					}
				}

				.textInfo {
					color: #999999;
					padding-bottom: 8px;

					.details {
						color: #239BF7;
						font-size: 15px;
					}

					.itemText {
						color: #333333;
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
</style>
