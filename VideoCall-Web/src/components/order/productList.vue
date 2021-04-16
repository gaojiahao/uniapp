<!--
 * @Description: 
 * @Author: gaojiahao
 * @Date: 2021-04-06 11:15:36
 * @FilePath: \projectd:\LittleBearPC\VideoCall-Web\src\components\order\productList.vue
 * @LastEditTime: 2021-04-16 17:27:35
 * @LastEditors: sueRimn
 * @Descripttion: 
 * @version: 1.0.0
-->
<template>
    <div class="productList_wrap">
    <!-- 择样购物车 -->
        <Drawer title="Sample selection details" :closable="true" v-model="isShow" @on-close="changeProductList" width='1255' class="productList">
            <div slot="close" style="cursor: pointer;color: black;display: inline-block;width: 100%;height: 24px;line-height: 24px;font-size: 24px;color: #999999;margin-top: 4px;
                margin-right: 8px;">
                <Icon type="md-arrow-round-forward" />
            </div>
            <div class="title">
                <div class="item">悦翔展厅：择样单</div><div class="item" style="margin-left:47px">本次代号： {{sampleSelection.number}}</div>
            </div>
            <Table :columns="columns2" :data="data2" height="700">
                <template slot-scope="{ row, index }" slot="action">
                    <Icon type="ios-trash-outline" style="font-size:24px" @click="delSelection(row.id)" />
                </template>
                <!-- <template slot="footer">
                    <div class="footer_page">
                        <div class="footer_page_right">
                            <Page :total="totalPage" :current="pageData.skipCount" @on-change="" show-elevator show-total show-sizer :page-size-opts="pageData.pageSizeOpts" :page-size="pageData.skipTotal" @on-page-size-change="" :transfer="true"></Page>
                        </div>
                    </div>
                </template> -->
            </Table>
            <div class="total">
                <div class="item">
                    <div class="label">Total Price：</div>
                    <div class="text active">USD {{totalAmount}}</div>
                </div>
                <div class="item">
                    <div class="label">Total Volume：</div>
                    <div class="text">{{totalBulkStere}} cbm</div>
                    <div class="text">{{totalBulkFeet}} cuft</div>
                </div>
                <div class="item">
                    <div class="label">Total Quantitly：</div>
                    <div class="text">{{totalCount}}</div>
                </div>
                <div class="item">
                    <div class="label">Total CTNS：</div>
                    <div class="text">{{totalBoxCount}}</div>
                </div>
                <div class="item">
                    <div class="label">Total Rcords：</div>
                    <div class="text">{{totalKuanshu}}</div>
                </div>
            </div>
        </Drawer>
    </div>
</template>
<script>
import * as Cookies from "js-cookie";
import {
  QuerySampleOrderDetails,
  DeleteSampleOrderDetail
} from "@service/meetingService";

