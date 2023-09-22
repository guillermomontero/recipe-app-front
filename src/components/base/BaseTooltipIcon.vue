<script setup lang="ts">
interface ITooltipIcon {
  icon: string,
  tooltip: string,
};


const props = defineProps<{
  BTTItem: ITooltipIcon,
}>();
</script>

<template>
  <div class="tooltip">
    <span class="tooltip__icon" v-html="props.BTTItem.icon"></span>
    <span class="tooltip__text">{{ props.BTTItem.tooltip }}</span>
  </div>
</template>