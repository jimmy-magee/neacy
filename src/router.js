//import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/HelloWorld'
//import AuthGuard from './auth-guard'

//Vue.use(Router)

const router = VueRouter.createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: VueRouter.createWebHashHistory(),
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/signin',
      name: 'signin component',
      component: () => import(/* webpackChunkName: "signin" */ './components/User/SigninForm.vue')
    },
    {
      path: '/',
      name: 'HomeComponent',
      ccomponent: () => import(/* webpackChunkName: "signin" */ './components/HelloWorld.vue')
    },
    {
      path: '/signup',
      name: 'SignupComponent',
      component: () => import(/* webpackChunkName: "signin" */ './components/User/SignupForm.vue'),
    }
  ]
})
