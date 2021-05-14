<!--  -->
<template>
  <div>
    <Table :table="tableData"></Table>
  </div>
</template>

<script>
import Table from "@/components/table";
import eventBus from "@/assets/js/common/eventBus";
export default {
  name: "bsTableItem",
  components: {
    Table
  },
  props: {
    productList: {
      type: Array
    }
  },
  watch: {
    productList: {
      deep: true,
      immediate: true,
      handler(val) {
        this.$set(this.tableData, "data", val);
      }
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
            prop: "name",
            label: "产品",
            width: 300,
            color: "#3368a9",
            align: "left",
            isHiden: true,
            productInfo: true,
            elImage: row => {
              return row.imgUrl;
            },
            nameHtml: row => {
              return row.pr_na;
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
            isHiden: true,
            renderHeard: () => {
              return "产品规格(cm)";
            },
            render: row => {
              return row.pr_le + "x" + row.pr_wi + "x" + row.pr_hi;
            }
          },
          {
            prop: "pr_le",
            label: "包装规格(cm)",
            isHiden: true,
            renderHeard: () => {
              return "包装规格(cm)";
            },
            render: row => {
              return row.in_le + "x" + row.in_wi + "x" + row.in_hi;
            }
          },
          {
            prop: "pr_le",
            label: "外箱规格",
            isHiden: true,
            renderHeard: () => {
              return "外箱规格(cm)";
            },
            render: row => {
              return row.ou_le + "x" + row.ou_wi + "x" + row.ou_hi;
            }
          },
          {
            prop: "bulk_stere",
            label: "体积(cbm)/材积(cuft)",
            isHiden: true,
            width: 150,
            render: row => {
              return row.bulk_stere + row.bulk_feet;
            }
          },
          {
            prop: "gr_we",
            label: "毛重/净重(kg)",
            isHiden: true,
            render: row => {
              return row.gr_we + "/" + row.ne_we;
            }
          },
          {
            prop: "in_en",
            label: "装箱量(pcs)",
            width: 90,
            isHiden: true,
            render: row => {
              return row.in_en + "/" + row.ou_lo;
            }
          },
          {
            prop: "fa_pr",
            label: "参考单价",
            isHiden: true,
            width: 80,
            color: "red",
            render: row => {
              return row.cu_de + " " + row.fa_pr;
            }
          },
          {
            prop: "ha_in_qu",
            label: "报出价",
            isHiden: true,
            width: 80,
            color: "red",
            render: row => {
              return row.cu_de + " " + row.ha_in_qu;
            }
          }
        ]
      }
    };
  },
  created() {},
  mounted() {
    this.tableData.data = this.productList;
    // this.$set(this.tableData, "data", this.productList);
    eventBus.$on("upDateProductView", () => {
      this.$nextTick(() => {
        this.$forceUpdate();
      });
    });
  },
  methods: {}
};
</script>
<style scoped lang="less"></style>
