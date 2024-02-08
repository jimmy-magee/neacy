<template>
  <v-card>
    <v-card-title>
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

        <v-dialog v-model="projectSubContractorInvoiceDialog" activator="parent">
          <v-card>
            <v-card-title>
              <span>SubContractor Invoice Details</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-layout row>
                  <v-select
                    :items="subContractors"
                    item-value="id"
                    item-title="name"
                    v-model="editedProjectSubContractorInvoice.subContractorId"
                    label="Select SubContractor"
                    single
                  ></v-select>
                </v-layout>
                <v-layout row>
                  <v-text-field
                    v-model="editedProjectSubContractorInvoice.invoiceRef"
                    label="Reference"
                  ></v-text-field>

                  <v-select
                    :items="invoiceStatusListSelection"
                    v-model="editedProjectSubContractorInvoice.status"
                    label="Status"
                    single
                  ></v-select>
                </v-layout>
                <v-layout row>
                  <v-textarea
                    name="description"
                    label="Description"
                    id="description"
                    v-model="editedProjectSubContractorInvoice.description"
                    required
                  >
                  </v-textarea>
                </v-layout>
                <v-layout row>
                  <v-text-field
                    v-model="editedProjectSubContractorInvoice.currency"
                    label="Currency"
                  >
                  </v-text-field>

                  <v-text-field
                    v-model="editedProjectSubContractorInvoice.grossAmount"
                    label="Gross Amount"
                  ></v-text-field>

                  <v-text-field
                    v-model="editedProjectSubContractorInvoice.netAmount"
                    label="Net Amount"
                  ></v-text-field>
                </v-layout>

                <v-layout row>
                  <v-dialog
                    ref="projectInvoiceDateDialog"
                    v-model="projectInvoiceDateModal"
                    persistent
                    width="50%"
                    activator="parent"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="editedProjectSubContractorInvoice.invoiceDate"
                        label="Date Issued"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="editedProjectSubContractorInvoice.invoiceDate"
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="projectInvoiceDateModal = false"
                        >Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.projectInvoiceDateDialog.save(date)"
                      >
                        OK</v-btn
                      >
                    </v-date-picker>
                  </v-dialog>

                  <v-dialog
                    ref="projectInvoicePaymentDueDateDialog"
                    v-model="projectInvoicePaymentDueDateModal"
                    persistent
                    width="50%"
                    activator="parent"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="editedProjectSubContractorInvoice.paymentDueDate"
                        label="Payment Due Date"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      >
                      </v-text-field>
                    </template>
                    <v-date-picker
                      v-model="editedProjectSubContractorInvoice.paymentDueDate"
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click="projectInvoicePaymentDueDateModal = false"
                      >
                        Cancel</v-btn
                      >
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.projectInvoicePaymentDueDateDialog.save(date)"
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-dialog>
                </v-layout>

                <v-layout row v-if="editedProjectSubContractorInvoiceIndex < 0">
                  <v-file-input
                    ref="subContractorInvoiceFile"
                    label="Upload Invoice"
                    filled
                    prepend-icon="mdi-camera"
                  ></v-file-input>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" @click="closeProjectSubContractorInvoiceDialog"
                >Cancel
              </v-btn>
              <v-btn color="blue darken-1" @click="saveProjectSubContractorInvoice"
                >Save</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-btn>
    </v-card-title>
    <h3>SubContractor Invoice Summary</h3>
    <v-layout row v-if="projectSubContractorInvoiceSummary">
      <v-text-field
        v-model="projectSubContractorInvoiceSummary.totalInvoiceCount"
        label="Invoice Count"
        readonly
      ></v-text-field>

      <v-text-field
        v-model="projectSubContractorInvoiceSummary.invoicesGrossAmountTotal"
        label="Invoice Total Gross"
        readonly
      ></v-text-field>

      <v-text-field
        v-model="projectSubContractorInvoiceSummary.invoicesNetAmountTotal"
        label="Invoice Total Net"
        readonly
      ></v-text-field>
    </v-layout>
    <v-layout row v-if="projectSubContractorInvoiceSummary">
      <v-text-field
        v-model="projectSubContractorInvoiceSummary.unPaidInvoicesCount"
        label="Invoice Count (Not Paid)"
        readonly
      ></v-text-field>

      <v-text-field
        v-model="projectSubContractorInvoiceSummary.unPaidInvoicesGrossAmount"
        label="Invoice Total Gross (Not Paid)"
        readonly
      ></v-text-field>

      <v-text-field
        v-model="projectSubContractorInvoiceSummary.unPaidInvoicesNetAmount"
        label="Invoice Total Net (Not Paid)"
        readonly
      ></v-text-field>
    </v-layout>
    <v-layout row v-if="projectSubContractorInvoiceSummary">
      <v-text-field
        v-model="projectSubContractorInvoiceSummary.paidInvoicesCount"
        label="Invoice Count (Paid)"
        readonly
      ></v-text-field>

      <v-text-field
        v-model="projectSubContractorInvoiceSummary.paidInvoicesGrossAmount"
        label="Invoice Total Gross (Paid)"
        readonly
      ></v-text-field>

      <v-text-field
        v-model="projectSubContractorInvoiceSummary.paidInvoicesNetAmount"
        label="Invoice Total Net (Paid)"
        readonly
      ></v-text-field>
    </v-layout>
    <h3>Invoice Details</h3>
    <v-data-table
      :headers="projectSubContractorInvoiceTableHeaders"
      :calculate-widths="true"
      :items="projectSubContractorInvoices"
      :search="search"
    >
      <template v-slot:[`item.actionDownloadProjectInvoice`]="{ item }">
        <v-btn icon="mdi-download" @click="downloadSubContractorInvoice(item)"> </v-btn>
      </template>
      <template v-slot:[`item.actionEdit`]="{ item }">
        <v-btn
          icon="mdi-file-edit-outline"
          @click="showProjectSubContractorEditDialog(item)"
        >
        </v-btn>
      </template>
      <template v-slot:[`item.actionApproveProjectInvoice`]="{ item }">
        <v-btn icon="mdi-ok" @click="approveProjectInvoicePayment(item)"> </v-btn>
      </template>

      <template v-slot:[`item.actionDelete`]="{ item }">
        <v-btn icon="mdi-delete-alert" @click="deleteProjectSubContractorInvoice(item)">
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
  store.dispatch("projects/loadProjectSubContractorInvoices", projectId);
  store.dispatch("projects/loadProjectSubContractorInvoiceSummary", projectId);
});

