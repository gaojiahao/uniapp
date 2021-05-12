<template>
  <div class="my-table">
    <el-table
      :data="table.data"
      v-loading="table.showLoading"
      :height="table.height || '100%'"
      fit
      :header-cell-style="{ backgroundColor: '#f9fafc' }"
      @selection-change="handleSelectionChange"
      @current-change="handleTableCurrentChange"
    >
      <el-table-column
        v-if="table.selection || false"
        type="selection"
        width="55"
        align="center"
      />
      <el-table-column
        v-for="(col, index) in table.columns"
        :width="col.width"
        :align="col.center || 'center'"
        :key="index"
        :prop="col.prop"
        :label="col.label"
        cell-mouse-enter
      >
        <template slot-scope="scope">
          <span v-if="col.render" v-html="col.render(scope.row)"></span>
          <div class="productInfo" v-else-if="col.productInfo">
            <el-image
              v-if="col.elImage"
              style="width: 70px; height: 54px; min-width: 70px"
              :src="col.elImage(scope.row)"
              fit="contain"
            >
              <div slot="placeholder" class="image-slot">
                <img
                  style="width: 70px; height: 54px"
                  :src="require('@/assets/images/imgError.png')"
                />
              </div>
              <div slot="error" class="image-slot">
                <img
                  style="width: 70px; height: 54px"
                  :src="require('@/assets/images/imgError.png')"
                />
              </div>
            </el-image>
            <div class="infoBox">
              <div
                class="name"
                v-if="col.nameHtml"
                v-html="col.nameHtml(scope.row)"
              ></div>
              <div
                class="price"
                v-if="col.priceHtml"
                :style="{ color: col.color }"
                v-html="col.priceHtml(scope.row)"
              ></div>
            </div>
          </div>
          <span v-else-if="register(col)">
            <component
              :is="templates[col.prop]"
              :row="scope.row"
              :col="col"
              @action="col.action"
            ></component>
          </span>
          <span v-else>
            {{ scope.row[col.prop] }}
          </span>
        </template>
      </el-table-column>

      <el-table-column
        v-if="table.actions"
        label="操作"
        align="center"
        :width="table.btnWidth || 300"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            v-for="btn in table.actions"
            :key="btn.index"
            :type="btn.classWrapper(scope.row)"
            :disabled="btn.disabledWrapper(scope.row)"
            size="mini"
            @click="btn.methods(scope.row)"
            :icon="btn.icon"
            :style="{ margin: btn.margin }"
          >
            {{ btn.textWrapper(scope.row) }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "Table",
  props: {
    table: Object
  },

  data: () => {
    return {
      //   data: null,
      templates: {}
    };
  },
  created() {
    if (this.table.actions) {
      this.table.actions.forEach(btn => {
        if (!btn.textWrapper) {
          btn.textWrapper = () => {
            return btn.text;
          };
        }

        if (!btn.classWrapper) {
          btn.classWrapper = () => {
            return btn.type || "primary";
          };
        }

        if (!btn.disabledWrapper) {
          btn.disabledWrapper = () => {
            return btn.disabled;
          };
        }
      });
    }
  },

  methods: {
    handleSelectionChange(val) {
      let res = [];
      val.forEach(item => {
        res.push(item.id);
      });
      this.$emit("selectionChange", res);
    },
    handleTableCurrentChange(val) {
      this.$emit("tableCurrentChange", val);
    },
    deleteOne(id) {
      console.log(id, "删除id");
      //   this.$confirm("确定要删除吗？", "警告", {
      //     type: "warning",
      //   })
      //     .then(() => {
      //       this.table.curdApi.deleteApi({ id: id }).then((res) => {
      //         this.$message({
      //           type: "success",
      //           message: "删除成功！",
      //         });
      //         this.getList();
      //       });
      //     })
      //     .catch((e) => {});
    },
    register(col) {
      if (col.template) {
        this.templates[col.prop] = {
          render: Vue.compile(col.template).render,
          props: {
            row: Object,
            col: Object
          },
          methods: {
            action(val, val2) {
              this.$emit("action", this, this.row, val, val2);
            }
          }
        };
        return true;
      }
      return false;
    }
  }
};
</script>
<style lang="less" scoped>
.operate-menu img {
  float: left;
  height: 14px;
  margin: 11px 5px 0 0;
}
.productInfo {
  display: flex;
  justify-content: center;
  .infoBox {
    height: 54px;
    // width: 193px;
    margin-left: 10px;

    div {
      line-height: 25px;
    }
    .price {
      //   color: #ff4848;
      overflow: hidden; /*超出部分隐藏*/
      white-space: nowrap; /*不换行*/
      text-overflow: ellipsis; /*超出部分文字以...显示*/
    }
    .name {
      overflow: hidden; /*超出部分隐藏*/
      white-space: nowrap; /*不换行*/
      text-overflow: ellipsis; /*超出部分文字以...显示*/
    }
  }
  .el-image {
    width: 70px;
    height: 54px;
    min-width: 70px;
  }
}
</style>
