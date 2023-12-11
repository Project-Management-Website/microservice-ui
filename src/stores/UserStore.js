import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    const username = ref(1)
    const user_uuid = ref()
    const user_roles = ref()

    return {
        username,
        user_roles,
        user_uuid
    }
})