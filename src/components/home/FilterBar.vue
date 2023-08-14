<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { getAllRecipesForSearch } from '../../config/api/recipe';
import { apiGetAllCategories } from '../../config/api/category';
import { useFilterBarStore } from '../../store/filter-bar';
import ModalFilters from './ModalFilters.vue';

const store = useFilterBarStore();


interface IRecipe {
  _id: string,
  title: string,
  cookingTime: number,
  origin: string,
  temperatureCategory: number,
  unitTime: number,
  categories: number[]
};

interface ICategory {
  label: string,
  value: number,
  selected?: boolean
};

const search = ref<string>('');
const recipes = ref<IRecipe[]>([]);
const recipesFilter = ref<IRecipe[]>([]);
const cookingTime = ref<number>(0);
const origin = ref<string>('');
const originLabel = ref<string>('');
const temperatureCategory = ref<number>(0);
const temperatureCategoryLabel = ref<string>('');
const unitTime = ref<number>(0);
const unitTimeLabel = ref<string>('');
const categories = ref<number[]>([]);
const categoriesBackUp = ref<ICategory[]>([]);
const categoriesLabels = ref<string[]>([]);
const showModalFilters = ref<boolean>(false);

const getAllRecipes = async () => {
  const response = await getAllRecipesForSearch();
  recipes.value = response.recipes;
};

const hasCategories = (recipe: IRecipe) => {
  let exist = true;

  categories.value.forEach((cat: number) => {
    if (recipe.categories.indexOf(cat) === -1) exist = false;
  });

  return exist;
};

const getFilterRecipes = () => {
  if (search.value === '') return recipesFilter.value = [];
  recipesFilter.value = recipes.value.filter((recipe) => {
    return recipe.title.toLowerCase().includes(search.value.toLowerCase())
      && (cookingTime.value === 0 ? true : recipe.cookingTime === cookingTime.value)
      && (origin.value === '' ? true : recipe.origin === origin.value)
      && (temperatureCategory.value === 0 ? true : recipe.temperatureCategory === temperatureCategory.value)
      && (unitTime.value === 0 ? true : recipe.unitTime === unitTime.value)
      && hasCategories(recipe);
  });
};

const getAllCategories = async() => {
  try {
    const response = await apiGetAllCategories();
    categoriesBackUp.value = response.map((c: IObjectAPI) => ({ label: c.name, value: c.value }));
  } catch (error) {
    console.log(error);
  }
}

const goToShowRecipe = (recipe: IRecipe) => {
  console.log('goToShowRecipe', recipe._id, recipe.title);
};

const openFilters = () => {
  showModalFilters.value = true;
};

const closeModalFilters = (apply: boolean = false, payload: any) => {
  showModalFilters.value = false;

  if (apply) {
    cookingTime.value = payload.cookingTime;
    origin.value = payload.origin;
    originLabel.value = payload.originLabel;
    temperatureCategory.value = payload.temperatureCategory;
    temperatureCategoryLabel.value = payload.temperatureCategoryLabel;
    unitTime.value = payload.unitTime;
    unitTimeLabel.value = payload.unitTimeLabel;
    categories.value = payload.categories;
    categoriesLabels.value = payload.categoriesLabels;
    getFilterRecipes();
  }
};

const deleteLabel = (type: string, typeCategory: string) => {
  const categoryToDelete = typeCategory ? categoriesBackUp.value.find((category: ICategory) => category.label === typeCategory).value : '';
  store.deleteLabel(type, categoryToDelete);
  switch (type) {
    case 'cookingTime':
      cookingTime.value = 0;
      unitTime.value = 0;
      unitTimeLabel.value = '';
      break;
    case 'origin':
      origin.value = '';
      originLabel.value = '';
      break;
    case 'temperatureCategory':
      temperatureCategory.value = 0;
      temperatureCategoryLabel.value = '';
      break;
    case 'categories':
      const cat = categoriesBackUp.value.find((category: ICategory) => category.label === typeCategory);
      categories.value = categories.value.filter((category: number) => category !== cat?.value);
      categoriesLabels.value = categoriesLabels.value.filter((category: string) => category !== typeCategory);
      break;
  }
};

const closeList = () => {
  setTimeout(() => {
    recipesFilter.value = [];
  }, 200);
};

watch(search, () => {
  getFilterRecipes();
});

onMounted(() => {
  Promise.all([
    getAllRecipes(),
    getAllCategories()
  ]);
});
</script>

