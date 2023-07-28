import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';
import './assets/scss/main.scss';

const pinia = createPinia();

createApp(App).use(pinia).use(router).mount('#app');

