<template>
  <div class="bsSampleUpdata">
    <div class="title">
      <div class="left">报价详情</div>
    </div>
    <bsSampleSearch :searchFormAata="searchFormAata"></bsSampleSearch>
    <div class="bsSampleTable">
      <div class="left">
        报价商品列表
      </div>
      <div class="tableBox">
        <el-table
          :data="tableData"
          style="width: 100%"
          ref="collecTable"
          :header-cell-style="{ 'font-size': '14px', color: '#666' }"
        >
          <el-table-column prop="img" label="产品" align="center" width="300">
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
                    <div class="fcatoryName">
                      {{ scope.row.supplierName }}
                    </div>
                    <div class="icons">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="scope.row.supplierPhone || '暂时没有厂商电话'"
                        placement="top"
                      >
                        <div class="cartPhoneIcon"></div>
                      </el-tooltip>
                      <div class="cartInfoIcon"></div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="资料来源" align="center">
            <template slot-scope="scope">
              {{ scope.row.supplierName }}
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
                {{ scope.row.ou_le }}x{{ scope.row.ou_wi }}x{{
                  scope.row.ou_hi
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
          <el-table-column label="箱数" align="center" width="100">
            <template slot-scope="scope">
              <span> {{ scope.row.in_en }}/{{ scope.row.ou_lo }}(pcs) </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="ch_pa"
            label="总数量"
            align="center"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="unitPrice"
            label="单价"
            align="center"
            width="100"
          >
            <template slot-scope="scope">
              <span style="color:#f56c6c">
                {{ scope.row.cu_de + scope.row.unitPrice }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="OfferTotalAmount"
            label="总价"
            align="center"
            width="100"
          >
            <template slot-scope="scope">
              <span style="color:#f56c6c">
                {{ scope.row.cu_de + scope.row.OfferTotalAmount }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            header-align="center"
            align="center"
            width="100"
          >
            <template slot-scope="scope">
              <el-popconfirm
                title="确定要删除吗？"
                @confirm="handleDelete(scope.row)"
              >
                <el-button
                  size="mini"
                  type="warning"
                  @click.stop
                  slot="reference"
                  >删除</el-button
                >
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="tableBto">
        <div class="right">
          <p class="item">
            <span class="itemTitle">总款数：</span>
            <span>{{ tableData.length }}</span>
          </p>
          <p class="item">
            <span class="itemTitle">总箱数：</span>
            <span>{{ myTotalQuantity(tableData) }}</span>
          </p>
          <p class="item">
            <span class="itemTitle">总体积/总材积：</span>
            <span
              >{{ myTotalVolume(tableData).outerBoxStere }}/{{
                myTotalVolume(tableData).outerBoxFeet
              }}</span
            >
          </p>
          <p class="item">
            <span class="itemTitle">总毛重/总净重：</span>
            <span>{{ totalMaozhong() }}/{{ totalJingzhong() }}(kg)</span>
          </p>
          <p class="item">
            <span class="itemTitle">总金额：</span>
            <span class="price">￥{{ myTotalPrice(tableData) }}</span>
          </p>
          <el-button
            type="primary"
            @click="openSub"
            style="margin-left: 10px;"
            size="small"
            >确定提交</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import bsSampleSearch from "@/components/bsComponents/bsSampleComponent/bsSampleSearch";
export default {
  name: "bsSampleUpdata",
  components: {
    bsSampleSearch
  },
  props: {
    rowUpdata: {
      type: Object
    }
  },
  watch: {
    rowUpdata() {
      // this.getProductOfferDetailPage();
    }
  },
  data() {
    return {
      searchFormAata: {},
      tableData: [],
      formInline: {
        user: "",
        region: ""
      }
    };
  },
  created() {},

  mounted() {
    this.getProductOfferDetailPage();
  },
  methods: {
    // 获取列表
    async getProductOfferDetailPage() {
      const res = await this.$http.post(
        "/api/ProductOfferDetailPage",
        this.rowUpdata
      );
      if (res.data.result.code === 200) {
        this.tableData = res.data.result.item.items;
      } else {
        this.$message.error(res.data.result.msg);
      }
    },
    //确定提交
    openSub() {
      this.$emit("submit", 0);
    },
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
    priceCount(price, ou_lo, shoppingCount) {
      return this.multiply(this.multiply(price, ou_lo), shoppingCount);
    },
    // 计算总净重
    totalJingzhong() {
      let number = 0;
      for (let i = 0; i < this.tableData.length; i++) {
        number = this.add(
          number,
          this.multiply(
            this.tableData[i].shoppingCount,
            this.tableData[i].ne_we
          )
        );
      }
      return number;
    },
    // 计算总体积材积
    myTotalVolume(list) {
      let outerBoxStere = 0,
        outerBoxFeet = 0;
      for (let i = 0; i < list.length; i++) {
        outerBoxStere = this.add(
          outerBoxStere,
          this.multiply(list[i].bulk_stere, list[i].shoppingCount)
        );
        outerBoxFeet = this.add(
          outerBoxFeet,
          this.multiply(list[i].bulk_feet, list[i].shoppingCount)
        );
      }
      return {
        outerBoxStere,
        outerBoxFeet
      };
    },
    // 计算总毛重
    totalMaozhong() {
      let number = 0;
      for (let i = 0; i < this.tableData.length; i++) {
        number = this.add(
          number,
          this.multiply(
            this.tableData[i].shoppingCount,
            this.tableData[i].gr_we
          )
        );
      }
      return number;
    },
    onSubmit() {},
    // 计算总箱数量
    myTotalQuantity() {
      let number = 0;
      for (let i = 0; i < this.tableData.length; i++) {
        number = this.add(number, this.tableData[i].shoppingCount || 0);
      }
      return number;
    },
    // 计算总价
    myTotalPrice(list) {
      let price = 0;
      for (let i = 0; i < list.length; i++) {
        price = this.add(
          price,
          this.multiply(
            this.multiply(list[i].unitPrice, list[i].shoppingCount),
            list[i].ou_lo
          )
        );
      }
      return price;
    }
  }
};
</script>
<style scoped lang="less">
@deep: ~">>>";
.bsSampleUpdata {
  min-height: 100%;
  background-color: #fff;
  padding: 0 20px;
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
  .bsSampleTable {
    .left {
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
    }
    .tableBto {
      display: flex;
      align-items: center;
      height: 80px;
      padding-left: 10px;
      box-sizing: border-box;
      .right {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .item {
          margin-right: 15px;
          display: flex;
          align-items: center;
          // .itemTitle {
          // }
          .price {
            color: #eb1515;
            font-weight: 700;
            font-size: 18px;
          }
        }
      }
    }
  }

  @{deep} .tableBox {
    .el-table {
      font-size: 13px;
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
  }
}
</style>
