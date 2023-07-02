import { apiClient } from '@/api';
import { defineStore } from 'pinia';

export const useCompaniesStore = defineStore('companies', {
  state: () => ({
    companyModel: {
      uuid: '',
      name: '',
      credit: '',
    },
    invalidated: true,
  }),
  getters: {
    getCompanyUuid: ({ state }) => state.companyModel.uuid,
  },
  actions: {
    invalidatedCompanies() {
      this.companyModel = { uuid: '', name: '', credit: '' };
      this.invalidated = true;
    },
    setCompanies(data) {
      this.companyModel = { ...data };
      this.invalidated = false;
    },
    onCreateCompany(newCompanyData) {
      this.invalidatedCompanies();
      return new Promise((resolve, reject) => {
        apiClient.service('companies')
          .create(newCompanyData)
          .then((response) => {
            this.setCompanies(response);
            resolve(response);
          })
          .catch(reject);
      });
    },
    onUpdateCompany(companyUuid, updatedCompanyData) {
      this.invalidatedCompanies();
      return new Promise((resolve, reject) => {
        apiClient.service('companies')
          .patch(companyUuid, updatedCompanyData)
          .then(resolve)
          .catch(reject);
      });
    },
    onDeleteCompany(companyUuid) {
      this.invalidatedCompanies();
      return new Promise((resolve, reject) => {
        apiClient.service('companies')
          .remove(companyUuid)
          .then(resolve)
          .catch(reject);
      });
    },
    onGetCompanies(companyUuid) {
      if (!this.invalidated) {
        return Promise.resolve(this.companyModel);
      }
      return new Promise((resolve, reject) => {
        apiClient.service('companies')
          .find({
            query: {
              uuid: companyUuid,
            }
          })
          .then((response) => {
            this.setCompanies(response.data[0]);
            resolve(response);
          })
          .catch(reject);
      });
    }
  },
});
