import webClient from './webclient'
import axios from 'axios'

const state = {
    loadedUserRoles: [],
    loadedUsers: [],
    user: null,
    loading: false,
    error: null,
    formValidationError: null,
    snack: false,
}
const mutations = {
    setLoadedUserRoles(state, payload) {
        state.loadedUserRoles = payload
    },
    setLoadedUsers(state, payload) {
        state.loadedUsers = payload
    },
    createUser(state, payload) {
        state.loadedUsers.push(payload)
    },
    updateUser(state, payload) {
        state.loadedUsers = [
            ...state.loadedUsers.filter(u => u.username !== payload.username), payload
        ]
    },
    setUser(state, payload) {
        state.user = payload
    },
    setLoading(state, payload) {
        state.loading = payload
    },
    setError(state, payload) {
        state.error = payload
    },
    clearError(state) {
        console.log('clearing error..')
        state.error = null
    },
    logout({ commit }) {
        localStorage.authHeader = null
        commit('setUser', null)
    },
}
const actions = {
    loadUserRoles({ commit }) {
        commit('setLoading', true)
        console.log('Loading all User Roles for user with authorization token ' + localStorage.authHeader)
        webClient.get(`/api/resource/clients/` + localStorage.clientId + `/resources/users/roles`)
            .then(response => {
                console.log('Received User Roles')
                console.log(response.data)
                commit('setLoadedUserRoles', response.data)
                commit('setLoading', false)
            })
            .catch(e => {
                console.log('Received error loading user roles..')
                console.log(e)
            })
    },
    loadUsers({ commit }) {
        commit('setLoading', true)
        console.log('Loading all System Users for user with authorization token ' + localStorage.authHeader)
        // webClient.get(`/api/resource/clients/` + localStorage.clientId + `/resources/users`)
        webClient.get(`/api/resource/users`)
            .then(response => {
                console.log('Received Users')
                console.log(response.data)
                const users = response.data
                commit('setLoadedUsers', users)
                commit('setLoading', false)
            })
            .catch(e => {
                this.errors.push(e)
            })
    },
    createUser({ commit }, payload) {
        commit('setLoading', true)
        console.log('Creating System User for authorization token ' + localStorage.authHeader + ' . Payload = ')
        console.log(payload)
        webClient.post(`/auth/signup`, payload)
            .then(response => {
                console.log('Received saved user from server..')
                console.log(response.data)
                commit('createUser', response.data)
                commit('setLoading', false)
            })
            .catch(error => {
                commit('setError', error)
                console.log('Oops error creating user ' + error.message)
                console.log(error)
            })
    },
    updateUser({ commit }, payload) {
        commit('setLoading', true)
        //console.log('Updating System User for authorization token ' + localStorage.authHeader + ' . Payload = ')
        //console.log(payload)
        webClient.post(`/api/resource/clients/` + localStorage.clientId + `/resources/users/` + payload.username, payload)
            .then(response => {
                commit('updateUser', response.data)
                commit('setLoading', false)
            })
            .catch(error => {
                commit('setError', 'Oops error updating user ' + error.message)

            })
    },
    signUserUp({ commit }, payload) {
        commit('setLoading', true)
        commit('clearError')
        axios.create({
            baseURL: `/`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            }
        })
            .post('/auth/signup', payload)
            .then(
                user => {
                    commit('setLoading', false)
                    console.log('Created new user..')
                    console.log(user)
                    const newUser = {
                        id: user.uid,
                        registeredMeetups: []
                    }
                    commit('setUser', newUser)
                    //router.push('/home')
                }
            )
            .catch(
                error => {
                    commit('setLoading', false)
                    commit('setError', error.response.data.errors)
                    console.log(error.response.data.errors[0].message)
                }
            )
    },
    signUserIn({ commit }, payload) {
        commit('setLoading', true)
        commit('clearError')

        axios.create({
            baseURL: `/`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            }
        })
            .post('/auth/login', payload)
            .then(response => {
                const authHeader = response.headers['authorization'] // response.headers('Lemon-Authorization')
                //console.log('Authorization received: ' + authHeader)
                if (authHeader) {
                    localStorage.authHeader = 'Bearer ' + authHeader
                    console.log('localStorage.authHeader set to ' + localStorage.authHeader)
                }
                const signedInUser = response.data
                if (signedInUser && signedInUser.clientId) {
                    localStorage.clientId = signedInUser.clientId
                    localStorage.companyId = signedInUser.companyId
                    //   console.log('localStorage.clientId  set to ' + signedInUser.tag.clientId)
                    //   localStorage.subContractorId = signedInUser.tag.subContractorId
                    //   console.log('localStorage.subContractorId  set to ' + signedInUser.tag.subContractorId)
                }
                console.log('Received user details..')
                console.log(signedInUser)
                commit('setLoading', false)
                commit('setUser', signedInUser)
            }
            )
            .catch(
                error => {
                    console.log('Received error signing in user..')
                    console.log(error.response.statusText)
                    commit('setLoading', false)
                    commit('setError', error.response.statusText)
                }
            )
    },
    logout({ commit }) {
        localStorage.authHeader = null
        commit('setUser', null)
    },
    clearError({ commit }) {
        commit('clearError')
    }

}
const getters = {
    loadedUserRoles(state) {
        return state.loadedUserRoles.sort((roleA, roleB) => {
            return roleA.name > roleB.name
        })
    },
    loadedUsers(state) {
        return state.loadedUsers.sort((userA, userB) => {
            return userA.username > userB.username
        })
    },
    user(state) {
        console.log('getting user')
        return state.user
    },
    userIsAuthenticated(state) {
        console.log('checking is user authenticated')
        return state.user !== null && state.user !== undefined
    },
    userIsAuthenticatedAndHasRoleUser(state) {
        // console.log('checking is user authenticated and has role USER')
        if (state.user == null || state.user == undefined) {
            return false
        }
        if (state.user.roles !== null && state.user.roles !== undefined) {
            return state.user.roles.indexOf('ROLE_USER') > -1
        }
    },
    userIsAuthenticatedAndHasRoleSubContractor(state) {
        // console.log('checking is user authenticated and has role USER')
        if (state.user == null || state.user == undefined) {
            return false
        }
        if (state.user.roles !== null && state.user.roles !== undefined) {
            return state.user.roles.indexOf('ROLE_SUBCONTRACTOR') > -1
        }
    },
    userIsAuthenticatedAndHasRoleProjectQuantitySurveyor(state) {
        // console.log('checking is user authenticated and has role ADMIN')
        if (state.user == null || state.user == undefined) {
            return false
        }
        if (state.user.roles !== null && state.user.roles !== undefined) {
            return state.user.roles.indexOf('ROLE_PROJECT_QUANTITY_SURVEYOR') > -1
        }
    },
    userIsAuthenticatedAndHasRoleAdmin(state) {
        // console.log('checking is user authenticated and has role ADMIN')
        if (state.user == null || state.user == undefined) {
            return false
        }
        if (state.user.roles !== null && state.user.roles !== undefined) {
            return state.user.roles.indexOf('ROLE_ADMIN') > -1
        }
    },
    userIsAuthenticatedAndHasRoleProjectAdmin(state) {
        if (state.user == null || state.user == undefined) {
            return false
        }
        if (state.user.roles !== null && state.user.roles !== undefined) {
            return state.user.roles.indexOf('ROLE_PROJECT_ADMIN') > -1
        }
    },
    userIsAuthenticatedAndHasRoleProjectConsultant(state) {
        if (state.user == null || state.user == undefined) {
            return false
        }
        if (state.user.roles !== null && state.user.roles !== undefined) {
            return state.user.roles.indexOf('ROLE_PROJECT_CONSULTANT') > -1
        }
    },

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}