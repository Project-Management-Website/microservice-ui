<script setup>
import TaskDetail from './components/TaskDetail.vue';

</script>

<template>
  <div class="flex justify-content-center">
    <div class="card shadow-2 indigo-300 p-4 border-round m-3 w-6">
      <TaskDetail :isEdit="true" />
    </div>
    <div class="card shadow-2 indigo-300 p-4 border-round m-3 w-3">
            
    </div>
  </div>
</template>
