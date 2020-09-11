<template>
  <div>
    你输入的地址不存在，点击返回首页
    <button>
      <router-link to="/">返回首页</router-link>
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NoMacth extends Vue {}
</script>

<style scoped lang='scss'>
</style>