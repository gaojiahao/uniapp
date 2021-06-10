<template>
	<view class="head">
		<view class="head_item_grid">
			<view class="head_item_panel">
				<view class="left">
					<view class="logo">
						<image :src="contactInfo2.companyLogo" class="image"></image>
					</view>
					<view class="title":title="contactInfo2.companyName" >
						{{contactInfo2.companyName}}
					</view>
				</view>
				<view v-if="isMobile" class="contact_modal" @click="show_modal(true)">
					<u-icon name="phone"></u-icon>
				</view>
				<view class="right">
					<view class="contact">
						<view class="item" v-if="contactInfo2.phoneNumber||contactInfo2.telephone" :title="contactInfo2.phoneNumber||contactInfo2.telephon">联系电话：{{contactInfo2.phoneNumber||contactInfo2.telephone}}</view>
						<view class="item" v-if="contactInfo2.contactsMan" :title="contactInfo2.contactsMan">联系人：{{contactInfo2.contactsMan}}</view>
					</view>
					<view class="item" v-if="contactInfo2.address">
						<view class="address" :title="contactInfo2.address">公司地址：{{contactInfo2.address}}</view>
					</view>
				</view>
			</view>
		</view>
		<u-modal v-model="is_contact_modal" :width="'80%'" :show-confirm-button="false" :mask-close-able="true" :show-title="false" class="contact_modal">
			<view class="slot-content">
				<view class="sm_btn_item">
					<view class="item">
						<u-icon name="close" @click="show_modal(false)"></u-icon>
					</view>
				</view>
				<view class="sm_panel">
					<view class="item active">联系方式</view>
					<view class="item" v-if="contactInfo2.companyName">公司名称：{{contactInfo2.companyName}}</view>
					<view class="item" v-if="contactInfo2.contactsMan">联系人：{{contactInfo2.contactsMan}}</view>
					<view class="item" v-if="contactInfo2.phoneNumber||contactInfo2.telephone">联系电话：{{contactInfo2.phoneNumber||contactInfo2.telephone}}</view>
					<view class="item" v-if="contactInfo2.address">公司地址：{{contactInfo2.address}}</view>
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script>

export default {
	name: "sp_head",
	props:{
		contactInfo: {
			type: Object,
			default () {
				return {}
			}
		},
		isMobile:{
			type:Boolean,
			default:false
		}
	},
	watch:{
		contactInfo:{
			handler(val){
				this.contactInfo2 = val;
			},
			deep:true,
		},
	},
	data() {
		return {
			head_logo: require('@/static/images/supplierProduct/logo.png'),
			contactInfo2:{},
			is_contact_modal:false //是否展示联系方式
		}
	},
	methods:{
		show_modal(value){
			this.is_contact_modal = value;
		}
	},
	mounted() {
		
	},
	created(){
		this.contactInfo2 = uni.getStorageSync('supplier_product_contactInfo')&&JSON.parse(uni.getStorageSync('supplier_product_contactInfo'));
	}
}
</script>
<style lang="less" scoped>
@media screen and (min-width: 768px){
	.head{
		width: 100%;
		height: 240px;
		background-image: url(../../static/images/supplierProduct/head_bg.png);
		.head_item_grid{
			width: 12rem;
			background: #ffffff;
			margin: auto;
			height: 1.2rem;
			border-radius: 0px 0px 0.2rem 0.2rem;
			.head_item_panel{
				width: 100%;
				display: flex;
				.left{
					display: flex;
					.logo{
						margin: 14px 30px;
						width: 93px;
						height: 93px;
						.image{
							width: 93px;
							height: 93px;
						}
					}
					.title{
						height: 73px;
						font-size: 32px;
						font-weight: 800;
						text-align: left;
						color: #333333;
						line-height: 73px;
						margin-left: 16px;
						margin: 22px 0;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						width: 500px;
					}
				}
				.right{
					margin-left: auto;
					font-size: 16px;
					color: #666666;
					width: 500px;
					margin-left: 10px;
					.contact{
						margin-top: 33px;
						display: -webkit-box;
						display: -webkit-flex;
						display: flex;
						margin-bottom: 13px;
						line-height: 21px;
						font-size: 16px;
						height: 21px;
						text-align: right;
						flex-direction: row-reverse;
					}
					.item{
						margin-right: 36px;
						line-height: 21px;
						font-size: 16px;
						height: 21px;
						text-align: right;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						.address{
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
					}
				}
			}
		}
	}
}
@media screen and (max-width: 767px){
	.head{
		width: 100%;
		height: 217.5px;
		background-image: url(../../static/images/supplierProduct/head_bg_sm.png);
		background-repeat: no-repeat;
		.head_item_grid{
			width: 90%;
			background: #ffffff;
			margin: 0 5%;
			height: 60px;
			border-radius: 0px 0px 20px 20px;
			.head_item_panel{
				width: 100%;
				display: flex;
				.left{
					display: flex;
					.logo{
						margin: 7px 15px;
						width: 46.5px;
						height: 46.5px;
						.image{
							width: 46.5px;
							height: 46.5px;
						}
					}
					.title{
						height: 36.5px;
						font-size: 16px;
						font-weight: 800;
						text-align: left;
						color: #333333;
						line-height: 36.5px;
						margin-left: 16px;
						margin: 11px 0;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						width: 200px;
					}
				}
				.right{
					display: none;
				}
				.contact_modal{
					height: 30px;
					font-size: 16px;
					font-weight: 800;
					color: #fff;
					line-height: 30px;
					margin: 14.25px 0 11px 0;
					margin-left: auto;
					background: #41aae4;
					width: 30px;
					text-align: center;
					margin-right: 7px;
					border-radius: 5px;
				}
			}
		}
	}
}
.contact_modal{
	.sm_btn_item{
	    display: flex;
	    margin: 5px;
		.item{
			margin-right: 5px;
			margin-left: auto;
		}
	}
	.sm_panel {
		width: 100%;
		padding: 10px;
		.item{
			margin-bottom: 10px;
			// overflow: hidden;
			// text-overflow: ellipsis;
			// white-space: nowrap;
		}
		.active{
			font-weight: 700;
			color: #666666;
		}
	}
}
</style>
