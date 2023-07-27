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
    <h3>Configuration</h3>
  </div>
  <section class="configuration mt-2" autocomplete="off">
    <article class="configuration__box">
      <div class="configuration__box--row">
        <div class="form__checkbox">
          <input type="checkbox" id="allowEmail" v-model="user.allowEmail" @change="changePreferences">
          <label for="allowEmail">Allow to receive emails</label>
        </div>
      </div>
      <div class="configuration__box--row">
        <div class="form__checkbox">
          <input type="checkbox" id="notifications" v-model="user.notifications.notifications" @change="changePreferences">
          <label for="notifications">Allow push notifications</label>
        </div>
      </div>
      <div class="configuration__box--row">
        <div class="form__checkbox">
          <input type="checkbox" id="notifyVersion" v-model="user.notifications.notifyVersion" @change="changePreferences">
          <label for="notifyVersion">Notify me when a new version is available</label>
        </div>
      </div>
    </article>
    <article class="configuration__box">
      <div class="configuration__box--align-right configuration__box--row">
        <p class="configuration__box--row--p">Account created at {{ formatDateFront(user.entryDate) }}</p>
        <p class="configuration__box--row--p">Last session on {{ formatDateFront(user.lastSession) }}</p>
        <p class="configuration__box--row--p">{{ user.premium ? '👑 Premium' : '🧢 Basic user' }}</p>
      </div>
    </article>
  </section>

  <section class="configuration configuration__border-y mt-1">
    <article class="configuration__box">
      <div class="configuration__box--buttons">
        <button class="btn btn--xs btn--edit mr-2" @click.prevent="editEmail">📮 Change email</button>
        <button class="btn btn--xs btn--edit" @click.prevent="editPassword">🔐 Change password</button>
      </div>
    </article>
  </section>

  <section class="configuration configuration__border-b mt-1">
    <article class="configuration__box">
      <div class="configuration__box--buttons">
        <button class="btn btn--xs btn--edit mr-2" @click.prevent="changePlan">{{ user.premium ? '🧢 Downgrade plan' : '👑 Upgrade plan' }}</button>
        <button class="btn btn--xs btn--edit" @click.prevent="deleteAccount">🗑️ Delete account</button>
      </div>
    </article>
  </section>

  <ModalEditEmail v-if="showModalEditEmail" @close="closeModalEditEmail" />
  <ModalEditPassword v-if="showModalEditPassword" @close="closeModalEditPassword" />
</template>