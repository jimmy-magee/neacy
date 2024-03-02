/* eslint-disable vue/multi-word-component-names */
/* eslint-disable no-undef */
import { createApp, computed } from 'vue'
import App from './App.vue'
import '@/assets/styles.scss';
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

import CustomersTable from '@/components/Customer/CustomersTable.vue';
import DatePicker from '@/components/Shared/DatePicker.vue'
import DrawingCategoryTable from '@/components/Drawing/DrawingCategoryTable.vue'
import ProjectBoQTable from '@/components/Project/ProjectBoQTable.vue'
import ProjectQuotationTable from '@/components/Project/ProjectQuotationsTable.vue'

import ProjectSpaceBoQTreeview from '@/components/Project/ProjectBoQBySpaceId.vue';
import ProjectTasksTable from '@/components/Project/ProjectTasksTable.vue';
import ProjectSupplierInvoiceTable from '@/components/Project/ProjectSupplierInvoiceTable.vue';
import ProjectSubContractorInvoiceTable from '@/components/Project/ProjectSubContractorInvoiceTable.vue';
import ProjectCustomerInvoiceTable from '@/components/Project/ProjectCustomerInvoiceTable.vue';
import ProjectProcurementTable from '@/components/Project/ProjectProcurementTable.vue';
import ProjectContactsTable from '@/components/Project/ProjectContactsTable.vue';
import ProjectRFITable from '@/components/Project/ProjectRFITable.vue';
import ProjectImageTable from '@/components/Project/ProjectImageTable.vue';
import ProjectDrawingsTable from '@/components/Project/ProjectDrawingTable.vue';
import ProjectSpaceStatsTable from '@/components/Project/ProjectSpaceStatsTable.vue';
import ProjectBoQSummaryTable from '@/components/Project/ProjectBoQSummaryTable.vue';
import ProjectValuationsTable from '@/components/Project/ProjectValuationsTable.vue';
import ProjectBoQProductsTable from '@/components/Project/ProjectBoQProductsTable.vue';
import ProjectOrdersTable from '@/components/Project/ProjectOrdersTable.vue';
import ProjectAccessControlTable from '@/components/Project/ProjectAccessControlTable.vue';
import ProjectBoQTakeOffTable from '@/components/Project/ProjectBoQTakeOffTable.vue';
import ProjectBoQSummaryPanel from '@/components/Project/ProjectBoQSummaryPanel.vue';

