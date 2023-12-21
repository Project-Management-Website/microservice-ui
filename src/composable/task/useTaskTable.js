import { removeTask } from '@/api/task';
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast';
import { useTask } from './useTask';

export function useTaskTable(emit) {
    const router = useRouter()
    const toast = useToast()
    const { fetchList } = useTask()

    const getSeverity = (priority) => {
        switch (priority) {
            case 'low':
                return 'success';

            case 'medium':
                return 'warning';

            case 'high':
                return 'danger';

            default:
                return null;
        }
    };

    const onRowDoubleClick = (event) => {
        const uuid = event.data.uuid
        router.push({ path: "/task/" + uuid })
    }

    const onRowClick = (event) => {
        emit('selectTask', event.data)
    }

    async function deleteRow (data) {
        emit('updateLoading', true)
        try {
            await removeTask(data.uuid)
            await fetchList()
        } catch (error) {
            toast.add({ severity: 'error', summary: 'Error', detail: `${error.message}`, life: 3000 });
        } finally {
            emit('updateLoading', false)
        }
    }

    return {
        getSeverity,
        onRowDoubleClick,
        onRowClick,
        deleteRow,
    }
}