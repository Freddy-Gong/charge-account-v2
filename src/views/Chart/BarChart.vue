<template>
  <div>
    <div ref="container"></div>
    <div></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import echarts from "echarts";
import Time from "@/lib/Time.ts";
import { RecordModel } from "@/model/RecordModel.ts";

@Component
export default class BarChart extends Vue {
  @Prop(String) readonly MonthOrDay!: "day" | "month";
  @Prop(String) readonly IncomeOrSpending!: "-" | "+";
  data = Time();
  defaultDate = {
    tagId: -1 as number,
    category: "-" as "-" | "+",
    account: 0,
    note: "",
  };
  ec = echarts as any;
  get XArray() {
    return [] as string[];
  }
  startSet = 0;
  endSet = 0;

  hash: { [key: string]: Partial<RecordItem>[] } = {};
  Spending: number[] = [];
  Income: number[] = [];
  get ChartArrays() {
    return Object.entries(this.hash);
  }
  created() {
    if (this.MonthOrDay === "day") {
      for (let i = 1; i < 31; i++) {
        this.XArray.push(this.data.MonthNumber + "-" + i);
      }
      if (this.data.DayNumber < 8) {
        this.startSet = 0;
        this.endSet = 20;
      } else {
        this.endSet = (this.data.DayNumber / 30) * 100;
        this.startSet = this.endSet - 20;
      }
      this.XArray.forEach((x) => {
        if (!(x in this.hash)) {
          this.hash[x] = [this.defaultDate];
        }
        RecordModel.RecordList.forEach((record) => {
          if (this.data.YearNumber + "-" + x === record.date) {
            this.hash[x].push(record);
          }
        });
      });
    } else if (this.MonthOrDay === "month") {
      for (let i = 1; i < 13; i++) {
        this.XArray.push(i.toString());
      }
      if (this.data.MonthNumber < 8) {
        this.startSet = 0;
        this.endSet = 50;
      } else {
        this.endSet = (this.data.MonthNumber / 12) * 100;
        this.startSet = this.endSet - 50;
      }
      this.XArray.forEach((x) => {
        if (!(x in this.hash)) {
          this.hash[x] = [this.defaultDate];
        }
        RecordModel.RecordList.forEach((record) => {
          if (x === record.month) {
            this.hash[x].push(record);
          }
        });
      });
    }
    this.ChartArrays.forEach((array) => {
      let spending = [0];
      let income = [0];
      array[1].map((a) => {
        if (a.type === "-" && a.result) {
          spending.push(a.result);
        }
        if (a.type === "+" && a.result) {
          income.push(a.result);
        }
        return { spending, income };
      });
      this.Income.push(
        income.reduce((sum, item) => {
          return sum + item;
        }, 0)
      );
      this.Spending.push(
        spending.reduce((sum, item) => {
          return sum + item;
        }, 0)
      );
    });
  }
  get option() {
    return {
      tooltip: {},
      xAxis: {
        data: this.XArray,
      },
      yAxis: {},
      dataZoom: [
        {
          type: "slider",
          start: this.startSet,
          end: this.endSet,
        },
      ],
      itemStyle: {
        color: "#c23531",
      },
      series: [
        {
          type: "bar",
          data: this.Spending,
        },
      ],
    };
  }
  get option2() {
    return {
      tooltip: {},
      xAxis: {
        data: this.XArray,
      },
      yAxis: {},
      dataZoom: [
        {
          type: "slider",
          start: this.startSet,
          end: this.endSet,
        },
      ],
      itemStyle: {
        color: "rgb(51,75,92)",
      },
      series: [
        {
          type: "bar",
          data: this.Income,
        },
      ],
    };
  }
  mounted() {
    (this.$refs.container as HTMLDivElement).style.height = "350px";
    const MyEcharts = this.ec.init(this.$refs.container as HTMLDivElement);
    if (this.IncomeOrSpending === "-") {
      MyEcharts.setOption(this.option);
    } else {
      MyEcharts.setOption(this.option2);
    }
  }
}
</script>

<style scoped lang='scss'>
.container {
  border: 1px solid red;
  height: 350px;
}
</style>