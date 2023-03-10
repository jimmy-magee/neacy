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

      <v-window v-model="outerTab">
        <v-window-item key="1" value="'outerTab-' + 1">
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
              </v-layout>

              <v-layout row>
                <v-flex xs12>
                  <form @submit.prevent="onUpdateSupplier">
                    <v-layout row>
                      <v-flex xs12 sm6 offset-sm3>
                        <v-select :items="supplierCategories" v-model="editedSupplier.supplierCategoryId" label="Category"
                          item-value="id" item-text="name" required></v-select>
                      </v-flex>
                    </v-layout>

                    <v-layout wrap>
                      <v-flex xs12 sm6 offset-sm3>
                        <v-select v-model="editedSupplier.productCategoryList" :items="productCategories" multiple
                          item-value="id" item-text="name" label="Select Product Categories">
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
        </v-window-item>
        <v-window-item key="2" value="'outerTab-' + 2">
          <v-card>
            <v-card-title>

              <v-spacer></v-spacer>
              <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details>
              </v-text-field>
              <v-spacer></v-spacer>
              <v-dialog v-model="supplierQuotationDialog">
                <template v-slot:[`activator`]="{ on }">
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
                             persistent width="50%">
                            <template v-slot:[`activator`]="{ on }">
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
                          <v-dialog ref="supplierQuotationDateReceivedDialog" v-model="supplierQuotationDateReceivedModal"
                             persistent width="50%">
                            <template v-slot:[`activator`]="{ on }">
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
                    <v-btn color="blue darken-1" @click="closeSupplierQuotationDialog">Cancel</v-btn>
                    <v-btn color="blue darken-1" @click="saveSupplierQuotation">Save</v-btn>
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
              <v-data-table :headers="supplierQuotationTableHeaders" :calculate-widths="true" :items="supplierQuotations"
                :search="search">

                <template v-slot:[`item.actionDownloadSupplierQuotation`]="{ item }">
                  <v-btn icon @click="downloadSupplierQuotation(item)">
                    <v-icon>
                      cloud_download
                    </v-icon>
                  </v-btn>
                </template>

                <template v-slot:[`item.actionEditSupplierQuotation`]="{ item }">
                  <v-btn icon @click="showSupplierQuotationEditDialog(item)">
                    <v-icon>
                      edit
                    </v-icon>
                  </v-btn>
                </template>

                <template v-slot:[`item.actionDeleteSupplierQuotation`]="{ item }">
                  <v-btn icon @click="deleteSupplierQuotation(item)">
                    <v-icon>
                      delete
                    </v-icon>
                  </v-btn>
                </template>

              </v-data-table>
            </v-card-text>

          </v-card>
        </v-window-item>
        <v-window-item key="3" value="'outerTab-' + 3">
          <v-card>
            <v-card-title>

              <v-spacer></v-spacer>
              <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details>
              </v-text-field>
              <v-spacer></v-spacer>
              <v-dialog v-model="supplierInvoiceDialog">
                <template v-slot:[`activator`]="{ on }">
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
                      </v-layout>
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
                             persistent width="50%">
                            <template v-slot:[`activator`]="{ on }">
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
                          <v-dialog ref="supplierInvoicePaymentDueDateDialog" v-model="supplierInvoicePaymentDueDateModal"
                             persistent width="50%">
                            <template v-slot:[`activator`]="{ on }">
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
                    <v-btn color="blue darken-1" @click="closeSupplierInvoiceDialog">Cancel</v-btn>
                    <v-btn color="blue darken-1" @click="saveSupplierInvoice">Save</v-btn>
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

                <template v-slot:[`item.actionDownloadSupplierInvoice`]="{ item }">
                  <v-btn icon @click="downloadSupplierInvoice(item)">
                    <v-icon>
                      cloud_download
                    </v-icon>
                  </v-btn>
                </template>

                <template v-slot:[`item.actionEditSupplierInvoice`]="{ item }">
                  <v-btn icon @click="showSupplierInvoiceEditDialog(item)">
                    <v-icon>
                      edit
                    </v-icon>
                  </v-btn>
                </template>

                <template v-slot:[`item.actionDeleteSupplierInvoice`]="{ item }">
                  <v-btn icon @click="deleteSupplierInvoice(item)">
                    <v-icon>
                      delete
                    </v-icon>
                  </v-btn>
                </template>

              </v-data-table>
            </v-card-text>

          </v-card>
        </v-window-item>



        <v-window-item key="4" value="'outerTab-' + 4">
          <v-card>
            <v-data-table :headers="productTableHeaders" :items="supplierProducts" :search="search">
              <!--
              <template v-slot:[`item.cost`]="props">
                <v-edit-dialog v-model="props.item.cost" large persistent @save="save(props.item)"
                  @cancel="cancel" @open="open" @close="close">
                  <div>{{ props.item.cost }}</div>
                  <template v-slot:[`input`]>
                    <div class="mt-4 title">Update Cost</div>
                    <v-text-field v-model="props.item.cost" label="Edit" single-line counter autofocus></v-text-field>
                  </template>
                </v-edit-dialog>
              </template>

              <template v-slot:[`item.leadInTimeInDays`]="props">
                <v-edit-dialog v-model="props.item.leadInTimeInDays" large persistent @save="save(props.item)"
                  @cancel="cancel" @open="open" @close="close">
                  <div>{{ props.item.leadInTimeInDays }}</div>
                  <template v-slot:[`input`]>
                    <div class="mt-4 title">Update Lead In Time</div>
                    <v-text-field v-model="props.item.leadInTimeInDays" label="Edit" single-line counter autofocus>
                    </v-text-field>
                  </template>
                </v-edit-dialog>
              </template>
            -->
            </v-data-table>
          </v-card>
        </v-window-item>


        <v-window-item key="5" value="'outerTab-' + 5">
          <v-card>
            <v-card-title>
            </v-card-title>
            <v-data-table :headers="orderTableHeaders" :items="orders" :search="search">
            </v-data-table>
          </v-card>
        </v-window-item>
      </v-window>

    </v-card>
  </v-container>
