import { createWebHistory, createRouter } from "vue-router"
import { getToken } from "@/utils/auth";
import { useUserStore } from "@/stores/UserStore";
import NProgress from "nprogress";

export const routes = [
    {
        path: '/login',
        component: () => import('@/views/login/LoginView'),
        hidden: true,
        name: 'Login',
        meta: {
            requireAuth: false
        }
    },
    {
        path: '/test',
        component: () => import('@/views/test/index'),
        hidden: true,
        name: 'Test',
        meta: {
            requireAuth: false
        }
    },
    {
        path: '/register',
        component: () => import('@/views/register/RegisterView'),
        hidden: true,
        name: 'Register',
        meta: {
            requireAuth: false
        }
    },
    {
        path: '/dashboard',
        component: () => import('@/views/dashboard/Dashboard'),
        hidden: true,
        name: 'Dashboard',
        meta: {
            requireAuth: true,
            roles: 'member',
        }
    },
    {
        path: '/task',
        component: () => import('@/views/task/TaskList'),
        hidden: true,
        name: 'Task_List',
        meta: {
            requireAuth: true,
            roles: 'member',
        }
    },
    {
        path: '/task/:uuid',
        component: () => import('@/views/task/TaskEdit'),
        hidden: true,
        name: 'Edit_Task',
        meta: {
            requireAuth: true,
            roles: 'member',
        }
    },
    {
        path: '/task/create',
        component: () => import('@/views/task/TaskCreate'),
        hidden: true,
        name: 'Create_Task',
        meta: {
            requireAuth: true,
            roles: 'leader',
        }
    },
    {
        path: '/:catchAll(.*)',
        redirect: { name: 'Dashboard' },
        meta: { 

        },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (from, to, next) => {
    NProgress.start()

    const userStore = useUserStore()
    const token = getToken()

    if(!to.requireAuth && token) {
        console.log(to)
        next({ name: "Dashboard" })
        return
    }

    if(to.requireAuth && !token) {
        next({ name: "Login" })
        return
    }
    console.log("1")
    console.log("2")
    if(!to.requireAuth && !token) {
        next()
        return
    }
    console.log("3")
    if(userStore.userInfo.username !== "") {
        next()
        return
    }
    console.log("4")
    await userStore.setUserInfo(token)
    next()
    return

    // if (!token || userStore.hasRoute) return
    // try {
    //     await userStore.setUserInfo(token)
    //     let accessRoutes = [];
    //     const roles = userStore.userInfo.user_roles

    //     if (roles === "leader") {
    //         accessRoutes = routes;
    //     } else if (roles === "member") {
    //         accessRoutes = routes.filter(route => route.meta.roles === "member");
    //     }
    //     accessRoutes.forEach(route => {
    //         router.addRoute(route);
    //     });
    //     console.log(router.getRoutes())
    //     userStore.generatedRoute();

    //     return to.fullPath
    // } catch (err) {
    //     console.log(err)
    // }

})

router.afterEach(() => {
    NProgress.done()
})


export default router