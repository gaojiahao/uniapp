
<template>
<div class="wrapBox">
        <h3 class="infoListTitle" style="background-color: #fff;">
          {{ showTypeOptions.sampleFrom || ERPOrderTitle }}
          <span style="margin-left:20px;font-size:14px;">
            (共
            <strong style="color:red;">{{ ERPOrderOptions.total }}</strong> 条)
          </span>
        </h3>
        <div
          class="xinde"
          v-show="
            (orderSampleFrom &&
              orderSampleFrom.SampleFrom &&
              orderSampleFrom.SampleFrom.toLowerCase()) === (showTypeOptions.sampleFrom && showTypeOptions.sampleFrom.toLowerCase())">
          <span
            class="xindeInfo"
            @click="resetCompanyList"
            >您有新的消息通知</span
          >
        </div>
        <div class="infoOrderList" v-infinite-scroll="orderLoad">
          <template
            v-if="
              ERPOrderOptions.ERPOrderList &&
                ERPOrderOptions.ERPOrderList.length
            "
          >
            <div v-for="(item, i) in ERPOrderOptions.ERPOrderList" :key="i">
              <center>
                <span class="date">{{
                  item.createdOn && item.createdOn.replace(/T/, " ")
                }}</span>
              </center>
              <div class="infoOrder" @click="openOrderDetail(item)">
                <div class="orderState">
                  <div class="title">
                    {{
                      $store.state.userInfo.commparnyList[0].companyType ==
                      "Exhibition"
                        ? item.toCompanyName + "：" + item.messageTitle
                        : $store.state.userInfo.commparnyList[0].companyType ==
                          "Supplier"
                        ? item.fromCompanyName + "：" + item.messageTitle
                        : item.messageModel === '7'
                        ? item.toCompanyName + "：" + item.messageTitle
                        : item.fromCompanyName + "：" + item.messageTitle
                    }}
                  </div>
                  <el-tag
                    :class="{ red: item.orderStatus === '0' }"
                    :type="
                      item.orderStatus === '9'
                        ? 'success'
                        : item.orderStatus === '1'
                        ? 'danger'
                        : item.orderStatus === '99'
                        ? 'info'
                        : ''
                    "
                    effect="dark"
                  >
                    <i
                      :class="{
                        wanchengIcon: item.orderStatus === '9',
                        weichakanIcon: item.orderStatus === '0',
                        weiquerenIcon: item.orderStatus === '1',
                        yiquxiaoIcon: item.orderStatus === '99'
                      }"
                    ></i>
                    {{ item | myState }}
                  </el-tag>
                </div>
                <div class="txtWrap">
                  <p>
                    <span class="title">客户名称：</span>
                    {{ item.client_na }}
                  </p>
                  <p>
                    <span class="title">消息时间：</span>
                    {{ item.createdOn && item.createdOn.replace(/T/, " ") }}
                  </p>
                  <p>
                    <span class="title">本次代号：</span>
                    {{ item.the_nu }}
                  </p>
                  <p class="remark">
                    <span class="title">备注：</span>
                    {{ item.pushContent }}
                  </p>
                </div>
                <div class="btnList">
                  <div class="box" v-if="item.orderType === 'Sample'">
                    <el-button round size="mini">查看详情</el-button>
                  </div>
                  <div class="box" v-else-if="item.orderType === 'OrderOffer'">
                    <el-button
                      type="success"
                      round
                      size="mini"
                      v-show="
                        !item.confirmStatus &&
                          (item.messageExt === '3' ||
                            item.messageExt === '5' ||
                            item.messageExt === '11')
                      "
                      @click.stop="configOrder(item)"
                      >确认完成</el-button
                    >
                    <el-button round size="mini">查看详情</el-button>
                    <el-button
                      type="primary"
                      round
                      size="mini"
                      @click.stop="orderSend(item)"
                      >立即沟通</el-button
                    >
                  </div>
                </div>
              </div>
            </div>
            <center style="padding-top:10px;">
              <i
                class="el-icon-loading"
                v-show="orderLoadText === '加载中...'"
              ></i>
              {{ orderLoadText }}
            </center>
          </template>
          <div v-else class="zanwushuju1"></div>
        </div>
</div>
</template>

