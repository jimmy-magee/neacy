<template>
  <v-card>
    <v-data-table
      :headers="projectRoomScheduleBoQTableHeaders"
      :calculate-widths="true"
      :items="projectRoomScheduleBoQ"
      :custom-filter="filterRoomScheduleBoQ"
      v-model:search="searchRoomScheduleBoQ"
      :group-by="groupBy"
    >
      <template v-slot:top>
        <v-text-field
          v-model="searchRoomScheduleBoQ"
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
          <td>{{ item.boqItemName }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.unit }}</td>
          <td>{{ item.boqItemContractRate }}</td>
          <td>{{ calculateTotalCost(item.boqItemContractRate, item.quantity) }}</td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>
<script setup>
import { computed, ref, defineProps, watch, onMounted } from "vue";
import { useStore } from "vuex";

//eslint-disable-next-line
const { projectId } = defineProps(["projectId"]);

const store = useStore();

const searchRoomScheduleBoQ = ref("");

const filterRoomScheduleBoQ = (value, query, item) => {
 
  return item.raw.roomName.toLowerCase().indexOf(query) !== -1;
  /*
  return value != null &&
          query != null &&
          typeof value === 'string' &&
          value.toString().toLocaleUpperCase().indexOf(query) !== -1*/
};

const calculateTotalCost = (rate, qty) => {
  return (rate * qty).toFixed(2);
};
const groupBy = [
  {
    key: "roomName",
    order: "asc",
  },
];

onMounted(() => {
  console.log("Loading room schedule boq for project id " + projectId);
  store.dispatch("projects/loadProjectRoomScheduleBoQ", projectId);
});

const calculateTotalSpaceCosts = (items) => {
  return items
    .reduce(function (acc, obj) {
      return acc + obj.raw.quantity * obj.raw.boqItemContractRate;
    }, 0.0)
    .toFixed(2);
};

/*
const boQByRoomScheduleList = computed(() => {
  return store.getters["projects/boQByRoomScheduleList"];
});
*/
/*

*/
/*
 */
//const searchRoomScheduleBoQTreeView = ref("");
//const openTreeNodes = reactive([]);

const projectRoomScheduleBoQTableHeaders = [
  { title: "Name", key: "boqItemName" },
  { title: "Quantity", key: "quantity" },
  { title: "Unit", key: "unit" },
  { title: "Cost", key: "boqItemContractRate" },
  { title: "Total" },
];

const projectRoomScheduleBoQ = computed(() => {
  return store.getters["projects/loadedProjectRoomScheduleBoQ"];
});

watch(projectRoomScheduleBoQ, (newValue, oldValue) => {
  console.log(
    "computedProperty projectRoomScheduleBoQ was " +
      oldValue +
      ". Now it is " +
      JSON.stringify(newValue) +
      "."
  );
  //filteredProjectRoomScheduleBoQ.value = newValue;
});
</script>
