import { createApp } from 'vue'; // for Vue 3 

import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

// with Vue 3 createapp
const app = createApp(App);

app.config.productionTip = false;

app.mount('#app');

