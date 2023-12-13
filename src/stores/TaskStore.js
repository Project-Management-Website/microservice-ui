import { defineStore } from "pinia";
import { socket } from "@/socket";

export const useTaskStore = defineStore({
    id: "task",
    state: () => ({

    }),
    actions: { 
        testConnect() {
            socket.on("connect", () => {
                socket.emit("foo")
            });
        },
        emitss() {
            socket.on("barr", (res) => {
                console.log(res)
            })
        }
    }
})