<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { apiCreateRecipe } from "../../config/api/recipe";
import { apiGetAllTemperatureCategories } from "../../config/api/temperature-category";
import { apiGetAllCategories } from '../../config/api/category';
import { apiGetAllCountries } from "../../config/api/country";
import router from '../../router';
import { useAuthStore } from '../../store/auth';

const store = useAuthStore();

interface IRecipe {
  title: string,
  description: string,
  ingredients: object[],
  steps: string,
  cookingTime: number,
  unitTime: string,
  temperatureCategory: number,
  categories: object[],
  origin: string,
  draft: boolean,
  photo: string
}

interface IObject {
  label: string,
  value: string,
}

const newRecipeMessage = ref<string>('');
const temperatureCategories = ref<IObject[]>([]);
const countries = ref<IObject[]>([]);
const categories = ref<IObject[]>([]);
const recipe = ref<IRecipe>({
  title: '',
  description: '',
  ingredients: [],
  steps: '',
  cookingTime: 0,
  unitTime: 'min',
  temperatureCategory: 0,
  categories: [],
  origin: '',
  photo: '',
  draft: false,
});


watch(newRecipeMessage, (newQuestion) => {
  if (newQuestion) {
    setTimeout(() => {
      newRecipeMessage.value = '';
    }, 3000);
  }
});

const getAllTemperatureCategories = async() => {
  try {
    const response = await apiGetAllTemperatureCategories();
    temperatureCategories.value = response.map(tc => ({ label: tc.name, value: tc.value }));
  } catch (error) {
    console.log(error);
  }
}

const getAllCountries = async() => {
  try {
    const response = await apiGetAllCountries();
    countries.value = response.map(c => ({ label: c.name, value: c.countryCode }));
  } catch (error) {
    console.log(error);
  }
}

const getAllCategories = async() => {
  try {
    const response = await apiGetAllCategories();
    categories.value = response.map(c => ({ label: c.name, value: c.value }));
  } catch (error) {
    console.log(error);
  }
}

const createRecipe = async () => {
  if (!validateForm()) return;

  const payload = {
    title: recipe.value.title,
    description: recipe.value.description,
    ingredients: recipe.value.ingredients, // Modal
    steps: recipe.value.steps,
    cookingTime: recipe.value.cookingTime,
    unitTime: recipe.value.unitTime,
    temperatureCategory: recipe.value.temperatureCategory, // select
    categories: recipe.value.categories, // Multi select
    origin: recipe.value.origin,
    draft: recipe.value.draft,
    author: store.user._id,
    photo: recipe.value.photo
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

onMounted(async () => {
  await Promise.all([
    getAllTemperatureCategories(),
    getAllCountries(),
    getAllCategories()
  ]);
});

</script>

<template>
  <form class="form" @submit.prevent="createRecipe" autocomplete="off">
    <div class="form__row">
      <div class="form__col">
        <label for="recipeTitle">Title</label>
        <input type="text" maxlength="50" name="recipeTitle" id="recipeTitle" v-model="recipe.title" class="form__input">
      </div>
    </div>
    <div class="form__row">
      <div class="form__col">
        <label for="recipeDescription">Description</label>
        <input type="text" maxlength="100" name="recipeDescription" id="recipeDescription" v-model="recipe.description" class="form__input">
      </div>
    </div>
    <div class="form__row">
      <div class="form__col w-20 mr-2">
        <label for="recipeCookingTime">Cooking time</label>
        <input type="number" min="0" name="recipeCookingTime" id="recipeCookingTime" v-model="recipe.cookingTime" class="form__input" autocomplete="new-password">
      </div>
      <div class="form__col w-20 mr-2">
        <label for="unitTimeRecipe">Unit time</label>
        <input type="number" min="0" name="unitTimeRecipe" id="unitTimeRecipe" v-model="recipe.unitTime" class="form__input" autocomplete="new-password">
      </div>
      <div class="form__col w-20 mr-2">
        <label for="temperatureCategoryRecipe">Temperature</label>
        <select name="temperatureCategory" id="temperatureCategoryRecipe" v-model="recipe.temperatureCategory">
          <option v-for="(tc, index ) in temperatureCategories" :key="tc._id" :value="tc.value">{{ tc.label }}</option>
        </select>
      </div>
      <div class="form__col w-20 mr-2">
        <label for="categoryRecipe">Categories</label>
        <select name="category" id="categoryRecipe" v-model="recipe.categories">
          <option v-for="(c, index ) in categories" :key="c._id" :value="c.value">{{ c.label }}</option>
        </select>
      </div>
      <div class="form__col w-20">
        <label for="countriesRecipe">Country</label>
        <select name="countries" id="countriesRecipe" v-model="recipe.origin">
          <option v-for="(c, index ) in countries" :key="c._id" :value="c.value">{{ c.label }}</option>
        </select>
      </div>
    </div>
    <div class="form__row">
      <div class="form__col">
        <label for="recipeSteps">Steps</label>
        <textarea maxlength="1000" name="Steps" id="recipeSteps" cols="30" rows="10" v-model="recipe.steps" class="form__input"></textarea>
      </div>
    </div>
    <!-- <div class="form__row">
      <label for="photoOrigin">Photo</label>
      <input type="file" placeholder="Photo" name="photoOrigin" id="photoOrigin" class="form__input">
    </div> -->

    <!-- INGREDIENTS -->
    
    <button type="submit" class="btn btn--lg">Create</button>

    <div v-if="newRecipeMessage" class="new-recipe__message">
      {{ newRecipeMessage }}
    </div>
  </form>
</template>