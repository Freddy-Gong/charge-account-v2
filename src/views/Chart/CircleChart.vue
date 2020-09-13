<template>
  <div>
    <div ref="container"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import echarts from "echarts";
@Component
export default class CircleChart extends Vue {
  @Prop(String) readonly time!: string;
  @Prop(String) readonly IncomeOrSpending!: "-" | "+";
  MyEcharts: any;
  chart() {
    if (this.IncomeOrSpending === "-") {
      this.MyEcharts.setOption(this.option);
    } else {
      this.MyEcharts.setOption(this.option2);
    }
  }
  ec = echarts as any;
  get option() {
    return {
      title: {
        text: this.time + "日消费分布",
        textStyle: {
          fontSize: 15,
          color: "black",
          fontWeight: "normal",
        },
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          center: ["50%", "35%"],
          radius: ["30%", "50%"],
          emphasis: {
            label: {
              show: true,
              fontSize: "15",
              fontWeight: "bold",
            },
          },
          data: [
            { value: 235, name: "视频广告" },
            { value: 274, name: "联盟广告" },
            { value: 310, name: "邮件营销" },
            { value: 335, name: "直接访问" },
            { value: 400, name: "搜索引擎" },
          ],
        },
      ],
    };
  }
  get option2() {
    return {
      title: {
        text: this.time + "日收入分布",
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          center: ["50%", "35%"],
          radius: ["30%", "50%"],
          emphasis: {
            label: {
              show: true,
              fontSize: "15",
              fontWeight: "bold",
            },
          },
          data: [
            { value: 235, name: "视频广告" },
            { value: 274, name: "联盟广告" },
            { value: 310, name: "邮件营销" },
            { value: 335, name: "直接访问" },
            { value: 400, name: "搜索引擎" },
          ],
        },
      ],
    };
  }
  @Watch("time")
  onTimeChange() {
    this.chart();
  }
  mounted() {
    (this.$refs.container as HTMLDivElement).style.height = "350px";
    this.MyEcharts = this.ec.init(this.$refs.container as HTMLDivElement);
    this.chart();
  }
}
</script>

<style scoped lang='scss'>
</style>