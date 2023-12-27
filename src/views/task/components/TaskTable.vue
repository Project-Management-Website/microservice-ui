<script setup>
import { useTaskTable } from "@/composable/task/useTaskTable"
import { defineProps, defineEmits } from "vue";

const props = defineProps({
    listTasks: Array,
    loading: Boolean,
})
const emit = defineEmits(['selectTask', 'updateLoading', 'fetchList'])

const {
        getSeverity,
        onRowDoubleClick,
        onRowClick,
        deleteRow,
    } = useTaskTable(emit)

</script>
<template>
    <pr-dataTable size="small" :value="listTasks" filterDisplay="row" :loading="props.loading" class="mx-5 w-8 border-round" selectionMode="single" @rowDblclick="onRowDoubleClick" @rowSelect="onRowClick">
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