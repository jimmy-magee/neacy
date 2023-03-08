import { createStore, createLogger } from 'vuex';
import users from './modules/users';
import projects from './modules/projects'
import customers from './modules/customers';
import products from './modules/products';
import suppliers from './modules/suppliers'
import subcontractors from './modules/subcontractors';

const debug = process.env.NODE_ENV !== 'production'


export default createStore({
  modules: {
    users,
    projects,
    products,
    suppliers,
    subcontractors,
    customers
  },
  state: {
    loading: false,
    error: null,
    formValidationError: null,
    snack: false,
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    clearError(state) {
      state.error = null
    },
  },
  actions: {
    setLoading({ commit }, payload) {
      commit('setLoading', payload)
    },
    setError({ commit }, payload) {
      commit('setError', payload)
    },
    clearError({ commit }) {
      commit('clearError')
    }
  },
  getters: {
    error(state) {
      console.log('Looking up errors')
      return state.error
    },
    loading(state) {
      return state.loading
    },
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})