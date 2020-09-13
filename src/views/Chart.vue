<template>
  <div>
    <Nav />
    <ChartHeader :MonthOrDay.sync="MonthOrDay" :IncomeOrSpending.sync="IncomeOrSpending" />
    <BarChart :MonthOrDay="MonthOrDay" :IncomeOrSpending="IncomeOrSpending" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ChartHeader from "./Chart/ChartHeader.vue";
import Nav from "@/components/Nav.vue";
import BarChart from "./Chart/BarChart.vue";
import CircleChart from "./Chart/CircleChart.vue";
@Component({
  components: { ChartHeader, Nav, BarChart, CircleChart },
})
export default class Chart extends Vue {
  MonthOrDay: "day" | "month" = "day";
  IncomeOrSpending: "-" | "+" = "-";
}
</script>

<style scoped lang='scss'>
</style>
