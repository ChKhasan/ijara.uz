import { defineStore } from "pinia";

export const useAuthHandle = defineStore("auth", {
  state: () => {
    return { auth: false };
  },
  actions: {
    authHandle(payload) {
      this.auth = payload;
    },
  },
});
