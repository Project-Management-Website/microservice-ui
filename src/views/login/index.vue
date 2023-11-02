<template>
  <div class="flex justify-content-center w-full h-full">
    <div class="p-4 shadow-2 border-round lg:w-4">
      <div class="text-center mb-5">
        <img src="../../assets/logo.png" alt="Image" height="50" class="mb-3" />
        <div class="text-900 text-3xl mb-3">Welcome Back</div>
        <span class="text-600 line-height-3">Don't have an account?</span>
        <a class="no-underline ml-2 text-blue-500 cursor-pointer">Create today!</a>
      </div>
      <div>
        <label class="flex align-content-start text-900 mb-2">Email</label>
        <pr-inputText ref="username" v-model="loginForm.username" type="text" placeholder="Email address" class="w-full mb-3" />
        
        <label class="flex align-content-start text-900 mb-2">Password</label>
        <pr-inputText ref="password" v-model="loginForm.password" type="password" placeholder="Password" class="w-full mb-3" />

        <div class="flex align-items-center justify-content-between mb-6">
          <a class="no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot password?</a>
        </div>

        <pr-button @click="handleLogin" label="Sign In" class="w-full"></pr-button>
      </div>
    </div>
  </div>
</template>
  
  <script>
  import { loginUser } from "@/api/auth"

  export default {
    name: 'login-form',
    data() {
      return {
        loginForm: {
          username: '',
          password: '',
        },
      };
    },
    methods: {
      async handleLogin() {
        try {
        await loginUser(this.loginForm)

        this.$router.push({ path: '/dashboard' })
      } catch (error) {
        console.log(error)
      }},
    }
  };
  </script>
  
  