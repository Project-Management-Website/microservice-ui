<template>
  <div id="app">
    <div v-if="userStore.hasRoute">
      <AppTopBar></AppTopBar>
      <router-view/>
    </div>
    <div v-else class="w-screen h-screen bg-auto bg-no-repeat bg-center bg-primary border-round h-20rem w-full" style="background-image: url('assets/back_1.png');">

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
