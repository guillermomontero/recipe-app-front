<script setup lang="ts">
  import { onMounted, ref, PropType } from 'vue';
  import router from '../../router';

  interface IRecipe {
    _id: number,
    title: string,
    description: string,
    cookingTime: number,
    unitTime: number,
    img: string,
    temperatureCategory: number,
    origin: string,
    categories: number[],
    author: {
      _id: string,
      nickname: string,
      name: string,
      lastName: string
    },
    likes: number
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

  const props = defineProps({
    countries: { type: Array as PropType<ICountry[]>, required: true },
    categories: { type: Array as PropType<ICategory[]>, required: true },
    recipe: { type: Object as PropType<IRecipe>, required: true }
  });

  const recipeCategories = ref<string[]>([]);

  const getClassTemperature = (temperature: number) => {
    switch (temperature) {
      case 1:
        return 'recipe-card__info--cooking--temperature--hot';
      case 2:
        return 'recipe-card__info--cooking--temperature--warm';
      case 3:
        return 'recipe-card__info--cooking--temperature--cold';
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
    return props.countries.find(country => country.countryCode === origin)?.alpha2;
  };

  const goToRecipeView = () => {
    router.push({ name: 'recipe', query: { id: props.recipe._id } });
  };

  onMounted(() => {
    recipeCategories.value = props.categories.filter((c:ICategory) => props.recipe.categories.includes(c.value)).map((c:ICategory) => c.label);
  });
</script>

<template>
  <article class="recipe-card" @click="goToRecipeView">
    <div class="recipe-card__info">
      <div class="recipe-card__info--cooking">
        <div class="recipe-card__info--cooking--temperature" :class="getClassTemperature(recipe.temperatureCategory)"></div>
        <div class="recipe-card__info--cooking--timing">{{ recipe.cookingTime }} {{ getUnitTimes(recipe.unitTime) }}</div>
        <div class="recipe-card__info--cooking--origin">{{ getOrigin(recipe.origin) }}</div>
      </div>
      <div class="recipe-card__info--likes">
        <span>❤️ {{ recipe.likes }}</span>
      </div>
      <div class="recipe-card__info--categories">
        <span v-for="category in recipeCategories" :key="category">{{ category }}</span>
      </div>
      <span>@{{ recipe.author.nickname }}</span>
      <h4>{{ recipe.title }}</h4>
      <p>{{ recipe.description }}</p>
    </div>
  </article>
</template>