<!--
 * @Description: 
 * @Author: gaojiahao
 * @Date: 2021-04-01 16:54:22
 * @FilePath: \projectd:\LittleBearPC\VideoCall-Web\src\views\video\index.vue
 * @LastEditTime: 2021-04-05 11:37:12
 * @LastEditors: sueRimn
 * @Descripttion: 
 * @version: 1.0.0
-->
<template>
    <div class="video">
        <div class="error" v-if="error">
            <img :src="cameraPic">
            <p class="text">您的设备未检测到摄像头</p> 
        </div>
        <div class="box" v-else>
            <div class="bg" v-if="isSelect">
                <img :src="test" style="width:100%;height:803px;">       
            </div>
            <div class="bg" v-else>
                <img :src="test" style="width:100%;height:803px;">
            </div>
            <div class="userlist">
                <div class="user active" @click="selectAll()"></div>
                <div class="user"></div>
                <div class="user"></div>
                <div class="user"></div>
            </div>
        </div>
    </div> 
</template>
<script>
import videoJs from "@mixins/video.js";
export default {
    name:'Video',
    mixins:[videoJs],
    data() {
        return {
            cameraPic: require("@assets/images/camera-lg.png"),
            test: require("@assets/bg/test.jpg"),
            isSelect: true
        };
    },
    methods: {
        selectAll(){
            this.isSelect = this.isSelect ? false:true;
        }
    },
    created() {

    }
}
</script>
<style lang="less" scoped>
    .video{
        width:100%;
        height: 803px;
        position: relative;
        overflow-y: hidden;
        .error {
            position: absolute;
            top: 50%;
            left: 50%;
            margin: auto;
            margin-left: -78px;
            margin-top: -73.5px;
            width: 156px;
            height: 147px;
            .text {
                color:#fff;
                text-align: center;
            }
        }
        .box {
            position: relative;
            .userlist {
                width: 100%;
                height: 66px;
                position: absolute;
                bottom: 16px;
                display: flex;
                flex-wrap: nowrap;
                justify-content: center;
                .user {
                    width: 99px;
                    height: 66px;
                    background: #fff;
                    margin-left: 10px;
                }
                .active {
                    background: blue;    
                }
            }
        }
    }
</style>