<template>
  <div class="filter-bar mb-1">
    <div class="filter-bar__search">
      <input type="text" placeholder=" " id="search" v-model="search" class="filter-bar__search--input" autocomplete="off" @blur="closeList">
      <label for="search" class="filter-bar__search--label">{{ $t('buscar') }}</label>
      <div class="filter-bar__search--icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21.172 24l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z"/></svg>
      </div>

      <div v-if="recipesFilter.length" class="filter-bar__search--options">
        <div class="filter-bar__search--options--option" v-for="recipe in recipesFilter" :key="recipe._id" @click.prevent="goToShowRecipe(recipe)">
          <p class="filter-bar__search--options--option--title">{{ recipe.title }}</p>
          <p class="filter-bar__search--options--option--nickname">@nickname</p>
        </div>
      </div>
    </div>
    <div class="filter-bar__filter">
      <div class="filter-bar__icon" @click.prevent="openFilters">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M1 0l9 15.094v5.906l4 3v-8.906l9-15.094h-22zm18.479 2l-2.981 5h-8.996l-2.981-5h14.958z"/></svg>
      </div>
    </div>
  </div>
  <div class="filter-bar-labels mb-1">
    <div v-if="cookingTime" class="filter-bar-labels--label mr-1">
      <p>{{ cookingTime }} {{ unitTimeLabel }}</p>
      <svg @click.prevent="deleteLabel('cookingTime', '')" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 8.933-2.721-2.722c-.146-.146-.339-.219-.531-.219-.404 0-.75.324-.75.749 0 .193.073.384.219.531l2.722 2.722-2.728 2.728c-.147.147-.22.34-.22.531 0 .427.35.75.751.75.192 0 .384-.073.53-.219l2.728-2.728 2.729 2.728c.146.146.338.219.53.219.401 0 .75-.323.75-.75 0-.191-.073-.384-.22-.531l-2.727-2.728 2.717-2.717c.146-.147.219-.338.219-.531 0-.425-.346-.75-.75-.75-.192 0-.385.073-.531.22z" fill-rule="nonzero"/></svg>
    </div>
    <div v-if="origin" class="filter-bar-labels--label mr-1">
      <p>{{ originLabel }}</p>
      <svg @click.prevent="deleteLabel('origin', '')" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 8.933-2.721-2.722c-.146-.146-.339-.219-.531-.219-.404 0-.75.324-.75.749 0 .193.073.384.219.531l2.722 2.722-2.728 2.728c-.147.147-.22.34-.22.531 0 .427.35.75.751.75.192 0 .384-.073.53-.219l2.728-2.728 2.729 2.728c.146.146.338.219.53.219.401 0 .75-.323.75-.75 0-.191-.073-.384-.22-.531l-2.727-2.728 2.717-2.717c.146-.147.219-.338.219-.531 0-.425-.346-.75-.75-.75-.192 0-.385.073-.531.22z" fill-rule="nonzero"/></svg>
    </div>
    <div v-if="temperatureCategory" class="filter-bar-labels--label mr-1">
      <p>{{ temperatureCategoryLabel }}</p>
      <svg @click.prevent="deleteLabel('temperatureCategory', '')" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 8.933-2.721-2.722c-.146-.146-.339-.219-.531-.219-.404 0-.75.324-.75.749 0 .193.073.384.219.531l2.722 2.722-2.728 2.728c-.147.147-.22.34-.22.531 0 .427.35.75.751.75.192 0 .384-.073.53-.219l2.728-2.728 2.729 2.728c.146.146.338.219.53.219.401 0 .75-.323.75-.75 0-.191-.073-.384-.22-.531l-2.727-2.728 2.717-2.717c.146-.147.219-.338.219-.531 0-.425-.346-.75-.75-.75-.192 0-.385.073-.531.22z" fill-rule="nonzero"/></svg>
    </div>
    <template v-if="categories.length">
      <div v-for="c in categoriesLabels.slice(0, 3)" :key="c" class="filter-bar-labels--label mr-1">
        <p>{{ c }}</p>
        <svg @click.prevent="deleteLabel('categories', c)" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 8.933-2.721-2.722c-.146-.146-.339-.219-.531-.219-.404 0-.75.324-.75.749 0 .193.073.384.219.531l2.722 2.722-2.728 2.728c-.147.147-.22.34-.22.531 0 .427.35.75.751.75.192 0 .384-.073.53-.219l2.728-2.728 2.729 2.728c.146.146.338.219.53.219.401 0 .75-.323.75-.75 0-.191-.073-.384-.22-.531l-2.727-2.728 2.717-2.717c.146-.147.219-.338.219-.531 0-.425-.346-.75-.75-.75-.192 0-.385.073-.531.22z" fill-rule="nonzero"/></svg>
      </div>
    </template>
  </div>

  <ModalFilters v-if="showModalFilters" @close="closeModalFilters"/>
</template>