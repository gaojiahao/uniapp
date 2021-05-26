<template>
  <div class="baojiaBox">
    <div class="twoItem">
      <span class="title"><i class="xing">*</i>币种：</span>
      <span class="value">{{ options.cu_na }}</span>
    </div>
    <div class="twoItem">
      <span class="title"><i class="xing">*</i>汇率：</span>
      <span class="value">{{ options.cu_na }}</span>
    </div>
    <div class="twoItem">
      <span class="title"><i class="xing">*</i>每车费用：</span>
      <span class="value">RMB</span>
    </div>
    <div class="twoItem">
      <span class="title"><i class="xing">*</i>报关费用：</span>
      <span class="value">1</span>
    </div>
    <div class="twoItem">
      <span class="title"><i class="xing">*</i>保险费用：</span>
      <span class="value">RMB</span>
    </div>
    <div class="twoItem">
      <span class="title"><i class="xing">*</i>其他费用：</span>
      <span class="value">1</span>
    </div>
    <div class="twoItem">
      <span class="title"><i class="xing">*</i>每车尺码：</span>
      <span class="value">RMB</span>
    </div>
    <div class="twoItem">
      <span class="title"><i class="xing">*</i>报价单位：</span>
      <span class="value">1</span>
    </div>
    <div class="twoItem">
      <span class="title"><i class="xing">*</i>报价利润：</span>
      <span class="value">1%</span>
    </div>
    <div class="twoItem">
      <span class="title"><i class="xing">*</i>小数位数：</span>
      <span class="value">1</span>
    </div>
    <div class="twoItem">
      <span class="title"><i class="xing">*</i>佣金：</span>
      <span class="value">1%</span>
    </div>
    <div class="twoItem">
      <span class="title"><i class="xing">*</i>报价加价：</span>
      <span class="value">1</span>
    </div>
    <div class="oneItem">
      <div class="shuoming">
        <span class="title"><i class="xing">*</i>设置说明：</span>
        <span class="value">
          {{ options.remark }}
        </span>
      </div>
    </div>
    <div class="twoItem">
      <span class="title"><i class="xing">*</i>取舍方式：</span>
      <span class="value">四舍五入</span>
    </div>
    <div class="twoItem">
      <span class="title"><i class="xing">*</i>取值方式：</span>
      <span class="value">自然数</span>
    </div>
    <div class="twoItem">
      <span class="title"><i class="xing">*</i>价格小于：</span>
      <span class="value">0</span>
    </div>
    <div class="twoItem">
      <span class="title"><i class="xing">*</i>小数位数：</span>
      <span class="value">1</span>
    </div>
    <div class="oneItem">
      <center>
        <el-radio v-model="radio" label="1">当前报价</el-radio>
        <el-radio style="margin-left:150px;" v-model="radio" label="2">
          使用进货价为默认报价
        </el-radio>
      </center>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["sampleOption"],
  data() {
    return {
      radio: "1",
      options: {}
    };
  },
  methods: {
    // 获取报价公式
    async getClientQuoteSetByNumber() {
      const res = await this.$http.post("/api/GetClientQuoteSetByNumber", {
        number: this.sampleOption.number,
        hallNumber: this.userInfo.commparnyList[0].companyNumber
      });
      console.log(res);
      if (res.data.result.code === 200) {
        this.options = res.data.result.item;
      } else {
        this.$common.handlerMsgState({
          msg: res.data.result.msg,
          type: "danger"
        });
      }
    }
  },
  created() {},
  mounted() {
    this.getClientQuoteSetByNumber();
  },
  computed: {
    ...mapState(["userInfo"])
  }
};
</script>
<style scoped lang="less">
.baojiaBox {
  display: flex;
  flex-wrap: wrap;
  color: #999;
  .title {
    display: inline-block;
    width: 80px;
    text-align: right;
    color: #666;
    .xing {
      color: #eb1515;
    }
  }
  .twoItem {
    width: 50%;
    margin-bottom: 35px;
  }
  .oneItem {
    width: 100%;
    margin-bottom: 35px;
    .shuoming {
      display: flex;
      line-height: 30px;
      .title {
        width: 100px;
      }
    }
  }
}
</style>
