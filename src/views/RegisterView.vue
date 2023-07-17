<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useAuthStore } from '../store/auth';

interface User {
  name: string,
  lastName: string,
  email: string,
  password: string,
  passwordRepeat: string,
}

const store = useAuthStore();
const loginMessage = ref<string>('');
const user = ref<User>({
  name: '',
  lastName: '',
  email: '',
  password: '',
  passwordRepeat: '',
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
    email: user.value.email,
    password: user.value.password
  };

  await store.login(payload);
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

  return true;
};

const hasEmailFormat = (searchString: string = '') => {
  const emailRegExp = { email: /^\w.+@\w+\.[a-z]+$/i };

  return emailRegExp.email.test(searchString);
};
</script>

<template>
  <main class="main">
    <section class="login">
      <div class="login__logo">
        
      </div>
      <form class="login__form" @submit.prevent="register">
        <input type="text" placeholder="Name" name="name" id="form-email" v-model="user.name" class="login__form--input">
        <input type="text" placeholder="Lastname" name="lastname" id="form-email" v-model="user.lastName" class="login__form--input">
        <input type="email" placeholder="Email" name="email" id="form-email" v-model="user.email" class="login__form--input">
        <input type="password" placeholder="Password" name="password" id="form-password" v-model="user.password" class="login__form--input">
        <input type="password" placeholder="Password repeat" name="passwordRepeat" id="form-password" v-model="user.passwordRepeat" class="login__form--input">

        <button type="submit" class="login__form--button">Register</button>
        <div v-if="loginMessage" class="login__message">
          {{ loginMessage }}
        </div>
      </form>
    </section>
  </main>
</template>