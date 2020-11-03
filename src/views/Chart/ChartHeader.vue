<template>
  <div class="HeaderWrapper">
    <div class="time">
      <span
        :class="MonthOrDay === 'month' && 'active'"
        @click="$emit('update:MonthOrDay', 'month')"
        >月</span
      >
      <span class="line"></span>
      <span
        :class="MonthOrDay === 'day' && 'active'"
        @click="$emit('update:MonthOrDay', 'day')"
        >日</span
      >
    </div>
    <Icon name="Right" @click.native="DownDate" />
    <div class="date">{{ MonthOrDay === "day" ? time : time + "月" }}</div>
    <Icon name="Left" @click.native="UpDate" />
    <select defaultValue="-" class="select" @change="changeType">
      <option value="-">支出</option>
      <option value="+">收入</option>
    </select>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Icon from "@/components/Icon.vue";

@Component({
  components: { Icon },
})
export default class ChartHeader extends Vue {
  @Prop(String) readonly MonthOrDay!: "day" | "month";
  @Prop(String) readonly IncomeOrSpending!: "-" | "+";
  @Prop(String) readonly time!: string;
  changeType() {
    if (this.IncomeOrSpending === "-") {
      this.$emit("update:IncomeOrSpending", "+");
    } else {
      this.$emit("update:IncomeOrSpending", "-");
    }
  }
  UpDate() {
    let currentMonth = parseInt(this.time);
    if (this.MonthOrDay === "day") {
      let currentDay =
        parseInt(this.time.substr(this.time.indexOf("-") + 1)) + 1;

      if (currentDay === 32) {
        this.$emit("update:time", currentMonth + 1 + "-01");
      } else if (currentDay < 10) {
        this.$emit("update:time", currentMonth + "-0" + currentDay);
      } else {
        this.$emit("update:time", currentMonth + "-" + currentDay);
      }
    } else {
      if (currentMonth === 12) {
        this.$emit("update:time", "1");
      } else {
        this.$emit("update:time", (currentMonth + 1).toString());
      }
    }
  }
  DownDate() {
    let currentMonth = parseInt(this.time);
    if (this.MonthOrDay === "day") {
      let currentDay =
        parseInt(this.time.substr(this.time.indexOf("-") + 1)) - 1;
      if (currentDay === 0) {
        this.$emit("update:time", currentMonth - 1 + "-31");
      } else if (currentDay < 10) {
        console.log(currentMonth + "-0" + currentDay);
        this.$emit("update:time", currentMonth + "-0" + currentDay);
      } else {
        this.$emit("update:time", currentMonth + "-" + currentDay);
      }
    } else {
      if (currentMonth === 1) {
        this.$emit("update:time", "12");
      } else {
        this.$emit("update:time", (currentMonth - 1).toString());
      }
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
.date {
  margin: 0 -32px;
}
</style>