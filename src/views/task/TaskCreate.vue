<template>
    <Detail :isEdit="false" />
</template>
  
  <script>
  import Detail from './components/TaskDetail'
  
  export default {
    name: 'CreateTask',
    components: { Detail },
  }
  </script>
  
  