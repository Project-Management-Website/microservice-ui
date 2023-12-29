import { getListComments } from "@/api/task";
import { socket } from "@/socket";
import { useUserStore } from "@/stores/UserStore";
import { useToast } from "primevue/usetoast";
import { ref } from "vue";

export function useTaskComment(taskId) {
    const comments = ref([])
    const newCommentText = ref()

    const toast = useToast()
    const userStore = useUserStore()

    async function fetchComment (query) {
        try {
            const result = await getListComments(query)
            comments.value = result.data.items;
        } catch (err) {
            toast.add({ severity: 'error', summary: 'Error', detail: `${err.message}`, life: 3000 });
        }
    }

    function postComment() {
        const newCommentData = {
            sender: {
                uuid: userStore.userInfo.user_uuid,
                username: userStore.userInfo.username
            },
            content: newCommentText.value,
            task: taskId,
        }
        socket.emit("comment:post", newCommentData)
        newCommentText.value = ""
    }

    return {
        comments,
        newCommentText,
        fetchComment,
        postComment
    }
}