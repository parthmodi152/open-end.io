<template>
  <main>
    <v-sheet width="500" class="mx-auto">
      <v-form @submit.prevent>
        <v-text-field
          v-model='model.name'
          label='Company Name'
        ></v-text-field>
        <v-text-field
          v-model='model.credit'
          type='number'
          label='Credit'
        ></v-text-field>
        <v-btn @click="createCompany">Submit</v-btn>
        <v-btn @click="deleteCompany">Update</v-btn>
      </v-form>
    </v-sheet>
  </main>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useCompaniesStore } from '@/store/modules/companiesStore';

export default {
  data: () => ({
    model: {
      uuid: '',
      name: '',
      credit: '',
    },
  }),
  methods: {
    createCompany() {
      const name = this.model.name.trim();
      const credit = parseFloat(this.model.credit.trim());
      if (name !== '' || credit >= 0) {
        this.onCreateCompany( {
          name: name,
          credit: credit
        }).then((company) => {
          this.model.uuid = company.uuid;
          this.model.name = company.name;
          this.model.credit = company.credit;
        }).catch((error) => {
          console.log('error:');
          console.log(error);
        });
      }
      console.log('model:', this.model);
    },
    findCompany(companyUuid) {
      this.onGetCompanies(companyUuid).then((companies) => {
        console.log('companies:');
        console.log(companies);
      }).catch((error) => {
        console.log('error:');
        console.log(error);
      });
    },
    updateCompany() {
      const findId = 'feef20ca-19cc-4cf0-8df8-e653a61fe98a';
      const newData = {
        name: 'name',
        credit: 100,
      };
      this.onUpdateCompany(findId, newData).then((company) => {
        console.log('company:');
        console.log(company);
      }).catch((error) => {
        console.log('error:');
        console.log(error);
      });
    },
    deleteCompany() {
      const findId = '3f15d2de-00dd-4ab8-96a5-e323a8f9111f';
      this.onDeleteCompany(findId).then((company) => {
        console.log('company:');
        console.log(company);
      }).catch((error) => {
        console.log('error:');
        console.log(error);
      });
    },
    ...mapActions(useCompaniesStore, [
      'onCreateCompany',
      'onGetCompanies',
      'onUpdateCompany',
      'onDeleteCompany'
    ]),
  },
  computed: {
    ...mapState(useCompaniesStore, ['companies']),
  },

};

</script>

<style scoped>

</style>
