import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

import { createPinia } from 'pinia'
createApp(App).use(createPinia()).mount('#app')
