 <template>
    <div class="flex justify-content-center">
        <pr-toast/>
        <div class="card shadow-2 indigo-300 p-4 border-round m-6 w-6">
            <form @submit="onSubmit">
                <div class="p-fluid formgrid grid">
                    <div class="field col-12 md:col-12 ">
                        <label>Name</label>
                        <ValInputText name="title" type="text"/>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label>Assignee</label>
                        <ValDropdown name="assignee" :options="dropdownUsers" optLabel="username" optValue="uuid"/>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label>Due</label>
                        <ValCalendar name="due_date"/>
                    </div>
                    <div v-if="isEdit" class="field col-12 md:col-6">
                        <label>Status</label>
                        <ValDropdown name="status" :options="CONSTANT.dropdownStatuses" optLabel="name" optValue="name"/>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label>Priority</label>
                        <ValDropdown name="priority" :options="CONSTANT.dropdownPriorities" optLabel="name" optValue="name"/>
                    </div>
                    <div class="field col-12 md:col-12">
                        <label>Description</label>
                        <ValEditor name="description" editorStyle="height: 25vh"/>
                    </div>
                    <div class="field md:col-2 col-offset-10">
                        <pr-button type="submit" label="Submit"></pr-button>
                    </div>
                </div>
            </form>
		</div>
        <div class="card shadow-2 indigo-300 p-4 border-round m-6 w-3">
            
        </div>
    </div>
</template>

<script setup>
import { getDetailTask, updateDetailTask, createTask } from '@/api/task'
import { getListUsers } from '@/api/auth'
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref, defineProps, inject } from 'vue';
import { formatDatetime } from '@/utils/datetime'
import * as zod from "zod"
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import CONSTANT from "@/constant"
import { useUserStore } from '@/stores/UserStore';

import ValInputText from "@/components/ValidateForm/ValInputText.vue"
import ValDropdown from '@/components/ValidateForm/ValDropdown.vue';
import ValCalendar from '@/components/ValidateForm/ValCalendar.vue'
import ValEditor from '@/components/ValidateForm/ValEditor.vue'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const userStore = useUserStore()

const props = defineProps(['isEdit'])
const socket = inject('socket')

const dropdownUsers = ref([])

const validationSchema = toTypedSchema(
    zod.object({
        title: zod.string().nonempty('This field is required'),
        assignee: zod.string().nonempty('This field is required'),
        status: zod.string().optional(),
        priority: zod.string().nonempty('This field is required'),
        due_date: zod.date().or(zod.string()),
        description: zod.string().nonempty('This field is required'),
    })
);

const { handleSubmit , setValues, values } = useForm({
    validationSchema,
})

const onSubmit = handleSubmit(async () => {
    try {
        socket.emit("notif:create", "dasdasdsa")
        const assigneeInfo = await dropdownUsers.value.find(({ uuid }) => uuid === values.assignee)
        
        const taskForm = {
            ...values,
            assignee: {
                uuid: assigneeInfo.uuid,
                username: assigneeInfo.username,
            },
            reporter: {
                uuid: userStore.userInfo.user_uuid,
                username: userStore.userInfo.username,
            }
        }
        console.log(taskForm)
        if (props.isEdit) {
            await updateDetailTask(taskForm, route.params.uuid)
        } else {
            const tempTask = {
                ...taskForm,
                status: 'To do',
            }
            await createTask(tempTask)
        }
        
        router.push({ path: "/task"})
    } catch(error) {
        toast.add({ severity: 'error', summary: 'Error', detail: `${error}`, life: 3000 });
    }
})

onMounted(async () => {
    const users = await getListUsers()
    dropdownUsers.value = users.items;

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

<script>
    export default {
        name: "TaskDetail",
    }
</script>