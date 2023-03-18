<template>
  <v-container fluid>
    <!--
  don't show errors at this point.
    <v-layout row v-if="error">
     
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      
    </v-layout>
    -->

    <v-card v-if="editedProjectDetails">
      <v-card-title>
        <h3 class="primary--text">{{ editedProjectDetails.name }}</h3>
      </v-card-title>
      <v-card-text>
        <h3 class="primary--text">Status: {{ editedProjectDetails.status }}</h3>
        <div>{{ editedProjectDetails.description }}</div>
        <div>{{ editedProjectDetails.address }}</div>

        <v-tabs v-model="outerTab" show-arrows>

          <v-tab value="one"> Project Details
          </v-tab>
          <v-tab value="two"> Design
          </v-tab>
          <v-tab value="three"> Build
          </v-tab>
          <v-tab value="four"> Finance
          </v-tab>
          <v-tab value="five"> Admin
          </v-tab>
        </v-tabs>


        <v-window v-model="outerTab">
          <v-window-item value="one">

            <v-tabs v-model="detailsTab" show-arrows>


              <v-tab value="detailsTab-1">
                Details
              </v-tab>
              <v-tab value="detailsTab-2">
                Contact List
              </v-tab>

            </v-tabs>

            <v-window v-model="detailsTab">

              <!-- Project Details -->

              <v-window-item value="detailsTab-1">

                <v-card>
                  <v-card-title>
                    Project Details
                    <v-spacer></v-spacer>
                  </v-card-title>
                  <v-card-text>


                 

                      <form @submit.prevent="onUpdateProject">
                        <v-layout row>

                          <v-text-field name="projectName" label="Project Name" id="projectName"
                            v-model="editedProjectDetails.name" required></v-text-field>

                        </v-layout>
                        <v-layout row>

                          <v-text-field name="siteId" label="Site ID" id="projectSiteId"
                            v-model="editedProjectDetails.siteId">
                          </v-text-field>

                        </v-layout>
                        <v-layout row>

                          <v-textarea name="projectDescription" label="Project Description" id="projectDescription"
                            v-model="editedProjectDetails.description" required>
                          </v-textarea>

                        </v-layout>
                        <v-layout row>

                          <v-text-field name="projectAddress" label="Project Address" id="projectAddress"
                            v-model="editedProjectDetails.address" required></v-text-field>

                        </v-layout>
                        <v-layout row>


                          <v-select v-model="editedProjectDetails.status" :items="projectStatusList" item-value="id"
                            item-title="name" label="Project Status">
                          </v-select>


                        </v-layout>
                        <v-layout row>

                          <v-select v-model="editedProjectDetails.customerId" :items="customers" item-value="id"
                            item-title="name" label="Project Client">
                          </v-select>

                        </v-layout>
                        <v-layout row>

                          <v-text-field name="projectClientQuantitySurveyor" label="PQS"
                            id="projectClientQuantitySurveyor"
                            v-model="editedProjectDetails.clientQuantitySurveyor"></v-text-field>

                        </v-layout>
                        <v-layout row>

                          <v-text-field name="projectArchitect" label="Project Architect" id="projectArchitect"
                            v-model="editedProjectDetails.architect"></v-text-field>

                        </v-layout>
                        <v-layout row>

                          <v-text-field name="projectStructuralEngineer" label="Project Structural Engineer"
                            id="projectStructuralEngineer" v-model="editedProjectDetails.structuralEngineer">
                          </v-text-field>

                        </v-layout>
                        <v-layout row>

                          <v-text-field name="status" label="Project Mechanical & Electrical Engineer"
                            id="projectMechanicalAndElectricalEngineer"
                            v-model="editedProjectDetails.mechanicalAndElectricalEngineer"></v-text-field>

                        </v-layout>
                        <v-layout row>

                          <v-text-field name="projectQuantitySurveyor" label="Project Quantity Surveyor"
                            id="projectQuantitySurveyor" v-model="editedProjectDetails.projectQuantitySurveyor">
                          </v-text-field>

                        </v-layout>
                        <v-layout row>

                          <v-text-field name="projectManager" label="Project Manager" id="projectManager"
                            v-model="editedProjectDetails.projectManager"></v-text-field>

                        </v-layout>
                        <v-layout row>

                          <v-text-field name="siteSafetyOfficer" label="Site Safety Officer" id="siteSafetyOfficerr"
                            v-model="editedProjectDetails.siteSafetyOfficer">
                          </v-text-field>

                        </v-layout>
                        <v-layout row>

                          <v-text-field name="siteEngineer" label="Site Engineer" id="siteEngineer"
                            v-model="editedProjectDetails.siteEngineer"></v-text-field>

                        </v-layout>
                        <v-layout row>

                          <v-text-field name="projectSupervisorDesignProcess"
                            label="Project H & S Supervisor Design Process" id="projectSupervisorDesignProcess"
                            v-model="editedProjectDetails.projectSupervisorDesignProcess"></v-text-field>

                        </v-layout>
                        <v-layout row>

                          <v-text-field name="projectSupervisorConstruction" label="Project H & S Supervisor Construction"
                            id="projectSupervisorConstruction"
                            v-model="editedProjectDetails.projectSupervisorConstruction"></v-text-field>

                        </v-layout>

                        <v-layout row>

                          <v-btn class="primary" :disabled="!formIsValid" type="submit">Update Project</v-btn>

                        </v-layout>
                      </form>

                  


                  </v-card-text>
                </v-card>

              </v-window-item>

            </v-window>


          </v-window-item>

          <v-window-item value="two">

            <v-tabs v-model="tab" show-arrows>


              <v-tab value="tab-1">
                Drawings
              </v-tab>
              <v-tab value="tab-3">
                Room Schedules
              </v-tab>
              <v-tab value="tab-2">
                RFI Schedule
              </v-tab>



            </v-tabs>

            <v-window v-model="tab">

              <!-- Drawings -->
              <v-window-item value="tab-1">

                <v-card>
                  <v-card-title>
                    Drawings
                    <v-spacer></v-spacer>
                    <v-text-field v-model="searchProjectDrawings" append-icon="search" label="Search" single-line
                      hide-details></v-text-field>
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

                              <v-file-input v-model="drawingFiles" label="Upload Drawing Files" filled multiple
                                prepend-icon="mdi-camera"></v-file-input>

                                <v-file-input ref="file" filled multiple prepend-icon="mdi-camera"
                                v-on:change="handleFileUpload()"  
                                type="file"></v-file-input>
                                

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
                  <v-data-table :headers="drawingTableHeaders" :calculate-widths="true" :items="drawings"
                    :search="searchProjectDrawings">
                    <template v-slot:[`item.actionDownload`]="{ item }">
                      <v-btn icon="mdi-download" @click="downloadProjectDrawing(item)">
                        
                      </v-btn>
                    </template>
                    <template v-slot:[`item.actionEdit`]="{ item }">
                      <v-btn icon="mdi-file-edit-outline" @click="editItem(item)">
                        
                      </v-btn>
                    </template>
                    <template v-slot:[`item.actionDelete`]="{ item }">
                      <v-btn icon="mdi-delete-alert" @click="deleteProjectDrawing(item)">
                        
                      </v-btn>
                    </template>
                  </v-data-table>
                </v-card>

                <v-btn>
                <v-dialog v-model="projectDrawingMetaDataDialog" activator="parent">
                  <v-card>
                    <v-card-title>
                      <span class="headline">Edit Project Drawing</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-layout row>


                          <v-select v-model="editedItem.categoryId" :items="projectDrawingCategories" item-value="id"
                            item-title="name" label="Drawing Category">
                          </v-select>

                        </v-layout>
                        <v-layout row>

                          <v-text-field v-model="editedItem.title" label="Title"></v-text-field>

                        </v-layout>
                        <v-layout row>

                          <v-textarea name="description" label="Description" id="description"
                            v-model="editedItem.description" required>
                          </v-textarea>

                        </v-layout>
                        <v-layout row>

                        </v-layout>
                        <v-layout>
                        </v-layout>
                        <v-layout row>


                          <v-select :items="drawingStatusTypes" v-model="editedItem.status" item-value="id"
                            item-title="name" label="Status">
                          </v-select>





                        </v-layout>
                        <v-layout row>

                          <v-text-field v-model="editedItem.revision" label="Revision"></v-text-field>

                        </v-layout>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" @click="closeProjectDrawingMetaDataDialog">Cancel</v-btn>
                      <v-btn color="blue darken-1" @click="saveProjectDrawingMetaData">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-btn>
              </v-window-item>

              <!--Schedules-->

              <v-window-item value="tab-2">

                <v-card>
                  <v-card-title>
                    RFI Schedule
                    <v-spacer></v-spacer>
                    <v-text-field v-model="searchProjectRFIs" append-icon="search" label="Search" single-line
                      hide-details></v-text-field>
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

                                <v-text-field v-model="editedProjectRFI.name" label="Reference"></v-text-field>

                              </v-layout>

                              <v-layout row>

                                <v-textarea v-model="editedProjectRFI.description" label="Description"></v-textarea>

                              </v-layout>

                              <v-layout row>

                                <v-text-field v-model="editedProjectRFI.location" label="Location"></v-text-field>

                              </v-layout>

                              <v-layout row>

                                <v-select :items="rfiStatus" v-model="editedProjectRFI.status" item-value="id"
                                  item-title="name" label="Status">
                                </v-select>

                              </v-layout>

                              <v-layout row>

                                <v-text-field v-model="editedProjectRFI.assignedTo" label="Assigned To">
                                </v-text-field>

                              </v-layout>

                              <v-layout row>

                                <v-dialog ref="projectRFIDateAssignedDialog" v-model="projectRFIDateAssignedModal"
                                  persistent activator="parent">
                                  <template v-slot:activator="{ on }">
                                    <v-text-field v-model="editedProjectRFI.dateAssigned" label="Date Assigned"
                                      prepend-icon="event" readonly v-on="on"></v-text-field>
                                  </template>
                                  <v-date-picker v-model="editedProjectRFI.dateAssigned" scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="projectRFIDateAssignedModal = false">Cancel
                                    </v-btn>
                                    <v-btn text color="primary"
                                      @click="$refs.projectRFIDateAssignedDialog.save(date)">OK</v-btn>
                                  </v-date-picker>
                                </v-dialog>


                              </v-layout>

                              <v-layout row>

                                <v-dialog ref="projectRFIDateRequiredDialog" v-model="projectRFIDateRequiredModal"
                                  persistent activator="parent">
                                  <template v-slot:activator="{ on }">
                                    <v-text-field v-model="editedProjectRFI.dateRequired" label="Date Required By"
                                      prepend-icon="event" readonly v-on="on"></v-text-field>
                                  </template>
                                  <v-date-picker v-model="editedProjectRFI.dateRequired" scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="projectRFIDateRequiredModal = false">Cancel
                                    </v-btn>
                                    <v-btn text color="primary"
                                      @click="$refs.projectRFIDateRequiredDialog.save(date)">OK</v-btn>
                                  </v-date-picker>
                                </v-dialog>

                              </v-layout>

                              <v-layout row>

                                <v-textarea v-model="editedProjectRFI.response" label="Response"></v-textarea>

                              </v-layout>

                              <v-layout row>

                                <v-dialog ref="projectRFIDateAnsweredDialog" v-model="projectRFIDateAnsweredModal"
                                  persistent activator="parent">
                                  <template v-slot:activator="{ on }">
                                    <v-text-field v-model="editedProjectRFI.dateAnswered" label="Date Answered"
                                      prepend-icon="event" readonly v-on="on"></v-text-field>
                                  </template>
                                  <v-date-picker v-model="editedProjectRFI.dateAnswered" scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="projectRFIDateAnsweredModal = false">Cancel
                                    </v-btn>
                                    <v-btn text color="primary"
                                      @click="$refs.projectRFIDateAnsweredDialog.save(date)">OK</v-btn>
                                  </v-date-picker>
                                </v-dialog>

                              </v-layout>

                              <v-layout row>

                                <v-textarea v-model="editedProjectRFI.comments" label="Comments"></v-textarea>

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
                  <v-data-table :headers="projectRFITableHeaders" :calculate-widths="true" :items="projectRFIs"
                    :search="searchProjectRFIs">
                    <template v-slot:[`item.actionEdit`]="{ item }">
                      <v-btn icon="mdi-file-edit-outline" @click="openProjectRFIDialog(item)">
                        
                      </v-btn>
                    </template>
                    <template v-slot:[`item.actionDelete`]="{ item }">
                      <v-btn icon="mdi-delete-alert" @click="deleteProjectRFI(item)">
                        
                      </v-btn>
                    </template>
                  </v-data-table>
                </v-card>

              </v-window-item>

              <v-window-item value="tab-3">

                <v-card>
                  <v-card-title>
                    Room Schedule
                    <v-spacer></v-spacer>
                    <v-text-field v-model="searchProjectRooms" append-icon="search" label="Search" single-line
                      hide-details></v-text-field>
                    <v-spacer></v-spacer>
                    <v-btn icon color="green">
                      <v-icon icon="mdi-plus"></v-icon>
                      <v-dialog v-model="projectRoomDialog" activator="parent">

                        <v-card>
                          <v-card-title>
                            <span class="headline">Project Room Schedule</span>
                          </v-card-title>
                          <v-card-text>
                            <v-container>

                              <v-layout row>

                                <v-text-field v-model="editedProjectRoom.name" label="Name"></v-text-field>

                              </v-layout>

                              <v-layout row>

                                <v-textarea v-model="editedProjectRoom.description" label="Description">
                                </v-textarea>

                              </v-layout>

                              <v-layout row>

                                <v-text-field v-model="editedProjectRoom.level" label="Level"></v-text-field>

                              </v-layout>
                              <v-layout row>

                                <v-textarea v-model="editedProjectRoom.comments" label="Comments"></v-textarea>

                              </v-layout>

                            </v-container>
                          </v-card-text>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" @click="closeProjectRoomDialog">Cancel</v-btn>
                            <v-btn color="blue darken-1" @click="saveOrUpdateProjectRoom">Save</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-btn>
                  </v-card-title>

                  <v-data-table :headers="projectRoomTableHeaders" :calculate-widths="true" :items="projectRoomsX"
                    :search="searchProjectRooms">
                    <template v-slot:[`item.actionEdit`]="{ item }">
                      <v-btn icon="mdi-file-edit-outline" @click="openProjectRoomDialog(item)">
                        
                      </v-btn>
                    </template>
                    <template v-slot:[`item.actionDelete`]="{ item }">
                      <v-btn icon="mdi-delete-alert" @click="deleteProjectRoom(item)">
                       
                      </v-btn>
                    </template>
                  </v-data-table>
                </v-card>

              </v-window-item>

            </v-window>


          </v-window-item>


          <v-window-item value="three">

            <v-tabs v-model="buildTab" show-arrows>


              <v-tab value="buildTab-1">
                Project Plan
              </v-tab>
              <v-tab value="buildTab-2">
                Gallery
              </v-tab>
              <v-tab value="buildTab-3">
                Health and Safety
              </v-tab>
            </v-tabs>

            <v-window v-model="buildTab">

              <!-- Project Details -->

              <v-window-item value="buildTab-1">

                <v-card>
                  <v-card-title>
                    Project Task Board
                    <v-spacer></v-spacer>
                    <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details>
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

                                <v-select :items="taskStatusTypes" v-model="editedProjectTask.status" item-value="id"
                                  item-title="name" label="Status"></v-select>

                              </v-layout>
                              <v-layout row>

                                <v-text-field v-model="editedProjectTask.name" label="Name"></v-text-field>

                              </v-layout>
                              <v-layout row>

                                <v-textarea name="description" label="Description" id="description"
                                  v-model="editedProjectTask.description" required>
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
                                            :src="`http://neacy.io/api/resource/projects/${item.projectId}/images/${item.id}/download`"
                                            :lazy-src="`http://neacy.io/api/resource/projects/${item.projectId}/images/${item.id}/download`"
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
                  <v-data-table :headers="taskTableHeaders" :calculate-widths="true" :items="projectTasks"
                    :search="search">
                    <template v-slot:[`item.actionEditTask`]="{ item }">
                      <v-btn icon="mdi-file-edit-outline" @click="editProjectTask(item)">
                      </v-btn>
                    </template>
                    <template v-slot:[`item.actionDeleteTask`]="{ item }">
                      <v-btn icon="mdi-delete-alert" @click="deleteProjectTask(item)">
                      
                      </v-btn>
                    </template>
                  </v-data-table>
                </v-card>

              </v-window-item>

              <v-window-item value="buildTab-2">

                <v-card>
                  <v-card-title>
                    Project Gallery
                    <v-spacer></v-spacer>
                    <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details>
                    </v-text-field>
                    <v-spacer></v-spacer>
                    <v-btn icon color="green">
                      <v-icon icon="mdi-plus"></v-icon>
                      <v-dialog v-model="projectImageDialog" activator="parent">

                        <v-card>
                          <v-card-title>
                            <span>Upload Project Images</span>
                          </v-card-title>
                          <v-card-text>
                            <v-container>

                              <v-layout row>

                                <v-file-input v-model="editedProjectImages.imageFiles" color="deep-purple accent-4"
                                  counter label="Upload Project Images" placeholder="Select your image"
                                  prepend-icon="mdi-paperclip" outlined multiple :show-size="1000">
                                  <template v-slot:[`selection`]="{ index, text }">
                                    <v-chip v-if="index < 2" color="deep-purple accent-4" dark label small>
                                      {{ text }}
                                    </v-chip>

                                    <span v-else-if="index === 2" class="overline grey--text text--darken-3 mx-2">
                                      +{{ editedProjectImages.imageFiles.length - 2 }} File(s)
                                    </span>
                                  </template>
                                </v-file-input>

                              </v-layout>

                            </v-container>
                          </v-card-text>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" @click="closeProjectImageDialog">Cancel</v-btn>
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

                  <v-data-table :headers="imageMetadataTableHeaders" :calculate-widths="true"
                    :items="projectImageMetadata" :search="search">
                    <template v-slot:[`item.image`]="{ item }">
                      <v-img :src="`http://neacy.io/api/resource/projects/${item.projectId}/images/${item.id}/download`"
                        :lazy-src="`http://neacy.io/api/resource/projects/${item.projectId}/images/${item.id}/download`"
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
                  <v-btn absolute right fab dark color="indigo" v-on="on">
                    <v-dialog v-model="projectImageMetaDataDialog" activator="parent">

                      <v-card>
                        <v-card-title>
                          <span>{{ projectImageFormTitle }}</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-layout row>

                              <v-text-field v-model="editedProjectImageMetaData.title" label="Title"></v-text-field>

                            </v-layout>
                            <v-layout row>

                              <v-textarea name="description" label="Description" id="description"
                                v-model="editedProjectImageMetaData.description" required>
                              </v-textarea>

                            </v-layout>
                            <v-layout row>

                              <v-text-field v-model="editedProjectImageMetaData.location" label="Location">
                              </v-text-field>

                            </v-layout>
                            <v-layout row>

                              <v-text-field v-model="editedProjectImageMetaData.categoryId" label="Category">
                              </v-text-field>

                            </v-layout>

                            <v-row justify="center">
                              <v-img
                                :src="`http://neacy.io/api/resource/projects/${editedProjectImageMetaData.projectId}/images/${editedProjectImageMetaData.id}/download`"
                                :lazy-src="`http://neacy.io/api/resource/projects/${editedProjectImageMetaData.projectId}/images/${editedProjectImageMetaData.id}/download`"
                                aspect-ratio="1" class="grey lighten-2" max-width="700" max-height="600"></v-img>
                            </v-row>

                          </v-container>
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

              <v-window-item value="buildTab-3">

                <v-card>
                  <v-card-title>
                    Health & Safety

                  </v-card-title>
                  <v-tabs fixed-tabs>
                    <v-tab>
                      Site Inductions
                    </v-tab>
                    <v-tab>
                      Risk Assessments
                    </v-tab>
                    <v-tab>
                      Health & Safety Plan Design
                    </v-tab>
                    <v-tab>
                      Health & Safety Plan Construction
                    </v-tab>
                    <v-tab>
                      HSA AF1 & AF2
                    </v-tab>

                  </v-tabs>
                </v-card>

              </v-window-item>

            </v-window>

          </v-window-item>

          <v-window-item value="four">

            <v-tabs v-model="financeTab" show-arrows>



              <v-tab value="financeTab-6">
                BoQ Summary
              </v-tab>
              <v-tab value="financeTab-10">
                Room Schedule BoQ
              </v-tab>
              <v-tab value="financeTab-1">
                Project BoQ
              </v-tab>
              <v-tab value="financeTab-11">
                Quotations
              </v-tab>
              <v-tab value="financeTab-2">
                Procurement Schedule
              </v-tab>

              <v-tab value="financeTab-31">
                Products
              </v-tab>
              <v-tab value="financeTab-3">
                Product Orders
              </v-tab>
              <v-tab value="financeTab-4">
                Valuations
              </v-tab>
              <v-tab value="financeTab-5">
                Payment Certs
              </v-tab>
              <v-tab value="financeTab-7">
                Customer Invoices
              </v-tab>
              <v-tab value="financeTab-8">
                SubContractor Invoices
              </v-tab>
              <v-tab value="financeTab-9">
                Supplier Invoices
              </v-tab>
            </v-tabs>

            <v-window v-model="financeTab">

              <v-window-item value="financeTab-6">

                <v-card>
                  <v-card-title>
                    <v-spacer></v-spacer>
                    <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details>
                    </v-text-field>


                  </v-card-title>
                  <h3>BoQ Summary</h3>

                  <v-data-table :headers="projectBoQCategoryCostsTableHeaders" :calculate-widths="true"
                    :items="projectBoQCategoryCosts" :search="search">

                  </v-data-table>
                </v-card>


              </v-window-item>
              <v-window-item value="financeTab-10">

                <v-card>
                  <v-card-title>

                    <v-spacer></v-spacer>
                    <v-text-field v-model="searchRoomScheduleBoQTreeView" append-icon="search" label="Search" single-line
                      hide-details>
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
                  <v-treeview :items="filteredProjectRoomScheduleBoQ" v-model="openTreeNodes" :filter="filter"
                    :search="searchRoomScheduleBoQTreeView">

                    <template v-slot:[`prepend`]="{ item }">

                      <v-icon v-if="item.children">
                        room
                      </v-icon>
                      <v-icon v-if="!item.children">
                        settings
                      </v-icon>

                    </template>

                    <template v-slot:[`label`]="{ item }">

                      <p v-if="item.children">
                        {{ item.roomName }} : {{ item.cost }}
                      </p>

                      <p v-if="!item.children">
                        {{ item.boqItemName }} : {{ item.quantity }} : {{ item.boqItemContractRate }}
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


              </v-window-item>
              <v-window-item value="financeTab-11">


                <v-card>
                  <v-text-field v-model="searchProjectQuotations" label="Search Quotations" flat solo-inverted
                    hide-details clearable clear-icon="mdi-close-circle-outline"></v-text-field>

                  <v-data-table :headers="projectQuotationTableHeaders" :calculate-widths="true" :items="projectQuotations"
                    :search="searchProjectQuotations">

                    <template v-slot:[`item.actionDownloadProjectQuotation`]="{ item }">
                      <v-btn icon @click="downloadProjectQuotation(item)">
                         <v-icon icon="mdi-download"></v-icon>
                      </v-btn>
                    </template>

                  </v-data-table>

                </v-card>


              </v-window-item>

              <v-window-item value="financeTab-1">

                <v-card>
                  <v-card-title>

                    Bill of Quantities
                    <v-spacer></v-spacer>

                    <v-btn icon color="blue" @click="reloadBoQItems">
                      <v-icon icon="mdi-cached"></v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>

                    <v-text-field v-model="searchProjectBoQ" append-icon="search" label="Search" single-line
                      hide-details></v-text-field>
                    <v-spacer></v-spacer>
                    <v-btn icon color="green" @click="dialogBoQItem.value = true">
                      <v-icon icon="mdi-plus"></v-icon>
                      <v-dialog v-model="dialogBoQItem" activator="parent">

                        <v-card>
                          <v-card-title>
                            <span>BoQ Item</span>
                          </v-card-title>

                          <v-card-text>
                            <v-container>

                              <v-layout row>

                                <v-select :items="boQItemCategories" v-model="editedBoQItem.categoryId" item-value="id"
                                  item-title="name" label="BoQ Item Category"
                                  v-on:change="loadBoQItemsByCategory"></v-select>

                              </v-layout>

                              <v-layout row>

                                <v-select :items="loadedCategoryBoQItems" item-title="name" return-object label="BoQ Item"
                                  v-on:change="updateNewBoQItem"></v-select>
                                <v-text-field name="ref" label="Bill Reference" id="ref" v-model="editedBoQItem.ref"
                                  required></v-text-field>

                              </v-layout>

                              <v-layout row>

                                <v-text-field name="name" label="Name" id="name" v-model="editedBoQItem.name"
                                  required></v-text-field>

                              </v-layout>

                              <v-layout row>

                                <v-textarea name="description" label="Description" id="description"
                                  v-model="editedBoQItem.description"></v-textarea>

                              </v-layout>

                              <v-layout row>

                                <v-text-field name="productId" label="Product" id="productId"
                                  v-model="editedBoQItem.productId"></v-text-field>

                              </v-layout>

                              <v-layout row>

                                <v-text-field name="productName" label="Product Name" id="productName"
                                  v-model="editedBoQItem.productName"></v-text-field>

                              </v-layout>

                              <v-layout row>

                                <v-text-field name="supplierId" label="Supplier" id="supplier"
                                  v-model="editedBoQItem.supplierName"></v-text-field>

                              </v-layout>

                              <v-layout row>

                                <v-text-field name="productQuotationDate" label="Quote Date" id="productQuotationDate"
                                  v-model="editedBoQItem.productQuotationDate"></v-text-field>

                              </v-layout>

                              <v-layout row>

                                <v-text-field name="productQuotationCost" label="Quote" id="productQuotationCost"
                                  v-model="editedBoQItem.supplierCost"></v-text-field>

                              </v-layout>

                              <v-layout row>

                                <v-text-field name="materialCost" label="Material Cost" id="materialCost"
                                  v-model="editedBoQItem.materialCost" required></v-text-field>

                                <v-spacer></v-spacer>

                                <v-text-field name="materialMargin" label="Material Magin" id="materialMargin"
                                  v-model="editedBoQItem.materialMargin" required></v-text-field>

                                <v-spacer></v-spacer>
                              </v-layout>

                              <v-layout row>

                                <v-text-field name="labourCost" label="Labour Cost" id="labourCost"
                                  v-model="editedBoQItem.labourCost" required></v-text-field>

                                <v-spacer></v-spacer>

                                <v-text-field name="labourMargin" label="Labour Magin" id="labourMargin"
                                  v-model="editedBoQItem.labourMargin" required></v-text-field>

                                <v-spacer></v-spacer>
                              </v-layout>

                              <v-layout row>

                                <v-text-field name="quantity" label="Contract Quantity" id="quantity"
                                  v-model="editedBoQItem.quantity" required></v-text-field>

                                <v-spacer></v-spacer>

                                <v-text-field name="unit" label="Unit" id="contract_units" v-model="editedBoQItem.unit"
                                  required></v-text-field>

                              </v-layout>

                              <v-layout row>

                                <v-text-field name="measuredQuantity" label="Measured Quantity" id="measured_quantity"
                                  v-model="editedBoQItem.measuredQuantity" required>
                                </v-text-field>

                                <v-spacer></v-spacer>

                                <v-text-field name="unit" label="unit" id="measured_units" v-model="editedBoQItem.unit"
                                  required></v-text-field>

                              </v-layout>

                              <v-layout row>

                                <v-text-field name="contractRate" label="Contract Rate" id="contractRate"
                                  v-model="editedBoQItem.contractRate">
                                </v-text-field>

                                <v-spacer></v-spacer>

                                <v-text-field name="subContractRate" label="SubContract Rate" id="subContractRate"
                                  v-model="editedBoQItem.subContractRate">
                                </v-text-field>

                              </v-layout>



                              <!--BoQ Item Mesaure -->


                              <v-layout row>

                                <v-card flat>

                                  <v-card-subtitle>
                                    Measure
                                    <v-dialog v-model="projectBoQItemMeasureDialog" activator="parent">
                                      <template v-slot:activator="{ on }">
                                        <v-btn small absolute right fab dark color="indigo" v-on="on">
                                          <v-icon dark>add</v-icon>
                                        </v-btn>
                                      </template>
                                      <v-card>


                                        <v-card-text>
                                          <v-container>
                                            <v-layout row>

                                              <v-card>
                                                <v-card-title>
                                                  <span class="Subtitle 2">Take-off Sheet</span>
                                                  <v-spacer></v-spacer>
                                                  <v-text-field v-model="searchProjectRooms" append-icon="search"
                                                    label="Search" single-line hide-details></v-text-field>

                                                  <v-spacer></v-spacer>
                                                </v-card-title>
                                                <v-card-text>
