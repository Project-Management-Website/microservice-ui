<template>
  <div id="app">
    <div v-if="userStore.userInfo.username">
      <pr-toast></pr-toast>
      <AppTopBar></AppTopBar>
      <router-view/>
    </div>
    <div v-else>
      <router-view/>
    </div>
  </div>
</template>

<script setup>
import { useToast } from 'primevue/usetoast';
import AppTopBar from './components/AppTopBar.vue';
import { useUserStore } from './stores/UserStore';
import { socket } from './socket';

const userStore = useUserStore()
const toast = useToast()

socket.on("notif:notify", (data) => {
  toast.add({ severity: 'info', summary: 'Info', detail: `${data.message}`, life: 3000 });
})
</script>

<script>
export default {
  name: 'App',
}
</script>
