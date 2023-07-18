<script setup lang="ts">
import { onMounted, ref } from "vue";
import { apiGetAllRecipes } from "../config/api/recipe";
import FilterBar from '../components/home/FilterBar.vue';
import RecipeCard from '../components/home/RecipeCard.vue';

const recipes = ref([]);

const getAllRecipes = async () => {
  try {
    recipes.value = await apiGetAllRecipes();
  } catch (error) {
    console.log(error)
  }
};

onMounted(() => {
  getAllRecipes();
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

