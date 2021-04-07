<!--
 * @Description: 
 * @Author: gaojiahao
 * @Date: 2021-04-01 19:15:58
 * @FilePath: \projectd:\LittleBearPC\VideoCall-Web\src\components\footer\index.vue
 * @LastEditTime: 2021-04-07 19:34:19
 * @LastEditors: sueRimn
 * @Descripttion: 
 * @version: 1.0.0
-->
<template>
    <div class="footer">
        <Row>
            <Col span="8">
            </Col>
            <Col span="8">
                <div class="action">
                    <div class="timer item">
                        <span class="red-point"></span>
                        <div class="time-card" data-type="hours" data-max="24">
                            <div class="time-card-count">{{myHours}}</div>
                        </div>
                        <span class="colon">:</span>
                        <div class="time-card" data-type="minutes" data-max="60">
                            <div class="time-card-count">{{myMinutes}}</div>
                        </div>
                        <span class="colon">:</span>
                        <div class="time-card" data-type="seconds" data-max="60">
                            <div class="time-card-count">{{mySeconds}}</div>
                        </div>
                    </div>
                    <Divider type="vertical" />
                    <div class="timer item">
                        <i class="iconfont icon21maikefeng icon" :class="[isMic ? 'outline':'eye']" @click="setMic()"></i>
                        <span class="time-card-count text">音频</span>
                    </div>
                    <Divider type="vertical" />
                    <div class="timer item">
                        <i class="iconfont iconshexiangtou icon" :class="[isCar ? 'outline':'eye']" @click="setCar()"></i>
                        <span class="time-card-count text">视频</span>
                    </div>
                    <Divider type="vertical" />
                    <div class="timer item">
                        <div class="closeOff"></div>
                    </div>
                </div>
            </Col>
            <Col span="8">
                <div class="settings">
                    <div class="timer item">
                        <i class="iconfont iconshezhi icon" @click="showModalDetail(true)"></i>
                    </div>
                    <div class="timer item">
                        <i class="iconfont icontianxiexiangqing icon"></i>
                    </div>
                    <div class="timer item">
                        <div class="netWork"></div>
                    </div>
                </div>
            </Col>
        </Row>
        <Setting @show-modal-detail="showModalDetail" :showModal="showModal"></Setting>
    </div>
</template>
<script>
import Setting from "@components/footer/setting";

export default {
    name:'Footer',
    components:{
        Setting
    },
    data() {
        return {
            currentTime:0,
            timeObj: null, // 时间对象,下方会用到
            myHours: '00', // 我定义来接收计算出来的 小时 的
            myMinutes: '00', // 我定义来接收计算出来的 分钟 的
            mySeconds: '00',// 我定义来接收计算出来的 秒钟 的
            showModal:false,
            isMic:true,
            isCar:true,
        }
    },
    methods: {
        testTimer(){
            console.log("sdf");
            this.timeFunction();
            setInterval(() => {
            this.timeFunction();
            }, 1000)
        },
        timeFunction(){
            // 开始执行倒计时
            this.timeObj = { // 时间对象
            seconds: Math.floor(this.currentTime % 60),
            minutes: Math.floor(this.currentTime / 60) % 60,
            hours: Math.floor(this.currentTime / 60 / 60) % 24
            }
            // 计算出时分秒
            this.myHours = this.timeObj.hours<10?'0'+this.timeObj.hours:this.timeObj.hours;
            this.myMinutes = this.timeObj.minutes<10?'0'+this.timeObj.minutes:this.timeObj.minutes;
            this.mySeconds = this.timeObj.seconds<10?'0'+this.timeObj.seconds:this.timeObj.seconds;
            this.currentTime++;
        },
        showModalDetail(value){
            this.showModal = value;
        },
        setMic(){
            this.isMic = this.isMic ? false : true;
        },
        setCar(index){
            this.isCar = this.isCar ? false : true;
        },
    },
    created() {
        this.testTimer();
    },
}
</script>
<style lang="less" scoped>
.footer{
    height: 69px;
    .action {
        display: flex;
        .item{
            height:69px;
            width: 120px;
        }
    }
    .timer {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        // margin: 0 0 4em;
        color: #151414;
        .red-point{
          position: relative;
        }
        .red-point::before{
          content: " ";
          border: 3px solid red;/*设置红色*/
          border-radius:3px;/*设置圆角*/
          position: absolute;
          z-index: 1000;
          right: 0;
          margin-top: -3.5px;
        }
        .closeOff {
            background: url('~@assets/images/close.webp');
            background-repeat: no-repeat;
            width: 33px;
            height: 33px;
        }
    }
    .time-card {
        margin: 0 1em;
        text-align: center;
    }
    .time-card-count {
        // font-weight: 600;
        // font-size: 70px;
        // width: 77px;
        // height: 77px;
        // line-height: 77px;
        overflow: hidden;
    }
    .text{
        margin-left: 10px;
    }
    .time-card-label {
        font-size: 0.625em;
        text-transform: uppercase;
        opacity: 0.7;
    }
    .colon {
        // font-size: 2em;
    }
    /deep/ .ivu-divider, /deep/ .ivu-divider-vertical {
        margin: 0 8px;
        display: inline-block;
        height: 69px;
        width: 1px;
        vertical-align: middle;
        position: relative;
        top: -.06em;
    }
    .outline{
        color:#40C949;
    }
    .eye{
        color: #999999;    
    }
    .close{
        color: #ed4014;
    }
    .icon{
        font-size: 24px;
    }
    .settings{
        display: flex;
        flex-direction: row-reverse;
        .item{
            height:69px;
            width: 35px;
            .netWork {
                background: url('~@assets/images/netWork4.webp');
                background-repeat: no-repeat;
                width: 18px;
                height: 19px;
            }
        }
        .icon{
            font-size: 16px;
            color: #666666;
        }
    }
}
</style>