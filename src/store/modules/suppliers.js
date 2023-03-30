import webClient from './webclient'
import axios from 'axios'

const state = {
    loadedSupplier: null,
    loadedSupplierCategories: [],
    loadedSuppliers: [],
    loadedSupplierProducts: [],
    loadedSupplierInvoiceSummary: null,
    loadedSupplierInvoices: [],
    loadedSupplierQuotations: [],
    loadedSupplierQuotationSummary: null,
    loadedSupplierOrders: [],
}
const mutations = {
    createSupplier(state, payload) {
        state.loadedSuppliers.push(payload)
    },
    updateSupplier(state, payload) {
        state.loadedSuppliers = [
            ...state.loadedSuppliers.filter(u => u.id !== payload.id), payload
        ]
    },
    deleteSupplier(state, payload) {
        const index = state.loadedSuppliers.indexOf(payload)
        state.loadedSuppliers.splice(index, 1)
    },
    setLoadedSuppliers(state, payload) {
        state.loadedSuppliers = payload
    },
    setLoadedSupplier(state, payload) {
        state.loadedSupplier = payload
    },
    setLoadedSupplierProducts (state, payload) {
        console.log('Set supplier products')
        console.log(payload)
        state.loadedSupplierProducts = payload
      },
    createSupplierProduct(state, payload) {
        state.loadedSupplierProducts.push(payload)
    },
    deleteSupplierProduct(state, payload) {
        console.log('Committing delete of Supplier Product')
        console.log(payload)
        const index = state.loadedSupplierProducts.findIndex( p => p.id == payload)
        state.loadedSupplierProducts.splice(index, 1)
    },
    setLoadedSupplierQuotations(state, payload) {
        state.loadedSupplierQuotations = payload
    },
    setLoadedSupplierOrders(state, payload) {
        state.loadedSupplierOrders = payload
    },
    setLoadedSupplierInvoiceSummary(state, payload) {
        state.loadedSupplierInvoiceSummary = payload
    },
    setLoadedSupplierInvoices(state, payload) {
        state.loadedSupplierInvoices = payload
    },
    createSupplierInvoice(state, payload) {
        state.loadedSupplierInvoices.push(payload)
    },
    updateSupplierInvoice(state, payload) {
        state.loadedSupplierInvoices = [
            ...state.loadedSupplierInvoices.filter(element => element.id !== payload.id), payload
        ]
    },
    deleteSupplierInvoice(state, payload) {
        console.log('Committing delete of Supplier Invoice')
        console.log(payload)
        const index = state.loadedSupplierInvoices.indexOf(payload)
        state.loadedSupplierInvoices.splice(index, 1)
    },
    setLoadedSupplierCategories(state, payload) {
        state.loadedSupplierCategories = payload
    },
    createSupplierCategory(state, payload) {
        state.loadedSupplierCategories.push(payload)
    },
    updateSupplierCategory(state, payload) {
        state.loadedSupplierCategories = [
            ...state.loadedSupplierCategories.filter(u => u.id !== payload.id), payload
        ]
    },
    deleteSupplierCategory(state, payload) {
        const index = state.loadedSupplierCategories.indexOf(payload)
        console.log('Index of deleted supplier category is ' + index)
        state.loadedSupplierCategories.splice(index, 1)
    },
    setLoadedSupplierQuotationSummary(state, payload) {
        state.loadedSupplierQuotationSummary = payload
    },
    createSupplierQuotation(state, payload) {
        state.loadedSupplierQuotations.push(payload)
    },
    updateSupplierQuotation(state, payload) {
        state.loadedSubContractorQuotations = [
            ...state.loadedSupplierQuotations.filter(element => element.id !== payload.id), payload
        ]
    },
    deleteSupplierQuotation(state, payload) {
        console.log('Committing delete of Supplier Quotation')
        console.log(payload)
        const index = state.loadedSupplierQuotations.indexOf(payload)
        state.loadedSupplierQuotations.splice(index, 1)
    },
}
const actions = {
    loadSupplierCategories({ commit }) {
        commit('setLoading', true, { root: true })
        webClient.get(`/api/resource/clients/` + localStorage.clientId + `/supplier_categories`)
            .then(response => {
                console.log('Received Suppliers Categories...')
                commit('setLoadedSupplierCategories', response.data)
                commit('setLoading', false, { root: true })
            })
            .catch(e => {
                commit('setError', e, { root: true })
            })
    },
    createSupplierCategory({ commit }, payload) {
        commit('setLoading', true, { root: true })
        webClient.post(`/api/resource/clients/` + localStorage.clientId + `/supplier_categories`, payload)
            .then(response => {
                console.log('Received saved Supplier Category from server..')
                commit('createSupplierCategory', response.data)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setError', error, { root: true })
            })
    },
    updateSupplierCategory({ commit}, payload) {
        commit('setLoading', true, { root: true })
        webClient.post(`/api/resource/clients/` + localStorage.clientId + `/supplier_categories/` + payload.id, payload)
            .then(response => {
                console.log('Received updated Supplier Category from server..')
                commit('updateSupplierCategory', response.data)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setError', error, { root: true })
            })
    },
    deleteSupplierCategory({ commit}, payload) {
        commit('setLoading', true, { root: true })
        webClient.delete(`/api/resource/clients/` + localStorage.clientId + `/supplier_categories/` + payload)
            .then(response => {
                console.log(response)
                commit('deleteSupplierCategory', payload)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setError', error)
            })
    },
    loadSuppliers({ commit }) {
        commit('setLoading', true, { root: true })
        console.log('Loading all System Suppliers for user with authorization token ' + localStorage.authHeader)
        webClient.get(`/api/resource/clients/` + localStorage.clientId + `/suppliers`)
            .then(response => {
                console.log('Received Suppliers...')
                console.log(response.data)
                commit('setLoadedSuppliers', response.data)
                commit('setLoading', false, { root: true })
            })
            .catch(e => {
                commit('setError', e, { root: true })
            })
    },
    loadSupplier({ commit }, payload) {
        commit('setLoading', true, { root: true })
        console.log('Loading Supplier for user with authorization token ' + localStorage.authHeader)
        webClient.get(`/api/resource/clients/` + localStorage.clientId + `/suppliers/` + payload)
            .then(response => {
                console.log('Received Supplier...')
                console.log(response.data)
                commit('setLoadedSupplier', response.data)
                commit('setLoading', false, { root: true })
            })
            .catch(e => {
                commit('setError', e, { root: true })
            })
    },
    createSupplier({ commit, dispatch }, payload) {
        commit('setLoading', true, { root: true })
        webClient.post(`/api/resource/clients/` + localStorage.clientId + `/suppliers`, payload)
            .then(response => {
                console.log('Received saved Supplier from server..')
                commit('createSupplier', response.data)
                commit('setLoading', false, { root: true })
            }).then(
                dispatch('loadSuppliers')
            )
            .catch(error => {
                commit('setError', error, { root: true })
            })
    },
    updateSupplier({ commit }, payload) {
        commit('setLoading', true, { root: true })
        webClient.post(`/api/resource/clients/` + localStorage.clientId + `/suppliers/` + payload.id, payload)
            .then(response => {
                console.log('Received updated Supplier from server..')
                console.log(response.data)
                commit('updateSupplier', response.data)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setError', error, { root: true })
            })
    },
    deleteSupplier({ commit }, payload) {
        commit('setLoading', true, { root: true })
        webClient.delete(`/api/resource/clients/` + localStorage.clientId + `/suppliers/` + payload)
            .then(response => {
                console.log(response)
                commit('deleteSupplier', payload)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setError', error, { root: true })
            })
    },
    loadSupplierProducts ({commit }, payload) {
        commit('setLoading', true, { root: true })
        console.log('Loading Supplier products for  [{' + payload + '}] for user with authorization token ' + localStorage.authHeader)
        webClient.get(`/api/resource/clients/` + localStorage.clientId + `/suppliers/` + payload + `/products`)
            .then(response => {
              console.log('Received Supplier Products...')
              console.log(response.data)
              commit('setLoadedSupplierProducts', response.data)
              commit('setLoading', false, { root: true })
            })
            .catch(error => {
              commit('setError', error, { root: true })
            })
      },
      createSupplierProduct({ commit }, payload) {
        commit('setLoading', true, { root: true })
        console.log('Creating supplier product quotation ')
        console.log(payload)
        webClient.post(`/api/resource/clients/` + localStorage.clientId + `/suppliers/` + payload.supplierId + `/products`, payload)
            .then(response => {
                console.log('Received new Supplier Product from server..')
                console.log(response.data)
                commit('createSupplierProduct', response.data)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setError', error, { root: true })
            })
    },
    deleteSupplierProduct({ commit }, payload) {
        commit('setLoading', true, { root: true })
        console.log('Deleting supplier product quotation ')
        console.log(payload)
        webClient.delete(`/api/resource/clients/` + localStorage.clientId + `/suppliers/` + payload.supplierId + `/products/` + payload.id)
            .then(response => {
                console.log('Received new Supplier Product from server..')
                console.log(response.data)
                commit('deleteSupplierProduct', payload.id)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setError', error, { root: true })
            })
    },
    updateSupplierProductQuotation({ commit  }, payload) {
        commit('setLoading', true, { root: true })
        console.log('Updating product quotation ')
        console.log(payload)
        webClient.post(`/api/resource/clients/` + localStorage.clientId + `/suppliers/` + payload.supplierId + `/quotations/` + payload.id, payload)
            .then(response => {
                console.log('Received updated Supplier Product Quotation from server..')
                console.log(response.data)
                //commit('updateProduct', response.data)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setError', error, { root: true })
            })
    },
    loadSupplierQuotations({ commit }, payload) {
        commit('setLoading', true, { root: true })
        console.log('Loading Supplier qotations for  [{' + payload + '}] for user with authorization token ' + localStorage.authHeader)
        webClient.get(`/api/resource/clients/` + localStorage.clientId + `/suppliers/` + payload + `/quotations`)
            .then(response => {
                console.log('Received Supplier Quotations...')
                console.log(response.data)
                commit('setLoadedSupplierQuotations', response.data)
                commit('setLoading', false, { root: true })
            })
            .catch(e => {
                commit('setError', e, { root: true })
            })
    },
    loadSupplierQuotationSummary({ commit }, payload) {
        commit('setLoading', true, { root: true })
        console.log('Loading all supplier invoices ' + payload)
        console.log('for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)

        webClient.get(`/api/resource/clients/` + localStorage.clientId + `/suppliers/` + payload + '/quotations/summary')
            .then(response => {
                console.log('Received Supplier Quotation Summary from server.')
                console.log(response.data)
                const data = response.data
                commit('setLoadedSupplierQuotationSummary', data)
                commit('setLoading', false, { root: true })
            })
            .catch(e => {
                commit('setError', e, { root: true })
                console.log(e)
            })
    },
    downloadSupplierQuotation({ commit }, payload) {
        const docUrl = '/api/resource/clients/' + localStorage.clientId + '/suppliers/' + payload.supplierId + '/quotations/' + payload.id + '/download'
        console.log('Downloading Supplier Quotation from url:')
        console.log(docUrl)
        console.log("File name is " + payload.fileName)
        axios({
            baseURL: `/`,
            url: docUrl,
            method: 'GET',
            responseType: 'blob',
            headers: { 'Authorization': localStorage.authHeader }
        }).then((response) => {
            console.log('Received quotation from server:')
            console.log(response.data)
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', payload.fileName) // or any other extension
            document.body.appendChild(link)
            link.click()
        }).catch((error) => {
            commit('setError', error, { root: true })
            console.error('Could not download the supplier quotation from url ' + docUrl + ' from the backend.', error)
        })
    },
    createSupplierQuotation({ commit, dispatch }, payload) {
        //console.log('Creating new quotation for subcontractor  ' + payload.subContractorId + ' assigned to ' + payload.projectId)
        console.log(payload)
        console.log(' for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)

        const formData = new FormData()

        var i = 0
        var len = payload.quotationFile.files.length
        for (; i < len;) {
            formData.append('quotationFile', payload.quotationFile.files[i])
            i++
        }
        formData.append('supplierId', payload.supplierId)
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
        }).post('/api/resource/clients/' + localStorage.clientId + '/projects/' + payload.projectId + '/suppliers/' + payload.supplierId + '/quotations', formData)
            .then((response) => {
                const savedSupplierQuotation = response.data
                console.log(savedSupplierQuotation)
                commit('createSupplierQuotation', {
                    ...savedSupplierQuotation,
                    id: savedSupplierQuotation.id
                })
                dispatch('loadSupplierQuotations', payload.supplierId)
            })
            .catch((error) => {
                commit('setLoading', false, { root: true })
                commit('setError', error)
                console.log('Oops error creating Supplier Quotation ' + error.message)
                console.log(error)
            })
    },
    updateSupplierQuotation({ commit }, payload) {
        console.log('Updating Supplier Quotation ')
        console.log(payload)
        console.log(' for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)
        webClient.post('/api/resource/clients/' + localStorage.clientId + '/suppliers/' + payload.supplierId + '/quotations/' + payload.id, payload)
            .then((response) => {
                const savedSupplierQuotation = response.data
                console.log(savedSupplierQuotation)
                commit('updateSupplierQuotation',savedSupplierQuotation)
            })
            .catch((error) => {
                commit('setLoading', false, { root: true })
                commit('setError', error, { root: true })
                console.log('Oops error updating Supplier Quotation ' + error.message)
                console.log(error)
            })
    },
    deleteSupplierQuotation({ commit }, payload) {
        console.log('Delete Supplier Quotation ' + payload.id)
        webClient.delete('/api/resource/clients/' + localStorage.clientId + '/suppliers/' + payload.supplierId + '/quotations/' + payload.id)
            .then((response) => {
                console.log('Deleted Supplier Quotation, response status = ' + response.status)
                commit('deleteSupplierQuotation', payload)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    loadSupplierOrders({ commit }, payload) {
        commit('setLoading', true, { root: true })
        console.log('Loading Supplier orders for  [{' + payload + '}] for user with authorization token ' + localStorage.authHeader)
        webClient.get(`/api/resource/clients/` + localStorage.clientId + `/suppliers/` + payload + `/orders`)
            .then(response => {
                console.log('Received Supplier Orders...')
                console.log(response.data)
                commit('setLoadedSupplierOrders', response.data)
                commit('setLoading', false, { root: true })
            })
            .catch(e => {
                commit('setError', e, { root: true })
            })
    },
    loadSupplierInvoiceSummary({ commit }, payload) {
        commit('setLoading', true, { root: true })
        console.log('Loading all supplier invoices ' + payload)
        //console.log('for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)

        webClient.get(`/api/resource/clients/` + localStorage.clientId + `/suppliers/` + payload + '/invoices/summary')
            .then(response => {
                console.log('Received Supplier Invoice Summary from server.')
                console.log(response.data)
                const data = response.data
                commit('setLoadedSupplierInvoiceSummary', data)
                commit('setLoading', false, { root: true })
            })
            .catch(e => {
                commit('setError', e, { root: true })
                console.log(e)
            })
    },
    loadSupplierInvoices({ commit }, payload) {
        commit('setLoading', true, { root: true })
        console.log('Loading all Invoices with supplier id ' + payload)
        //console.log('for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)
        webClient.get(`/api/resource/clients/` + localStorage.clientId + `/suppliers/` + payload + '/invoices')
            .then(response => {
                console.log('Received Supplier Invoices from server.')
                console.log(response.data)
                const data = response.data
                commit('setLoadedSupplierInvoices', data)
                commit('setLoading', false, { root: true })
            })
            .catch(e => {
                commit('setError', e, { root: true })
                console.log(e)
            })
    },
    downloadSupplierInvoice({ commit }, payload) {
        const docUrl = '/api/resource/clients/' + localStorage.clientId + '/suppliers/' + payload.supplierId + '/invoices/' + payload.id + '/download'
        console.log('Downloading Supplier Invoice from url:')
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
            commit('setError', error, { root: true })
            console.error('Could not download the invoice from url ' + docUrl + ' from the backend.', error)
        })
    },
    createSupplierInvoice({ commit }, payload) {
        console.log('Creating new invoice for supplier  ' + payload.supplierId + ' assigned to ' + payload.projectId)
        console.log(payload)
        //console.log(' for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)

        const formData = new FormData()
        var i = 0
        var len = payload.invoiceFile.files.length
        for (; i < len;) {
            formData.append('invoiceFile', payload.invoiceFile.files[i])
            i++
        }

        formData.append('supplierId', payload.supplierId)
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
        }).post('/api/resource/clients/' + localStorage.clientId + '/projects/' + payload.projectId + '/suppliers/' + payload.supplierId + '/invoices', formData)
            .then((response) => {
                const savedSupplierInvoice = response.data
                console.log(savedSupplierInvoice)
                commit('createSupplierInvoice', {
                    ...savedSupplierInvoice,
                    id: savedSupplierInvoice.id
                })
            })
            .catch((error) => {
                commit('setLoading', false, { root: true })
                commit('setError', error)
                console.log('Oops error creating Supplier Invoice ' + error.message)
                console.log(error)
            })
    },
    updateSupplierInvoice({ commit }, payload) {
        console.log('Updating Supplier Invoice ')
        console.log(payload)
        console.log(' for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)
        webClient.post(`/api/resource/clients/` + localStorage.clientId + `/suppliers/` + payload.supplierId + '/invoices/' + payload.id, payload)
            .then((response) => {
                const savedSupplierInvoice = response.data
                console.log(savedSupplierInvoice)
                commit('updateSupplierInvoice', {
                    ...savedSupplierInvoice,
                    id: savedSupplierInvoice.id
                })
            })
            .catch((error) => {
                commit('setLoading', false, { root: true })
                commit('setError', error)
                console.log('Oops error updating Supplier Invoice ' + error.message)
                console.log(error)
            })
    },
    deleteSupplierInvoice({ commit }, payload) {
        console.log('Delete Supplier Invoice ' + payload.id)
        webClient.delete('/api/client/' + localStorage.clientId + '/suppliers/' + payload.supplierId + '/invoices/' + payload.id)
            .then((response) => {
                console.log('Deleted Supplier Invoice, response status = ' + response.status)
                commit('deleteSupplierInvoice', payload)
            })
            .catch((error) => {
                console.log(error)
            })
    },
}
const getters = {
    loadedSupplierCategories(state) {
        return state.loadedSupplierCategories.sort((A, B) => {
            return A.id > B.id
        })
    },
    loadedSuppliers(state) {
        return state.loadedSuppliers.sort((A, B) => {
            return A.id > B.id
        })
    },
    loadedSupplier(state) {
        return state.loadedSupplier
    },
    loadedSupplierProducts (state) {
        console.log('Get supplier products')
        console.log(state.loadSupplierProducts)
        return state.loadedSupplierProducts
      },
    loadedSupplierQuotations(state) {
        return state.loadedSupplierQuotations.sort((A, B) => {
            return A.id > B.id
        })
    },
    loadedSupplierOrders(state) {
        return state.loadedSupplierOrders.sort((A, B) => {
            return A.id > B.id
        })
    },
    loadedSupplierInvoices(state) {
        return state.loadedSupplierInvoices.sort((supplierInvoiceA, supplierInvoiceB) => {
            return supplierInvoiceA.id > supplierInvoiceB.id
        })
    },
    loadedSupplierInvoiceSummary(state) {
        return state.loadedSupplierInvoiceSummary
    },
    loadedSupplierQuotationSummary(state) {
        return state.loadedSupplierQuotationSummary
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
