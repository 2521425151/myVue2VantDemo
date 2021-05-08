<template>
  <div class="home">
    <div id="nav">
      <router-link to="/about">About</router-link>
      <router-link to="/myFormPages">myFormPages</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>
<style lang="scss" scoped>
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    margin: 10px;
    background-color: #eee;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
