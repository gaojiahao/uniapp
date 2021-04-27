<template>
  <div class="bsPushIndex">
    <div class="title">
      <div class="left">订单信息</div>
      <div class="right"></div>
    </div>
    <div class="handerTop">
      <div class="flex_t">
        <p>
          采购单号：<span class="pId">{{ itemList.offerNumber }} </span>
        </p>
        <p>
          客户名称：<span>{{ itemList.customerName }} </span>
        </p>
        <p>
          操作员：<span style="color: #2d7fe4">{{ itemList.linkman }} </span>
        </p>
        <p>
          状态：<span
            :style="{
              color: itemList.status == 0 ? '#3368A9' : '#2D7FE4'
            }"
            >{{
              itemList.status == 0
                ? "未审核"
                : itemList.status == 1
                ? "审核通过"
                : "审核不通过"
            }}
          </span>
        </p>
      </div>
      <div class="flex_b">
        <p>
          报价时间：<span v-if="itemList.createdOn"
            >{{ itemList.createdOn.replace(/T/, " ") }}
          </span>
        </p>
        <div class="right">
          <p class="remark">
            报价备注：<span>{{ itemList.title }} </span>
          </p>
        </div>
      </div>
    </div>
    <div class="bsPushTable">
      <div class="title">
        <div class="left">厂家列表({{ tableData.length }})</div>
        <div class="right">
          <div
            :class="{ grid: true, active: isGrid === 'bsGridPushComponent' }"
            @click="handerIsGrid('bsGridPushComponent')"
          ></div>
          <div
            :class="{ column: true, active: isGrid === 'bsTablePushComponent' }"
            @click="handerIsGrid('bsTablePushComponent')"
          ></div>
        </div>
      </div>
      <div class="tableBox">
        <!-- 产品列表 -->
        <component :is="isGrid" :productList="tableData"></component>
      </div>
    </div>
  </div>
</template>
<script>
import bsGridPushComponent from "@/components/commonComponent/pushDetailsComponent/bsGridPushComponent.vue";
import bsTablePushComponent from "@/components/commonComponent/pushDetailsComponent/bsTablePushComponent.vue";
export default {
  name: "bsPushIndex",
  components: { bsGridPushComponent, bsTablePushComponent },
  props: {
    item: {
      type: Object
    }
  },
  data() {
    return {
      itemList: {},
      tableData: [],
      isGrid: "bsGridPushComponent"
    };
  },
  methods: {
    // 切换产品列表样式
    handerIsGrid(type) {
      this.isGrid = type;
    }
  }
};
</script>
<style scoped lang="less">
@deep: ~">>>";
.bsPushIndex {
  min-height: 100%;
  background-color: #fff;
  padding: 0 20px;
  .title {
    height: 55px;
    font-size: 15px;
    font-weight: 700;
    padding-left: 15px;
    box-sizing: border-box;
    position: relative;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
  .handerTop {
    padding-top: 26px;
    .flex_t {
      display: flex;
      align-content: center;
      margin-bottom: 10px;
      p {
        width: 235px;
        margin-right: 30px;
        font-weight: 400;
        .pId {
          font-weight: 700;
          font-size: 15px;
        }
      }
    }
    .flex_b {
      display: flex;
      align-content: center;
      align-items: center;
      p {
        margin-right: 30px;
        width: 235px;
      }
      .right {
        flex: 1;
        display: flex;
        align-items: center;
        .remark {
          flex: 1;
        }
      }
    }
  }
  .bsPushTable {
    margin-bottom: 80px;
    .right {
      display: flex;
      width: 80px;
      min-width: 80px;
      .searchTime {
        margin-right: 40px;
        span {
          color: #3368a9;
        }
      }
      .grid,
      .column {
        width: 17px;
        height: 17px;
        cursor: pointer;
      }
      .grid {
        margin-right: 25px;
        background: url("~@/assets/images/gridIcon.png") no-repeat center;
        background-size: contain;
        &.active {
          background: url("~@/assets/images/gridActiveIcon.png") no-repeat
            center;
          background-size: contain;
        }
      }
      .column {
        background: url("~@/assets/images/columnIcon.png") no-repeat center;
        background-size: contain;
        &.active {
          background: url("~@/assets/images/columnActiveIcon.png") no-repeat
            center;
          background-size: contain;
        }
      }
    }
  }
}
</style>
