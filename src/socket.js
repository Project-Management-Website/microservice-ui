import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
  connected: false,
});

export const socket = io(process.env.VUE_APP_PROJECT);