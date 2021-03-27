<template>
  <div class="bsSampleSearch">
    <div class="searchBox">
      <el-form
        :inline="true"
        :rules="addInfoRules"
        :model="clienFormData"
        class="demo-form-inline"
      >
        <div class="left">
          <el-form-item label="报价客户：" prop="linkman">
            <el-select
              style="width: 190px; margin: 0 15px;"
              v-model="clienFormData.linkman"
              placeholder="请输入/选择客户"
            >
              <el-option
                v-for="item in clientList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item style=" margin: 0 24px  0 24px;">
            <el-button class="el-icon-plus" type="primary" @click="onSubmit">
              新增客户</el-button
            >
          </el-form-item>
          <el-form-item label="报价备注：" prop="remark">
            <el-input
              style="width: 586px; margin: 0 15px;"
              v-model="clienFormData.remark"
              placeholder=" "
            ></el-input>
          </el-form-item>
          <el-form-item label="默认公式：" prop="defaultFormula">
            <el-select
              style="width: 120px; margin: 0 15px;"
              v-model="clienFormData.defaultFormula"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, i) in customerTemplate"
                :key="i"
                :label="item.name"
                :value="JSON.stringify(item)"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="利润率：" prop="profit">
            <el-input
              style="width: 120px; margin: 0 15px;"
              v-model="clienFormData.profit"
              placeholder="0"
            >
              <span slot="suffix">%</span></el-input
            >
          </el-form-item>
          <el-form-item label="汇率：" prop="exchange">
            <el-input
              style="width: 120px; margin: 0 15px;"
              v-model="clienFormData.exchange"
              placeholder=" "
            ></el-input>
          </el-form-item>
          <el-form-item label="币种：" prop="cu_deName">
            <el-select
              style="width: 120px; margin: 0 15px;"
              v-model="clienFormData.cu_deName"
            >
              <el-option
                v-for="(item, i) in options.cu_deList"
                :key="i"
                :label="item.itemCode"
                :value="item.parameter"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="每车尺寸：" prop="size">
            <el-select
              v-model="clienFormData.size"
              style="width: 134px;; margin: 0 15px;"
              placeholder="请选择尺码"
            >
              <el-option
                v-for="(item, i) in options.size"
                :key="i"
                :label="item.itemCode"
                :value="item.parameter"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="报价方式：" prop="offerMethod">
            <el-select
              style="width: 120px; margin: 0 15px;"
              v-model="clienFormData.offerMethod"
              placeholder=""
            >
              <el-option
                v-for="(item, i) in options.offerMethod"
                :key="i"
                :label="item.itemCode"
                :value="item.parameter"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="总费用：" prop="totalCost">
            <el-input
              style="width: 120px;; margin: 0 15px;"
              v-model="clienFormData.totalCost"
              placeholder=" "
            ></el-input>
          </el-form-item>
          <el-form-item label="小数位数" prop="decimalPlaces">
            <el-input
              style="width: 120px;; margin: 0 15px;"
              v-model="clienFormData.decimalPlaces"
              placeholder=" "
            ></el-input>
          </el-form-item>
          <el-form-item label="取舍方式：" prop="rejectionMethod">
            <el-select
              style="width: 345px; margin: 0 15px;"
              v-model="clienFormData.rejectionMethod"
              placeholder="请选择取舍方式"
            >
              <el-option
                v-for="(item, i) in options.rejectionMethod"
                :key="i"
                :label="item.itemCode"
                :value="item.parameter"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="right">
          <el-form-item label="价格小于：" prop="miniPrice">
            <el-input
              style="width: 120px;"
              v-model="clienFormData.miniPrice"
              placeholder=" "
            ></el-input>
          </el-form-item>
          <el-form-item label="小数位数：" prop="decimalPlaces">
            <el-select
              style="width: 120px;"
              v-model="clienFormData.region"
              placeholder="decimalPlaces"
            >
              <el-option
                v-for="(item, i) in options.decimalPlaces"
                :key="i"
                :label="item.itemCode"
                :value="item.parameter"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "bsSampleSearch",
  props: {
    searchFormData: {
      type: Object
    }
  },
  watch: {
    "clienFormData.cu_de": {
      deep: true,
      handler(newVal) {
        if (newVal) {
          this.options.cu_deList.forEach(val => {
            if (val.parameter === newVal)
              this.clienFormData.cu_deName = val.itemCode;
          });
        }
      }
    }
    // "clienFormData.defaultFormula": {
    //   deep: true,
    //   handler(newVal) {
    //     if (newVal) {
    //       const obj = JSON.parse(newVal);
    //       this.clienFormData.profit = obj.profit;
    //       this.clienFormData.offerMethod = obj.offerMethod;
    //       this.clienFormData.cu_de = obj.cu_de;
    //       this.clienFormData.cu_deName = obj.cu_deName;
    //       this.clienFormData.exchange = obj.exchange;
    //       this.clienFormData.size = obj.size;
    //       this.clienFormData.decimalPlaces = obj.decimalPlaces;
    //       this.clienFormData.rejectionMethod = obj.rejectionMethod;
    //     }
    //   }
    // }
  },
  data() {
    return {
      clientList: [],
      customerTemplate: [],
      options: {
        // 报价配置项
        cu_deList: [],
        decimalPlaces: [],
        offerMethod: [],
        rejectionMethod: [],
        size: []
      },
      clienFormData: {
        companyName: "11",
        defaultFormula: null,
        customerInfoId: null,
        quotationProductList: [],
        profit: 0,
        offerMethod: "出厂价",
        cu_de: "¥",
        cu_deName: "RMB",
        totalCost: "0",
        exchange: 0,
        size: "24",
        decimalPlaces: 3,
        rejectionMethod: "四舍五入",
        miniPrice: 0,
        miniPriceDecimalPlaces: 1
      },
      addInfoRules: {
        linkman: [{ required: true, message: "请选择客户", trigger: "change" }],

        remark: [{ required: true, message: "请备注", trigger: "change" }],
        offerMethod: [
          { required: true, message: "请输入报价方式", trigger: "blur" }
        ],
        defaultFormula: [
          { required: true, message: "请选择默认公式", trigger: "blur" }
        ],
        cu_deName: [
          { required: true, message: "请输入报价方式", trigger: "blur" }
        ],
        cu_de: [{ required: true, message: "请选择币别", trigger: "change" }],
        exchange: [{ required: true, message: "请输入汇率", trigger: "blur" }],
        decimalPlaces: {
          required: true,
          message: "请选择小数位数",
          trigger: "change"
        },

        profit: { required: true, message: "请输入利润率", trigger: "blur" },
        totalCost: { required: true, message: "请输入总费用", trigger: "blur" },
        size: { required: true, message: "请选择尺码", trigger: "change" },
        rejectionMethod: {
          required: true,
          message: "请选择取舍方式",
          trigger: "change"
        },
        miniPrice: { required: true, message: "请输入价格", trigger: "blur" },
        miniPriceDecimalPlaces: {
          required: true,
          message: "请选择小数位数",
          trigger: "change"
        }
      }
    };
  },
  created() {},
  mounted() {
    this.getProductOfferByNumber();
  },
  methods: {
    //请求条件
    async getProductOfferByNumber() {
      const res = await this.$http.post("/api/GetProductOfferByNumber", {
        offerNumber: this.searchFormAata.offerNumber
      });
      if (res.data.result.code === 200) {
        this.clienFormData = res.data.result.item;
        console.log(this.clienFormData);
      } else {
        this.$message.error(res.data.result.msg);
      }
    },
    onSubmit() {}
  }
};
</script>
<style scoped lang="less">
.bsSampleSearch {
  background-color: #fff;
  .title {
    height: 55px;
    font-size: 15px;
    font-weight: 700;
    padding-left: 15px;
    box-sizing: border-box;
    position: relative;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &::before {
      width: 4px;
      height: 14px;
      background-color: #3368a9;
      position: absolute;
      left: 0;
      top: 50%;
      content: "";
      transform: translate(0, -50%);
    }
  }
  .searchBox {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    form {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .left {
        flex: 1;
      }
      .right {
        padding-top: 10px;
        margin-right: 20px;
        width: 280px;
        height: 158px;
        background: #ffffff;
        border: 1px solid #dcdfe6;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
      }
    }
  }
}
</style>
