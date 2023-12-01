
<template>
    <AppTopBar></AppTopBar>
    <pr-toast/>
    <div class="flex justify-content-between mx-5 mt-3 ">
        <div class="w-auto">
            <span class="p-input-icon-left">
                <i class="pi pi-search"/>
                <pr-inputText v-model="search" placeholder="Search" @keydown.enter="handleSearch"/>
            </span>
            <pr-dropDown @change="handleFilter" v-model="selectedStatus" :options="dropdownStatuses" optionLabel="name" optionValue="name" class="ml-2" placeholder="filter status"></pr-dropDown>
            <pr-dropDown @change="handleFilter" v-model="selectedPrio" :options="dropdownPriorities" optionLabel="name" optionValue="name" class="ml-2" placeholder="filter priority"></pr-dropDown>
            <pr-button label="Clear Filter" text icon="pi pi-filter-slash" @click="clearFilter" class="ml-2"/>
        </div>
        <pr-button class="align-parent-end" @click="createTask" label="Create task"></pr-button>
    </div>
    <div class="flex card mt-3">
        <div class="w-10">
            <TaskTable class="w-11" @select-task="showTaskInfo" :listTasks="tasks" :loading="loading"/>
            <pr-paginator @page="handlePageChange" class="mt-3" :rows="pagination.limit" :totalRecords="totalRecords"></pr-paginator>
        </div>
        <div class="card shadow-2 indigo-300 p-4 border-round w-4 mr-5">
            <TaskBasicInfo :selectedTask="selectedTask"/>
        </div>
    </div>
</template>

<script setup>
import { getListTask } from '@/api/task';
import { ref, onMounted, provide } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from "primevue/usetoast"
import { formatDatetime } from "@/utils/datetime"

import TaskBasicInfo from './components/TaskBasicInfo.vue';
import AppTopBar from '@/components/AppTopBar.vue';
import TaskTable from './components/TaskTable.vue';

const router = useRouter();
const toast = useToast();

provide('taskFunc', 'fetchList')

const tasks = ref([]);
const selectedTask = ref({
    title: "",
    reporter_uuid: "",
    assignee_uuid: "",
    status: "",
    priority: "",
    created_at: "",
    due_date: "",
    description: "",
})
const dropdownStatuses = ref([
        {name: 'To do'},
        {name: 'In progress'},
        {name: 'Done'}
    ],
)
const selectedStatus = ref("");
const dropdownPriorities = ref([
        {name: 'low'},
        {name: 'medium'},
        {name: 'high'}
    ],
)
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
        const { numTask } = await fetchList()
        totalRecords.value = numTask;
            
        selectedTask.value = tasks.value[0] || {}
    } catch (err) {
        
        console.log(err)
    } finally {
        loading.value = false
    }
});

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
        return tempTasks.data
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error', detail: `${error}`, life: 3000 });
    } finally {
        loading.value = false
    }
}

function createTask () {
    router.push({ path: "/task/create" })
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
    } catch (err) {
        console.log(err)
    } finally {
        loading.value = false
    }
}
</script>


<script>
    export default {
        name: "TaskList",
    }
</script>