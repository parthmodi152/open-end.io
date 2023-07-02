import { apiClient } from '@/api';
import { defineStore } from 'pinia';

export const useUsersStore = defineStore(('users'), {
  state: () => ({
    userModel: {
      uuid: '',
      firstName: '',
      lastName: '',
      email: '',
      role: '',
    },
    invalidated: true,
  }),
  getters: {
    getUserUuid: ({ userUuid }) => userUuid,
  },
  actions: {
    invalidateUser() {
      this.userModel.uuid = '';
      this.userModel.firstName = '';
      this.userModel.lastName = '';
      this.userModel.email = '';
      this.userModel.role = '';
      this.invalidated = true;
    },
    setUser(data) {
      this.userModel = { ...data };
      this.invalidated = false;
    },
    onCreateUser(newUser) {
      this.invalidateUser();
      return new Promise((resolve, reject) => {
        apiClient.service('users').create(newUser).then((response) => {
          resolve(response);
        }).catch((error) => {
          reject(error);
        });
      });
    },
    onUpdateUser(userUuid, updatedUserData) {
      this.invalidateUser();
      return new Promise((resolve, reject) => {
        apiClient.service('users')
          .patch(userUuid, updatedUserData)
          .then(resolve)
          .catch(reject);
      });
    },
    onDeleteUser(userUuid) {
      this.invalidateUser();
      return new Promise((resolve, reject) => {
        apiClient.service('users')
          .remove(userUuid)
          .then(resolve)
          .catch(reject);
      });
    },
    onGetUsers(queryID) {
      if(!this.invalidated) {
        return Promise.resolve();
      }
      return new Promise((resolve, reject) => {
        apiClient.service('users')
          .find({query: queryID})
          .then((response) => {
            this.setUser(response.data[0]);
            resolve(response);
          })
          .catch(reject);
      });
    }
  }

});
