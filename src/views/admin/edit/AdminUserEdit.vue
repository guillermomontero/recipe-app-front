<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { formatDateToClient, formatDateToInput } from '../../../config/utils/dates';
import { apiGetUser, apiEditUserAdmin } from '../../../config/api/user';

interface Location {
  address: string,
  city: string,
  country: string,
  postCode: number,
  state: string,
}

interface IUser {
  _id: string,
  name: string,
  lastname: string,
  nickname: string,
  email: string,
  telephone: number,
  birthday: string,
  location: Location,
  imageProfile: string,
  premium: boolean,
  premiumSince: string,
  premiumUntil: string,
  role: number,
  allowEmail: boolean,
  allowTerms: boolean,
  notifications: boolean,
}

const emit = defineEmits(['close']);
const props = defineProps({
  userID: String,
});

const { t } = useI18n();
const user = ref<IUser>({
  _id: '',
  name: '',
  lastname: '',
  nickname: '',
  email: '',
  telephone: 0,
  birthday: '',
  location: {
    address: '',
    city: '',
    country: '',
    postCode: 0,
    state: ''
  },
  imageProfile: '',
  premium: false,
  premiumSince: '',
  premiumUntil: '',
  role: 0,
  allowEmail: false,
  allowTerms: false,
  notifications: false,
});

const getUser = async () => {
  try {
    const response = await apiGetUser(props.userID);
    user.value = {
      ...response,
      birthday: formatDateToInput(response.birthday),
      premiumSince: formatDateToInput(response.premiumSince),
      premiumUntil: formatDateToInput(response.premiumUntil),
    }
  } catch (error) {
    console.log(error);
  }
}

const editUserAdmin = async () => {
  const payload = {
    ...user.value,
    birthday: formatDateToClient(user.value.birthday),
    premiumSince: formatDateToClient(user.value.premiumSince),
    premiumUntil: formatDateToClient(user.value.premiumUntil),
  };

  try {
    await apiEditUserAdmin(payload);
    close(true);
  } catch (error) {
    console.log(error);
  }
};

const close = (refresh: boolean = false) => { emit('close', refresh) };

onMounted(() => {
  getUser();
});

</script>

