<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
// Vue属性的装饰器
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class App extends Vue {}
</script>

<style>
body {
  margin: 0;
}
</style>
