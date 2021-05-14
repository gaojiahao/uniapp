<!--  -->
<template>
  <div class="myTable">
    <Table :table="tableData"></Table>
  </div>
</template>

<script>
import Table from "@/components/table";
// import eventBus from "@/assets/js/common/eventBus";
export default {
  name: "bsTableItem",
  components: {
    Table
  },
  props: {
    myData: {
      type: Array
    },
    size: {
      type: String,
      default: "mini"
    }
  },
  watch: {
    myData: {
      deep: true,
      immediate: true,
      handler(val) {
        console.log(val);
        if (val.length) {
          this.$set(this.tableData, "data", val);
        }
      }
    }
  },
  data() {
    return {
      tableData: {
        data: [],
        showLoading: false,
        sizeMini: this.size,
        isIndex: true,
        columns: [
          {
            prop: "orderNumber",
            minWidth: 100,
            isHiden: true,
            label: "报价单号",
            event: row => {
              const fd = {
                name: "详情" + row.offerNumber,
                linkUrl: "/bsIndex/bsSampleQuotation",
                component: "bsSampleQuotationDetails",
                refresh: true,
                label: "详情" + row.offerNumber,
                value: row
              };
              this.$store.commit("myAddTab", fd);
            },
            isCallback: row => {
              return (
                "<span style='color: #3368a9; cursor: pointer;'>" +
                row.offerNumber +
                "</span>"
              );
            }
          },
          {
            prop: "customerName",
            isHiden: true,
            label: "客户名称"
          },
          {
            prop: "createdOn",
            isHiden: true,
            label: "报价时间",
            render: row => {
              return row.createdOn ? row.createdOn.replace(/T.*/, "") : "";
            }
          },
          {
            prop: "linkman",
            isHiden: true,
            label: "业务员"
          },
          {
            prop: "total",
            isHiden: true,
            label: "报价总数"
          },
          {
            prop: "orgPersonnelName",
            isHiden: true,
            label: "总金额",
            color: "#eb1515",
            render: row => {
              return row.cu_de + row.offerTotalAmount;
            }
          },
          {
            prop: "cu_deName",
            isHiden: true,
            label: "币种"
          },
          {
            prop: "exchange",
            isHiden: true,
            label: "汇率"
          },
          {
            prop: "profit",
            isHiden: true,
            label: "利润"
          },
          {
            prop: "profit",
            isHiden: true,
            label: "状态",
            render(row) {
              let str = "";
              switch (row.status) {
                case 0:
                  str = "未审核";
                  break;
                case 1:
                  str = "审核通过";
                  break;
                case 2:
                  str = "审核不通过";
                  break;
              }
              return str;
            }
          }
        ],
        actions: [
          {
            type: "success",
            textWrapper() {
              return "编辑";
            },
            disabledWrapper(row) {
              return row.offerNumber[0] == "S";
            },
            methods: row => {
              const fd = {
                name: "编辑" + row.offerNumber,
                linkUrl: "/bsIndex/bsSampleQuotation",
                component: "bsSampleUpdata",
                refresh: true,
                label: "编辑" + row.offerNumber,
                value: row
              };
              this.$store.commit("myAddTab", fd);
            }
          },
          {
            type: "info",
            textWrapper() {
              return "推送";
            },
            disabledWrapper(row) {
              return row.offerNumber[0] == "S";
            },
            methods: row => {
              console.log(row);
            }
          },
          {
            type: "danger",
            textWrapper() {
              return "删除";
            },
            disabledWrapper(row) {
              return row.offerNumber[0] == "S";
            },
            methods: row => {
              this.$emit("handleDelete", row);
            }
          },
          {
            type: "warning",
            textWrapper() {
              return "导出";
            },
            methods: row => {
              this.$emit("exportOrder", row);
            }
          }
        ]
      }
    };
  },
  created() {},
  mounted() {
    this.tableData.data = this.myData;
  },
  methods: {}
};
</script>
<style scoped lang="less"></style>
