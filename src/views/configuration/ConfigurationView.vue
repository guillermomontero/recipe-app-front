<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAuthStore } from '../../store/auth';
import { apiGetUser, apiDeleteUser, apiChangePreferences, apiChangePlan } from '../../config/api/user';
import { formatDateToInput, formatDateFront } from '../../config/utils/dates';
import ModalEditEmail from '../../components/configuration/ModalEditEmail.vue';
import ModalEditPassword from '../../components/configuration/ModalEditPassword.vue';

interface IUser {
  _id: string,
  email: string,
  allowEmail: boolean,
  entryDate: string,
  lastSession: string,
  premium: boolean,
  notifications: {
    notifications: boolean,
    notifyVersion: boolean
  },
}

const store = useAuthStore();

const showModalEditEmail = ref<boolean>(false);
const showModalEditPassword = ref<boolean>(false);
const user = ref<IUser>({
  _id: '',
  email:'',
  allowEmail: false,
  entryDate: '',
  lastSession: '',
  premium: false,
  notifications: {
    notifications: false,
    notifyVersion: false
  }
});

const getUserData = async () => {
  try {
    const response = await apiGetUser(store.user._id);
    user.value._id = response._id;
    user.value.email = response.email;
    user.value.allowEmail = response.allowEmail;
    user.value.premium = response.premium;
    user.value.entryDate = formatDateToInput(response.entryDate);
    user.value.lastSession = formatDateToInput(response.lastSession);
    user.value.notifications = response.notifications;
  } catch (error) {
    console.log(error)
  }
};

const changePreferences = async () => {
  const payload = {
    _id: store.user._id,
    allowEmail: user.value.allowEmail,
    notifications: user.value.notifications
  };

  try {
    const response = await apiChangePreferences(payload);
    store.updateUser(response.userDB, response.token.token, response.token.expiresIn);
    getUserData();
  } catch (error) {
    console.log(error)
  }
};

const editEmail = () => {
  showModalEditEmail.value = true;
};

const closeModalEditEmail = (refresh: boolean = false) => {
  showModalEditEmail.value = false;

  if (refresh) getUserData();
};

const editPassword = () => {
  showModalEditPassword.value = true;
};

const closeModalEditPassword = () => {
  showModalEditPassword.value = false;
};

const changePlan = async () => {
  const payload = {
    _id: store.user._id,
    premium: !user.value.premium,
  };

  try {
    const response = await apiChangePlan(payload);
    store.updateUser(response.userDB, response.token.token, response.token.expiresIn);
    getUserData();
  } catch (error) {
    console.log(error)
  }
};

const deleteAccount = async () => {
  const payload = {
    _id: store.user._id,
    active: false,
  };

  try {
    await apiDeleteUser(payload);
    store.logout();
  } catch (error) {
    console.log(error)
  }
};

onMounted(() => {
  getUserData();
})
</script>

<template>
  <div class="page-title">
    <h3>{{ $t('configuracion') }}</h3>
  </div>
  <section class="configuration mt-2" autocomplete="off">
    <article class="configuration__box">
      <div class="configuration__box--row">
        <div class="form__checkbox">
          <input type="checkbox" id="allowEmail" v-model="user.allowEmail" @change="changePreferences">
          <label for="allowEmail">{{ $t('quieroRecibirEmails') }}</label>
        </div>
      </div>
      <div class="configuration__box--row">
        <div class="form__checkbox">
          <input type="checkbox" id="notifications" v-model="user.notifications.notifications" @change="changePreferences">
          <label for="notifications">{{ $t('permitirNotificacionesPush') }}</label>
        </div>
      </div>
      <div class="configuration__box--row">
        <div class="form__checkbox">
          <input type="checkbox" id="notifyVersion" v-model="user.notifications.notifyVersion" @change="changePreferences">
          <label for="notifyVersion">{{ $t('notificarmeVersionDisponible') }}</label>
        </div>
      </div>
    </article>
    <article class="configuration__box">
      <div class="configuration__box--align-right configuration__box--row">
        <p class="configuration__box--row--p">{{ $t('cuentaCreadaEl') }} {{ formatDateFront(user.entryDate) }}</p>
        <p class="configuration__box--row--p">{{ $t('ultimaSesionEl') }} {{ formatDateFront(user.lastSession) }}</p>
        <p class="configuration__box--row--p">{{ user.premium ? `👑 ${$t('premium')}` : `🧢 ${$t('basico')}` }}</p>
      </div>
    </article>
  </section>

  <section class="configuration configuration__border-y mt-1">
    <article class="configuration__box">
      <div class="configuration__box--buttons">
        <button class="btn btn--xs btn--edit mr-2" @click.prevent="editEmail">📮 {{ $t('cambiarEmail') }}</button>
        <button class="btn btn--xs btn--edit" @click.prevent="editPassword">🔐 {{ $t('cambiarPassword') }}</button>
      </div>
    </article>
  </section>

  <section class="configuration configuration__border-b mt-1">
    <article class="configuration__box">
      <div class="configuration__box--buttons">
        <button class="btn btn--xs btn--edit mr-2" @click.prevent="changePlan">{{ user.premium ? `🧢 ${$t('cancelarPremium')}` : `👑 ${$t('hacersePremium')}` }}</button>
        <button class="btn btn--xs btn--edit" @click.prevent="deleteAccount">🗑️ {{ $t('eliminarCuenta') }}</button>
      </div>
    </article>
  </section>

  <ModalEditEmail v-if="showModalEditEmail" @close="closeModalEditEmail" />
  <ModalEditPassword v-if="showModalEditPassword" @close="closeModalEditPassword" />
</template>