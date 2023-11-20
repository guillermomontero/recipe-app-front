<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from './store/auth';
import { useHomeStore } from './store/home';
import { useLocalStore } from './store/local';
import { useSpinnerStore } from './store/spinner';
import HeaderComponent from '@/components/layout/HeaderComponent.vue';
import MainComponent from '@/components/layout/MainComponent.vue';
import FooterComponent from './components/layout/FooterComponent.vue';
import BaseSpinner from './components/base/BaseSpinner.vue';

const authStore = useAuthStore();
const localStore = useLocalStore();
const homeStore = useHomeStore();
const spinnerStore = useSpinnerStore();

onMounted(() => {
  if (localStorage.getItem('token')) authStore.userLogged(localStorage.getItem('token') || '', Number(localStorage.getItem('tokenExpires')) || 0, localStorage.getItem('user') || '');
  if (localStorage.getItem('local')) localStore.setLanguage(localStorage.getItem('local') || 'es');
  if (localStorage.getItem('view')) homeStore.setView(localStorage.getItem('view') || 'grid');
});
</script>

<template>
  <HeaderComponent />
  <MainComponent />
  <FooterComponent />

  <BaseSpinner v-if="spinnerStore.isSpinnerOn" />
</template>
