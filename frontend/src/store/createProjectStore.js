import { defineStore } from 'pinia';

export const useCreateProjectStore = defineStore('createProject', {
  state: () => ({
    step: 1,
  }),
  actions: {
    setStep(newStep) {
      this.step = newStep;
    },
  },
});