export default {
    name:'ProductList',
    props:{
        isProductList:{
            type: Boolean,
            default: false,
        },
        sampleSelection:{
            type:Object,
            default () {
                return {}
            }
        }
    },
    watch:{
        isProductList:{
            handler(val){
                this.isShow = val;
                if(val){
                    this.getQuerySampleOrderDetails();
                }
            }
        }
    },
    data(){
        return {
            columns2: [
                {
                    title: ' ',
                    key: 'img',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', 
                        [
                            h('Poptip',{
                                props: {
                                    trigger:'hover',
                                    content:"content",
                                    placement:"right",
                                    transfer:true,
                                },
                            },[
                                h('img', {
                                    attrs: {
                                        src: (params.row.imgOne ?this.$base_url+params.row.imgOne:'') || require("@assets/default/logo.png")
                                    },
                                    style: {
                                        width: '30px',
                                        height: '30px'
                                    },
                                    on: {
                                        click:()=>{
                                            this.srcData = {
                                                imgName: '图片预览',
                                                src: (params.row.imgOne ?this.$base_url+params.row.imgOne:'') || require("@assets/default/logo.png")
                                            }
                                            this.showImageModel(true);
                                        }
                                    }
                                }),
                                h('img',{
                                    slot:"content",
                                    attrs: {
                                        src: (params.row.imgOne ?this.$base_url+params.row.imgOne:'') || require("@assets/default/logo.png")
                                    },
                                    style: {
                                        width: '300px',
                                        height: '300px'
                                    },
                                    class:'api'
                                })
                            ])    
                        ]);
                    },
                    width: 130,
                    resizable: true,
                },
                {
                    title: ' ',
                    key: 'info1',
                    render: (h, params) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    display: 'inline-block',
                                    width: '100%',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    color:'#000000',
                                    marginTop: '4px',
                                    fontWeight:400,
                                },
                                domProps: {
                                    title: params.row.productName
                                }
                            }, params.row.productName),
                            h('div', { 
                                style: {
                                    marginTop: '4px',
                                    color:'#FF3E3E',
                                },  
                            }, params.row.factoryNo),
                            h('div',[
                                h('span', {
                                    style: {

                                        color:'#FF3E3E',
                                    }, 
                                },'USD'),
                                h('span', {
                                    style: {
                                        color:'#FF3E3E',
                                        fontWeight:600,
                                        marginLeft: '4px',
                                    }, 
                                },params.row.factoryPrice),
                            ], {  
                                style: {
                                    marginTop: '4px',
                                    color:'#FF3E3E',
                                }, 
                            }, params.row.factoryPrice),
                        ])
                    },
                    width: 210
                },
                {
                    title: 'Product information',
                    key: 'info2',
                    render: (h, params) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    marginTop: '4px',
                                    fontSize: '12px',
                                    color: '#333333'
                                },
                            },'Item NO：' + params.row.number),
                            h('div', {
                                style: {
                                    marginTop: '4px',
                                    fontSize: '12px',
                                    color: '#333333'
                                },  
                            },'packing：' + params.row.chinesePack),
                            h('div', { 
                                style: {
                                    marginTop: '4px',
                                    fontSize: '12px',
                                    color: '#333333'
                                },  
                            },'productSize：' + params.row.productLength +'x'+params.row.productWidth+'x'+params.row.productHeight+'(cm)'),
                            h('div', {  
                                style: {
                                    marginTop: '4px',
                                    fontSize: '12px',
                                    color: '#333333'
                                }, 
                            },'packageSize：' + params.row.innerBoxLength +'x'+params.row.innerBoxWidth+'x'+params.row.innerBoxHeight+'(cm)'),
                        ])
                    },
                    width: 210
                },
                {
                    title: ' ',
                    key: 'info3',
                    render: (h, params) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    marginTop: '4px',
                                    fontSize: '12px',
                                    color: '#333333'
                                },
                            },'conrtonSize：' + params.row.conrtonSize),
                            h('div', {
                                style: {
                                    marginTop: '4px',
                                    fontSize: '12px',
                                    color: '#333333'
                                },  
                            },'Inner Box/Outer Packing：' + params.row.innerBoxCount+'(cbm)/'+params.row.outerBoxLoadCapa+'(cuft)'),
                            h('div', { 
                                style: {
                                    marginTop: '4px',
                                    fontSize: '12px',
                                    color: '#333333'
                                },  
                            },'cbm：' + params.row.cbm),
                            h('div', {  
                                style: {
                                    marginTop: '4px',
                                    fontSize: '12px',
                                    color: '#333333'
                                }, 
                            },'GW/NW：' + params.row.outerBoxGrossWeight+'/'+params.row.outerBoxNetWeight+'(kg)'),
                        ])
                    },
                    width: 210
                },
                {
                    renderHeader:(h,params)=>{
                        return h('div',[
                            h('div','CTNS'),
                            h('div','Total QTY'),
                        ])
                    },
                    key: 'ctns',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    marginTop: '4px',
                                    color:'#FF3E3E',
                                },
                            }, params.row.ctns),
                            h('div', {
                                style: {
                                    marginTop: '4px',
                                    fontSize: '12px',
                                    color:'#FF3E3E',
                                },  
                            }, params.row.outerBoxLoadCapa+'pcs'),
                        ])
                    },
                    width: 120
                },
                {
                    title: 'Total volume',
                    key: 'Total',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    marginTop: '4px',
                                    color:'#FF3E3E',
                                },
                            }, params.row.innerBoxCount+'cbm'),
                            h('div', {
                                style: {
                                    marginTop: '4px',
                                    color:'#FF3E3E',
                                },  
                            }, params.row.outerBoxLoadCapa+'cuft'),
                        ])
                    },
                    width: 142
                },
                {
                    title: 'Total amount',
                    key: 'totalAmount',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    marginTop: '4px',
                                    color:'#FF3E3E',
                                },
                            },'$'+params.row.totalAmount),
                        ])
                    },
                    width: 140    
                },
                {
                    title: ' ',
                    align: 'center',
                    slot: 'action',
                    width: 60    
                }
            ],
            data2:[],
            pageData:{
                skipCount: 1,
                skipTotal: 5,
                maxResultCount: 5,
                keyword:'',
                pageSizeOpts:[5,10,15],
            },
            totalPage:0,
            isShow:false,
            totalAmount:0,
            totalBoxCount:0,
            totalBulkFeet: 0,
            totalBulkStere: 0,
            totalCount: 0,
            totalKuanshu: 0,
            roomNumber:null,
        }
    },
    methods: {
        changeProductList(){
            this.$emit('change-product-list');
        },
        getQuerySampleOrderDetails(){
            var params = {
                pageIndex:1,
                pageSize:99999,
                code:this.sampleSelection.number,
                verifyCode:this.sampleSelection.code,
                roomNumber: this.roomNumber
            };
            return new Promise((resolve, reject) => {
                QuerySampleOrderDetails(params).then(res => {
                    if (res.success) {
                        this.data2 = res.data.sampleOrderDetails.items;
                        this.totalAmount=res.data.totalAmount;
                        this.totalBoxCount=res.data.totalBoxCount;
                        this.totalBulkFeet=res.data.totalBulkFeet;
                        this.totalBulkStere=res.data.totalBulkStere;
                        this.totalCount=res.data.totalCount;
                        this.totalKuanshu=res.data.totalKuanshu;
                        this.$FromLoading.hide();
                    } else {
                        this.$Message.error({
                            background: true,
                            content: res.result.msg
                        });
                        this.$FromLoading.hide();
                    }
                });
            });     
        },
        //删除择样
        delSelection(id){
            var params = {
                id:id,
                roomNumber: this.roomNumber
            };
            return new Promise((resolve, reject) => {
                DeleteSampleOrderDetail(params).then(res => {
                    if (res.success) {
                        this.$Message.info({
                            background: true,
                            content: res.message
                        });
                        this.getQuerySampleOrderDetails();
                        this.$FromLoading.hide();
                    } else {
                        this.$Message.error({
                            background: true,
                            content: res.message
                        });
                        this.$FromLoading.hide();
                    }
                });
            });        
        },
    },
    created(){
        this.roomNumber=Cookies.get('channel');
    }
}
</script>