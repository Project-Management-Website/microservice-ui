import { createWebHistory, createRouter } from "vue-router"
import { getToken } from "@/utils/auth";

const routes = [
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true,
        name: 'Login',
        beforeEnter: (to, from, next) => {
            const token = getToken()
      
            if (token) {
              next({ name: 'Dashboard' });
            } else {
              next();
            }}
    },
    {
        path: '/dashboard',
        component: () => import('@/views/dashboard/index'),
        hidden: true,
        name: 'Dashboard',
    },
    {
        path: '/test',
        component: () => import('@/views/test/index'),
        hidden: true,
        name: 'Test',
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router