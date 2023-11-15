<template>
    <Detail :isEdit="false" />
</template>
  
  <script>
  import Detail from './components/detail'
  
  export default {
    name: 'create_form',
    components: { Detail },
  }
  </script>
  
  