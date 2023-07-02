<template>
  <div>
    <v-slide-x-reverse-transition>
      <v-alert
        v-model="alertVisible"
        class="alerts"
        :color="alertType"
        :dismissible="true"
        :type="alertType"
               border="start"
               prominent>
        {{ alertMessage }}
      </v-alert>
    </v-slide-x-reverse-transition>
  </div>
</template>

<script>
import {useGeneralStore} from '@/store/modules/generalStore';
import {mapState} from 'pinia';
export default {
  computed: {
    ...mapState(useGeneralStore, ['alertVisible', 'alertMessage', 'alertType', 'alertTimeout', 'alertColor', 'alertDismissible']),
  },
};
</script>

<style scoped>
.alerts{
  position: absolute;
  top: 10px;
  right: 0;
  z-index: 9999;
  width: 50%;
}
</style>
