import Vue from 'vue';
import VueCompositionAPI, { createApp, h } from '@vue/composition-api';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default-dark.css';

import App from './App.vue'

Vue.use(VueMaterial)
Vue.use(VueCompositionAPI)

const app = createApp({
  render: () => h(App)
})

app.mount('#app')
