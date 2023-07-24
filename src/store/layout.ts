import { defineStore } from 'pinia';

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