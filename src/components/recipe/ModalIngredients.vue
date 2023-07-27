<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { apiGetAllWeightTypes } from "../../config/api/weight-type";

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
  type: 'Milliliters'
});

const getAllWeightTypes = async() => {
  try {
    const response = await apiGetAllWeightTypes();
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
    type: 'Milliliters'
  }
};

const close = () => { emit('close') };

onMounted(() => {
  getAllWeightTypes();
});
</script>

<template>
  <section class="modal">
    <article class="modal__container w-40">
      <div class="modal__container--close">
        <svg @click.prevent="close" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 8.933-2.721-2.722c-.146-.146-.339-.219-.531-.219-.404 0-.75.324-.75.749 0 .193.073.384.219.531l2.722 2.722-2.728 2.728c-.147.147-.22.34-.22.531 0 .427.35.75.751.75.192 0 .384-.073.53-.219l2.728-2.728 2.729 2.728c.146.146.338.219.53.219.401 0 .75-.323.75-.75 0-.191-.073-.384-.22-.531l-2.727-2.728 2.717-2.717c.146-.147.219-.338.219-.531 0-.425-.346-.75-.75-.75-.192 0-.385.073-.531.22z" fill-rule="nonzero"/></svg>
      </div>
      <form class="form" @submit.prevent="addIngredient" autocomplete="off">
        <div class="form__row">
          <div class="form__col w-100">
            <input type="text" maxlength="50" placeholder=" " name="ingredientName" id="ingredientName" v-model="ingredient.name" class="form__input">
            <label for="ingredientName" class="form__label">Name</label>
          </div>
        </div>
        <div class="form__row">
          <div class="form__col w-100">
            <input type="number" min="0" placeholder=" " name="ingredientAmount" id="ingredientAmount" v-model="ingredient.amount" class="form__input">
            <label for="ingredientAmount" class="form__label">Amount</label>
          </div>
        </div>
        <div class="form__col w-100">
          <select placeholder=" " name="ingredientType" id="ingredientType" v-model="ingredient.type" class="form__input">
            <option v-for="u in unitTypes" :key="u.value" :value="u.label">{{ u.label }}</option>
          </select>
          <label for="ingredientType" class="form__label">Type</label>
        </div>
        <button type="submit" class="btn btn--md mt-2">Add</button>
      </form>
    </article>
  </section>
</template>