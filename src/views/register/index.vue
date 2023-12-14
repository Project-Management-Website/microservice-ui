<template>
  <div class="surface-0 flex align-self-center justify-content-center w-full h-full overflow-visible mt-3">
    <pr-toast/>
    <div class="p-4 shadow-2 border-round lg:w-4 ">
      <div class="text-center mb-7 mt-3">
        <img src="../../assets/logo.png" alt="Image" height="50" class="mb-3" />
        <div class="text-900 text-3xl mb-3">Welcome</div>
        <span class="text-600 line-height-3">Create your account today</span>
      </div>
      <div>
        <form @submit="onSubmit">
          <div class="p-fluid formgrid grid">
            <div class="field col-12 md:col-12">
              <label class="flex align-content-start text-900 mb-3">Username</label>
              <ValInputText name="username" placeholder="Username"></ValInputText>
            </div>

            <div class="field col-12 md:col-12">
              <label class="flex align-content-start text-900 mb-3">Email</label>
              <ValInputText name="email" placeholder="Email address"></ValInputText>
            </div>
            
            <div class="field col-12 md:col-12">
              <label class="flex align-content-start text-900 mb-3">Password</label>
              <ValInputText name="password" type="password" placeholder="Password"></ValInputText>
            </div>

            <div class="field col-12 md:col-12">
              <label class="flex align-content-start text-900 mb-3">Confirm Password</label>
              <ValInputText name="confirm_password" type="password" placeholder="Confirm password"></ValInputText>
            </div>
          </div>
          <pr-button type="submit" label="Register" class="mt-4 w-full"></pr-button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { register, loginUser } from "@/api/auth"
import { setToken } from "@/utils/auth"
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast"
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';

import ValInputText from "@/components/ValidateForm/ValInputText.vue";

const router = useRouter()
const toast = useToast()

const validationSchema = toTypedSchema(
    zod.object({
    username: zod.string().nonempty('This field is required'),
    email: zod.string().email('This is not a valid email').nonempty('This field is required'),
    password: zod.string().nonempty('This field is required').min(6, { message: 'Too short' }),
    confirm_password: zod.string().nonempty('This field is required').min(6, { message: 'Too short' }),
    })
);

const { handleSubmit, values } = useForm({
    validationSchema,
})

const onSubmit = handleSubmit(async() => {
  try {
    const registerForm = {
      ...values,
    }
    await register(registerForm);

    const loginForm = {
      username: values.username,
      password: values.password,
    }

    const data = await loginUser(loginForm);
    setToken(data.token);
    
    router.push({ path: "/dashboard" })
  } catch (error) {
      if (!Array.isArray(error.response.data)) {
          toast.add({ severity: 'error', summary: 'Error', detail: `${error.response.data.message}`, life: 3000 });
      } else {
          toast.add({ severity: 'error', summary: 'Error', detail: `${error.response.data[0].message}`, life: 3000 });
      }
  }
})
</script>

<script>
    export default {
        name: "RegisterForm",
    }
</script>