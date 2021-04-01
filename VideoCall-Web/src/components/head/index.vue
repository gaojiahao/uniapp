<!--
 * @Description: 
 * @Author: gaojiahao
 * @Date: 2021-04-01 14:55:25
 * @FilePath: \projectd:\LittleBearPC\VideoCall-Web\src\components\head\index.vue
 * @LastEditTime: 2021-04-01 18:17:58
 * @LastEditors: sueRimn
 * @Descripttion: 
 * @version: 1.0.0
-->
<template>
    <div class="head">
        <Row>
            <Col span="8">
                <div class="left_title">
                    <div class="logo">
                        <img :src="logUrl" />
                    </div>
                    <div class="title">
                        <div class="title_cn">
                            宏升视频会议
                        </div>
                        <div class="text">
                            HS VIDEO CONFERENCE
                        </div>
                    </div>
                </div>
            </Col>
            <Col span="8">
                <div class="center_title">
                    <div class="title">
                        <div class="title_cn">
                            小竹熊云科技公司
                            <Icon type="ios-paper-plane" />
                        </div>
                        <div class="text">
                            ID:111111111
                        </div>
                    </div>    
                </div>
            </Col>
            <Col span="8">
                <div class="right_title">
                    <div class="title">
                        <div class="text">
                            <Icon type="ios-call" />技术支持：0754-89671122
                        </div>
                    </div>    
                </div>
            </Col>
        </Row>
    </div>
</template>
<script>
export default {
  name: "Heads",
  components: {
      
  },
  data() {
    return {
      logUrl: require("@assets/default/logo.png"),  
    };
  },
  methods: {

  },
};
</script>
<style lang="less" scoped>
.head{
    height: 64px;
    .left_title{
        display: flex;
        height: 64px;
        .logo{
            img{
                margin-top: 10px;
                width: 30px;
            }
        }
        .title{
            color: #666666;
            margin-top: 8px;
            .title_cn{
                color: #2684D1;
                font-size: 22px;
                text-align: center;
                font-weight: 600;
            }
            .text{
                text-align: center;
                color: #2684D1;  
            }
        }
    }
    .center_title{
        height: 64px;
        .title{
            color: #666666;
            margin-top: 8px;
            .title_cn{
                color: #2684D1;
                font-size: 22px;
                text-align: center;
                font-weight: 600;
            }
            .text{
                text-align: center;    
            }
        }
    }
    .right_title{
        height: 64px;
        line-height: 64px;
        .title{
            color: #666666;
            .title_cn{
                color: #2684D1;
                font-size: 22px;
                text-align: center;
                font-weight: 600;
            }
            .text{
                text-align: right;;    
            }
        }
    }
}
</style>