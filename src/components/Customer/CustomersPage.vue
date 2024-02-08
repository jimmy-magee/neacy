<template>
  
  <v-container fluid>
  
    <v-card>
      <v-card-title>
        Customer Details
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
        <v-spacer></v-spacer>
       <v-btn icon color="green">
        <v-icon icon="mdi-plus"></v-icon>
        <v-dialog v-model="customerDialog" activator="parent">
       
          <v-card>
            <v-card-title>
              <span>Customer Details</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                {{ editedCustomer.id }}
      
      
                    <v-layout row>
                        <v-text-field name="customerCategory" label="Category" id="customerCategory"
                          v-model="editedCustomer.category">
                        </v-text-field>
                    </v-layout>
                    <v-layout row>
                        <v-text-field name="customerName" label="Customer Name" id="customerName"
                          v-model="editedCustomer.name" required></v-text-field>
                    </v-layout>
                    <v-layout row>
           
                        <v-text-field name="customerDescription" label="Customer Description" id="customerDescription"
                          v-model="editedCustomer.description" required></v-text-field>

                    </v-layout>
                    <v-layout row>
       
                        <v-text-field name="customerAddress" label="Customer Address" id="customerAddress"
                          v-model="editedCustomer.address" required></v-text-field>
 
                    </v-layout>
                    <v-layout row>
              
                        <v-text-field name="customerContactName" label="Customer Contact Name" id="customerContactName"
                          v-model="editedCustomer.contactName" required></v-text-field>
      
                    </v-layout>
                    <v-layout row>
       
                        <v-text-field name="customerContactNumber" label="Customer Contact Number"
                          id="customerContactNumber" v-model="editedCustomer.contactNumber" required></v-text-field>
 
                    </v-layout>
                    <v-layout row>
             
                        <v-text-field name="customerWebsite" label="Customer Website" id="customerWebsite"
                          v-model="editedCustomer.website">
                        </v-text-field>
        
                    </v-layout>
                    <v-layout row>
             
                        <v-text-field name="customerEmail" label="Customer Email" id="customerEmail"
                          v-model="editedCustomer.contactEmail">
                        </v-text-field>

                    </v-layout>
                    <v-layout row>
           
                        <v-text-field name="customerHeadOfficeTelephoneNumber" label="Head Office TelephoneNumber"
                          id="customerHeadOfficeTelephoneNumber" v-model="editedCustomer.headOfficeTelephoneNumber">
                        </v-text-field>
            
                    </v-layout>
                    <v-layout row>
           
                        <v-text-field name="customerCompanyRegistrationNumber" label="Company Registration Number"
                          id="customerCompanyRegistrationNumber" v-model="editedCustomer.companyRegistrationNumber">
                        </v-text-field>
         
                    </v-layout>
                    <v-layout row>
            
                        <v-text-field name="customerVatNumber" label="Company Vat Number" id="customerVatNumber"
                          v-model="editedCustomer.vatNumber">
                        </v-text-field>
 
                    </v-layout>
                    <v-layout row>
    
                        <v-text-field name="customerBillingName" label="Billing Name" id="customerBillingName"
                          v-model="editedCustomer.billingName">
                        </v-text-field>
        
                    </v-layout>
                    <v-layout row>
               
                        <v-text-field name="customerBillingAddress" label="Billing Address" id="customerBillingAddress"
                          v-model="editedCustomer.billingAddress">
                        </v-text-field>
           
                    </v-layout>
                    <v-layout row>
                 
                        <v-text-field name="customerBillingEmail" label="Billing Email" id="customerBillingEmail"
                          v-model="editedCustomer.billingEmail">
                        </v-text-field>
          
                    </v-layout>
       

              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" @click="closeCustomerDialog">Cancel</v-btn>
              <v-btn color="blue darken-1" :disabled="!formIsValid" @click="saveCustomer">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-btn>
      </v-card-title>
      <v-card-text>

        <v-data-table 
                :headers="customerTableHeaders" 
                :items="customers"
                :search="search">

          <template v-slot:[`item.actionEditCustomer`]="{ item }">
            <v-btn icon="mdi-file-edit-outline"  @click="showCustomerEditDialog(item)">
            
            </v-btn>
          </template>

          <template v-slot:[`item.actionShowCustomerDetails`]="{ item }">
         
            <v-btn icon="mdi-view-compact" @click="showCustomerDetails(item.raw.id)">
             
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