<template>
  <section class="modal">
    <article class="modal__container w-80">
      <div class="modal__container--close">
        <svg @click.prevent="close(false)" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 8.933-2.721-2.722c-.146-.146-.339-.219-.531-.219-.404 0-.75.324-.75.749 0 .193.073.384.219.531l2.722 2.722-2.728 2.728c-.147.147-.22.34-.22.531 0 .427.35.75.751.75.192 0 .384-.073.53-.219l2.728-2.728 2.729 2.728c.146.146.338.219.53.219.401 0 .75-.323.75-.75 0-.191-.073-.384-.22-.531l-2.727-2.728 2.717-2.717c.146-.147.219-.338.219-.531 0-.425-.346-.75-.75-.75-.192 0-.385.073-.531.22z" fill-rule="nonzero"/></svg>
      </div>
      <form class="form" autocomplete="off">
        <div class="form__row">
          <div class="form__col w-33 mr-1">
            <input type="text" maxlength="50" placeholder=" " id="userName" v-model="user.name" class="form__input">
            <label for="userName" class="form__label">{{ t('nombre') }}</label>
          </div>
          <div class="form__col w-33 mr-1">
            <input type="text" maxlength="100" placeholder=" " id="userLastname" v-model="user.lastname" class="form__input">
            <label for="userLastname" class="form__label">{{ t('apellido') }}</label>
          </div>
          <div class="form__col w-33">
            <input type="text" maxlength="50" placeholder=" " id="nickname" v-model="user.nickname" class="form__input">
            <label for="nickname" class="form__label">{{ t('nickname') }}</label>
          </div>
        </div>
        <div class="form__row">
          <div class="form__col w-33 mr-1">
            <input type="email" placeholder=" " id="userEmail" v-model="user.email" class="form__input">
            <label for="userEmail" class="form__label">{{ t('email') }}</label>
          </div>
          <div class="form__col w-33 mr-1">
            <input type="number" min="0" placeholder=" " id="userTelephone" v-model="user.telephone" class="form__input">
            <label for="userTelephone" class="form__label">{{ t('telefono') }}</label>
          </div>
          <div class="form__col w-33">
            <input type="date" placeholder=" " id="userBirthday" v-model="user.birthday" class="form__input">
            <label for="userBirthday" class="form__label">{{ t('cumpleanos') }}</label>
          </div>
        </div>
        <div class="form__row">
          <div class="form__col w-100">
            <input type="text" placeholder=" " id="userAddress" v-model="user.location.address" class="form__input">
            <label for="userAddress" class="form__label">{{ t('direccion') }}</label>
          </div>
        </div>
        <div class="form__row">
          <div class="form__col w-50 mr-1">
            <input type="text" maxlength="50" placeholder=" " id="userCity" v-model="user.location.city" class="form__input">
            <label for="userCity" class="form__label">{{ t('ciudad') }}</label>
          </div>
          <div class="form__col w-50">
            <input type="text" maxlength="50" placeholder=" " id="userState" v-model="user.location.state" class="form__input">
            <label for="userState" class="form__label">{{ t('provincia') }}</label>
          </div>
        </div>
        <div class="form__row">
          <div class="form__col w-50 mr-1">
            <input type="number" min="0" placeholder=" " id="userPostCode" v-model="user.location.postCode" class="form__input">
            <label for="userPostCode" class="form__label">{{ t('codigoPostal') }}</label>
          </div>
          <div class="form__col w-50">
            <input type="text" maxlength="50" placeholder=" " id="userCountry" v-model="user.location.country" class="form__input">
            <label for="userCountry" class="form__label">{{ t('pais') }}</label>
          </div>
        </div>
        <div class="form__row">
          <div class="form__col w-30 mr-1">
            <input type="number" min="0" placeholder=" " id="userRole" v-model="user.role" class="form__input">
            <label for="userRole" class="form__label">{{ t('rol') }}</label>
          </div>
          <div class="form__col w-70">
            <input type="text" min="0" placeholder=" " id="userImageProfile" v-model="user.imageProfile" class="form__input">
            <label for="userImageProfile" class="form__label">{{ t('foto') }}</label>
          </div>
        </div>
        <div class="form__row">
          <div class="form__col w-33 mr-1">
            <div class="form__checkbox">
              <input type="checkbox" id="userPremium" v-model="user.premium">
              <label for="userPremium">{{ t('premium') }}</label>
            </div>
          </div>
          <div class="form__col w-33 mr-1">
            <input type="date" placeholder=" " id="userPremiumSince" v-model="user.premiumSince" class="form__input">
            <label for="userPremiumSince" class="form__label">{{ t('premiumDesde') }}</label>
          </div>
          <div class="form__col w-33">
            <input type="date" placeholder=" " id="userPremiumUntil" v-model="user.premiumUntil" class="form__input">
            <label for="userPremiumUntil" class="form__label">{{ t('premiumHasta') }}</label>
          </div>
        </div>
        <div class="form__row">
          <div class="form__col w-33 mr-1">
            <div class="form__checkbox">
              <input type="checkbox" id="userAllowEmail" v-model="user.allowEmail">
              <label for="userAllowEmail">{{ t('aceptaEmail') }}</label>
            </div>
          </div>
          <div class="form__col w-33 mr-1">
            <div class="form__checkbox">
              <input type="checkbox" id="userAllowTerms" v-model="user.allowTerms">
              <label for="userAllowTerms">{{ t('aceptaTerminos') }}</label>
            </div>
          </div>
          <div class="form__col w-33">
            <div class="form__checkbox">
              <input type="checkbox" id="userNotifications" v-model="user.notifications">
              <label for="userNotifications">{{ t('aceptaNotificaciones') }}</label>
            </div>
          </div>
        </div>
        <div class="form__row--divider"></div>
        <div>
          <button class="btn btn--md  btn--delete mr-1" @click.prevent="close(false)">{{ t('cancelar') }}</button>
          <button class="btn btn--md  btn--accept" @click.prevent="editUserAdmin">{{ t('guardar') }}</button>
        </div>
      </form>
    </article>
  </section>
</template>