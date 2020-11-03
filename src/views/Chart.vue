<template>
  <div>
    <Nav />
    <ChartHeader
      :time.sync="time"
      :MonthOrDay.sync="MonthOrDay"
      :IncomeOrSpending.sync="IncomeOrSpending"
    />
    <BarChart
      :MonthOrDay="MonthOrDay"
      :IncomeOrSpending="IncomeOrSpending"
      :time.sync="time"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import ChartHeader from "./Chart/ChartHeader.vue";
import Nav from "@/components/Nav.vue";
import BarChart from "./Chart/BarChart.vue";
import Time from "@/lib/Time.ts";
@Component({
  components: { ChartHeader, Nav, BarChart },
})
export default class Chart extends Vue {
  MonthOrDay: "day" | "month" = "day";
  IncomeOrSpending: "-" | "+" = "-";
  data = Time();
  time: string = this.data.MonthAndDay;
  @Watch("MonthOrDay")
  onMonthOrDay() {
    if (this.MonthOrDay === "day") {
      this.time = this.data.MonthAndDay;
    } else {
      this.time = this.data.Month;
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
