<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from './store/auth';
import { useSpinnerStore } from './store/spinner';
import HeaderComponent from './components/layout/HeaderComponent.vue';
import MainComponent from './components/layout/MainComponent.vue';
import FooterComponent from './components/layout/FooterComponent.vue';
import BaseSpinner from './components/base/BaseSpinner.vue';

const store = useAuthStore();
const spinner = useSpinnerStore();

onMounted(() => {
  if (localStorage.getItem('token')) store.userLogged(localStorage.getItem('token') || '', Number(localStorage.getItem('tokenExpires')) || 0, localStorage.getItem('user') || '');
});
</script>

<template>
  <HeaderComponent />
  <MainComponent />
  <FooterComponent />

  <BaseSpinner v-if="spinner.isSpinnerOn" />
</template>
