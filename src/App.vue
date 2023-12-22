<template>
  <div id="app">
    <div v-if="userStore.hasRoute">
      <AppTopBar></AppTopBar>
      <router-view/>
    </div>
    <div v-else>
      <router-view/>
    </div>
  </div>
</template>

<script setup>
import AppTopBar from './components/AppTopBar.vue';
import { useUserStore } from './stores/UserStore';

const userStore = useUserStore()
</script>

<script>
export default {
  name: 'App',
}
</script>
