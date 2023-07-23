import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import axios from 'axios';

window.Vue = Vue;
window.Vuex = Vuex;
window.axios = axios;

Vue.use(Vuex);
Vue.use(VueRouter);
