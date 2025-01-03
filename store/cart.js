import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),
  actions: {
    addItem(dish, quantity) {
      const existingItem = this.items.find(item => item.dish.id === dish.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push({ dish, quantity });
      }
    },
    removeItem(dishId) {
      this.items = this.items.filter(item => item.dish.id !== dishId);
    },
    clearCart() {
      this.items = [];
    },
  },
});