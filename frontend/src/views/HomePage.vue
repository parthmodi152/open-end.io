<template>
    <v-layout>
      <v-main>
        <the-navigation>

        </the-navigation>
        <login-page v-if="!accountCreation"></login-page>
        <signup-modal v-else></signup-modal>
        <section>
          <h1 class="slogan">Code Open ends from your survey instantly, with AI</h1>
          <h2 class="description">
            Upload from CSV - Many languages supported = Standard open ends - Brands name
          </h2>
          <v-container justify="center">
            <v-row>
              <v-col cols="12" md="4">
                <v-card class="instruction">
                  <v-card-subtitle>1. Upload CSV</v-card-subtitle>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="instruction">
                  <v-card-subtitle>2. See quota and pay</v-card-subtitle>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="instruction">
                  <v-card-subtitle>3. Download coded CSV</v-card-subtitle>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
          <h2 class="claims">No account necessary - Immediate results - Guaranteed quality</h2>
          <div class="buttons">
            <v-btn class="btnOptions" @click="setup">Start!</v-btn>
            <v-btn class="btnOptions">FAQ</v-btn>
            <v-btn class="btnOptions">Pricing</v-btn>
          </div>
        </section>
      </v-main>
    </v-layout>
</template>

<script>
import { useGeneralStore } from '@/store/modules/generalStore';
import LoginPage from '@/views/dashboard/Modal/LoginModal.vue';
import {mapActions, mapState} from 'pinia';
import SignupModal from '@/views/dashboard/Modal/SignupModal.vue';
import {useAuthStore} from '@/store/modules/authStore';

export default {
  components: {SignupModal, LoginPage },
  computed: {
    ...mapState(useGeneralStore, ['loginPopup', 'accountCreation']),
    ...mapState(useAuthStore, ['loggedIn']),
  },
  methods: {
    setPopup() {
      this.setLoginPopup();
    },
    setup() {
      if (!this.loggedIn) {
        this.setPopup();
        return;
      }
      this.$router.push('/setup');
    },
    ...mapActions(useGeneralStore, ['setLoginPopup']),
  },
};
</script>

<style scoped>
section {
  margin: 8rem auto;
  text-align: center;
}

.instruction {
  height: 10rem;
  width: 15rem;
  margin: auto;
}

.buttons {
  margin: 2rem auto;
}

.btnOptions {
  margin-left: 1rem;
  background-color: lightblue;
}

.slogan,
.claims {
  color: green;
}

.description {
  color: rgb(43, 134, 156);
}

.btnOptions:hover {
  background-color: green;
  color: white;
}
</style>
