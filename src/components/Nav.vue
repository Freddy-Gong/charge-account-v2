<template>
  <div id="nav">
    <router-link to="/" active-class="active" exact>记账</router-link>
    <router-link to="/Chart" active-class="active" exact>图表</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Nav extends Vue {}
</script>

<style scoped lang='scss'>
#nav {
  padding: 4px 0;
  > .active {
    color: rgb(65, 184, 131);
  }
}
</style>