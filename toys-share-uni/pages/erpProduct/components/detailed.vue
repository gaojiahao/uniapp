<template>
	<view class="productList" v-if="productList.length>0">
		<view class="item" v-for="(item,index) in productList" :key="index">
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
</template>

<script>
	export default {
		props: {
			productList: {
				type: Array
			}
		},
		data() {
			return {}
		}
	}
</script>

<style scoped lang="less">
	
	
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
				padding: 0 6px;
	
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
	
				.itemText {
					color: #000000;
					line-height: 22px;
				}
			}
		}
	}
	
</style>
