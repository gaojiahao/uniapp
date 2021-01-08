<template>
<el-container class="meInfo">
  <el-header style="padding:0;">
    <bsTop></bsTop>
  </el-header>
  <el-main style="padding:0;overflow:visible;">
    <div class="content">
      <li class="info">
        <router-view
          @getNoticeUnreadTotal="getNoticeUnreadTotal"
          :findCount="findCount"
          @orderInfoCount="getOrderInfoCount"
          @openOneView="openOneView"
        ></router-view>
        <!-- tabs -->
        <div class="footer">
          <router-link to="infoList" class="li">
            <el-badge :hidden="allInfoCount < 1" :value="allInfoCount" @click.native="openOneView(null)">
              <i class="el-icon-s-comment"></i>
              <p>消息</p>
            </el-badge>
          </router-link>
          <router-link to="findList" class="li" @click.native="openOneView({componentName: 'myAnnouncementComponent'})">
            <el-badge :hidden="findCount < 1" :value="findCount">
              <i class="el-icon-s-help"></i>
              <p>玩具圈</p>
            </el-badge>
          </router-link>
          <router-link to="newSletter" class="li" @click.native="openOneView(null)">
            <i class="el-icon-s-custom"></i>
            <p>通讯录</p>
          </router-link>
        </div>
      </li>
      <!-- 二级窗口组件 -->
      <div class="componentOneIs" v-if="oneViews">
        <component :is="oneViews.componentName" :options="oneViews" @openTwoView="openTwoView" :MessageUnreadCount="MessageUnreadCount" @changeMessageUnreadCount="changeMessageUnreadCount" :signalROptions="signalROptions"></component>
      </div>
      <!-- 三级窗口组件 -->
      <div class="componentOneIs" v-if="twoViews">
        <component :is="twoViews.componentName" :options="twoViews" @openTwoView="openTwoView" :MessageUnreadCount="MessageUnreadCount" @changeMessageUnreadCount="changeMessageUnreadCount" :signalROptions="signalROptions"></component>
      </div>
    </div>
    <!-- 打标签 -->
    <el-dialog title="新增标签" :visible.sync="dialogAddTag" destroy-on-close width="400px">
      <el-form label-position="left" label-width="80px">
        <el-form-item label="标签内容">
          <el-input
            v-model="tagValue"
            autocomplete="off"
            :maxlength="200"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddTag = false">取 消</el-button>
        <el-button type="primary" @click="addTag">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 公司地址定位地图 -->
    <el-dialog
      title="定位"
      :visible.sync="companyAddrMapDialog"
      v-if="companyAddrMapDialog"
      destroy-on-close
      width="50%">
      <div class="companyAddrMapBox" v-if="companyAddr">
        <BMapComponent :addr="companyAddr"></BMapComponent>
      </div>
    </el-dialog>
  </el-main>
    <el-footer style="padding:0;" height="162px">
    <bsFooter></bsFooter>
  </el-footer>
  </el-container>
