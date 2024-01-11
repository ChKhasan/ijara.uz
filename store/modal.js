import { defineStore } from "pinia";

export const useCounterStore = defineStore("modal", {
  state: () => {
    return { visible: false, login: false };
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    openModal(payload) {
      this[payload] = !this[payload];
    },
  },
});
