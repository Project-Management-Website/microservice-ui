<template>
  <div id="app">
    <AppTopBar/>
    <router-view/>
  </div>
</template>

<script>
import AppTopBar from './components/TopBar.vue';

export default {
  name: 'App',
  components: {
    AppTopBar
  }
}
</script>
