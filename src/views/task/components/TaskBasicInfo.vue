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
            <label class="mt-2 text-indigo-500 font-bold block">{{ selectedTask.reporter_uuid }}</label>
        </div>
        <div class="field col-12 md:col-6 ">
            <label>Assignee</label>
            <label class="mt-2 text-indigo-500 font-bold block">{{ selectedTask.assignee_uuid }}</label>
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
            <pr-editor v-model="description" readonly type="text"  editorStyle="height: 200px">
                <template v-slot:toolbar>
                    <label></label>
                </template>
            </pr-editor>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TaskBasicInfo"
    }
</script>

<script setup>
import { watch, defineProps, ref } from 'vue';


const props = defineProps(['selectedTask'])

const description = ref()

watch(props, () => {
    description.value = props.selectedTask.description
})

</script>