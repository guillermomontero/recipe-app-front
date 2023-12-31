<script lang="ts" setup>
import { ref, watch } from 'vue';
import { apiCreateUser } from "../../config/api/user";
import router from '../../router';

interface User {
  name: string,
  lastName: string,
  email: string,
  password: string,
  passwordRepeat: string,
  acceptTerms: false,
}

const loginMessage = ref<string>('');
const user = ref<User>({
  name: '',
  lastName: '',
  email: '',
  password: '',
  passwordRepeat: '',
  acceptTerms: false
});


watch(loginMessage, (newQuestion) => {
  if (newQuestion) {
    setTimeout(() => {
      loginMessage.value = '';
    }, 3000);
  }
});

const register = async () => {
  if (!validateForm()) return;

  const payload = {
    name: user.value.name,
    lastName: user.value.lastName,
    email: user.value.email,
    password: user.value.password
  };

  try {
    await apiCreateUser(payload);
    router.push('/login');
  } catch (error) {
    console.log(error);
  }
};

// Validate form
const validateForm = () => {
  if (!user.value.name || typeof user.value.name !== 'string') {
    loginMessage.value = 'Introcuzca un nombre correcto';
    return false;
  }

  if (!user.value.lastName || typeof user.value.lastName !== 'string') {
    loginMessage.value = 'Los datos introducidos son incorrectos';
    return false;
  }

  if (!user.value.email || !user.value.password) {
    loginMessage.value = 'Los datos introducidos son incorrectos';
    return false;
  }

  if (!hasEmailFormat(user.value.email)) {
    loginMessage.value = 'El email introducido no es correcto';
    return false;
  }

  if (!user.value.password) {
    loginMessage.value = 'La contraseña no es correcta';
    return false;
  }

  if (user.value.password !== user.value.passwordRepeat) {
    loginMessage.value = 'Las contraseñas no coinciden';
    return false;
  }

  if (!user.value.acceptTerms) {
    loginMessage.value = 'Debe accertar las condiciones';
    return false;
  }

  return true;
};

const hasEmailFormat = (searchString: string = '') => {
  const emailRegExp = { email: /^\w.+@\w+\.[a-z]+$/i };

  return emailRegExp.email.test(searchString);
};
</script>

<template>
  <section class="login">
    <div class="login__logo">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 4.707c-2.938-1.83-7.416-2.567-12-2.707v17.714c3.937.12 7.795.681 10.667 1.995.846.388 1.817.388 2.667 0 2.872-1.314 6.729-1.875 10.666-1.995v-17.714c-4.584.14-9.062.877-12 2.707zm-10 13.104v-13.704c5.157.389 7.527 1.463 9 2.334v13.168c-1.525-.546-4.716-1.505-9-1.798zm20 0c-4.283.293-7.475 1.252-9 1.799v-13.171c1.453-.861 3.83-1.942 9-2.332v13.704z"/></svg>
      <h3>RecipeApp</h3>
    </div>
    <form class="form" @submit.prevent="register" autocomplete="off">
      <div class="form__row">
        <div class="form__col w-100">
          <input type="text" placeholder=" " maxlength="50" id="form-name" v-model="user.name" class="form__input" autocomplete="off">
          <label for="form-name" class="form__label">Name</label>
        </div>
      </div>
      <div class="form__row">
        <div class="form__col w-100">
          <input type="text" placeholder=" " maxlength="100" id="form-lastname" v-model="user.lastName" class="form__input" autocomplete="off">
          <label for="form-lastname" class="form__label">Lastname</label>
        </div>
      </div>
      <div class="form__row">
        <div class="form__col w-100">
          <input type="email" placeholder=" " id="form-email" v-model="user.email" class="form__input" autocomplete="off">
          <label for="form-email" class="form__label">Email</label>
        </div>
      </div>
      <div class="form__row">
        <div class="form__col w-100">
          <input type="password" placeholder=" " id="form-password" v-model="user.password" class="form__input" autocomplete="new-password">
          <label for="form-password" class="form__label">Password</label>
        </div>
      </div>
      <div class="form__row">
        <div class="form__col w-100">
          <input type="password" placeholder=" " id="form-password-repeat" v-model="user.passwordRepeat" class="form__input" autocomplete="new-password">
          <label for="form-password-repeat" class="form__label">Password repeat</label>
        </div>
      </div>
      <div class="form__row">
        <div class="form__checkbox my-1">
          <input type="checkbox" id="acceptTerms" v-model="user.acceptTerms">
          <label for="acceptTerms">Accept terms and conditions</label>
        </div>
      </div>
      <button type="submit" class="form__button">Register</button>
      <div v-if="loginMessage" class="form__message">
        {{ loginMessage }}
      </div>
    </form>
  </section>
</template>