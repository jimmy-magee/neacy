<template>
  <v-card>
    <v-card-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      >
      </v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon color="green">
        <v-icon icon="mdi-plus"></v-icon>
        <v-dialog v-model="projectCustomerInvoiceDialog" activator="parent">
          <v-card>
            <v-card-title>
              <span>Customer Invoice Details</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-layout row>
                  <v-select
                    :items="customers"
                    item-value="id"
                    item-title="name"
                    v-model="editedProjectCustomerInvoice.customerId"
                    label="Select Customer"
                    single
                  >
                  </v-select>
                </v-layout>
                <v-layout row>
                  <v-text-field
                    v-model="editedProjectCustomerInvoice.invoiceRef"
                    label="Reference"
                  >
                  </v-text-field>

                  <v-select
                    :items="invoiceStatusListSelection"
                    v-model="editedProjectCustomerInvoice.status"
                    label="Status"
                    single
                  ></v-select>
                </v-layout>
                <v-layout row>
                  <v-textarea
                    name="description"
                    label="Description"
                    id="description"
                    v-model="editedProjectCustomerInvoice.description"
                    required
                  >
                  </v-textarea>
                </v-layout>
                <v-layout row>
                  <v-text-field
                    v-model="editedProjectCustomerInvoice.currency"
                    label="Currency"
                  >
                  </v-text-field>

                  <v-text-field
                    v-model="editedProjectCustomerInvoice.grossAmount"
                    label="Gross Amount"
                  ></v-text-field>

                  <v-text-field
                    v-model="editedProjectCustomerInvoice.netAmount"
                    label="Net Amount"
                  >
                  </v-text-field>
                </v-layout>

                <v-layout row>
                  <v-dialog
                    ref="projectCustomerInvoiceDateDialog"
                    v-model="projectCustomerInvoiceDateModal"
                    persistent
                    width="50%"
                    activator="parent"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="editedProjectCustomerInvoice.invoiceDate"
                        label="Date Issued"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="editedProjectCustomerInvoice.invoiceDate"
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click="projectCustomerInvoiceDateModal = false"
                      >
                        Cancel</v-btn
                      >
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.projectCustomerInvoiceDateDialog.save(date)"
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-dialog>

                  <v-dialog
                    ref="projectCustomerInvoicePaymentDueDateDialog"
                    v-model="projectCustomerInvoicePaymentDueDateModal"
                    persistent
                    width="50%"
                    activator="parent"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="editedProjectCustomerInvoice.paymentDueDate"
                        label="Payment Due Date"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      >
                      </v-text-field>
                    </template>
                    <v-date-picker
                      v-model="editedProjectCustomerInvoice.paymentDueDate"
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click="projectCustomerInvoicePaymentDueDateModal = false"
                        >Cancel</v-btn
                      >
                      <v-btn
                        text
                        color="primary"
                        @click="
                          $refs.projectCustomerInvoicePaymentDueDateDialog.save(date)
                        "
                        >OK
                      </v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-layout>

                <v-layout row v-if="editedProjectCustomerInvoiceIndex < 0">
                  <v-file-input
                    ref="projectCustomerInvoiceFile"
                    label="Upload Invoice"
                    filled
                    prepend-icon="mdi-camera"
                  ></v-file-input>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" @click="closeProjectCustomerInvoiceDialog"
                >Cancel
              </v-btn>
              <v-btn color="blue darken-1" @click="saveProjectCustomerInvoice"
                >Save</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-btn>
    </v-card-title>
    <h3>Customer Invoice Summary</h3>
    <v-layout row v-if="projectCustomerInvoiceSummary">
      <v-text-field
        v-model="projectCustomerInvoiceSummary.totalInvoiceCount"
        label="Invoice Count"
        readonly
      ></v-text-field>

      <v-text-field
        v-model="projectCustomerInvoiceSummary.invoicesGrossAmountTotal"
        label="Invoice Total Gross"
        readonly
      ></v-text-field>

      <v-text-field
        v-model="projectCustomerInvoiceSummary.invoicesNetAmountTotal"
        label="Invoice Total Net"
        readonly
      ></v-text-field>
    </v-layout>
    <v-layout row v-if="projectCustomerInvoiceSummary">
      <v-text-field
        v-model="projectCustomerInvoiceSummary.unPaidInvoicesCount"
        label="Invoice Count (Not Paid)"
        readonly
      ></v-text-field>

      <v-text-field
        v-model="projectCustomerInvoiceSummary.unPaidInvoicesGrossAmount"
        label="Invoice Total Gross (Not Paid)"
        readonly
      ></v-text-field>

      <v-text-field
        v-model="projectCustomerInvoiceSummary.unPaidInvoicesNetAmount"
        label="Invoice Total Net (Not Paid)"
        readonly
      ></v-text-field>
    </v-layout>
    <v-layout row v-if="projectCustomerInvoiceSummary">
      <v-text-field
        v-model="projectCustomerInvoiceSummary.paidInvoicesCount"
        label="Invoice Count (Paid)"
        readonly
      ></v-text-field>

      <v-text-field
        v-model="projectCustomerInvoiceSummary.paidInvoicesGrossAmount"
        label="Invoice Total Gross (Paid)"
        readonly
      ></v-text-field>

      <v-text-field
        v-model="projectCustomerInvoiceSummary.paidInvoicesNetAmount"
        label="Invoice Total Net (Paid)"
        readonly
      ></v-text-field>
    </v-layout>
    <h3>Invoice Details</h3>
    <v-data-table
      :headers="projectCustomerInvoiceTableHeaders"
      :calculate-widths="true"
      :items="projectCustomerInvoices"
      :search="search"
    >
      <template v-slot:[`item.actionDownloadProjectInvoice`]="{ item }">
        <v-btn icon="mdi-download" @click="downloadCustomerInvoice(item)"> </v-btn>
      </template>
      <template v-slot:[`item.actionEdit`]="{ item }">
        <v-btn icon="mdi-file-edit-outline" @click="showProjectCustomerEditDialog(item)">
        </v-btn>
      </template>

      <template v-slot:[`item.actionDelete`]="{ item }">
        <v-btn icon="mdi-delete-alert" @click="deleteProjectCustomerInvoice(item)">
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>
<script setup>
import { computed, ref, reactive, onMounted } from "vue";
import { useStore } from "vuex";

