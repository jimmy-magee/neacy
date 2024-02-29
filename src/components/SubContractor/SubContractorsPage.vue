<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        SubContractor Details
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
        <v-spacer></v-spacer>
        <v-btn icon color="green" >
          <v-icon icon="mdi-plus"></v-icon>
        <v-dialog v-model="subContractorDialog" activator="parent">
        
          <v-card>
            <v-card-title>
              <span>SubContractor Details</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                    <v-layout row>
                      
                        <v-select :items="subContractorCategories" v-model="editedSubContractor.subContractorCategoryId"
                          label="Category" item-value="id" item-title="name" required></v-select>
                      
                    </v-layout>
                    <v-layout row>
                      
                        <v-text-field name="subContractorName" label="SubContractor Name" id="subContractorName"
                          v-model="editedSubContractor.name" required></v-text-field>
                      
                    </v-layout>
                    <v-layout row>
                      
                        <v-text-field name="subContractorDescription" label="SubContractor Description"
                          id="subContractorDescription" v-model="editedSubContractor.description" required></v-text-field>
                      
                    </v-layout>
                    <v-layout row>
                      
                        <v-text-field name="subContractorAddress" label="SubContractor Address" id="subContractorAddress"
                          v-model="editedSubContractor.address" required></v-text-field>
                      
                    </v-layout>
                    <v-layout row>
                      
                        <v-text-field name="subContractorContactName" label="SubContractor Contact Name"
                          id="subContractorContactName" v-model="editedSubContractor.contactName" required></v-text-field>
                      
                    </v-layout>
                    <v-layout row>
                      
                        <v-text-field name="subContractorContactNumber" label="SubContractor Contact Number"
                          id="subContractorContactNumber" v-model="editedSubContractor.contactNumber"
                          required></v-text-field>
                      
                    </v-layout>
                    <v-layout row>
                      
                        <v-text-field name="subContractorWebsite" label="SubContractor Website" id="subContractorWebsite"
                          v-model="editedSubContractor.website">
                        </v-text-field>
                      
                    </v-layout>
                    <v-layout row>
                      
                        <v-text-field name="subContractorEmail" label="SubContractor Email" id="subContractorEmail"
                          v-model="editedSubContractor.email">
                        </v-text-field>
                      
                    </v-layout>
                    <v-layout row>
                      
                        <v-text-field name="subContractorHeadOfficeTelephoneNumber" label="Head Office TelephoneNumber"
                          id="subContractorHeadOfficeTelephoneNumber"
                          v-model="editedSubContractor.headOfficeTelephoneNumber">
                        </v-text-field>
                      
                    </v-layout>
                    <v-layout row>
                      
                        <v-text-field name="subContractorCompanyRegistrationNumber" label="Company Registration Number"
                          id="subContractorCompanyRegistrationNumber"
                          v-model="editedSubContractor.companyRegistrationNumber">
                        </v-text-field>
                      
                    </v-layout>
                    <v-layout row>
                      
                        <v-text-field name="subContractorVatNumber" label="Company Vat Number" id="subContractorVatNumber"
                          v-model="editedSubContractor.vatNumber">
                        </v-text-field>
                      
                    </v-layout>
                    <v-layout row>
                      
                        <v-text-field name="subContractorBankAccountNumber" label="Bank Account Number"
                          id="subContractorBankAccountNumber" v-model="editedSubContractor.bankAccountNumber">
                        </v-text-field>
                      
                    </v-layout>
                    <v-layout row>
                      
                        <v-text-field name="subContractorbiq" label="biq" id="subContractorbiq"
                          v-model="editedSubContractor.biq">
                        </v-text-field>
                      
                    </v-layout>
                    <v-layout row>
                      
                        <v-text-field name="subContractorban" label="ban" id="subContractorban"
                          v-model="editedSubContractor.ban">
                        </v-text-field>
                      
                    </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" @click="closeSubContractorDialog">Cancel</v-btn>
              <v-btn color="blue darken-1" :disabled="!formIsValid" @click="saveSubContractor">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-data-table :headers="subContractorTableHeaders" :calculate-widths="true" :items="subContractors"
          :search="search">
          <template v-slot:[`item.actionEditSubContractor`]="{ item }">
            <v-btn icon="mdi-file-edit-outline" @click="showSubContractorEditDialog(item.id)">
         
            </v-btn>
          </template>

          <template v-slot:[`item.actionShowSubContractorDetails`]="{ item }">
            <v-btn icon="mdi-view-compact" @click="showSubContractorDetails(item.id)">
            </v-btn>
          </template>
          <template v-slot:[`item.actionDeleteSubContractor`]="{ item }">
            <v-btn icon="mdi-delete-alert" @click="deleteSubContractor(item.id)">
            </v-btn>
          </template>
        </v-data-table>
        <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
          {{ snackText }}
          <v-btn text @click="snack = false">Close</v-btn>
        </v-snackbar>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>

