<script setup>
import TaskDetail from './components/TaskDetail.vue';

</script>

<template>
    <div class="flex justify-content-center">
      <div class="card shadow-2 indigo-300 p-4 border-round m-6 w-6">
        <TaskDetail :isEdit="false" />
      </div>
    </div>
</template>