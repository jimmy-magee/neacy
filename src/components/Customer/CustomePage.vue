<template>
  <v-container>

    <v-card>
      <v-card-title>
        <!--<h3 class="primary--text">{{ customer.name }}</h3> -->
      </v-card-title>
      <v-card-text>
        <!--<h3 class="primary--text">Category: {{ customer.category }}</h3>-->
        <!--<div>{{ customer.description }}</div>-->
        <!--<div>{{ customer.address }}</div>-->

        <v-tabs v-model="tab" show-arrows>

          <v-tab value="one">
            Customer Details
          </v-tab>
          <v-tab  value="two">
            Quotations
          </v-tab>
          <v-tab value="three">
            Contracts
          </v-tab>
          <v-tab value="five">
            Invoices
          </v-tab>
          <!--
      <v-tab href="#tab-6">
        Payments Received
      </v-tab> -->
        </v-tabs>

        <v-window v-model="tab">

          <!-- Customer Details -->

          <v-window-item value="one">
            <v-card>
              <v-card-title>
                Customer Details
                <v-spacer></v-spacer>
              </v-card-title>
              <v-card-text>
                <v-layout row>
                  <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
                    {{ snackText }}
                    <v-btn text @click="snack = false">Close</v-btn>
                  </v-snackbar>
                </v-layout>

         
                    <form @submit.prevent="onUpdateCustomer">
                      <v-layout row>
                        <!--
                        <v-text-field name="customerCategory" label="Category" id="customerCategory"
                          v-model="customer.category">
                        </v-text-field> -->

                      </v-layout>

                      <v-layout row>

                        <v-text-field name="customerName" label="Customer Name" id="customerName"
                          v-model="editedCustomer.name"></v-text-field>


                      </v-layout>
                      <v-layout row>

                        <v-textarea name="customerDescription" label="Customer Description" id="customerDescription"
                          v-model="editedCustomer.description" required></v-textarea>

                      </v-layout>
                      <v-layout row>

                        <v-textarea name="customerAddress" label="Customer Address" id="customerAddress"
                          v-model="editedCustomer.address" required></v-textarea>

                      </v-layout>
                      <v-layout row>

                        <v-text-field name="customerWebsite" label="Customer Website" id="customerWebsite"
                          v-model="editedCustomer.website">
                        </v-text-field>

                      </v-layout>
                      <v-layout row>
                        <!--
                        <v-text-field name="customerEmail" label="Customer Email" id="customerEmail"
                          v-model="editedCustomer.email">
                        </v-text-field>
                      -->
                      </v-layout>
                      <v-layout row>

                        <v-text-field name="customerContactName" label="Contact Name" id="customerContactName"
                          v-model="editedCustomer.contactName">
                        </v-text-field>

                      </v-layout>
                      <v-layout row>

                        <v-text-field name="customerContactNumber" label="Contact Number" id="customerContactNumber"
                          v-model="editedCustomer.contactNumber">
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

                        <v-btn class="primary" :disabled="!formIsValid" type="submit">Update Details</v-btn>

                      </v-layout>
                    </form>
         


              </v-card-text>
            </v-card>
          </v-window-item>

          <v-window-item value="three">
            <v-card>
              <v-card-title>

                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="search" label="Search" single-line
                  hide-details></v-text-field>
                <v-spacer></v-spacer>
                <v-dialog v-model="customerQuotationDialog">
                  <template v-slot:[`activator`]="{ on }">
                    <v-btn absolute right fab dark color="indigo" v-on="on"><v-icon dark>add</v-icon></v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span>Quotation Details</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-layout row>
                       
                            <v-select :items="projectListSelection" v-model="editedCustomerQuotation.projectId"
                              label="Select Project" single></v-select>
                    
                        </v-layout>
                        <v-layout row>
                         
                            <v-text-field v-model="editedCustomerQuotation.quotationRef" label="Reference"></v-text-field>
                        
                        </v-layout>
                        <v-layout row v-show="editedCustomerQuotationIndex >= 0">
                         
                            <v-text-field v-model="editedCustomerQuotation.status" label="Status"></v-text-field>
                       
                        </v-layout>
                        <v-layout row>
                         
                            <v-textarea name="description" label="Description" id="description"
                              v-model="editedCustomerQuotation.description" required>
                            </v-textarea>
                          
                        </v-layout>
                        <v-layout row>
                         
                            <v-text-field v-model="editedCustomerQuotation.currency" label="Currency"></v-text-field>
                       
                        </v-layout>
                        <v-layout row>
                         
                            <v-text-field v-model="editedCustomerQuotation.grossAmount"
                              label="Gross Amount"></v-text-field>
                    
                        </v-layout>
                        <v-layout row>
                        
                            <v-text-field v-model="editedCustomerQuotation.netAmount" label="Net Amount"></v-text-field>
                       
                        </v-layout>

                        <v-layout row>
                        
                            <v-dialog ref="customerQuotationDateDialog" v-model="customerQuotationDateModal"
                              v-modal="date" persistent width="50%">
                              <template v-slot:[`activator`]="{ on }">
                                <v-text-field v-model="editedCustomerQuotation.quotationDate" label="Date Issued"
                                  prepend-icon="event" readonly v-on="on"></v-text-field>
                              </template>
                              <v-date-picker v-model="editedCustomerQuotation.quotationDate" scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="customerQuotationDateModal = false">Cancel</v-btn>
                                <v-btn text color="primary"
                                  @click="$refs.customerQuotationDateDialog.save(date)">OK</v-btn>
                              </v-date-picker>
                            </v-dialog>
                     
                        </v-layout>
                        <v-layout row v-if="editedCustomerQuotationIndex >= 0">
                      
                            <v-dialog ref="customerQuotationDateReceivedDialog"
                              v-model="customerQuotationDateReceivedModal" v-modal="date" persistent width="50%">
                              <template v-slot:[`activator`]="{ on }">
                                <v-text-field v-model="editedCustomerQuotation.dateRecieved" label="Date Received"
                                  prepend-icon="event" readonly v-on="on"></v-text-field>
                              </template>
                              <v-date-picker v-model="editedCustomerQuotation.dateReceived" scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary"
                                  @click="customerQuotationDateReceivedModal = false">Cancel</v-btn>
                                <v-btn text color="primary"
                                  @click="$refs.customerQuotationDateReceivedDialog.save(date)">OK</v-btn>
                              </v-date-picker>
                            </v-dialog>
                     
                        </v-layout>
                        <v-layout row v-if="editedCustomerQuotationIndex < 0">
                        
                            <v-file-input v-model="editedCustomerQuotation.quotationFile" label="Upload Quotation" filled
                              prepend-icon="mdi-camera"></v-file-input>
                      
                        </v-layout>

                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" @click="closeCustomerQuotationDialog">Cancel</v-btn>
                      <v-btn color="blue darken-1" @click="saveCustomerQuotation">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-card-title>
              <v-card-text>
                <h3>Quotation Summary</h3>
                <v-layout row v-if="customerQuotationSummary">
                
                    <v-text-field v-model="customerQuotationSummary.totalQuotationCount" label="Quotations Submitted"
                      readonly></v-text-field>
       
                </v-layout>
                <v-layout row v-else>
                    <span>Quotation Count 0</span>
                </v-layout>
                <h3>Quotation Details</h3>
                <v-data-table :headers="customerQuotationTableHeaders" :calculate-widths="true"
                  :items="customerQuotations" :search="search">

                  <template v-slot:[`item.actionDownloadCustomerQuotation`]="{ item }">
                    <v-btn icon @click="downloadCustomerQuotation(item)">
                      <v-icon>
                        cloud_download
                      </v-icon>
                    </v-btn>
                  </template>

                  <template v-slot:[`item.actionEditCustomerQuotation`]="{ item }">
                    <v-btn icon @click="showCustomerQuotationEditDialog(item)">
                      <v-icon>
                        edit
                      </v-icon>
                    </v-btn>
                  </template>

                  <template v-slot:[`item.actionDeleteCustomerQuotation`]="{ item }">
                    <v-btn icon @click="deleteCustomerQuotation(item)">
                      <v-icon>
                        delete
                      </v-icon>
                    </v-btn>
                  </template>

                </v-data-table>
              </v-card-text>

            </v-card>
          </v-window-item>

          <!-- Customer Invoices-->
          <v-window-item value="five">
            <v-card>
              <v-card-title>

                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="search" label="Search" single-line
                  hide-details></v-text-field>
                <v-spacer></v-spacer>
                <v-dialog v-model="customerInvoiceDialog">
                  <template v-slot:[`activator`]="{ on }">
                    <v-btn absolute right fab dark color="indigo" v-on="on"><v-icon dark>add</v-icon></v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span>Invoice Details</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-layout row>
                         
                            <v-select :items="projectListSelection" v-model="editedCustomerInvoice.projectId"
                              label="Select Project" single></v-select>
                       
                        </v-layout>
                        <v-layout row>
                        
                            <v-text-field v-model="editedCustomerInvoice.invoiceRef" label="Reference"></v-text-field>
                         

                        
                            <v-select :items="invoiceStatusListSelection" v-model="editedCustomerInvoice.status"
                              label="Status" single></v-select>
                        
                        </v-layout>
                        <v-layout row>
                         
                            <v-textarea name="description" label="Description" id="description"
                              v-model="editedCustomerInvoice.description" required>
                            </v-textarea>
                         
                        </v-layout>
                        <v-layout row>
                        
                            <v-text-field v-model="editedCustomerInvoice.currency" label="Currency"></v-text-field>
                          
                            <v-text-field v-model="editedCustomerInvoice.grossAmount" label="Gross Amount"></v-text-field>
                        
                            <v-text-field v-model="editedCustomerInvoice.netAmount" label="Net Amount"></v-text-field>
                         
                        </v-layout>


                        <v-layout row>
                         
                            <v-dialog ref="customerInvoiceDateDialog" v-model="customerInvoiceDateModal" v-modal="date"
                              persistent width="50%">
                              <template v-slot:[`activator`]="{ on }">
                                <v-text-field v-model="editedCustomerInvoice.invoiceDate" label="Date Issued"
                                  prepend-icon="event" readonly v-on="on"></v-text-field>
                              </template>
                              <v-date-picker v-model="editedCustomerInvoice.invoiceDate" scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="customerInvoiceDateModal = false">Cancel</v-btn>
                                <v-btn text color="primary" @click="$refs.customerInvoiceDateDialog.save(date)">OK</v-btn>
                              </v-date-picker>
                            </v-dialog>
                      
                            <v-dialog ref="customerInvoicePaymentDueDateDialog"
                              v-model="customerInvoicePaymentDueDateModal" v-modal="date" persistent width="50%">
                              <template v-slot:[`activator`]="{ on }">
                                <v-text-field v-model="editedCustomerInvoice.paymentDueDate" label="Payment Due Date"
                                  prepend-icon="event" readonly v-on="on"></v-text-field>
                              </template>
                              <v-date-picker v-model="editedCustomerInvoice.paymentDueDate" scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary"
                                  @click="customerInvoicePaymentDueDateModal = false">Cancel</v-btn>
                                <v-btn text color="primary"
                                  @click="$refs.customerInvoicePaymentDueDateDialog.save(date)">OK</v-btn>
                              </v-date-picker>
                            </v-dialog>
                      
                        </v-layout>

                        <v-layout row v-if="editedCustomerInvoiceIndex < 0">
                     
                            <v-file-input v-model="editedCustomerInvoice.invoiceFile" label="Upload Invoice" filled
                              prepend-icon="mdi-camera"></v-file-input>
              
                        </v-layout>

                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" @click="closeCustomerInvoiceDialog">Cancel</v-btn>
                      <v-btn color="blue darken-1" @click="saveCustomerInvoice">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

              </v-card-title>
              <v-card-text>
                <h3>Customer Invoice Summary</h3>
                <v-layout row v-if="customerInvoiceSummary">
              
                    <v-text-field v-model="customerInvoiceSummary.totalInvoiceCount" label="Total Invoice Count"
                      readonly></v-text-field>
               
               
                    <v-text-field v-model="customerInvoiceSummary.paidInvoicesCount" label="Paid Invoices"
                      readonly></v-text-field>
                 
                    <v-text-field v-model="customerInvoiceSummary.unPaidInvoicesCount" label="Un Paid Invoices"
                      readonly></v-text-field>
              
                </v-layout>
                <v-layout row v-if="customerInvoiceSummary">
                  
                    <v-text-field v-model="customerInvoiceSummary.unPaidInvoicesGrossAmount"
                      label="Invoice Total Gross (to Pay)" readonly prefix="€"></v-text-field>
                  
                    <v-text-field v-model="customerInvoiceSummary.unPaidInvoicesNetAmount"
                      label="Invoice Total Net (to Pay)" readonly prefix="€"></v-text-field>
                  
                </v-layout>
                <v-layout row v-if="customerInvoiceSummary">
                
                    <v-text-field v-model="customerInvoiceSummary.paidInvoicesGrossAmount"
                      label="Invoice Total Gross (Paid)" readonly prefix="€"></v-text-field>
                
                    <v-text-field v-model="customerInvoiceSummary.paidInvoicesNetAmount" label="Invoice Total Net (Paid)"
                      readonly prefix="€"></v-text-field>
            
                </v-layout>

                <h3>Invoice Details</h3>
                <v-data-table :headers="customerInvoiceTableHeaders" :calculate-widths="true" :items="customerInvoices"
                  :search="search">

                  <template v-slot:[`item.actionDownloadCustomerInvoice`]="{ item }">
                    <v-btn icon @click="downloadCustomerInvoice(item)">
                      <v-icon>
                        cloud_download
                      </v-icon>
                    </v-btn>
                  </template>

                  <template v-slot:[`item.actionEditCustomerInvoice`]="{ item }">
                    <v-btn icon @click="showCustomerInvoiceEditDialog(item)">
                      <v-icon>
                        edit
                      </v-icon>
                    </v-btn>
                  </template>

                  <template v-slot:[`item.actionDeleteCustomerInvoice`]="{ item }">
                    <v-btn icon @click="deleteCustomerInvoice(item)">
                      <v-icon>
                        delete
                      </v-icon>
                    </v-btn>
                  </template>

                </v-data-table>
              </v-card-text>

            </v-card>
          </v-window-item>



          <!-- Customer Payments -->

          <v-window-item value="6">

            <!--


     <v-card>
      <v-card-title>

          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-dialog v-model="customerPaymentDialog">
               <template v-slot:[`activator`]="{ on }">
                 <v-btn absolute right fab dark color="indigo" v-on="on"><v-icon dark>add</v-icon></v-btn>
               </template>
               <v-card>
                 <v-card-title>
                   <span>Payment Details</span>
                 </v-card-title>
                 <v-card-text>
                   <v-container>
                           <v-layout row>
                               <v-flex xs12 sm6 offset-sm1>
                               <v-select
                                 :items="projectListSelection"
                                 v-model="editedCustomerPayment.projectId"
                                 label="Select Project"
                                 single
                                ></v-select>
                               </v-flex>
                           </v-layout>
                           <v-layout row>
                             <v-flex xs12 sm9 offset-sm1>
                               <v-text-field v-model="editedCustomerPayment.paymentRef" label="Reference"></v-text-field>
                             </v-flex>
                           </v-layout>
                           <v-layout row v-show="editedCustomerPaymentIndex >= 0">
                             <v-flex xs12 sm9 offset-sm1>
                               <v-text-field v-model="editedCustomerPayment.status" label="Status"></v-text-field>
                             </v-flex>
                           </v-layout>
                           <v-layout row>
                             <v-flex xs12 sm9 offset-sm1>
                               <v-textarea
                                   name="description"
                                   label="Description"
                                   id="description"
                                   v-model="editedCustomerPayment.description"
                                   required>
                               </v-textarea>
                               </v-flex>
                           </v-layout>
                           <v-layout row>
                           <v-flex xs12 sm9 offset-sm1>
                             <v-text-field v-model="editedCustomerPayment.currency" label="Currency"></v-text-field>
                           </v-flex>
                           </v-layout>
                           <v-layout row>
                           <v-flex xs12 sm9 offset-sm1>
                             <v-text-field v-model="editedCustomerPayment.grossAmount" label="Gross Amount"></v-text-field>
                           </v-flex>
                           </v-layout>
                           <v-layout row>
                           <v-flex xs12 sm9 offset-sm1>
                             <v-text-field v-model="editedCustomerPayment.netAmount" label="Net Amount"></v-text-field>
                           </v-flex>
                          </v-layout>

                        <v-layout row>
                          <v-flex xs12 sm9 offset-sm1>
                            <v-dialog
                               ref="customerPaymentDateDialog"
                               v-model="customerPaymentDateModal"
                               v-modal="date"
                               persistent
                               width="50%"
                             >
                               <template v-slot:[`activator`]="{ on }">
                                 <v-text-field
                                   v-model="editedCustomerPayment.paymentDate"
                                   label="Date Issued"
                                   prepend-icon="event"
                                   readonly
                                   v-on="on"
                                 ></v-text-field>
                               </template>
                               <v-date-picker v-model="editedCustomerPayment.paymentDate" scrollable>
                                 <v-spacer></v-spacer>
                                 <v-btn text color="primary" @click="customerPaymentDateModal = false">Cancel</v-btn>
                                 <v-btn text color="primary" @click="$refs.customerPaymentDateDialog.save(date)">OK</v-btn>
                               </v-date-picker>
                             </v-dialog>
                          </v-flex>
                         </v-layout>
                         <v-layout row v-if="editedCustomerPaymentIndex >= 0">
                           <v-flex xs12 sm9 offset-sm1>
                             <v-dialog
                                ref="customerPaymentDateReceivedDialog"
                                v-model="customerPaymentDateReceivedModal"
                                v-modal="date"
                                persistent
                                width="50%"
                              >
                                <template v-slot:[`activator`]="{ on }">
                                  <v-text-field
                                    v-model="editedCustomerPayment.dateRecieved"
                                    label="Date Received"
                                    prepend-icon="event"
                                    readonly
                                    v-on="on"
                                  ></v-text-field>
                                </template>
                                <v-date-picker v-model="editedCustomerPayment.dateReceived" scrollable>
                                  <v-spacer></v-spacer>
                                  <v-btn text color="primary" @click="customerPaymentDateReceivedModal = false">Cancel</v-btn>
                                  <v-btn text color="primary" @click="$refs.customerPaymentDateReceivedDialog.save(date)">OK</v-btn>
                                </v-date-picker>
                              </v-dialog>
                           </v-flex>
                          </v-layout>

                   </v-container>
                 </v-card-text>

                 <v-card-actions>
                   <v-spacer></v-spacer>
                   <v-btn color="blue darken-1" @click="closeCustomerPaymentDialog">Cancel</v-btn>
                   <v-btn color="blue darken-1" @click="saveCustomerPayment">Save</v-btn>
                 </v-card-actions>
               </v-card>
             </v-dialog>
        </v-card-title>
        <v-card-text>
        <h3>Payment Summary</h3>
        <v-layout row v-if="customerPaymentSummary">
          <v-flex xs4 sm3 offset-sm1>
            <v-text-field v-model="customerPaymentSummary.totalPaymentCount" label="Payments Submitted" readonly></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row v-else>
          <v-flex xs4 sm3 offset-sm1>
           <span>Payment Count 0</span>
          </v-flex>
        </v-layout>
        <h3>Payment Details</h3>
        <v-data-table
           :headers="customerPaymentTableHeaders"
           :calculate-widths="true"
           :items="customerPayments"
           :search="search">

          <template v-slot:item.actionEditCustomerPayment="{ item }">
            <v-btn icon @click="showCustomerPaymentEditDialog(item)" >
            <v-icon>
                edit
              </v-icon>
             </v-btn>
           </template>

           <template v-slot:item.actionDeleteCustomerPayment="{ item }">
            <v-btn icon @click="deleteCustomerPayment(item)" >
              <v-icon>
               delete
              </v-icon>
             </v-btn>
           </template>

         </v-data-table>
        </v-card-text>

        </v-card>


       -->
          </v-window-item>

        </v-window>
        {{ customer }}
        <br>
        editedCustomer: {{ editedCustomer }}

      </v-card-text>
    </v-card>


  </v-container>
