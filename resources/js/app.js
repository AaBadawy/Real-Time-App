/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
window.Vue = require('vue');

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('app-home', require('./components/AppHome.vue').default);


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */


import vuetify from './vuetify/index.js'

import App from './App.vue'

import User from './Helpers/user.js'
window.User = User

import Exception from './Helpers/Exception.js'
window.Exception = Exception

import VueSimplemde from 'vue-simplemde'
import 'simplemde/dist/simplemde.min.css'

import md from 'marked'
window.md = md

Vue.component('vue-simplemde', VueSimplemde)

window.EventBus = new Vue();

import router from './Router/router.js'
const app = new Vue({
    vuetify,
    render: h => h(App),
    el: '#app',
    router
});