projectQuantitiesByRoom{{ projectQuantitiesByRoom1 }}
                                                  <v-data-table :headers="projectRoomMeasureTableHeaders"
                                                    :calculate-widths="true" :items="projectQuantitiesByRoom1"
                                                     :show-select="false" :search="searchProjectRooms">

                                                    <template v-slot:[`item`]="{item}">
                                                      {{ item.qty }}
                                                      <v-edit-dialog v-model="item.quantity" large persistent
                                                        @save="saveMeasureQuantity(item)" @cancel="cancel"
                                                        @open="open" @close="close">
                                                        <div>{{ item.qty }}</div>
                                                        <template v-slot:[`input`]>
                                                          <div class="mt-4 title">Update Quantity</div>

                                                          <v-text-field v-model="item.quantity"
                                                            label="Update Quantity" single-line autofocus>
                                                          </v-text-field>
                                                        </template>
                                                      </v-edit-dialog>
                                                    </template>



                                                  </v-data-table>
                                                </v-card-text>
                                              </v-card>

                                            </v-layout>

                                          </v-container>
                                        </v-card-text>

                                        <v-card-actions>
                                          <v-spacer></v-spacer>
                                          <v-btn color="blue darken-1"
                                            @click="closeProjectBoQItemMeasureDialog">Close</v-btn>
                                        </v-card-actions>
                                      </v-card>
                                    </v-dialog>

                                    <v-text-field v-model="searchBoQItemMeasures" append-icon="search" label="Search"
                                      single-line hide-details>
                                    </v-text-field>
                                  </v-card-subtitle>
                                  <v-card-text>
                                    <v-data-table :headers="measureTableHeaders" :items="measures"
                                      :search="searchBoQItemMeasures">
                                      <template v-slot:[`item.quantityMeasured`]="{ item }">
                                        <!-- <v-chip color="primary" dark>{{ item.quantityMeasured }}</v-chip>-->
                                        <v-text-field name="quantityMeasured" id="quantityMeasured" type="number"
                                          v-model="item.quantityMeasured">
                                        </v-text-field>
                                      </template>

                                      <template v-slot:[`item.actionEdit`]="{ item }">
                                        <v-btn icon @click="updateProjectBoQItemMeasure(item)">
                                          <v-icon icon="mdi-file-edit-outline"></v-icon>
                                        </v-btn>
                                      </template>
                                      <template v-slot:[`item.actionDelete`]="{ item }">
                                        <v-btn icon @click="deleteProjectBoQItemMeasure(item)">
                                          <v-icon icon="mdi-delete-alert"></v-icon>
                                        </v-btn>
                                      </template>

                                      <template v-slot:[`body.append`]>
                                        <tr class="primary--text">
                                          <th class="subtitle">Total</th>
                                          <th class="title"></th>
                                          <th class="subtitle">{{
                                            measures.filter(m => m.quantityMeasured != null)
                                              .map(m => parseInt(m.quantityMeasured))
                                              .reduce((sum, val) => sum + val, 0)
                                              .toFixed(2)

                                          }}</th>
                                          <th class="title"></th>
                                          <th class="title"></th>
                                        </tr>
                                      </template>

                                    </v-data-table>
                                  </v-card-text>

                                </v-card>


                              </v-layout>


                              <!--BoQ Item SubContractor Quotations -->

                              <v-layout row>

                                <v-card flat>

                                  <v-card-subtitle>
                                    SubContractor Quotations
                                  </v-card-subtitle>
                                  <v-card-text>
                                    <v-data-table :headers="boqItemQuotationTableHeaders"
                                      :items="editedBoQItem.subContractorQuotations" :search="search">
                                    </v-data-table>
                                  </v-card-text>
                                </v-card>

                              </v-layout>


                              <v-layout row>

                                <v-text-field name="quantityDeliveredToDate" label="Qty Delivered To Date"
                                  id="quantityDeliveredToDate" v-model="editedBoQItem.quantityDeliveredToDate">
                                </v-text-field>

                                <v-spacer></v-spacer>

                                <v-text-field name="quantityClaimedToDate" label="quantityClaimedToDate"
                                  id="quantityClaimedToDate" v-model="editedBoQItem.quantityClaimedToDate">
                                </v-text-field>

                              </v-layout>

                              <v-layout row>

                                <v-text-field name="quantityCertifiedToDate" label="quantityCertifiedToDate"
                                  id="quantityCertifiedToDate" v-model="editedBoQItem.quantityCertifiedToDate">
                                </v-text-field>

                                <v-spacer></v-spacer>

                                <v-text-field name="quantityPaidToDate" label="quantityPaidToDate" id="quantityPaidToDate"
                                  v-model="editedBoQItem.quantityPaidToDate">
                                </v-text-field>

                              </v-layout>

                              <v-layout row>

                                <v-dialog ref="boQItemAnticipatedStartDateDialog"
                                  v-model="boQItemAnticipatedStartDateModal" persistent width="290px">
                                  <template v-slot:activator="{ on }">
                                    <v-text-field v-model="editedBoQItem.anticipatedStartDate"
                                      label="Anticipated Start Date" prepend-icon="event" readonly v-on="on">
                                    </v-text-field>
                                  </template>
                                  <v-date-picker v-model="editedBoQItem.anticipatedStartDate" scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="boQItemAnticipatedStartDateModal = false">
                                      Cancel</v-btn>
                                    <v-btn text color="primary"
                                      @click="$refs.boQItemAnticipatedStartDateDialog.save(date)">OK</v-btn>
                                  </v-date-picker>
                                </v-dialog>


                                <v-spacer></v-spacer>


                                <v-dialog ref="boQItemAnticipatedCompletionDateDialog" activator="parent"
                                  v-model="boQItemAnticipatedCompletionDateModal" persistent width="290px">
                                  <template v-slot:activator="{ on }">
                                    <v-text-field v-model="editedBoQItem.anticipatedCompletionDate"
                                      label="Anticipated Completion Date" prepend-icon="event" readonly v-on="on">
                                    </v-text-field>
                                  </template>
                                  <v-date-picker v-model="editedBoQItem.anticipatedCompletionDate" scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary"
                                      @click="boQItemAnticipatedCompletionDateModal = false">Cancel</v-btn>
                                    <v-btn text color="primary"
                                      @click="$refs.boQItemAnticipatedCompletionDateDialog.save(date)">OK</v-btn>
                                  </v-date-picker>
                                </v-dialog>

                              </v-layout>
                              <v-layout v-if="editedBoQItem.quotations">
                                <v-card>
                                  <v-card-title>
                                    SubContractor Quotations
                                  </v-card-title>
                                  <v-card-text>
                                    <v-data-table :headers="boqItemQuotationTableHeaders"
                                      :items="editedBoQItem.subContractorQuotations" :search="search">
                                    </v-data-table>
                                  </v-card-text>
                                </v-card>
                              </v-layout>
                            </v-container>
                          </v-card-text>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" @click="dialogBoQItem = false">Cancel</v-btn>
                            <v-btn color="blue darken-1" @click="saveProjectBoQItem">Save</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-btn>
                  </v-card-title>

                  <v-layout row v-if="projectBoQSummary">

                    <v-text-field v-model="projectBoQSummary.totalNumberOfBillItems" label="Total Bill Items">
                    </v-text-field>


                    <v-text-field v-model="projectBoQSummary.totalGrossValue" label="Contract Value">
                    </v-text-field>

                  </v-layout>
                  <v-layout row v-if="projectBoQSummary">

                    <v-text-field v-model="projectBoQSummary.certifiedToDateAmount"
                      label="Amount Certified (to date)"></v-text-field>


                    <v-text-field v-model="projectBoQSummary.claimedToDateAmount"
                      label="Amount Claimed (to date)"></v-text-field>


                    <v-text-field v-model="projectBoQSummary.paidToDateAmount" label="Amount Paid (to date)">
                    </v-text-field>

                  </v-layout>

                  <v-data-table :headers="boqTableHeaders" :items="boq" :search="searchProjectBoQ" show-select>
                    <template v-slot:[`item.${quantity}`]="{ item }">
                      {{ item }}
                      {{ (item.props.title.quantity * item.contractRate).toFixed(2) }}
                    </template>
                    <template v-slot:[`item.totalDelivered`]="{ item }">
                      {{ (item.quantityDeliveredToDate * item.contractRate).toFixed(2) }}
                    </template>

                    <template v-slot:[`item.${contractRate}`]="props">
                    
                      <v-btn @click="contractDialog = true">{{ props.item.props.title.contractRate }}
                      <v-dialog v-model="contractDialog" snall  persistent activator="parent"
                        @save="saveContractRate(props.item.props.title.contractRate)" @cancel="cancel">
                        <div>{{ props.item.props.title.contractRate }}</div>
                      <v-text-field v-model="props.item.props.title.contractRate" :rules="[max25chars]" label="Edit" single-line
                            counter autofocus></v-text-field>
                        <template v-slot:[`input`]>
                          <div class="mt-4 title">Update Contract Rate</div>

                          <v-text-field v-model="props.item.props.title.contractRate" :rules="[max25chars]" label="Edit" single-line
                            counter autofocus></v-text-field>
                        </template>
                      </v-dialog>
                      </v-btn>
                    </template>

                    <template v-slot:[`item.materialCost`]="props">
                      <v-btn flat @click="materialCostDialog = true">
                      {{ props.value }}
                      <v-edit-dialog  v-model="materialCostDialog" large persistent
                        @save="saveMaterialCost(props.item)" @cancel="cancel">
                        <div>{{ props.raw }}</div>
                        <template v-slot:[`input`]>
                          <div class="mt-4 title">Update Material Cost</div>

                          <v-text-field v-model="props.raw" :rules="[max25chars]" label="Edit" single-line
                            counter autofocus></v-text-field>
                        </template>
                      </v-edit-dialog>
                    </v-btn>
                    </template>

<!--                    <template v-slot:[`item.materialCost`]="props">
                      <v-edit-dialog v-model="props.item.materialCost" large persistent
                        @save="saveMaterialCost(props.item)" @cancel="cancel">
                        <div>{{ props.item.materialCost }}</div>
                        <template v-slot:[`input`]>
                          <div class="mt-4 title">Update Material Cost</div>

                          <v-text-field v-model="props.item.materialCost" :rules="[max25chars]" label="Edit" single-line
                            counter autofocus></v-text-field>
                        </template>
                      </v-edit-dialog>
                    </template>
