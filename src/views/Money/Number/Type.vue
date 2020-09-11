<template>
  <div class="CategoryWrapper">
    <span :class="type==='-'&&'active'" @click="change('-')">支出</span>
    <span :class="type==='+'&&'active'" @click="change('+')">收入</span>
    <!-- {categoryList.map((c) => <span key={c} className={c === selectedC ? 'active' : ''} onClick={() => prop.onChange(c)}>{categoryMap[c]}</span>)}
    <div className="line"></div>-->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Type extends Vue {
  type: "+" | "-" = "-";
  change(type: "-" | "+") {
    if (this.type !== type) {
      this.type = type;
    }
  }
}
</script>

<style scoped lang='scss'>
@import "~@/Help.scss";

.CategoryWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  > span {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px;
    font-size: 16px;
    padding: 10px 15px;
    color: #999;
    position: relative;
    transition: font-size 0.2s;
    &.active {
      color: $color;
      font-size: 20px;
    }
    &.active::after {
      content: "";
      display: block;
      background: $color;
      position: absolute;
      bottom: 0;
      width: 100%;
      left: 0;
      height: 2px;
    }
  }
}
</style>