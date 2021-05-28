<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Gabriel.gaojiahao
 * @Date: 2019-03-25 10:56:56
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-05 11:04:07
 -->
<template>
  <view class="loadding" v-show="show" :style="autoHeight">
    <u-loading mode="flower" size="100"></u-loading>
  </view>
</template>

<script>

export default {
	name: "x-loading",
	data() {
		return {
			show: false,
			autoHeight: {
				height: ''
			},
		};
	},
	watch:{
		show:{
			handler(val){
				if(val){
					this.getHeight();
				}
			}
		},
	},
	methods:{
		getHeight() {
			
			var obj = document.getElementsByClassName('uni-app--maxwidth');
			var h = obj[0].offsetHeight;
			this.autoHeight.height = parseInt(h) + 'px';
		},
	}
};
</script>

<style lang="less" scoped>
.loadding {
  //加载动画
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10000;
  .u-loading{
	position: fixed;
	top: 45%;
	left: calc(50% - 22.5px);
  }
}
</style>
