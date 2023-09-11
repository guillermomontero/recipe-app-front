import { defineStore } from 'pinia';
import { i18n } from '../plugins/i18n';

export const useLocalStore = defineStore('local', {
  state: () => ({
    language: 'es',
  }),

  getters: {
    getLanguage: (state) => state.language,
  },

  actions: {
    setLanguage(value: string = 'es') {
      this.language = value;
      localStorage.setItem('local', value);
      i18n.global.locale.value = value;
    },
  }
});