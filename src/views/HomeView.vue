<script setup lang="ts">
import { onMounted, ref } from "vue";
import { apiGetLatestRecipes } from "../config/api/recipe";
import { apiGetAllCountries } from '../config/api/country';
import { apiGetAllCategories } from '../config/api/category';
import FilterBar from '../components/home/FilterBar.vue';
import RecipeCard from '../components/home/RecipeCard.vue';

interface ICountry {
  _id: number,
  name: string,
  alpha2: string,
  countryCode: string
}

interface ICategory {
  name?: string,
  label: string,
  value: number
};

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

const getLatestRecipes = async () => {
  try {
    recipes.value = await apiGetLatestRecipes();
  } catch (error) {
    console.log(error)
  }
};

onMounted(() => {
  Promise.all([
    getAllCountries(),
    getAllCategories(),
    getLatestRecipes()
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
</template>

