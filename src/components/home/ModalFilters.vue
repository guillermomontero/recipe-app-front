<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useFilterBarStore } from '../../store/filter-bar';
import { apiGetAllTemperatureCategories } from "../../config/api/temperature-category";
import { apiGetAllCategories } from '../../config/api/category';
import { apiGetAllCountries } from "../../config/api/country";
import { apiGetAllUnitTimes } from "../../config/api/unit-time";
import BaseMultiSelect from '../../components/base/BaseMultiSelect.vue';

const storeFilterBar = useFilterBarStore();

interface IObject {
  label: string,
  value: number,
};

interface IObjectCountry {
  label: string,
  value: string,
};

interface IObjectAPI {
  name: string,
  value: string,
  countryCode?: string
};

interface ICategory {
  label: string,
  value: number,
  selected: boolean
};

const emit = defineEmits(['close']);

const temperatureCategories = ref<IObject[]>([]);
const countries = ref<IObjectCountry[]>([]);
const categories = ref<ICategory[]>([]);
const unitTimes = ref<IObject[]>([]);
const cookingTimeSelected = ref<number>(0);
const originSelected = ref<string>('');
const temperatureCategorySelected = ref<number>(0);
const unitTimeSelected = ref<number>(0);
const categoriesSelected = ref<number[]>([]);

const getAllTemperatureCategories = async() => {
  try {
    const response = await apiGetAllTemperatureCategories();
    temperatureCategories.value = response.map((tc: IObjectAPI) => ({ label: tc.name, value: tc.value }));
  } catch (error) {
    console.log(error);
  }
}

const getAllCountries = async() => {
  try {
    const response = await apiGetAllCountries();
    countries.value = response.map((c: IObjectAPI) => ({ label: c.name, value: c.countryCode }));
  } catch (error) {
    console.log(error);
  }
}

const getAllCategories = async() => {
  try {
    const response = await apiGetAllCategories();
    categories.value = response.map((c: IObjectAPI) => ({ label: c.name, value: c.value, selected: false  }));
  } catch (error) {
    console.log(error);
  }
}

const getAllUnitTimes = async() => {
  try {
    const response = await apiGetAllUnitTimes();
    unitTimes.value = response.map((u: IObjectAPI) => ({ label: u.name, value: u.value }));
  } catch (error) {
    console.log(error);
  }
};

const updateSelectedCategories = (categories: number[] = []) => {
  storeFilterBar.setCategories(categories);
};

const close = (apply: boolean = false) => {
  const payload = {
    cookingTime: storeFilterBar.cookingTime,
    origin: storeFilterBar.origin,
    temperatureCategory: storeFilterBar.temperatureCategory,
    unitTime: storeFilterBar.unitTime,
    categories: storeFilterBar.categories
  };

  emit('close', apply,  payload);
};

onMounted(async () => {
  await Promise.all([
    getAllTemperatureCategories(),
    getAllCountries(),
    getAllCategories(),
    getAllUnitTimes()
  ]);

  categories.value.forEach((c: ICategory)  => {
    if (storeFilterBar.categories.indexOf(c.value) !== -1) c.selected = true;
  });
});

</script>

<template>
  <section class="modal">
    <article class="modal__container w-50">
      <div class="modal__container--close">
        <svg @click.prevent="close(false)" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 8.933-2.721-2.722c-.146-.146-.339-.219-.531-.219-.404 0-.75.324-.75.749 0 .193.073.384.219.531l2.722 2.722-2.728 2.728c-.147.147-.22.34-.22.531 0 .427.35.75.751.75.192 0 .384-.073.53-.219l2.728-2.728 2.729 2.728c.146.146.338.219.53.219.401 0 .75-.323.75-.75 0-.191-.073-.384-.22-.531l-2.727-2.728 2.717-2.717c.146-.147.219-.338.219-.531 0-.425-.346-.75-.75-.75-.192 0-.385.073-.531.22z" fill-rule="nonzero"/></svg>
      </div>
      <form class="form" autocomplete="off">
        <div class="form__row">
          <div class="form__col w-50 mr-2">
            <input type="number" min="0" placeholder=" " id="cookingTimeFilter" v-model="storeFilterBar.cookingTime" class="form__input" autocomplete="new-password">
            <label for="cookingTimeFilter" class="form__label">{{ $t('tiempoDeCocinado') }}</label>
          </div>
          <div class="form__col w-50">
            <select placeholder=" " id="unitTimeFilter" v-model="storeFilterBar.unitTime" class="form__input">
              <option disabled value="0" hidden>{{ $t('selecciona') }}</option>
              <option v-for="u in unitTimes" :key="u.value" :value="u.value">{{ u.label }}</option>
            </select>
            <label for="unitTimeFilter" class="form__label">{{ $t('unidadDeTiempo') }}</label>
          </div>
        </div>
        <div class="form__row">
          <div class="form__col w-100">
            <select placeholder=" " id="temperatureCategoryFilter" v-model="storeFilterBar.temperatureCategory" class="form__input">
              <option disabled value="0" hidden>{{ $t('selecciona') }}</option>
              <option v-for="tc in temperatureCategories" :key="tc.value" :value="tc.value">{{ tc.label }}</option>
            </select>
            <label for="temperatureCategoryFilter" class="form__label">{{ $t('temperatura') }}</label>
          </div>
        </div>
        <div class="form__row">
          <div class="form__col w-100">
            <BaseMultiSelect :BMSData="categories" :BMSLabel="'Categories'" :BMSAllowAddItem="false" :BMSBoxHeight="120" @selected-values="updateSelectedCategories" />
          </div>
        </div>
        <div class="form__row">
          <div class="form__col w-100">
            <select placeholder=" " id="countriesFilter" v-model="storeFilterBar.origin" class="form__input">
              <option disabled value="" hidden>{{ $t('selecciona') }}</option>
              <option v-for="c in countries" :key="c.value" :value="c.value">{{ c.label }}</option>
            </select>
            <label for="countriesFilter" class="form__label">{{ $t('pais') }}</label>
          </div>
        </div>
        <div>
          <button class="btn btn--md btn--edit" @click.prevent="close(true)">{{ $t('aplicar') }}</button>
          <button class="btn btn--md btn--edit" @click.prevent="storeFilterBar.clearFilters">{{ $t('limpiar') }}</button>
        </div>
      </form>
    </article>
  </section>
</template>