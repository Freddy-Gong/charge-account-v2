<template>
  <div class="money">
    <Nav />
    <div class="Wrapper">
      <header>
        <span>{{ Day.YearAndMonth }}</span>
        <span>本月结余</span>
        <span class="in">{{ Day.YearAndMonth }}</span>
      </header>
      <main>{{ Residue }}</main>
      <footer>
        <span>收入:{{ Income }}</span>
        <span>支出:{{ Spending }}</span>
      </footer>
    </div>
    <div class="IconWrapper">
      <div id="pen">
        <router-link to="/number">
          <Icon name="Money" />
          <span>记一笔</span>
        </router-link>
      </div>
    </div>
    <div class="gap" />
    <Show-record />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Icon from "@/components/Icon.vue";
import Time from "@/lib/Time.ts";
import Nav from "@/components/Nav.vue";
import { RecordModel } from "@/model/RecordModel.ts";
import ShowRecord from "@/views/Money/ShowRecord.vue";
const width = document.body.clientWidth;
if (width > 500) {
  alert("为了更加舒适使用该应用，请用手机打开该应用");
}
@Component({
  components: { Icon, Nav, ShowRecord },
})
export default class Money extends Vue {
  Day = Time();
  Spending = RecordModel.CurrentMonthSpending();
  Income = RecordModel.CurrentMonthIncome();
  Residue = RecordModel.CurrentMonthResidue();
}
</script>
<style lang="scss" scoped>
@import "~@/Help.scss";
.Wrapper {
  background: $color;
  color: white;
  height: 20%;
  > header {
    display: flex;
    justify-content: space-between;
    padding: 10px 10px;
    > .in {
      color: $color;
    }
  }
  > main {
    display: flex;
    justify-content: center;
    padding-bottom: 30px;
    font-size: 20px;
  }
  > footer {
    display: flex;
    justify-content: space-between;
    padding: 10px 10px;
  }
}
.gap {
  height: 75px;
}
.IconWrapper {
  position: relative;
  > div {
    background: white;
    left: 50%;
    top: -50px;
    transform: translate(-50%);
    position: absolute;
    border-radius: 60px;
    > a {
      color: $color;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      border: 2px solid $color;
      margin: 10px;
      border-radius: 60px;
      padding: 10px 24px;
      > .icon {
        width: 3em;
        height: 3em;
      }
      > span {
        margin: 5px 0;
      }
    }
  }
}
</style>
