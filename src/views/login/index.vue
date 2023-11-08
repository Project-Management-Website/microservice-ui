<template>
  <div class="surface-0 flex align-self-center justify-content-center w-full h-full overflow-visible">
    <pr-toast/>
    <div class="p-4 shadow-2 border-round lg:w-4 ">
      <div class="text-center mb-7 mt-3">
        <img src="../../assets/logo.png" alt="Image" height="50" class="mb-3" />
        <div class="text-900 text-3xl mb-3">Welcome Back</div>
        <span class="text-600 line-height-3">Don't have an account?</span>
        <a class="no-underline ml-2 text-blue-500 cursor-pointer">Create today!</a>
      </div>
      <div>
        <form @submit="onSubmit">
          <label class="flex align-content-start text-900 mb-2">Username</label>
          <pr-inputText v-model="username" :class="{ 'p-invalid': errors.username }" type="text" placeholder="Email address" class="w-full" />
          <small class="p-error mb-2" id="text-error">{{ errors.username || '&nbsp;' }}</small>
          
          <label class="flex align-content-start text-900 mb-2">Password</label>
          <pr-inputText v-model="password" type="password" placeholder="Password" class="w-full" />
          <small class="p-error mb-2" id="text-error">{{ errors.password || '&nbsp;' }}</small>

          <div class="flex align-items-center justify-content-between mb-6">
            <a class="no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot password?</a>
          </div>

          <pr-button type="submit" label="Sign In" class="w-full"></pr-button>
        </form>
      </div>
    </div>
  </div>
</template>
  
<script>
import { loginUser } from "@/api/auth"
import { setToken } from "@/utils/auth"
// import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast"
import { useField, useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';

export default {
  name: 'login-form',
  setup() {
    const router = useRouter()
    const toast = useToast()

    const loginForm = {
        username: '',
        password: '',
    }

    const validationSchema = toTypedSchema(
      zod.object({
        username: zod.string().nonempty('This field is required'),
        password: zod.string().nonempty('This field is required').min(6, { message: 'Too short' }),
      })
    );

    const { handleSubmit, errors } = useForm({
      validationSchema,
    })

    async function handleLogin() {
      try {
        loginForm.username = username.value;
        loginForm.password = password.value;
        console.log(loginForm)
        const data = await loginUser(loginForm);
        setToken(data.token);
        console.log(data)

        router.push({ path: "/dashboard" })
      } catch (error) {
          if (error.response) {
            toast.add({ severity: 'error', summary: 'Error', detail: `${error.response.data.message}`, life: 3000 });
          }
      }
    }

    const { value: username } = useField('username');
    const { value: password } = useField('password');

    const onSubmit = handleSubmit(() => {
      handleLogin();
    })
    return {
      onSubmit,
      errors,
      username,
      password
    }
  },
  // data() {
  //   return {
  //     loginForm: {
  //       username: '',
  //       password: '',
  //     },
  //   };
  // },
  // methods: {
  //   async handleLogin() {
  //   try {
  //     const data = await loginUser(this.loginForm);
  //     setToken(data.token);
  //     console.log(data)

  //     this.$router.push({ path: "/dashboard" })
  //   } catch (error) {
  //       if (error.response) {
  //         this.$toast.add({ severity: 'error', summary: 'Error', detail: `${error.response.data.message}`, life: 3000 });
  //       }
  //   }},
  // }
};
</script>
    
    