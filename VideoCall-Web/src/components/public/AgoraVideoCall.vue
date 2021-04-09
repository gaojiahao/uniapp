<template>
  <div id="ag-canvas">
  </div>
</template>

<script>
import { merge } from "lodash";
import AgoraRTC from "@assets/js/Rtc.js";

export default {
  data() {
    return {
      client: {},
      localStream: {},
      shareClient: {},
      shareStream: {},
      displayMode: "pip",
      streamList: [],
      readyState: false,
      localAudioTrack:null,
      localVideoTrack:null,
      token:null,
      uid:null
    };
  },

  props: [
    "transcode",
    "attendeeMode",
    "videoProfile",
    "channel",
    "baseMode",
    "appId",
  ],

  methods: {
    async initRtc(){
      let $ = this;
      $.client.on("user-published", async (user, mediaType) => {
        // 开始订阅远端用户。
        await $.client.subscribe(user, mediaType);
        console.log("subscribe success12");
        debugger
        // 表示本次订阅的是视频。
        if (mediaType === "video") {
          // 订阅完成后，从 `user` 中获取远端视频轨道对象。
          const remoteVideoTrack = user.videoTrack;
          // 动态插入一个 DIV 节点作为播放远端视频轨道的容器。
          const playerContainer = document.createElement("div");
          // 给这个 DIV 节点指定一个 ID，这里指定的是远端用户的 UID。
          playerContainer.id = user.uid.toString();
          playerContainer.style.width = "640px";
          playerContainer.style.height = "480px";
          document.body.append(playerContainer);

          // 订阅完成，播放远端音视频。
          // 传入 DIV 节点，让 SDK 在这个节点下创建相应的播放器播放远端视频。
          remoteVideoTrack.play(playerContainer);

          // 也可以只传入该 DIV 节点的 ID。
          // remoteVideoTrack.play(playerContainer.id);
        }

        // 表示本次订阅的是音频。
        if (mediaType === "audio") {
          // 订阅完成后，从 `user` 中获取远端音频轨道对象。
          const remoteAudioTrack = user.audioTrack;
          // 播放音频因为不会有画面，不需要提供 DOM 元素的信息。
          remoteAudioTrack.play();
        }
      });
      $.client.on("user-unpublished", (user, mediaType) => {
        if (mediaType === "video") {
          // 获取刚刚动态创建的 DIV 节点。
          const playerContainer = document.getElementById(user.uid.toString());
          // 销毁这个节点。
          playerContainer.remove();
        }
      });
      $.uid = await $.client.join($.appId, $.channel, $.token, null);
      $.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      // 通过摄像头采集的视频创建本地视频轨道对象。
      $.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
      // 将这些音视频轨道对象发布到频道中。
      await $.client.publish([$.localAudioTrack, $.localVideoTrack]);
    }
  },

  created() {
    let $ = this;
    $.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    this.initRtc();
  },

  mounted() {

  },

  beforeUpdate() {
    
  },

  beforeDestroy () {
    
  }
};
</script>

<style>
#ag-canvas {
  height: 100%;
  display: grid;
  grid-gap: 10px;
  align-items: center;
  justify-items: center;
  grid-template-rows: repeat(12, auto);
  grid-template-columns: repeat(24, auto);
}

.ag-item :first-child {
  border-radius: 6px;
}
.ag-item {
  border-radius: 6px;
  border: 2px #00b6ed solid;
  background: url("~@assets/images/avatar.png") center no-repeat;
  height: 100%;
  width: 100%;
}

#ag-resize-container {
  background-image: none !important;
  background-color: black;
  display: flex;
  justify-content: center;
  height: center;
}

#ag-resize-container .ag-item {
  border: none !important;
}

/* button group */
.ag-btn-group {
  height: 70px;
  width: calc(100% - 60px);
  margin: 0 auto;
  position: absolute;
  bottom: 0;
  background: transparent;
  z-index: 11;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.ag-btn-group:hover,
.ag-btn-group.active {
  background: rgba(18, 74, 99, 0.8);
}

.ag-btn {
  z-index: 12;
  opacity: 0;
  color: white;
  /* width: 35px;
    height: 35px; */
  cursor: pointer;
  font-size: 60px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
.ag-btn:hover {
  color: #00b6ed;
}

.ag-btn.disabled,
.ag-btn.disabled:hover {
  color: #637c8e;
  cursor: not-allowed;
}

.ag-btn-group:hover .ag-btn,
.ag-btn-group.active .ag-btn {
  opacity: 1;
}
.ag-btn.off.videoControlBtn .ag-icon-camera {
  display: none;
}
.ag-btn.videoControlBtn .ag-icon-camera-off {
  display: none;
}
.ag-btn.videoControlBtn .ag-icon-camera {
  display: inline-block;
}
.ag-btn.off.videoControlBtn .ag-icon-camera-off {
  display: inline-block;
}
.ag-btn.off.audioControlBtn .ag-icon-mic {
  display: none;
}
.ag-btn.audioControlBtn .ag-icon-mic-off {
  display: none;
}
.ag-btn.audioControlBtn .ag-icon-mic {
  display: inline-block;
}
.ag-btn.off.audioControlBtn .ag-icon-mic-off {
  display: inline-block;
}

video {
  max-width: unset !important;
}
</style>

