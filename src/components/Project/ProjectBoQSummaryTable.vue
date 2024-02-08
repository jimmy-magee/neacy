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
    </v-card-title>
    <h3>BoQ Summary</h3>

    <v-data-table
      :headers="projectBoQCategoryCostsTableHeaders"
      :calculate-widths="true"
      :items="projectBoQCategoryCosts"
      :search="search"
    >
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
  store.dispatch("projects/loadProjectBoQCategoryCosts", projectId);
});

const projectBoQCategoryCosts = computed(() => {
  return store.getters["projects/loadedProjectBoQCategoryCosts"];
});

const search = ref('');
const projectBoQCategoryCostsTableHeaders = [
  { title: "Category", key: "category" },
  { title: "Cost", key: "cost", default: 0 },
];
</script>
