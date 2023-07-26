<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { formatDateToClient } from '../../config/utils/dates';
import { apiEditUser } from '../../config/api/user';

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
  birthDate: string,
  location: Location,
  telephone: number,
}

const emit = defineEmits(['close']);
const props = defineProps<{
  userData: IUser,
}>();

const user = ref<IUser>({
  _id: '',
  name: '',
  lastName: '',
  birthDate: '',
  location: {
    address: '',
    city: '',
    country: '',
    postCode: 0,
    state: ''
  },
  telephone: 0
});

const editProfile = async () => {
  const payload = { ...user.value, birthDate: formatDateToClient(user.value.birthDate) };

  try {
    await apiEditUser(payload);
    close(true);
  } catch (error) {
    console.log(error);
  }
};

const close = (refresh: boolean = false) => { emit('close', refresh) };

onMounted(() => {
  user.value = { ...props.userData };
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
          <div class="form__col w-50 mr-1">
            <input type="text" maxlength="50" placeholder=" " id="userName" v-model="user.name" class="form__input">
            <label for="userName" class="form__label">Name</label>
          </div>
          <div class="form__col w-50">
            <input type="text" maxlength="50" placeholder=" " id="userLastname" v-model="user.lastName" class="form__input">
            <label for="userLastname" class="form__label">Lastname</label>
          </div>
        </div>
        <div class="form__row">
          <div class="form__col w-50 mr-1">
            <input type="date" placeholder=" " id="userBirthdate" v-model="user.birthDate" class="form__input">
            <label for="userBirthdate" class="form__label">Birthdate</label>
          </div>
          <div class="form__col w-50">
            <input type="number" min="0" placeholder=" " id="userTelephone" v-model="user.telephone" class="form__input">
            <label for="userTelephone" class="form__label">Telephone</label>
          </div>
        </div>
        <div class="form__row">
          <div class="form__col w-100">
            <input type="text" placeholder=" " id="userAddress" v-model="user.location.address" class="form__input">
            <label for="userAddress" class="form__label">Address</label>
          </div>
        </div>
        <div class="form__row">
          <div class="form__col w-50 mr-1">
            <input type="text" maxlength="50" placeholder=" " id="userCity" v-model="user.location.city" class="form__input">
            <label for="userCity" class="form__label">City</label>
          </div>
          <div class="form__col w-50">
            <input type="text" maxlength="50" placeholder=" " id="userState" v-model="user.location.state" class="form__input">
            <label for="userState" class="form__label">State</label>
          </div>
        </div>
        <div class="form__row">
          <div class="form__col w-50 mr-1">
            <input type="number" min="0" placeholder=" " id="userPostCode" v-model="user.location.postCode" class="form__input">
            <label for="userPostCode" class="form__label">Post code</label>
          </div>
          <div class="form__col w-50">
            <input type="text" maxlength="50" placeholder=" " id="userCountry" v-model="user.location.country" class="form__input">
            <label for="userCountry" class="form__label">Country</label>
          </div>
        </div>
        <button class="btn btn--md mt-1" @click.prevent="editProfile">Save</button>
      </form>
    </article>
  </section>
</template>