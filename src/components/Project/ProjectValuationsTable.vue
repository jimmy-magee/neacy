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
        <v-dialog v-model="projectValuationDialog" activator="parent">
          <v-card>
            <v-card-title>
              <span>Valuation Details</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-layout row>
                  <v-select
                    :items="invoiceStatusListSelection"
                    v-model="editedProjectValuation.status"
                    label="Status"
                    single
                  ></v-select>
                </v-layout>
                <v-layout row>
                  <v-textarea
                    name="description"
                    label="Description"
                    id="description"
                    v-model="editedProjectValuation.description"
                    required
                  >
                  </v-textarea>
                </v-layout>
                <v-layout row>
                  <v-text-field
                    v-model="editedProjectValuation.currency"
                    label="Currency"
                  >
                  </v-text-field>

                  <v-text-field
                    v-model="editedProjectValuation.grossAmount"
                    label="Gross Amount"
                  ></v-text-field>

                  <v-text-field
                    v-model="editedProjectValuation.netAmount"
                    label="Net Amount"
                  >
                  </v-text-field>
                </v-layout>

                <v-layout row>
                  <v-dialog
                    ref="projectValuationDateDialog"
                    v-model="projectValuationDateModal"
                    persistent
                    width="50%"
                    activator="parent"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="editedProjectValuation.invoiceDate"
                        label="Date Issued"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="editedProjectValuation.invoiceDate"
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click="projectValuationDateModal = false"
                      >
                        Cancel</v-btn
                      >
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.projectValuationDateDialog.save(date)"
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-dialog>

                  <v-dialog
                    ref="projectValuationPaymentDueDateDialog"
                    v-model="projectValuationPaymentDueDateModal"
                    persistent
                    width="50%"
                    activator="parent"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="editedProjectValuation.paymentDueDate"
                        label="Payment Due Date"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      >
                      </v-text-field>
                    </template>
                    <v-date-picker
                      v-model="editedProjectValuation.paymentDueDate"
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click="projectValuationPaymentDueDateModal = false"
                        >Cancel</v-btn
                      >
                      <v-btn
                        text
                        color="primary"
                        @click="
                          $refs.projectValuationPaymentDueDateDialog.save(date)
                        "
                        >OK
                      </v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-layout>

                <v-layout row v-if="editedProjectValuationIndex < 0">
                  <v-file-input
                    ref="projectValuationFiles"
                    label="Upload Valuation"
                    filled
                    prepend-icon="mdi-camera"
                  ></v-file-input>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" @click="closeProjectValuationDialog"
                >Cancel
              </v-btn>
              <v-btn color="blue darken-1" @click="saveProjectValuation">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-btn>
    </v-card-title>
    <h3>Valuation Summary</h3>
    <v-layout row v-if="projectValuationSummary">
      <v-text-field
        v-model="projectValuationSummary.totalInvoiceCount"
        label="Valuation Count"
        readonly
      ></v-text-field>

      <v-text-field
        v-model="projectValuationSummary.invoicesGrossAmountTotal"
        label="Valuation Total Gross"
        readonly
      ></v-text-field>

      <v-text-field
        v-model="projectValuationSummary.invoicesNetAmountTotal"
        label="Valuation Total Net"
        readonly
      ></v-text-field>
    </v-layout>
    <v-layout row v-if="projectValuationSummary">
      <v-text-field
        v-model="projectValuationSummary.unPaidInvoicesCount"
        label="Valuation Count (Not Paid)"
        readonly
      ></v-text-field>

      <v-text-field
        v-model="projectValuationSummary.unPaidInvoicesGrossAmount"
        label="Valuation Total Gross (Not Paid)"
        readonly
      ></v-text-field>

      <v-text-field
        v-model="projectValuationSummary.unPaidInvoicesNetAmount"
        label="Valuation Total Net (Not Paid)"
        readonly
      ></v-text-field>
    </v-layout>
    <v-layout row v-if="projectValuationSummary">
      <v-text-field
        v-model="projectValuationSummary.paidInvoicesCount"
        label="Valuation Count (Paid)"
        readonly
      ></v-text-field>

      <v-text-field
        v-model="projectValuationSummary.paidInvoicesGrossAmount"
        label="Valuation Total Gross (Paid)"
        readonly
      ></v-text-field>

      <v-text-field
        v-model="projectValuationSummary.paidInvoicesNetAmount"
        label="Valuation Total Net (Paid)"
        readonly
      ></v-text-field>
    </v-layout>
    <h3>Valuation Details</h3>

    <v-data-table
      :headers="projectValuationTableHeaders"
      :calculate-widths="true"
      :items="projectValuations"
      :search="search"
    >
      <template v-slot:[`item.actionDownloadProjectValuation`]="{ item }">
        <v-btn icon="mdi-download" @click="downloadProjectValuation(item)"> </v-btn>
      </template>
      <template v-slot:[`item.actionEdit`]="{ item }">
        <v-btn icon="mdi-file-edit-outline" @click="showProjectValuationEditDialog(item)">
        </v-btn>
      </template>
      <template v-slot:[`item.actionDelete`]="{ item }">
        <v-btn icon="mdi-delete-alert" @click="deleteProjectValuation(item)"> </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>
