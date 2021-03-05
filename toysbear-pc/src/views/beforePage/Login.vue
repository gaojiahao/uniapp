<template>
  <div class="login">
    <div class="loginTitle">
      <h1>小竹熊致力于玩具行业高效服务</h1>
      <p>Xiaozhuxiong is committed to efficient service in toy industry</p>
    </div>
    <div class="loginbox">
      <loginForm />
    </div>
  </div>
</template>

<script>
import loginForm from '@/components/loginForm/loginForm.vue'
export default {
  components: {
    loginForm
  },
  data () {
    return {}
  },
  created () {
    if (this.$route.query.id === 'signOut') {
      this.$store.commit('removeLoginItems')
    }
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
.login {
  flex: 1;
  background: url('~@/assets/images/homeBg.png') no-repeat center;
  background-size: 100% 100%;
  position: relative;
  .loginTitle {
    position: absolute;
    left: 417px;
    top: 103px;
    color: #fff;
    h1 {
      font-weight: bold;
      font-size: 36px;
    }
    p {
      margin-top: 18px;
      font-size: 17px;
    }
  }
  .loginbox {
    width: 450px;
    height: 450px;
    position: absolute;
    left: 60%;
    top: 50%;
    padding: 50px;
    box-sizing: border-box;
    transform: translate(0, -50%);
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 7px 57px rgba(0, 72, 152, 0.2);
  }
}
</style>
