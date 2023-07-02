<template>
  <v-app>
    <router-view />
    <notify-alert></notify-alert>
  </v-app>
</template>

<script>
import notifyAlert from '@/components/Notify/NotifyAlert.vue';
import {defineComponent} from 'vue';

export default defineComponent({
  components: {notifyAlert}
});


</script>

