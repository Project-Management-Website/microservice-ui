import { createWebHistory, createRouter } from "vue-router"
import { getPermissions, getToken } from "@/utils/auth";

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
    }
]

export const routes = [
    {
        path: '/dashboard',
        component: () => import('@/views/dashboard/index'),
        hidden: true,
        name: 'Dashboard',
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
    {
        path: '/:pathMatch(.*)*',
        redirect: { name: 'Test' },
        meta: { 
          permissions: 'view',
        },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: UNAUTHORIZED_ROUTES,
})

router.beforeEach((to) => {
    const token = getToken()
    const permissions = getPermissions()

    if (token && router.hasRoute("Check")) {
        try {
            let accessRoutes = routes.filter(route => permissions.includes(route.meta.permissions));
            console.log("dasdsa")
            accessRoutes.forEach(route => {
                router.addRoute(route);
            });
            router.removeRoute("Check")

            return to.fullPath
        } catch (err) {
            console.log(err)
        }
    }

})


export default router