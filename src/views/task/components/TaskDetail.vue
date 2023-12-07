 <template>
    <TopAppBar/>
    <div class="flex justify-content-center">
        <pr-toast/>
        <div class="card shadow-2 indigo-300 p-4 border-round m-6 w-6">
            <form @submit="onSubmit">
                <div class="p-fluid formgrid grid">
                    <div class="field col-12 md:col-12 ">
                        <label>Name</label>
                        <ValInputText name="title"></ValInputText>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label>Assignee</label>
                        <ValDropdown name="assignee" :options="dropdownUsers" optLabel="username" optValue="uuid"></ValDropdown>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label>Due</label>
                        <pr-calendar :minDate="new Date()" :class="{ 'p-invalid': errors.due_date }" showIcon v-model="due_date" showTime hourFormat="12" dateFormat="mm/dd/yy" showButtonBar/>
                        <small class="p-error mb-2" id="text-error">{{ errors.due_date || '&nbsp;' }}</small>
                    </div>
                    <div v-if="isEdit" class="field col-12 md:col-6">
                        <label>Status</label>
                        <ValDropdown name="status" :options="CONSTANT.dropdownStatuses" optLabel="name" optValue="name"></ValDropdown>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label>Priority</label>
                        <pr-dropDown v-model="priority" :class="{ 'p-invalid': errors.priority }" :options="dropdownPriorities" :optionLabel="name" :optionValue="name"></pr-dropDown>
                        <small class="p-error mb-2" id="text-error">{{ errors.priority || '&nbsp;' }}</small>
                    </div>
                    <div class="field col-12 md:col-12">
                        <label>Description</label>
                        <pr-editor v-model="description" :class="{ 'p-invalid': errors.description }" editorStyle="height: 25vh"/>
                        <small class="p-error mb-2" id="text-error">{{ errors.description || '&nbsp;' }}</small>
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
import { getUserUuid, getUser } from '@/utils/auth'
import { getListUsers } from '@/api/auth'
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref, defineProps } from 'vue';
import { formatDatetime } from '@/utils/datetime'
import * as zod from "zod"
import { useField, useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import CONSTANT from "@/constant"

import ValInputText from "@/components/ValidateForm/ValInputText.vue"
import ValDropdown from '@/components/ValidateForm/ValDropdown.vue';

const route = useRoute()
const router = useRouter()
const toast = useToast()

const props = defineProps(['isEdit'])

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

const { handleSubmit, errors, setFieldValue, values } = useForm({
    validationSchema,
})

const { value: assignee } = useField('assignee')
const { value: due_date } = useField('due_date')
const { value: status } = useField('status')
const { value: priority } = useField('priority')
const { value: description } = useField('description')

const onSubmit = handleSubmit(() => {
      handleSubmitForm();
})

onMounted(async () => {
    if (props.isEdit) {
        try {
            const param = route.params.uuid
            const result = await getDetailTask(param)

            setFieldValue("title", result.task.title)
            assignee.value = result.task.assignee.uuid
            status.value = result.task.status
            priority.value = result.task.priority
            description.value = result.task.description
            due_date.value = formatDatetime(result.task.due_date)

            } catch (error) {
                toast.add({ severity: 'error', summary: 'Error', detail: `${error.message}`, life: 3000 });
            }
    }
    const users = await getListUsers()

    dropdownUsers.value = users.items;
});

async function handleSubmitForm() {
    try {
        const assigneeInfo = await dropdownUsers.value.find(({ uuid }) => uuid === assignee.value)

        const taskForm = {
            ...values,
            assignee: {
                uuid: assigneeInfo.uuid,
                username: assigneeInfo.username,
            },
            reporter: {
                uuid: getUserUuid(),
                username: getUser(),
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
}

</script>

<script>
import TopAppBar from '@/components/AppTopBar.vue';

    export default {
        name: "TaskDetail",
        components: {
            TopAppBar,
        }
    }
</script>