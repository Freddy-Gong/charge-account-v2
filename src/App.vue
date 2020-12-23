<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "~@/reset.scss";
body {
  background: gray;
}
#app {
  background: white;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 500px;
  margin: 0 auto;
}
a {
  margin: 5px 10px;
}
</style>
