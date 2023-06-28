<script setup lang="ts">
  import { PropType } from 'vue';

  interface IRecipe {
    id: number
    title: string
    description: string
    cookingTime: number
  }

  defineProps({
    recipe: { type: Object as PropType<IRecipe>, required: true }
  });
</script>

<template>
  <article class="recipe-card">
    <h3>{{ recipe.title }}</h3>
    <p>{{ recipe.description }}</p>
    <span>{{ recipe.cookingTime }}</span>
  </article>
</template>