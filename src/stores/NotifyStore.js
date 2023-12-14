import { defineStore } from "pinia";

export const useNotifyStore = defineStore({
    id: "notification",
    state: () => ({
        unreadNotif: 0,
        
    }),
    actions: { 

    }
})