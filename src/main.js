import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/soho-light/theme.css'
import 'primeflex/primeflex.css';
import router from './router'
import 'primeicons/primeicons.css'
import 'nprogress/nprogress.css'

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
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Row from 'primevue/row';
import Tag from 'primevue/tag';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import Textarea from 'primevue/textarea';
import Dropdown from 'primevue/dropdown';
import ProgressSpinner from 'primevue/progressspinner';
import Calendar from 'primevue/calendar';
import Menu from 'primevue/menu';
import BadgeDirective from 'primevue/badgedirective';
import Editor from 'primevue/editor';
import Paginator from 'primevue/paginator';
import { createPinia } from 'pinia';
import ScrollPanel from 'primevue/scrollpanel';

const pinia = createPinia()
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
app.component('pr-dataTable', DataTable)
app.component('pr-column', Column)
app.component('pr-row', Row)
app.component('pr-tag', Tag)
app.component('pr-splitter', Splitter)
app.component('pr-splitterPanel', SplitterPanel)
app.component('pr-textArea', Textarea)
app.component('pr-dropDown', Dropdown)
app.component('pr-progSpinner', ProgressSpinner)
app.component('pr-calendar', Calendar)
app.component('pr-menu', Menu)
app.component('pr-editor', Editor)
app.component('pr-paginator', Paginator)
app.component('pr-scrollPanel', ScrollPanel)

app.directive('badge', BadgeDirective);

app.use(router)
app.use(pinia)

app.mount('#app')