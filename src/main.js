// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// App styles
import '@/assets/index.scss';

import Vue from 'vue';
import VeeValidate from 'vee-validate';

import App from './App';
import router from './router';

Vue.config.productionTip = false;

Vue.use(VeeValidate, { fastExit: false });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
