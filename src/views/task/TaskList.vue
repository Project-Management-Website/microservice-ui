
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
            <TaskTable class="w-11" @select-task="showTaskInfo" @update-loading="updateLoading" @fetch-list="fetchList" :listTasks="tasks" :loading="loading"/>
            <pr-paginator @page="handlePageChange" class="mt-3" :rows="pagination.limit" :totalRecords="totalRecords"></pr-paginator>
        </div>
        <div class="card shadow-2 indigo-300 p-4 border-round w-4 mr-5">
            <TaskBasicInfo :selectedTask="selectedTaskInfo"/>
        </div>
    </div>
</template>

<script setup>
import CONSTANT from '@/constant';
import { useTask } from '@/composable/task/useTask'
import { onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';

import TaskBasicInfo from './components/TaskBasicInfo.vue';
import TaskTable from './components/TaskTable.vue';

const toast = useToast()

const {
        tasks,
        search,
        selectedStatus,
        selectedPrio,
        loading,
        pagination,
        totalRecords,
        showCreate,
        selectedTask,
        selectedTaskInfo,
        handlePageChange,
        showTaskInfo,
        createTask,
        handleSearch,
        handleFilter,
        clearFilter,
        updateLoading,
        fetchList,
    } = useTask()

onMounted(async () => {
    try {
        await fetchList()
        selectedTask.value = tasks.value[0] || {}
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error', detail: `${error}`, life: 3000 });
    } finally {
        loading.value = false
    }
})
</script>