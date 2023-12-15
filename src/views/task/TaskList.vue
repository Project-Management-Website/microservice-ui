
<template>
    <pr-toast/>
    <div class="flex justify-content-between mx-5 mt-3 ">
        <div class="w-auto">
            <span class="p-input-icon-left">
                <i class="pi pi-search"/>
                <pr-inputText v-model="search" placeholder="Search" @keydown.enter="handleSearch"/>
            </span>
            <pr-dropDown @change="handleFilter" v-model="selectedStatus" :options="CONSTANT.dropdownStatuses" optionLabel="name" optionValue="name" class="ml-2" placeholder="filter status"></pr-dropDown>
            <pr-dropDown @change="handleFilter" v-model="selectedPrio" :options="CONSTANT.dropdownPriorities" optionLabel="name" optionValue="name" class="ml-2" placeholder="filter priority"></pr-dropDown>
            <pr-button label="Clear Filter" text icon="pi pi-filter-slash" @click="clearFilter" class="ml-2"/>
        </div>
        <pr-button v-if="showCreate" class="align-parent-end" @click="createTask" label="Create task"></pr-button>
    </div>
    <div class="flex card mt-3">
        <div class="w-10">
            <TaskTable class="w-11" @select-task="showTaskInfo" :listTasks="tasks" :loading="loading"/>
            <pr-paginator @page="handlePageChange" class="mt-3" :rows="pagination.limit" :totalRecords="totalRecords"></pr-paginator>
        </div>
        <div class="card shadow-2 indigo-300 p-4 border-round w-4 mr-5">
            <TaskBasicInfo :selectedTask="selectedTaskInfo"/>
        </div>
    </div>
</template>

<script setup>
import { getListTask } from '@/api/task';
import { ref, onMounted, provide, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from "primevue/usetoast"
import { formatDatetime } from "@/utils/datetime"
import CONSTANT from '@/constant';

import TaskBasicInfo from './components/TaskBasicInfo.vue';
import TaskTable from './components/TaskTable.vue';
import { useUserStore } from '@/stores/UserStore';

const router = useRouter();
const toast = useToast();
const userStore = useUserStore()

provide('fetchList', fetchList)

const tasks = ref([]);
const selectedTask = ref({
    title: "",
    reporter: {
        uuid: "",
        username: ""
    },
    assignee: {
        uuid: "",
        username: ""
    },
    status: "",
    priority: "",
    created_at: "",
    due_date: "",
    description: "",
})
const selectedStatus = ref("");
const selectedPrio = ref("");
const search = ref()
const loading = ref(true)
const pagination = ref({
    page: 1,
    limit: 10,
})
const totalRecords = ref(1)

onMounted(async () => {
    try {
        await fetchList()
            
        selectedTask.value = tasks.value[0] || {}
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error', detail: `${error}`, life: 3000 });
    } finally {
        loading.value = false
    }
});

const showCreate = computed(() => {
    if(userStore.userInfo.user_roles === CONSTANT.LEADER_ROLE) {
        return true;
    }
    return false
})

const selectedTaskInfo = computed(() => {
    return {
        ...selectedTask.value,
        reporter: selectedTask.value.reporter.username,
        assignee: selectedTask.value.assignee.username
    }
})

async function handlePageChange(data) {
    pagination.value.page = data.page + 1;
    await fetchList()
}

function showTaskInfo(data) {
    selectedTask.value = data
}

async function fetchList(query) {
    try {
        loading.value = true

        query = {
            ...query,
            ...pagination.value
        }
        const tempTasks = await getListTask(query)

        tempTasks.data.items.forEach(item => {
            item.created_at = formatDatetime(item.created_at)
            item.due_date = formatDatetime(item.due_date)
        })
        
        tasks.value = tempTasks.data.items
        totalRecords.value = tempTasks.data.numTask;
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error', detail: `${error}`, life: 3000 });
    } finally {
        loading.value = false
    } 
}

function createTask () {
    router.push({ name: "Create_Task" })
}

async function handleSearch() {
    const query = {
        search: search.value,
    }
    await fetchList(query)
}

async function handleFilter() {
    const query = {
        status: selectedStatus.value || {},
        priority: selectedPrio.value || {}
    }
    await fetchList(query)
}

async function clearFilter() {
    loading.value = true

    try {
        selectedPrio.value = ""
        selectedStatus.value = ""
        search.value = ""

        await fetchList()
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error', detail: `${error}`, life: 3000 });
    } finally {
        loading.value = false
    }
}
</script>