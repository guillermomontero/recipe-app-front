<script setup lang="ts">
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '../../store/auth';
import { apiChangeEmail } from '../../config/api/user';

const emit = defineEmits(['close']);

interface IMail {
  newEmail: string,
  newEmailConfirm: string
}

const { t } = useI18n();
const store = useAuthStore();
const validateMessage = ref<string>('');
const email = ref<IMail>({
  newEmail: '',
  newEmailConfirm: ''
});

const editMail = async () => {
  if (!validateForm()) return;
  validateMessage.value = '';

  const payload = {
    _id: store.user._id,
    email: email.value.newEmail
  };

  try {
    const response = await apiChangeEmail(payload);
    store.updateUser(response.userDB, response.token.token, response.token.expiresIn);
    close(true);
  } catch (error) {
    console.log(error);
  }
};

const validateForm = () => {
  if (email.value.newEmail.length >= 150 || email.value.newEmailConfirm.length >= 150) {
    validateMessage.value = t('emailIntroducidoIncorrecto');
    return false;
  }

  if (email.value.newEmail === '') {
    validateMessage.value = t('emailIntroducidoIncorrecto');
    return false;
  }

  if (email.value.newEmailConfirm === '') {
    validateMessage.value = t('emailIntroducidoIncorrecto');
    return false;
  }

  if (email.value.newEmail !== email.value.newEmailConfirm) {
    validateMessage.value = t('emailsNoCoinciden');
    return false;
  }

  return true;
};

const close = (refresh: boolean = false) => { emit('close', refresh) };

watch(validateMessage, (newQuestion) => {
  if (newQuestion) {
    setTimeout(() => {
      validateMessage.value = '';
    }, 3000);
  }
});
</script>

<template>
  <section class="modal">
    <article class="modal__container w-50">
      <div class="modal__container--close">
        <svg @click.prevent="close(false)" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 8.933-2.721-2.722c-.146-.146-.339-.219-.531-.219-.404 0-.75.324-.75.749 0 .193.073.384.219.531l2.722 2.722-2.728 2.728c-.147.147-.22.34-.22.531 0 .427.35.75.751.75.192 0 .384-.073.53-.219l2.728-2.728 2.729 2.728c.146.146.338.219.53.219.401 0 .75-.323.75-.75 0-.191-.073-.384-.22-.531l-2.727-2.728 2.717-2.717c.146-.147.219-.338.219-.531 0-.425-.346-.75-.75-.75-.192 0-.385.073-.531.22z" fill-rule="nonzero"/></svg>
      </div>
      <form class="form" autocomplete="off">
        <div class="form__row">
          <div class="form__col w-100">
            <input type="email" placeholder=" " id="newEmail" v-model="email.newEmail" class="form__input" autocomplete="new-email" maxlength="150">
            <label for="newEmail" class="form__label">{{ t('nuevaContrasena') }}</label>
          </div>
        </div>
        <div class="form__row">
          <div class="form__col w-100">
            <input type="email" placeholder=" " id="newEmailConfirm" v-model="email.newEmailConfirm" class="form__input" autocomplete="new-email" maxlength="150">
            <label for="newEmailConfirm" class="form__label">{{ t('confirmarNuevaContrasena') }}</label>
          </div>
        </div>
        <div v-if="validateMessage" class="form__message">{{ validateMessage }}</div>
        <button class="btn btn--md mt-1" @click.prevent="editMail">{{ t('guardar') }}</button>
      </form>
    </article>
  </section>
</template>