<script setup lang="ts">
import RecipeCard from '../components/home/RecipeCard.vue';
const recipes = [
  { id: 1, title: 'Recipe 1', description: 'Recipe 1 description', cookingTime: 120 },
  { id: 2, title: 'Recipe 2', description: 'Recipe 2 description', cookingTime: 220 },
  { id: 3, title: 'Recipe 3', description: 'Recipe 3 description', cookingTime: 320 },
  { id: 4, title: 'Recipe 4', description: 'Recipe 4 description', cookingTime: 420 },
  { id: 5, title: 'Recipe 5', description: 'Recipe 5 description', cookingTime: 520 },
  { id: 6, title: 'Recipe 6', description: 'Recipe 6 description', cookingTime: 620 },
  { id: 7, title: 'Recipe 7', description: 'Recipe 7 description', cookingTime: 720 },
  { id: 8, title: 'Recipe 8', description: 'Recipe 8 description', cookingTime: 820 },
];
</script>

<template>
  <section class="grid-home">
    <template v-for="r in recipes" :key="r.id">
      <RecipeCard :recipe="r" />
    </template>
  </section>
</template>