import MasterBoQTable from '@/components/BoQ/MasterBoQTable.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: () => import(/* webpackChunkName: "signin" */ './components/HelloWorld.vue')
  },
  {
    path: '/signin',
    name: 'SignInPage',
    //component: User
    component: () => import(/* webpackChunkName: "signin" */ './components/User/SigninForm.vue')
  },
  {
    path: '/signup',
    name: 'SignupPage',
    component: () => import(/* webpackChunkName: "signupForm" */ './components/User/SignupForm.vue'),
  },
  {
    path: '/pages/empty',
    name: 'EmptyPage',
    component: () => import('./views/pages/EmptyPage.vue'),
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
    path: '/employees',
    name: 'EmployeesPage',
    component: () => import(/* webpackChunkName: "employeesPage" */ './components/Employee/EmployeesPage.vue'),
  },
  {
    path: '/employees/:employeeId',
    name: 'EmployeePage',
    component: () => import(/* webpackChunkName: "employeePage" */ './components/Employee/EmployeePage.vue'),
  },
  {
    path: '/supplier_categories',
    name: 'SupplierCategoriesPage',
    component: () => import(/* webpackChunkName: "supplierCategoryPage" */ './components/Supplier/SupplierCategories.vue'),
  },
  {
    path: '/suppliers',
    name: 'SuppliersPage',
    component: () => import(/* webpackChunkName: "suppliersPage" */ './components/Supplier/SuppliersPage.vue'),
  },
  {
    path: '/subcontractor_categories',
    name: 'SubContractorCategoriesPage',
    component: () => import(/* webpackChunkName: "subContractorCategoryPage" */ './components/SubContractor/SubContractorCategories.vue'),
  },
  {
    path: '/subcontractors',
    name: 'SubContractorsPage',
    component: () => import(/* webpackChunkName: "subcontractorsPage" */ './components/SubContractor/SubContractorsPage.vue'),
  },
  {
    path: '/subcontractors/:id',
    name: 'SubContractorPage',
    component: () => import(/* webpackChunkName: "subcontractorPage" */ './components/SubContractor/SubContractorPage.vue'),
  },
  {
    path: '/suppliers/:id',
    name: 'SupplierPage',
    component: () => import(/* webpackChunkName: "supplierPage" */ './components/Supplier/SupplierPage.vue'),
  },
  {
    path: '/projects',
    name: 'ProjectsPage',
    component: () => import(/* webpackChunkName: "projectsPage" */ './components/Project/ProjectsPage.vue'),
  },
  {
    path: '/projects/new',
    name: 'ProjectFormPage',
    component: () => import(/* webpackChunkName: "createProject" */ './components/Project/CreateProject.vue'),
  },
  {
    path: '/projects/:id',
    name: 'ProjectPage',
    component: () => import(/* webpackChunkName: "projectPage" */ './components/Project/ProjectPage.vue'),
  },
  {
    path: '/projects/:projectId/procurement',
    name: 'ProjectProcurementPackagesPage',
    component: () => import(/* webpackChunkName: "projectPage" */ './components/Project/Procurement/ProjectProcurementPackagesPage.vue'),
  },
  {
    path: '/projects/:projectId/procurement/:id',
    name: 'ProjectProcurementPage',
    component: () => import(/* webpackChunkName: "projectPage" */ './components/Project/Procurement/ProjectProcurementPage.vue'),
  },
  {
    path: '/projects/:projectId/space/:id',
    name: 'ProjectSpacePage',
    component: () => import(/* webpackChunkName: "projectPage" */ './components/Project/ProjectSpacePage.vue'),
  },
  {
    path: '/drawing_categories',
    name: 'DrawingCategoriesPage',
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
  {
    path: '/products',
    name: 'ProductsPage',
    component: () => import(/* webpackChunkName: "projectPage" */ './components/Product/ProductsPage.vue'),
  },
  {
    path: '/products/:id',
    name: 'ProductPage',
    component: () => import(/* webpackChunkName: "projectPage" */ './components/Product/ProductPage.vue'),
  },
  {
    path: '/product_categories',
    name: 'ProductCategoriesPage',
    component: () => import(/* webpackChunkName: "projectPage" */ './components/Product/ProductCategoriesPage.vue'),
  },
]


const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});


router.beforeEach(async (to, from) => {
  console.log('checking route to ');
  console.log(to);
  console.log('from ');
  console.log(from);
  console.log(userIsAuthenticated);
if(to.fullPath == '/signup' || to.fullPath == '/') {
  return true;
}
  if (
    // make sure the user is authenticated
    !userIsAuthenticated.value &&
    // ❗️ Avoid an infinite redirect
    to.name !== 'SignInPage'
  ) {
    // redirect the user to the login page
    return { name: 'SignInPage' }
  }
})

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

const userIsAuthenticated = computed(() => store.getters['users/userIsAuthenticatedAndHasRoleUser']);


//app.component('BlockViewer', BlockViewer);
app.component('CustomersTable', CustomersTable);
//app.component('ProductsTable', ProductsTable);

app.component('app-alert', AlertCmp);
app.component('date-picker', DatePicker);
app.component('drawing-category-table', DrawingCategoryTable);
app.component('project-boq-summary-table', ProjectBoQSummaryTable);
app.component('project-boq-summary-panel', ProjectBoQSummaryPanel);
app.component('master-boq-table', MasterBoQTable);

app.component('project-boq-table', ProjectBoQTable);
app.component('project-boq-takeoff-table', ProjectBoQTakeOffTable);

app.component('project-boq-products-table', ProjectBoQProductsTable);
app.component('project-quotation-table', ProjectQuotationTable);
app.component('project-valuations-table', ProjectValuationsTable);
app.component('project-tasks-table', ProjectTasksTable);
app.component('project-supplier-invoice-table', ProjectSupplierInvoiceTable);
app.component('project-subcontractor-invoice-table', ProjectSubContractorInvoiceTable);
app.component('project-customer-invoice-table', ProjectCustomerInvoiceTable);
app.component('project-contacts-table', ProjectContactsTable);
app.component('project-rfi-table', ProjectRFITable);
app.component('project-image-table', ProjectImageTable);
app.component('project-drawings-table', ProjectDrawingsTable);
app.component('project-space-stats-table', ProjectSpaceStatsTable);
app.component('project-procurement-table', ProjectProcurementTable);
app.component('project-orders-table', ProjectOrdersTable);
app.component('project-acl-table', ProjectAccessControlTable);
app.component('project-space-boq-treeview', ProjectSpaceBoQTreeview)
app.mount('#app');