<script>
export default {
  props: ['options'],
  data () {
    return {
      ERPOrderTitle: '厂商业务列表',
      orderSampleFrom: null,
      showTypeOptions: {
        showType: null,
        sampleFrom: null,
        showLiaotianType: null,
        showOrderDetail: false,
        isShowOrderDetail: true
      },
      ERPOrderOptions: {
        ERPOrderList: null,
        total: 0
      }
    }
  },
  methods: {
    // 下拉加载更多订单
    async orderLoad () {
      this.orderLoadText = '加载中...'
      if (
        this.ERPOrderOptions.ERPOrderList &&
        this.ERPOrderOptions.ERPOrderList.length < this.ERPOrderOptions.total
      ) {
        this.orderCurrentPage++
        const res = await this.getERPOrderListByPage()
        if (res.data.result.code === 200) {
          this.ERPOrderOptions.ERPOrderList = this.ERPOrderOptions.ERPOrderList.concat(
            res.data.result.item.items
          )
          this.ERPOrderOptions.total = res.data.result.item.totalCount
        }
      } else {
        this.orderCurrentPage = 1
        this.orderLoadText = '人家也是有底线滴'
      }
    },
    // 打开订单详情-----------------------------------------------------------------------------------------------------------------
    async openOrderDetail (item) {
      this.orderOptions = item
      this.activeName = item.messageExt === '0' ? 'first' : 'last'
      const res = await this.getOrderDetail(item) // 获取订单详情
      this.getOrderDetailTotal(item) // 获取订单详情合计
      if (res.data.result.code === 200) {
        this.orderDetailList = res.data.result.item.items
        this.orderDetailTotal = res.data.result.item.totalCount
      }
      // 重新获取列表刷新状态
      this.orderCurrentPage = 1
      const re = await this.getERPOrderListByPage()
      if (re.data.result.code === 200) {
        this.ERPOrderOptions.ERPOrderList = re.data.result.item.items
        this.ERPOrderOptions.total = re.data.result.item.totalCount
        for (let i = 0; i < this.ERPOrderOptions.ERPOrderList.length; i++) {
          if (
            this.ERPOrderOptions.ERPOrderList[i].erpOrderID ===
            this.orderOptions.erpOrderID
          ) {
            this.orderOptions = this.ERPOrderOptions.ERPOrderList[i]
          }
        }
      }
      this.$root.eventHub.$emit('resetCompany')
      console.log(this.orderOptions)
      this.showTypeOptions.isShowOrderDetail = true
      this.showTypeOptions.showOrderDetail = true
      this.showTypeOptions.showLiaotianType = null
      this.isGroupNumber = false
      this.showPersonalNumber = false
      this.showSampleSelection = false
    },
    // 点击公司订单列表新的消息
    async resetCompanyList () {
      this.$store.commit('clearWsOrderMsg')
      // 刷新列表
      this.orderCurrentPage = 1
      const res = await this.getERPOrderListByPage()
      if (res.data.result.code === 200) {
        this.ERPOrderOptions.ERPOrderList = res.data.result.item.items
        this.ERPOrderOptions.total = res.data.result.item.totalCount
      }
    },
    // 查询订单业务通知
    async getERPOrderListByPage () {
      const fd = {
        skipCount: this.orderCurrentPage,
        maxResultCount: this.orderPageSize
      }
      if (this.showTypeOptions.sampleFrom !== null) { fd.sampleFrom = this.showTypeOptions.sampleFrom }
      if (this.showTypeOptions.CompanyNumber !== null) { fd.CompanyNumber = this.showTypeOptions.CompanyNumber }
      if (this.showTypeOptions.ReadStatus !== null) { fd.ReadStatus = this.showTypeOptions.ReadStatus }
      if (this.showTypeOptions.isToCompany !== null) { fd.isToCompany = this.showTypeOptions.isToCompany }
      return await this.$http.post('/api/GetERPOrderListByPage', fd)
    },
    // 确认订单
    async configOrder (val) {
      this.orderOptions = val
      this.queRenDialog = true
    },
    // 点击订单|订单详情立即沟通
    async orderSend (item, value) {
      this.$store.commit('clearWsMsg')
      this.MessageUnreadCount = null
      this.orderItemsOptions = item
      this.orderItemOptions = value
      const res = await this.$http.post('/api/GetPersonnelListByERPOrderNumber', {
        orderNumber: item ? item.orderNumber : this.orderOptions.orderNumber
      })
      if (res.data.result.code === 200) {
        if (res.data.result.item.length < 1) {
          this.$message.error('该用户未注册')
          return false
        } else {
          this.showPersonalNumber = false
          this.isGroupNumber = false
          this.signalROptions.value = null
          this.signalROptions.attachment = null
          this.signalROptions.showmsg = []
          this.signalROptions.uid = ''
          this.signalROptions.name = item
            ? res.data.result.item[0].companyName
            : this.$store.state.userInfo.commparnyList[0].companyType ===
              'Exhibition'
              ? value.supplierPersonnelName
              : value.exhibitionPersonnelName
          this.signalROptions.isGroup = !!item
          this.signalROptions.msgType = 'Text'
          this.signalROptions.orderNumber = item
            ? item.orderNumber
            : this.orderOptions.orderNumber
          this.signalROptions.groupNumber = null
          this.signalROptions.toUserID = item
            ? res.data.result.item[0].companyName
            : this.$store.state.userInfo.commparnyList[0].companyType ===
              'Exhibition'
              ? value.supplierPersonnelID
              : value.exhibitionPersonnelID
          this.signalROptions.toCompanyID = item
            ? res.data.result.item[0].companyName
            : this.$store.state.userInfo.commparnyList[0].companyType ===
              'Exhibition'
              ? value.supplierId
              : value.exhibitionId

          this.showTypeOptions.isShowOrderDetail = false
          this.CompanyDetail = []
          console.log(this.signalROptions.groupNumber)
          try {
            this.addChannel() // 加入深网频道
          } catch (error) {
            this.login()
            this.$message.warning('断线重连成功')
          }
          const re = await this.getInstantMessageByNumber()
          if (re.data.result.code === 200) {
            this.signalROptions.showmsg = re.data.result.item.items
            this.chatHistoryTotal = re.data.result.item.totalCount
          } else {
            this.personalDetail = []
          }
        }
      }
    }
  },
  created () {

  },
  mounted () {

  },
  watch: {
    // 监听订单长连接推送消息
    '$store.state.wsOrderMsg' (val) {
      this.orderSampleFrom = val
    }
  }
}
</script>
<style scoped lang='less'>
@deep: ~">>>";
.wrapBox{
  height: 825px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  position: relative;
  flex-direction: column;
  .infoListTitle {
    min-height: 50px !important;
    background-color: #f6f6f6;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
  }
  .xinde {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border-top:1px solid #ccc;
    text-align:center;
    .xindeInfo{
      border-radius: 30px;
      background-color:#f8f8f8;
      color:#00b94b;
      padding:8px 30px;
      cursor: pointer;
    }
  }
  .infoOrderList {
        flex: 1;
        overflow: auto;
        padding: 0 10px 10px 10px;
        font-size: 14px;
        box-sizing: border-box;
        background-color: #f5f5f5;
        /** 单独为横向和竖向设置滚动条 **/
        overflow-x: none;
        overflow-y: auto;
        &::-webkit-scrollbar {
          display: none;
        }
        div {
          center {
            margin: 20px 0;
            .date {
              height: 24px;
              width: 156px;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: #dadada;
              color: #ffffff;
            }
          }
        }
        .infoOrder {
          background-color: #fff;
          box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.14);
          border-radius: 10px;
          margin-top: 10px;
          padding: 0 10px;
          .orderState {
            border-bottom: 1px solid #ccc;
            padding: 10px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .el-tag {
              display: flex;
              align-items: center;
              &.red {
                background-color: #f4382e;
                border-color: #f4382e;
              }
              .weiquerenIcon {
                margin-right: 10px;
                width: 14px;
                height: 14px;
                background: url("~@/assets/images/未确认.png") no-repeat center;
                background-size: contain;
              }
              .yiquxiaoIcon {
                margin-right: 10px;
                width: 14px;
                height: 14px;
                background: url("~@/assets/images/已取消.png") no-repeat center;
                background-size: contain;
              }
              .wanchengIcon {
                margin-right: 10px;
                width: 14px;
                height: 14px;
                background: url("~@/assets/images/完成.png") no-repeat center;
                background-size: contain;
              }
              .weichakanIcon {
                margin-right: 10px;
                width: 14px;
                height: 14px;
                background: url("~@/assets/images/未查看.png") no-repeat center;
                background-size: contain;
              }
            }
          }
          .txtWrap {
            padding-bottom: 5px;
            border-bottom: 1px solid #ccc;
            p {
              padding-top: 5px;
              &.remark {
                display: -webkit-box;
                word-break: break-all;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: pre-line;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
              }
              .title {
                color: #a0a0a0;
              }
            }
          }
          .btnList {
            padding: 10px 0;
            .box {
              float: right;
              button.el-button.el-button--default.el-button--mini.is-round {
                border-color: #66b1ff;
                color: #66b1ff;
              }
            }
            &::after {
              content: "";
              display: block;
              width: 0;
              height: 0;
              overflow: hidden;
              clear: both;
            }
          }
        }
      }
}

</style>
