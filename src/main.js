import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/mira/theme.css'
import 'primeflex/primeflex.css';
import router from './router'

import Button from "primevue/button"
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Message from 'primevue/message';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';

const app = createApp(App)

app.use(PrimeVue, { ripple: true })  
app.use(ToastService) 
app.component('pr-button', Button);
app.component('pr-inputText', InputText);
app.component('pr-password', Password);
app.component('pr-message', Message);
app.component('pr-toast', Toast)

app.use(router)

app.mount('#app')