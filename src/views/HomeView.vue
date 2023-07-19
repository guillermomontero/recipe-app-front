<script setup lang="ts">
import { onMounted, ref } from "vue";
import { apiGetLatestRecipes } from "../config/api/recipe";
import FilterBar from '../components/home/FilterBar.vue';
import RecipeCard from '../components/home/RecipeCard.vue';

const recipes = ref([]);

const getLatestRecipes = async () => {
  try {
    recipes.value = await apiGetLatestRecipes();
  } catch (error) {
    console.log(error)
  }
};

onMounted(() => {
  getLatestRecipes();
});
</script>

<template>
  <FilterBar />
  <section class="grid-home">
    <template v-for="(r, index) in recipes" :key="r.id">
      <RecipeCard :recipe="r" :class="`grid-home__box-${index}`" />
    </template>
  </section>
</template>

