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
        <v-dialog v-model="projectSupplierInvoiceDialog" activator="parent">
          <v-card>
            <v-card-title>
              <span>Invoice Details</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-layout row>
                  <v-select
                    :items="suppliers"
                    item-value="id"
                    item-title="name"
                    v-model="editedProjectSupplierInvoice.supplierId"
                    label="Select Supplier"
                    single
                  >
                  </v-select>
                </v-layout>
                <v-layout row>
                  <v-text-field
                    v-model="editedProjectSupplierInvoice.invoiceRef"
                    label="Reference"
                  >
                  </v-text-field>

                  <v-select
                    :items="invoiceStatusListSelection"
                    v-model="editedProjectSupplierInvoice.status"
                    label="Status"
                    single
                  ></v-select>
                </v-layout>
                <v-layout row>
                  <v-textarea
                    name="description"
                    label="Description"
                    id="description"
                    v-model="editedProjectSupplierInvoice.description"
                    required
                  >
                  </v-textarea>
                </v-layout>
                <v-layout row>
                  <v-text-field
                    v-model="editedProjectSupplierInvoice.currency"
                    label="Currency"
                  >
                  </v-text-field>

                  <v-text-field
                    v-model="editedProjectSupplierInvoice.grossAmount"
                    label="Gross Amount"
                  ></v-text-field>

                  <v-text-field
                    v-model="editedProjectSupplierInvoice.netAmount"
                    label="Net Amount"
                  >
                  </v-text-field>
                </v-layout>

                <v-layout row>
                  <!--
                                  <v-dialog ref="projectInvoiceDateDialog" v-model="projectInvoiceDateModal" persistent
                                    width="50%" activator="parent">
                                    <template v-slot:activator="{ on }">
                                      <v-text-field v-model="editedProjectSupplierInvoice.invoiceDate" label="Date Issued"
                                        prepend-icon="event" readonly v-on="on"></v-text-field>
                                    </template>
                                    <v-date-picker v-model="editedProjectSupplierInvoice.invoiceDate" scrollable>
                                      <v-spacer></v-spacer>
                                      <v-btn text color="primary" @click="projectInvoiceDateModal = false">Cancel
                                      </v-btn>
                                      <v-btn text color="primary" @click="$refs.projectInvoiceDateDialog.save(date)">
                                        OK</v-btn>
                                    </v-date-picker>
                                  </v-dialog>


                                  <v-dialog ref="projectInvoicePaymentDueDateDialog"
                                    v-model="projectInvoicePaymentDueDateModal" persistent width="50%" activator="parent">
                                    <template v-slot:activator="{ on }">
                                      <v-text-field v-model="editedProjectSupplierInvoice.paymentDueDate"
                                        label="Payment Due Date" prepend-icon="event" readonly v-on="on">
                                      </v-text-field>
                                    </template>
                                    <v-date-picker v-model="editedProjectSupplierInvoice.paymentDueDate" scrollable>
                                      <v-spacer></v-spacer>
                                      <v-btn text color="primary" @click="projectInvoicePaymentDueDateModal = false">
                                        Cancel</v-btn>
                                      <v-btn text color="primary"
                                        @click="$refs.projectInvoicePaymentDueDateDialog.save(date)">OK</v-btn>
                                    </v-date-picker>
                                  </v-dialog>
