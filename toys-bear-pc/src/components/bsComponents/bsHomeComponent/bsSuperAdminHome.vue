<template>
  <div class="bsSuperAdminHome">
    <div class="header">
      <ul>
        <li>
          <el-image
            style="width: 30px; height: 32px"
            :src="require('@/assets/images/zhantingyewu.png')"
            fit="contain"
          >
          </el-image>
          <span>VIP到期提醒</span>
          <p>12</p>
        </li>
        <li>
          <el-image
            style="width: 30px; height: 32px"
            :src="require('@/assets/images/zhantingyewu.png')"
            fit="contain"
          >
          </el-image>
          <span>新品待审核:</span>
          <p>12</p>
        </li>
        <li>
          <el-image
            style="width: 30px; height: 32px"
            :src="require('@/assets/images/zhantingyewu.png')"
            fit="contain"
          >
          </el-image>
          <span>现货待审核:</span>
          <p>12</p>
        </li>
        <li>
          <el-image
            style="width: 30px; height: 32px"
            :src="require('@/assets/images/zhantingyewu.png')"
            fit="contain"
          >
          </el-image>
          <span>VIP待审核:</span>
          <p>12</p>
        </li>
        <li>
          <el-image
            style="width: 30px; height: 32px"
            :src="require('@/assets/images/zhantingyewu.png')"
            fit="contain"
          >
          </el-image>
          <span>游客待审核</span>
          <p>12</p>
        </li>
        <li>
          <el-image
            style="width: 30px; height: 32px"
            :src="require('@/assets/images/zhantingyewu.png')"
            fit="contain"
          >
          </el-image>
          <span>错误日志记录</span>
          <p>12</p>
        </li>
      </ul>
    </div>
    <div class="todayData">
      <div class="title">
        <i class="icon myProductIcon"></i>
        <span>今日数据概况</span>
      </div>
      <div class="todayDataList">
        <ul>
          <li v-for="item in 10" :key="item.index">
            <el-image
              style="width: 30px; height: 32px"
              :src="require('@/assets/images/zhantingyewu.png')"
              fit="contain"
            >
            </el-image>
            <div class="todayAdd">
              <h3>10</h3>
              <p>今日新增配件商</p>
              <p>配件商总数: 85454</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="mainBox">
      <div class="todaySaleroom">
        <div class="headerTit">
          <div class="title">
            <i class="icon myProductIcon"></i>
            <span>今日销售额</span>
          </div>
          <div class="dayBox">
            <el-radio-group v-model="dayValue" size="mini" @change="changeTime">
              <el-radio-button
                v-for="(item, i) in dayList"
                :key="i"
                :label="item.value"
              ></el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div class="marketGross"></div>
      </div>
      <div class="peopleCounting">
        <div class="title">
          <i class="icon myProductIcon"></i>
          <span>在线人数统计</span>
        </div>
        <Table :table="peopleTableData"></Table>
      </div>
      <div class="trendingSearch">
        <div class="title">
          <i class="icon myProductIcon"></i>
          <span>热搜词</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Table from "@/components/table";
