<template>
  <div></div>
</template>

<script>
export default {
  props: {
    phoneNumber: {
      type: String
    },
    companyNumber: {
      type: String
    },
    id: {
      type: String
    }
  },
  data() {
    return {
      persinnelList: []
    };
  },
  methods: {
    // 获取要绑定的员工列表
    async getPersinnelList() {
      const res = await this.$http.post("/api/SearchPersinnel", {
        Client_acc_nu: this.phoneNumber, // 手机
        companyNumber: this.companyNumber // 公司companyNumber
      });
      if (res.data.result.code === 200) {
        this.persinnelList = res.data.result.item;
      } else this.$message.error(res.data.result.msg);
    },
    // 绑定员工
    async bindEmployee() {
      const res = await this.$http.post("/api/BindPersinnel", {
        personnelNo: this.isBind ? this.relatedConfig.id : null,
        id: this.id
      });
      console.log(res);
    }
  },
  created() {},
  mounted() {
    this.getPersinnelList();
  }
};
</script>
<style scoped lang="less"></style>
