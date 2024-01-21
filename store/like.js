import { defineStore } from "pinia";

export const useLikes = defineStore("like", {
  state: () => {
    return { likes: [] };
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    likeHandle(payload) {
      let oldLikes = JSON.parse(localStorage.getItem("likes")) || [];
      if (!oldLikes.includes(payload)) {
        oldLikes.push(payload);
        localStorage.setItem("likes", JSON.stringify(oldLikes));
      } else {
        oldLikes = oldLikes.filter((item) => item != payload);
        localStorage.setItem("likes", JSON.stringify(oldLikes));
      }
      this.likes = oldLikes;
    },
    reloadLikes() {
      let oldLikes = JSON.parse(localStorage.getItem("likes")) || [];
      this.likes = oldLikes;
    },
    handleUserLikes(payload) {
      this.likes = payload;
    },
  },
});
