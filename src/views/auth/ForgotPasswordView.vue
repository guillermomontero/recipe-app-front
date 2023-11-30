<script setup lang="ts">
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '../../store/auth';

interface User {
  email: string
}

const { t } = useI18n();
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

  const payload = { email: user.value.email };

  await store.login(payload);
};

// Validate form
const validateForm = () => {
  if (!user.value.email) {
    loginMessage.value = t('datosIntroducidosIncorrectos');
    return false;
  }

  if (user.value.email.length >= 150) {
    loginMessage.value = t('datrosIntroducidosIncorrectos');
    return false;
  }

  if (!hasEmailFormat(user.value.email)) {
    loginMessage.value = t('emailIntroducidoIncorrecto');
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
      <img src="images/your-recipes-logo.png" alt="Your Recipes">
    </div>
    <form class="form" @submit.prevent="sendMail">
      <div class="form__row">
        <div class="form__col w-100">
          <input type="email" placeholder=" " id="form-email" v-model="user.email" class="form__input" autocomplete="off" maxlength="150">
          <label for="form-email" class="form__label">{{ t('email') }}</label>
        </div>
      </div>
      <button type="submit" class="form__button">{{ t('recuperar') }}</button>
      <div v-if="loginMessage" class="form__message">
        {{ loginMessage }}
      </div>
    </form>
  </section>
</template>