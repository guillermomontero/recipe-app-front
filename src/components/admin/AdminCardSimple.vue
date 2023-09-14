<script setup lang="ts">
import { useI18n } from 'vue-i18n';

interface ISectionSimple {
  id: number,
  title: string,
  total: number,
};

const props = defineProps<{ section: ISectionSimple }>();

const { t } = useI18n();
</script>

<template>
  <article class="admin-card">
    <div class="admin-card__row">
      <div class="admin-card__row--title">
        {{ t(props.section.title) }}
      </div>
      <div class="admin-card__row--total">
        <span class="admin-card__row--total--text">Total:</span> <span class="admin-card__row--total--number">{{ props.section.total }}</span>
      </div>
    </div>
    <div class="admin-card--divider"></div>
    <div class="admin-card__actions mt-1">
      <button class="btn btn--xs btn--edit mr-1">⚙️ Gestionar</button>
      <button class="btn btn--xs btn--edit">➕ Añadir</button>
    </div> 
  </article>
</template>