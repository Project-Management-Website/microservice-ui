<template>
    <pr-dataTable size="small" :value="listTasks" filterDisplay="row" :loading="isLoading" class="mx-5 w-8 border-round" selectionMode="single" @rowDblclick="onRowDoubleClick" @rowSelect="onRowClick">
        <template #empty> No tasks found. </template>
        <template #loading>
            <pr-progSpinner style="width: 50px; height: 50px" strokeWidth="8"  animationDuration=".5s" aria-label="Custom ProgressSpinner"/>
        </template>
        <pr-column field="title" header="Name" style="width: 35%"></pr-column>
        <pr-column field="reporter.username" header="Reporter" style="width: 20%"></pr-column>
        <pr-column field="assignee.username" header="Assignee" style="width: 20%"></pr-column>
        <pr-column field="status" header="Status" style="width: 10%">

        </pr-column>
        <pr-column header="Priority" style="width: 10%">
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
import { defineProps, ref, defineEmits, watch, inject } from 'vue';
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast';

const router = useRouter()
const toast = useToast()

const props = defineProps(['listTasks', 'loading'])
const emit = defineEmits(['selectTask'])
const fetchList = inject('fetchList')

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

const onRowDoubleClick = (event) => {
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
        await fetchList()
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error', detail: `${error.message}`, life: 3000 });
    } finally {
        isLoading.value = false
    }
}

watch(props, () => {
    isLoading.value = props.loading
})

</script>