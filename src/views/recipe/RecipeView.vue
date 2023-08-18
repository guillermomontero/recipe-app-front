<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, LocationQueryValue } from 'vue-router';
import { formatDateFront } from '../../config/utils/dates';
import { apiGetRecipe } from '../../config/api/recipe';
import { apiGetUserName } from '../../config/api/user';

const route = useRoute();
const recipeId = route.query.id;
const recipe = ref({});

const getRecipe = async (id: LocationQueryValue = '') => {
  const response = await apiGetRecipe(id);
  recipe.value = response;
};

const getUserName = async (id: LocationQueryValue = '') => {
  const response = await apiGetUserName(id);
  recipe.value.authorName = response.name;
};

onMounted(async () => {
  await getRecipe(recipeId);
  await getUserName(recipe.value.author);
}); 
</script>

<template>
  <div class="page-title">
    <h3>{{ recipe.title }}</h3>
    <!-- <button class="btn btn--xs btn--edit" @click="editProfile">{{ $t('editar') }}</button> -->
  </div>
  <section class="recipe-view mt-2">
    <div class="recipe-view__description">
      <h4>{{ recipe.description }}</h4>
    </div>
    <div class="recipe-view__photo my-2">
      <img :src="recipe.photo" alt="recipe.title">
    </div>
    <div class="recipe-view__author">
      <p>{{ recipe.authorName }}</p>
      <p>{{ formatDateFront(recipe.createDate) }}</p>
    </div>
    <div class="recipe-view__data">
      <p>{{ recipe.temperatureCategory }}</p>
      <p>{{ recipe.origin }}</p>
      <p>{{ recipe.likes }}</p>
    </div>
    <div class="recipe-view__categories">
      <div class="recipe-view__categories--category" v-for="category in recipe.categories" :key="category">
        <span>{{ category }}&nbsp;</span>
      </div>
    </div>
    <div class="recipe-view__duration">
      <p>{{ recipe.cookingTime }} {{ recipe.unitTime }}</p>
    </div>
    <div class="recipe-view__ingredients">
      <div class="recipe-view__ingredients--ingredient" v-for="ingredient in recipe.ingredients" :key="ingredient.name">
        <span>{{ ingredient.name }}&nbsp;</span>
        <span>({{ ingredient.amount }}&nbsp;</span>
        <span>{{ ingredient.type }})</span>
      </div>
    </div>
    <div class="recipe-view__steps">
      <p>{{ recipe.steps }}</p>
    </div>
  </section>
</template>