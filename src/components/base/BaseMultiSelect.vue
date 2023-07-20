<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from "vue";

interface Data {
  label: string,
  value: number,
  selected: boolean
};

const props = defineProps<{
  BMSData: Data[],
  BMSLabel: String
}>();

const emit = defineEmits(['selected-values']);

watch(() => props.BMSData, (first, second) => {
  filterList.value = first;
});

const selectedValues = ref<number[]>([]);
const filterList = ref<object[]>([]);
const textValue = ref<string>('');
const showOptions = ref<boolean>(false);

const selectedValuesComp = computed(() => {
  const textArray = [];

  selectedValues.value.forEach(element => {
    textArray.push(props.BMSData.find(item => item.value === element).label);
  });

  return textArray.join(', ');
})

const filterOptions = (e) => {
  e.preventDefault();

  filterList.value = props.BMSData.filter(item => item.label.toLowerCase().startsWith(textValue.value.toLowerCase()));
};

const checkValue = (val: number = 0): void => {
  if (selectedValues.value.indexOf(val) === -1) {
    selectedValues.value.push(val);
  } else {
    const exist = (element: number = 0) => element === val;
    const idx = selectedValues.value.findIndex(exist);

    selectedValues.value.splice(idx, 1);
  }

  emit('selected-values', selectedValues.value);
};

window.addEventListener('click', (e) => {
  if (document.getElementById('multi-select')?.contains(e.target)) {
    showOptions.value = true;
  } else {
    textValue.value = '';
    filterList.value = props.BMSData;
    showOptions.value = false;
  }
});

onUnmounted(() => {
  textValue.value = '';
  filterList.value = props.BMSData;
  showOptions.value = false;
});
</script>

<template>
  <div class="multi-select" id="multi-select">
    <label for="baseInputText">{{ BMSLabel }}</label>
    <input v-if="showOptions" type="text" name="baseInputText" id="baseInputText" v-model="textValue" class="multi-select__input" @input="filterOptions" autofocus="autofocus">
    <input v-else type="text" name="textComputed" id="textComputed" v-model="selectedValuesComp" class="multi-select__input">
    <div class="multi-select__items" :class="{ 'multi-select__items--show': showOptions }">
      <div class="multi-select__items--add-new">+ Add</div>
      <div v-for="(item, index) in filterList" :key="index" class="multi-select__items--options">
        <input type="checkbox" name="baseInputCheckbox" :id="`baseInputCheckbox-${index}`" @click="checkValue(item.value)" v-model="item.selected">
        <label :for="`baseInputCheckbox-${index}`">{{ item.label }}</label>
      </div>
    </div>
  </div>
</template>