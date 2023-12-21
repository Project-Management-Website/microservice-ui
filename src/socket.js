import { io } from "socket.io-client"
import { ref } from "vue"

export const connected = ref(false)

export const socket = io(process.env.VUE_APP_PROJECT, {
    autoConnect: false
})

socket.on("connect", () => {
    connected.value = true
})

socket.on("disconnect", () => {
    connected.value = false
})