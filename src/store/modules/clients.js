import webClient from './webclient';

// initial state
const state = {
    loadedClients: [],
}

// mutations
const mutations = {
    setLoadedClients(state, payload) {
        state.loadedClients = payload
    },
    createClient(state, payload) {
        state.loadedClients.push(payload)
    },
    updateClient(state, payload) {
        state.loadedClients = [
            ...state.loadedClients.filter(u => u.id !== payload.id), payload
        ]
    },
    deleteClient(state, payload) {
        const index = state.loadedClients.indexOf(payload)
        console.log('Index of deleted client is ' + index)
        state.loadedClients.splice(index, 1)
    },
}

const actions = {
    loadClients({ commit }) {
        commit('setLoading', true)
        console.log('Loading all System Clients for user with authorization token ' + localStorage.authHeader)
        webClient.get(`/api/resource/clients`)
            .then(response => {
                console.log('Received Clients')
                console.log(response.data)
                const users = response.data
                commit('setLoadedClients', users)
                commit('setLoading', false)
            })
            .catch(e => {
                this.errors.push(e)
            })
    },
    createClient({ commit }, payload) {
        commit('setLoading', true)
        webClient.post('/api/resource/clients', payload)
            .then(response => {
                console.log('Received saved Client from server..')
                console.log(response.data)
                const cashflow = response.data
                commit('createClient', cashflow)
                commit('setLoading', false)
            })
            .catch(error => {
                commit('setError', error.response)
            })
    },
    updateClient({ commit }, payload) {
        commit('setLoading', true)
        webClient.post('/api/resource/clients/' + payload.id, payload)
            .then(response => {
                console.log('Received updated Client from server..')
                console.log(response.data)
                const cashflow = response.data
                commit('updateClient', cashflow)
                commit('setLoading', false)
            })
            .catch(error => {
                commit('setError', error.response)
            })
    },
    deleteClient({ commit }, payload) {
        commit('setLoading', true)
        webClient.delete('/api/resource/clients/' + payload.id)
            .then(response => {
                console.log(response)
                commit('deleteClient', payload)
                commit('setLoading', false)
            })
            .catch(error => {
                commit('setError', error.response)
            })
    },
}

const getters = {
    loadedClients(state) {
        return state.loadedClients.sort((A, B) => {
            return A.name > B.name
        })
    },

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}