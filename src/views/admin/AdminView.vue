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
import AdminCardChart from '../../components/admin/AdminCardChart.vue';
import AdminCardSimple from '../../components/admin/AdminCardSimple.vue';

interface IDays {
  _id: string,
  total: number
}

interface ISection {
  id: number,
  range: string[],
  title: string,
  labelTooltip: string,
  total: number,
  totalLastWeek: number,
  data: IDays[]
};

interface ISectionSimple {
  id: number,
  title: string,
  total: number,
};

const { t } = useI18n();
const sectionsCharts = ref<ISection[]>([]);
const sectionsSimple = ref<ISectionSimple[]>([]);

const getUsers = async () => {
  try {
    const response = await apiGetUsersForPanel();
    sectionsCharts.value[0] = response;
  } catch (error) {
    console.log(error)
  }
};

const getRecipes = async () => {
  try {
    const response = await apiGetRecipesForPanel();
    sectionsCharts.value[1] = response;
  } catch (error) {
    console.log(error)
  }
};

const getCategories = async () => {
  try {
    const response = await apiGetCategoriesForPanel();
    sectionsCharts.value[2] = response;
  } catch (error) {
    console.log(error)
  }
};

const getCountries = async () => {
  try {
    const response = await apiGetCountriesForPanel();
    sectionsSimple.value[0] = response;
  } catch (error) {
    console.log(error)
  }
};

const getTemperatureCategories = async () => {
  try {
    const response = await apiGetTemperatureCategoriesForPanel();
    sectionsSimple.value[1] = response;
  } catch (error) {
    console.log(error)
  }
};

const getUnitTimes = async () => {
  try {
    const response = await apiGetUnitTimesForPanel();
    sectionsSimple.value[2] = response;
  } catch (error) {
    console.log(error)
  }
};

const getWeightTypes = async () => {
  try {
    const response = await apiGetWeightTypesForPanel();
    sectionsSimple.value[3] = response;
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
    getWeightTypes(),
  ]);
});
</script>

<template>
  <div class="page-title">
    <h3>{{ t('panelDeAdministracion') }}</h3>
  </div>
  <section class="admin mt-2">
    <template v-for="(section, index) in sectionsCharts" :key="section.id">
      <AdminCardChart :section="section" :class="`admin__box-${index}`" />
    </template>
    <template v-for="(sectionSimple, index) in sectionsSimple" :key="sectionSimple.id">
      <AdminCardSimple :section="sectionSimple" :class="`admin__box-${index + 3}`" />
    </template>
  </section>
</template>