import { computed, ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';


export default {

  setup() {

    const store = useStore();
    const router = useRouter();

    onMounted(() => {
      store.dispatch('subcontractors/loadSubContractorCategories')
      store.dispatch('subcontractors/loadSubContractors')
    });

    const id = ref('');
    const name = ref('');
    const address = ref('');
    const users = [];
    const tenders = [];
    const search = ref('');
    const snack = ref(false);
    const snackColor = ref('');
    const snackText = ref('');
    const subContractorDialog = ref(false);
    const editedSubContractorIndex = ref(-1);
    const editedSubContractor = reactive({
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
    });
    const defaultSubContractor = reactive({
      id: '',
      subContractorCategoryId: '',
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
    });
    const subContractorTableHeaders = [
      {
        title: 'ID',
        align: ' d-none',
        sortable: true,
        key: 'id'
      },
      { title: 'Category', key: 'subContractorCategoryName' },
      { title: 'Name', key: 'name' },
      { title: 'Description', key: 'description' },
      { title: 'Contact Name', key: 'contactName' },
      { title: 'Number', key: 'headOfficeTelephoneNumber' },
      { title: 'Email', key: 'email' },
      { title: 'View', align: 'left', key: 'actionShowSubContractorDetails' },
      { title: 'Edit', align: 'left', key: 'actionEditSubContractor' },
      { title: 'Delete', align: 'left', key: 'actionDeleteSubContractor' }
    ];

    const subContractorCategories = computed(() => {
      return store.getters['subcontractors/loadedSubContractorCategories'];
    });
    const subContractors = computed(() => {
      return store.getters['subcontractors/loadedSubContractors'];
    });

    const showSubContractorDetails = ((id) => {
      console.log('Navigate to SubContractor Details for subcontractorId ' + id);
      router.push('/subcontractors/' + id)
    });
    const showSubContractorEditDialog = ((id) => {
      console.log('Showing Edit SubContractor Dialog for subcontractorId ' + id)
      editedSubContractorIndex.value = subContractors.value.findIndex(s => s.id == id)
      console.log("index value is " + editedSubContractorIndex.value)
      const obj  = subContractors.value.find(s =>  s.id == id);
      console.log(obj)
      Object.assign(editedSubContractor, obj)
      subContractorDialog.value = true
    });
    const closeSubContractorDialog = (() => {
      subContractorDialog.value = false
      setTimeout(() => {
         Object.assign(editedSubContractor, defaultSubContractor)
        editedSubContractorIndex.value = -1
      }, 300)
    });
    const formIsValid = (() => {
      return true
    });
    const saveSubContractor = (() => {
      if (editedSubContractorIndex.value > -1) {
        console.log('Updating subcontractor')
        console.log(editedSubContractor)
        store.dispatch('subcontractors/updateSubContractor', editedSubContractor)

      } else {
        console.log('Creating new subcontractor')
        console.log(editedSubContractor)
        store.dispatch('subcontractors/createSubContractor', editedSubContractor)
      }
      closeSubContractorDialog()
      save()
    });
    const deleteSubContractor = ((id) => {
      console.log('Delete SubContractor Event Received..')
      console.log(id)
      const obj = subContractors.value.find(s => s.id == id)
      store.dispatch('subcontractors/deleteSubContractor', obj)
    });
    const save = (() => {
      snack.value = true
      snackColor.value = 'success'
      snackText.value = 'Data saved successfully'
    });

    return {
      subContractorCategories,
      subContractors,
      subContractorTableHeaders,
      editedSubContractor,
      defaultSubContractor,
      saveSubContractor,
      showSubContractorDetails,
      subContractorDialog,
      showSubContractorEditDialog,
      closeSubContractorDialog,
      editedSubContractorIndex,
      deleteSubContractor,
      users,
      tenders,
      search,
      formIsValid,
      id,
      name,
      address,
      snack,
      snackColor,
      snackText,
      save
    }
  }
}

</script>
