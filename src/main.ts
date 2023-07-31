import { createApp } from 'vue';
import App from './App.vue';
import { i18n } from './plugins/i18n';
import { createPinia } from 'pinia';
import router from './router';
import './assets/scss/main.scss';

const pinia = createPinia();

createApp(App).use(i18n).use(pinia).use(router).mount('#app');

