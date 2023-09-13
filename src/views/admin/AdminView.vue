<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { apiGetUsersForPanel } from '../../config/api/user';
import { apiGetRecipesForPanel } from '../../config/api/recipe';
import { apiGetCategoriesForPanel } from '../../config/api/category';
import AdminCard from '../../components/admin/AdminCard.vue';

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
}

const { t } = useI18n();
const sections = ref<ISection[]>([]);

const getUsers = async () => {
  try {
    const response = await apiGetUsersForPanel();
    sections.value[0] = response;
  } catch (error) {
    console.log(error)
  }
};

const getRecipes = async () => {
  try {
    const response = await apiGetRecipesForPanel();
    sections.value[1] = response;
  } catch (error) {
    console.log(error)
  }
};

const getCategories = async () => {
  try {
    const response = await apiGetCategoriesForPanel();
    sections.value[2] = response;
  } catch (error) {
    console.log(error)
  }
};

onMounted(() => {
  Promise.all([
    getUsers(),
    getRecipes(),
    getCategories(),
  ]);
});
</script>

<template>
  <div class="page-title">
    <h3>{{ t('panelDeAdministracion') }}</h3>
  </div>
  <section class="admin mt-2">
    <template v-for="(section, index) in sections" :key="section.title">
      <AdminCard :section="section" :class="`admin__box-${index}`" />
    </template>
  </section>
</template>