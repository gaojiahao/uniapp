<template>
  <div class="bsBusinessMsg">
    <!-- 头部按钮 -->
    <div class="topLaout">
      <!-- <div class="tagItem" @click="openBusinessType({ sampleFrom: null })">
        <el-avatar
          style="width:28px;height:28px;margin-right:15px;"
          :src="require('@/assets/images/2055.png')"
        ></el-avatar>
        <span>全部业务</span>
      </div> -->
      <div
        :class="{
          tagItem: true,
          active: searchForm.messageModel == item.messageModel
        }"
        v-for="(item, i) in businessConversations"
        :key="i"
        @click="openBusinessType(item)"
      >
        <el-avatar
          style="width:28px;height:28px;margin-right:15px;"
          :src="item.icon"
        ></el-avatar>
        <span>{{ item.title }}</span>
      </div>
    </div>
    <!-- 搜索条件 -->
    <div class="searchBox">
      <div class="item keyword">
        <span class="title">关键词：</span>
        <div class="content">
          <el-input
            placeholder="请输入关键词"
            size="medium"
            v-model="searchForm.keyword"
            clearable
          >
          </el-input>
        </div>
      </div>
      <div class="item type" v-if="searchForm.sampleFrom !== 'SYSTEM'">
        <span class="title">类型：</span>
        <div class="content">
          <el-select
            v-model="searchForm.messageExt"
            size="medium"
            placeholder="请选择"
          >
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.title"
              :value="item.messageExt"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="item date">
        <span class="title">时间段：</span>
        <div class="content">
          <el-date-picker
            v-model="searchForm.time"
            size="medium"
            value-format="yyyy-MM-ddTHH:mm:ss"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="btns">
        <el-button
          type="primary"
          @click="getERPOrderListByPage"
          size="medium"
          icon="el-icon-search"
        >
          搜索
        </el-button>
      </div>
    </div>
    <!-- 消息列表 -->
    <ul class="infoBox">
      <li class="info_item" v-for="item in erpOrderList" :key="item.id">
        <div class="tableHead">
          <p>采购单号：S123455678912345</p>
          <!-- <div class="tableHeadIcon">
              <img src="@/assets/images/delete.png" alt="" />
            </div> -->
        </div>
        <div class="tablemian">
          <div class="tablemian_left">
            <div class="tablemian_left_item">
              <p class="left_item">
                <span class="title">类型：</span>
                <span> 消息通知 </span>
              </p>
              <p class="left_item">
                <span class="title">代号：</span>
                <span>107362</span>
              </p>
              <p class="left_item">
                <span class="title">状态：</span>
                <span>未读</span>
              </p>
            </div>
            <div class="tablemian_left_item">
              <p class="left_item">
                <span class="title">时间：</span>
                <span>2020-11-21 13:41:35</span>
              </p>
              <p class="left_item">
                <span class="title">内容：</span>
                <span>产品有现货的，10月8好就可以发货</span>
              </p>
            </div>
          </div>
          <div class="mianBtn">
            <el-button size="small" style="color:#3368A9;border-color: #3368A9;"
              >查看详情</el-button
            >
            <el-button size="small" type="primary">立即沟通</el-button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      erpOrderList: [],
      totalCount: 0,
      typeList: [],
      pageSize: 10,
      currentPage: 1,
      searchForm: {
        keyword: "",
        messageModel: null,
        sampleFrom: null,
        messageExt: -1,
        time: ""
      },
      businessConversations: [],
      companyConversations: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  methods: {
    // 获取消息类型
    async getMessageTeplateSettingsByPage() {
      const fd = {
        maxResultCount: 9999,
        messageModel: this.searchForm.messageModel,
        skipCount: 1
      };
      for (const key in fd) {
        if (fd[key] === null || fd[key] === undefined || fd[key] === "")
          delete fd[key];
      }
      const res = await this.$http.post(
        "/api/PushSettings/MessageTeplateSettingsByPage",
        fd
      );
      if (res.data.result.code === 200) {
        this.typeList = res.data.result.item.items;
      } else {
        this.$common.handlerMsgState({
          msg: res.data.result.msg,
          type: "danger"
        });
      }
    },
    // 点击某个业务
    async openBusinessType(busines) {
      this.searchForm.sampleFrom = busines.sampleFrom;
      this.searchForm.messageModel = busines.messageModel;
      this.searchForm.messageExt = -1;
      this.currentPage = 1;
      await this.getMessageTeplateSettingsByPage();
      await this.getERPOrderListByPage();
    },
    // 获取业务消息表格数据
    async getERPOrderListByPage() {
      const fd = {
        skipCount: this.currentPage,
        maxResultCount: this.pageSize,
        keyword: this.searchForm.keyword,
        readStatus: "-1",
        messageExt: this.searchForm.messageExt,
        messageModel: this.searchForm.messageModel,
        startTime: this.searchForm.time && this.searchForm.time[0],
        endTime: this.searchForm.time && this.searchForm.time[1]
        // sampleFrom: this.searchForm.sampleFrom,
      };
      for (const key in fd) {
        if (fd[key] === null || fd[key] === undefined || fd[key] === "")
          delete fd[key];
      }
      const res = await this.$http.post("/api/GetERPOrderListByPage", fd);
      console.log(res);
      if (res.data.result.code === 200) {
        this.erpOrderList = res.data.result.item.items;
        this.totalCount = res.data.result.item.totalCount;
      } else {
        this.$common.handlerMsgState({
          msg: res.data.result.msg,
          type: "danger"
        });
      }
    },
    // 获取业务消息按钮
    async getConversationList() {
      const res = await this.$im_http.post("/api/Conversation/List", {});
      const { code, item, msg } = res.data.result;
      if (code === 200) {
        this.businessConversations = item.businessConversations;
        this.companyConversations = item.companyConversations;
      } else {
        this.$common.handlerMsgState({
          msg: msg,
          type: "danger"
        });
      }
    }
  },
  created() {},
  async mounted() {
    await this.getConversationList();
    this.searchForm.messageModel = this.businessConversations[1].messageModel;
    this.searchForm.sampleFrom = this.businessConversations[1].sampleFrom;
    await this.getMessageTeplateSettingsByPage();
    await this.getERPOrderListByPage();
  }
};
</script>
<style scoped lang="less">
.topLaout {
  display: flex;
  .tagItem {
    width: 160px;
    height: 50px;
    opacity: 1;
    background: #ffffff;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
    transition: all 0.3s;
    cursor: pointer;
    &.active {
      box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.16);
    }
    &:hover {
      border-radius: 6px;
      margin-top: -5px;
      box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.16);
    }
    .icon {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      margin-right: 16px;
    }
    .home {
      background: url("~@/assets/images/noticeHomeIcon.png") no-repeat center;
    }
    .myNotice {
      background: url("~@/assets/images/yonghu.png") no-repeat center;
    }
    .ordinary {
      background: url("~@/assets/images/ordinaryNoticeIcon.png") no-repeat
        center;
    }
    .procurement {
      background: url("~@/assets/images/procurementNoticeIcon.png") no-repeat
        center;
    }
    .supply {
      background: url("~@/assets/images/supplyNoticeIcon.png") no-repeat center;
    }
    .icon {
      background-size: contain;
    }
  }
}
.searchBox {
  height: 71px;
  background-color: #fff;
  margin-top: 20px;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 17px 20px;
  display: flex;
  .item {
    display: flex;
    align-items: center;
    .title {
      width: 80px;
      min-width: 80px;
      text-align: right;
    }
    .content {
      .el-input {
        width: 160px;
      }
      .el-select {
        width: 130px;
      }
      .el-date-editor--datetimerange.el-input__inner {
        width: 250px;
      }
    }
  }
  .btns {
    margin-left: 20px;
  }
}
.infoBox {
  margin-top: 20px;
  .info_item {
    background-color: #fff;
    border-radius: 4px;
    height: 146px;
    margin-bottom: 20px;
    .tableHead {
      padding: 0 20px;
      height: 50px;
      line-height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: bold;
      font-size: 16px;
      color: #333;
      border-bottom: 2px solid #dcdfe6;
      .tableHeadIcon {
        width: 50px;
        min-width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 15px;
        cursor: pointer;
      }
    }
    .tablemian {
      display: flex;
      justify-content: space-between;
      padding: 20px 20px 0 20px;
      .tablemian_left {
        flex: 1;
        .tablemian_left_item {
          display: flex;
          .left_item {
            width: 370px;
            line-height: 30px;
            color: #666;
            .title {
              color: #999;
            }
          }
        }
      }
      .mianBtn {
        width: 200px;
        min-width: 200px;
      }
    }
  }
}
</style>
