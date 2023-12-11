import { createWebHistory, createRouter } from "vue-router"
import { getToken } from "@/utils/auth";
import { useUserStore } from "@/stores/UserStore";

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

router.beforeEach(async (to) => {
    const userStore = useUserStore()

    const token = getToken()

    if (!token || userStore.hasRoute) return
    try {
        await userStore.setUserInfo(token)
        let accessRoutes = [];
        const roles = userStore.userInfo.user_roles

        if (roles === "leader") {
            accessRoutes = routes;
        } else if (roles === "member") {
            accessRoutes = routes.filter(route => route.meta.roles === "member");
        }
        accessRoutes.forEach(route => {
            router.addRoute(route);
        });
        console.log(router.getRoutes())
        userStore.generatedRoute();

        return to.fullPath
    } catch (err) {
        console.log(err)
    }

})


export default router