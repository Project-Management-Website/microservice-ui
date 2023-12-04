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
                        <pr-dropDown v-model="assignee_uuid" :class="{ 'p-invalid': errors.assignee_uuid }" :options="dropdownUsers" optionLabel="username" optionValue="uuid"/>
                        <small class="p-error mb-2" id="text-error">{{ errors.assignee_uuid || '&nbsp;' }}</small>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label>Due</label>
                        <pr-calendar :minDate="minDate" :class="{ 'p-invalid': errors.due_date }" showIcon v-model="due_date" showTime hourFormat="12" dateFormat="mm/dd/yy" showButtonBar/>
                        <small class="p-error mb-2" id="text-error">{{ errors.due_date || '&nbsp;' }}</small>
                    </div>
                    <div v-if="isEdit" class="field col-12 md:col-6">
                        <label>Status</label>
                        <pr-dropDown v-model="status" :class="{ 'p-invalid': errors.status }" :options="dropdownStatuses" optionLabel="name" optionValue="name"></pr-dropDown>
                        <small class="p-error mb-2" id="text-error">{{ errors.status || '&nbsp;' }}</small>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label>Priority</label>
                        <pr-dropDown v-model="priority" :class="{ 'p-invalid': errors.priority }" :options="dropdownPriorities" optionLabel="name" optionValue="name"></pr-dropDown>
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


const route = useRoute()
const router = useRouter()
const toast = useToast()

const props = defineProps(['isEdit'])

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
const dropdownUsers = ref([])
const minDate = ref(new Date())

const validationSchema = toTypedSchema(
    zod.object({
        title: zod.string().nonempty('This field is required'),
        assignee_uuid: zod.string().nonempty('This field is required'),
        status: zod.string().optional(),
        priority: zod.string().nonempty('This field is required'),
        due_date: zod.date().or(zod.string()),
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
    console.log('sd')
      handleSubmitForm();
})

onMounted(async () => {
    if (props.isEdit) {
        try {
            const param = route.params.uuid
            const result = await getDetailTask(param)

            title.value = result.task.title
            assignee_uuid.value = result.task.assignee_uuid
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
        const assignee = dropdownUsers.value.find(({ uuid }) => uuid === assignee_uuid.value)

        const taskForm = {
            title: title.value,
            assignee: {
                uuid: assignee.uuid,
                username: assignee.username,
            },
            status: status.value,
            priority: priority.value,
            description: description.value,
            due_date: new Date(due_date.value),
            reporter: {
                uuid: getUserUuid(),
                username: getUser(),
            }
        }
        console.log(taskForm)

        if (props.isEdit) {
            const task = await updateDetailTask(taskForm, route.params.uuid)
        } else {
            const tempTask = {
                ...taskForm,
                status: 'To do',
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

    export default {
        name: "TaskDetail",
        components: {
            TopAppBar,
        }
    }
</script>