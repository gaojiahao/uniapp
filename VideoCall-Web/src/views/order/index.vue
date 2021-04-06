<!--
 * @Description: 
 * @Author: gaojiahao
 * @Date: 2021-04-01 17:59:28
 * @FilePath: \projectd:\LittleBearPC\VideoCall-Web\src\views\order\index.vue
 * @LastEditTime: 2021-04-06 12:04:42
 * @LastEditors: sueRimn
 * @Descripttion: 
 * @version: 1.0.0
-->
<template>
    <div class="order">
        <!-- 新增择样 -->
        <template v-if="!samplingStatus">
            <!-- <div class="addSampling">
                <div class="head">
                    <div class="title">
                        <i class="iconfont icondanju"></i>
                        择样单号
                    </div>
                </div>   
                <div class="content">
                    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="0">
                        <FormItem  prop="number">
                            <Input v-model="formValidate.number" placeholder="请输入择样单号"></Input>
                        </FormItem>
                        <FormItem prop="code">
                            <Input v-model="formValidate.code" placeholder="请输入验证码"></Input>
                        </FormItem>
                        <FormItem>
                            <div style="width:100%;"> 
                                <Button type="primary" @click="save" style="float: left;" long>确认</Button>
                            </div>
                        </FormItem>
                    </Form>
                </div>
            </div> -->
            <AddSampling @save="save"></AddSampling>
        </template>
        <template v-else>
            <Product :tab_select="tab_select" @chang-tab-type="changTabType" @chang-type="changType" @change-product-list="changeProductList" ></Product>
            <!-- 聊天 -->
            <Chart></Chart>
            <!-- 择样购物车 -->
            <ProductList @change-product-list="changeProductList" :isProductList="isProductList"></ProductList>
        </template>
    </div>
</template>
<script>
import ProductList from "@components/order/productList";
import Chart from "@components/public/chart";
import Product from "@components/order/product";
import AddSampling from "@components/order/addSampling";
export default {
    name:'Order',
    components:{
        ProductList,
        Chart,
        Product,
        AddSampling
    },
    data(){
        return {
            samplingStatus: true,  //采样状态
            tab_select: 'order',
            // columns1: [
            //     {
            //         title: '品名',
            //         key: 'name',
            //         render: (h, params) => {
            //             return h('div', [
            //             h('span', {
            //                 style: {
            //                     display: 'inline-block',
            //                     width: '100%',
            //                     overflow: 'hidden',
            //                     textOverflow: 'ellipsis',
            //                     whiteSpace: 'nowrap',
            //                     color:'#2684D1',
            //                     marginTop: '4px'
            //                 },
            //                 domProps: {
            //                     title: params.row.name
            //                 }
            //             }, params.row.name)
            //             ])
            //         },
            //         width: 107
            //     },
            //     {
            //         title: '货号',
            //         key: 'age',
            //         width: 90
            //     },
            //     {
            //         title: '报价',
            //         key: 'address',
            //         render: (h, params) => {
            //             return h('div', [
            //             h('span', {
            //                 style: {
            //                     // display: 'inline-block',
            //                     // width: '100%',
            //                     // overflow: 'hidden',
            //                     // textOverflow: 'ellipsis',
            //                     // whiteSpace: 'nowrap',
            //                     color:'#EC1B1B',
            //                     marginTop: '4px'
            //                 },
            //                 domProps: {
            //                     title: params.row.address
            //                 }
            //             }, '￥'+params.row.address)
            //             ])
            //         },
            //     }
            // ],
            // data1: [
            //     {
            //         name: 'John Brown',
            //         age: 18,
            //         address: '199.00',
            //         date: '199.00'
            //     },
            //     {
            //         name: 'Jim Green',
            //         age: 24,
            //         address: '199.00',
            //         date: '199.00'
            //     },
            //     {
            //         name: 'Joe Black',
            //         age: 30,
            //         address: '199.00',
            //         date: '199.00'
            //     },
            //     {
            //         name: 'Jon Snow',
            //         age: 26,
            //         address: '199.00',
            //         date: '199.00'
            //     },
            //     {
            //         name: 'Jon Snow',
            //         age: 26,
            //         address: '199.00',
            //         date: '199.00'
            //     },
            //     {
            //         name: 'Jon Snow',
            //         age: 26,
            //         address: '199.00',
            //         date: '199.00'
            //     },{
            //         name: 'Jon Snow',
            //         age: 26,
            //         address: '199.00',
            //         date: '199.00'
            //     },{
            //         name: 'Jon Snow',
            //         age: 26,
            //         address: '199.00',
            //         date: '199.00'
            //     },{
            //         name: 'Jon Snow',
            //         age: 26,
            //         address: '199.00',
            //         date: '199.00'
            //     },{
            //         name: 'Jon Snow',
            //         age: 26,
            //         address: '199.00',
            //         date: '199.00'
            //     },{
            //         name: 'Jon Snow',
            //         age: 26,
            //         address: '199.00',
            //         date: '199.00'
            //     }
            // ],
            // nowProduct:'1111111111',
            // test: require("@assets/bg/test.jpg"),
            isProductList:false,
        }
    },
    methods: {
        save(){
            this.samplingStatus = true;
        },
        changTabType(value){
            this.tab_select = value;
        },
        changType(value,tab_select){
            this.samplingStatus = value;
            this.tab_select = tab_select;
        },
        changeProductList(){
            this.isProductList = this.isProductList ? false:true;
        }
    },
}
</script>
<style lang="less" scoped>
    .order{
        .head{
            width: 311px;
            height: 45px;
            background: #2684D1;
            line-height: 45px;
            color: #fff;
            .title{
                margin-left: 10px;
            }
        }
    }
    .red{
        color: #EC1B1B;
    }
    .blue{
        color: #2684D1;
    }
</style>