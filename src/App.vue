<template>
  <div id="app">
    <AppTopBar></AppTopBar>
    <router-view/>
  </div>
</template>

<script setup>
import AppTopBar from './components/AppTopBar.vue';

</script>

<script>
export default {
  name: 'App',
}
</script>
