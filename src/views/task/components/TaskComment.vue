<script setup>
import { socket } from '@/socket';
import { onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { useTaskComment } from '@/composable/task/useTaskComment'

const route = useRoute()
const taskId = route.params.uuid
const {
    comments,
    newCommentText,
    fetchComment,
    postComment
} = useTaskComment(taskId)

onMounted(async () => {
    console.log(taskId)
    socket.emit("comment:enter", taskId)
    socket.on("comment:send", (data) => {
        comments.value.push(data);
    })

    const query = {
        task: taskId,
    }
    await fetchComment(query)
})

onUnmounted(() => {
    socket.emit("comment:leave", taskId)
})
</script>

<template>
    <pr-scrollPanel lastScrollTop="10" style="width: 100%; height: 42rem">
        <div class="w-full mx-2" v-for="(comment, index) in comments" :key="index">
            <p>
                <strong class="flex mb-2">{{ comment.sender.username }}</strong>
                {{ comment.content }}
            </p>
        </div>
    </pr-scrollPanel>
    <div class="w-full mx-2">
        <pr-inputText @keydown.enter="postComment" class="w-10" v-model="newCommentText" placeholder="Type your comment..." />
        <pr-button class="ml-3" @click="postComment" icon="pi pi-send" severity="info" rounded></pr-button>
    </div>
</template>