<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { apiGetAllCategories, apiDeleteCategoryAdmin } from '../../../config/api/category';
import AdminCategoryEdit from '../edit/AdminCategoryEdit.vue';
import BaseTable from '../../../components/base/BaseTable.vue';
import BaseDialog from '../../../components/base/BaseDialog.vue';
import BaseBreadcrumbs from '../../../components/base/BaseBreadcrumbs.vue';
import { useI18n } from 'vue-i18n';

interface ICategory {
  _id: string,
  name: string,
  value: number,
  createDate: string
}

const { t } = useI18n();

const emptyCategory = {
  _id: '',
  name: '',
  value: 0,
  createDate: ''
};

const selectedCategory = ref<ICategory>(emptyCategory);
const selectedItem = ref<string>('');
const dialogText = ref<string>('');
const selectedAction = ref<string>('');
const showDialog = ref<boolean>(false);
const showCategoryEdit = ref<boolean>(false);
const data = ref({
  headers: [
    { name: 'name', text: t('nombre'), width: 50, sortable: true, type: 'string' },
    { name: 'value', text: t('Valor'), width: 50, sortable: true, type: 'number' },
    { name: 'createDate', text: t('fechaCreacion'), width: 50, sortable: true, type: 'date' },
  ],
  items: [],
  actions: [
    { name: t('editar'), fn: (e) => editItem(e), icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path><path d="M16 5l3 3"></path></svg>' },
    { name: t('eliminar'), fn: (e) => deleteItem(e), icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M4 7l16 0"></path><path d="M10 11l0 6"></path><path d="M14 11l0 6"></path><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path></svg>' },
  ]
});

const getAllCategories = async () => {
  try {
    const response = await apiGetAllCategories();
    data.value.items = response;
  } catch (err) {
    console.log(err);
  }
};

const editItem = (category: ICategory) => {
  selectedCategory.value = category;
  showCategoryEdit.value = true;
};

const deleteItem = (category: ICategory) => {
  selectedItem.value = category._id;
  dialogText.value = t('eliminarCategoria', { categoria: category.name });
  selectedAction.value = 'delete';
  showDialog.value = true;
};

const closeBaseDialog = (value: boolean = false) => {
  if (value) continueAction(selectedAction.value);
  showDialog.value = false;
  dialogText.value = '';
  selectedAction.value = '';
};

const continueAction = (action: string = '') => {
  switch (action) {
    case 'delete':
      doDeleteItem();
      break;

    default:
      break;
  }
};

const closeCategoryEdit = (refresh: boolean = false) => {
  selectedCategory.value = emptyCategory;
  showCategoryEdit.value = false;

  if (refresh) getAllCategories();
};

const doDeleteItem = async () => {
  const payload = selectedItem.value;

  try {
    await apiDeleteCategoryAdmin(payload);
    selectedItem.value = '';
    getAllCategories();
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getAllCategories();
});
</script>

<template>
  <div class="page-title">
    <h3>{{ t('administracionDeCategorias') }}</h3>
  </div>
  <BaseBreadcrumbs />
  <section class="admin-view mt-2">
    <BaseTable :BTTable="data" />
  </section>

  <BaseDialog v-if="showDialog" :BDText="dialogText" @close="closeBaseDialog" />
  <AdminCategoryEdit v-if="showCategoryEdit" :categoryID="selectedCategory._id" @close="closeCategoryEdit" />
</template>