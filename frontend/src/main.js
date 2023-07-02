/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue';

// Composables
import { createApp } from 'vue';
import { createPinia } from 'pinia';
// Plugins
import { registerPlugins } from '@/plugins';
import TheNavigation from './components/TheNavigation.vue';

const app = createApp(App);

const state = createPinia();

app.component('the-navigation', TheNavigation);
app.use(state);

registerPlugins(app);

app.mount('#app');
