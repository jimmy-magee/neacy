import webClient from './webclient';
import axios from 'axios';


// initial state
const state = {
    loadedCustomers: [],
    loadedCustomer: null,
    loadedCustomerQuotationSummary: null,
    loadedCustomerQuotations: [],
    loadedCustomerInvoiceSummary: null,
    loadedCustomerInvoices: [],
    loadedCustomerPaymentSummary: null,
    loadedCustomerPayments: [],
}

// mutations
const mutations = {
    setLoadedCustomers(state, payload) {
        state.loadedCustomers = payload
    },
    setLoadedCustomer(state, payload) {
        state.loadedCustomer = payload
    },
    createCustomer(state, payload) {
        state.loadedCustomers.push(payload)
    },
    updateCustomer(state, payload) {
        state.loadedCustomers = [
            ...state.loadedCustomers.filter(element => element.id !== payload.id), payload
        ]
    },
    deleteCustomer(state, payload) {
        console.log('Committing delete Customer')
        console.log(payload)
        const index = state.loadedCustomers.indexOf(payload)
        console.log('Index of deleted item is ' + index)
        state.loadedCustomers.splice(index, 1)
    },
    setLoadedCustomerQuotationSummary(state, payload) {
        state.loadedCustomerQuotationSummary = payload
    },
    setLoadedCustomerQuotations(state, payload) {
        state.loadedCustomerQuotations = payload
    },
    createCustomerQuotation(state, payload) {
        state.loadedCustomerQuotations.push(payload)
    },
    updateCustomerQuotation(state, payload) {
        state.loadedCustomerQuotations = [
            ...state.loadedCustomerQuotations.filter(element => element.id !== payload.id), payload
        ]
    },
    deleteCustomerQuotation(state, payload) {
        console.log('Committing delete of Customer Quotation')
        console.log(payload)
        const index = state.loadedCustomerQuotations.indexOf(payload)
        state.loadedCustomerQuotations.splice(index, 1)
    },
    setLoadedCustomerInvoiceSummary(state, payload) {
        state.loadedCustomerInvoiceSummary = payload
    },
    setLoadedCustomerInvoices(state, payload) {
        state.loadedCustomerInvoices = payload
    },
    createCustomerInvoice(state, payload) {
        state.loadedCustomerInvoices.push(payload)
    },
    updateCustomerInvoice(state, payload) {
        state.loadedCustomerInvoices = [
            ...state.loadedCustomerInvoices.filter(element => element.id !== payload.id), payload
        ]
    },
    deleteCustomerInvoice(state, payload) {
        console.log('Committing delete of Customer Invoice')
        console.log(payload)
        const index = state.loadedCustomerInvoices.indexOf(payload)
        state.loadedCustomerInvoices.splice(index, 1)
    },

}

