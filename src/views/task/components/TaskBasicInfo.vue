<template>
    <div class="p-fluid formgrid grid my-1">
        <div class="field col-12 md:col-12">
            <label class="text-indigo-700 font-bold text-3xl">Task Detail</label>
        </div>
        <div class="field col-12 md:col-12 ">
            <label>Title</label>
            <label class="mt-2 text-indigo-500 font-bold block">{{ selectedTask.title }}</label>
        </div>
        <div class="field col-12 md:col-6 ">
            <label>Reporter</label>
            <label class="mt-2 text-indigo-500 font-bold block">{{ selectedTask.reporter }}</label>
        </div>
        <div class="field col-12 md:col-6 ">
            <label>Assignee</label>
            <label class="mt-2 text-indigo-500 font-bold block">{{ selectedTask.assignee || "" }}</label>
        </div>
        <div class="field col-12 md:col-6 ">
            <label>Status</label>
            <label class="mt-2 text-indigo-500 font-bold block">{{ selectedTask.status }}</label>
        </div>
        <div class="field col-12 md:col-6 ">
            <label>Priority</label>
            <label class="mt-2  text-indigo-500 font-bold block">{{ selectedTask.priority }}</label>
        </div>
        <div class="field col-12 md:col-6 ">
            <label>Created date</label>
            <label class="mt-2 text-indigo-500 font-bold block">{{ selectedTask.created_at }}</label>
        </div>
        <div class="field col-12 md:col-6 ">
            <label>Due date</label>
            <label class="mt-2 text-indigo-500 font-bold block">{{ selectedTask.due_date }}</label>
        </div>
        <div class="field col-12 md:col-12">
            <label>Description</label>
            <pr-editor v-model="description" readonly type="text"  editorStyle="height: 20vh">
                <template v-slot:toolbar>
                    <label></label>
                </template>
            </pr-editor>
        </div>
    </div>
</template>

<script setup>
import { watch, defineProps, ref } from 'vue';

const props = defineProps({
    selectedTask: Object
})

const description = ref()

watch(props, () => {
    description.value = props.selectedTask.description
})
</script>