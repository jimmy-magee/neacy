<template>
  <v-card>
    <v-card-title>
      Drawings
      <v-spacer></v-spacer>
      <v-text-field
        v-model="searchProjectDrawings"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon color="green">
        <v-icon icon="mdi-plus"></v-icon>
        <v-dialog v-model="dialog" activator="parent">
          <v-card>
            <v-card-title>
              <span class="headline">Upload Project Drawings</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-layout row>
                  <v-file-input
                    ref="file"
                    filled
                    multiple
                    prepend-icon="mdi-camera"
                    label="Upload Drawing Files"
                    v-on:change="handleFileUpload()"
                  ></v-file-input>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" @click="uploadProjectDrawings">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-btn>
    </v-card-title>
    <v-data-table
      :headers="drawingTableHeaders"
      :calculate-widths="true"
      :items="drawings"
      :search="searchProjectDrawings"
    >
      <template v-slot:[`item.actionDownload`]="{ item }">
        <v-btn icon="mdi-download" @click="downloadProjectDrawing(item)"> </v-btn>
      </template>
      <template v-slot:[`item.actionEdit`]="{ item }">
        <v-btn icon="mdi-file-edit-outline" @click="editItem(item)"> </v-btn>
      </template>
      <template v-slot:[`item.actionDelete`]="{ item }">
        <v-btn icon="mdi-delete-alert" @click="deleteProjectDrawing(item)"> </v-btn>
      </template>
    </v-data-table>

    <v-btn>
      <v-dialog v-model="projectDrawingMetaDataDialog" activator="parent">
        <v-card>
          <v-card-title>
            <span class="headline">Edit Project Drawing</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-layout row>
                <v-select
                  v-model="editedItem.categoryId"
                  :items="projectDrawingCategories"
                  item-value="id"
                  item-title="name"
                  label="Drawing Category"
                >
                </v-select>
              </v-layout>
              <v-layout row>
                <v-text-field v-model="editedItem.title" label="Title"></v-text-field>
              </v-layout>
              <v-layout row>
                <v-textarea
                  name="description"
                  label="Description"
                  id="description"
                  v-model="editedItem.description"
                  required
                >
                </v-textarea>
              </v-layout>
              <v-layout row> </v-layout>
              <v-layout> </v-layout>
              <v-layout row>
                <v-select
                  :items="drawingStatusTypes"
                  v-model="editedItem.status"
                  item-value="id"
                  item-title="name"
                  label="Status"
                >
                </v-select>
              </v-layout>
              <v-layout row>
                <v-text-field
                  v-model="editedItem.revision"
                  label="Revision"
                ></v-text-field>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" @click="closeProjectDrawingMetaDataDialog"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" @click="saveProjectDrawingMetaData">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-btn>
  </v-card>
</template>
<script setup>
import { computed, ref, reactive, onMounted, toRaw } from "vue";
import { useStore } from "vuex";

// eslint-disable-next-line
const { projectId } = defineProps(["projectId"]);

const store = useStore();

onMounted(() => {
  console.log("Loading drawings for project id " + projectId);
  store.dispatch("projects/loadProjectDrawingCategories");
  store.dispatch("projects/loadProjectDrawingMetadata", projectId);
});

//const filteredDrawings = [];
const searchProjectDrawings = ref("");
const projectDrawingMetaDataDialog = ref(false);
const drawingFiles = reactive([]);
const file = ref(null);
const drawingTableHeaders = [
  { title: "Category", key: "categoryName" },
  { title: "Title", key: "title" },
  { title: "Description", key: "description" },
  { title: "Status", key: "status" },
  { title: "Revision", key: "revision" },
  { title: "Dowload", align: "left", key: "actionDownload" },
  { title: "Edit", align: "left", key: "actionEdit" },
  { title: "Delete", align: "left", key: "actionDelete" },
];
/*
    const drawingMeasureTableHeaders = [
      { title: "Category", key: "categoryName" },
      { title: "Title", key: "title" },
      { title: "Description", key: "description" },
      { title: "Status", key: "status" },
      { title: "Revision", key: "revision" },
      { title: "Dowload", align: "left", key: "actionDownload" },
    ];*/
