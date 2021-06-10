<template>
  <div class="bsSampleDetailComponent">
    <div class="tableBox">
      <Table :table="tableData" />
    </div>
    <!-- 统计值 -->
    <Summary :summaryData="summaryData"></Summary>
  </div>
</template>

<script>
import Table from "@/components/table";
import Summary from "@/components/summaryComponent/summary";
// import bsAddOfferFormulaLang from "@/components/bsComponents/bsPersonalManageComponent/bsAddOfferFormulaLang";
export default {
  props: {
    productList: {
      type: Array
    },
    orderData: {
      type: Object
    }
  },
  components: {
    Table,
    Summary
    // bsAddOfferFormulaLang
  },
  data() {
    return {
      summaryData: {
        //汇总数据
        totalDegree: 0, //总款数
        totalCartons: 0, //总箱数
        totalQuantity: 0, //总数量
        totalBulkStere: 0, //总体积
        totalBulkFeet: 0, //总材积
        totalGrWe: 0, //总毛重
        totalNeWe: 0, //总净重
        cu_de: "￥", //金额单位
        totalMoney: 0 //总金额
        // countData: [],
      },
      totalCount: 0,
      tableData: {
        data: [],
        height: "500px",
        showLoading: false,
        sizeMini: "mini",
        isIndex: true,
        columns: [
          {
            prop: "name",
            label: "产品",
            width: 280,
            color: "#3368a9",
            align: "left",
            // isHiden: true,
            infoBox: true,
            productInfo: true,
            cartInfoIcon: true,
            elImage: row => {
              return row.imgUrlList;
            },
            nameHtml: row => {
              return row.name;
            },
            fcatoryNameHtml: row => {
              return row.supplierName;
            }
          },
          {
            prop: "supplierPhone",
            label: "联系厂商",
            width: 100,
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
            prop: "companyName",
            isHiden: true,
            label: "资料来源"
          },
          { prop: "fa_no", Width: 60, label: "出厂货号", isHiden: true },
          { prop: "ch_pa", minWidth: 70, label: "包装", isHiden: true },
          {
            prop: "pr_le",
            minWidth: 100,
            renderHeard: () => {
              return "产品规格</br>(cm)";
            },
            isHiden: true,
            render: row => {
              return row.pr_le + "x" + row.pr_wi + "x" + row.pr_hi;
            }
          },
          {
            prop: "pr_le",
            minWidth: 100,
            renderHeard: () => {
              return "包装规格</br>(cm)";
            },
            isHiden: true,
            render: row => {
              return row.in_le + "x" + row.in_wi + "x" + row.in_hi;
            }
          },
          {
            prop: "pr_le",
            minWidth: 100,
            renderHeard: () => {
              return "外箱规格</br>(cm)";
            },
            isHiden: true,
            render: row => {
              return row.ou_le + "x" + row.ou_wi + "x" + row.ou_hi;
            }
          },
          {
            prop: "bulk_stere",

            renderHeard: () => {
              return "体积/材积</br>(cbm)/(cuft)";
            },
            isHiden: true,
            minWidth: 100,
            render: row => {
              return row.bulk_stere + "/" + row.bulk_feet;
            }
          },
          {
            prop: "gr_we",
            minWidth: 90,
            renderHeard: () => {
              return "毛重/净重</br>(kg)";
            },
            isHiden: true,
            render: row => {
              return row.gr_we + "/" + row.ne_we;
            }
          },
          {
            prop: "in_en",

            renderHeard: () => {
              return "装箱量</br>(pcs)";
            },
            isHiden: true,
            render: row => {
              return row.in_en + "/" + row.ou_lo;
            }
          },
          {
            prop: "boxNumber",
            label: "箱数",
            width: 50
          },
          {
            label: "数量",
            width: 50,
            render: row => {
              return this.$calculate.countTotalQuantity(
                row.boxNumber,
                row.ou_lo
              );
            }
          },
          {
            prop: "price",
            label: "厂价",
            width: 100,
            color: "red",
            render: row => {
              return "￥" + row.price;
            }
          },
          {
            prop: "offerAmount",
            label: "报出价",
            width: 100,
            padding: "0  2px",
            color: "red",
            render: row => {
              return row.cu_de + row.offerAmount;
            }
          },
          {
            prop: "OfferTotalAmount",
            label: "报出总价",
            width: 100,
            padding: "0  2px",
            color: "red",
            render: row => {
              return (
                row.cu_de +
                this.$calculate.countTotalprice(
                  row.offerAmount,
                  row.ou_lo,
                  row.boxNumber
                )
              );
            }
          }
        ]
      }
    };
  },
  methods: {
    // 点击产品名字跳转
    goDetails(row) {
      const fd = {
        name: row.productName + row.fa_no,
        linkUrl: "/bsIndex/bsSampleQuotation",
        component: "bsProductDetails",
        refresh: true,
        label: row.fa_no || "产品详情",
        value: row
      };
      this.$store.commit("myAddTab", fd);
    },
    // 获取列表
    async getProductOfferDetailPage() {
      if (this.orderData.orderNumber.indexOf("S") < 0) {
        const fd = Object.assign({
          skipCount: 1,
          maxResultCount: 500,
          offerNumber: this.orderData.orderNumber
        });

        const res = await this.$http.post("/api/ProductOfferDetailPage", fd);
        if (res.data.result.code === 200) {
          this.totalCount = res.data.result.item.totalCount;
          this.tableData.data = res.data.result.item.items;
          this.handleCountData(res.data.result.item.items);
        } else {
          this.$message.error(res.data.result.msg);
        }
      } else {
        const fd_s = {
          skipCount: 1,
          maxResultCount: 500,
          offerNumber: this.orderData.orderNumber
        };
        const res = await this.$http.post(
          "/api/CompanySamplelistByNumber",
          fd_s
        );
        if (res.data.result.code === 200) {
          this.totalCount = res.data.result.item.totalCount;
          this.tableData.data = res.data.result.item.items;
          this.handleCountData(res.data.result.item.items);
        } else {
          this.$message.error(res.data.result.msg);
        }
      }
    },
    //计算汇总数据
    handleCountData(array) {
      //总款数
      this.summaryData.totalDegree = array.length;
      this.summaryData.cu_de = this.orderData.cu_de;
      //金额单位
      for (let i = 0; i < array.length; i++) {
        //总箱数
        this.summaryData.totalCartons = this.$calculate.add(
          this.summaryData.totalCartons,
          array[i].boxNumber || 0
        );
        //总数量
        this.summaryData.totalQuantity = this.$calculate.add(
          this.summaryData.totalQuantity,
          this.$calculate.multiply(array[i].boxNumber, array[i].ou_lo) || 0
        );
        //总体积
        this.summaryData.totalBulkStere = this.$calculate.add(
          this.summaryData.totalBulkStere,
          this.$calculate.multiply(array[i].boxNumber, array[i].bulk_stere) || 0
        );
        //总材积
        this.summaryData.totalBulkFeet = this.$calculate.add(
          this.summaryData.totalBulkFeet,
          this.$calculate.multiply(array[i].boxNumber, array[i].bulk_feet) || 0
        );
        //总毛重
        this.summaryData.totalGrWe = this.$calculate.add(
          this.summaryData.totalGrWe,
          this.$calculate.multiply(array[i].boxNumber, array[i].gr_we) || 0
        );
        //总净重
        this.summaryData.totalNeWe = this.$calculate.add(
          this.summaryData.totalNeWe,
          this.$calculate.multiply(array[i].boxNumber, array[i].ne_we) || 0
        );
        //总金额
        this.summaryData.totalMoney = this.$calculate.add(
          this.summaryData.totalMoney,
          this.$calculate.multiply(
            this.$calculate.multiply(array[i].offerAmount, array[i].boxNumber),
            array[i].ou_lo
          )
        );
      }

      console.log(this.summaryData, "summaryData");
    }
  },
  created() {
    console.log(this.orderData, "orderData");
    switch (this.orderData.title) {
      case "展厅业务推送":
        break;
      case "报价推送":
        this.getProductOfferDetailPage();
        break;
      case "采购推送":
        break;
      default:
        this.$common.handlerMsgState({
          msg: "该订单没有明细",
          type: "danger"
        });
    }
  },
  mounted() {
    console.log(this.orderData, "orderData");
  }
};
</script>
<style scoped lang="less">
@deep: ~">>>";
.bsSampleDetailComponent {
  padding-bottom: 40px;
}
</style>
