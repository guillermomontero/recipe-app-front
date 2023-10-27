<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import router from '../../router';

interface IDataBreadcrumb {
  text: string,
  active: boolean,
  route: string
}

const { t } = useI18n();

const route = useRoute();
const data = ref<IDataBreadcrumb[]>([]);

const fillData = () => {
  if (route.meta.isParent) {
    data.value = [
      { text: t(route.name), active: true, route: route.path }
    ]
  }
  
  if (route.meta.isChildren) {
    data.value = [
      { text: t(route.meta.parentName), active: false, route: route.meta.parentRoute },
      { text: t(route.name), active: true, route: route.path },
    ]
  }
};

const goToRoute = (routeToGo: string) => {
  if (route.path === routeToGo) return;
  router.push(routeToGo);
}

onMounted(() => {
  fillData();
});
</script>

<template>
  <nav class="base-breadcrumbs mt-2">
    <a v-for="(item, index) in data" :key="index" class="base-breadcrumbs__item" :class="{ 'base-breadcrumbs__item--active': item.active }" @click="goToRoute(item.route)">{{ item.text }}</a>
  </nav>
</template>