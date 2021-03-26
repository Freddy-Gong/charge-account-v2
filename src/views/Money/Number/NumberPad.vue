<template>
  <div class="Wrapper">
    <div class="calculator">
      <div class="note" @click.stop="note">备注</div>
      <div class="result">{{ sectionResult }}</div>
      <button class="number-1" @click="input">1</button>
      <button class="number-2" @click="input">2</button>
      <button class="number-3" @click="input">3</button>
      <button class="add" @click="input">+</button>
      <button class="delete" @click="deleteNumber">
        <Icon name="delete" />
      </button>
      <button class="number-4" @click="input">4</button>
      <button class="number-5" @click="input">5</button>
      <button class="number-6" @click="input">6</button>
      <button class="subtract" @click="input">-</button>
      <button class="ac" @click.stop="clear">AC</button>
      <button class="number-7" @click="input">7</button>
      <button class="number-8" @click="input">8</button>
      <button class="number-9" @click="input">9</button>
      <button class="multiply" @click="input">x</button>
      <button class="OK" @click="ok">OK</button>
      <button class="number-0" @click="input">0</button>
      <button class="dot" @click="input">.</button>
      <button class="equal" @click="calculate">=</button>
      <button class="divide" @click="input">÷</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Icon from "@/components/Icon.vue";
@Component({
  components: { Icon },
})
export default class NumberPad extends Vue {
  @Prop(Number) readonly result!: number;
  @Prop(Boolean) readonly back!: boolean;
  sectionResult = this.result.toString();
  isOperator: Boolean = false;
  canDot: Boolean = true;
  input(e: MouseEvent) {
    const text = (e.target as HTMLButtonElement).textContent;
    if (this.sectionResult.length >= 9) {
      return;
    }
    if (text) {
      if ("+-x÷".indexOf(text) >= 0 && this.isOperator === true) {
        this.sectionResult += text;
        this.isOperator = false;
        this.canDot = true;
      } else if (text === "." && this.canDot === true) {
        let n = this.sectionResult.length;
        if (this.sectionResult[n - 1] === ("x" || "+" || "-" || "÷")) {
          return;
        }
        this.sectionResult += text;
        this.canDot = false;
      } else if (
        this.sectionResult === "0" &&
        "0123456789".indexOf(text) >= 0
      ) {
        this.sectionResult = text;
        this.isOperator = true;
      } else if ("0123456789".indexOf(text) >= 0) {
        let n = this.sectionResult.length;
        if (
          text === "0" &&
          this.sectionResult[n - 1] === "0" &&
          this.sectionResult[n - 2] === ("x" || "-" || "+" || "÷")
        ) {
          return;
        }
        this.sectionResult += text;
        this.isOperator = true;
      }
    }
    this.$emit("update:result", parseFloat(this.sectionResult));
  }
  clear(e: MouseEvent) {
    this.sectionResult = "0";
    this.$emit("update:result", parseFloat(this.sectionResult));
  }
  note(e: MouseEvent) {
    const name = window.prompt("您的备注是");
    this.$emit("update:note", name);
  }
  evil = (fn: string) => {
    let Fn = Function; //一个变量指向Function，防止有些前端编译工具报错
    return new Fn("return " + fn)(); //result后面的空格相当重要
  };
  calculate() {
    let equation = this.sectionResult
      .replace(new RegExp("x", "g"), "*")
      .replace(new RegExp("÷", "g"), "/");
    this.sectionResult = parseFloat(this.evil(equation).toFixed(9)).toString();
    this.$emit("update:result", parseFloat(this.sectionResult));
  }
  deleteNumber() {
    if (this.sectionResult.length === 1) {
      this.sectionResult = "0";
    } else {
      this.sectionResult = this.sectionResult.slice(0, -1);
    }
    this.$emit("update:result", parseFloat(this.sectionResult));
  }
  ok() {
    this.calculate();
    this.$emit("submit");
    setTimeout(() => {
      if (this.back) {
        this.sectionResult = "0";
      } else {
        this.$emit("update:result", parseFloat(this.sectionResult));
      }
    });
  }
}
</script>

<style scoped lang='scss'>
@import "~@/Help.scss";
.Wrapper {
  margin-top: 5%;
  .calculator {
    .note {
      grid-area: note;
      font-size: 20px;
      border: 1px solid $color;
      border-radius: 15px;
      margin: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: $color;
    }
    .result {
      grid-area: result;
      text-align: right;
      line-height: 74px;
      font-size: 48px;
      font-family: Helvetica;
      padding: 0 20px;
      color: #666;
    }
    .number-1 {
      grid-area: number-1;
    }
    .number-2 {
      grid-area: number-2;
    }
    .number-3 {
      grid-area: number-3;
    }
    .number-4 {
      grid-area: number-4;
    }
    .number-4 {
      grid-area: number-4;
    }
    .number-5 {
      grid-area: number-5;
    }
    .number-6 {
      grid-area: number-6;
    }
    .number-7 {
      grid-area: number-7;
    }
    .number-8 {
      grid-area: number-8;
    }
    .number-9 {
      grid-area: number-9;
    }
    .number-0 {
      grid-area: number-0;
    }
    .delete {
      grid-area: delete;
      > .icon {
        width: 2em;
        height: 1em;
      }
      &:active {
        fill: $color;
      }
    }
    .add {
      grid-area: add;
    }
    .ac {
      grid-area: ac;
    }
    .divide {
      grid-area: divide;
    }
    .multiply {
      grid-area: multiply;
    }
    .OK {
      grid-area: OK;
      background: $color;
    }
    .dot {
      grid-area: dot;
    }
    .equal {
      grid-area: equal;
    }
    .subtract {
      grid-area: subtract;
    }
    display: grid;
    grid-template-areas:
      "note result result result result"
      "number-7 number-8 number-9 divide ac"
      "number-4 number-5 number-6 multiply delete"
      "number-3 number-2 number-1 subtract OK"
      "number-0 dot equal add  OK";
    grid-template-columns: repeat(5, 20%);
    grid-template-rows: repeat(5, 74px);
    > button {
      margin: 8px;
      padding: 0;
      border: 1px solid $color;
      display: block;
      outline: none;
      border-radius: 37px;
      font-size: 24px;
      background: white;
      &:active {
        color: $color;
      }
    }
  }
}
</style>