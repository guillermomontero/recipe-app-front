<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute,LocationQueryValue } from 'vue-router';
import { apiCreateRecipe, apiGetRecipe, apiEditRecipe } from "../../config/api/recipe";
import { apiGetAllTemperatureCategories } from "../../config/api/temperature-category";
import { apiGetAllCategories, apiCreateCategory } from '../../config/api/category';
import { apiGetAllCountries } from "../../config/api/country";
import { apiGetAllUnitTimes } from "../../config/api/unit-time";
import { useAuthStore } from '../../store/auth';
import router from '../../router';
import BaseMultiSelect from '../../components/base/BaseMultiSelect.vue';
import ModalIngredients from '../../components/recipe/ModalIngredients.vue';

interface IRecipe {
  _id?: string,
  title: string,
  description: string,
  ingredients: object[],
  steps: string,
  cookingTime: number,
  unitTime: number,
  temperatureCategory: number,
  categories: number[],
  origin: string,
  draft: boolean,
  photo: string
};

interface IObject {
  label: string,
  value: number,
};

interface IObjectCountry {
  label: string,
  value: string,
};

interface IObjectAPI {
  name: string,
  value: string,
  countryCode?: string
};

interface ICategory {
  label: string,
  value: number,
  selected: boolean
};

const route = useRoute();
const store = useAuthStore();

const mode = ref<string>('create');
const newRecipeMessage = ref<string>('');
const temperatureCategories = ref<IObject[]>([]);
const countries = ref<IObjectCountry[]>([]);
const categories = ref<ICategory[]>([]);
const unitTimes = ref<IObject[]>([]);
const showModalIngredients = ref<boolean>(false)
const recipe = ref<IRecipe>({
  _id: '',
  title: '',
  description: '',
  ingredients: [],
  steps: '',
  cookingTime: 0,
  unitTime: 0,
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
    temperatureCategories.value = response.map((tc: IObjectAPI) => ({ label: tc.name, value: tc.value }));
  } catch (error) {
    console.log(error);
  }
}

const getAllCountries = async() => {
  try {
    const response = await apiGetAllCountries();
    countries.value = response.map((c: IObjectAPI) => ({ label: c.name, value: c.countryCode }));
  } catch (error) {
    console.log(error);
  }
}

const getAllCategories = async() => {
  try {
    const response = await apiGetAllCategories();
    categories.value = response.map((c: IObjectAPI) => ({ label: c.name, value: c.value, selected: false }));
  } catch (error) {
    console.log(error);
  }
}

const getAllUnitTimes = async() => {
  try {
    const response = await apiGetAllUnitTimes();
    unitTimes.value = response.map((u: IObjectAPI) => ({ label: u.name, value: u.value }));
  } catch (error) {
    console.log(error);
  }
}