-->

                    <template v-slot:[`item.labourCost`]="props">
                      <v-edit-dialog v-model="props.item.labourCost" large persistent @save="saveLabourCost(props.item)"
                        @cancel="cancel">
                        <div>{{ props.item.labourCost }}</div>
                        <template v-slot:[`input`]>
                          <div class="mt-4 title">Update Labour Cost</div>
                          <v-text-field v-model="props.item.labourCost" :rules="[max25chars]" label="Edit" single-line
                            counter autofocus></v-text-field>
                        </template>
                      </v-edit-dialog>
                    </template>

                    <template v-slot:[`item.quantity`]="props">
                      <v-edit-dialog v-model="props.item.quantity" large persistent @save="saveQuantity(props.item)"
                        @cancel="cancel" @open="open" @close="close">
                        <div>{{ props.item.quantity }}</div>
                        <template v-slot:[`input`]>
                          <div class="mt-4 title">Update Quantity</div>
                          <v-text-field v-model="props.item.quantity" :rules="[max25chars]" label="Update Quantity"
                            single-line autofocus></v-text-field>
                        </template>
                      </v-edit-dialog>
                    </template>

                    <template v-slot:[`item.quantityDeliveredToDate`]="props">
                      <v-edit-dialog v-model="props.item.quantityDeliveredToDate" large persistent
                        @save="saveQuantityDeliveredToDate(props.item)" @cancel="cancel" @open="open" @close="close">
                        <div>{{ props.item.quantityDeliveredToDate }}</div>
                        <template v-slot:[`input`]>
                          <div class="mt-4 title">Update Quantity</div>

                          <v-text-field v-model="props.item.quantityDeliveredToDate" :rules="[max25chars]"
                            label="Update Quantity Delivered" single-line autofocus></v-text-field>
                        </template>
                      </v-edit-dialog>
                    </template>

                    <template v-slot:[`item.actionEditBoQItem`]="{ item }">
                      <v-btn icon @click="editBoQItem(item)">
                        <v-icon icon="mdi-file-edit-outline"></v-icon>
                      </v-btn>
                    </template>
                    <template v-slot:[`item.actionDeleteBoQItem`]="{ item }">
                      <v-btn icon @click="deleteProjectBoQItem(item)">
                        <v-icon icon="mdi-delete-alert"></v-icon>
                      </v-btn>
                    </template>
                  </v-data-table>
                </v-card>

              </v-window-item>

              <v-window-item value="financeTab-2">

                <v-card>
                  <v-card-title>
                    <v-spacer></v-spacer>
                    <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details>
                    </v-text-field>
                    <v-spacer></v-spacer>
                    <v-btn icon color="green">
                      <v-icon icon="mdi-plus"></v-icon>
                      <v-dialog v-model="projectProcurementPackageDialog" activator="parent">

                        <v-card>
                          <v-card-title>
                            <span>{{ projectProcurementPackageFormTitle }}</span>
                          </v-card-title>
                          <v-card-text>
                            <v-container>
                              
                              <v-layout row>

                                <v-select :items="procurementStatusTypes" v-model="editedProjectProcurementPackage.status"
                                  label="Status"></v-select>

                              </v-layout>
                              <v-layout row>

                                <v-text-field v-model="editedProjectProcurementPackage.name" label="Name">
                                </v-text-field>

                              </v-layout>
                              <v-layout row>

                                <v-textarea name="description" label="Description" id="description"
                                  v-model="editedProjectProcurementPackage.description" required>
                                </v-textarea>

                              </v-layout>
                              <v-layout row>



                                <v-dialog ref="dialog1" v-model="modal1" persistent width="50%" activator="parent">
                                  <template v-slot:activator="{ on }">
                                    <v-text-field v-model="editedProjectProcurementPackage.anticipatedStartDate"
                                      label="Anticipated Start Date" prepend-icon="event" readonly v-on="on">
                                    </v-text-field>
                                  </template>
                                  <v-date-picker v-model="editedProjectProcurementPackage.anticipatedStartDate"
                                    scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="modal1 = false">Cancel</v-btn>
                                    <v-btn text color="primary" @click="$refs.dialog1.save(date)">OK</v-btn>
                                  </v-date-picker>
                                </v-dialog>



                                <v-dialog ref="dialog2" v-model="modal2" persistent width="50%">
                                  <template v-slot:activator="{ on }">
                                    <v-text-field v-model="editedProjectProcurementPackage.anticipatedCompletionDate"
                                      label="Anticipated Completion Date" prepend-icon="event" readonly v-on="on">
                                    </v-text-field>
                                  </template>
                                  <v-date-picker v-model="editedProjectProcurementPackage.anticipatedCompletionDate"
                                    scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="modal2 = false">Cancel</v-btn>
                                    <v-btn text color="primary" @click="$refs.dialog2.save(date)">OK</v-btn>
                                  </v-date-picker>
                                </v-dialog>

                              </v-layout>
                              <v-layout row>


                                <v-dialog ref="dialog3" v-model="modal3" persistent width="50%" activator="parent">
                                  <template v-slot:activator="{ on }">
                                    <v-text-field v-model="editedProjectProcurementPackage.actualStartDate"
                                      label="Actual Start Date" prepend-icon="event" readonly v-on="on">
                                    </v-text-field>
                                  </template>
                                  <v-date-picker v-model="editedProjectProcurementPackage.actualStartDate" scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="modal3 = false">Cancel</v-btn>
                                    <v-btn text color="primary" @click="$refs.dialog3.save(date)">OK</v-btn>
                                  </v-date-picker>
                                </v-dialog>



                                <v-dialog ref="dialog4" v-model="modal4" persistent width="50%">
                                  <template v-slot:activator="{ on }">
                                    <v-text-field v-model="editedProjectProcurementPackage.actualCompletionDate"
                                      label="Actual Completion Date" prepend-icon="event" readonly v-on="on">
                                    </v-text-field>
                                  </template>
                                  <v-date-picker v-model="editedProjectProcurementPackage.actualCompletionDate"
                                    scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="modal4 = false">Cancel</v-btn>
                                    <v-btn text color="primary" @click="$refs.dialog4.save(date)">OK</v-btn>
                                  </v-date-picker>
                                </v-dialog>

                              </v-layout>

                              <v-layout row>

                                <v-dialog ref="dialog5" v-model="modal5" persistent width="50%" activator="parent">
                                  <template v-slot:activator="{ on }">
                                    <v-text-field v-model="editedProjectProcurementPackage.closeingDateForTenderReturn"
                                      label="Closing Date for Receipt of Tender" prepend-icon="event" readonly
                                      v-on="on"></v-text-field>
                                  </template>
                                  <v-date-picker v-model="editedProjectProcurementPackage.closeingDateForTenderReturn"
                                    scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="modal5 = false">Cancel</v-btn>
                                    <v-btn text color="primary" @click="$refs.dialog5.save(date)">OK</v-btn>
                                  </v-date-picker>
                                </v-dialog>

                              </v-layout>

                              <v-layout row>

                                <v-card>
                                  <v-card-title>
                                    <v-dialog v-model="projectProcurementSubContractorDialog" activator="parent">
                                      <template v-slot:activator="{ on }">
                                        <v-btn absolute right fab dark color="indigo" v-on="on">
                                          <v-icon dark>add</v-icon>
                                        </v-btn>
                                      </template>
                                      <v-card>
                                        <v-card-title>
                                          <span class="headline">Add SubContractor</span>
                                          <v-spacer></v-spacer>
                                          <v-text-field v-model="searchSubContractors" append-icon="search" label="Search"
                                            single-line hide-details></v-text-field>
                                          <v-spacer></v-spacer>
                                        </v-card-title>
                                        <v-card-text>

                                          <v-data-table :headers="subContractorTableHeaders" :calculate-widths="true"
                                            :items="subContractors" :show-select=true item-key="id"
                                            v-model="editedProjectProcurementPackage.invitationToTenderRequests"
                                            :search="searchSubContractors">

                                          </v-data-table>


                                        </v-card-text>
                                        <v-card-actions>
                                          <v-spacer></v-spacer>
                                          <v-btn color="blue darken-1"
                                            @click="projectProcurementSubContractorDialog = false">Cancel
                                          </v-btn>
                                          <v-btn color="blue darken-1" @click="saveProjectProcurementPackage">Save</v-btn>
                                        </v-card-actions>
                                      </v-card>
                                    </v-dialog>
                                    SubContract Tender List

                                    <v-layout>

                                      <v-select v-model="subContractorId" :items="subContractors" item-value="id"
                                        item-title="name" label="Select SubContractor Tender List" />


                                      <v-btn text color="primary" v-if='subContractorId'
                                        @click="createProjectSubContractorProcurementPackage(editedProjectProcurementPackage, subContractorId)">
                                        Create SubContractor Package</v-btn>

                                    </v-layout>
                                  </v-card-title>
                                  <v-card-text>

                                    <v-data-table :headers="projectSubContractorProcurementPackagesTableHeaders"
                                      :calculate-widths="true"
                                      :items="editedProjectProcurementPackage.subContractorProcurementPackages"
                                      :search="search">
                                      <template
                                        v-slot:[`item.actionViewSubContractorProcurementPackageBillItems`]="{ item }">
                                        <v-btn icon @click="viewSubContractorProcurementPackageBillItems(item)">
                                          <v-icon>
                                            edit
                                          </v-icon>
                                        </v-btn>
                                      </template>
                                      <template v-slot:[`item.actionDeleteSubContractorProcurementPackage`]="{ item }">
                                        <v-btn icon @click="deleteProjectSubContractorProcurementPackage(item)">
                                          <v-icon>
                                            delete
                                          </v-icon>
                                        </v-btn>
                                      </template>
                                    </v-data-table>
                                  </v-card-text>
                                </v-card>

                              </v-layout>

                              <br>

                              <v-layout row>

                                <v-card>
                                  <v-card-title>
                                    SubContract Bill Items
                                    <v-spacer>
                                    </v-spacer>
                                    <v-dialog v-model="projectProcurementPackageBoQItemsDialog" activator="parent">
                                      <template v-slot:activator="{ on }">
                                        <v-btn absolute right fab dark color="indigo" v-on="on">
                                          <v-icon dark>add</v-icon>
                                        </v-btn>
                                      </template>
                                      <v-card>
                                        <v-card-title>
                                          <span class="headline">Add Bill Item</span>
                                          <v-spacer></v-spacer>
                                          <v-text-field v-model="searchBoQ" append-icon="search" label="Search"
                                            single-line hide-details></v-text-field>
                                          <v-spacer></v-spacer>
                                        </v-card-title>
                                        <v-card-text>

                                          <v-data-table :headers="boqTableHeaders" :calculate-widths="true" :items="boq"
                                            :show-select=true item-key="id"
                                            v-model="editedProjectProcurementPackage.billItems" :search="searchBoQ">

                                          </v-data-table>


                                        </v-card-text>
                                        <v-card-actions>
                                          <v-spacer></v-spacer>
                                          <v-btn color="blue darken-1"
                                            @click="projectProcurementPackageBoQItemsDialog = false">Cancel
                                          </v-btn>
                                          <v-btn color="blue darken-1" @click="saveProjectProcurementPackage">Save</v-btn>
                                        </v-card-actions>
                                      </v-card>
                                    </v-dialog>
                                  </v-card-title>
                                  <v-card-text>
                                    <v-data-table :headers="projectProcurementSubContractBoQItemsTableHeaders"
                                      :calculate-widths="true" :items="editedProjectProcurementPackage.billItems"
                                      :search="search">
                                    </v-data-table>
                                  </v-card-text>
                                </v-card>

                              </v-layout>

                              <br>

                              <v-layout row>

                                <v-card>
                                  <v-card-title>
                                    SubContract Drawings
                                    <v-spacer>
                                    </v-spacer>
                                    <v-btn>
                                    <v-dialog v-model="projectProcurementPackageDrawingsDialog" activator="parent">
                                     
                                      <v-card>
                                        <v-card-title>
                                          <span class="Subtitle 2">Select Tender Drawings</span>
                                          <v-spacer></v-spacer>
                                          <v-text-field v-model="searchProjectDrawings" append-icon="search"
                                            label="Search" single-line hide-details></v-text-field>
                                          <v-spacer></v-spacer>
                                        </v-card-title>
                                        <v-card-text>

                                          <v-data-table :headers="drawingTableHeaders" :calculate-widths="true"
                                            :items="drawings" :show-select="true"
                                            v-model="editedProjectProcurementPackage.drawings"
                                            :search="searchProjectDrawings">
                                          </v-data-table>


                                        </v-card-text>

                                        <v-card-actions>
                                          <v-spacer></v-spacer>
                                          <v-btn color="blue darken-1"
                                            @click="projectProcurementPackageDrawingsDialog = false">Cancel
                                          </v-btn>
                                          <v-btn color="blue darken-1" @click="saveProjectProcurementPackage">Save</v-btn>
                                        </v-card-actions>
                                      </v-card>
                                    </v-dialog>
                                  </v-btn>

                                  </v-card-title>
                                  <v-card-text>
                                    <v-data-table :headers="projectProcurementSubContractDrawingsTableHeaders"
                                      :calculate-widths="true" :items="editedProjectProcurementPackage.drawings">
                                    </v-data-table>
                                  </v-card-text>
                                </v-card>

                              </v-layout>

                              <br>

                              <v-layout row>

                                <v-card>
                                  <v-card-title>
                                    SubContract Images
                                    <v-spacer>
                                    </v-spacer>
                                    <v-btn absolute right fab dark color="indigo" v-on="on">
                                      <v-dialog v-model="projectProcurementPackageImagesDialog" activator="parent">

                                        <v-card>
                                          <v-card-title>
                                            <span class="headline">Add Image</span>
                                          </v-card-title>
                                          <v-card-text>
                                            <v-container>

                                              <v-data-table :headers="imageMetadataTableHeaders" :calculate-widths="true"
                                                :items="projectImageMetadata" :search="search" show-select>

                                              </v-data-table>

                                            </v-container>
                                          </v-card-text>
                                          <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="blue darken-1"
                                              @click="projectProcurementPackageImagesDialog = false">Cancel
                                            </v-btn>
                                            <v-btn color="blue darken-1"
                                              @click="saveProjectProcurementPackage">Save</v-btn>
                                          </v-card-actions>
                                        </v-card>
                                      </v-dialog>
                                    </v-btn>
                                  </v-card-title>
                                  <v-data-table :headers="imageMetadataTableHeaders" :calculate-widths="true"
                                    :items="editedProjectProcurementPackage.images" :search="search">
                                  </v-data-table>

                                </v-card>

                              </v-layout>


                            </v-container>
                          </v-card-text>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" @click="closeProjectProcurementPackageDialog">Close
                            </v-btn>
                            <v-btn color="blue darken-1" @click="saveProjectProcurementPackage">Save</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-btn>
                  </v-card-title>

                  <v-card-text>
                    <h2>Procurement Packages </h2>
                    <br>
                    <v-layout row>

                      <div v-if="projectProcurementPackageSummary">Total Contract Value
                        {{ projectProcurementPackageSummary.totalContractValue }}</div>


                      <div v-if="projectProcurementPackageSummary">Total SuContract Value
                        {{ projectProcurementPackageSummary.totalSubContractValue }}</div>


                      <div v-if="projectProcurementPackageSummary">Difference
                        {{ projectProcurementPackageSummary.margin }} (Euro)</div>

                    </v-layout>

                    <br>


                    <v-data-table :headers="projectProcurementPackagesTableHeaders" :calculate-widths="true"
                      :items="projectProcurementPackages" :search="search">

                      <template v-slot:[`item.actionEditProjectProcurementPackage`]="{ item }">
                        <v-btn icon @click="editProjectProcurementPackage(item)">
                          <v-icon>
                            edit
                          </v-icon>
                        </v-btn>
                      </template>

                      <template v-slot:[`item.actionDeleteProjectProcurementPackage`]="{ item }">
                        <v-btn icon @click="deleteProjectProcurementPackage(item)">
                          <v-icon>
                            delete
                          </v-icon>
                        </v-btn>
                      </template>
                    </v-data-table>
                  </v-card-text>
                </v-card>

              </v-window-item>

              <v-window-item value="financeTab-31">

                <v-card>
                  <v-card-title></v-card-title>
                  <v-data-table :headers="productTableHeaders" :calculate-widths="true" :items="boQProducts"
                    :search="search">
                  </v-data-table>

                </v-card>

              </v-window-item>

              <v-window-item value="financeTab-3">

                <v-card>
                  <v-card-title></v-card-title>

                    <v-data-table :headers="orderTableHeaders"  :calculate-widths="true" :items="orders" :search="search">
                    </v-data-table>
                  
                </v-card>

              </v-window-item>


              <v-window-item value="financeTab-7">

                <v-card>
                  <v-card-title>
                    <v-spacer></v-spacer>
                    <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details>
                    </v-text-field>
                    <v-spacer></v-spacer>
                    <v-btn icon color="green">
                      <v-icon icon="mdi-plus"></v-icon>
                      <v-dialog v-model="projectCustomerInvoiceDialog" activator="parent">

                        <v-card>
                          <v-card-title>
                            <span>Customer Invoice Details</span>
                          </v-card-title>
                          <v-card-text>
                            <v-container>
                              <v-layout row>

                                <v-select :items="customerListSelection" v-model="editedProjectCustomerInvoice.customerId"
                                  label="Select Customer" single>
                                </v-select>

                              </v-layout>
                              <v-layout row>

                                <v-text-field v-model="editedProjectCustomerInvoice.invoiceRef" label="Reference">
                                </v-text-field>


                                <v-select :items="invoiceStatusListSelection"
                                  v-model="editedProjectCustomerInvoice.status" label="Status" single></v-select>
                              </v-layout>
                              <v-layout row>

                                <v-textarea name="description" label="Description" id="description"
                                  v-model="editedProjectCustomerInvoice.description" required>
                                </v-textarea>

                              </v-layout>
                              <v-layout row>

                                <v-text-field v-model="editedProjectCustomerInvoice.currency" label="Currency">
                                </v-text-field>


                                <v-text-field v-model="editedProjectCustomerInvoice.grossAmount"
                                  label="Gross Amount"></v-text-field>


                                <v-text-field v-model="editedProjectCustomerInvoice.netAmount" label="Net Amount">
                                </v-text-field>

                              </v-layout>


                              <v-layout row>

                                <v-dialog ref="projectCustomerInvoiceDateDialog" v-model="projectCustomerInvoiceDateModal"
                                  persistent width="50%" activator="parent">
                                  <template v-slot:activator="{ on }">
                                    <v-text-field v-model="editedProjectCustomerInvoice.invoiceDate" label="Date Issued"
                                      prepend-icon="event" readonly v-on="on"></v-text-field>
                                  </template>
                                  <v-date-picker v-model="editedProjectCustomerInvoice.invoiceDate" scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="projectCustomerInvoiceDateModal = false">
                                      Cancel</v-btn>
                                    <v-btn text color="primary"
                                      @click="$refs.projectCustomerInvoiceDateDialog.save(date)">OK</v-btn>
                                  </v-date-picker>
                                </v-dialog>


                                <v-dialog ref="projectCustomerInvoicePaymentDueDateDialog"
                                  v-model="projectCustomerInvoicePaymentDueDateModal" persistent width="50%"
                                  activator="parent">
                                  <template v-slot:activator="{ on }">
                                    <v-text-field v-model="editedProjectCustomerInvoice.paymentDueDate"
                                      label="Payment Due Date" prepend-icon="event" readonly v-on="on">
                                    </v-text-field>
                                  </template>
                                  <v-date-picker v-model="editedProjectCustomerInvoice.paymentDueDate" scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary"
                                      @click="projectCustomerInvoicePaymentDueDateModal = false">Cancel</v-btn>
                                    <v-btn text color="primary"
                                      @click="$refs.projectCustomerInvoicePaymentDueDateDialog.save(date)">OK
                                    </v-btn>
                                  </v-date-picker>
                                </v-dialog>

                              </v-layout>

                              <v-layout row v-if="editedProjectCustomerInvoiceIndex < 0">

                                <v-file-input v-model="editedProjectCustomerInvoice.invoiceFile" label="Upload Invoice"
                                  filled prepend-icon="mdi-camera"></v-file-input>

                              </v-layout>

                            </v-container>
                          </v-card-text>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" @click="closeProjectCustomerInvoiceDialog">Cancel
                            </v-btn>
                            <v-btn color="blue darken-1" @click="saveProjectCustomerInvoice">Save</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-btn>
                  </v-card-title>
                  <h3>Customer Invoice Summary</h3>
                  <v-layout row v-if="projectCustomerInvoiceSummary">

                    <v-text-field v-model="projectCustomerInvoiceSummary.totalInvoiceCount" label="Invoice Count"
                      readonly></v-text-field>


                    <v-text-field v-model="projectCustomerInvoiceSummary.invoicesGrossAmountTotal"
                      label="Invoice Total Gross" readonly></v-text-field>


                    <v-text-field v-model="projectCustomerInvoiceSummary.invoicesNetAmountTotal" label="Invoice Total Net"
                      readonly></v-text-field>

                  </v-layout>
                  <v-layout row v-if="projectCustomerInvoiceSummary">

                    <v-text-field v-model="projectCustomerInvoiceSummary.unPaidInvoicesCount"
                      label="Invoice Count (Not Paid)" readonly></v-text-field>


                    <v-text-field v-model="projectCustomerInvoiceSummary.unPaidInvoicesGrossAmount"
                      label="Invoice Total Gross (Not Paid)" readonly></v-text-field>


                    <v-text-field v-model="projectCustomerInvoiceSummary.unPaidInvoicesNetAmount"
                      label="Invoice Total Net (Not Paid)" readonly></v-text-field>

                  </v-layout>
                  <v-layout row v-if="projectCustomerInvoiceSummary">

                    <v-text-field v-model="projectCustomerInvoiceSummary.paidInvoicesCount" label="Invoice Count (Paid)"
                      readonly></v-text-field>


                    <v-text-field v-model="projectCustomerInvoiceSummary.paidInvoicesGrossAmount"
                      label="Invoice Total Gross (Paid)" readonly></v-text-field>


                    <v-text-field v-model="projectCustomerInvoiceSummary.paidInvoicesNetAmount"
                      label="Invoice Total Net (Paid)" readonly></v-text-field>

                  </v-layout>
                  <h3>Invoice Details</h3>
                  <v-data-table :headers="projectCustomerInvoiceTableHeaders" :calculate-widths="true"
                    :items="projectCustomerInvoices" :search="search">
                    <template v-slot:[`item.actionDownloadProjectInvoice`]="{ item }">
                      <v-btn icon="mdi-download" @click="downloadCustomerInvoice(item)">
                        
                      </v-btn>
                    </template>
                    <template v-slot:[`item.actionEdit`]="{ item }">
                      <v-btn icon="mdi-file-edit-outline" @click="showProjectCustomerEditDialog(item)">
                      
                      </v-btn>
                    </template>


                    <template v-slot:[`item.actionDelete`]="{ item }">
                      <v-btn icon="mdi-delete-alert" @click="deleteProjectCustomerInvoice(item)">
                        
                      </v-btn>
                    </template>
                  </v-data-table>
                </v-card>


              </v-window-item>

              <v-window-item value="financeTab-8">

                <v-card>
                  <v-card-title>

                    <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details>
                    </v-text-field>
                    <v-spacer></v-spacer>
                    <v-btn icon color="green">
                <v-icon icon="mdi-plus"></v-icon>

                      <v-dialog v-model="projectSubContractorInvoiceDialog" activator="parent">

                        <v-card>
                          <v-card-title>
                            <span>SubContractor Invoice Details</span>
                          </v-card-title>
                          <v-card-text>
                            <v-container>
                              <v-layout row>

                                <v-select :items="subContractorListSelection"
                                  v-model="editedProjectSubContractorInvoice.subContractorId" label="Select SubContractor"
                                  single></v-select>

                              </v-layout>
                              <v-layout row>

                                <v-text-field v-model="editedProjectSubContractorInvoice.invoiceRef"
                                  label="Reference"></v-text-field>


                                <v-select :items="invoiceStatusListSelection"
                                  v-model="editedProjectSubContractorInvoice.status" item-value="id"
                              item-title="name" label="Status" single></v-select>
                              </v-layout>
                              <v-layout row>

                                <v-textarea name="description" label="Description" id="description"
                                  v-model="editedProjectSubContractorInvoice.description" required>
                                </v-textarea>

                              </v-layout>
                              <v-layout row>

                                <v-text-field v-model="editedProjectSubContractorInvoice.currency" label="Currency">
                                </v-text-field>


                                <v-text-field v-model="editedProjectSubContractorInvoice.grossAmount"
                                  label="Gross Amount"></v-text-field>


                                <v-text-field v-model="editedProjectSubContractorInvoice.netAmount"
                                  label="Net Amount"></v-text-field>

                              </v-layout>


                              <v-layout row>

                                <v-dialog ref="projectInvoiceDateDialog" v-model="projectInvoiceDateModal" persistent
                                  width="50%" activator="parent">
                                  <template v-slot:activator="{ on }">
                                    <v-text-field v-model="editedProjectSubContractorInvoice.invoiceDate"
                                      label="Date Issued" prepend-icon="event" readonly v-on="on"></v-text-field>
                                  </template>
                                  <v-date-picker v-model="editedProjectSubContractorInvoice.invoiceDate" scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="projectInvoiceDateModal = false">Cancel
                                    </v-btn>
                                    <v-btn text color="primary" @click="$refs.projectInvoiceDateDialog.save(date)">
                                      OK</v-btn>
                                  </v-date-picker>
                                </v-dialog>


                                <v-dialog ref="projectInvoicePaymentDueDateDialog"
                                  v-model="projectInvoicePaymentDueDateModal" persistent width="50%" activator="parent">
                                  <template v-slot:activator="{ on }">
                                    <v-text-field v-model="editedProjectSubContractorInvoice.paymentDueDate"
                                      label="Payment Due Date" prepend-icon="event" readonly v-on="on">
                                    </v-text-field>
                                  </template>
                                  <v-date-picker v-model="editedProjectSubContractorInvoice.paymentDueDate" scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="projectInvoicePaymentDueDateModal = false">
                                      Cancel</v-btn>
                                    <v-btn text color="primary"
                                      @click="$refs.projectInvoicePaymentDueDateDialog.save(date)">OK</v-btn>
                                  </v-date-picker>
                                </v-dialog>

                              </v-layout>

                              <v-layout row v-if="editedProjectSubContractorInvoiceIndex < 0">

                                <v-file-input v-model="editedProjectSubContractorInvoice.invoiceFile"
                                  label="Upload Invoice" filled prepend-icon="mdi-camera"></v-file-input>

                              </v-layout>

                            </v-container>
                          </v-card-text>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" @click="closeProjectSubContractorInvoiceDialog">Cancel
                            </v-btn>
                            <v-btn color="blue darken-1" @click="saveProjectSubContractorInvoice">Save</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-btn>
                  </v-card-title>
                  <h3>SubContractor Invoice Summary</h3>
                  <v-layout row v-if="projectSubContractorInvoiceSummary">

                    <v-text-field v-model="projectSubContractorInvoiceSummary.totalInvoiceCount" label="Invoice Count"
                      readonly></v-text-field>


                    <v-text-field v-model="projectSubContractorInvoiceSummary.invoicesGrossAmountTotal"
                      label="Invoice Total Gross" readonly></v-text-field>


                    <v-text-field v-model="projectSubContractorInvoiceSummary.invoicesNetAmountTotal"
                      label="Invoice Total Net" readonly></v-text-field>

                  </v-layout>
                  <v-layout row v-if="projectSubContractorInvoiceSummary">

                    <v-text-field v-model="projectSubContractorInvoiceSummary.unPaidInvoicesCount"
                      label="Invoice Count (Not Paid)" readonly></v-text-field>


                    <v-text-field v-model="projectSubContractorInvoiceSummary.unPaidInvoicesGrossAmount"
                      label="Invoice Total Gross (Not Paid)" readonly></v-text-field>


                    <v-text-field v-model="projectSubContractorInvoiceSummary.unPaidInvoicesNetAmount"
                      label="Invoice Total Net (Not Paid)" readonly></v-text-field>

                  </v-layout>
                  <v-layout row v-if="projectSubContractorInvoiceSummary">

                    <v-text-field v-model="projectSubContractorInvoiceSummary.paidInvoicesCount"
                      label="Invoice Count (Paid)" readonly></v-text-field>


                    <v-text-field v-model="projectSubContractorInvoiceSummary.paidInvoicesGrossAmount"
                      label="Invoice Total Gross (Paid)" readonly></v-text-field>


                    <v-text-field v-model="projectSubContractorInvoiceSummary.paidInvoicesNetAmount"
                      label="Invoice Total Net (Paid)" readonly></v-text-field>

                  </v-layout>
                  <h3>Invoice Details</h3>
                  <v-data-table :headers="projectSubContractorInvoiceTableHeaders" :calculate-widths="true"
                    :items="projectSubContractorInvoices" :search="search">
                    <template v-slot:[`item.actionDownloadProjectInvoice`]="{ item }">
                      <v-btn icon="mdi-download" @click="downloadSubContractorInvoice(item)">
                     
                      </v-btn>
                    </template>
                    <template v-slot:[`item.actionEdit`]="{ item }">
                      <v-btn icon="mdi-file-edit-outline" @click="showProjectSubContractorEditDialog(item)">
                        
                      </v-btn>
                    </template>
                    <template v-slot:[`item.actionApproveProjectInvoice`]="{ item }">
                      <v-btn icon="mdi-payment" @click="approveProjectInvoicePayment(item)">
                       
                      </v-btn>
                    </template>

                    <template v-slot:[`item.actionDelete`]="{ item }">
                      <v-btn icon="mdi-delete-alert" @click="deleteProjectSubContractorInvoice(item)">
              
                      </v-btn>
                    </template>
                  </v-data-table>
                </v-card>

              </v-window-item>

              <v-window-item value="financeTab-9">

                <v-card>
                  <v-card-title>
                    <v-spacer></v-spacer>
                    <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details>
                    </v-text-field>
                    <v-spacer></v-spacer>
                    <v-btn icon color="green">
                      <v-icon icon="mdi-plus"></v-icon>
                      <v-dialog v-model="projectSupplierInvoiceDialog" activator="parent">

                        <v-card>
                          <v-card-title>
                            <span>Invoice Details</span>
                          </v-card-title>
                          <v-card-text>
                            <v-container>
                              <v-layout row>
                                <!--
                                  <v-select :items="supplierListSelection"
                                    v-model="editedProjectSupplierInvoice.supplierId" label="Select Supplier" single>
                                  </v-select>
