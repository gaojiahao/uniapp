<template>
	<view class="productList" v-if="productList.length>0">
		<view class="item" v-for="(item,index) in productList" :key="index" @click="toDetails(item)">
			<view class="itemImg">
				<u-image width="100%" height="260" :src="item.src"></u-image>
			</view>
			<view class="ItemTxt">
				<view class="name">疯狂动物城警察兔朱迪毛绒</view>
				<view class="itemText">出厂货号：<text >我的文档</text></view>
				<view class="itemText">单价：<text class="price">￥12</text></view>
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
		},
		methods:{
			toDetails(item){
				uni.navigateTo({
				    url:'/productDetails'
				})
				
		}
		}
	}
</script>

<style scoped lang="less">
	.productList {
		flex: 1;
		overflow: hidden;
		background-color: #F5F5F5;
		padding: 10px 10px 0 10px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		.item {
			width: 48%;
			height: 205px;
			background-color: #fff;
			margin-bottom: 10px;

			.itemImg {
				height: 129px;
				width: 100%;
			}

			.ItemTxt {
				padding: 0 10px;
				color: #1E1E1E;
				
				.name {
					color: #000000;
					font-size: 16px;
					padding: 5px 0;
					overflow: hidden;
					/*超出部分隐藏*/
					white-space: nowrap;
					/*不换行*/
					text-overflow: ellipsis;
					/*超出部分文字以...显示*/
				}

				.itemText {
					line-height: 18px;
					.price {
						color: red;
					}
				}

				

			}
		}
	}
</style>
