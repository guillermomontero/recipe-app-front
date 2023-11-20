<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import router from '../../router';
import { apiGetAllRecipesForSearch, apiGetLatestRecipes } from '../../config/api/recipe';
import BaseSearch from '../../components/base/BaseSearch.vue';

const { t } = useI18n();

const recipes = ref([]);
const allRecipes = ref([]);
const limitInit = 10;
const pagination = ref(0);
const pageActive = ref(1);
const pages = ref([]);
const hasPagination = ref<boolean>(false);

const getAllRecipesForSearch = async () => {
  try {
    const response = await apiGetAllRecipesForSearch();
    allRecipes.value = response.recipes;
  } catch (err) {
    console.log(err);
  }
};

const getLatestRecipes = async (skip: number = 0, limit: number = limitInit) => {
  const payload = {
    skip,
    limit
  };

  try {
    const response = await apiGetLatestRecipes(payload);
    recipes.value = response.recipes;
    if (response.totalRecipes > limitInit) makePagination(skip, limit, response.totalRecipes);
  } catch (err) {
    console.log(err);
  }
};

const makePagination = (skip: number, limit: number, totalRecipes: number) => {
  pages.value = [];
  hasPagination.value = true;
  pagination.value = Math.ceil(totalRecipes / limit);
  pageActive.value = Math.ceil(skip / limit) + 1;

  if (pagination.value > 4) {
    for (let i = pageActive.value; i < pageActive.value + 4; i++) {
      if (i <= pagination.value) pages.value.push(i);
    }
  } else {
    for (let i = 1; i <= pagination.value; i++) {
      pages.value.push(i);
    }
  }
};

const goToRecipeView = (recipe) => {
  router.push({ name: 'recipe', query: { id: recipe._id } });
};

const filterList = (value) => {
  recipes.value = value;
};

onMounted(() => {
  getAllRecipesForSearch();
  getLatestRecipes(0, limitInit);
})
</script>

<template>
  <div class="page-title">
    <h3>{{ t('recetas') }}</h3>
  </div>
  <base-search class="mt-2" :items="allRecipes" :filterValue="'title'" @filter-list="filterList" />
  <section class="recipes-all">
    <div class="recipes-all__recipe" v-for="(recipe, index) in recipes" :key="index" @click="goToRecipeView(recipe)">{{ recipe.title }}</div>
  </section>
  <section class="pagination" v-if="hasPagination">
    <button class="btn btn--pagination" @click="getLatestRecipes(0, limitInit)" v-if="pageActive > 1">Init</button>
    <span v-if="pageActive > 3">...</span>
    <button class="btn btn--pagination" :class="{'btn--pagination--active': pageActive === p }" v-for="p in pages" :key="p" @click="getLatestRecipes((p - 1) * limitInit, limitInit)">{{ p }}</button>
    <span v-if="pageActive < pagination - 3">...</span>
    <button class="btn btn--pagination" @click="getLatestRecipes((pagination - 1) * limitInit, limitInit)" v-if="pageActive < pagination">End</button>
  </section>
</template>