</template>
<script>
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
import bsTop from '@/components/BsTop.vue'
import bsFooter from '@/components/oldFooter'
import BMapComponent from '@/components/map.vue'
import addFriendComponent from '@/components/addFriendComponent/addFriendComponent.vue'
import chooseGroupChatComponent from '@/components/chooseGroupChatComponent/chooseGroupChatComponent.vue'
import friendVerificationComponent from '@/components/friendVerificationComponent/friendVerificationComponent.vue'
import friendApplicationComponent from '@/components/friendApplicationComponent/friendApplicationComponent.vue'
import newFriendComponent from '@/components/newFriendComponent/newFriendComponent.vue'
import launchGroupChatComponent from '@/components/launchGroupChatComponent/launchGroupChatComponent.vue'
import hallContactComponent from '@/components/hallContactComponent/hallContactComponent.vue'
import personalDataComponent from '@/components/personalDataComponent/personalDataComponent.vue'
import editPersonalDataComponent from '@/components/editPersonalDataComponent/editPersonalDataComponent.vue'
import personalChatComponent from '@/components/personalChatComponent/personalChatComponent.vue'
import myAnnouncementComponent from '@/components/myAnnouncementComponent/myAnnouncementComponent.vue'
import sendNoticeComponent from '@/components/sendNoticeComponent/sendNoticeComponent.vue'
import companyBusinessComponent from '@/components/companyBusinessComponent/companyBusinessComponent.vue'
import orderDetailComponent from '@/components/orderDetailComponent/orderDetailComponent.vue'
import companyNumberComponent from '@/components/companyNumberComponent/companyNumberComponent.vue'
import rowNumberDetails from '@/components/rowNumberDetails/rowNumberDetails.vue'
import choosingHistoryComponent from '@/components/choosingHistoryComponent/choosingHistoryComponent.vue'
import sampleSelectionRankingComponent from '@/components/sampleSelectionRankingComponent/sampleSelectionRankingComponent.vue'
import myProductComponent from '@/components/myProductComponent/myProductComponent.vue'
import chatInformationComponent from '@/components/chatInformationComponent/chatInformationComponent.vue'
import chatSettingsComponent from '@/components/chatSettingsComponent/chatSettingsComponent.vue'
import removeMembersComponent from '@/components/removeMembersComponent/removeMembersComponent.vue'
import addNewMembersComponent from '@/components/addNewMembersComponent/addNewMembersComponent.vue'
import seeGroupMembersComponent from '@/components/seeGroupMembersComponent/seeGroupMembersComponent.vue'
// import friendsDetailsComponent from '@/components/friendsDetailsComponent/friendsDetailsComponent.vue'
export default {
  components: {
    bsTop,
    bsFooter,
    BMapComponent,
    ElImageViewer,
    companyBusinessComponent,
    addFriendComponent,
    chooseGroupChatComponent,
    friendVerificationComponent,
    friendApplicationComponent,
    newFriendComponent,
    launchGroupChatComponent,
    hallContactComponent,
    personalDataComponent,
    editPersonalDataComponent,
    personalChatComponent,
    myAnnouncementComponent,
    orderDetailComponent,
    sendNoticeComponent,
    rowNumberDetails,
    choosingHistoryComponent,
    sampleSelectionRankingComponent,
    myProductComponent,
    chatInformationComponent,
    chatSettingsComponent,
    removeMembersComponent,
    addNewMembersComponent,
    seeGroupMembersComponent,
    companyNumberComponent
    // friendsDetailsComponent
  },
  data () {
    return {
      MessageUnreadCount: [],
      companyAddrMapDialog: false, // 公司地址
      tagValue: '', // 打标签
      dialogAddTag: false, // 打标签
      twoViews: null,
      oneViews: null,
      infoCount: 0,
      findCount: 0,
      orderInfoCount: 0,
      signalROptions: {
        // 深网配置
        value: null,
        attachment: null,
        addId: '5de91f02f12c41c2b276c9accb4679c7',
        userName:
          this.$store.state.userInfo.userInfo &&
          this.$store.state.userInfo.userInfo.linkman,
        token: '',
        loginState: null,
        showmsg: [],
        orderNumber: null,
        creatChannel: null,
        groupNumber: '',
        toCompanyID: null,
        toUserID: null,
        name: '',
        uid: this.$store.state.userInfo.uid,
        client: '',
        channelMember: []
      }
    }
  },
  methods: {
    // 深网登录
    login () {
      // 登入 RTM 之前，调用 AgoraRTM.createInstance 方法创建一个 RtmClient 实例。
      this.signalROptions.client = this.$AgoraRTM.createInstance(
        this.signalROptions.addId
      )
      // 通过监听 RtmClient 上的 ConnectionStateChanged 事件可以获得 SDK 连接状态改变的通知
      this.signalROptions.client.on(
        'ConnectionStateChanged',
        (newState, reason) => {
          this.signalROptions.loginState = newState
        }
      )
      // 登录
      this.signalROptions.client
        .login({
          token: this.signalROptions.token,
          uid: this.signalROptions.uid
        })
        .then(() => {
          console.log('AgoraRTM客户端登录成功')
        })
        .catch(err => {
          console.log('AgoraRTM客户端登录失败', err)
        })
      // 监听 client 上的事件 MessageFromPeer 接收点对点消息
      this.signalROptions.client.on(
        'MessageFromPeer',
        ({ text }, peerId, messageProps) => {
          // text 为消息文本，peerId 是消息发送方 User ID
          // this.$message.success("我收到了点对点");
          console.log('我收到了点对点')
          this.getAllMessagesCount()
          this.$root.eventHub.$emit('resetData')
          /* 收到点对点消息的处理逻辑 */
        }
      )
      // 监听收到来自主叫的呼叫邀请
      this.signalROptions.client.on(
        'RemoteInvitationReceived',
        remoteInvitation => {
          console.log(remoteInvitation)
        }
      )
      // 监听对方是否在线
      this.signalROptions.client.on('PeersOnlineStatusChanged', status => {
        this.$message.error(status)
      })
    },
    // 深网登出
    signOut () {
      if (this.signalROptions.client && this.signalROptions.client.logout) {
        this.signalROptions.client.logout()
        console.log('退出頻道成功')
      }
    },
    // 更新历史消息
    changeMessageUnreadCount (val) {
      this.MessageUnreadCount = val
    },
    // 打开添加标签
    openAddTag () {
      this.dialogAddTag = true
    },
    // 添加标签
    async addTag () {
      const res = await this.$http.post('/api/CreateCompanyLabel', {
        companyID: this.CompanyDetail.orgCompany.id,
        companyName: this.CompanyDetail.orgCompany.companyName,
        labelName: this.tagValue,
        isCompany: true,
        companyCode: this.CompanyDetail.orgCompany.companyNumber
      })
      if (res.data.result.code === 200) {
        this.openCompanyDetail(res.data.result.item.companyID)
        this.$message.success('添加标签成功')
      }
      this.dialogAddTag = false
    },
    // 获取玩具圈未读条数
    async getNoticeUnreadTotal () {
      const res = await this.$http.post('/api/GetNoticeUnreadTotal')
      if (res.data.result.code === 200) {
        this.findCount = res.data.result.item
      } else {
        this.$message.error(res.data.result.msg)
      }
    },
    // 获取所有订单未读消息
    getOrderInfoCount (value) {
      this.orderInfoCount = value
    },
    // 获取消息全部未读条数
    async getAllMessagesCount () {
      const res = await this.$http.post('/api/GetAllMessagesCount')
      if (res.data.result.code === 200) {
        this.infoCount = res.data.result.item
        console.log(this.infoCount)
      } else {
        this.$message.error(res.data.result.msg)
      }
    },
    // 打开二级窗口
    openOneView (option) {
      this.oneViews = null
      this.twoViews = null
      this.$nextTick(() => { this.oneViews = option })
    },
    // 打开三级窗口添加好友
    openTwoView (option) {
      this.twoViews = null
      this.$nextTick(() => { this.twoViews = option })
    }
  },
  mounted () {
    this.login()
    this.$store.commit('clearWsMsg') // 清空已读未读
    this.getNoticeUnreadTotal() // 获取玩具圈未读数量
    this.getAllMessagesCount() // // 获取消息全部未读条数
  },
  created () {},
  watch: {
    'signalROptions.client' (val) {
      if (!val) {
        console.log('已被迫下线，可刷新重新登录中')
        this.login()
      }
    },
    'signalROptions.loginState' (val) {
      console.log('登录状态', val)
      switch (val) {
        case 'CONNECTED':
          this.$message.closeAll()
          console.log('即时通讯链接成功')
          break
        default:
          this.$message.closeAll()
          console.log('即时通讯已断开链接')
          break
      }
    }
  },
  computed: {
    // 计算订单和消息未读的总和
    allInfoCount () {
      return this.orderInfoCount + this.infoCount
    },
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  filters: {
    ERPOrderTitle (val) {
      let type
      switch (val) {
        case 'SUPPLIER':
        case 'supplier':
          type = '厂商业务列表'
          break
        case 'SALES':
        case 'sales':
          type = '公司业务列表'
          break
        case 'HALL':
        case 'hall':
          type = '展厅业务列表'
          break
      }
      return type
    }
  },
  beforeDestroy () {
    this.signOut()
    this.signalROptions.creatChannel && this.signChannel()
  }
}
</script>

<style lang="less" scoped>
@deep: ~">>>";
.meInfo {
  .content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    box-sizing: border-box;
    max-width: 1200px;
    min-width: 1024px;
    margin: 0 auto;
    &:after {
      content: "";
      width: 32%;
    }
    li {
      width: 32%;
      box-sizing: border-box;
      border: 1px solid #ccc;
      &.info {
        height: 827px;
        position: relative;
        // margin-bottom:60px ;
        .footer {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          display: flex;
          height: 60px;
          background-color: #f6f6f6;
          box-sizing: border-box;
          .li {
            cursor: pointer;
            flex: 1;
            margin: 2px 5px;
            border: none;
            text-align: center;
            i {
              font-size: 30px;
            }
            &.router-link-active {
              color: #1ac25f;
            }
          }
        }
      }
    }
    // 一级组件框
    .componentOneIs{
      width: 32%;
      height: 827px;
      border: 1px solid #aaa;
      box-sizing: border-box;
    }
  }
}

.companyAddrMapBox{
  height:500px;
}
</style>
