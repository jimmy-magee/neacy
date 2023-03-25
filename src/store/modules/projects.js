import webClient from './webclient'
import axios from 'axios'

const state = {
    loadedBoQItemCategories: [],
    loadedProjects: [],
    loadProject: null,
    loadedProjectOrders: [],
    loadedProjectStatusList: [],
    loadedProjectContacts: [],
    loadedProjectTasks: [],
    loadedProjectDrawings: [],
    loadedProjectDrawingCategories: [],
    loadedProjectRooms: [],
    loadedProjectRFIs: [],
    loadedProjectImageMetadata: [],
    loadedProjectImages: [],
    loadedProjectProcurementPackageSummary: null,
    loadedProjectProcurementPackages: [],
    loadedProjectProcurementPackage: null,
    loadedSubContractorProcurementPackageBillItems: [],
    loadedProjectSubContractorProcurementPackages: [],
    loadedProjectQuotationSummary: null,
    loadedProjectQuotations: [],
    loadedProjectCustomerInvoiceSummary: null,
    loadedProjectCustomerInvoices: [],
    loadedProjectSubContractorInvoiceSummary: null,
    loadedProjectSubContractorInvoices: [],
    loadedProjectSupplierInvoiceSummary: null,
    loadedProjectSupplierInvoices: [],
    loadedProjectPaymentSummary: null,
    loadedProjectPayments: [],
    loadedProjectBoQ: [],
    loadedProjectBoQSummary: null,
    selectedProjectBoQItem: null,
    loadedProjectBoQItemMeasures: [],
    loadedProjectBoQCategoryCosts: [],
    loadedProjectRoomScheduleBoQ: [],
    loadedProjectSubContractTenders: [],
}
const mutations = {
    createProject(state, payload) {
        state.loadedProjects.push(payload)
    },
    updateProject(state, payload) {
        state.loadedProjects = [
            ...state.loadedProjects.filter(element => element.id !== payload.id), payload
        ]
    },
    setLoadedProjectRFIs(state, payload) {
        state.loadedProjectRFIs = payload
    },
    createProjectRFI(state, payload) {
        state.loadedProjectRFIs.push(payload)
    },
    updateProjectRFI(state, payload) {
        state.loadedProjectRFIs = [
            ...state.loadedProjectRFIs.filter(element => element.id !== payload.id), payload
        ]
    },
    deleteProjectRFI(state, payload) {
        console.log('Committing delete project rfi')
        console.log(payload)
        const index = state.loadedProjectRFIs.indexOf(payload)
        console.log('Index of deleted item is ' + index)
        state.loadedProjectRFIs.splice(index, 1)
    },
    setLoadedProjectRooms(state, payload) {
        state.loadedProjectRooms = payload
    },
    createProjectRoom(state, payload) {
        state.loadedProjectRooms.push(payload)
    },
    updateProjectRoom(state, payload) {
        state.loadedProjectRooms = [
            ...state.loadedProjectRooms.filter(element => element.id !== payload.id), payload
        ]
    },
    deleteProjectRoom(state, payload) {
        const index = state.loadedProjectRooms.indexOf(payload)
        console.log('Index of deleted item is ' + index)
        state.loadedProjectRooms.splice(index, 1)
    },
    addProjectDrawing(state, payload) {
        console.log('Adding project drawings ')
        console.log(payload)
        for (var i = 0; i < payload.length; i++) {
            state.loadedProjectDrawings.push(payload[i])
            console.log(payload[i]);
        }
    },
    updateProjectDrawing(state, payload) {
        state.loadedProjectDrawings = [
            ...state.loadedProjectDrawings.filter(element => element.id !== payload.id), payload
        ]
    },
    deleteProjectDrawing(state, payload) {
        console.log('Committing delete project drawing')
        console.log(payload)
        const index = state.loadedProjectDrawings.indexOf(payload)
        console.log('Index of deleted item is ' + index)
        state.loadedProjectDrawings.splice(index, 1)
    },
    bulkUpdateProjectImages(state, payload) {
        console.log('Adding project images ')
        console.log(payload)
        for (var i = 0; i < payload.length; i++) {
            state.loadedProjectImageMetadata.push(payload[i])
            console.log(payload[i]);
        }
    },
    updateProjectImageMetadata(state, payload) {
        state.loadedProjectImageMetadata = [
            ...state.loadedProjectImageMetadata.filter(element => element.id !== payload.id), payload
        ]
    },
    deleteProjectImage(state, payload) {
        console.log('Committing delete project image')
        console.log(payload)
        const index = state.loadedProjectImages.indexOf(payload)
        console.log('Index of deleted project image is ' + index)
        state.loadedProjectImages.splice(index, 1)
    },
    deleteProjectBoQItem(state, payload) {
        console.log('Committing delete project boq item')
        console.log(payload)
        const index = state.loadedProjectBoQ.indexOf(payload)
        console.log('Index of deleted item is ' + index)
        state.loadedProjectBoQ.splice(index, 1)
    },
    deleteProjectBoQItemMeasure(state, payload) {
        console.log('Committing delete project boq item measure')
        console.log(payload)
        const index = state.loadedProjectBoQItemMeasures.indexOf(payload)
        console.log('Index of deleted item is ' + index)
        state.loadedProjectBoQItemMeasures.splice(index, 1)
    },
    setLoadedProjectDrawingCategories(state, payload) {
        state.loadedProjectDrawingCategories = payload
    },
    createProjectDrawingCategory(state, payload) {
        state.loadedProjectDrawingCategories.push(payload)
    },
    updateProjectDrawingCategory(state, payload) {
        state.loadedProjectDrawingCategories = [
            ...state.loadedProjectDrawingCategories.filter(u => u.id !== payload.id), payload
        ]
    },
    deleteProjectDrawingCategory(state, payload) {
        const index = state.loadedProjectDrawingCategories.indexOf(payload)
        console.log('Index of deleted ProjectDrawing category is ' + index)
        state.loadedProjectDrawingCategories.splice(index, 1)
    },
    setLoadedProjects(state, payload) {
        state.loadedProjects = payload
    },
    setLoadedProject(state, payload) {
        state.loadedProject = payload
    },
    setLoadedProjectStatusList(state, payload) {
        state.loadedProjectStatusList = payload
    },
    setLoadedProjectContacts(state, payload) {
        state.loadedProjectContacts = payload
    },
    setLoadedProjectTasks(state, payload) {
        state.loadedProjectTasks = payload
    },
    setLoadedProjectDrawings(state, payload) {
        console.log('Setting project drawings' + payload)
        state.loadedProjectDrawings = payload
    },
    setLoadedProjectImageMetadata(state, payload) {
        console.log('Setting project images' + payload)
        state.loadedProjectImageMetadata = payload
    },
    setLoadedProjectProcurementPackageSummary(state, payload) {
        state.loadedProjectProcurementPackageSummary = payload
    },
    setLoadedProjectProcurementPackages(state, payload) {
        state.loadedProjectProcurementPackages = payload
    },
    setLoadedProjectProcurementPackage(state, payload) {
        state.loadedProjectProcurementPackage = payload
    },
    setLoadedProjectQuotationSummary(state, payload) {
        state.loadedProjectQuotationSummary = payload
    },
    setLoadedProjectQuotations(state, payload) {
        state.loadedProjectQuotations = payload
    },
    setLoadedProjectCustomerInvoiceSummary(state, payload) {
        state.loadedProjectCustomerInvoiceSummary = payload
    },
    setLoadedProjectCustomerInvoices(state, payload) {
        state.loadedProjectCustomerInvoices = payload
    },
    setLoadedProjectSubContractorInvoiceSummary(state, payload) {
        state.loadedProjectSubContractorInvoiceSummary = payload
    },
    setLoadedProjectSubContractorInvoices(state, payload) {
        state.loadedProjectSubContractorInvoices = payload
    },
    setLoadedProjectSupplierInvoiceSummary(state, payload) {
        state.loadedProjectSupplierInvoiceSummary = payload
    },
    setLoadedProjectSupplierInvoices(state, payload) {
        state.loadedProjectSupplierInvoices = payload
    },
    setLoadedProjectImages(state, payload) {
        console.log('Setting project images' + payload)
        state.loadedProjectImages = payload
    },
    addProjectImageMetatadata(state, payload) {
        state.loadedProjectImageMetadata.push(payload)
    },
    setLoadedProjectBoQSummary(state, payload) {
        state.loadedProjectBoQSummary = payload
    },
    setLoadedProjectBoQ(state, payload) {
        console.log('Setting project bill of quantites' + payload)
        state.loadedProjectBoQ = payload
    },
    setSelectedProjectBoQItem(state, payload) {
        console.log('Setting project bill of quantites' + payload)
        state.selectedProjectBoQItem = payload
    },
    setLoadedProjectBoQItemMeasures(state, payload) {
        console.log('Setting project bill item measures' + payload)
        state.loadedProjectBoQItemMeasures = payload
    },
    createProjectBoQItemMeasure(state, payload) {
        state.loadedProjectBoQItemMeasures.push(payload)
    },
    setLoadedProjectBoQCategoryCosts(state, payload) {
        console.log('Setting project bill of quantites category costs' + payload)
        state.loadedProjectBoQCategoryCosts = payload
    },
    setLoadedProjectRoomScheduleBoQ(state, payload) {
        //console.log('Setting project bill of quantites category costs' + payload)
        state.loadedProjectRoomScheduleBoQ = payload
    },
    setLoadedProjectOrders(state, payload) {
        state.loadedProjectOrders = payload
    },
    setLoadedProjectSubContractTenders(state, payload) {
        console.log('Setting project subcontract tenders' + payload)
        state.loadedProjectSubContractTenders = payload
    },
    setLoadedSubContractorProjectTenderPackages(state, payload) {
        console.log('Setting project subcontractor tenders' + payload)
        state.loadedProjectSubContractorTendersPackages = payload
    },
    createProjectSubContractTender(state, payload) {
        state.loadedProjectSubContractTenders.push(payload)
    },
    updateProjectSubContractTender(state, payload) {
        state.loadedSubContractTenders = [
            ...state.loadedProjectSubContractTenders.filter(element => element.id !== payload.id), payload
        ]
    },
    deleteProjectSubContractorTender(state, payload) {
        console.log('Committing delete project subcontract tender')
        console.log(payload)
        const index = state.loadedProjectSubContractTenders.indexOf(payload)
        console.log('Index of deleted item is ' + index)
        state.loadedProjectSubContractTenders.splice(index, 1)
    },
    createProjectBoQItem(state, payload) {
        state.loadedProjectBoQ.push(payload)
    },
    createProjectTask(state, payload) {
        state.loadedProjectTasks.push(payload)
    },
    updateProjectTask(state, payload) {
        state.loadedProjectTasks = [
            ...state.loadedProjectTasks.filter(element => element.id !== payload.id), payload
        ]
    },
    deleteProjectTask(state, payload) {
        console.log('Committing delete project task')
        console.log(payload)
        const index = state.loadedProjectTasks.indexOf(payload)
        console.log('Index of deleted task is ' + index)
        state.loadedProjectTasks.splice(index, 1)
    },
    createProjectProcurementPackage(state, payload) {
        state.loadedProjectProcurementPackages.push(payload)
    },
    updateProjectProcurementPackage(state, payload) {
        state.loadedProjectProcurementPackage = payload
        state.loadedProjectProcurementPackages = [
            ...state.loadedProjectProcurementPackages.filter(element => element.id !== payload.id), payload
        ]
    },
    deleteProjectProcurementPackage(state, payload) {
        console.log('Committing delete project task')
        console.log(payload)
        const index = state.loadedProjectProcurementPackages.indexOf(payload)
        console.log('Index of deleted task is ' + index)
        state.loadedProjectProcurementPackages.splice(index, 1)
    },
    createProjectContact(state, payload) {
        state.loadedProjectContacts.push(payload)
    },
    updateProjectContact(state, payload) {
        state.loadedProjectContacts = [
            ...state.loadedProjectContacts.filter(element => element.id !== payload.id), payload
        ]
    },
    deleteProjectContact(state, payload) {
        console.log('Committing delete project contact')
        console.log(payload)
        const index = state.loadedProjectContacts.indexOf(payload)
        console.log('Index of deleted task is ' + index)
        state.loadedProjectContacts.splice(index, 1)
    },
    updateProjectBoQItem(state, payload) {
        state.loadedProjectBoQ = [
            ...state.loadedProjectBoQ.filter(element => element.id !== payload.id), payload
        ]
    },
    updateProjectBoQItemMeasure(state, payload) {
        state.loadedProjectBoQItemMeasures = [
            ...state.loadedProjectBoQItemMeasures.filter(element => element.id !== payload.id), payload
        ]
    },
    deleteProjectSubContractorProcurementPackage(state, payload) {
        console.log('Deleting ubContractor Procurement Package ')
        console.log(payload)
        const index = state.loadedProjectSubContractorProcurementPackages.indexOf(payload)
        state.loadedProjectSubContractorProcurementPackages.splice(index, 1)
    },
    setLoadedBoQItemCategories(state, payload) {
        state.loadedBoQItemCategories = payload
    },
    createBoQItemCategory(state, payload) {
        state.loadedBoQItemCategories.push(payload)
    },
    updateBoQItemCategory(state, payload) {
        state.loadedBoQItemCategories = [
            ...state.loadedBoQItemCategories.filter(u => u.id !== payload.id), payload
        ]
    },
    deleteBoQItemCategory(state, payload) {
        const index = state.loadedBoQItemCategories.indexOf(payload)
        state.loadedBoQItemCategories.splice(index, 1)
    },

}
const actions = {

    createProjectDrawingCategory({ commit }, payload) {
        commit('setLoading', true, { root: true })
        webClient.post(`/api/resource/clients/` + localStorage.clientId + `/drawing_categories`, payload)
            .then(response => {
                console.log('Received saved ProjectDrawing Category from server..')
                commit('createProjectDrawingCategory', response.data)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setError', error, { root: true })
            })
    },
    updateProjectDrawingCategory({ commit }, payload) {
        commit('setLoading', true, { root: true })
        webClient.post(`/api/resource/clients/` + localStorage.clientId + `/drawing_categories/` + payload.id, payload)
            .then(response => {
                console.log('Received updated ProjectDrawing Category from server..')
                commit('updateProjectDrawingCategory', response.data)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setError', error.response, { root: true })
            })
    },
    deleteProjectDrawingCategory({ commit }, payload) {
        commit('setLoading', true, { root: true })
        webClient.delete(`/api/resource/clients/` + localStorage.clientId + `/drawing_categories/` + payload)
            .then(() => {
                commit('deleteProjectDrawingCategory', payload)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setError', error, { root: true })
            })
    },
    loadSupplierCategories({ commit }) {
        commit('setLoading', true, { root: true })
        webClient.get(`/api/resource/clients/` + localStorage.clientId + `/supplier_categories`)
            .then(response => {
                console.log('Received Suppliers Categories...')
                commit('setLoadedSupplierCategories', response.data)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setError', error, { root: true })
            })
    },
    createProjectProductOrder({ commit }, payload) {
        commit('setLoading', true, { root: true })
        webClient.post(`/api/resource/clients/` + localStorage.clientId + `/suppliers/` + payload.supplierId + '/quotations/' + payload.quotationId + '/order', payload)
            .then(response => {
                console.log('Received saved Supplier Project Order confirmation from server..')
                console.log(response.data)
                //commit('createSupplierCategory', response.data)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setError', error.response, { root: true })
            })
    },
    loadProjectStatusList({ commit }) {
        commit('setLoading', true, { root: true })
        webClient.get('/api/resource/clients/' + localStorage.clientId + '/projects/status/list')
            .then(response => {
                const list = response.data
                console.log('Received project status enum from server ')
                console.log(list)
                commit('setLoadedProjectStatusList', list)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setError', error.response, { root: true })
                console.log('Oops ' + error.message)
                console.log(error)
            })
    },
    loadProjects({ commit }) {
        commit('setLoading', true, { root: true })
        console.log('Loading all Projects for user with authorization token ' + localStorage.authHeader)
        webClient.get(`/api/resource/clients/` + localStorage.clientId + `/projects`)
            .then(response => {
                console.log('Received Projects')
                console.log(response.data)
                commit('setLoadedProjects', response.data)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                console.log('Received error getting projects..')
                console.log(error.response)
                commit('setLoading', false, { root: true })
                commit('setError', error.response, { root: true })
            })
    },
    loadProject({ commit }, payload) {
        commit('setLoading', true, { root: true })
        console.log('Loading Project for user with authorization token ' + localStorage.authHeader)
        webClient.get(`/api/resource/clients/` + localStorage.clientId + `/projects/` + payload)
            .then(response => {
                console.log('Received Project')
                console.log(response.data)
                commit('setLoadedProject', response.data)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                console.log('Received error getting projects..')
                console.log(error.response)
                commit('setLoading', false, { root: true })
                commit('setError', error.response, { root: true })
            })
    },
    createProject({ commit }, payload) {
        console.log('Creating New Project ')
        console.log(payload)
        console.log(' for user with token ' + localStorage.authHeader)

        payload.clientId = localStorage.clientId

        webClient.post('/api/resource/clients/' + localStorage.clientId + '/projects', payload)
            .then((response) => {
                const savedProject = response.data
                console.log(savedProject)
                commit('createProject', {
                    ...savedProject,
                    projectName: savedProject.projectName
                })
            })
            .catch((error) => {
                commit('setLoading', false, { root: true })
                commit('setError', error.response, { root: true })
                console.log(error.response)
            })
    },
    updateProject({ commit }, payload) {
        console.log('Updating Project ')
        console.log(payload)
        console.log(' for user with token ' + localStorage.authHeader)
        webClient.post('/api/resource/clients/' + localStorage.clientId + '/projects/' + payload.id, payload)
            .then((response) => {
                const updatedProject = response.data
                console.log('Received updated project from server')
                console.log(updatedProject)
                commit('updateProject', updatedProject)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    updateProjectAccessControlList({ commit }, payload) {
        console.log('Update Project Access Control List ' + payload.projectId)
        // /api/resource/clients/{clientId}/projects/{projectId}/access
        const form = payload.usernames.map(x => x.username)
        console.log('ACL payload is ')
        console.log(form)
        webClient.post('/api/resource/clients/' + localStorage.clientId + '/projects/' + payload.projectId + '/access', form)
            .then((response) => {
                console.log('Updated Project with Access Control List:')
                console.log(response.data)
                commit('updateProject', response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    deleteProject({ commit }, payload) {
        console.log('Delete Project Contact' + payload.id)
        webClient.delete('/api/client/' + localStorage.clientId + '/projects/' + payload.id)
            .then((response) => {
                console.log('Deleted project , response status = ' + response.status)
                commit('deleteProject', payload)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    loadProjectTasks({ commit }, payload) {
        commit('setLoading', true, { root: true })
        console.log('Loading all Projects Tasks for user with authorization token ' + localStorage.authHeader)
        webClient.get(`/api/client/` + localStorage.clientId + `/projects/` + payload + '/tasks')
            .then(response => {
                console.log('Received Project Tasks')
                console.log(response.data)
                const data = response.data
                commit('setLoadedProjectTasks', data)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setError', error, { root: true })
            })
    },
    createProjectTask({ commit }, payload) {
        console.log('Creating Project Task ')
        console.log(payload)
        console.log(' for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)
        webClient.post('/api/client/' + localStorage.clientId + '/projects/' + payload.projectId + '/tasks', payload)
            .then((response) => {
                const savedProjectTask = response.data
                console.log(savedProjectTask)
                commit('createProjectTask', {
                    ...savedProjectTask,
                    id: savedProjectTask.id
                })
            })
            .catch((error) => {
                commit('setLoading', false, { root: true })
                commit('setError', error, { root: true })
                console.log('Oops ' + error.message)
                console.log(error)
            })
    },
    updateProjectTask({ commit }, payload) {
        console.log('Updating Project Task ')
        console.log(payload)
        console.log(' for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)
        webClient.post('/api/client/' + localStorage.clientId + '/projects/' + payload.projectId + '/tasks/' + payload.id, payload)
            .then((response) => {
                const savedProjectTask = response.data
                console.log(savedProjectTask)
                commit('updateProjectTask', {
                    ...savedProjectTask,
                    id: savedProjectTask.id
                })
            })
            .catch((error) => {
                commit('setLoading', false, { root: true })
                commit('setError', error, { root: true })
                console.log('Oops ' + error.message)
                console.log(error)
            })
    },
    deleteProjectTask({ commit }, payload) {
        console.log('Delete Project Task' + payload.id)
        webClient.delete('/api/client/' + localStorage.clientId + '/projects/' + payload.projectId + '/tasks/' + payload.id)
            .then((response) => {
                console.log('Deleted project drawing, response status = ' + response.status)
                commit('deleteProjectTask', payload)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    loadProjectContacts({ commit }, payload) {
        commit('setLoading', true, { root: true })
        console.log('Loading all Projects Contacts for user with authorization token ' + localStorage.authHeader)
        webClient.get(`/api/client/` + localStorage.clientId + `/projects/` + payload + '/contacts')
            .then(response => {
                console.log('Received Project Contacts')
                console.log(response.data)
                const data = response.data
                commit('setLoadedProjectContacts', data)
                commit('setLoading', false, { root: true })
            })
            .catch(e => {
                commit('setError', e, { root: true })
            })
    },
    createProjectContact({ commit }, payload) {
        console.log('Creating Project Contact ')
        console.log(payload)
        console.log(' for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)
        webClient.post('/api/client/' + localStorage.clientId + '/projects/' + payload.projectId + '/contacts', payload)
            .then((response) => {
                const savedProjectContact = response.data
                console.log(savedProjectContact)
                commit('createProjectContact', {
                    ...savedProjectContact,
                    id: savedProjectContact.id
                })
            })
            .catch((error) => {
                commit('setLoading', false, { root: true })
                commit('setError', error)
                console.log('Oops error creating project contact ' + error.message)
                console.log(error)
            })
    },
    updateProjectContact({ commit }, payload) {
        console.log('Updating Project Contact ')
        console.log(payload)
        console.log(' for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)
        webClient.put('/api/client/' + localStorage.clientId + '/projects/' + payload.projectId + '/contacts/' + payload.id, payload)
            .then((response) => {
                const savedProjectContact = response.data
                console.log(savedProjectContact)
                commit('updateProjectContact', {
                    ...savedProjectContact,
                    id: savedProjectContact.id
                })
            })
            .catch((error) => {
                commit('setLoading', false, { root: true })
                commit('setError', error)
                console.log('Oops error updating project contact ' + error.message)
                console.log(error)
            })
    },
    deleteProjectContact({ commit }, payload) {
        console.log('Delete Project Contact' + payload.id)
        webClient.delete('/api/client/' + localStorage.clientId + '/projects/' + payload.projectId + '/contacts/' + payload.id)
            .then((response) => {
                console.log('Deleted project contact, response status = ' + response.status)
                commit('deleteProjectContact', payload)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    loadProjectRFIs({ commit }, payload) {
        commit('setLoading', true, { root: true })
        console.log('Loading all Projects for user with authorization token ' + localStorage.authHeader)
        webClient.get(`/api/resource/clients/` + localStorage.clientId + '/projects/' + payload + '/rfis')
            .then(response => {
                console.log('Received Projects RFIs')
                console.log(response.data)
                commit('setLoadedProjectRFIs', response.data)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                console.log('Received error getting project RFIs..')
                console.log(error.response)
                commit('setLoading', false, { root: true })
                commit('setError', error.response)
            })
    },
    createProjectRFI({ commit }, payload) {
        console.log('Creating New Project RFI ')
        console.log(payload)
        console.log(' for user with token ' + localStorage.authHeader)

        payload.clientId = localStorage.clientId

        webClient.post('/api/resource/clients/' + localStorage.clientId + '/projects/' + payload.projectId + '/rfis', payload)
            .then((response) => {
                const savedProject = response.data
                console.log(savedProject)
                commit('createProjectRFI', {
                    ...savedProject,
                    projectName: savedProject.projectName
                })
            })
            .catch((error) => {
                commit('setLoading', false, { root: true })
                commit('setError', error.response, { root: true })
                console.log(error.response)
            })
    },
    updateProjectRFI({ commit }, payload) {
        console.log('Updating Project RFI ')
        console.log(payload)
        console.log(' for user with token ' + localStorage.authHeader)
        webClient.post('/api/resource/clients/' + localStorage.clientId + '/projects/' + payload.projectId + '/rfis/' + payload.id, payload)
            .then((response) => {
                const updatedProject = response.data
                console.log('Received updated project from server')
                console.log(updatedProject)
                commit('updateProjectRFI', updatedProject)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    deleteProjectRFI({ commit }, payload) {
        console.log('Delete Project RFI' + payload.id)
        webClient.delete('/api/resource/clients/' + localStorage.clientId + '/projects/' + payload.projectId + '/rfis/' + payload.id)
            .then((response) => {
                console.log('Deleted project RFI, response status = ' + response.status)
                commit('deleteProjectRFI', payload)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    loadProjectRooms({ commit }, payload) {
        commit('setLoading', true, { root: true })
        console.log('Loading project room schedule for user with authorization token ' + localStorage.authHeader)
        webClient.get(`/api/resource/clients/` + localStorage.clientId + `/projects/` + payload + `/schedules/rooms`)
            .then(response => {
                console.log('Received Projects Rooms')
                console.log(response.data)
                commit('setLoadedProjectRooms', response.data)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                console.log('Received error getting project room schedule..')
                console.log(error.response)
                commit('setLoading', false, { root: true })
                commit('setError', error.response, { root: true })
            })
    },
    createProjectRoom({ commit }, payload) {
        console.log('Creating New Project Room ')
        console.log(payload)
        console.log(' for user with token ' + localStorage.authHeader)

        payload.clientId = localStorage.clientId

        webClient.post('/api/resource/clients/' + localStorage.clientId + '/projects/' + payload.projectId + '/schedules/rooms', payload)
            .then((response) => {
                const savedProjectRoom = response.data
                commit('createProjectRoom', savedProjectRoom)
            })
            .catch((error) => {
                commit('setLoading', false, { root: true })
                commit('setError', error.response, { root: true })
                console.log(error.response)
            })
    },
    updateProjectRoom({ commit }, payload) {
        console.log('Updating Project Room ')
        console.log(payload)
        console.log(' for user with token ' + localStorage.authHeader)
        webClient.post('/api/resource/clients/' + localStorage.clientId + '/projects/' + payload.projectId + '/schedules/rooms/' + payload.id, payload)
            .then((response) => {
                const updatedProjectRoom = response.data
                console.log('Received updated project room from server')
                console.log(updatedProjectRoom)
                commit('updateProjectRoom', updatedProjectRoom)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    deleteProjectRoom({ commit }, payload) {
        console.log('Delete Project Room' + payload.id)
        webClient.delete('/api/resource/clients/' + localStorage.clientId + '/projects/' + payload.projectId + '/schedules/rooms/' + payload.id)
            .then((response) => {
                console.log('Deleted project room, response status = ' + response.status)
                commit('deleteProjectRoom', payload)
            })
            .catch((error) => {
                console.log(error)
                commit('setError', error, { root: true })
            })
    },
    loadProjectBoQCategoryCosts({ commit }, payload) {
        commit('setLoading', true, { root: true })
        commit('setLoadedProjectBoQCategoryCosts', [])
        console.log('Loading project bill of quantities category costs for user ' + localStorage.authHeader + ' for project ' + payload)
        webClient.get(`/api/resource/clients/` + localStorage.clientId + '/projects/' + payload + '/boqitems/category/summary')
            .then(response => {
                const items = response.data
                console.log('Received bill of quantites category costs from server ')
                console.log(items)
                commit('setLoadedProjectBoQCategoryCosts', items)
                commit('setLoading', false, { root: true })
            })
            .catch(e => {
                console.log('errror getting project boq category costs')
                console.log(e)
                commit('setError', e, { root: true })
            })
    },
    loadProjectRoomScheduleBoQ({ commit }, payload) {
        commit('setLoading', true, { root: true })
        commit('setLoadedProjectRoomScheduleBoQ', [])
        console.log('Loading project bill of quantities by room scheudle ' + localStorage.authHeader + ' for project ' + payload)

        webClient.get(`/api/resource/clients/` + localStorage.clientId + '/projects/' + payload + '/room_schedule/boqitems')
            .then(response => {
                const items = response.data
                console.log('Received bill of quantites by room schedule  from server ')
                console.log(items)
                commit('setLoadedProjectRoomScheduleBoQ', items)
                commit('setLoading', false, { root: true })
            })
            .catch(e => {
                console.log('errror getting project boq by room schedule')
                console.log(e)
                commit('setError', e, { root: true })
            })
    },
    loadProjectDrawingMetadata({ commit }, payload) {
        commit('setLoading', true, { root: true })
        commit('setLoadedProjectDrawings', [])

        console.log('Loading project drawings for user ' + localStorage.authHeader + ' for project ' + payload)
        //api/resource/clients/
        webClient.get('/api/resource/clients/' + localStorage.clientId + '/projects/' + payload + '/drawings')
            .then(response => {
                const dwgs = response.data
                console.log('Received dwgs from server ')
                console.log(dwgs)
                commit('setLoadedProjectDrawings', dwgs)
                commit('setLoading', false, { root: true })
            })
            .catch(e => {
                commit('setError', e, { root: true })
            })
    },
    loadProjectImageMetadata({ commit }, payload) {
        commit('setLoading', true, { root: true })
        commit('setLoadedProjectImageMetadata', [])
        commit('setLoadedProjectImages', [])

        console.log('Loading project images for user ' + localStorage.authHeader + ' for project ' + payload)
        // esource/clients
        webClient.get(`/api/resource/clients/` + localStorage.clientId + `/projects/` + payload + `/images`)
            .then(response => {
                const imageMetadata = response.data
                console.log('Received images from server ' + imageMetadata)
                console.log(imageMetadata)
                commit('setLoadedProjectImageMetadata', imageMetadata)
                /*
                imageMetadata.forEach(function(entry) {
                    console.log(entry.imageUrl);
                    webClient.get(entry.imageUrl)
                          .then(response => {
                                 //commit('addProjectImage', Buffer.from(response.data, 'binary').toString('base64'));
                          });
                });
    */

                //commit('setLoading', false)
            })
            .catch(e => {
                console.log(e)
                commit('setError', e, { root: true })
            })
    },
    setSelectedProjectBoQItem({ commit, dispatch }, payload) {
        console.log('Setting selected boq item ')
        console.log(payload)
        const parameters = {
            'projectId': payload.projectId,
            'boQItemId': payload.id
        }
        dispatch('loadProjectBoQItemMeasures', parameters)
        commit('setSelectedProjectBoQItem', payload)
    },
    loadProjectBoQItemMeasures({ commit }, payload) {
        commit('setLoading', true, { root: true })
        commit('setLoadedProjectBoQItemMeasures', [])

        console.log('Loading project bill item measures for user ' + localStorage.authHeader + ' for project ' + payload)
        webClient.get(`/api/resource/clients/` + localStorage.clientId + `/projects/` + payload.projectId + `/boqitems/` + payload.boQItemId + `/measure`)
            .then(response => {
                const items = response.data
                console.log('Received bill item measures from server.. ')
                console.log(items)
                commit('setLoadedProjectBoQItemMeasures', items)
                commit('setLoading', false, { root: true })
            })
            .catch(e => {
                commit('setError', e, { root: true })
            })
    },
    loadProjectOrders({ commit }, payload) {
        commit('setLoading', true, { root: true })
        console.log('Loading Product orders for  [{' + payload + '}] for user with authorization token ' + localStorage.authHeader)
        webClient.get(`/api/resource/clients/` + localStorage.clientId + `/projects/` + payload + `/orders`)
            .then(response => {
                console.log('Received Project Orders...')
                console.log(response.data)
                commit('setLoadedProjectOrders', response.data)
                commit('setLoading', false, { root: true })
            })
            .catch(e => {
                commit('setError', e, { root: true })
            })
    },
    createProjectImage({ commit }, payload) {

        console.log('Creating project image for user ' + localStorage.authHeader + ' for project ' + payload.projectId + ' image file.. ' + payload.imageFiles)
        console.log(payload.imageFile)
        const formData = new FormData()
        formData.append('fileParts', payload.imageFile)
        formData.append('projectId', payload.projectId)
        formData.append('clientId', localStorage.clientId)

        return axios.create({
            baseURL: `/`,
            headers: {
                'Authorization': localStorage.authHeader,
                'Content-Type': 'multipart/form-data'
            }
        }).post('/api/client/' + localStorage.clientId + '/projects/' + payload.projectId + '/storage/images', formData)
            .then(response => {
                console.log('Received saved image metadata')
                console.log(response.data)
                commit('addProjectImageMetatadata', response.data[0])
            })
            .catch(e => {
                console.log(e)
                commit('setError', e, { root: true })
            })
    },
    saveProjectImageMetaData({ commit }, payload) {

        console.log('Saving project image for user ' + localStorage.authHeader + ' for project ' + payload.projectId + ' image file.. ' + payload.imageFiles)
        console.log(payload)

        return webClient.post('/api/resource/clients/' + localStorage.clientId + '/projects/' + payload.projectId + '/images/' + payload.id, payload)
            .then(response => {
                console.log('Received saved image metadata from server')
                console.log(response.data)
                commit('updateProjectImageMetadata', response.data)
            })
            .catch(e => {
                console.log(e)
                commit('setError', e, { root: true })
            })
    },
    deleteProjectImageMetaData({ commit }, payload) {

        console.log('Deleteing project image for user ' + localStorage.authHeader + ' for project ' + payload.projectId + ' image file.. ' + payload.imageFiles)
        console.log(payload)

        return webClient.delete('/api/resource/clients/' + localStorage.clientId + '/projects/' + payload.projectId + '/images/' + payload.id, payload)
            .then(response => {
                console.log('Received saved image metadata from server')
                console.log(response.data)
                commit('updateProjectImageMetadata', response.data)
            })
            .catch(e => {
                console.log(e)
                commit('setError', e, { root: true })
            })
    },
    uploadProjectDrawings({ commit }, payload) {
        //console.log('Creating dwg' + payload + ' for user ' + getters.user.username + ':' + getters.user.password)

        console.log('Creating project drawings for user ' + localStorage.authHeader + ' for project ' + payload.projectId + ' number o drawing files are ' + payload.drawingFiles.length)
        console.log(payload.drawingFiles)
        const formData = new FormData()
        var i = 0
        var len = payload.drawingFiles.files.length
        for (; i < len;) {
            //var file = payload.drawingFiles.files[i]
            //console.log('Adding file ' + i)
            //console.log(file)
            formData.append('fileParts', payload.drawingFiles.files[i])
            i++
        }

        formData.append('projectId', payload.projectId)
        //formData.append('userId', getters['u)
        console.log(formData)

        return axios.create({
            baseURL: `/`,
            headers: { 'Authorization': localStorage.authHeader, 'Content-Type': 'multipart/form-data' }
            ///api/resource/clients/{clientId}/projects/{projectId}/drawings
        }).post('/api/resource/clients/' + localStorage.clientId + '/projects/' + payload.projectId + '/drawings', formData)
            .then(response => {
                console.log('Received saved project drawings')
                console.log(response.data)
                commit('addProjectDrawing', response.data)
            })
            .catch(e => {
                console.log(e)
                commit('setError', e, { root: true })
            })
    },
    updateProjectDrawingMetaData({ commit }, payload) {
        console.log('Update Project Drawing' + payload.id)
        // /api/resource/clients/{clientId}/projects/{projectId}/drawings/{drawingId}
        webClient.post('/api/resource/clients/' + localStorage.clientId + '/projects/' + payload.projectId + '/drawings/' + payload.id, payload)
            .then((response) => {
                const updatedDrawing = response.data
                console.log('Updated  Drawing:')
                console.log(updatedDrawing)
                commit('updateProjectDrawing', updatedDrawing)
            })
            .catch((error) => {
                commit('setError', error, { root: true })
            })
    },
    deleteProjectDrawing({ commit }, payload) {
        console.log('Delete Project Drawing' + payload.id)
        ///api/resource/clients/{clientId}/projects/{projectId}/drawings/
        webClient.delete('/api/resource/clients/' + localStorage.clientId + '/projects/' + payload.projectId + '/drawings/' + payload.id)
            .then((response) => {
                console.log('Deleted project drawing, response status = ' + response.status)
                commit('deleteProjectDrawing', payload)
            })
            .catch((error) => {
                commit('setError', error, { root: true })
            })
    },
    downloadProjectDrawing({ commit }, payload) {
        const drawingUrl = '/api/resource/clients/' + localStorage.clientId + '/projects/' + payload.projectId + '/drawings/' + payload.id + '/download'
        console.log('Downloading  Drawing from url:')
        console.log(payload)
        axios({
            baseURL: `/`,
            url: drawingUrl,
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
        })
    },
    uploadProjectImages({ commit }, payload) {
        console.log('Uploading images for user ' + localStorage.authHeader + ' to project ' + payload.projectId + ' number o image files are ' + payload.imageFiles.length)
        console.log(payload.imageFiles)
        const formData = new FormData()
        var i = 0
        var len = payload.imageFiles.length
        for (; i < len;) {
            const file = payload.imageFiles[i]
            formData.append('fileParts', file)
            i++
        }
        console.log('Uploading Project Images to server ')
        console.log(payload)
        console.log(' for user with token ' + localStorage.authHeader)

        return axios.create({
            baseURL: `/`,
            headers: { 'Authorization': localStorage.authHeader, 'Content-Type': 'multipart/form-data' }
        }).post('/api/resource/clients/' + localStorage.clientId + '/projects/' + payload.projectId + '/images', formData)
            .then(response => {
                console.log('Received saved project images')
                console.log(response.data)
                commit('bulkUpdateProjectImages', response.data)
            })
            .catch(e => {
                console.log(e)
                commit('setError', e, { root: true })
            })
    },
    loadProjectBoQItems({ commit }, payload) {
        commit('setLoading', true, { root: true })
        commit('setLoadedProjectBoQ', [])
        console.log('Loading project bill of quantities for user ' + localStorage.authHeader + ' for project ' + payload)

        webClient.get(`/api/resource/clients/` + localStorage.clientId + '/projects/' + payload + '/boqitems')
            .then(response => {
                const items = response.data
                console.log('Received bill of quantites from server ')
                console.log(items)
                commit('setLoadedProjectBoQ', items)
                commit('setLoading', false, { root: true })
            })
            .catch(e => {
                console.log('errror getting project boqitems')
                console.log(e)

            })
    },
    loadProjectBoQSummary({ commit }, payload) {
        commit('setLoading', true, { root: true })
        console.log('Loading all project boq ' + payload)
        console.log('for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)

        webClient.get(`/api/resource/clients/` + localStorage.clientId + `/projects/` + payload + '/boq/summary')
            .then(response => {
                console.log('Received Project BoQ Summary from server.')
                console.log(response.data)
                const data = response.data
                commit('setLoadedProjectBoQSummary', data)
                commit('setLoading', false, { root: true })
            })
            .catch(e => {
                commit('setError', e, { root: true })
                console.log(e)
            })
    },
    createProjectBoQItem({ commit, dispatch }, payload) {
        console.log('Creating Project BoQ')
        console.log(payload)
        console.log(' for user with token ' + localStorage.authHeader)

        webClient.post(`/api/resource/clients/` + localStorage.clientId + '/projects/' + payload.projectId + '/boqitems', payload)
            .then((response) => {
                const savedProjectBoQItem = response.data
                console.log(savedProjectBoQItem)
                commit('createProjectBoQItem', {
                    ...savedProjectBoQItem,
                    id: savedProjectBoQItem.id
                })
            }).then(
                setTimeout(() => {
                    dispatch('loadProjectBoQSummary', payload.projectId)
                    dispatch('loadProjectBoQCategoryCosts', payload.projectId)
                    dispatch('loadProjectProcurementPackageSummary', payload.projectId)
                 }, 150)
              )
            .catch((error) => {
                commit('setLoading', false, { root: true })
                commit('setError', error, { root: true })
                console.log('Oops ' + error.message)
                console.log(error)
            })
    },
    updateProjectBoQItem({ commit, dispatch }, payload) {
        console.log('Updating Project BoQ')
        console.log(payload)
        console.log(' for user with token ' + localStorage.authHeader)

        webClient.post(`/api/resource/clients/` + localStorage.clientId + '/projects/' + payload.projectId + '/boqitems/' + payload.id, payload)
            .then((response) => {
                const updatedProjectBoQItem = response.data
                console.log(updatedProjectBoQItem)
                commit('updateProjectBoQItem', updatedProjectBoQItem)
                // this.$store.loadProjectProcurementPackages(updatedProjectBoQItem.projectId)
            }).then(
                setTimeout(() => {
                    dispatch('loadProjectBoQSummary', payload.projectId)
                    dispatch('loadProjectBoQCategoryCosts', payload.projectId)
                    dispatch('loadProjectProcurementPackageSummary', payload.projectId)
                }, 150)
            ).catch((error) => {
                commit('setLoading', false, { root: true })
                commit('setError', error, { root: true })
                console.log('Oops ' + error.message)
                console.log(error)
            })
    },
    deleteProjectBoQItem({ commit }, payload) {
        console.log('Deleting item from Project BoQ')
        console.log(payload)
        console.log(' for user with token ' + localStorage.authHeader)

        webClient.delete(`/api/resource/clients/` + localStorage.clientId + '/projects/' + payload.projectId + '/boqitems/' + payload.id)
            .then(() => {
                commit('deleteProjectBoQItem', payload)
            })
            .catch((error) => {
                commit('setLoading', false, { root: true })
                commit('setError', error, { root: true })
                console.log('Oops ' + error.message)
                console.log(error)
            })
    },
    loadProjectProcurementPackages({ commit }, payload) {
        commit('setLoading', true, { root: true })
        commit('setLoadedProjectProcurementPackages', [])
        console.log('Loading project procurement packages for user ' + localStorage.authHeader + ' for project ' + payload)

        webClient.get(`/api/resource/clients/` + localStorage.clientId + `/projects/` + payload + '/procurement')
            .then(response => {
                const items = response.data
                console.log('Received project procurement pacakges from server ')
                console.log(items)
                commit('setLoadedProjectProcurementPackages', items)
                commit('setLoading', false, { root: true })
            })
            .catch(e => {
                commit('setError', e, { root: true })
            })
    },
    loadProjectProcurementPackageSummary({ commit }, payload) {
        commit('setLoading', true, { root: true })
        console.log('Loading project procurement package summary ' + payload)
        console.log('for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)
        webClient.get(`/api/resource/clients/` + localStorage.clientId + `/projects/` + payload + '/procurement/account/summary')
            .then(response => {
                console.log('Received ProjectProcurement Package Summary from server.')
                console.log(response.data)
                const data = response.data
                commit('setLoadedProjectProcurementPackageSummary', data)
                commit('setLoading', false, { root: true })
            })
            .catch(e => {
                commit('setError', e, { root: true })
                console.log('error access project procurement summary for projectId ' + payload)
                console.log(e)
            })
    },
    loadProjectProcurementPackage({ commit }, payload) {
        commit('setLoading', true, { root: true })
        commit('setLoadedProjectProcurementPackage', {})
        console.log('Loading project procurement packages for user ' + localStorage.authHeader + ' for project ' + payload)

        webClient.get(`/api/resource/clients/` + localStorage.clientId + `/projects/` + payload.projectId + '/procurement/' + payload.id)
            .then(response => {
                const item = response.data
                console.log('Received project procurement pacakge from server ')
                console.log(item)
                commit('setLoadedProjectProcurementPackage', item)
                commit('setLoading', false, { root: true })
            })
            .catch(e => {
                commit('setError', e, { root: true })
            })
    },
    createProjectProcurementPackage({ commit }, payload) {
        console.log('Creating Project Procurement Package')
        console.log(payload)
        console.log(' for user with token ' + localStorage.authHeader)
        webClient.post(`/api/resource/clients/` + localStorage.clientId + `/projects/` + payload.projectId + '/procurement', payload)
            .then((response) => {
                const savedProjectProcurementPackage = response.data
                console.log(savedProjectProcurementPackage)
                commit('createProjectProcurementPackage', {
                    ...savedProjectProcurementPackage,
                    id: savedProjectProcurementPackage.id
                })
            })
            .catch((error) => {
                commit('setLoading', false, { root: true })
                commit('setError', error, { root: true })
                console.log('Oops ' + error.message)
                console.log(error)
            })
    },
    updateProjectProcurementPackage({ commit, dispatch }, payload) {
        console.log('Updating Project Procurement Package')
        console.log(payload)
        console.log(' for user with token ' + localStorage.authHeader)

        webClient.post(`/api/resource/clients/` + localStorage.clientId + `/projects/` + payload.projectId + '/procurement/' + payload.id, payload)
            .then((response) => {
                const updatedProjectBoQItem = response.data
                console.log(updatedProjectBoQItem)
                commit('updateProjectProcurementPackage', updatedProjectBoQItem)
            }).then(
                setTimeout(() => {
                    dispatch('loadProjectProcurementPackageSummary', payload.projectId)
                }, 300)
            )
            .catch((error) => {
                commit('setLoading', false, { root: true })
                commit('setError', error, { root: true })
                console.log('Oops ' + error.message)
                console.log(error)
            })
    },
    deleteProjectProcurementPackage({ commit }, payload) {
        console.log('Deleting Procurement Package from Project')
        console.log(payload)
        console.log(' for user with token ' + localStorage.authHeader)

        webClient.delete(`/api/resource/clients/` + localStorage.clientId + `/projects/` + payload.projectId + '/procurement/' + payload.id)
            .then(() => {
                commit('deleteProjectProcurementPackage', payload)
            })
            .catch((error) => {
                commit('setLoading', false, { root: true })
                commit('setError', error, { root: true })
                console.log('Oops ' + error.message)
                console.log(error)
            })
    },
    createProjectBoQItemMeasure({ commit }, payload) {
        console.log('Creating Project BoQItem Measure')
        console.log(payload)
        console.log(' for user with token ' + localStorage.authHeader)
        // /api/resource/clients/{clientId}/projects/{projectId}/boqitems/{boqItemId}/measure
        webClient.post(`/api/resource/clients/` + localStorage.clientId + `/projects/` + payload.projectId + `/boqitems/` + payload.boQItemId + `/measure`, payload)
            .then((response) => {
                const savedProjectBoQItemMeasure = response.data
                console.log(savedProjectBoQItemMeasure)
                commit('createProjectBoQItemMeasure', {
                    ...savedProjectBoQItemMeasure,
                    id: savedProjectBoQItemMeasure.id
                })
            }).catch((error) => {
                commit('setLoading', false, { root: true })
                commit('setError', error, { root: true })
                console.log('Oops ' + error.message)
                console.log(error)
            })
    },
    updateProjectBoQItemMeasure({ commit }, payload) {
        console.log('Updating Project BoQItem Measure')
        console.log(payload)
        console.log(' for user with token ' + localStorage.authHeader)

        webClient.post(`/api/resource/clients/` + localStorage.clientId + `/projects/` + payload.projectId + `/boqitems/` + payload.boQItemId + `/measure/` + payload.id, payload)
            .then((response) => {
                const updatedProjectBoQItemMeasure = response.data
                console.log(updatedProjectBoQItemMeasure)
                commit('updateProjectBoQItemMeasure', {
                    ...updatedProjectBoQItemMeasure,
                    id: updatedProjectBoQItemMeasure.id
                })
            }).catch((error) => {
                commit('setLoading', false, { root: true })
                commit('setError', error)
                console.log('Oops ' + error.message)
                console.log(error)
            })
    },
    deleteProjectBoQItemMeasure({ commit }, payload) {
        console.log('Deleting item from Project BoQ Item Measure')
        console.log(payload)
        console.log(' for user with token ' + localStorage.authHeader)
        webClient.delete(`/api/resource/clients/` + localStorage.clientId + `/projects/` + payload.projectId + `/boqitems/` + payload.boQItemId + `/measure/` + payload.id)
            .then(() => {
                commit('deleteProjectBoQItemMeasure', payload)
            })
            .catch((error) => {
                commit('setLoading', false, { root: true })
                commit('setError', error)
                console.log('Oops ' + error.message)
                console.log(error)
            })
    },
    loadProjectSubContractTenders({ commit }, payload) {
        commit('setLoading', true, { root: true })
        commit('setLoadedProjectSubContractTenders', [])

        console.log('Loading project subcontract tenders for user ' + localStorage.authHeader + ' for project ' + payload)

        webClient.get(`/api/projects/` + payload + `/tenders`)
            .then(response => {
                const items = response.data
                console.log('Received project subcontractor tenders from server.. ')
                console.log(items)
                commit('setLoadedProjectSubContractTenders', items)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                this.errors.push(error)
                commit('setError', error)
                console.log(error)
            })
    },
    createProjectSubContractTender({ commit }, payload) {
        console.log('Creating SubContractor Tender Details')
        console.log(payload)
        console.log(' for user with token ' + localStorage.authHeader)

        webClient.post(`/api/projects/` + payload.projectId + `/tenders/`, payload)
            .then((response) => {
                const savedProjectSubContractorTender = response.data
                console.log('Project SubContract Tender Created')
                console.log(savedProjectSubContractorTender)
                commit('createProjectSubContractTender', {
                    ...savedProjectSubContractorTender,
                    id: savedProjectSubContractorTender.id
                })
            })
            .catch((error) => {
                commit('setLoading', false, { root: true })
                commit('setError', error, { root: true })
                console.log('Oops ' + error.message)
                console.log(error)
            })
    },
    updateProjectSubContractTender({ commit }, payload) {
        console.log('Updating SubContract Tender Details')
        console.log(payload)
        console.log(' for user with token ' + localStorage.authHeader)

        webClient.put(`/api/projects/` + payload.projectId + `/tenders/` + payload.id, payload)
            .then((response) => {
                const updatedProjectSubContractTender = response.data
                console.log('Project SubContract Tender Update')
                console.log(updatedProjectSubContractTender)
                commit('updateProjectSubContractTender', updatedProjectSubContractTender)
            })
            .catch((error) => {
                commit('setLoading', false, { root: true })
                commit('setError', error, { root: true })
                console.log('Oops ' + error.message)
                console.log(error)
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
    createProjectSubContractorProcurementPackages({ commit }, payload) {
        console.log('Creating Project Subcontractor Procurement Packages')
        console.log(payload.subContractorIds)
        console.log(payload.projectId)
        console.log(payload.id)
        //console.log(' for user with token ' + localStorage.authHeader)

        payload.clientId = localStorage.clientId

        webClient.post('/api/resource/clients/' + localStorage.clientId + '/projects/' + payload.projectId + '/procurement/' + payload.id + '/packages', payload.subContractorIds)
            .then((response) => {
                const savedSubContractorProjectProcurementPackage = response.data
                console.log('Received update project procurement package from server..')
                console.log(savedSubContractorProjectProcurementPackage)
                commit('updateProjectProcurementPackage', savedSubContractorProjectProcurementPackage)
            })
            .catch((error) => {
                commit('setLoading', false, { root: true })
                commit('setError', error)
                console.log('Oops error creating subContractorProjectProcurementPackage ' + error.message)
                console.log(error)
            })
    },
    createProjectSubContractorProcurementPackage({ commit, dispatch }, payload) {
        console.log('Creating Project Subcontractor Procurement Package')
        console.log(payload)
        console.log(' for user with token ' + localStorage.authHeader)

        payload.clientId = localStorage.clientId

        webClient.post('/api/resource/clients/' + localStorage.clientId + '/projects/' + payload.projectId + '/procurement/' + payload.projectProcurementPackageId + '/subcontractor/' + payload.subContractorId, payload)
            .then((response) => {
                const savedSubContractorProjectProcurementPackage = response.data
                console.log(savedSubContractorProjectProcurementPackage)
                commit('createProjectSubContractorProcurementPackage', {
                    ...savedSubContractorProjectProcurementPackage,
                    id: savedSubContractorProjectProcurementPackage.id
                })
            }).then(
                setTimeout(() => {
                    dispatch('loadProjectSubContractorProcurementPackages', payload)
                }, 300)
            )
            .catch((error) => {
                commit('setLoading', false, { root: true })
                commit('setError', error, { root: true })
                console.log('Oops error creating subContractorProjectProcurementPackage ' + error.message)
                console.log(error)
            })
    },
    loadProjectCustomerInvoiceSummary({ commit }, payload) {
        commit('setLoading', true, { root: true })
        console.log('Loading all customer invoices ' + payload)
        console.log('for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)
        webClient.get(`/api/resource/clients/` + localStorage.clientId + `/projects/` + payload + '/customers/invoices/summary')
            .then(response => {
                console.log('Received Project Customer Invoice Summary from server.')
                console.log(response.data)
                const data = response.data
                commit('setLoadedProjectCustomerInvoiceSummary', data)
                commit('setLoading', false, { root: true })
            })
            .catch(e => {
                commit('setError', e, { root: true })
                console.log(e)
            })
    },
    loadProjectCustomerInvoices({ commit }, payload) {
        commit('setLoading', true, { root: true })
        console.log('Loading all Customer Invoices with project id ' + payload)
        console.log('for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)

        webClient.get(`/api/resource/clients/` + localStorage.clientId + `/projects/` + payload + '/customers/invoices')
            .then(response => {
                console.log('Received Project Supplier Invoices from server.')
                console.log(response.data)
                const data = response.data
                commit('setLoadedProjectCustomerInvoices', data)
                commit('setLoading', false, { root: true })
            })
            .catch(e => {
                console.log(e)
            })
    },
    loadProjectSubContractorInvoiceSummary({ commit }, payload) {
        commit('setLoading', true, { root: true })
        console.log('Loading all subcontractor invoices ' + payload)
        console.log('for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)
        webClient.get(`/api/resource/clients/` + localStorage.clientId + `/projects/` + payload + '/subcontractors/invoices/summary')
            .then(response => {
                console.log('Received Project SubContractor Invoice Summary from server.')
                console.log(response.data)
                const data = response.data
                commit('setLoadedProjectSubContractorInvoiceSummary', data)
                commit('setLoading', false, { root: true })
            })
            .catch(e => {
                commit('setError', e, { root: true })
                console.log(e)
            })
    },
    loadProjectSubContractorInvoices({ commit }, payload) {
        commit('setLoading', true, { root: true })
        console.log('Loading all SubContractor Invoices with project id ' + payload)
        console.log('for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)

        webClient.get(`/api/resource/clients/` + localStorage.clientId + `/projects/` + payload + '/subcontractors/invoices')
            .then(response => {
                console.log('Received Project SubContracotr Invoices from server.')
                console.log(response.data)
                const data = response.data
                commit('setLoadedProjectSubContractorInvoices', data)
                commit('setLoading', false, { root: true })
            })
            .catch(e => {

                console.log(e)
            })
    },
    loadProjectSupplierInvoiceSummary({ commit }, payload) {
        commit('setLoading', true, { root: true })
        console.log('Loading all supplier invoices summary ' + payload)
        console.log('for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)
        webClient.get(`/api/resource/clients/` + localStorage.clientId + `/projects/` + payload + '/suppliers/invoices/summary')
            .then(response => {
                console.log('Received Project Supplier Invoice Summary from server.')
                console.log(response.data)
                commit('setLoadedProjectSupplierInvoiceSummary', response.data)
                commit('setLoading', false, { root: true })
            })
            .catch(e => {
                commit('setError', e, { root: true })
                console.log(e)
            })
    },
    loadProjectSupplierInvoices({ commit }, payload) {
        commit('setLoading', true, { root: true })
        console.log('Loading all Supplier Invoices with project id ' + payload)
        console.log('for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)

        webClient.get(`/api/resource/clients/` + localStorage.clientId + `/projects/` + payload + '/suppliers/invoices')
            .then(response => {
                console.log('Received Project Supplier Invoices from server.')
                console.log(response.data)
                const data = response.data
                commit('setLoadedProjectSupplierInvoices', data)
                commit('setLoading', false, { root: true })
            })
            .catch(e => {
                commit('setError', e, { root: true })
                console.log(e)
            })
    },
    loadProjectQuotationSummary({ commit }, payload) {
        commit('setLoading', true, { root: true })
        console.log('Loading all project invoices ' + payload)
        console.log('for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)

        webClient.get(`/api/client/` + localStorage.clientId + `/projects/` + payload + '/quotations/summary')
            .then(response => {
                console.log('Received Project Quotation Summary from server.')
                console.log(response.data)
                const data = response.data
                commit('setLoadedProjectQuotationSummary', data)
                commit('setLoading', false, { root: true })
            })
            .catch(e => {
                commit('setError', e, { root: true })
                console.log(e)
            })
    },
    loadProjectQuotations({ commit }, payload) {
        commit('setLoading', true, { root: true })
        console.log('Loading all Quotations for project id ' + payload)
        console.log('for user with token ' + localStorage.authHeader + ' with client id ' + localStorage.clientId)

        webClient.get(`/api/resource/clients/` + localStorage.clientId + `/projects/` + payload + '/quotations')
            .then(response => {
                console.log('Received Project Quotations from server.')
                console.log(response.data)
                const data = response.data
                commit('setLoadedProjectQuotations', data)
                commit('setLoading', false, { root: true })
            })
            .catch(e => {
                commit('setError', e, { root: true })
                console.log(e)
            })
    },
    loadBoQItemCategories({ commit }) {
        commit('setLoading', true, { root: true })
        webClient.get(`/api/resource/clients/` + localStorage.clientId + `/boqitem_categories`)
            .then(response => {
                console.log('Received BoQItem Categories...')
                commit('setLoadedBoQItemCategories', response.data)
                commit('setLoading', false, { root: true })
            })
            .catch(e => {
                commit('setError', e, { root: true })
            })
    },
    createBoQItemCategory({ commit }, payload) {
        commit('setLoading', true, { root: true })
        webClient.post(`/api/resource/clients/` + localStorage.clientId + `/boqitem_categories`, payload)
            .then(response => {
                console.log('Received saved BoQItem Categories from server..')
                commit('createBoQItemCategory', response.data)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setError', error, { root: true })
            })
    },
    updateBoQItemCategory({ commit }, payload) {
        commit('setLoading', true, { root: true })
        webClient.post(`/api/resource/clients/` + localStorage.clientId + `/boqitem_categories/` + payload.id, payload)
            .then(response => {
                console.log('Received updated BoQItem Category from server..')
                commit('updateBoQItemCategory', response.data)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setError', error, { root: true })
            })
    },
    deleteBoQItemCategory({ commit }, payload) {
        commit('setLoading', true, { root: true })
        webClient.delete(`/api/resource/clients/` + localStorage.clientId + `/boqitem_categories/` + payload)
            .then(response => {
                console.log(response)
                commit('deleteBoQItemCategory', payload)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setError', error, { root: true })
            })
    },
    loadProjectDrawingCategories({ commit }) {
        commit('setLoading', true, { root: true })
        webClient.get(`/api/resource/clients/` + localStorage.clientId + `/drawing_categories`)
            .then(response => {
                console.log('Received ProjectDrawings Categories...')
                console.log(response.data)
                commit('setLoadedProjectDrawingCategories', response.data)
                commit('setLoading', false, { root: true })
            })
            .catch(error => {
                commit('setError', error, { root: true })
            })
    }

}
const getters = {
    loadedProjects(state) {
        return state.loadedProjects.sort((ProjectA, ProjectB) => {
            return ProjectA.name > ProjectB.name
        })
    },
    loadedProject(state) {
        return state.loadedProject
    },
    loadedProjectDrawingCategories(state) {
        return state.loadedProjectDrawingCategories
    },
    loadedProjectDrawings(state) {
        return state.loadedProjectDrawings.sort((dwgA, dwgB) => {
            return dwgA.title > dwgB.title
        })
    },
    loadedProjectBoQSummary(state) {
        return state.loadedProjectBoQSummary
    },
    loadedProjectBoQ(state) {
        return state.loadedProjectBoQ.sort((A, B) => {
            return A.ref > B.ref
        })
    },
    loadedProjectBoQItem(state) {
        return (itemId) => {
            console.log('loadedProjectBoQItem lookup  ' + itemId)
            return state.loadedProjectBoQ.find((item) => {
                console.log('loadedProjectBoQItem checking item with id ' + item.id)
                return item.id === itemId
            })
        }
    },
    selectedProjectBoQItem(state) {
        return state.selectedProjectBoQItem
    },
    loadedProjectBoQItemMeasures(state) {
        return state.loadedProjectBoQItemMeasures.sort((dwgA, dwgB) => {
            return dwgA.id > dwgB.id
        })
    },
    loadedProjectSubContractorProcurementPackages(state) {
        return state.loadedProjectSubContractorProcurementPackages.sort((A, B) => {
            return A.id > B.id
        })
    },
    loadedProjectRooms(state) {
        return state.loadedProjectRooms
    },
    loadedProjectBoQCategoryCosts(state) {
        return state.loadedProjectBoQCategoryCosts.sort((A, B) => {
            //console.log('Sorting boq category costs comparing '+ A.category +' to '+B.category)
            return A.category > B.category
        })
    },
    loadedProjectRoomScheduleBoQ(state) {
        return state.loadedProjectRoomScheduleBoQ.sort((A, B) => {
            //console.log('Sorting boq room schedule, comparing '+ A.roomName +' to '+B.roomName)
            return A.roomName > B.roomName
        })
    },
    loadedProjectRFIs(state) {
        return state.loadedProjectRFIs.sort((rfiA, rfiB) => {
            return rfiA.id > rfiB.id
        })
    },
    loadedProjectProcurementPackages(state) {
        return state.loadedProjectProcurementPackages.sort((A, B) => {
            return A.id > B.id
        })
    },
    loadedProjectProcurementPackage(state) {
        return state.loadedProjectProcurementPackage
    },
    loadedSubContractorProcurementPackageBillItems(state) {
        return state.loadedSubContractorProcurementPackageBillItems.sort((A, B) => {
            return A.id > B.id
        })
    },
    loadedProjectProcurementPackageSummary(state) {
        return state.loadedProjectProcurementPackageSummary
    },

    loadedProjectContacts(state) {
        return state.loadedProjectContacts.sort((contactA, contactB) => {
            return contactA.name > contactB.name
        })
    },
    loadedProjectTasks(state) {
        return state.loadedProjectTasks.sort((taskA, taskB) => {
            return taskA.anticipatedStartDate > taskB.anticipatedStartDate
        })
    },


    loadedProjectImageMetadata(state) {
        return state.loadedProjectImageMetadata.sort((imageA, imageB) => {
            return imageA.id > imageB.id
        })
    },
    loadedProjectImages(state) {
        return state.loadedProjectImages.sort((dwgA, dwgB) => {
            return dwgA.id > dwgB.id
        })
    },

    loadedProjectQuotations(state) {
        return state.loadedProjectQuotations.sort((subbieQuotationA, subbieQuotationB) => {
            return subbieQuotationA.id > subbieQuotationB.id
        })
    },
    loadedProjectQuotationSummary(state) {
        return state.loadedProjectQuotationSummary
    },
    loadedProjectCustomerInvoiceSummary(state) {
        return state.loadedProjectCustomerInvoiceSummary
    },
    loadedProjectCustomerInvoices(state) {
        return state.loadedProjectCustomerInvoices.sort((invoiceA, invoiceB) => {
            return invoiceA.id > invoiceB.id
        })
    },
    loadedProjectSubContractorInvoiceSummary(state) {
        return state.loadedProjectSubContractorInvoiceSummary
    },
    loadedProjectSubContractorInvoices(state) {
        return state.loadedProjectSubContractorInvoices.sort((invoiceA, invoiceB) => {
            return invoiceA.id > invoiceB.id
        })
    },
    loadedProjectSupplierInvoiceSummary(state) {
        return state.loadedProjectSupplierInvoiceSummary
    },
    loadedProjectSupplierInvoices(state) {
        return state.loadedProjectSupplierInvoices
    },
    loadedProjectOrders(state) {
        return state.loadedProjectOrders.sort((A, B) => {
            return A.id > B.id
        })
    },

    loadedProjectStatusList(state) {
        return state.loadedProjectStatusList
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
    loadedProjectSubContractTender(state) {
        return (tenderId) => {
            return state.loadedProjectSubContractTenders.find((tender) => {
                return tender.id === tenderId
            })
        }
    },
    loadedBoQItemCategories(state) {
        return state.loadedBoQItemCategories
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}