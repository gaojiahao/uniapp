<template>
  <div
    id="app"
    class="rootApp"
    v-cloak
    v-loading="$store.state.AppLoading"
    element-loading-spinner
    element-loading-background="rgba(200, 200, 200, 0.5)"
    @mousewheel="mousewheel"
  >
    <router-view v-cloak />
    <el-backtop target=".rootApp" :bottom="50" :right="150">
      <div style="display:flex;flexWrap:wrap;alignContent:flex-start;justifyContent:center; alignItems:center;">
          <i class="el-icon-caret-top" style="marginTop:-5px;"></i>
          <span style="fontSize:12px;marginTop:-5px;">
            顶部
          </span>
      </div>
    </el-backtop>
  </div>
</template>
<script>
import { getMenuFuc } from '@/router/index'
// import Footer from '@/components/Footer'
export default {
  // components: { Footer },
  data () {
    return {
      im: new this.IM(),
      appHeight: document.documentElement.clientHeight,
      options: {
        // 二维码配置
        url: 'https://www.toysbear.com/app_download.html',
        icon: require('@/assets/images/logo.png')
      }
    }
  },
  methods: {
    // 初始化IM
    initIM () {
      this.im.login(this.loginIMState, this.newChatList, this.newMessage, this.groupChat)
      this.im.$IM.connect({ token: 'IhWfv3yo2pfxnKMq8uThDPKy+4B8wH9zbo7JCg51TcBdiZ2vJ2fR/RGP9GkKO8HRTh0p2e3OF4N9qUCAGhKHow==@pm5y.cn.rongnav.com;pm5y.cn.rongcfg.com' }).then(user => {
        console.log('链接成功, 链接用户 id 为: ', user.id)
      }).catch(error => {
        console.log('链接失败: ', error.code, error.msg)
      })
    },
    // IM链接状态回调
    loginIMState (val) {
      console.log(val)
    },
    // 最新聊天会话列表
    newChatList (list) {
      console.log(list)
    },
    // 接收到新消息
    newMessage (msg) {
      console.log(msg)
    },
    // 群聊
    groupChat (msg) {
      console.log(msg)
    },
    mousewheel (e) {
      if (this.$store.state.AppLoading) e.preventDefault()
    },
    prohibit () {
      // 禁用鼠标右击、F12
      document.oncontextmenu = function () {
        return false
      }
      document.onkeydown = function (e) {
        if (
          e.ctrlKey &&
          (e.keyCode === 73 ||
            e.keyCode === 74 ||
            e.keyCode === 80 ||
            e.keyCode === 83 ||
            e.keyCode === 85 ||
            e.keyCode === 117)
        ) {
          return false
        }
        if (e.keyCode === 18 || e.keyCode === 123) {
          return false
        }
      }
    }
  },
  async created () {
    await getMenuFuc()
    this.prohibit()
  },
  mounted () {
    if (this.uid) this.initIM()
  },
  watch: {
    uid (newV) {
      if (newV) this.initIM()
      else this.im.$IM.disconnect().then(() => console.log('断开链接成功'))
    }
  },
  computed: {
    uid () {
      return this.$store.state.isLogin && this.$store.state.userInfo.uid
    }
  }
}
</script>

<style lang="less" scoped>
@deep: ~">>>";
[v-cloak] {
  display: none;
}
@{deep} .el-loading-spinner .circular {
  width: 100px;
  height: 100px;
  animation: loading-rotate 2s linear infinite;
  display: none;
}
@{deep} .el-loading-mask {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
@{deep} .el-loading-spinner {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: url("~@/assets/images/loadding.gif") no-repeat center center;
  background-size: 200px 200px;
  width: 100%;
  height: 100%;
}
</style>
