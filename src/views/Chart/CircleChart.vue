<template>
  <div>
    <div ref="container"></div>
    {{circlehash}}
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import echarts from "echarts";
import TagModule from "@/model/TagModel.ts";
@Component
export default class CircleChart extends Vue {
  @Prop(String) readonly time!: string;
  @Prop(String) readonly IncomeOrSpending!: "-" | "+";
  @Prop(Object) hash!: { [key: string]: Partial<RecordItem>[] };
  MyEcharts: any;
  get circleData() {
    return this.hash[this.time];
  }
  get tags() {
    return TagModule.TagList;
  }
  get circlehash() {
    const hash: { [key: string]: number } = {};
    if (this.circleData) {
      this.circleData.forEach((data) => {
        if (
          data.type === this.IncomeOrSpending &&
          data.result &&
          data.selectedTagId
        ) {
          const key = this.tags.filter(
            (tag) => tag.id === data.selectedTagId
          )[0].name;
          if (!(key in hash)) {
            hash[key] = 0;
          }
          hash[key] += data.result;
        }
      });
    }
    return hash;
  }
  get array() {
    return Object.entries(this.circlehash);
  }
  get todayMoney() {
    const TodayMoneyList: { value: number; name: string }[] = [];
    this.array.forEach((a) => {
      const inOrOutHash = { value: a[1], name: a[0] };
      TodayMoneyList.push(inOrOutHash);
    });
    if (this.IncomeOrSpending === "-") {
      if (TodayMoneyList.length === 0) {
        TodayMoneyList.push({ value: 100, name: "未消费" });
      }
    } else {
      if (TodayMoneyList.length === 0) {
        TodayMoneyList.push({ value: 100, name: "未支出" });
      }
    }
    return TodayMoneyList;
  }
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
          data: this.todayMoney,
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
          data: this.todayMoney,
        },
      ],
    };
  }
  @Watch("IncomeOrSpending")
  onIncomeOrSpendingChange() {
    this.chart();
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