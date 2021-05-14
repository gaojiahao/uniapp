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
            label: "择样单号",
            event: row => {
              const fd = {
                name: row.orderNumber,
                linkUrl: "/bsIndex/bsHallBusiness",
                component: "bsHallBusinessOrderDetails",
                refresh: true,
                label: row.orderNumber,
                value: row
              };
              this.$store.commit("myAddTab", fd);
            },
            isCallback: row => {
              return (
                "<span style='color: #3368a9; cursor: pointer;'>" +
                row.orderNumber +
                "</span>"
              );
            }
          },
          {
            prop: "messageExt",
            isHiden: true,
            label: "择样类型",
            render: row => {
              let msg;
              switch (row.messageExt) {
                case "0":
                  msg = "系统通知";
                  break;
                case "3":
                  msg = "补样";
                  break;
                case "5":
                  msg = "借样";
                  break;
                case "11":
                  msg = "补样借样";
                  break;
                case "12":
                  msg = "洽谈";
                  break;
              }
              return msg;
            }
          },
          {
            prop: "the_nu",
            isHiden: true,
            label: "本次代号"
          },
          {
            prop: "happenDate",
            isHiden: true,
            label: "择样日期",
            render: row => {
              return row.happenDate ? row.happenDate.replace(/T.*/, "") : "";
            }
          },
          {
            prop: "hall_na",
            isHiden: true,
            label: "展厅名称"
          },
          {
            prop: "orgPersonnelName",
            isHiden: true,
            label: "业务员"
          },
          {
            prop: "pushContent",
            isHiden: true,
            label: "备注"
          },
          {
            prop: "readStatus",
            isHiden: true,
            label: "状态",
            render: row => {
              let msg = "";
              switch (row.readStatus) {
                case false:
                  msg = "<span style='color: green'>未读</span>";
                  break;
                case true:
                  msg = "<span style='color: #f56c6c'>已读</span>";
                  break;
              }
              return msg;
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
