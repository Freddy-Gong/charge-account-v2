<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">记账</router-link>
      <router-link to="/Chart">图表</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
@import "~@/reset.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
a {
  margin: 5px 10px;
}
</style>
