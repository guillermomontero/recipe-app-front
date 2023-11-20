<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { formatDateFront } from '../../config/utils/dates';
import { formatHourFront } from '../../config/utils/hours';
import BaseTooltipIcon from './BaseTooltipIcon.vue';
import BaseTableSearch from './BaseTableSearch.vue';
import { ITable } from '../../../types';
import { ref, watch } from 'vue';

const props = defineProps<{
  BTTable: ITable,
}>();

const { t } = useI18n();

const itemsComp = ref(props.BTTable.items);

const filterList = (value) => {
  itemsComp.value = value;
};

watch(props.BTTable.items, (value) => {
  console.log(value);
  itemsComp.value = value
});
</script>

<template>
  <BaseTableSearch :items="props.BTTable.items" @filter-list="filterList" />
  <table class="base-table">
    <thead>
      <tr>
        <th v-if="props.BTTable.actions.length"></th>
        <th v-for="(header, index) in props.BTTable.headers" :key="index">{{ header.text }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in itemsComp" :key="index">
        <td v-if="props.BTTable.actions.length">
          <div style="display: flex">
            <span v-for="(action, index) in props.BTTable.actions" :key="index" style="margin-right: 1em; cursor: pointer;" :alt="action.name" @click="action.fn(row)">
              <BaseTooltipIcon :BTTItem="{ icon: action.icon, tooltip: action.name }" />
            </span>
          </div>
        </td>
        <td v-for="(h, indexH) in props.BTTable.headers" :key="indexH">
          <span v-if="h.type === 'date'">{{ formatDateFront(row[h.name]) }}</span>
          <span v-else-if="h.type === 'hour'">{{ formatHourFront(row[h.name]) }}</span>
          <span v-else-if="h.type === 'boolean'">{{ row[h.name] ? t('si') : t('no') }}</span>
          <span v-else>{{ row[h.name] }}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>