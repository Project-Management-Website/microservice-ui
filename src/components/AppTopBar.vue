<template>
	<div class="card">
        <pr-megaMenu :model="items" orientation="horizontal">
            <template #start>
                <span class="flex align-items-center">
                    <img alt="logo" src="https://primefaces.org/cdn/primevue/images/primevue-logo-dark.svg" height="24" class="mr-2" />
                </span>
            </template>
            <template #end>
                <div v-if="!isLogged" class="mr-4">
                    <router-link to="/login">
                        <pr-button size="small" outlined>Login</pr-button>
                    </router-link>
                    <router-link to="/register" class="ml-3">
                        <pr-button size="small" >Register</pr-button>
                    </router-link>
                </div>
                <div v-else class="flex mr-4">
                    <div class="card flex ml-4 justify-content-center">
                        <pr-button icon="pi pi-user"  @click="toggleMenu" aria-haspopup="true" aria-controls="overlay_menu" text size="large" rounded/>
                        <pr-menu ref="menu" id="overlay_menu" :model="profileMenu" :popup="true">
                            <template #item="{ item, props }">
                                <a class="flex align-items-center" v-bind="props.action">
                                    <span :class="item.icon" />
                                    <span class="ml-2">{{ item.label }}</span>
                                    <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
                                </a>
                            </template>
                        </pr-menu>
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
import { ref, computed } from "vue";
import { useRouter } from "vue-router"

import Badge from 'primevue/badge';

const router = useRouter()
const userStore = useUserStore()

const menu = ref();
const profileMenu = ref([
    {
        label: 'Account',
        items: [
            {
                label: 'Profile',
                icon: 'pi pi-user-edit',
            },
            {
                label: 'Log out',
                icon: 'pi pi-sign-out',
                command: () => {
                    userStore.logout()
                    router.push({ path: "/test" })
                }
            },
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

const isLogged = computed(() => {
    return userStore.userInfo.username ? true : false
})

</script>
