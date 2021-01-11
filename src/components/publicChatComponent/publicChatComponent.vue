<template>
<div>
    <el-dialog
      :visible.sync="dialogVisible"
      fullscreen
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      width="100%">
      123
      <personalChatComponent :signalROptions="rtm" />
    </el-dialog>
</div>
</template>

<script>
import personalChatComponent from '@/components/personalChatComponent/personalChatComponent.vue'
export default {
  components: {
    personalChatComponent
  },
  data () {
    return {
      dialogVisible: true,
      rtm: new this.$RTM({ // 深网配置
        addId: '5de91f02f12c41c2b276c9accb4679c7',
        isGroup: false,
        loginState: null,
        attachment: null,
        token: '',
        msgType: 'Text',
        value: '',
        showmsg: [],
        creatChannel: null,
        orderNumber: null,
        groupNumber: '',
        linkName: '',
        userImage: '',
        toUserID: null,
        toCompanyID: null,
        orgPersonnelId: null,
        orgCompanyId: null,
        client: {},
        channelMember: []
      })
    }
  },
  methods: {
  },
  created () {

  },
  mounted () {

  }
}
</script>
<style scoped lang='less'>

</style>