-->
                </v-layout>

                <v-layout row v-if="editedProjectSubContractorInvoiceIndex < 0">
                  <v-file-input
                    ref="supplierInvoiceFile"
                    label="Upload Invoice"
                    filled
                    prepend-icon="mdi-camera"
                  ></v-file-input>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" @click="closeProjectSupplierInvoiceDialog"
                >Cancel
              </v-btn>
              <v-btn color="blue darken-1" @click="saveProjectSupplierInvoice"
                >Save</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-btn>
    </v-card-title>
    <h3>Supplier Invoice Summary</h3>
    <v-layout row v-if="projectSupplierInvoiceSummary">
      <v-text-field
        v-model="projectSupplierInvoiceSummary.totalInvoiceCount"
        label="Invoice Count"
        readonly
      ></v-text-field>

      <v-text-field
        v-model="projectSupplierInvoiceSummary.invoicesGrossAmountTotal"
        label="Invoice Total Gross"
        readonly
      ></v-text-field>

      <v-text-field
        v-model="projectSupplierInvoiceSummary.invoicesNetAmountTotal"
        label="Invoice Total Net"
        readonly
      ></v-text-field>
    </v-layout>
    <v-layout row v-if="projectSupplierInvoiceSummary">
      <v-text-field
        v-model="projectSupplierInvoiceSummary.unPaidInvoicesCount"
        label="Invoice Count (Not Paid)"
        readonly
      ></v-text-field>

      <v-text-field
        v-model="projectSupplierInvoiceSummary.unPaidInvoicesGrossAmount"
        label="Invoice Total Gross (Not Paid)"
        readonly
      ></v-text-field>

      <v-text-field
        v-model="projectSupplierInvoiceSummary.unPaidInvoicesNetAmount"
        label="Invoice Total Net (Not Paid)"
        readonly
      ></v-text-field>
    </v-layout>
    <v-layout row v-if="projectSupplierInvoiceSummary">
      <v-text-field
        v-model="projectSupplierInvoiceSummary.paidInvoicesCount"
        label="Invoice Count (Paid)"
        readonly
      ></v-text-field>

      <v-text-field
        v-model="projectSupplierInvoiceSummary.paidInvoicesGrossAmount"
        label="Invoice Total Gross (Paid)"
        readonly
      ></v-text-field>

      <v-text-field
        v-model="projectSupplierInvoiceSummary.paidInvoicesNetAmount"
        label="Invoice Total Net (Paid)"
        readonly
      ></v-text-field>
    </v-layout>
    <h3>Invoice Details</h3>
    <v-data-table
      :headers="projectSupplierInvoiceTableHeaders"
      :items="projectSupplierInvoices"
      :calculate-widths="true"
      :search="search"
    >
      <template v-slot:[`item.actionDownloadProjectInvoice`]="{ item }">
        <v-btn icon="mdi-download" @click="downloadSupplierInvoice(item)"> </v-btn>
      </template>
      <template v-slot:[`item.actionEdit`]="{ item }">
        <v-btn icon="mdi-file-edit-outline" @click="showProjectSupplierEditDialog(item)">
        </v-btn>
      </template>

      <template v-slot:[`item.actionDelete`]="{ item }">
        <v-btn icon="mdi-delete-alert" @click="deleteProjectSupplierInvoice(item)">
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>
<script setup>
import { computed, ref, defineProps, reactive, onMounted } from "vue";
import { useStore } from "vuex";

//eslint-disable-next-line
const { projectId } = defineProps(["projectId"]);

const store = useStore();

onMounted(() => {
  console.log("Loading quotations for project id " + projectId);
  store.dispatch("projects/loadProjectSupplierInvoices", projectId);
  store.dispatch("projects/loadProjectSupplierInvoiceSummary", projectId);
  store.dispatch("suppliers/loadSuppliers");
});

const supplierInvoiceFile = ref(null);

const projectSupplierInvoiceSummary = computed(() => {
  return store.getters["projects/loadedProjectSupplierInvoiceSummary"];
});
const projectSupplierInvoices = computed(() => {
  return store.getters["projects/loadedProjectSupplierInvoices"];
});

const projectSupplierInvoiceDialog = ref(false);

const search = ref("");

