<script setup lang="ts">
import { onMounted, ref } from "vue";
import { apiGetMyRecipes } from "../config/api/recipe";
import { useAuthStore } from '../store/auth';

const store = useAuthStore();

const recipes = ref([]);

const getMyRecipes = async () => {
  try {
    recipes.value = await apiGetMyRecipes(store.user._id);
  } catch (error) {
    console.log(error)
  }
};

onMounted(() => {
  getMyRecipes();
});
</script>

<template>
  <h1>My recipes view</h1>
  {{ recipes }}
</template>