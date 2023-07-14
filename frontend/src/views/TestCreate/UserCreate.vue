<template>
  <main>
    <v-sheet width="500" class="mx-auto">
      <v-form @submit.prevent>
        <v-text-field
          v-model='email'
          label='Email'
        ></v-text-field>
        <v-text-field
          v-model="password"
          type="password"
          label="Password"
        ></v-text-field>
        <v-text-field
          v-model="company"
          label="Company"
        ></v-text-field>
        <v-text-field
          v-model="firstName"
          label="First Name"
        ></v-text-field>
        <v-text-field
          v-model="lastName"
          label="Last Name"
        ></v-text-field>

        <v-btn @click="createUser">Submit</v-btn>
        <v-btn @click="findUser">Find</v-btn>
      </v-form>
    </v-sheet>
  </main>
</template>

<script lang='ts'>
import { mapActions, mapState } from 'pinia';
import { useUsersStore } from '@/store/modules/usersStore';


export default {
  data() {
    return {
      email: '',
      password: '',
      company: '',
      firstName: '',
      lastName: '',
    };
  },
  methods: {
    createUser() {
      if (this.email.trim() !== '' || this.password.trim() !== '' || this.company.trim() !== '' || this.firstName.trim() !== '' || this.lastName.trim() !== '') {
        const response = this.onCreateUser( {
          email: this.email,
          password: this.password,
          companyUuid: this.company,
          firstName: this.firstName,
          lastName: this.lastName
        });
        console.log(response);
      }
    },
    findUser() {
      if (this.email.trim() !== '') {
        this.onGetUsers({ email: this.email }).then((users) => {
          console.log('users:');
          console.log(users);
        }).catch((error) => {
          console.log('error:');
          console.log(error);
        });
      }
    },
    ...mapActions(useUsersStore, ['onCreateUser', 'onGetUsers']),
  },
  computed: {
    ...mapState(useUsersStore, ['users']),
  },

};
</script>


<style scoped>

</style>
