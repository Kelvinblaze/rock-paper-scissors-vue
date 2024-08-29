import { defineStore } from "pinia";

export const useScoreStore = defineStore("score", {
  state: () => ({ score: 0 }),
  getters: {
    getScore: (state) => state.score,
  },
  actions: {
    addScore() {
      this.score++;
    },
    subtractScore() {
      this.score--;
    },
  },
  persist: true,
});
