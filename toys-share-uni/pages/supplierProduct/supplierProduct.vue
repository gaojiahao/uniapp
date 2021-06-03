<template>
	<view class="supplier_product">
		<!-- pc端 -->
		<template v-if="!isMobile">
			<!-- 头部 -->
			<spHead :contactInfo="contactInfo"></spHead>
			<view class="content">
				<view class="title"><view class="text">产品分享展示</view></view>
				<view class="content_panel">
					<b-row no-gutters>
						<b-col cols="3" v-for="(item,index) in allProduct" :key='index'>
							<view class="product_list_item2">
								<view class="product_list_img" @click="goDetail(item)">
									<image class="img" :src="item.imageUrl"></image>
								</view>
								<view class="product_list_info">
									<view class="product_list_info_text active" :title="item.name">
										{{item.name}}
									</view>
									<view class="product_list_info_plus2">
										<view class="product_list_info_text_left">
											单价：<text class="red_color">{{item.cu_de}}{{item.price}}</text>
										</view>
										<view class="product_list_info_text_left">
											出厂货号：{{item.fa_no}}
										</view>
										<view class="product_list_info_text_left">
											包装：{{item.ch_pa}}
										</view>
										<view class="product_list_info_text_left">
											产品规格：{{item.pr_le}}x{{item.pr_wi}}x{{item.pr_hi}}(CM)
										</view>
										<view class="product_list_info_text_left">
											外箱规格：{{item.ou_le}}x{{item.ou_wi}}x{{item.ou_hi}}(CM)
										</view>
										<view class="product_list_info_text_left">
											包装规格：{{item.in_le}}x{{item.in_wi}}x{{item.in_hi}}(CM)
										</view>
										<view class="product_list_info_text_left">
											装箱量：{{item.in_en}}/{{item.ou_lo}}(PCS)
										</view>
										<view class="product_list_info_text_left">
											体积/材积：{{item.bulk_stere}}(CBM)/{{item.bulk_feet}}(CUFT)
										</view>
										<view class="product_list_info_text_left">
											毛重/净重：{{item.gr_we}}/{{item.ne_we}}(KG)
										</view>
									</view>
								</view>
							</view>
						</b-col>
					</b-row>
					<pagination :totalPage="totalPage" :totalElements="total" v-model="currentPage" @change="getData"/>
				</view>
			</view>
			<!-- 尾部 -->
			<xFooter></xFooter>
		</template>
	</view>
</template>

<script>
import spHead from "@/components/supplierProduct/sp_head.vue"
import xFooter from "@/components/supplierProduct/footer.vue"
import Pagination from "@/components/pagination.vue"
import util from "@/common/js/util.js"
import {
  getToken
} from "@/service/common.js"

export default {
	name: "SupplierProduct",
	components: {
		spHead,
		xFooter,
		Pagination
	},
	data() {
		return {
			logo: require("@/static/images/supplierProduct/logo.png"),
			head_bg: require("@/static/images/supplierProduct/head_bg.png"),
			title_bg: require("@/static/images/supplierProduct/title.png"),
			defaultImg: require("@/static/images/logo.png"),
			isMobile:false,   //是否移动端
			contactInfo:{},
			currentPage:1,
			totalPage:1, //总页数 (引用页面传递过来)
			total:0, //总记录数 (引用页面传递过来)
			pageSize:8,
			allProduct:[],
		}
	},
	methods:{
		getData(){
			
		},
		//获取厂商联系方式
		async getCompanyByIDShare() {
			var me = this;
			const res = await me.$u.api.CompanyByIDShare({
				companyNumber: 'HS0000006'
			});
			if (res.result.code === 200) {
				this.contactInfo = res.result.item;
				uni.setStorageSync('supplier_sharing_contactInfo',JSON.stringify(this.contactInfo));
			} else {
				uni.showToast({
					icon:'none',
					title: res.result.msg,
					duration: 2000
				});
			}
		},
		// 获取所有产品
		async getSupplierProductShare() {
			var me = this;
			const res = await me.$u.api.SupplierProductShare({
				id: 'HS0000006',
				skipCount: 1,
				maxResultCount: 8
			});
			if (res.result.code === 200) {
				this.allProduct = res.result.item.items;
			} else {
				uni.showToast({
					icon:'none',
					title: res.data.result.msg,
					duration: 2000
				});
			}
		},
		//获取token
		async getToken(){
			var me = this;
			await getToken().then(
				(res) => {
					//me.$u.vuex('Utoken', res[1].data.result.item)
					uni.setStorageSync('token',res[1].data.result.item);
				}
			)
		},
		//去详情页
		goDetail(item){
			uni.setStorageSync('supplier_product_detail',JSON.stringify(item));
			this.$Router.push({
			    name:'supplierSharingDetail'
			})
		},
		//链接跳转
		toLink(value){
			this.$Router.push({
			    name: value
			})
		},
		async init(){
			this.$loading.show();
			this.isMobile=util.isMobile();
			await this.getToken();
			await this.getCompanyByIDShare();
			await this.getSupplierProductShare();
			this.$loading.hide();
		},
	},
	mounted() {
		
	},
	updated: function () {
	  this.$nextTick(function () {
		
	  })
	},
	created(){
		if(uni.getStorageSync('supplier_product_id')||this.$route.query.id){
			uni.getStorageSync('supplier_product_id') ?  (this.$route.query.id ? uni.setStorageSync('supplier_product_id', this.$route.query.id):''): uni.setStorageSync('supplier_product_id', this.$route.query.id);
			this.init();
		} else {
			this.$loading.show();
		}
	}
}
</script>
<style lang="less" scoped>
@import  "@/less/supplierProduct/supplierProduct.less";
</style>
