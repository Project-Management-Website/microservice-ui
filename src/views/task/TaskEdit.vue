<template>
    <Detail :isEdit="true" />
</template>
  
  <script>
  import Detail from './components/TaskDetail'
  
  export default {
    name: 'EditForm',
    components: { Detail },
  }
  </script>