<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { apiGetAllRecipes, apiDeleteRecipeAdmin } from '../../../config/api/recipe';
import AdminRecipeEdit from '../edit/AdminRecipeEdit.vue';
import BaseTable from '../../../components/base/BaseTable.vue';
import BaseDialog from '../../../components/base/BaseDialog.vue';
import BaseBreadcrumbs from '../../../components/base/BaseBreadcrumbs.vue';
import { useI18n } from 'vue-i18n';

interface IRecipe {
  _id: string,
  title: string,
  origin: string,
  cookingTime: number,
  unitTime: number,
  temperatureCategory: number,
  portions: number,
  likes: number,
  createDate: string,
  createTime: string,
  draft: boolean,
  ingredients: boolean,
  categories: boolean,
  description: boolean,
  steps: boolean,
  photo: boolean
}

const { t } = useI18n();

const emptyRecipe = {
  _id: '',
  title: '',
  origin: '',
  cookingTime: 0,
  unitTime: 0,
  temperatureCategory: 0,
  portions: 0,
  likes: 0,
  createDate: '',
  createTime: '',
  draft: false,
  ingredients: false,
  categories: false,
  description: false,
  steps: false,
  photo: false
};

const selectedRecipe = ref<IRecipe>(emptyRecipe);
const selectedItem = ref<string>('');
const dialogText = ref<string>('');
const selectedAction = ref<string>('');
const showDialog = ref<boolean>(false);
const showRecipeEdit = ref<boolean>(false);
const data = ref({
  headers: [
    { name: 'title', text: t('titulo'), width: 50, sortable: true, type: 'string' },
    { name: 'origin', text: t('origen'), width: 50, sortable: true, type: 'string' },
    { name: 'cookingTime', text: t('tiempoDeCocinado'), width: 50, sortable: true, type: 'number' },
    { name: 'unitTime', text: t('unidad'), width: 50, sortable: true, type: 'number' },
    { name: 'temperatureCategory', text: t('temperatura'), width: 50, sortable: true, type: 'number' },
    { name: 'portions', text: t('raciones'), width: 50, sortable: true, type: 'number' },
    { name: 'likes', text: t('likes'), width: 50, sortable: true, type: 'number' },
    { name: 'createDate', text: t('fechaCreacion'), width: 50, sortable: true, type: 'date' },
    { name: 'createTime', text: t('horaCreacion'), width: 50, sortable: true, type: 'hour' },
    { name: 'draft', text: t('borrador'), width: 50, sortable: true, type: 'boolean' },
    { name: 'ingredients', text: t('ingredientes'), width: 50, sortable: true, type: 'boolean' },
    { name: 'categories', text: t('categorias'), width: 50, sortable: true, type: 'boolean' },
    { name: 'description', text: t('descripcion'), width: 50, sortable: true, type: 'boolean' },
    { name: 'steps', text: t('instrucciones'), width: 50, sortable: true, type: 'boolean' },
    { name: 'photo', text: t('foto'), width: 50, sortable: true, type: 'boolean' },
  ],
  items: [],
  actions: [
    { name: t('eliminar'), fn: (e) => deleteItem(e), icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M4 7l16 0"></path><path d="M10 11l0 6"></path><path d="M14 11l0 6"></path><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path></svg>' },
  ]
});

const getAllRecipes = async () => {
  const payload = {
    skip: 0,
    limit: 9
  };

  try {
    const response = await apiGetAllRecipes(payload);
    data.value.items = response;
  } catch (err) {
    console.log(err);
  }
}

const deleteItem = (recipe: IRecipe) => {
  selectedItem.value = recipe._id;
  dialogText.value = t('eliminarReceta', { receta: recipe.title });
  selectedAction.value = 'delete';
  showDialog.value = true;
}

const closeBaseDialog = (value: boolean = false) => {
  if (value) continueAction(selectedAction.value);
  showDialog.value = false;
  dialogText.value = '';
  selectedAction.value = '';
}

const continueAction = (action: string = '') => {
  switch (action) {
    case 'delete':
      doDeleteItem();
      break;

    default:
      break;
  }
}

const doDeleteItem = async () => {
  const payload = selectedItem.value;

  try {
    await apiDeleteRecipeAdmin(payload);
    selectedItem.value = '';
    getAllRecipes();
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  getAllRecipes();
})
</script>

<template>
  <div class="page-title">
    <h3>{{ t('administracionDeRecetas') }}</h3>
  </div>

  <BaseBreadcrumbs />

  <section class="admin-view mt-2">
    <BaseTable v-if="data.items.length" :BTTable="data" />
  </section>

  <BaseDialog v-if="showDialog" :BDText="dialogText" @close="closeBaseDialog" />
  <AdminRecipeEdit v-if="showRecipeEdit" :recipeID="selectedRecipe._id" @close="closeRecipeEdit" />
</template>