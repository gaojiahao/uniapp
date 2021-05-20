<template>
  <div class="clientOrderDetails">
    <div class="title">客户订单详情</div>
    <ul class="customerInfoBox">
      <li class="itemBox">
        <span>订单编号：</span>
        <span class="orderNumber">{{ item.orderNumber }}</span>
      </li>
      <div class="clientContentBox">
        <li class="clientItem">
          <span>客户：</span>
          <span class="content">{{ item.customerName }}</span>
        </li>
        <li class="clientItem">
          <span>业务员：</span>
          <span class="content">{{ item.createdBy }}</span>
        </li>
        <li class="clientItem">
          <span>公司名称：</span>
          <span class="content">{{ item.companyName }}</span>
        </li>
        <li class="clientItem">
          <span>联系人：</span>
          <span class="content">{{ item.contactName }}</span>
        </li>
        <li class="clientItem">
          <span>邮箱：</span>
          <span class="content">{{ item.email }}</span>
        </li>
      </div>
      <div class="clientContentBox">
        <li class="clientItem">
          <span>择样时间：</span>
          <span class="content">
            {{ item.createdOn && item.createdOn.replace(/T/, " ") }}
          </span>
        </li>
        <li class="remark">
          <span>备注：</span>
          <span class="content">{{ item.remark }}</span>
        </li>
      </div>
    </ul>
    <div class="mytableBox">
      <div class="tableTitle">
        <div class="titleText">
          <span class="title">产品列表</span>
          ({{ totalCount }})
        </div>
        <el-button size="medium" @click="openSelectTemplate" type="warning">
          <i class="iconfont icon-daochujinruchukou"></i>
          导出列表
        </el-button>
      </div>
      <bsTables :table="tableData" />
      <center style="margin-top: 20px">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          background
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          :total="totalCount"
          :current-page.sync="currentPage"
          @current-change="currentChange"
          @size-change="handleSizeChange"
        ></el-pagination>
      </center>
      <div class="totalBoxFooter" style="width: 1670px;">
        <div class="totalBox">
          <p class="item">
            <span class="itemTitle">总款数：</span>
            <span>{{ options.totalKuanshu }}</span>
          </p>
          <p class="item">
            <span class="itemTitle">总箱数：</span>
            <span>{{ options.totalCount }}</span>
          </p>
          <p class="item">
            <span class="itemTitle">总数量：</span>
            <span>{{ calculationTotalBox(tableData.data) }}</span>
          </p>
          <p class="item">
            <span class="itemTitle">总体积/总材积：</span>
            <span>{{ options.totalStere }}</span
            >/<span>{{ options.totalFeet }}</span>
          </p>
          <p class="item">
            <span class="itemTitle">总毛重/总净重：</span>
            <span
              >{{ options.totalGrossWeight }}/{{
                options.totalNetWeight
              }}(KG)</span
            >
          </p>
          <p class="item">
            <span class="itemTitle">总出厂价/总金额：</span>
            <span style="color: #3368a9">
              ￥
            </span>
            <span style="color: #3368a9">{{ options.totalCostPrice }}</span>
            <span style="margin: 5px"></span>
            <span class="price">
              {{ options.currencyType }}
            </span>
            <span class="price">{{ options.totalAmount }}</span>
          </p>
        </div>
      </div>
    </div>

    <!-- 导出订单模板dialog -->
    <transition name="el-zoom-in-center">
      <el-dialog
        title="订单模板"
        class="exportOrder"
        v-if="exportTemplateDialog"
        :visible.sync="exportTemplateDialog"
        width="1200px"
      >
        <bsExportOrder
          :orderNumber="item.orderNumber"
          :customerName="item.customerName"
          api="/api/ExportCustomerOrderDetailToExcel"
        />
      </el-dialog>
    </transition>
  </div>
</template>

