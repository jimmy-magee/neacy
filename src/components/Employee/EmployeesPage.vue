<template>
    <v-container fluid>
      <v-card>
        <v-card-title>
          Employee Details
          <v-spacer></v-spacer>
          <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
          <v-spacer></v-spacer>
         <v-btn icon color="green">
          <v-icon icon="mdi-plus"></v-icon>
          <v-dialog v-model="employeeDialog" activator="parent">
         
            <v-card>
              <v-card-title>
                <span>Employee Details</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  {{ editedEmployee.id }}
        
        
                      <v-layout row>
                          <v-text-field name="employeeCategory" label="Category" id="employeeCategory"
                            v-model="editedEmployee.category">
                          </v-text-field>
                      </v-layout>
                      <v-layout row>
                          <v-text-field name="employeeName" label="Employee Name" id="employeeName"
                            v-model="editedEmployee.name" required></v-text-field>
                      </v-layout>
                      <v-layout row>
             
                          <v-text-field name="employeeDescription" label="Employee Description" id="employeeDescription"
                            v-model="editedEmployee.description" required></v-text-field>
  
                      </v-layout>
                      <v-layout row>
         
                          <v-text-field name="employeeAddress" label="Employee Address" id="employeeAddress"
                            v-model="editedEmployee.address" required></v-text-field>
   
                      </v-layout>
                      <v-layout row>
                
                          <v-text-field name="employeeContactName" label="Employee Contact Name" id="employeeContactName"
                            v-model="editedEmployee.contactName" required></v-text-field>
        
                      </v-layout>
                      <v-layout row>
         
                          <v-text-field name="employeeContactNumber" label="Employee Contact Number"
                            id="employeeContactNumber" v-model="editedEmployee.contactNumber" required></v-text-field>
   
                      </v-layout>
                      <v-layout row>
               
                          <v-text-field name="employeeWebsite" label="Employee Website" id="employeeWebsite"
                            v-model="editedEmployee.website">
                          </v-text-field>
          
                      </v-layout>
                      <v-layout row>
               
                          <v-text-field name="employeeEmail" label="Employee Email" id="employeeEmail"
                            v-model="editedEmployee.contactEmail">
                          </v-text-field>
  
                      </v-layout>
                      <v-layout row>
             
                          <v-text-field name="employeeHeadOfficeTelephoneNumber" label="Head Office TelephoneNumber"
                            id="employeeHeadOfficeTelephoneNumber" v-model="editedEmployee.headOfficeTelephoneNumber">
                          </v-text-field>
              
                      </v-layout>
                      <v-layout row>
             
                          <v-text-field name="employeeCompanyRegistrationNumber" label="Company Registration Number"
                            id="employeeCompanyRegistrationNumber" v-model="editedEmployee.companyRegistrationNumber">
                          </v-text-field>
           
                      </v-layout>
                      <v-layout row>
              
                          <v-text-field name="employeeVatNumber" label="Company Vat Number" id="employeeVatNumber"
                            v-model="editedEmployee.vatNumber">
                          </v-text-field>
   
                      </v-layout>
                      <v-layout row>
      
                          <v-text-field name="employeeBillingName" label="Billing Name" id="employeeBillingName"
                            v-model="editedEmployee.billingName">
                          </v-text-field>
          
                      </v-layout>
                      <v-layout row>
                 
                          <v-text-field name="employeeBillingAddress" label="Billing Address" id="employeeBillingAddress"
                            v-model="editedEmployee.billingAddress">
                          </v-text-field>
             
                      </v-layout>
                      <v-layout row>
                   
                          <v-text-field name="employeeBillingEmail" label="Billing Email" id="employeeBillingEmail"
                            v-model="editedEmployee.billingEmail">
                          </v-text-field>
            
                      </v-layout>
         
  
                </v-container>
              </v-card-text>
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" @click="closeEmployeeDialog">Cancel</v-btn>
                <v-btn color="blue darken-1" :disabled="!formIsValid" @click="saveEmployee">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-btn>
        </v-card-title>
        <v-card-text>
  
          <v-data-table 
                  :headers="employeeTableHeaders" 
                  :items="employees"
                  :search="search">
  
            <template v-slot:[`item.actionEditEmployee`]="{ item }">
              <v-btn icon="mdi-file-edit-outline"  @click="showEmployeeEditDialog(item)">
              
              </v-btn>
            </template>
  
            <template v-slot:[`item.actionShowEmployeeDetails`]="{ item }">
           
              <v-btn icon="mdi-view-compact" @click="showEmployeeDetails(item.raw.id)">
               
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
        store.dispatch('employees/loadEmployees')
      });
  
      const tenders = [];
      const date = new Date().toISOString().substr(0, 10);
      const search = ref('');
      var snack = ref(false);
      var snackColor = ref('');
      var snackText = ref('');
      const id = ref('');
      const name = ref('');
      const address = ref('');
      const users = [];
  
      const employeeDialog = ref(false);
  
      const editedEmployeeIndex = ref(-1);
  
      const employeeTableHeaders = [
        { title: 'Name', key: 'name' },
        { title: 'Description', key: 'description' },
        { title: 'Contact Name', key: 'contactName' },
        { title: 'Email', key: 'contactEmail' },
        { title: 'Number', key: 'headOfficeTelephoneNumber' },
        { title: 'Edit', align: 'left', key: 'actionEditEmployee' },
        { title: 'View', align: 'left', key: 'actionShowEmployeeDetails' }
      ];
      // employee
      const defaultEmployee = reactive({
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
      const editedEmployee = reactive({
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
      const showEmployeeDetails = (item) => {
        console.log('Navigate to Employee Details for employeeId ')
        console.log(item)
        router.push('/employees/' + item)
      };
      const showEmployeeEditDialog = (item) => {
        console.log('Showing Edit Employee Dialog for employee ' + item.raw.name)
        console.log(item.name)
        editedEmployeeIndex.value = employees.value.findIndex(s =>  s.id == item.value);
        const obj = employees.value.find(s =>  s.id == item.value);
        Object.assign(editedEmployee, obj);
        console.log('Showing Edit Employee Dialog for editedEmployee ' + editedEmployee.name)
        console.log(editedEmployee.name)
        employeeDialog.value = true;
      };
      const closeEmployeeDialog = () => {
        employeeDialog.value = false
        setTimeout(() => {
          editedEmployee.value = Object.assign({}, defaultEmployee)
          editedEmployeeIndex.value = -1
        }, 300)
      };
      const formIsValid = () => {
        return true
      };
      const saveEmployee = () => {
        if (editedEmployeeIndex.value > -1) {
          console.log('Updating employee')
          console.log(editedEmployee)
          store.dispatch('employees/updateEmployee', editedEmployee)
  
        } else {
          console.log('Creating new employee')
          console.log(editedEmployee)
          store.dispatch('employees/createEmployee', editedEmployee)
        }
        closeEmployeeDialog()
        save()
      };
      const deleteEmployee = (item) => {
        console.log('Delete Employee Event Received..')
        console.log(item)
        store.dispatch('employees/deleteEmployee', item)
      };
      const save = () => {
        snack = true
        snackColor = 'success'
        snackText = 'Data saved successfully'
      };
      const error = computed(() => store.getters['error']);
      const userIsAuthenticatedAndHasRoleAdmin = computed(() => store.getters['users/userIsAuthenticatedAndHasRoleAdmin']);
      const employees = computed(() => store.getters['employees/loadedEmployees']);
  
  
  
      return {
        userIsAuthenticatedAndHasRoleAdmin,
        error,
        employees,
        employeeTableHeaders,
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
        defaultEmployee,
        editedEmployee,
        employeeDialog,
        editedEmployeeIndex,
        showEmployeeDetails,
        showEmployeeEditDialog,
        closeEmployeeDialog,
        formIsValid,
        saveEmployee,
        deleteEmployee,
        save,
  
      }
    }
  }
  </script>
  