</template>

<script>
import { computed, ref, watch, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
export default {


  setup() {
    const store = useStore();
    //const router = useRouter();
    const route = useRoute();

    //const id = computed(props.customerId);

    const id = route.params.customerId;
    console.log('id is ' + route.params.customerId);

    onMounted(() => {
      store.dispatch('projects/loadProjects')
      store.dispatch('customers/loadCustomer', id)
      store.dispatch('customers/loadCustomerQuotationSummary', id)
      store.dispatch('customers/loadCustomerQuotations', id)
      store.dispatch('customers/loadCustomerInvoices', id)
      store.dispatch('customers/loadCustomerInvoiceSummary', id)

    });

    const tab = ref(null);
    const date = new Date().toISOString().substr(0, 10);
    const search = '';
    var snack = ref(false);
    var snackColor = ref('');
    var snackText = ref('');
    const max25chars = v => v.length <= 25 || 'Input too long!';
    const pagination = {};
    const save = () => {
      snack = true
      snackColor = 'success'
      snackText = 'Data saved successfully'
    };
    const cancel = () => {
      snack = true
      snackColor = 'error'
      snackText = 'Canceled'
    };
    const open = () => {
      snack = true
      snackColor = 'info'
      snackText = 'Dialog opened'
    };
    const formIsValid = () => {
      return true
    };
    const onDismissed = () => (
      store.dispatch('clearError', { root: true })
    );

    // customer
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

    // Quotations
    const customerQuotationTableHeaders = [
      { text: 'Project', value: 'projectName' },
      { text: 'Ref', value: 'quotationRef' },
      { text: 'Gross', value: 'grossAmount' },
      { text: 'Currency', value: 'currency' },
      { text: 'Issued', value: 'quotationDate', width: "125px" },
      { text: 'Status', value: 'status' },
      { text: 'Download', align: 'left', value: 'actionDownloadCustomerQuotation' },
      { text: 'Edit', align: 'left', value: 'actionEditCustomerQuotation' },
      { text: 'Delete', align: 'left', value: 'actionDeleteCustomerQuotation' }
    ];
    const customerQuotationDialog = ref(false);
    const customerQuotationDateDialog = ref(false);
    const customerQuotationDateModal = ref(false);
    const customerQuotationDateReceivedDialog = ref(false);
    const customerQuotationDateReceivedModal = ref(false);
    const editedCustomerQuotationIndex = ref(-1);
    const editedCustomerQuotation = reactive({
      id: '',
      customerId: id,
      projectId: '',
      quotationRef: '',
      description: '',
      currency: '',
      netAmount: '',
      quotationDate: null,
      dateReceived: null,
      quotationFile: null,
      status: ''
    });
    const defaultCustomerQuotation = reactive({
      customerId: id,
      projectId: '',
      quotationRef: '',
      description: '',
      currency: '',
      netAmount: '',
      quotationDate: null,
      paymentDueDate: null,
      quotationFile: null,
      status: ''
    });
    const saveCustomerQuotation = () => {
      if (editedCustomerQuotationIndex.value > -1) {
        const formData = {
          id: editedCustomerQuotation.id,
          customerId: id,
          projectId: editedCustomerQuotation.projectId,
          quotationRef: editedCustomerQuotation.quotationRef,
          status: editedCustomerQuotation.status,
          description: editedCustomerQuotation.description,
          currency: editedCustomerQuotation.currency,
          grossAmount: editedCustomerQuotation.grossAmount,
          netAmount: editedCustomerQuotation.netAmount,
          quotationDate: editedCustomerQuotation.quotationDate,
          dateReceived: editedCustomerQuotation.dateReceived
        }
        console.log('Updating customer quotation details')
        console.log(formData)
        store.dispatch('customers/updateCustomerQuotation', formData)
      } else {
        console.log('Creating new customer quotation details')
        const formData = {
          customerId: id,
          projectId: editedCustomerQuotation.projectId,
          quotationRef: editedCustomerQuotation.quotationRef,
          description: editedCustomerQuotation.description,
          status: editedCustomerQuotation.status,
          currency: editedCustomerQuotation.currency,
          grossAmount: editedCustomerQuotation.grossAmount,
          netAmount: editedCustomerQuotation.netAmount,
          quotationDate: editedCustomerQuotation.quotationDate,
          quotationFile: editedCustomerQuotation.quotationFile
        }
        console.log(formData)
        store.dispatch('customers/createCustomerQuotation', formData)
      }
      closeCustomerQuotationDialog()
      save()
    };
    const showCustomerQuotationEditDialog = (item) => {
      console.log('Showing Edit Quotation Dialog for operative with id ' + item.id)
      editedCustomerQuotationIndex.value = customerQuotations.value.indexOf(item)
      editedCustomerQuotation.value = Object.assign({}, item)
      customerQuotationDialog.value = true
    };
    const closeCustomerQuotationDialog = () => {
      customerQuotationDialog.value = false
      setTimeout(() => {
        editedCustomerQuotation.value = Object.assign({}, defaultCustomerQuotation)
        editedCustomerQuotationIndex.value = -1
      }, 300)
    };
    const downloadCustomerQuotation = (item) => {
      console.log('downloading item requested..')
      console.log(item)
      store.dispatch('downloadCustomerQuotation', item)
    };
    const deleteCustomerQuotation = (item) => {
      console.log('Delete CustomerQuotation Event Received..')
      const formData = {
        id: item.id,
        customerId: id
      }
      console.log(formData)
      store.dispatch('deleteCustomerQuotation', formData)
    };

    // invoices

    const customerInvoiceTableHeaders = [
      { text: 'Project', value: 'projectName' },
      { text: 'Ref', value: 'invoiceRef' },
      { text: 'Status', value: 'status' },
      { text: 'Currency', value: 'currency' },
      { text: 'Gross', value: 'grossAmount' },
      { text: 'Net', value: 'netAmount' },
      { text: 'Issued', value: 'invoiceDate' },
      { text: 'Payment Due', value: 'paymentDueDate', width: "125px" },
      { text: 'Download', align: 'left', value: 'actionDownloadCustomerInvoice' },
      { text: 'Edit', align: 'left', value: 'actionEditCustomerInvoice' },
      { text: 'Delete', align: 'left', value: 'actionDeleteCustomerInvoice' }
    ];
    const customerInvoiceDialog = ref(false);
    const customerInvoicePaymentDialog = ref(false);
    const customerInvoiceDateDialog = ref(false);
    const customerInvoiceDateModal = ref(false);
    const customerInvoicePaymentDueDateDialog = ref(false);
    const customerInvoicePaymentDueDateModal = ref(false);
    const invoiceStatusListSelection = [
      { text: 'Issued', value: 'ISSUED' },
      { text: 'Awaiting Payment', value: 'AWAITING_PAYMENT' },
      { text: 'Un Paid', value: 'UNPAID' },
      { text: 'Paid', value: 'PAID' }
    ];
    const editedCustomerInvoiceIndex = ref(-1);
    const defaultCustomerInvoice = reactive({
      id: '',
      customerId: id,
      projectId: '',
      invoiceRef: '',
      description: '',
      currency: '',
      netAmount: '',
      invoiceDate: null,
      paymentDueDate: null,
      invoiceFile: null,
      status: ''
    });
    const editedCustomerInvoice = reactive({
      id: '',
      customerId: id,
      projectId: '',
      invoiceRef: '',
      description: '',
      currency: '',
      netAmount: '',
      invoiceDate: null,
      paymentDueDate: null,
      invoiceFile: null,
      status: ''
    });
    const showCustomerInvoiceEditDialog = (item) => {
      console.log('Showing Edit Invoice Dialog for operative with id ' + item.id)
      editedCustomerInvoiceIndex.value = customerInvoices.value.indexOf(item)
      editedCustomerInvoice.value = Object.assign({}, item)
      customerInvoiceDialog.value = true
    };
    const closeCustomerInvoiceDialog = () => {
      customerInvoiceDialog.value = false
      setTimeout(() => {
        editedCustomerInvoice.value = Object.assign({}, defaultCustomerInvoice)
        editedCustomerInvoiceIndex.value = -1
      }, 300)
    };
    const saveCustomerInvoice = () => {
      if (editedCustomerInvoiceIndex.value > -1) {
        const formData = {
          id: id.value,
          customerId: id,
          projectId: editedCustomerInvoice.projectId.value,
          invoiceRef: editedCustomerInvoice.invoiceRef,
          status: editedCustomerInvoice.status,
          description: editedCustomerInvoice.description,
          currency: editedCustomerInvoice.currency,
          grossAmount: editedCustomerInvoice.grossAmount,
          netAmount: editedCustomerInvoice.netAmount,
          invoiceDate: editedCustomerInvoice.invoiceDate,
          paymentDueDate: editedCustomerInvoice.paymentDueDate
        }
        console.log('Updating customer invoice details')
        console.log(formData)
        store.dispatch('customers/updateCustomerInvoice', formData)
          .then(
            setTimeout(() => {
              store.dispatch('customers/loadCustomerInvoiceSummary', id)
            }, 300)
          )
      } else {
        console.log('Creating new customer invoice details')
        const formData = {
          customerId: id,
          projectId: editedCustomerInvoice.projectId,
          invoiceRef: editedCustomerInvoice.invoiceRef,
          description: editedCustomerInvoice.description,
          status: editedCustomerInvoice.status,
          currency: editedCustomerInvoice.currency,
          grossAmount: editedCustomerInvoice.grossAmount,
          netAmount: editedCustomerInvoice.netAmount,
          invoiceDate: editedCustomerInvoice.invoiceDate,
          paymentDueDate: editedCustomerInvoice.paymentDueDate,
          invoiceFile: editedCustomerInvoice.invoiceFile
        }
        console.log(formData)
        store.dispatch('customers/createCustomerInvoice', formData)
      }
      closeCustomerInvoiceDialog()
      save()
    };
    const customerPaymentDialog = ref(false);
    const customerPaymentDateDialog = ref(false);
    const customerPaymentDateModal = ref(false);
    const customerPaymentDateReceivedDialog = ref(false);
    const customerPaymentDateReceivedModal = ref(false);
    const editedCustomerPaymentIndex = ref(-1);
    const editedCustomerPayment = reactive({
      id: '',
      customerId: id,
      projectId: '',
      paymentRef: '',
      description: '',
      currency: '',
      netAmount: '',
      paymentDate: null,
      dateReceived: null,
      status: ''
    });
    const defaultCustomerPayment = reactive({
      customerId: id,
      projectId: '',
      paymentRef: '',
      description: '',
      currency: '',
      netAmount: '',
      paymentDate: null,
      paymentDueDate: null,
      status: ''
    });

    const customerPaymentTableHeaders = [
      { text: 'Project', value: 'projectName' },
      { text: 'InvoiceRef', value: 'invoiceRef' },
      { text: 'Net', value: 'netAmount' },
      { text: 'Currency', value: 'currency' },
      { text: 'Payment Ref', value: 'paymentRef' },
      { text: 'Payment Date', value: 'paymentDate', width: "125px" },
      { text: 'Status', value: 'status' },
      { text: 'Download', align: 'left', value: 'actionDownloadCustomerPayment' },
      { text: 'Edit', align: 'left', value: 'actionEditCustomerPayment' },
      { text: 'Delete', align: 'left', value: 'actionDeleteCustomerPayment' }
    ];

    const error = computed(() => store.getters['users/error']);
    const userIsAuthenticatedAndHasRoleAdmin = computed(() => store.getters['users/userIsAuthenticatedAndHasRoleAdmin']);
    const customer = computed(() => store.getters['customers/loadedCustomer']);
    const customerQuotationSummary = computed(() => store.getters['customers/loadedCustomerQuotationSummary']);
    const customerQuotations = computed(() => store.getters['customers/loadedCustomerQuotations']);
    const customerInvoiceSummary = computed(() => store.getters['customers/loadedCustomerInvoiceSummary']);
    const customerInvoices = computed(() => store.getters['customers/loadedCustomerInvoices']);
    const customerPaymentsReceivedSummary = computed(() => store.getters['customers/loadedCustomerPaymentsReceivedSummary']);
    const customerPaymentsReceived = computed(() => store.getters['customers/loadedCustomerPaymentsReceived']);
    const projects = computed(() => store.getters['projects/loadedProject']);

    const projectListSelection = projects;//.map(function (item) {
    //   console.log("Project selection list adding " + item.id)
    //   return { text: item.name, value: item.id }
    // })

    const onUpdateCustomer = () => {
      console.log('Update Customer Event Received..')
      console.log(editedCustomer)
      store.dispatch('customers/updateCustomer', editedCustomer)
      save()
    };

    watch(customer, (newValue, oldValue) => {
      console.log('computedProperty was ' + oldValue + '. Now it is ' + JSON.stringify(newValue) + '.')
      console.log('setting edited customer..')
      const rawObject = JSON.parse(JSON.stringify(newValue))
      Object.assign(editedCustomer, rawObject);
      console.log(editedCustomer)
    })



    return {
      id,
      userIsAuthenticatedAndHasRoleAdmin,
      customer,
      onUpdateCustomer,
      editedCustomer,
      error,
      customerInvoices,
      customerInvoiceSummary,
      customerQuotations,
      customerQuotationSummary,
      projectListSelection,
      customerPaymentsReceivedSummary,
      customerPaymentsReceived,
      save,
      onDismissed,
      formIsValid,
      max25chars,
      open,
      close,
      cancel,
      pagination,
      snack,
      snackColor,
      snackText,
      tab,
      date,
      search,
      defaultCustomerQuotation,
      customerQuotationTableHeaders,
      customerQuotationDialog,
      customerQuotationDateDialog,
      customerQuotationDateModal,
      customerQuotationDateReceivedDialog,
      customerQuotationDateReceivedModal,
      showCustomerQuotationEditDialog,
      closeCustomerQuotationDialog,
      saveCustomerQuotation,
      downloadCustomerQuotation,
      deleteCustomerQuotation,
      customerInvoiceTableHeaders,
      customerInvoiceDialog,
      customerInvoicePaymentDialog,
      customerInvoiceDateDialog,
      customerInvoiceDateModal,
      customerInvoicePaymentDueDateDialog,
      customerInvoicePaymentDueDateModal,
      invoiceStatusListSelection,
      defaultCustomerInvoice,
      showCustomerInvoiceEditDialog,
      closeCustomerInvoiceDialog,
      saveCustomerInvoice,
      customerPaymentTableHeaders,
      customerPaymentDialog,
      customerPaymentDateDialog,
      customerPaymentDateModal,
      customerPaymentDateReceivedDialog,
      customerPaymentDateReceivedModal,
      editedCustomerPaymentIndex,
      editedCustomerPayment,
      defaultCustomerPayment,
    }
  }
}
</script>
