import { defineStore } from 'pinia';

export const useFilterBarStore = defineStore('filter-bar', {
  state: () => ({
    cookingTime: 0,
    origin: '',
    temperatureCategory: 0,
    unitTime: 0,
    categories: []
  }),

  getters: {
    getCookingTime: (state) => state.cookingTime,
    getOrigin: (state) => state.origin,
    getTemperatureCategory: (state) => state.temperatureCategory,
    getUnitTime: (state) => state.unitTime,
    getCategories: (state) => state.categories,
  },

  actions: {
    setCookingTime(value: number = 0) {
      this.cookingTime = value;
    },

    setOrigin(value: string = '') {
      this.origin = value;
    },

    setTemperatureCategory(value: number = 0) {
      this.temperatureCategory = value;
    },

    setUnitTime(value: number = 0) {
      this.unitTime = value;
    },

    setCategories(value: number[]) {
      this.categories = value;
    },

    clearFilters() {
      this.cookingTime = 0;
      this.origin = '';
      this.temperatureCategory = 0;
      this.unitTime = 0;
      this.categories = [];
    }
  }
});