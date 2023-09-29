<script setup lang="ts">
import { onMounted, ref } from "vue";
import { apiGetLatestRecipes } from "../config/api/recipe";
import { apiGetAllCountries } from '../config/api/country';
import { apiGetAllCategories } from '../config/api/category';
import FilterBar from '../components/home/FilterBar.vue';
import RecipeCard from '../components/home/RecipeCard.vue';
import { ICategory, ICountry } from '../../types';

const limitInit = 9;
const hasPagination = ref<boolean>(false);
const pagination = ref(0);
const pageActive = ref(1);
const pages = ref([]);
const countries = ref<ICountry[]>([]);
const categories = ref<ICategory[]>([]);
const recipes = ref([]);

const getAllCountries = async () => {
  try {
    const response = await apiGetAllCountries();
    countries.value = response;
  } catch (error) {
    console.log(error);
  }
};

const getAllCategories = async() => {
  try {
    const response = await apiGetAllCategories();
    categories.value = response.map((c: ICategory) => ({ label: c.name, value: c.value, selected: false }));
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error)
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

onMounted(() => {
  Promise.all([
    getAllCountries(),
    getAllCategories(),
    getLatestRecipes(0, limitInit)
  ]);
});
</script>

<template>
  <FilterBar />
  <section class="grid-home">
    <template v-for="(r, index) in recipes" :key="r.id">
      <RecipeCard :countries="countries" :categories="categories" :recipe="r" :class="`grid-home__box-${index}`" />
    </template>
  </section>
  <section class="pagination" v-if="hasPagination">
    <button class="btn btn--pagination" @click="getLatestRecipes(0, limitInit)" v-if="pageActive > 1">Init</button>
    <span v-if="pageActive > 3">...</span>
    <button class="btn btn--pagination" :class="{'btn--pagination--active': pageActive === p }" v-for="p in pages" :key="p" @click="getLatestRecipes((p - 1) * limitInit, limitInit)">{{ p }}</button>
    <span v-if="pageActive < pagination - 3">...</span>
    <button class="btn btn--pagination" @click="getLatestRecipes((pagination - 1) * limitInit, limitInit)" v-if="pageActive < pagination">End</button>
  </section>
</template>
