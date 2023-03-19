import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as labs from 'vuetify/labs/components'
import * as directives from 'vuetify/directives'
import "@mdi/font/css/materialdesignicons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { fa } from "vuetify/iconsets/fa";
import { aliases, mdi } from "vuetify/lib/iconsets/mdi";
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
    path: '/supplier_categories',
    name: 'Supplier Categories Page',
    component: () => import(/* webpackChunkName: "supplierCategoryPage" */ './components/Supplier/SupplierCategories.vue'),
  },
  {
    path: '/suppliers',
    name: 'Suppliers',
    component: () => import(/* webpackChunkName: "suppliersPage" */ './components/Supplier/SuppliersPage.vue'),
  },
  {
    path: '/subcontractor_categories',
    name: 'SubContractor Categories Page',
    component: () => import(/* webpackChunkName: "subContractorCategoryPage" */ './components/SubContractor/SubContractorCategories.vue'),
  },
  {
    path: '/subcontractors',
    name: 'SubContractors',
    component: () => import(/* webpackChunkName: "subcontractorsPage" */ './components/SubContractor/SubContractorsPage.vue'),
  },
  {
    path: '/subcontractors/:id',
    name: 'SubContractor',
    component: () => import(/* webpackChunkName: "subcontractorPage" */ './components/SubContractor/SubContractorPage.vue'),
  },
  {
    path: '/suppliers/:id',
    name: 'SupplierPage',
    component: () => import(/* webpackChunkName: "supplierPage" */ './components/Supplier/SupplierPage.vue'),
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
  {
    path: '/drawing_categories',
    name: 'Drawing Categories Page',
    component: () => import(/* webpackChunkName: "drawingCategoryPage" */ './components/Drawing/DrawingCategories.vue'),
  },
  {
    path: '/boqitem_categories',
    name: 'BoQItemCategoriesPage',
    component: () => import(/* webpackChunkName: "projectPage" */ './components/BoQ/BoQItemCategories.vue'),
  },
  {
    path: '/admin/users',
    name: 'UsersPage',
    component: () => import(/* webpackChunkName: "projectPage" */ './components/Admin/UsersPage.vue'),
  },
]


const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

const vuetify = createVuetify({
  theme: {
    defaultTheme: "dark",
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
      fa,
    },
  },
  components: {
    ...components,
    ...labs,
  },
  directives,
});


const app = createApp(App).use(store).use(router).use(vuetify);

app.component('app-alert', AlertCmp);

app.mount('#app');
