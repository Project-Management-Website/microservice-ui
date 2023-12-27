import { getListComments } from "@/api/task";
import { useToast } from "primevue/usetoast";
import { ref } from "vue";

export function useTaskComment() {
    const comments = ref([])

    const toast = useToast()

    async function fetchComment (query) {
        try {
            const result = await getListComments(query)
            comments.value = result.comments;
        } catch (err) {
            toast.add({ severity: 'error', summary: 'Error', detail: `${err.message}`, life: 3000 });
        }
    }

    return {
        comments,
        fetchComment
    }
}