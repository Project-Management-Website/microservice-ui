<template>
	<div class="card">
        <pr-megaMenu :model="items" orientation="horizontal">
            <template #start>
                <span class="flex align-items-center">
                    <img alt="logo" src="https://primefaces.org/cdn/primevue/images/primevue-logo-dark.svg" height="24" class="mr-2" />
                </span>
            </template>
            <template #end>
                <div v-if="!isLoggedIn" class="mr-4">
                    <router-link to="/login">
                        <pr-button size="small" outlined>Login</pr-button>
                    </router-link>
                    <router-link to="/register" class="ml-3">
                        <pr-button size="small" >Register</pr-button>
                    </router-link>
                </div>
                <div v-else class="flex mr-4">
                    <div class="card flex justify-content-center">
                        <pr-button icon="pi pi-bell"  @click="toggleMenu" aria-haspopup="true" aria-controls="overlay_menu" text size="large" rounded/>
                        <pr-menu ref="menu" id="overlay_menu" :model="profileMenu" :popup="true" />
                    </div>
                    <div class="card flex ml-4 justify-content-center">
                        <pr-button icon="pi pi-user"  @click="toggleMenu" aria-haspopup="true" aria-controls="overlay_menu" text size="large" rounded/>
                        <pr-menu ref="menu" id="overlay_menu" :model="profileMenu" :popup="true" />
                    </div>
                </div>
            </template>
            <template #item="{ label, item, props, hasSubmenu }">
                <router-link v-if="item.route" v-slot="routerProps" :to="item.route" custom>
                    <a :href="routerProps.href" v-bind="props.action">
                        <span v-bind="props.icon" />
                        <span v-bind="props.label">{{ label }}</span>
                    </a>
                </router-link>
                <a v-else :href="item.url" :target="item.target" v-bind="props.action">
                    <span v-bind="props.icon" />
                    <span v-bind="props.label">{{ label }}</span>
                    <span :class="[hasSubmenu && 'pi pi-fw pi-angle-down']" v-bind="props.submenuicon" />
                </a>
            </template>
        </pr-megaMenu>
    </div>
</template>

<script setup>
import { useUserStore } from "@/stores/UserStore";
import { getToken, removeToken } from "@/utils/auth";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router"

const router = useRouter()
const userStore = useUserStore()

const menu = ref();
const profileMenu = ref([
    {
        label: 'Account',
        items: [
            {
                label: 'profile',
                icon: 'pi pi-user-edit',
            },
            {
                label: 'Log out',
                icon: 'pi pi-sign-out',
                command: () => {
                    removeToken();
                    userStore.hasRoute = false
                    router.push({ path: "/test" })
                }
            }
        ]
    }
]);

const toggleMenu = (event) => {
    menu.value.toggle(event);
};

const items = ref([
    {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-server',
        command: () => {
            router.push({ path: '/dashboard' })
        }
    },
    {
        label: 'Project',
        icon: 'pi pi-fw pi-box',
        command: () => {
            router.push({ path: "/task" })
        }
    },
]);
const isLoggedIn = ref(false)

onMounted(async () => {
    const token = getToken();
    if(token) {
        isLoggedIn.value = true
    }
})

</script>
