import { createWebHistory, createRouter } from "vue-router"

const routes = [
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        hidden: true,
        name: 'Login',
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router