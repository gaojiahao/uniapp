<!--
 * @Description: 
 * @Author: gaojiahao
 * @Date: 2021-04-01 15:46:17
 * @FilePath: \projectd:\LittleBearPC\VideoCall-Web\src\views\user\userList.vue
 * @LastEditTime: 2021-04-02 15:12:50
 * @LastEditors: sueRimn
 * @Descripttion: 
 * @version: 1.0.0
-->
<template>
    <div class="userList">
        <List footer="" :border="false" :loading="loading">
            <ListItem style="background: #2684D1;">
                <div class="act avatar">
                    <i class="iconfont iconrenqun1 act_text"></i>
                </div>
                <div class="act_name">
                    与会人
                </div>
                <div class="act_action">
                   <Icon type="ios-arrow-back" @click="collapsedSider" />
                </div>  
            </ListItem>
            <ListItem v-for="(item,index) in userlist" :key="index">
                <div class="avatar">
                    <i class="iconfont iconren1 person text"></i>
                </div>
                <div class="name">
                    {{item.name}}
                </div>
                <div class="action">
                    <i class="iconfont icon21maikefeng outline text"></i>
                    <i class="iconfont iconshexiangtou eye text"></i>
                    <i class="iconfont iconzu1306 text"></i>
                </div>
            </ListItem>
        </List>
    </div>
</template>
<script>
export default {
    name:"userList",
    data() {
        return {
            loading: false,
            userlist:[
                {id:1,name:'张三'},
                {id:2,name:'张1'},
                {id:3,name:'张2'},
                {id:4,name:'张3'},
                {id:5,name:'张4'},
                {id:6,name:'张5'},
                {id:7,name:'张6'},
                {id:8,name:'张7'}
            ]
        };
    },
    methods: {
        collapsedSider() {
            this.$emit("collapsed-sider");
        },
    },
}
</script>
<style lang="less" scoped>
    .userList{
        /deep/ .ivu-list-split .ivu-list-item:last-child {
            border-bottom: 1px solid #e8eaec;
        }
        .text{
            font-size: 16px;
        }
        .act{
            flex: 0 0 20px;
            margin-left: 10px;
            .act_text{
                color: #fff;
            }  
        }
        .act_name{
            color: #fff;
            margin-left: 10px;
        }
        .act_action{
            margin-left: 120px;
            color:#fff;   
        }
        .avatar{
            flex: 0 0 20px;
            margin-left: 10px;
            .person{
                color: #2684D1;
            }
        }
        .name{
            margin-left: 10px;    
        }
        .action{
            margin-left: auto;
            .outline{
                color:#40C949;
            }
            .eye{
                color: #999999;
            }
        }
    }
</style>