import { defineStore } from 'pinia';

export const useFilterBarStore = defineStore('filter-bar', {
  state: () => ({
    cookingTime: 0,
    unitTime: 0,
    origin: '',
    temperatureCategory: 0,
    categories: []
  }),

  getters: {
    getCookingTime: (state) => state.cookingTime,
    getUnitTime: (state) => state.unitTime,
    getOrigin: (state) => state.origin,
    getTemperatureCategory: (state) => state.temperatureCategory,
    getCategories: (state) => state.categories,
  },

  actions: {
    setCookingTime(value: number = 0) {
      this.cookingTime = value;
    },
    
    setUnitTime(value: number = 0) {
      this.unitTime = value;
    },

    setOrigin(value: string = '') {
      this.origin = value;
    },

    setTemperatureCategory(value: number = 0) {
      this.temperatureCategory = value;
    },

    setCategories(value: []) {
      this.categories = value;
    },

    deleteLabel(type: string, typeCategory: string) {
      console.log(type, typeCategory)
      switch (type) {
        case 'cookingTime':
          this.cookingTime = 0;
          this.unitTime = 0;
          break;
        case 'origin':
          this.origin = '';
          break;
        case 'temperatureCategory':
          this.temperatureCategory = 0;
          break;
        case 'categories':
          this.categories = this.categories.filter((category: string) => category !== typeCategory);
          break;
      }
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