const dialog = ref(false);
const editedIndex = ref(-1);
const editedItem = reactive({
  id: "",
  name: "",
  title: "",
  categoryId: "",
  description: "",
  status: "",
  revision: "",
  drawingFiles: null,
});
const defaultItem = reactive({
  id: "",
  name: "",
  title: "",
  category: "",
  description: "",
  status: "",
  revision: "",
  drawingFiles: null,
});

const drawingStatusTypes = ["DRAFT", "CURRENT", "SUPERCEEDED"];
const close = () => {
  console.log("close bulk upload dialog...");
  dialog.value = false;
  setTimeout(() => {
    Object.assign(editedItem, defaultItem);
    editedIndex.value = -1;
  }, 300);
};
/*
      const filteredDrawingsList = computed(() => {
      return filteredDrawings;
    });*/

const drawings = computed(() => {
  return store.getters["projects/loadedProjectDrawings"];
});
const projectDrawingCategories = computed(() => {
  return store.getters["projects/loadedProjectDrawingCategories"];
});

const downloadProjectDrawing = (item) => {
  console.log("downloading item requested..");
  console.log(toRaw(item));
  console.log("for project id");
  console.log(item.value);
  console.log(item.title);
  const payload = {
    projectId: projectId,
    id: item.value,
    fileName: item.title,
  };
  console.log(payload);
  store.dispatch("projects/downloadProjectDrawing", payload);
};

const editItem = (item) => {
  editedIndex.value = drawings.value.findIndex((d) => d.id == item.value);
  const dwg = drawings.value.find((d) => d.id == item.value);
  Object.assign(editedItem, dwg);
  projectDrawingMetaDataDialog.value = true;
};

const saveProjectDrawingMetaData = () => {
  const formData = {
    categoryId: editedItem.categoryId,
    id: editedItem.id,
    projectId: projectId,
    title: editedItem.title,
    description: editedItem.description,
    status: editedItem.status,
    revision: editedItem.revision,
    drawingFiles: drawingFiles.value,
  };
  store.dispatch("projects/updateProjectDrawingMetaData", formData);
  closeProjectDrawingMetaDataDialog();
  console.log("Updating project drawing meta data");
  console.log(formData);
};
const uploadProjectDrawings = () => {
  const formData = {
    projectId: projectId,
    drawingFiles: file.value,
  };
  store.dispatch("projects/uploadProjectDrawings", formData);
  console.log("Uploading project drawings");
  console.log(formData);
  close();
};
const deleteProjectDrawing = (item) => {
  console.log("onDeleteDrawing Event Received..");
  const formData = {
    projectId: projectId,
    id: item.value,
  };
  console.log(formData);
  // const index = drawings.indexOf(item)
  store.dispatch("projects/deleteProjectDrawing", formData);
  // confirm('   projectBoQCategoryCosts,Are you sure you want to delete drawing ' + $event.title + ' from the project register?') && drawings.splice(index, 1)
};

// https://stackoverflow.com/questions/43002417/arrays-javascript-filter-array-of-objects-using-input-search
/*
    const filterList = (val) => {
      let dwgs = drawings;
      let dwgList = dwgs.filter(function (drawing) {
        return drawing.title.toLowerCase().indexOf(val) !== -1; // returns true or false
      });
      console.log("Filtered drawings = ");
      console.log(dwgList);
      Object.assign(filteredDrawings, dwgList);
    };*/

const closeProjectDrawingMetaDataDialog = () => {
  projectDrawingMetaDataDialog.value = false;
  //setTimeout(() => {
  //Object.assign(editedProjectDrawingMetaData, defaultProjectDrawingMetadata)
  //editedProjectDrawingMetaDataIndex.value = -1
  //}, 300)
};
const handleFileUpload = async () => {
  console.log("selected file", file.value.files);
  //Upload to server
};
</script>
