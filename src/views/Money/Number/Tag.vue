<template>
  <div class="Tag"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Tag extends Vue {}
</script>

<style scoped lang='scss'>
.Tag {
  display: flex;
  flex-wrap: wrap;
  height: 200px;
  overflow-x: hidden;
  overflow-y: auto;
  > .selected {
    > .sign {
      border: 1px solid black;
    }
  }
}
</style>