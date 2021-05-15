<!--
 * @Description: 
 * @Author: gaojiahao
 * @Date: 2021-05-14 18:06:13
 * @FilePath: \projectd:\LittleBearPC\toys-bear-pc\src\views\bsPage\bsBusinessManage\bsDataTotal\bsDataTotalComponent\visitTotal.vue
 * @LastEditTime: 2021-05-15 09:03:07
 * @LastEditors: sueRimn
 * @Descripttion: 
 * @version: 1.0.0
-->
<template>
  <div class="visitTotal">
    <div class="title">
      <div class="left">来访趋势图</div>
    </div>
    <div class="visit_total_chart" id="barChart"></div>
    <div class="visit_total_table"></div>
  </div>
</template>
<script>
import * as echarts from "echarts/core";
import { GridComponent } from "echarts/components";
import { BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([GridComponent, BarChart, CanvasRenderer]);

export default {
  name: "VisitTotal",
  data() {
    return {};
  },
  methods: {
    drawLine() {
      var chartDom = document.getElementById("barChart");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: "来访趋势图",
          left: "center"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          right: "right"
        },
        xAxis: {
          type: "category",
          name: "时间",
          data: ["2.13", "2.14", "2.15", "2.16", "2.17", "2.18", "2.19"]
        },
        yAxis: {
          type: "value",
          name: "数量"
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 100
          },
          {
            start: 0,
            end: 100
          }
        ],
        series: [
          {
            name: "所有",
            data: [16, 33, 39, 44, 32, 41, 41],
            type: "bar"
          },
          {
            name: "已开发",
            data: [10, 11, 17, 8, 5, 12, 9],
            type: "bar"
          },
          {
            name: "未开发",
            data: [5, 10, 20, 25, 15, 10, 22],
            type: "bar"
          },
          {
            name: "审核中",
            data: [1, 2, 5, 3, 2, 7, 1],
            type: "bar"
          }
        ]
      };
      option && myChart.setOption(option);
    }
  },
  mounted() {
    this.drawLine();
  }
};
</script>
<style lang="less" scoped>
.visitTotal {
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
    .left::before {
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
  .visit_total_chart {
  }
  .visit_total_table {
  }
}
</style>
