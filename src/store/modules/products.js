import webClient from './webclient';
import axios from 'axios';

const state = {
    loadedProductCategories: [],
    loadedProductCategoryTree: [],
    loadedProducts: [],
    loadedProduct: null,
    loadedProductQuotations: [],
    loadedProductOrders: [],
}
const mutations = {
    setLoadedProductCategoryTree(state, payload) {
        state.loadedProductCategoryTree = payload
    },
    setLoadedProductCategories(state, payload) {
        state.loadedProductCategories = payload
    },
    updateProductCategory(state, payload) {
        state.loadedProductCategories = [
            ...state.loadedProductCategories.filter(u => u.id !== payload.id), payload
        ]
    },
    deleteProductCategory(state, payload) {
        const index = state.loadedProductCategories.indexOf(payload)
        console.log('Index of deleted product category is ' + index)
        state.loadedProductCategories.splice(index, 1)
    },
    setLoadedProducts(state, payload) {
        state.loadedProducts = payload
    },
    setLoadedProduct(state, payload) {
        state.loadedProduct = payload
    },
    setLoadedProductQuotations(state, payload) {
        state.loadedProductQuotations = payload
    },
    setLoadedProductOrders(state, payload) {
        state.loadedProductOrders = payload
    },
    createProduct(state, payload) {
        state.loadedProducts.push(payload)
    },
    updateProduct(state, payload) {
        state.loadedProducts = [
            ...state.loadedProducts.filter(u => u.id !== payload.id), payload
        ]
    },
    deleteProduct(state, payload) {
        const index = state.loadedProducts.indexOf(payload)
        console.log('Index of deleted product is ' + index)
        state.loadedProducts.splice(index, 1)
    },
}
const actions = {
    loadProductCategoryTree({ commit }) {
         commit('setLoading', true, { root: true })

        webClient.get(`/api/resource/clients/` + localStorage.clientId + `/product_categories`)
            .then(response => {
                console.log('Received Root Products Categories...')
                const data = response.data
                console.log(data)
                const nodes = data.map(function (elem) {
                    return {
                        id: elem.element.id,
                        parentId: elem.element.parentId,
                        name: elem.element.name,
                        description: elem.element.description,
                        children: formatChildNodes(elem.children)
                    }
                }).sort((A, B) => {
                    return A.name > B.name
                });
                console.log('Nodes are ')
                console.log(nodes)
                commit('setLoadedProductCategoryTree', nodes)
                 commit('setLoading', false, { root: true })
            })
            .catch(e => {
                console.log('Encountered error')
                console.log(e)
            })
    },
    loadProductCategories({ commit }) {
         commit('setLoading', true, { root: true })
        //  webClient.defaults.headers.common['Authorization'] = localStorage.authHeader;

        webClient.get(`/api/resource/clients/` + localStorage.clientId + `/product_categories`)
            .then(response => {
                console.log('Received Products Categories...')
                commit('setLoadedProductCategories', response.data)
                 commit('setLoading', false, { root: true })
            })
            .catch(e => {
                commit('setError', e, { root: true })
            })
    },
    createProductCategory({ commit }, payload) {
         commit('setLoading', true, { root: true })
        webClient.post(`/api/resource/clients/` + localStorage.clientId + `/product_categories`, payload)
            .then(response => {
                console.log('Received saved Product Category from server..')
                commit('createProductCategory', response.data)
                //dispatch('loadProductCategoryTree')
                 commit('setLoading', false, { root: true })
            })
            .catch(error => {
                console.log('Encounterd error ')
                console.log(error)
                commit('setError', error, { root: true })
            })
    },
    updateProductCategory({ commit, dispatch }, payload) {
         commit('setLoading', true, { root: true })
        webClient.post(`/api/resource/clients/` + localStorage.clientId + `/product_categories/` + payload.id, payload)
            .then(response => {
                console.log('Received updated Product Category from server..')
                commit('updateProductCategory', response.data)
                dispatch('loadProductCategoryTree')
                 commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setError', error.response.data.message)
            })
    },
    deleteProductCategory({ commit, dispatch }, payload) {
         commit('setLoading', true, { root: true })
        webClient.delete(`/api/resource/clients/` + localStorage.clientId + `/product_categories/` + payload.id)
            .then(response => {
                console.log(response)
                dispatch('loadProductCategoryTree');
                 commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setError', error, { root: true })
            })
    },
    loadProductsByCategory({ commit }, payload) {
         commit('setLoading', true, { root: true })
        webClient.get(`/api/resource/clients/` + localStorage.clientId + `/products/category/` + payload)
            .then(response => {
                console.log('Received Products...')
                console.log(response.data)
                commit('setLoadedProducts', response.data)
                 commit('setLoading', false, { root: true })
            })
            .catch(e => {
                commit('setError', e, { root: true })
            })

    },
    loadProducts({ commit }) {
         commit('setLoading', true, { root: true })
        console.log('Loading all System Products for user with authorization token ' + localStorage.authHeader)
        webClient.get(`/api/resource/clients/` + localStorage.clientId + `/products`,)
            .then(response => {
                console.log('Received Products...')
                console.log(response.data)
                commit('setLoadedProducts', response.data)
                 commit('setLoading', false, { root: true })
            })
            .catch(e => {
                commit('setError', e, { root: true })
            })
    },
    loadProduct({ commit }, payload) {
         commit('setLoading', true, { root: true })
        console.log('Loading Product with id [{' + payload.id + '}] for user with authorization token ' + localStorage.authHeader)
        webClient.get(`/api/resource/clients/` + localStorage.clientId + `/product/` + payload.id)
            .then(response => {
                console.log('Received Product...')
                console.log(response.data)
                commit('setLoadedProduct', response.data)
                 commit('setLoading', false, { root: true })
            })
            .catch(e => {
                commit('setError', e, { root: true })
            })
    },
    createProduct({ commit }, payload) {
         commit('setLoading', true, { root: true })
        const formData = new FormData()
  
        /*
          var len = payload.productImages.length
          for (; i < len;) {
            const file = payload.productImages[i]
            formData.append('fileParts', file)
            console.log('Adding file  ' + file + 'to fileParts' )
            i++
          }
    
          var j = 0
          var len = payload.productTechnicalDocs.length
          for (; j < len;) {
         //payload.productTechnicalDocs.forEach(file => { formData.append('technicalDocsFileParts', file) });
            const doc = payload.productTechnicalDocs[j]
            formData.append('technicalDocsFileParts', doc)
            console.log('Adding technical doc  ' + doc + 'to fileParts' )
             j++
          }
    */
        formData.append('name', payload.name)
        formData.append('description', payload.description)
        formData.append('productCategoryId', payload.productCategoryId)
        formData.append('manufacturer', payload.manufacturer)
        formData.append('productCode', payload.productCode)
        formData.append('productStandard', payload.productStandard)
        formData.append('units', payload.units)


        return axios.create({
            baseURL: `/`,
            headers: { 'Authorization': localStorage.authHeader, 'Content-Type': 'multipart/form-data' }
            ///api/resource/clients/{clientId}/projects/{projectId}/drawings
        }).post(`/api/resource/clients/` + localStorage.clientId + `/products`, formData)
            .then(response => {
                console.log('Received saved Product from server..')
                commit('createProduct', response.data)
                 commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setError', error, { root: true })
                console.log('Error creating new product..');
            })
    },
    updateProduct({ commit }, payload) {
         commit('setLoading', true, { root: true })
        webClient.post(`/api/resource/clients/` + localStorage.clientId + `/products/` + payload.id, payload)
            .then(response => {
                console.log('Received updated Product from server..')
                console.log(response.data)
                commit('updateProduct', response.data)
                 commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setError', error, { root: true })
            })
    },
    downloadProductTechnicalDocument({ commit }, payload) {
        const docUrl = '/api/resource/products/' + payload.productId + '/technical/docs/' + payload.id + '/download'
        console.log('Downloading Product Technical Doc from url:')
        console.log(payload.id)
        axios({
            baseURL: `/`,
            url: docUrl,
            method: 'GET',
            responseType: 'blob',
            headers: { 'Authorization': localStorage.authHeader }
        }).then((response) => {
            console.log('Received drawing from server:')
            console.log(response.data)
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', payload.fileName) // or any other extension
            document.body.appendChild(link)
            link.click()
        }).catch((error) => {
            commit('setError', error, { root: true })
            console.error('Could not download the drawing from url ' + payload.id + ' from the backend.', error)
        })
    },
    updateSupplierProductQuotation({ commit }, payload) {
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

    deleteProduct({ commit }, payload) {
         commit('setLoading', true, { root: true })
        webClient.delete(`/api/resource/clients/` + localStorage.clientId + `/products/` + payload.id)
            .then(response => {
                console.log(response)
                console.log('Successfully deleted product..' + payload.name)
                commit('deleteProduct', payload)
                 commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setError', error, { root: true })
            })
    },
    createProductQuotationForm({ commit }, payload) {
         commit('setLoading', true, { root: true })
        console.log('Saving Prouduct Quotation form..')
        console.log(payload)
        webClient.post(`/api/resource/clients/` + localStorage.clientId + `/productXX/quotation`, payload)
            .then(response => {
                console.log('Received saved Prouduct Quotation form from server..')
                console.log(response.data)
                // commit('createProduct', response.data)
                 commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setError', error, { root: true })
                console.log('Error creating new product quotation form..');
            })
    },
    loadProductQuotations({ commit }, payload) {
         commit('setLoading', true, { root: true })
        console.log('Loading Product qotations for  [{' + payload + '}] for user with authorization token ' + localStorage.authHeader)
        webClient.get(`/api/resource/clients/` + localStorage.clientId + `/products/` + payload + `/quotations`)
            .then(response => {
                console.log('Received Product Quotations...')
                console.log(response.data)
                commit('setLoadedProductQuotations', response.data)
                 commit('setLoading', false, { root: true })
            })
            .catch(e => {
                commit('setError', e, { root: true })
            })
    },

    loadProductOrders({ commit }, payload) {
         commit('setLoading', true, { root: true })
        console.log('Loading Product orders for  [{' + payload + '}] for user with authorization token ' + localStorage.authHeader)
        webClient.get(`/api/resource/clients/` + localStorage.clientId + `/products/` + payload + `/orders`)
            .then(response => {
                console.log('Received Product Orders...')
                console.log(response.data)
                commit('setLoadedProductOrders', response.data)
                 commit('setLoading', false, { root: true })
            })
            .catch(e => {
                commit('setError', e, { root: true })
            })
    },

}
const getters = {
    loadedProductCategoryTree(state) {
        return state.loadedProductCategoryTree.sort((A, B) => {
            return A.name > B.name
        })
    },
    loadedProductCategories(state) {
        return state.loadedProductCategories.sort((A, B) => {
            return A.id > B.id
        })
    },
    loadedProducts(state) {
        return state.loadedProducts.sort((A, B) => {
            return A.id > B.id
        })
    },
    loadedProduct(state) {

        return (productId) => {
            console.log('Load product ')
            console.log(productId)
            return state.loadedProducts.find((product) => {
                return product.id === productId
            })
        }
    },
    loadedProductQuotations(state) {
        return state.loadedProductQuotations.sort((A, B) => {
            return A.id > B.id
        })
    },
    loadedProductQuotation(state) {
        return (productQuotationId) => {
            console.log('Load product quotation ')
            console.log(productQuotationId)
            return state.loadedProductQuotations.find((quote) => {
                return quote.id === productQuotationId
            })
        }
    },
    loadedProductOrders(state) {
        return state.loadedProductOrders.sort((A, B) => {
            return A.id > B.id
        })
    },
    loadedProjectOrders(state) {
        return state.loadedProjectOrders.sort((A, B) => {
            return A.id > B.id
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

function formatChildNodes(childNodes) {

    return childNodes.map(treeNode => {
        return {
            id: treeNode.element.id,
            parentId: treeNode.element.parentId,
            name: treeNode.element.name,
            description: treeNode.element.description,
            children: formatChildNodes(treeNode.children)
        }
    }).sort((A, B) => {
        return A.name > B.name
    })
}
