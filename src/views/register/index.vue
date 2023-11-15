<template>
    <div class="surface-0 flex align-self-center justify-content-center w-full h-full overflow-visible">
      <pr-toast/>
      <div class="p-4 shadow-2 border-round lg:w-4 ">
        <div class="text-center mb-7 mt-3">
          <img src="../../assets/logo.png" alt="Image" height="50" class="mb-3" />
          <div class="text-900 text-3xl mb-3">Welcome</div>
          <span class="text-600 line-height-3">Create your account today</span>
        </div>
        <div>
          <form @submit="onSubmit">
            <label class="flex align-content-start text-900 mb-2">Username</label>
            <pr-inputText v-model="username" :class="{ 'p-invalid': errors.username }" type="text" placeholder="Username" class="w-full" />
            <small class="p-error mb-2" id="text-error">{{ errors.username || '&nbsp;' }}</small>

            <label class="flex align-content-start text-900 mb-2">Email</label>
            <pr-inputText v-model="email" :class="{ 'p-invalid': errors.email }" type="text" placeholder="Email address" class="w-full" />
            <small class="p-error mb-2" id="text-error">{{ errors.email || '&nbsp;' }}</small>
            
            <label class="flex align-content-start text-900 mb-2">Password</label>
            <pr-inputText v-model="password" type="password" placeholder="Password" class="w-full" />
            <small class="p-error mb-2" id="text-error">{{ errors.password || '&nbsp;' }}</small>

            <label class="flex align-content-start text-900 mb-2">Confirm Password</label>
            <pr-inputText v-model="confirm_password" type="password" placeholder="Confirm Password" class="w-full" />
            <small class="p-error mb-2" id="text-error">{{ errors.confirm_password || '&nbsp;' }}</small>

            <pr-button type="submit" label="Register" class="w-full"></pr-button>
          </form>
        </div>
      </div>
    </div>
  </template>

<script setup>
import { register, loginUser } from "@/api/auth"
import { setToken } from "@/utils/auth"
// import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast"
import { useField, useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';

const router = useRouter()
const toast = useToast()

const registerForm = {
    username: '',
    email: '',
    password: '',
    confirm_password: ''
}

let loginForm = {
    username: '',
    password: '',
}

const validationSchema = toTypedSchema(
    zod.object({
    username: zod.string().nonempty('This field is required'),
    email: zod.string().email('This is not a valid email').nonempty('This field is required'),
    password: zod.string().nonempty('This field is required').min(6, { message: 'Too short' }),
    confirm_password: zod.string().nonempty('This field is required').min(6, { message: 'Too short' }),
    })
);

const { handleSubmit, errors } = useForm({
    validationSchema,
})

async function registerUser() {
    try {
        
    registerForm.username = username.value;
    registerForm.email = email.value;
    registerForm.password = password.value;
    registerForm.confirm_password = confirm_password.value;

    console.log(registerForm)
    await register(registerForm);

    loginForm.username = registerForm.username;
    loginForm.password = registerForm.password;

    console.log(loginForm);
    const data = await loginUser(loginForm);
    setToken(data.token);
    
    router.push({ path: "/dashboard" })
    } catch (error) {
        if (error.response) {
            toast.add({ severity: 'error', summary: 'Error', detail: `${error.response.data.message}`, life: 3000 });
        }
    }
}

const { value: username } = useField('username');
const { value: email } = useField('email');
const { value: password } = useField('password');
const { value: confirm_password } = useField('confirm_password');

const onSubmit = handleSubmit(() => {
    console.log('asdas')
    registerUser();
})


</script>

<script>
    export default {
        name: "register_form"
    }
</script>
