<template>
  <div>
    <Header :manger.sync="manger" />
    <Type :type.sync="type" />
    <Tag :type="type" :manger="manger" />
    <NumberPad />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "./Number/Header.vue";
import Type from "./Number/Type.vue";
import NumberPad from "./Number/NumberPad.vue";
import Tag from "./Number/Tag.vue";

@Component({
  components: { NumberPad, Type, Header, Tag },
})
export default class Number extends Vue {
  type: "-" | "+" = "-";
  manger: Boolean = false;
}
</script>

<style scoped lang='scss'>
</style>