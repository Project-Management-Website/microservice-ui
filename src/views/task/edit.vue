<template>
    <Detail :isEdit="true" />
</template>
  
  <script>
  import Detail from './components/detail'
  
  export default {
    name: 'edit_form',
    components: { Detail },
  }
  </script>
  
  