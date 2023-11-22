 <template>
    <TopAppBar/>
    <div class="flex justify-content-center">
        <div class="card shadow-2 indigo-300 p-4 border-round m-6">
            <div class="p-fluid formgrid grid">
                <div class="field col-12 md:col-12 ">
                    <label>Name</label>
                    <pr-inputText v-model="task.title" type="text"/>
                </div>
                <div class="field md:col-6">
                    <label>Assignee</label>
                    <pr-dropDown v-model="task.assignee_uuid" :options="dropdownUsers" optionLabel="username" optionValue="username"/>
                </div>
                <div class="field md:col-6">

                </div>
                <div class="field col-12 md:col-3 ">
                    <label>Created at</label>
                    <pr-calendar v-model="task.created_at" type="text" disabled/>
                </div>
                <div class="field col-12 md:col-3">
                    <label>Due</label>
                    <pr-calendar showIcon v-model="task.due_date" dateFormat="dd/mm/yy" showButtonBar/>
                </div>
                <div class="field col-12 md:col-12">
                    <label>Description</label>
                    <pr-editor v-model="task.description" editorStyle="height: 20vh"/>
                </div>

                <div class="field col-12 md:col-3">
                    <label>Status</label>
                    <pr-dropDown v-model="task.status" :options="dropdownStatuses" optionLabel="name" optionValue="name"></pr-dropDown>
                </div>
                <div class="field col-12 md:col-3">
                    <label>Priority</label>
                    <pr-dropDown v-model="task.priority" :options="dropdownPriorities" optionLabel="name" optionValue="name"></pr-dropDown>
                </div>
                <div class="field md:col-2 col-offset-10">
                    <pr-button @click="onSubmit" label="Submit"></pr-button>
                </div>
			</div>
		</div>
        <div class="card shadow-2 indigo-300 p-4 border-round m-6 md:w-5">
            
        </div>
    </div>
</template>

<script setup>
import { getDetailTask, updateDetailTask, createTask } from '@/api/task'
import { getListUsers } from '@/api/auth'
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref, defineProps } from 'vue';

const route = useRoute()
const router = useRouter()

const props = defineProps(['isEdit'])


let task = ref({})
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

onMounted(async () => {
    if (props.isEdit) {
        try {
        const param = route.params.uuid
        const temptask = await getDetailTask(param)
        task.value = temptask.task
        } catch (err) {
            console.log(err)
        }
    }
    const users = await getListUsers()
    console.log(router)
    dropdownUsers.value = users.items;
});

async function onSubmit() {
    try {
        const taskForm = {
            ...task.value,
            due_date: new Date(task.value.due_date)
        }
        if (props.isEdit) {
            const task = await updateDetailTask(taskForm, route.params.uuid)
        } else {
            const task = await createTask(taskForm)
        }
        
        router.push({ name: "Task_List"})
    } catch(err) {
        console.log(err)
    }
}

</script>

<script>
import TopAppBar from '@/components/TopBar.vue';

    export default {
        name: "task_detail",
        components: {
            TopAppBar,
        }
    }
</script>