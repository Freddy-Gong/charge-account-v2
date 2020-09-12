<template>
  <div>
    <Nav />
    <ChartHeader />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ChartHeader from "./Chart/ChartHeader.vue";
import Nav from "@/components/Nav.vue";
@Component({
  components: { ChartHeader, Nav },
})
export default class Chart extends Vue {}
</script>

<style scoped lang='scss'>
</style>
