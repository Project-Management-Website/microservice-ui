<script setup>
import CONSTANT from "@/constant"
import { defineProps, onMounted, ref } from 'vue';
import { useTaskDetail } from "@/composable/task/useTaskDetail"
import { useRoute } from 'vue-router';
import { getDetailTask } from '@/api/task';
import { formatDatetime } from '@/utils/datetime';
import { useToast } from 'primevue/usetoast';
import { getListUsers } from '@/api/auth';

import ValInputText from "@/components/ValidateForm/ValInputText.vue"
import ValDropdown from '@/components/ValidateForm/ValDropdown.vue';
import ValCalendar from '@/components/ValidateForm/ValCalendar.vue'
import ValEditor from '@/components/ValidateForm/ValEditor.vue'

const props = defineProps({
    isEdit: Boolean
})
const route = useRoute()
const toast = useToast()

const dropdownUsers = ref({})

const { 
    onSubmit,
    setValues,
} = useTaskDetail(props.isEdit, dropdownUsers)

onMounted(async () => {
    const users = await getListUsers()
    dropdownUsers.value = users.items

    if (props.isEdit) {
        try {
            const param = route.params.uuid
            const result = await getDetailTask(param)

            setValues({
                title: result.task.title,
                assignee: result.task.assignee.uuid,
                status: result.task.status,
                priority: result.task.priority,
                due_date: formatDatetime(result.task.due_date),
                description: result.task.description,
            })

        } catch (error) {
            toast.add({ severity: 'error', summary: 'Error', detail: `${error.message}`, life: 3000 });
        }
    }
});
</script>

 <template>
    <pr-toast/>
    <form @submit="onSubmit">
        <div class="p-fluid formgrid grid">
            <div class="field col-12 md:col-12 ">
                <label>Name</label>
                <ValInputText name="title" type="text"/>
            </div>
            <div class="field col-12 md:col-6">
                <label>Assignee</label>
                <ValDropdown name="assignee" :options="dropdownUsers" optionLabel="username" optionValue="uuid"/>
            </div>
            <div class="field col-12 md:col-6">
                <label>Due</label>
                <ValCalendar name="due_date"/>
            </div>
            <div v-if="isEdit" class="field col-12 md:col-6">
                <label>Status</label>
                <ValDropdown name="status" :options="CONSTANT.dropdownStatuses" optionLabel="name" optionValue="name"/>
            </div>
            <div class="field col-12 md:col-6">
                <label>Priority</label>
                <ValDropdown name="priority" :options="CONSTANT.dropdownPriorities" optionLabel="name" optionValue="name"/>
            </div>
            <div class="field col-12 md:col-12">
                <label>Description</label>
                <ValEditor name="description" editorStyle="height: 25vh"/>
            </div>
            <div class="md:col-2 col-offset-10">
                <pr-button type="submit" label="Submit"></pr-button>
            </div>
        </div>
    </form>
</template>