-->
                              </v-layout>
                              <v-layout row>

                                <v-text-field v-model="editedProjectSupplierInvoice.invoiceRef" label="Reference">
                                </v-text-field>


                                <v-select :items="invoiceStatusListSelection"
                                  v-model="editedProjectSupplierInvoice.status" label="Status" single></v-select>
                              </v-layout>
                              <v-layout row>

                                <v-textarea name="description" label="Description" id="description"
                                  v-model="editedProjectSupplierInvoice.description" required>
                                </v-textarea>

                              </v-layout>
                              <v-layout row>

                                <v-text-field v-model="editedProjectSupplierInvoice.currency" label="Currency">
                                </v-text-field>


                                <v-text-field v-model="editedProjectSupplierInvoice.grossAmount"
                                  label="Gross Amount"></v-text-field>


                                <v-text-field v-model="editedProjectSupplierInvoice.netAmount" label="Net Amount">
                                </v-text-field>

                              </v-layout>


                              <v-layout row>
                                <!--
                                  <v-dialog ref="projectInvoiceDateDialog" v-model="projectInvoiceDateModal" persistent
                                    width="50%" activator="parent">
                                    <template v-slot:activator="{ on }">
                                      <v-text-field v-model="editedProjectSupplierInvoice.invoiceDate" label="Date Issued"
                                        prepend-icon="event" readonly v-on="on"></v-text-field>
                                    </template>
                                    <v-date-picker v-model="editedProjectSupplierInvoice.invoiceDate" scrollable>
                                      <v-spacer></v-spacer>
                                      <v-btn text color="primary" @click="projectInvoiceDateModal = false">Cancel
                                      </v-btn>
                                      <v-btn text color="primary" @click="$refs.projectInvoiceDateDialog.save(date)">
                                        OK</v-btn>
                                    </v-date-picker>
                                  </v-dialog>


                                  <v-dialog ref="projectInvoicePaymentDueDateDialog"
                                    v-model="projectInvoicePaymentDueDateModal" persistent width="50%" activator="parent">
                                    <template v-slot:activator="{ on }">
                                      <v-text-field v-model="editedProjectSupplierInvoice.paymentDueDate"
                                        label="Payment Due Date" prepend-icon="event" readonly v-on="on">
                                      </v-text-field>
                                    </template>
                                    <v-date-picker v-model="editedProjectSupplierInvoice.paymentDueDate" scrollable>
                                      <v-spacer></v-spacer>
                                      <v-btn text color="primary" @click="projectInvoicePaymentDueDateModal = false">
                                        Cancel</v-btn>
                                      <v-btn text color="primary"
                                        @click="$refs.projectInvoicePaymentDueDateDialog.save(date)">OK</v-btn>
                                    </v-date-picker>
                                  </v-dialog>
-->
                              </v-layout>

                              <v-layout row v-if="editedProjectSubContractorInvoiceIndex < 0">

                                <v-file-input v-model="editedProjectSubContractorInvoice.invoiceFile"
                                  label="Upload Invoice" filled prepend-icon="mdi-camera"></v-file-input>

                              </v-layout>

                            </v-container>
                          </v-card-text>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" @click="closeProjectSupplierInvoiceDialog">Cancel
                            </v-btn>
                            <v-btn color="blue darken-1" @click="saveProjectSupplierInvoice">Save</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-btn>
                  </v-card-title>
                  <h3>Supplier Invoice Summary</h3>
                  <v-layout row v-if="projectSupplierInvoiceSummary">

                    <v-text-field v-model="projectSupplierInvoiceSummary.totalInvoiceCount" label="Invoice Count"
                      readonly></v-text-field>


                    <v-text-field v-model="projectSupplierInvoiceSummary.invoicesGrossAmountTotal"
                      label="Invoice Total Gross" readonly></v-text-field>


                    <v-text-field v-model="projectSupplierInvoiceSummary.invoicesNetAmountTotal" label="Invoice Total Net"
                      readonly></v-text-field>

                  </v-layout>
                  <v-layout row v-if="projectSupplierInvoiceSummary">

                    <v-text-field v-model="projectSupplierInvoiceSummary.unPaidInvoicesCount"
                      label="Invoice Count (Not Paid)" readonly></v-text-field>


                    <v-text-field v-model="projectSupplierInvoiceSummary.unPaidInvoicesGrossAmount"
                      label="Invoice Total Gross (Not Paid)" readonly></v-text-field>


                    <v-text-field v-model="projectSupplierInvoiceSummary.unPaidInvoicesNetAmount"
                      label="Invoice Total Net (Not Paid)" readonly></v-text-field>

                  </v-layout>
                  <v-layout row v-if="projectSupplierInvoiceSummary">

                    <v-text-field v-model="projectSupplierInvoiceSummary.paidInvoicesCount" label="Invoice Count (Paid)"
                      readonly></v-text-field>


                    <v-text-field v-model="projectSupplierInvoiceSummary.paidInvoicesGrossAmount"
                      label="Invoice Total Gross (Paid)" readonly></v-text-field>


                    <v-text-field v-model="projectSupplierInvoiceSummary.paidInvoicesNetAmount"
                      label="Invoice Total Net (Paid)" readonly></v-text-field>

                  </v-layout>
                  <h3>Invoice Details</h3>
                  Project Supplier Invoices {{ projectSupplierInvoices.value }}
                  <v-data-table :headers="projectSupplierInvoiceTableHeaders" :items="projectSupplierInvoices.value"
                    :calculate-widths="true" :search="search">
                    <template v-slot:[`item.actionDownloadProjectInvoice`]="{ item }">
                      <v-btn icon="mdi-download" @click="downloadSupplierInvoice(item)">
                      </v-btn>
                    </template>
                    <template v-slot:[`item.actionEdit`]="{ item }">
                      <v-btn icon="mdi-file-edit-outline" @click="showProjectSupplierEditDialog(item)">
                      
                      </v-btn>
                    </template>


                    <template v-slot:[`item.actionDelete`]="{ item }">
                      <v-btn icon="mdi-delete-alert" @click="deleteProjectSupplierInvoice(item)">
                     
                      </v-btn>
                    </template>
                  </v-data-table>
                </v-card>

              </v-window-item>


            </v-window>

          </v-window-item>

          <v-window-item value="five">

            <v-tabs v-model="adminTab" show-arrows>


              <v-tab href="adminTab-1">
                Project Access Control List
              </v-tab>
              <v-tab href="adminTab-2">
                Design Distribution List
              </v-tab>
              <v-tab href="adminTab-3">
                Construction Distribution List
              </v-tab>
              <v-tab href="adminTab-4">
                Financial Distribution List
              </v-tab>
              <v-tab href="adminTab-5">

              </v-tab>
            </v-tabs>

            <v-window v-model="adminTab" v-if="userIsAuthenticatedAndHasRoleProjectAdmin">


              <v-window-item value="adminTab-1">

                <v-card>
                  <v-card-title>
                    Access Control
                    <v-spacer></v-spacer>
                    <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details>
                    </v-text-field>
                    <v-spacer></v-spacer>
                    <v-btn absolute right fab dark color="indigo" @click="openProjectAccessControlListDialog">
                      <v-dialog v-model="aclDialog" activator="parent">

                        <v-card>
                          <v-card-title>
                            <span class="headline">Update Project AccessControlList</span>
                          </v-card-title>
                          <v-card-text>
                            <v-container>

                              <v-data-table :headers="accessControlListHeaders" :calculate-widths="true" :items="users"
                                :search="search" item-key="username" show-select v-model="selectedProjectUsers">

                              </v-data-table>

                            </v-container>
                          </v-card-text>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" @click="closeProjectAccessControlListDialog">Cancel
                            </v-btn>
                            <v-btn color="blue darken-1" @click="updateProjectAccessControlList">Save</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-btn>
                  </v-card-title>
                  <v-data-table :headers="accessControlListHeaders" :calculate-widths="true" :items="accessControlList"
                    :search="search">
                  </v-data-table>
                </v-card>

              </v-window-item>

              <v-window-item value="adminTab-2">

                <v-card>
                  <v-card-title>
                    Contact List
                    <v-spacer></v-spacer>
                    <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details>
                    </v-text-field>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="projectContactDialog" activator="parent">
                      <template v-slot:activator="{ on }">
                        <v-btn absolute right fab dark color="indigo" v-on="on">
                          <v-icon dark>add</v-icon>
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="headline">Update Project Contact List</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>

                            <v-layout row>

                              <v-text-field v-model="editedProjectContact.companyId" label="Company">
                              </v-text-field>

                            </v-layout>
                            <v-layout row>

                              <v-text-field v-model="editedProjectContact.name" label="Name"></v-text-field>

                            </v-layout>
                            <v-layout row>

                              <v-textarea name="description" label="Description" id="description"
                                v-model="editedProjectContact.description" required>
                              </v-textarea>

                            </v-layout>
                            <v-layout row>

                              <v-text-field v-model="editedProjectContact.mobileNumber" label="Mobile">
                              </v-text-field>

                            </v-layout>
                            <v-layout row>

                              <v-text-field v-model="editedProjectContact.emailAddress" label="Email">
                              </v-text-field>

                            </v-layout>

                          </v-container>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" @click="closeProjectContactDialog">Cancel</v-btn>
                          <v-btn color="blue darken-1" @click="saveProjectContact">Save</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-card-title>
                  <v-data-table :headers="projectContactHeaders" :calculate-widths="true" :items="projectContacts"
                    :search="search">
                    <template v-slot:[`item.actionEdit`]="{ item }">
                      <v-btn icon="mdi-file-edit-outline" @click="editProjectContact(item)">
                       
                      </v-btn>
                    </template>

                    <template v-slot:[`item.actionDelete`]="{ item }">
                      <v-btn icon="mdi-delete-alert" @click="deleteProjectContact(item)">
                        
                      </v-btn>
                    </template>
                  </v-data-table>
                </v-card>

              </v-window-item>

              <v-window-item value="adminTab-3">

              </v-window-item>

            </v-window>

          </v-window-item>

        </v-window>

      </v-card-text>
      <v-snackbar v-model="snack" :timeout="4000" :color="snackColor" shaped>
        {{ snackText }}

        <template v-slot:[`action`]="{ attrs }">
          <v-btn text v-bind="attrs" @click="snack.value = false">
            X
          </v-btn>
        </template>
      </v-snackbar>

     
    </v-card>


  </v-container>
</template>

<script>

import { computed, ref, reactive, onMounted, watch, toRaw } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

