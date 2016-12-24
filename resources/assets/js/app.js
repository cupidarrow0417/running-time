import "babel-polyfill";
import Vue from 'vue'
import jQuery from 'jquery';
import _ from 'lodash';
import moment from 'moment';
import store from './vuex/store' // vuex store instance
import router from './router' // vue-router instance
import './mixins';
import { sync } from 'vuex-router-sync';
import VueCharts from 'vue-charts';


/**
 * Assing global variables
 */

window.$ = window.jQuery = jQuery;
window.Vue = Vue;
window._ = _;
window.moment = moment;


/**
 * Require jQuery and Vue dependant libaries
 */

require('bootstrap-sass');
require('vue-resource');


/**
 * Vue Settings
 */

// Vue plugins
Vue.use(VueCharts);

// Authorization header
Vue.http.interceptors.push((request, next) => {
  request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
  // continue to next interceptor
  next((response) => {
    // Show toast with message for non OK responses
    if (response.status !== 200) {
      store.dispatch('addToastMessage', {text: response.body.message || 'Request error status: ' + response.status, type: 'danger'})
    }
  });
});

// Global Vue Components
Vue.component('navbar', require('./components/layout/Navbar.vue'));
Vue.component('spinner', require('./components/layout/Spinner.vue'));
Vue.component('toast', require('./components/layout/Toast.vue'));


/**
 * Authenticated routes
 */
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && ! store.state.auth.me) {
    // if route requires auth and user isn't authenticated
    next('/login');
  } else if (to.matched.some(record => record.meta.requiresAdmin) && ( ! store.state.auth.me
    || ! _.includes(['admin', 'manager'], store.state.auth.me.role))) {
    // if route required admin or manager role
    next('/login');
  } else {
    next();
  }
});

// Sync Vuex and vue-router;
sync(store, router);

/**
 * Application
 *
 * @type {Vue$2}
 */
const app = new Vue({
  el: '#app',
  router,
  store,
});

// Check user login status
store.dispatch('checkLogin').then(() => { router.replace('/dashboard') });
