<template>
  <div class="bsPushDialogComponent">
    <div class="pushBox">
      <div class="titleDar">
        <p>类型</p>
        <p>消息内容</p>

        <p class="addTemplate" @click="addMsgTemplate">+新增推送模板</p>
      </div>
      <div class="msgList">
        <ul class="item" v-for="item in pushList" :key="item.index">
          <li class="title">
            <el-radio
              v-model="radio"
              @change="handleRadio(item)"
              :label="item.messageExt"
            >
              {{ item.title }}</el-radio
            >
          </li>
          <li>{{ item.content }}</li>
        </ul>
      </div>
    </div>
    <div class="magContent">
      <p>消息内容</p>
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="textareaData"
        maxlength="100"
        size="medium"
        show-word-limit
      >
      </el-input>
    </div>
    <center style="margin-top: 10px">
      <template>
        <el-button @click="handleConfirmPush" type="primary"
          >确定推送</el-button
        >
        <el-button style="margin-left: 30px" plain @click="closeDialog"
          >取消</el-button
        >
      </template>
    </center>

    <!-- 新增编辑推送常用语dialog -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="addLangDialog"
      v-if="addLangDialog"
      width="800px"
    >
      <bsAddOfferFormulaLang
        :messageExtType="messageExtType"
        :editRow="editRow"
        :isEdit="isEdit"
        @submit="submit"
        @handleUpdate="handleUpdate"
        @close="close"
      ></bsAddOfferFormulaLang>
    </el-dialog>
  </div>
</template>

<script>
import bsAddOfferFormulaLang from "@/components/bsComponents/bsPersonalManageComponent/bsAddOfferFormulaLang";
import { mapState } from "vuex";
export default {
  props: {
    item: {
      type: Object
    },
    pushDialog: {
      type: Boolean
    },
    pushList: {
      type: Array
    },
    orderData: {
      type: Object
    },
    multipleSelection: {
      type: Array
    }
  },
  components: {
    bsAddOfferFormulaLang
  },
  computed: {
    ...mapState(["userInfo"])
  },
  data() {
    return {
      radio: "1",
      dataRadio: null,
      checkAll: false,
      textareaData: "",
      messageExtType: [],
      toCompanyNumber: [],
      PushContent: null,
      isEdit: false,
      editRow: {},
      dialogTitle: "新增推送模板",
      addLangDialog: false
      // arr: [
      //   {
      //     zt: "报价专用，针对部分厂商的",
      //     nr: "这是一条非常有诚意的采购信息1",
      //   },
      //   {
      //     zt: "报价专用，针对部分厂商的",
      //     nr: "这是一条非常有诚意的采购信息1",
      //   },
      //   {
      //     zt: "报价专用，针对部分厂商的",
      //     nr: "这是一条非常有诚意的采购信息1",
      //   },

      // ],
    };
  },
  methods: {
    //关闭弹框
    closeDialog() {
      this.$emit("handlePushDialog", false);
    },
    //新增推送模板
    addMsgTemplate() {
      this.isEdit = false;
      this.addLangDialog = true;
    },
    // 提交新增或编辑
    async submit(form) {
      const res = await this.$http.post("/api/PushSettings/Create", form);
      if (res.data.result.code === 200) {
        this.close();
        this.$common.handlerMsgState({
          msg: "新增成功",
          type: "success"
        });
        this.getPushSettingsPage();
      } else {
        this.$common.handlerMsgState({
          msg: res.data.result.msg,
          type: "danger"
        });
      }
    },

    // 提交编辑
    async handleUpdate(form) {
      const res = await this.$http.post("/api/PushSettings/Update", form);
      if (res.data.result.code === 200) {
        this.close();
        this.$common.handlerMsgState({
          msg: "编辑成功",
          type: "success"
        });
        this.getPushSettingsPage();
      } else {
        this.$common.handlerMsgState({
          msg: res.data.result.msg,
          type: "danger"
        });
      }
    },
    // 单选框事件
    handleRadio(item) {
      this.dataRadio = item;
      // console.log(item, "单选框事件");
    },
    // 确定推送
    async handleConfirmPush() {
      for (let i = 0; i < this.multipleSelection.length; i++) {
        this.toCompanyNumber.push(this.multipleSelection[i].companyNumber);
      }
      if (this.textareaData != "") {
        this.PushContent = this.textareaData;
      } else {
        this.PushContent = this.dataRadio.content;
      }
      const data = {
        senderTo: "Supplier", //暂时写死
        senderFrom: this.userInfo.commparnyList[0].companyType,
        companyNumber: this.userInfo.commparnyList[0].companyNumber,
        phoneNumber: this.userInfo.phoneNumber,
        orderPushType: this.orderData.orderPushType,
        orderNumber: this.item.offerNumber,
        toCompanyNumber: this.toCompanyNumber,
        PushContent: this.PushContent,
        messageExt: this.dataRadio.messageExt,
        messageModel: this.dataRadio.messageModel,
        messageTitle: this.dataRadio.title
      };
      const res = await this.$http.post("/api/SendPushTemplate", data);
      if (res.data.result.code === 200) {
        this.closeDialog();
        this.$common.handlerMsgState({
          msg: "推送成功",
          type: "success"
        });
      } else {
        this.$common.handlerMsgState({
          msg: res.data.result.msg,
          type: "danger"
        });
      }
    },
    // 关闭新增或编辑
    close() {
      this.addLangDialog = false;
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped lang="less">
@deep: ~">>>";
.bsPushDialogComponent {
  @{deep} .pushBox {
    height: 270px;
    .titleDar {
      height: 50px;
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #333333;
      .addTemplate {
        color: #3368a9;
        cursor: pointer;
      }
    }
    .msgList {
      height: 200px;
      overflow-y: auto;
      .item {
        padding-right: 20px;
        border-top: 1px solid #dcdfe6;
        height: 50px;
        display: flex;
        align-items: center;
        .title {
          width: 230px;
        }
        li {
          margin-right: 20px;
        }
      }
    }
  }
  @{deep} .magContent {
    p {
      margin: 9px 0;
    }
    .el-textarea__inner {
      height: 120px;
    }
  }
}
</style>
