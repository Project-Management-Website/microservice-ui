<template>
    <div class="login-container">
      <div class="login-card">
        <h1>Login</h1>
        <form @submit.prevent="login">
          <div class="p-field">
            <label for="username">Username</label>
            <pr-inputText v-model="username" id="username" />
          </div>
          <div class="p-field">
            <label for="password">Password</label>
            <pr-password v-model="password" id="password" />
          </div>
          <pr-button type="submit" label="Login" class="mybutton" />
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'login-form',
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      login() {
        // Handle login logic here
      },
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .login-card {
    width: 300px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  @import 'primeflex/primeflex.css';
  .mybutton {
    @include styleclass('bg-blue-500 hover:bg-blue-600 border-round transition-colors transition-duration-150 p-3 border-none');
}
  </style>
  