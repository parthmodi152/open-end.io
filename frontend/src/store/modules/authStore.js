import { apiClient, socketClient } from '@/api';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore(('auth'), {
  state: () => ({
    user: {
      email: '',
      firstName: '',
      lastName: '',
      uuid: '',
      role: 'USER',
      companyUuid: null,
      company: null
    },
    loggedIn: false,
  }),
  // Get information about the user
  getters: {
    authUserInfo: ({ user }) => user,
    authRole: ({ user }) => user.role,
    authUserId: ({ user }) => user.uuid,
    authUserCompany: ({ user }) => user.company,
  },
  actions: {
    setAuthUser({ email, firstName, lastName, uuid, role, companyUuid, company }) {
      this.user.email = email;
      this.user.firstName = firstName;
      this.user.lastName = lastName;
      this.user.uuid = uuid;
      this.user.role = role;
      this.user.companyUuid = companyUuid;
      this.user.company = company;
    },
    login(context) {
      return new Promise((resolve, reject) => {
        apiClient.authenticate(context).then((response) => {
          this.setAuthUser(response.user);
          this.loggedIn = true;
          console.log(response.user);
          resolve(response);
        }).catch((error) => {
          reject(error);
        });
      });
    },
    logout() {
      apiClient.logout().then(() => {
        this.loggedIn = false;
      });
    }
  }

});
