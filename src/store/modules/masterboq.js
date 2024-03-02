import webClient from './webclient';
import axios from 'axios';


// initial state
const state = {
    loadedMasterBoQItems: [],
    loadedMasterBoQItemQuotations: [],
    loadedSubContractorQuotationSummary: null,
}

// mutations
const mutations = {
    setLoadedMasterBoQItems(state, payload) {
        state.loadedMasterBoQItems = payload
    },
    
    createMasterBoQItem(state, payload) {
        state.loadedMasterBoQItems.push(payload)
    },
    updateMasterBoQItem(state, payload) {
        state.loadedMasterBoQItems = [
            ...state.loadedMasterBoQItems.filter(element => element.id !== payload.id), payload
        ].sort()
    },
    deleteMasterBoQItem(state, payload) {
        console.log('Committing delete MasterBoQItem')
        console.log(payload)
        const index = state.loadedMasterBoQItems.indexOf(payload)
        console.log('Index of deleted item is ' + index)
        state.loadedMasterBoQItems.splice(index, 1)
    },
    setLoadedMasterBoQItemQuotations(state, payload) {
        state.loadedMasterBoQItemQuotations = payload
    },
    createMasterBoQItemQuotation(state, payload) {
        state.loadedMasterBoQItemQuotations.push(payload)
    },
    updateMasterBoQItemQuotation(state, payload) {
        state.loadedMasterBoQItemQuotations = [
            ...state.loadedMasterBoQItemQuotations.filter(element => element.id !== payload.id), payload
        ]
    },
    deleteMasterBoQItemQuotation(state, payload) {
        console.log('Committing delete of MasterBoQItem Quotation')
        console.log(payload)
        const index = state.loadedMasterBoQItemQuotations.indexOf(payload)
        state.loadedMasterBoQItemQuotations.splice(index, 1)
    },
    setLoadedMasterBoQItemInvoiceSummary(state, payload) {
        state.loadedMasterBoQItemInvoiceSummary = payload
    }

}

