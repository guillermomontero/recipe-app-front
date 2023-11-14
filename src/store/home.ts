import { defineStore } from 'pinia';

export const useHomeStore = defineStore('home', {
  state: () => ({
    view: 'grid',
  }),

  getters: {
    getView: (state) => state.view,
  },

  actions: {
    setView(value: string = 'grid') {
      this.view = value;
      localStorage.setItem('view', value);
    },
  }
});