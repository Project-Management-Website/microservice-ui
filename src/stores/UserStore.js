import { getUserInfo } from '@/api/auth'
import { removeToken } from '@/utils/auth'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { useSocketStore } from './SocketStore'

export const useUserStore = defineStore('user', () => {
    const userInfo = reactive({
        username: "",
        user_uuid: "",
        user_roles: "",
    })
    const hasRoute = ref(false)

    const socket = useSocketStore()

    async function setUserInfo(token) {
        const data = await getUserInfo(token)
        userInfo.username = data.user.username;
        userInfo.user_uuid = data.user.uuid;
        userInfo.user_roles = data.user.roles
        socket.connect()
    }

    function logout() {
        removeToken()
        userInfo.username = ""
        userInfo.user_uuid = ""
        userInfo.user_roles = ""

        hasRoute.value = false
        socket.disconnect()
    }

    function generatedRoute() {
        hasRoute.value = true;
    }

    return {
        userInfo,
        hasRoute,
        setUserInfo,
        generatedRoute,
        logout
    }
})