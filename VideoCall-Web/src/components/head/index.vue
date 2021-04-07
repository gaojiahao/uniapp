<!--
 * @Description: 
 * @Author: gaojiahao
 * @Date: 2021-04-01 14:55:25
 * @FilePath: \projectd:\LittleBearPC\VideoCall-Web\src\components\head\index.vue
 * @LastEditTime: 2021-04-07 12:14:59
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
                            <div class="qq"></div><div class="qq_text">客服002</div>
                        </div>
                        <div class="text">
                            <div class="qq"></div><div class="qq_text">客服001</div>
                        </div>
                        <div class="text">
                            <div><Icon type="ios-call" /></div><div class="qq_text">技术支持：0754-89671122</div>
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
                display: flex;
                .qq {
                    background: url('~@assets/images/qq2.webp');
                    background-repeat: no-repeat;
                    margin-top: 24.5px;
                    width: 13px;
                    height: 16px;
                }
                .qq_text{
                    margin-left: 5px;
                }
            }
        }
    }
}
</style>