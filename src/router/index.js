import { createWebHistory, createRouter } from "vue-router"
import { getToken } from "@/utils/auth";

export const UNAUTHORIZED_ROUTES = [
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
            }},
    },
    {
        path: '/dashboard',
        component: () => import('@/views/dashboard/index'),
        hidden: true,
        name: 'Dashboard',
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
            }
        }
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/dashboard', // Redirect to a specific page
    },
]

export const routes = [
    {
        path: '/test',
        component: () => import('@/views/test/index'),
        hidden: true,
        name: 'Test',
        meta: {
            permissions: 'view',
        }
    },
    {
        path: '/task',
        component: () => import('@/views/task/list'),
        hidden: true,
        name: 'Task_List',
        meta: {
            permissions: 'view',
        }
    },
    {
        path: '/task/:uuid',
        component: () => import('@/views/task/edit'),
        hidden: true,
        name: 'Edit_Task',
        meta: {
            permissions: 'update',
        }
    },
    {
        path: '/task/create',
        component: () => import('@/views/task/create'),
        hidden: true,
        name: 'Create_Task',
        meta: {
            permissions: 'create',
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: UNAUTHORIZED_ROUTES,
})

export default router