// eslint-disable-next-line
const { projectId } = defineProps(["projectId"]);

const store = useStore();

onMounted(() => {
  console.log("Loading quotations for project id " + projectId);
  store.dispatch("projects/loadProjectCustomerInvoices", projectId);
  store.dispatch("projects/loadProjectCustomerInvoiceSummary", projectId);
  store.dispatch("customers/loadCustomers");
});
const customers = computed(() => {
  return store.getters["customers/loadedCustomers"];
});
const projectCustomerInvoiceSummary = computed(() => {
  return store.getters["projects/loadedProjectCustomerInvoiceSummary"];
});
const projectCustomerInvoices = computed(() => {
  return store.getters["projects/loadedProjectCustomerInvoices"];
});

const projectCustomerInvoiceTableHeaders = [
  { title: "Company", key: "customerName" },
  { title: "Status", key: "status" },
  { title: "InvoiceRef", key: "invoiceRef" },
  { title: "Currency", key: "currency" },
  { title: "Gross", key: "grossAmount", width: 150 },
  { title: "Net", key: "netAmount", width: 150 },
  { title: "Issued", key: "invoiceDate", width: "125px" },
  { title: "Payment", key: "paymentDueDate", width: "125px" },
  { title: "Download", align: "left", key: "actionDownloadProjectInvoice" },
  { title: "Edit", align: "left", key: "actionEdit" },
  { title: "Delete", align: "left", key: "actionDelete" },
];
const projectCustomerInvoiceDialog = ref(false);
//const projectCustomerInvoicePaymentDialog = ref(false);
//const projectCustomerInvoiceDateDialog = ref(false);
//const projectCustomerInvoiceDateModal = ref(false);
//const projectCustomerInvoicePaymentDueDateDialog = ref(false);
//const projectCustomerInvoicePaymentDueDateModal = ref(false);
const editedProjectCustomerInvoiceIndex = ref(-1);
const editedProjectCustomerInvoice = reactive({
  id: "",
  projectId: projectId,
  customerId: "",
  invoiceRef: "",
  description: "",
  currency: "",
  netAmount: "",
  invoiceDate: null,
  paymentDueDate: null,
  invoiceFile: null,
  status: "",
});
const defaultProjectCustomerInvoice = reactive({
  customerId: "",
  projectId: projectId,
  invoiceRef: "",
  description: "",
  currency: "",
  netAmount: "",
  invoiceDate: null,
  paymentDueDate: null,
  invoiceFile: null,
  status: "",
});

