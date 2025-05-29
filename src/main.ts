import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css';
import './style.css'
import { createPinia } from 'pinia';

import App from './App.vue'

const app = createApp(App)
const pinia = createPinia();

app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})
app.use(pinia);
app.mount('#app')
