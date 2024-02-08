/* eslint-disable vue/multi-word-component-names */
/* eslint-disable no-undef */
import { createApp } from 'vue'
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

import PrimeVue from 'primevue/config';
import AutoComplete from 'primevue/autocomplete';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Avatar from 'primevue/avatar';
import AvatarGroup from 'primevue/avatargroup';
import Badge from 'primevue/badge';
import BadgeDirective from 'primevue/badgedirective';
import BlockUI from 'primevue/blockui';
import Button from 'primevue/button';
import Breadcrumb from 'primevue/breadcrumb';
import Calendar from 'primevue/calendar';
import Card from 'primevue/card';
import Chart from 'primevue/chart';
import CascadeSelect from 'primevue/cascadeselect';
import Carousel from 'primevue/carousel';
import Checkbox from 'primevue/checkbox';
import Chip from 'primevue/chip';
import Chips from 'primevue/chips';
import ColorPicker from 'primevue/colorpicker';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmPopup from 'primevue/confirmpopup';
import ConfirmationService from 'primevue/confirmationservice';
import ContextMenu from 'primevue/contextmenu';
import DataTable from 'primevue/datatable';
import DataView from 'primevue/dataview';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions';
import DeferredContent from 'primevue/deferredcontent';
import Dialog from 'primevue/dialog';
import DialogService from 'primevue/dialogservice';
import Divider from 'primevue/divider';
import Dock from 'primevue/dock';
import Dropdown from 'primevue/dropdown';
import DynamicDialog from 'primevue/dynamicdialog';
import Fieldset from 'primevue/fieldset';
import FileUpload from 'primevue/fileupload';
import Galleria from 'primevue/galleria';
import Image from 'primevue/image';
import InlineMessage from 'primevue/inlinemessage';
import Inplace from 'primevue/inplace';
import InputSwitch from 'primevue/inputswitch';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import InputNumber from 'primevue/inputnumber';
import Knob from 'primevue/knob';
import Listbox from 'primevue/listbox';
import MegaMenu from 'primevue/megamenu';
import Menu from 'primevue/menu';
import Menubar from 'primevue/menubar';
import Message from 'primevue/message';
import MultiSelect from 'primevue/multiselect';
import OrderList from 'primevue/orderlist';
import OrganizationChart from 'primevue/organizationchart';
import OverlayPanel from 'primevue/overlaypanel';
import Paginator from 'primevue/paginator';
import Panel from 'primevue/panel';
import PanelMenu from 'primevue/panelmenu';
import Password from 'primevue/password';
import PickList from 'primevue/picklist';
import ProgressBar from 'primevue/progressbar';
import ProgressSpinner from 'primevue/progressspinner';
import Rating from 'primevue/rating';
import RadioButton from 'primevue/radiobutton';
import Ripple from 'primevue/ripple';
import Row from 'primevue/row';
import SelectButton from 'primevue/selectbutton';
import ScrollPanel from 'primevue/scrollpanel';
import ScrollTop from 'primevue/scrolltop';
import Skeleton from 'primevue/skeleton';
import Slider from 'primevue/slider';
import Sidebar from 'primevue/sidebar';
import SpeedDial from 'primevue/speeddial';
import SplitButton from 'primevue/splitbutton';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import Steps from 'primevue/steps';
import StyleClass from 'primevue/styleclass';
import TabMenu from 'primevue/tabmenu';
import TieredMenu from 'primevue/tieredmenu';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Toolbar from 'primevue/toolbar';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Tag from 'primevue/tag';
import Terminal from 'primevue/terminal';
import Timeline from 'primevue/timeline';
import ToggleButton from 'primevue/togglebutton';
import Tooltip from 'primevue/tooltip';
import Tree from 'primevue/tree';
import TreeSelect from 'primevue/treeselect';
import TreeTable from 'primevue/treetable';
import TriStateCheckbox from 'primevue/tristatecheckbox';
import VirtualScroller from 'primevue/virtualscroller';

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
    name: 'ProjectsPage',
    component: () => import(/* webpackChunkName: "projectsPage" */ './components/Project/ProjectsPage.vue'),
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

app.use(PrimeVue, { ripple: true });
app.use(ToastService);
app.use(DialogService);
app.use(ConfirmationService);

