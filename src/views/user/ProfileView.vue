<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAuthStore } from '../../store/auth';
import { apiGetUser } from "../../config/api/user";
import ModalEditProfile from '../../components/user/ModalEditProfile.vue';

interface Location {
  address: string,
  city: string,
  country: string,
  postCode: number,
  state: string,
}

interface IUser {
  name: string,
  lastName: string,
  birthDate: string,
  imageProfile: string,
  location: Location,
  telephone: number,
}

const store = useAuthStore();

const showModalEditProfile = ref<boolean>(false);
const user = ref<IUser>({
  name: '',
  lastName: '',
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
    user.value.name = response.name;
    user.value.lastName = response.lastName;
    user.value.birthDate = response.birthDate;
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

onMounted(() => {
  getUserData();
})
</script>

<template>
  <h1>Profile view</h1>
  <img :src="user.imageProfile" alt="">

  <p>{{ user.name }}</p>
  <p>{{ user.lastName }}</p>
  <p>{{ user.birthDate }}</p>
  <p>{{ user.telephone }}</p>
  <p>{{ user.location.address }}, {{ user.location.city }}, {{ user.location.state }}, {{ user.location.postCode }}, {{ user.location.country }}</p>

  <button @click="editProfile">Edit</button>

  <ModalEditProfile v-if="showModalEditProfile" :userData="user" @close="closeModalEditProfile" />
</template>