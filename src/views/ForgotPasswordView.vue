<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useAuthStore } from '../store/auth';

interface User {
  email: string
}

const store = useAuthStore();
const loginMessage = ref<string>('');
const user = ref<User>({
  email: ''
});


watch(loginMessage, (newQuestion) => {
  if (newQuestion) {
    setTimeout(() => {
      loginMessage.value = '';
    }, 3000);
  }
});

const sendMail = async () => {
  if (!validateForm()) return;

  const payload = {
    email: user.value.email
  };

  await store.login(payload);
};

// Validate form
const validateForm = () => {
  if (!user.value.email) {
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
      <form class="login__form" @submit.prevent="sendMail">
        <input type="email" placeholder="Email" name="email" id="form-email" v-model="user.email" class="login__form--input">

        <button type="submit" class="login__form--button">Recuperar</button>
        <div v-if="loginMessage" class="login__message">
          {{ loginMessage }}
        </div>
      </form>
    </section>
  </main>
</template>