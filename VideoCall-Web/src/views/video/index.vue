<!--
 * @Description: 
 * @Author: gaojiahao
 * @Date: 2021-04-01 16:54:22
 * @FilePath: \projectd:\LittleBearPC\VideoCall-Web\src\views\video\index.vue
 * @LastEditTime: 2021-04-02 15:25:27
 * @LastEditors: sueRimn
 * @Descripttion: 
 * @version: 1.0.0
-->
<template>
    <div class="video">
        <div class="error" v-if="!error">
            <img :src="cameraPic">
            <p class="text">您的设备未检测到摄像头</p> 
        </div>
        <div v-else>

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
        };
    },
    methods: {

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
    }
</style>