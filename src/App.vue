<template>
  <div id="app">
    <test-component/>
    <test-component-vuex/>
  </div>
</template>

<script>

import TestComponent from './components/TestComponent.vue';
import TestComponentVuex from './components/TestComponentVuex.vue';

export default {
  name: 'App',
  components: {
    TestComponent,
    TestComponentVuex
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
