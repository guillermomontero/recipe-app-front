<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { apiCreateRecipe } from "../../config/api/recipe";
import { apiGetAllTemperatureCategories } from "../../config/api/temperature-category";
import { apiGetAllCategories } from '../../config/api/category';
import { apiGetAllCountries } from "../../config/api/country";
import { apiGetAllUnitTimes } from "../../config/api/unit-time";
import { useAuthStore } from '../../store/auth';
import router from '../../router';
import BaseMultiSelect from '../../components/base/BaseMultiSelect.vue';
import ModalIngredients from '../../components/recipe/ModalIngredients.vue';


const store = useAuthStore();

interface IRecipe {
  title: string,
  description: string,
  ingredients: object[],
  steps: string,
  cookingTime: number,
  unitTime: string,
  temperatureCategory: number,
  categories: number[],
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
const unitTimes = ref<IObject[]>([]);
const showModalIngredients = ref<boolean>(false)
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
    categories.value = response.map(c => ({ label: c.name, value: c.value, selected: false }));
  } catch (error) {
    console.log(error);
  }
}

const getAllUnitTimes = async() => {
  try {
    const response = await apiGetAllUnitTimes();
    unitTimes.value = response.map(u => ({ label: u.name, value: u.value }));
  } catch (error) {
    console.log(error);
  }
}

const addIngredients = (): void => { showModalIngredients.value = true; };

const addIngredientsToRecipe = (ingredient: object = {}): void => {
  recipe.value.ingredients.push(ingredient)
};

const deleteIngredient = (index: number = 0) => {
  recipe.value.ingredients.splice(index, 1);
};

const closeModalIngredients = (): void => { showModalIngredients.value = false; }

const createRecipe = async () => {
  if (!validateForm()) return;

  const payload = {
    title: recipe.value.title,
    description: recipe.value.description,
    ingredients: recipe.value.ingredients, // Modal
    steps: recipe.value.steps,
    cookingTime: recipe.value.cookingTime,
    unitTime: recipe.value.unitTime,
    temperatureCategory: recipe.value.temperatureCategory,
    categories: recipe.value.categories,
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

const updateSelectedCategories = (categories: number[] = []) => {
  recipe.value.categories = categories;
}

onMounted(async () => {
  await Promise.all([
    getAllTemperatureCategories(),
    getAllCountries(),
    getAllCategories(),
    getAllUnitTimes()
  ]);
});

</script>

<template>
  <form class="form" @submit.prevent="createRecipe" autocomplete="off">
    <div class="form__row">
      <div class="form__col w-100">
        <label for="recipeTitle">Title</label>
        <input type="text" maxlength="50" name="recipeTitle" id="recipeTitle" v-model="recipe.title" class="form__input">
      </div>
    </div>
    <div class="form__row">
      <div class="form__col w-100">
        <label for="recipeDescription">Description</label>
        <input type="text" maxlength="100" name="recipeDescription" id="recipeDescription" v-model="recipe.description" class="form__input">
      </div>
    </div>
    <div class="form__row">
      <div class="form__col w-20 mr-2">
        <label for="recipeCookingTime">Cooking time</label>
        <input type="number" min="0" name="recipeCookingTime" id="recipeCookingTime" v-model="recipe.cookingTime" class="form__input" autocomplete="new-password">
      </div>
      <div class="form__col w-20">
        <label for="unitTimeRecipe">Unit time</label>
        <select name="unitTimeRecipe" id="unitTimeRecipe" v-model="recipe.unitTime">
          <option v-for="u in unitTimes" :key="u.value" :value="u.value">{{ u.label }}</option>
        </select>
      </div>
    </div>
    <div class="form__row">
      <div class="form__col w-20 mr-2">
        <label for="temperatureCategoryRecipe">Temperature</label>
        <select name="temperatureCategory" id="temperatureCategoryRecipe" v-model="recipe.temperatureCategory">
          <option v-for="tc in temperatureCategories" :key="tc.value" :value="tc.value">{{ tc.label }}</option>
        </select>
      </div>
      <div class="form__col w-40 mr-2">
        <BaseMultiSelect :BMSData="categories" :BMSLabel="'Categories'" @selected-values="updateSelectedCategories" />
      </div>
      <div class="form__col w-40">
        <label for="countriesRecipe">Country</label>
        <select name="countries" id="countriesRecipe" v-model="recipe.origin">
          <option v-for="c in countries" :key="c.value" :value="c.value">{{ c.label }}</option>
        </select>
      </div>
    </div>
    <div class="form__row">
      <div class="form__col w-100">
        <button class="btn btn--md btn--edit" @click.prevent="addIngredients">Add ingredients</button>
      </div>
    </div>
    <div class="form__row" v-if="recipe.ingredients.length">
      <div class="form__col w-100">
        <div class="form-extras__ingredients">
          <div v-for="(ingredient, index) in recipe.ingredients" :key="index" class="form-extras__ingredients--ingredient">
            <span class="mr-1">{{ ingredient.name }} ({{ ingredient.amount }} {{ ingredient.type }})</span>
            <svg @click="deleteIngredient(index)" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 8.933-2.721-2.722c-.146-.146-.339-.219-.531-.219-.404 0-.75.324-.75.749 0 .193.073.384.219.531l2.722 2.722-2.728 2.728c-.147.147-.22.34-.22.531 0 .427.35.75.751.75.192 0 .384-.073.53-.219l2.728-2.728 2.729 2.728c.146.146.338.219.53.219.401 0 .75-.323.75-.75 0-.191-.073-.384-.22-.531l-2.727-2.728 2.717-2.717c.146-.147.219-.338.219-.531 0-.425-.346-.75-.75-.75-.192 0-.385.073-.531.22z" fill-rule="nonzero"/></svg>
          </div>
        </div>
      </div>
    </div>
    <div class="form__row">
      <div class="form__col w-100">
        <label for="recipeSteps">Steps</label>
        <textarea maxlength="1000" name="Steps" id="recipeSteps" cols="30" rows="10" v-model="recipe.steps" class="form__input"></textarea>
      </div>
    </div>
    <!-- <div class="form__row">
      <label for="photoOrigin">Photo</label>
      <input type="file" placeholder="Photo" name="photoOrigin" id="photoOrigin" class="form__input">
    </div> -->
    
    <button type="submit" class="btn btn--md">Create</button>

    <div v-if="newRecipeMessage" class="new-recipe__message">
      {{ newRecipeMessage }}
    </div>
  </form>

  <ModalIngredients v-if="showModalIngredients" @add-ingredient="addIngredientsToRecipe" @close="closeModalIngredients"/>
</template>