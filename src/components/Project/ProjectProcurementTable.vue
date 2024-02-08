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
                  <v-select
                    :items="procurementStatusTypes"
                    v-model="editedProjectProcurementPackage.status"
                    label="Status"
                  ></v-select>
                </v-layout>
                <v-layout row>
                  <v-text-field
                    v-model="editedProjectProcurementPackage.name"
                    label="Name"
                  >
                  </v-text-field>
                </v-layout>
                <v-layout row>
                  <v-textarea
                    name="description"
                    label="Description"
                    id="description"
                    v-model="editedProjectProcurementPackage.description"
                    required
                  >
                  </v-textarea>
                </v-layout>
                <v-layout row>
                  <v-dialog
                    ref="dialog1"
                    v-model="modal1"
                    persistent
                    width="50%"
                    activator="parent"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="editedProjectProcurementPackage.anticipatedStartDate"
                        label="Anticipated Start Date"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      >
                      </v-text-field>
                    </template>
                    <v-date-picker
                      v-model="editedProjectProcurementPackage.anticipatedStartDate"
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="modal1 = false">Cancel</v-btn>
                      <v-btn text color="primary" @click="$refs.dialog1.save(date)"
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-dialog>

                  <v-dialog ref="dialog2" v-model="modal2" persistent width="50%">
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="
                          editedProjectProcurementPackage.anticipatedCompletionDate
                        "
                        label="Anticipated Completion Date"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      >
                      </v-text-field>
                    </template>
                    <v-date-picker
                      v-model="editedProjectProcurementPackage.anticipatedCompletionDate"
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="modal2 = false">Cancel</v-btn>
                      <v-btn text color="primary" @click="$refs.dialog2.save(date)"
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-dialog>
                </v-layout>
                <v-layout row>
                  <v-dialog
                    ref="dialog3"
                    v-model="modal3"
                    persistent
                    width="50%"
                    activator="parent"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="editedProjectProcurementPackage.actualStartDate"
                        label="Actual Start Date"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      >
                      </v-text-field>
                    </template>
                    <v-date-picker
                      v-model="editedProjectProcurementPackage.actualStartDate"
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="modal3 = false">Cancel</v-btn>
                      <v-btn text color="primary" @click="$refs.dialog3.save(date)"
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-dialog>

                  <v-dialog ref="dialog4" v-model="modal4" persistent width="50%">
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="editedProjectProcurementPackage.actualCompletionDate"
                        label="Actual Completion Date"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      >
                      </v-text-field>
                    </template>
                    <v-date-picker
                      v-model="editedProjectProcurementPackage.actualCompletionDate"
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="modal4 = false">Cancel</v-btn>
                      <v-btn text color="primary" @click="$refs.dialog4.save(date)"
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-dialog>
                </v-layout>

                <v-layout row>
                  <v-dialog
                    ref="dialog5"
                    v-model="modal5"
                    persistent
                    width="50%"
                    activator="parent"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="
                          editedProjectProcurementPackage.closeingDateForTenderReturn
                        "
                        label="Closing Date for Receipt of Tender"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="
                        editedProjectProcurementPackage.closeingDateForTenderReturn
                      "
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="modal5 = false">Cancel</v-btn>
                      <v-btn text color="primary" @click="$refs.dialog5.save(date)"
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-dialog>
                </v-layout>

                <v-layout row>
                  <v-card>
                    <v-card-title>
                      <v-dialog
                        v-model="projectProcurementSubContractorDialog"
                        activator="parent"
                      >
                        <template v-slot:activator="{ on }">
                          <v-btn absolute right fab dark color="indigo" v-on="on">
                            <v-icon dark>add</v-icon>
                          </v-btn>
                        </template>
                        <v-card>
                          <v-card-title>
                            <span class="headline">Add SubContractor</span>
                            <v-spacer></v-spacer>
                            <v-text-field
                              v-model="searchSubContractors"
                              append-icon="search"
                              label="Search"
                              single-line
                              hide-details
                            ></v-text-field>
                            <v-spacer></v-spacer>
                          </v-card-title>
                          <v-card-text>
                            <v-data-table
                              :headers="subContractorTableHeaders"
                              :calculate-widths="true"
                              :items="subContractors"
                              :show-select="true"
                              item-key="id"
                              v-model="
                                editedProjectProcurementPackage.invitationToTenderRequests
                              "
                              :search="searchSubContractors"
                            >
                            </v-data-table>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="blue darken-1"
                              @click="projectProcurementSubContractorDialog = false"
                              >Cancel
                            </v-btn>
                            <v-btn
                              color="blue darken-1"
                              @click="saveProjectProcurementPackage"
                              >Save</v-btn
                            >
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                      SubContract Tender List

                      <v-layout>
                        <v-select
                          v-model="subContractorId"
                          :items="subContractors"
                          item-value="id"
                          item-title="name"
                          label="Select SubContractor Tender List"
                        />

                        <v-btn
                          text
                          color="primary"
                          v-if="subContractorId"
                          @click="
                            createProjectSubContractorProcurementPackage(
                              editedProjectProcurementPackage,
                              subContractorId
                            )
                          "
                        >
                          Create SubContractor Package</v-btn
                        >
                      </v-layout>
                    </v-card-title>
                    <v-card-text>
                      <v-data-table
                        :headers="projectSubContractorProcurementPackagesTableHeaders"
                        :calculate-widths="true"
                        :items="
                          editedProjectProcurementPackage.subContractorProcurementPackages
                        "
                        :search="search"
                      >
                        <template
                          v-slot:[`item.actionViewSubContractorProcurementPackageBillItems`]="{
                            item,
                          }"
                        >
                          <v-btn
                            icon
                            @click="viewSubContractorProcurementPackageBillItems(item)"
                          >
                            <v-icon> edit </v-icon>
                          </v-btn>
                        </template>
                        <template
                          v-slot:[`item.actionDeleteSubContractorProcurementPackage`]="{
                            item,
                          }"
                        >
                          <v-btn
                            icon
                            @click="deleteProjectSubContractorProcurementPackage(item)"
                          >
                            <v-icon> delete </v-icon>
                          </v-btn>
                        </template>
                      </v-data-table>
                    </v-card-text>
                  </v-card>
                </v-layout>

                <br />

                <v-layout row>
                  <v-card>
                    <v-card-title>
                      SubContract Bill Items
                      <v-spacer> </v-spacer>
                      <v-dialog
                        v-model="projectProcurementPackageBoQItemsDialog"
                        activator="parent"
                      >
                        <template v-slot:activator="{ on }">
                          <v-btn absolute right fab dark color="indigo" v-on="on">
                            <v-icon dark>add</v-icon>
                          </v-btn>
                        </template>
                        <v-card>
                          <v-card-title>
                            <span class="headline">Add Bill Item</span>
                            <v-spacer></v-spacer>
                            <v-text-field
                              v-model="searchBoQ"
                              append-icon="search"
                              label="Search"
                              single-line
                              hide-details
                            ></v-text-field>
                            <v-spacer></v-spacer>
                          </v-card-title>
                          <v-card-text>
                            <v-data-table
                              :headers="boqTableHeaders"
                              :calculate-widths="true"
                              :items="boq"
                              :show-select="true"
                              item-key="id"
                              v-model="editedProjectProcurementPackage.billItems"
                              :search="searchBoQ"
                            >
                            </v-data-table>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="blue darken-1"
                              @click="projectProcurementPackageBoQItemsDialog = false"
                              >Cancel
                            </v-btn>
                            <v-btn
                              color="blue darken-1"
                              @click="saveProjectProcurementPackage"
                              >Save</v-btn
                            >
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-card-title>
                    <v-card-text>
                      <v-data-table
                        :headers="projectProcurementSubContractBoQItemsTableHeaders"
                        :calculate-widths="true"
                        :items="editedProjectProcurementPackage.billItems"
                        :search="search"
                      >
                      </v-data-table>
                    </v-card-text>
                  </v-card>
                </v-layout>

                <br />

                <v-layout row>
                  <v-card>
                    <v-card-title>
                      SubContract Drawings
                      <v-spacer> </v-spacer>
                      <v-btn>
                        <v-dialog
                          v-model="projectProcurementPackageDrawingsDialog"
                          activator="parent"
                        >
                          <v-card>
                            <v-card-title>
                              <span class="Subtitle 2">Select Tender Drawings</span>
                              <v-spacer></v-spacer>
                              <v-text-field
                                v-model="searchProjectDrawings"
                                append-icon="search"
                                label="Search"
                                single-line
                                hide-details
                              ></v-text-field>
                              <v-spacer></v-spacer>
                            </v-card-title>
                            <v-card-text>
                              <v-data-table
                                :headers="drawingTableHeaders"
                                :calculate-widths="true"
                                :items="drawings"
                                :show-select="true"
                                v-model="editedProjectProcurementPackage.drawings"
                                :search="searchProjectDrawings"
                              >
                              </v-data-table>
                            </v-card-text>

                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                color="blue darken-1"
                                @click="projectProcurementPackageDrawingsDialog = false"
                                >Cancel
                              </v-btn>
                              <v-btn
                                color="blue darken-1"
                                @click="saveProjectProcurementPackage"
                                >Save</v-btn
                              >
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-btn>
                    </v-card-title>
                    <v-card-text>
                      <v-data-table
                        :headers="projectProcurementSubContractDrawingsTableHeaders"
                        :calculate-widths="true"
                        :items="editedProjectProcurementPackage.drawings"
                      >
                      </v-data-table>
                    </v-card-text>
                  </v-card>
                </v-layout>

                <br />

                <v-layout row>
                  <v-card>
                    <v-card-title>
                      SubContract Images
                      <v-spacer> </v-spacer>
                      <v-btn absolute right fab dark color="indigo" v-on="on">
                        <v-dialog
                          v-model="projectProcurementPackageImagesDialog"
                          activator="parent"
                        >
                          <v-card>
                            <v-card-title>
                              <span class="headline">Add Image</span>
                            </v-card-title>
                            <v-card-text>
                              <v-container>
                                <v-data-table
                                  :headers="imageMetadataTableHeaders"
                                  :calculate-widths="true"
                                  :items="projectImageMetadata"
                                  :search="search"
                                  show-select
                                >
                                </v-data-table>
                              </v-container>
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                color="blue darken-1"
                                @click="projectProcurementPackageImagesDialog = false"
                                >Cancel
                              </v-btn>
                              <v-btn
                                color="blue darken-1"
                                @click="saveProjectProcurementPackage"
                                >Save</v-btn
                              >
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-btn>
                    </v-card-title>
                    <v-data-table
                      :headers="imageMetadataTableHeaders"
                      :calculate-widths="true"
                      :items="editedProjectProcurementPackage.images"
                      :search="search"
                    >
                    </v-data-table>
                  </v-card>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" @click="closeProjectProcurementPackageDialog"
                >Close
              </v-btn>
              <v-btn color="blue darken-1" @click="saveProjectProcurementPackage"
                >Save</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-btn>
    </v-card-title>

    <v-card-text>
      <h2>Procurement Packages</h2>
      <br />
      <v-layout row>
        <div v-if="projectProcurementPackageSummary">
          Total Contract Value
          {{ projectProcurementPackageSummary.totalContractValue }}
        </div>

        <div v-if="projectProcurementPackageSummary">
          Total SuContract Value
          {{ projectProcurementPackageSummary.totalSubContractValue }}
        </div>

        <div v-if="projectProcurementPackageSummary">
          Difference {{ projectProcurementPackageSummary.margin }} (Euro)
        </div>
      </v-layout>

      <br />

      <v-data-table
        :headers="projectProcurementPackagesTableHeaders"
        :calculate-widths="true"
        :items="projectProcurementPackages"
        :search="search"
      >
        <template v-slot:[`item.actionEditProjectProcurementPackage`]="{ item }">
          <v-btn icon @click="editProjectProcurementPackage(item)">
            <v-icon> edit </v-icon>
          </v-btn>
        </template>

        <template v-slot:[`item.actionDeleteProjectProcurementPackage`]="{ item }">
          <v-btn icon @click="deleteProjectProcurementPackage(item)">
            <v-icon> delete </v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>
