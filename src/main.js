import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as labs from 'vuetify/labs/components'
import * as directives from 'vuetify/directives'
import AlertCmp from './components/Shared/AlertComponent.vue'
import store from './store'


const routes = [
  {
    path: '/',
    name: 'User',
    component: () => import(/* webpackChunkName: "signin" */ './components/HelloWorld.vue')
  },
  {
    path: '/signin',
    name: 'signin component',
    //component: User
    component: () => import(/* webpackChunkName: "signin" */ './components/User/SigninForm.vue')
  },
  {
    path: '/signup',
    name: 'SignupComponent',
    component: () => import(/* webpackChunkName: "signupForm" */ './components/User/SignupForm.vue'),
  },
  {
    path: '/customers/:customerId',
    name: 'CustomerPage',
    component: () => import(/* webpackChunkName: "customerPage" */ './components/Customer/CustomePage.vue'),
  },
  {
    path: '/customers',
    name: 'CustomersPage',
    component: () => import(/* webpackChunkName: "customersPage" */ './components/Customer/CustomersPage.vue'),
  },
  {
    path: '/projects',
    name: 'ProjectsList',
    component: () => import(/* webpackChunkName: "projectsPage" */ './components/Project/ProjectsList.vue'),
  },
  {
    path: '/projects/new',
    name: 'ProjectForm',
    component: () => import(/* webpackChunkName: "createProject" */ './components/Project/CreateProject.vue'),
  },
  {
    path: '/projects/:id',
    name: 'ProjectPage',
    component: () => import(/* webpackChunkName: "projectPage" */ './components/Project/ProjectPage.vue'),
  },
]


const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

const vuetify = createVuetify({
  components: {
    ...components,
    ...labs,
  },
  directives,
});


const app = createApp(App).use(store).use(router).use(vuetify);

app.component('app-alert', AlertCmp);

app.mount('#app');
