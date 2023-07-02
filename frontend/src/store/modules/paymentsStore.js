import {apiClient} from '@/api';
import {defineStore} from 'pinia';

export const usePaymentsStore = defineStore(('payments'), {
  state: () => ({
    paymentsList: [],
    total: 0,
  }),
  getters: {
    getPaymentsList: ({paymentsList}) => paymentsList,
  },
  actions: {
    setPayments(newPaymentsList) {
      this.paymentsList.splice(0, this.paymentsList.length);
      this.paymentsList = [
        ...this.paymentsList,
        ...newPaymentsList,
      ];
    },
    onCreatePayment(newPayment) {
      return new Promise((resolve, reject) => {
        apiClient.service('payment').create(newPayment).then((response) => {
          resolve(response);
        }).catch((error) => {
          reject(error);
        });
      });
    },
    onGetPayments(queryID) {
      return new Promise((resolve, reject) => {
        apiClient.service('payment').find({
          query: {
            userUuid: queryID
          }
        }).then((response) => {
          this.setPayments(response.data);
          resolve(response);
        }).catch((error) => {
          reject(error);
        });
      });
    }
  }
});