<script>
import bsExportOrder from "@/components/bsComponents/bsSiteSharingComponent/bsExportOrder";
import bsTables from "@/components/table";
export default {
  components: { bsExportOrder, bsTables },
  props: {
    item: {
      type: Object
    }
  },
  data() {
    return {
      tableData: {
        data: [],
        showLoading: false,
        sizeMini: "mini",
        isIndex: true,
        columns: [
          {
            prop: "productName",
            label: "产品",
            width: 300,
            color: "#3368a9",
            align: "left",
            // isHiden: true,
            infoBox: true,
            productInfo: true,
            elImage: row => {
              return row.productImage;
            },
            nameHtml: row => {
              return row.productName;
            },
            fcatoryNameHtml: row => {
              return row.supplierName;
            }
          },
          {
            prop: "supplierPhone",
            label: "联系厂商",
            render: row => {
              switch (row.supplierTelephoneNumber) {
                case "":
                case null:
                case undefined:
                case "null":
                case "undefined":
                  row.supplierTelephoneNumber = "";
                  break;
              }
              switch (row.supplierPhone) {
                case "":
                case null:
                case undefined:
                case "null":
                case "undefined":
                  row.supplierTelephoneNumber = "";
                  break;
              }
              return row.supplierPhone + "<br>" + row.supplierTelephoneNumber;
            }
          },
          {
            prop: "exhibitionName",
            isHiden: true,
            label: "资料来源"
          },
          { prop: "fa_no", label: "出厂货号", isHiden: true },
          { prop: "ch_pa", label: "包装", isHiden: true, width: 90 },
          {
            prop: "pr_le",
            label: "产品规格(cm)",
            renderHeard: () => {
              return "产品规格<br /> (cm)";
            },
            isHiden: true,
            render: row => {
              return row.pr_le + "x" + row.pr_wi + "x" + row.pr_hi;
            }
          },
          {
            prop: "pr_le",
            label: "包装规格(cm)",
            renderHeard: () => {
              return "包装规格<br /> (cm)";
            },
            isHiden: true,
            render: row => {
              return row.in_le + "x" + row.in_wi + "x" + row.in_hi;
            }
          },
          {
            prop: "pr_le",
            label: "外箱规格(cm)",
            renderHeard: () => {
              return "外箱规格<br /> (cm)";
            },
            isHiden: true,
            render: row => {
              return row.ou_le + "x" + row.ou_wi + "x" + row.ou_hi;
            }
          },
          {
            prop: "bulk_stere",
            label: "体积(cbm)/材积(cuft)",
            isHiden: true,
            renderHeard: () => {
              return "体积/材积<br />(cbm)/(cuft)";
            },
            width: 150,
            render: row => {
              return row.bulk_stere + "/" + row.bulk_feet;
            }
          },
          {
            prop: "gr_we",
            label: "毛重/净重(kg)",
            isHiden: true,
            renderHeard: () => {
              return "毛重/净重<br />(kg)";
            },
            width: 100,
            render: row => {
              return row.gr_we + "/" + row.ne_we;
            }
          },
          {
            prop: "in_en",
            label: "装箱量(pcs)",
            renderHeard: () => {
              return "装箱量<br />(pcs)";
            },
            isHiden: true,
            render: row => {
              return row.in_en + "/" + row.ou_lo;
            }
          },
          {
            prop: "productCount",
            label: "箱数",
            width: 50,
            isHiden: true
          },
          {
            label: "数量",
            isHiden: true,
            width: 50,
            render: row => {
              return row.productCount * row.ou_lo;
            }
          },
          {
            prop: "costPrice",
            label: "参考单价",
            isHiden: true,
            width: 70,
            color: "#3368a9",
            render: row => {
              return "￥" + row.costPrice;
            }
          },
          {
            prop: "productPrice",
            label: "报出价",
            isHiden: true,
            width: 70,
            color: "#f56c6c",
            render: row => {
              return this.options.currencyType + row.productPrice;
            }
          },
          {
            prop: "OfferTotalAmount",
            label: "报出总价",
            width: 70,
            isHiden: true,
            color: "#f56c6c",
            render: row => {
              return this.priceCount(
                row.productCount,
                row.ou_lo,
                row.productPrice
              );
            }
          }
        ],
        btnWidth: 100
      },
      exportTemplateDialog: false,
      isOrderDetailDialog: false,
      options: {},
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      orderOption: {}
    };
  },
  created() {
    console.log(this.item, "客户详情");
  },
  mounted() {
    this.getSearchCompanyShareOrderDetailsPage();
  },
  methods: {
    // 去消息聊天
    toNews(item) {
      console.log(item);
      const fd = {
        name: "/bsIndex/bsNews",
        linkUrl: "/bsIndex/bsNews",
        component: "bsNews",
        refresh: true,
        label: "消息"
      };
      this.$store.commit("myAddTab", fd);
      this.$router.push("/bsIndex/bsNews");
    },
    // 去厂商
    toFactory(item) {
      if (!item.supplierNumber) {
        this.$common.handlerMsgState({
          msg: "该厂商没有厂商编号，请联系管理员",
          type: "danger"
        });
        return false;
      }
      const fd = {
        name: item.supplierNumber,
        linkUrl: "/bsIndex/bsVendorQuery",
        component: "bsMyClientsDetail",
        refresh: true,
        label: item.supplierName,
        value: {
          companyNumber: item.supplierNumber,
          companyLogo: item.productImage,
          companyName: item.supplierName,
          contactsMan: item.productName,
          phoneNumber: item.supplierPhone,
          address: item.supplierAddres || item.supplierAddress || ""
        }
      };
      this.$store.commit("myAddTab", fd);
      this.$router.push("/bsIndex/bsVendorQuery");
    },
    // 打开选择导出模板
    openSelectTemplate() {
      this.exportTemplateDialog = true;
      // const str = "http://124.71.6.26:8087/ConversationListIcon.rar";
      // const link = document.createElement("a");
      // link.href = str;
      // link.style.display = "none";
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link); // 释放元素
    },
    // 获取分享客户订单
    async getSearchCompanyShareOrderDetailsPage() {
      const res = await this.$http.post(
        "/api/SearchCompanyShareOrderDetailsPage",
        {
          skipCount: this.currentPage,
          maxResultCount: this.pageSize,
          shareOrderNumber: this.item.orderNumber
        }
      );
      if (res.data.result.code === 200) {
        this.options = res.data.result.item;
        this.tableData.data = res.data.result.item.shareOrderDetails.items;
        this.totalCount = res.data.result.item.shareOrderDetails.totalCount;
      } else {
        this.$common.handlerMsgState({
          msg: res.data.result.msg,
          type: "danger"
        });
      }
    },
    // 点击产品名字跳转
    goDetails(row) {
      const fd = {
        name: row.productName + row.fa_no,
        linkUrl: "/bsIndex/bsCustomerOrder",
        component: "bsProductDetails",
        refresh: true,
        label: row.fa_no || "产品详情",
        value: row
      };
      this.$router.push("/bsIndex/bsProductSearchIndex");
      this.$store.commit("myAddTab", fd);
    },
    // 切换当前页
    currentChange(page) {
      this.currentPage = page;
      this.getSearchCompanyShareOrderDetailsPage();
    },
    // 切换当前页条数
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      if (
        this.currentPage * pageSize > this.totalCount &&
        this.currentPage != 1
      )
        return false;
      this.getSearchCompanyShareOrderDetailsPage();
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
    // 计算总数量
    calculationTotalBox(list) {
      let number = 0;
      for (let i = 0; i < list.length; i++) {
        number = this.add(
          number,
          this.multiply(list[i].productCount, list[i].ou_lo) || 0
        );
      }
      return number;
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
    // 总数量
    sumPriceCount(boxNumber, ou_lo) {
      return this.multiply(boxNumber, ou_lo);
    },
    // 单个产品总价
    priceCount(price, ou_lo, boxNumber) {
      return this.multiply(this.multiply(price, ou_lo), boxNumber);
    }
  }
};
</script>
<style scoped lang="less">
@deep: ~">>>";
.clientOrderDetails {
  min-height: 100%;
  background-color: #fff;
  padding: 0 20px;
  padding-bottom: 100px;
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
  .customerInfoBox {
    // padding: 20px 0;
    .itemBox {
      line-height: 34px;
      margin-top: 20px;
      .orderNumber {
        font-weight: 700;
      }
    }
    .clientContentBox {
      margin-top: 12px;
      display: flex;
      .clientItem {
        width: 300px;
      }
      .remark {
        flex: 1;
      }
      &:last-of-type {
        padding-bottom: 20px;
      }
    }
  }
  .mytableBox {
    .tableTitle {
      padding-bottom: 18px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 15px;
      .titleText {
        .title {
          font-weight: 700;
          border: none;
        }
      }
    }
    .totalBoxFooter {
      position: absolute;
      width: 100%;
      margin-right: 30px;
      z-index: 1;
      left: 0;
      bottom: 0;
      box-sizing: border-box;
      padding-right: 20px;

      .totalBox {
        width: 100%;
        background-color: #fff;
        height: 80px;
        padding: 0 20px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: flex-end;
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
    .errorImg {
      img {
        width: 80px;
        height: 60px;
      }
    }
  }
}
@{deep} .exportOrder {
  .el-dialog__body {
    padding: 0;
  }
}
</style>
