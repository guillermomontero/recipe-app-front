<script lang="ts" setup>
import { ref, watch } from 'vue';
import { apiCreateRecipe } from "../config/api/recipe";
import router from '../router';
import { useAuthStore } from '../store/auth';

const store = useAuthStore();

interface IRecipe {
  title: string,
  description: string,
  ingredients: object[],
  steps: string,
  cookingTime: number,
  temperatureCategory: number,
  categories: object[],
  origin: string,
  draft: boolean
}

const newRecipeMessage = ref<string>('');
const recipe = ref<IRecipe>({
  title: '',
  description: '',
  ingredients: [],
  steps: '',
  cookingTime: 0,
  temperatureCategory: 0,
  categories: [],
  origin: '',
  draft: false,
});


watch(newRecipeMessage, (newQuestion) => {
  if (newQuestion) {
    setTimeout(() => {
      newRecipeMessage.value = '';
    }, 3000);
  }
});

const createRecipe = async () => {
  if (!validateForm()) return;

  const payload = {
    title: recipe.value.title,
    description: recipe.value.description,
    ingredients: recipe.value.ingredients, // Modal
    steps: recipe.value.steps,
    cookingTime: recipe.value.cookingTime,
    temperatureCategory: recipe.value.temperatureCategory, // select
    categories: recipe.value.categories, // Multi select
    origin: recipe.value.origin,
    draft: recipe.value.draft,
    author: store.user._id
  };

  try {
    await apiCreateRecipe(payload);
    router.push('/my-recipes');
  } catch (error) {
    console.log(error);
  }
};

// Validate form
const validateForm = () => {
  if (!recipe.value.title || typeof recipe.value.title !== 'string') {
    newRecipeMessage.value = 'Introcuzca un título correcto';
    return false;
  }

  return true;
};

</script>

<template>
  <section class="new-recipe">
    <form class="new-recipe__form" @submit.prevent="createRecipe" autocomplete="off">
      <input type="text" placeholder="Title" name="recipeTitle" id="recipeTitle" v-model="recipe.title" class="new-recipe__form--input" autocomplete="off">
      <input type="text" placeholder="Description" name="recipeDescription" id="recipeDescription" v-model="recipe.description" class="new-recipe__form--input" autocomplete="off">
      <input type="text" placeholder="Steps" name="recipeSteps" id="recipeSteps" v-model="recipe.steps" class="new-recipe__form--input" autocomplete="off">
      <input type="number" placeholder="Cooking time" name="recipeCookingTime" id="recipeCookingTime" v-model="recipe.cookingTime" class="new-recipe__form--input" autocomplete="new-password">
      <input type="text" placeholder="Origin" name="recipeOrigin" id="recipeOrigin" v-model="recipe.origin" class="new-recipe__form--input" autocomplete="off">
      
      <button type="submit" class="new-recipe__form--button">Create</button>

      <div v-if="newRecipeMessage" class="new-recipe__message">
        {{ newRecipeMessage }}
      </div>
    </form>
  </section>
</template>