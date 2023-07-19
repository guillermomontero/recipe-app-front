<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useAuthStore } from '../../store/auth';

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
  <section class="login">
    <div class="login__logo">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 4.707c-2.938-1.83-7.416-2.567-12-2.707v17.714c3.937.12 7.795.681 10.667 1.995.846.388 1.817.388 2.667 0 2.872-1.314 6.729-1.875 10.666-1.995v-17.714c-4.584.14-9.062.877-12 2.707zm-10 13.104v-13.704c5.157.389 7.527 1.463 9 2.334v13.168c-1.525-.546-4.716-1.505-9-1.798zm20 0c-4.283.293-7.475 1.252-9 1.799v-13.171c1.453-.861 3.83-1.942 9-2.332v13.704z"/></svg>
      <h3>RecipeApp</h3>
    </div>
    <form class="login__form" @submit.prevent="login" autocomplete="off">
      <input type="email" placeholder="Email" name="email" id="form-email" v-model="user.email" class="login__form--input" autocomplete="off">
      <input type="password" placeholder="Password" name="password" id="form-password" v-model="user.password" class="login__form--input" autocomplete="new-password">

      <button type="submit" class="login__form--button">Entrar</button>
      <div v-if="loginMessage" class="login__message">
        {{ loginMessage }}
      </div>
    </form>
    <div class="login__links">
      <router-link to="/forgot-password">Forgot password?</router-link>
      <router-link to="/register">Register</router-link>
    </div>
  </section>
</template>
