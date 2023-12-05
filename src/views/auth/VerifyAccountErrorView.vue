<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import router from '../../router';

const { t } = useI18n();
const route = useRoute();
</script>

<template>
  <div class="login__logo">
    <img src="images/your-recipes-logo.png" alt="Your Recipes">
  </div>
  <section class="verify-account">
    <div class="verify-account__message">
      <p class="verify-account__message--error">{{ t('mensajeErrorVerificacionCuenta')}}</p>
      <button class="btn btn--md btn--success">{{ t('registrarse') }}</button>
    </div>
  </section>
</template>