const projectSubContractorInvoiceSummary = computed(() => {
  return store.getters["projects/loadedProjectSubContractorInvoiceSummary"];
});
const projectSubContractorInvoices = computed(() => {
  return store.getters["projects/loadedProjectSubContractorInvoices"];
});
const subContractors = computed(() => {
      return store.getters["subcontractors/loadedSubContractors"];
    });

const downloadSubContractorInvoice = (item) => {
  console.log("downloading subcontractor invoice..");
  console.log(item);
  store.dispatch("subcontractors/downloadSubContractorInvoice", item);
};

const saveProjectSubContractorInvoice = () => {
  if (editedProjectSubContractorInvoiceIndex.value > -1) {
    const formData = {
      id: editedProjectSubContractorInvoice.id,
     // subContractorId: id,
      projectId: editedProjectSubContractorInvoice.projectId,
      invoiceRef: editedProjectSubContractorInvoice.invoiceRef,
      status: editedProjectSubContractorInvoice.status,
      description: editedProjectSubContractorInvoice.description,
      currency: editedProjectSubContractorInvoice.currency,
      grossAmount: editedProjectSubContractorInvoice.grossAmount,
      netAmount: editedProjectSubContractorInvoice.netAmount,
      invoiceDate: editedProjectSubContractorInvoice.invoiceDate,
      paymentDueDate: editedProjectSubContractorInvoice.paymentDueDate,
    };
    console.log("Updating project invoice details");
    console.log(formData);
    store.dispatch("subcontractors/updateSubContractorInvoice", formData).then(
      setTimeout(() => {
        store.dispatch("projects/loadProjectSubContractorInvoices", projectId);
        store.dispatch("projects/loadProjectSubContractorInvoiceSummary", projectId);
      }, 300)
    );
  } else {
    console.log("Creating new subcontractor invoice for project");
    const formData = {
      subContractorId: editedProjectSubContractorInvoice.subContractorId,
      projectId: projectId,
      invoiceRef: editedProjectSubContractorInvoice.invoiceRef,
      description: editedProjectSubContractorInvoice.description,
      status: editedProjectSubContractorInvoice.status,
      currency: editedProjectSubContractorInvoice.currency,
      grossAmount: editedProjectSubContractorInvoice.grossAmount,
      netAmount: editedProjectSubContractorInvoice.netAmount,
      invoiceDate: editedProjectSubContractorInvoice.invoiceDate,
      paymentDueDate: editedProjectSubContractorInvoice.paymentDueDate,
      invoiceFile: subContractorInvoiceFile.value,
    };
    console.log(formData);
    store.dispatch("subcontractors/createSubContractorInvoice", formData).then(
      setTimeout(() => {
        store.dispatch("projects/loadProjectSubContractorInvoices", projectId);
        store.dispatch("projects/loadProjectSubContractorInvoiceSummary", projectId);
      }, 300)
    );
  }
  closeProjectSubContractorInvoiceDialog();
};
const showProjectSubContractorEditDialog = (item) => {
  console.log("Showing Edit Invoice Dialog for operative with id " + item.id);
  editedProjectSubContractorInvoiceIndex.value = projectSubContractorInvoices.value.findIndex(
    (i) => i.id == item.value
  );
  const obj = projectSubContractorInvoices.value.find((i) => i.id == item.value);
  Object.assign(editedProjectSubContractorInvoice, obj);
  projectSubContractorInvoiceDialog.value = true;
};
const closeProjectSubContractorInvoiceDialog = () => {
  projectSubContractorInvoiceDialog.value = false;
  setTimeout(() => {
    Object.assign(editedProjectSubContractorInvoice, defaultProjectSubContractorInvoice);
    editedProjectSubContractorInvoiceIndex.value = -1;
  }, 300);
};
const approveProjectInvoicePayment = (item) => {
  const obj = projectSubContractorInvoices.value.find((i) => i.id == item.value);
  store.dispatch("subcontractors/approveSubContractorInvoicePayment", obj);
  closeProjectSubContractorInvoiceDialog();
};