//const projectInvoicePaymentDialog = ref(false);
//const projectInvoiceDateDialog = ref(false);
//const projectInvoiceDateModal = ref(false);
//const projectInvoicePaymentDueDateDialog = ref(false);
//const projectInvoicePaymentDueDateModal = ref(false);
const projectCustomerInvoiceFile = ref(null);
const search = ref("");
const downloadCustomerInvoice = (item) => {
  console.log("downloading customer invoice..");
  console.log(item);
  const obj = projectCustomerInvoices.value.find((i) => i.id == item.value);
  store.dispatch("customers/downloadCustomerInvoice", obj);
};

const saveProjectCustomerInvoice = () => {
  if (editedProjectCustomerInvoiceIndex.value > -1) {
    const formData = {
      id: editedProjectCustomerInvoice.id,
      customerId: editedProjectCustomerInvoice.customerId,
      projectId: projectId,
      invoiceRef: editedProjectCustomerInvoice.invoiceRef,
      status: editedProjectCustomerInvoice.status,
      description: editedProjectCustomerInvoice.description,
      currency: editedProjectCustomerInvoice.currency,
      grossAmount: editedProjectCustomerInvoice.grossAmount,
      netAmount: editedProjectCustomerInvoice.netAmount,
      invoiceDate: editedProjectCustomerInvoice.invoiceDate,
      paymentDueDate: editedProjectCustomerInvoice.paymentDueDate,
    };
    console.log("Updating project customer invoice details");
    console.log(formData);
    store.dispatch("customers/updateCustomerInvoice", formData).then(
      setTimeout(() => {
        store.dispatch("projects/loadProjectCustomerInvoices", projectId);
        store.dispatch("projects/loadProjectCustomerInvoiceSummary", projectId);
      }, 300)
    );
  } else {
    console.log("Creating new customer invoice for project");
    const formData = {
      customerId: editedProjectCustomerInvoice.customerId,
      projectId: projectId,
      invoiceRef: editedProjectCustomerInvoice.invoiceRef,
      description: editedProjectCustomerInvoice.description,
      status: editedProjectCustomerInvoice.status,
      currency: editedProjectCustomerInvoice.currency,
      grossAmount: editedProjectCustomerInvoice.grossAmount,
      netAmount: editedProjectCustomerInvoice.netAmount,
      invoiceDate: "2023-03-21", //editedProjectCustomerInvoice.invoiceDate,
      paymentDueDate: "2023-03-21", //editedProjectCustomerInvoice.paymentDueDate,
      invoiceFile: projectCustomerInvoiceFile.value,
    };
    console.log(formData);
    store.dispatch("customers/createCustomerInvoice", formData).then(
      setTimeout(() => {
        store.dispatch("projects/loadProjectCustomerInvoices", projectId);
        store.dispatch("projects/loadProjectCustomerInvoiceSummary", projectId);
      }, 300)
    );
  }
  closeProjectCustomerInvoiceDialog();
};
const showProjectCustomerEditDialog = (item) => {
  console.log("Showing Edit Customer Invoice Dialog");
  console.log(item);
  editedProjectCustomerInvoiceIndex.value = projectCustomerInvoices.value.findIndex(
    (ci) => ci.id == item.value
  );
  const obj = projectCustomerInvoices.value.find((ci) => ci.id == item.value);
  Object.assign(editedProjectCustomerInvoice, obj);
  projectCustomerInvoiceDialog.value = true;
};
const closeProjectCustomerInvoiceDialog = () => {
  projectCustomerInvoiceDialog.value = false;
  setTimeout(() => {
    Object.assign(editedProjectCustomerInvoice, defaultProjectCustomerInvoice);
    editedProjectCustomerInvoiceIndex.value = -1;
  }, 300);
};
</script>
