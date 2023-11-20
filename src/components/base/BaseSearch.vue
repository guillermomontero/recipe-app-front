<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const emits = defineEmits(['filter-list']);
const props = defineProps<{
  items: any,
  filterValue: string,
}>();

const { t } = useI18n();
const search = ref<string>('');
const listComputed = ref<[]>([]);

const filterList = (value) => {
  listComputed.value = props.items.filter(item => item[props.filterValue].toLowerCase().includes(value.toLowerCase()));

  emits('filter-list', listComputed.value);
}

watch(search, (value) => {
  filterList(value)
});

onMounted(() => {
  listComputed.value = props.items
});
</script>

<template>
  <div class="filter-bar mb-1">
    <div class="filter-bar__search">
      <input type="text" placeholder=" " id="search" v-model="search" class="filter-bar__search--input" autocomplete="off">
      <label for="search" class="filter-bar__search--label">{{ t('buscar') }}</label>
      <div class="filter-bar__search--icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21.172 24l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z"/></svg>
      </div>
    </div>
  </div>
</template>