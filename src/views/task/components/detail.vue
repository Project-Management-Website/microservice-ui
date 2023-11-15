 <template>
    <div class="flex justify-content-center">
        <div class="card shadow-2 indigo-300 p-4 border-round m-6">
            <div class="p-fluid formgrid grid">
                <div class="field col-12 md:col-12 ">
                    <label>Name</label>
                    <pr-inputText v-model="task.title" type="text"/>
                </div>
                <div class="field md:col-6">
                    <label>Assignee</label>
                    <pr-inputText v-model="task.assignee_uuid" type="text" />
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
                    <pr-textArea v-model="task.description" rows="6"/>
                </div>

                <div class="field col-12 md:col-3">
                    <label>Status</label>
                    <pr-dropDown v-model="task.status" :options="dropdownStatuses" optionLabel="name" optionValue="name"></pr-dropDown>
                </div>
                <div class="field col-12 md:col-3">
                    <label>Priority</label>
                    <pr-dropDown v-model="task.priority" :options="dropdownPriorities" optionLabel="name" optionValue="name"></pr-dropDown>
                </div>
                <div class="field md:col-1 col-offset-11">
                    <pr-button @click="onSubmit" label="submit"></pr-button>
                </div>
			</div>
		</div>
        <div class="card shadow-2 indigo-300 p-4 border-round m-6 md:w-5">
            
        </div>
    </div>
</template>

<script setup>
import { getDetailTask, updateDetailTask, createTask } from '@/api/task'
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
});

async function onSubmit() {
    try {
        const taskForm = {
            ...task.value,
            status: task.value.status.name,
            due_date: new Date(task.value.due_date)
        }
        if (props.isEdit) {
            console.log(props.isEdit)
            const task = await updateDetailTask(taskForm, route.params.uuid)
        } else {
            console.log(props.isEdit)
            const task = await createTask(taskForm)
        }
        
        router.push({ name: "Task_List"})
    } catch(err) {
        console.log(err)
    }
}

</script>

<script>
    export default {
        name: "task_detail"
    }
</script>