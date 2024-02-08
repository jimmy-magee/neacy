<template>
  <v-card>
    <v-card-title>
      RFI Schedule
      <v-spacer></v-spacer>
      <v-text-field
        v-model="searchProjectRFIs"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon color="green">
        <v-icon icon="mdi-plus"></v-icon>
        <v-dialog v-model="projectRFIDialog" activator="parent">
          <v-card>
            <v-card-title>
              <span class="headline">Project RFI</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-layout row>
                  <v-text-field
                    v-model="editedProjectRFI.name"
                    label="Reference"
                  ></v-text-field>
                </v-layout>

                <v-layout row>
                  <v-textarea
                    v-model="editedProjectRFI.description"
                    label="Description"
                  ></v-textarea>
                </v-layout>

                <v-layout row>
                  <v-text-field
                    v-model="editedProjectRFI.location"
                    label="Location"
                  ></v-text-field>
                </v-layout>

                <v-layout row>
                  <v-select
                    :items="rfiStatus"
                    v-model="editedProjectRFI.status"
                    item-value="id"
                    item-title="name"
                    label="Status"
                  >
                  </v-select>
                </v-layout>

                <v-layout row>
                  <v-text-field v-model="editedProjectRFI.assignedTo" label="Assigned To">
                  </v-text-field>
                </v-layout>

                <v-layout row>
                  <v-dialog
                    ref="projectRFIDateAssignedDialog"
                    v-model="projectRFIDateAssignedModal"
                    persistent
                    activator="parent"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="editedProjectRFI.dateAssigned"
                        label="Date Assigned"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="editedProjectRFI.dateAssigned" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click="projectRFIDateAssignedModal = false"
                        >Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.projectRFIDateAssignedDialog.save(date)"
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-dialog>
                </v-layout>

                <v-layout row>
                  <v-dialog
                    ref="projectRFIDateRequiredDialog"
                    v-model="projectRFIDateRequiredModal"
                    persistent
                    activator="parent"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="editedProjectRFI.dateRequired"
                        label="Date Required By"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="editedProjectRFI.dateRequired" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click="projectRFIDateRequiredModal = false"
                        >Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.projectRFIDateRequiredDialog.save(date)"
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-dialog>
                </v-layout>

                <v-layout row>
                  <v-textarea
                    v-model="editedProjectRFI.response"
                    label="Response"
                  ></v-textarea>
                </v-layout>

                <v-layout row>
                  <v-dialog
                    ref="projectRFIDateAnsweredDialog"
                    v-model="projectRFIDateAnsweredModal"
                    persistent
                    activator="parent"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="editedProjectRFI.dateAnswered"
                        label="Date Answered"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="editedProjectRFI.dateAnswered" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click="projectRFIDateAnsweredModal = false"
                        >Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.projectRFIDateAnsweredDialog.save(date)"
                        adminTab-2
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-dialog>
                </v-layout>

                <v-layout row>
                  <v-textarea
                    v-model="editedProjectRFI.comments"
                    label="Comments"
                  ></v-textarea>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" @click="closeProjectRFIDialog">Cancel</v-btn>
              <v-btn color="blue darken-1" @click="saveOrUpdateProjectRFI">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-btn>
    </v-card-title>
    <v-data-table
      :headers="projectRFITableHeaders"
      :calculate-widths="true"
      :items="projectRFIs"
      :search="searchProjectRFIs"
    >
      <template v-slot:[`item.actionEdit`]="{ item }">
        <v-btn icon="mdi-file-edit-outline" @click="openProjectRFIDialog(item)"> </v-btn>
      </template>
      <template v-slot:[`item.actionDelete`]="{ item }">
        <v-btn icon="mdi-delete-alert" @click="deleteProjectRFI(item)"> </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>
<script setup>
import { computed, ref, reactive, onMounted } from "vue";
import { useStore } from "vuex";

//eslint-disable-next-line
const { projectId } = defineProps(["projectId"]);

const store = useStore();

onMounted(() => {
  console.log("Loading rfi's for project id " + projectId);
  store.dispatch("projects/loadProjectRFIs", projectId);
});

const projectRFIs = computed(() => {
  return store.getters["projects/loadedProjectRFIs"];
});

const saveOrUpdateProjectRFI = () => {
  editedProjectRFI.projectId = projectId;

  if (editedProjectRFIIndex.value == -1) {
    store.dispatch("projects/createProjectRFI", editedProjectRFI);
  } else {
    store.dispatch("projects/updateProjectRFI", editedProjectRFI);
  }
  closeProjectRFIDialog();
  console.log("Updating project rfi");
  console.log(editedProjectRFI);
  projectRFIDateRequiredModal.value = false;
};
const deleteProjectRFI = (item) => {
  console.log("onDeleteDrawing Event Received..");
  console.log(item);
  store.dispatch("projects/deleteProjectRFI", item);
};
const openProjectRFIDialog = (item) => {
  editedProjectRFIIndex.value = projectRFIs.value.indexOf(item);
  Object.assign(editedProjectRFI, item);
  var dateAssigned = new Date(editedProjectRFI.dateAssigned).toISOString().substr(0, 10);
  editedProjectRFI.dateAssigned = dateAssigned;
  var dateRequired = new Date(editedProjectRFI.dateRequired).toISOString().substr(0, 10);
  editedProjectRFI.dateRequired = dateRequired;
  var dateAnswered = new Date(editedProjectRFI.dateAnswered).toISOString().substr(0, 10);
  editedProjectRFI.dateAnswered = dateAnswered;
  projectRFIDialog.value = true;
};
const closeProjectRFIDialog = () => {
  projectRFIDialog.value = false;
  setTimeout(() => {
    Object.assign(editedProjectRFI, defaultProjectRFI);
    editedProjectRFIIndex.value = -1;
  }, 300);
};

const rfiStatus = ["Open", "Closed"];
const projectRFIDialog = ref(false);
const projectRFIDateAssignedDialog = ref(false);
const projectRFIDateAssignedModal = ref(false);
const projectRFIDateRequiredDialog = ref(false);
const projectRFIDateRequiredModal = ref(false);
const projectRFIDateAnsweredDialog = ref(false);
const projectRFIDateAnsweredModal = ref(false);

const projectRFITableHeaders = [
  { title: "Status", key: "status" },
  { title: "Reference", key: "name" },
  { title: "AssignedTo", key: "assignedTo" },
  { title: "Date Required", key: "dateRequired" },
  { title: "Edit", align: "left", key: "actionEdit" },
  { title: "Delete", align: "left", key: "actionDelete" },
];
const searchProjectRFIs = ref("");
const editedProjectRFIIndex = ref(-1);
const editedProjectRFI = reactive({
  id: "",
  projectId: projectId,
  name: "",
  description: "",
  location: "",
  assignedTo: "",
  dateAssigned: "",
  dateRequired: "",
  dateAnswered: "",
  response: "",
  status: "",
  comments: "",
  createdBy: "",
  createdAt: "",
  updatedBy: "",
  updatedAt: "",
});
const defaultProjectRFI = reactive({
  projectId: projectId,
  name: "",
  description: "",
  location: "",
  assignedTo: "",
  dateAssigned: "",
  dateRequired: "",
  dateAnswered: "",
  response: "",
  status: "",
  comments: "",
  createdBy: "",
  createdAt: "",
  updatedBy: "",
  updatedAt: "",
});
</script>
