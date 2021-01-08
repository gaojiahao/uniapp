<template>
<el-container class="meInfo">
  <el-header style="padding:0;">
    <bsTop></bsTop>
  </el-header>
  <el-main style="padding:0;overflow:visible;">
    <div class="content">
      <li class="info">
        <router-view
          @showInfo="showInfo"
          @showCompany="showCompany"
          @showCompanyList="showCompanyList"
          @cancelSendGonggao="active2 = null"
          @showFindLiaotian="showFindLiaotian"
          @getNoticeUnreadTotal="getNoticeUnreadTotal"
          :findCount="findCount"
          @orderInfoCount="getOrderInfoCount"
          @openOneView="openOneView"
        ></router-view>
        <!-- tabs -->
        <div class="footer">
          <router-link to="infoList" class="li" @click.native="offDetail()">
            <el-badge :hidden="allInfoCount < 1" :value="allInfoCount">
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
          <router-link to="newSletter" class="li" @click.native="offDetail()">
            <i class="el-icon-s-custom"></i>
            <p>通讯录</p>
          </router-link>
        </div>
      </li>
      <!-- 朋友圈我发布的信息 -->
      <!-- 二级窗口组件 -->
      <div class="componentOneIs" v-if="oneViews">
        <component :is="oneViews.componentName" :options="oneViews" @openTwoView="openTwoView" :MessageUnreadCount="MessageUnreadCount" @changeMessageUnreadCount="changeMessageUnreadCount" :signalROptions="signalROptions"></component>
      </div>
      <!-- 三级窗口组件 -->
      <div class="componentOneIs" v-if="twoViews">
        <component :is="twoViews.componentName" :options="twoViews" @openTwoView="openTwoView" :MessageUnreadCount="MessageUnreadCount" @changeMessageUnreadCount="changeMessageUnreadCount" :signalROptions="signalROptions"></component>
      </div>
      <!-- 好友申请 -->
      <div class="newFriends bgClass" v-if="$route.path === '/meInfo/newSletter' && newFriendOptions && friendApplication">
        <div class="topLayout">
          <span></span>
          <span>好友申请</span>
          <span></span>
        </div>
        <div class="topBox">
          <div class="nameBox">
          <el-image fit="contain" :src="require('@/assets/images/imgError.jpg')" lazy>
            <div
              slot="placeholder"
              class="image-slot"
              style="width:40px;height:40px;margin:0 auto;background-color:#165af8;color:#fff;text-align:center;">
              名字
            </div>
            <div
              slot="error"
              class="image-slot"
              style="width:40px;height:40px;margin:0 auto"
            >
              <img
                class="errorImg"
                src="~@/assets/images/imgError.jpg"
                alt
              />
            </div>
          </el-image>
          <div class="name">
            超好听的名字
          </div>
        </div>
        <div class="infoContent" v-if="friendApplication.code === 1">
          <span class="name">张含韵</span>:
          <span class="info">你好你好我是大佬你好你好我是大佬你好你好我是大佬你好你好我是大佬你好你好我是大佬你好你好我是大佬你好你好我是大佬你好你好我是大佬</span>
        </div>
        </div>
        <div class="remarksBox">
          <div class="remark">
            备注标签
          </div>
          <div class="isLookMyFind">
            <span>允许对方查看我的玩具圈</span>
            <span>
              <el-switch
                v-model="lookMyFindSwitch"
                active-color="#165AF7"
                inactive-color="#f5f5f5">
              </el-switch>
            </span>
          </div>
        </div>
        <div class="source">
          <span>来源</span>
          <span class="isAdd">对方通过聊天添加</span>
        </div>
         <div class="sub">
          <span  v-if="friendApplication.code === 1">接受</span>
          <span  v-else>发消息</span>
        </div>
      </div>
    </div>
    <!-- 打标签 -->
    <el-dialog title="新增标签" :visible.sync="dialogAddTag" destroy-on-close width="400px">
      <el-form label-position="left" label-width="80px">
        <el-form-item label="标签内容">
          <el-input
            v-model="tagValue"
            autocomplete="off"
            :maxlength="
              Json.CompanyRestrictions && Json.CompanyRestrictions[0].itemCode
            "
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddTag = false">取 消</el-button>
        <el-button type="primary" @click="addTag">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 确认订单 -->
    <el-dialog
      title="确认提示"
      :visible.sync="queRenDialog"
      width="30%"
      :before-close="handleClose"
    >
      <center class="querenDialog">
        <h3 class="title">{{ orderOptions && orderOptions.client_na }}</h3>
        <p class="titleText">需要带走或借走所有样品？</p>
        <template v-if="orderOptions">
          <div class="btns" v-if="orderOptions.messageExt === 3">
            <el-button
              @click="UpdateERPOrderStatus('1')"
              size="medium"
              round
              :class="{ activeGray: orderOptions.messageStatus === 1 }"
              >不可带</el-button
            >
            <el-button
              @click="UpdateERPOrderStatus('0')"
              size="medium"
              round
              :class="{
                blueBtn: true,
                activeBlue: orderOptions.messageStatus === 0
              }"
              >可带</el-button
            >
          </div>
          <div class="btns" v-else-if="orderOptions.messageExt === 5">
            <el-button
              size="medium"
              @click="UpdateERPOrderStatus('1')"
              round
              :class="{ activeGray: orderOptions.messageStatus === 1 }"
              >不可借</el-button
            >
            <el-button
              @click="UpdateERPOrderStatus('0')"
              size="medium"
              round
              :class="{
                orangeBtn: true,
                activeOrange: orderOptions.messageStatus === 0
              }"
              >可借</el-button
            >
          </div>
          <div class="btns" v-else-if="orderOptions.messageExt === 11">
            <el-button
              size="medium"
              @click="UpdateERPOrderStatus('2')"
              round
              :class="{ activeGray: orderOptions.messageStatus === 2 }"
              >不可带</el-button
            >
            <el-button
              @click="UpdateERPOrderStatus('0')"
              size="medium"
              round
              :class="{
                blueBtn: true,
                activeBlue: orderOptions.messageStatus === 0
              }"
              >可带</el-button
            >
            <el-button
              @click="UpdateERPOrderStatus('1')"
              size="medium"
              round
              :class="{
                orangeBtn: true,
                activeOrange: orderOptions.messageStatus === 1
              }"
              >可借</el-button
            >
          </div>
        </template>
        <p style="padding-top:20px;">
          <i
            style="width:16px;height:16px;backgroundColor:#709AFA;display:inline-block;border-radius:50%;color:white;vertical-align: middle;"
            >!</i
          >
          此次操作将确认所有货号状态
        </p>
      </center>
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
      currentTwoComponent: null,
      twoViews: null,
      currentOneComponent: null,
      oneViews: null,
      groupCurrentPage: 1,
      groupPageSize: 10,
      groupTotalCount: 0,
      groupMessageList: 6,
      lookMyFindSwitch: null,
      showdialogVerification: false,
      friendApplication: null,
      newFriendOptions: null,
      showFriendVerification: null,
      friendList: 50,
      addFriendOptions: null,
      showErweimaViewer: false,
      infoCount: 0,
      findCount: 0,
      orderInfoCount: 0,
      viewerImgList: [],
      drag: false,
      isCheckCube: true,
      companyListPageSize: 20,
      companyListCurrentPage: 1,
      companyAddr: '',
      companyAddrMapDialog: false,
      orderItemOptions: null,
      orderDetailTotalCount: null,
      orderDetailCurrentPage: 1,
      orderDetailPageSize: 10,
      drawer: false,
      showSampleSelection: null,
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
      },
      copyText: null,
      isChehui: null,
      orderSampleFrom: null,
      orderWsMsg: null,
      orderWs: null,
      isGroupNumber: false,
      MessageUnreadCount: null,
      orgListCurrentPage: 1,
      orgListPageSize: 10,
      orgListCount: null,
      customerVisitCurrentPage: 1,
      customerVisitPageSize: 10,
      showSearchCompanyCount: false,
      isNoCustomerVisit: false,
      isNoCurrentNumber: false,
      orderCurrentPage: 1,
      orderPageSize: 10,
      orderLoadText: '加载中...',
      Loop: null, // 长按事件
      rec: null,
      showAddSampleTXT: null,
      activeAddSample: false,
      sampleSelectionCurrentPage: 0,
      mySampleSelectionCurrentPage: 1,
      sampleSelectionPageSize: 20,
      sampleSelectionList: [],
      sampleSelectionTotalCount: 0,
      showPersonalNumber: false,
      timeID: null,
      loadText: null,
      activeName: '',
      showOrderCompanyItem: null,
      fileType: null,
      TXTUrl: '',
      visibleTXT: false,
      noScrollTop: false,
      audioItem: null,
      orgList: [],
      imgAndVideoNum: null,
      Json: {}, // 规则
      orderOptions: null,
      queRenDialogActive: 0,
      queRenDialog: false,
      orderDetailList: [],
      orderDetailTotal: 0,
      isOrderShow: false,
      messageList: [],
      sendValue: '',
      showTypeOptions: {
        showType: null,
        sampleFrom: null,
        showLiaotianType: null,
        showOrderDetail: false,
        isShowOrderDetail: true
      },
      dialogPinglun: false,
      pinglunTitle: '',
      pinglunValue: '',
      gonggaoType: '',
      dialogImageUrl: '',
      dialogVideoUrl: '',
      disabledImg: false,
      datas: {},
      dialogAddTag: false,
      tagValue: '',
      tagsType: [
        '',
        'success',
        'warning',
        'danger',
        'info',
        '',
        'success',
        'warning',
        'danger',
        'info'
      ],
      file: null,
      search: '',
      infoItem2: null,
      active2: null,
      activeFind: null,
      personalDetail: undefined,
      CompanyDetail: undefined,
      CompanyList: [],
      companyListTotalCount: 0,
      showCollection: {
        type: null,
        active1: null,
        infoItem: null,
        active: null
      },
      skipCount: 1,
      dialogVisible: false,
      maxResultCount: 10,
      total: null,
      dataList: []
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
    async sendMessages () {
      this.noScrollTop = false
      if (this.signalROptions.msgType === 'Text' && !this.signalROptions.value) {
        this.signalROptions.value = null
        this.$message.error('发送内容不能为空')
        return
      }
      if (/^http/.test(this.signalROptions.value)) {
        this.signalROptions.msgType = 'Product'
      }
      try {
        const res = await this.createMessageAccept()
        this.signalROptions.showmsg.push(res.data.result.item)
        this.signalROptions.value = ''
        if (res.data.result.code === 200) {
          this.signalROptions.groupNumber = res.data.result.item.groupNumber
          // 连接ws
          if (this.isGroupNumber) {
            this.$setWs.$ws && this.$setWs.$ws.close()
            this.$store.commit('setWsId', this.signalROptions.groupNumber)
            this.$setWs.initWebSocket()
            this.isGroupNumber = false
          }
          // 加入深网频道
          try {
            await this.getMembers()
          } catch (error) {
            await this.addChannel()
          }
          const re = await this.$http.post('/api/UpdateMessageMemberActivate', {
            GroupNumber: this.signalROptions.groupNumber,
            UIDList: this.signalROptions.channelMember
          })
          this.sendMsg(res.data.result.item) // 深网发消息
        }
        this.$root.eventHub.$emit('resetData')
      } catch (error) {
        this.login()
        this.$message.warning('断线重连成功')
      }

      this.signalROptions.value = null
      this.signalROptions.attachment = null
      this.signalROptions.msgType = 'Text'
      this.$refs.refFileInput.value = ''
    },
    // 即时通讯发消息
    async sendMessage (e) {
      if (e.ctrlKey && e.keyCode === 13) {
        this.signalROptions.value += '\n' // 换行
      } else if (e.key === 'Enter' || e.code === 'Enter' || e.keyCode === 13) {
        e.preventDefault() // 禁止回车的默认换行
        this.noScrollTop = false
        if (
          this.signalROptions.msgType === 'Text' &&
          !this.signalROptions.value
        ) {
          this.signalROptions.value = null
          this.$message.error('发送内容不能为空')
          return
        }
        if (/^http/.test(this.signalROptions.value)) {
          this.signalROptions.msgType = 'Product'
        }
        try {
          const res = await this.createMessageAccept()
          this.signalROptions.showmsg.push(res.data.result.item)
          this.signalROptions.value = ''

          if (res.data.result.code === 200) {
            this.signalROptions.groupNumber = res.data.result.item.groupNumber
            // 连接ws
            if (this.isGroupNumber) {
              this.$setWs.$ws && this.$setWs.$ws.close()
              this.$store.commit('setWsId', this.signalROptions.groupNumber)
              this.$setWs.initWebSocket()
              this.isGroupNumber = false
            }
            // 加入深网频道
            try {
              await this.getMembers()
            } catch (error) {
              await this.addChannel()
            }
            const re = await this.$http.post('/api/UpdateMessageMemberActivate', {
              GroupNumber: this.signalROptions.groupNumber,
              UIDList: this.signalROptions.channelMember
            })
            this.sendMsg(res.data.result.item) // 深网发消息
          }
          this.$root.eventHub.$emit('resetData')
        } catch (error) {
          this.login()
          this.$message.warning('断线重连成功')
        }

        this.signalROptions.value = null
        this.signalROptions.attachment = null
        this.signalROptions.msgType = 'Text'
        this.$refs.refFileInput.value = ''
        e.preventDefault() // 阻止浏览器默认换行操作
      }
    },
    // 个推送
    async GeSendPush (item, toUserID, number) {
      const obj = {
        callType: number,
        channelId: item.groupNumber,
        userAvatar: item.userImage,
        userId: toUserID,
        userName: item.linkName
      }
      try {
        const res = await this.$http.post('/api/GeSendPush', {
          UserId: toUserID,
          Title: '您有一条新的消息',
          Description: item.content || item.attachment,
          ExtraBody: item.content || item.attachment,
          ActionData: JSON.stringify(obj)
        })
        if (res.data.result.code === 200) {
          console.log('推送成功')
        } else {
          this.$message.error(res.data.result.message)
        }
      } catch (error) {
        console.log('推送失败')
      }
    },
    // 更新历史消息
    changeMessageUnreadCount (val) {
      this.MessageUnreadCount = val
    },
    // 发送点对点或频道消息
    sendMsg (item) {
      // 加入频道成功后可发送频道消息
      if (item) {
        item.linkName = this.$store.state.userInfo.userInfo.linkman
        item.userImage = this.$store.state.userInfo.userInfo.userImage
        let toUserIDList = []
        for (let i = 0; i < item.toUserList.length; i++) {
          // 判断如果不在频道内
          if (
            !this.signalROptions.channelMember.includes(item.toUserList[i].uid)
          ) {
            // 如果不在频道内并且有uid
            if (item.toUserList[i].uid) {
              // 发送点对点消息
              this.sendPeerToPeer(JSON.stringify(item), item.toUserList[i].uid)
            }
          } else {
            // 在频道内的
            toUserIDList.push(item.toUserList[i].toUserID)
          }
        }
        // 先去重 后去掉在频道内的
        const newobj = {}
        const arr = item.toUserList.reduce((preVal, curVal) => {
        /* eslint-disable */
          newobj[curVal.toUserID]
            ? ''
            : (newobj[curVal.toUserID] = preVal.push(curVal))
          return preVal
        }, [])
        // 发推送
        toUserIDList = JSON.stringify(toUserIDList)
        for (let i = 0; i < arr.length; i++) {
          if (!toUserIDList.includes(arr[i].toUserID)) {
            this.GeSendPush(item, arr[i].toUserID, 3)
          }
        }

        this.$root.eventHub.$emit('UpdateOrgPersonnel')
        // 在不在频道内都发频道消息
        this.signalROptions.creatChannel
          .sendMessage({ text: JSON.stringify(item) })
          .then(() => {
            /* 频道消息发送成功的处理逻辑 */
            console.log('频道消息发送成功')
          })
          .catch(error => {
            /* 频道消息发送失败的处理逻辑 */
            this.$message.error('频道消息发送失败')
          })
      }
    },
    // 点击公告立即沟通
    async showFindLiaotian ({ item }) {
      this.offDetail()
      this.$store.commit('clearWsMsg')
      this.orderOptions = null
      this.signalROptions.value = null
      this.signalROptions.attachment = null
      this.signalROptions.showmsg = []
      this.signalROptions.orderNumber = null
      this.signalROptions.name = ''
      this.signalROptions.uid = ''
      this.signalROptions.name = item.niceName
      this.signalROptions.toUserID = item.userId
      this.signalROptions.toCompanyID = item.companyId
      this.signalROptions.isGroup = false
      this.signalROptions.groupNumber = null
      this.signalROptions.msgType = 'Text'
      try {
        this.addChannel() // 加入深网频道
      } catch (error) {
        this.login()
        this.$message.warning('断线重连成功')
      }
      // 获取聊天记录
      // let res = await this.getInstantMessageByNumber();
      // if (res.data.result.code === 200) {
      //   this.signalROptions.showmsg = res.data.result.item.items;
      //   this.chatHistoryTotal = res.data.result.item.totalCount;
      // } else {
      //   this.CompanyDetail = [];
      // }
      this.CompanyDetail = []
      this.showTypeOptions.showLiaotianType = 'showLiaotianList'
    },
    // 点击公司的立即沟通
    async companySend () {
      this.$store.commit('clearWsMsg')
      this.MessageUnreadCount = null
      this.active2 = null
      this.isGroupNumber = false
      this.chatHistoryCurrentPage = 1
      this.chatHistoryPageSize = 15
      this.orderOptions = null
      this.signalROptions.value = null
      this.signalROptions.attachment = null
      this.signalROptions.showmsg = []
      this.signalROptions.orderNumber = null
      this.signalROptions.name = ''
      this.signalROptions.uid = ''
      this.signalROptions.name = this.CompanyDetail.companyName
      this.signalROptions.toCompanyID = this.CompanyDetail.id
      this.signalROptions.isGroup = true
      this.signalROptions.groupNumber = this.CompanyDetail.groupNumber
      this.signalROptions.msgType = 'Text'
      try {
        this.addChannel() // 加入深网频道
      } catch (error) {
        this.login()
        this.$message.warning('断线重连成功')
      }
      const res = await this.getInstantMessageByNumber() // 获取聊天记录
      if (res.data.result.code === 200) {
        this.signalROptions.showmsg = res.data.result.item.items
        this.chatHistoryTotal = res.data.result.item.totalCount
      } else {
        this.CompanyDetail = []
      }
      this.showTypeOptions.showLiaotianType = 'showLiaotianList'
    },
    // 点击个人的立即沟通
    async personalSend () {
      // this.$store.commit('clearWsMsg')
      // this.MessageUnreadCount = null
      // this.chatHistoryCurrentPage = 1
      // this.chatHistoryPageSize = 15
      // this.orderOptions = null
      // this.signalROptions.value = null
      // this.signalROptions.attachment = null
      // this.signalROptions.showmsg = []
      // this.signalROptions.orderNumber = null
      // this.isGroupNumber = false
      // this.signalROptions.name = ''
      // this.signalROptions.uid = ''
      // this.signalROptions.name = this.personalDetail.linkman
      // this.signalROptions.toUserID = this.personalDetail.id
      // this.signalROptions.isGroup = false
      // this.signalROptions.groupNumber = this.personalDetail.groupNumber
      // this.signalROptions.toCompanyID = this.personalDetail.companyId
      // this.signalROptions.msgType = 'Text'
      // try {
      //   this.addChannel() // 加入深网频道
      // } catch (error) {
      //   this.login()
      //   this.$message.warning('断线重连成功')
      // }
      // const res = await this.getInstantMessageByNumber(
      //   this.personalDetail.groupNumber
      // )
      // if (res.data.result.code === 200) {
      //   this.signalROptions.showmsg = res.data.result.item.items
      //   this.chatHistoryTotal = res.data.result.item.totalCount
      // } else {
      //   this.personalDetail = []
      // }
      // this.showTypeOptions.showLiaotianType = 'showLiaotianList'
      // this.active2 = null
    },
    // 转发消息
    forwardInfo (item) {
      switch (item.messageType) {
        case 'Text':
          this.signalROptions.msgType = item.messageType
          this.signalROptions.value = item.content
          this.sendMessages()
          break
        case 'Voice':
          this.signalROptions.value = null
          this.signalROptions.msgType = item.messageType
          this.signalROptions.attachment = item.attachment
            .replace(/Message\/Voice/gi, '|Message/Voice')
            .split(/|/gi)[1]
          this.sendMessages()
          break
        case 'Video':
          this.signalROptions.value = null
          this.signalROptions.msgType = item.messageType
          this.signalROptions.attachment = item.attachment
            .replace(/Message\/Video/gi, '|Message/Video')
            .split(/|/gi)[1]
          this.sendMessages()
          break
        case 'Picture':
          this.signalROptions.value = null
          this.signalROptions.msgType = item.messageType
          this.signalROptions.attachment = item.attachment
            .replace(/Message\/Picture/gi, '|Message/Picture')
            .split(/|/gi)[1]
          this.sendMessages()
          break
        case 'file':
          this.signalROptions.value = null
          this.signalROptions.msgType = item.messageType
          this.signalROptions.attachment = item.attachment
            .replace(/Message\/File/gi, '|Message/File')
            .split(/|/gi)[1]
          this.sendMessages()
          break
      }
      this.signalROptions.value = null
      this.signalROptions.msgType = null
      this.signalROptions.attachment = null
    },
    // 打开编辑聊天消息
    openEditInfo (e, id) {
      this.noScrollTop = true
      this.isPaste = null
      this.isChehui = id
      const x = e.layerX // 鼠标left位置
      const y = e.layerY // 鼠标top位置
      this.copyDOM = $(e.target).offsetParent()
      this.copyDOM
        .offsetParent()
        .children('.myChehui')
        .css({ left: x, top: y })
    },
    // 复制消息
    copyInfo (item) {
      switch (item.messageType) {
        case 'Text':
          this.copyContact()
          break
      }
    },
    // 撤回消息
    async withdrawInfo (item) {
      try {
        const res = await this.$http.post('/api/UpdateWithdrawMessage', {
          id: item.id,
          isDelete: true,
          groupNumber: item.groupNumber,
          isWithdraw: true,
          companyID: item.companyId,
          fromUserID: item.fromUserId
        })
      } catch (error) {
        console.log(error)
      }
    },
    // 删除消息
    deleteInfo (item) {
      console.log(item)
    },
    // 打开粘贴
    OpenPaste (e) {
      this.isChehui = null
      this.isPaste = true
      const x = e.layerX // 鼠标left位置
      const y = e.layerY // 鼠标top位置
      $(e.target)
        .offsetParent()
        .children('.pasteIten')
        .css({ left: x, top: y })
    },
    // 粘贴
    pasteInfo () {
      if (window.clipboardData) {
        this.signalROptions.value = window.clipboardData.getData('Text')
      } else {
        this.signalROptions.value = this.copyText
        // clipboardData.setData("Text", range.text);
        // document.all.pp.value = clipboardData.getData("Text");
      }
    },
    // 复制文字方法
    copyContact (contat) {
      window.getSelection().removeAllRanges()
      const range = document.createRange()
      range.selectNode(this.copyDOM[0])
      this.copyText = this.copyDOM[0].innerText
      window.getSelection().addRange(range)
      try {
        const successful = document.execCommand('copy')
        if (successful) this.$message.success('复制成功')
        else this.$message.error('复制失败')
      } catch (error) {
        this.$message.error('复制失败')
      }
    },
    // 获取订单详情
    async getOrderDetail ({ orderType, erpOrderID, orderNumber, sampleNumber }) {
      if (orderType === 'Sample') {
        return await this.$http.post('/api/SampleOrderDetailPage', {
          SampleNumber: orderNumber,
          Id: erpOrderID,
          skipCount: this.orderDetailCurrentPage,
          maxResultCount: this.orderDetailPageSize
        })
      } else {
        return await this.$http.post('/api/OrderOfferDetailPage', {
          offerNumber: orderNumber,
          Id: erpOrderID,
          skipCount: this.orderDetailCurrentPage,
          maxResultCount: this.orderDetailPageSize
        })
      }
    },
    // 获取通讯录列表
    async getOrgList (flag) {
      const res = await this.$http.post('/api/OrgPersonnelPage', {
        skipCount: this.orgListCurrentPage,
        maxResultCount: this.orgListPageSize,
        id: this.$store.state.userInfo.userInfo.id
      })
      console.log(res)
      if (res.data.result.code === 200) {
        this.orgList = flag
          ? this.orgList.concat(res.data.result.item.items)
          : res.data.result.item.items
        this.orgListCount = res.data.result.item.totalCount
      }
    },
    // 给员工打备注
    async editUserRemark(item){
      const result = await this.$http.post('/api/UpdateOrgPersonnel', item)
      if (result.data.result.code === 200) {
        this.getPersonalDetails(result.data.result.item.id)
        this.$message.success('修改成功')
        this.isEditRemark = false
      }else {
        this.$message.success('修改失败')
      }
    },
    // 下载图片或视频
    handleDownload (file) {
      console.log(file)
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
    // 点击查看对应公司列表页
    async showCompanyList (val) {
      console.log(val);
      $('.listItems').animate({ scrollTop: 0 })
      this.companyLoadDisabled = true
      this.$nextTick(()=> {
        this.offDetail()
        this.showSearchCompanyCount = false
        this.CompanyList = []
        this.companyListTotalCount = 0
        this.showTypeOptions.showType = false
        this.active2 = null
        this.showCollection = val
        this.getContactsCompanyListByID()
      })
    },
    
    // 点击对应公司查看公司信息
    async showCompany (val) {
      this.showCollection = val
      this.active2 = null
      this.showTypeOptions.showType = false
      this.showTypeOptions.showLiaotianType = null
      this.isGroupNumber = false
      // 获取公司详情
      const res = await this.getCompanyDetails(val.id)
      if (res.data.result.code === 200) {
        this.CompanyDetail = res.data.result.item
      }
    },
    // 查看公司详情
    async getCompanyDetails (id) {
      return await this.$http.post('/api/CompanyByID', { CompanyNumber: id })
    },
    // 确认修改个人信息
    async editPersonal () {
      const formData = JSON.parse(JSON.stringify(this.datas))
      if (this.file) {
        const fd = new FormData()
        fd.append('file', this.file)
        fd.append('BusinessType', 'Head')
        const res = await this.$http.post('/api/File/InsertPic', fd, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        if (res.data.result.code === 200) {
          formData.userImage = res.data.result.object[0].filePath
        }
      }
      formData.birthday = new Date(this.datas.birthday)
        // formData.password = this.$md5(formData.phoneNumber+)
        .toLocaleString()
        .replace(/\//g, '-')
        .replace(/ [\s\S]+/g, '')
      const result = await this.$http.post('/api/UpdateOrgPersonnel', formData)
      if (result.data.result.code === 200) {
        this.getPersonalDetails(result.data.result.item.id)
        this.$root.eventHub.$emit('UpdateOrgPersonnel')
        this.$message.success('修改成功')
      }
    },
    // 查看个人信息
    showInfo (val) {
      this.infoItem = val.id
      this.showCollection = val
      this.showTypeOptions.showType = false
      this.showPersonalNumber = false
      this.showSampleSelection = false
      this.active2 = null
      this.showTypeOptions.showLiaotianType = null
      this.isGroupNumber = false
      this.getPersonalDetails(val.id)
    },
    // 关闭其他信息
    offDetail () {
      this.currentTwoComponent = null
      this.twoViews = null
      this.currentOneComponent = null
      this.oneViews = null
    },
    // 点击排号订单列表新的消息
    async resetPaihaoCompanyList () {
      this.$store.commit('clearWsOrderMsg')
      // 刷新列表
      this.orderCurrentPage = 1
      const res = await this.getERPOrderListByPage()
      if (res.data.result.code === 200) {
        this.ERPOrderOptions.ERPOrderList = res.data.result.item.items
        this.ERPOrderOptions.total = res.data.result.item.totalCount
      }
    },
    // 关闭确认订单
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 确认订单列表修改订单状态
    async UpdateERPOrderStatus (messageStatus) {
      console.log(this.orderOptions)
      const res = await this.$http.post('/api/UpdateERPOrderStatus', {
        erpOrderID: this.orderOptions.erpOrderID,
        messageStatus: messageStatus,
        statusType: 'ConfirmStatus'
      })
      if (res && res.data.result.code === 200) {
        this.$message.success('确认订单完成')
        // 重新获取订单列表
        this.orderCurrentPage = 1
        const re = await this.getERPOrderListByPage()
        if (re.data.result.code === 200) {
          this.ERPOrderOptions.ERPOrderList = re.data.result.item.items
          console.log(re.data.result.item.items)
          this.ERPOrderOptions.total = re.data.result.item.totalCount
          for (let i = 0; i < this.ERPOrderOptions.ERPOrderList.length; i++) {
            if (
              this.ERPOrderOptions.ERPOrderList[i].erpOrderID ===
              this.orderOptions.erpOrderID
            ) {
              this.orderOptions = this.ERPOrderOptions.ERPOrderList[i]
            }
          }
          this.getOrderDetail(this.orderOptions)
        }

        this.queRenDialog = false
      } else {
        this.$message.success('确认订单失败，请检查网络')
      }
    },
    // 获取系统参数
    async getClientTypeList (type) {
      const res = await this.$http.post('/api/ServiceConfigurationList', {
        basisParameters: type
      })
      if (res.data.result.code === 200) {
        return res.data.result.item
      }
    },
    // 点击公司地址打开定位
    openMap(addr){
      this.companyAddr = addr
      this.companyAddrMapDialog = true
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
    // 打开添加好友或打开发起群聊
    showAddFriend(options) {
      this.showFriendVerification = null
      switch (options.text) {
        case '添加好友':
          this.selectUsers = []
          this.newFriendOptions = null
          this.friendApplication = null
          this.addFriendOptions = options
        break;
        case '发起群聊':
          this.showFriendVerification = null
          this.newFriendOptions = null
          this.friendApplication = null
          this.addFriendOptions = options
        break;
        case '新的好友':
          this.showFriendVerification = null
          this.addFriendOptions= null
          this.friendApplication = null
          this.newFriendOptions = options
        break;
        case '选择群聊':
          this.showFriendVerification = null
          this.addFriendOptions= null
          this.friendApplication = null
          this.newFriendOptions = options
          this.getGroupMessageList()
        break;
      }
      
    },
    // 评论
    async addComment () {
      let data
      if (this.pinglunTitle === '回复评论') {
        data = {
          noticeNumber: this.huifuPinglun.noticeNumber,
          interactionType: 'Reply',
          userName: this.userInfo.userInfo.linkman,
          comment: this.pinglunValue,
          replyCompanyID: this.replyToUserName
            ? this.huifuPinglun.replyCompanyID
            : this.huifuPinglun.companyID,
          replyToUser: this.replyToUserName
            ? this.huifuPinglun.replyToUser
            : this.huifuPinglun.createdBy,
          replyToUserName: this.replyToUserName || this.huifuPinglun.userName
        }
      } else {
        data = {
          noticeNumber: this.pinglunForm.bearNotice.noticeNumber,
          companyID: this.userInfo.userInfo.id,
          userName: this.userInfo.userInfo.linkman,
          interactionType: 'Comment',
          comment: this.pinglunValue
        }
      }
      const res = await this.$http.post('/api/CreateNoticeInteraction', data)
      if (res.data.result.code === 200) {
        this.skipCount = 1
        this.maxResultCount =
          this.dataList.length >= 100 ? 10 : this.dataList.length
        // this.getDataList()
        // 重新调用子路由查看公告
        this.$root.eventHub.$emit('UpdateFind')
        this.dialogPinglun = false
        this.$message.success('评论成功')
      }
      this.pinglunValue = ''
      this.pinglunTitle = ''
    },
    // 发送群聊点击后半部分公司事件
    driveCheckbox(item) {
      const list = this.$refs.multipleTable.value
      let flag = false
      for (let i = 0; i < list.length; i++) {
        if(list[i].id === item.id) {
          flag = true
          this.selectUsers.pop()
        }
      }
      if(!flag) {
        this.selectUsers.push(item)
        console.log(this.selectUsers);
      }
    },
    // 打开添加好友窗口
    openRootAddFriends() {
      this.friendApplication = null
      this.addFriendOptions = {
        text: '添加好友',
        isShowdialogVerification: true
      }
    },
    // 获取全部未读消息条数
    async getAllMessagesCount () {
      const res = await this.$http.post('/api/GetAllMessagesCount')
      if (res.data.result.code === 200) {
        this.infoCount = res.data.result.item
        console.log(this.infoCount)
      } else {
        this.$message.error(res.data.result.msg)
      }
    },
    // 获取群聊列表
    async getGroupMessageList() {
      const res = await this.$http.post('/api/GetMyGroupMessagePage', {
        skipCount: this.groupCurrentPage,
        maxResultCount: this.groupPageSize,
      })
      if(res.data.result.code === 200) {
        this.groupMessageList = res.data.result.item.items
        this.groupTotalCount = res.data.result.item.totalCount
      }
    },
    // 打开二级窗口
    openOneView(option) {
      this.oneViews = null
      this.twoViews = null
      this.$nextTick(()=>this.oneViews = option)
    },
    // 打开三级窗口添加好友
    openTwoView(option) {
      this.twoViews = null
      this.$nextTick(()=>this.twoViews = option)
    },
  },
  mounted () {
    this.activeFind = 2
    this.login()
    this.$store.commit('clearWsMsg') // 清空已读未读
    this.getNoticeUnreadTotal()
    this.getAllMessagesCount()
  },
  async created () {
    document.onclick = () => {
      this.isChehui = null
      this.isPaste = null
    }
    document.oncontextmenu = () => {
      this.isChehui = null
      this.isPaste = null
      return false
    }
    if (this.$route.query.id) {
      // 登录成功获取系统参数
      const Json = {}
      Json.MessageRestriction = await this.getClientTypeList(
        'MessageRestriction'
      )
      Json.UserRestrictions = await this.getClientTypeList('UserRestrictions')
      Json.NoticeRestrictions = await this.getClientTypeList(
        'NoticeRestrictions'
      )
      Json.CompanyRestrictions = await this.getClientTypeList(
        'CompanyRestrictions'
      )
      Json.PlatForm = await this.getClientTypeList('PlatForm')
      Json.packageManage = await this.getClientTypeList('packageManage')
      this.$store.commit('globalJson/setGlobalJson', Json)
      this.$router.push('/meInfo')
    }

    this.$set(
      this,
      'Json',
      this.$_.cloneDeep(this.$store.state.globalJson.Json)
    )
    this.imgAndVideoNum = Number(this.Json.NoticeRestrictions[4].itemCode)
  },
  watch: {
    // 监听订单长连接推送消息
    '$store.state.wsOrderMsg' (val) {
      this.orderSampleFrom = val
    },
    'signalROptions.client' (val) {
      if (!val) {
        console.log('已被迫下线，可刷新重新登录中')
        this.login();
      }
    },
    'showTypeOptions.showLiaotianType' (newVal) {
      if (newVal !== 'showLiaotianList' && this.rec) this.rec.close()
      if (newVal !== 'showLiaotianList' && this.$setWs.$ws) {
        this.$setWs.$ws.close()
        clearInterval(this.$setWs.timeoutID)
        clearTimeout(this.$setWs.serverTimeoutObj)
      }
    },
    visibleTXT (val) {
      if (!val) {
        this.TXTUrl = null
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
    .contentTwo {
      display: flex;
      justify-content: center;
      position: relative;
      flex-wrap: wrap;
      // 个人详情页样式
      .top,
      .bottom {
        width: 100%;
        height: 50%;
      }
      .top {
        background-color: #165af7;
      }
      .bottom {
        background-color: #eeeeed;
      }
      .personalInfo {
        position: absolute;
        top: 50px;
        width: 95%;
        // height: 700px;
        background-color: #fff;
        border-radius: 10px;
        padding: 30px 10px 30px 10px;
        box-sizing: border-box;
        .name {
          height: 80px;
          margin-top: 10px;
          display: flex;
          .text {
            flex: 2;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            align-self: center;
            p {
              font-size: 18px;
              width: 100%;
              font-weight: 500;
            }
            span {
              color: #4679f8;
            }
          }
          .img {
            flex: 1;
            @{deep} .myAvatar {
              width: 80px;
              height: 80px;
              border-radius: 50%;
              cursor: pointer;
              color: white;
              background-color: #165af7;
            }
          }
        }
        .floor {
          .companyRemark {
             @{deep} .el-textarea__inner {
              resize: none;
              box-sizing: border-box;
              padding-left:0;
              padding-right:0;
              font-size:16px;
              font-family: "Microsoft Yahei";
              background-color: #fff;
              border-color: #fff;
              color: #000;
             }
          }
          .title {
            color: #7e7e81;
            font-size: 14px;
            margin: 10px 0;
          }
          .myRemark{
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          p {
            padding-bottom: 10px;
          }
        }
        .send {
          margin-top: 20px;
          .sendInfo {
            background-color: #165af7;
            color: #fff;
            width: 80%;
            .sendIcon {
              font-size: 16px;
              vertical-align: middle;
            }
          }
        }
      }
      // 公司详情页样式
      .CompanyTop {
        background: url("~@/assets/images/bg.png") no-repeat;
        background-size: 100% 100%;
        width: 100%;
        height: 200px;
      }
      .CompanyBottom {
        width: 100%;
        height: 625px;
        background-color: #eeeeed;
      }
      .detailBox {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        overflow: auto;
        .CompanyDetail {
          margin: 100px auto 20px auto;

          width: 95%;
          background-color: #fff;
          border-radius: 10px;
          padding: 30px 10px 0 10px;
          box-sizing: border-box;
          .CompanyName {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 20px;
            .img {
              @{deep} .el-image {
                width: 80px;
                height: 80px;
                background-color: #165af7;
                color: #fff;
                border-radius: 50%;
              }
            }
          }
          .evaluation {
            font-size: 14px;
            margin-top: 5px;
            padding-bottom: 20px;
            .evaluationTitle {
              color: #89898a;
            }
            .tags {
              margin-top: 10px;
              width: 100%;
              .el-tag {
                margin: 5px;
                border-radius: 20px;
              }
            }
            .deleteTag {
              cursor: pointer;
            }
          }
        }
        .ContactInformation {
          width: 95%;
          margin: 0 auto;
          background-color: #fff;
          border-radius: 10px;
          padding: 30px 10px 20px 10px;
          box-sizing: border-box;
          .ContactItem {
            .title {
              color: #8d8d8e;
              font-size: 14px;
              padding-top: 5px;
            }
            .text {
              padding: 10px 0;
              width:100%;
              border-bottom: 1px solid #8d8d8e;
              .address{
                width:100%;
                cursor: pointer;
                &:hover{
                  color:#165af7;
                }
              }
            }
          }
          center {
            margin-top: 20px;
            .sendInfo {
              background-color: #165af7;
              color: #fff;
              width: 250px;
              .sendIcon {
                font-size: 16px;
                vertical-align: middle;
              }
            }
          }
        }
      }
      .list {
        height: 825px;
        width: 100%;
        position: relative;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        
      }
    }
    .contentThree {
      background-color: #fff;
      height: 827px;
      box-sizing: border-box;
      display: flex;
      position: relative;
      flex-direction: column;
      .datas {
        width: 100%;
        background-color: #fff;
        padding: 50px 10px;
        box-sizing: border-box;
        li {
          height: 50px;
          width: 100%;
          border: none;
          border-bottom: 1px solid #ccc;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .text {
            position: relative;
            .myAvatar {
              width: 42px;
              height: 42px;
              border-radius: 50%;
              background-color: #165af7;
              color: #fff;
            }
            input {
              border: none;
              width: 100px;
              text-align: right;
              outline: none;
            }
            .upLoad {
              border: 1px solid #000;
              cursor: pointer;
              width: 42px;
              height: 42px;
              opacity: 0;
              position: absolute;
              right: 0;
              top: 0;
              border-radius: 50%;
              cursor: pointer;
            }
          }
        }
      }
      .send {
        margin-top: 50px;
        .sendInfo {
          background-color: #165af7;
          color: #fff;
          width: 250px;
          .sendIcon {
            font-size: 16px;
            vertical-align: middle;
          }
        }
      }
      // 公司详情样式
      // 公司详情页样式
      .CompanyTop {
        background: url("~@/assets/images/bg.png") no-repeat;
        background-size: 100% 100%;
        width: 100%;
        height: 200px;
      }
      .CompanyBottom {
        width: 100%;
        height: 625px;
        background-color: #eeeeed;
      }
      .detailBox {
        position: absolute;
        width: 100%;
        height: 825px;
        left: 0;
        top: 0;
        overflow: auto;
        .CompanyDetail {
          margin: 100px auto 20px auto;
          width: 95%;
          background-color: #fff;
          border-radius: 10px;
          padding: 30px 10px 0 10px;
          box-sizing: border-box;
          .CompanyName {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .img {
              @{deep} .el-image {
                width: 80px;
                height: 80px;
                background-color: #165af7;
                color: #fff;
                border-radius: 50%;
              }
            }
          }
          .evaluation {
            font-size: 14px;
            margin-top: 5px;
            padding-bottom: 20px;
            .evaluationTitle {
              color: #89898a;
            }
            .tags {
              margin-top: 10px;
              width: 100%;
              .el-tag {
                margin: 5px;
                border-radius: 20px;
              }
            }
          }
        }
        .ContactInformation {
          width: 95%;
          margin: 0 auto;
          background-color: #fff;
          border-radius: 10px;
          padding: 30px 10px 20px 10px;
          box-sizing: border-box;
          .ContactItem {
            .title {
              color: #8d8d8e;
              font-size: 14px;
              padding-top: 5px;
            }
            .text {
              padding: 10px 0;
              border-bottom: 1px solid #8d8d8e;
              width:100%;
              .address{
                width:100%;
                cursor: pointer;
                &:hover{
                  color:#165af7;
                }
              }
            }
          }
          center {
            margin-top: 20px;
            .sendInfo {
              background-color: #165af7;
              color: #fff;
              width: 250px;
              .sendIcon {
                font-size: 16px;
                vertical-align: middle;
              }
            }
          }
        }
      }
      @{deep} .el-tabs__header {
        border: 1px solid #dcdfe6;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12),
          0 0 6px 0 rgba(0, 0, 0, 0.04);
      }
      @{deep} .el-tabs__header,
      @{deep} .is-top,
      @{deep} .el-tabs__nav-scroll {
        height: 50px;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #f6f9ff;
        @{deep} .el-tabs__item {
          display: flex;
          justify-content: center;
          border: none;
        }
      }
      @{deep}
        .el-tabs--border-card
        > .el-tabs__header
        .el-tabs__item.is-active {
        color: #409eff;
        background-color: #fff;
      }
      @{deep} .el-tabs--border-card > .el-tabs__content {
        display: flex;
        @{deep} .el-tab-pane {
          flex: 1;
          box-sizing: border-box;
          padding: 10px;
          display: flex;
          flex-direction: column;
        }
      }
      @{deep} .myTables {
        @{deep} .el-table__body-wrapper::-webkit-scrollbar {
          /*width: 0;宽度为0隐藏*/
          width: 0;
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
    // 添加好友
    .addFriends{
      width: 32%;
      height: 827px;
      border: 1px solid #aaa;
      box-sizing: border-box;
      .topLayout{
        height: 50px;
        text-align: center;
        line-height: 50px;
        border-bottom: 1px solid #f5f5f5;
      }
      .searchBox {
        background-color: #fff;
        box-sizing: border-box;
        padding: 0 10px;
        height: 60px;
        display: flex;
        align-items: center;
        .inputBox{
          flex: 1;
          background: #F5F5F5;
          border-radius: 20px;
          display: flex;
          justify-content: space-between;
          @{deep} .searchInput{
            input.el-input__inner {
              background-color: transparent;
              border: none;
            }
          }
          .el-button{
            background-color: #165AF7;
          }
        }
      }
      .contentList{
        width: 100%;
        height: calc(100% - 110px);
        overflow-x: hidden;
        overflow-y: scroll;
        &::-webkit-scrollbar {
          display: none;
        }
        .itemBox{
          height: 60px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 10px;
          box-sizing: border-box;
          .left{
            flex: 1;
            display: flex;
            align-items: center;
            .icon{
              width: 40px;
              .el-image{
                width: 40px;
                height: 40px;
                img{
                  width: 40px;
                  height: 40px;
                }
              }
            }
            .nameBox{
              height: 40px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              .name{
                color: #1B1B1B;
                width: 200px;
                white-space:nowrap;
                overflow:hidden;
                text-overflow:ellipsis;
              }
              .company{
                font-size: 12px;
                width: 200px;
                color: #165AF8;
                white-space:nowrap;
                overflow:hidden;
                text-overflow:ellipsis;
              }
            }
          }
          .right{
            .el-button{
              background-color: #165af8;
              width: 80px;
            }
          }
        }
      }
      .footer{
        height: 60px;
        padding: 5px 10px;
        box-sizing: border-box;
        .footerBox{
          height: 35px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .totalCount{
            font-size: 12px;
            color: #165AF8;
            flex: 1;
          }
          .footerBtn{
            .el-button{
            color: #999;
            background-color: #f5f5f5;
            border: none;
              &.active{
                background-color: #165AF8;
                color: #fff;
              }
            }
          }
        }
      }
      .myCheckBox {
        height: calc(100% - 171px);
        overflow: auto;
        .item{
          height: 60px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          @{deep} .el-checkbox {
            flex: 1;
            display: flex;
            align-items: center;
            padding: 0 20px;
            .el-checkbox__input{
              border-radius: 50%;
            }
            .el-checkbox__label,.el-checkbox__input{
              display: flex;
              font-size: 16px;
              color: #1B1B1B;
              align-items: center;
              .el-image {
              transition: all 0.5s;
              width: 40px;
              height: 40px;
              margin-right: 10px;
              border-radius: 50%;
              background-color: #165af7;
              color: white;
              }
            }
            
            &:hover {
              @{deep} .el-image {
                -webkit-transform: scale(1.1);
                -moz-transform: scale(1.1);
                -ms-transform: scale(1.1);
                transform: scale(1.1);
              }
            }
            .el-checkbox__label,
            .is-checkbox,
            .el-checkbox__inner {
              display: flex;
              align-items: center;
              border-radius: 50%;
            }
          }
          .companyName{
            font-size: 12px;
            height: 40px;
            line-height: 40px;
            width: 100px;
            color: #666666;
            text-align: right;
            padding-right: 20px;
            cursor: pointer;
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;
          }
        }
      }
      // 好友验证
      &.bgClass{
        background-color: #f6f6f6;
        &.addFriendsDialog{
          width: 100%;
          max-height: 400px;
        }
      }
      .topLayoutTwo{
        display: flex;
        height: 50px;
        align-items: center;
        justify-content: space-between;
        background-color: #fff;
        border-bottom: 1px solid #f5f5f5;
        box-sizing: border-box;
        padding: 0 10px;
        .item{
          flex: 1;
          text-align: center;
          &.itemBtn{
            text-align: right;
            .el-button{
              background-color: #165af7;
            }
          }
        }
      }
      .line{
        height: 40px;
        line-height: 40px;
        padding: 0 10px;
        font-size: 14px;
        color: #999;
      }
      @{deep} .roleConText{
        font-size: 16px;
        .el-textarea__inner{
          border: none;
          outline: none;
          padding: 5px 10px;
        }
      }
      @{deep} .cateFriends{
        width: 100%;
        font-size: 16px;
        input{
          border: none;
          outline: none;
        }
      }
    }
    // 新的好友
    .newFriends{
      width: 32%;
      height: 827px;
      border: 1px solid #aaa;
      color: #333;
      box-sizing: border-box;
      .topLayout{
        padding: 0 10px;
        display: flex;
        line-height: 50px;
        background-color: #fff;
        border-bottom: 1px solid #f5f5f5;
        align-items: center;
        justify-content: space-between;
        span{
          flex: 1;
          &:nth-of-type(2){
            text-align: center;
          }
          &:nth-of-type(3) {
            text-align: right;
            font-size: 12px;
            color: #666666;
            span{
              cursor: pointer;
            }
          }
        }
      }
      .newFriendsContentWrap{
        height: calc(100% - 60px);
        .line{
        height: 20px;
        background-color: #f5f5f5;
      }
      .contentTitle{
        padding: 10px;
        font-size: 14px;
      }
      .contentListTwo{
        width: 100%;
        height: calc(100% - 90px);
        overflow-x: hidden;
        overflow-y: scroll;
        &::-webkit-scrollbar {
          display: none;
        }
        .item{
          height: 60px;
          padding: 0 10px;
          display: flex;
          align-items: center;
          border: none;
          width: 100%;
          box-sizing: border-box;
          .el-image{
            width: 40px;
            height: 40px;
            img{
              width: 40px;
              height: 40px;
            }
          }
          .name{
            color: #1b1b1b;
            margin-left: 10px;
          }
          .count{
            color: #999999;
          }
        }
      }
      .contentList{
        width: 100%;
        height: calc(100% - 90px);
        overflow-x: hidden;
        overflow-y: scroll;
        &::-webkit-scrollbar {
          display: none;
        }
        .itemBox{
          height: 60px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 10px;
          box-sizing: border-box;
          .left{
            flex: 1;
            display: flex;
            align-items: center;
            .icon{
              width: 40px;
              .el-image{
                width: 40px;
                height: 40px;
                img{
                  width: 40px;
                  height: 40px;
                }
              }
            }
            .nameBox{
              height: 40px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              .name{
                color: #1B1B1B;
                width: 200px;
                white-space:nowrap;
                overflow:hidden;
                text-overflow:ellipsis;
              }
              .company{
                font-size: 12px;
                width: 200px;
                color: #165AF8;
                white-space:nowrap;
                overflow:hidden;
                text-overflow:ellipsis;
              }
            }
          }
          .right{
            .el-button{
              background-color: #165af8;
              width: 80px;
            }
            .text{
              display: block;
              font-size: 14px;
              width: 80px;
              text-align: center;
              color: #999999;
            }
          }
        }
      }
      .searchBox {
        background-color: #fff;
        box-sizing: border-box;
        padding: 0 10px;
        height: 60px;
        display: flex;
        align-items: center;
        .inputBox{
          flex: 1;
          background: #F5F5F5;
          border-radius: 20px;
          display: flex;
          justify-content: space-between;
          @{deep} .searchInput{
            input.el-input__inner {
              background-color: transparent;
              border: none;
            }
          }
          .el-button{
            background-color: #165AF7;
          }
        }
      }
      .footer{
        height: 40px;
        background-color: #fff;
      }
      }
      
      &.bgClass {
        background: #F5F5F5;
        .topBox{
            background-color:#fff;
            padding-bottom:10px;
            .nameBox{
            height: 60px;
            display: flex;
            align-items: center;
            padding: 0 10px;
            .el-image{
              width: 40px;
              height: 40px;
              border-radius: 50%;
              margin-right: 10px;
            }
            .name {
              max-width: 300px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow:ellipsis;
            }
          }
          .infoContent{
            margin: 10px;
            margin-bottom: 0;
            padding: 10px;
            background-color: #F2F2F2;
            border-radius: 5px;
            .name{
              color: #999999;
              height: 100%;
            }
            .info{
              color: #666666;
            }
          }
        }
        .remarksBox {
          margin-top: 20px;
          height: 120px;
          background-color: #fff;
          display: flex;
          flex-direction: column;
          .remark,.isLookMyFind{
            flex: 1;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            padding: 0 10px;
          }
          .isLookMyFind{
            border-top: 1px solid #f5f5f5;
            justify-content: space-between;
          }
        }
        .source{
          margin-top: 20px;
          height: 60px;
          display: flex;
          box-sizing: border-box;
          padding: 0 10px;
          justify-content: space-between;
          align-items: center;
          background-color: #fff;
          .isAdd{
            font-size: 12px;
            color: #999;
          }
        }
        .sub{
          margin-top: 20px;
          height: 60px;
          color: #6C96F8;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #fff;
        }
      }
    }
  }
}

@{deep} .TXTClass {
  .el-dialog {
    height: 840px;
    color: red;
    overflow: auto;
    position: relative;
    .el-dialog__body {
      max-height: 650px;
      width: 600px;
      margin: 0 auto;
      border: 2px solid rgb(231, 231, 231);
      overflow-x: hidden;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .el-dialog__footer {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%);
    }
  }
}
.btnLists {
  padding: 20px 0;
  display: flex;
  justify-content: center;
}
@{deep} .yesOrderTitle {
  display: flex;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}
.querenDialog {
  font-size: 16px;
  .title {
    color: #165af7;
    font-weight: bold;
  }
  .titleText,
  .title {
    padding-bottom: 20px;
    color: black;
  }
  .btns {
    .blueBtn {
      color: #165af7;
      border-color: #165af7;
      &.activeBlue {
        background-color: #165af7;
        color: white;
      }
    }
    .orangeBtn {
      color: #f56024;
      border-color: #f56024;
      &.activeOrange {
        background-color: #f56024;
        color: white;
      }
    }
    .activeGray {
      background-color: #5a5a5a;
      color: white;
    }
  }
}
.companyAddrMapBox{
  height:500px;
}
</style>
