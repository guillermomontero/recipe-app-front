import { createApp } from 'vue';
import App from './App.vue';
import i18n from './config/locale';
import { createPinia } from 'pinia';
import router from './router';
import './assets/scss/main.scss';

const pinia = createPinia();

createApp(App).use(i18n).use(pinia).use(router).mount('#app');

