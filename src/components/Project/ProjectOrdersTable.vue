<template>
  <v-card>
    <v-card-title></v-card-title>

    <v-data-table
      :headers="orderTableHeaders"
      :calculate-widths="true"
      :items="orders"
      :search="search"
    >
    </v-data-table>
  </v-card>
</template>
<script setup>
import { computed, ref,  onMounted } from "vue";
import { useStore } from "vuex";

//eslint-disable-next-line
const { projectId } = defineProps(["projectId"]);

const store = useStore();

onMounted(() => {
  console.log("Loading orders for project id " + projectId);
  store.dispatch("projects/loadProjectOrders", projectId);
});
const search = ref("");
const orders = computed(() => {
  return store.getters["projects/loadedProjectOrders"];
});

const orderTableHeaders = [
  {
    title: "Product",
    align: "left",
    sortable: true,
    key: "productName",
  },
  {
    title: "Supplier",
    align: "left",
    sortable: true,
    key: "supplierName",
  },
  { title: "Quantity", key: "quantity" },
  { title: "Unit Cost", key: "unitCost" },
  { title: "Total Cost", key: "totalCost" },
  { title: "Delivery Date", key: "deliveryDate" },
  { title: "Status", key: "status" },
];
</script>
