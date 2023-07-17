<script setup lang="ts">
import HeaderComponent from './components/layout/HeaderComponent.vue';
import MainComponent from './components/layout/MainComponent.vue';
import FooterComponent from './components/layout/FooterComponent.vue';
import { onMounted } from 'vue';
import { useAuthStore } from './store/auth';

const store = useAuthStore();

onMounted(() => {
  if (localStorage.getItem('token')) store.userLogged(localStorage.getItem('token'), localStorage.getItem('tokenExpires'), localStorage.getItem('user'));
})
</script>

<template>
  <HeaderComponent />
  <MainComponent />
  <FooterComponent />
</template>