export default {

  setup() {

    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const id = route.params.id;

    onMounted(() => {
      store.dispatch('projects/loadProject', id)
      console.log('Loading project ' + id)
      store.dispatch('users/loadUsers')
      store.dispatch('customers/loadCustomers')
      store.dispatch('subcontractors/loadSubContractors')
      store.dispatch('suppliers/loadSuppliers')
      store.dispatch('projects/loadProjectStatusList')
      store.dispatch('projects/loadProjectDrawingCategories')
      store.dispatch('projects/loadBoQItemCategories')
      store.dispatch('projects/loadProjectDrawingMetadata', id)
      store.dispatch('projects/loadProjectRFIs', id)
      store.dispatch('projects/loadProjectRooms', id)
      store.dispatch('projects/loadProjectImageMetadata', id)
      store.dispatch('projects/loadProjectProducts', id)
      store.dispatch('projects/loadProjectQuotations', id)
      store.dispatch('projects/loadProjectOrders', id)
      store.dispatch('projects/loadProjectProcurementPackages', id)
      store.dispatch('projects/loadProjectProcurementPackageSummary', id)
      store.dispatch('projects/loadProjectBoQItems', id)
      store.dispatch('projects/loadProjectBoQSummary', id)
      store.dispatch('projects/loadProjectBoQCategoryCosts', id)
      store.dispatch('projects/loadProjectRoomScheduleBoQ', id)
      store.dispatch('lprojects/oadProjectCustomerInvoices', id)
      store.dispatch('projects/loadProjectCustomerInvoiceSummary', id)
      store.dispatch('projects/loadProjectSubContractorInvoices', id)
      store.dispatch('projects/loadProjectSubContractorInvoiceSummary', id)
      store.dispatch('projects/loadProjectSupplierInvoices', id)
      store.dispatch('projects/loadProjectSupplierInvoiceSummary', id)
      store.dispatch('projects/loadProjectQuotationSummary', id)
      store.dispatch('projects/loadProjectQuotations', id)
      //editedProjectDetails.value = project

      /**
      store.dispatch('loadProjectBoQItems', id)
      store.dispatch('loadProjectSubContractTenders', id)
      store.dispatch('loadProjectTasks', id)
      store.dispatch('loadProjectContacts', id)
      store.dispatch('loadProjectProcurementPackageSummary', id)
      store.dispatch('loadProjectProcurementPackages', id)
      store.dispatch('loadProjectSubContractorInvoiceSummary', id)
      editedProjectDetails = project
      filteredDrawings = drawings
      filteredBoQ = boq
      //filteredProjectRoomScheduleBoQ = projectRoomScheduleBoQ()
  **/
    });

    const editedImageMetadataIndex = ref(-1);
    const editedProjectImageIndex = ref(-1)
    const dialog = ref(false);
    const materialCostDialog = ref(false);
    const openTreeNodes = reactive([]);
    const snack = ref(false);
    const snackColor = ref('');
    const snackText = ref('');
    const max25chars = v => v.length <= 25 || 'Input too long!';
    const outerTab = ref(null);
    const detailsTab = ref(null);
    const designTab = ref(null);
    const buildTab = ref(null);
    const financeTab = ref(null);
    const adminTab = ref(null);
    const tab = ref(null);
    const drawingFiles = reactive([]);
    const filteredDrawings = [];
    const filteredBoQ = [];
    const search = ref(null);
    const filteredProjectRoomScheduleBoQ = [];
    const searchRoomScheduleBoQTreeView = ref('');
    const searchProjectQuotations = ref('');
    const caseSensitive = ref(false);
    const searchBoQ = ref('');
    const searchProjectBoQ = ref('');
    const searchProjectDrawings = ref('');
    const searchProjectRFIs = ref('');
    const searchProjectRooms = ref('');
    const searchSubContractors = ref('');
    const drawingUrl = ref('');
    const uploadFieldName = ref('');
    const uploadedFiles = reactive([]);
    const fileCount = ref(0);
    const accessControlListHeaders = [
      {
        title: 'Username',
        align: 'left',
        sortable: false,
        key: 'username'
      },
      {
        title: 'Role',
        align: 'left',
        sortable: false,
        key: 'roles'
      }
    ];
    const projectContactHeaders = [
      { title: 'Company', key: 'companyId' },
      { title: 'Name', key: 'name' },
      { title: 'Description', key: 'description' },
      { title: 'Email', key: 'emailAddress' },
      { title: 'Mobile', key: 'mobileNumber', width: 150 },
      { title: 'Edit', align: 'left', key: 'actionEdit' },
      { title: 'Delete', align: 'left', key: 'actionDelete' }
    ];
    const drawingTableHeaders = [
      { title: 'Category', key: 'categoryName' },
      { title: 'Title', key: 'title' },
      { title: 'Description', key: 'description' },
      { title: 'Status', key: 'status' },
      { title: 'Revision', key: 'revision' },
      { title: 'Dowload', align: 'left', key: 'actionDownload' },
      { title: 'Edit', align: 'left', key: 'actionEdit' },
      { title: 'Delete', align: 'left', key: 'actionDelete' }
    ];
    const drawingMeasureTableHeaders = [
      { title: 'Category', key: 'categoryName' },
      { title: 'Title', key: 'title' },
      { title: 'Description', key: 'description' },
      { title: 'Status', key: 'status' },
      { title: 'Revision', key: 'revision' },
      { title: 'Dowload', align: 'left', key: 'actionDownload' }
    ];
    const projectRFITableHeaders = [
      { title: 'Status', key: 'status' },
      { title: 'Reference', key: 'name' },
      { title: 'AssignedTo', key: 'assignedTo' },
      { title: 'Date Required', key: 'dateRequired' },
      { title: 'Edit', align: 'left', key: 'actionEdit' },
      { title: 'Delete', align: 'left', key: 'actionDelete' }
    ];
    const projectRoomTableHeaders = [
      { title: 'Id', key: 'id' },
      { title: 'Room Name', key: 'name' },
      { title: 'Edit', align: 'left', key: 'actionEdit' },
      { title: 'Delete', align: 'left', key: 'actionDelete' }
    ];
    const projectRoomMeasureTableHeaders = [
      { title: 'Space', key: 'name' },
      { title: 'Quantity', key: 'quantity', default: 0 },
    ];
    const projectBoQCategoryCostsTableHeaders = [
      { title: 'Category', key: 'category' },
      { title: 'Cost', key: 'cost', default: 0 },
    ];
    const projectRoomScheduleBoQTableHeaders = [
      { title: 'Room Name', key: 'roomName' },
      { title: 'Category', key: 'boqItemCategory' },
      { title: 'Name', key: 'boqItemName' },

      { title: 'Quantity', key: 'quantity' },
      { title: 'Unit', key: 'unit', default: 0 },
      { title: 'Cost', key: 'boqItemContractRate' },
      { title: 'Cost', key: 'cost' },
      { title: 'BoQ', key: 'boqItems' },
    ];
    const rfiStatus = [
      'Open',
      'Closed'
    ];
    const productTableHeaders = [
      {
        title: 'Product',
        align: 'left',
        sortable: true,
        key: 'productName'
      },
      {
        title: 'Supplier',
        align: 'left',
        sortable: true,
        key: 'supplierName'
      },
      { title: 'units', key: 'units' },
      { title: 'Cost', key: 'cost' },
      { title: 'Product Code', key: 'productCode' },
      { title: 'leadInTimeInDays', key: 'leadInTimeInDays' },
      { title: 'Status', key: 'status' },
    ];
    const orderTableHeaders = [
      {
        title: 'Product',
        align: 'left',
        sortable: true,
        key: 'productName'
      },
      {
        title: 'Supplier',
        align: 'left',
        sortable: true,
        key: 'supplierName'
      },
      { title: 'Quantity', key: 'quantity' },
      { title: 'Unit Cost', key: 'unitCost' },
      { title: 'Total Cost', key: 'totalCost' },
      { title: 'Delivery Date', key: 'deliveryDate' },
      { title: 'Status', key: 'status' },
    ];
    const boqTableHeaders = [
      { title: 'Ref', key: 'ref' },
      {
        title: 'Category',
        align: 'left',
        sortable: true,
        key: 'categoryName'
      },
      { title: 'Name', key: 'name' },
      { title: 'Qty (Contract)', key: 'quantity' },
      { title: 'Unit', key: 'unit' },
      { title: 'Material', key: 'materialCost' },
      { title: 'Labour', key: 'labourCost' },
      { title: 'Rate', key: 'contractRate' },
      { title: 'Total Contracted', key: 'total', sortable: true },
      { title: 'Edit', align: 'left', key: 'actionEditBoQItem' },
      { title: 'Delete', align: 'left', key: 'actionDeleteBoQItem' }
    ];
    const projectBoQItemMeasureDialog = ref(false);
    const searchBoQItemMeasures = ref('');
    const measureTableHeaders = [
      { title: 'Ref', key: 'roomName' },
      { title: 'Measured', key: 'quantityMeasured' },
      { title: 'Delivered', key: 'quantityDelivered' },
      { title: 'Update', align: 'left', key: 'actionEdit' },
      { title: 'Delete', align: 'left', key: 'actionDelete' }
    ];
    const boqItemQuotationTableHeaders = [
      { title: 'Company', key: 'subContractorName' },
      { title: 'Quantity', key: 'quantity' },
      { title: 'Unit', key: 'unit' },
      { title: 'Rate', key: 'rate' },
      { title: 'Comments', key: 'subContractorComments' }
    ];
    const projectProcurementPackagesTableHeaders = [
      { title: 'Status', key: 'status' },
      { title: 'Name', key: 'name' },
      { title: 'Contract Value', key: 'totalContractValue' },
      { title: 'SubContract Value', key: 'totalSubContractValue' },
      { title: 'Margin', key: 'margin' },
      { title: 'AnticipatedStartDate', key: 'anticipatedStartDate' },
      { title: 'AnticipatedCompletionDate', key: 'anticipatedCompletionDate', align: ' d-none' },
      { title: 'ActualStartDate', key: 'actualStartDate', align: ' d-none' },
      { title: 'ActualCompletionDate', key: 'actualCompletionDate', align: ' d-none' },
      { title: 'Edit', align: 'left', key: 'actionEditProjectProcurementPackage' },
      { title: 'Delete', align: 'left', key: 'actionDeleteProjectProcurementPackage' }
    ];
    const projectSubContractorProcurementPackagesTableHeaders = [
      { title: 'Company', key: 'subContractorName' },
      { title: 'Address', key: 'subContractorAddress' },
      { title: 'DateIssued', key: 'dateIssued' },
      { title: 'SubContract Value', key: 'subContractTotalValue' },
      { title: 'Comments', key: 'comments' },
      { title: 'View', align: 'left', key: 'actionViewSubContractorProcurementPackageBillItems' },
      { title: 'Delete', align: 'left', key: 'actionDeleteSubContractorProcurementPackage' }
    ];
    const subContractorProcurementPackageBillItemsTableHeaders = [
      { title: 'Name', key: 'name' },
      { title: 'Description', key: 'description' },
      { title: 'Quantity', key: 'quantity' },
      { title: 'Rate', key: 'rate' },
      { title: 'Comments', key: 'comments' },
    ];
    const projectProcurementSubContractBoQItemsTableHeaders = [
      { title: 'Ref', key: 'ref' },
      {
        title: 'Section',
        align: 'left',
        sortable: true,
        key: 'category'
      },
      { title: 'Name', key: 'name' },
      { title: 'Description', key: 'description', width: '200px' },
      { title: 'Quantity', key: 'quantity' },
      { title: 'Unit', key: 'unit' },
      { title: 'Contract Rate', key: 'contractRate' },
      { title: 'SubContract Rate', key: 'subContractRate' },
      { title: 'Total', key: 'total' },
      // { title: 'Edit', align: 'left', key: 'actionEditBoQItem'}
    ];
    const projectProcurementSubContractDrawingsTableHeaders = [
      {
        title: 'Category',
        align: 'left',
        sortable: true,
        key: 'categoryName'
      },
      { title: 'Title', key: 'title' },
      { title: 'Description', key: 'description' },
      { title: 'Revision', key: 'revision' },
      { title: 'Status', key: 'status' },


      // { title: 'Edit', align: 'left', key: 'actionEditBoQItem'}
    ];
    const subContractorId = ref('');
    const taskTableHeaders = [
      { title: 'Category', key: 'category', width: 150 },
      { title: 'Name', key: 'name' },
      { title: 'Description', key: 'description' },
      { title: 'AnticipatedStartDate', key: 'anticipatedStartDate' },
      { title: 'AnticipatedCompletionDate', key: 'anticipatedCompletionDate', align: ' d-none' },
      { title: 'ActualStartDate', key: 'actualStartDate', align: ' d-none' },
      { title: 'ActualCompletionDate', key: 'actualCompletionDate', align: ' d-none' },
      { title: 'Status', key: 'status' },
      { title: 'Edit', align: 'left', key: 'actionEditTask' },
      { title: 'Delete', align: 'left', key: 'actionDeleteTask' }
    ];
    const imageMetadataTableHeaders = [
      { title: 'Title', key: 'title' },
      { title: 'Description', key: 'description' },
      { title: 'Location', key: 'location' },
      { title: 'Category', key: 'categoryId' },
      { title: 'Image', key: 'image' },
      { title: 'Edit', align: 'left', key: 'actionEditImageMetadata' },
      { title: 'Delete', align: 'left', key: 'actionDeleteImageMetadata' }
    ];
    const projectSubContractorInvoiceTableHeaders = [
      { title: 'Company', key: 'subContractorName' },
      { title: 'Status', key: 'status' },
      { title: 'InvoiceRef', key: 'invoiceRef' },
      // { title: 'Description', key: 'description' },
      { title: 'Currency', key: 'currency' },
      { title: 'Gross', key: 'grossAmount', width: 150 },
      { title: 'Net', key: 'netAmount', width: 150 },
      { title: 'Issued', key: 'invoiceDate', width: "125px" },
      { title: 'Payment', key: 'paymentDueDate', width: "125px" },
      { title: 'Download', align: 'left', key: 'actionDownloadProjectInvoice' },
      { title: 'Approve', align: 'left', key: 'actionApproveProjectInvoice' },
      { title: 'Edit', align: 'left', key: 'actionEdit' },
      { title: 'Delete', align: 'left', key: 'actionDelete' }
    ];
    const projectCustomerInvoiceTableHeaders = [
      { title: 'Company', key: 'customerName' },
      { title: 'Status', key: 'status' },
      { title: 'InvoiceRef', key: 'invoiceRef' },
      { title: 'Currency', key: 'currency' },
      { title: 'Gross', key: 'grossAmount', width: 150 },
      { title: 'Net', key: 'netAmount', width: 150 },
      { title: 'Issued', key: 'invoiceDate', width: "125px" },
      { title: 'Payment', key: 'paymentDueDate', width: "125px" },
      { title: 'Download', align: 'left', key: 'actionDownloadProjectInvoice' },
      { title: 'Edit', align: 'left', key: 'actionEdit' },
      { title: 'Delete', align: 'left', key: 'actionDelete' }
    ];
    const projectSupplierInvoiceTableHeaders = [
      { title: 'Company', key: 'supplierName' },
      { title: 'Status', key: 'status' },
      { title: 'InvoiceRef', key: 'invoiceRef' },
      { title: 'Currency', key: 'currency' },
      { title: 'Gross', key: 'grossAmount', width: 150 },
      { title: 'Net', key: 'netAmount', width: 150 },
      { title: 'Issued', key: 'invoiceDate', width: "125px" },
      { title: 'Payment', key: 'paymentDueDate', width: "125px" },
      { title: 'Download', align: 'left', key: 'actionDownloadProjectInvoice' },
      { title: 'Edit', align: 'left', key: 'actionEdit' },
      { title: 'Delete', align: 'left', key: 'actionDelete' }
    ];
    const subContractorTableHeaders = [
      { title: 'Category', key: 'subContractorCategoryName' },
      { title: 'Name', key: 'name' },
      { title: 'Description', key: 'description' },
      { title: 'Contact Name', key: 'contactName' },
      { title: 'Number', key: 'headOfficeTelephoneNumber' },
      { title: 'Email', key: 'email' },
      { title: 'Edit', align: 'left', key: 'actionEditSubContractor' },
      { title: 'View', align: 'left', key: 'actionShowSubContractorDetails' }
    ];
    const projectRFIDialog = ref(false);
    const projectRoomDialog = ref(false);
    const projectCustomerInvoiceDialog = ref(false);
    const projectCustomerInvoicePaymentDialog = ref(false);
    const projectCustomerInvoiceDateDialog = ref(false);
    const projectCustomerInvoiceDateModal = ref(false);
    const projectCustomerInvoicePaymentDueDateDialog = ref(false);
    const projectCustomerInvoicePaymentDueDateModal = ref(false);
    const editedProjectCustomerInvoiceIndex = ref(-1);
    const editedProjectCustomerInvoice = reactive({
      id: '',
      projectId: id,
      customerId: '',
      invoiceRef: '',
      description: '',
      currency: '',
      netAmount: '',
      invoiceDate: null,
      paymentDueDate: null,
      invoiceFile: null,
      status: ''
    });
    const defaultProjectCustomerInvoice = reactive({
      customerId: '',
      projectId: id,
      invoiceRef: '',
      description: '',
      currency: '',
      netAmount: '',
      invoiceDate: null,
      paymentDueDate: null,
      invoiceFile: null,
      status: ''
    });
    const projectSubContractorInvoiceDialog = ref(false);
    const projectSupplierInvoiceDialog = ref(false);
    const projectInvoicePaymentDialog = ref(false);
    const projectInvoiceDateDialog = ref(false);
    const projectInvoiceDateModal = ref(false);
    const projectInvoicePaymentDueDateDialog = ref(false);
    const projectInvoicePaymentDueDateModal = ref(false);
    const editedProjectSubContractorInvoiceIndex = ref(-1);
    const editedProjectSubContractorInvoice = reactive({
      id: '',
      projectId: id,
      subContractorId: '',
      invoiceRef: '',
      description: '',
      currency: '',
      netAmount: '',
      invoiceDate: null,
      paymentDueDate: null,
      invoiceFile: null,
      status: ''
    });
    const defaultProjectSubContractorInvoice = reactive({
      subContractorId: '',
      projectId: id,
      invoiceRef: '',
      description: '',
      currency: '',
      netAmount: '',
      invoiceDate: null,
      paymentDueDate: null,
      invoiceFile: null,
      status: ''
    });
    const editedProjectSupplierInvoiceIndex = ref(-1);
    const editedProjectSupplierInvoice = reactive({
      id: '',
      projectId: id,
      supplierId: '',
      invoiceRef: '',
      description: '',
      currency: '',
      netAmount: '',
      invoiceDate: null,
      paymentDueDate: null,
      invoiceFile: null,
      status: ''
    });
    const defaultProjectSupplierInvoice = reactive({
      supplierId: '',
      projectId: id,
      invoiceRef: '',
      description: '',
      currency: '',
      netAmount: '',
      invoiceDate: null,
      paymentDueDate: null,
      invoiceFile: null,
      status: ''
    });
    const selected = [];
    const selectedProjectTaskImageMeta = [];
    const selectedProjectUsers = [];
    const taskStatusTypes = [
      'OPENED',
      'IN PROGRESS',
      'COMPLETED'
    ];
    const invoiceStatusListSelection = [
      { title: 'Un Paid', key: 'UNPAID' },
      { title: 'Approved for Payment', key: 'APPROVED_FOR_PAYMENT' },
      { title: 'Paid', key: 'PAID' }
    ];
    const aclDialog = ref(false);
    const dialog5 = ref(false);
    const modal5 = ref(false);
    const dialog4 = ref(false);
    const modal4 = ref(false);
    const dialog3 = ref(false);
    const modal3 = ref(false);
    const dialog2 = ref(false);
    const modal2 = ref(false);
    const dialog1 = ref(false);
    const modal1 = ref(false);
    const projectRFIDateAssignedDialog = ref(false);
    const projectRFIDateAssignedModal = ref(false);
    const projectRFIDateRequiredDialog = ref(false);
    const projectRFIDateRequiredModal = ref(false);
    const projectRFIDateAnsweredDialog = ref(false);
    const projectRFIDateAnsweredModal = ref(false);
    const projectProcurementPackageBoQItemsDialog = ref(false);
    const projectProcurementPackageDrawingsDialog = ref(false);
    const projectProcurementPackageImagesDialog = ref(false);
    const projectProcurementSubContractorDialog = ref(false);
    const boQItemAnticipatedStartDateModal = ref(false);
    const boQItemAnticipatedStartDateDialog = ref(false);
    const boQItemAnticipatedCompletionDateModal = ref(false);
    const boQItemAnticipatedCompletionDateDialog = ref(false);
    const projectContactDialog = ref(false);
    const projectTaskDialog = ref(false);
    const projectBoQItemDialog = ref(false);
    const projectProcurementPackageDialog = ref(false);
    const editedSubContractorProcurementPackageBillItems = [];
    const projectImageDialog = ref(false);
    const projectImageMetaDataDialog = ref(false);
    const projectDrawingMetaDataDialog = ref(false);
    const modal = ref(false);
    const date = new Date().toISOString().substr(0, 10);
    const editedProjectDetailsIndex = ref(-1);
    const editedProjectDetails = reactive({
      id: '',
      siteId: '',
      projectName: '',
      projectDescription: '',
      projectAddress: '',
      status: '',
      customrerId: '',
      projectFunder: '',
      projectClientQuantitySurveyor: '',
      projectArchitect: '',
      projectStructuralEngineer: '',
      projectMechanicalAndElectricalEngineer: '',
      projectQuantitySurveyor: '',
      projectManager: '',
      siteEngineer: '',
      siteSafetyOfficer: '',
      projectSupervisorDesignProcess: '',
      projectSupervisorConstruction: ''
    });
    const defaultProjectDetails = reactive({
      projectName: '',
      siteId: '',
      projectDescription: '',
      projectAddress: '',
      status: '',
      projectFunder: '',
      projectClientQuantitySurveyor: '',
      projectArchitect: '',
      projectStructuralEngineer: '',
      projectMechanicalAndElectricalEngineer: '',
      projectQuantitySurveyor: '',
      projectManager: '',
      projectSupervisorDesignProcess: '',
      projectSupervisorConstruction: ''
    });
    const editedIndex = ref(-1);
    const editedItem = reactive({
      id: '',
      name: '',
      title: '',
      categoryId: '',
      description: '',
      status: '',
      revision: '',
      drawingFiles: null
    });
    const defaultItem = reactive({
      id: '',
      name: '',
      title: '',
      category: '',
      description: '',
      status: '',
      revision: '',
      drawingFiles: null
    });
    const editedProjectRFIIndex = ref(-1);
    const editedProjectRFI = reactive({
      id: '',
      projectId: id,
      name: '',
      description: '',
      location: '',
      assignedTo: '',
      dateAssigned: '',
      dateRequired: '',
      dateAnswered: '',
      response: '',
      status: '',
      comments: '',
      createdBy: '',
      createdAt: '',
      updatedBy: '',
      updatedAt: ''
    });
    const defaultProjectRFI = reactive({
      projectId: id,
      name: '',
      description: '',
      location: '',
      assignedTo: '',
      dateAssigned: '',
      dateRequired: '',
      dateAnswered: '',
      response: '',
      status: '',
      comments: '',
      createdBy: '',
      createdAt: '',
      updatedBy: '',
      updatedAt: ''
    });
    const editedProjectRoomIndex = ref(-1);
    const editedProjectRoom = reactive({
      id: '',
      projectId: id,
      name: '',
      description: '',
      level: ''
    });
    const defaultProjectRoom = reactive({
      projectId: id,
      name: '',
      description: '',
      level: ''
    });
    const editedProjectContactIndex = ref(-1);
    const editedProjectContact = reactive({
      projectId: id,
      id: '',
      companyId: '',
      name: '',
      description: '',
      emailAddress: '',
      mobileNumber: ''
    });
    const defaultProjectContact = reactive({
      projectId: id,
      companyId: '',
      name: '',
      description: '',
      emailAddress: '',
      mobileNumber: ''
    });
    const editedProjectImagesIndex = ref(-1);
    const editedProjectImages = reactive({
      projectId: id,
      imageFiles: []
    });
    const defaultProjectImages = reactive({
      projectId: id,
      imageFiles: []
    });
    const editedProjectImageMetaDataIndex = ref(-1);
    const editedProjectImageMetaData = reactive({
      id: '',
      projectId: id,
      title: '',
      description: '',
      location: '',
      categoryId: '',
    });
    const defaultProjectImageMetadata = reactive({
      projectId: id,
      title: '',
      description: '',
      location: '',
      categoryId: '',
    });
    const editedProjectTaskIndex = ref(-1);
    const editedProjectTask = reactive({
      id: '',
      projectId: id,
      packageId: '',
      name: '',
      description: '',
      anticipatedStartDate: null,
      anticipatedCompletionDate: null,
      actualStartDate: null,
      actualCompleteionDate: null,
      status: '',
      imageMetadata: null
    });
    const defaultProjectTask = reactive({
      projectId: id,
      packageId: '',
      name: '',
      description: '',
      anticipatedStartDate: null,
      anticipatedCompletionDate: null,
      actualStartDate: null,
      actualCompletionDate: null,
      status: 'OPENED',
      imageMetadata: null
    });
    const procurementStatusTypes = [
      'TO TENDER',
      'OUT TO TENDER',
      'QUOTATIONS RECEIVED',
      'CONTRACT AWARDED',
      'CONTRACT COMPLETED'
    ];
    const editedProjectProcurementPackageIndex = ref(-1);
    const editedProjectProcurementPackage = reactive({
      id: '',
      projectId: id,
      packageId: '',
      name: '',
      description: '',
      anticipatedStartDate: null,
      anticipatedCompletionDate: null,
      actualStartDate: null,
      actualCompleteionDate: null,
      closeingDateForTenderReturn: null,
      billItems: [],
      drawings: [],
      images: [],
      subContractorProcurementPackages: [],
      status: '',
      imageMetadata: null
    });
    const defaultProjectProcurementPackage = reactive({
      projectId: id,
      packageId: '',
      name: '',
      description: '',
      anticipatedStartDate: null,
      anticipatedCompletionDate: null,
      actualStartDate: null,
      actualCompletionDate: null,
      closeingDateForTenderReturn: null,
      billItems: [],
      drawings: [],
      images: [],
      subContractorProcurementPackages: [],
      status: '',
      imageMetadata: null
    });
    const projectQuotationTableHeaders = [
      { title: 'Comapny', key: 'companyName' },
      { title: 'Type', key: 'type' },
      { title: 'Ref', key: 'quotationRef' },
      { title: 'Gross Value', key: 'grossAmount' },
      { title: 'Currency', key: 'currency' },
      { title: 'Received', key: 'quotationDate', width: "125px" },
      { title: 'Download', align: 'left', key: 'actionDownloadProjectQuotation' }
    ];
    const projectQuotationDialog = ref(false);
    const projectQuotationDateDialog = ref(false);
    const projectQuotationDateModal = ref(false);
    const projectQuotationDateReceivedDialog = ref(false);
    const projectQuotationDateReceivedModal = ref(false);
    const editedSubContractorQuotationIndex = ref(-1);
    const editedSubContractorQuotation = reactive({
      id: '',
      subContractorId: '',
      projectId: id,
      quotationRef: '',
      description: '',
      currency: '',
      netAmount: '',
      quotationDate: null,
      dateReceived: null,
      quotationFile: null,
      status: ''
    });
    const defaultSubContractorQuotation = reactive({
      subContractorId: '',
      projectId: id,
      quotationRef: '',
      description: '',
      currency: '',
      netAmount: '',
      quotationDate: null,
      paymentDueDate: null,
      quotationFile: null,
      status: ''
    });
    const dialogBoQItem = ref(false);
    const editedBoQItemIndex = ref(-1);
    const editedBoQItem = reactive({
      id: '',
      projectId: '',
      projectProcurementPackageId: '',
      categoryId: '',
      categoryName: '',
      category: '',
      ref: '',
      name: '',
      description: '',
      quantity: 0.0,
      measuredQuantity: 0.0,
      unit: '',
      contractRate: 0.0,
      subContractRate: 0.0,
      productId: '',
      supplierId: '',
      productQuotationId: '',
      materialCost: 0.0,
      materialMargin: 0.0,
      labourCosts: 0.0,
      labourMargin: 0.0,
      plantCost: 0.0,
      plantMargin: 0.0,
      quantityDeliveredToDate: 0.0,
      quantityClaimedToDate: 0.0,
      quantityCertifiedToDate: 0.0,
      quantityPaidToDate: 0.0,
      anticipatedStartDate: 0.0,
      anticipatedCompletionDate: 0.0,
      actualStartDate: null,
      actualCompletionDate: null,
      subContractorQuotations: [],
    });
    const defaultBoQItem = reactive({
      projectId: '',
      projectProcurementPackageId: '',
      category: '',
      name: '',
      ref: '',
      description: '',
      quantity: 0.0,
      measuredQuantity: 0.0,
      unit: '',
      productId: '',
      supplierId: '',
      productQuotationId: '',
      contractRate: 0.0,
      subContractRate: 0.0,
      quantityDeliveredToDate: 0.0,
      quantityClaimedToDate: 0.0,
      quantityCertifiedToDate: 0.0,
      quantityPaidToDate: 0.0,
      anticipatedStartDate: 0.0,
      anticipatedCompletionDate: 0.0,
      actualStartDate: null,
      actualCompletionDate: null,
      subContractorQuotations: [],
    });
    const editedBoQItemMeasureIndex = ref(-1);
    const editedBoQItemMeasure = reactive({
      id: '',
      projectId: '',
      boQItemId: '',
      name: '',
      description: '',
      quantity: '',
      unit: '',
      location: '',
      drawings: [],
      comments: '',
    });
    const defaultBoQItemMeasure = reactive({
      projectId: '',
      boQItemId: '',
      name: '',
      description: '',
      quantity: '',
      unit: '',
      drawings: [],
      location: '',
      comments: '',
    });
    const drawingStatusTypes = [
      'DRAFT',
      'CURRENT',
      'SUPERCEEDED'
    ];

    const projects = computed(() => store.getters['projects/loadedProjects']);
    const project = computed(() => store.getters['projects/loadedProject']);
    const error = computed(() => store.getters['error', { root: true }]);
    const userIsAuthenticatedAndHasRoleAdmin = computed(() => store.getters['users/userIsAuthenticatedAndHasRoleAdmin']);
    const loadedCategoryBoQItems = computed(() => { return store.getters['projects/loadedCategoryBoQItems'] });
    const userIsAuthenticated = computed(() => { return store.getters['users/userIsAuthenticated'] });
    const userIsAuthenticatedAndHasRoleUser = computed(() => { return store.getters['users/userIsAuthenticatedAndHasRoleUser'] });
    const userIsAuthenticatedAndHasRoleProjectAdmin = computed(() => { return store.getters['users/userIsAuthenticatedAndHasRoleProjectAdmin'] });
    const userIsProjectQuantitySurveyor = computed(() => { return store.getters['users/userIsAuthenticatedAndHasRoleProjectQuantitySurveyor'] });
    const userIsAuthenticatedAndHasRoleProjectConsultant = computed(() => { return store.getters['users/userIsAuthenticatedAndHasRoleProjectConsultant'] });
    const user = computed(() => { return store.getters['users/user'] });
    const customers = computed(() => { return store.getters['customers/loadedCustomers'] });
    const projectStatusList = computed(() => { return store.getters['projects/loadedProjectStatusList'] });
    //const project = computed(() => { return store.getters['projects/loadedProject'], id });
    const projectRFIs = computed(() => { return store.getters['projects/loadedProjectRFIs'] });
    const projectRoomsX = computed(() => { return store.getters['projects/loadedProjectRooms'] });
    const projectRooms = computed(() => {
      const projectRooms = store.getters.loadedProjectRooms
      const roots = projectRooms.map((room) => makeProjectMeasure(room.name, 0))
      return roots;
    });
    const projectQuantitiesByRoom = computed(() => { return store.getters['projects/loadedProjectRooms'] });
    const projectQuantitiesByRoom1 = computed(() =>  projectQuantitiesByRoom.value.map(r => { return makeRoomQuantity(r.name, 0); }));
    
    const orders = computed(() => { return store.getters['projects/loadedProjectOrders'] });
    const boQProducts = computed(() => { return store.getters['projects/loadedProjectProducts'] });
    const projectDrawingCategories = computed(() => { return store.getters['projects/loadedProjectDrawingCategories'] });
    const boQItemCategories = computed(() => { return store.getters['projects/loadedBoQItemCategories'] });
    const subContractors = computed(() => { return store.getters['projects/loadedSubContractors'] });
    const users = computed(() => { return store.getters['users/loadedUsers'] });
    const userNames = computed(() => { return store.getters['users/loadedUsers'].map(u => u.username) });

    const suppliers = computed(() => {
      return store.getters['suppliers/loadedSuppliers']
    });
    const customerListSelection = computed(() => {
      return store.getters['customers/loadedCustomers'].map(function (item) {
        return { text: item.name, value: item.id }
      })
    });
    const supplierListSelection = computed(() => {
      return store.getters['suppliers/loadedSuppliers'].map(function (item) {
        return { text: item.name, value: item.id }
      })
    });
    const projectSupplierInvoices = (() => {
      return store.getters['projects/loadedProjectSupplierInvoices']
    });
    const accessControlList = computed(() => {
      return project.value.projectAccessControlList
    });
    const projectContacts = computed(() => {
      return store.getters['projects/loadedProjectContacts']
    });
    const projectTasks = computed(() => {
      return store.getters['projects/loadedProjectTasks']
    });
    const projectImageMetadata = computed(() => {
      return store.getters['projects/loadedProjectImageMetadata']
    });
    const projectCustomerInvoiceSummary = computed(() => {
      return store.getters['projects/loadedProjectCustomerInvoiceSummary']
    });
    const projectCustomerInvoices = computed(() => {
      return store.getters['projects/loadedProjectCustomerInvoices']
    });
    const projectSubContractorInvoiceSummary = computed(() => {
      return store.getters['projects/loadedProjectSubContractorInvoiceSummary']
    });
    const projectSubContractorInvoices = computed(() => {
      return store.getters['projects/loadedProjectSubContractorInvoices']
    });
    const projectSupplierInvoiceSummary = computed(() => {
      return store.getters['projects/loadedProjectSupplierInvoiceSummary']
    });
    const title = computed(() => {
      return store.getters['projects/loadedProjectSupplierInvoices']
    });
    const projectProcurementPackageSummary = computed(() => {
      return store.getters['projects/loadedProjectProcurementPackageSummary']
    });
    const projectProcurementPackages = computed(() => {
      return store.getters['projects/loadedProjectProcurementPackages']
    });
    const projectSubContractorProcurementPackages = computed(() => {
      return store.getters['projects/loadedProjectSubContractorProcurementPackages']
    });
    const subContractorProcurementPackageBillItems = computed(() => {
      return store.getters['projects/loadedSubContractorProcurementPackageBillItems']
    });
    const projectProcurementPackagesListSelection = computed(() => {
      return store.getters['projects/loadedProjectProcurementPackages'].map(function (item) {
        return { text: item.name, value: item.id }
      })
    });
    const projectQuotationSummary = computed(() => {
      return store.getters['projects/loadedProjectQuotationSummary']
    });
    const projectQuotations = computed(() => {
      return store.getters['projects/loadedProjectQuotations']
    });
    const filteredDrawingsList = computed(() => {
      return filteredDrawings
    });
    const filteredBoQList = computed(() => {
      return filteredBoQ
    });
    const boQByRoomScheduleList = computed(() => {
      return store.getters['projects/boQByRoomScheduleList']
    });
    const drawings = computed(() => {
      return store.getters['projects/loadedProjectDrawings']
    });
    const projectBoQSummary = computed(() => {
      return store.getters['projects/loadedProjectBoQSummary']
    });
    const boq = computed(() => {
      return store.getters['projects/loadedProjectBoQ']
    });
    const projectBoQCategoryCosts = computed(() => {
      return store.getters['projects/loadedProjectBoQCategoryCosts']
    });
    const projectRoomScheduleBoQ = computed(() => {
      return store.getters['projects/loadedProjectRoomScheduleBoQ']
    });
    const selectedProjectBoQItem = computed(() => {
      return store.getters['projects/selectedProjectBoQItem']
    });
    const measures = computed(() => {
      return store.getters['projects/loadedProjectBoQItemMeasures']
    });
    const tenders = computed(() => {
      return store.getters['projects/loadedProjectSubContractTenders']
    });
    const projectTaskFormTitle = computed(() => {
      return editedProjectTaskIndex.value === -1 ? 'New Project Task' : 'Edit Project Task'
    });
    const projectProcurementPackageFormTitle = computed(() => {
      return editedProjectProcurementPackageIndex.value === -1 ? 'New Project Procurement Package' : 'Edit Project Procurement Package'
    });
    const projectImageFormTitle = computed(() => {
      return editedImageMetadataIndex.value === -1 ? 'New Project Image' : 'Edit Project Image'
    });
    const formIsValid = computed(() => {
      return true
    });
    const loading = computed(() => {
      return store.getters['loading', { root: true }]
    });


    const reloadBoQItems = (() => {
      searchProjectBoQ.value = '';
      store.dispatch('projects/loadProjectBoQItems', id)
    });

    const loadBoQItemsByCategory = ((categoryId) => {
      return store.dispatch('projects/loadBoQItemsByCategory', categoryId)
    });
    const updateNewBoQItem = ((categoryBoQItem) => {
      console.log('Category BoQ Item Selected ')
      console.log(categoryBoQItem)
      editedBoQItem.categoryId = categoryBoQItem.categoryId
      editedBoQItem.name = categoryBoQItem.name
      editedBoQItem.ref = categoryBoQItem.ref
      editedBoQItem.description = categoryBoQItem.description
      editedBoQItem.labourCost = categoryBoQItem.labourCost
      editedBoQItem.materialCost = categoryBoQItem.materialCost
      editedBoQItem.contractRate = categoryBoQItem.contractRate
      editedBoQItem.unit = categoryBoQItem.unit
    });
    /*
    const groupBy: function evenOddGrouper(items, groupBy) {
      const key = groupBy[0]
      return items.reduce((rv, x) => {
        const group = x[key] % 2 ? 'odd' : 'even';
        (rv[group] = rv[group] || []).push(x)
        return rv
      }, {})
    },*/
    const saveSubContractBillItem = ((item) => {
      console.log('updating suubContractBillItem')
      console.log(item)
      store.dispatch('projects/updateSubContractorProcurementPackageBillItem', item)
    });
    const onUpdateProject = (() => {
      console.log('Updating project details with form')
      console.log(editedProjectDetails)
      store.dispatch('projects/updateProject', editedProjectDetails)
        .then((response) => {
          console.log('Project data updated successfully' + response)
          snack.value = true
          snackColor.value = 'success'
          snackText.value = 'Project updated successfully!'
        })
        .catch((error) => {
          console.log(error)
          snack.value = true
          snackColor.value = 'error'
          snackText.value = 'Error Updating Project, please try again!'
        })
    });
    const downloadProjectDrawing = ((item) => {
      console.log('downloading item requested..')
      console.log(toRaw(item))
      console.log('for project id')
      console.log(item.value)
      console.log(item.title)
      const payload = {
        projectId: id,
        id: item.value,
        fileName: item.title
      }
      console.log(payload)
      store.dispatch('projects/downloadProjectDrawing', payload)
    });
    const downloadProjectQuotation = ((item) => {
      
      const obj = projectQuotations.value.find(q => q.id == item.value)
      console.log(item.value)
      console.log(obj.type)
      if (obj.type == 'SubContractor') {
        const payload = {
          supplierId: obj.companyId,
          id: obj.id,
          fileName: obj.fileName
        }
        console.log("dispatching download subcontractor quotation")
        console.log(payload)
        store.dispatch('subcontractors/downloadSubContractorQuotation', payload)
      }
      if (obj.type == 'Supplier') {
        console.log('downloading project quotation requested..')
        store.dispatch('suppliers/downloadSupplierQuotation', obj)
      }
    });
    const downloadCustomerInvoice = ((item) => {
      console.log('downloading customer invoice..')
      console.log(item)
      store.dispatch('customers/downloadCustomerInvoice', item)
    });
    const downloadSubContractorInvoice = ((item) => {
      console.log('downloading subcontractor invoice..')
      console.log(item)
      store.dispatch('subcontractors/downloadSubContractorInvoice', item)
    });
    const downloadSupplierInvoice = ((item) => {
      console.log('downloading supplier invoice..')
      console.log(item)
      store.dispatch('suppliers/downloadSupplierInvoice', item)
    });
    const downloadSubContractorQuotation = ((item) => {
      console.log('downloading item requested..')
      console.log(item)
      store.dispatch('subcontractors/downloadSubContractorQuotation', item)
    });
    const editItem = ((item) => {
      editedIndex.value = drawings.value.findIndex( d => d.id == item.value)
      const dwg = drawings.value.find( d => d.id == item.value)
      Object.assign(editedItem, dwg)
      projectDrawingMetaDataDialog.value = true
    });
    const editProjectContact = ((item) => {
      editedProjectContactIndex.value = projectContacts.value.indexOf(item)
      Object.assign(editedProjectContact, item)
      console.log("Selected Project Contact  is ")
      console.log(editedProjectContact.name)
      projectContactDialog.value = true
    });
    const deleteProjectContact = ((item) => {
      const formData = {
        id: item.id
      }
      console.log('deleting project contact..')
      console.log(formData)
      store.dispatch('projects/deleteProjectContact', formData)
    });
    const closeProjectContactDialog = (() => {
      projectContactDialog.value = false
      setTimeout(() => {
        Object.assign(editedProjectContact, defaultProjectContact)
        editedProjectContactIndex.value = -1
      }, 300)
    });
    const editProjectTask = ((item) => {
      editedProjectTaskIndex.value = projectTasks.value.indexOf(item)
      Object.assign(editedProjectTask, item)
      selectedProjectTaskImageMeta.value = []
      console.log("Selected Task image metadata is ")
      console.log(editedProjectTask.imageMetaData)
      selectedProjectTaskImageMeta.value = editedProjectTask.imageMetaData
      projectTaskDialog.value = true
    });
    const editProjectProcurementPackage = ((item) => {
      router.push('/projects/' + item.projectId + '/procurement/' + item.id)
      editedProjectProcurementPackageIndex.value = projectProcurementPackages.value.indexOf(item)
      Object.assign(editedProjectProcurementPackage, item)

      if (editedProjectProcurementPackage.anticipatedStartDate) {
        var anticipatedStartDate = new Date(editedProjectProcurementPackage.anticipatedStartDate).toISOString().substr(0, 10)
        editedProjectProcurementPackage.anticipatedStartDate = anticipatedStartDate
      }
      if (editedProjectProcurementPackage.anticipatedCompletionDate) {
        var anticipatedCompletionDate = new Date(editedProjectProcurementPackage.anticipatedCompletionDate).toISOString().substr(0, 10)
        editedProjectProcurementPackage.anticipatedCompletionDate = anticipatedCompletionDate
      }
      if (editedProjectProcurementPackage.actualStartDate) {
        var actualStartDate = new Date(editedProjectProcurementPackage.actualStartDate).toISOString().substr(0, 10)
        editedProjectProcurementPackage.actualStartDate = actualStartDate
      }
      if (editedProjectProcurementPackage.actualCompletionDate) {
        var actualCompletionDate = new Date(editedProjectProcurementPackage.actualCompletionDate).toISOString().substr(0, 10)
        editedProjectProcurementPackage.actualCompletionDate = actualCompletionDate
      }
      if (editedProjectProcurementPackage.closeingDateForTenderReturn) {
        var closeingDateForTenderReturn = new Date(editedProjectProcurementPackage.closeingDateForTenderReturn).toISOString().substr(0, 10)
        editedProjectProcurementPackage.closeingDateForTenderReturn = closeingDateForTenderReturn
      }

      const formData = {
        projectId: id,
        projectProcurementPackageId: item.id,

      }
      store.dispatch('loadProjectSubContractorProcurementPackages', formData)
      setTimeout(() => {
        projectProcurementPackageDialog.value = true
      }, 300)

    });
    const deleteProjectSubContractorProcurementPackage = ((item) => {
      console.log('Delete SubContractor Procurement Package ')
      console.log(item)
      store.dispatch('projects/deleteProjectSubContractorProcurementPackage', item)
    });
    const editProjectImageMetaData = ((item) => {
      editedProjectImageMetaDataIndex.value = projectImageMetadata.value.indexOf(item)
      Object.assign(editedProjectImageMetaData, item)
      projectImageMetaDataDialog.value = true
    });
    const saveProjectTask = (() => {
      if (editedProjectTaskIndex.value > -1) {
        const formData = {
          id: editedProjectTask.id,
          projectId: id,
          packageId: editedProjectTask.packageId,
          name: editedProjectTask.name,
          description: editedProjectTask.description,
          anticipatedStartDate: editedProjectTask.anticipatedStartDate,
          anticipatedCompletionDate: editedProjectTask.anticipatedCompletionDate,
          actualStartDate: editedProjectTask.actualStartDate,
          actualCompletionDate: editedProjectTask.actualCompletionDate,
          status: editedProjectTask.status,
          imageMetaDataIds: selectedProjectTaskImageMeta.map(x => x.id)
        }
        console.log('dispatching update project task event form data is')
        console.log(formData)
        store.dispatch('projects/updateProjectTask', formData)
      } else {
        const formData = {
          projectId: id,
          packageId: editedProjectTask.packageId,
          name: editedProjectTask.name,
          description: editedProjectTask.description,
          anticipatedStartDate: editedProjectTask.anticipatedStartDate,
          anticipatedCompletionDate: editedProjectTask.anticipatedCompletionDate,
          actualStartDate: editedProjectTask.actualStartDate,
          actualCompletionDate: editedProjectTask.actualCompletionDate,
          status: editedProjectTask.status,
          imageFiles: editedProjectTask.imageFiles,
          imageMetaDataIds: selectedProjectTaskImageMeta.map(x => x.id)
        }
        store.dispatch('projects/createProjectTask', formData)
        console.log('Creating new project task')
        console.log(formData)
      }
      closeProjectTaskDialog()
    });
    const saveProjectProcurementPackage = (() => {
      if (editedProjectProcurementPackageIndex.value > -1) {
        const formData = {
          id: editedProjectProcurementPackage.id,
          projectId: id,
          name: editedProjectProcurementPackage.name,
          description: editedProjectProcurementPackage.description,
          anticipatedStartDate: editedProjectProcurementPackage.anticipatedStartDate,
          anticipatedCompletionDate: editedProjectProcurementPackage.anticipatedCompletionDate,
          actualStartDate: editedProjectProcurementPackage.actualStartDate,
          actualCompletionDate: editedProjectProcurementPackage.actualCompletionDate,
          closeingDateForTenderReturn: editedProjectProcurementPackage.closeingDateForTenderReturn,
          status: editedProjectProcurementPackage.status,
          boQItemIds: editedProjectProcurementPackage.billItems.filter(x => x != null).map(x => x.id),
          drawingIds: editedProjectProcurementPackage.drawings.filter(x => x != null).map(x => x.id),
          imageIds: editedProjectProcurementPackage.images.filter(x => x != null).map(x => x.id)
        }
        console.log('dispatching update project procurement package, form data is')
        console.log(formData)
        store.dispatch('projects/updateProjectProcurementPackage', formData)
      } else {
        const formData = {
          projectId: id,
          packageId: editedProjectProcurementPackage.packageId,
          name: editedProjectProcurementPackage.name,
          description: editedProjectProcurementPackage.description,
          anticipatedStartDate: editedProjectProcurementPackage.anticipatedStartDate,
          anticipatedCompletionDate: editedProjectProcurementPackage.anticipatedCompletionDate,
          actualStartDate: editedProjectProcurementPackage.actualStartDate,
          actualCompletionDate: editedProjectProcurementPackage.actualCompletionDate,
          closeingDateForTenderReturn: editedProjectProcurementPackage.closeingDateForTenderReturn,
          status: editedProjectProcurementPackage.status,
          boQItemIds: editedProjectProcurementPackage.value.billItems.filter(x => x != null).map(x => x.id),
          drawingIds: editedProjectProcurementPackage.drawings.filter(x => x != null).map(x => x.id),
          imageIds: editedProjectProcurementPackage.images.filter(x => x != null).map(x => x.id)
        }
        store.dispatch('projects/createProjectProcurementPackage', formData)
        console.log('Creating new project procurement package')
        console.log(formData)
      }
      closeProjectProcurementPackageDialog()
    });
    const createProjectSubContractorProcurementPackage = ((item, subId) => {
      console.log('Creating subContractor project procurement package')
      console.log(item)
      console.log(subId)
      const formData = {
        projectId: id,
        subContractorId: subId,
        projectProcurementPackageId: item.id,
      }
      store.dispatch('projects/createProjectSubContractorProcurementPackage', formData)
      console.log('Creating SubContractorProjectProcurementPackage')
      console.log(formData)
    });
    const saveProjectContact = (() => {
      if (editedProjectContactIndex.value > -1) {
        const formData = {
          id: editedProjectContact.id,
          projectId: id,
          name: editedProjectContact.name,
          description: editedProjectContact.description,
          mobileNumber: editedProjectContact.mobileNumber,
          emailAddress: editedProjectContact.emailAddress,
          companyId: editedProjectContact.companyId
        }
        store.dispatch('projects/updateProjectContact', formData)
        console.log('Updating project contact')
        console.log(formData)
      } else {
        const formData = {
          projectId: id,
          name: editedProjectContact.name,
          description: editedProjectContact.description,
          mobileNumber: editedProjectContact.mobileNumber,
          emailAddress: editedProjectContact.emailAddress,
          companyId: editedProjectContact.companyId
        }
        store.dispatch('projects/createProjectContact', formData)
        console.log('Creating project contact')
        console.log(formData)
      }
      closeProjectContactDialog()
    });
    const saveProjectImageMetaData = (() => {
      // if (editedProjectImageMetaDataIndex > -1) {
      const formData = {
        id: editedProjectImageMetaData.id,
        projectId: id,
        title: editedProjectImageMetaData.title,
        description: editedProjectImageMetaData.description,
        revision: editedProjectImageMetaData.revision,
        categoryId: editedProjectImageMetaData.categoryId,
        location: editedProjectImageMetaData.location,
        status: editedProjectImageMetaData.status
      }
      console.log('Saving project image meta data')
      console.log(formData)
      store.dispatch('projects/saveProjectImageMetaData', formData)

      // }
      closeProjectImageMetaDataDialog()
    });
    const saveProjectImages = (() => {

      const formData = {
        projectId: id,
        imageFiles: editedProjectImages.imageFiles
      }
      store.dispatch('projects/uploadProjectImages', formData)
      console.log('Uploading project images')
      console.log(formData)

      closeProjectImageDialog()
    });
    const openProjectAccessControlListDialog = (() => {
      selectedProjectUsers.value = accessControlList
    });
    const updateProjectAccessControlList = (() => {

      const formData = {
        projectId: id,
        usernames: selectedProjectUsers
      }

      store.dispatch('projects/updateProjectAccessControlList', formData)
      // console.log('Updating project control list')
      // console.log(formData)
      closeProjectAccessControlListDialog()
    });
    const saveProjectDrawingMetaData = (() => {
      const formData = {
        categoryId: editedItem.categoryId,
        id: editedItem.id,
        projectId: id,
        title: editedItem.title,
        description: editedItem.description,
        status: editedItem.status,
        revision: editedItem.revision,
        drawingFiles: drawingFiles.value
      }
      store.dispatch('projects/updateProjectDrawingMetaData', formData)
      closeProjectDrawingMetaDataDialog()
      console.log('Updating project drawing meta data')
      console.log(formData)
    });
    const uploadProjectDrawings = (() => {
      const formData = {
        projectId: id,
        drawingFiles: file.value
      }
      store.dispatch('projects/uploadProjectDrawings', formData)
      console.log('Uploading project drawings')
      console.log(formData)
      close()
    });
    const deleteProjectDrawing = ((item) => {
      console.log('onDeleteDrawing Event Received..')
      const formData = {
        projectId: id,
        id: item.value
      }
      console.log(formData)
      // const index = drawings.indexOf(item)
      store.dispatch('projects/deleteProjectDrawing', formData)
      // confirm('Are you sure you want to delete drawing ' + $event.title + ' from the project register?') && drawings.splice(index, 1)
    });
    const saveOrUpdateProjectRFI = (() => {

      editedProjectRFI.projectId = id

      if (editedProjectRFIIndex.value == -1) {
        store.dispatch('projects/createProjectRFI', editedProjectRFI)
      } else {
        store.dispatch('projects/updateProjectRFI', editedProjectRFI)
      }
      closeProjectRFIDialog()
      console.log('Updating project rfi')
      console.log(editedProjectRFI)
    });
    const deleteProjectRFI = ((item) => {
      console.log('onDeleteDrawing Event Received..')
      console.log(item)
      store.dispatch('projects/deleteProjectRFI', item)
    });
    const openProjectRFIDialog = ((item) => {
      editedProjectRFIIndex.value = projectRFIs.value.indexOf(item)
      Object.assign(editedProjectRFI, item)
      var dateAssigned = new Date(editedProjectRFI.dateAssigned).toISOString().substr(0, 10)
      editedProjectRFI.dateAssigned = dateAssigned
      var dateRequired = new Date(editedProjectRFI.dateRequired).toISOString().substr(0, 10)
      editedProjectRFI.dateRequired = dateRequired
      var dateAnswered = new Date(editedProjectRFI.dateAnswered).toISOString().substr(0, 10)
      editedProjectRFI.dateAnswered = dateAnswered
      projectRFIDialog.value = true
    });
    const closeProjectRFIDialog = (() => {
      projectRFIDialog.value = false
      setTimeout(() => {
        Object.assign(editedProjectRFI, defaultProjectRFI)
        editedProjectRFIIndex.value = -1
      }, 300)
    });

    //Project Rooms
    const saveOrUpdateProjectRoom = (() => {

      editedProjectRoom.projectId = id

      if (editedProjectRoomIndex.value == -1) {
        store.dispatch('projects/createProjectRoom', editedProjectRoom)
      } else {
        store.dispatch('projects/updateProjectRoom', editedProjectRoom)
      }
      closeProjectRoomDialog()
      console.log('Updating project room')
      console.log(editedProjectRoom)
    });
    const deleteProjectRoom = ((item) => {
      store.dispatch('projects/deleteProjectRoom', item.value)
    });
    const openProjectRoomDialog = ((item) => {
      editedProjectRoomIndex.value = projectRoomsX.value.findIndex(r => r.id == item.value)
      const obj = projectRoomsX.value.find(r => r.id == item.value);
      Object.assign(editedProjectRoom, obj)
      console.log(item)

      console.log("edited Project Room = ");

      console.log(editedProjectRoom)
      projectRoomDialog.value = true
    });
    const closeProjectRoomDialog = (() => {
      projectRoomDialog.value = false
      setTimeout(() => {
        Object.assign(editedProjectRoom, defaultProjectRoom)
        editedProjectRoomIndex.value = -1
      }, 300)
    });
    // End Project Rooms

    const deleteProjectTask = ((item) => {
      console.log('onDeleteDrawing Event Received..')
      console.log(item)
      // const index = projectTasks.indexOf(item)
      store.dispatch('projects/deleteProjectTask', item)
      // confirm('Are you sure you want to delete drawing ' + $event.title + ' from the project register?') && drawings.splice(index, 1)
    });
    const deleteProjectProcurementPackage = ((item) => {
      console.log('onDeleteDrawing Event Received..')
      console.log(item)
      // const index = projectProcurementPackages.indexOf(item)
      store.dispatch('projects/deleteProjectProcurementPackage', item)
      // confirm('Are you sure you want to delete drawing ' + $event.title + ' from the project register?') && drawings.splice(index, 1)
    });
    const editBoQItem = ((item) => {
      console.log('item is ')
      console.log(item)
      store.dispatch('projects/setSelectedProjectBoQItem', item)
      editedBoQItemIndex.value = boq.value.findIndex(boq => boq.id == item.value)
      const obj = boq.value.find(boq => boq.id == item.value)
      Object.assign(editedBoQItem, obj)
      if (editedBoQItem.anticipatedStartDate) {
        var anticipatedStartDate = new Date(editedBoQItem.anticipatedStartDate)
        editedBoQItem.anticipatedStartDate = anticipatedStartDate
      }
      if (editedBoQItem.anticipatedCompletionDate) {
        var anticipatedCompletionDate = new Date(editedBoQItem.anticipatedCompletionDate)
        editedBoQItem.anticipatedCompletionDate = anticipatedCompletionDate
      }
      if (editedBoQItem.actualStartDate) {
        var actualStartDate = new Date(editedBoQItem.actualStartDate)
        editedBoQItem.actualStartDate = actualStartDate
      }
      if (editedBoQItem.actualCompletionDate) {
        var actualCompletionDate = new Date(editedBoQItem.actualCompletionDate)
        editedBoQItem.actualCompletionDate = actualCompletionDate
      }
      dialogBoQItem.value = true
    });
    const saveProjectBoQItem = (() => {
      //  const packageId = projectProcurementPackages.filter(x => x.name == editedBoQItem.procurementPackage).map(y => y.id)
      if (editedBoQItemIndex.value > -1) {
        const formData = {
          category: editedBoQItem.category,
          categoryId: editedBoQItem.categoryId,
          id: editedBoQItem.id,
          projectId: id,
          ref: editedBoQItem.ref,
          projectProcurementPackageId: editedBoQItem.projectProcurementPackageId,
          name: editedBoQItem.name,
          description: editedBoQItem.description,
          quantity: editedBoQItem.quantity,
          measuredQuantity: editedBoQItem.measuredQuantity,
          unit: editedBoQItem.unit,
          contractRate: editedBoQItem.contractRate,
          subContractRate: editedBoQItem.subContractRate,
          materialCost: editedBoQItem.materialCost,
          materialMargin: editedBoQItem.materialMargin,
          labourCost: editedBoQItem.labourCost,
          labourMargin: editedBoQItem.labourMargin,
          plantCost: editedBoQItem.plantCost,
          plantMargin: editedBoQItem.plantMargin,
          quantityDeliveredToDate: editedBoQItem.quantityDeliveredToDate,
          quantityClaimedToDate: editedBoQItem.quantityClaimedToDate,
          quantityCertifiedToDate: editedBoQItem.quantityCertifiedToDate,
          quantityPaidToDate: editedBoQItem.quantityPaidToDate,
          anticipatedStartDate: editedBoQItem.anticipatedStartDate,
          anticipatedCompletionDate: editedBoQItem.anticipatedCompletionDate,
          actualStartDate: editedBoQItem.actualStartDate,
          actualCompletionDate: editedBoQItem.actualCompletionDate
        }
        //  console.log('Updated project boq item')
        //  console.log(formData)
        store.dispatch('projects/updateProjectBoQItem', formData)
          .then(
            store.dispatch('projects/loadProjectProcurementPackages', id)
          ).then(
            store.dispatch('projects/loadProjectProcurementPackageSummary', id)
            //$store.dispatch('loadProjectBoQSummary', id)
          )

      } else {
        const formData = {
          projectId: id,
          category: editedBoQItem.category,
          categoryId: editedBoQItem.categoryId,
          ref: editedBoQItem.ref,
          projectProcurementPackageId: editedBoQItem.projectProcurementPackageId,
          name: editedBoQItem.name,
          description: editedBoQItem.description,
          quantity: editedBoQItem.quantity,
          measuredQuantity: editedBoQItem.measuredQuantity,
          unit: editedBoQItem.unit,
          contractRate: editedBoQItem.contractRate,
          subContractRate: editedBoQItem.subContractRate,
          quantityDeliveredToDate: editedBoQItem.quantityDeliveredToDate,
          quantityClaimedToDate: editedBoQItem.quantityClaimedToDate,
          quantityCertifiedToDate: editedBoQItem.quantityCertifiedToDate,
          quantityPaidToDate: editedBoQItem.quantityPaidToDate,
          anticipatedStartDate: editedBoQItem.anticipatedStartDate,
          anticipatedCompletionDate: editedBoQItem.anticipatedCompletionDate,
          actualStartDate: editedBoQItem.actualStartDate,
          actualCompletionDate: editedBoQItem.actualCompletionDate
        }
        store.dispatch('projects/createProjectBoQItem', formData)
          .then(
            store.dispatch('projects/loadProjectProcurementPackages', id)
          ).then(
            store.dispatch('projects/loadProjectBoQSummary', id)
          )

      }
      closeBoQItemDialog()
    });
    const deleteProjectBoQItem = ((item) => {
      console.log('onDelete BoQItem Event Received..')
      console.log(item)
      // const index = drawings.indexOf(item)
      store.dispatch('projects/deleteProjectBoQItem', item)
      // confirm('Are you sure you want to delete drawing ' + $event.title + ' from the project register?') && drawings.splice(index, 1)
    });
    // https://stackoverflow.com/questions/43002417/arrays-javascript-filter-array-of-objects-using-input-search
    const filterList = ((val) => {
      let dwgs = drawings
      let dwgList = dwgs.filter(function (drawing) {
        return drawing.title.toLowerCase().indexOf(val) !== -1 // returns true or false
      })
      console.log('Filtered drawings = ')
      console.log(dwgList)
      Object.assign(filteredDrawings, dwgList)
    });
    const filterBoQItemList = ((val) => {
      let items = boq
      items = items.filter(function (item) {
        return item.name.toLowerCase().indexOf(val) !== -1 // returns true or false
      })
      console.log('Filtered boq = ')
      console.log(items)
      filteredBoQ.value = items
    });
    const close = (() => {
      console.log('close bulk upload dialog...')
      dialog.value = false
      setTimeout(() => {
        Object.assign(editedItem, defaultItem)
        editedIndex.value = -1
      }, 300)
    });
    const updateProjectBoQItemMeasure = ((item) => {
      console.log('updat BoQItemMeasure Event Received..')
      console.log(item)
      store.dispatch('projects/updateProjectBoQItemMeasure', item)
      var qty = measures.value.filter(m => m.quantityMeasured != null)
        .map(m => parseInt(m.quantityMeasured)).reduce((sum, val) => sum + val, 0).toFixed(2)
      editedBoQItem.quantity = qty
      editedBoQItem.measuredQuantity = qty
      store.dispatch('projects/updateProjectBoQItem', editedBoQItem)


      /*
      editedBoQItemMeasure.projectId = id
      editedBoQItemMeasure.boQItemId = editedBoQItem.id
 
 
        console.log('Updating project boq item measure')
        console.log(editedBoQItemMeasure)
        $store.dispatch('updateProjectBoQItemMeasure', editedBoQItemMeasure)
 
      closeProjectBoQItemMeasureDialog()
      */
    });
    const saveProjectBoQItemMeasure = (() => {
      console.log('onSave BoQItemMeasure Event Received..')
      editedBoQItemMeasure.projectId = id
      editedBoQItemMeasure.boQItemId = editedBoQItem.id
      console.log('Creating project boq item measure')
      console.log(editedBoQItemMeasure)
      store.dispatch('createProjectBoQItemMeasure', editedBoQItemMeasure)
      var qty = measures.value.filter(m => m.quantityMeasured != null)
        .map(m => parseInt(m.quantityMeasured)).reduce((sum, val) => sum + val, 0).toFixed(2)
      editedBoQItem.quantity = qty
      editedBoQItem.measuredQuantity = qty

      closeProjectBoQItemMeasureDialog()
    });
    const deleteProjectBoQItemMeasure = ((item) => {
      console.log('onDelete BoQItemMeasure Event Received..')
      console.log(item)
      store.dispatch('projects/deleteProjectBoQItemMeasure', item)
        .then(
          setTimeout(() => {
            var qty = measures.value.filter(m => m.quantityMeasured != null)
              .map(m => parseInt(m.quantityMeasured)).reduce((sum, val) => sum + val, 0).toFixed(2);

            editedBoQItem.quantity = qty
            editedBoQItem.measuredQuantity = qty
          }, 300)
        )
    });
    const closeProjectBoQItemMeasureDialog = (() => {
      projectBoQItemMeasureDialog.value = false
     // var qty = measures.value.filter(m => m.quantityMeasured != null)
     //   .map(m => parseInt(m.quantityMeasured)).reduce((sum, val) => sum + val, 0).toFixed(2)

     // editedBoQItem.quantity = qty
     // editedBoQItem.measuredQuantity = qty
      //store.dispatch('projects/updateProjectBoQItem', editedBoQItem)
      console.log('XXXXX')
      console.log(editedBoQItem.measuredQuantity)
      setTimeout(() => {
        Object.assign(editedBoQItemMeasure, defaultBoQItemMeasure)
        editedBoQItemMeasureIndex.value = -1
      }, 300)
    });
    const closeProjectAccessControlListDialog = (() => {
      aclDialog.value = false
      setTimeout(() => {
        selectedProjectUsers.value = []
      }, 300)
    });
    const closeProjectProcurementPackageDialog = (() => {
      projectProcurementPackageDialog.value = false
      setTimeout(() => {
        Object.assign(editedProjectProcurementPackage, defaultProjectProcurementPackage)
        editedProjectProcurementPackageIndex.value = -1
      }, 300)
    });
    const closeProjectTaskDialog = (() => {
      projectTaskDialog.value = false
      setTimeout(() => {
        Object.assign(editedProjectTask, defaultProjectTask)
        selectedProjectTaskImageMeta.value = []
        editedProjectTaskIndex.value = -1
      }, 300)
    });
    const closeProjectImageDialog = (() => {
      projectImageDialog.value = false
      // remove previously selected image files
      editedProjectImages.imageFiles = []

      setTimeout(() => {
        Object.assign(editedProjectImages, defaultProjectImages)
        editedProjectImageIndex.value = -1
      }, 300)
    });
    const closeProjectImageMetaDataDialog = (() => {
      projectImageMetaDataDialog.value = false
      setTimeout(() => {
        Object.assign(editedProjectImageMetaData, defaultProjectImageMetadata)
        editedProjectImageMetaDataIndex.value = -1
      }, 300)
    });
    
    const closeProjectDrawingMetaDataDialog = (() => {
      projectDrawingMetaDataDialog.value = false
      //setTimeout(() => {
        //Object.assign(editedProjectDrawingMetaData, defaultProjectDrawingMetadata)
        //editedProjectDrawingMetaDataIndex.value = -1
      //}, 300)
    });
    const closeBoQItemDialog = (() => {
      //Object.assign(dialogBoQItem, false);
      console.log('close boq item dialog')
      dialogBoQItem.value = false;
      setTimeout(() => {
        Object.assign(editedBoQItem, defaultBoQItem)
        editedBoQItemIndex.value = -1
      }, 300)
    });
    const saveProjectCustomerInvoice = (() => {
      if (editedProjectCustomerInvoiceIndex.value > -1) {
        const formData = {
          id: editedProjectCustomerInvoice.id,
          customerId: editedProjectCustomerInvoice.customerId,
          projectId: id,
          invoiceRef: editedProjectCustomerInvoice.invoiceRef,
          status: editedProjectCustomerInvoice.status,
          description: editedProjectCustomerInvoice.description,
          currency: editedProjectCustomerInvoice.currency,
          grossAmount: editedProjectCustomerInvoice.grossAmount,
          netAmount: editedProjectCustomerInvoice.netAmount,
          invoiceDate: editedProjectCustomerInvoice.invoiceDate,
          paymentDueDate: editedProjectCustomerInvoice.paymentDueDate
        }
        console.log('Updating project customer invoice details')
        console.log(formData)
        store.dispatch('projects/updateCustomerInvoice', formData)
          .then(
            setTimeout(() => {
              store.dispatch('projects/loadProjectCustomerInvoices', id)
              store.dispatch('projects/loadProjectCustomerInvoiceSummary', id)
            }, 300)
          )

      } else {
        console.log('Creating new customer invoice for project')
        const formData = {
          customerId: editedProjectCustomerInvoice.customerId,
          projectId: id,
          invoiceRef: editedProjectCustomerInvoice.invoiceRef,
          description: editedProjectCustomerInvoice.description,
          status: editedProjectCustomerInvoice.status,
          currency: editedProjectCustomerInvoice.currency,
          grossAmount: editedProjectCustomerInvoice.grossAmount,
          netAmount: editedProjectCustomerInvoice.netAmount,
          invoiceDate: editedProjectCustomerInvoice.invoiceDate,
          paymentDueDate: editedProjectCustomerInvoice.paymentDueDate,
          invoiceFile: editedProjectCustomerInvoice.invoiceFile
        }
        console.log(formData)
        store.dispatch('projects/createCustomerInvoice', formData)
          .then(
            setTimeout(() => {
              store.dispatch('projects/loadProjectCustomerInvoices', id)
              store.dispatch('projects/loadProjectCustomerInvoiceSummary', id)
            }, 300)
          )
      }
      closeProjectCustomerInvoiceDialog()
    });
    const showProjectCustomerEditDialog = ((item) => {
      console.log('Showing Edit Customer Invoice Dialog')
      console.log(item)
      editedProjectCustomerInvoiceIndex.value = projectCustomerInvoices.value.indexOf(item)
      Object.assign(editedProjectCustomerInvoice, item)
      projectCustomerInvoiceDialog.value = true
    });
    const closeProjectCustomerInvoiceDialog = (() => {
      projectCustomerInvoiceDialog.value = false;
      setTimeout(() => {
        Object.assign(editedProjectCustomerInvoice, defaultProjectCustomerInvoice);
        editedProjectCustomerInvoiceIndex.value = -1;
      }, 300)
    });
    const saveProjectSubContractorInvoice = (() => {
      if (editedProjectSubContractorInvoiceIndex.value > -1) {
        const formData = {
          id: editedProjectSubContractorInvoice.id,
          subContractorId: id,
          projectId: editedProjectSubContractorInvoice.projectId,
          invoiceRef: editedProjectSubContractorInvoice.invoiceRef,
          status: editedProjectSubContractorInvoice.status,
          description: editedProjectSubContractorInvoice.description,
          currency: editedProjectSubContractorInvoice.currency,
          grossAmount: editedProjectSubContractorInvoice.grossAmount,
          netAmount: editedProjectSubContractorInvoice.netAmount,
          invoiceDate: editedProjectSubContractorInvoice.invoiceDate,
          paymentDueDate: editedProjectSubContractorInvoice.paymentDueDate
        }
        console.log('Updating project invoice details')
        console.log(formData)
        store.dispatch('projects/updateSubContractorInvoice', formData)
          .then(
            setTimeout(() => {
              store.dispatch('projects/loadProjectSubContractorInvoices', id)
              store.dispatch('projects/loadProjectSubContractorInvoiceSummary', id)
            }, 300)
          )

      } else {
        console.log('Creating new subcontractor invoice for project')
        const formData = {
          subContractorId: editedProjectSubContractorInvoice.subContractorId,
          projectId: id,
          invoiceRef: editedProjectSubContractorInvoice.invoiceRef,
          description: editedProjectSubContractorInvoice.description,
          status: editedProjectSubContractorInvoice.status,
          currency: editedProjectSubContractorInvoice.currency,
          grossAmount: editedProjectSubContractorInvoice.grossAmount,
          netAmount: editedProjectSubContractorInvoice.netAmount,
          invoiceDate: editedProjectSubContractorInvoice.invoiceDate,
          paymentDueDate: editedProjectSubContractorInvoice.paymentDueDate,
          invoiceFile: editedProjectSubContractorInvoice.invoiceFile
        }
        console.log(formData)
        store.dispatch('subcontractors/createSubContractorInvoice', formData)
          .then(
            setTimeout(() => {
              store.dispatch('projects/loadProjectSubContractorInvoices', id)
              store.dispatch('projects/loadProjectSubContractorInvoiceSummary', id)
            }, 300)
          )
      }
      closeProjectSubContractorInvoiceDialog()
    });
    const showProjectSubContractorEditDialog = ((item) => {
      console.log('Showing Edit Invoice Dialog for operative with id ' + item.id)
      editedProjectSubContractorInvoiceIndex.value = projectSubContractorInvoices.value.indexOf(item)
      Object.assign(editedProjectSubContractorInvoice, item)
      projectSubContractorInvoiceDialog.value = true
    });
    const closeProjectSubContractorInvoiceDialog = (() => {
      projectSubContractorInvoiceDialog.value = false
      setTimeout(() => {
        Object.assign(editedProjectSubContractorInvoice, defaultProjectSubContractorInvoice)
        editedProjectSubContractorInvoiceIndex.value = -1
      }, 300)
    });
    const saveProjectSupplierInvoice = (() => {
      if (editedProjectSupplierInvoiceIndex.value > -1) {
        const formData = {
          id: editedProjectSupplierInvoice.id,
          supplierId: editedProjectSupplierInvoice.supplierId,
          projectId: id,
          invoiceRef: editedProjectSupplierInvoice.invoiceRef,
          status: editedProjectSupplierInvoice.status,
          description: editedProjectSupplierInvoice.description,
          currency: editedProjectSupplierInvoice.currency,
          grossAmount: editedProjectSupplierInvoice.grossAmount,
          netAmount: editedProjectSupplierInvoice.netAmount,
          invoiceDate: editedProjectSupplierInvoice.invoiceDate,
          paymentDueDate: editedProjectSupplierInvoice.paymentDueDate
        }
        console.log('Updating project supplier invoice details')
        console.log(formData)
        store.dispatch('suppliers/updateSupplierInvoice', formData)
          .then(
            setTimeout(() => {
              store.dispatch('projects/loadProjectSupplierInvoices', id)
              store.dispatch('projects/loadProjectSupplierInvoiceSummary', id)
            }, 300)
          )

      } else {
        console.log('Creating new supplier invoice for project')
        const formData = {
          supplierId: editedProjectSupplierInvoice.supplierId,
          projectId: id,
          invoiceRef: editedProjectSupplierInvoice.invoiceRef,
          description: editedProjectSupplierInvoice.description,
          status: editedProjectSupplierInvoice.status,
          currency: editedProjectSupplierInvoice.currency,
          grossAmount: editedProjectSupplierInvoice.grossAmount,
          netAmount: editedProjectSupplierInvoice.netAmount,
          invoiceDate: editedProjectSupplierInvoice.invoiceDate,
          paymentDueDate: editedProjectSupplierInvoice.paymentDueDate,
          invoiceFile: editedProjectSupplierInvoice.invoiceFile
        }
        console.log(formData)
        store.dispatch('suppliers/createSupplierInvoice', formData)
          .then(
            setTimeout(() => {
              store.dispatch('projects/loadProjectSupplierInvoices', id)
              store.dispatch('projects/loadProjectSupplierInvoiceSummary', id)
            }, 300)
          )
      }
      closeProjectSupplierInvoiceDialog()
    });
    const showProjectSupplierEditDialog = ((item) => {
      console.log('Showing Edit Supplieer Invoice Dialog for operative with id ' + item.id)
      editedProjectSupplierInvoiceIndex.value = projectSupplierInvoices.value.findIndex(s =>  s.id == item.value);
      const obj = projectSupplierInvoices.value.find(s =>  s.id == item.value);
      Object.assign(editedProjectSupplierInvoice, obj)
      projectSupplierInvoiceDialog.value = true
    });
    const closeProjectSupplierInvoiceDialog = (() => {
      projectSupplierInvoiceDialog.value = false
      setTimeout(() => {
        Object.assign(editedProjectSupplierInvoice, defaultProjectSupplierInvoice)
        editedProjectSupplierInvoiceIndex.value = -1
      }, 300)
    });
    const approveProjectInvoicePayment = ((item) => {
      const formData = {
        invoiceId: item.id,
        subContractorId: item.subContractorId,
        projectId: id,
        invoiceRef: item.invoiceRef
      }
      console.log('Approving project invoice for payment')
      console.log(formData)
      store.dispatch('subcontractors/approveSubContractorInvoicePayment', formData)
      closeProjectSubContractorInvoiceDialog()
    });
    const deleteProjectSubContractorInvoice = ((item) => {
      console.log('Delete SubContractor Invoice Event Received..')
      const formData = {
        id: item.id,
        subContractorId: item.subContractorId,
        projectId: id,
      }
      console.log(formData)
      store.dispatch('subcontractors/deleteSubContractorInvoice', formData)
    });
    const deleteProjectSupplierInvoice = ((item) => {
      console.log('Delete Supplier Invoice Event Received..')
      const formData = {
        id: item.id,
        supplierId: item.supplierId,
        projectId: id,
      }
      console.log(formData)
      store.dispatch('suppliers/deleteSupplierInvoice', formData)
    });
    const saveContractRate = ((item) => {
      //console.log('update BoQItem ContractRate ')
      //console.log(item)
      store.dispatch('projects/updateProjectBoQItem', item)
      //console.log('Updated BoQItem Quantity successfully')
    });
    const saveMaterialCost = ((item) => {
      store.dispatch('projects/updateProjectBoQItem', item)
      //console.log('Updated BoQItem Quantity successfully')
    });
    const saveLabourCost = ((item) => {
      store.dispatch('projects/updateProjectBoQItem', item)
      //console.log('Updated BoQItem Quantity successfully')
    });
    const saveMeasureQuantity = ((item) => {
      console.log('Save Measured Quantity called')
      console.log(item)

      var newMeasure = {
        clientId: item.clientId,
        projectId: item.projectId,
        roomScheduleId: item.id,
        drawingId: "",
        boQItemId: selectedProjectBoQItem.value, //?
        quantityMeasured: item.quantity
      }
      console.log(newMeasure)

      store.dispatch('projects/createProjectBoQItemMeasure', newMeasure).then(
        console.log('Updated BoQItem Quantity successfully'),
        snack.value = true,
        snackColor.value = 'success',
        snackText.value = 'Data saved'
      )
    });
    const saveQuantity = ((item) => {
      console.log('Save Quantity called')
      console.log(item)
      store.dispatch('projects/updateProjectBoQItem', item).then(
        console.log('Updated BoQItem Quantity successfully'),
        snack.value = true,
        snackColor.value = 'success',
        snackText.value = 'Data saved'
      )
    });
    const saveQuantityDeliveredToDate = ((item) => {
      console.log('Save Quantity Delivered called')
      console.log(item)
      store.dispatch('projects/updateProjectBoQItem', item).then(
        console.log('Updated BoQItem Quantity successfully'),
        snack.value = true,
        snackColor.value = 'success',
        snackText.value = 'Data saved'
      )
    });
    const save = (() => {
      console.log('Save Called')
      snack.value = true
      snackColor.value = 'success'
      snackText.value = 'Data saved'
    });
    const cancel = (() => {
      snack.value = true
      snackColor.value = 'error'
      snackText.value = 'Canceled'
    });
    const open = (() => {
      snack.value = true
      snackColor.value = 'info'
      snackText.value = 'Dialog opened'
      console.log('Dialog opened')
    });
    const onDismissed = (() => {
      store.dispatch('clearError', { root: true })
    });

    const makeProjectMeasure = ((name, qty) => {
      console.log("making room qty ");
      return { name: name, qty: qty };
    });



    watch(projectRoomScheduleBoQ, (newValue, oldValue) => {
      console.log('computedProperty projectRoomScheduleBoQ was ' + oldValue + '. Now it is ' + JSON.stringify(newValue) + '.')
      filteredProjectRoomScheduleBoQ.value = newValue;
    });

    watch(project, (newValue, oldValue) => {
      console.log('computedProperty [ project ]  was ' + oldValue + '. Now it is ' + JSON.stringify(newValue) + '.')
      Object.assign(editedProjectDetails, newValue);
    });


    const file = ref(null)

        const handleFileUpload = async() => {
           // debugger;
            console.log("selected file",file.value.files)
            //Upload to server
        }

       
    return {
      handleFileUpload,
          file,
      title,
      projectQuantitiesByRoom1,
      openTreeNodes,
      snack,
      snackColor,
      snackText,
      outerTab,
      detailsTab,
      designTab,
      buildTab,
      financeTab,
      adminTab,
      tab,
      drawingFiles,
      filteredDrawings,
      filteredBoQ,
      search,
      filteredProjectRoomScheduleBoQ,
      searchRoomScheduleBoQTreeView,
      searchProjectQuotations,
      caseSensitive,
      searchBoQ,
      searchProjectBoQ,
      searchProjectDrawings,
      searchProjectRFIs,
      searchProjectRooms,
      searchSubContractors,
      drawingUrl,
      uploadFieldName,
      uploadedFiles,
      fileCount,
      accessControlListHeaders,
      projectContactHeaders,
      drawingTableHeaders,
      drawingMeasureTableHeaders,
      projectRFITableHeaders,
      projectRoomTableHeaders,
      projectRoomMeasureTableHeaders,
      projectBoQCategoryCostsTableHeaders,
      projectRoomScheduleBoQTableHeaders,
      rfiStatus,
      productTableHeaders,
      orderTableHeaders,
      boqTableHeaders,
      projectBoQItemMeasureDialog,
      searchBoQItemMeasures,
      measureTableHeaders,
      boqItemQuotationTableHeaders,
      projectProcurementPackagesTableHeaders,
      projectSubContractorProcurementPackagesTableHeaders,
      subContractorProcurementPackageBillItemsTableHeaders,
      projectProcurementSubContractBoQItemsTableHeaders,
      projectProcurementSubContractDrawingsTableHeaders,
      subContractorId,
      taskTableHeaders,
      imageMetadataTableHeaders,
      projectSubContractorInvoiceTableHeaders,
      projectCustomerInvoiceTableHeaders,
      projectSupplierInvoiceTableHeaders,
      subContractorTableHeaders,
      projectRFIDialog,
      projectRoomDialog,
      projectCustomerInvoiceDialog,
      projectCustomerInvoicePaymentDialog,
      projectCustomerInvoiceDateDialog,
      projectCustomerInvoiceDateModal,
      projectCustomerInvoicePaymentDueDateDialog,
      projectCustomerInvoicePaymentDueDateModal,
      editedProjectCustomerInvoiceIndex,
      editedProjectCustomerInvoice,
      defaultProjectCustomerInvoice,
      projectSubContractorInvoiceDialog,
      projectSupplierInvoiceDialog,
      projectInvoicePaymentDialog,
      projectInvoiceDateDialog,
      projectInvoiceDateModal,
      projectInvoicePaymentDueDateDialog,
      projectInvoicePaymentDueDateModal,
      editedProjectSubContractorInvoiceIndex,
      editedProjectSubContractorInvoice,
      defaultProjectSubContractorInvoice,
      editedProjectSupplierInvoiceIndex,
      projectSupplierInvoices,
      closeProjectSupplierInvoiceDialog,
      editedProjectSupplierInvoice,
      defaultProjectSupplierInvoice,
      selected,
      selectedProjectTaskImageMeta,
      selectedProjectUsers,
      taskStatusTypes,
      invoiceStatusListSelection,
      aclDialog,
      dialog5,
      modal5,
      dialog4,
      modal4,
      dialog3,
      modal3,
      dialog2,
      modal2,
      dialog1,
      modal1,
      dialog,
      projectRFIDateAssignedDialog,
      projectRFIDateAssignedModal,
      projectRFIDateRequiredDialog,
      projectRFIDateRequiredModal,
      projectRFIDateAnsweredDialog,
      projectRFIDateAnsweredModal,
      projectProcurementPackageBoQItemsDialog,
      projectProcurementPackageDrawingsDialog,
      projectProcurementPackageImagesDialog,
      projectProcurementSubContractorDialog,
      boQItemAnticipatedStartDateModal,
      boQItemAnticipatedStartDateDialog,
      boQItemAnticipatedCompletionDateModal,
      boQItemAnticipatedCompletionDateDialog,
      projectContactDialog,
      projectTaskDialog,
      projectBoQItemDialog,
      projectProcurementPackageDialog,
      editedSubContractorProcurementPackageBillItems,
      projectImageDialog,
      projectImageMetaDataDialog,
      projectDrawingMetaDataDialog,
      modal,
      date,
      editedProjectDetailsIndex,
      editedProjectDetails,
      defaultProjectDetails,
      editedIndex,
      editedItem,
      defaultItem,
      editedProjectRFIIndex,
      editedProjectRFI,
      defaultProjectRFI,
      editedProjectRoomIndex,
      editedProjectRoom,
      defaultProjectRoom,
      editedProjectContactIndex,
      editedProjectContact,
      defaultProjectContact,
      editedProjectImagesIndex,
      editedProjectImages,
      defaultProjectImages,
      editedProjectImageMetaDataIndex,
      editedProjectImageMetaData,
      defaultProjectImageMetadata,
      editedProjectTaskIndex,
      editedProjectTask,
      defaultProjectTask,
      procurementStatusTypes,
      projectQuotationTableHeaders,
      projectQuotationDialog,
      projectQuotationDateDialog,
      projectQuotationDateModal,
      projectQuotationDateReceivedDialog,
      projectQuotationDateReceivedModal,
      editedSubContractorQuotationIndex,
      editedSubContractorQuotation,
      defaultSubContractorQuotation,
      dialogBoQItem,
      editedBoQItemIndex,
      editedBoQItem,
      defaultBoQItem,
      materialCostDialog,
      editedBoQItemMeasureIndex,
      editedBoQItemMeasure,
      defaultBoQItemMeasure,
      drawingStatusTypes,
      open,
      projects,
      error,
      userIsAuthenticated,
      loadedCategoryBoQItems,
      userIsAuthenticatedAndHasRoleAdmin,
      userIsAuthenticatedAndHasRoleProjectAdmin,
      userIsAuthenticatedAndHasRoleUser,
      userIsProjectQuantitySurveyor,
      userIsAuthenticatedAndHasRoleProjectConsultant,
      user,
      customers,
      projectStatusList,
      projectRooms,
      projectQuantitiesByRoom,
      orders,
      boQProducts,
      projectDrawingCategories,
      close,
      closeProjectRoomDialog,
      boQItemCategories,
      subContractors,
      users,
      userNames,
      suppliers,
      customerListSelection,
      supplierListSelection,
      accessControlList,
      projectContacts,
      projectTasks,
      projectImageMetadata,
      closeProjectImageDialog,
      closeProjectDrawingMetaDataDialog,
      projectCustomerInvoiceSummary,
      projectSubContractorInvoiceSummary,
      projectSupplierInvoiceSummary,
      closeProjectSubContractorInvoiceDialog,
      projectProcurementPackageSummary,
      projectSubContractorProcurementPackages,
      subContractorProcurementPackageBillItems,
      projectProcurementPackagesListSelection,
      closeProjectProcurementPackageDialog,
      projectQuotationSummary,
      projectQuotations,
      filteredDrawingsList,
      filteredBoQList,
      boQByRoomScheduleList,
      drawings,
      projectBoQSummary,
      boq,
      projectBoQCategoryCosts,
      projectRoomScheduleBoQ,
      selectedProjectBoQItem,
      measures,
      tenders,
      projectTaskFormTitle,
      projectProcurementPackageFormTitle,
      editedProjectProcurementPackage,
      projectImageFormTitle,
      formIsValid,
      loading,
      reloadBoQItems,
      loadBoQItemsByCategory,
      updateNewBoQItem,
      saveSubContractBillItem,
      onUpdateProject,
      downloadProjectDrawing,
      downloadProjectQuotation,
      downloadCustomerInvoice,
      downloadSupplierInvoice,
      downloadSubContractorInvoice,
      downloadSubContractorQuotation,
      editItem,
      editProjectContact,
      closeProjectContactDialog,
      deleteProjectContact,
      deleteProjectSubContractorProcurementPackage,
      editProjectTask,
      editProjectProcurementPackage,
      deleteProjectProcurementPackage,
      editProjectImageMetaData,
      saveProjectTask,
      closeProjectTaskDialog,
      saveProjectProcurementPackage,
      createProjectSubContractorProcurementPackage,
      saveProjectContact,
      saveProjectImageMetaData,
      saveProjectImages,
      openProjectAccessControlListDialog,
      updateProjectAccessControlList,
      saveProjectDrawingMetaData,
      uploadProjectDrawings,
      deleteProjectDrawing,
      saveOrUpdateProjectRFI,
      deleteProjectRFI,
      openProjectRFIDialog,
      closeProjectRFIDialog,
      saveOrUpdateProjectRoom,
      deleteProjectRoom,
      openProjectRoomDialog,
      closeProjectBoQItemMeasureDialog,
      deleteProjectTask,
      editBoQItem,
      saveProjectBoQItem,
      saveProjectCustomerInvoice,
      showProjectCustomerEditDialog,
      saveProjectSubContractorInvoice,
      showProjectSubContractorEditDialog,
      saveProjectSupplierInvoice,
      showProjectSupplierEditDialog,
      approveProjectInvoicePayment,
      deleteProjectSubContractorInvoice,
      deleteProjectSupplierInvoice,
      saveContractRate,
      saveMaterialCost,
      saveLabourCost,
      saveMeasureQuantity,
      saveQuantity,
      saveQuantityDeliveredToDate,
      save,
      projectRoomsX,
      cancel,
      onDismissed,
      deleteProjectBoQItem,
      filterList,
      filterBoQItemList,
      updateProjectBoQItemMeasure,
      saveProjectBoQItemMeasure,
      deleteProjectBoQItemMeasure,
      closeProjectCustomerInvoiceDialog,
      max25chars

    }
  }
}

function makeRoomQuantity(name, qty) {

//const projectBoQMeasure = this.loadedProjectBoQItemMeasures;
console.log("making room qty " + name);
return {
  name: name,
  qty: qty
};
}


</script>
