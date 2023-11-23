
<template>
    <AppTopBar></AppTopBar>
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
        <pr-dataTable size="small" :value="tasks" paginator :rows="10" removableSort filterDisplay="row" :loading="loading" class="mx-5 w-8 border-round" selectionMode="single" @rowDblclick="onRowDoubleClick" @rowSelect="onRowClick">
            <template #empty> No tasks found. </template>
            <template #loading> Loading tasks data. Please wait. </template>
            <pr-column field="title" header="Name" sortable style="width: 35%"></pr-column>
            <pr-column field="reporter_uuid" header="Reporter" sortable style="width: 20%"></pr-column>
            <pr-column field="assignee_uuid" header="Assignee" sortable style="width: 20%"></pr-column>
            <pr-column field="status" header="Status" sortable style="width: 10%">

            </pr-column>
            <pr-column header="Priority"  sortable style="width: 10%">
                <template #body="slotProps">
                    <pr-tag :value="slotProps.data.priority" rounded :severity="getSeverity(slotProps.data.priority)" />
                </template>
            </pr-column>
            <pr-column style="width: 5%">
                <template #body="{ data }">
                    <pr-button class="" type="button" icon='pi pi-delete-left' text size="small" @click="deleteRow(data)" />
                </template>
            </pr-column>
        </pr-dataTable>
        <div class="card shadow-2 indigo-300 p-4 border-round w-4 mr-5">
            <div class="p-fluid formgrid grid my-1">
                <div class="field col-12 md:col-12">
                    <label class="text-indigo-700 font-bold text-3xl">Task Detail</label>
                </div>
                <div class="field col-12 md:col-12 mt-2">
                    <label>Name</label>
                    <pr-inputText disabled v-model="selectedTask.title" type="text"/>
                </div>
                <div class="field col-12 md:col-6 ">
                    <label>Reporter</label>
                    <pr-inputText disabled v-model="selectedTask.reporter_uuid" type="text"/>
                </div>
                <div class="field col-12 md:col-6 ">
                    <label>Assignee</label>
                    <pr-inputText disabled v-model="selectedTask.assignee_uuid" type="text"/>
                </div>
                <div class="field col-12 md:col-6 ">
                    <label>Status</label>
                    <pr-inputText disabled v-model="selectedTask.status" type="text"/>
                </div>
                <div class="field col-12 md:col-6 ">
                    <label>Priority</label>
                    <pr-inputText disabled v-model="selectedTask.priority" type="text"/>
                </div>
                <div class="field col-12 md:col-6 ">
                    <label>Created date</label>
                    <pr-inputText disabled v-model="selectedTask.created_at" type="text"/>
                </div>
                <div class="field col-12 md:col-6 ">
                    <label>Due date</label>
                    <pr-inputText disabled v-model="selectedTask.due_date" type="text"/>
                </div>
                <div class="field col-12 md:col-12">
                    <label>Description</label>
                    <pr-editor v-model="selectedTask.description" readonly type="text"  editorStyle="height: 150px">
                        <template v-slot:toolbar>
                            <label></label>
                        </template>
                    </pr-editor>
                </div>
			</div>
        </div>
    </div>
</template>

<script setup>
import { getListTask, removeTask } from '@/api/task'; 
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { formatDatetime } from "@/utils/datetime"

const router = useRouter();

const loading = ref(true);
let tasks = ref([]);
let selectedTask = ref({
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
const getSeverity = (priority) => {
    switch (priority) {
        case 'low':
            return 'success';

        case 'medium':
            return 'warning';

        case 'high':
            return 'danger';

        default:
            return null;
    }
};

onMounted(async () => {
    try {
        await fetchList()
        loading.value = false
    } catch (err) {
        console.log(err)
    }
});

const onRowDoubleClick = (event) => {
    console.log(event)
    const params = event.data.uuid
    router.push({ name: "Edit_Task", params: { uuid: params } })
}

const onRowClick = (event) => {
    selectedTask.value = event.data
}

async function deleteRow (data) {
    loading.value = true
    try {
        await removeTask(data.uuid)
        await fetchList()
        loading.value = false
    } catch (err) {
        console.log(err)
    }

}

async function fetchList(data) {
    try {
        const task = await getListTask(data)

        task.data.items.forEach(item => {
            item.created_at = formatDatetime(item.created_at)
            item.due_date = formatDatetime(item.due_date)
        })

        tasks.value = task.data.items
    } catch (err) {
        console.log(err)
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
        loading.value = false
    } catch (err) {
        console.log(err)
    }

}


</script>


<script>
import AppTopBar from "@/components/TopBar.vue"
    export default {
        name: "task_list",
        components: {
            AppTopBar
        }
    }
</script>