const editedProjectSupplierInvoiceIndex = ref(-1);
const editedProjectSupplierInvoice = reactive({
  id: "",
  projectId: projectId,
  supplierId: "",
  invoiceRef: "",
  description: "",
  currency: "",
  netAmount: "",
  invoiceDate: null,
  paymentDueDate: null,
  invoiceFile: null,
  status: "",
});
const defaultProjectSupplierInvoice = reactive({
  supplierId: "",
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

const projectSupplierInvoiceTableHeaders = [
  { title: "Company", key: "supplierName" },
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
const downloadSupplierInvoice = (item) => {
  console.log("downloading supplier invoice..");
  console.log(item);
  const obj = projectSupplierInvoices.value.find((i) => i.id == item.value);
  store.dispatch("suppliers/downloadSupplierInvoice", obj);
};

const saveProjectSupplierInvoice = () => {
  if (editedProjectSupplierInvoiceIndex.value > -1) {
    const formData = {
      id: editedProjectSupplierInvoice.id,
      supplierId: editedProjectSupplierInvoice.supplierId,
      projectId: projectId,
      invoiceRef: editedProjectSupplierInvoice.invoiceRef,
      status: editedProjectSupplierInvoice.status,
      description: editedProjectSupplierInvoice.description,
      currency: editedProjectSupplierInvoice.currency,
      grossAmount: editedProjectSupplierInvoice.grossAmount,
      netAmount: editedProjectSupplierInvoice.netAmount,
      invoiceDate: editedProjectSupplierInvoice.invoiceDate,
      paymentDueDate: editedProjectSupplierInvoice.paymentDueDate,
    };
    console.log("Updating project supplier invoice details");
    console.log(formData);
    store.dispatch("suppliers/updateSupplierInvoice", formData).then(
      setTimeout(() => {
        store.dispatch("projects/loadProjectSupplierInvoices", projectId);
        store.dispatch("projects/loadProjectSupplierInvoiceSummary", projectId);
      }, 300)
    );
  } else {
    console.log("Creating new supplier invoice for project");
    const formData = {
      supplierId: editedProjectSupplierInvoice.supplierId,
      projectId: projectId,
      invoiceRef: editedProjectSupplierInvoice.invoiceRef,
      description: editedProjectSupplierInvoice.description,
      status: editedProjectSupplierInvoice.status,
      currency: editedProjectSupplierInvoice.currency,
      grossAmount: editedProjectSupplierInvoice.grossAmount,
      netAmount: editedProjectSupplierInvoice.netAmount,
      invoiceDate: editedProjectSupplierInvoice.invoiceDate,
      paymentDueDate: editedProjectSupplierInvoice.paymentDueDate,
      invoiceFile: supplierInvoiceFile.value,
    };
    console.log(formData);
    store.dispatch("suppliers/createSupplierInvoice", formData).then(
      setTimeout(() => {
        store.dispatch("projects/loadProjectSupplierInvoices", projectId);
        store.dispatch("projects/loadProjectSupplierInvoiceSummary", projectId);
      }, 300)
    );
  }
  closeProjectSupplierInvoiceDialog();
};
const showProjectSupplierEditDialog = (item) => {
  console.log("Showing Edit Supplieer Invoice Dialog for operative with id " + item.id);
  editedProjectSupplierInvoiceIndex.value = projectSupplierInvoices.value.findIndex(
    (s) => s.id == item.value
  );
  const obj = projectSupplierInvoices.value.find((s) => s.id == item.value);
  Object.assign(editedProjectSupplierInvoice, obj);
  projectSupplierInvoiceDialog.value = true;
};
const closeProjectSupplierInvoiceDialog = () => {
  projectSupplierInvoiceDialog.value = false;
  setTimeout(() => {
    Object.assign(editedProjectSupplierInvoice, defaultProjectSupplierInvoice);
    editedProjectSupplierInvoiceIndex.value = -1;
  }, 300);
};

const deleteProjectSupplierInvoice = (item) => {
  console.log("Delete Supplier Invoice Event Received..");
  const obj = projectSupplierInvoices.value.find((i) => i.id == item.value);
  store.dispatch("suppliers/deleteSupplierInvoice", obj);
};

const invoiceStatusListSelection = [
  { title: "UNPAID", key: "UNPAID" },
  { title: "APPROVED_FOR_PAYMENT", key: "APPROVED_FOR_PAYMENT" },
  { title: "PAID", key: "PAID" },
];

const suppliers = computed(() => {
  return store.getters["suppliers/loadedSuppliers"];
});

</script>
