<template>
  <div id="nav">
    <router-link to="/">记账</router-link>
    <router-link to="/Chart">图表</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Nav extends Vue {}
</script>

<style scoped lang='scss'>
</style>