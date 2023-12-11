import { getUserInfo } from '@/api/auth'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    const userInfo = reactive({
        username: "",
        user_uuid: "",
        user_roles: "",
    })
    const hasRoute = ref(false)

    async function setUserInfo(token) {
        const data = await getUserInfo(token)
        userInfo.username = data.user.username;
        userInfo.user_uuid = data.user.uuid;
        userInfo.user_roles = data.user.roles
    }

    function generatedRoute() {
        hasRoute.value = true;
    }

    return {
        userInfo,
        hasRoute,
        setUserInfo,
        generatedRoute
    }
})