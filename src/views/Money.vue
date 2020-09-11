<template>
  <div class="money">
    <div class="Wrapper">
      <header>
        <span>{YearAndMonth}</span>
        <span>本月结余</span>
        <span class="in">{YearAndMonth}</span>
      </header>
      <main>{restMoney}</main>
      <footer>
        <span>收入:{incomeMoney}</span>
        <span>支出:{spendingMoney}</span>
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Icon from "@/components/Icon.vue";
const x = require("@/assets/icons/Money.svg");

console.log(x);

@Component({
  components: { Icon },
})
export default class Money extends Vue {}
</script>
<style lang="scss" scoped>
.Wrapper {
  background: #1296db;
  color: white;
  height: 20%;
  > header {
    display: flex;
    justify-content: space-between;
    padding: 10px 10px;
    > .in {
      color: #1296db;
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
      color: #1296db;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      border: 2px solid #1296db;
      margin: 10px;
      border-radius: 60px;
      padding: 10px 24px;
      > span {
        margin: 5px 0;
      }
    }
  }
}
</style>
