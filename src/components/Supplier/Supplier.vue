<template>
  <v-container fluid>
    <v-card>
      <v-tabs v-model="outerTab" show-arrows>
        <v-tabs-slider color="blue"></v-tabs-slider>
        <v-tab href="#outerTab-1">
          Supplier Details
        </v-tab>
        <v-tab href="#outerTab-2" v-if="userIsAuthenticatedAndHasRoleAdmin">
          Quotations
        </v-tab>
        <v-tab href="#outerTab-4" v-if="userIsAuthenticatedAndHasRoleAdmin">
          Products
        </v-tab>
        <v-tab href="#outerTab-3">
          Product Invoices
        </v-tab>
        
        <v-tab href="#outerTab-5" v-if="userIsAuthenticatedAndHasRoleAdmin">
          Product Orders
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="outerTab">
        <v-tab-item key="1" :value="'outerTab-' + 1">
          <v-card>
            <v-card-title>
              Supplier Details
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text>
              <v-layout row>
                <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
                  {{ snackText }}
                  <v-btn text @click="snack = false">Close</v-btn>
                </v-snackbar>
              </v-layout row>

              <v-layout row>
                <v-flex xs12>
                  <form @submit.prevent="onUpdateSupplier">
                    <v-layout row>
                      <v-flex xs12 sm6 offset-sm3>
                        <v-select :items="supplierCategories" v-model="editedSupplier.supplierCategoryId"
                          label="Category" item-value="id" item-text="name" required></v-select>
                      </v-flex>
                    </v-layout>
                
                    <v-layout wrap>
                    <v-flex xs12 sm6 offset-sm3>
                      <v-select
                      v-model="editedSupplier.productCategoryList"
                      :items="productCategories"
                      multiple
                      item-value="id"
                      item-text="name"
                      label="Select Product Categories">
                      </v-select>
                    </v-flex>
             </v-layout>
                    <v-layout row>
                      <v-flex xs12 sm6 offset-sm3>
                        <v-text-field name="supplierName" label="Supplier Name" id="supplierName"
                          v-model="editedSupplier.name" required></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex xs12 sm6 offset-sm3>
                        <v-textarea name="supplierDescription" label="Supplier Description" id="supplierDescription"
                          v-model="editedSupplier.description" required></v-textarea>
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex xs12 sm6 offset-sm3>
                        <v-textarea name="supplierAddress" label="Supplier Address" id="supplierAddress"
                          v-model="editedSupplier.address" required></v-textarea>
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex xs12 sm6 offset-sm3>
                        <v-text-field name="supplierWebsite" label="Supplier Website" id="supplierWebsite"
                          v-model="editedSupplier.website">
                        </v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex xs12 sm6 offset-sm3>
                        <v-text-field name="supplierEmail" label="Supplier Email" id="supplierEmail"
                          v-model="editedSupplier.email">
                        </v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex xs12 sm6 offset-sm3>
                        <v-text-field name="supplierContactName" label="Contact Name" id="supplierContactName"
                          v-model="editedSupplier.contact">
                        </v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex xs12 sm6 offset-sm3>
                        <v-text-field name="supplierContactNumber" label="Contact Number" id="supplierContactNumber"
                          v-model="editedSupplier.contactNumber">
                        </v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex xs12 sm6 offset-sm3>
                        <v-text-field name="supplierHeadOfficeTelephoneNumber" label="Head Office TelephoneNumber"
                          id="supplierHeadOfficeTelephoneNumber" v-model="editedSupplier.landline">
                        </v-text-field>
                      </v-flex>
                    </v-layout>

                    <v-layout row>
                      <v-flex xs12 sm6 offset-sm6>
                        <v-btn class="primary" :disabled="!formIsValid" type="submit">Update Details</v-btn>
                      </v-flex>
                    </v-layout>
                  </form>
                </v-flex>
              </v-layout>


            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item key="2" :value="'outerTab-' + 2">
          <v-card>
            <v-card-title>

              <v-spacer></v-spacer>
              <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details>
              </v-text-field>
              <v-spacer></v-spacer>
              <v-dialog v-model="supplierQuotationDialog">
                <template v-slot:activator="{ on }">
                  <v-btn absolute right fab dark color="indigo" v-on="on">
                    <v-icon dark>add</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span>Quotation Details</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-layout row>
                        <v-flex xs12 sm6 offset-sm1>
                          <v-select :items="projectListSelection" v-model="editedSupplierQuotation.projectId"
                            label="Select Project" single></v-select>
                        </v-flex>
                      </v-layout>
                      <v-layout row>
                        <v-flex xs12 sm9 offset-sm1>
                          <v-text-field v-model="editedSupplierQuotation.quotationRef" label="Reference"></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout row v-show="editedSupplierQuotationIndex >= 0">
                        <v-flex xs12 sm9 offset-sm1>
                          <v-text-field v-model="editedSupplierQuotation.status" label="Status"></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout row>
                        <v-flex xs12 sm9 offset-sm1>
                          <v-textarea name="description" label="Description" id="description"
                            v-model="editedSupplierQuotation.description" required>
                          </v-textarea>
                        </v-flex>
                      </v-layout>
                      <v-layout row>
                        <v-flex xs12 sm9 offset-sm1>
                          <v-text-field v-model="editedSupplierQuotation.currency" label="Currency"></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout row>
                        <v-flex xs12 sm9 offset-sm1>
                          <v-text-field v-model="editedSupplierQuotation.grossAmount" label="Gross Amount">
                          </v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout row>
                        <v-flex xs12 sm9 offset-sm1>
                          <v-text-field v-model="editedSupplierQuotation.netAmount" label="Net Amount"></v-text-field>
                        </v-flex>
                      </v-layout>

                      <v-layout row>
                        <v-flex xs12 sm9 offset-sm1>
                          <v-dialog ref="supplierQuotationDateDialog" v-model="supplierQuotationDateModal"
                            :return-value.sync="date" persistent width="50%">
                            <template v-slot:activator="{ on }">
                              <v-text-field v-model="editedSupplierQuotation.quotationDate" label="Date Issued"
                                prepend-icon="event" readonly v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="editedSupplierQuotation.quotationDate" scrollable>
                              <v-spacer></v-spacer>
                              <v-btn text color="primary" @click="supplierQuotationDateModal = false">Cancel</v-btn>
                              <v-btn text color="primary" @click="$refs.supplierQuotationDateDialog.save(date)">OK
                              </v-btn>
                            </v-date-picker>
                          </v-dialog>
                        </v-flex>
                      </v-layout>
                      <v-layout row v-if="editedSupplierQuotationIndex >= 0">
                        <v-flex xs12 sm9 offset-sm1>
                          <v-dialog ref="supplierQuotationDateReceivedDialog"
                            v-model="supplierQuotationDateReceivedModal" :return-value.sync="date" persistent
                            width="50%">
                            <template v-slot:activator="{ on }">
                              <v-text-field v-model="editedSupplierQuotation.dateRecieved" label="Date Received"
                                prepend-icon="event" readonly v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="editedSupplierQuotation.dateReceived" scrollable>
                              <v-spacer></v-spacer>
                              <v-btn text color="primary" @click="supplierQuotationDateReceivedModal = false">Cancel
                              </v-btn>
                              <v-btn text color="primary" @click="$refs.supplierQuotationDateReceivedDialog.save(date)">
                                OK</v-btn>
                            </v-date-picker>
                          </v-dialog>
                        </v-flex>
                      </v-layout>
                      <v-layout row v-if="editedSupplierQuotationIndex < 0">
                        <v-flex xs12 sm9 offset-sm1>
                          <v-file-input v-model="editedSupplierQuotation.quotationFile" label="Upload Quotation" filled
                            prepend-icon="mdi-camera"></v-file-input>
                        </v-flex>
                      </v-layout>

                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" @click.native="closeSupplierQuotationDialog">Cancel</v-btn>
                    <v-btn color="blue darken-1" @click.native="saveSupplierQuotation">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-title>
            <v-card-text>
              <h3>Quotation Summary</h3>
              <v-layout row v-if="supplierQuotationSummary">
                <v-flex xs4 sm3 offset-sm1>
                  <v-text-field v-model="supplierQuotationSummary.totalQuotationCount" label="Quotations Submitted"
                    readonly></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row v-else>
                <v-flex xs4 sm3 offset-sm1>
                  <span>Quotation Count 0</span>
                </v-flex>
              </v-layout>
              <h3>Quotation Details</h3>
              <v-data-table :headers="supplierQuotationTableHeaders" :calculate-widths="true"
                :items="supplierQuotations" :search="search">

                <template v-slot:item.actionDownloadSupplierQuotation="{ item }">
                  <v-btn icon @click.native="downloadSupplierQuotation(item)">
                    <v-icon>
                      cloud_download
                    </v-icon>
                  </v-btn>
                </template>

                <template v-slot:item.actionEditSupplierQuotation="{ item }">
                  <v-btn icon @click.native="showSupplierQuotationEditDialog(item)">
                    <v-icon>
                      edit
                    </v-icon>
                  </v-btn>
                </template>

                <template v-slot:item.actionDeleteSupplierQuotation="{ item }">
                  <v-btn icon @click.native="deleteSupplierQuotation(item)">
                    <v-icon>
                      delete
                    </v-icon>
                  </v-btn>
                </template>

              </v-data-table>
            </v-card-text>

          </v-card>
        </v-tab-item>
        <v-tab-item key="3" :value="'outerTab-' + 3">
          <v-card>
            <v-card-title>

              <v-spacer></v-spacer>
              <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details>
              </v-text-field>
              <v-spacer></v-spacer>
              <v-dialog v-model="supplierInvoiceDialog">
                <template v-slot:activator="{ on }">
                  <v-btn absolute right fab dark color="indigo" v-on="on">
                    <v-icon dark>add</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span>Invoice Details</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-layout row>
                        <v-flex xs12 sm12 offset-sm1>
                          <v-select :items="projectListSelection" v-model="editedSupplierInvoice.projectId"
                            label="Select Project" single></v-select>
                        </v-flex>
                      </v-layout row>
                      <v-layout row>
                        <v-flex xs4 sm5 offset-sm1>
                          <v-text-field v-model="editedSupplierInvoice.invoiceRef" label="Reference"></v-text-field>
                        </v-flex>

                        <v-flex xs4 sm5 offset-sm1>
                          <v-select :items="invoiceStatusListSelection" v-model="editedSupplierInvoice.status"
                            label="Status" single></v-select>
                        </v-flex>
                      </v-layout>
                      <v-layout row>
                        <v-flex xs12 sm12 offset-sm1>
                          <v-textarea name="description" label="Description" id="description"
                            v-model="editedSupplierInvoice.description" required>
                          </v-textarea>
                        </v-flex>
                      </v-layout>
                      <v-layout row>
                        <v-flex xs12 sm3 offset-sm1>
                          <v-text-field v-model="editedSupplierInvoice.currency" label="Currency"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm3 offset-sm1>
                          <v-text-field v-model="editedSupplierInvoice.grossAmount" label="Gross Amount"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm3 offset-sm1>
                          <v-text-field v-model="editedSupplierInvoice.netAmount" label="Net Amount"></v-text-field>
                        </v-flex>
                      </v-layout>

                      <v-layout row>
                        <v-flex xs4 sm5 offset-sm1>
                          <v-dialog ref="supplierInvoiceDateDialog" v-model="supplierInvoiceDateModal"
                            :return-value.sync="date" persistent width="50%">
                            <template v-slot:activator="{ on }">
                              <v-text-field v-model="editedSupplierInvoice.invoiceDate" label="Date Issued"
                                prepend-icon="event" readonly v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="editedSupplierInvoice.invoiceDate" scrollable>
                              <v-spacer></v-spacer>
                              <v-btn text color="primary" @click="supplierInvoiceDateModal = false">Cancel</v-btn>
                              <v-btn text color="primary" @click="$refs.supplierInvoiceDateDialog.save(date)">OK</v-btn>
                            </v-date-picker>
                          </v-dialog>
                        </v-flex>
                        <v-flex xs4 sm5 offset-sm1>
                          <v-dialog ref="supplierInvoicePaymentDueDateDialog"
                            v-model="supplierInvoicePaymentDueDateModal" :return-value.sync="date" persistent
                            width="50%">
                            <template v-slot:activator="{ on }">
                              <v-text-field v-model="editedSupplierInvoice.paymentDueDate" label="Payment Due Date"
                                prepend-icon="event" readonly v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="editedSupplierInvoice.paymentDueDate" scrollable>
                              <v-spacer></v-spacer>
                              <v-btn text color="primary" @click="supplierInvoicePaymentDueDateModal = false">Cancel
                              </v-btn>
                              <v-btn text color="primary" @click="$refs.supplierInvoicePaymentDueDateDialog.save(date)">
                                OK</v-btn>
                            </v-date-picker>
                          </v-dialog>
                        </v-flex>
                      </v-layout>

                      <v-layout row v-if="editedSupplierInvoiceIndex < 0">
                        <v-flex xs12 sm12 offset-sm1>
                          <v-file-input v-model="editedSupplierInvoice.invoiceFile" label="Upload Invoice" filled
                            prepend-icon="mdi-camera"></v-file-input>
                        </v-flex>
                      </v-layout>

                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" @click.native="closeSupplierInvoiceDialog">Cancel</v-btn>
                    <v-btn color="blue darken-1" @click.native="saveSupplierInvoice">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

            </v-card-title>
            <v-card-text>
              <h3>Invoice Summary</h3>
              <v-layout row v-if="supplierInvoiceSummary">
                <v-flex xs4 sm3 offset-sm1>
                  <v-text-field v-model="supplierInvoiceSummary.totalInvoiceCount" label="Total Invoice Count" readonly>
                  </v-text-field>
                </v-flex>
                <v-flex xs3 sm2 offset-sm1>
                  <v-text-field v-model="supplierInvoiceSummary.invoicesGrossAmountTotal" label="Invoice Total Gross"
                    readonly></v-text-field>
                </v-flex>
                <v-flex xs3 sm2 offset-sm1>
                  <v-text-field v-model="supplierInvoiceSummary.invoicesNetAmountTotal" label="Invoice Total Net"
                    readonly></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row v-if="supplierInvoiceSummary">
                <v-flex xs4 sm3 offset-sm1>
                  <v-text-field v-model="supplierInvoiceSummary.unPaidInvoicesCount" label="Un Paid Invoices" readonly>
                  </v-text-field>
                </v-flex>
                <v-flex xs4 sm3 offset-sm1>
                  <v-text-field v-model="supplierInvoiceSummary.unPaidInvoicesGrossAmount"
                    label="Invoice Total Gross (to Pay)" readonly></v-text-field>
                </v-flex>
                <v-flex xs4 sm3 offset-sm1>
                  <v-text-field v-model="supplierInvoiceSummary.unPaidInvoicesNetAmount"
                    label="Invoice Total Net (to Pay)" readonly></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row v-if="supplierInvoiceSummary">
                <v-flex xs4 sm3 offset-sm1>
                  <v-text-field v-model="supplierInvoiceSummary.paidInvoicesCount" label="Paid Invoices" readonly>
                  </v-text-field>
                </v-flex>
                <v-flex xs4 sm3 offset-sm1>
                  <v-text-field v-model="supplierInvoiceSummary.paidInvoicesGrossAmount"
                    label="Invoice Total Gross (Paid)" readonly></v-text-field>
                </v-flex>
                <v-flex xs4 sm3 offset-sm1>
                  <v-text-field v-model="supplierInvoiceSummary.paidInvoicesNetAmount" label="Invoice Total Net (Paid)"
                    readonly></v-text-field>
                </v-flex>
              </v-layout>
              <h3>Invoice Details</h3>
              <v-data-table :headers="supplierInvoiceTableHeaders" :calculate-widths="true" :items="supplierInvoices"
                :search="search">

                <template v-slot:item.actionDownloadSupplierInvoice="{ item }">
                  <v-btn icon @click.native="downloadSupplierInvoice(item)">
                    <v-icon>
                      cloud_download
                    </v-icon>
                  </v-btn>
                </template>

                <template v-slot:item.actionEditSupplierInvoice="{ item }">
                  <v-btn icon @click.native="showSupplierInvoiceEditDialog(item)">
                    <v-icon>
                      edit
                    </v-icon>
                  </v-btn>
                </template>

                <template v-slot:item.actionDeleteSupplierInvoice="{ item }">
                  <v-btn icon @click.native="deleteSupplierInvoice(item)">
                    <v-icon>
                      delete
                    </v-icon>
                  </v-btn>
                </template>

              </v-data-table>
            </v-card-text>

          </v-card>
        </v-tab-item>
 


        <v-tab-item key="4" :value="'outerTab-' + 4">
          <v-card>
            <v-card-title>
            </v-card-title>
            <v-data-table :headers="productTableHeaders" :items="supplierProducts" :search="search">
              <template v-slot:item.cost="props">
                <v-edit-dialog :return-value.sync="props.item.cost" large persistent @save="save(props.item)"
                  @cancel="cancel" @open="open" @close="close">
                  <div>{{ props.item.cost }}</div>
                  <template v-slot:input>
                    <div class="mt-4 title">Update Cost</div>
                  </template>
                  <template v-slot:input>
                    <v-text-field v-model="props.item.cost" label="Edit" single-line counter autofocus></v-text-field>
                  </template>
                </v-edit-dialog>
              </template>

              <template v-slot:item.leadInTimeInDays="props">
                <v-edit-dialog :return-value.sync="props.item.leadInTimeInDays" large persistent
                  @save="save(props.item)" @cancel="cancel" @open="open" @close="close">
                  <div>{{ props.item.leadInTimeInDays }}</div>
                  <template v-slot:input>
                    <div class="mt-4 title">Update Lead In Time</div>
                  </template>
                  <template v-slot:input>
                    <v-text-field v-model="props.item.leadInTimeInDays" label="Edit" single-line counter autofocus>
                    </v-text-field>
                  </template>
                </v-edit-dialog>
              </template>
            </v-data-table>
          </v-card>
        </v-tab-item>


        <v-tab-item key="5" :value="'outerTab-' + 5">
          <v-card>
            <v-card-title>
            </v-card-title>
            <v-data-table :headers="orderTableHeaders" :items="orders" :search="search">
            </v-data-table>
          </v-card>
        </v-tab-item>
      </v-tabs-items>

    </v-card>
  </v-container>
