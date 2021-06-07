<template>
  <div class="bsPushRecordComponent">
    <Table :table="tableData"></Table>
  </div>
</template>

<script>
import Table from "@/components/table";
export default {
  components: {
    Table
  },
  props: {
    productList: {
      type: Array
    },
    pushDialog: {
      type: Boolean
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
            prop: "messageExt",
            isHiden: true,
            label: "推送类型",
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
            label: "推送内容"
          },
          {
            prop: "happenDate",
            isHiden: true,
            label: "推送时间",
            render: row => {
              return row.happenDate ? row.happenDate.replace(/T.*/, "") : "";
            }
          },
          {
            prop: "readStatus",
            isHiden: true,
            label: "推送状态",
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
        ],
        btnWidth: 100,
        actions: [
          {
            type: "primary",
            textWrapper() {
              return "再次推送";
            },
            methods: row => {
              console.log(row);
            }
          }
        ]
      }
    };
  },
  methods: {
    //关闭弹框
    closeDialog() {
      this.$emit("handlePushDialog", false);
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped lang="less">
@deep: ~">>>";
.bsPushRecordComponent {
}
</style>
