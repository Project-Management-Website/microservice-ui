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
        path: '/register',
        component: () => import('@/views/register/index'),
        hidden: true,
        name: 'Register',
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
    {
        path: '/task',
        component: () => import('@/views/task/list'),
        hidden: true,
        name: 'Task_List',
    },
    {
        path: '/task/:uuid',
        component: () => import('@/views/task/edit'),
        hidden: true,
        name: 'Edit_Task',
    },
    {
        path: '/task/create',
        component: () => import('@/views/task/create'),
        hidden: true,
        name: 'Create_Task',
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router