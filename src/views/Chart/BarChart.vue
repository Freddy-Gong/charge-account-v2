<template>
  <div>
    <div ref="container"></div>
    <CircleChart
      :time="time"
      :IncomeOrSpending="IncomeOrSpending"
      :hash="hash"
      :MonthOrDay="MonthOrDay"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import echarts from "echarts";
import Time from "@/lib/Time.ts";
import { RecordModel } from "@/model/RecordModel.ts";
import CircleChart from "./CircleChart.vue";

@Component({
  components: { CircleChart },
})
export default class BarChart extends Vue {
  @Prop(String) readonly MonthOrDay!: "day" | "month";
  @Prop(String) readonly IncomeOrSpending!: "-" | "+";
  @Prop(String) time!: string;
  data = Time();
  defaultDate = {
    tagId: -1 as number,
    category: "-" as "-" | "+",
    account: 0,
    note: "",
  };
  ec = echarts as any;
  MyEcharts: any; //echarts??
  chart() {
    if (this.IncomeOrSpending === "-") {
      this.MyEcharts.setOption(this.option);
      this.MyEcharts.on("click", (params: any) => {
        this.$emit("update:time", params.name);
      });
    } else {
      this.MyEcharts.setOption(this.option2);
      this.MyEcharts.on("click", (params: any) => {
        this.$emit("update:time", params.name);
      });
    }
  }
  get XArray() {
    const array: string[] = [];
    if (this.MonthOrDay === "day") {
      for (let i = 1; i < 31; i++) {
        array.push(this.data.MonthNumber + "-" + i);
      }
    } else if (this.MonthOrDay === "month") {
      for (let i = 1; i < 13; i++) {
        array.push(i.toString());
      }
    }
    return array;
  }
  get startSet() {
    let start: number = 0;
    if (this.MonthOrDay === "day") {
      if (this.data.DayNumber >= 8) {
        start = this.endSet - 20;
      }
    } else if (this.MonthOrDay === "month") {
      if (this.data.MonthNumber >= 8) {
        start = this.endSet - 50;
      }
    }
    return start;
  }
  get endSet() {
    let end: number = 0;
    if (this.MonthOrDay === "day") {
      if (this.data.DayNumber < 8) {
        end = 20;
      } else {
        end = (this.data.DayNumber / 30) * 100;
      }
    } else if (this.MonthOrDay === "month") {
      if (this.data.MonthNumber < 8) {
        end = 50;
      } else {
        end = (this.data.MonthNumber / 12) * 100;
      }
    }
    return end;
  }
  get hash() {
    const hashTable: { [key: string]: Partial<RecordItem>[] } = {};
    if (this.MonthOrDay === "day") {
      this.XArray?.forEach((array) => {
        if (!(array in hashTable)) {
          hashTable[array] = [this.defaultDate];
        }
        RecordModel.RecordList.forEach((record) => {
          if (this.data.YearNumber + "-" + array === record.date) {
            hashTable[array].push(record);
          }
        });
      });
    } else if (this.MonthOrDay === "month") {
      this.XArray.forEach((array) => {
        if (!(array in hashTable)) {
          hashTable[array] = [this.defaultDate];
        }
        RecordModel.RecordList.forEach((record) => {
          if (array === record.month) {
            hashTable[array].push(record);
          }
        });
      });
    }
    return hashTable;
  }
  get Spending() {
    const SpendingArray: number[] = [];
    this.ChartArrays.forEach((array) => {
      let spending = [0];
      array[1].map((a) => {
        if (a.type === "-" && a.result) {
          spending.push(a.result);
        }
        return spending;
      });
      SpendingArray.push(
        spending.reduce((sum, item) => {
          return sum + item;
        }, 0)
      );
    });
    return SpendingArray;
  }
  get Income() {
    const IncomeArray: number[] = [];
    this.ChartArrays.forEach((array) => {
      let income = [0];
      array[1].map((a) => {
        if (a.type === "+" && a.result) {
          income.push(a.result);
        }
        return income;
      });
      IncomeArray.push(
        income.reduce((sum, item) => {
          return sum + item;
        }, 0)
      );
    });
    return IncomeArray;
  }
  get ChartArrays() {
    return Object.entries(this.hash);
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
  @Watch("IncomeOrSpending")
  onIncomeOrSpendingChange() {
    this.chart();
  }
  @Watch("MonthOrDay")
  onMonthOrDay() {
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
.container {
  border: 1px solid red;
  height: 350px;
}
</style>