</template>

<script>
export default {
  props: ['id'],
  mounted() {
    this.$store.dispatch('loadSupplierProducts', this.id)
    this.$store.dispatch('loadSupplierQuotations', this.id)
    this.$store.dispatch('loadSupplierQuotationSummary', this.id)
    this.$store.dispatch('loadSupplierOrders', this.id)
    this.$store.dispatch('loadSupplierInvoices', this.id)
    this.$store.dispatch('loadSupplierInvoiceSummary', this.id)

  },
  beforeUpdate() {
    this.editedSupplier = this.supplier
  },
  data() {
    return {
      outerTab: null,
      date: new Date().toISOString().substr(0, 10),
      snack: false,
      snackColor: '',
      snackText: '',
      editedSupplier: {
        id: '',
        supplierCategoryId: '',
        productCategoryList: [],
        name: '',
        description: '',
        address: '',
        eamil: '',
        website: '',
        contactName: '',
        contactNumber: '',
        landline: '',
        companyRegistrationNumber: '',
        vatRegistered: false,
        vatNumber: '',
        biq: '',
        ban: '',
        bankAccountNumber: ''
      },
      supplierTableHeaders: [
        {
          text: 'Id',
          align: 'left',
          sortable: true,
          align: ' d-none',
          value: 'productCategoryId'
        },
        {
          text: 'Category',
          align: 'left',
          sortable: true,
          value: 'productCategoryName'
        },
        {
          text: 'Name',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        { text: 'Description', value: 'description' },
        { text: 'Manufacturer', value: 'manufacturer' },
        { text: 'Product Code', value: 'productCode' },
        { text: 'Product Standard', value: 'productStandard' },
        { text: 'Image', value: 'imageUrl' },
        { text: 'Edit', align: 'left', value: 'actionEdit' },
        { text: 'Delete', align: 'left', value: 'actionDelete' }
      ],
      quotationTableHeaders: [
        {
          text: 'Name',
          align: 'left',
          sortable: true,
          value: 'productName'
        },
        { text: 'Cost', value: 'cost' },
        { text: 'Lead In (Days)', value: 'leadInTimeInDays' }
      ],
      productTableHeaders: [
      {
          text: 'Product',
          align: 'left',
          sortable: true,
          value: 'productName'
        },
        { text: 'Units', value: 'units' },
        { text: 'Unit Cost', value: 'cost' },
        { text: 'validTo', value: 'validTo' },
        { text: 'LeadInTimeInDays', value: 'leadInTimeInDays' },
      ],
      orderTableHeaders: [
        {
          text: 'Project',
          align: 'left',
          sortable: true,
          value: 'projectName'
        },
        {
          text: 'Product',
          align: 'left',
          sortable: true,
          value: 'productName'
        },
        { text: 'Quantity', value: 'quantity' },
        { text: 'Unit Cost', value: 'unitCost' },
        { text: 'Total Cost', value: 'totalCost' },
        { text: 'Delivery Date', value: 'deliveryDate' },
        { text: 'Status', value: 'status' },
      ],
      search: '',
      dialog: false,
      editedIndex: -1,
      editedItem: {
        id: '',
        productCategoryId: '',
        productCategoryName: '',
        name: '',
        description: '',
        manufacturer: '',
        productCode: '',
        standard: '',
        imageUrl: ''
      },
      defaultItem: {
        productCategoryId: '',
        productCategoryName: '',
        name: '',
        description: '',
        manufacturer: '',
        productCode: '',
        standard: '',
        imageUrl: ''
      },
      invoiceStatusListSelection: [
        { text: 'UNPAID', value: 'UNPAID' },
        { text: 'APPROVED_FOR_PAYMENT', value: 'APPROVED_FOR_PAYMENT' },
        { text: 'PAID', value: 'PAID' }
      ],
      supplierInvoiceTableHeaders: [
        { text: 'Project', value: 'projectName' },
        { text: 'Ref', value: 'invoiceRef' },
        { text: 'Description', value: 'description', width: "1%" },
        { text: 'Status', value: 'status' },
        { text: 'Currency', value: 'currency' },
        { text: 'Gross', value: 'grossAmount' },
        { text: 'Net', value: 'netAmount' },
        { text: 'Issued', value: 'invoiceDate' },
        { text: 'Payment Due', value: 'paymentDueDate', width: "125px" },
        { text: 'Download', align: 'left', value: 'actionDownloadSupplierInvoice' },
        { text: 'Approve', align: 'left', value: 'actionPaySupplierInvoice' },
        { text: 'Edit', align: 'left', value: 'actionEditSupplierInvoice' },
        { text: 'Delete', align: 'left', value: 'actionDeleteSupplierInvoice' }
      ],
      supplierInvoiceDialog: false,
      supplierInvoiceDateDialog: false,
      supplierInvoiceDateModal: false,
      supplierInvoicePaymentDueDateDialog: false,
      supplierInvoicePaymentDueDateModal: false,
      editedSupplierInvoiceIndex: -1,
      editedSupplierInvoice: {
        id: '',
        supplierId: this.id,
        projectId: '',
        invoiceRef: '',
        description: '',
        currency: '',
        netAmount: '',
        invoiceDate: null,
        paymentDueDate: null,
        invoiceFile: null,
        status: ''
      },
      defaultSupplierInvoice: {
        supplierId: this.id,
        projectId: '',
        invoiceRef: '',
        description: '',
        currency: '',
        netAmount: '',
        invoiceDate: null,
        paymentDueDate: null,
        invoiceFile: null,
        status: ''
      },
      formHasErrors: false,
      supplierQuotationTableHeaders: [
        { text: 'Project', value: 'projectName' },
        { text: 'Ref', value: 'quotationRef' },
        { text: 'Gross', value: 'grossAmount' },
        { text: 'Currency', value: 'currency' },
        { text: 'Issued', value: 'quotationDate', width: "125px" },
        { text: 'Status', value: 'status' },
        { text: 'Download', align: 'left', value: 'actionDownloadSupplierQuotation' },
        { text: 'Edit', align: 'left', value: 'actionEditSupplierQuotation' },
        { text: 'Delete', align: 'left', value: 'actionDeleteSupplierQuotation' }
      ],
      supplierQuotationDialog: false,
      supplierQuotationDateDialog: false,
      supplierQuotationDateModal: false,
      supplierQuotationDateReceivedDialog: false,
      supplierQuotationDateReceivedModal: false,
      editedSupplierQuotationIndex: -1,
      editedSupplierQuotation: {
        id: '',
        supplierId: this.id,
        projectId: '',
        quotationRef: '',
        description: '',
        currency: '',
        netAmount: '',
        quotationDate: null,
        dateReceived: null,
        quotationFile: null,
        status: ''
      },
      defaultSupplierQuotation: {
        supplierId: this.id,
        projectId: '',
        quotationRef: '',
        description: '',
        currency: '',
        netAmount: '',
        quotationDate: null,
        paymentDueDate: null,
        quotationFile: null,
        status: ''
      },

    }
  },
  computed: {
    productCategories() {
      return this.$store.getters.loadedProductCategories
    },
    supplierCategories() {
      return this.$store.getters.loadedSupplierCategories
    },
    supplierQuotationSummary() {
      return this.$store.getters.loadedSupplierQuotationSummary
    },
    supplierQuotations() {
      return this.$store.getters.loadedSupplierQuotations
    },
    supplierProducts() {
      return this.$store.getters.loadedSupplierProducts
    },
    orders() {
      return this.$store.getters.loadedSupplierOrders
    },
    projectListSelection() {
      return this.$store.getters.loadedProjects
        .map(function (item) {
          console.log("Project selection list adding " + item.id)
          return { text: item.name, value: item.id }
        })
    },
    supplierInvoiceSummary() {
      return this.$store.getters.loadedSupplierInvoiceSummary
    },
    supplierInvoices() {
      return this.$store.getters.loadedSupplierInvoices
    },
    supplier() {
      console.log('Loading product with id ' + this.id)
      return this.$store.getters.loadedSupplier(this.id)
    },
    error() {
      return this.$store.getters.error
    },
    formValidationError() {
      return this.$store.getters.formValidationError
    },
    loading() {
      return this.$store.getters.loading
    },
    userIsAuthenticatedAndHasRoleAdmin() {
      return this.$store.getters.userIsAuthenticatedAndHasRoleAdmin
    }
  },
  methods: {

    onUpdateSupplier() {
      console.log('Update Supplier Event Received..')
      console.log(this.editedSupplier)
      this.$store.dispatch('updateSupplier', this.editedSupplier)
      this.save()
    },
    saveSupplierQuotation() {
      if (this.editedSupplierQuotationIndex > -1) {
        const formData = {
          id: this.editedSupplierQuotation.id,
          supplierId: this.id,
          projectId: this.editedSupplierQuotation.projectId,
          quotationRef: this.editedSupplierQuotation.quotationRef,
          status: this.editedSupplierQuotation.status,
          description: this.editedSupplierQuotation.description,
          currency: this.editedSupplierQuotation.currency,
          grossAmount: this.editedSupplierQuotation.grossAmount,
          netAmount: this.editedSupplierQuotation.netAmount,
          quotationDate: this.editedSupplierQuotation.quotationDate,
          dateReceived: this.editedSupplierQuotation.dateReceived
        }
        console.log('Updating subcontractor quotation details')
        console.log(this.formData)
        this.$store.dispatch('updateSupplierQuotation', formData)
          .then(
            setTimeout(() => {
              this.$store.dispatch('loadSupplierQuotationSummary', this.id)
            }, 300)
          )
      } else {
        console.log('Creating new subcontractor quotation details')
        const formData = {
          supplierId: this.id,
          projectId: this.editedSupplierQuotation.projectId,
          quotationRef: this.editedSupplierQuotation.quotationRef,
          description: this.editedSupplierQuotation.description,
          status: this.editedSupplierQuotation.status,
          currency: this.editedSupplierQuotation.currency,
          grossAmount: this.editedSupplierQuotation.grossAmount,
          netAmount: this.editedSupplierQuotation.netAmount,
          quotationDate: this.editedSupplierQuotation.quotationDate,
          quotationFile: this.editedSupplierQuotation.quotationFile
        }
        console.log(formData)
        this.$store.dispatch('createSupplierQuotation', formData)
          .then(
            setTimeout(() => {
              this.$store.dispatch('loadSupplierQuotationSummary', this.id)
            }, 300)
          )

      }
      this.closeSupplierQuotationDialog()
      this.save()
    },
    showSupplierQuotationEditDialog(item) {
      console.log('Showing Edit Quotation Dialog for operative with id ' + item.id)
      this.editedSupplierQuotationIndex = this.supplierQuotations.indexOf(item)
      this.editedSupplierQuotation = Object.assign({}, item)
      this.supplierQuotationDialog = true
    },
    closeSupplierQuotationDialog() {
      this.supplierQuotationDialog = false
      setTimeout(() => {
        this.editedSupplierQuotation = Object.assign({}, this.defaultContractorQuotation)
        this.editedSupplierQuotationIndex = -1
      }, 300)
    },
    downloadSupplierQuotation(item) {
      console.log('downloading item requested..')
      console.log(item)
      this.$store.dispatch('downloadSupplierQuotation', item)
    },
    deleteSupplierQuotation(item) {
      console.log('Delete SupplierQuotation Event Received..')
      const formData = {
        id: item.id,
        supplierId: this.id
      }
      console.log(formData)
      this.$store.dispatch('deleteSupplierQuotation', formData)
    },

    saveSupplierInvoice() {
      if (this.editedSupplierInvoiceIndex > -1) {
        const formData = {
          id: this.editedSupplierInvoice.id,
          supplierId: this.id,
          projectId: this.editedSupplierInvoice.projectId,
          invoiceRef: this.editedSupplierInvoice.invoiceRef,
          status: this.editedSupplierInvoice.status,
          description: this.editedSupplierInvoice.description,
          currency: this.editedSupplierInvoice.currency,
          grossAmount: this.editedSupplierInvoice.grossAmount,
          netAmount: this.editedSupplierInvoice.netAmount,
          invoiceDate: this.editedSupplierInvoice.invoiceDate,
          paymentDueDate: this.editedSupplierInvoice.paymentDueDate
        }
        console.log('Updating supplier invoice details')
        console.log(this.formData)
        this.$store.dispatch('updateSupplierInvoice', formData)
          .then(
            setTimeout(() => {
              this.$store.dispatch('loadSupplierInvoiceSummary', this.id)
            }, 300)
          )
      } else {
        console.log('Creating new supplier invoice details')
        const formData = {
          supplierId: this.id,
          projectId: this.editedSupplierInvoice.projectId,
          invoiceRef: this.editedSupplierInvoice.invoiceRef,
          description: this.editedSupplierInvoice.description,
          status: this.editedSupplierInvoice.status,
          currency: this.editedSupplierInvoice.currency,
          grossAmount: this.editedSupplierInvoice.grossAmount,
          netAmount: this.editedSupplierInvoice.netAmount,
          invoiceDate: this.editedSupplierInvoice.invoiceDate,
          paymentDueDate: this.editedSupplierInvoice.paymentDueDate,
          invoiceFile: this.editedSupplierInvoice.invoiceFile
        }
        console.log(formData)
        this.$store.dispatch('createSupplierInvoice', formData)
          .then(
            setTimeout(() => {
              this.$store.dispatch('loadSupplierInvoiceSummary', this.id)
            }, 300)
          )
      }
      this.closeSupplierInvoiceDialog()
    },
    downloadSupplierInvoice(item) {
      console.log('downloading item requested..')
      console.log(item)
      this.$store.dispatch('downloadSupplierInvoice', item)
    },
    showSupplierInvoiceEditDialog(item) {
      console.log('Showing Edit Invoice Dialog for operative with id ' + item.id)
      this.editedSupplierInvoiceIndex = this.supplierInvoices.indexOf(item)
      this.editedSupplierInvoice = Object.assign({}, item)
      this.supplierInvoiceDialog = true
    },
    closeSupplierInvoiceDialog() {
      this.supplierInvoiceDialog = false
      setTimeout(() => {
        this.editedSupplierInvoice = Object.assign({}, this.defaultContractorInvoice)
        this.editedSupplierInvoiceIndex = -1
      }, 300)
    },
    save() {
      this.snack = true
      this.snackColor = 'success'
      this.snackText = 'Data saved successfully'
    },
    cancel() {
      this.snack = true
      this.snackColor = 'error'
      this.snackText = 'Canceled'
    },
    open() {
      this.snack = true
      this.snackColor = 'info'
      this.snackText = 'Dialog opened'
    },
    close() {
      console.log('Dialog closed')
    },
    editProduct(item) {
      this.editedIndex = this.products.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    updateProduct() {

      if (this.editedIndex === -1) {
        console.log('Creating products')
        console.log(this.editedItem)
        this.$store.dispatch('createProduct', this.editedItem)
      } else {
        console.log('Updating  products')
        console.log(this.editedItem)
        this.$store.dispatch('updateProduct', this.editedItem)
      }
      this.close()
    },
    deleteProduct(item) {
      console.log('Delete product Event Received..')
      console.log(item)
      this.$store.dispatch('deleteProduct', item)
    },
    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    onDismissed() {
      this.$store.dispatch('clearError')
    },
    formIsValid() {
      return true
    }
  }
}
</script>
