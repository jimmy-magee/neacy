<template>
  <v-app id="app">
    <v-app-bar app color="blue" dark>
      <v-toolbar-title>
        <v-app-bar-nav-icon @click.stop="sideNav = !sideNav"></v-app-bar-nav-icon>
        leanne luch</v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="user">
        {{ user.username }}
      </div>
    </v-app-bar>
    <v-navigation-drawer app temporary v-model="sideNav">
      <v-list>
        <v-list-item v-for="item in menuItems" :key="item.title" :to="item.link">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>{{ item.title }}</v-list-item-content>
        </v-list-item>
        <v-list-item v-if="userIsAuthenticated" @click="onLogout">
          <v-list-item-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-item-action>
          <v-list-item-content>Logout</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      
      <v-container fluid>
        <v-fade-transition mode="out-in">
          <router-view></router-view>
        </v-fade-transition>
      </v-container>
    </v-main>

    <v-footer app></v-footer>
  </v-app>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {

  setup() {
    const store = useStore();
    const router = useRouter();
    const sideNav = ref(false);
    const interval = ref({});
    const user = computed(() => store.getters['users/user']);
    const userIsAuthenticatedAndHasRoleUser = computed(() => store.getters['users/userIsAuthenticatedAndHasRoleUser']);
    const userIsAuthenticatedAndHasRoleSubContractor = computed(() => store.getters['users/userIsAuthenticatedAndHasRoleSubContractor']);
    const userIsAuthenticatedAndHasRoleProjectAdmin = computed(() => store.getters['users/userIsAuthenticatedAndHasRoleProjectAdmin']);
    const userIsAuthenticatedAndHasRoleAdmin = computed(() => store.getters['users/userIsAuthenticatedAndHasRoleAdmin']);
    const menuItems = computed(() => {
      let menuItems = [
        { icon: 'face', title: 'Sign up', link: '/signup' },
        { icon: 'lock_open', title: 'Sign in', link: '/signin' }
      ]
      if (userIsAuthenticatedAndHasRoleUser.value) {
        menuItems = [
          { icon: 'settings', title: 'Projects', link: '/projects' },
        ]
      }
      if (userIsAuthenticatedAndHasRoleSubContractor.value) {
        menuItems = [
          { icon: 'build', title: 'SubContractor', link: '/subcontractors/' + localStorage.companyId }
        ]
      }
      if (userIsAuthenticatedAndHasRoleProjectAdmin.value) {
        menuItems = [
          { icon: 'dashboard', title: 'Projects', link: '/projects' },
          { icon: 'construction', title: 'SubContractors', link: '/subcontractors' },
          { icon: 'assignment', title: 'Suppliers', link: '/suppliers' },
          { icon: 'api', title: 'Products', link: '/product_categories' },
        ]
      }
      if (userIsAuthenticatedAndHasRoleAdmin.value) {
        menuItems = [
          { icon: 'dashboard', title: 'Projects', link: '/projects' },
          { icon: 'api', title: 'Products', link: '/product_categories' },
          { icon: 'bar_chart', title: 'Suppliers', link: '/suppliers' },
          { icon: 'construction', title: 'SubContractors', link: '/subcontractors' },
          //{icon: 'construction', title: 'SubContractors V2', link: '/subcontractorsV2'},

          //{icon: 'api', title: 'Products', link: '/products'},
          //{icon: 'api', title: 'Product Quotations', link: '/products_quotation_form'},

          //{icon: 'bar_chart', title: 'Cashflows', link: '/cashflows'},
          { icon: 'settings', title: 'Customers', link: '/customers' },
          //{icon: 'attach_money', title: 'Clients', link: '/admin/clients'},
          { icon: 'assignment', title: 'Drawing Categories', link: '/drawing_categories' },
          { icon: 'assignment', title: 'BoQItem Categories', link: '/boqitem_categories' },
          { icon: 'assignment', title: 'SubContractor Categories', link: '/subcontractor_categories' },
          { icon: 'assignment', title: 'Supplier Categories', link: '/supplier_categories' },
          { icon: 'supervised_user_circle', title: 'Users', link: '/admin/users' },
        ]
      }
      return menuItems;
    });

    const onLogout = () => {
          store.dispatch('users/logout')
          .then(
              router.push('/signin')
          )
    };


    return {
      user,
      userIsAuthenticated: computed(() => { return store.getters['users/userIsAuthenticated'] }),
      loading: computed(() => store.getters.loading),
      menuItems,
      sideNav,
      interval,
      onLogout,
    }

  }
}
</script>

<style scoped></style>



<!--
<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
<v-card>
  <SigninForm/>
</v-card>
  <SignupForm/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import SigninForm from './components/User/SigninForm.vue';
import SignupForm from './components/User/SignupForm.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
    SigninForm,
    SignupForm
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
-->