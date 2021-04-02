<!--
 * @Description: 
 * @Author: gaojiahao
 * @Date: 2021-04-01 17:59:28
 * @FilePath: \projectd:\LittleBearPC\VideoCall-Web\src\views\order\index.vue
 * @LastEditTime: 2021-04-02 15:13:33
 * @LastEditors: sueRimn
 * @Descripttion: 
 * @version: 1.0.0
-->
<template>
    <div class="order">
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

            }
        }
    },
    methods: {
        save(){}
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
    }
</style>