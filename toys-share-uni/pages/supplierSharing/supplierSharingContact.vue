<template>
	<view class="supplier_contact">
		<!-- pc端 -->
		<template v-if="!isMobile">
			<!-- 头部 -->
			<xHead></xHead>
			<view class="content">
				<view class="offer_panel">
					<view class="contact_info">
						<b-row class="u_row">
							<b-col cols="12" sm="6">
								<view class="map">
									<BMapComponent
										ref="mapBaiduMap"
										isMapClick="审核"
										:address="defaultContact.contactAddress"
									  ></BMapComponent>
								</view>
							</b-col>
							<b-col cols="12" sm="6">
								<view class="info">
									<view class="item title">联系方式</view>
									<view class="item">公司名称：<text>{{defaultContact.companyName}}</text></view>
									<view class="item">联系人：<text>{{defaultContact.contactName}}</text></view>
									<view class="item">联系电话：<text>{{defaultContact.phoneNumber||defaultContact.telephone}}</text></view>
									<view class="item">邮箱：<text>{{defaultContact.email}}</text></view>
									<view class="item">地址：<text>{{defaultContact.contactAddress}}</text></view>
								</view>
							</b-col>
						</b-row>
					</view>
				</view>
			</view>
			<!-- 尾部 -->
			<xFooter></xFooter>
		</template>
	</view>
</template>

<script>
import xHead from "@/components/supplierSharing/x-head.vue"
import xFooter from "@/components/supplierSharing/x-footer.vue"
import BMapComponent from "@/components/x-map.vue";
import util from "@/common/js/util.js"

export default {
	name: "supplierSharingContact",
	components: {
		xHead,
		xFooter,
		BMapComponent
	},
	data() {
		return {
			isMobile:false,   //是否移动端
			defaultContact:{
				companyName:'小竹熊玩具云科技公司',
				contactName:'李小姐',
				phoneNumber:'',
				telephone:'18902747007',
				email:'aly@alytrading.com',
				contactAddress:'广东省汕头市澄海区莱美路港口路段',
			}
		}
	},
	methods:{
		clearKeyWord(){
			
		},
		getProductOfferDetailPage(){
			
		},
		getData(){
			
		},
		async init(){
			this.isMobile=util.isMobile();
			// await this.getToken();
		},
	},
	mounted() {
		
	},
	created(){
		uni.setStorageSync('offer_sharing_id', this.$route.query.id);
		this.init();
	}
}
</script>
<style lang="less" scoped>
@import  "@/less/supplierSharing/supplierSharingContact.less";
</style>
