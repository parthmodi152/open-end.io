<template>
  <base-modal>
    <v-form @submit.prevent>
    <v-card-title>
      <span class="text-h5">Sign Up</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="companyName" label="Company Name*" :rules="companyNameRules"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="userModel.firstName" label="First Name*" :rules="nameRules"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="userModel.lastName"
              label="Last Name*"
              :rules="nameRules"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="userModel.email"
              label="Email*" :rules="emailRules"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="userModel.password"
              label="Password*"
              type="password"
              :rules="passwordRules"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="userModel.confirmPassword"
              label="Confirm Password*"
              type="password"
              :rules="passwordConfirmRules"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <small>*indicates required field</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue-darken-1" variant="text" @click="close">
        Close
      </v-btn>
      <v-btn color="blue-darken-1" variant="text" type="submit" @click="submit">
        Submit
      </v-btn>
    </v-card-actions>
    </v-form>
  </base-modal>
</template>
<script lang='ts'>
import BaseModal from '@/views/dashboard/Modal/BaseModel.vue';
import { mapActions, mapState } from 'pinia';
import { useCompaniesStore } from '@/store/modules/companiesStore';
import { useGeneralStore } from '@/store/modules/generalStore';
import { useUsersStore } from '@/store/modules/usersStore';

interface UserModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default {
  components: {BaseModal},
  data(): {
    validation: boolean,
    companyName: string,
    companyNameRules: ((value: string) => string | boolean)[],
    userModel: UserModel,
    nameRules: ((value: string) => string | boolean)[],
    emailRules: ((value: string) => string | boolean)[],
    passwordRules: ((value: string) => string | boolean)[],
    passwordConfirmRules: ((value: string) => string | boolean)[],
  } {
    return {
      validation: false,
      companyName: '',
      companyNameRules : [
        (value: string): string | boolean => {
          if (!value) {
            return 'Company name is required';
          }
          else if (value.length < 3) {
            return 'Company name be at least 3 characters';
          }
          return true;
        }
      ],
      userModel: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      nameRules: [
        (value: string): string | boolean => {
          this.validation = false;
          if (!value) {
            return 'Name is required';
          }
          else if (value.length < 3) {
            return 'Name must be at least 3 characters';
          }
          else if (!/^[a-zA-Z]+$/.test(value)) {
            return 'Name must only contain letters';
          }
          this.validation = true;
          return true;
        }
      ],
      passwordRules: [
        (value: string): string | boolean => {
          this.validation = false;
          if (!value) {
            return 'Password is required';
          }
          else if (value.length < 8) {
            return 'Password must be at least 8 characters';
          }
          else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value)) {
            return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
          }
          this.validation = true;
          return true;
        }
      ],
      passwordConfirmRules: [
        (value: string): string | boolean => {
          this.validation = false;
          if (!value) {
            return 'Password confirmation is required';
          }
          else if (value !== this.userModel.password) {
            return 'Passwords do not match';
          }
          this.validation = true;
          return true;
        }
      ],
      emailRules: [
        (value: string): string | boolean => {
          this.validation = false;
          if (!value) {
            return 'Email is required';
          }
          else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return 'Email must be valid';
          }
          this.validation = true;
          return true;
        }
      ]
    };
  },
  computed: {
    ...mapState(useGeneralStore, ['loginPopup', 'accountCreation']),
    ...mapState(useCompaniesStore, ['companyModel']),
  },
  methods: {
    close() {
      this.setLoginPopup();
      this.setAccountCreation();
    },
    submit() {
      if (this.validation) {
        const name = this.companyName.trim();
        const credit = 0;
        this.onCreateCompany({
          name: name,
          credit: credit
        }).then(() => {
          this.onCreateUser({
            email: this.userModel.email,
            password: this.userModel.password,
            firstName: this.userModel.firstName,
            lastName: this.userModel.lastName,
            companyUuid: this.companyModel.uuid,
            role: 'COMPANY'
          }).then(() => {
            this.setLoginPopup();
            this.setAccountCreation();
            console.log('success');
          }).catch((error) => {
            console.log(error);
          });
        }).catch((error) => {
          console.log(error);
        });
      }

    },
    ...mapActions(useGeneralStore, ['setLoginPopup', 'setAccountCreation']),
    ...mapActions(useCompaniesStore, ['onCreateCompany']),
    ...mapActions(useUsersStore, ['onCreateUser']),
  }
};
</script>
<style scoped>

</style>
