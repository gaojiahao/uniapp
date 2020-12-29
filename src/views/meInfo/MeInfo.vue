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
          @showInfoListOrder="showInfoListOrder"
          @showCompany="showCompany"
          @showCompanyList="showCompanyList"
          @cancelSendGonggao="active2 = null"
          @showFindLiaotian="showFindLiaotian"
          @showOrderCompanyList="showOrderCompanyList"
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
          <router-link to="findList" class="li" @click.native="openOneView({componentName: 'myAnnouncement'})">
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
      <!-- 点击对应公司展示我的排号 -->
      <li
        class="contentThree"
        v-if="showOrderCompanyItem && $route.path === '/meInfo/infoList'"
      >
        <h3 class="infoListTitle" style="background-color: #fff;">
          {{ showOrderCompanyItem.client_na }}
          <span style="margin-left:20px;font-size:14px;">
            (共
            <strong style="color:red;">{{ ERPOrderOptions.total }}</strong> 条)
          </span>
        </h3>
        <div
          class="xinde"
          v-show="
            (this.orderSampleFrom &&
              this.orderSampleFrom.SampleFrom &&
              this.orderSampleFrom.SampleFrom.toLowerCase()) ==
              showTypeOptions.mySampleFrom.toLowerCase()
          "
          style="padding: 20px 0;border-top:1px solid #ccc;text-align:center;"
        >
          <span
            class="xindeInfo"
            style="border-radius:30px;backgroundColor:#f8f8f8;color:#00b94b;padding:8px 40px;cursor: pointer;"
            @click="resetPaihaoCompanyList"
            >您有新的消息通知</span
          >
        </div>
        <template
          v-if="
            showTypeOptions &&
              showTypeOptions.mySampleFrom &&
              showTypeOptions.mySampleFrom.toLowerCase() === 'hall' &&
              $store.state.userInfo.commparnyList &&
              $store.state.userInfo.commparnyList[0] &&
              $store.state.userInfo.commparnyList[0].companyType === 'Supplier'
          "
        >
          <div class="meCode" @click="openRowMeCode(personalNumber)">
            <div class="meCodeContent">
              <el-image
                class="meCodeImg"
                :src="showOrderCompanyItem.companyLogo"
                fit="cover"
              >
                <div
                  slot="placeholder"
                  class="image-slot"
                  style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;white-space: nowrap;"
                >
                  {{ showOrderCompanyItem.client_na }}
                </div>
                <div
                  slot="error"
                  class="image-slot"
                  style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;white-space: nowrap;"
                >
                  {{ showOrderCompanyItem.client_na }}
                </div>
              </el-image>
              <div class="codeTitle">我的排号:</div>
              <div class="code">{{ personalNumber.arr_nu }}</div>
            </div>
            <i class="el-icon-arrow-right"></i>
          </div>
          <div
            class="productList"
            v-if="
              $store.state.userInfo.commparnyList[0].companyType === 'Supplier'
            "
          >
            <span
              :class="{
                productIten: true,
                active: showSampleSelection === 'historySample'
              }"
              @click="openSampleList('historySample')"
            >
              <i class="historyIcon"></i>历史择样
            </span>
            <span
              :class="{
                productIten: true,
                active: showSampleSelection === 'rankingSample'
              }"
              @click="openSampleList('rankingSample')"
            >
              <i class="rankingIcon"></i>择样排行
            </span>
            <span
              :class="{
                productIten: true,
                active: showSampleSelection === 'myProduct'
              }"
              @click="openSampleList('myProduct')"
            >
              <i class="myProductIcon"></i>我的产品
            </span>
          </div>
        </template>
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
      </li>
      <!-- 公司订单列表 -->
      <li
        class="contentThree"
        v-if="showTypeOptions.showType === 'showInfoListOrder'"
      >
        <h3 class="infoListTitle" style="background-color: #fff;">
          {{ showTypeOptions.sampleFrom | ERPOrderTitle }}
          <span style="margin-left:20px;font-size:14px;">
            (共
            <strong style="color:red;">{{ ERPOrderOptions.total }}</strong> 条)
          </span>
        </h3>
        <div
          class="xinde"
          v-show="
            (this.orderSampleFrom &&
              this.orderSampleFrom.SampleFrom &&
              this.orderSampleFrom.SampleFrom.toLowerCase()) ==
              showTypeOptions.sampleFrom.toLowerCase()
          "
          style="padding: 20px 0;border-top:1px solid #ccc;text-align:center;"
        >
          <span
            class="xindeInfo"
            style="border-radius:30px;backgroundColor:#f8f8f8;color:#00b94b;padding:8px 40px;cursor: pointer;"
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
      </li>
      <!-- 择样订单详情 -->
      <li
        class="contentThree"
        v-show="showTypeOptions.isShowOrderDetail"
        v-if="
          showTypeOptions.showOrderDetail && $route.path === '/meInfo/infoList'
        "
      >
        <h3 class="infoListTitle">
          {{
            $store.state.userInfo.commparnyList[0].companyType === "Exhibition"
              ? orderOptions.toCompanyName
              : $store.state.userInfo.commparnyList[0].companyType === "Supplier"
              ? orderOptions.fromCompanyName
              : orderOptions.messageModel === '7'
              ? orderOptions.toCompanyName
              : orderOptions.fromCompanyName
          }}
        </h3>
        <div class="orderDetailState">
          <div class="title">
            {{
              $store.state.userInfo.commparnyList[0].companyType === "Exhibition"
                ? orderOptions.toCompanyName + "：" + orderOptions.messageTitle
                : $store.state.userInfo.commparnyList[0].companyType ==
                  "Supplier"
                ? orderOptions.fromCompanyName +
                  "：" +
                  orderOptions.messageTitle
                : orderOptions.messageModel === '7'
                ? orderOptions.toCompanyName + "：" + orderOptions.messageTitle
                : orderOptions.fromCompanyName +
                  "：" +
                  orderOptions.messageTitle
            }}
          </div>
          <!-- 订单详情状态 -->
          <el-tag
            :class="{ red: orderOptions.orderStatus === '0' }"
            :type="
              orderOptions.orderStatus === '9'
                ? 'success'
                : orderOptions.orderStatus === '1'
                ? 'danger'
                : orderOptions.orderStatus === '99'
                ? 'info'
                : ''
            "
            effect="dark"
          >
            <i
              :class="{
                wanchengIcon: orderOptions.orderStatus === '9',
                weichakanIcon: orderOptions.orderStatus === '0',
                weiquerenIcon: orderOptions.orderStatus === '1',
                yiquxiaoIcon: orderOptions.orderStatus === '99'
              }"
            ></i>
            {{ orderOptions | myState }}
          </el-tag>
        </div>
        <div
          class="mobile"
          v-show="
            $store.state.userInfo.commparnyList &&
              $store.state.userInfo.commparnyList[0] &&
              $store.state.userInfo.commparnyList[0].companyType === 'Supplier'
          "
        >
          <p>
            <span class="title">客户名称：</span>
            {{ orderOptions.client_na }}
          </p>
          <p>
            <span class="title">消息时间：</span>
            {{
              orderOptions.createdOn && orderOptions.createdOn.replace(/T/, " ")
            }}
          </p>
          <p>
            <span class="title">本次代号：</span>
            {{ orderOptions.the_nu }}
          </p>
          <p class="remark">
            <span class="title">备注：</span>
            {{ orderOptions.pushContent }}
          </p>
          <div class="btns">
            <el-button
              v-if="orderOptions.orderType === 'OrderOffer'"
              round
              size="small"
              type="primary"
              @click="orderSend(orderOptions)"
              >立即沟通</el-button
            >
            <el-button
              round
              size="small"
              @click="configOrder(orderOptions)"
              v-show="
                !orderOptions.confirmStatus &&
                  (orderOptions.messageExt === '3' ||
                    orderOptions.messageExt === '5' ||
                    orderOptions.messageExt === '11')
              "
            >
              确认完成
            </el-button>
          </div>
        </div>
        <el-tabs
          type="border-card"
          v-if="
            $store.state.userInfo.commparnyList &&
              $store.state.userInfo.commparnyList[0] &&
              $store.state.userInfo.commparnyList[0].companyType === 'Supplier'
          "
          v-model="activeName"
          class="orderDetailTitle"
        >
          <el-tab-pane
            :label="'历史记录(' + orderDetailTotal + '条)'"
            name="first"
          >
            <div class="headerTitle">
              <div class="headerItem code"><i></i> 出厂货号</div>
              <div class="headerItem client"><i></i>客户</div>
              <div class="headerItem date"><i></i>时间</div>
            </div>
            <div class="historyReco">
              <li v-for="(item, i) in orderDetailList" :key="i">
                <div class="fa_no">{{ item.fa_no }}</div>
                <div class="client_na">{{ item.client_na }}</div>
                <div class="createdOn">
                  {{
                    item.createdOn && item.createdOn.replace(/T[\s\S]+/gi, "")
                  }}
                </div>
              </li>
            </div>
          </el-tab-pane>
          <el-tab-pane
            :label="'当前记录(' + orderDetailTotal + '条)'"
            name="last"
          >
            <ul class="cureentReco">
              <li v-for="(item, i) in orderDetailList" :key="i">
                <div class="fa_no">
                  <i></i>
                  {{ item.fa_no }}
                </div>
                <div class="pr_na" v-if="item.messageExt === '0'">
                  {{ item.pr_na }}
                </div>
                <div class="btns" v-else-if="item.messageExt === '3'">
                  <el-button
                    @click="updateOrderConfirmStatus(item, 1)"
                    size="mini"
                    round
                    :class="{ activeGray: item.messageStatus === '1' }"
                    >不可带</el-button
                  >
                  <el-button
                    @click="updateOrderConfirmStatus(item, 0)"
                    size="mini"
                    round
                    :class="{
                      blueBtn: true,
                      activeBlue: item.messageStatus === '0'
                    }"
                    >可带</el-button
                  >
                </div>
                <div class="btns" v-else-if="item.messageExt === '5'">
                  <el-button
                    size="mini"
                    @click="updateOrderConfirmStatus(item, 1)"
                    round
                    :class="{ activeGray: item.messageStatus === '1' }"
                    >不可借</el-button
                  >
                  <el-button
                    @click="updateOrderConfirmStatus(item, 0)"
                    size="mini"
                    round
                    :class="{
                      orangeBtn: true,
                      activeOrange: item.messageStatus === '0'
                    }"
                    >可借</el-button
                  >
                </div>
                <div class="btns" v-else-if="item.messageExt === '11'">
                  <el-button
                    size="mini"
                    @click="updateOrderConfirmStatus(item, 2)"
                    round
                    :class="{ activeGray: item.messageStatus === '2' }"
                    >不可带</el-button
                  >
                  <el-button
                    @click="updateOrderConfirmStatus(item, 0)"
                    size="mini"
                    round
                    :class="{
                      blueBtn: true,
                      activeBlue: item.messageStatus === '0'
                    }"
                    >可带</el-button
                  >
                  <el-button
                    @click="updateOrderConfirmStatus(item, 1)"
                    size="mini"
                    round
                    :class="{
                      orangeBtn: true,
                      activeOrange: item.messageStatus === '1'
                    }"
                    >可借</el-button
                  >
                </div>
              </li>
            </ul>
          </el-tab-pane>
        </el-tabs>
        <div
          v-else
          class="orderDetailTitle2"
          @scroll="orderDetailListShowTotal"
          v-infinite-scroll="orderDetailListScroll"
        >
          <div class="mobile">
            <p>
              <span class="title">客户名称：</span>
              {{ orderOptions.client_na }}
            </p>
            <p>
              <span class="title">消息时间：</span>
              {{
                orderOptions.createdOn &&
                  orderOptions.createdOn.replace(/T/, " ")
              }}
            </p>
            <p>
              <span class="title">本次代号：</span>
              {{ orderOptions.the_nu }}
            </p>
            <p class="remark">
              <span class="title">备注：</span>
              {{ orderOptions.pushContent }}
            </p>
            <div class="btns">
              <el-button
                v-if="orderOptions.orderType === 'OrderOffer'"
                round
                size="small"
                type="primary"
                @click="orderSend(orderOptions)"
                >立即沟通</el-button
              >
              <el-button
                round
                size="small"
                @click="configOrder(orderOptions)"
                v-show="
                  !orderOptions.confirmStatus &&
                    (orderOptions.messageExt === 3 ||
                      orderOptions.messageExt === 5 ||
                      orderOptions.messageExt === 11)
                "
              >
                确认完成
              </el-button>
            </div>
          </div>
          <el-card
            class="productItem"
            v-for="item in orderDetailList"
            :key="item.id"
          >
            <div class="context">
              <div class="left">
                <el-image
                  class="myImage"
                  :src="item.imgUrl && item.imgUrl[0]"
                  fit="contain"
                ></el-image>
              </div>
              <div class="right">
                <p>{{ item.pr_na }}</p>
                <p>货号：{{ item.co_nu }}</p>
                <p>包装：{{ item.ch_pa }}</p>
                <p>
                  样品规格：{{ item.pr_le }}X{{ item.pr_wi }}X{{
                    item.pr_hi
                  }}(CM)
                </p>
                <p>
                  外箱规格：{{ item.ou_le }}X{{ item.ou_wi }}X{{
                    item.ou_hi
                  }}(CM)
                </p>
                <p>装箱量：{{ item.in_en }}/{{ item.ou_lo }}(PCS)</p>
                <p>
                  体积/材积：{{ item.bulk_feet }}(CBM)/{{
                    item.bulk_stere
                  }}(CUFT)
                </p>
                <p>净重/毛重：{{ item.ne_we }}/{{ item.gr_we }}(kg)</p>
                <p>
                  参考单价：<span class="price">{{
                    item.cu_de + item.fa_pr.toFixed(2)
                  }}</span>
                </p>
              </div>
            </div>
            <div class="contact">
              <div class="laiyuan">
                来源于：<span>{{
                  $store.state.userInfo.commparnyList &&
                  $store.state.userInfo.commparnyList[0] &&
                  $store.state.userInfo.commparnyList[0].companyType ==
                    "Exhibition"
                    ? item.supplierName
                    : item.exhibitionName
                }}</span>
              </div>
              <el-button
                round
                size="mini"
                type="primary"
                @click="orderSend(undefined, item)"
                >立即沟通</el-button
              >
            </div>
          </el-card>
        </div>
        <div class="totalBox">
          <transition name="el-zoom-in-bottom">
            <div v-show="drawer" class="transition-box">
              <h3>合计：</h3>
              <div class="items">
                <p>
                  箱数/数量：<span
                    >{{
                      orderDetailTotalCount && orderDetailTotalCount.sumtAmount
                    }}/{{
                      orderDetailTotalCount &&
                        orderDetailTotalCount.sumAmountOu_lo
                    }}(个)</span
                  >
                </p>
                <p>
                  体积/材积：<span
                    >{{
                      orderDetailTotalCount &&
                        orderDetailTotalCount.sumBulk_stere
                    }}(CBM)/{{
                      orderDetailTotalCount &&
                        orderDetailTotalCount.sumBulk_feet
                    }}(cuft)</span
                  >
                </p>
              </div>
              <div class="items">
                <p>
                  毛重/净重：<span
                    >{{
                      orderDetailTotalCount && orderDetailTotalCount.sumGr_we
                    }}/{{
                      orderDetailTotalCount && orderDetailTotalCount.sumNe_we
                    }}(kg)</span
                  >
                </p>
                <p>
                  出厂价/总销售价：<span
                    >{{
                      orderDetailTotalCount &&
                        orderDetailTotalCount.sumAmountFa_pr
                    }}/{{
                      orderDetailTotalCount && orderDetailTotalCount.sumFa_pr_pr
                    }}</span
                  >
                </p>
              </div>
            </div>
          </transition>
        </div>
      </li>
      <!-- 打开我的排号详情 -->
      <li class="contentThree" v-if="showPersonalNumber">
        <div class="personalNumberTitle">
          <p class="titleTXT">{{ showOrderCompanyItem.client_na }}排号</p>
          <div class="numberWarp" @click="openNumberList">
            <el-image
              class="myImg"
              :src="showOrderCompanyItem.companyLogo"
              fit="cover"
            >
              <div
                slot="placeholder"
                class="image-slot"
                style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;white-space: nowrap;"
              >
                {{ showOrderCompanyItem.client_na }}
              </div>
              <div
                slot="error"
                class="image-slot"
                style="width:100%;height:100%;display:flex;align-items:center;justify-content:left;white-space: nowrap;"
              >
                {{ showOrderCompanyItem.client_na }}
              </div>
            </el-image>
            <div>
              <div class="codeTitle">我的排号:</div>
              <div class="code">{{ personalNumber.arr_nu || 102435 }}</div>
            </div>
          </div>
        </div>
        <div class="personalNumberContent">
          <div class="currentCode">
            <div class="left">
              <span>当前排号</span>
            </div>
            <div class="right"></div>
          </div>
          <el-table
            class="currentCodeContent"
            :data="currentCodeList"
            style="width: 100%"
            height="200"
            :cell-style="timeStyle"
            :header-row-style="headerStyle"
            v-el-table-infinite-scroll="nextCurrentCodeContent"
          >
            <el-table-column
              prop="nego_nu"
              label="洽谈室"
              align="center"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="arr_nu"
              label="当前排号"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="hallcountage"
              label="平均等待时间"
              align="center"
            ></el-table-column>
          </el-table>
          <div class="buyer">
            <div class="left">
              <span>采购商</span>
            </div>
            <div class="right"></div>
          </div>
          <ul class="buyerContent" v-infinite-scroll="buyerContentLoad">
            <li
              class="buyerItem"
              v-for="(item, i) in customerVisitList"
              :key="i"
            >
              <div class="title">{{ item.client_na }}</div>
              <div class="date">
                {{
                  item.happenDate && item.happenDate.replace(/ [\s\S]+/gi, "")
                }}
              </div>
            </li>
          </ul>
        </div>
      </li>
      <!-- 打开历史择样列表 -->
      <li class="contentThree" v-if="showSampleSelection === 'historySample'">
        <div class="historyWrapContent">
          <p class="titleTXT">历史择样</p>
          <div class="bigHistoryHeaderTop">
            <div class="changshang">
              <div class="icon">
                <i></i>
              </div>
              <div class="text">厂商名称</div>
            </div>
            <div class="huohao">
              <div class="icon">
                <i></i>
              </div>
              <div class="text">出厂货号</div>
            </div>
            <div class="kehu">
              <div class="icon">
                <i></i>
              </div>
              <div class="text">客户</div>
            </div>
            <div class="shijian">
              <div class="icon">
                <i></i>
              </div>
              <div class="text">时间</div>
            </div>
          </div>
        </div>
        <ul
          class="historyWrapBody"
          v-infinite-scroll="addSampleSelectionList"
          infinite-scroll-disabled="activeAddSample"
        >
          <template v-if="sampleSelectionList && sampleSelectionList.length">
            <li v-for="(item, i) in sampleSelectionList" :key="i">
              <span>{{ item.ma_na }}</span>
              <span>{{ item.fa_no }}</span>
              <span>{{ item.client_na }}</span>
              <span>{{
                item.happendate && item.happendate.split(/ /)[0]
              }}</span>
            </li>
            <center
              style="padding:10px;backgroundColor:#f5f7fa;color:#aaa"
              v-show="showAddSampleTXT"
            >
              <i
                class="el-icon-loading"
                v-show="showAddSampleTXT === '加载中...'"
              ></i>
              {{ showAddSampleTXT }}
            </center>
          </template>
          <div v-else class="zanwushuju1"></div>
        </ul>
      </li>
      <!-- 打开择样排行列表 -->
      <li class="contentThree" v-if="showSampleSelection === 'rankingSample'">
        <div class="rankingWrapContent">
          <p class="titleTXT">择样排行</p>
          <div class="bigRankingHeaderTop">
            <div class="changshang">
              <div class="icon">
                <i></i>
              </div>
              <div class="text">厂商名称</div>
            </div>
            <div class="huohao">
              <div class="icon">
                <i></i>
              </div>
              <div class="text">出厂货号</div>
            </div>
            <div class="zeyangshu">
              <div class="icon">
                <i></i>
              </div>
              <div class="text">择样数</div>
            </div>
          </div>
        </div>

        <ul
          class="rankingWrapBody"
          v-infinite-scroll="addSampleSelectionList"
          infinite-scroll-disabled="activeAddSample"
        >
          <template v-if="sampleSelectionList && sampleSelectionList.length">
            <li v-for="(item, i) in sampleSelectionList" :key="i">
              <span class="item">{{ item.ma_na }}</span>
              <span class="item">{{ item.fa_no }}</span>
              <span class="item">{{ item.sumfa_no }}</span>
            </li>
            <center
              style="padding:10px;backgroundColor:#f5f7fa;color:#aaa"
              v-show="showAddSampleTXT"
            >
              <i
                class="el-icon-loading"
                v-show="showAddSampleTXT === '加载中...'"
              ></i>
              {{ showAddSampleTXT }}
            </center>
          </template>
          <div v-else class="zanwushuju1"></div>
        </ul>
      </li>
      <!-- 打开我的产品列表 -->
      <li class="contentThree" v-if="showSampleSelection === 'myProduct'">
         <h3 class="infoListTitle" style="background-color: #fff;">我的产品</h3>
        <div class="myProductSearch">
          <div class="inputBox">
            <el-input v-model="myProductSearchValue" @keyup.native.enter="myProductSearchEvent" clearable placeholder="请输入搜索内容"></el-input>
            <el-button type="primary" @click="myProductSearchEvent" round>搜索</el-button>
          </div>
        </div>
        <div class="myProductSearchTotalCountBox"><p></p><p class="myTotalCount"><span>{{sampleSelectionTotalCount}}</span>条产品</p> <p class="more"><i @click="checkMoreEvent" class="checkCube" v-show="isCheckCube"></i><i @click="checkMoreEvent" class="checkList"  v-show="!isCheckCube"></i></p></div>
        <ul class="myProductWrapBody" v-infinite-scroll="addSampleSelectionList"
          infinite-scroll-disabled="activeAddSample">
          <template v-if="sampleSelectionList && sampleSelectionTotalCount">
            <!-- 方格类型 -->
            <div class="itemBox" v-if="isCheckCube">
              <li class="itemCube"  v-for="(item, i) in sampleSelectionList" :key="i">
              <div class="imgItem">
                <el-image
                  fit="contain"
                  :src="item.imageUrl"
                  :key="item.id"
                  :preview-src-list="[
                    item.imageUrl &&
                      item.imageUrl.replace(/_SmallPic/, '_Photo')
                  ]"
                >
                  <div slot="placeholder" class="image-slot">
                    <img
                      class="errorImg"
                      src="~@/assets/images/imgError.jpg"
                      alt
                    />
                  </div>
                  <div slot="error" class="image-slot">
                    <img
                      class="errorImg"
                      src="~@/assets/images/imgError.jpg"
                      alt
                    />
                  </div>
                </el-image>
              </div>
              <div class="context">
                <h3 class="contextItem">{{ item.name }}</h3>
                <p class="contextItem"> 出厂货号：{{ item.fa_no }}</p>
                <p class="contextItem">参考单价：<span class="price">{{ item.cu_de + item.price }}</span> </p>
              </div>
            </li>
            </div>
            <!-- 列表类型 -->
            <div class="itemBox" v-else>
              <li class="itemList"  v-for="(item, i) in sampleSelectionList" :key="i">
              <div class="imgItemLeft">
                <el-image
                  fit="contain"
                  :src="item.imageUrl"
                  :key="item.id"
                  :preview-src-list="[item.imageUrl]"
                >
                  <div slot="placeholder" class="image-slot">
                    <img
                      class="errorImg"
                      src="~@/assets/images/imgError.jpg"
                      alt
                    />
                  </div>
                  <div slot="error" class="image-slot">
                    <img
                      class="errorImg"
                      src="~@/assets/images/imgError.jpg"
                      alt
                    />
                  </div>
                </el-image>
                <div class="date"><i></i> 2020-10-10</div>
              </div>
              <div class="context">
                <h3 class="contextItem productName">{{ item.name }}</h3>
                <p class="contextItem"> 出厂货号：{{ item.fa_no }}</p>
                <p class="contextItem"> 包装：{{ item.ch_pa }}</p>
                <p class="contextItem"> 样品规格：{{item.pr_le + " X " + item.pr_wi + " X " + item.pr_hi + "(CM)"}}</p>
                <p class="contextItem"> 外箱规格：{{ item.ou_le + " X " + item.ou_wi + " X " + item.ou_hi + "(CM)" }}(CM)</p>
                <p class="contextItem"> 装箱量：{{ item.in_en + "/" + item.ou_lo + "(PCS)" }}</p>
                <p class="contextItem"> 体积/材积：{{ item.bulk_stere + "(CBM)" + "/" + item.bulk_feet + "(CUFT)" }}</p>
                <p class="contextItem"> 毛重净重：{{ item.ne_we + "/" + item.gr_we + "(KG)" }}</p>
                <p class="contextItem"> 参考单价：<span class="price">{{ item.cu_de + item.price }}</span> </p>
              </div>
            </li>
            </div>
            <center
              style="padding:10px;backgroundColor:#f5f7fa;color:#aaa"
              v-show="showAddSampleTXT"
            >
              <i
                class="el-icon-loading"
                v-show="showAddSampleTXT === '加载中...'"
              ></i>
              {{ showAddSampleTXT }}
            </center>
          </template>
          <div v-else class="zanwushuju1"></div>
        </ul>
      </li>
      <!-- 查看对应联系公司详情 -->
      <li class="contentThree" v-if="active2 === 4">
        <div class="CompanyTop"></div>
        <div class="CompanyBottom"></div>
        <div class="detailBox">
          <div class="CompanyDetail" v-if="CompanyDetail">
            <div class="CompanyName">
              <div class="text">
                <p>
                  {{
                    CompanyDetail &&
                      CompanyDetail.orgCompany &&
                      CompanyDetail.orgCompany.companyName
                  }}
                </p>
              </div>
              <div class="img">
                <el-image
                  class="myAvatar"
                  :src="
                    CompanyDetail &&
                      CompanyDetail.orgCompany &&
                      CompanyDetail.orgCompany.companyLogo
                  "
                  fit="cover"
                >
                  <div
                    slot="error"
                    class="image-slot"
                    style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;white-space: nowrap;"
                  >
                    {{
                      CompanyDetail &&
                        CompanyDetail.orgCompany &&
                        CompanyDetail.orgCompany.companyName
                    }}
                  </div>
                </el-image>
              </div>
            </div>

            <div
              class="evaluation"
              v-if="CompanyDetail && CompanyDetail.isMain"
            >
              <p class="evaluationTitle">自身评价</p>
              <div class="tags">
                <template v-if="CompanyDetail && CompanyDetail.companyLabel">
                  <el-button
                    size="small"
                    round
                    icon="el-icon-edit"
                    @click="openAddTag"
                    >填写标签</el-button
                  >
                  <el-tag
                    class="deleteTag"
                    closable
                    :type="tagsType[i]"
                    v-for="(item, i) in CompanyDetail.companyLabel"
                    :key="i"
                    >{{ item.labelName }}</el-tag
                  >
                </template>
              </div>
            </div>
            <template v-else>
              <div class="evaluation">
                <p class="evaluationTitle">自身评价</p>
                <div class="tags">
                  <template v-if="CompanyDetail && CompanyDetail.companyLabel">
                    <template v-for="(item, i) in CompanyDetail.companyLabel">
                      <el-tag
                        v-if="!item.isCompany"
                        :type="tagsType[i]"
                        :key="i"
                        >{{ item.labelName }}</el-tag
                      >
                    </template>
                  </template>
                </div>
              </div>
              <div class="evaluation">
                <p class="evaluationTitle">我的评价</p>
                <div class="tags">
                  <el-button
                    size="small"
                    round
                    icon="el-icon-edit"
                    @click="openAddTag"
                    >填写标签</el-button
                  >
                  <template v-if="CompanyDetail && CompanyDetail.companyLabel">
                    <template v-for="(item, i) in CompanyDetail.companyLabel">
                      <el-tag
                        v-if="item.isCompany"
                        :type="tagsType[i]"
                        :key="i"
                        >{{ item.labelName }}</el-tag
                      >
                    </template>
                  </template>
                </div>
              </div>
            </template>
          </div>
          <div class="ContactInformation">
            <div class="ContactItem">
              <div class="title">电话</div>
              <div class="text">
                <span
                  v-if="
                    CompanyDetail &&
                      CompanyDetail.orgCompany &&
                      CompanyDetail.orgCompany.phoneNumber
                  "
                  >{{ CompanyDetail.orgCompany.phoneNumber }}</span
                >
              </div>
            </div>
            <div class="ContactItem">
              <div class="title">邮箱</div>
              <div class="text">
                <template
                  v-if="
                    CompanyDetail &&
                      CompanyDetail.orgCompany &&
                      CompanyDetail.orgCompany.e_mail
                  "
                  >{{ CompanyDetail.orgCompany.e_mail }}</template
                >
              </div>
            </div>
            <div class="ContactItem">
              <div class="title">地址</div>
              <div class="text">
                <template  v-if="CompanyDetail && CompanyDetail.orgCompany && CompanyDetail.orgCompany.address">
                   <div class="address el-icon-location-information"  @click="openMap(CompanyDetail.orgCompany)">
                     {{ CompanyDetail.orgCompany.address }}
                     </div>
                  </template>
              </div>
            </div>
            <center class="send">
              <el-button class="sendInfo" @click="companySend" round>
                <i class="el-icon-s-comment el-icon--left sendIcon"></i>
                立即沟通
              </el-button>
            </center>
          </div>
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
import elTableInfiniteScroll from 'el-table-infinite-scroll'
import BMapComponent from '@/components/map.vue'
import addFriendComponent from '@/components/addFriendComponent/addFriendComponent.vue'
import launchGroupChat from '@/components/launchGroupChat/launchGroupChat.vue'
import friendVerificationComponent from '@/components/friendVerificationComponent/friendVerificationComponent.vue'
import friendApplicationComponent from '@/components/friendApplicationComponent/friendApplicationComponent.vue'
import newFriendComponent from '@/components/newFriendComponent/newFriendComponent.vue'
import groupChatComponent from '@/components/groupChatComponent/groupChatComponent.vue'
import hallContactComponent from '@/components/hallContactComponent/hallContactComponent.vue'
import personalDataComponent from '@/components/personalDataComponent/personalDataComponent.vue'
import editPersonalDataComponent from '@/components/editPersonalDataComponent/editPersonalDataComponent.vue'
import personalChatComponent from '@/components/personalChatComponent/personalChatComponent.vue'
import myAnnouncement from '@/components/myAnnouncement/myAnnouncement.vue'
import sendNoticeComponent from '@/components/sendNoticeComponent/sendNoticeComponent.vue'
import companyBusinessComponent from '@/components/companyBusinessComponent/companyBusinessComponent.vue'
export default {
  directives: {
    'el-table-infinite-scroll': elTableInfiniteScroll
  },
  components: {
    bsTop,
    bsFooter,
    BMapComponent,
    ElImageViewer,
    companyBusinessComponent,
    addFriendComponent,
    launchGroupChat,
    friendVerificationComponent,
    friendApplicationComponent,
    newFriendComponent,
    groupChatComponent,
    hallContactComponent,
    personalDataComponent,
    editPersonalDataComponent,
    personalChatComponent,
    myAnnouncement,
    sendNoticeComponent
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
      myProductSearchValue: null,
      companyListPageSize: 20,
      companyListCurrentPage: 1,
      companyAddr: '',
      companyAddrMapDialog: false,
      orderItemOptions: null,
      orderDetailTotalCount: null,
      orderDetailCurrentPage: 1,
      orderDetailPageSize: 10,
      drawer: false,
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
      currentNumberPageSize: 10,
      currentNumberCurrentPage: 0,
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
      currentCodeList: [],
      customerVisitList: [],
      personalNumber: {
        arr_nu: 1024,
        historyNumbers: []
      },
      showPersonalNumber: false,
      showSampleSelection: false,
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
      ERPOrderOptions: {
        ERPOrderList: null,
        total: 0
      },
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
          this.isOrderShow = true
          // item ? (this.isOrderShow = false) : (this.isOrderShow = true);
          this.showTypeOptions.showLiaotianType = 'showLiaotianList'
        }
      }
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
    // 获取订单详情合计
    async getOrderDetailTotal ({
      orderType,
      erpOrderID,
      orderNumber,
      sampleNumber
    }) {
      let res
      if (orderType === 'Sample') {
        res = await this.$http.post('/api/SampleOrderTotal', {
          SampleNumber: orderNumber
        })
      } else {
        res = await this.$http.post('/api/OrderOfferTotal', {
          offerNumber: orderNumber
        })
      }
      if (res.data.result.code === 200) {
        this.orderDetailTotalCount = res.data.result.item
        console.log(this.orderDetailTotalCount)
      }
    },
    // 滚动显示总数
    orderDetailListShowTotal (e) {
      e.target.scrollTop ? (this.drawer = true) : (this.drawer = false)
    },
    // 订单详情滚动事件
    async orderDetailListScroll () {
      if (this.orderDetailTotal <= this.orderDetailPageSize) return false
      else {
        this.orderDetailCurrentPage++
        const res = await this.getOrderDetail(this.orderOptions) // 获取订单详情
        if (res.data.result.code === 200) {
          this.orderDetailList = this.orderDetailList.concat(
            res.data.result.item.items
          )
          this.orderDetailTotal = res.data.result.item.totalCount
        }
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
    // 聊天窗口列表事件
    isOrderShowEvent () {
      this.showTypeOptions.showLiaotianType = null
      this.isGroupNumber = false
      this.showTypeOptions.isShowOrderDetail = true
      this.isOrderShow = false
    },
    // 上传文件
    async upLoadFiles (file) {
      const fd = new FormData()
      fd.append('fileType', this.signalROptions.msgType)
      fd.append('fileName', file.name)
      fd.append('file', file)
      return await this.$http.post('/api/File/MessageUploadFile', fd)
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
    
    // 关闭订单聊天
    guanbiOrder () {
      this.isOrderShow = false
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
    // 点击公司业务打开订单列表
    async showInfoListOrder (val) {
      this.offDetail()
      this.showTypeOptions.showType = val.showType
      this.showTypeOptions.sampleFrom = val.sampleFrom
      this.showTypeOptions.CompanyNumber = null
      this.showTypeOptions.isToCompany = null
      this.showTypeOptions.ReadStatus = null
      const res = await this.getERPOrderListByPage()
      if (res.data.result.code === 200) {
        this.ERPOrderOptions.ERPOrderList = res.data.result.item.items
        this.ERPOrderOptions.total = res.data.result.item.totalCount
      }
    },
    // 打开公司排号公司的订单列表
    async showOrderCompanyList (item) {
      this.offDetail()
      const re = await this.getPersonalNumber(item)
      if (re.data.result.code === 200) {
        this.personalNumber = re.data.result.item
      }
      this.showOrderCompanyItem = item

      this.showTypeOptions.sampleFrom = null
      this.showTypeOptions.mySampleFrom = item.sampleFrom
      this.showTypeOptions.CompanyNumber = item.client_nu
      this.showTypeOptions.ReadStatus = '-1'
      this.showTypeOptions.isToCompany = item.isToCompany
      const res = await this.getERPOrderListByPage()
      if (res.data.result.code === 200) {
        this.ERPOrderOptions.ERPOrderList = res.data.result.item.items
        this.ERPOrderOptions.total = res.data.result.item.totalCount
      }
    },
    // 获取排号
    async getPersonalNumber (item) {
      return await this.$http.post('/api/PersonalNumber', {
        companyNumber: item.client_nu
      })
    },
    // 获取排号中的采购商
    async getCustomerVisit () {
      return await this.$http.post('/api/CustomerVisit', {
        companyNumber: this.showOrderCompanyItem.client_nu,
        skipCount: this.customerVisitCurrentPage,
        maxResultCount: this.customerVisitPageSize
      })
    },
    // 当前排号到底加载更多
    async nextCurrentCodeContent () {
      if (this.isNoCurrentNumber) {
        return
      }
      this.currentNumberCurrentPage++
      const res = await this.getCurrentNumber()
      if (res.data.result.code === 200) {
        this.currentCodeList = this.currentCodeList.concat(
          res.data.result.item
        )
      }
    },
    // 采购商下拉加载
    async buyerContentLoad () {
      if (this.isNoCustomerVisit) {
        return
      }
      this.customerVisitCurrentPage++
      const res = await this.getCustomerVisit()
      if (res.data.result.code === 200) {
        this.customerVisitList = this.customerVisitList.concat(
          res.data.result.item
        )
      }
    },
    // 获取当前排号
    async getCurrentNumber () {
      return await this.$http.post('/api/CurrentNumber', {
        companyNumber: this.showOrderCompanyItem.client_nu,
        pageSize: this.currentNumberPageSize,
        pageIndex: this.currentNumberCurrentPage
      })
    },
    // 下拉加载更多
    async addSampleSelectionList () {
      this.activeAddSample = true
      if(this.sampleSelectionTotalCount <= this.sampleSelectionPageSize) {
        this.showAddSampleTXT = '我也是有底线的'
        return false
      }
      this.showAddSampleTXT = '加载中...'
      let res
      switch (this.showSampleSelection) {
        case 'myProduct':
          this.mySampleSelectionCurrentPage++
          res = await this.getSampleSelectionList(this.showSampleSelection)
          if (
            res.data.result.code === 200 &&
            res.data.result.item.items.length > 0
          ) {
            this.sampleSelectionList = this.sampleSelectionList.concat(
              res.data.result.item.items
            )
            this.sampleSelectionTotalCount = res.data.result.item.totalCount
            this.activeAddSample = false
          } else {
            this.showAddSampleTXT = '我也是有底线的'
            this.activeAddSample = true
          }
          break
        default:
          this.sampleSelectionCurrentPage++
          res = await this.getSampleSelectionList(this.showSampleSelection)
          if (res.data.result.code === 200 && res.data.result.item.length > 0) {
            this.sampleSelectionList = this.sampleSelectionList.concat(
              res.data.result.item
            )
            this.activeAddSample = false
          } else {
            this.showAddSampleTXT = '我也是有底线的'
            this.activeAddSample = true
          }
          break
      }
    },
    // 获取 历史择样|择样排行|我的产品 列表
    async getSampleSelectionList (val) {
      let API
      switch (val) {
        case 'historySample':
          API = '/api/OrderOfferDetailHistoryPage'
          break
        case 'rankingSample':
          API = '/api/ProductRanking'
          break
        case 'myProduct':
          API = '/api/SupplierProduct'
          break
      }
      return await this.$http.post(API, {
        companyNumber: this.showOrderCompanyItem.client_nu,
        pageIndex:
          val === 'myProduct'
            ? this.mySampleSelectionCurrentPage
            : this.sampleSelectionCurrentPage,
        pageSize: this.sampleSelectionPageSize,
        keyword: this.myProductSearchValue,
      })
    },
    // 搜索我的产品
    async myProductSearchEvent () {
      const res = await this.getSampleSelectionList ('myProduct')
      if (res.data.result.code === 200) {
        this.sampleSelectionList = res.data.result.item.items
        this.sampleSelectionTotalCount = res.data.result.item.totalCount
      } else {
        this.$message.error(res.data.result.msg)
      }
    },
    // 打开 历史择样|择样排行|我的产品 列表
    async openSampleList (val) {
      this.showAddSampleTXT = null
      this.sampleSelectionList = []
      this.mySampleSelectionCurrentPage = 1
      this.sampleSelectionCurrentPage = 0
      const res = await this.getSampleSelectionList(val)
      if (res.data.result.code === 200) {
        switch (val) {
          case 'myProduct':
            this.sampleSelectionList = res.data.result.item.items
            this.sampleSelectionTotalCount = res.data.result.item.totalCount
            this.activeAddSample = false
            break
          default:
            this.sampleSelectionList = res.data.result.item
            this.activeAddSample = false
            break
        }
      } else {
        this.$message.error(res.data.result.msg)
      }
      this.showSampleSelection = val
      this.showPersonalNumber = false
      this.showTypeOptions.showOrderDetail = false
    },
    // 打开我的排号详情
    async openRowMeCode () {
      this.customerVisitCurrentPage = 1
      const currentNumberList = await this.getCurrentNumber()
      if (currentNumberList.data.result.code === 200) {
        if (!currentNumberList.data.result.item.length) {
          this.isNoCurrentNumber = true
        }
        this.currentCodeList = currentNumberList.data.result.item
      }
      const res = await this.getCustomerVisit()
      if (res.data.result.code === 200) {
        if (!res.data.result.item.length) {
          this.isNoCustomerVisit = true
        }
        this.customerVisitList = res.data.result.item
      }
      this.showPersonalNumber = true
      this.showSampleSelection = false
      this.showTypeOptions.showOrderDetail = false
    },
    // 弹出我的排号list
    openNumberList () {
      console.log(this.personalNumber)
      this.$alert(
        (this.personalNumber.historyNumbers &&
          this.personalNumber.historyNumbers.join(',')) ||
          '10,30,100,3023,2233',
        '排号',
        {
          confirmButtonText: '确定'
        }
      )
    },
    // 展开修改个人信息页面
    showInfo2 (val) {
      this.active2 = 2
      this.infoItem2 = val
    },
    // 打开修改个人信息详情页
    openEdit (id) {
      if (this.userInfo.userInfo.id === id) {
        this.active2 = 2
      }else {
        this.$message.error("不能修改别人的资料哦")
      }
    },
    /*
     * 时间戳显示为多少分钟前，多少天前的处理
     * console.log(dateDiff(1411111111111));  // 2014年09月19日
     */
    dateDiff (time) {
      let timestamp = Number(new Date(time))
      const arrTimestamp = (timestamp + '').split('')
      for (var start = 0; start < 13; start++) {
        if (!arrTimestamp[start]) {
          arrTimestamp[start] = '0'
        }
      }
      timestamp = arrTimestamp.join('') * 1

      var minute = 1000 * 60
      var hour = minute * 60
      var day = hour * 24
      var halfamonth = day * 15
      var month = day * 30
      var now = new Date().getTime()
      var diffValue = now - timestamp

      // 如果本地时间反而小于变量时间
      if (diffValue < 0) {
        return '不久前'
      }

      // 计算差异时间的量级
      var monthC = diffValue / month
      var weekC = diffValue / (7 * day)
      var dayC = diffValue / day
      var hourC = diffValue / hour
      var minC = diffValue / minute

      // 数值补0方法
      var zero = function (value) {
        if (value < 10) {
          return '0' + value
        }
        return value
      }

      // 使用
      if (monthC > 12) {
        // 超过1年，直接显示年月日
        return (function () {
          var date = new Date(timestamp)
          return (
            date.getFullYear() +
            '年' +
            zero(date.getMonth() + 1) +
            '月' +
            zero(date.getDate()) +
            '日'
          )
        })()
      } else if (monthC >= 1) {
        return parseInt(monthC) + '月前'
      } else if (weekC >= 1) {
        return parseInt(weekC) + '周前'
      } else if (dayC >= 1) {
        return parseInt(dayC) + '天前'
      } else if (hourC >= 1) {
        return parseInt(hourC) + '小时前'
      } else if (minC >= 1) {
        return parseInt(minC) + '分钟前'
      }
      return '刚刚'
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
          this.openOrderDetail(this.orderOptions)
          this.getOrderDetail(this.orderOptions)
        }

        this.queRenDialog = false
      } else {
        this.$message.success('确认订单失败，请检查网络')
      }
    },
    // 确认订单详情修改订单状态
    async updateOrderConfirmStatus (item, messageStatus) {
      const res = await this.$http.post('/api/UpdateOrderConfirmStatus', {
        OfferDetailId: item.id,
        messageStatus: messageStatus
      })
      let re
      switch (res.data.result.code) {
        case 200:
          this.$message.success('修改订单成功')
          // if (res.data.result.item.confirmStatus) {
          // }
          re = await this.getOrderDetail(this.orderOptions) // 获取订单详情
          if (re.data.result.code === 200) {
            this.orderDetailList = re.data.result.item.items
            this.orderDetailTotal = re.data.result.item.totalCount
          }
          break
        case 400:
          this.$message.error(res.data.result.msg)
          break
      }
    },
    // 确认订单
    async configOrder (val) {
      this.orderOptions = val
      this.queRenDialog = true
    },
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
    // 获取系统参数
    async getClientTypeList (type) {
      const res = await this.$http.post('/api/ServiceConfigurationList', {
        basisParameters: type
      })
      if (res.data.result.code === 200) {
        return res.data.result.item
      }
    },
    // 列样式
    timeStyle (column) {
      return 'color: #165af8'
    },
    // 表头样式
    headerStyle (column) {
      return 'font-weight:600;color:black;'
    },
    // 点击公司地址打开定位
    openMap(addr){
      this.companyAddr = addr
      this.companyAddrMapDialog = true
    },
    // 切换我的产品展示格式类型
    checkMoreEvent () {
      this.isCheckCube = !this.isCheckCube
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
    // 复制聊天窗口链接地址
    copyLink(id) {
      var link = document.getElementById(id)
      var range
      if (document.body.createTextRange) {
        range = document.body.createTextRange()
        range.moveToElementText(link)
        range.select()
      } else if (window.getSelection) {
        var selection = window.getSelection()
        range = document.createRange()
        console.log(range.text, range.htmlText);
        range.selectNodeContents(link)
        selection.removeAllRanges()
        selection.addRange(range)
      } else {
        console.warn('none')
      }
      document.execCommand('Copy') // 执行浏览器复制命令
      // console.warn('none')
      this.$message.success('已复制好，可贴粘。')
    },
    // 点击预览二维码大图
    openErweima () {
      this.showErweimaViewer = true
    },
    // 点击关闭二维码大图
    closeErweimaViewer () {
      this.showErweimaViewer = false
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
    },
    myState (val) {
      let msg
      switch (val.orderStatus) {
        case '0':
          msg = '未查看'
          break
        case '1':
          msg = '未确认'
          break
        case '99':
          msg = '已取消'
          break
        case '9':
          msg = '已完成'
          break
      }
      return msg
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
      .myProductSearch {
        height: 60px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .inputBox{
          width: 95%;
          height: 40px;
          border-radius: 30px;
          overflow: hidden;
          border: 1px solid #aaa;
          display: flex;
          justify-content: space-between;
          align-items: center;
          @{deep} .el-input{
            border: none;
            .el-input__inner{
              border: none;
            }
          }
          .el-button{
            border: none;
            height: 100%;
            background-color: #165af7;
          }
        }
      }
      .myProductSearchTotalCountBox{
        padding: 10px 0;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        p {
          flex: 1;
          &.myTotalCount{
            text-align: center;
            span{
              color: #ff0000;
              margin-right: 5px;
            }
          }
          &.more{
            display: flex;
            justify-content: flex-end;
            margin-right: 10px;
            .checkList{
              width: 20px;
              height: 20px;
              display: block;
              background: url('~@/assets/images/格式化列表.png') no-repeat center;
              background-size: contain;
              cursor: pointer;
            }
            .checkCube{
              width: 20px;
              height: 20px;
              display: block;
              background: url('~@/assets/images/liebiao2.png') no-repeat center;
              background-size: contain;
              cursor: pointer;
            }
          }
        }
      }
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
      // 择样订单导出
      .infoListTitle {
        min-height: 50px !important;
        background-color: #f6f6f6;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 500;
      }
      .meCode {
        width: 100%;
        height: 100px;
        background-color: #f6f9ff;
        padding: 0 20px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        font-size: 14px;
        justify-content: space-between;
        cursor: pointer;
        .meCodeImg {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background-color: #165af7;
          color: #fff;
        }
        .meCodeContent {
          flex: 1;
          height: 100px;
          display: flex;
          align-items: center;
          .codeTitle {
            margin: 0 10px;
          }
          .code {
            font-size: 30px;
            color: #165af8;
            font-weight: bold;
          }
        }
        &:hover .el-icon-arrow-right {
          color: #165af8;
        }
      }
      .infoOrderList {
        height: 765px;
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
      .mobile {
        box-sizing: border-box;
        padding: 5px 10px;
        font-size: 14px;
        p {
          line-height: 30px;
          .title {
            color: #a0a0a0;
          }
        }
        .btns {
          padding: 10px;
          @{deep} .el-button {
            float: right;
            margin-left: 10px;
          }
          &::after {
            content: "";
            clear: both;
            height: 0;
            line-height: 0;
            display: block;
            visibility: hidden;
          }
        }
      }
      .orderDetailState {
        padding: 5px 10px;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        border-bottom: 1px solid #e5e5e5;
        .text {
          font-weight: bold;
        }
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
       @{deep} .orderDetailTitle {
        width: 100%;
        border: none;
        box-shadow: none;
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        .el-tabs__header{
          .el-tabs__nav-wrap{
            .el-tabs__nav-scroll{
              .el-tabs__nav{
                .el-tabs__item{
                  display:flex;
                  align-items: center;
                  justify-content: center;
                }
              }
            }
          }
        }
        .el-tabs__content{
          .el-tab-pane{
            width:100%;
            .headerTitle {
          width:100%;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 14px;
          padding: 0 10px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(246, 245, 245, 1);
          box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.06);
          border-radius: 10px;
          .headerItem {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            &.code {
              i {
                width: 18px;
                height: 18px;
                background: url("~@/assets/images/编号@2x.png") center no-repeat;
                background-size: contain;
                margin-right: 5px;
                border-radius: 50%;
              }
            }
            &.client {
              i {
                width: 18px;
                height: 18px;
                background: url("~@/assets/images/客户@2x.png") center no-repeat;
                background-size: contain;
                margin-right: 5px;
                border-radius: 50%;
              }
            }
            &.date {
              i {
                width: 18px;
                height: 18px;
                background: url("~@/assets/images/时间@2x.png") center no-repeat;
                background-size: contain;
                margin-right: 5px;
                border-radius: 50%;
              }
            }
          }
        }
          }
        }
        
      }
      .orderDetailTitle2 {
        flex: 1;
        overflow-x: none;
        overflow-y: auto;
        padding: 5px 5px 100px 5px;
        box-sizing: border-box;
        &::-webkit-scrollbar {
          display: none;
        }
        .productItem {
          margin-top: 10px;
          font-size: 14px;
          @{deep} .el-card__body {
            padding: 10px 10px 0px 10px;
            box-sizing: border-box;
          }
          .context {
            display: flex;
            justify-content: space-between;
            .left {
              flex: 1;
              padding-bottom: 10px;
              box-sizing: border-box;
              display: flex;
              align-items: center;
              .myImage {
                width: 100%;
              }
            }
            .right {
              box-sizing: border-box;
              flex: 2;
              font-size: 13px;
              padding-left: 10px;
              padding-bottom: 10px;
              color: #626262;
              p {
                padding: 2px 0;
                &:first-of-type {
                  color: #000;
                  font-weight: 500;
                }
                .price {
                  color: #ff2000;
                }
              }
            }
          }
          .contact {
            height: 50px;
            display: flex;
            align-items: center;
            border-top: 1px solid #dcdcdc;
            justify-content: space-between;
            .laiyuan {
              color: #58b668;
            }
          }
        }
      }
      .totalBox {
        width: 100%;
        position: absolute;
        bottom: 0;
        box-sizing: border-box;
        left: 0;
        .transition-box {
          background-color: #fff;
          h3 {
            font-weight: bold;
            font-size: 14px;
            padding: 10px 15px;
            border-bottom: 1px solid #dcdcdc;
          }
          .items {
            font-size: 13px;
            display: flex;
            padding: 5px 15px;
            justify-content: space-between;
            align-items: center;
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
      .productList {
        height: 70px;
        width: 100%;
        box-sizing: border-box;
        background-color: #f6f9ff;
        border-top: 10px solid #f3f3f3;
        border-bottom: 10px solid #f3f3f3;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .productIten {
          font-size: 14px;
          width: 33%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          &:nth-of-type(2) {
            position: relative;
            &::before,
            &::after {
              content: "";
              position: absolute;
              width: 2px;
              height: 20px;
              background-color: #b6caf2;
            }
            &::before {
              left: -2px;
            }
            &::after {
              right: -2px;
            }
          }
          .historyIcon,
          .rankingIcon,
          .myProductIcon {
            width: 16px;
            height: 16px;
            background-color: #ccc;
            margin-right: 5px;
          }
          .historyIcon {
            background: url("~@/assets/images/历史.png") no-repeat center;
            background-size: contain;
          }
          .rankingIcon {
            background: url("~@/assets/images/排行.png") no-repeat center;
            background-size: contain;
          }
          .myProductIcon {
            background: url("~@/assets/images/产品.png") no-repeat center;
            background-size: contain;
          }
          &.active {
            background-color: #fff;
          }
        }
      }
      .historyReco {
        flex: 1;
        width: 100%;
        box-sizing: border-box;
        font-size: 14px;
        color: black;
        /** 单独为横向和竖向设置滚动条 **/
        overflow-x: none;
        overflow-y: auto;
        &::-webkit-scrollbar {
          display: none;
        }
        li {
          width: 100%;
          height: 60px;
          margin-top: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(246, 245, 245, 1);
          box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.06);
          border-radius: 10px;
          .fa_no,
          .createdOn,
          .client_na {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
      .cureentReco {
        width: 100%;
        flex: 1;
        border: none;
        font-size: 14px;
        color: black;
        overflow: auto;
        /** 单独为横向和竖向设置滚动条 **/
        overflow-x: none;
        overflow-y: auto;
        &::-webkit-scrollbar {
          display: none;
        }
        li {
          width: 100%;
          height: 60px;
          border-radius: 1px;
          margin-top: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          &:nth-of-type(odd) {
            background: rgba(229, 238, 255, 1);
            border: 1px solid rgba(246, 245, 245, 1);
            box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.06);
          }
          &:nth-of-type(even) {
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(246, 245, 245, 1);
            box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.06);
          }
          &:first-of-type {
            margin-top: 0;
          }
          .fa_no {
            display: flex;
            align-items: center;
            i {
              width: 14px;
              height: 14px;
              background: url("~@/assets/images/编号.png") center no-repeat;
              background-size: contain;
              margin-right: 5px;
            }
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
      }
      .personalNumberTitle {
        width: 100%;
        height: 150px;
        padding: 0 30px;
        box-sizing: border-box;
        background-color: #165af7;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 14px;
        .titleTXT {
          box-sizing: border-box;
          color: white;
          text-align: center;
          padding: 20px;
        }
        .numberWarp {
          width: 100%;
          flex: 1;
          padding: 0 20px;
          box-sizing: border-box;
          background-color: #fff;
          border-radius: 10px 10px 0 0;
          display: flex;
          align-items: center;
          cursor: pointer;
          .myImg {
            margin-right: 10px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #165af7;
            color: #fff;
          }
          .code {
            font-size: 30px;
            color: #165af8;
            font-weight: bold;
          }
        }
        .historyHeaderTop {
          width: 100%;
          flex: 1;
          background-color: #fff;
          border-radius: 10px 10px 0 0;
          display: flex;
          align-items: center;
          padding: 0 10px;
          box-sizing: border-box;
        }
      }
      .historyWrapContent {
        width: 100%;
        height: 150px;
        padding: 0 20px;
        box-sizing: border-box;
        background-color: #165af7;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 14px;
        .titleTXT {
          color: white;
          text-align: center;
          padding: 20px;
        }
        .bigHistoryHeaderTop {
          width: 100%;
          flex: 1;
          background-color: #fff;
          border-radius: 10px 10px 0 0;
          display: flex;
          align-items: center;
          box-sizing: border-box;
          justify-content: space-between;
          .changshang,
          .huohao,
          .kehu,
          .shijian {
            height: 100%;
            flex: 1;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            align-content: center;
            .text,
            .icon {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .icon {
              margin-bottom: 5px;
              i {
                display: block;
                width: 40px;
                height: 40px;
                border-radius: 50%;
              }
            }
          }
          .changshang {
            position: relative;
            .icon {
              i {
                background: url("~@/assets/images/工厂.png") no-repeat center;
                background-size: cover;
                border-radius: 0;
              }
            }
            &::before {
              content: "";
              position: absolute;
              height: 20px;
              width: 2px;
              right: -1px;
              top: 50%;
              background-color: #bfbfbf;
              transform: translate(0, -50%);
            }
          }
          .huohao {
            .icon {
              i {
                background: url("~@/assets/images/编号@2x (1).png") no-repeat
                  center;
                background-size: contain;
              }
            }
          }
          .kehu {
            position: relative;
            &::before,
            &::after {
              content: "";
              position: absolute;
              height: 20px;
              width: 2px;
              top: 50%;
              background-color: #bfbfbf;
              transform: translate(0, -50%);
            }
            &::before {
              left: -1px;
            }
            &::after {
              right: -1px;
            }
            .icon {
              i {
                background: url("~@/assets/images/客户@2x (1).png") no-repeat
                  center;
                background-size: contain;
              }
            }
          }
          .shijian {
            .icon {
              i {
                background: url("~@/assets/images/时间@2x (1).png") no-repeat
                  center;
                background-size: contain;
              }
            }
          }
        }
      }
      .historyWrapBody {
        font-size: 14px;
        border: none;
        height: 675px;
        width: 100%;
        /** 单独为横向和竖向设置滚动条 **/
        overflow-x: none;
        overflow-y: scroll;
        &::-webkit-scrollbar {
          display: none;
        }
        li {
          border: none;
          width: 100%;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid #f2f2f2;
          span {
            flex: 1;
            text-align: center;
          }
        }
      }
      .rankingWrapContent {
        width: 100%;
        height: 150px;
        padding: 0 20px;
        box-sizing: border-box;
        background-color: #165af7;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 14px;
        .titleTXT {
          color: white;
          text-align: center;
          padding: 20px;
        }
        .bigRankingHeaderTop {
          width: 100%;
          flex: 1;
          background-color: #fff;
          border-radius: 10px 10px 0 0;
          display: flex;
          align-items: center;
          box-sizing: border-box;
          justify-content: space-between;
          .changshang,
          .huohao,
          .zeyangshu,
          .name {
            height: 100%;
            flex: 1;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            align-content: center;
            .text,
            .icon {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .icon {
              margin-bottom: 5px;
              i {
                display: block;
                width: 40px;
                height: 40px;
                border-radius: 50%;
              }
            }
          }
          .changshang {
            .icon {
              i {
                background: url("~@/assets/images/工厂.png") no-repeat center;
                background-size: cover;
                border-radius: 0;
              }
            }
          }
          .huohao {
            position: relative;
            &::before,
            &::after {
              content: "";
              position: absolute;
              height: 20px;
              width: 2px;
              top: 50%;
              background-color: #bfbfbf;
              transform: translate(0, -50%);
            }
            &::before {
              left: -1px;
            }
            &::after {
              right: -1px;
            }
            .icon {
              i {
                background: url("~@/assets/images/编号@2x (1).png") no-repeat
                  center;
                background-size: contain;
              }
            }
          }
          .name {
            .icon {
              i {
                background: url("~@/assets/images/名称@2x.png") no-repeat center;
                background-size: contain;
              }
            }
          }
          .zeyangshu {
            .icon {
              i {
                background: url("~@/assets/images/数据@2x.png") no-repeat center;
                background-size: contain;
              }
            }
          }
        }
      }
      // 我的产品下拉
      .myProductWrapBody{
        font-size: 14px;
        border: none;
        height: 675px;
        width: 100%;
        overflow-x: none;
        overflow-y: scroll;
        justify-content: space-evenly;
        &::-webkit-scrollbar {
            display: none;
        }
        /** 单独为横向和竖向设置滚动条 **/
        .itemBox{
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          align-content: flex-start;
          justify-content: space-evenly;
          &::after{
            width: 46%;
            content: '';
            display: block;
          }
          .itemCube{
            width: 46%;
            height: 260px;
            margin: 5px 0;
            overflow: hidden;
            border: 1px solid #DCDCDC;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .imgItem{
              width: 100%;
              height: 175px;
              @{deep} .el-image{
                width: 100%;
                height: 100%;
                img{
                  width: 100%;
                  height: 100%;
                }
              }
            }
            .context{
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: space-evenly;
              .contextItem{
                box-sizing: border-box;
                padding: 0 10px;
                .price {
                  color: #ff0000;
                }
              }
            }
          }
          .itemList {
            width: 100%;
            display: flex;
            justify-content: space-between;
            border-radius: 10px;
            margin: 5px 10px;
            overflow: hidden;
            cursor: pointer;
            height: 250px;
            .imgItemLeft{
              flex: 1;
              display: flex;
              align-items: center;
              position: relative;
              .el-image{
                width: 100%;
                img{
                  width: 100%;
                }
              }
              .date{
                position: absolute;
                width: 100%;
                bottom: 0;
                left: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 10px 0;
                color: #626262;
                i {
                  display: block;
                  margin-right: 5px;
                  width: 14px;
                  height: 14px;
                  background: url('~@/assets/images/时间.png') no-repeat center;
                  background-size: contain;
                }
              }
            }
            .context{
              flex: 2;
              display: flex;
              flex-direction: column;
              justify-content: space-evenly;
              color: #626262;
              .contextItem{
                box-sizing: border-box;
                padding-left: 5px;
                .price {
                  color: #ff0000;
                }
                &.productName {
                  color: #000;
                  font-weight: 600;
                }
              }
            }
          }
        }
      }
      .rankingWrapBody {
        font-size: 14px;
        border: none;
        height: 675px;
        width: 100%;
        /** 单独为横向和竖向设置滚动条 **/
        overflow-x: none;
        overflow-y: scroll;
        &::-webkit-scrollbar {
          display: none;
        }
        li {
          border: none;
          width: 100%;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid #f2f2f2;
          padding: 0 20px;
          .item {
            flex: 1;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            padding: 0 5px;
          }
          .imgItem {
            flex: 1;
            text-align: center;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            padding: 0 5px;
            @{deep} .el-image {
              cursor: pointer;
            }
          }
        }
      }
      .personalNumberContent {
        flex: 1;
        background-color: #fff;
        display:flex;
        flex-direction: column;
        .currentCode,
        .buyer {
          // margin-top: 5px;
          background-color: #f6f9ff;
          height: 60px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
          box-sizing: border-box;
          .left {
            font-weight: bold;
            position: relative;
            span {
              margin-left: 30px;
            }
            &::before {
              content: "";
              position: absolute;
              width: 25px;
              height: 25px;
              border-radius: 50%;
              background: url("~@/assets/images/排号.png") no-repeat center;
              background-size: contain;
              top: 50%;
              transform: translate(0, -50%);
            }
          }
          .right {
            color: #888888;
          }
        }
        .buyer {
          .left {
            &::before {
              content: "";
              position: absolute;
              width: 25px;
              height: 25px;
              border-radius: 50%;
              background: url("~@/assets/images/采购商.png") no-repeat center;
              background-size: contain;
              top: 50%;
              transform: translate(0, -50%);
            }
          }
        }
        .buyerContent {
          width: 100%;
          padding: 0 20px;
          box-sizing: border-box;
          height: 315px;
          overflow: auto;
          font-size: 14px;
          .buyerItem {
            width: 100%;
            height: 50px;
            border: none;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #e5e5e5;
            .title {
              color: #333;
            }
            .date {
              color: #555;
            }
          }
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

// 发朋友圈样式
.sendGonggaoBox {
  background-color: #fff !important;
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

.zanwushuju1 {
  width: 100%;
  height: 382px;
  margin: 0 auto;
  background: url("~@/assets/images/暂无数据.png") no-repeat center;
  background-size: 100%;
  position: absolute;
  left: 0;
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
