d<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-19 16:28:17
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-02 12:00:31
-->
<template>
  <div class="metting">
    <div class="wrapper">
        <div class="login_wrapper">
          <div class="head">
            <div class="logo">
              <img :src="logUrl" />
            </div>
            <div class="title">
              <div class="title_cn">
                宏升视频会议
              </div>
              <div>
                HS VIDEO CONFERENCE
              </div>
            </div>
          </div>
          <div class="login_box">
            <div class="type" v-model="type">
              <span class="active">进入会议</span>
            </div>
            <template>
              <Input class="account" prefix="ios-contact" v-model="userCode" placeholder="账户" />
              <form>
                <Input class="password" prefix="ios-key" v-model="passWord" type="password" password placeholder="密码6-10位" />
              </form>
              <div style="width: 100%;display: flex; margin-top: 20px;">
                <Input v-model="code" placeholder="验证码" style="width: 80px;margin-left: 100px;float: left;"/>
              </div>
              <div class="login_button">
                <Button type="primary" @click="metting">{{$t("metting.button")}}</Button>
              </div>
            </template>
          </div>
        </div>
    </div>
    <div class="footer">
      <div>技术支持：0754-89671122</div>
      <div>Copyright © 2021深圳宏升软件技术开发有限公司  粤ICP备13031421号-4</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "addMeeting",
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
.metting{
  .wrapper {
    width: 100%;
    color: #464c5b;
    background: #fff;
    background-image: url("~@assets/bg/bg.png");
    background-repeat:no-repeat;
    background-size: cover;
    background-position: center 0;
    height: 900px;
    .wrapper_dropdown{
      float: right;
      margin: 10px;
      a{
        color: #fff;
      }
    }
    .header{
      width: 100%;
      height: 70px;
      background: #fff;
      border-bottom: solid 1px #eee;
    }
    .container {
      width: 1170px;
      padding-right: 15px;
      padding-left: 15px;
      margin-right: auto;
      margin-left: auto;
      .title{
          font-size: 48px;
      }
    }
    .container {
      width: 1170px;
      padding-right: 15px;
      padding-left: 15px;
      margin-right: auto;
      margin-left: auto;
    }
    .login_wrapper{
      position: absolute;
      top: 20%;
      left: calc((100% - 400px ) / 2);
      .head{
        color:#2684D1;
        display: flex;
        width: 300px;
        margin-left: 50px;
        margin-bottom: 30px;
        .logo{
          img{
            width: 70px;
          }
        }
        .title{
          padding: 10px;
          .title_cn{
            font-size: 24px;
            text-align: center;
            font-weight: 600;
          }
        }
      }
      .login_box {
          border-radius: 10px;
          width: 400px;
          background: rgba(255,255,255,0.6);
          box-shadow: 2px 2px 5px rgb(104,104,104);
          text-align: center;
          .text {
              padding-top: 20px;
              color: #464c5b;
              font-size: 2rem;
          }

          .account {
              margin-top: 20px;
              width: 200px;
          }

          .password {
              margin-top: 20px;
              width: 200px;
          }

          .login_button {
              width: 200px;
              display: inline-block;
              position: relative;
              vertical-align: middle;
              line-height: normal;

              .ivu-btn-primary {
                  width: 200px;
                  margin-bottom: 20px;
                  margin-top: 20px;
              }
          }

          .type {
              margin-top: 20px;
              height: 32px;
              display: inline-block;
              width: 100%;
              position: relative;
              vertical-align: middle;
              line-height: normal;
              font-size: 16px;
              .active {
                  color: #57a3f3
              }
          }
      }
    }
  }
  .footer {
    position: relative;
    width: 100%;
    text-align: center;
    line-height: 24px;
    margin-top: -70px;
    height: 107px;
    padding: 14px 15px 0 15px;
    color:#fff;
    background: #2684D1;
    border-top: solid 1px #ddd;
    overflow: hidden;
  }
}
</style>
