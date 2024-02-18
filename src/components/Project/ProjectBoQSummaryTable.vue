<template>
  <v-card>
    <v-card-title>
      <h4>BoQ Summary</h4>
    </v-card-title>
    

    <v-data-table
      :headers="boqTableHeaders"
      :calculate-widths="true"
      :items="boq"
      :group-by="groupBy"
      :custom-filter="filterBoQCategories"
      :search="search"
    >
    <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Search"
          class="pa-2"
        ></v-text-field>
      </template>
      <template v-slot:group-header="{ item, columns, toggleGroup, isGroupOpen }">
        <tr>
          <td :colspan="columns.length">
            <VBtn
              size="small"
              variant="text"
              :icon="isGroupOpen(item) ? '$expand' : '$next'"
              @click="toggleGroup(item)"
            ></VBtn>
            {{ item.value }}
          </td>
          <td>{{ item.items.length }}</td>
          <td>
            <v-chip color="green">€ {{ calculateTotalSpaceCosts(item.items) }}</v-chip>
          </td>
        </tr>
      </template>

      <template v-slot:item="{ item }">
        <tr>
          <td></td>
          <td>{{ item.name }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.unit }}</td>
          <td>{{ item.materialCost }}</td>
          <td>{{ item.labourCost }}</td>
          <td>{{ item.contractRate }}</td>
          <td>{{ calculateTotalCost(item.contractRate, item.quantity) }}</td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";

// eslint-disable-next-line
const { projectId } = defineProps(["projectId"]);

const store = useStore();

onMounted(() => {
  console.log("Loading boq category summary for project id " + projectId);
  store.dispatch("projects/loadProjectBoQItems", projectId);
});

const boq = computed(() => {
  return store.getters["projects/loadedProjectBoQ"];
});

const calculateTotalCost = (rate, qty) => {
  return (rate * qty).toFixed(2);
};

const calculateTotalSpaceCosts = (items) => {
  return items
    .reduce(function (acc, obj) {
      return acc + obj.raw.quantity * obj.raw.contractRate;
    }, 0.0)
    .toFixed(2);
};

const search = ref("");

const boqTableHeaders = [
  { title: "Name", key: "name" },
  { title: "Qty (Contract)", key: "quantity" },
  { title: "Unit", key: "unit" },
  { title: "Material", key: "materialCost" },
  { title: "Labour", key: "labourCost" },
  { title: "Rate", key: "contractRate" },
  { title: "Total Contracted", key: "total", sortable: true },
];
const groupBy = [
  {
    key: "categoryName",
    order: "asc",
  },
];

const filterBoQCategories = (value, query, item) => {
 
 return item.raw.categoryName.toLowerCase().indexOf(query) !== -1;
};

</script>
