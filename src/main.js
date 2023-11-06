import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/soho-light/theme.css'
import 'primeflex/primeflex.css';
import router from './router'
import 'primeicons/primeicons.css'

import Button from "primevue/button"
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Message from 'primevue/message';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import MegaMenu from 'primevue/megamenu';
import Divider from 'primevue/divider';
import TabMenu from 'primevue/tabmenu';
import DataView from 'primevue/dataview';
import Card from 'primevue/card';

const app = createApp(App)

app.use(PrimeVue, { ripple: true })  
app.use(ToastService) 
app.component('pr-button', Button);
app.component('pr-inputText', InputText);
app.component('pr-password', Password);
app.component('pr-message', Message);
app.component('pr-toast', Toast);
app.component('pr-megaMenu', MegaMenu)
app.component('pr-divider', Divider)
app.component('pr-tabMenu', TabMenu)
app.component('pr-dataView', DataView)
app.component('pr-card', Card)

app.use(router)

app.mount('#app')