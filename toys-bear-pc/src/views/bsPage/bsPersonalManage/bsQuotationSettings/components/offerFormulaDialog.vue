<template>
  <el-form label-width="100px" :model="offerFromData" :rules="defaultFormRules">
    <div class="item">
      <el-form-item label="公式类型:" label-width="90px">
        <div class="radioBox">
          <el-radio v-model="radio" label="1">自定义公式</el-radio>
          <el-radio v-model="radio" label="2">乘法公式</el-radio>
          <el-radio v-model="radio" label="3">除法公式</el-radio>
        </div>
      </el-form-item>
    </div>
    <div class="bgxian"></div>
    <div class="item" style="margin-top:20px">
      <el-form-item label="模板名称:" label-width="90px" prop="name">
        <el-input
          size="small"
          style="width:240px"
          placeholder="请输入模板名称"
          v-model="offerFromData.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="设置说明:">
        <el-input
          size="small"
          style="width:328px"
          v-model="offerFromData.remark"
        ></el-input>
      </el-form-item>
    </div>
    <div class="mainBox" v-if="radio == 1">
      <div class="title">
        <h3>自定义公式</h3>
      </div>
      <div class="item">
        <div class="label custom" style="margin-right:10px">
          选择要添加的字段:
        </div>
        <el-input
          size="small"
          style="width:208px"
          v-model="offerFromData.ma_na"
        ></el-input>

        <div class="btn" style="margin-left:14px">添加</div>
      </div>
      <div class="item" style="margin-top:14px">
        <div class="label custom" style="margin-right:10px">
          添加计算符号:
        </div>
        <div class="btnBox">
          <div class="btn" @click="handleAddSymbol('+')">+</div>
          <div class="btn" @click="handleAddSymbol('-')">-</div>
          <div class="btn" @click="handleAddSymbol('*')">*</div>
          <div class="btn" @click="handleAddSymbol('/')">/</div>
          <div class="btn" @click="handleAddSymbol('(')">(</div>
          <div class="btn" @click="handleAddSymbol(')')">)</div>
          <div class="btn" style="width:110px">
            <i class="fastIcon"></i>
            快捷公式
          </div>
        </div>
      </div>
      <div class="item" style="margin-top:14px">
        <div class="label custom" style="margin-right:10px">
          公式算法:
        </div>
        <el-input
          style="width:624px"
          type="textarea"
          v-model="offerFromData.formula"
        ></el-input>
      </div>
      <div class="item" style="margin:14px 0 18px 0">
        <div class="item" style="padding-left:140px">
          <el-button size="small" type="primary">保 存</el-button>
          <el-button size="small" type="primary">取 消</el-button>
        </div>
      </div>
    </div>
    <div class="mainBox">
      <div class="title">
        <h3>报价参数设置</h3>
      </div>
      <div class="item">
        <el-form-item
          label="总费用:"
          label-width="100px"
          style="margin-right:20px"
        >
          <el-input
            size="small"
            style="width:140px"
            v-model="offerFromData.linkman"
          ></el-input>
        </el-form-item>
        <el-form-item label="每车尺寸:" style="margin-right:20px" prop="size">
          <el-select
            style="width:140px"
            size="small"
            v-model="offerFromData.size"
            @change="selectBlur"
            v-model.number="offerFromData.size"
            filterable
            allow-create
            default-first-option
          >
            <template v-for="item in configList">
              <el-option
                v-if="item.itemText === 'Size'"
                :key="item.id"
                :label="item.itemCode"
                :value="item.itemCode"
              >
              </el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="报价利润:" label-width="100px">
          <el-input
            size="small"
            style="width:140px"
            v-model="offerFromData.linkman"
          ></el-input>
        </el-form-item>
      </div>

      <div class="item">
        <el-form-item label="币种:" prop="cu_de" style="margin-right:20px">
          <el-select
            style="width:140px"
            size="small"
            v-model="offerFromData.cu_de"
            @change="changeSelect"
            clearable
            placeholder="请选择"
          >
            <template v-for="item in configList">
              <el-option
                v-if="item.itemText === 'Cu_de'"
                :key="item.id"
                :label="item.itemCode"
                :value="item.parameter"
              >
              </el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="汇率:" prop="exchange" style="margin-right:20px">
          <el-input
            size="small"
            style="width:140px"
            v-model="offerFromData.linkman"
          ></el-input>
        </el-form-item>
        <el-form-item label="小数位数:" prop="miniPriceDecimalPlaces">
          <el-select
            style="width:140px"
            size="small"
            v-model="offerFromData.miniPriceDecimalPlaces"
            placeholder="请选择"
          >
            <template v-for="item in configList">
              <el-option
                v-if="item.itemText === 'DecimalPlaces'"
                :key="item.id"
                :label="item.itemCode"
                :value="item.itemCode"
              >
              </el-option>
            </template>
          </el-select>
        </el-form-item>
      </div>
      <div class="item" style=" justify-content: space-between;">
        <div class="left">
          <el-form-item label="取舍方式:" prop="rejectionMethod">
            <div class="radioBox">
              <el-radio v-model="radio" label="1">四舍五入</el-radio>
              <el-radio v-model="radio" label="2">全收</el-radio>
              <el-radio v-model="radio" label="1">全舍</el-radio>
            </div>
          </el-form-item>
          <el-form-item label="取值方式:">
            <div class="radioBox">
              <el-radio v-model="radio" label="1">自然数</el-radio>
              <el-radio v-model="radio" label="2">取偶数</el-radio>
              <el-radio v-model="radio" label="1">取奇数</el-radio>
            </div>
          </el-form-item>
        </div>
        <div class="right">
          <el-form-item label="价格小于:" label-width="90px">
            <el-input
              size="small"
              style="width:73px"
              v-model="offerFromData.linkman"
            ></el-input>
          </el-form-item>
          <el-form-item label="小数位数:" label-width="90px">
            <el-input
              size="small"
              style="width:73px"
              v-model="offerFromData.linkman"
            ></el-input>
          </el-form-item>
        </div>
      </div>
    </div>
    <center style="margin-top:28px">
      <span slot="footer" class="dialog-footer">
        <el-button type="primary">确 定</el-button>
        <el-button>取 消</el-button>
      </span>
    </center>
  </el-form>