<script setup>
import { computed, ref, reactive, defineProps, onMounted } from "vue";
import { useStore } from "vuex";

// eslint-disable-next-line
/* eslint-disable */
const { projectId, title, color } = defineProps(["projectId", "title", "color"]);
const store = useStore();

onMounted(() => {
  console.log("Loading boq data for project id " + projectId);
  store.dispatch("projects/loadProjectValuations", projectId);
});

const projectValuations = computed(() => {
  return store.getters["projects/loadedProjectValuations"];
});

const search = ref("");

const projectValuationTableHeaders = [
  { title: "Title", key: "title" },
  { title: "Description", key: "description" },
  { title: "Status", key: "status" },
  { title: "Gross", key: "grossAmount", width: 150 },
  { title: "Net", key: "netAmount", width: 150 },
  { title: "Created", key: "createdAt", width: "125px" },
  { title: "Issued", key: "issued", width: "125px" },
  { title: "Download", align: "left", key: "actionDownloadProjectValuation" },
  { title: "Edit", align: "left", key: "actionEdit" },
  { title: "Delete", align: "left", key: "actionDelete" },
];

const projectValuationDialog = ref(false);

const editedProjectValuationIndex = ref(-1);
const editedProjectValuation = reactive({
  id: "",
  projectId: id,
  customerId: "",
  invoiceRef: "",
  description: "",
  currency: "",
  grossAmount: "",
  netAmount: "",
  valuationDate: null,
  paymentDueDate: null,
  valuationFile: null,
  status: "",
});
const defaultProjectValuation = reactive({
  customerId: "",
  projectId: id,
  invoiceRef: "",
  description: "",
  currency: "",
  grossAmount: "",
  netAmount: "",
  valuationDate: null,
  paymentDueDate: null,
  valuationFile: null,
  status: "",
});

const projectValuationFiles = ref(null);

const closeProjectValuationDialog = () => {
  projectValuationDialog.value = false;
};

const saveProjectValuation = () => {
  console.log("Uploading valuation files");
  console.log(projectValuationFiles.value.files);
  const formData = {
    projectId: id,
    description: editedProjectValuation.description,
    status: editedProjectValuation.status,
    grossAmount: editedProjectValuation.grossAmount,
    netAmount: editedProjectValuation.netAmount,
    valuationFiles: projectValuationFiles.value,
  };
  store.dispatch("projects/bulkUploadProjectValuations", formData);
  projectValuationDialog.value = false;
};

const downloadProjectValuation = (item) => {
  console.log("downloading project valuation..");
  console.log(item);
  const obj = projectValuations.value.find((i) => i.id == item.value);
  store.dispatch("projects/downloadProjectValuation", obj);
};
</script>
