<template>
  <v-card>
    <v-card-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="searchRoomScheduleBoQTreeView"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      >
      </v-text-field>
      <!--
    <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details>
    </v-text-field>
  -->
    </v-card-title>
    <h3>Room Schedule BoQ</h3>

    <!--
  <v-card
    class="mx-auto"
    max-width="500"
  >
    <v-sheet class="pa-4 primary lighten-2">
      <v-text-field
        v-model="search"
        label="Search Company Directory"
        dark
        flat
        solo-inverted
        hide-details
        clearable
        clear-icon="mdi-close-circle-outline"
      ></v-text-field>
      <v-checkbox
        v-model="caseSensitive"
        dark
        hide-details
        label="Case sensitive search"
      ></v-checkbox>
    </v-sheet>
    <v-card-text>
      <v-treeview
        :items="items"
        :search="search"
        :filter="filter"
        :open.sync="open"
      >
        <template v-slot:prepend="{ item }">
          <v-icon
            v-if="item.children"
            v-text="`mdi-${item.id === 1 ? 'home-variant' : 'folder-network'}`"
          ></v-icon>
        </template>
      </v-treeview>
    </v-card-text>
  </v-card>
  -->
    <!-- :items="filteredProjectRoomScheduleBoQ" -->
    <v-treeview
      :items="filteredProjectRoomScheduleBoQ"
      v-model="openTreeNodes"
      :filter="filter"
      :search="searchRoomScheduleBoQTreeView"
    >
      <template v-slot:[`prepend`]="{ item }">
        <v-icon v-if="item.children"> room </v-icon>
        <v-icon v-if="!item.children"> settings </v-icon>
      </template>

      <template v-slot:[`label`]="{ item }">
        <p v-if="item.children">{{ item.roomName }} : {{ item.cost }}</p>

        <p v-if="!item.children">
          {{ item.boqItemName }} : {{ item.quantity }} :
          {{ item.boqItemContractRate }}
        </p>
      </template>
    </v-treeview>

    <!--
  <v-data-table :headers="projectRoomScheduleBoQTableHeaders" :calculate-widths="true"
    :items="projectRoomScheduleBoQ"
    :search="searchRoomScheduleBoQ"
    group-by="roomName">

  </v-data-table>
  -->
  </v-card>
</template>
<script setup>
import { computed, ref, defineProps, reactive, watch, onMounted } from "vue";
import { useStore } from "vuex";

//eslint-disable-next-line
const { projectId } = defineProps(["projectId"]);

const store = useStore();

onMounted(() => {
  console.log("Loading room schedule boq for project id " + projectId);
  store.dispatch("projects/loadProjectRoomScheduleBoQ", projectId);
});

/*
const boQByRoomScheduleList = computed(() => {
  return store.getters["projects/boQByRoomScheduleList"];
});
*/
/*

*/
/*
*/
const searchRoomScheduleBoQTreeView = ref("");
const openTreeNodes = reactive([]);
const filteredProjectRoomScheduleBoQ = [];
/*
const projectRoomScheduleBoQTableHeaders = [
  { title: "Room Name", key: "roomName" },
  { title: "Category", key: "boqItemCategory" },
  { title: "Name", key: "boqItemName" },

  { title: "Quantity", key: "quantity" },
  { title: "Unit", key: "unit", default: 0 },
  { title: "Cost", key: "boqItemContractRate" },
  { title: "Cost", key: "cost" },
  { title: "BoQ", key: "boqItems" },
];
*/
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
  filteredProjectRoomScheduleBoQ.value = newValue;
});


</script>
