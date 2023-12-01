<template>
    <pr-dataTable size="small" :value="listTasks" removableSort filterDisplay="row" :loading="isLoading" class="mx-5 w-8 border-round" selectionMode="single" @rowDblclick="onRowDoubleClick" @rowSelect="onRowClick">
        <template #empty> No tasks found. </template>
        <template #loading>
            <pr-progSpinner style="width: 50px; height: 50px" strokeWidth="8"  animationDuration=".5s" aria-label="Custom ProgressSpinner"/>
        </template>
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
</template>

<script setup>
import { removeTask } from '@/api/task';
import { defineProps, ref, onMounted, defineEmits, watch } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps(['listTasks', 'loading'])
const emit = defineEmits(['selectTask'])

const isLoading = ref(props.loading);

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

onMounted(async() => {
    
});

const onRowDoubleClick = (event) => {
    console.log(event)
    const uuid = event.data.uuid
    router.push({ path: "/task/" + uuid })
}

const onRowClick = (event) => {
    emit('selectTask', event.data)
}

async function deleteRow (data) {
    isLoading.value = true
    try {
        await removeTask(data.uuid)
        // await fetchList()
    } catch (err) {
        console.log(err)
    } finally {
        isLoading.value = false
    }
}

watch(props, () => {
    isLoading.value = props.loading
})

</script>

<script>
    export default {
        name: "TaskTable"
    }
</script>