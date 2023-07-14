<template>
  <v-app>
    <router-view v-slot="{ Component }">
      <transition name="slide" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <notify-alert></notify-alert>
  </v-app>
</template>

<script lang="ts">
import notifyAlert from '@/components/Notify/NotifyAlert.vue';
import {defineComponent} from 'vue';

export default defineComponent({
  components: {notifyAlert}
});


</script>

