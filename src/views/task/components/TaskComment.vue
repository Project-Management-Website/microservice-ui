<script setup>
import { socket } from '@/socket';
import { onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { useTaskComment } from '@/composable/task/useTaskComment'

const route = useRoute()
const {
    comments,
    fetchComment
} = useTaskComment()

onMounted(async () => {
    socket.emit("comment:enter", route.params)
    const query = {
        taskId: route.params.uuid
    }
    await fetchComment(query)
})

onUnmounted(() => {
    socket.emit("comment:leave", route.params)
})
</script>

<template>
    <div class="comment-container">
        <div v-for="(comment, index) in comments" :key="index" class="comment">
        <p>
            <strong>{{ comment.sender.username }}:</strong> {{ comments.content }}
        </p>
        </div>

        <!-- Input for New Comment -->
        <div class="new-comment">
        <input v-model="newCommentText" placeholder="Type your comment..." />
        <button @click="addComment">Add Comment</button>
        </div>
    </div>
</template>
<style scoped>
.comment-container {
width: 300px;
margin: auto;
}

.comment {
margin-bottom: 10px;
padding: 8px;
background-color: #f0f0f0;
}

.new-comment {
margin-top: 20px;
display: flex;
}

.new-comment input {
flex: 1;
padding: 8px;
}

.new-comment button {
background-color: #3498db;
color: #fff;
border: none;
padding: 8px;
cursor: pointer;
}
</style>
