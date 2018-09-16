<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <br />
    <router-view v-if="connected"></router-view>
    <h2 v-else>Connecting to AWS IoT endpoint</h2>

    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/log">Log</router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'app',
  data () {
    return {
      msg: 'Test message'
    }
  },

  created () {
    this.$store.dispatch('getData')
  },

  mounted () {
  },

  computed: {
    ...mapState(['connected'])
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Questrial');

#app {
  font-family: 'Questrial', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
