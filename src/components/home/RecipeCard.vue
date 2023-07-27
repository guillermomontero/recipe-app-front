<script setup lang="ts">
  import { onMounted, ref, PropType } from 'vue';
  import { apiGetAllCountries } from '../../config/api/country';

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

  defineProps({
    recipe: { type: Object as PropType<IRecipe>, required: true }
  });

  const countries = ref<ICountry[]>([]);

  const getAllCountries = async () => {
    try {
      const response = await apiGetAllCountries();
      countries.value = response;
    } catch (error) {
      console.log(error);
    }
  };

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
    return countries.value.find(country => country.countryCode === origin)?.alpha2;
  }

  onMounted(() => {
    getAllCountries();
  });
</script>

<template>
  <article class="recipe-card">
    <div class="recipe-card__info">
      <div class="recipe-card__info--cooking">
        <div class="recipe-card__info--cooking--temperature" :class="getClassTemperature(recipe.temperatureCategory)"></div>
        <div class="recipe-card__info--cooking--timing">{{ recipe.cookingTime }} {{ getUnitTimes(recipe.unitTime) }}</div>
        <div class="recipe-card__info--cooking--origin">{{ getOrigin(recipe.origin) }}</div>
      </div>
      <div class="recipe-card__info--likes">
        <p>💚 {{ recipe.likes }}</p>
      </div>
      <div class="recipe-card__info--categories">
        <p>{{ recipe.categories[0] }}</p>
        <p>{{ recipe.categories[1] }}</p>
      </div>
      <span>{{ recipe.author.name }} {{ recipe.author.lastName }}</span>
      <h4>{{ recipe.title }}</h4>
      <p>{{ recipe.description }}</p>
      <span>{{ recipe.cookingTime }} min.</span>
    </div>
  </article>
</template>