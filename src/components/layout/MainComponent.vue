<script setup lang="ts">
import { useAuthStore } from '../../store/auth';

const store = useAuthStore();
</script>
<template>
  <main class="main" :class="{ 'main__auth': !store.logged }">
    <router-view />
  </main>
</template>