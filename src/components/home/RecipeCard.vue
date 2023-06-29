<script setup lang="ts">
  import { PropType } from 'vue';

  interface IRecipe {
    id: number
    title: string
    description: string
    cookingTime: number
    img: string
  }

  defineProps({
    recipe: { type: Object as PropType<IRecipe>, required: true }
  });
</script>

<template>
  <article class="recipe-card">
    <div class="recipe-card__info">
      <h4>{{ recipe.title }}</h4>
      <p>{{ recipe.description }}</p>
      <span>{{ recipe.cookingTime }}</span>
    </div>
  </article>
</template>