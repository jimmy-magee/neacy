<template>
  <v-card>
    <v-text-field
      v-model="searchProjectQuotations"
      label="Search Quotations"
      flat
      solo-inverted
      hide-details
      clearable
      clear-icon="mdi-close-circle-outline"
    ></v-text-field>

    <v-data-table
      :headers="projectQuotationTableHeaders"
      :calculate-widths="true"
      :items="projectQuotations"
      :search="searchProjectQuotations"
    >
      <template v-slot:[`item.actionDownloadProjectQuotation`]="{ item }">
        <v-btn icon @click="downloadProjectQuotation(item)">
          <v-icon icon="mdi-download"></v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>
<script setup>
import { computed, ref, defineProps, onMounted } from "vue";
import { useStore } from "vuex";

//eslint-disable-next-line
const { projectId } = defineProps(["projectId"]);

const store = useStore();

onMounted(() => {
  console.log("Loading quotations for project id " + projectId);
  store.dispatch("projects/loadProjectQuotations", projectId);
  store.dispatch("projects/loadProjectQuotationSummary", projectId);
});

const projectQuotationTableHeaders = [
  { title: "Comapny", key: "companyName" },
  { title: "Type", key: "type" },
  { title: "Ref", key: "quotationRef" },
  { title: "Gross Value", key: "grossAmount" },
  { title: "Currency", key: "currency" },
  { title: "Received", key: "quotationDate", width: "125px" },
  { title: "Download", align: "left", key: "actionDownloadProjectQuotation" },
];

const searchProjectQuotations = ref("");

//const projectQuotationDialog = ref(false);
//const projectQuotationDateDialog = ref(false);
//const projectQuotationDateModal = ref(false);
//const projectQuotationDateReceivedDialog = ref(false);
//const projectQuotationDateReceivedModal = ref(false);
/*
const editedSubContractorQuotationIndex = ref(-1);
const editedSubContractorQuotation = reactive({
  id: "",
  subContractorId: "",
  projectId: id,
  quotationRef: "",
  description: "",
  currency: "",
  netAmount: "",
  quotationDate: null,
  dateReceived: null,
  quotationFile: null,
  status: "",
});
const defaultSubContractorQuotation = reactive({
  subContractorId: "",
  projectId: id,
  quotationRef: "",
  description: "",
  currency: "",
  netAmount: "",
  quotationDate: null,
  paymentDueDate: null,
  quotationFile: null,
  status: "",
});*/

/*
const downloadSubContractorQuotation = (item) => {
  console.log("downloading item requested..");
  console.log(item);
  store.dispatch("subcontractors/downloadSubContractorQuotation", item);
};

const projectQuotationSummary = computed(() => {
  return store.getters["projects/loadedProjectQuotationSummary"];
});
*/
const projectQuotations = computed(() => {
  return store.getters["projects/loadedProjectQuotations"];
});

const downloadProjectQuotation = (item) => {
  const obj = projectQuotations.value.find((q) => q.id == item.value);
  console.log(item.value);
  console.log(obj.type);
  if (obj.type == "SubContractor") {
    const payload = {
      supplierId: obj.companyId,
      id: obj.id,
      fileName: obj.fileName,
    };
    console.log("dispatching download subcontractor quotation");
    console.log(payload);
    store.dispatch("subcontractors/downloadSubContractorQuotation", payload);
  }
  if (obj.type == "Supplier") {
    console.log("downloading project quotation requested..");
    store.dispatch("suppliers/downloadSupplierQuotation", obj);
  }
};
</script>
