 <template>
    <TopAppBar/>
    <div class="flex justify-content-center">
        <pr-toast/>
        <div class="card shadow-2 indigo-300 p-4 border-round m-6 w-6">
            <form @submit="onSubmit">
                <div class="p-fluid formgrid grid">
                    <div class="field col-12 md:col-12 ">
                        <label>Name</label>
                        <pr-inputText v-model="title" type="text" :class="{ 'p-invalid': errors.title }"/>
                        <small class="p-error mb-2" id="text-error">{{ errors.title || '&nbsp;' }}</small>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label>Assignee</label>
                        <pr-dropDown v-model="assignee_uuid" :options="dropdownUsers" optionLabel="username" optionValue="username"/>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label>Due</label>
                        <pr-calendar :minDate="minDate" showIcon v-model="due_date" showTime hourFormat="12" dateFormat="mm/dd/yy" showButtonBar/>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label>Status</label>
                        <pr-dropDown v-model="status" :options="dropdownStatuses" optionLabel="name" optionValue="name"></pr-dropDown>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label>Priority</label>
                        <pr-dropDown v-model="priority" :options="dropdownPriorities" optionLabel="name" optionValue="name"></pr-dropDown>
                    </div>
                    <div class="field col-12 md:col-12">
                        <label>Description</label>
                        <pr-editor v-model="description" editorStyle="height: 25vh"/>
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
import { onMounted, ref, defineProps } from 'vue';
import { formatDatetime } from '@/utils/datetime'
import * as zod from "zod"
import { useField, useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';

const route = useRoute()
const router = useRouter()
const toast = useToast()

const props = defineProps(['isEdit'])

const task = ref({
    title: "",
    reporter_uuid: "",
    assignee_uuid: "",
    status: "",
    priority: "",
    created_at: "",
    due_date: "",
    description: "",
})
const dropdownStatuses = ref([
        {name: 'To do'},
        {name: 'In progress'},
        {name: 'Done'}
    ],
)
const dropdownPriorities = ref([
        {name: 'low'},
        {name: 'medium'},
        {name: 'high'}
    ],
)
let dropdownUsers = ref([])
const minDate = ref(new Date())

// const submitForm = {
//     title: "",
//     assignee_uuid: "",
//     status: "",
//     priority: "",
//     due_date: "",
//     description: "",
// }

const validationSchema = toTypedSchema(
    zod.object({
        title: zod.string().nonempty('This field is required'),
        assignee_uuid: zod.string().nonempty('This field is required'),
        status: zod.string().nonempty('This field is required'),
        priority: zod.string().nonempty('This field is required'),
        due_date: zod.string().nonempty('This field is required'),
        description: zod.string().nonempty('This field is required'),
    })
);

const { handleSubmit, errors } = useForm({
    validationSchema,
})

const { value: title } = useField('title')
const { value: assignee_uuid } = useField('assignee_uuid')
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
            const temptask = await getDetailTask(param)
            temptask.task.due_date = formatDatetime(temptask.task.due_date)
            temptask.task.created_at = formatDatetime(temptask.task.created_at)

            task.value = temptask.task

            title.value = task.value.title
            assignee_uuid.value = task.value.assignee_uuid
            } catch (error) {
                toast.add({ severity: 'error', summary: 'Error', detail: `${error.message}`, life: 3000 });
            }
    }
    const users = await getListUsers()

    dropdownUsers.value = users.items;
});

async function handleSubmitForm() {
    try {
        const taskForm = {
            ...task.value,
            due_date: new Date(task.value.due_date)
        }

        delete taskForm.created_at
        if (props.isEdit) {
            const task = await updateDetailTask(taskForm, route.params.uuid)
        } else {
            const reporter = getUser()
            const tempTask = {
                ...taskForm,
                reporter_uuid: reporter,
            }
            const task = await createTask(tempTask)
        }
        
        router.push({ path: "/task"})
    } catch(error) {
        toast.add({ severity: 'error', summary: 'Error', detail: `${error}`, life: 3000 });
    }
}

</script>

<script>
import TopAppBar from '@/components/AppTopBar.vue';
import { getUser } from '@/utils/auth';

    export default {
        name: "TaskDetail",
        components: {
            TopAppBar,
        }
    }
</script>