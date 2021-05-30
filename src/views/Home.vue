<template>
  <div class="home">
    <div id="nav">
      <router-link to="/about">About</router-link>
      <router-link to="/myFormPages">myFormPages</router-link>
      <router-link to="/dynamicCollapseForm">dynamicCollapseForm</router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'home',
  computed: {
    ...mapState({
      useName: state => (state['home'] ? state['home']['useName'] : '') // 使用按需引入的vuex模块的引入方式
    })
  },
  created() {
    console.log(this.useName, 'useName')
    console.log(this.$store.state, 'store.state')
  }
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
    display: inline-block;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
