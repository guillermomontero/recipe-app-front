<script setup lang="ts">
import FilterBar from '../components/home/FilterBar.vue';
import RecipeCard from '../components/home/RecipeCard.vue';

const recipes = [
  { id: 1, title: 'Recipe 1', description: 'Recipe 1 description', cookingTime: 120, img: '/images/imagen-comida.jpg' },
  { id: 2, title: 'Recipe 2', description: 'Recipe 2 description', cookingTime: 220, img: '/images/imagen-comida.jpg' },
  { id: 3, title: 'Recipe 3', description: 'Recipe 3 description', cookingTime: 320, img: '/images/imagen-comida.jpg' },
  { id: 4, title: 'Recipe 4', description: 'Recipe 4 description', cookingTime: 420, img: '/images/imagen-comida.jpg' },
  { id: 5, title: 'Recipe 5', description: 'Recipe 5 description', cookingTime: 520, img: '/images/imagen-comida.jpg' },
  { id: 6, title: 'Recipe 6', description: 'Recipe 6 description', cookingTime: 620, img: '/images/imagen-comida.jpg' },
  { id: 7, title: 'Recipe 7', description: 'Recipe 7 description', cookingTime: 720, img: '/images/imagen-comida.jpg' },
  { id: 8, title: 'Recipe 8', description: 'Recipe 8 description', cookingTime: 820, img: '/images/imagen-comida.jpg' },
];
</script>

<template>
  <FilterBar />
  <section class="grid-home">
    <template v-for="(r, index) in recipes" :key="r.id">
      <RecipeCard :recipe="r" :class="`grid-home__box-${index}`" />
    </template>
  </section>
</template>

