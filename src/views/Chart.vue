<template>
  <div>
    <ChartHeader />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ChartHeader from "./Chart/ChartHeader.vue";
@Component({
  components: { ChartHeader },
})
export default class Chart extends Vue {}
</script>

<style scoped lang='scss'>
</style>
