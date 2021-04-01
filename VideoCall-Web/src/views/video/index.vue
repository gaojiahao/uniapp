<!--
 * @Description: 
 * @Author: gaojiahao
 * @Date: 2021-04-01 16:54:22
 * @FilePath: \projectd:\LittleBearPC\VideoCall-Web\src\views\video\index.vue
 * @LastEditTime: 2021-04-01 17:54:42
 * @LastEditors: sueRimn
 * @Descripttion: 
 * @version: 1.0.0
-->
<template>
    <div class="video">
        <div class="error">
            <img :src="cameraPic">
            <p class="text">您的设备未检测到摄像头</p> 
        </div>
    </div> 
</template>
<script>
import RMT from "@/assets/js/signalROptions/signalROptions";
export default {
    name:'Video',
    data() {
        return {
            cameraPic: require("@assets/images/camera-lg.png"),
            rtc: null,
            error:false
        };
    },
    methods: {
        async initRMT() {
            this.rtc = new RMT({ groupNumber: "111" });
            this.rtc
                .startCall()
                .then(res => console.log(res))
                .catch(err => {
                    this.error = true;
                    switch (err.code) {
                        case "DEVICE_NOT_FOUND":
                            this.$Message.error("找不到设备");
                            break;
                    }
                });
        },
    },
    created() {
        this.initRMT();
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