<template>
<v-layout row v-if="projectBoQSummary">
        <v-text-field
          v-model="projectBoQSummary.totalNumberOfBillItems"
          label="Total Bill Items"
        >
        </v-text-field>

        <v-text-field v-model="projectBoQSummary.totalGrossValue" label="Contract Value">
        </v-text-field>
      </v-layout>
      <v-layout row v-if="projectBoQSummary">
        <v-text-field
          v-model="projectBoQSummary.certifiedToDateAmount"
          label="Amount Certified (to date)"
        ></v-text-field>

        <v-text-field
          v-model="projectBoQSummary.claimedToDateAmount"
          label="Amount Claimed (to date)"
        ></v-text-field>

        <v-text-field
          v-model="projectBoQSummary.paidToDateAmount"
          label="Amount Paid (to date)"
        >
        </v-text-field>
      </v-layout>
</template>
<script setup>
import { computed, defineProps, onMounted } from "vue";
import { useStore } from "vuex";

// eslint-disable-next-line
/* eslint-disable */
const { projectId } = defineProps(["projectId"]);
const store = useStore();


onMounted(() => {
  store.dispatch("projects/loadProjectBoQSummary", projectId);
});

const projectBoQSummary = computed(() => {
  return store.getters["projects/loadedProjectBoQSummary"];
});
</script>