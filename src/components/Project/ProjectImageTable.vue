<template>
  <v-card>
    <v-card-title>
      Project Gallery
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
      <v-btn icon color="green" >
      <v-dialog v-model="projectImageDialog" activator="parent">
  
        <v-card>
          <v-card-title>
            <span>Upload Project Images</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-layout row>
                  <v-file-input
                    v-model="imageFiles"
                    color="deep-purple accent-4"
                    counter
                    label="Upload Project Images"
                    placeholder="Select your image"
                    prepend-icon="mdi-paperclip"
                    outlined
                    multiple
                    :show-size="1000"
                  >
                    <template v-slot:selection="{ index, text }">
                      <v-chip
                        v-if="index < 2"
                        color="deep-purple accent-4"
                        dark
                        label
                        small
                      >
                        {{ text }}
                      </v-chip>

                      <span
                        v-else-if="index === 2"
                        class="overline grey--text text--darken-3 mx-2"
                      >
                        +{{ editedProjectImages.imageFiles.length - 2 }} File(s)
                      </span>
                    </template>
                  </v-file-input>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" @click="closeProjectImageDialog"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" @click="saveProjectImages">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-btn>
    </v-card-title>
    <!--
                   <v-expansion-panels>
                     <v-expansion-panel multiple v-model="panel">
                       <v-expansion-panel-header>Image Metadata</v-expansion-panel-header>
                       <v-expansion-panel-content>

                       -->

    <v-data-table
      :headers="imageMetadataTableHeaders"
      :calculate-widths="true"
      :items="projectImageMetadata"
      :search="search"
    >
      <template v-slot:[`item.image`]="{ item }">
        <v-img
          :src="`http://neacy.io/api/resource/projects/${item.projectId}/images/${item.id}/download`"
          :lazy-src="`http://neacy.io/api/resource/projects/${item.projectId}/images/${item.id}/download`"
          aspect-ratio="1"
          class="grey lighten-2"
          max-width="400"
          max-height="300"
        ></v-img>
      </template>
      <template v-slot:[`item.actionEditImageMetadata`]="{ item }">
        <v-btn icon @click="editProjectImageMetaData(item)">
          <v-icon> edit </v-icon>
        </v-btn>
      </template>
      <template v-slot:[`item.actionDeleteImageMetadata`]="{ item }">
        <v-btn icon @click="deleteProjectImageMetaData(item)">
          <v-icon> delete </v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <!--
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                      -->
    <!--
                      <v-carousel
                         height="400"
                         hide-delimiter-background
                         show-arrows-on-hover>
                         <v-carousel-item
                           v-for="(item,i) in projectImageMetadata"
                           :key="i"
                           :src="item.imageUrl"
                         ></v-carousel-item>
                       </v-carousel>
                       -->

    <!-- Displays a gallery of project photos.
                       <v-row>
                           <v-col cols="12" sm="10" offset-sm="1">
                             <v-card flat>
                               <v-container fluid>
                                 <v-row>
                                   <v-col
                                     v-for="n in projectImageMetadata.length"
                                     :key="n"
                                     class="d-flex child-flex"
                                     cols="4"
                                   >
                                     <v-card flat tile class="d-flex">
                                       <v-img
                                         :src="projectImageMetadata[n-1].imageUrl"
                                         :lazy-src="projectImageMetadata[n-1].imageUrl"
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

               -->

    <v-dialog v-model="projectImageMetaDataDialog">
      <v-card>
        <v-card-title>
          <span>{{ projectImageFormTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-layout row>
              <v-flex xs12 sm9 offset-sm1>
                <v-text-field
                  v-model="editedProjectImageMetaData.title"
                  label="Title"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm9 offset-sm1>
                <v-textarea
                  name="description"
                  label="Description"
                  id="description"
                  v-model="editedProjectImageMetaData.description"
                  required
                >
                </v-textarea>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm9 offset-sm1>
                <v-text-field
                  v-model="editedProjectImageMetaData.location"
                  label="Location"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm9 offset-sm1>
                <v-text-field
                  v-model="editedProjectImageMetaData.categoryId"
                  label="Category"
                >
                </v-text-field>
              </v-flex>
            </v-layout>

            <v-row align="center" justify="center">
              <v-img
                :src="`http://neacy.io/api/resource/projects/${editedProjectImageMetaData.projectId}/images/${editedProjectImageMetaData.id}/download`"
                :lazy-src="`http://neacy.io/api/resource/projects/${editedProjectImageMetaData.projectId}/images/${editedProjectImageMetaData.id}/download`"
                aspect-ratio="1"
                class="grey lighten-2"
                max-width="700"
                max-height="600"
              ></v-img>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click="closeProjectImageMetaDataDialog"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" @click="saveProjectImageMetaData"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup>
import { computed, ref, reactive, defineProps, onMounted } from "vue";
import { useStore } from "vuex";

// eslint-disable-next-line
/* eslint-disable */
const { projectId, title, color } = defineProps(["projectId", "title", "color"]);
const store = useStore();

onMounted(() => {
  console.log("Loading images for project id " + projectId);
  store.dispatch("projects/loadProjectImageMetadata", projectId);
});

const projectImageMetadata = computed(() => {
  return store.getters["projects/loadedProjectImageMetadata"];
});

const projectImageFormTitle = computed(() => {
  return editedImageMetadataIndex.value === -1
    ? "New Project Image"
    : "Edit Project Image";
});
const editedImageMetadataIndex = ref(-1);
const editedProjectImageIndex = ref(-1);
const editedProjectImagesIndex = ref(-1);
const imageFiles = ref();
const editedProjectImages = reactive({
  projectId: projectId,
  imageFiles: [],
});
const defaultProjectImages = reactive({
  projectId: projectId,
  imageFiles: [],
});
const search = ref('');
const editedProjectImageMetaDataIndex = ref(-1);
const editedProjectImageMetaData = reactive({
  id: "",
  projectId: projectId,
  title: "",
  description: "",
  location: "",
  categoryId: "",
});
const defaultProjectImageMetadata = reactive({
  projectId: projectId,
  title: "",
  description: "",
  location: "",
  categoryId: "",
});

const imageMetadataTableHeaders = [
  { title: "Title", key: "title" },
  { title: "Description", key: "description" },
  { title: "Location", key: "location" },
  { title: "Category", key: "categoryId" },
  { title: "Image", key: "image" },
  { title: "Edit", align: "left", key: "actionEditImageMetadata" },
  { title: "Delete", align: "left", key: "actionDeleteImageMetadata" },
];

const projectImageDialog = ref(false);
const projectImageMetaDataDialog = ref(false);

const editProjectImageMetaData = (item) => {
  editedProjectImageMetaDataIndex.value = projectImageMetadata.value.findIndex(
    (image) => image.id == item.value
  );
  const obj = projectImageMetadata.value.find((image) => image.id == item.value);
  Object.assign(editedProjectImageMetaData, obj);
  projectImageMetaDataDialog.value = true;
};
const downloadProjectImage = (item) => {
  const obj = projectImageMetadata.value.find((image) => image.id == item.value);
  console.log(obj);
  store.dispatch("projects/downloadProjectImage", obj);
};

const saveProjectImageMetaData = () => {
  // if (editedProjectImageMetaDataIndex > -1) {
  const formData = {
    id: editedProjectImageMetaData.id,
    projectId: projectId,
    title: editedProjectImageMetaData.title,
    description: editedProjectImageMetaData.description,
    revision: editedProjectImageMetaData.revision,
    categoryId: editedProjectImageMetaData.categoryId,
    location: editedProjectImageMetaData.location,
    status: editedProjectImageMetaData.status,
  };
  console.log("Saving project image meta data");
  console.log(formData);
  store.dispatch("projects/saveProjectImageMetaData", formData);

  // }
  closeProjectImageMetaDataDialog();
};

const saveProjectImages = () => {
  const formData = {
    projectId: projectId,
    imageFiles: imageFiles.value,
  };
  store.dispatch("projects/uploadProjectImages", formData);
  console.log("Uploading project images");
  console.log(formData);

  closeProjectImageDialog();
};

const deleteProjectImageMetaData = (item) => {
  console.log("Deleting project image meta data");

  console.log(item.value);
  const obj = projectImageMetadata.value.find((image) => image.id == item.value);
  store.dispatch("projects/deleteProjectImageMetaData", obj);
  closeProjectImageMetaDataDialog();
};

const closeProjectImageDialog = () => {
  projectImageDialog.value = false;
  // remove previously selected image files
  editedProjectImages.imageFiles = [];

  setTimeout(() => {
    Object.assign(editedProjectImages, defaultProjectImages);
    editedProjectImageIndex.value = -1;
  }, 300);
};

const closeProjectImageMetaDataDialog = () => {
  projectImageMetaDataDialog.value = false;
  setTimeout(() => {
    Object.assign(editedProjectImageMetaData, defaultProjectImageMetadata);
    editedProjectImageMetaDataIndex.value = -1;
  }, 300);
};
</script>
