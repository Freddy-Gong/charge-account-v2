<template>
  <div class="Wrapper">
    <Icon name="Right" @click.native="back" />
    <span>记一笔</span>
    <span @click="$emit('update:manger',!manger)">管理</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import Icon from "@/components/Icon.vue";
@Component({
  components: { Icon },
})
export default class Header extends Vue {
  @Prop(Boolean) readonly manger!: Boolean;
  back() {
    window.history.back();
  }
}
</script>

<style scoped lang='scss'>
@import "~@/Help.scss";

.Wrapper {
  padding: 10px 0;
  padding-left: 0.5em;
  padding-right: 0.5em;
  font-size: 20px;
  background: $color;
  color: white;
  display: flex;
  justify-content: space-between;
  > .icon {
    height: 1em;
    width: 2em;
  }
}
</style>