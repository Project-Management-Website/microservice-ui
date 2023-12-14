<template>
  <div id="app">
    <pr-toast></pr-toast>
    <AppTopBar></AppTopBar>
    <router-view/>
  </div>
</template>

<script setup>
import { io } from 'socket.io-client';
import AppTopBar from './components/AppTopBar.vue';
import { getToken } from './utils/auth';
import { provide, watch } from 'vue';
import { useUserStore } from './stores/UserStore';
import { useToast } from 'primevue/usetoast';

const toast = useToast()
const userStore = useUserStore()
let socket = io(process.env.VUE_APP_PROJECT, {
  auth: {
    token: getToken()
  }
})

watch(userStore.userInfo, () => {
  socket = io(process.env.VUE_APP_PROJECT, {
  auth: {
    token: getToken()
  }
})
})
provide("socket", socket)

socket.on("notif:notify", (data) => {
  toast.add({ severity: 'info', summary: 'New task assigned to you', detail: `${data.message}`, life: 3000 });
})

</script>

<script>

export default {
  name: 'App',
}
</script>
