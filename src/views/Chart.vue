<template>
  <div>
    <Nav />
    <ChartHeader
      :time="data.MonthAndDay"
      :MonthOrDay.sync="MonthOrDay"
      :IncomeOrSpending.sync="IncomeOrSpending"
    />
    <BarChart
      :MonthOrDay="MonthOrDay"
      :IncomeOrSpending="IncomeOrSpending"
      :time.sync="data.MonthAndDay"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
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
}
</script>

<style scoped lang='scss'>
</style>
