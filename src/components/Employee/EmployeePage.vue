<template>
    <v-container fluid>

        <v-card>
            <v-card-title>
                <!--<h3 class="primary--text">{{ employee.name }}</h3> -->
            </v-card-title>
            <v-card-text>
                <!--<h3 class="primary--text">Category: {{ employee.category }}</h3>-->
                <!--<div>{{ employee.description }}</div>-->
                <!--<div>{{ employee.address }}</div>-->

                <v-tabs v-model="tab" show-arrows>

                    <v-tab value="one">
                        Employee Details
                    </v-tab>
                    <v-tab value="two">
                        Projects
                    </v-tab>
                    <v-tab value="three">
                        Contracts
                    </v-tab>
                    <v-tab value="four">
                        Invoices
                    </v-tab>
                    <!--
        <v-tab href="#tab-6">
          Payments Received
        </v-tab> -->
                </v-tabs>

                <v-window v-model="tab">

                    <!-- Employee Details -->

                    <v-window-item value="one">
                        <v-card>
                            <v-card-title>
                                Employee Details
                                <v-spacer></v-spacer>
                            </v-card-title>
                            <v-card-text>
                                <v-layout row>
                                    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
                                        {{ snackText }}
                                        <v-btn text @click="snack = false">Close</v-btn>
                                    </v-snackbar>
                                </v-layout>


                                <form @submit.prevent="onUpdateEmployee">
                                    <v-layout row>
                                        <!--
                          <v-text-field name="employeeCategory" label="Category" id="employeeCategory"
                            v-model="employee.category">
                          </v-text-field> -->

                                    </v-layout>

                                    <v-layout row>

                                        <v-text-field name="employeeName" label="Employee Name" id="employeeName"
                                            v-model="editedEmployee.name"></v-text-field>


                                    </v-layout>
                                    <v-layout row>

                                        <v-textarea name="employeeDescription" label="Employee Description"
                                            id="employeeDescription" v-model="editedEmployee.description"
                                            required></v-textarea>

                                    </v-layout>
                                    <v-layout row>

                                        <v-textarea name="employeeAddress" label="Employee Address" id="employeeAddress"
                                            v-model="editedEmployee.address" required></v-textarea>

                                    </v-layout>
                                    <v-layout row>

                                        <v-text-field name="employeeWebsite" label="Employee Website" id="employeeWebsite"
                                            v-model="editedEmployee.website">
                                        </v-text-field>

                                    </v-layout>
                                    <v-layout row>
                                        <!--
                          <v-text-field name="employeeEmail" label="Employee Email" id="employeeEmail"
                            v-model="editedEmployee.email">
                          </v-text-field>
                        -->
                                    </v-layout>
                                    <v-layout row>

                                        <v-text-field name="employeeContactName" label="Contact Name"
                                            id="employeeContactName" v-model="editedEmployee.contactName">
                                        </v-text-field>

                                    </v-layout>
                                    <v-layout row>

                                        <v-text-field name="employeeContactNumber" label="Contact Number"
                                            id="employeeContactNumber" v-model="editedEmployee.contactNumber">
                                        </v-text-field>

                                    </v-layout>
                                    <v-layout row>

                                        <v-text-field name="employeeHeadOfficeTelephoneNumber"
                                            label="Head Office TelephoneNumber" id="employeeHeadOfficeTelephoneNumber"
                                            v-model="editedEmployee.headOfficeTelephoneNumber">
                                        </v-text-field>

                                    </v-layout>
                                    <v-layout row>

                                        <v-text-field name="employeeCompanyRegistrationNumber"
                                            label="Company Registration Number" id="employeeCompanyRegistrationNumber"
                                            v-model="editedEmployee.companyRegistrationNumber">
                                        </v-text-field>

                                    </v-layout>
                                    <v-layout row>

                                        <v-text-field name="employeeVatNumber" label="Company Vat Number"
                                            id="employeeVatNumber" v-model="editedEmployee.vatNumber">
                                        </v-text-field>

                                    </v-layout>
                                    <v-layout row>

                                        <v-btn class="primary" :disabled="!formIsValid" type="submit">Update Details</v-btn>

                                    </v-layout>
                                </form>



                            </v-card-text>
                        </v-card>
                    </v-window-item>

                    <v-window-item value="two">
                        <v-card>
                            <v-card-title>

                                <v-spacer></v-spacer>
                                <v-text-field v-model="search" append-icon="search" label="Search" single-line
                                    hide-details></v-text-field>
                                <v-spacer></v-spacer>
                                <v-btn absolute right fab dark color="indigo"><v-icon dark>add</v-icon>

                                    <v-dialog v-model="employeeQuotationDialog" activator="parent">

                                        <v-card>
                                            <v-card-title>
                                                <span>Quotation Details</span>
                                            </v-card-title>
                                            <v-card-text>
                                                <v-container>
                                                    <v-layout row>

                                                        <v-select :items="projectListSelection"
                                                            v-model="editedEmployeeQuotation.projectId"
                                                            label="Select Project" single></v-select>

                                                    </v-layout>
                                                    <v-layout row>

                                                        <v-text-field v-model="editedEmployeeQuotation.quotationRef"
                                                            label="Reference"></v-text-field>

                                                    </v-layout>
                                                    <v-layout row v-show="editedEmployeeQuotationIndex >= 0">

                                                        <v-text-field v-model="editedEmployeeQuotation.status"
                                                            label="Status"></v-text-field>

                                                    </v-layout>
                                                    <v-layout row>

                                                        <v-textarea name="description" label="Description" id="description"
                                                            v-model="editedEmployeeQuotation.description" required>
                                                        </v-textarea>

                                                    </v-layout>
                                                    <v-layout row>

                                                        <v-text-field v-model="editedEmployeeQuotation.currency"
                                                            label="Currency"></v-text-field>

                                                    </v-layout>
                                                    <v-layout row>

                                                        <v-text-field v-model="editedEmployeeQuotation.grossAmount"
                                                            label="Gross Amount"></v-text-field>

                                                    </v-layout>
                                                    <v-layout row>

                                                        <v-text-field v-model="editedEmployeeQuotation.netAmount"
                                                            label="Net Amount"></v-text-field>

                                                    </v-layout>

                                                    <v-layout row>
                                                        <!--             
                              <v-dialog ref="employeeQuotationDateDialog" v-model="employeeQuotationDateModal"
                                v-modal="date" persistent width="50%">
                                <template v-slot:[`activator`]="{ on }">
                                  <v-text-field v-model="editedEmployeeQuotation.quotationDate" label="Date Issued"
                                    prepend-icon="event" readonly v-on="on"></v-text-field>
                                </template>
                                <v-date-picker v-model="editedEmployeeQuotation.quotationDate" scrollable>
                                  <v-spacer></v-spacer>
                                  <v-btn text color="primary" @click="employeeQuotationDateModal = false">Cancel</v-btn>
                                  <v-btn text color="primary"
                                    @click="$refs.employeeQuotationDateDialog.save(date)">OK</v-btn>
                                </v-date-picker>
                              </v-dialog>
                            -->
                                                    </v-layout>
                                                    <v-layout row v-if="editedEmployeeQuotationIndex >= 0">
                                                        <!--
                              <v-dialog ref="employeeQuotationDateReceivedDialog"
                                v-model="employeeQuotationDateReceivedModal" v-modal="date" persistent width="50%">
                                <template v-slot:[`activator`]="{ on }">
                                  <v-text-field v-model="editedEmployeeQuotation.dateRecieved" label="Date Received"
                                    prepend-icon="event" readonly v-on="on"></v-text-field>
                                </template>
                                <v-date-picker v-model="editedEmployeeQuotation.dateReceived" scrollable>
                                  <v-spacer></v-spacer>
                                  <v-btn text color="primary"
                                    @click="employeeQuotationDateReceivedModal = false">Cancel</v-btn>
                                  <v-btn text color="primary"
                                    @click="$refs.employeeQuotationDateReceivedDialog.save(date)">OK</v-btn>
                                </v-date-picker>
                              </v-dialog>
                            -->
                                                    </v-layout>
                                                    <v-layout row v-if="editedEmployeeQuotationIndex < 0">

                                                        <v-file-input v-model="editedEmployeeQuotation.quotationFile"
                                                            label="Upload Quotation" filled
                                                            prepend-icon="mdi-camera"></v-file-input>

                                                    </v-layout>

                                                </v-container>
                                            </v-card-text>

                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="blue darken-1"
                                                    @click="closeEmployeeQuotationDialog">Cancel</v-btn>
                                                <v-btn color="blue darken-1" @click="saveEmployeeQuotation">Save</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </v-btn>

                            </v-card-title>
                            <v-card-text>
                                <h3>Quotation Summary</h3>
                                <v-layout row v-if="employeeQuotationSummary">

                                    <v-text-field v-model="employeeQuotationSummary.totalQuotationCount"
                                        label="Quotations Submitted" readonly></v-text-field>

                                </v-layout>
                                <v-layout row v-else>
                                    <span>Quotation Count 0</span>
                                </v-layout>
                                <h3>Quotation Details</h3>

                                <v-data-table :headers="employeeQuotationTableHeaders" :calculate-widths="true"
                                    :items="employeeQuotations" :search="search">

                                    <template v-slot:[`item.actionDownloadEmployeeQuotation`]="{ item }">
                                        <v-btn icon @click="downloadEmployeeQuotation(item)">
                                            <v-icon>
                                                cloud_download
                                            </v-icon>
                                        </v-btn>
                                    </template>

                                    <template v-slot:[`item.actionEditEmployeeQuotation`]="{ item }">
                                        <v-btn icon @click="showEmployeeQuotationEditDialog(item)">
                                            <v-icon>
                                                edit
                                            </v-icon>
                                        </v-btn>
                                    </template>

                                    <template v-slot:[`item.actionDeleteEmployeeQuotation`]="{ item }">
                                        <v-btn icon @click="deleteEmployeeQuotation(item)">
                                            <v-icon>
                                                delete
                                            </v-icon>
                                        </v-btn>
                                    </template>

                                </v-data-table>

                            </v-card-text>

                        </v-card>
                    </v-window-item>

                    <!-- Employee Invoices-->
                    <v-window-item value="three">

                        <v-card>
                            <v-card-title>

                                <v-spacer></v-spacer>
                                <v-text-field v-model="search" append-icon="search" label="Search" single-line
                                    hide-details></v-text-field>
                                <v-spacer></v-spacer>
                                <v-dialog v-model="employeeInvoiceDialog">
                                    <template>
                                        <v-btn absolute right fab dark color="indigo"><v-icon dark>add</v-icon></v-btn>
                                    </template>
                                    <v-card>
                                        <v-card-title>
                                            <span>Invoice Details</span>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-container>
                                                <v-layout row>

                                                    <v-select :items="projectListSelection"
                                                        v-model="editedEmployeeInvoice.projectId" label="Select Project"
                                                        single></v-select>

                                                </v-layout>
                                                <v-layout row>

                                                    <v-text-field v-model="editedEmployeeInvoice.invoiceRef"
                                                        label="Reference"></v-text-field>



                                                    <v-select :items="invoiceStatusListSelection"
                                                        v-model="editedEmployeeInvoice.status" label="Status"
                                                        single></v-select>

                                                </v-layout>
                                                <v-layout row>

                                                    <v-textarea name="description" label="Description" id="description"
                                                        v-model="editedEmployeeInvoice.description" required>
                                                    </v-textarea>

                                                </v-layout>
                                                <v-layout row>

                                                    <v-text-field v-model="editedEmployeeInvoice.currency"
                                                        label="Currency"></v-text-field>

                                                    <v-text-field v-model="editedEmployeeInvoice.grossAmount"
                                                        label="Gross Amount"></v-text-field>

                                                    <v-text-field v-model="editedEmployeeInvoice.netAmount"
                                                        label="Net Amount"></v-text-field>

                                                </v-layout>


                                                <v-layout row>
                                                    <!--
                              <v-dialog ref="employeeInvoiceDateDialog" v-model="employeeInvoiceDateModal" v-modal="date"
                                persistent width="50%">
                                <template v-slot:[`activator`]="{ on }">
                                  <v-text-field v-model="editedEmployeeInvoice.invoiceDate" label="Date Issued"
                                    prepend-icon="event" readonly v-on="on"></v-text-field>
                                </template>
                                <v-date-picker v-model="editedEmployeeInvoice.invoiceDate" scrollable>
                                  <v-spacer></v-spacer>
                                  <v-btn text color="primary" @click="employeeInvoiceDateModal = false">Cancel</v-btn>
                                  <v-btn text color="primary" @click="$refs.employeeInvoiceDateDialog.save(date)">OK</v-btn>
                                </v-date-picker>
                              </v-dialog>
                            
                              <v-dialog ref="employeeInvoicePaymentDueDateDialog"
                                v-model="employeeInvoicePaymentDueDateModal" v-modal="date" persistent width="50%">
                                <template v-slot:[`activator`]="{ on }">
                                  <v-text-field v-model="editedEmployeeInvoice.paymentDueDate" label="Payment Due Date"
                                    prepend-icon="event" readonly v-on="on"></v-text-field>
                                </template>
                                <v-date-picker v-model="editedEmployeeInvoice.paymentDueDate" scrollable>
                                  <v-spacer></v-spacer>
                                  <v-btn text color="primary"
                                    @click="employeeInvoicePaymentDueDateModal = false">Cancel</v-btn>
                                  <v-btn text color="primary"
                                    @click="$refs.employeeInvoicePaymentDueDateDialog.save(date)">OK</v-btn>
                                </v-date-picker>
                              </v-dialog>
                            -->
                                                </v-layout>

                                                <v-layout row v-if="editedEmployeeInvoiceIndex < 0">

                                                    <v-file-input v-model="editedEmployeeInvoice.invoiceFile"
                                                        label="Upload Invoice" filled
                                                        prepend-icon="mdi-camera"></v-file-input>

                                                </v-layout>

                                            </v-container>
                                        </v-card-text>

                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="blue darken-1" @click="closeEmployeeInvoiceDialog">Cancel</v-btn>
                                            <v-btn color="blue darken-1" @click="saveEmployeeInvoice">Save</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>

                            </v-card-title>
                            <v-card-text>
                                <h3>Employee Invoice Summary</h3>
                                <v-layout row v-if="employeeInvoiceSummary">

                                    <v-text-field v-model="employeeInvoiceSummary.totalInvoiceCount"
                                        label="Total Invoice Count" readonly></v-text-field>


                                    <v-text-field v-model="employeeInvoiceSummary.paidInvoicesCount" label="Paid Invoices"
                                        readonly></v-text-field>

                                    <v-text-field v-model="employeeInvoiceSummary.unPaidInvoicesCount"
                                        label="Un Paid Invoices" readonly></v-text-field>

                                </v-layout>
                                <v-layout row v-if="employeeInvoiceSummary">

                                    <v-text-field v-model="employeeInvoiceSummary.unPaidInvoicesGrossAmount"
                                        label="Invoice Total Gross (to Pay)" readonly prefix="€"></v-text-field>

                                    <v-text-field v-model="employeeInvoiceSummary.unPaidInvoicesNetAmount"
                                        label="Invoice Total Net (to Pay)" readonly prefix="€"></v-text-field>

                                </v-layout>
                                <v-layout row v-if="employeeInvoiceSummary">

                                    <v-text-field v-model="employeeInvoiceSummary.paidInvoicesGrossAmount"
                                        label="Invoice Total Gross (Paid)" readonly prefix="€"></v-text-field>

                                    <v-text-field v-model="employeeInvoiceSummary.paidInvoicesNetAmount"
                                        label="Invoice Total Net (Paid)" readonly prefix="€"></v-text-field>

                                </v-layout>

                                <h3>Invoice Details</h3>
                                <v-data-table :headers="employeeInvoiceTableHeaders" :calculate-widths="true"
                                    :items="employeeInvoices" :search="search">

                                    <template v-slot:[`item.actionDownloadEmployeeInvoice`]="{ item }">
                                        <v-btn icon @click="downloadEmployeeInvoice(item)">
                                            <v-icon>
                                                cloud_download
                                            </v-icon>
                                        </v-btn>
                                    </template>

                                    <template v-slot:[`item.actionEditEmployeeInvoice`]="{ item }">
                                        <v-btn icon @click="showEmployeeInvoiceEditDialog(item)">
                                            <v-icon>
                                                edit
                                            </v-icon>
                                        </v-btn>
                                    </template>

                                    <template v-slot:[`item.actionDeleteEmployeeInvoice`]="{ item }">
                                        <v-btn icon @click="deleteEmployeeInvoice(item)">
                                            <v-icon>
                                                delete
                                            </v-icon>
                                        </v-btn>
                                    </template>

                                </v-data-table>
                            </v-card-text>

                        </v-card>

                    </v-window-item>



                    <!-- Employee Payments -->

                    <v-window-item value="four">




                        <v-card>
                            <v-card-title>

                                <v-spacer></v-spacer>
                                <v-text-field v-model="search" append-icon="search" label="Search" single-line
                                    hide-details></v-text-field>
                                <v-spacer></v-spacer>
                                <!--
            <v-dialog v-model="employeePaymentDialog">
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
                                   v-model="editedEmployeePayment.projectId"
                                   label="Select Project"
                                   single
                                  ></v-select>
                                 </v-flex>
                             </v-layout>
                             <v-layout row>
                               <v-flex xs12 sm9 offset-sm1>
                                 <v-text-field v-model="editedEmployeePayment.paymentRef" label="Reference"></v-text-field>
                               </v-flex>
                             </v-layout>
                             <v-layout row v-show="editedEmployeePaymentIndex >= 0">
                               <v-flex xs12 sm9 offset-sm1>
                                 <v-text-field v-model="editedEmployeePayment.status" label="Status"></v-text-field>
                               </v-flex>
                             </v-layout>
                             <v-layout row>
                               <v-flex xs12 sm9 offset-sm1>
                                 <v-textarea
                                     name="description"
                                     label="Description"
                                     id="description"
                                     v-model="editedEmployeePayment.description"
                                     required>
                                 </v-textarea>
                                 </v-flex>
                             </v-layout>
                             <v-layout row>
                             <v-flex xs12 sm9 offset-sm1>
                               <v-text-field v-model="editedEmployeePayment.currency" label="Currency"></v-text-field>
                             </v-flex>
                             </v-layout>
                             <v-layout row>
                             <v-flex xs12 sm9 offset-sm1>
                               <v-text-field v-model="editedEmployeePayment.grossAmount" label="Gross Amount"></v-text-field>
                             </v-flex>
                             </v-layout>
                             <v-layout row>
                             <v-flex xs12 sm9 offset-sm1>
                               <v-text-field v-model="editedEmployeePayment.netAmount" label="Net Amount"></v-text-field>
                             </v-flex>
                            </v-layout>
  
                          <v-layout row>
                            <v-flex xs12 sm9 offset-sm1>
                               
                              <v-dialog
                                 ref="employeePaymentDateDialog"
                                 v-model="employeePaymentDateModal"
                                 v-modal="date"
                                 persistent
                                 width="50%"
                               >
                                 <template v-slot:[`activator`]="{ on }">
                                   <v-text-field
                                     v-model="editedEmployeePayment.paymentDate"
                                     label="Date Issued"
                                     prepend-icon="event"
                                     readonly
                                     v-on="on"
                                   ></v-text-field>
                                 </template>
                                 <v-date-picker v-model="editedEmployeePayment.paymentDate" scrollable>
                                   <v-spacer></v-spacer>
                                   <v-btn text color="primary" @click="employeePaymentDateModal = false">Cancel</v-btn>
                                   <v-btn text color="primary" @click="$refs.employeePaymentDateDialog.save(date)">OK</v-btn>
                                 </v-date-picker>
                               </v-dialog>
                             
                            </v-flex>
                           </v-layout>
                           <v-layout row v-if="editedEmployeePaymentIndex >= 0">
                             <v-flex xs12 sm9 offset-sm1>
                           
                               <v-dialog
                                  ref="employeePaymentDateReceivedDialog"
                                  v-model="employeePaymentDateReceivedModal"
                                  v-modal="date"
                                  persistent
                                  width="50%"
                                >
                                  <template v-slot:[`activator`]="{ on }">
                                    <v-text-field
                                      v-model="editedEmployeePayment.dateRecieved"
                                      label="Date Received"
                                      prepend-icon="event"
                                      readonly
                                      v-on="on"
                                    ></v-text-field>
                                  </template>
                                  <v-date-picker v-model="editedEmployeePayment.dateReceived" scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="employeePaymentDateReceivedModal = false">Cancel</v-btn>
                                    <v-btn text color="primary" @click="$refs.employeePaymentDateReceivedDialog.save(date)">OK</v-btn>
                                  </v-date-picker>
                                </v-dialog>
                            
                             </v-flex>
                            </v-layout>
  
                     </v-container>
                   </v-card-text>

                   <v-card-actions>
                     <v-spacer></v-spacer>
                     <v-btn color="blue darken-1" @click="closeEmployeePaymentDialog">Cancel</v-btn>
                     <v-btn color="blue darken-1" @click="saveEmployeePayment">Save</v-btn>
                   </v-card-actions>
                 </v-card>
               </v-dialog>
            -->
                            </v-card-title>
                            <v-card-text>
                                <h3>Payment Summary</h3>
                                <v-layout row v-if="employeePaymentSummary">
                                    
                                        <v-text-field v-model="employeePaymentSummary.totalPaymentCount"
                                            label="Payments Submitted" readonly></v-text-field>
                                   
                                </v-layout>
                                <v-layout row v-else>
                                    
                                        <span>Payment Count 0</span>
                                    
                                </v-layout>
                                <h3>Payment Details</h3>
                                <v-data-table :headers="employeePaymentTableHeaders" :calculate-widths="true"
                                    :items="employeePayments" :search="search">


                                    <template v-slot:[`item.actionEditEmployeePayment`]="{ item }">
                                        <v-btn icon @click="showEmployeePaymentEditDialog(item)">
                                            <v-icon>
                                                edit
                                            </v-icon>
                                        </v-btn>
                                    </template>

                                    <template v-slot:[`item.actionDeleteEmployeePayment`]="{ item }">
                                        <v-btn icon @click="deleteEmployeePayment(item)">
                                            <v-icon>
                                                delete
                                            </v-icon>
                                        </v-btn>
                                    </template>



                                </v-data-table>
                            </v-card-text>

                        </v-card>



                    </v-window-item>

                </v-window>

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

        const route = useRoute();

        const id = route.params.employeeId;
        console.log('id is ' + route.params.employeeId);

        onMounted(() => {
            store.dispatch('projects/loadProjects')
            store.dispatch('employees/loadEmployee', id)
            //store.dispatch('employees/loadEmployeeQuotationSummary', id)
            //store.dispatch('employees/loadEmployeeQuotations', id)
            //store.dispatch('employees/loadEmployeeInvoices', id)
            //store.dispatch('employees/loadEmployeeInvoiceSummary', id)

        });

        const tab = ref(null);
        const date = new Date().toISOString().substr(0, 10);
        const search = ref('');
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

        // employee
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

        // Quotations
        const employeeQuotationTableHeaders = [
            { title: 'Project', key: 'Project', value: 'projectName' },
            { title: 'Ref', key: 'Ref', value: 'quotationRef' },
            { title: 'Gross', key: 'Gross', value: 'grossAmount' },
            { title: 'Currency', key: 'Currency', value: 'currency' },
            { title: 'Issued', key: 'Issued', value: 'quotationDate', width: "125px" },
            { title: 'Status', key: 'Status', value: 'status' },
            { title: 'Download', key: 'Download', align: 'left', value: 'actionDownloadEmployeeQuotation' },
            { title: 'Edit', key: 'Edit', align: 'left', value: 'actionEditEmployeeQuotation' },
            { title: 'Delete', key: 'Delete', align: 'left', value: 'actionDeleteEmployeeQuotation' }
        ];
        const employeeQuotationDialog = ref(false);
        const employeeQuotationDateDialog = ref(false);
        const employeeQuotationDateModal = ref(false);
        const employeeQuotationDateReceivedDialog = ref(false);
        const employeeQuotationDateReceivedModal = ref(false);
        const editedEmployeeQuotationIndex = ref(-1);
        const editedEmployeeQuotation = reactive({
            id: '',
            employeeId: id,
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
        const defaultEmployeeQuotation = reactive({
            employeeId: id,
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
        const saveEmployeeQuotation = () => {
            if (editedEmployeeQuotationIndex.value > -1) {
                const formData = {
                    id: editedEmployeeQuotation.id,
                    employeeId: id,
                    projectId: editedEmployeeQuotation.projectId,
                    quotationRef: editedEmployeeQuotation.quotationRef,
                    status: editedEmployeeQuotation.status,
                    description: editedEmployeeQuotation.description,
                    currency: editedEmployeeQuotation.currency,
                    grossAmount: editedEmployeeQuotation.grossAmount,
                    netAmount: editedEmployeeQuotation.netAmount,
                    quotationDate: editedEmployeeQuotation.quotationDate,
                    dateReceived: editedEmployeeQuotation.dateReceived
                }
                console.log('Updating employee quotation details')
                console.log(formData)
                store.dispatch('employees/updateEmployeeQuotation', formData)
            } else {
                console.log('Creating new employee quotation details')
                const formData = {
                    employeeId: id,
                    projectId: editedEmployeeQuotation.projectId,
                    quotationRef: editedEmployeeQuotation.quotationRef,
                    description: editedEmployeeQuotation.description,
                    status: editedEmployeeQuotation.status,
                    currency: editedEmployeeQuotation.currency,
                    grossAmount: editedEmployeeQuotation.grossAmount,
                    netAmount: editedEmployeeQuotation.netAmount,
                    quotationDate: editedEmployeeQuotation.quotationDate,
                    quotationFile: editedEmployeeQuotation.quotationFile
                }
                console.log(formData)
                store.dispatch('employees/createEmployeeQuotation', formData)
            }
            closeEmployeeQuotationDialog()
            save()
        };
        const showEmployeeQuotationEditDialog = (item) => {
            console.log('Showing Edit Quotation Dialog for operative with id ' + item.id)
            //editedEmployeeQuotationIndex.value = employeeQuotations.value.indexOf(item)
            editedEmployeeQuotation.value = Object.assign({}, item)
            employeeQuotationDialog.value = true
        };
        const closeEmployeeQuotationDialog = () => {
            employeeQuotationDialog.value = false
            setTimeout(() => {
                editedEmployeeQuotation.value = Object.assign({}, defaultEmployeeQuotation)
                editedEmployeeQuotationIndex.value = -1
            }, 300)
        };
        const downloadEmployeeQuotation = (item) => {
            console.log('downloading item requested..')
            console.log(item)
            store.dispatch('downloadEmployeeQuotation', item)
        };
        const deleteEmployeeQuotation = (item) => {
            console.log('Delete EmployeeQuotation Event Received..')
            const formData = {
                id: item.id,
                employeeId: id
            }
            console.log(formData)
            store.dispatch('deleteEmployeeQuotation', formData)
        };

        // invoices

        const employeeInvoiceTableHeaders = ref([
            { title: 'Project', key: 'Project', value: 'projectName' },
            { title: 'Ref', key: 'Ref', value: 'invoiceRef' },
            { title: 'Status', key: 'Status', value: 'status' },
            { title: 'Currency', key: 'Currency', value: 'currency' },
            { title: 'Gross', key: 'Gross', value: 'grossAmount' },
            { title: 'Net', key: 'Net', value: 'netAmount' },
            { title: 'Issued', key: 'Issued', value: 'invoiceDate' },
            { title: 'Payment Due', key: 'PaymentDueDate', value: 'paymentDueDate', width: "125px" },
            { title: 'Download', key: 'Download', align: 'left', value: 'actionDownloadEmployeeInvoice' },
            { title: 'Edit', key: 'Edit', align: 'left', value: 'actionEditEmployeeInvoice' },
            { title: 'Delete', key: 'Delete', align: 'left', value: 'actionDeleteEmployeeInvoice' }
        ]);
        const employeeInvoiceDialog = ref(false);
        const employeeInvoicePaymentDialog = ref(false);
        const employeeInvoiceDateDialog = ref(false);
        const employeeInvoiceDateModal = ref(false);
        const employeeInvoicePaymentDueDateDialog = ref(false);
        const employeeInvoicePaymentDueDateModal = ref(false);
        const invoiceStatusListSelection = [
            { text: 'Issued', value: 'ISSUED' },
            { text: 'Awaiting Payment', value: 'AWAITING_PAYMENT' },
            { text: 'Un Paid', value: 'UNPAID' },
            { text: 'Paid', value: 'PAID' }
        ];
        const editedEmployeeInvoiceIndex = ref(-1);
        const defaultEmployeeInvoice = reactive({
            id: '',
            employeeId: id,
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
        const editedEmployeeInvoice = reactive({
            id: '',
            employeeId: id,
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
        const showEmployeeInvoiceEditDialog = (item) => {
            console.log('Showing Edit Invoice Dialog for operative with id ' + item.id)
            editedEmployeeInvoiceIndex.value = employeeInvoices.value.indexOf(item)
            editedEmployeeInvoice.value = Object.assign({}, item)
            employeeInvoiceDialog.value = true
        };
        const closeEmployeeInvoiceDialog = () => {
            employeeInvoiceDialog.value = false
            setTimeout(() => {
                editedEmployeeInvoice.value = Object.assign({}, defaultEmployeeInvoice)
                editedEmployeeInvoiceIndex.value = -1
            }, 300)
        };
        const saveEmployeeInvoice = () => {
            if (editedEmployeeInvoiceIndex.value > -1) {
                const formData = {
                    id: id.value,
                    employeeId: id,
                    projectId: editedEmployeeInvoice.projectId.value,
                    invoiceRef: editedEmployeeInvoice.invoiceRef,
                    status: editedEmployeeInvoice.status,
                    description: editedEmployeeInvoice.description,
                    currency: editedEmployeeInvoice.currency,
                    grossAmount: editedEmployeeInvoice.grossAmount,
                    netAmount: editedEmployeeInvoice.netAmount,
                    invoiceDate: editedEmployeeInvoice.invoiceDate,
                    paymentDueDate: editedEmployeeInvoice.paymentDueDate
                }
                console.log('Updating employee invoice details')
                console.log(formData)
                store.dispatch('employees/updateEmployeeInvoice', formData)
                    .then(
                        setTimeout(() => {
                            store.dispatch('employees/loadEmployeeInvoiceSummary', id)
                        }, 300)
                    )
            } else {
                console.log('Creating new employee invoice details')
                const formData = {
                    employeeId: id,
                    projectId: editedEmployeeInvoice.projectId,
                    invoiceRef: editedEmployeeInvoice.invoiceRef,
                    description: editedEmployeeInvoice.description,
                    status: editedEmployeeInvoice.status,
                    currency: editedEmployeeInvoice.currency,
                    grossAmount: editedEmployeeInvoice.grossAmount,
                    netAmount: editedEmployeeInvoice.netAmount,
                    invoiceDate: editedEmployeeInvoice.invoiceDate,
                    paymentDueDate: editedEmployeeInvoice.paymentDueDate,
                    invoiceFile: editedEmployeeInvoice.invoiceFile
                }
                console.log(formData)
                store.dispatch('employees/createEmployeeInvoice', formData)
            }
            closeEmployeeInvoiceDialog()
            save()
        };
        const employeePaymentDialog = ref(false);
        const employeePaymentDateDialog = ref(false);
        const employeePaymentDateModal = ref(false);
        const employeePaymentDateReceivedDialog = ref(false);
        const employeePaymentDateReceivedModal = ref(false);
        const editedEmployeePaymentIndex = ref(-1);
        const editedEmployeePayment = reactive({
            id: '',
            employeeId: id,
            projectId: '',
            paymentRef: '',
            description: '',
            currency: '',
            netAmount: '',
            paymentDate: null,
            dateReceived: null,
            status: ''
        });
        const defaultEmployeePayment = reactive({
            employeeId: id,
            projectId: '',
            paymentRef: '',
            description: '',
            currency: '',
            netAmount: '',
            paymentDate: null,
            paymentDueDate: null,
            status: ''
        });

        const employeePaymentTableHeaders = [
            { title: 'Project', key: 'Project', value: 'projectName' },
            { title: 'InvoiceRef', key: 'InvoiceRef', value: 'invoiceRef' },
            { title: 'Net', key: 'Net', value: 'netAmount' },
            { title: 'Currency', key: 'Currency', value: 'currency' },
            { title: 'Payment Ref', key: 'PaymentRef', value: 'paymentRef' },
            { title: 'Payment Date', key: 'PaymentDate', value: 'paymentDate', width: "125px" },
            { title: 'Status', key: 'Status', value: 'status' },
            { title: 'Download', key: 'Download', align: 'left', value: 'actionDownloadEmployeePayment' },
            { title: 'Edit', align: 'left', key: 'Edit', value: 'actionEditEmployeePayment' },
            { title: 'Delete', align: 'left', key: 'Delete', value: 'actionDeleteEmployeePayment' }
        ];

        const error = computed(() => store.getters['users/error']);
        const userIsAuthenticatedAndHasRoleAdmin = computed(() => store.getters['users/userIsAuthenticatedAndHasRoleAdmin']);
        const employee = computed(() => store.getters['employees/loadedEmployee']);
        const employeeQuotationSummary = computed(() => store.getters['employees/loadedEmployeeQuotationSummary']);
        const employeeQuotations = computed(() => store.getters['employees/loadedEmployeeQuotations']);
        const employeeInvoiceSummary = computed(() => store.getters['employees/loadedEmployeeInvoiceSummary']);
        const employeeInvoices = computed(() => store.getters['employees/loadedEmployeeInvoices']);
        const employeePayments = computed(() => store.getters['employees/loadedEmployeePayments']);
        const employeePaymentSummary = computed(() => store.getters['employees/loadedEmployeePaymentsSummary']);

        const employeePaymentsReceivedSummary = computed(() => store.getters['employees/loadedEmployeePaymentsReceivedSummary']);
        const employeePaymentsReceived = computed(() => store.getters['employees/loadedEmployeePaymentsReceived']);
        
        const projects = computed(() => store.getters['projects/loadedProject']);

        const projectListSelection = projects.value;
        
        /*
        .forEach(function (item) {
           console.log("Project selection list adding " + item.id)
          return { text: item.name, value: item.id }
     })*/

        const onUpdateEmployee = () => {
            console.log('Update Employee Event Received..')
            console.log(editedEmployee)
            store.dispatch('employees/updateEmployee', editedEmployee)
            save()
        };

        watch(employee, (newValue, oldValue) => {
            console.log('computedProperty was ' + oldValue + '. Now it is ' + JSON.stringify(newValue) + '.')
            console.log('setting edited employee..')
            const rawObject = JSON.parse(JSON.stringify(newValue))
            Object.assign(editedEmployee, rawObject);
            console.log(editedEmployee)
        })



        return {
            id,
            userIsAuthenticatedAndHasRoleAdmin,
            employee,
            onUpdateEmployee,
            editedEmployee,
            error,
            employeeInvoices,
            employeeInvoiceSummary,
            employeeQuotations,
            employeeQuotationSummary,
            projectListSelection,
            employeePayments,
            employeePaymentSummary,
            employeePaymentsReceivedSummary,
            employeePaymentsReceived,
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
            defaultEmployeeQuotation,
            editedEmployeeQuotation,
            editedEmployeeQuotationIndex,
            employeeQuotationTableHeaders,
            employeeQuotationDialog,
            employeeQuotationDateDialog,
            employeeQuotationDateModal,
            employeeQuotationDateReceivedDialog,
            employeeQuotationDateReceivedModal,
            showEmployeeQuotationEditDialog,
            closeEmployeeQuotationDialog,
            saveEmployeeQuotation,
            downloadEmployeeQuotation,
            deleteEmployeeQuotation,
            employeeInvoiceTableHeaders,
            employeeInvoiceDialog,
            employeeInvoicePaymentDialog,
            employeeInvoiceDateDialog,
            employeeInvoiceDateModal,
            employeeInvoicePaymentDueDateDialog,
            employeeInvoicePaymentDueDateModal,
            invoiceStatusListSelection,
            defaultEmployeeInvoice,
            showEmployeeInvoiceEditDialog,
            closeEmployeeInvoiceDialog,
            saveEmployeeInvoice,
            employeePaymentTableHeaders,
            employeePaymentDialog,
            employeePaymentDateDialog,
            employeePaymentDateModal,
            employeePaymentDateReceivedDialog,
            employeePaymentDateReceivedModal,
            editedEmployeePaymentIndex,
            editedEmployeePayment,
            defaultEmployeePayment,
        }
    }
}
</script>
  