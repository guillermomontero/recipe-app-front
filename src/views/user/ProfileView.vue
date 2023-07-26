<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAuthStore } from '../../store/auth';
import { apiGetUser } from "../../config/api/user";
import { formatDateToInput, formatDateFront } from '../../config/utils/dates';
import ModalEditProfile from '../../components/user/ModalEditProfile.vue';
import ModalWebCam from '../../components/user/ModalWebCam.vue';

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
  lastName: string,
  email: string,
  birthDate: string,
  imageProfile: string,
  location: Location,
  telephone: number,
}

const store = useAuthStore();

const showModalEditProfile = ref<boolean>(false);
const showModalWebCam = ref<boolean>(false);
const user = ref<IUser>({
  _id: '',
  name: '',
  lastName: '',
  email: '',
  birthDate: '',
  imageProfile: '',
  location: {
    address: '',
    city: '',
    country: '',
    postCode: 0,
    state: ''
  },
  telephone: 0
});

const getUserData = async () => {
  try {
    const response = await apiGetUser(store.user._id);
    user.value._id = response._id;
    user.value.name = response.name;
    user.value.lastName = response.lastName;
    user.value.email = response.email;
    user.value.birthDate = formatDateToInput(response.birthDate);
    user.value.imageProfile = response.imageProfile;
    user.value.location = response.location;
    user.value.telephone = response.telephone;
  } catch (error) {
    console.log(error)
  }
};

const editProfile = () => {
  showModalEditProfile.value = true;
};

const closeModalEditProfile = (refresh: boolean = false) => {
  showModalEditProfile.value = false;

  if (refresh) getUserData();
};

const openModalWebCam = () => {
  showModalWebCam.value = true;
};

const closeModalWebCam = () => {
  showModalWebCam.value = false;
};

onMounted(() => {
  getUserData();
})
</script>

<template>
  <div class="page-title">
    <h3>Profile</h3>
    <button class="btn btn--xs btn--edit" @click="editProfile">Edit</button>
  </div>
  <section class="profile mt-2">
    <div class="profile__principal">
      <div class="profile__principal--photo">
        <img :src="user.imageProfile" alt="">
        <div class="profile__principal--photo--buttons">
          <button class="btn btn--xs btn--delete mr-1" @click.prevent="openModalWebCam">🗑️</button>
          <button class="btn btn--xs btn--edit" @click.prevent="openModalWebCam">✏️ Edit</button>
        </div>
      </div>
      <div class="profile__principal--data">
        <div class="profile__principal--data--row">
          <h1>{{ user.name }}&nbsp;&nbsp;{{ user.lastName }}</h1>
        </div>
        <div class="profile__principal--data--row">
          📮 {{ user.email }}
        </div>
        <div class="profile__principal--data--row">
          📱 {{ user.telephone }}
        </div>
        <div class="profile__principal--data--row">
          <p>🎂 {{ formatDateFront(user.birthDate) }}</p>
        </div>
        <div class="profile__principal--data--row mt-2">
          📌 Location
        </div>
        <div class="profile__principal--data--row">
          {{ user.location.address }}
        </div>
        <div class="profile__principal--data--row">
          {{ user.location.city }} ({{ user.location.postCode }})
        </div>
        <div class="profile__principal--data--row">
          {{ user.location.state }}, {{ user.location.country }}
        </div>
      </div>
    </div>
  </section>

  <ModalEditProfile v-if="showModalEditProfile" :userData="user" @close="closeModalEditProfile" />
  <ModalWebCam v-if="showModalWebCam" @close="closeModalWebCam" />
</template>