import { computed, ref, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {

  setup() {
    const store = useStore();
    const router = useRouter();

    onMounted(() => {
      store.dispatch('customers/loadCustomers')
    });

    const tenders = [];
    const date = new Date().toISOString().substr(0, 10);
    const search = '';
    var snack = ref(false);
    var snackColor = ref('');
    var snackText = ref('');
    const id = ref('');
    const name = ref('');
    const address = ref('');
    const users = [];

    const customerDialog = ref(false);

    const editedCustomerIndex = ref(-1);

    const customerTableHeaders = [
      { title: 'Name', key: 'name' },
      { title: 'Description', key: 'description' },
      { title: 'Contact Name', key: 'contactName' },
      { title: 'Email', key: 'contactEmail' },
      { title: 'Number', key: 'headOfficeTelephoneNumber' },
      { title: 'Edit', align: 'left', key: 'actionEditCustomer' },
      { title: 'View', align: 'left', key: 'actionShowCustomerDetails' }
    ];
    // customer
    const defaultCustomer = reactive({
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
    const editedCustomer = reactive({
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
    const showCustomerDetails = (item) => {
      console.log('Navigate to Customer Details for customerId ')
      console.log(item)
      router.push('/customers/' + item)
    };
    const showCustomerEditDialog = (item) => {
      console.log('Showing Edit Customer Dialog for customer ' + item.raw.name)
      console.log(item.name)
      editedCustomerIndex.value = customers.value.findIndex(s =>  s.id == item.value);
      const obj = customers.value.find(s =>  s.id == item.value);
      Object.assign(editedCustomer, obj);
      console.log('Showing Edit Customer Dialog for editedCustomer ' + editedCustomer.name)
      console.log(editedCustomer.name)
      customerDialog.value = true;
    };
    const closeCustomerDialog = () => {
      customerDialog.value = false
      setTimeout(() => {
        editedCustomer.value = Object.assign({}, defaultCustomer)
        editedCustomerIndex.value = -1
      }, 300)
    };
    const formIsValid = () => {
      return true
    };
    const saveCustomer = () => {
      if (editedCustomerIndex.value > -1) {
        console.log('Updating customer')
        console.log(editedCustomer)
        store.dispatch('updateCustomer', editedCustomer)

      } else {
        console.log('Creating new customer')
        console.log(editedCustomer)
        store.dispatch('customers/createCustomer', editedCustomer)
      }
      closeCustomerDialog()
      save()
    };
    const deleteCustomer = (item) => {
      console.log('Delete Customer Event Received..')
      console.log(item)
      store.dispatch('customers/deleteCustomer', item)
    };
    const save = () => {
      snack = true
      snackColor = 'success'
      snackText = 'Data saved successfully'
    };
    const error = computed(() => store.getters['error']);
    const userIsAuthenticatedAndHasRoleAdmin = computed(() => store.getters['users/userIsAuthenticatedAndHasRoleAdmin']);
    const customers = computed(() => store.getters['customers/loadedCustomers']);



    return {
      userIsAuthenticatedAndHasRoleAdmin,
      error,
      customers,
      customerTableHeaders,
      tenders,
      date,
      search,
      snack,
      snackColor,
      snackText,
      id,
      name,
      address,
      users,
      defaultCustomer,
      editedCustomer,
      customerDialog,
      editedCustomerIndex,
      showCustomerDetails,
      showCustomerEditDialog,
      closeCustomerDialog,
      formIsValid,
      saveCustomer,
      deleteCustomer,
      save,

    }
  }
}
</script>
