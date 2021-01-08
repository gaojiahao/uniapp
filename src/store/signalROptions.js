// export default { // 深网配置
//   value: null,
//   attachment: null,
//   addId: '5de91f02f12c41c2b276c9accb4679c7',
//   userName: store.state.userInfo.userInfo.linkman,
//   token: '',
//   loginState: null,
//   showmsg: [],
//   orderNumber: null,
//   creatChannel: null,
//   groupNumber: '',
//   toCompanyID: null,
//   toUserID: null,
//   name: '',
//   uid: store.state.userInfo.userInfo.id,
//   client: {},
//   channelMember: []
// }
import AgoraRTM from 'agora-rtm-sdk'
class RMT {
  constructor ({ value, attachment, addId, token, loginState, showmsg, orderNumber, creatChannel, groupNumber, toCompanyID, toUserID, name, client, channelMember }) {
    this.value = value
    this.attachment = attachment
    this.addId = addId
    this.userName = null
    this.token = token
    this.loginState = loginState
    this.showmsg = showmsg
    this.orderNumber = orderNumber
    this.creatChannel = creatChannel
    this.groupNumber = groupNumber
    this.toCompanyID = toCompanyID
    this.toUserID = toUserID
    this.name = name
    this.client = client
    this.channelMember = channelMember
    this.AgoraRTM = AgoraRTM
  }

  // 深网登录
  login (uid, userName) {
    this.userName = userName
    // 登入 RTM 之前，调用 AgoraRTM.createInstance 方法创建一个 RtmClient 实例。
    this.client = this.AgoraRTM.createInstance(this.addId)
    // 通过监听 RtmClient 上的 ConnectionStateChanged 事件可以获得 SDK 连接状态改变的通知
    this.client.on(
      'ConnectionStateChanged',
      (newState, reason) => {
        this.loginState = newState
      }
    )
    // 登录
    this.client
      .login({
        token: this.token,
        uid: uid
      })
      .then(() => {
        console.log('AgoraRTM客户端登录成功')
      })
      .catch(err => {
        console.log('AgoraRTM客户端登录失败', err)
      })
    // 监听 client 上的事件 MessageFromPeer 接收点对点消息
    this.client.on(
      'MessageFromPeer',
      ({ text }, peerId, messageProps) => {
        // text 为消息文本，peerId 是消息发送方 User ID
        console.log('我收到了点对点', text, peerId, messageProps)
        this.getAllMessagesCount()
        this.$root.eventHub.$emit('resetData')
        /* 收到点对点消息的处理逻辑 */
      }
    )
    // 监听对方是否在线
    this.client.on('PeersOnlineStatusChanged', status => {
      console.log(status)
    })
  }

  // 深网登出
  signOut () {
    if (this.client) {
      this.client.logout()
      console.log('退出頻道成功')
    }
  }
}

export default RMT
