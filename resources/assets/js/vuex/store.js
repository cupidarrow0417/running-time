import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import createLogger from 'vuex/dist/logger';
import toast from './modules/toast';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const state = {
  user: null, // Logged in user
  loading: false,
  error: '',
  dashboard: {
    weekly_count: 0,
    weekly_avg_speed: 0,
    weekly_avg_pace: 0,
    week_chart: [],
    max_speed: 0,
    max_distance: 0,
    max_time: 0,
  },
  entries: {
    current_page: 1,
    data: [],
  },
  users: {
    current_page: 1,
    data: [],
  },
  show_user: {},
};


const mutations = {

  STOP_LOADING (state) {
    state.loading = false;
  },

  CHECK_LOGIN (state) {
    state.loading = true;
  },

  CHECK_LOGIN_OK (state, user) {
    state.user = user;
    state.loading = false;
  },

  CHECK_LOGIN_FAIL (state) {
    state.loading = false;
  },

  LOGIN (state) {
    state.loading = true;
  },

  LOGIN_OK (state, user) {
    state.user = user;
    state.loading = false;
  },

  LOGIN_FAIL (state) {
    state.loading = false;
  },

  LOGOUT_OK (state) {
    state.user = null;
  },

  REGISTER (state) {
    state.loading = true;
  },

  REGISTER_OK (state, user) {
    state.user = user;
    state.loading = false;
  },

  REGISTER_FAIL (state) {
    state.loading = false;
  },

  UPDATE_PROFILE (state) {
    state.loading = true;
  },

  UPDATE_PROFILE_OK (state, user) {
    state.user = user;
    state.loading = false;
  },

  UPDATE_PROFILE_FAIL (state) {
    state.loading = false;
  },

  LOAD_DASHBOARD (state) {
    state.loading = true;
  },

  LOAD_DASHBOARD_OK (state, dashboard) {
    state.dashboard = dashboard;
    state.loading = false;
  },

  LOAD_DASHBOARD_FAIL (state) {
    state.loading = false;
  },

  LOAD_ENTRIES (state) {
    state.loading = true;
  },

  LOAD_ENTRIES_OK (state, entries) {
    state.entries = entries;
    state.loading = false;
  },

  LOAD_ENTRIES_FAIL (state) {
    state.loading = false;
  },

  STORE_ENTRY (state) {
    state.loading = true;
  },

  STORE_ENTRY_OK (state, entry) {
    state.loading = false;
  },

  STORE_ENTRY_FAIL (state) {
    state.loading = false;
  },

  UPDATE_ENTRY (state) {
    state.loading = true;
  },

  UPDATE_ENTRY_OK (state, entry) {
    state.entries.data = state.entries.data.map(el => (el.id === entry.id ? entry : el));
    state.loading = false;
  },

  UPDATE_ENTRY_FAIL (state) {
    state.loading = false;
  },

  DELETE_ENTRY (state) {
    state.loading = true;
  },

  DELETE_ENTRY_OK (state, entry) {
    state.loading = false;
  },

  DELETE_ENTRY_FAIL (state) {
    state.loading = false;
  },

  LOAD_USERS (state) {
    state.loading = true;
  },

  LOAD_USERS_OK (state, users) {
    state.users = users;
    state.loading = false;
  },

  LOAD_USERS_FAIL (state) {
    state.loading = false;
  },

  SHOW_USER (state) {
    state.loading = true;
  },

  SHOW_USER_OK (state, user) {
    state.show_user = user;
    state.loading = false;
  },

  SHOW_USER_FAIL (state) {
    state.loading = false;
  },

  UPDATE_USER (state) {
    state.loading = true;
  },

  UPDATE_USER_OK (state, user) {
    state.users.data = state.users.data.map(el => (el.id === user.id ? user : el));
    state.loading = false;
  },

  UPDATE_USER_FAIL (state) {
    state.loading = false;
  },

  DELETE_USER (state) {
    state.loading = true;
  },

  DELETE_USER_OK (state, entry) {
    state.loading = false;
  },

  DELETE_USER_FAIL (state) {
    state.loading = false;
  },

};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  strict: debug,
  plugins: debug ? [createLogger()] : [],
  modules: {
    toast,
  }
});