// actions
const actions = {
    loadMasterBoQItems({ commit }) {
        console.log('Loading master boq items');
        commit('setLoading', true, { root: true })
        webClient.get('/api/resource/clients/' + localStorage.clientId + '/master-boq')
            .then(response => {
                const masterBoQ = response.data
                console.log('Received masterBoQ from server ')
                console.log(masterBoQ)
                commit('setLoadedMasterBoQItems', masterBoQ)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setLoading', false, { root: true })
                commit('setError', error.response, { root: true })
            })
    },
    loadMasterBoQItem({ commit }, payload) {
        commit('setLoading', true, { root: true })
        webClient.get('/api/resource/clients/' + localStorage.clientId + '/master-boq/' + payload)
            .then(response => {
                const customer = response.data
                console.log('Received customer from server ')
                console.log(customer)
                commit('setLoadedMasterBoQItem', customer)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setLoading', false, { root: true })
                commit('setError', error.response, { root: true })
            })
    },
    createMasterBoQItem({ commit }, payload) {
        commit('setLoading', true, { root: true })
        payload.clientId = localStorage.clientId
        console.log('Creating MasterBoQItem for user with authorization token ' + localStorage.authHeader + ' . Payload = ')
        console.log(payload)
        webClient.post('/api/resource/clients/' + localStorage.clientId + `/master-boq`, payload)
            .then(response => {
                console.log('Received saved MasterBoQItem from server..')
                console.log(response.data)
                const customer = response.data
                commit('createMasterBoQItem', customer)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setError', error.response, { root: true })
                console.log('Oops ' + error.message, { root: true })
                console.log(error)
            })
    },
    updateMasterBoQItem({ commit }, payload) {
        console.log('Updating MasterBoQItem')
        console.log(payload)
        commit('setLoading', true, { root: true })
        payload.clientId = localStorage.clientId
        console.log('Updating MasterBoQItem for user with authorization token ' + localStorage.authHeader + ' . Payload = ')
        console.log(payload)
        webClient.post('/api/resource/clients/' + localStorage.clientId + `/master-boq/` + payload.id, payload)
            .then(response => {
                console.log('Received updated MasterBoQItem from server..')
                console.log(response.data)
                const customer = response.data
                commit('updateMasterBoQItem', customer)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setError', error.response, { root: true })
                console.log('Oops ' + error.message, { root: true })
                console.log(error)
            })
    },
    deleteMasterBoQItem({ commit }, payload) {
        console.log('Deleting customer ')
        //payload.clientId = localStorage.clientId
        console.log(payload)
        console.log(' for user with token ' + localStorage.authHeader)

        webClient.delete('/api/resource/clients/' + localStorage.clientId + `/master-boq/` + payload)
            .then(() => {
                commit('deleteMasterBoQItem', payload)
            })
            .catch((error) => {
                commit('setLoading', false, { root: true })
                commit('setError', error, { root: true })
                console.log('Oops ' + error.message, { root: true })
                console.log(error)
            })
    },
    createMasterBoQItemQuotation({ commit }, payload) {
        //console.log('Creating new quotation for customer  ' + payload.subContractorId + ' assigned to ' + payload.projectId)
        console.log(payload)
        console.log(' for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)

        const formData = new FormData()
        formData.append('quotationFile', payload.quotationFile)
        formData.append('subContractrorId', payload.subContractorId)
        formData.append('clientId', localStorage.clientId)
        formData.append('projectId', payload.projectId)
        formData.append('packageId', payload.packageId)
        formData.append('quotationRef', payload.quotationRef)
        formData.append('description', payload.description)
        formData.append('currency', payload.currency)
        formData.append('grossAmount', payload.grossAmount)
        formData.append('netAmount', payload.netAmount)
        formData.append('quotationDate', payload.quotationDate)
        console.log('Multipart Form Data is ')
        for (var p of formData) {
            console.log('Appended Form Data part ' + p)
        }
        axios.create({
            baseURL: `/`,
            headers: { 'Authorization': localStorage.authHeader, 'Content-Type': 'multipart/form-data' }
        }).post('/api/client/' + localStorage.clientId + '/masterBoQ/' + payload.customerId + '/quotations', formData)
            .then((response) => {
                const savedMasterBoQItemQuotation = response.data
                console.log(savedMasterBoQItemQuotation)
                commit('createMasterBoQItemQuotation', {
                    ...savedMasterBoQItemQuotation,
                    id: savedMasterBoQItemQuotation.id
                })
            })
            .catch((error) => {
                commit('setLoading', false, { root: true })
                commit('setError', error, { root: true })
                console.log('Oops error creating MasterBoQItem Quotation ' + error.message)
                console.log(error)
            })
    },
    updateMasterBoQItemQuotation({ commit }, payload) {
        console.log('Updating MasterBoQItem Quotation ')
        console.log(payload)
        console.log(' for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)
        webClient.put(`/api/client/` + localStorage.clientId + `/masterBoQ/` + payload.subContractorId + '/quotations/' + payload.id, payload)
            .then((response) => {
                const savedMasterBoQItemQuotation = response.data
                console.log(savedMasterBoQItemQuotation)
                commit('updateMasterBoQItemQuotation', {
                    ...savedMasterBoQItemQuotation,
                    id: savedMasterBoQItemQuotation.id
                })
            })
            .catch((error) => {
                commit('setLoading', false, { root: true })
                commit('setError', error, { root: true })
                console.log('Oops error updating MasterBoQItem Quotation ' + error.message)
                console.log(error)
            })
    },
    deleteMasterBoQItemQuotation({ commit }, payload) {
        console.log('Delete MasterBoQItem Quotation ' + payload.id)
        webClient.delete('/api/client/' + localStorage.clientId + '/masterBoQ/' + payload.subContractorId + '/quotations/' + payload.id)
            .then((response) => {
                console.log('Deleted MasterBoQItem Quotation, response status = ' + response.status)
                commit('deleteMasterBoQItemQuotation', payload)
            })
            .catch((error) => {
                commit('setLoading', false, { root: true })
                commit('setError', error, { root: true })
            })
    },
    loadMasterBoQItemQuotationSummary({ commit }, payload) {
        commit('setLoading', true, { root: true })
        console.log('Loading all customer invoices ' + payload)
        console.log('for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)

        webClient.get(`/api/client/` + localStorage.clientId + `/masterBoQ/` + payload + '/quotations/summary')
            .then(response => {
                console.log('Received customer Quotation Summary from server.')
                console.log(response.data)
                const data = response.data
                commit('setLoadedMasterBoQItemQuotationSummary', data)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setLoading', false, { root: true })
                commit('setError', error, { root: true })
            })
    },
    loadMasterBoQItemQuotations({ commit }, payload) {
        commit('setLoading', true, { root: true })
        console.log('Loading all Quotations with customer id ' + payload)
        console.log('for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)

        webClient.get(`/api/client/` + localStorage.clientId + `/masterBoQ/` + payload + '/quotations')
            .then(response => {
                console.log('Received customer Quotations from server.')
                console.log(response.data)
                const data = response.data
                commit('setLoadedMasterBoQItemQuotations', data)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setLoading', false, { root: true })
                commit('setError', error, { root: true })
            })
    },
    downloadMasterBoQItemQuotation({ commit }, payload) {
        console.log('Downloading MasterBoQItem quotation from url:')
        console.log(payload.quotationFileUrl)
        axios({
            baseURL: `/`,
            url: payload.quotationFileUrl,
            method: 'GET',
            responseType: 'blob',
            headers: { 'Authorization': localStorage.authHeader }
        }).then((response) => {
            console.log('Received customer quotation from server:')
            console.log(response.data)
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            const index = payload.quotationFileUrl.lastIndexOf('/') + 1
            const lastIndex = payload.quotationFileUrl.length
            const filename = payload.quotationFileUrl.substring(index, lastIndex)
            console.log('last index of / is ' + index)
            console.log('lenght of file path is ' + payload.quotationFileUrl.length)
            console.log('filename is  ' + filename)
            link.setAttribute('download', filename) // or any other extension
            document.body.appendChild(link)
            link.click()
        }).catch((error) => {
            commit('setLoading', false, { root: true })
            commit('setError', error, { root: true })
        })
    },
    loadMasterBoQItemInvoiceSummary({ commit }, payload) {
        commit('setLoading', true, { root: true })
        console.log('Loading all supplier invoices ' + payload)
        //console.log('for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)

        webClient.get(`/api/resource/clients/` + localStorage.clientId + `/masterBoQ/` + payload + '/invoices/summary')
            .then(response => {
                console.log('Received MasterBoQItem Invoice Summary from server.')
                console.log(response.data)
                const data = response.data
                commit('setLoadedMasterBoQItemInvoiceSummary', data)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setLoading', false, { root: true })
                commit('setError', error, { root: true })
            })
    },
    
}

// getters
const getters = {
    loadedMasterBoQItems(state) {
        return state.loadedMasterBoQItems.sort((A, B) => {
            return A.name > B.name
        })
    },
    loadedMasterBoQItem(state) {
        return state.loadedMasterBoQItem;
    },
    loadedMasterBoQItemQuotations(state) {
        return state.loadedMasterBoQItemQuotations.sort((userA, userB) => {
            return userA.quotationDate > userB.quotationDate
        })
    },
    loadedMasterBoQItemQuotation(state) {
        return (quotationId) => {
            return state.loadedMasterBoQItemQuotations.find((quote) => {
                return quote.id === quotationId
            })
        }
    },
   

    loadedMasterBoQItemQuotationSummary(state) {
        return state.loadedSubContractorQuotationSummary
    },


}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}