app.directive('tooltip', Tooltip);
app.directive('badge', BadgeDirective);
app.directive('ripple', Ripple);
app.directive('styleclass', StyleClass);

//app.component('BlockViewer', BlockViewer);
app.component('CustomersTable', CustomersTable);
//app.component('ProductsTable', ProductsTable);

app.component('Accordion', Accordion);
app.component('AccordionTab', AccordionTab);
app.component('AutoComplete', AutoComplete);
app.component('Avatar', Avatar);
app.component('AvatarGroup', AvatarGroup);
app.component('Badge', Badge);
app.component('BlockUI', BlockUI);
app.component('Breadcrumb', Breadcrumb);
app.component('Button', Button);
app.component('Calendar', Calendar);
app.component('Card', Card);
app.component('Chart', Chart);
app.component('Carousel', Carousel);
app.component('CascadeSelect', CascadeSelect);
app.component('Checkbox', Checkbox);
app.component('Chip', Chip);
app.component('Chips', Chips);
app.component('ColorPicker', ColorPicker);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('ConfirmDialog', ConfirmDialog);
app.component('ConfirmPopup', ConfirmPopup);
app.component('ContextMenu', ContextMenu);
app.component('DataTable', DataTable);
app.component('DataView', DataView);
app.component('DataViewLayoutOptions', DataViewLayoutOptions);
app.component('DeferredContent', DeferredContent);
app.component('Dialog', Dialog);
app.component('Divider', Divider);
app.component('Dock', Dock);
app.component('Dropdown', Dropdown);
app.component('DynamicDialog', DynamicDialog);
app.component('Fieldset', Fieldset);
app.component('FileUpload', FileUpload);
app.component('Galleria', Galleria);
app.component('Image', Image);
app.component('InlineMessage', InlineMessage);
app.component('Inplace', Inplace);
app.component('InputMask', InputMask);
app.component('InputNumber', InputNumber);
app.component('InputSwitch', InputSwitch);
app.component('InputText', InputText);
app.component('Knob', Knob);
app.component('Listbox', Listbox);
app.component('MegaMenu', MegaMenu);
app.component('Menu', Menu);
app.component('Menubar', Menubar);
app.component('Message', Message);
app.component('MultiSelect', MultiSelect);
app.component('OrderList', OrderList);
app.component('OrganizationChart', OrganizationChart);
app.component('OverlayPanel', OverlayPanel);
app.component('Paginator', Paginator);
app.component('Panel', Panel);
app.component('PanelMenu', PanelMenu);
app.component('Password', Password);
app.component('PickList', PickList);
app.component('ProgressBar', ProgressBar);
app.component('ProgressSpinner', ProgressSpinner);
app.component('RadioButton', RadioButton);
app.component('Rating', Rating);
app.component('Row', Row);
app.component('SelectButton', SelectButton);
app.component('ScrollPanel', ScrollPanel);
app.component('ScrollTop', ScrollTop);
app.component('Slider', Slider);
app.component('Sidebar', Sidebar);
app.component('Skeleton', Skeleton);
app.component('SpeedDial', SpeedDial);
app.component('SplitButton', SplitButton);
app.component('Splitter', Splitter);
app.component('SplitterPanel', SplitterPanel);
app.component('Steps', Steps);
app.component('TabMenu', TabMenu);
app.component('TabView', TabView);
app.component('TabPanel', TabPanel);
app.component('Tag', Tag);
app.component('Textarea', Textarea);
app.component('Terminal', Terminal);
app.component('TieredMenu', TieredMenu);
app.component('Timeline', Timeline);
app.component('Toast', Toast);
app.component('Toolbar', Toolbar);
app.component('ToggleButton', ToggleButton);
app.component('Tree', Tree);
app.component('TreeSelect', TreeSelect);
app.component('TreeTable', TreeTable);
app.component('TriStateCheckbox', TriStateCheckbox);
app.component('VirtualScroller', VirtualScroller);

app.component('app-alert', AlertCmp);
app.component('date-picker', DatePicker);
app.component('drawing-category-table', DrawingCategoryTable);
app.component('project-boq-summary-table', ProjectBoQSummaryTable);

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
