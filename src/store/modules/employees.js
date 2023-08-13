import webClient from './webclient';
import axios from 'axios';


// initial state
const state = {
    loadedEmployees: [],
    loadedEmployee: null,
    loadedEmployeeQuotationSummary: null,
    loadedEmployeeQuotations: [],
    loadedEmployeeInvoiceSummary: null,
    loadedEmployeeInvoices: [],
    loadedEmployeePaymentSummary: null,
    loadedEmployeePayments: [],
}

// mutations
const mutations = {
    setLoadedEmployees(state, payload) {
        state.loadedEmployees = payload
    },
    setLoadedEmployee(state, payload) {
        state.loadedEmployee = payload
    },
    createEmployee(state, payload) {
        state.loadedEmployees.push(payload)
    },
    updateEmployee(state, payload) {
        state.loadedEmployees = [
            ...state.loadedEmployees.filter(element => element.id !== payload.id), payload
        ]
    },
    deleteEmployee(state, payload) {
        console.log('Committing delete Employee')
        console.log(payload)
        const index = state.loadedEmployees.indexOf(payload)
        console.log('Index of deleted item is ' + index)
        state.loadedEmployees.splice(index, 1)
    },
    setLoadedEmployeeQuotationSummary(state, payload) {
        state.loadedEmployeeQuotationSummary = payload
    },
    setLoadedEmployeeQuotations(state, payload) {
        state.loadedEmployeeQuotations = payload
    },
    createEmployeeQuotation(state, payload) {
        state.loadedEmployeeQuotations.push(payload)
    },
    updateEmployeeQuotation(state, payload) {
        state.loadedEmployeeQuotations = [
            ...state.loadedEmployeeQuotations.filter(element => element.id !== payload.id), payload
        ]
    },
    deleteEmployeeQuotation(state, payload) {
        console.log('Committing delete of Employee Quotation')
        console.log(payload)
        const index = state.loadedEmployeeQuotations.indexOf(payload)
        state.loadedEmployeeQuotations.splice(index, 1)
    },
    setLoadedEmployeeInvoiceSummary(state, payload) {
        state.loadedEmployeeInvoiceSummary = payload
    },
    setLoadedEmployeeInvoices(state, payload) {
        state.loadedEmployeeInvoices = payload
    },
    createEmployeeInvoice(state, payload) {
        state.loadedEmployeeInvoices.push(payload)
    },
    updateEmployeeInvoice(state, payload) {
        state.loadedEmployeeInvoices = [
            ...state.loadedEmployeeInvoices.filter(element => element.id !== payload.id), payload
        ]
    },
    deleteEmployeeInvoice(state, payload) {
        console.log('Committing delete of Employee Invoice')
        console.log(payload)
        const index = state.loadedEmployeeInvoices.indexOf(payload)
        state.loadedEmployeeInvoices.splice(index, 1)
    },

}

