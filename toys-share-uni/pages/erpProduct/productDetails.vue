<template>
	<view class="scrool-page">
		<view class="header-cont">头部</view>
		<view class="list-cont">
			<scroll-view class="scrool-more" style="height: 100%" scroll-y="true" scroll-with-animation="true">
				<view lass="list" v-for="(item,index) in list" :key="index">
					{{item.cont}}
				</view>
			</scroll-view>
		</view>

		<!-- <view class="footer">
			<button type="primary">提交</button>
		</view> -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						cont: "张三"
					},
					{
						cont: "张三"
					},
					{
						cont: "张三"
					},
					{
						cont: "张三"
					},

					{
						cont: "张三"
					},
					{
						cont: "张三"
					},
					{
						cont: "张三"
					},
					{
						cont: "张三"
					},

					{
						cont: "张三"
					},
					{
						cont: "张三"
					},
					{
						cont: "张三"
					},
					{
						cont: "张三"
					},
					{
						cont: "张三"
					},
					{
						cont: "张三"
					},
					{
						cont: "张三=="
					},
				]
			}
		}
	}
</script>

<style scoped lang="less">
	// page {
	// 	width: 100%;
	// 	height: 100%;
	// }


	.scrool-page {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}

	.header-cont {
		width: 100%;
		height: 110rpx;
		line-height: 100rpx;
		text-align: center;
		background: red;
	}

	.list-cont {
		flex: 1;
		position: relative;

		.scrool-more {
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
		}

		.list {
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			background: #e0e0e0;

		}
	}


	.footer {
		color: #fff;
		line-height: 100rpx;
		flex: 0 0 100rpx;
		/* 不放大不缩小固定100rpx */
	}
</style>
