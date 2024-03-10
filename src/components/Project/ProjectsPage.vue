<template>
  <v-container fluid>
    <!--
    <v-layout row v-if="error">
      <v-sheet xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error"></app-alert>
      </v-sheet>
    </v-layout>
    -->

    <v-layout row>
      <v-card width="100%">
        <v-card-title>
          Projects
         
          <v-btn
            class="float-right"
            icon
            v-if="userIsAuthenticatedAndHasRoleAdmin"
            color="green"
            :to="'/projects/new'"
          >
            <v-icon icon="mdi-plus"></v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-data-table :headers="projectTableHeaders" :items="projects" :search="search">
            <template v-slot:top>
              <v-text-field
                v-model="search"
                label="Search"
                class="pa-2"
              ></v-text-field>
            </template>
            <template v-slot:[`item.actionEdit`]="{ item }">
              <v-btn icon @click="editProject(item)">
                <v-icon color="green" icon="mdi-arrow-right"></v-icon>
              </v-btn>
            </template>
            <!--
            <template v-slot:[`item.actionDelete`]="{ item }">
              <v-btn icon="mdi-delete-alert" @click="deleteProject(item.value)">
              </v-btn>
            </template>
           -->
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import { computed, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    onMounted(() => {
      store.dispatch("projects/loadProjects");
    });

    const projectTableHeaders = [
      { title: "Id", key: "id", align: " d-none" },
      {
        title: "Name",
        align: "left",
        sortable: true,
        key: "name",
      },

      { title: "Description", key: "description" },
      { title: "Address", key: "address" },
      { title: "Customer", key: "customerName", align: " d-none" },
      { title: "ContractValue", key: "contractValue", align: " d-none" },
      { title: "Duration", key: "contractDuration", align: " d-none" },
      { title: "LADs", key: "contractLADs", align: " d-none" },
      {
        title: "Mechanical And ElectricalEngineer",
        key: "mechanicalAndElectricalEngineer",
      },
      { title: "Architect", key: "architect", align: " d-none" },
      {
        title: "Client Quantity Surveryor",
        key: "clientQuantitySurveyor",
        align: " d-none",
      },
      { title: "View", align: "left", key: "actionEdit" },
    ];

    const search = ref("");
    const dialog = ref(false);
    const editedIndex = ref(-1);
    const editedItem = reactive({
      id: "",
      name: "",
      description: "",
    });
    const defaultItem = reactive({
      id: "",
      name: "",
      description: "",
    });
    const projects = computed(() => store.getters["projects/loadedProjects"]);
    const formTitle = computed(() =>
      editedIndex.value === -1 ? "New Supplier Category" : "Edit Supplier Category"
    );
    const loading = computed(() => store.getters[("loading", { root: true })]);
    const error = computed(() => store.getters[("error", { root: true })]);
    const userIsAuthenticatedAndHasRoleAdmin = computed(
      () => store.getters["users/userIsAuthenticatedAndHasRoleAdmin"]
    );

    const editProject = (selectedRow) => {
      console.log("Edit item " + selectedRow);
      console.log(selectedRow.id);
      editedIndex.value = projects.value.findIndex((sc) => sc.id == selectedRow.id);
      const obj = projects.value.find((sc) => sc.id == selectedRow.id);
      Object.assign(editedItem, obj);
      dialog.value = true;
      console.log("navigating to project details page");
      console.log(editedItem);
      router.push("/projects/" + selectedRow.id);
    };

    const updateProject = () => {
      if (editedIndex.value === -1) {
        console.log("Creating  project");
        console.log(editedItem);
        store.dispatch("projects/createProject", editedItem);
      } else {
        console.log("Updating  project");
        console.log(editedItem);
        store.dispatch("projects/updateProject", editedItem);
      }
      close();
    };
    const deleteProject = (item) => {
      console.log("Delete project Event Received..");
      console.log(item);
      store.dispatch("projects/deleteProject", item);
    };
    const close = () => {
      dialog.value = false;
      setTimeout(() => {
        Object.assign(editedItem, defaultItem);
        editedIndex.value = -1;
      }, 300);
    };
    const onDismissed = () => {
      store.dispatch("clearError", { root: true });
    };

    return {
      projects,
      projectTableHeaders,
      search,
      dialog,
      editedIndex,
      editedItem,
      defaultItem,
      formTitle,
      loading,
      error,
      userIsAuthenticatedAndHasRoleAdmin,
      editProject,
      updateProject,
      deleteProject,
      close,
      onDismissed,
    };
  },
};
</script>