</template>

<script>


import { computed, ref, reactive, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const store = useStore();

    const route = useRoute();
   //const router = useRouter();

    const id = route.params.id;

    onMounted(() => {
      store.dispatch('suppliers/loadSupplierProducts', id)
      store.dispatch('suppliers/loadSupplierQuotations', id)
      store.dispatch('suppliers/loadSupplierQuotationSummary', id)
      store.dispatch('suppliers/loadSupplierOrders', id)
      store.dispatch('suppliers/loadSupplierInvoices', id)
      store.dispatch('suppliers/loadSupplierInvoiceSummary', id)
    });

    // beforeUpdate() {
    //   editedSupplier = supplier
    //  },
    const outerTab = ref(null);
    const date = new Date().toISOString().substr(0, 10);
    const snack = ref(false);
    const snackColor = ref('');
    const snackText = ref('');
    const editedSupplier = reactive({
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
    });
    const supplierTableHeaders = [
      {
        title: 'Id',
        sortable: true,
        align: ' d-none',
        key: 'productCategoryId'
      },
      {
        title: 'Category',
        align: 'left',
        sortable: true,
        key: 'productCategoryName'
      },
      {
        title: 'Name',
        align: 'left',
        sortable: true,
        key: 'name'
      },
      { title: 'Description', key: 'description' },
      { title: 'Manufacturer', key: 'manufacturer' },
      { title: 'Product Code', key: 'productCode' },
      { title: 'Product Standard', key: 'productStandard' },
      { title: 'Image', key: 'imageUrl' },
      { title: 'Edit', align: 'left', key: 'actionEdit' },
      { title: 'Delete', align: 'left', key: 'actionDelete' }
    ];
    const quotationTableHeaders = [
      {
        title: 'Name',
        align: 'left',
        sortable: true,
        key: 'productName'
      },
      { title: 'Cost', key: 'cost' },
      { title: 'Lead In (Days)', key: 'leadInTimeInDays' }
    ];
    const productTableHeaders = [
      {
        title: 'Product',
        align: 'left',
        sortable: true,
        key: 'productName'
      },
      { title: 'Units', key: 'units' },
      { title: 'Unit Cost', key: 'cost' },
      { title: 'validTo', key: 'validTo' },
      { title: 'LeadInTimeInDays', key: 'leadInTimeInDays' },
    ];
    const orderTableHeaders = [
      {
        title: 'Project',
        align: 'left',
        sortable: true,
        key: 'projectName'
      },
      {
        title: 'Product',
        align: 'left',
        sortable: true,
        key: 'productName'
      },
      { title: 'Quantity', key: 'quantity' },
      { title: 'Unit Cost', key: 'unitCost' },
      { title: 'Total Cost', key: 'totalCost' },
      { title: 'Delivery Date', key: 'deliveryDate' },
      { title: 'Status', key: 'status' },
    ];
    const search = ref('');
    const dialog = ref(false);
    const editedIndex = ref(-1);
    const editedItem = {
      id: '',
      productCategoryId: '',
      productCategoryName: '',
      name: '',
      description: '',
      manufacturer: '',
      productCode: '',
      standard: '',
      imageUrl: ''
    };
    const defaultItem = {
      productCategoryId: '',
      productCategoryName: '',
      name: '',
      description: '',
      manufacturer: '',
      productCode: '',
      standard: '',
      imageUrl: ''
    };
    const invoiceStatusListSelection = [
      { title: 'UNPAID', key: 'UNPAID' },
      { title: 'APPROVED_FOR_PAYMENT', key: 'APPROVED_FOR_PAYMENT' },
      { title: 'PAID', key: 'PAID' }
    ];
    const supplierInvoiceTableHeaders = [
      { title: 'Project', key: 'projectName' },
      { title: 'Ref', key: 'invoiceRef' },
      { title: 'Description', key: 'description', width: "1%" },
      { title: 'Status', key: 'status' },
      { title: 'Currency', key: 'currency' },
      { title: 'Gross', key: 'grossAmount' },
      { title: 'Net', key: 'netAmount' },
      { title: 'Issued', key: 'invoiceDate' },
      { title: 'Payment Due', key: 'paymentDueDate', width: "125px" },
      { title: 'Download', align: 'left', key: 'actionDownloadSupplierInvoice' },
      { title: 'Approve', align: 'left', key: 'actionPaySupplierInvoice' },
      { title: 'Edit', align: 'left', key: 'actionEditSupplierInvoice' },
      { title: 'Delete', align: 'left', key: 'actionDeleteSupplierInvoice' }
    ];
    const supplierInvoiceDialog = ref(false);
    const supplierInvoiceDateDialog = ref(false);
    const supplierInvoiceDateModal = ref(false);
    const supplierInvoicePaymentDueDateDialog = ref(false);
    const supplierInvoicePaymentDueDateModal = ref(false);
    const editedSupplierInvoiceIndex = -1;
    const editedSupplierInvoice = reactive({
      id: '',
      supplierId: id,
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
    const defaultSupplierInvoice = reactive({
      supplierId: id,
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
    const formHasErrors = false;
    const supplierQuotationTableHeaders = [
      { title: 'Project', key: 'projectName' },
      { title: 'Ref', key: 'quotationRef' },
      { title: 'Gross', key: 'grossAmount' },
      { title: 'Currency', key: 'currency' },
      { title: 'Issued', key: 'quotationDate', width: "125px" },
      { title: 'Status', key: 'status' },
      { title: 'Download', align: 'left', key: 'actionDownloadSupplierQuotation' },
      { title: 'Edit', align: 'left', key: 'actionEditSupplierQuotation' },
      { title: 'Delete', align: 'left', key: 'actionDeleteSupplierQuotation' }
    ];
    const supplierQuotationDialog = ref(false);
    const supplierQuotationDateDialog = ref(false);
    const supplierQuotationDateModal = ref(false);
    const supplierQuotationDateReceivedDialog = ref(false);
    const supplierQuotationDateReceivedModal = ref(false);
    const editedSupplierQuotationIndex = ref(-1);
    const editedSupplierQuotation = reactive({
      id: '',
      supplierId: id,
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
    const defaultSupplierQuotation = reactive({
      supplierId: id,
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

    const productCategories = computed(() => { return store.getters.loadedProductCategories });

    const supplierCategories = computed(() => { return store.getters.loadedSupplierCategories });

    const supplierQuotationSummary = computed(() => { return store.getters.loadedSupplierQuotationSummary });

    const supplierQuotation = computed(() => { return store.getters.loadedSupplierQuotation });

    const supplierQuotations = computed(() => {
      return store.getters.loadedSupplierQuotations
     });

    const supplierProducts = computed(() => {
      return store.getters.loadedSupplierProducts
    });
    const orders = computed(() => {
      return store.getters.loadedSupplierOrders
    });
    const supplierInvoiceSummary = computed(() => {
      return store.getters.loadedSupplierInvoiceSummary
    });
    const supplierInvoices = computed(() => {
      return store.getters.loadedSupplierInvoices
    });
    const supplier = computed(() => {
      console.log('Loading product with id ' + id)
      return store.getters.loadedSupplier(id)
    });
    const error = computed(() => {
      return store.getters.error
    });
    const formValidationError = computed(() => {
      return store.getters.formValidationError
    });
    const loading = computed(() => {
      return store.getters.loading
    });
    const userIsAuthenticatedAndHasRoleAdmin = computed(() => {
      return store.getters.userIsAuthenticatedAndHasRoleAdmin
    });

    const onUpdateSupplier = (() => {
      console.log('Update Supplier Event Received..')
      console.log(editedSupplier)
      store.dispatch('updateSupplier', editedSupplier)
      save()
    });
    const saveSupplierQuotation = (() => {
      if (editedSupplierQuotationIndex.value > -1) {
        const formData = {
          id: editedSupplierQuotation.id,
          supplierId: id,
          projectId: editedSupplierQuotation.projectId,
          quotationRef: editedSupplierQuotation.quotationRef,
          status: editedSupplierQuotation.status,
          description: editedSupplierQuotation.description,
          currency: editedSupplierQuotation.currency,
          grossAmount: editedSupplierQuotation.grossAmount,
          netAmount: editedSupplierQuotation.netAmount,
          quotationDate: editedSupplierQuotation.quotationDate,
          dateReceived: editedSupplierQuotation.dateReceived
        }
        console.log('Updating subcontractor quotation details')
        console.log(formData)
        store.dispatch('updateSupplierQuotation', formData)
          .then(
            setTimeout(() => {
              store.dispatch('loadSupplierQuotationSummary', id)
            }, 300)
          )
      } else {
        console.log('Creating new subcontractor quotation details')
        const formData = {
          supplierId: id,
          projectId: editedSupplierQuotation.projectId,
          quotationRef: editedSupplierQuotation.quotationRef,
          description: editedSupplierQuotation.description,
          status: editedSupplierQuotation.status,
          currency: editedSupplierQuotation.currency,
          grossAmount: editedSupplierQuotation.grossAmount,
          netAmount: editedSupplierQuotation.netAmount,
          quotationDate: editedSupplierQuotation.quotationDate,
          quotationFile: editedSupplierQuotation.quotationFile
        }
        console.log(formData)
        store.dispatch('createSupplierQuotation', formData)
          .then(
            setTimeout(() => {
              store.dispatch('loadSupplierQuotationSummary', id)
            }, 300)
          )

      }
      closeSupplierQuotationDialog()
      save()
    });
    const showSupplierQuotationEditDialog = ((item) => {
      console.log('Showing Edit Quotation Dialog for operative with id ' + item.id)
      editedSupplierQuotationIndex.value = supplierQuotations.value.indexOf(item)
      Object.assign(editedSupplierQuotation, item)
      supplierQuotationDialog.value = true
    });
    const closeSupplierQuotationDialog = (() => {
      supplierQuotationDialog.value = false
      setTimeout(() => {
        Object.assign(editedSupplierQuotation, defaultSupplierQuotation)
        editedSupplierQuotationIndex.value = -1
      }, 300)
    });
    const downloadSupplierQuotation = ((item) => {
      console.log('downloading item requested..')
      console.log(item)
      store.dispatch('suppliers/downloadSupplierQuotation', item)
    });
    const deleteSupplierQuotation = ((item) => {
      console.log('Delete SupplierQuotation Event Received..')
      const formData = {
        id: item.id,
        supplierId: id
      }
      console.log(formData)
      store.dispatch('supplier/deleteSupplierQuotation', formData)
    });

    const saveSupplierInvoice = (() => {
      if (editedSupplierInvoiceIndex.value > -1) {
        const formData = {
          id: editedSupplierInvoice.id,
          supplierId: id,
          projectId: editedSupplierInvoice.projectId,
          invoiceRef: editedSupplierInvoice.invoiceRef,
          status: editedSupplierInvoice.status,
          description: editedSupplierInvoice.description,
          currency: editedSupplierInvoice.currency,
          grossAmount: editedSupplierInvoice.grossAmount,
          netAmount: editedSupplierInvoice.netAmount,
          invoiceDate: editedSupplierInvoice.invoiceDate,
          paymentDueDate: editedSupplierInvoice.paymentDueDate
        }
        console.log('Updating supplier invoice details')
        console.log(formData)
        store.dispatch('updateSupplierInvoice', formData)
          .then(
            setTimeout(() => {
              store.dispatch('suppliers/loadSupplierInvoiceSummary', id)
            }, 300)
          )
      } else {
        console.log('Creating new supplier invoice details')
        const formData = {
          supplierId: id,
          projectId: editedSupplierInvoice.projectId,
          invoiceRef: editedSupplierInvoice.invoiceRef,
          description: editedSupplierInvoice.description,
          status: editedSupplierInvoice.status,
          currency: editedSupplierInvoice.currency,
          grossAmount: editedSupplierInvoice.grossAmount,
          netAmount: editedSupplierInvoice.netAmount,
          invoiceDate: editedSupplierInvoice.invoiceDate,
          paymentDueDate: editedSupplierInvoice.paymentDueDate,
          invoiceFile: editedSupplierInvoice.invoiceFile
        }
        console.log(formData)
        store.dispatch('suppliers/createSupplierInvoice', formData)
          .then(
            setTimeout(() => {
              store.dispatch('suppliers/loadSupplierInvoiceSummary', id)
            }, 300)
          )
      }
      closeSupplierInvoiceDialog()
    });
    const downloadSupplierInvoice = ((item) => {
      console.log('downloading item requested..')
      console.log(item)
      store.dispatch('suppliers/downloadSupplierInvoice', item)
    });
    const showSupplierInvoiceEditDialog = ((item) => {
      console.log('Showing Edit Invoice Dialog for operative with id ' + item.id)
      editedSupplierInvoiceIndex.value = supplierInvoices.value.indexOf(item)
      Object.assign(editedSupplierInvoice, item)
      supplierInvoiceDialog.value = true
    });
    const closeSupplierInvoiceDialog = (() => {
      supplierInvoiceDialog.value = false
      setTimeout(() => {
        Object.assign(editedSupplierInvoice, defaultSupplierInvoice)
        editedSupplierInvoiceIndex.value = -1
      }, 300)
    });
    const save = (() => {
      snack.value = true
      snackColor.value = 'success'
      snackText.value = 'Data saved successfully'
    });
    const cancel = (() => {
      snack.value = true
      snackColor.value = 'error'
      snackText.value = 'Canceled'
    });
    const open = (() => {
      snack.value = true
      snackColor.value = 'info'
      snackText.value = 'Dialog opened'
    });
    const updateProduct = (() => {

      if (editedIndex.value === -1) {
        console.log('Creating products')
        console.log(editedItem)
        store.dispatch('suppliers/createProduct', editedItem)
      } else {
        console.log('Updating  products')
        console.log(editedItem)
        store.dispatch('suppliers/updateProduct', editedItem)
      }
      close()
    });
    const deleteProduct = ((item) => {
      console.log('Delete product Event Received..')
      console.log(item)
      store.dispatch('suppliers/deleteProduct', item)
    });
    const close = (() => {
      dialog.value = false
      setTimeout(() => {
        Object.assign(editedItem, defaultItem)
        editedIndex.value = -1
      }, 300)
    });
    const onDismissed = (() => {
      store.dispatch('clearError')
    });
    const formIsValid = (() => {
      return true
    });

    return {
      outerTab,
      date,
      snack,
      snackColor,
      snackText,
      editedSupplier,
      supplierTableHeaders,
      quotationTableHeaders,
      productTableHeaders,
      orderTableHeaders,
      search,
      dialog,
      editedIndex,
      editedItem,
      defaultItem,
      invoiceStatusListSelection,
      supplierInvoiceTableHeaders,
      supplierInvoiceDialog,
      supplierInvoiceDateDialog,
      supplierInvoiceDateModal,
      supplierInvoicePaymentDueDateDialog,
      supplierInvoicePaymentDueDateModal,
      editedSupplierInvoiceIndex,
      editedSupplierInvoice,
      defaultSupplierInvoice,
      formHasErrors,
      supplierQuotationTableHeaders,
      supplierQuotationDialog,
      supplierQuotationDateDialog,
      supplierQuotationDateModal,
      supplierQuotationDateReceivedDialog,
      supplierQuotationDateReceivedModal,
      editedSupplierQuotationIndex,
      editedSupplierQuotation,
      defaultSupplierQuotation,
      supplierInvoices,
      productCategories,
      supplier,
      supplierCategories,
      supplierQuotationSummary,
      supplierQuotation,
      supplierQuotations,
      supplierProducts,
      orders,
      supplierInvoiceSummary,
      error,
      formValidationError,
      loading,
      userIsAuthenticatedAndHasRoleAdmin,
      onUpdateSupplier,
      saveSupplierQuotation,
      showSupplierQuotationEditDialog,
      closeSupplierQuotationDialog,
      downloadSupplierQuotation,
      deleteSupplierQuotation,
      saveSupplierInvoice,
      downloadSupplierInvoice,
      showSupplierInvoiceEditDialog,
      closeSupplierInvoiceDialog,
      save,
      cancel,
      open,
      updateProduct,
      deleteProduct,
      close,
      onDismissed,
      formIsValid
    }
  }
}
</script>
