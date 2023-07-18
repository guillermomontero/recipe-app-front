import { defineStore } from 'pinia';
import router from '../router';

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    menuActive: false,
  }),

  getters: {
    isMenuActive: (state) => state.menuActive,
  },

  actions: {
    triggerMenu(trigger: boolean = false) {
      this.menuActive = trigger;
    },
  }
});