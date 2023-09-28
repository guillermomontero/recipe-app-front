<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { apiGetCountry, apiEditCountryAdmin } from '../../../config/api/country';

interface ICountry {
  _id: string,
  name: string,
  alpha2: string,
  countryCode: string
}

const emit = defineEmits(['close']);
const props = defineProps({
  countryID: String,
});

const { t } = useI18n();
const country = ref<ICountry>({
  _id: '',
  name: '',
  alpha2: '',
  countryCode: ''
});

const getCountry = async () => {
  try {
    const response = await apiGetCountry(props.countryID);
    country.value = { ...response }
  } catch (error) {
    console.log(error);
  }
}

const editCountryAdmin = async () => {
  const payload = {
    _id: country.value._id,
    name: country.value.name
  };

  try {
    await apiEditCountryAdmin(payload);
    close(true);
  } catch (error) {
    console.log(error);
  }
};

const close = (refresh: boolean = false) => { emit('close', refresh) };

onMounted(() => {
  getCountry();
});

</script>

<template>
  <section class="modal">
    <article class="modal__container w-40">
      <div class="modal__container--close">
        <svg @click.prevent="close(false)" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 8.933-2.721-2.722c-.146-.146-.339-.219-.531-.219-.404 0-.75.324-.75.749 0 .193.073.384.219.531l2.722 2.722-2.728 2.728c-.147.147-.22.34-.22.531 0 .427.35.75.751.75.192 0 .384-.073.53-.219l2.728-2.728 2.729 2.728c.146.146.338.219.53.219.401 0 .75-.323.75-.75 0-.191-.073-.384-.22-.531l-2.727-2.728 2.717-2.717c.146-.147.219-.338.219-.531 0-.425-.346-.75-.75-.75-.192 0-.385.073-.531.22z" fill-rule="nonzero"/></svg>
      </div>
      <form class="form" autocomplete="off">
        <div class="form__row">
          <div class="form__col w-100">
            <input type="text" maxlength="50" placeholder=" " id="countryName" v-model="country.name" class="form__input">
            <label for="countryName" class="form__label">{{ t('nombre') }}</label>
          </div>
        </div>
        <div class="form__row">
          <div class="form__col w-100">
            <input type="text" maxlength="50" placeholder=" " id="countryAlpha2" v-model="country.alpha2" class="form__input" readonly>
            <label for="countryAlpha2" class="form__label">{{ t('alpha2') }}</label>
          </div>
        </div>
        <div class="form__row">
          <div class="form__col w-100">
            <input type="text" maxlength="50" placeholder=" " id="countryCode" v-model="country.countryCode" class="form__input" readonly>
            <label for="countryCode" class="form__label">{{ t('codigoPais') }}</label>
          </div>
        </div>
        <div class="form__row--divider"></div>
        <div>
          <button class="btn btn--md  btn--delete mr-1" @click.prevent="close(false)">{{ t('cancelar') }}</button>
          <button class="btn btn--md  btn--accept" @click.prevent="editCountryAdmin">{{ t('guardar') }}</button>
        </div>
      </form>
    </article>
  </section>
</template>