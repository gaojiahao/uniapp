<template>
	<view class="custom_swiper">
		<view class="pre" @click="startClick">
			<view class="action_text"><</view>
		</view>
		<view class="swiperPanel" @touchstart="startMove" @touchend="endMove">
			<view class="swiperItem" v-for="(item, index) in swiperList.slice(0,5)" :key="index" :style="{transform: itemStyle[index].transform, zIndex: itemStyle[index].zIndex, opacity: itemStyle[index].opacity}">
				<!-- <view class="children" v-if="index==0">
					<image class="pic rotateY" :src="item.imageUrl"></image>
				</view>
				<view class="children" v-else-if="index==1">
					<image class="pic rotateY" :src="item.imageUrl"></image>
				</view>
				<view class="children" v-else-if="index==3">
					<image class="pic rotateX" :src="item.imageUrl"></image>
				</view>
				<view class="children" v-else-if="index==4">
					<image class="pic rotateX" :src="item.imageUrl"></image>
				</view>
				<view class="children" v-else>
					<image class="pic" :src="item.imageUrl"></image>
				</view> -->
				<view class="children">
					<image class="pic" :src="item.imageUrl?item.imageUrl:defaultImg" @click="goDetail(item)"></image>
					<view class="text_item">
						<view class="title" :title="item.name">{{item.name}}</view>
						<view class="content">
							<view class="fc_no">
								货号：{{item.fa_no}}
							</view>
							<view class="price">
								{{item.cu_de}}{{item.price}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="next" @click="endClick">
			<view class="action_text">></view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			swiperLists: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				slideNote: {
					x: 0,
					y: 0
				},
				screenWidth: 0,
				itemStyle: [],
				swiperList:[],
				defaultImg: require("@/static/images/logo.png"),
			};
		},
		watch:{
			swiperLists:{
				handler(val){
					this.swiperList = val.slice(0,5);
					this.swiperList.forEach((item, index) => {
						this.itemStyle.push(this.getStyle(index))
					})
				},
				deep:true,
				immediate:true
			}
		},
		created() {
			var macInfo = uni.getSystemInfoSync();
			this.screenWidth = macInfo.screenWidth;
			// 计算swiper样式
			// this.swiperList.forEach((item, index) => {
			// 	this.itemStyle.push(this.getStyle(index))
			// })
		},
		methods: {
			getStyle(e) {
				if (e > this.swiperList.length / 2) {
					var right = this.swiperList.length - e
					return {
						transform: 'scale(' + (1 - right / 10) + ') translate(-' + (right * 9) + '%,0px)',
						zIndex: 9999 - right,
						opacity: 0.8 / right
					}
				} else {
					return {
						transform: 'scale(' + (1 - e / 10) + ') translate(' + (e * 9) + '%,0px)',
						zIndex: 9999 - e,
						opacity: 0.8 / e
					}
				}
			},
			startMove(e) {
				this.slideNote.x = e.changedTouches[0] ? e.changedTouches[0].pageX : 0;
				this.slideNote.y = e.changedTouches[0] ? e.changedTouches[0].pageY : 0;
			},
			endMove(e) {
				var newList = JSON.parse(JSON.stringify(this.itemStyle))
				if ((e.changedTouches[0].pageX - this.slideNote.x) < 0) {
					// 向左滑动
					var last = [newList.pop()]
					newList = last.concat(newList)
				} else {
					// 向右滑动
					newList.push(newList[0])
					newList.splice(0, 1)
				}
				this.itemStyle = newList
			},
			startClick(){
				var newList = JSON.parse(JSON.stringify(this.itemStyle))
				var last = [newList.pop()]
				newList = last.concat(newList)
				this.itemStyle = newList
			},
			endClick(){
				var newList = JSON.parse(JSON.stringify(this.itemStyle))
				newList.push(newList[0])
				newList.splice(0, 1)
				this.itemStyle = newList
			},
			goDetail(item){
				this.$emit('go-detail',item);
			}
		}
	}
</script>

<style lang="scss">
.custom_swiper{
	position: relative;
	top: 70px;
	left: 0;
	width: 100%;
	.pre{
		width: 53px;
		height: 53px;
		opacity: 1;
		background: #ffffff;
		border-radius: 50%;
		box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);
		position: absolute;
		top: 200px;
		left: 350px;
		z-index: 10000;
		.action_text{
			font-size: 40px;
			color: #666666;
			text-align: center;
			vertical-align: middle;
			width: 45px;
			height: 40px;
			line-height: 43px;
		}
	}
	.pre:hover{
		cursor: pointer;
	}
	.next{
		width: 53px;
		height: 53px;
		opacity: 1;
		background: #ffffff;
		border-radius: 50%;
		box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);
		position: absolute;
		top: 200px;
		right: 350px;
		z-index: 10000;
		.action_text{
			font-size: 40px;
			color: #666666;
			text-align: center;
			vertical-align: middle;
			width: 55px;
			height: 40px;
			line-height: 43px;
		}
	}
	.next:hover{
		cursor: pointer;
	}
	.swiperPanel {
		// margin: 20px 0;
		height: 470px;
		width: 100%;
		overflow: hidden;
		position: relative;

		.swiperItem {
			height: 100%;
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
			transition: all .5s;
			.children {
				height: 100%;
				width: 543px;
				margin: 2px auto;
				border-radius: 10px;
				box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);
				border-radius: 20px;
				background-color: #FFFFFF;
				.pic {
					padding: 30px;
					width: 100%;
					height: 368px;
					// box-shadow: 0 0 10px #333;
				}
				.pic:hover{
					cursor: pointer;
				}
				.text_item{
					padding: 0 30px 30px 30px;
					.title{
						font-size: 24px;
						font-weight: 400;
						color: #333333;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.content{
						display: flex;
						.fc_no{
							font-size: 24px;
							font-weight: 400;
							color: #999999;
						}
						.price{
							font-size: 24px;
							font-weight: 400;
							color: #fa3534;
							margin-left: auto;
						}
					}
				}
			}
			.rotateY {
			  -webkit-transform: rotateY(45deg);
			  transform: rotateY(45deg);
			}
			.rotateX {
			  -webkit-transform: rotateY(135deg);
			  transform: rotateY(135deg);
			}
		}
	}
}
</style>
