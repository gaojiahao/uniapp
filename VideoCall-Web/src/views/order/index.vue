<!--
 * @Description: 
 * @Author: gaojiahao
 * @Date: 2021-04-01 17:59:28
 * @FilePath: \projectd:\LittleBearPC\VideoCall-Web\src\views\order\index.vue
 * @LastEditTime: 2021-04-05 18:57:11
 * @LastEditors: sueRimn
 * @Descripttion: 
 * @version: 1.0.0
-->
<template>
    <div class="order">
        <!-- 新增择样 -->
        <template v-if="!samplingStatus">
            <div class="addSampling">
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
            </div>
        </template>
        <template v-else>
            <!-- tab切换 -->
            <div class="addSampling_tab">
                <div class="head">
                    <div class="title" :class="[tab_select=='order' ? 'active':'']" @click="changTabType('order')">
                        <div class="active_text">
                            择样单号
                        </div>
                    </div>
                    <div class="title" :class="[tab_select=='product' ? 'active':'']" @click="changTabType('product')">
                        <div class="active_text">
                            当前产品
                        </div>
                    </div>
                    <div class="title right">
                        <i class="iconfont iconqiehuan" @click="changType"></i>
                    </div>
                </div>     
            </div>
            <!-- 择样单号 -->
            <div class="select_order" v-if="tab_select=='order'">
                <Table :columns="columns1" :data="data1" height="280"></Table>
                <div class="select_order_info">
                    <Row>
                        <Col span="8">
                            总款数：6
                        </Col>
                        <Col span="8">
                            总箱数：120
                        </Col>
                        <Col span="8">
                            总个数：1200
                        </Col>
                        <Col span="24">
                            总体积/总材积：0.035/10.27
                        </Col>
                        <Col span="19">
                            总金额：<span class="red">￥1890.00</span>
                        </Col>
                        <Col span="5">
                            <div class="order_list" @click="changeProductList"></div>    
                        </Col>
                    </Row>
                </div>
            </div>
            <!-- 当前产品 -->
            <div class="now_product" v-else>
                <Row class="ipput_wrap">
                    <Col span="6"><div class="text">公司编号</div></Col>
                    <Col span="12"><Input v-model="nowProduct" class="iipput_wrap_box" :style="{width:'130px'}" clearable /></Col>
                    <Col span="6"><Button type="primary" @click="saveNow" :style="{width:'60px'}" >确定</Button></Col>
                </Row>
                <Row class="product_wrap">
                    <Col span="8">
                        <Poptip trigger='hover' content="content" placement="right" :transfer="true">
                            <img :src="test" style="width:87px;height:65px;margin-left:10px"/>
                            <img slot="content" :src="test" style="width:300px;height:300px" />
                        </Poptip>
                    </Col>
                    <Col span="16">
                        <div class="product_wrap_text"><span title="益智回力积木军事灰色日本 三式中型坦克（75PCS）sdfdsfdsfdsfsddfd">益智回力积木军事灰色日本 三式中型坦克（75PCS）sdfdsfdsfdsfsddfd</span></div>
                        <div class="red">￥：299.00</div>
                    </Col>
                </Row>
                <Row class="now_item_box">
                    <Col span="24">
                        <div class="now_item">
                            <div class="title">公司编号：</div>
                            <div class="text">12342132132312321</div>
                        </div>
                        <div class="now_item">
                            <div class="title">货号：</div>
                            <div class="text">YD-12421</div>
                        </div>
                        <div class="now_item">
                            <div class="title">包装：</div>
                            <div class="text"></div>
                        </div>
                        <div class="now_item">
                            <div class="title">包装：</div>
                            <div class="text"></div>
                        </div>
                        <div class="now_item">
                            <div class="title">包装：</div>
                            <div class="text"></div>
                        </div>
                        <div class="now_item">
                            <div class="title">包装：</div>
                            <div class="text"></div>
                        </div>
                        <div class="now_item">
                            <div class="title">包装：</div>
                            <div class="text"></div>
                        </div>
                        <div class="now_item">
                            <div class="title">包装：</div>
                            <div class="text"></div>
                        </div>
                        <div class="now_item">
                            <div class="title">包装：</div>
                            <div class="text"></div>
                        </div>
                    </Col>
                </Row>
                <Row class="action" type="flex" justify="space-around">
                    <Col span="4">
                        <Button type="primary" shape="circle">加入择样</Button>
                    </Col>
                    <Col span="4">
                        <Button type="warning" shape="circle">删除</Button>
                    </Col>
                </Row>
            </div>
            <!-- 聊天 -->
            <div class="chart">
                <div class="head">
                    <div class="title">
                        <i class="iconfont iconliaotian"></i>
                        聊天
                    </div>
                </div>   
                <div class="content_box" id="content_box">
                    <List footer="" :border="false" :split="false" :loading="loading">
                        <ListItem v-for="(item,index) in chartHistory" :key="index">
                            <template v-if="!item.isMy">
                                <div class="userInfo">
                                    <div class="avatar">
                                        <i class="iconfont iconren1 person text"></i>
                                    </div>
                                    <div class="name">
                                        {{item.name}}
                                    </div>
                                    <div class="date">
                                        {{item.date}}
                                    </div>
                                </div>
                                <div class="content_text">
                                    <div class="content_text_box">
                                        <div  class="content_text_box_text">{{item.content}}</div>
                                    </div>
                                </div>
                            </template>
                            <template v-else>
                                <div class="my">
                                    <div class="avatar">
                                        <i class="iconfont iconren1 person text"></i>
                                    </div>
                                    <div class="name">
                                        {{item.name}}
                                    </div>
                                    <div class="date">
                                        {{item.date}}
                                    </div>
                                </div>
                                <div class="content_text_my">
                                    <div class="content_text_box">
                                        <div  class="content_text_box_text">{{item.content}}</div>
                                    </div>
                                </div>    
                            </template>
                        </ListItem>
                    </List>
                </div>
                <div class="input_wrap">
                    <Input v-model="chartValue" placeholder="说点什么"  :border="false" class="input_box" clearable />
                    <span class="blue" @click="send">发送</span>
                </div>
            </div>
            <!-- 择样购物车 -->
            <Drawer title="Sample selection details" :closable="true" v-model="isProductList" @on-close="changeProductList" width='1255'>
                <!-- <div slot="close">
                    <Icon type="ios-arrow-forward" />
                </div> -->
                <span>悦翔展厅：择样单</span><span style="margin-left:10px">本次代号： 107362</span>
                <Table :columns="columns2" :data="data2" ></Table>
            </Drawer>
        </template>
    </div>
