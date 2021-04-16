<!--
 * @Description: 
 * @Author: gaojiahao
 * @Date: 2021-04-01 17:59:28
 * @FilePath: \projectd:\LittleBearPC\VideoCall-Web\src\views\order\index.vue
 * @LastEditTime: 2021-04-15 16:56:31
 * @LastEditors: sueRimn
 * @Descripttion: 
 * @version: 1.0.0
-->
<template>
    <div class="order">
        <!-- 新增择样 -->
        <template v-if="samplingStatus">
            <AddSampling @save="save"></AddSampling>
        </template>
        <template v-else>
            <Product :tab_select="tab_select" @chang-tab-type="changTabType" @chang-type="changType" @change-product-list="changeProductList" :sampleSelection="sampleSelection"></Product>
            <!-- 聊天 -->
            <Chart></Chart>
            <!-- 择样购物车 -->
            <ProductList @change-product-list="changeProductList" :isProductList="isProductList" :sampleSelection="sampleSelection"></ProductList>
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
            isProductList:false,
            sampleSelection:{},
        }
    },
    methods: {
        save(val){
            this.sampleSelection = val;
            this.samplingStatus = false;
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