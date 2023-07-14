<template>
  <section>
    <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false">

      <v-list dense nav>
        <v-list-item prepend-avatar="../assets/logo.png" title="OPENENDS.IO" nav>
          <template v-slot:append>
            <v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
          </template>
        </v-list-item>
        <v-divider></v-divider>
        <v-sheet >
          <div v-if="loggedIn">
            <v-list-item
              v-for="item in navItems"
              :key="item.title"
              :prepend-icon="item.icon"
              :title="item.title"
              :value="item.title"
              :to="item.to"
            ></v-list-item>
          </div>
          <v-list-item prepend-icon="mdi-account" :title="logStatus" @click="setPopup"></v-list-item>
        </v-sheet>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="grey">
      <v-app-bar-title class="text-left">OPENENDS.IO</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn class="text-right" v-if="!loggedIn" @click="setPopup">Login</v-btn>
      <v-btn class="text-right navButton" v-if="loggedIn" to="/dashboard/projects/create-project">Create Project</v-btn>
      <v-btn class="text-right" icon="mdi-dots-vertical" size="x-small" v-if="loggedIn" >
      </v-btn>
    </v-app-bar>
  </section>

</template>

<script lang="ts">
import { useGeneralStore } from '../store/modules/generalStore';
import { mapActions, mapState } from 'pinia';
import {useAuthStore} from '@/store/modules/authStore';
import {apiClient, socketClient} from '@/api';


export default {
  computed: {
    logStatus() {
      return this.loggedIn ? 'Logout' : 'Login';
    },
    ...mapState(useGeneralStore, ['loginPopup', 'accountCreation']),
    ...mapState(useAuthStore, ['loggedIn']),
  },
  data() {
    return {
      drawer: true,
      rail: true,
      navItems: [
        {title: 'Home', icon: 'mdi-home-city', to: '/dashboard/home'},
        {title: 'Projects', icon: 'mdi-folder', to: '/dashboard/projects'},
        {title: 'Settings', icon: 'mdi-wrench', to: '/dashboard/settings'},
      ],
    };
  },
  methods: {
    setPopup() {
      if (this.loggedIn) {
        this.logout();
        this.showAlert('Logout successfully', 'success');
        this.$router.push('/dashboard/home');

        return;
      }
      this.setLoginPopup();
    },
    setup() {
      if (!this.loggedIn) {
        this.setPopup();
        return;
      }
      this.$router.push('/setup');
    },
    ...mapActions(useGeneralStore, ['setLoginPopup', 'showAlert']),
    ...mapActions(useAuthStore, ['logout']),
  },
};
</script>

<style scoped>
.navButton {
  background-color: #409940;
  left: -10px;
}
</style>
