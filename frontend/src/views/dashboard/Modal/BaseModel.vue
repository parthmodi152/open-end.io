<template>
  <v-row justify="center">
    <v-dialog
      v-model="loginPopup"
      persistent
      width="666"
    >
      <v-card>
        <slot>

        </slot>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import {useGeneralStore} from '@/store/modules/generalStore';
import { mapActions, mapState } from 'pinia';

export default {
  computed: {
    popup() {
      return this.dialog;
    },
    ...mapState(useGeneralStore, ['loginPopup'])
  },
  methods: {
    close() {
      this.setLoginPopup();
    },
    ...mapActions(useGeneralStore, ['setLoginPopup'])

  }

};
</script>