const fillDataToEdit = async (id: LocationQueryValue = '') => {
  try {
    const response = await apiGetRecipe(String(id));
    recipe.value._id = response._id;
    recipe.value.title = response.title;
    recipe.value.description = response.description;
    recipe.value.ingredients = response.ingredients;
    recipe.value.steps = response.steps;
    recipe.value.cookingTime = response.cookingTime;
    recipe.value.unitTime = response.unitTime;
    recipe.value.temperatureCategory = response.temperatureCategory;
    recipe.value.categories = response.categories;
    recipe.value.origin = response.origin;
    recipe.value.photo = response.photo;
    recipe.value.draft = response.draft;

    categories.value.forEach((c: ICategory)  => {
      if (recipe.value.categories.indexOf(c.value) !== -1) c.selected = true;
    });
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

const closeModalIngredients = (): void => { showModalIngredients.value = false; };

const acceptHandler = (type: number = 1) => {
  if (type === 1) {
    if (mode.value === 'create') createRecipe();
    if (mode.value === 'edit') editRecipe();
  } else {
    saveDraftRecipe();
  }
}

const createRecipe = async () => {
  if (!validateForm()) return;

  const payload = {
    title: recipe.value.title,
    description: recipe.value.description,
    ingredients: recipe.value.ingredients,
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

const editRecipe = async () => {
  if (!validateForm()) return;

  const payload = {
    _id: recipe.value._id,
    title: recipe.value.title,
    description: recipe.value.description,
    ingredients: recipe.value.ingredients,
    steps: recipe.value.steps,
    cookingTime: recipe.value.cookingTime,
    unitTime: recipe.value.unitTime,
    temperatureCategory: recipe.value.temperatureCategory,
    categories: recipe.value.categories,
    origin: recipe.value.origin,
    draft: false,
    photo: recipe.value.photo
  };

  try {
    await apiEditRecipe(payload);
    router.push('/my-recipes');
  } catch (error) {
    console.log(error);
  }
};

const saveDraftRecipe = async () => {
  if (!validateForm()) return;

  const payload = {
    title: recipe.value.title,
    description: recipe.value.description,
    ingredients: recipe.value.ingredients,
    steps: recipe.value.steps,
    cookingTime: recipe.value.cookingTime,
    unitTime: recipe.value.unitTime,
    temperatureCategory: recipe.value.temperatureCategory,
    categories: recipe.value.categories,
    origin: recipe.value.origin,
    draft: true,
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
};

const addNewCategory = async (text: string = '') => {
  const payload = { name: text };

  try {
    const response = await apiCreateCategory(payload);
    categories.value.push({ label: response.name, value: response.value, selected: true });
    recipe.value.categories.push(response.value);
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  await Promise.all([
    getAllTemperatureCategories(),
    getAllCountries(),
    getAllCategories(),
    getAllUnitTimes()
  ]);

  if (route.query.m === 'edit' && route.query.id !== '0') {
    mode.value = 'edit';
    fillDataToEdit(route.query.id);
  }
});

</script>

<template>
  <form class="form" autocomplete="off">
    <div class="form__row">
      <div class="form__col w-100">
        <input type="text" maxlength="50" placeholder=" " id="titleRecipe" v-model="recipe.title" class="form__input">
        <label for="titleRecipe" class="form__label">Title</label>
      </div>
    </div>
    <div class="form__row">
      <div class="form__col w-100">
        <input type="text" maxlength="100" placeholder=" " id="descriptionRecipe" v-model="recipe.description" class="form__input">
        <label for="descriptionRecipe" class="form__label">Description</label>
      </div>
    </div>
    <div class="form__row">
      <div class="form__col w-20 mr-2">
        <input type="number" min="0" placeholder=" " id="cookingTimeRecipe" v-model="recipe.cookingTime" class="form__input" autocomplete="new-password">
        <label for="cookingTimeRecipe" class="form__label">Cooking time</label>
      </div>
      <div class="form__col w-20">
        <select placeholder=" " name="unitTimeRecipe" id="unitTimeRecipe" v-model="recipe.unitTime" class="form__input">
          <option disabled value="0" hidden>Choose here</option>
          <option v-for="u in unitTimes" :key="u.value" :value="u.value">{{ u.label }}</option>
        </select>
        <label for="unitTimeRecipe" class="form__label">Unit time</label>
      </div>
    </div>
    <div class="form__row">
      <div class="form__col w-20 mr-2">
        <select placeholder=" " id="temperatureCategoryRecipe" v-model="recipe.temperatureCategory" class="form__input">
          <option disabled value="0" hidden>Choose here</option>
          <option v-for="tc in temperatureCategories" :key="tc.value" :value="tc.value">{{ tc.label }}</option>
        </select>
        <label for="temperatureCategoryRecipe" class="form__label">Temperature</label>
      </div>
      <div class="form__col w-40 mr-2">
        <BaseMultiSelect :BMSData="categories" :BMSLabel="'Categories'" @add-new-item="addNewCategory" @selected-values="updateSelectedCategories" />
      </div>
      <div class="form__col w-40">
        <select placeholder=" " id="countriesRecipe" v-model="recipe.origin" class="form__input">
          <option disabled value="" hidden>Choose here</option>
          <option v-for="c in countries" :key="c.value" :value="c.value">{{ c.label }}</option>
        </select>
        <label for="countriesRecipe" class="form__label">Country</label>
      </div>
    </div>
    <div class="form__row">
      <button class="btn btn--md btn--edit" @click.prevent="addIngredients">Add ingredients</button>
    </div>
    <div class="form__row" v-if="recipe.ingredients.length">
      <div class="form__col w-100 mb-0">
        <div class="form-extras__ingredients">
          <div v-for="(ingredient, index) in recipe.ingredients" :key="index" class="form-extras__ingredients--ingredient">
            <span class="mr-1">{{ ingredient.name }} ({{ ingredient.amount }} {{ ingredient.type }})</span>
            <svg @click="deleteIngredient(index)" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 8.933-2.721-2.722c-.146-.146-.339-.219-.531-.219-.404 0-.75.324-.75.749 0 .193.073.384.219.531l2.722 2.722-2.728 2.728c-.147.147-.22.34-.22.531 0 .427.35.75.751.75.192 0 .384-.073.53-.219l2.728-2.728 2.729 2.728c.146.146.338.219.53.219.401 0 .75-.323.75-.75 0-.191-.073-.384-.22-.531l-2.727-2.728 2.717-2.717c.146-.147.219-.338.219-.531 0-.425-.346-.75-.75-.75-.192 0-.385.073-.531.22z" fill-rule="nonzero"/></svg>
          </div>
        </div>
      </div>
    </div>
    <div class="form__row">
      <div class="form__col w-100" style="height: 250px;">
        <textarea maxlength="1000" placeholder=" " id="stepsRecipe" cols="30" rows="10" v-model="recipe.steps" class="form__input"></textarea>
        <label for="stepsRecipe" class="form__label">Steps</label>
      </div>
    </div>
    <!-- <div class="form__row">
      <label for="photoOrigin">Photo</label>
      <input type="file" placeholder="Photo" name="photoOrigin" id="photoOrigin" class="form__input">
    </div> -->

    <div>
      <button class="btn btn--md btn--edit mr-2" @click.prevent="acceptHandler(1)">{{ mode === 'create' ? 'Create' : 'Edit' }}</button>
      <button v-if="mode === 'create' || recipe.draft" class="btn btn--md btn--edit" @click.prevent="acceptHandler(2)">Draft</button>
    </div>
    
    

    <div v-if="newRecipeMessage" class="new-recipe__message">
      {{ newRecipeMessage }}
    </div>
  </form>

  <ModalIngredients v-if="showModalIngredients" @add-ingredient="addIngredientsToRecipe" @close="closeModalIngredients"/>
</template>