</template>
<script>
export default {
    name:'Order',
    data(){
        return {
            formValidate:{
                number:'',
                code:''    
            },
            ruleValidate:{

            },
            samplingStatus: true,  //采样状态
            tab_select: 'order',
            columns1: [
                {
                    title: '品名',
                    key: 'name',
                    render: (h, params) => {
                        return h('div', [
                        h('span', {
                            style: {
                                display: 'inline-block',
                                width: '100%',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                color:'#2684D1',
                                marginTop: '4px'
                            },
                            domProps: {
                                title: params.row.name
                            }
                        }, params.row.name)
                        ])
                    },
                    width: 107
                },
                {
                    title: '货号',
                    key: 'age',
                    width: 90
                },
                {
                    title: '报价',
                    key: 'address',
                    render: (h, params) => {
                        return h('div', [
                        h('span', {
                            style: {
                                // display: 'inline-block',
                                // width: '100%',
                                // overflow: 'hidden',
                                // textOverflow: 'ellipsis',
                                // whiteSpace: 'nowrap',
                                color:'#EC1B1B',
                                marginTop: '4px'
                            },
                            domProps: {
                                title: params.row.address
                            }
                        }, '￥'+params.row.address)
                        ])
                    },
                }
            ],
            data1: [
                {
                    name: 'John Brown',
                    age: 18,
                    address: '199.00',
                    date: '199.00'
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: '199.00',
                    date: '199.00'
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: '199.00',
                    date: '199.00'
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: '199.00',
                    date: '199.00'
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: '199.00',
                    date: '199.00'
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: '199.00',
                    date: '199.00'
                },{
                    name: 'Jon Snow',
                    age: 26,
                    address: '199.00',
                    date: '199.00'
                },{
                    name: 'Jon Snow',
                    age: 26,
                    address: '199.00',
                    date: '199.00'
                },{
                    name: 'Jon Snow',
                    age: 26,
                    address: '199.00',
                    date: '199.00'
                },{
                    name: 'Jon Snow',
                    age: 26,
                    address: '199.00',
                    date: '199.00'
                },{
                    name: 'Jon Snow',
                    age: 26,
                    address: '199.00',
                    date: '199.00'
                }
            ],
            loading:false,
            chartHistory:[
                 {id:1,name:'Jack',content:'helloe111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111!',date:'19:25',isMy:false},
                {id:1,name:'Jack',content:'helloe!',date:'19:26',isMy:false},
                {id:1,name:'Jack',content:'helloe!',date:'19:27',isMy:false},
                {id:1,name:'Tom',content:'fdsad!',date:'19:28',isMy:false},
                {id:1,name:'Bob',content:'hedsfdsflloe!',date:'19:29',isMy:false},
                {id:1,name:'Jim',content:'hel12313loe!',date:'19:30',isMy:false},
                {id:2,name:'我',content:'HI！',date:'19:31',isMy:true},
            ],
            id:2,
            chartValue:'',
            nowProduct:'1111111111',
            test: require("@assets/bg/test.jpg"),
            isProductList:false,
            columns2: [
                {
                    title: '品名',
                    key: 'name',
                    render: (h, params) => {
                        return h('div', [
                        h('span', {
                            style: {
                                display: 'inline-block',
                                width: '100%',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                color:'#2684D1',
                                marginTop: '4px'
                            },
                            domProps: {
                                title: params.row.name
                            }
                        }, params.row.name)
                        ])
                    },
                    width: 900
                },
                {
                    title: '货号',
                    key: 'age',
                    width: 80
                },
                {
                    title: '报价',
                    key: 'address',
                    render: (h, params) => {
                        return h('div', [
                        h('span', {
                            style: {
                                // display: 'inline-block',
                                // width: '100%',
                                // overflow: 'hidden',
                                // textOverflow: 'ellipsis',
                                // whiteSpace: 'nowrap',
                                color:'#EC1B1B',
                                marginTop: '4px'
                            },
                            domProps: {
                                title: params.row.address
                            }
                        }, '￥'+params.row.address)
                        ])
                    },
                },
                {
                    title: '数量',
                    key: 'age',
                    width: 80    
                }
            ],
            data2: [
                {
                    name: 'John Brown',
                    age: 18,
                    address: '199.00',
                    date: '199.00'
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: '199.00',
                    date: '199.00'
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: '199.00',
                    date: '199.00'
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: '199.00',
                    date: '199.00'
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: '199.00',
                    date: '199.00'
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: '199.00',
                    date: '199.00'
                },{
                    name: 'Jon Snow',
                    age: 26,
                    address: '199.00',
                    date: '199.00'
                },{
                    name: 'Jon Snow',
                    age: 26,
                    address: '199.00',
                    date: '199.00'
                },{
                    name: 'Jon Snow',
                    age: 26,
                    address: '199.00',
                    date: '199.00'
                },{
                    name: 'Jon Snow',
                    age: 26,
                    address: '199.00',
                    date: '199.00'
                },{
                    name: 'Jon Snow',
                    age: 26,
                    address: '199.00',
                    date: '199.00'
                }
            ],
        }
    },
    methods: {
        save(){
            this.samplingStatus = true;
        },
        changTabType(value){
            this.tab_select = value;
        },
        send(){
            this.chartHistory.push({
                id:2,
                name:'我',
                content: this.chartValue,
                date: new Date(),
                isMy: true
            });
            this.chartValue = "";
            debugger
            this.scrollToBottom();
        },
        scrollToBottom () {
            var me = this;
            this.$nextTick(() => {
                debugger
                // 当滚动条从没有到有时，不加setTimeout滚动条将不会滚动到底部
                setTimeout(() => {
                    let overflowY = document.getElementById("content_box");
                    if (!overflowY) {
                        return
                    }
                    overflowY.scrollTop = overflowY.scrollHeight
                }, 500)
            })
        },
        changType(){
            this.samplingStatus = false;
            this.tab_select = "order";
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
        .content{
            padding: 10px;
        }
        .addSampling_tab {
            .head {
                display: flex;
                .active {
                    background: url('~@assets/images/tab_active.webp');
                    background-size: cover;//注意：一定要把这个属性配合fixed使用；
                    background-repeat: no-repeat;
                    height: 35px;
                    margin-top: 10px;
                    width: 97px;
                    color: #2684D1;
                    .active_text {                    
                        margin-left: 20px;
                        line-height: 35px;
                    }
                }
                .title {
                    margin-top: 10px;
                    margin-left: 10px;
                    line-height: 35px;
                }
                .right {
                    margin-left: auto;
                    margin-right: 10px;
                } 
            }    
        }
        .chart {
            height: 380px;
            .head {
                height: 40px;
                display: flex;
                line-height: 40px;
                .title {
                    margin-top: 2.5px;
                    margin-left: 10px;
                    line-height: 35px;
                } 
            }
            .content_box{
                height: 254px;
                overflow-y: scroll;
                position: relative;
                border-bottom:1px solid #E4E4E4;
                /deep/ .ivu-list-item {
                    flex-wrap: wrap;
                    padding: 6px 0 6px 0;
                }
                .userInfo{
                    width: 291px;
                    display: flex;
                    flex: 0 0 291px;
                    .avatar{
                        margin-left: 10px;
                        color: #2684D1;
                    }
                    .name{
                        margin-left: 10px;
                        color: #333333;
                    }
                    .date{
                        margin-left: 10px;
                        color: #999999;
                        font-size: 12px;
                        // line-height: 12px;
                    }
                }
                .my{
                    width: 291px;
                    display: flex;
                    flex: 0 0 291px;
                    flex-direction: row-reverse;
                    .avatar{
                        margin-right: 10px;
                        color: #2684D1;
                    }
                    .name{
                        margin-right: 10px;
                        color: #333333;
                    }
                    .date{
                        margin-right: 10px;
                        color: #999999;
                        font-size: 12px;
                        // line-height: 12px;
                    }
                }
                .content_text{
                    margin-left: 10px;
                    color: #666666;
                    .content_text_box{
                        height: auto;
                        border-radius: 5px;
                        background: #F5F7FA;
                        .content_text_box_text{
                            word-break: break-all;
                            padding: 5px;
                            white-space: normal;
                        }
                    }
                }
                .content_text_my{
                    margin-right: 10px;
                    color: #2684D1;
                    margin-left: auto;
                    .content_text_box{
                        height: auto;
                        border-radius: 5px;
                        background: #DBEEFF;
                        .content_text_box_text{
                            word-break: break-all;
                            padding: 5px;
                            white-space: normal;
                        }
                    }
                }
            }
            .input_wrap {
                height: 43px;
                width: 100%;
                .input_box{
                    width: 250px;    
                    line-height: 43px;    
                    padding-right: 20px;
                }
            }
        }
        .select_order{
            height: 422px;
            .select_order_info {
                margin: 16px 0 16px 16px;
                width: 295px;
                height: 66px;
                .order_list {
                    background: url('~@assets/images/order_list.webp');
                    background-size: cover;//注意：一定要把这个属性配合fixed使用；
                    background-repeat: no-repeat; 
                    height: 32px;
                    width: 32px;
                    margin-top: -10px;
                    margin-left: 20px;
                }
            }
        }
        .now_product{
            height: 422px;  
            .ipput_wrap {
                padding: 10px 10px;
                .text {
                    line-height: 32px;
                }
            }
            .product_wrap{
                height: 65px;
                .product_wrap_text{
                    span{
                        color: #272727;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        // word-break: break-all;
                        height: 42px;
                        // text-overflow: -o-ellipsis-lastline;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                    }
                }    
            }
            .now_item_box{
                .now_item{
                    padding: 5px 0 0 10px;
                    display: flex;
                }    
            }
            .action{
                margin-top: 10px;
            }
        }
        .select_order /deep/ .ivu-table td {
            height: 38px;
        }
        .select_order /deep/ .ivu-table th {
            background-color: #fff;
            color: #666666;
        }
    }
    .red{
        color: #EC1B1B;
    }
    .blue{
        color: #2684D1;
    }
</style>