import { getUserInfo } from '@/api/auth'
import { socket } from '@/socket'
import { getToken, removeToken } from '@/utils/auth'
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

        socket.auth = { token: getToken() }
        socket.connect()
    }


    function logout() {
        removeToken()
        userInfo.username = ""
        userInfo.user_uuid = ""
        userInfo.user_roles = ""

        hasRoute.value = false
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