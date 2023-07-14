<template>
  <form-modal>
    <v-card-title>
      <span class="headline">Login</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="model.email"
              prepend-icon="mdi-email"
              label="Email*"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="model.password"
              :append-icon="passwordIcon"
              :type="passwordType"
              prepend-icon="mdi-lock"
              label="Password*"
              @click:append="showPassword = !showPassword"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <small>*indicates required field</small>
    </v-card-text>
    <v-card-actions>
      <v-btn
       color="blue-darken-1"
        variant="text"
        @click="signup"
      >Sign-up!</v-btn>
      <v-spacer></v-spacer>
      <v-btn
        color="blue-darken-1"
        variant="text"
        @click="close"
      >
        Close
      </v-btn>
      <v-btn
        color="blue-darken-1"
        variant="text"
        @click="submitLogin"
      >
        Login
      </v-btn>
    </v-card-actions>
  </form-modal>
</template>

<script lang="ts">
import { useGeneralStore } from '@/store/modules/generalStore';
import { mapActions, mapState } from 'pinia';
import FormModal from '@/views/dashboard/Modal/BaseModel.vue';
import { useAuthStore } from '@/store/modules/authStore';

export default {
  components: {FormModal},
  computed: {
    popup() {
      return this.dialog;
    },
    passwordIcon() {
      return this.showPassword ?  'mdi-eye-off' : 'mdi-eye';
    },
    passwordType() {
      return this.showPassword ?  'text' : 'password';
    },
    ...mapState(useGeneralStore, ['loginPopup']),
    ...mapState(useAuthStore, ['loggedIn']),
  },
  data(): {
    model: {
      email: string;
      password: string;
    };
    showPassword: boolean;
  } {
    return {
      model: {
        email: '',
        password: ''
      },
      showPassword: false,

    }
  },
  methods: {
    invalidate() {
      this.model.email = '';
      this.model.password = '';
    },
    close() {
      this.invalidate();
      this.setLoginPopup();
    },
    submitLogin(){
      const authorize = {
        strategy: 'local',
        email: this.model.email,
        password: this.model.password
      };
      this.login(authorize).then(() => {
        this.showAlert('Login Successful','success');
        this.showPassword = false;
        this.close();
        this.$router.push('/dashboard');
      });
    },
    signup(){
      this.setAccountCreation();
    },
    ...mapActions(useGeneralStore, ['setLoginPopup', 'setAccountCreation', 'showAlert']),
    ...mapActions(useAuthStore, ['login']),

  }

};
</script>
