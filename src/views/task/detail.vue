 <template>
    <div class="flex justify-content-center">
        <div class="card shadow-2 indigo-300 p-4 border-round m-5">
            <div class="p-fluid formgrid grid">
                <div class="field col-12 md:col-12 ">
                    <label>Name</label>
                    <pr-inputText v-model="task.title" type="text"/>
                </div>
                <div class="field col-12 md:col-6 ">
                    <label>Created at</label>
                    <pr-inputText v-model="task.created_at" type="text" disabled/>
                </div>
                <div class="field col-12 md:col-6">
                    <label>Due</label>
                    <pr-inputText v-model="task.due_date" type="text"/>
                </div>
                <div class="field col-12">
                    <label>Description</label>
                    <pr-textArea v-model="task.description" rows="4"/>
                </div>
                <div class="field col-12 md:col-6">
                    <label>Assignee</label>
                    <pr-inputText v-model="task.assignee_uuid" type="text" />
                </div>
                <div class="field col-12 md:col-3">
                    <label>Status</label>
                    <pr-dropDown v-model="task.status" :options="dropdownItems" optionLabel="name"></pr-dropDown>
                </div>
                <div class="field col-12 md:col-3">
                    <label>Priority</label>
                    <pr-inputText v-model="task.priority" type="text"/>
                </div>
                <div class="field md:col-1 col-offset-11">
                    <pr-button @click="updateTask" label="submit"></pr-button>
                </div>
			</div>
		</div>
    </div>
</template>

<script setup>
import { getDetailTask, updateDetailTask } from '@/api/task'
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

const route = useRoute()
const router = useRouter()
let task = ref({})
let dropdownItems = ref([
					{name: 'To do', code: 'TD'},
					{name: 'In progress', code: 'IP'},
					{name: 'Done', code: 'D'}
				],
)
onMounted(async () => {
    try {
        const param = route.params.uuid
        const temptask = await getDetailTask(param)
        task.value = temptask.task
    } catch (err) {
        console.log(err)
    }
});

async function updateTask() {
    try {
        const updatedTask = await updateDetailTask(task.value, route.params.uuid)

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