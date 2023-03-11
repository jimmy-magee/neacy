import webClient from './webclient'
import axios from 'axios'

  const state = {
    // SubContractor api
    loadedSubContractorCategories: [],
    loadedSubContractors: [],
    loadedSubContractor: null,
    loadedSubContractorInsurancePolicies: [],
    loadedSubContractorOperatives: [],
    loadedSubContractorQuotationSummary: null,
    loadedSupplierQuotationSummary: null,
    loadedSubContractorQuotations: [],
    loadedSubContractorInvoiceSummary: null,
    loadedSubContractorInvoices: [],
    loadedSubContractorPaymentSummary: null,
    loadedSubContractorPayments: [],
    loadedProjectSubContractorTendersPackages: [],
    loadedSubContractorProjectProcurementPackages: [],
    showSubContractorDialog: false,
    subContractorSearchText: '',
    editedSubContractor: {
      subContractorCategoryId: '',
      id: '',
      name: '',
      description: '',
      address: '',
      eamil: '',
      website: '',
      contactName: '',
      contactNumber: '',
      headOfficeTelephoneNumber: '',
      companyRegistrationNumber: '',
      vatRegistered: false,
      vatNumber: '',
      biq: '',
      ban: '',
      bankAccountNumber: ''
    },
  }
  const mutations = {
    setLoadedSubContractorCategories(state, payload) {
      state.loadedSubContractorCategories = payload
    },
    createSubContractorCategory(state, payload) {
      state.loadedSubContractorCategories.push(payload)
    },
    updateSubContractorCategory(state, payload) {
      state.loadedSubContractorCategories = [
        ...state.loadedSubContractorCategories.filter(u => u.id !== payload.id), payload
      ]
    },
    deleteSubContractorCategory(state, payload) {
      const index = state.loadedSubContractorCategories.indexOf(payload)
      console.log('Index of deleted SubContractor category is ' + index)
      state.loadedSubContractorCategories.splice(index, 1)
    },
    createSubContractor(state, payload) {
      state.loadedSubContractors.push(payload)
    },
    updateSubContractor(state, payload) {
      state.loadedSubContractors = [
        ...state.loadedSubContractors.filter(element => element.id !== payload.id), payload
      ]
    },
    deleteSubContractor(state, payload) {
      console.log('Committing delete SubContractor')
      console.log(payload)
      const index = state.loadedSubContractors.indexOf(payload)
      console.log('Index of deleted item is ' + index)
      state.loadedSubContractors.splice(index, 1)
    },
    setLoadedSubContractors(state, payload) {
      state.loadedSubContractors = payload
    },
    setLoadedSubContractor(state, payload) {
      state.loadedSubContractor = payload
    },
    setLoadedSubContractorInsurancePolicies(state, payload) {
      state.loadedSubContractorInsurancePolicies = payload
    },
    setLoadedSubContractorOperatives(state, payload) {
      state.loadedSubContractorOperatives = payload
    },
    setLoadedSubContractorQuotationSummary(state, payload) {
      state.loadedSubContractorQuotationSummary = payload
    },
    setLoadedSupplierQuotationSummary(state, payload) {
      state.loadedSupplierQuotationSummary = payload
    },
    setLoadedSubContractorQuotations(state, payload) {
      state.loadedSubContractorQuotations = payload
    },
    setLoadedSubContractorInvoiceSummary(state, payload) {
      state.loadedSubContractorInvoiceSummary = payload
    },
    setLoadedSubContractorInvoices(state, payload) {
      state.loadedSubContractorInvoices = payload
    },
    setLoadedSubContractorPaymentSummary(state, payload) {
      state.loadedSubContractorPaymentSummary = payload
    },
    setLoadedSubContractorPayments(state, payload) {
      state.loadedSubContractorPayments = payload
    },
    deleteProjectSubContractorTender(state, payload) {
      console.log('Committing delete project subcontract tender')
      console.log(payload)
      const index = state.loadedProjectSubContractTenders.indexOf(payload)
      console.log('Index of deleted item is ' + index)
      state.loadedProjectSubContractTenders.splice(index, 1)
    },
  
    setLoadedSubContractorProjectProcurementPackages(state, payload) {
      console.log('Setting Loaded SubContractor Project Procurement Packages ' + payload)
      state.loadedSubContractorProjectProcurementPackages = payload
    },
    setLoadedSubContractorProcurementPackageBillItems(state, payload) {
      console.log('Setting Loaded SubContractor rocurement Package Bill Items ')
      console.log(payload)
      state.loadedSubContractorProcurementPackageBillItems = payload
    },
    updateSubContractorProcurementPackageBillItem(state, payload) {
      state.loadedSubContractorProcurementPackageBillItems = [
        ...state.loadedSubContractorProcurementPackageBillItems.filter(element => element.id !== payload.id), payload
      ]
    },
    createProjectSubContractorProcurementPackage(state, payload) {
      state.loadedProjectSubContractorProcurementPackages.push(payload)
    },
    updateSubContractorProjectProcurementPackage(state, payload) {
      state.loadedSubContractorProjectProcurementPackages = [
        ...state.loadedSubContractorProjectProcurementPackages.filter(element => element.id !== payload.id), payload
      ]
    },
    deleteSubContractorProjectProcurementPackage(state, payload) {
      console.log('Committing delete subcontractor project procurement package')
      console.log(payload)
      const index = state.loadedSubContractorProjectProcurementPackages.indexOf(payload)
      console.log('Index of deleted  subcontractor project procurement package is ' + index)
      state.loadedSubContractorProjectProcurementPackages.splice(index, 1)
    },
    createSubContractorInsurancePolicy(state, payload) {
      state.loadedSubContractorInsurancePolicies.push(payload)
    },
    updateSubContractorInsurancePolicy(state, payload) {
      state.loadedSubContractorInsurancePolicies = [
        ...state.loadedSubContractorInsurancePolicies.filter(element => element.id !== payload.id), payload
      ]
    },
    deleteSubContractorInsurancePolicy(state, payload) {
      console.log('Committing delete of SubContractor Insurance Policy')
      console.log(payload)
      const index = state.loadedSubContractorInsurancePolicies.indexOf(payload)
      state.loadedSubContractorInsurancePolicies.splice(index, 1)
    },
    createSubContractorOperative(state, payload) {
      state.loadedSubContractorOperatives.push(payload)
    },
    updateSubContractorOperative(state, payload) {
      state.loadedSubContractorOperatives = [
        ...state.loadedSubContractorOperatives.filter(element => element.id !== payload.id), payload
      ]
    },
    deleteSubContractorOperative(state, payload) {
      console.log('Committing delete of SubContractor Operative')
      console.log(payload)
      const index = state.loadedSubContractorOperatives.indexOf(payload)
      state.loadedSubContractorOperatives.splice(index, 1)
    },
    createSubContractorQuotation(state, payload) {
      state.loadedSubContractorQuotations.push(payload)
    },
    updateSubContractorQuotation(state, payload) {
      state.loadedSubContractorQuotations = [
        ...state.loadedSubContractorQuotations.filter(element => element.id !== payload.id), payload
      ]
    },
    deleteSubContractorQuotation(state, payload) {
      console.log('Committing delete of SubContractor Quotation')
      console.log(payload)
      const index = state.loadedSubContractorQuotations.indexOf(payload)
      state.loadedSubContractorQuotations.splice(index, 1)
    },
    createSubContractorInvoice(state, payload) {
      state.loadedSubContractorInvoices.push(payload)
    },
    updateSubContractorInvoice(state, payload) {
      state.loadedSubContractorInvoices = [
        ...state.loadedSubContractorInvoices.filter(element => element.id !== payload.id), payload
      ]
    },
    deleteSubContractorInvoice(state, payload) {
      console.log('Committing delete of SubContractor Invoice')
      console.log(payload)
      const index = state.loadedSubContractorInvoices.indexOf(payload)
      state.loadedSubContractorInvoices.splice(index, 1)
    },
    createSubContractorPayment(state, payload) {
      state.loadedSubContractorPayments.push(payload)
    },
    updateSubContractorPayment(state, payload) {
      state.loadedSubContractorPayments = [
        ...state.loadedSubContractorPayments.filter(element => element.id !== payload.id), payload
      ]
    },
    deleteSubContractorPayment(state, payload) {
      console.log('Committing delete of SubContractor Payment')
      console.log(payload)
      const index = state.loadedSubContractorPayments.indexOf(payload)
      state.loadedSubContractorPayments.splice(index, 1)
    },
  }
  const actions = {
    loadSubContractors({ commit}) {
      commit('setLoading', true, { root: true })
      console.log('Loading all SubContractors for user with authorization token ' + localStorage.authHeader)
      webClient.get('/api/resource/clients/' + localStorage.clientId + '/subcontractors')
        .then(response => {
          console.log('Received SubContractors from server..')
          console.log(response.data)
          const subcontractors = response.data
          commit('setLoadedSubContractors', subcontractors)
          commit('setLoading', false, { root: true })
        })
        .catch(error => {
           commit('setError', error, { root: true })
          console.log('Oops ' + error.message)
          console.log(error)
        })
    },
    loadSubContractor({ commit}, payload) {
      commit('setLoading', true, { root: true })
      console.log('Loading all SubContractors for user with authorization token ' + localStorage.authHeader)
      webClient.get('/api/resource/clients/' + localStorage.clientId + '/subcontractors/' + payload)
        .then(response => {
          console.log('Received SubContractor from server..')
          console.log(response.data)
          const subcontractor = response.data
          commit('setLoadedSubContractor', subcontractor)
          commit('setLoading', false, { root: true })
        })
        .catch(error => {
           commit('setError', error, { root: true })
          console.log('Oops ' + error.message)
          console.log(error)
        })
    },
    loadSubContractorCategories({ commit }) {
      commit('setLoading', true, { root: true })
      webClient.get(`/api/resource/clients/` + localStorage.clientId + `/subcontractor_categories`)
        .then(response => {
          console.log('Received SubContractor Categories...')
          commit('setLoadedSubContractorCategories', response.data)
          commit('setLoading', false, { root: true })
        })
        .catch(e => {
           commit('setError', e, { root: true })
        })
    },
    createSubContractorCategory({ commit }, payload) {
      commit('setLoading', true, { root: true })
      webClient.post(`/api/resource/clients/` + localStorage.clientId + `/subcontractor_categories`, payload)
        .then(response => {
          console.log('Received saved SubContractor Category from server..')
          commit('createSubContractorCategory', response.data)
          commit('setLoading', false, { root: true })
        })
        .catch(error => {
          commit('setError', error.response)
        })
    },
    updateSubContractorCategory({ commit }, payload) {
      commit('setLoading', true, { root: true })
      webClient.post(`/api/resource/clients/` + localStorage.clientId + `/subcontractor_categories/` + payload.id, payload)
        .then(response => {
          console.log('Received updated SubContractor Category from server..')
          commit('updateSubContractorCategory', response.data)
          commit('setLoading', false, { root: true })
        })
        .catch(error => {
          commit('setError', error.response)
        })
    },
    deleteSubContractorCategory({ commit }, payload) {
      commit('setLoading', true, { root: true })
      webClient.delete(`/api/resource/clients/` + localStorage.clientId + `/subcontractor_categories/` + payload.id)
        .then(response => {
          console.log(response)
          commit('deleteSubContractorCategory', payload)
          commit('setLoading', false, { root: true })
        })
        .catch(error => {
          commit('setError', error.response)
        })
    },
    createSubContractor({ commit }, payload) {
      commit('setLoading', true, { root: true })
      console.log('CreatingSubContractor for user with authorization token ' + localStorage.authHeader + ' . Payload = ')
      console.log(payload)
      webClient.post('/api/resource/clients/' + localStorage.clientId + `/subcontractors`, payload)
        .then(response => {
          console.log('Received saved SubContractor from server..')
          console.log(response.data)
          const subcontractor = response.data
          commit('createSubContractor', subcontractor)
          commit('setLoading', false, { root: true })
        })
        .catch(error => {
           commit('setError', error, { root: true })
          console.log('Oops ' + error.message)
          console.log(error)
        })
    },
    updateSubContractor({ commit }, payload) {
      commit('setLoading', true, { root: true })
      console.log('Updating SubContractor for user with authorization token ' + localStorage.authHeader + ' . Payload = ')
      console.log(payload)
      webClient.post('/api/resource/clients/' + localStorage.clientId + `/subcontractors/` + payload.id, payload)
        .then(response => {
          console.log('Received updated SubContractor from server..')
          console.log(response.data)
          const subcontractor = response.data
          commit('updateSubContractor', subcontractor)
          commit('setLoading', false, { root: true })
        })
        .catch(error => {
           commit('setError', error, { root: true })
          console.log('Oops ' + error.message)
          console.log(error)
        })
    },
    deleteSubContractor({ commit }, payload) {
      console.log('Deleting subcontractor ')
      console.log(payload)
      console.log(' for user with token ' + localStorage.authHeader)

      webClient.delete('/api/resource/clients/' + localStorage.clientId + `/subcontractors/` + payload.id, payload)
        .then((response) => {
          console.log(response)
          commit('deleteSubContractor', payload)
        })
        .catch((error) => {
          commit('setLoading', false, { root: true })
           commit('setError', error, { root: true })
          console.log('Oops ' + error.message)
          console.log(error)
        })
    },
    loadSubContractorProcurementPackages({ commit }, payload) {
      commit('setLoading', true, { root: true })
      //commit('setLoadedProjectProcurementPackages', [])
      console.log('Loading project procurement packages for user ' + localStorage.authHeader + ' for project ' + payload)
      webClient.get(`/api/resource/clients/` + localStorage.clientId + `/subcontractors/` + payload + '/procurement')
        //}).get(`/api/client/` + localStorage.clientId + '/subcontractors/5d25c393b18d5d45746aefd8/procurement/packages')
        .then(response => {
          const items = response.data
          console.log('XXXXXXXXXXXXX XXXXXXXX XXXXXXX Received subcontractor procurement packages from server ')
          console.log(items)
          commit('setLoadedSubContractorProjectProcurementPackages', items)
          commit('setLoading', false, { root: true })
        })
        .catch(e => {
           commit('setError', e, { root: true })
        })
    },
    loadSubContractorProcurementPackage({ commit }, payload) {
      commit('setLoading', true, { root: true })
      console.log('Setting subcontractor procurement package bill items for ' + payload.name)
      console.log(payload.billItems)
      commit('setLoadedSubContractorProcurementPackageBillItems', payload.billItems)
      commit('setLoading', false, { root: true })
    },
    loadProjectSubContractorProcurementPackages({ commit }, payload) {
      commit('setLoading', true, { root: true })
      //commit('setLoadedProjectProcurementPackages', [])
      console.log('Loading project subcontractor procurement packages for user ' + localStorage.authHeader + ' for project ' + payload.projectId)

      webClient.get(`/api/resource/clients/` + localStorage.clientId + `/projects/` + payload.projectId + '/procurement/' + payload.id + '/subcontractors')
        .then(response => {
          const items = response.data
          console.log('Received project subcontractor procurement packages from server ')
          console.log(items)
          commit('setLoadedProjectSubContractorProcurementPackages', items)
          commit('setLoading', false, { root: true })
        })
        .catch(e => {
           commit('setError', e, { root: true })
        })
    },
    updateSubContractorProcurementPackageBillItem({ commit, dispatch }, payload) {
      console.log('Updating Project Procurement Package bill item')
      console.log(payload)
      console.log(' for user with token ' + localStorage.authHeader)
      console.log(payload)
      webClient.post('/api/resource/clients/' + localStorage.clientId + '/projects/' + payload.projectId + '/procurement/' + payload.subContractorProcurementPackageId + '/subcontractor/' + payload.subContractorId + '/billItem/' + payload.id, payload)
        .then((response) => {
          const updatedProjectBoQItem = response.data
          console.log(updatedProjectBoQItem)
          commit('updateSubContractorProcurementPackageBillItem', updatedProjectBoQItem)
        }).then(
          setTimeout(() => {
            dispatch('loadProjectSubContractorProcurementPackages', payload)
          }, 300)
        )
        .catch((error) => {
          commit('setLoading', false, { root: true })
           commit('setError', error, { root: true })
          console.log('Oops ' + error.message)
          console.log(error)
        })
    },
    updateSubContractorProcurementPackageBillItemRate({ commit, dispatch }, payload) {
      console.log('Updating Project Procurement Package bill item')
      console.log(payload)
      console.log(' for user with token ' + localStorage.authHeader)
      console.log(payload)
      webClient.post('/api/resource/clients/' + localStorage.clientId + '/projects/' + payload.projectId + '/subcontractors/' + payload.subContractorId + '/procurement/' + payload.subContractorProcurementPackageId + '/' + payload.id + '/rates', payload)
        .then((response) => {
          const updatedProjectBoQItem = response.data
          console.log(updatedProjectBoQItem)
          commit('updateSubContractorProcurementPackageBillItem', updatedProjectBoQItem)
        }).then(
          setTimeout(() => {
            console.log("YYYYYYY Updated subcontractor rate loading loadSubContractorProcurementPackages")
            console.log(payload)
            dispatch('loadProjectSubContractorProcurementPackages', payload.subContractorId
            )
            dispatch('loadSubContractorProcurementPackages', payload.subContractorId)
          }, 300)
        ).catch((error) => {
          commit('setLoading', false, { root: true })
           commit('setError', error, { root: true })
          console.log('Oops ' + error.message)
          console.log(error)
        })
    },
    loadSubContractorInsurancePolicies({ commit }, payload) {
      commit('setLoading', true, { root: true })
      console.log('Loading all InsurancePolicies with subcontractor id ' + payload)
      console.log('for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)

      webClient.get(`/api/resource/clients/` + localStorage.clientId + `/subcontractors/` + payload + '/insurance/policies')
        .then(response => {
          console.log('Received Subcontractor Insurances from server.')
          console.log(response.data)
          const data = response.data
          commit('setLoadedSubContractorInsurancePolicies', data)
          commit('setLoading', false, { root: true })
        })
        .catch(e => {
           commit('setError', e, { root: true })
        })
    },
    createSubContractorInsurancePolicy({ commit }, payload) {
      console.log('Creating new insurance policy metadata to subcontractor  ' + payload.subContractorId)
      console.log(payload)
      console.log(' for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)
      console.log('Uploading innsurance PolicyFile file ' + payload.insurancePolicyFile)
      const formData = new FormData()
      formData.append('insurancePolicyFile', payload.insurancePolicyFile)
      formData.append('subContractrorId', payload.subContractorId)
      formData.append('clientId', localStorage.clientId)
      formData.append('status', payload.status)
      formData.append('description', payload.description)
      formData.append('coverType', payload.coverType)
      formData.append('policyId', payload.policyId)
      formData.append('broker', payload.broker)
      formData.append('underwriter', payload.underwriter)
      formData.append('coverValue', payload.coverValue)
      formData.append('coverStartDate', payload.coverStartDate)
      formData.append('coverExpiryDate', payload.coverExpiryDate)
      console.log('Multipart Form Data is ')
      for (var p of formData) {
        console.log('Appended Form Data part ' + p)
      }
      axios.create({
        baseURL: `/`,
        headers: { 'Authorization': localStorage.authHeader, 'Content-Type': 'multipart/form-data' }
      }).post('/api/resource/clients/' + localStorage.clientId + '/subcontractors/' + payload.subContractorId + '/insurance/policies', formData)
        .then((response) => {
          const savedSubContractorInsurancePolicy = response.data
          console.log(savedSubContractorInsurancePolicy)
          commit('createSubContractorInsurancePolicy', {
            ...savedSubContractorInsurancePolicy,
            id: savedSubContractorInsurancePolicy.id
          })
        })
        .catch((error) => {
          commit('setLoading', false, { root: true })
           commit('setError', error, { root: true })
          console.log('Oops error creating SubContractorInsurancePolicy ' + error.message)
          console.log(error)
        })
    },
    updateSubContractorInsurancePolicy({ commit }, payload) {
      console.log('Updating SubContractorInsurancePolicy ')
      console.log(payload)
      console.log(' for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)
      webClient.post(`/api/resource/clients/` + localStorage.clientId + `/subcontractors/` + payload.subContractorId + '/insurance/policies/' + payload.id, payload)
        .then((response) => {
          const savedSubContractorInsurancePolicy = response.data
          console.log(savedSubContractorInsurancePolicy)
          commit('updateSubContractorInsurancePolicy', {
            ...savedSubContractorInsurancePolicy,
            id: savedSubContractorInsurancePolicy.id
          })
        })
        .catch((error) => {
          commit('setLoading', false, { root: true })
           commit('setError', error, { root: true })
          console.log('Oops error updating SubContractorInsurancePolicy ' + error.message)
          console.log(error)
        })
    },
    deleteSubContractorInsurancePolicy({ commit }, payload) {
      console.log('Delete SubContractorInsurancePolicy ' + payload.id)
      webClient.delete('/api/resource/clients/' + localStorage.clientId + `/subcontractors/` + payload.subContractorId + '/insurance/policies/' + payload.id)
        .then((response) => {
          console.log('Deleted SubContractorInsurancePolicy, response status = ' + response.status)
          commit('deleteSubContractorInsurancePolicy', payload)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    loadSubContractorOperatives({ commit }, payload) {
      commit('setLoading', true, { root: true })
      console.log('Loading all Operatives with subcontractor id ' + payload)
      console.log('for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)
      webClient.get(`/api/resource/clients/` + localStorage.clientId + `/subcontractors/` + payload + '/resource/operatives')
        .then(response => {
          console.log('Received Subcontractor Operatives from server.')
          console.log(response.data)
          const data = response.data
          commit('setLoadedSubContractorOperatives', data)
          commit('setLoading', false, { root: true })
        })
        .catch(e => {
           commit('setError', e, { root: true })
          console.log(e)
        })
    },
    createSubContractorOperative({ commit }, payload) {
      console.log('Creating new operative for subcontractor  ' + payload.subContractorId)
      console.log(payload)
      console.log(' for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)

      const formData = new FormData()
      formData.append('safePassImageFile', payload.safePassImageFile)
      formData.append('subContractrorId', payload.subContractorId)
      formData.append('clientId', localStorage.clientId)
      formData.append('firstName', payload.firstName)
      formData.append('lastName', payload.lastName)
      formData.append('description', payload.description)
      formData.append('trade', payload.trade)
      formData.append('mobileNumber', payload.mobileNumber)
      formData.append('email', payload.email)
      formData.append('safePassId', payload.safePassId)
      formData.append('safePassExpiryDate', payload.safePassExpiryDate)
      console.log('Multipart Form Data is ')
      for (var p of formData) {
        console.log('Appending Form Data part ' + p)
      }
      axios.create({
        baseURL: `/`,
        headers: { 'Authorization': localStorage.authHeader, 'Content-Type': 'multipart/form-data' }
      }).post('/api/resource/clients/' + localStorage.clientId + '/subcontractors/' + payload.subContractorId + '/resource/operatives', formData)
        .then((response) => {
          const savedSubContractorOperative = response.data
          console.log(savedSubContractorOperative)
          commit('createSubContractorOperative', {
            ...savedSubContractorOperative,
            id: savedSubContractorOperative.id
          })
        })
        .catch((error) => {
          commit('setLoading', false, { root: true })
           commit('setError', error, { root: true })
          console.log('Oops error creating SubContractor Operative ' + error.message)
          console.log(error)
        })
    },
    updateSubContractorOperative({ commit }, payload) {
      console.log('Updating SubContractor Operative ')
      console.log(payload)
      console.log(' for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)
      webClient.post(`/api/resource/clients/` + localStorage.clientId + `/subcontractors/` + payload.subContractorId + '/resource/operatives/' + payload.id, payload)
        .then((response) => {
          const savedSubContractorOperative = response.data
          console.log(savedSubContractorOperative)
          commit('updateSubContractorOperative', {
            ...savedSubContractorOperative,
            id: savedSubContractorOperative.id
          })
        })
        .catch((error) => {
          commit('setLoading', false, { root: true })
           commit('setError', error, { root: true })
          console.log('Oops error updating SubContractor Operative ' + error.message)
          console.log(error)
        })
    },
    deleteSubContractorOperative({ commit }, payload) {
      console.log('Delete SubContractorInsurancePolicy ' + payload.id)
      webClient.delete('/api/resource/clients/' + localStorage.clientId + `/subcontractors/` + payload.subContractorId + '/resource/operatives/' + payload.id)
        .then((response) => {
          console.log('Deleted SubContractor Operative, response status = ' + response.status)
          commit('deleteSubContractorOperative', payload)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    loadSubContractorInvoiceSummary({ commit }, payload) {
      commit('setLoading', true, { root: true })
      console.log('Loading all subcontractor invoices ' + payload)
      console.log('for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)

      webClient.get(`/api/resource/clients/` + localStorage.clientId + `/subcontractors/` + payload + '/invoices/summary')
        .then(response => {
          console.log('Received Subcontractor Invoice Summary from server.')
          console.log(response.data)
          const data = response.data
          commit('setLoadedSubContractorInvoiceSummary', data)
          commit('setLoading', false, { root: true })
        })
        .catch(e => {
           commit('setError', e, { root: true })
          console.log(e)
        })
    },
    loadSubContractorInvoices({ commit }, payload) {
      commit('setLoading', true, { root: true })
      console.log('Loading all Invoices with subcontractor id ' + payload)
      console.log('for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)
      webClient.get(`/api/resource/clients/` + localStorage.clientId + `/subcontractors/` + payload + '/invoices')
        .then(response => {
          console.log('Received Subcontractor Invoices from server.')
          console.log(response.data)
          const data = response.data
          commit('setLoadedSubContractorInvoices', data)
          commit('setLoading', false, { root: true })
        })
        .catch(e => {
           commit('setError', e, { root: true })
          console.log(e)
        })
    },
    downloadSubContractorInvoice({ commit }, payload) {
      const docUrl = '/api/resource/clients/' + localStorage.clientId + '/subcontractors/' + payload.subContractorId + '/invoices/' + payload.id + '/download'
      console.log('Downloading SubContractor Invoice from url:')
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
      }).catch((e) => {
        commit('setError', e, { root: true })
        console.error('Could not download the invoice from url ' + docUrl + ' from the backend.', e)
      })
    },
    createSubContractorInvoice({ commit }, payload) {
      //console.log('Creating new invoice for subcontractor  ' + payload.subContractorId + ' assigned to ' + payload.projectId)
      console.log(payload)
      console.log(' for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)

      const formData = new FormData()
      formData.append('invoiceFile', payload.invoiceFile)
      formData.append('subContractrorId', payload.subContractorId)
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
      }).post('/api/resource/clients/' + localStorage.clientId + '/projects/' + payload.projectId + '/subcontractors/' + payload.subContractorId + '/invoices', formData)
        .then((response) => {
          const savedSubContractorInvoice = response.data
          console.log(savedSubContractorInvoice)
          commit('createSubContractorInvoice', {
            ...savedSubContractorInvoice,
            id: savedSubContractorInvoice.id
          })
        })
        .catch((error) => {
          commit('setLoading', false, { root: true })
           commit('setError', error, { root: true })
          console.log('Oops error creating SubContractor Invoice ' + error.message)
          console.log(error)
        })
    },
    updateSubContractorInvoice({ commit }, payload) {
      console.log('Updating SubContractor Invoice ')
      console.log(payload)
      console.log(' for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)
      webClient.post(`/api/resource/clients/` + localStorage.clientId + `/subcontractors/` + payload.subContractorId + '/invoices/' + payload.id, payload)
        .then((response) => {
          const savedSubContractorInvoice = response.data
          console.log(savedSubContractorInvoice)
          commit('updateSubContractorInvoice', {
            ...savedSubContractorInvoice,
            id: savedSubContractorInvoice.id
          })
        })
        .catch((error) => {
          commit('setLoading', false, { root: true })
           commit('setError', error, { root: true })
          console.log('Oops error updating SubContractor Invoice ' + error.message)
          console.log(error)
        })
    },
    deleteSubContractorInvoice({ commit }, payload) {
      console.log('Delete SubContractor Invoice ' + payload.id)
      webClient.delete('/api/client/' + localStorage.clientId + '/subcontractors/' + payload.subContractorId + '/invoices/' + payload.id)
        .then((response) => {
          console.log('Deleted SubContractor Invoice, response status = ' + response.status)
          commit('deleteSubContractorInvoice', payload)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    loadSubContractorQuotationSummary({ commit }, payload) {
      commit('setLoading', true, { root: true })
      console.log('Loading all subcontractor invoices ' + payload)
      console.log('for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)

      webClient.get(`/api/resource/clients/` + localStorage.clientId + `/subcontractors/` + payload + '/quotations/summary')
        .then(response => {
          console.log('Received Subcontractor Quotation Summary from server.')
          console.log(response.data)
          const data = response.data
          commit('setLoadedSubContractorQuotationSummary', data)
          commit('setLoading', false, { root: true })
        })
        .catch(e => {
           commit('setError', e, { root: true })
          console.log(e)
        })
    },
    loadSubContractorQuotations({ commit }, payload) {
      commit('setLoading', true, { root: true })
      console.log('Loading all Quotations with subcontractor id ' + payload)
      console.log('for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)

      webClient.get(`/api/resource/clients/` + localStorage.clientId + `/subcontractors/` + payload + '/quotations')
        .then(response => {
          console.log('Received Subcontractor Quotations from server.')
          console.log(response.data)
          const data = response.data
          commit('setLoadedSubContractorQuotations', data)
          commit('setLoading', false, { root: true })
        })
        .catch(e => {
           commit('setError', e, { root: true })
          console.log(e)
        })
    },
    downloadSubContractorQuotation({ commit }, payload) {
      const docUrl = '/api/resource/clients/' + localStorage.clientId + '/subcontractors/' + payload.subContractorId + '/quotations/' + payload.id + '/download'
      console.log('Downloading SubContractor Quotation from url:')
      console.log(docUrl)
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
      }).catch((e) => {
        commit('setError', e, { root: true })
        console.error('Could not download the subContractor quotation from url ' + docUrl + ' from the backend.', e)
      })
    },
    createSubContractorQuotation({ commit }, payload) {
      //console.log('Creating new quotation for subcontractor  ' + payload.subContractorId + ' assigned to ' + payload.projectId)
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
      }).post('/api/resource/clients/' + localStorage.clientId + '/projects/' + payload.projectId + '/subcontractors/' + payload.subContractorId + '/quotations', formData)
        .then((response) => {
          const savedSubContractorQuotation = response.data
          console.log(savedSubContractorQuotation)
          commit('createSubContractorQuotation', {
            ...savedSubContractorQuotation,
            id: savedSubContractorQuotation.id
          })
        })
        .catch((error) => {
          commit('setLoading', false, { root: true })
           commit('setError', error, { root: true })
          console.log('Oops error creating SubContractor Quotation ' + error.message)
          console.log(error)
        })
    },
    updateSubContractorQuotation({ commit }, payload) {
      console.log('Updating SubContractor Quotation ')
      console.log(payload)
      console.log(' for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)
      webClient.post('/api/resource/clients/' + localStorage.clientId + '/subcontractors/' + payload.subContractorId + '/quotations/' + payload.id, payload)
        .then((response) => {
          const savedSubContractorQuotation = response.data
          console.log(savedSubContractorQuotation)
          commit('updateSubContractorQuotation', {
            ...savedSubContractorQuotation,
            id: savedSubContractorQuotation.id
          })
        })
        .catch((error) => {
          commit('setLoading', false, { root: true })
           commit('setError', error, { root: true })
          console.log('Oops error updating SubContractor Quotation ' + error.message)
          console.log(error)
        })
    },
    deleteSubContractorQuotation({ commit }, payload) {
      console.log('Delete SubContractor Quotation ' + payload.id)
      webClient.delete('/api/resource/clients/' + localStorage.clientId + '/subcontractors/' + payload.subContractorId + '/quotations/' + payload.id)
        .then((response) => {
          console.log('Deleted SubContractor Quotation, response status = ' + response.status)
          commit('deleteSubContractorQuotation', payload)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    loadSubContractorPayments({ commit }, payload) {
      commit('setLoading', true, { root: true })
      console.log('Loading all Payments with subcontractor id ' + payload)
      console.log('for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)

      webClient.get(`/api/client/` + localStorage.clientId + `/subcontractors/` + payload + '/payments')
        .then(response => {
          console.log('Received Subcontractor Payments from server.')
          console.log(response.data)
          const data = response.data
          commit('setLoadedSubContractorPayments', data)
          commit('setLoading', false, { root: true })
        })
        .catch(e => {
           commit('setError', e, { root: true })
          console.log(e)
        })
    },
    approveSubContractorInvoicePayment({ commit }, payload) {
      //console.log('Creating new payment for subcontractor  ' + payload.subContractorId + ' assigned to ' + payload.projectId)
      console.log(payload)
      console.log(' for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)
      //const formData = {
      //  approvedBy: localStorage.authHeader
     // }
      webClient.post('/api/client/' + localStorage.clientId + '/subcontractors/' + payload.subContractorId + '/invoices/' + payload.invoiceId + '/payment/approval', payload)
        .then((response) => {
          const savedSubContractorPayment = response.data
          console.log(savedSubContractorPayment)
          commit('updateSubContractorInvoice', {
            ...savedSubContractorPayment,
            id: savedSubContractorPayment.id
          })
        })
        .catch((error) => {
          commit('setLoading', false, { root: true })
           commit('setError', error, { root: true })
          console.log('Oops error approving SubContractor Invoice Payment ' + error.message)
          console.log(error)
        })
    },
    updateSubContractorPayment({ commit }, payload) {
      console.log('Updating SubContractor Payment ')
      console.log(payload)
      console.log(' for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)
      webClient.put(`/api/client/` + localStorage.clientId + `/subcontractors/` + payload.subContractorId + '/payments/' + payload.id, payload)
        .then((response) => {
          const savedSubContractorPayment = response.data
          console.log(savedSubContractorPayment)
          commit('updateSubContractorPayment', {
            ...savedSubContractorPayment,
            id: savedSubContractorPayment.id
          })
        })
        .catch((error) => {
          commit('setLoading', false, { root: true })
           commit('setError', error, { root: true })
          console.log('Oops error updating SubContractor Payment ' + error.message)
          console.log(error)
        })
    },
    deleteSubContractorPayment({ commit }, payload) {
      console.log('Delete SubContractor Payment ' + payload.id)
      webClient.delete('/api/client/' + localStorage.clientId + '/subcontractors/' + payload.subContractorId + '/payments/' + payload.id)
        .then((response) => {
          console.log('Deleted SubContractor Payment, response status = ' + response.status)
          commit('deleteSubContractorPayment', payload)
        })
        .catch((error) => {
          console.log(error)
        })
    },

  }
  const getters =  {
    loadedSubContractorCategories(state) {
      return state.loadedSubContractorCategories.sort((A, B) => {
        return A.id > B.id
      })
    },
    loadedSubContractors(state) {
      return state.loadedSubContractors.sort((subbieA, subbieB) => {
        return subbieA.category > subbieB.category && subbieA.name > subbieB.name
      })
    },
    loadedSubContractor(state) {
      return state.loadedSubContractor
      /*
      return (subbieId) => {
        return state.loadedSubContractors.find((subbie) => {
          return subbie.id === subbieId
        })
      }*/
    },
    loadedSubContractorProcurementPackageBillItems(state) {
      return state.loadedSubContractorProcurementPackageBillItems.sort((A, B) => {
        return A.id > B.id
      })
    },
    loadedProjectSubContractTenders(state) {
      return state.loadedProjectSubContractTenders.sort((itemA, itemB) => {
        return itemA.id > itemB.id
      })
    },
    loadedProjectSubContractorTendersPackages(state) {
      return state.loadedProjectSubContractorTendersPackages.sort((itemA, itemB) => {
        return itemA.id > itemB.id
      })
    },
    loadedSubContractorProjectProcurementPackages(state) {
      return state.loadedSubContractorProjectProcurementPackages.sort((A, B) => {
        return A.id > B.id
      })
    },
    loadedSubContractorInsurancePolicies(state) {
      return state.loadedSubContractorInsurancePolicies.sort((subbieA, subbieB) => {
        return subbieA.id > subbieB.id
      })
    },
    loadedSubContractorOperatives(state) {
      return state.loadedSubContractorOperatives.sort((subbieA, subbieB) => {
        return subbieA.lastName > subbieB.lastName
      })
    },
    loadedSubContractorQuotations(state) {
      return state.loadedSubContractorQuotations.sort((subbieQuotationA, subbieQuotationB) => {
        return subbieQuotationA.id > subbieQuotationB.id
      })
    },
    loadedSubContractorQuotationSummary(state) {
      return state.loadedSubContractorQuotationSummary
    },
    loadedSubContractorInvoices(state) {
      return state.loadedSubContractorInvoices.sort((subbieInvoiceA, subbieInvoiceB) => {
        return subbieInvoiceA.id > subbieInvoiceB.id
      })
    },
    loadedSubContractorInvoiceSummary(state) {
      return state.loadedSubContractorInvoiceSummary
    },
    loadedSubContractorPayments(state) {
      return state.loadedSubContractorPayments.sort((A, B) => {
        return A.id > B.id
      })
    },
    showSubContractorDialog(state) {
      return state.showSubContractorDialog
    },
    subContractorSearchText(state) {
      return state.subContractorSearchText
    },
    editedSubContractor(state) {
      return state.editedSubContractor
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
