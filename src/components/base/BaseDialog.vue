<script setup lang="ts">
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const emits = defineEmits(['close']);
const props = defineProps<{ BDText: string }>();

const confirm = () => { emits('close', true); }
const cancel = () => { emits('close', false); }

onMounted(() => {
  const bd = document.getElementById('base-dialog') as HTMLDialogElement;
  bd.showModal();

  bd.addEventListener('close', (event) => {
    event.preventDefault();
    emits('close', false);
  });  
})
</script>

<template>
  <dialog id="base-dialog" class="base-dialog">
    <div class="base-dialog__text">
      <span>{{ props.BDText }}</span>
    </div>
    <div class="base-dialog--divider"></div>
    <div>
      <button @click="cancel" class="btn btn--md btn--delete mr-2">{{ t('cancelar') }}</button>
      <button @click="confirm" class="btn btn--md btn--accept" autofocus>{{ t('confirmar') }}</button>
    </div>
  </dialog>
</template>