/*
 * @Description: 
 * @Author: gaojiahao
 * @Date: 2021-04-02 15:18:13
 * @FilePath: \projectd:\LittleBearPC\VideoCall-Web\src\mixins\video.js
 * @LastEditTime: 2021-04-02 15:43:58
 * @LastEditors: sueRimn
 * @Descripttion: 
 * @version: 1.0.0
 */
// import RMT from "@/assets/js/signalROptions/signalROptions";
import AgoraRTC from "agora-rtc-sdk-ng"

export default {
    data() {
        return {
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
        async startBasicCall() {
            /**
             * 接下来的代码写在这里。
             */
             var rtc = {
                // 用来放置本地客户端。
                client: null,
                // 用来放置本地音视频频轨道对象。
                localAudioTrack: null,
                localVideoTrack: null,
            };
            var options = {
                // 替换成你自己项目的 App ID。
                appId: "5de91f02f12c41c2b276c9accb4679c7",
                // 传入目标频道名。
                channel: "demo_channel_name",
                // 如果你的项目开启了 App 证书进行 Token 鉴权，这里填写生成的 Token 值。
                token: null,
            };
            rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
            const uid = await rtc.client.join(options.appId, options.channel, options.token, null);
            rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
            rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
            await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);
            this.$Message.info("设备连接成功！");
        }
    },
    created() {
        const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
        //this.initRMT();
        this.startBasicCall();
    }
};