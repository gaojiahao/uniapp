<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:35:57
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-04-06 18:24:39
-->
<template>
    <Modal v-model="show" title="  " @on-ok="ok" @on-cancel="cancel" width="1048" class="modalDetail">
        <div class="product_info_panel">
            <div class="product_info_wrap" v-if="show">
                <XCarousel v-model="value1" loop v-if="show">
                    <CarouselItem v-if="show">
                        <div class="product_info_img">
                            <div class="product_info_img_border">
                                <img :src="test"/>
                            </div>
                        </div>
                    </CarouselItem>
                    <CarouselItem v-if="show">
                        <div class="product_info_img">
                            <div class="product_info_img_border">
                                <img :src="test"/>
                            </div>
                        </div>
                    </CarouselItem>
                    <CarouselItem v-if="show">
                        <div class="product_info_img">
                            <div class="product_info_img_border">
                                <img :src="test"/>
                            </div>
                        </div>
                    </CarouselItem>
                    <CarouselItem v-if="show">
                        <div class="product_info_img">
                            <div class="product_info_img_border">
                                <img :src="test"/>
                            </div>
                        </div>
                    </CarouselItem>
                </XCarousel>
            </div>
            <div class="product_info_list">
                Guess who I am?        
            </div>
        </div>
        <div slot="footer">
            
        </div>    
    </Modal>
</template>

<script>
import XCarousel from "@components/public/carousel/carousel";

export default {
    name: 'ModalProductDetail',
    components: {
        XCarousel    
    },
    props: {
        showModal: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            show: false,
            test: require("@assets/bg/test.jpg"),
            value1: 0,
        }
    },
    watch:{
        showModal: {
            handler(val) {
                this.show = val;
            }
        },
    },
    methods: {
        ok(){

        },
        cancel(){
            this.$emit('show-modal-detail', false);    
        },
    },
    mounted() {

    },
    created(){
       
    }
}
</script>
<style lang="less" scoped>
.modalDetail  /deep/ .ivu-modal-close /deep/ .ivu-icon-ios-close {
    color: #999999; 
}
.modalDetail /deep/ .ivu-modal /deep/ .ivu-modal-header {
    border-bottom: unset;
    padding: 5px;
    line-height: 1;
    background: #fff;
    border-radius: 6px 6px 0px 0px;
    color: #999999;
    .ivu-modal-header-inner{
        color: #999999;
    }
}
.modalDetail .footer_page{
    margin: 0 10px 10px 10px;
    overflow: hidden;
    .footer_page_right{
        float: right;
    }
}
.modalDetail .product_info_panel{
    display: flex;
}
.modalDetail .product_info_wrap {
    width: 541px;
    height: 552px;
    .product_info_img {
        width: 541px;
        .product_info_img_border {
            width: 541px;
            height: 395px;
            border: 1px solid #EFEFEF;
            img {
                width: 503px;
                height: 357px;
                margin: 19px;
            }
        }
    }
}
.modalDetail{
    .c_item{
        .demo-carousel {
            height: 200px;
            line-height: 200px;
            text-align: center;
            color: #fff;
            font-size: 20px;
            background: #506b9e;
        }
    }
}
</style>

