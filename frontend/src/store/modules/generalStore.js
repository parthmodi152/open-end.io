import { defineStore } from 'pinia';

export const useGeneralStore = defineStore('general', {
  state: () => ({
    loginPopup: false,
    accountCreation: false,
    alertVisible: false,
    alertColor: 'success',
    alertMessage: 'This is an alert!',
    alertType: 'success',
    alertDismissible: false,
    alertTimeout: 3000, // Time in milliseconds (e.g., 5000 = 5 seconds)
  }),

  actions: {
    setLoginPopup() {
      this.loginPopup = !this.loginPopup;
    },
    setAccountCreation() {
      this.accountCreation = !this.accountCreation;
    },

    showAlert(message, type='success') {
      this.alertVisible = true;
      this.alertType = type;
      this.alertMessage = message;
      setTimeout(() => {
        this.alertVisible = false;
      }, this.alertTimeout);
    },
  }
});
