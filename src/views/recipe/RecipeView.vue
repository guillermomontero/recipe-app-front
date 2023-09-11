<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, LocationQueryValue } from 'vue-router';
import { formatDateFront } from '../../config/utils/dates';
import { useAuthStore } from '../../store/auth';
import { apiGetRecipe } from '../../config/api/recipe';
import { apiGetUserData } from '../../config/api/user';
import { apiGetAllCountries } from '../../config/api/country';
import { apiGetAllCategories } from '../../config/api/category';
import router from "../../router";

interface IRecipe {
  _id: number,
  author: string,
  title: string,
  description: string,
  cookingTime: number,
  unitTime: number,
  img: string,
  temperatureCategory: number,
  origin: string,
  categories: number[],
  likes: number,
  authorName: string,
  authorPremium: boolean,
  authorNickname: string,
}

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

const storeAuth = useAuthStore();

const route = useRoute();
const recipeId = route.query.id;
const recipe = ref<IRecipe>({
  _id: 0,
  author: '',
  title: '',
  description: '',
  cookingTime: 0,
  unitTime: 0,
  img: '',
  temperatureCategory: 0,
  origin: '',
  categories: [],
  likes: 0,
  authorName: '',
  authorPremium: false,
  authorNickname: '',
});
const countries = ref<ICountry[]>([]);
const categories = ref<ICategory[]>([]);
const recipeCategories = ref<string[]>([]);

const getRecipe = async (id: LocationQueryValue = '') => {
  const response = await apiGetRecipe(id);
  recipe.value = response;
};

const getUserData = async (id: LocationQueryValue = '') => {
  const response = await apiGetUserData(id);
  recipe.value.authorName = response.name;
  recipe.value.authorNickname = response.nickname;
  recipe.value.authorPremium = response.premium;
};

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

const getClassTemperature = (temperature: number) => {
  switch (temperature) {
    case 1:
      return 'recipe-view__bar--info--temperature--hot';
    case 2:
      return 'recipe-view__bar--info--temperature--warm';
    case 3:
      return 'recipe-view__bar--info--temperature--cold';
    default:
      return '';
  }
};

const getUnitTimes = (unitTime: number) => {
  switch (unitTime) {
    case 1:
      return 'min.';
    case 2:
      return 'h.';
    case 3:
      return 'd.';
    default:
      return '';
  };
};

const getOrigin = (origin: string) => {
  return countries.value.find(country => country.countryCode === origin)?.alpha2;
};

const allowEdit = computed(() => {
  return recipe.value.author === storeAuth.user._id;
});

const editRecipe = () => {
  // Save the flag with the source page so we can come back
  router.push({ path: '/new-recipe', query: { m: 'edit', v: 'general', id: recipe.value._id } });
};

onMounted(() => {
  Promise.all([
    getAllCountries(),
    getAllCategories(),
    getRecipe(recipeId),
  ])
    .then(() => {
      getUserData(recipe.value.author);
      recipeCategories.value = categories.value.filter((c:ICategory) => recipe.value.categories.includes(c.value)).map((c:ICategory) => c.label);
    });
}); 
</script>

<template>
  <div class="page-title">
    <h3>{{ recipe.title }}</h3>
    <button v-if="allowEdit" class="btn btn--xs btn--edit" @click="editRecipe">{{ $t('editar') }}</button>
  </div>
  <section class="recipe-view mt-1">
    <div class="recipe-view__bar">
      <div class="recipe-view__bar--info">
        <div class="recipe-view__bar--info--temperature" :class="getClassTemperature(recipe.temperatureCategory)"></div>
        <div class="recipe-view__bar--info--timing">{{ recipe.cookingTime }} {{ getUnitTimes(recipe.unitTime) }}</div>
        <div class="recipe-view__bar--info--origin">{{ getOrigin(recipe.origin) }}</div>
      </div>
      <div class="recipe-view__bar--user-create">
        <span>@{{ recipe.authorNickname }} - {{ formatDateFront(recipe.createDate) }}</span>
      </div>
      <div class="recipe-view__bar--likes">
        <p>❤️ {{ recipe.likes }}</p>
      </div>
    </div>
    <div class="recipe-view__info mt-1">
      <div class="recipe-view__info--img">
        <img :src="recipe.photo" alt="recipe.title">
      </div>
      <div class="recipe-view__info--data">
        <div class="recipe-view__info--data--description">
          <h4>{{ recipe.description }}</h4>
        </div>
        <div class="recipe-view__info--data--categories mt-1">
          <span class="recipe-view__info--data--categories--category" v-for="category in recipeCategories" :key="category">{{ category }}</span>
        </div>
      </div>
    </div>
    <div class="recipe-view__content mt-1">
      <div class="recipe-view__content--ingredients">
        <h5>{{ $t('ingredientes') }}</h5>
        <div class="recipe-view__content--ingredients--divider"></div>
        <div class="recipe-view__content--ingredients--ingredient" v-for="ingredient in recipe.ingredients" :key="ingredient.name">
          <span>{{ ingredient.name }}&nbsp;</span>
          <span>({{ ingredient.type }}&nbsp;</span>
          <span>{{ ingredient.quantity }})</span>
        </div>
      </div>
      <div v-if="recipe.authorPremium" class="recipe-view__content--ad">
        <h3>Ad</h3>
      </div>
      <div class="recipe-view__content--steps">
        <h5>{{ $t('receta') }}</h5>
        <div class="recipe-view__content--steps--divider"></div>
        <p v-html="recipe.steps"></p>
      </div>
    </div>
  </section>
</template>