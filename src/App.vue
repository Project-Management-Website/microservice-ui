<template>
  <div id="app">
    <AppTopBar></AppTopBar>
    <router-view/>
  </div>
</template>

<script setup>
import { onUnmounted } from 'vue';
import AppTopBar from './components/AppTopBar.vue';
import { useSocketStore } from './stores/SocketStore';

const useSocket = useSocketStore()

onUnmounted(() => {
  useSocket.socket.disconnect()
})
</script>

<script>
export default {
  name: 'App',
}
</script>
