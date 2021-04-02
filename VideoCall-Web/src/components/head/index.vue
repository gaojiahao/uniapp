<!--
 * @Description: 
 * @Author: gaojiahao
 * @Date: 2021-04-01 14:55:25
 * @FilePath: \projectd:\LittleBearPC\VideoCall-Web\src\components\head\index.vue
 * @LastEditTime: 2021-04-02 14:50:59
 * @LastEditors: sueRimn
 * @Descripttion: 
 * @version: 1.0.0
-->
<template>
    <div class="head">
        <Row>
            <Col span="8">
                <div class="left_title">
                    <div class="title">
                        <img :src="titleUrl">
                    </div>
                </div>
            </Col>
            <Col span="8">
                <div class="center_title">
                    <div class="title">
                        <div class="title_cn">
                            小竹熊云科技公司
                            <i class="iconfont iconzhifeiji"></i>
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
                            <i class="iconfont iconqq"></i>客服002</span>
                        </div>
                        <div class="text">
                            <i class="iconfont iconqq"></i>客服001</span>
                        </div>
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
      titleUrl: require("@assets/images/title.webp"),
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
            img{
                height: 42px;
                width: 194px;
                margin-top: 11px;
                margin-left: -35px;
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
            display: flex;
            flex-direction: row-reverse;
            margin-right: -30px;
            .title_cn{
                color: #2684D1;
                font-size: 22px;
                text-align: center;
                font-weight: 600;
            }
            .text{
                text-align: right;
                margin-left: 10px;
            }
        }
    }
}
</style>