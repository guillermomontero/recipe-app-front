<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { apiGetUsersForPanel } from '../../config/api/user';
import { apiGetRecipesForPanel } from '../../config/api/recipe';
import { apiGetCategoriesForPanel } from '../../config/api/category';
import { apiGetCountriesForPanel } from '../../config/api/country';
import { apiGetTemperatureCategoriesForPanel } from '../../config/api/temperature-category';
import { apiGetUnitTimesForPanel } from '../../config/api/unit-time';
import { apiGetWeightTypesForPanel } from '../../config/api/weight-type';
import AdminCard from '../../components/admin/AdminCard.vue';

interface IDays {
  _id: string,
  total: number
}

interface ISection {
  id: number,
  title: string,
  page: string,
  total: number,
  showChart: boolean,
  order: number,
  labelTooltip?: string,
  range?: string[],
  totalLastWeek?: number,
  data?: IDays[]
};

const { t } = useI18n();
const renderGrid = ref<Boolean>(false);
const sections = ref<ISection[]>([]);

const getUsers = async () => {
  try {
    const response = await apiGetUsersForPanel();
    sections.value[response.order - 1] = response;
  } catch (error) {
    console.log(error)
  }
};

const getRecipes = async () => {
  try {
    const response = await apiGetRecipesForPanel();
    sections.value[response.order - 1] = response;
  } catch (error) {
    console.log(error)
  }
};

const getCategories = async () => {
  try {
    const response = await apiGetCategoriesForPanel();
    sections.value[response.order - 1] = response;
  } catch (error) {
    console.log(error)
  }
};

const getCountries = async () => {
  try {
    const response = await apiGetCountriesForPanel();
    sections.value[response.order - 1] = response;
  } catch (error) {
    console.log(error)
  }
};

const getTemperatureCategories = async () => {
  try {
    const response = await apiGetTemperatureCategoriesForPanel();
    sections.value[response.order - 1] = response;
  } catch (error) {
    console.log(error)
  }
};

const getUnitTimes = async () => {
  try {
    const response = await apiGetUnitTimesForPanel();
    sections.value[response.order - 1] = response;
  } catch (error) {
    console.log(error)
  }
};

const getWeightTypes = async () => {
  try {
    const response = await apiGetWeightTypesForPanel();
    sections.value[response.order - 1] = response;
  } catch (error) {
    console.log(error)
  }
};

onMounted(() => {
  Promise.all([
    getUsers(),
    getRecipes(),
    getCategories(),
    getCountries(),
    getTemperatureCategories(),
    getUnitTimes(),
    getWeightTypes()
  ])
    .then(() => {
      renderGrid.value = true;
    })
});
</script>

<template>
  <div class="page-title">
    <h3>{{ t('panelDeAdministracion') }}</h3>
  </div>
  <section class="admin mt-2">
    <AdminCard v-if="renderGrid" v-for="(section, index) in sections" :key="index" :section="section" :class="`admin__box-${String(section.order)}`" />
  </section>
</template>