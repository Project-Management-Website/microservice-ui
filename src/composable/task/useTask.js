import { getListTask } from '@/api/task';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from "primevue/usetoast"
import { formatDatetime } from "@/utils/datetime"
import CONSTANT from '@/constant';
import { useUserStore } from '@/stores/UserStore';

export function useTask() {
    const router = useRouter();
    const toast = useToast();
    const userStore = useUserStore()

    const tasks = ref([]);
    const selectedTask = ref({
        title: "",
        reporter: {
            uuid: "",
            username: ""
        },
        assignee: {
            uuid: "",
            username: ""
        },
        status: "",
        priority: "",
        created_at: "",
        due_date: "",
        description: "",
    })
    const selectedStatus = ref("");
    const selectedPrio = ref("");
    const search = ref()
    const loading = ref(true)
    const pagination = ref({
        page: 1,
        limit: 10,
    })
    const totalRecords = ref(1)

    const showCreate = computed(() => {
        if(userStore.userInfo.user_roles === CONSTANT.LEADER_ROLE) {
            return true;
        }
        return false
    })
    
    const selectedTaskInfo = computed(() => {
        return {
            ...selectedTask.value,
            reporter: selectedTask.value.reporter.username,
            assignee: selectedTask.value.assignee.username
        }
    })
    
    async function handlePageChange(data) {
        pagination.value.page = data.page + 1;
        await fetchList()
    }
    
    function showTaskInfo(data) {
        selectedTask.value = data
    }
    
    async function fetchList(query) {
        try {
            loading.value = true
    
            query = {
                ...query,
                ...pagination.value
            }
            const tempTasks = await getListTask(query)
    
            tempTasks.data.items.forEach(item => {
                item.created_at = formatDatetime(item.created_at)
                item.due_date = formatDatetime(item.due_date)
            })
            
            tasks.value = tempTasks.data.items
            totalRecords.value = tempTasks.data.numTask;
        } catch (error) {
            toast.add({ severity: 'error', summary: 'Error', detail: `${error}`, life: 3000 });
        } finally {
            loading.value = false
        } 
    }
    
    function createTask () {
        router.push({ name: "Create_Task" })
    }
    
    async function handleSearch() {
        const query = {
            search: search.value,
        }
        await fetchList(query)
    }
    
    async function handleFilter() {
        const query = {
            status: selectedStatus.value || {},
            priority: selectedPrio.value || {}
        }
        await fetchList(query)
    }
    
    async function clearFilter() {
        loading.value = true
    
        try {
            selectedPrio.value = ""
            selectedStatus.value = ""
            search.value = ""
    
            await fetchList()
        } catch (error) {
            toast.add({ severity: 'error', summary: 'Error', detail: `${error}`, life: 3000 });
        } finally {
            loading.value = false
        }
    }

    function updateLoading(bool) {
        loading.value = bool
    }

    return {
        tasks,
        search,
        selectedTask,
        selectedStatus,
        selectedPrio,
        loading,
        pagination,
        totalRecords,
        showCreate,
        selectedTaskInfo,
        handlePageChange,
        showTaskInfo,
        createTask,
        handleSearch,
        handleFilter,
        clearFilter,
        fetchList,
        updateLoading
    }
}