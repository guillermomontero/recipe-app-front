<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { apiGetAllCountries, apiDeleteCountryAdmin } from '../../../config/api/country';
import AdminCountryEdit from '../edit/AdminCountryEdit.vue';
import BaseTable from '../../../components/base/BaseTable.vue';
import BaseDialog from '../../../components/base/BaseDialog.vue';
import BaseBreadcrumbs from '../../../components/base/BaseBreadcrumbs.vue';
import { useI18n } from 'vue-i18n';

interface ICountry {
  _id: string,
  name: string,
  alpha2: string,
  countryCode: string
}

const { t } = useI18n();

const emptyCountry = {
  _id: '',
  name: '',
  alpha2: '',
  countryCode: ''
};

const selectedCountry = ref<ICountry>(emptyCountry);
const selectedItem = ref<string>('');
const dialogText = ref<string>('');
const selectedAction = ref<string>('');
const showDialog = ref<boolean>(false);
const showCountryEdit = ref<boolean>(false);
const data = ref({
  headers: [
    { name: 'name', text: t('nombre'), width: 50, sortable: true, type: 'string' },
    { name: 'alpha2', text: t('alpha2'), width: 50, sortable: true, type: 'number' },
    { name: 'countryCode', text: t('codigoPais'), width: 50, sortable: true, type: 'date' },
  ],
  items: [],
  actions: [
    { name: t('editar'), fn: (e) => editItem(e), icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path><path d="M16 5l3 3"></path></svg>' },
    { name: t('eliminar'), fn: (e) => deleteItem(e), icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M4 7l16 0"></path><path d="M10 11l0 6"></path><path d="M14 11l0 6"></path><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path></svg>' },
  ]
});

const getAllCountries = async () => {
  try {
    const response = await apiGetAllCountries();
    data.value.items = response;
  } catch (err) {
    console.log(err);
  }
};

const editItem = (country: ICountry) => {
  selectedCountry.value = country;
  showCountryEdit.value = true;
};

const deleteItem = (country: ICountry) => {
  selectedItem.value = country._id;
  dialogText.value = t('eliminarPais', { categoria: country.name });
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

const closeCountryEdit = (refresh: boolean = false) => {
  selectedCountry.value = emptyCountry;
  showCountryEdit.value = false;

  if (refresh) getAllCountries();
};

const doDeleteItem = async () => {
  const payload = selectedItem.value;

  try {
    await apiDeleteCountryAdmin(payload);
    selectedItem.value = '';
    getAllCountries();
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getAllCountries();
});
</script>

<template>
  <div class="page-title">
    <h3>{{ t('administracionDePaises') }}</h3>
  </div>
  <BaseBreadcrumbs />
  <section class="admin-view mt-2">
    <BaseTable :BTTable="data" />
  </section>

  <BaseDialog v-if="showDialog" :BDText="dialogText" @close="closeBaseDialog" />
  <AdminCountryEdit v-if="showCountryEdit" :countryID="selectedCountry._id" @close="closeCountryEdit" />
</template>