<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { apiGetAllUnitTypes } from "../../config/api/unit-type";

interface IIngredient {
  name: string,
  amount: number,
  type: string
};

interface IObject {
  label: string,
  value: string,
}

const emit = defineEmits(['close', 'add-ingredient']);

const unitTypes = ref<IObject[]>([]);
const ingredient = ref<IIngredient>({
  name: '',
  amount: 0,
  type: ''
});

const getAllUnitTypes = async() => {
  try {
    const response = await apiGetAllUnitTypes();
    unitTypes.value = response.map(u => ({ label: u.name, value: u.value }));
  } catch (error) {
    console.log(error);
  }
}

const addIngredient = () => {
  emit('add-ingredient', ingredient.value);
  ingredient.value = {
    name: '',
    amount: 0,
    type: ''
  }
};

const close = () => { emit('close') };

onMounted(() => {
  getAllUnitTypes();
});
</script>

<template>
  <section class="modal">
    <article class="modal__container">
      <form class="form" @submit.prevent="addIngredient" autocomplete="off">
        <div class="form__row">
          <div class="form__col w-100">
            <label for="ingredientName">Name</label>
            <input type="text" maxlength="50" name="ingredientName" id="ingredientName" v-model="ingredient.name" class="form__input">
          </div>
        </div>
        <div class="form__row">
          <div class="form__col w-100">
            <label for="ingredientAmount">Amount</label>
            <input type="number" min="0" name="ingredientAmount" id="ingredientAmount" v-model="ingredient.amount" class="form__input">
          </div>
        </div>
        <div class="form__col w-100">
          <label for="ingredientType">Type</label>
          <select name="ingredientType" id="ingredientType" v-model="ingredient.type">
            <option v-for="u in unitTypes" :key="u.value" :value="u.label">{{ u.label }}</option>
          </select>
        </div>
        <button type="submit" class="btn btn--md mt-2">Add</button>
      </form>
      <button @click.prevent="close">Close</button>
    </article>
  </section>
</template>