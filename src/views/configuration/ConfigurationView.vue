<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAuthStore } from '../../store/auth';
import { apiGetUser } from "../../config/api/user";
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

const editEmail = () => {
  showModalEditEmail.value = true;
};

const closeModalEditEmail = (refresh: boolean = false) => {
  showModalEditEmail.value = false;

  if (refresh) getUserData();
};

const openModalEditPassword = () => {
  showModalEditPassword.value = true;
};

const closeModalEditPassword = () => {
  showModalEditPassword.value = false;
};

onMounted(() => {
  getUserData();
})
</script>

<template>
  <div class="page-title">
    <h3>Configuration</h3>
  </div>
  <form class="form mt-2" @submit.prevent="register" autocomplete="off">
    <div class="form__row">
      <div class="form__checkbox">
        <input type="checkbox" id="allowEmail" v-model="user.allowEmail">
        <label for="allowEmail">Allow emails</label>
      </div>
    </div>
    <div class="form__row">
      <div class="form__checkbox">
        <input type="checkbox" id="notifications" v-model="user.notifications.notifications">
        <label for="notifications">Allow notifications</label>
      </div>
    </div>
    <div class="form__row">
      <div class="form__checkbox">
        <input type="checkbox" id="notifyVersion" v-model="user.notifications.notifyVersion">
        <label for="notifyVersion">Allow notification if a new version is available</label>
      </div>
    </div>
  </form>
  <section class="configuration mt-2">
    <div class="configuration__row">
      <p>Email: {{ user.email }}</p>
      <button class="btn btn--xs btn--edit">Change email</button>
      <button class="btn btn--xs btn--edit">Change password</button>
    </div>
    <div class="configuration__row">
      <p>Account created at {{ formatDateFront(user.entryDate) }}</p>
      <p>Last session in {{ formatDateFront(user.lastSession) }}</p>
    </div>
    <div class="configuration__row">
      <p>User plan: {{ user.premium ? 'Premium' : 'Basic user' }}</p>
    </div>
  </section>

  <ModalEditEmail v-if="showModalEditEmail" @close="closeModalEditEmail" />
  <ModalEditPassword v-if="showModalEditPassword" @close="closeModalEditPassword" />
</template>