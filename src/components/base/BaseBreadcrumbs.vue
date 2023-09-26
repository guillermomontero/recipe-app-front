<script setup lang="ts">
import { ref } from 'vue';

const data = ref([
  { text: 'Item 1', active: false, route: '/' },
  { text: 'Item 2', active: false, route: '/' },
  { text: 'Item 3', active: true, route: '/' },
]);
</script>

<template>
  <nav class="base-breadcrumbs">
    <a v-for="(item, index) in data" :key="index" class="breadcrumbs__item" :class="{ 'is-active': item.active }">{{ item.text }}</a>
  </nav>
</template>