</template>

<script>
const validateLength = (rule, value, callback) => {
  if (!value) {
    callback();
  } else {
    var reg = /^-?\d{1,5}(?:\.?\d{1,5})?$/; // 小数点左边最高5位，小数点右边最多5位
    var reg1 = /^\d{1,6}$/;
    if (/^[0-9]+\.?[0-9]*/.test(value)) {
      if (reg.test(value)) {
        if (String(value).includes(".")) {
          callback();
        } else {
          if (reg1.test(value)) {
            callback();
          } else {
            callback(new Error("只能输入1-6位数字"));
          }
        }
      } else {
        callback(new Error("小数点前后最多可1-5位数字"));
      }
    } else {
      callback(new Error("只能输入数字类型"));
    }
  }
};
export default {
  name: "offerFormulaDialog",
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    editRow: {
      type: Object
    }
  },
  data() {
    return {
      offerFromData: {},
      configList: [],
      radio: "",
      defaultFormRules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          {
            min: 1,
            max: 200,
            message: "字数在 1-200 个字符之间",
            trigger: "blur"
          }
        ],
        offerMethod: [
          { required: true, message: "请选择报价方式", trigger: "change" }
        ],
        cu_de: [{ required: true, message: "请选择币种", trigger: "change" }],
        exchange: [
          { required: true, message: "请输入汇率", trigger: "blur" },
          { validator: validateLength, trigger: "blur" }
        ],
        decimalPlaces: [
          { required: true, message: "请选择小数位数", trigger: "change" }
        ],
        profit: [{ required: true, message: "请输入利润", trigger: "blur" }],
        size: [{ required: true, message: "请选择尺码", trigger: "change" }],
        rejectionMethod: [
          { required: true, message: "请选择取舍方式", trigger: "change" }
        ]
      }
    };
  },
  created() {},
  mounted() {
    this.getSystemConfig();
    if (this.isEdit) {
      for (const key in this.editRow) {
        this.addDefaultForm[key] = this.editRow[key];
      }
    }
  },
  methods: {
    handleAddSymbol(val) {
      let str = this.offerFromData.formula + val;
      this.$set(this.offerFromData, "formula", str);
    },
    // 下拉框输入事件
    selectBlur(val) {
      if (isNaN(Number(val))) {
        this.addDefaultForm.size = null;
      }
    },
    // 选择币别事件
    changeSelect(val) {
      const { itemCode } = this.configList.find(item => item.parameter === val);
      this.offerFromData.cu_deName = itemCode;
    },
    // 获取系统配置
    async getSystemConfig() {
      const res = await this.$http.post("/api/ServiceConfigurationList", {
        basisParameters: "CompanyProductOffer"
      });
      if (res.data.result.code === 200) {
        this.configList = res.data.result.item;
      } else {
        this.$common.handlerMsgState({
          msg: res.data.result.msg,
          type: "danger"
        });
      }
    }
  }
};
</script>
<style scoped lang="less">
@deep: ~">>>";
@{deep} .el-form-item {
  margin-bottom: 16px;
}
.item {
  display: flex;
  align-items: center;
  width: 100%;
  .label {
    padding-left: 6px;
    min-width: 75px;
    box-sizing: border-box;
  }
  .custom {
    width: 130px;
    text-align: right;
  }
  .btnBox {
    display: flex;
    justify-content: space-between;
    .fastIcon {
      display: inline-block;
      vertical-align: bottom;
      width: 20px;
      height: 16px;
      background: url("~@/assets/images/fastIcon.png") no-repeat center;
      background-size: contain;
    }
  }
  .btn {
    width: 60px;
    height: 32px;
    box-sizing: border-box;
    background: #f5f5f5;
    border: 1px solid #dcdfe6;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 14px;
    cursor: pointer;
  }
  @{deep} .left {
    .el-form-item {
      margin-bottom: 0 !important;
    }
  }
  @{deep}.right {
    width: 359px;
    height: 80px;
    background: #ffffff;
    border: 1px solid #dcdfe6;
    border-radius: 5px;
    display: flex;
    align-items: center;
    .el-form-item {
      margin-bottom: 0 !important;
    }
  }
}
.bgxian {
  height: 1px;
  width: 100%;
  background: #dcdfe6;
}
.mainBox {
  .title {
    line-height: 40px;
    width: 100%;
    height: 40px;
    background: #f5f5f5;
    border-radius: 4px;
    margin-bottom: 20px;
    h3 {
      font-size: 15px;
      font-weight: 700;
      text-align: left;
      color: #333333;
      margin-left: 20px;
    }
  }
}
</style>
