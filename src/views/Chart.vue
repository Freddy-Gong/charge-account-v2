<template>
  <div>
    <Nav />
    <ChartHeader
      :time="time"
      :MonthOrDay.sync="MonthOrDay"
      :IncomeOrSpending.sync="IncomeOrSpending"
    />
    <BarChart :MonthOrDay="MonthOrDay" :IncomeOrSpending="IncomeOrSpending" :time.sync="time" />
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
  setTime: string = "";
  @Watch("MonthOrDay")
  onMonthOrDay() {
    this.setTime = "";
  }
  get time() {
    let currentTime: string = "";
    if (this.MonthOrDay === "day" && this.setTime.length === 0) {
      currentTime = this.data.MonthAndDay;
    } else {
      currentTime = this.setTime;
    }
    if (this.MonthOrDay === "month" && this.setTime.length === 0) {
      currentTime = this.data.Month;
    } else {
      currentTime = this.setTime;
    }
    return currentTime;
  }
  set time(value) {
    console.log(value);
    this.setTime = value;
  }
}
</script>

<style scoped lang='scss'>
</style>
