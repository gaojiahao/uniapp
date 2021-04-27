<template>
  <div class="bsTablePushComponent">
    <!-- 表格数据 -->
    <el-table
      :data="tabel"
      ref="multipleTable"
      :header-cell-style="{ backgroundColor: '#f9fafc', color: '#666' }"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" width="55">
      </el-table-column>
      <el-table-column label="员工" min-width="150">
        <template slot-scope="scope">
          <div class="imgBox">
            <el-image
              fit="contain"
              style="width: 50px; height: 50px"
              :src="scope.row.imgUrl"
            >
              <div slot="placeholder" class="errorImg">
                <img
                  style="width: 55px; height: 60px"
                  src="~@/assets/images/imgError.png"
                  alt
                />
              </div>
              <div slot="error" class="errorImg">
                <img
                  style="width: 55px; height: 60px"
                  src="~@/assets/images/imgError.png"
                  alt
                />
              </div>
            </el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="phoneNumber"
        label="固定电话"
        align="center"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="phoneNumber"
        label="联系电话"
        align="center"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="phone"
        label="泽洋总数"
        align="center"
        min-width="150"
      ></el-table-column>

      <el-table-column label="操作" min-width="250" align="center">
        <template slot-scope="scope">
          <el-button size="medium" type="success"> 泽洋明细 </el-button>
          <el-button size="medium" type="warning"
            >推送记录（{{ scope.$index }}）</el-button
          >
          <el-button size="medium" type="primary"> 在线咨询 </el-button>
        </template>
      </el-table-column>
    </el-table>
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
      multipleSelection: [],
      tabel: [
        {
          phone: 222,
          phoneNumber: 1232132
        },
        {
          phoneNumber: 1232132
        },
        {
          phoneNumber: 1232132
        }
      ]
    };
  },
  methods: {
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
@deep: ~">>>";
.bsTablePushComponent {
  @{deep} .el-table__header-wrapper .el-checkbox {
    display: none;
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
