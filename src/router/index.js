import { createWebHistory, createRouter } from "vue-router"

const routes = [
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true,
        name: 'Login',
    },
    {
        path: '/dashboard',
        component: () => import('@/views/dashboard/index'),
        hidden: true,
        name: 'Dashboard',
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router