<template>
  <div id="ag-canvas">
    <!-- <div id="video_list_shrinkage" class="userlist" v-for="">
      <div class="user" @click="selectAll(true)"><div class="active"></div></div>
    </div> -->
  </div>
</template>

<script>
import * as Cookies from "js-cookie";
import { merge } from "lodash";
import {
  CloseMeetingRoom,
  JoinMeetingRoom,
  QuitMeetingRoom,
} from "@service/meetingService";

export default {
  data() {
    return {
      config:{},
      code:'',
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
      userId:null,
      audioDevices:[],
      videoDevices:[],
      uList:{}
    };
  },

  props: [
    "transcode",
    "attendeeMode",
    "videoProfile",
    "channel",
    "baseMode",
    "appId",
    "uid",
    "videoId",
    "userlist",
    "isAdmin"
  ],

  methods: {
    //发布频道与加入
    async join() {
      // debugger
      var $=this;
      AgoraRTC.setLogLevel(4);  //日志级别0,1,2,3,4
      $.client.enableDualStream().then(() => {
        console.log("Enable Dual stream success!");
      }).catch(err => {
        console.log(err);
      });
      // this.client.setRemoteVideoStreamType();
      $.client.on("user-published", this.handleUserPublished);
      $.client.on("user-unpublished", this.handleUserUnpublished);
      $.client.on("connection-state-change",(cur,rev,reason)=>{
        console.log('链接状态',cur);
      });
      $.client.on("user-joined",(user)=>{
        console.log('用户加入了',user);
        this.$parent.$parent.$parent.$parent.$parent.getQueryMeetingRoomMembers();
      });
      $.client.on("user-left",(user)=>{
        console.log('用户离开了',user);
        this.$parent.$parent.$parent.$parent.$parent.getQueryMeetingRoomMembers();
      });
      [ $.userId, $.localAudioTrack, $.localVideoTrack ] = await Promise.all([
        $.client.join($.appId, $.channel, $.token || null,$.uid),
        AgoraRTC.createMicrophoneAudioTrack(),
        AgoraRTC.createCameraVideoTrack(
          {encoderConfig: "120_1",cameraId:$.videoId}   //只有谷歌支持最低的，别的浏览器最低480p
        )
      ]);
      //主持人的大画面
      if($.isAdmin=='true'){
        $.localVideoTrack.play("ag-canvas");
      } else {
        const playerContainer = document.createElement("div");
        // 给这个 DIV 节点指定一个 ID，这里指定的是远端用户的 UID。下面缩略图画面
        playerContainer.id = $.uid;
        playerContainer.className = "user";
        playerContainer.style.width = "99px";
        playerContainer.style.height = "66px";
        playerContainer.style.marginLeft = "5px";
        playerContainer.style.marginRight = "5px";
        playerContainer.style.border = "1px solid #FFFFFF";
        // playerContainer.onclick = function () { $.copyNodeVide(playerContainer.id) };
        document.getElementById("video_list_shrinkage").appendChild(playerContainer);
        $.localVideoTrack.play(playerContainer);
      }
      await $.client.publish([this.localAudioTrack, this.localVideoTrack]);
      console.log("publish success");
      //初始化摄像头和麦克风
      // await $.localVideoTrack.setEnabled(window.sessionStorage.getItem("isCar")=='true'?true:false);
      // await $.localAudioTrack.setEnabled(window.sessionStorage.getItem("isMic")=='true'?true:false);
      this.testNetWork();
    },
    async leave(){
      this.$FromLoading.show();
      await QuitMeetingRoom({roomNumber:this.channel,meetingRoomMemberId:this.uid}).then(res => {
        if (res.success) {
          this.$Message.info({
            background: true,
            content: res.message
          });
          this.leaveMeetingRoom();
        } else {
          this.$Message.error({
            background: true,
            content: res.result.msg
          });
          this.$FromLoading.hide();
        }
      }); 
    },
    //离开频道
    async leaveMeetingRoom() {
      await this.client.leave();
      this.$router.push('/login');
    },
    //订阅远端用户
    async subscribe(user, mediaType) {
      // debugger
      var $ = this;
      const uid = user.uid;
      // subscribe to a remote user
      await this.client.subscribe(user, mediaType);
      console.log("subscribe success");
      if (mediaType === 'video') {
        const remoteVideoTrack = user.videoTrack;
        // 动态插入一个 DIV 节点作为播放远端视频轨道的容器。
        for(var i=0;i<$.userlist.length;i++){
          if(uid==$.userlist[i]['id']){
            if($.userlist[i]['isMaster']){
              remoteVideoTrack.play("ag-canvas");  
            } else {
              const playerContainer = document.createElement("div");
              // 给这个 DIV 节点指定一个 ID，这里指定的是远端用户的 UID。下面缩略图画面
              playerContainer.id = user.uid.toString();
              playerContainer.className = "user";
              playerContainer.style.width = "99px";
              playerContainer.style.height = "66px";
              playerContainer.style.marginLeft = "5px";
              playerContainer.style.marginRight = "5px";
              playerContainer.style.border = "1px solid #FFFFFF";
              document.getElementById("video_list_shrinkage").appendChild(playerContainer);
              // 订阅完成，播放远端音视频。
              // 传入 DIV 节点，让 SDK 在这个节点下创建相应的播放器播放远端视频。
              remoteVideoTrack.play(playerContainer);
            }
          }  
        }
      }
      if (mediaType === 'audio') {
        user.audioTrack.play();
      }
    },
    //用户发布订阅
    handleUserPublished(user, mediaType) {
      // debugger
      const id = user.uid;
      // remoteUsers[id] = user;
      this.subscribe(user, mediaType);
      this.uList[id] = {
        user:user,
        mediaType:mediaType
      }
      // this.$parent.$parent.$parent.$parent.$parent.getQueryMeetingRoomMembers();
    },
    //用户取消发布订阅
    handleUserUnpublished(user,mediaType) {
      if (mediaType === "video") {
        // 获取刚刚动态创建的 DIV 节点。
        const playerContainer = document.getElementById(user.uid.toString());
        // 销毁这个节点。
        playerContainer.remove();
        // this.$parent.$parent.$parent.$parent.$parent.getQueryMeetingRoomMembers();
      }
    },
    //结束会议
    async endMeeting(){
      this.$FromLoading.show();
      await CloseMeetingRoom({roomNumber:this.channel,code:this.code}).then(res => {
        if (res.success) {
          this.$FromLoading.hide();
          this.$Message.info({
            background: true,
            content: res.message
          });
          this.closeMeeting();
        } else {
          this.$Message.error({
            background: true,
            content: res.result.msg
          });
          this.$FromLoading.hide();
        }
      }); 
    },
    async closeMeeting(){
      await this.client.unpublish([this.localAudioTrack, this.localVideoTrack]);
      this.$router.push('/login');
    },
    //通话质量检测
    async testNetWork(){
      var $=this;
      $.client.on("network-quality", (quality) => {
        //console.log("上行网络质量：", quality.uplinkNetworkQuality);
      });

      // 获取下行网络质量
      $.client.on("network-quality", (quality) => {
        //console.log("下行网络质量：", quality.downlinkNetworkQuality);
      });

      // 获取上行统计数据
      var uplinkVideoStats = $.client.getLocalVideoStats();
      // 获取下行统计数据
      var downlinkVideoStats =  $.client.getRemoteVideoStats();

      // console.log("uplink video stats", uplinkVideoStats);
      // console.log("downlink video stats", downlinkVideoStats);
    },
    //通话前设备检测
    testDevices(){
      AgoraRTC.getDevices()
        .then(devices => {
          for(var i in devices){
            if(devices[i]['kind']=='audioinput'){
              this.audioDevices.push({
                deviceId:devices[i]['deviceId'],
                groupId:devices[i]['groupId'],
                kind:devices[i]['kind'],
                label:devices[i]['label'],
              });
            }
            if(devices[i]['kind']=='videoinput'){
              this.videoDevices.push({
                deviceId:devices[i]['deviceId'],
                groupId:devices[i]['groupId'],
                kind:devices[i]['kind'],
                label:devices[i]['label'],
              });
            }
          }
          // var selectedMicrophoneId = this.audioDevices[0].deviceId;
          // var selectedCameraId = this.videoDevices[0].deviceId;
          // return Promise.all([
          //   AgoraRTC.createCameraVideoTrack({ cameraId: selectedCameraId }),
          //   AgoraRTC.createMicrophoneAudioTrack({ microphoneId: selectedMicrophoneId }),
          // ]);}).then(res=>{
          //   res[0].play('ag-canvas');
          //   setInterval(() => {
          //     const level = res[1].getVolumeLevel();
          //     console.log("本地音频级别：", level);
          //   }, 1000);
        });
    },
    getDevices(){

    },
    //切换设备
    changeDevices(videoId,audioId){
      if(videoId){
        this.localVideoTrack.setDevice(videoId).then(() => {
          console.log("set device success");
        }).catch(e => {
          console.log("set device error", e);
        });
      }
      if(audioId){
        this.localAudioTrack.setDevice(videoId).then(() => {
          console.log("set device success");
        }).catch(e => {
          console.log("set device error", e);
        });
      }
    },
    //调整麦克风音量
    setVolum(value){
      this.localAudioTrack.setVolume(value);
    },
    //开启/关闭摄像头
    async setEnabledCamera(value){
      await this.localVideoTrack.setEnabled(value);
    },
    //开启/关闭麦克风
    async setEnabledAudio(value){
      await this.localAudioTrack.setEnabled(value);
    },
    //初始化
    async init(){
      let $ = this;
      $.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
      //摄像头插入变化
      AgoraRTC.onCameraChanged = (info) => {
        console.log("camera changed!", info.state, info.device);
      };
      //音频插入变化
      AgoraRTC.onMicrophoneChanged = (info) => {
        console.log("microphone changed!", info.state, info.device);
      };
      AgoraRTC.enableLogUpload();
      await this.testDevices();
      // await this.join();
    }
  },
  created() {
    this.init();
    this.config = JSON.parse(window.sessionStorage.getItem("SPHY_LOGIN_TOKEN"));
    this.code = window.localStorage.getItem("mac");
  },

  mounted() {

  },

  beforeUpdate() {
    
  },

  beforeDestroy () {
    
  }
};
</script>

<style lang="less" scoped>
#ag-canvas {
  height: 100%;
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
        background: #dcdee2;
        margin-left: 5px;
        margin-right: 5px;
        border: 1px solid #FFFFFF;
    }
    .active {
        background: url('~@assets/images/suo.webp');
        background-repeat: no-repeat;
        width: 97px;
        height: 64px;
    }
}
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

