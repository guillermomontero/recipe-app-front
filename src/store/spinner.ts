import { defineStore } from 'pinia';

export const useSpinnerStore = defineStore('spinner', {
  state: () => ({
    showSpinner: false,
  }),

  getters: {
    isSpinnerOn: (state) => state.showSpinner,
  },

  actions: {
    switchSpinner(active: boolean = false) {
      this.showSpinner = active;
    }
  }
});