export default {
  name: "bsSuperAdminHome",
  components: {
    Table
  },
  data() {
    return {
      dayValue: "今日",
      dayList: [
        {
          value: "今日"
        },
        {
          value: "昨日"
        }
      ],
      peopleTableData: {
        data: [],
        showLoading: false,
        isHiden: true,
        sizeMini: "mini",
        columns: [
          {
            prop: "name",
            label: "产品",
            width: 300,
            color: "#3368a9",
            align: "left",
            productInfo: true,
            elImage: row => {
              return row.img;
            },
            nameHtml: row => {
              return row.name;
            },
            fcatoryNameHtml: row => {
              return row.supplierName;
            }
          },

          {
            prop: "exhibitionName",
            label: "资料来源"
          },
          { prop: "fa_no", label: "出厂货号" },
          { prop: "ch_pa", label: "包装" }
        ]
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 天数请求
    changeTime(value) {
      console.log(value);
      //   this.timeData = Object.assign(calculateDate(value));
    }
  }
};
</script>
<style scoped lang="less">
@deep: ~">>>";
.bsSuperAdminHome {
  min-height: 100%;
  .header {
    margin-bottom: 20px;
    ul {
      display: flex;
      justify-content: space-between;
      li {
        width: 260px;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #ff6565;
        border-radius: 4px;
        padding: 0 40px 0 23px;
        color: #fff;
        box-sizing: border-box;
        p {
          font-size: 20px;
        }
      }
    }
    ul li:nth-of-type(1) {
      background-color: #ff6565;
    }
    ul li:nth-of-type(2) {
      background-color: #f9ae3e;
    }
    ul li:nth-of-type(3) {
      background-color: #5da4fb;
    }
    ul li:nth-of-type(4) {
      background-color: #896dff;
    }
    ul li:nth-of-type(5) {
      background-color: #29d2cc;
    }
    ul li:nth-of-type(6) {
      background-color: #ff9b74;
    }
  }
  // 共同的title
  .todaySaleroom,
  .peopleCounting,
  .peopleCounting,
  .trendingSearch,
  .todayData {
    background: #ffffff;
    border-radius: 4px;
    padding: 0 20px;
    box-sizing: border-box;
    .title {
      height: 50px;
      font-size: 18px;
      font-weight: 700;
      display: flex;
      align-items: center;
      .icon {
        width: 18px;
        height: 18px;
        margin-right: 17px;
        &.workbenchIcon {
          background: url("~@/assets/images/workbenchIcon.png") no-repeat center;
          background-size: contain;
        }
        &.statisticsIcon {
          background: url("~@/assets/images/statisticsIcon.png") no-repeat
            center;
          background-size: contain;
        }
        &.statisticalIcon {
          background: url("~@/assets/images/statisticalIcon.png") no-repeat
            center;
          background-size: contain;
        }
        &.rankingIcon {
          background: url("~@/assets/images/rankingIcon.png") no-repeat center;
          background-size: contain;
        }
        &.myProductIcon {
          background: url("~@/assets/images/myProductIcon.png") no-repeat center;
          background-size: contain;
        }
      }
    }
  }
  .todayData {
    .todayDataList {
      ul {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        li {
          display: flex;
          align-items: center;
          padding-left: 24px;
          box-sizing: border-box;
          text-align: center;
          margin-bottom: 20px;
          width: 308px;
          height: 120px;
          background: #ffffff;
          border: 1px solid #dcdfe6;
          border-radius: 5px;
          .todayAdd {
            width: 237px;
            h3 {
              height: 26px;
              font-size: 20px;
              font-weight: 700;
              color: #333333;
            }
            p {
              line-height: 30px;
              color: #666666;
            }
          }
        }
      }
    }
  }
  .mainBox {
    height: 415px;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .todaySaleroom {
      flex: 1;
      .headerTit {
        display: flex;
        justify-content: space-between;
        align-items: center;
        @{deep} .hotBox {
          .el-radio-group {
            .el-radio-button {
              .el-radio-button__inner {
                font-size: 18px;
                color: #999999;
                height: 50px;
                width: 100px;
                background-color: #fff;
                box-sizing: border-box;
                border: none;
                padding: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                border-bottom: 3px solid transparent;
              }
              &.is-active {
                .el-radio-button__inner {
                  font-size: 18px;
                  font-weight: 700;
                  color: #3368a9;
                  border-bottom-color: #3368a9;
                  box-shadow: none;
                }
              }
            }
          }
        }
        .dayBox {
          display: flex;
          justify-content: flex-end;
        }
      }
      .marketGross {
        padding: 18px 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .peopleCounting {
      width: 780px;
      margin: 0 20px;
    }
    .trendingSearch {
      width: 420px;
    }
  }
}
</style>
