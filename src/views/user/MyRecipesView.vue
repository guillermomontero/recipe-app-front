<script setup lang="ts">
import { onMounted, ref } from "vue";
import { apiGetMyRecipes, apiDoLikeRecipe, apiDoUnlikeRecipe,apiDeleteRecipe } from "../../config/api/recipe";
import { useAuthStore } from '../../store/auth';
import router from "../../router";

interface IRecipe {
  _id: string,
  title: string,
  description: string,
  likes: number
}

const store = useAuthStore();

const recipes = ref<IRecipe[]>([]);

const getMyRecipes = async () => {
  try {
    recipes.value = await apiGetMyRecipes(store.user._id);
  } catch (error) {
    console.log(error)
  }
};

const likeRecipe = async (recipe: IRecipe) => {
  const payload = {
    _id: recipe._id,
    likes: 1
  };

  try {
    await apiDoLikeRecipe(payload);
    getMyRecipes();
  } catch (error) {
    console.log(error)
  }
};

const unlikeRecipe = async (recipe: IRecipe) => {
  const payload = {
    _id: recipe._id,
    likes: 1
  };

  try {
    await apiDoUnlikeRecipe(payload);
    getMyRecipes();
  } catch (error) {
    console.log(error)
  }
};

const editRecipe = (recipe: IRecipe) => {
  router.push({ path: '/new-recipe', query: { m: 'edit', id: recipe._id } });
};

const deleteRecipe = async (recipe: IRecipe) => {
  try {
    await apiDeleteRecipe(recipe._id);
    await getMyRecipes();
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getMyRecipes();
});
</script>

<template>
  <div class="page-title">
    <h3>{{ $t('misRecetas') }}</h3>
  </div>
  <section class="articles mt-2">
    <article class="articles__article" v-for="recipe in recipes" :key="recipe._id">
      <div class="articles__article--title">
        {{ recipe.title }}
      </div>
      <div class="articles__article--description">
        {{ recipe.description }}
      </div>
      <div class="articles__article--rating">
        <div class="articles__article--rating--likes">
          <svg @click.prevent="unlikeRecipe(recipe)" v-if="recipe.likes > 0" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 5.72c-2.624-4.517-10-3.198-10 2.461 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-5.678-7.396-6.944-10-2.461z" fill-rule="nonzero"/></svg>
          <svg @click.prevent="likeRecipe(recipe)" v-else clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m7.234 3.004c-2.652 0-5.234 1.829-5.234 5.177 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-3.353-2.58-5.168-5.229-5.168-1.836 0-3.646.866-4.771 2.554-1.13-1.696-2.935-2.563-4.766-2.563zm0 1.5c1.99.001 3.202 1.353 4.155 2.7.14.198.368.316.611.317.243 0 .471-.117.612-.314.955-1.339 2.19-2.694 4.159-2.694 1.796 0 3.729 1.148 3.729 3.668 0 2.671-2.881 5.673-8.5 11.127-5.454-5.285-8.5-8.389-8.5-11.127 0-1.125.389-2.069 1.124-2.727.673-.604 1.625-.95 2.61-.95z" fill-rule="nonzero"/></svg>
        </div>
      </div>
      <div class="articles__article--actions">
        <button class="btn btn--xs btn--edit mr-1" @click.prevent="editRecipe(recipe)">{{ $t('editar') }}</button>
        <button class="btn btn--xs btn--delete" @click.prevent="deleteRecipe(recipe)">{{ $t('eliminar') }}</button>
      </div>
    </article>
  </section>
</template>