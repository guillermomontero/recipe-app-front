<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useAuthStore } from '../store/auth';

interface User {
  email: string,
  password: string
}

const store = useAuthStore();
const loginMessage = ref<string>('');
const user = ref<User>({
  email: '',
  password: ''
});


watch(loginMessage, (newQuestion) => {
  if (newQuestion) {
    setTimeout(() => {
      loginMessage.value = '';
    }, 3000);
  }
});

const login = async () => {
  if (!validateForm()) return;

  const payload = {
    email: user.value.email,
    password: user.value.password
  };

  await store.login(payload);
};

// Validate form
const validateForm = () => {
  if (!user.value.email || !user.value.password) {
    loginMessage.value = 'Los datos introducidos son incorrectos';
    return false;
  }

  if (!hasEmailFormat(user.value.email)) {
    loginMessage.value = 'El email introducido no es correcto';
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
      <form class="login__form" @submit.prevent="login">
        <input type="email" placeholder="Email" name="email" id="form-email" v-model="user.email" class="login__form--input">
        <input type="password" placeholder="Password" name="password" id="form-password" v-model="user.password" class="login__form--input">

        <button type="submit" class="login__form--button">Entrar</button>
        <div v-if="loginMessage" class="login__message">
          {{ loginMessage }}
        </div>
      </form>
      <div class="login__links">
        <a href="#">Olvidé mi contraseña</a>
        <a href="#">Registrarme</a>
      </div>
    </section>
  </main>
</template>