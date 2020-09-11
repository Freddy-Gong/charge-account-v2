<template>
  <div class="HeaderWrapper">
    <div class="time">
      <span class="active">月</span>
      <span class="line"></span>
      <span>日</span>
    </div>
    <div>{{Day.MonthAndDay}}</div>
    <select defaultValue="-" class="select" onchange="{props.changeCategory}">
      <option value="-">支出</option>
      <option value="+">收入</option>
    </select>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Time from "@/lib/Time.ts";

@Component
export default class ChartHeader extends Vue {
  Day = Time();
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