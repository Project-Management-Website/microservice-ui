import { createWebHistory, createRouter } from "vue-router"
import { getRoles, getToken } from "@/utils/auth";

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
        path: '/test',
        component: () => import('@/views/test/index'),
        hidden: true,
        name: 'Test',
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
        path: '/check',
        hidden: true,
        name: 'Check',
    },
]

export const routes = [
    {
        path: '/dashboard',
        component: () => import('@/views/dashboard/index'),
        hidden: true,
        name: 'Dashboard',
        meta: {
            roles: 'member',
        }
    },
    {
        path: '/task',
        component: () => import('@/views/task/TaskList'),
        hidden: true,
        name: 'Task_List',
        meta: {
            roles: 'member',
        }
    },
    {
        path: '/task/:uuid',
        component: () => import('@/views/task/TaskEdit'),
        hidden: true,
        name: 'Edit_Task',
        meta: {
            roles: 'member',
        }
    },
    {
        path: '/task/create',
        component: () => import('@/views/task/TaskCreate'),
        hidden: true,
        name: 'Create_Task',
        meta: {
            roles: 'leader',
        }
    },
    {
        path: '/:catchAll(.*)',
        redirect: { name: 'Dashboard' },
        meta: { 
            roles: 'member',
        },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: UNAUTHORIZED_ROUTES,
})

router.beforeEach((to) => {
    const token = getToken()
    const roles = getRoles()

    if (!token || !router.hasRoute("Check")) return
    try {
        let accessRoutes = [];

        if (roles === "leader") {
            accessRoutes = routes;
        } else if (roles === "member") {
            accessRoutes = routes.filter(route => route.meta.roles === "member");
        }
        accessRoutes.forEach(route => {
            router.addRoute(route);
        });
        router.removeRoute("Check")
        console.log(router.getRoutes())
        return to.fullPath
    } catch (err) {
        console.log(err)
    }

})


export default router