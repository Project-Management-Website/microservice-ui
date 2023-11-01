import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/lara-light-teal/theme.css'
import 'primeflex/primeflex.css';
import router from './router'

import Button from "primevue/button"
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';

const app = createApp(App)

app.use(PrimeVue)
app.component('pr-button', Button);
app.component('pr-inputText', InputText);
app.component('pr-password', Password);

app.use(router)

app.mount('#app')