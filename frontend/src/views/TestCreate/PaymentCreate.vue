<template>
  <main>
    <v-sheet width="500" class="mx-auto">
      <v-form @submit.prevent>
        <v-text-field
          v-model='description'
          label='Description'
          disabled="true"
        ></v-text-field>
        <v-select
          v-model="paymentType"
          :items="paymentTypes"
          label="Payment Type">
        </v-select>
        <v-text-field
          v-model="amount"
          type="number"
          label="Amount"
        ></v-text-field>
        <v-text-field
          v-model="balance"
          type="number"
          label="Balance"
        ></v-text-field>
        <v-text-field
          v-model="company"
          label="Company"
        ></v-text-field>
        <v-text-field
          v-model="user"
          label="User"
        ></v-text-field>
        <v-btn @click="createPayment">Submit</v-btn>
        <v-btn @click="findAllPayments">Find</v-btn>
      </v-form>
    </v-sheet>
  </main>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { usePaymentsStore } from '@/store/modules/paymentsStore';

export default {
  data: () => {
    return ({
      description: 'Just a randomn description',
      paymentType: '',
      amount: '',
      balance: '',
      company: '',
      user: '',
      paymentTypes: [
        'INCOME',
        'EXPENSE',
      ],
    });
  },
  methods: {
    createPayment() {
      if (this.description.trim() !== '' || this.paymentType.trim() !== '' || parseInt(this.amount.trim()) >= 0 || parseInt(this.balance.trim()) >= 0 || this.company.trim() !== '' || this.user.trim() !== '') {
        this.onCreatePayment( {
          description: this.description,
          type: this.paymentType,
          amount: parseFloat(this.amount),
          balance: parseFloat(this.balance),
          companyUuid: this.company,
          userUuid: this.user
        })
          .then((response) => {
            console.log(response);
          }).catch((error) => {
            console.log(error);
          });
      }
    },
    findAllPayments() {
      const id = 'cf9b740e-9dd7-4f10-9db1-ee857645a201';
      this.onGetPayments(id).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
    },
    ...mapActions(usePaymentsStore, ['onCreatePayment', 'onGetPayments']),
  },
  computed: {
    ...mapState(usePaymentsStore, ['paymentsList']),
  },
};

</script>

<style scoped>

</style>
