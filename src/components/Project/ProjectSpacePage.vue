<template>
    <v-container>
  
      <v-layout row v-if="error">
        <v-sheet xs12 sm6 offset-sm3>
          <app-alert @dismissed="onDismissed" :text="error"></app-alert>
        </v-sheet>
      </v-layout>
  
     <v-card>
        <v-card-title>
            Project Space {{ id }}

        </v-card-title>
        <v-card-text>

            <v-tabs v-model="tabs">
                <v-tab value="Details">Details</v-tab>
                <v-tab value="Images">Images</v-tab>
            </v-tabs>
            <v-window v-model="tabs">
                <v-window-item value="Details">
                    <v-card height="full">
                        <v-card-title>Hello</v-card-title>
                        <v-card-text>{{ id  }}</v-card-text>
                    </v-card>
                </v-window-item>
                <v-window-item value="Images">
                    
                    <v-card>
                  <v-card-title>
                    Photos
                    <v-spacer></v-spacer>
                    <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details>
                    </v-text-field>
                    <v-spacer></v-spacer>
                    <v-btn icon color="green">
                      <v-icon icon="mdi-plus"></v-icon>
                      <v-dialog v-model="imageDialog" activator="parent">

                        <v-card>
                          <v-card-title>
                            <span>Upload Images</span>
                          </v-card-title>
                          <v-card-text>
                            <v-container>

                              <v-layout row>

                                <v-file-input ref="imageFiles" color="deep-purple accent-4"
                                  counter label="Upload Project Images" placeholder="Select your image"
                                  prepend-icon="mdi-paperclip" outlined multiple :show-size="1000">
                                  <template v-slot:[`selection`]="{ index, text }">
                                    <v-chip v-if="index < 2" color="deep-purple accent-4" dark label small>
                                      {{ text }}
                                    </v-chip>

                                    <span v-else-if="index === 2" class="overline grey--text text--darken-3 mx-2">
                                      +{{ imageFiles.value.length - 2 }} File(s)
                                    </span>
                                  </template>
                                </v-file-input>

                              </v-layout>

                            </v-container>
                          </v-card-text>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" @click="closeImageDialog">Cancel</v-btn>
                            <v-btn color="blue darken-1" @click="saveProjectSpaceImages">Save</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-btn>
                  </v-card-title>
            

                  <v-data-table :headers="imageMetadataTableHeaders" :calculate-widths="true"
                    :items="projectImageMetadata" :search="search">
                    <template v-slot:[`item.image`]="{ item }">
                      projectId : {{ id }}
                      <v-img
                        :src="`http://localhost:8080/api/resource/clients/${clientId}/projects/${projectId}/images/${item.value}/download`"
                        :lazy-src="`http://localhost:8080/api/resource/clients/${clientId}projects/${projectId}/images/${item.value}/download`"
                        aspect-ratio="1" class="grey lighten-2" max-width="400" max-height="300"></v-img>
                    </template>
                    <template v-slot:[`item.actionEditImageMetadata`]="{ item }">
                      <v-btn icon="mdi-file-edit-outline" @click="editProjectImageMetaData(item)">

                      </v-btn>
                    </template>
                    <template v-slot:[`item.actionDeleteImageMetadata`]="{ item }">
                      <v-btn icon="mdi-delete-alert" @click="deleteProjectImageMetaData(item)">

                      </v-btn>
                    </template>
                  </v-data-table>
           
                  <v-btn absolute right fab dark color="indigo" v-on="on">
                    <v-dialog v-model="projectImageMetaDataDialog" activator="parent">

                      <v-card>
                        <v-card-title>
                          <span>{{ projectImageFormTitle }}</span>
                        </v-card-title>
                        <v-card-text>

                          <v-layout row>

                            <v-text-field v-model="editedProjectImageMetaData.title" label="Title"></v-text-field>

                          </v-layout>
                          <v-layout row>

                            <v-textarea name="description" label="Description" id="description"
                              v-model="editedProjectImageMetaData.description" required>
                            </v-textarea>

                          </v-layout>
                          <v-layout row>
                            <v-select :items="projectRoomsX" v-model="editedProjectImageMetaData.location"
                              label="Location" item-value="id" item-title="name"></v-select>

                          </v-layout>
                          <v-layout row>

                            <v-text-field v-model="editedProjectImageMetaData.categoryId" label="Category">
                            </v-text-field>

                          </v-layout>

                          <v-row justify="center">
                            <v-img
                              :src="`http://localhost:8080/api/resource/clients/${clientId}/projects/${editedProjectImageMetaData.projectId}/images/${editedProjectImageMetaData.id}/download`"
                              :lazy-src="`http://localhost:8080/api/resource/clients/${clientId}/projects/${editedProjectImageMetaData.projectId}/images/${editedProjectImageMetaData.id}/download`"
                              aspect-ratio="1" class="grey lighten-2" max-width="700" max-height="600"></v-img>
                          </v-row>


                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" @click="closeProjectImageMetaDataDialog">Cancel</v-btn>
                          <v-btn color="blue darken-1" @click="saveProjectImageMetaData">Save</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-btn>


                </v-card>

                </v-window-item>
            </v-window>
        </v-card-text>
        <v-card-actions>

        </v-card-actions>
     </v-card>
  

  
  
    </v-container>
  </template>
  
  <script>
  import { computed, onMounted, reactive, ref } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter, useRoute } from 'vue-router'
  export default {
  
    setup() {
      const store = useStore();
      const router = useRouter();
      const route = useRoute();

      const id = route.params.id
      const projectId = route.params.projectId

      const formData = {
          projectId: projectId,
          spaceId: id,
      };
  
      onMounted(() => {
        console.log(formData)
        store.dispatch('projects/loadProjectSpaceDetails', formData);
      });
  
      const project = reactive({
        id: '',
        name: '',
        description: '',
        address: '',
        customerId: '',
        clientId: '',
        status: '',
        projectFunder: '',
        projectClientQuantitySurveyor: '',
        projectArchitect: '',
        projectStructuralEngineer: '',
        projectMechanicalAndElectricalEngineer: '',
        projectQuantitySurveyor: '',
        cprojectManager: '',
        projectSupervisorDesignProcess: '',
        projectSupervisorConstruction: '',
      });
  
      const customers = computed(() => store.getters['customers/loadedCustomers']);
  
      const error = computed(() => store.getters['error', { root: true }]);
  
      const loading = computed(() => store.getters('loading', { root: true }));
  
      const formIsValid = (() => {
        return project.customerId !== '' && project.name !== '' && project.address !== ''
      });
  
      const onCreateProject = (() => {
    
        if (!formIsValid) {
          return
        }
        console.log('Creating project')
        console.log(project)
  
        store.dispatch('projects/createProject', project)
          .then(router.push('/projects'))
      });
  
      const onDismissed = () => (
        store.dispatch('clearError', { root: true })
      );

      const tabs = ref(false);
      const imageDialog = ref(false);
      const imageFiles = ref(null);
      const closeImageDialog = (()=> {
        imageDialog.value = false;
      });
      const saveProjectSpaceImages = (() => {
        const formData =  {
            projectId: projectId,
            locationId: id,
            imageFiles: imageFiles.value
        }
        store.dispatch('projects/uploadProjectSpaceImages', formData);
      });
  
      return {
        id,
        projectId,
        tabs,
        imageDialog,
        closeImageDialog,
        saveProjectSpaceImages,
        imageFiles,
        project,
        customers,
        error,
        loading,
        onCreateProject,
        formIsValid,
        onDismissed,
      }
    }
  }
  </script>
  