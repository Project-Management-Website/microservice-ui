
<template>
    <div class="flex flex-row-reverse mx-5 mt-4 ">
        <pr-button @click="createTask" label="Create task"></pr-button>
    </div>
    <div class="card mt-4">
        <pr-dataTable :value="tasks" paginator :rows="10" filterDisplay="row" :loading="loading" class="mx-5" selectionMode="single" @rowSelect="onRowSelect">
            <template #header>
                <div class="flex justify-content-end">
                </div>
            </template>
            <template #empty> No customers found. </template>
            <template #loading> Loading customers data. Please wait. </template>
            <pr-column field="title" header="Name" style="width: 50%"></pr-column>
            <pr-column field="assignee" header="Assignee" style="width: 15%"></pr-column>
            <pr-column field="status" header="Status" style="width: 10%"></pr-column>
            <pr-column field="priority" header="Priority" style="width: 10%"></pr-column>
            <pr-column field="created_at" header="Created" style="width: 15%"></pr-column>
        </pr-dataTable>
    </div>
</template>

<script setup>
import { getListTask } from '@/api/task'; 
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const loading = ref(true);
let tasks = ref([]);

onMounted(async () => {
    try {
        let task = {}
        task = await getListTask()
        console.log(task)
        tasks = task.data.items
        loading.value = false
    } catch (err) {
        console.log(err)
    }
});

const onRowSelect = (event) => {
    const params = event.data.uuid
    router.push({ name: "Edit_Task", params: { uuid: params } })
}

function createTask () {
    router.push({ name: "Create_Task" })
}

</script>


<script>
    export default {
        name: "task_list"
    }
</script>
