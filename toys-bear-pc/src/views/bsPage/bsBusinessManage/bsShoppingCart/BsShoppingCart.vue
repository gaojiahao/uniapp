<template>
  <div class="bsMyCollection">
    <div class="title">购物车 ({{ tableData.length }})</div>
    <div class="tableBox">
      <el-table
        :data="tableData"
        style="width: 100%"
        ref="collecTable"
        size="mini"
        :header-cell-style="{ 'font-size': '14px', color: '#666' }"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column label="产品" width="300">
          <template slot-scope="scope">
            <div class="imgBox">
              <el-image
                fit="contain"
                style="width:80px;height:60px;"
                :src="scope.row.img"
                :preview-src-list="scope.row.imgUrlList"
              >
                <div slot="placeholder" class="errorImg">
                  <img src="~@/assets/images/imgError.png" alt />
                </div>
                <div slot="error" class="errorImg">
                  <img src="~@/assets/images/imgError.png" alt />
                </div>
              </el-image>
              <div class="productName">
                <div class="name">
                  {{ scope.row.name }}
                </div>
                <div class="factory">
                  {{ scope.row.supplierName }}
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="资料来源" align="center">
          <template slot-scope="scope">
            {{ scope.row.exhibitionName }}
          </template>
        </el-table-column>
        <el-table-column
          prop="fa_no"
          label="出厂货号"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column prop="ch_pa" label="包装" align="center" width="100">
        </el-table-column>
        <el-table-column label="产品规格" align="center">
          <template slot-scope="scope">
            <span>
              {{ scope.row.pr_le }}x{{ scope.row.pr_wi }}x{{
                scope.row.pr_hi
              }}(cm)
            </span>
          </template>
        </el-table-column>
        <el-table-column label="包装规格" align="center">
          <template slot-scope="scope">
            <span>
              {{ scope.row.in_le }}x{{ scope.row.in_wi }}x{{
                scope.row.in_hi
              }}(cm)
            </span>
          </template>
        </el-table-column>
        <el-table-column label="外箱规格" align="center">
          <template slot-scope="scope">
            <span>
              {{ scope.row.ou_le }}x{{ scope.row.ou_wi }}x{{
                scope.row.ou_hi
              }}(cm)
            </span>
          </template>
        </el-table-column>
        <el-table-column label="体积/材积" align="center">
          <template slot-scope="scope">
            <span>
              {{ scope.row.bulk_stere }}(cbm)/{{ scope.row.bulk_feet }}(cuft)
            </span>
          </template>
        </el-table-column>
        <el-table-column label="毛重/净重" align="center" width="100">
          <template slot-scope="scope">
            <span> {{ scope.row.gr_we }}/{{ scope.row.ne_we }}(kg) </span>
          </template>
        </el-table-column>
        <el-table-column label="装箱量" align="center" width="100">
          <template slot-scope="scope">
            <span> {{ scope.row.in_en }}/{{ scope.row.ou_lo }}(pcs) </span>
          </template>
        </el-table-column>
        <el-table-column label="箱量" align="center" width="100">
          <template slot-scope="scope">
            <input
              class="inputNumber"
              type="number"
              @input="changeInputNumber($event, scope.row)"
              @focus="selectInputValue($event)"
              @keydown="nextInput($event)"
              v-model="scope.row.shoppingCount"
            />
          </template>
        </el-table-column>
        <el-table-column prop="price" label="单价" align="center" width="100">
          <template slot-scope="scope">
            <span style="color:#f56c6c">
              {{ scope.row.cu_de + scope.row.price }}
            </span>
          </template>
        </el-table-column>
        <el-table-column width="120" label="总价" align="center">
          <template slot-scope="scope">
            <p class="item price">
              <span>{{ scope.row.cu_de }}</span>
              <span>
                {{
                  priceCount(
                    scope.row.price,
                    scope.row.ou_lo,
                    scope.row.shoppingCount
                  )
                }}
              </span>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    /*
     * 判断obj是否为一个整数
     */
    isInteger(obj) {
      return Math.floor(obj) === obj;
    },
    /*
     * 将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100
     * @param floatNum {number} 小数
     * @return {object}
     *   {times:100, num: 314}
     */
    toInteger(floatNum) {
      const ret = { times: 1, num: 0 };
      if (this.isInteger(floatNum)) {
        ret.num = floatNum;
        return ret;
      }
      const strfi = floatNum + "";
      const dotPos = strfi.indexOf(".");
      const len = strfi.substr(dotPos + 1).length;
      const times = Math.pow(10, len);
      const intNum = parseInt(floatNum * times + 0.5, 10);
      ret.times = times;
      ret.num = intNum;
      return ret;
    },
    /*
     * 核心方法，实现加减乘除运算，确保不丢失精度
     * 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
     *
     * @param a {number} 运算数1
     * @param b {number} 运算数2
     * @param digits {number} 精度，保留的小数点数，比如 2, 即保留为两位小数
     * @param op {string} 运算类型，有加减乘除（add/subtract/multiply/divide）
     *
     */
    operation(a, b, digits, op) {
      const o1 = this.toInteger(a);
      const o2 = this.toInteger(b);
      const n1 = o1.num;
      const n2 = o2.num;
      const t1 = o1.times;
      const t2 = o2.times;
      const max = t1 > t2 ? t1 : t2;
      let result = null;
      switch (op) {
        case "add":
          if (t1 === t2) {
            // 两个小数位数相同
            result = n1 + n2;
          } else if (t1 > t2) {
            // o1 小数位 大于 o2
            result = n1 + n2 * (t1 / t2);
          } else {
            // o1 小数位 小于 o2
            result = n1 * (t2 / t1) + n2;
          }
          return result / max;
        case "subtract":
          if (t1 === t2) {
            result = n1 - n2;
          } else if (t1 > t2) {
            result = n1 - n2 * (t1 / t2);
          } else {
            result = n1 * (t2 / t1) - n2;
          }
          return result / max;
        case "multiply":
          result = (n1 * n2) / (t1 * t2);
          return result;
        case "divide":
          result = (n1 / n2) * (t2 / t1);
          return result;
      }
    },
    // 加
    add(a, b, digits) {
      return this.operation(a, b, digits, "add");
    },
    // 减
    subtract(a, b, digits) {
      return this.operation(a, b, digits, "subtract");
    },
    // 乘
    multiply(a, b, digits) {
      return this.operation(a, b, digits, "multiply");
    },
    // 除
    divide(a, b, digits) {
      return this.operation(a, b, digits, "divide");
    },
    // 单个产品总价
    priceCount(price, outerBoxLo, shoppingCount) {
      return this.multiply(this.multiply(price, outerBoxLo), shoppingCount);
    },
    // 计算总个数量
    myTotalGe() {
      let number = 0;
      for (let i = 0; i < this.dataList.length; i++) {
        number = this.add(
          number,
          this.multiply(
            this.dataList[i].shoppingCount,
            this.dataList[i].outerBoxLo
          )
        );
      }
      return number;
    },
    // 计算总毛重
    totalMaozhong() {
      let number = 0;
      for (let i = 0; i < this.dataList.length; i++) {
        number = this.add(
          number,
          this.multiply(
            this.dataList[i].shoppingCount,
            this.dataList[i].outerBoxWeight
          )
        );
      }
      return number;
    },
    // 计算总净重
    totalJingzhong() {
      let number = 0;
      for (let i = 0; i < this.dataList.length; i++) {
        number = this.add(
          number,
          this.multiply(
            this.dataList[i].shoppingCount,
            this.dataList[i].outerBoxNetWeight
          )
        );
      }
      return number;
    },
    // 计算总箱数量
    myTotalQuantity() {
      let number = 0;
      for (let i = 0; i < this.dataList.length; i++) {
        number = this.add(number, this.dataList[i].shoppingCount || 0);
      }
      return number;
    },
    // 删除购物车中的某项
    handleDelete(row) {
      this.$store.commit("popShopping", row);
      this.dataList.forEach((val, i) => {
        if (val.id === row.id) {
          this.dataList.splice(i, 1);
          this.$message.error(this.publicLang.deleteSuccessful);
        }
      });
      console.log(123);
      this.$root.eventHub.$emit("resetProductsForeach", this.dataList);
    },
    // 计算总价
    myTotalPrice(list) {
      let price = 0;
      for (let i = 0; i < list.length; i++) {
        price = this.add(
          price,
          this.multiply(
            this.multiply(list[i].price, list[i].shoppingCount),
            list[i].outerBoxLo
          )
        );
      }
      return price;
    },
    // 计算总体积材积
    myTotalVolume(list) {
      let outerBoxStere = 0,
        outerBoxFeet = 0;
      for (let i = 0; i < list.length; i++) {
        outerBoxStere = this.add(
          outerBoxStere,
          this.multiply(list[i].outerBoxStere, list[i].shoppingCount)
        );
        outerBoxFeet = this.add(
          outerBoxFeet,
          this.multiply(list[i].outerBoxFeet, list[i].shoppingCount)
        );
      }
      return {
        outerBoxStere,
        outerBoxFeet
      };
    },
    // 修改购物车数量
    changeInputNumber(e, val) {
      const re = /^[0-9]+.?[0-9]*/;
      if (!re.test(e.target.value)) {
        e.target.value = 0;
      } else if (e.target.value.length > 5) {
        e.target.value = e.target.value.slice(0, 5);
      } else if (!e.target.value) {
        e.target.value = 0;
      } else if (e.target.value.length > 1 && e.target.value[0] == 0) {
        e.target.value = e.target.value.slice(1, 5);
      }
      val.shoppingCount = Number(e.target.value);
      this.$store.commit("replaceShoppingCartValueCount", this.dataList);
    },
    // 点击选中输入框中的所有值
    selectInputValue(e) {
      e.currentTarget.select();
    },
    // 点击上下键盘
    nextInput(e) {
      if (e.keyCode === 40) {
        const inputs = document.getElementsByClassName("inputNumber");
        for (let i = 0; i < inputs.length; i++) {
          // 如果是最后一个，则焦点回到第一个
          if (i == inputs.length - 1) {
            inputs[0].focus();
          } else if (e.target == inputs[i]) {
            inputs[i + 1].focus();
            break; //不加最后一行eles就直接回到第一个输入框
          }
        }
        e.stopPropagation();
        e.preventDefault();
        e.returnValue = false;
        e.cancelBubble = true;
      } else if (e.keyCode === 38) {
        const inputs = document.getElementsByClassName("inputNumber");
        for (let i = 0; i < inputs.length; i++) {
          // 如果是最后一个，则焦点回到第一个
          if (i === 0) {
            inputs[inputs.length - 1].focus();
          } else if (e.target == inputs[i]) {
            inputs[i - 1].focus();
            break; //不加最后一行eles就直接回到第一个输入框
          }
        }
        e.stopPropagation();
        e.preventDefault();
        e.returnValue = false;
        e.cancelBubble = true;
      }
    }
  },
  created() {},
  mounted() {
    this.tableData = this.shoppingList
      ? JSON.parse(JSON.stringify(this.shoppingList))
      : [];
  },
  computed: {
    ...mapGetters({
      shoppingList: "myShoppingList"
    })
  }
};
</script>
<style scoped lang="less">
@deep: ~">>>";
.bsMyCollection {
  min-height: 100%;
  background-color: #fff;
  padding: 0 20px;
  .title {
    height: 55px;
    line-height: 55px;
    font-size: 15px;
    font-weight: 700;
    padding-left: 15px;
    box-sizing: border-box;
    position: relative;
    border-bottom: 1px solid #e5e5e5;
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
  .tableBox {
    @{deep} .el-table {
      font-size: 13px;
      .inputNumber {
        width: 50px;
        outline: none;
        -moz-appearance: textfield;
        text-align: center;
        color: #ff3e3e;
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          appearance: none;
          margin: 0;
        }
      }
      .price {
        color: #ff3e3e;
      }
      .tableTotalNumber {
        color: #ff3e3e;
        font-size: 14px;
        margin-top: 5px;
      }
      .imgBox {
        text-align: left;
        display: flex;
        font-size: 14px;
        .productName {
          width: 190px;
          height: 60px;
          margin-left: 15px;
          .name,
          .factory {
            width: 190px;
            max-width: 190px;
            overflow: hidden; /*超出部分隐藏*/
            white-space: nowrap; /*不换行*/
            text-overflow: ellipsis; /*超出部分文字以...显示*/
          }
          .factory {
            color: #3368a9;
          }
          .name {
            margin-top: 8px;
          }
        }
      }
    }
    .errorImg {
      img {
        width: 80px;
        height: 60px;
      }
    }
  }
}
</style>
