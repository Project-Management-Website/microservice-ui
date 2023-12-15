<template>
  <div class="surface-0 flex align-self-center justify-content-center w-full h-full overflow-visible">
    <pr-toast/>
    <div class="p-4 shadow-2 border-round lg:w-4 ">
      <div class="text-center mb-7 mt-3">
        <img src="../../assets/logo.png" alt="Image" height="50" class="mb-3" />
        <div class="text-900 text-3xl mb-3">Welcome Back</div>
        <span class="text-600 line-height-3">Don't have an account?</span>
        <router-link to="/register" class="no-underline ml-2 text-blue-600 cursor-pointer">
          Create today!
        </router-link>
      </div>
      <div>
        <form @submit="onSubmit">
          <div class="p-fluid formgrid grid">
            <div class="field col-12 md:col-12 ">
              <label class="text-900 mb-3">Username</label>
              <ValInputText name="username" type="text" placeholder="username"></ValInputText>
            </div>
            <div class="field col-12 md:col-12 ">
              <label class="text-900 mb-3">Password</label>
              <ValInputText name="password" type="password" placeholder="password"></ValInputText>
            </div>
            <!-- <div class="flex align-items-center mb-6">
              <a class="no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot password?</a>
            </div> -->
          </div>
          <pr-button type="submit" label="Sign In" class="w-full"></pr-button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { loginUser } from "@/api/auth"
import { setToken } from "@/utils/auth"
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast"
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';

import ValInputText from "@/components/ValidateForm/ValInputText.vue";

const Router = useRouter()
const toast = useToast()

const validationSchema = toTypedSchema(
  zod.object({
    username: zod.string().nonempty('This field is required'),
    password: zod.string().nonempty('This field is required').min(6, { message: 'Too short' }),
  })
);

const { handleSubmit, values } = useForm({
  validationSchema,
})

const onSubmit = handleSubmit(async () => {
  try {
    const loginForm = {
      username: values.username,
      password: values.password,
    }

    const data = await loginUser(loginForm);

    setToken(data.token);

    Router.push({ path: "/dashboard" })
  } catch (error) {
      if (error.response) {
        toast.add({ severity: 'error', summary: 'Error', detail: `${error.response.data.message}`, life: 3000 });
      }
  }
})
</script>