// actions
const actions = {
    loadCustomers({ commit }) {
        commit('setLoading', true, { root: true })
        webClient.get('/api/resource/clients/' + localStorage.clientId + '/customers')
            .then(response => {
                const customers = response.data
                console.log('Received customers from server ')
                console.log(customers)
                commit('setLoadedCustomers', customers)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setLoading', false, { root: true })
                commit('setError', error.response, { root: true })
            })
    },
    loadCustomer({ commit }, payload) {
        commit('setLoading', true, { root: true })
        webClient.get('/api/resource/clients/' + localStorage.clientId + '/customers/' + payload)
            .then(response => {
                const customer = response.data
                console.log('Received customer from server ')
                console.log(customer)
                commit('setLoadedCustomer', customer)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setLoading', false, { root: true })
                commit('setError', error.response, { root: true })
            })
    },
    createCustomer({ commit }, payload) {
        commit('setLoading', true, { root: true })
        payload.clientId = localStorage.clientId
        console.log('Creating Customer for user with authorization token ' + localStorage.authHeader + ' . Payload = ')
        console.log(payload)
        webClient.post('/api/resource/clients/' + localStorage.clientId + `/customers`, payload)
            .then(response => {
                console.log('Received saved Customer from server..')
                console.log(response.data)
                const customer = response.data
                commit('createCustomer', customer)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setError', error.response, { root: true })
                console.log('Oops ' + error.message, { root: true })
                console.log(error)
            })
    },
    updateCustomer({ commit }, payload) {
        commit('setLoading', true, { root: true })
        payload.clientId = localStorage.clientId
        console.log('Updating Customer for user with authorization token ' + localStorage.authHeader + ' . Payload = ')
        console.log(payload)
        webClient.post('/api/resource/clients/' + localStorage.clientId + `/customers/` + payload.id, payload)
            .then(response => {
                console.log('Received updated Customer from server..')
                console.log(response.data)
                const customer = response.data
                commit('updateCustomer', customer)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setError', error.response, { root: true })
                console.log('Oops ' + error.message, { root: true })
                console.log(error)
            })
    },
    deleteCustomer({ commit }, payload) {
        console.log('Deleting customer ')
        payload.clientId = localStorage.clientId
        console.log(payload)
        console.log(' for user with token ' + localStorage.authHeader)

        webClient.delete('/api/resource/clients/' + localStorage.clientId + `/customers/` + payload.id, payload)
            .then(() => {
                commit('customers/deleteCustomer', payload)
            })
            .catch((error) => {
                commit('setLoading', false, { root: true })
                commit('setError', error, { root: true })
                console.log('Oops ' + error.message, { root: true })
                console.log(error)
            })
    },
    createCustomerQuotation({ commit }, payload) {
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
        }).post('/api/client/' + localStorage.clientId + '/customers/' + payload.customerId + '/quotations', formData)
            .then((response) => {
                const savedCustomerQuotation = response.data
                console.log(savedCustomerQuotation)
                commit('createCustomerQuotation', {
                    ...savedCustomerQuotation,
                    id: savedCustomerQuotation.id
                })
            })
            .catch((error) => {
                commit('setLoading', false, { root: true })
                commit('setError', error, { root: true })
                console.log('Oops error creating Customer Quotation ' + error.message)
                console.log(error)
            })
    },
    updateCustomerQuotation({ commit }, payload) {
        console.log('Updating Customer Quotation ')
        console.log(payload)
        console.log(' for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)
        webClient.put(`/api/client/` + localStorage.clientId + `/customers/` + payload.subContractorId + '/quotations/' + payload.id, payload)
            .then((response) => {
                const savedCustomerQuotation = response.data
                console.log(savedCustomerQuotation)
                commit('updateCustomerQuotation', {
                    ...savedCustomerQuotation,
                    id: savedCustomerQuotation.id
                })
            })
            .catch((error) => {
                commit('setLoading', false, { root: true })
                commit('setError', error, { root: true })
                console.log('Oops error updating Customer Quotation ' + error.message)
                console.log(error)
            })
    },
    deleteCustomerQuotation({ commit }, payload) {
        console.log('Delete Customer Quotation ' + payload.id)
        webClient.delete('/api/client/' + localStorage.clientId + '/customers/' + payload.subContractorId + '/quotations/' + payload.id)
            .then((response) => {
                console.log('Deleted Customer Quotation, response status = ' + response.status)
                commit('deleteCustomerQuotation', payload)
            })
            .catch((error) => {
                commit('setLoading', false, { root: true })
                commit('setError', error, { root: true })
            })
    },
    loadCustomerQuotationSummary({ commit }, payload) {
        commit('setLoading', true, { root: true })
        console.log('Loading all customer invoices ' + payload)
        console.log('for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)

        webClient.get(`/api/client/` + localStorage.clientId + `/customers/` + payload + '/quotations/summary')
            .then(response => {
                console.log('Received customer Quotation Summary from server.')
                console.log(response.data)
                const data = response.data
                commit('setLoadedCustomerQuotationSummary', data)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setLoading', false, { root: true })
                commit('setError', error, { root: true })
            })
    },
    loadCustomerQuotations({ commit }, payload) {
        commit('setLoading', true, { root: true })
        console.log('Loading all Quotations with customer id ' + payload)
        console.log('for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)

        webClient.get(`/api/client/` + localStorage.clientId + `/customers/` + payload + '/quotations')
            .then(response => {
                console.log('Received customer Quotations from server.')
                console.log(response.data)
                const data = response.data
                commit('setLoadedCustomerQuotations', data)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setLoading', false, { root: true })
                commit('setError', error, { root: true })
            })
    },
    downloadCustomerQuotation({ commit }, payload) {
        console.log('Downloading Customer quotation from url:')
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
    loadCustomerInvoiceSummary({ commit }, payload) {
        commit('setLoading', true, { root: true })
        console.log('Loading all supplier invoices ' + payload)
        //console.log('for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)

        webClient.get(`/api/resource/clients/` + localStorage.clientId + `/customers/` + payload + '/invoices/summary')
            .then(response => {
                console.log('Received Customer Invoice Summary from server.')
                console.log(response.data)
                const data = response.data
                commit('setLoadedCustomerInvoiceSummary', data)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setLoading', false, { root: true })
                commit('setError', error, { root: true })
            })
    },
    loadCustomerInvoices({ commit }, payload) {
        commit('setLoading', true, { root: true })
        console.log('Loading all Invoices with supplier id ' + payload)
        //console.log('for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)
        webClient.get(`/api/resource/clients/` + localStorage.clientId + `/customers/` + payload + '/invoices')
            .then(response => {
                console.log('Received Customer Invoices from server.')
                console.log(response.data)
                const data = response.data
                commit('setLoadedCustomerInvoices', data)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setLoading', false, { root: true })
                commit('setError', error, { root: true })
            })
    },
    downloadCustomerInvoice({ commit }, payload) {
        const docUrl = '/api/resource/clients/' + localStorage.clientId + '/customers/' + payload.supplierId + '/invoices/' + payload.id + '/download'
        console.log('Downloading Customer Invoice from url:')
        console.log(docUrl)
        axios({
            baseURL: `/`,
            url: docUrl,
            method: 'GET',
            responseType: 'blob',
            headers: { 'Authorization': localStorage.authHeader }
        }).then((response) => {
            console.log('Received invoice from server:')
            console.log(response.data)
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', payload.fileName) // or any other extension
            document.body.appendChild(link)
            link.click()
        }).catch((error) => {
            commit('setLoading', false, { root: true })
            commit('setError', error, { root: true })
        })
    },
    createCustomerInvoice({ commit }, payload) {
        console.log('Creating new invoice for customer  ' + payload.customerId + ' assigned to ' + payload.projectId)
        console.log(payload)
        //console.log(' for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)

        const formData = new FormData()
        formData.append('invoiceFile', payload.invoiceFile)
        formData.append('customerId', payload.customerId)
        formData.append('clientId', localStorage.clientId)
        formData.append('projectId', payload.projectId)
        formData.append('invoiceRef', payload.invoiceRef)
        formData.append('status', payload.status)
        formData.append('description', payload.description)
        formData.append('currency', payload.currency)
        formData.append('grossAmount', payload.grossAmount)
        formData.append('netAmount', payload.netAmount)
        formData.append('invoiceDate', payload.invoiceDate)
        formData.append('paymentDueDate', payload.paymentDueDate)
        console.log('Multipart Form Data is ')
        for (var p of formData) {
            console.log('Appended Form Data part ' + p)
        }
        axios.create({
            baseURL: `/`,
            headers: { 'Authorization': localStorage.authHeader, 'Content-Type': 'multipart/form-data' }
        }).post('/api/resource/clients/' + localStorage.clientId + '/projects/' + payload.projectId + '/customers/' + payload.customerId + '/invoices', formData)
            .then((response) => {
                const savedCustomerInvoice = response.data
                console.log(savedCustomerInvoice)
                commit('createCustomerInvoice', {
                    ...savedCustomerInvoice,
                    id: savedCustomerInvoice.id
                })
            })
            .catch((error) => {
                commit('setLoading', false, { root: true })
                commit('setError', error, { root: true })
                console.log('Oops error creating Customer Invoice ' + error.message)
                console.log(error)
            })
    },
    updateCustomerInvoice({ commit }, payload) {
        console.log('Updating Customer Invoice ')
        console.log(payload)
        console.log(' for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)
        webClient.post(`/api/resource/clients/` + localStorage.clientId + `/customers/` + payload.customerId + '/invoices/' + payload.id, payload)
            .then((response) => {
                const savedCustomerInvoice = response.data
                console.log(savedCustomerInvoice)
                commit('updateCustomerInvoice', {
                    ...savedCustomerInvoice,
                    id: savedCustomerInvoice.id
                })
            })
            .catch((error) => {
                commit('setLoading', false, { root: true })
                commit('setError', error, { root: true })
            })
    },
    deleteCustomerInvoice({ commit }, payload) {
        console.log('Delete Customer Invoice ' + payload.id)
        webClient.delete('/api/resource/clients/' + localStorage.clientId + '/customers/' + payload.customerId + '/invoices/' + payload.id)
            .then((response) => {
                console.log('Deleted Customer Invoice, response status = ' + response.status)
                commit('deleteCustomerInvoice', payload)
            })
            .catch((error) => {
                commit('setLoading', false, { root: true })
                commit('setError', error, { root: true })
            })
    },
}

// getters
const getters = {
    loadedCustomers(state) {
        return state.loadedCustomers.sort((A, B) => {
            return A.name > B.name
        })
    },
    loadedCustomer(state) {
        return state.loadedCustomer;
    },
    loadedCustomerQuotations(state) {
        return state.loadedCustomerQuotations.sort((userA, userB) => {
            return userA.quotationDate > userB.quotationDate
        })
    },
    loadedCustomerQuotation(state) {
        return (quotationId) => {
            return state.loadedCustomerQuotations.find((quote) => {
                return quote.id === quotationId
            })
        }
    },
    loadedCustomerInvoices(state) {
        return state.loadedCustomerInvoices.sort((userA, userB) => {
            return userA.invoiceDate > userB.invoiceDate
        })
    },
    loadedCustomerInvoice(state) {
        return (invoiceId) => {
            return state.loadedCustomerInvoices.find((invoice) => {
                return invoice.id === invoiceId
            })
        }
    },
    loadedCustomerPayments(state) {
        return state.loadedCustomerPayments
    },
    loadedCustomerQuotationSummary(state) {
        return state.loadedSubContractorQuotationSummary
    },
    loadedCustomerInvoiceSummary(state) {
        return state.loadedCustomerInvoiceSummary
    },

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}