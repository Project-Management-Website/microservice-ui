 <template>
    <div class="flex justify-content-center mt-8">
        <div class="p-4 shadow-2 border-round lg:w-6 ">
            <label class="field grid font-bold text-4xl capitalize">sdada{{ name }}</label>
            <label class="field grid">{{ task.created_at }}</label>
            <label class="field grid" >Due date: {{ task.due_date }}</label>
            <label class="field grid">Assignee: {{ task.assignee }}</label>
            <label class="field grid">Status: {{ task.status }}</label>
            <label class="field grid">Priority: {{ task.priority }}</label>
            <textArea class="field grid" v-model="task.description"></textArea>
        </div>
    </div>
</template>

<script setup>
import { getDetailTask } from '@/api/task'
//import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

let task = ref({
    description: "",
    name: "",
    status: "",
})

onMounted(async () => {
    try {
        const temptask = await getDetailTask("bac9aeac-24e1-4fa9-9bae-d09df842ecb7")
        task = temptask.user
        console.log(task)
    } catch (err) {
        console.log(err)
    }
});

</script>

<script>
    export default {
        name: "task_detail"
    }
</script>