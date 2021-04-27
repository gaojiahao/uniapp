<template>
  <div class="bsGridPushComponent">
    <div class="gridBox">
      <div class="title">
        <div class="left">
          <el-image
            fit="contain"
            style="width: 100px; height: 100px"
            :src="productList.imgUrl"
          >
            <div slot="placeholder" class="errorImg">
              <img
                style="width: 100px; height: 100px"
                src="~@/assets/images/imgError.png"
                alt
              />
            </div>
            <div slot="error" class="errorImg">
              <img
                style="width: 100px; height: 100px"
                src="~@/assets/images/imgError.png"
                alt
              />
            </div>
          </el-image>
        </div>
        <div class="right">
          <h4>腾彩玩具有限公司</h4>
          <p>联系电话：15683860616</p>
          <p class="onlineConsultation" @click="toNews">
            <img src="~@/assets/images/consult.png" alt />
            在线咨询
          </p>
        </div>
      </div>
      <div class="cheDetail">
        <p><el-checkbox label=""></el-checkbox></p>
        <p><i class="el-icon-document"></i> 择样明细(4)</p>
        <p><i class="el-icon-time"></i>推送记录(0)</p>
      </div>
    </div>
    <div class="kong"></div>
    <div class="kong"></div>
    <div class="kong"></div>
    <div class="kong"></div>
    <div class="PushFooter">
      <div class="left">
        <el-checkbox v-model="checkAll" @change="handleCheckAllChange"
          >全选</el-checkbox
        >
      </div>
      <div class="right">
        <p>已选择推送厂家：{{ multipleSelection.length }}</p>
        <el-button size="medium" type="primary" class="el-icon-position">
          推送</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    productList: {
      type: Array
    }
  },
  data() {
    return {
      checkAll: false,
      multipleSelection: []
    };
  },
  methods: {
    // 去聊天
    toNews() {
      const fd = {
        name: this.companyInfo.companyNumber + "bsNews",
        linkUrl: "/bsIndex/bsNews",
        component: "bsNews",
        refresh: true,
        label: this.companyInfo.companyName,
        value: this.companyInfo
      };
      this.$router.push("/bsIndex/bsNews");
      this.$store.commit("myAddTab", fd);
    },
    //全选按钮
    handleCheckAllChange(val) {
      if (val) {
        this.multipleSelection = this.tabel;
        //点击全选后数据所有选择的数据存到这个数组里边
        this.tabel.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row, true);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped lang="less">
.bsGridPushComponent {
  padding: 30px 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .gridBox {
    width: 390px;
    height: 190px;
    background: #ffffff;
    border: 1px solid #dcdfe6;
    border-radius: 5px;
    .title {
      height: 150px;
      border-bottom: 1px solid #dcdfe6;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      .left {
        margin: 20px;
        border: 1px solid #dcdfe6;
        border-radius: 5px;
      }
      .right {
        h4 {
          font-weight: 700;
          color: #333333;
          line-height: 30px;
        }
        p {
          font-weight: 400;
          color: #666666;
          line-height: 35px;
          display: flex;
          align-items: center;
          img {
            margin-right: 10px;
            width: 28px;
            height: 28px;
          }
        }
        .onlineConsultation {
          cursor: pointer;
        }
      }
    }
    .cheDetail {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      p {
        font-weight: 400;
        color: #666666;
        display: flex;
        align-items: center;
        line-height: 19px;
      }
    }
  }
  .kong {
    width: 390px;
    min-width: 390px;
  }
  .PushFooter {
    display: flex;
    justify-content: space-between;
    padding: 30px;
    .right {
      display: flex;
      align-items: center;
      p {
        margin: 0 20px;
        color: #333333;
      }
    }
  }
}
</style>
