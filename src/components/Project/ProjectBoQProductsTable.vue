<template>
  <v-card>
    <v-card-title></v-card-title>
    <v-data-table
      :headers="productTableHeaders"
      :calculate-widths="true"
      :items="boQProducts"
      :search="search"
    >
    </v-data-table>
  </v-card>
</template>
<script setup>
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";

//eslint-disable-next-line
const { projectId } = defineProps(["projectId"]);

const store = useStore();

onMounted(() => {
  console.log("Loading room schedule boq for project id " + projectId);
  store.dispatch("projects/loadProjectProducts", projectId);
});

const boQProducts = computed(() => {
  return store.getters["projects/loadedProjectProducts"];
});

const search = ref('');
const productTableHeaders = [
  {
    title: "Product",
    align: "left",
    sortable: true,
    key: "name",
  },
  {
    title: "Description",
    align: "left",
    sortable: true,
    key: "description",
  },
  {
    title: "Supplier",
    align: "left",
    sortable: true,
    key: "supplierName",
  },
  { title: "units", key: "units" },
  { title: "Cost", key: "cost" },
  { title: "Product Code", key: "productCode" },
  { title: "leadInTimeInDays", key: "leadInTimeInDays" },
  { title: "Status", key: "status" },
];
</script>
