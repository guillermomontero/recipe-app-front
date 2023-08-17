<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute, LocationQueryValue } from 'vue-router';
import { apiGetRecipe } from '../../config/api/recipe';

const route = useRoute();
const recipeId = route.query.id;

const getRecipe = async (id: LocationQueryValue = '') => {
  const response = await apiGetRecipe(id);
  console.log(response);
}

onMounted(async () => {
  getRecipe(recipeId);
}); 
</script>

<template>
  <h1>Recipe view</h1>
</template>