const deleteProjectSubContractorInvoice = (item) => {
  console.log("Delete SubContractor Invoice Event Received..");
  const obj = projectSubContractorInvoices.value.find((i) => i.id == item.value);
  store.dispatch("subcontractors/deleteSubContractorInvoice", obj);
};

const projectSubContractorInvoiceTableHeaders = [
  { title: "Company", key: "subContractorName" },
  { title: "Status", key: "status" },
  { title: "InvoiceRef", key: "invoiceRef" },
  // { title: 'Description', key: 'description' },
  { title: "Currency", key: "currency" },
  { title: "Gross", key: "grossAmount", width: 150 },
  { title: "Net", key: "netAmount", width: 150 },
  { title: "Issued", key: "invoiceDate", width: "125px" },
  { title: "Payment", key: "paymentDueDate", width: "125px" },
  { title: "Download", align: "left", key: "actionDownloadProjectInvoice" },
  { title: "Approve", align: "left", key: "actionApproveProjectInvoice" },
  { title: "Edit", align: "left", key: "actionEdit" },
  { title: "Delete", align: "left", key: "actionDelete" },
];
const search = ref('');
const projectSubContractorInvoiceDialog = ref(false);
const editedProjectSubContractorInvoiceIndex = ref(-1);
const subContractorInvoiceFile = ref(null);
const editedProjectSubContractorInvoice = reactive({
  id: "",
  projectId: projectId,
  subContractorId: "",
  invoiceRef: "",
  description: "",
  currency: "",
  netAmount: "",
  invoiceDate: null,
  paymentDueDate: null,
  invoiceFile: null,
  status: "",
});
const defaultProjectSubContractorInvoice = reactive({
  subContractorId: "",
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

const invoiceStatusListSelection = [
      { title: "UNPAID", key: "UNPAID" },
      { title: "APPROVED_FOR_PAYMENT", key: "APPROVED_FOR_PAYMENT" },
      { title: "PAID", key: "PAID" },
    ];
</script>