<script setup>
import { computed, ref, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

//eslint-disable-next-line
const { projectId } = defineProps(["projectId"]);
const router = useRouter();
const store = useStore();

onMounted(() => {
  console.log("Loading quotations for project id " + projectId);
  store.dispatch("projects/loadProjectProcurementPackages", projectId);
  store.dispatch("projects/loadProjectProcurementPackageSummary", projectId);
  store.dispatch("subcontractors/loadSubContractors");
});
const searchSubContractors = ref("");
const subContractors = computed(() => {
  return store.getters["subcontractors/loadedSubContractors"];
});
const projectProcurementPackageBoQItemsDialog = ref(false);
const projectProcurementPackageDrawingsDialog = ref(false);
const projectProcurementPackageImagesDialog = ref(false);
const projectProcurementSubContractorDialog = ref(false);
const projectProcurementPackageDialog = ref(false);
//const editedSubContractorProcurementPackageBillItems = [];
const editedProjectProcurementPackageIndex = ref(-1);
const editedProjectProcurementPackage = reactive({
  id: "",
  projectId: projectId,
  packageId: "",
  name: "",
  description: "",
  anticipatedStartDate: null,
  anticipatedCompletionDate: null,
  actualStartDate: null,
  actualCompleteionDate: null,
  closeingDateForTenderReturn: null,
  billItems: [],
  drawings: [],
  images: [],
  subContractorProcurementPackages: [],
  status: "",
  imageMetadata: null,
});
const defaultProjectProcurementPackage = reactive({
  projectId: projectId,
  packageId: "",
  name: "",
  description: "",
  anticipatedStartDate: null,
  anticipatedCompletionDate: null,
  actualStartDate: null,
  actualCompletionDate: null,
  closeingDateForTenderReturn: null,
  billItems: [],
  drawings: [],
  images: [],
  subContractorProcurementPackages: [],
  status: "",
  imageMetadata: null,
});

const search = ref("");

const procurementStatusTypes = [
  "TO TENDER",
  "OUT TO TENDER",
  "QUOTATIONS RECEIVED",
  "CONTRACT AWARDED",
  "CONTRACT COMPLETED",
];

const projectProcurementPackagesTableHeaders = [
  { title: "Status", key: "status" },
  { title: "Name", key: "name" },
  { title: "Contract Value", key: "totalContractValue" },
  { title: "SubContract Value", key: "totalSubContractValue" },
  { title: "Margin", key: "margin" },
  { title: "AnticipatedStartDate", key: "anticipatedStartDate" },
  {
    title: "AnticipatedCompletionDate",
    key: "anticipatedCompletionDate",
    align: " d-none",
  },
  { title: "ActualStartDate", key: "actualStartDate", align: " d-none" },
  { title: "ActualCompletionDate", key: "actualCompletionDate", align: " d-none" },
  { title: "Edit", align: "left", key: "actionEditProjectProcurementPackage" },
  { title: "Delete", align: "left", key: "actionDeleteProjectProcurementPackage" },
];
const projectSubContractorProcurementPackagesTableHeaders = [
  { title: "Company", key: "subContractorName" },
  { title: "Address", key: "subContractorAddress" },
  { title: "DateIssued", key: "dateIssued" },
  { title: "SubContract Value", key: "subContractTotalValue" },
  { title: "Comments", key: "comments" },
  {
    title: "View",
    align: "left",
    key: "actionViewSubContractorProcurementPackageBillItems",
  },
  {
    title: "Delete",
    align: "left",
    key: "actionDeleteSubContractorProcurementPackage",
  },
];
const subContractorTableHeaders = [
  { title: "Category", key: "subContractorCategoryName" },
  { title: "Name", key: "name" },
  { title: "Description", key: "description" },
  { title: "Contact Name", key: "contactName" },
  { title: "Number", key: "headOfficeTelephoneNumber" },
  { title: "Email", key: "email" },
  { title: "Edit", align: "left", key: "actionEditSubContractor" },
  { title: "View", align: "left", key: "actionShowSubContractorDetails" },
];
/*
const subContractorProcurementPackageBillItemsTableHeaders = [
  { title: "Name", key: "name" },
  { title: "Description", key: "description" },
  { title: "Quantity", key: "quantity" },
  { title: "Rate", key: "rate" },
  { title: "Comments", key: "comments" },
];*/
const projectProcurementSubContractBoQItemsTableHeaders = [
  { title: "Ref", key: "ref" },
  {
    title: "Section",
    align: "left",
    sortable: true,
    key: "category",
  },
  { title: "Name", key: "name" },
  { title: "Description", key: "description", width: "200px" },
  { title: "Quantity", key: "quantity" },
  { title: "Unit", key: "unit" },
  { title: "Contract Rate", key: "contractRate" },
  { title: "SubContract Rate", key: "subContractRate" },
  { title: "Total", key: "total" },
  // { title: 'Edit', align: 'left', key: 'actionEditBoQItem'}
];
const projectProcurementSubContractDrawingsTableHeaders = [
  {
    title: "Category",
    align: "left",
    sortable: true,
    key: "categoryName",
  },
  { title: "Title", key: "title" },
  { title: "Description", key: "description" },
  { title: "Revision", key: "revision" },
  { title: "Status", key: "status" },

  // { title: 'Edit', align: 'left', key: 'actionEditBoQItem'}
];
const projectProcurementPackageFormTitle = computed(() => {
  return editedProjectProcurementPackageIndex.value === -1
    ? "New Project Procurement Package"
    : "Edit Project Procurement Package";
});
const projectProcurementPackageSummary = computed(() => {
  return store.getters["projects/loadedProjectProcurementPackageSummary"];
});
const projectProcurementPackages = computed(() => {
  return store.getters["projects/loadedProjectProcurementPackages"];
});
/*
const projectSubContractorProcurementPackages = computed(() => {
  return store.getters["projects/loadedProjectSubContractorProcurementPackages"];
});
const subContractorProcurementPackageBillItems = computed(() => {
  return store.getters["projects/loadedSubContractorProcurementPackageBillItems"];
});
const projectProcurementPackagesListSelection = computed(() => {
  return store.getters["projects/loadedProjectProcurementPackages"].map(function (item) {
    return { text: item.name, value: item.id };
  });
});
*/
const editProjectProcurementPackage = (item) => {
  router.push("/projects/" + item.projectId + "/procurement/" + item.id);
  editedProjectProcurementPackageIndex.value = projectProcurementPackages.value.indexOf(
    item
  );
  Object.assign(editedProjectProcurementPackage, item);

  if (editedProjectProcurementPackage.anticipatedStartDate) {
    var anticipatedStartDate = new Date(
      editedProjectProcurementPackage.anticipatedStartDate
    )
      .toISOString()
      .substr(0, 10);
    editedProjectProcurementPackage.anticipatedStartDate = anticipatedStartDate;
  }
  if (editedProjectProcurementPackage.anticipatedCompletionDate) {
    var anticipatedCompletionDate = new Date(
      editedProjectProcurementPackage.anticipatedCompletionDate
    )
      .toISOString()
      .substr(0, 10);
    editedProjectProcurementPackage.anticipatedCompletionDate = anticipatedCompletionDate;
  }
  if (editedProjectProcurementPackage.actualStartDate) {
    var actualStartDate = new Date(editedProjectProcurementPackage.actualStartDate)
      .toISOString()
      .substr(0, 10);
    editedProjectProcurementPackage.actualStartDate = actualStartDate;
  }
  if (editedProjectProcurementPackage.actualCompletionDate) {
    var actualCompletionDate = new Date(
      editedProjectProcurementPackage.actualCompletionDate
    )
      .toISOString()
      .substr(0, 10);
    editedProjectProcurementPackage.actualCompletionDate = actualCompletionDate;
  }
  if (editedProjectProcurementPackage.closeingDateForTenderReturn) {
    var closeingDateForTenderReturn = new Date(
      editedProjectProcurementPackage.closeingDateForTenderReturn
    )
      .toISOString()
      .substr(0, 10);
    editedProjectProcurementPackage.closeingDateForTenderReturn = closeingDateForTenderReturn;
  }

  const formData = {
    projectId: projectId,
    projectProcurementPackageId: item.id,
  };
  store.dispatch("loadProjectSubContractorProcurementPackages", formData);
  setTimeout(() => {
    projectProcurementPackageDialog.value = true;
  }, 300);
};
const deleteProjectSubContractorProcurementPackage = (item) => {
  console.log("Delete SubContractor Procurement Package ");
  console.log(item);
  store.dispatch("projects/deleteProjectSubContractorProcurementPackage", item);
};
/*
const saveSubContractBillItem = (item) => {
  console.log("updating suubContractBillItem");
  console.log(item);
  store.dispatch("projects/updateSubContractorProcurementPackageBillItem", item);
};*/

const saveProjectProcurementPackage = () => {
  if (editedProjectProcurementPackageIndex.value > -1) {
    const formData = {
      id: editedProjectProcurementPackage.id,
      projectId: projectId,
      name: editedProjectProcurementPackage.name,
      description: editedProjectProcurementPackage.description,
      anticipatedStartDate: editedProjectProcurementPackage.anticipatedStartDate,
      anticipatedCompletionDate:
        editedProjectProcurementPackage.anticipatedCompletionDate,
      actualStartDate: editedProjectProcurementPackage.actualStartDate,
      actualCompletionDate: editedProjectProcurementPackage.actualCompletionDate,
      closeingDateForTenderReturn:
        editedProjectProcurementPackage.closeingDateForTenderReturn,
      status: editedProjectProcurementPackage.status,
      boQItemIds: editedProjectProcurementPackage.billItems
        .filter((x) => x != null)
        .map((x) => x.id),
      drawingIds: editedProjectProcurementPackage.drawings
        .filter((x) => x != null)
        .map((x) => x.id),
      imageIds: editedProjectProcurementPackage.images
        .filter((x) => x != null)
        .map((x) => x.id),
    };
    console.log("dispatching update project procurement package, form data is");
    console.log(formData);
    store.dispatch("projects/updateProjectProcurementPackage", formData);
  } else {
    const formData = {
      projectId: projectId,
      packageId: editedProjectProcurementPackage.packageId,
      name: editedProjectProcurementPackage.name,
      description: editedProjectProcurementPackage.description,
      anticipatedStartDate: editedProjectProcurementPackage.anticipatedStartDate,
      anticipatedCompletionDate:
        editedProjectProcurementPackage.anticipatedCompletionDate,
      actualStartDate: editedProjectProcurementPackage.actualStartDate,
      actualCompletionDate: editedProjectProcurementPackage.actualCompletionDate,
      closeingDateForTenderReturn:
        editedProjectProcurementPackage.closeingDateForTenderReturn,
      status: editedProjectProcurementPackage.status,
      boQItemIds: editedProjectProcurementPackage.billItems
        .filter((x) => x != null)
        .map((x) => x.id),
      drawingIds: editedProjectProcurementPackage.drawings
        .filter((x) => x != null)
        .map((x) => x.id),
      imageIds: editedProjectProcurementPackage.images
        .filter((x) => x != null)
        .map((x) => x.id),
    };
    store.dispatch("projects/createProjectProcurementPackage", formData);
    console.log("Creating new project procurement package");
    console.log(formData);
  }
  closeProjectProcurementPackageDialog();
};
const createProjectSubContractorProcurementPackage = (item, subId) => {
  console.log("Creating subContractor project procurement package");
  console.log(item);
  console.log(subId);
  const formData = {
    projectId: projectId,
    subContractorId: subId,
    projectProcurementPackageId: item.id,
  };
  store.dispatch("projects/createProjectSubContractorProcurementPackage", formData);
  console.log("Creating SubContractorProjectProcurementPackage");
  console.log(formData);
};

const closeProjectProcurementPackageDialog = () => {
  projectProcurementPackageDialog.value = false;
  setTimeout(() => {
    Object.assign(editedProjectProcurementPackage, defaultProjectProcurementPackage);
    editedProjectProcurementPackageIndex.value = -1;
  }, 300);
};

const deleteProjectProcurementPackage = (item) => {
  console.log("onDeleteDrawing Event Received..");
  console.log(item);
  // const index = projectProcurementPackages.indexOf(item)
  store.dispatch("projects/deleteProjectProcurementPackage", item);
  // confirm('Are you sure you want to delete drawing ' + $event.title + ' from the project register?') && drawings.splice(index, 1)
};
</script>
