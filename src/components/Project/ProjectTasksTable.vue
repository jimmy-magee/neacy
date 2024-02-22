<template>
  <v-card>
    <v-card-title>
      Project Task Board
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      >
      </v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon color="green">
        <v-icon icon="mdi-plus"></v-icon>
        <v-dialog v-model="projectTaskDialog" activator="parent">
          <v-card>
            <v-card-title>
              <span>{{ projectTaskFormTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-layout row>
                  <v-select
                    :items="taskStatusTypes"
                    v-model="editedProjectTask.status"
                    item-value="id"
                    item-title="name"
                    label="Status"
                  ></v-select>
                </v-layout>
                <v-layout row>
                  <v-text-field
                    v-model="editedProjectTask.name"
                    label="Name"
                  ></v-text-field>
                </v-layout>
                <v-layout row>
                  <v-textarea
                    name="description"
                    label="Description"
                    id="description"
                    v-model="editedProjectTask.description"
                    required
                  >
                  </v-textarea>
                </v-layout>
                <!--
                            <v-layout row>

                             
                             <v-dialog
                                ref="dialog1"
                                v-model="modal1"
                                
                                persistent
                                width="50%"
                              >
                                <template v-slot:activator="{ on }">
                                  <v-text-field
                                    v-model="editedProjectTask.anticipatedStartDate"
                                    label="Anticipated Start Date"
                                    prepend-icon="event"
                                    readonly
                                    v-on="on"
                                  ></v-text-field>
                                </template>
                                <v-date-picker v-model="editedProjectTask.anticipatedStartDate" scrollable>
                                  <v-spacer></v-spacer>
                                  <v-btn text color="primary" @click="modal1 = false">Cancel</v-btn>
                                  <v-btn text color="primary" @click="$refs.dialog1.save(date)">OK</v-btn>
                                </v-date-picker>
                              </v-dialog>
                              

                              
                              <v-dialog
                                 ref="dialog2"
                                 v-model="modal2"
                                 
                                 persistent
                                 width="50%"
                               >
                                 <template v-slot:activator="{ on }">
                                   <v-text-field
                                     v-model="editedProjectTask.anticipatedCompletionDate"
                                     label="Anticipated Completion Date"
                                     prepend-icon="event"
                                     readonly
                                     v-on="on"
                                   ></v-text-field>
                                 </template>
                                 <v-date-picker v-model="editedProjectTask.anticipatedCompletionDate" scrollable>
                                   <v-spacer></v-spacer>
                                   <v-btn text color="primary" @click="modal2 = false">Cancel</v-btn>
                                   <v-btn text color="primary" @click="$refs.dialog2.save(date)">OK</v-btn>
                                 </v-date-picker>
                               </v-dialog>
                               
                            </v-layout>
                            <v-layout row>

                             
                             <v-dialog
                                ref="dialog3"
                                v-model="modal3"
                                
                                persistent
                                width="50%"
                              >
                                <template v-slot:activator="{ on }">
                                  <v-text-field
                                    v-model="editedProjectTask.actualStartDate"
                                    label="Actual Start Date"
                                    prepend-icon="event"
                                    readonly
                                    v-on="on"
                                  ></v-text-field>
                                </template>
                                <v-date-picker v-model="editedProjectTask.actualStartDate" scrollable>
                                  <v-spacer></v-spacer>
                                  <v-btn text color="primary" @click="modal3 = false">Cancel</v-btn>
                                  <v-btn text color="primary" @click="$refs.dialog3.save(date)">OK</v-btn>
                                </v-date-picker>
                              </v-dialog>
                              

                              
                              <v-dialog
                                 ref="dialog4"
                                 v-model="modal4"
                                 
                                 persistent
                                 width="50%"
                               >
                                 <template v-slot:activator="{ on }">
                                   <v-text-field
                                     v-model="editedProjectTask.actualCompletionDate"
                                     label="Actual Completion Date"
                                     prepend-icon="event"
                                     readonly
                                     v-on="on"
                                   ></v-text-field>
                                 </template>
                                 <v-date-picker v-model="editedProjectTask.actualCompletionDate" scrollable>
                                   <v-spacer></v-spacer>
                                   <v-btn text color="primary" @click="modal4 = false">Cancel</v-btn>
                                   <v-btn text color="primary" @click="$refs.dialog4.save(date)">OK</v-btn>
                                 </v-date-picker>
                               </v-dialog>
                               
                            </v-layout>

                            <v-layout row>


                            <v-row>
                                <v-col cols="12" sm="6" offset-sm="3">
                                  <v-card>
                                    <v-container fluid>
                                      <v-row>
                                        <v-col
                                          v-for="n in selectedProjectTaskImageMeta.length"
                                          :key="n"
                                          class="d-flex child-flex"
       const taskStatusTypes = ["OPENED", "IN PROGRESS", "COMPLETED"];
                                       cols="4"
                                        >
                                          <v-card flat tile class="d-flex">
                                            <v-img
                                              :src="selectedProjectTaskImageMeta[n-1].imageUrl"
                                              :lazy-src="selectedProjectTaskImageMeta[n-1].imageUrl"
                                              aspect-ratio="1"
                                              class="grey lighten-2"
                                            >
                                              <template v-slot:placeholder>
                                                <v-row
                                                  class="fill-height ma-0"
                                                  align="center"
                                                  justify="center"
                                                >
                                                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                                </v-row>
                                              </template>
                                            </v-img>
                                          </v-card>
                                        </v-col>
                                      </v-row>
                                    </v-container>
                                  </v-card>
                                </v-col>
                              </v-row>



                             <v-expansion-panels>
                               <v-expansion-panel value="closed">
                                 <v-expansion-panel-header>Add Images to Task</v-expansion-panel-header>
                                 <v-expansion-panel-content>
                                 <v-data-table
                                    :headers="imageMetadataTableHeaders"
                                    :calculate-widths="true"
                                    :items="projectImageMetadata"
                                    :search="search"
                                    show-select
                                    v-model="selectedProjectTaskImageMeta">

                                      <template v-slot:item.image="{ item }">
                                          <v-img
                                            :src="`http://localhost:8080/api/resource/projects/${item.projectId}/images/${item.id}/download`"
                                            :lazy-src="`http://localhost:8080/api/resource/projects/${item.projectId}/images/${item.id}/download`"
                                            aspect-ratio="1"
                                            class="grey lighten-2"
                                            max-width="300"
                                            max-height="200"
                                          ></v-img>
                                      </template>
                                      <template v-slot:item.actionEditImageMetadata="{ item }">
                                      <v-btn icon @click="editProjectImageMetaData(item)" >
                                         <v-icon>
                                           edit
                                         </v-icon>
                                        </v-btn>
                                      </template>
                                      <template v-slot:item.actionDeleteImageMetadata="{ item }">
                                       <v-btn icon @click="deleteProjectImage(item)" >
                                         <v-icon>
                                          delete
                                         </v-icon>
                                        </v-btn>
                                      </template>
                                      </v-data-table>
                                      </v-expansion-panel-content>
                                  </v-expansion-panel>
                                </v-expansion-panels>



                            </v-layout>
-->
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" @click="closeProjectTaskDialog">Cancel</v-btn>
              <v-btn color="blue darken-1" @click="saveProjectTask">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-btn>
    </v-card-title>
    <v-data-table
      :headers="taskTableHeaders"
      :calculate-widths="true"
      :items="projectTasks"
      :search="search"
    >
      <template v-slot:[`item.actionEditTask`]="{ item }">
        <v-btn icon="mdi-file-edit-outline" @click="editProjectTask(item)"> </v-btn>
      </template>
      <template v-slot:[`item.actionDeleteTask`]="{ item }">
        <v-btn icon="mdi-delete-alert" @click="deleteProjectTask(item)"> </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>
<script setup>
import { computed, ref, defineProps, reactive,onMounted } from "vue";
import { useStore } from "vuex";

//eslint-disable-next-line
const { projectId } = defineProps(["projectId"]);

const store = useStore();

onMounted(() => {
  console.log("Loading tasks for project id " + projectId);
  store.dispatch("projects/loadProjectTasks", projectId);
});

const taskTableHeaders = [
  { title: "Category", key: "category", width: 150 },
  { title: "Name", key: "name" },
  { title: "Description", key: "description" },
  { title: "AnticipatedStartDate", key: "anticipatedStartDate" },
  {
    title: "AnticipatedCompletionDate",
    key: "anticipatedCompletionDate",
    align: " d-none",
  },
  { title: "ActualStartDate", key: "actualStartDate", align: " d-none" },
  { title: "ActualCompletionDate", key: "actualCompletionDate", align: " d-none" },
  { title: "Status", key: "status", sortable: true },
  { title: "Edit", align: "left", key: "actionEditTask" },
  { title: "Delete", align: "left", key: "actionDeleteTask" },
];

const taskStatusTypes = ["OPENED", "IN PROGRESS", "COMPLETED"];

const selectedProjectTaskImageMeta = [];

const projectTaskDialog = ref(false);

const editedProjectTaskIndex = ref(-1);

const editedProjectTask = reactive({
  id: "",
  projectId: projectId,
  packageId: "",
  name: "",
  description: "",
  anticipatedStartDate: null,
  anticipatedCompletionDate: null,
  actualStartDate: null,
  actualCompleteionDate: null,
  status: "",
  imageMetadata: null,
});
const defaultProjectTask = reactive({
  projectId: projectId,
  packageId: "",
  name: "",
  description: "",
  anticipatedStartDate: null,
  anticipatedCompletionDate: null,
  actualStartDate: null,
  actualCompletionDate: null,
  status: "OPENED",
  imageMetadata: null,
});

const editProjectTask = (item) => {
  editedProjectTaskIndex.value = projectTasks.value.findIndex((t) => t.id == item.value);
  const obj = projectTasks.value.find((t) => t.id == item.value);
  Object.assign(editedProjectTask, obj);
  selectedProjectTaskImageMeta.value = [];
  console.log("Selected Task image metadata is ");
  console.log(editedProjectTask.imageMetaData);
  selectedProjectTaskImageMeta.value = editedProjectTask.imageMetaData;
  projectTaskDialog.value = true;
};

const saveProjectTask = () => {
  if (editedProjectTaskIndex.value > -1) {
    const formData = {
      id: editedProjectTask.id,
      projectId: projectId,
      packageId: editedProjectTask.packageId,
      name: editedProjectTask.name,
      description: editedProjectTask.description,
      anticipatedStartDate: editedProjectTask.anticipatedStartDate,
      anticipatedCompletionDate: editedProjectTask.anticipatedCompletionDate,
      actualStartDate: editedProjectTask.actualStartDate,
      actualCompletionDate: editedProjectTask.actualCompletionDate,
      status: editedProjectTask.status,
      imageMetaDataIds: selectedProjectTaskImageMeta.map((x) => x.id),
    };
    console.log("dispatching update project task event form data is");
    console.log(formData);
    store.dispatch("projects/updateProjectTask", formData);
  } else {
    const formData = {
      projectId: projectId,
      packageId: editedProjectTask.packageId,
      name: editedProjectTask.name,
      description: editedProjectTask.description,
      anticipatedStartDate: editedProjectTask.anticipatedStartDate,
      anticipatedCompletionDate: editedProjectTask.anticipatedCompletionDate,
      actualStartDate: editedProjectTask.actualStartDate,
      actualCompletionDate: editedProjectTask.actualCompletionDate,
      status: editedProjectTask.status,
      imageFiles: editedProjectTask.imageFiles,
      imageMetaDataIds: selectedProjectTaskImageMeta.map((x) => x.id),
    };
    store.dispatch("projects/createProjectTask", formData);
    console.log("Creating new project task");
    console.log(formData);
  }
  closeProjectTaskDialog();
};

const closeProjectTaskDialog = () => {
  projectTaskDialog.value = false;
  setTimeout(() => {
    Object.assign(editedProjectTask, defaultProjectTask);
    selectedProjectTaskImageMeta.value = [];
    editedProjectTaskIndex.value = -1;
  }, 300);
};

const deleteProjectTask = (item) => {
  console.log("onDeleteDrawing Event Received..");
  console.log(item);
  //const obj = projectTasks.value.find((t) => t.id == item.id);
  store.dispatch("projects/deleteProjectTask", item);
  // confirm('Are you sure you want to delete drawing ' + $event.title + ' from the project register?') && drawings.splice(index, 1)
};

const projectTasks = computed(() => {
  return store.getters["projects/loadedProjectTasks"];
});

const projectTaskFormTitle = computed(() => {
  return editedProjectTaskIndex.value === -1 ? "New Project Task" : "Edit Project Task";
});
const search = ref('');
</script>
