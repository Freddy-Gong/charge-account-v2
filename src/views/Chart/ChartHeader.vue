<template>
  <div class="HeaderWrapper">
    <div class="time">
      <span
        :class="MonthOrDay === 'month' && 'active'"
        @click="$emit('update:MonthOrDay','month')"
      >月</span>
      <span class="line"></span>
      <span :class="MonthOrDay === 'day' && 'active'" @click="$emit('update:MonthOrDay','day')">日</span>
    </div>
    <div>{{Day.MonthAndDay}}</div>
    <select defaultValue="-" class="select" @change="changeType">
      <option value="-">支出</option>
      <option value="+">收入</option>
    </select>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Time from "@/lib/Time.ts";

@Component
export default class ChartHeader extends Vue {
  @Prop(String) readonly MonthOrDay!: "day" | "month";
  @Prop(String) readonly IncomeOrSpending!: "-" | "+";
  Day = Time();
  changeType() {
    if (this.IncomeOrSpending === "-") {
      this.$emit("update:IncomeOrSpending", "+");
    } else {
      this.$emit("update:IncomeOrSpending", "-");
    }
  }
}
</script>

<style scoped lang='scss'>
@import "~@/Help.scss";
.HeaderWrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  font-size: 16px;
  > div {
    display: flex;
    flex-direction: row;
    > span {
      display: flex;
      justify-content: center;
      width: 2.5em;
      padding: 3px 0px;
    }
  }
  > .icon {
    height: 1em;
  }
  > .time {
    border: 1px solid rgb(217, 217, 217);
    border-radius: 2px;
    position: relative;
    margin-left: 2px;
    > span {
      color: rgb(217, 217, 217);
    }
    > .active {
      color: $color;
    }
    > .line {
      background: rgb(217, 217, 217);
      width: 1px;
    }
  }
  .select {
    width: 5em;
    color: $color;
    margin-right: 2px;
    > span {
      > span {
        position: relative;
        > svg {
          position: absolute;
          top: -0.4em;
          left: 0.5em;
          fill: $color;
        }
      }
    }
  }
}
</style>