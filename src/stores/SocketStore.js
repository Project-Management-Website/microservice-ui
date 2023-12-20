import { getToken } from "@/utils/auth";
import { defineStore } from "pinia";
import { io } from "socket.io-client";

export const useSocketStore = defineStore({
    id: "socket",
    state: () => ({
        socket: null,  
    }),
    actions: { 
        connect() {
            this.socket = io(process.env.VUE_APP_PROJECT, {
                auth: {
                    token: getToken()
                }
            })
        },
        disconnect() {
            if(this.socket) {
                this.socket.disconnect()
            }
        }
    }
})