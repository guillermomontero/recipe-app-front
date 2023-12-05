<script setup lang="ts">
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { apiCreateUser } from '../../config/api/user';
import router from '../../router';

interface User {
  name: string,
  nickname: string,
  lastname: string,
  email: string,
  password: string,
  passwordRepeat: string,
  acceptTerms: boolean,
}

const { t } = useI18n();
const loginMessage = ref<string>('');
const user = ref<User>({
  name: 'Guillermo',
  nickname: 'guilletest',
  lastname: 'Montero Martín',
  email: 'gmontero@imaster.golf',
  password: '-Prueba1-',
  passwordRepeat: '-Prueba1-',
  acceptTerms: true,
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
    nickname: user.value.nickname,
    lastname: user.value.lastname,
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
    loginMessage.value = t('nombreIntroducidoIncorrecto');
    return false;
  }

  if (!user.value.nickname || typeof user.value.nickname !== 'string') {
    loginMessage.value = t('nicknameIntroducidoIncorrecto');
    return false;
  }

  if (!user.value.lastname || typeof user.value.lastname !== 'string') {
    loginMessage.value = t('datosIntroducidosIncorrectos');
    return false;
  }

  if (!user.value.email || !user.value.password) {
    loginMessage.value = t('datosIntroducidosIncorrectos');
    return false;
  }

  if (!hasEmailFormat(user.value.email)) {
    loginMessage.value = t('emailIntroducidoIncorrecto');
    return false;
  }

  if (!user.value.password) {
    loginMessage.value = t('introduzcaContrasenia');
    return false;
  }

  if (!hasPswdFormat(user.value.password)) {
    loginMessage.value = t('contraseniaIntroducida');
    return false;
  }

  if (user.value.password !== user.value.passwordRepeat) {
    loginMessage.value = t('contrasenasNoCoinciden');
    return false;
  }

  if (!user.value.acceptTerms) {
    loginMessage.value = t('debeAceptarLasCondiciones');
    return false;
  }

  return true;
};

const hasEmailFormat = (searchString: string = '') => {
  const emailRegExp = { email: /^\w.+@\w+\.[a-z]+$/i };

  return emailRegExp.email.test(searchString);
};

const hasPswdFormat = (searchString: string = '') => {
  const pswdRegExp = { password: /(?=^.{8,16}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/ };

  return pswdRegExp.password.test(searchString);
};

</script>

<template>
  <section class="login">
    <div class="login__logo">
      <img src="images/your-recipes-logo.png" alt="Your Recipes">
    </div>
    <form class="form" @submit.prevent="register" autocomplete="off">
      <div class="form__row">
        <div class="form__col w-100">
          <input type="text" placeholder=" " maxlength="50" id="form-nickname" v-model="user.nickname" class="form__input" autocomplete="off">
          <label for="form-nickname" class="form__label">{{ t('apodo') }}</label>
        </div>
      </div>
      <div class="form__row">
        <div class="form__col w-100">
          <input type="text" placeholder=" " maxlength="50" id="form-name" v-model="user.name" class="form__input" autocomplete="off">
          <label for="form-name" class="form__label">{{ t('nombre') }}</label>
        </div>
      </div>
      <div class="form__row">
        <div class="form__col w-100">
          <input type="text" placeholder=" " maxlength="100" id="form-lastname" v-model="user.lastname" class="form__input" autocomplete="off">
          <label for="form-lastname" class="form__label">{{ t('apellido') }}</label>
        </div>
      </div>
      <div class="form__row">
        <div class="form__col w-100">
          <input type="email" placeholder=" " id="form-email" v-model="user.email" class="form__input" autocomplete="off">
          <label for="form-email" class="form__label">{{ t('email') }}</label>
        </div>
      </div>
      <div class="form__row">
        <div class="form__col w-100">
          <input type="password" placeholder=" " id="form-password" v-model="user.password" class="form__input" autocomplete="new-password">
          <label for="form-password" class="form__label">{{ t('contrasena') }}</label>
        </div>
      </div>
      <div class="form__row">
        <div class="form__col w-100">
          <input type="password" placeholder=" " id="form-password-repeat" v-model="user.passwordRepeat" class="form__input" autocomplete="new-password">
          <label for="form-password-repeat" class="form__label">{{ t('confirmarContrasena') }}</label>
        </div>
      </div>
      <div class="form__row">
        <div class="form__checkbox my-1">
          <input type="checkbox" id="acceptTerms" v-model="user.acceptTerms">
          <label for="acceptTerms">{{ t('aceptarTerminosCondiciones') }}</label>
        </div>
      </div>
      <button type="submit" class="form__button">{{ t('registrarse') }}</button>
      <div v-if="loginMessage" class="form__message">
        {{ loginMessage }}
      </div>
    </form>
  </section>
</template>