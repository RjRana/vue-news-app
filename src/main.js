/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import './Bootstrap'; // not the bootstrap library

import router from '@router';
import store from '@store';

import vuetify from '@/plugins/Vuetify';

import App from './App.vue';

function LaunchApp() {
  return new Vue({
    vuetify: vuetify(),
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');
}

LaunchApp();