// actions
const actions = {
    loadEmployees({ commit }) {
        console.log("loading employees!!")
        commit('setLoading', true, { root: true })
        webClient.get('/api/resource/clients/' + localStorage.clientId + '/employees')
            .then(response => {
                const employees = response.data
                console.log('Received employees from server ')
                console.log(employees)
                commit('setLoadedEmployees', employees)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setLoading', false, { root: true })
                commit('setError', error.response, { root: true })
            })
    },
    loadEmployee({ commit }, payload) {
        commit('setLoading', true, { root: true })
        webClient.get('/api/resource/clients/' + localStorage.clientId + '/employees/' + payload)
            .then(response => {
                const employee = response.data
                console.log('Received employee from server ')
                console.log(employee)
                commit('setLoadedEmployee', employee)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setLoading', false, { root: true })
                commit('setError', error.response, { root: true })
            })
    },
    createEmployee({ commit }, payload) {
        commit('setLoading', true, { root: true })
        payload.clientId = localStorage.clientId
        console.log('Creating Employee for user with authorization token ' + localStorage.authHeader + ' . Payload = ')
        console.log(payload)
        webClient.post('/api/resource/clients/' + localStorage.clientId + `/employees`, payload)
            .then(response => {
                console.log('Received saved Employee from server..')
                console.log(response.data)
                const employee = response.data
                commit('createEmployee', employee)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setError', error.response, { root: true })
                console.log('Oops ' + error.message, { root: true })
                console.log(error)
            })
    },
    updateEmployee({ commit }, payload) {
        console.log("updating employee")
        commit('setLoading', true, { root: true })
        payload.clientId = localStorage.clientId
        console.log('Updating Employee for user with authorization token ' + localStorage.authHeader + ' . Payload = ')
        console.log(payload)
        webClient.post('/api/resource/clients/' + localStorage.clientId + `/employees/` + payload.id, payload)
            .then(response => {
                console.log('Received updated Employee from server..')
                console.log(response.data)
                const employee = response.data
                commit('updateEmployee', employee)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setError', error.response, { root: true })
                console.log('Oops ' + error.message, { root: true })
                console.log(error)
            })
    },
    deleteEmployee({ commit }, payload) {
        console.log('Deleting employee ')
        payload.clientId = localStorage.clientId
        console.log(payload)
        console.log(' for user with token ' + localStorage.authHeader)

        webClient.delete('/api/resource/clients/' + localStorage.clientId + `/employees/` + payload.id, payload)
            .then(() => {
                commit('employees/deleteEmployee', payload)
            })
            .catch((error) => {
                commit('setLoading', false, { root: true })
                commit('setError', error, { root: true })
                console.log('Oops ' + error.message, { root: true })
                console.log(error)
            })
    },
    createEmployeeQuotation({ commit }, payload) {
        //console.log('Creating new quotation for employee  ' + payload.subContractorId + ' assigned to ' + payload.projectId)
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
        }).post('/api/client/' + localStorage.clientId + '/employees/' + payload.employeeId + '/quotations', formData)
            .then((response) => {
                const savedEmployeeQuotation = response.data
                console.log(savedEmployeeQuotation)
                commit('createEmployeeQuotation', {
                    ...savedEmployeeQuotation,
                    id: savedEmployeeQuotation.id
                })
            })
            .catch((error) => {
                commit('setLoading', false, { root: true })
                commit('setError', error, { root: true })
                console.log('Oops error creating Employee Quotation ' + error.message)
                console.log(error)
            })
    },
    updateEmployeeQuotation({ commit }, payload) {
        console.log('Updating Employee Quotation ')
        console.log(payload)
        console.log(' for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)
        webClient.put(`/api/client/` + localStorage.clientId + `/employees/` + payload.subContractorId + '/quotations/' + payload.id, payload)
            .then((response) => {
                const savedEmployeeQuotation = response.data
                console.log(savedEmployeeQuotation)
                commit('updateEmployeeQuotation', {
                    ...savedEmployeeQuotation,
                    id: savedEmployeeQuotation.id
                })
            })
            .catch((error) => {
                commit('setLoading', false, { root: true })
                commit('setError', error, { root: true })
                console.log('Oops error updating Employee Quotation ' + error.message)
                console.log(error)
            })
    },
    deleteEmployeeQuotation({ commit }, payload) {
        console.log('Delete Employee Quotation ' + payload.id)
        webClient.delete('/api/client/' + localStorage.clientId + '/employees/' + payload.subContractorId + '/quotations/' + payload.id)
            .then((response) => {
                console.log('Deleted Employee Quotation, response status = ' + response.status)
                commit('deleteEmployeeQuotation', payload)
            })
            .catch((error) => {
                commit('setLoading', false, { root: true })
                commit('setError', error, { root: true })
            })
    },
    loadEmployeeQuotationSummary({ commit }, payload) {
        commit('setLoading', true, { root: true })
        console.log('Loading all employee invoices ' + payload)
        console.log('for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)

        webClient.get(`/api/client/` + localStorage.clientId + `/employees/` + payload + '/quotations/summary')
            .then(response => {
                console.log('Received employee Quotation Summary from server.')
                console.log(response.data)
                const data = response.data
                commit('setLoadedEmployeeQuotationSummary', data)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setLoading', false, { root: true })
                commit('setError', error, { root: true })
            })
    },
    loadEmployeeQuotations({ commit }, payload) {
        commit('setLoading', true, { root: true })
        console.log('Loading all Quotations with employee id ' + payload)
        console.log('for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)

        webClient.get(`/api/client/` + localStorage.clientId + `/employees/` + payload + '/quotations')
            .then(response => {
                console.log('Received employee Quotations from server.')
                console.log(response.data)
                const data = response.data
                commit('setLoadedEmployeeQuotations', data)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setLoading', false, { root: true })
                commit('setError', error, { root: true })
            })
    },
    downloadEmployeeQuotation({ commit }, payload) {
        console.log('Downloading Employee quotation from url:')
        console.log(payload.quotationFileUrl)
        axios({
            baseURL: `/`,
            url: payload.quotationFileUrl,
            method: 'GET',
            responseType: 'blob',
            headers: { 'Authorization': localStorage.authHeader }
        }).then((response) => {
            console.log('Received employee quotation from server:')
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
    loadEmployeeInvoiceSummary({ commit }, payload) {
        commit('setLoading', true, { root: true })
        console.log('Loading all supplier invoices ' + payload)
        //console.log('for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)

        webClient.get(`/api/resource/clients/` + localStorage.clientId + `/employees/` + payload + '/invoices/summary')
            .then(response => {
                console.log('Received Employee Invoice Summary from server.')
                console.log(response.data)
                const data = response.data
                commit('setLoadedEmployeeInvoiceSummary', data)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setLoading', false, { root: true })
                commit('setError', error, { root: true })
            })
    },
    loadEmployeeInvoices({ commit }, payload) {
        commit('setLoading', true, { root: true })
        console.log('Loading all Invoices with supplier id ' + payload)
        //console.log('for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)
        webClient.get(`/api/resource/clients/` + localStorage.clientId + `/employees/` + payload + '/invoices')
            .then(response => {
                console.log('Received Employee Invoices from server.')
                console.log(response.data)
                const data = response.data
                commit('setLoadedEmployeeInvoices', data)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setLoading', false, { root: true })
                commit('setError', error, { root: true })
            })
    },
    downloadEmployeeInvoice({ commit }, payload) {
        const docUrl = '/api/resource/clients/' + localStorage.clientId + '/employees/' + payload.supplierId + '/invoices/' + payload.id + '/download'
        console.log('Downloading Employee Invoice from url:')
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
    createEmployeeInvoice({ commit }, payload) {
        console.log('Creating new invoice for employee  ' + payload.employeeId + ' assigned to ' + payload.projectId)
        console.log(payload)
        //console.log(' for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)

        const formData = new FormData()
        
        var i = 0
        var len = payload.invoiceFile.files.length
        for (; i < len;) {
            formData.append('invoiceFile', payload.invoiceFile.files[i])
            i++
        }
        formData.append('employeeId', payload.employeeId)
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
        }).post('/api/resource/clients/' + localStorage.clientId + '/projects/' + payload.projectId + '/employees/' + payload.employeeId + '/invoices', formData)
            .then((response) => {
                const savedEmployeeInvoice = response.data
                console.log(savedEmployeeInvoice)
                commit('createEmployeeInvoice', {
                    ...savedEmployeeInvoice,
                    id: savedEmployeeInvoice.id
                })
            })
            .catch((error) => {
                commit('setLoading', false, { root: true })
                commit('setError', error, { root: true })
                console.log('Oops error creating Employee Invoice ' + error.message)
                console.log(error)
            })
    },
    updateEmployeeInvoice({ commit }, payload) {
        console.log('Updating Employee Invoice ')
        console.log(payload)
        console.log(' for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)
        webClient.post(`/api/resource/clients/` + localStorage.clientId + `/employees/` + payload.employeeId + '/invoices/' + payload.id, payload)
            .then((response) => {
                const savedEmployeeInvoice = response.data
                console.log(savedEmployeeInvoice)
                commit('updateEmployeeInvoice', {
                    ...savedEmployeeInvoice,
                    id: savedEmployeeInvoice.id
                })
            })
            .catch((error) => {
                commit('setLoading', false, { root: true })
                commit('setError', error, { root: true })
            })
    },
    deleteEmployeeInvoice({ commit }, payload) {
        console.log('Delete Employee Invoice ' + payload.id)
        webClient.delete('/api/resource/clients/' + localStorage.clientId + '/employees/' + payload.employeeId + '/invoices/' + payload.id)
            .then((response) => {
                console.log('Deleted Employee Invoice, response status = ' + response.status)
                commit('deleteEmployeeInvoice', payload)
            })
            .catch((error) => {
                commit('setLoading', false, { root: true })
                commit('setError', error, { root: true })
            })
    },
}

// getters
const getters = {
    loadedEmployees(state) {
        return state.loadedEmployees.sort((A, B) => {
            return A.name > B.name
        })
    },
    loadedEmployee(state) {
        return state.loadedEmployee;
    },
    loadedEmployeeQuotations(state) {
        return state.loadedEmployeeQuotations.sort((userA, userB) => {
            return userA.quotationDate > userB.quotationDate
        })
    },
    loadedEmployeeQuotation(state) {
        return (quotationId) => {
            return state.loadedEmployeeQuotations.find((quote) => {
                return quote.id === quotationId
            })
        }
    },
    loadedEmployeeInvoices(state) {
        return state.loadedEmployeeInvoices.sort((userA, userB) => {
            return userA.invoiceDate > userB.invoiceDate
        })
    },
    loadedEmployeeInvoice(state) {
        return (invoiceId) => {
            return state.loadedEmployeeInvoices.find((invoice) => {
                return invoice.id === invoiceId
            })
        }
    },
    loadedEmployeePayments(state) {
        return state.loadedEmployeePayments
    },
    loadedEmployeeQuotationSummary(state) {
        return state.loadedSubContractorQuotationSummary
    },
    loadedEmployeeInvoiceSummary(state) {
        return state.loadedEmployeeInvoiceSummary
    },

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}