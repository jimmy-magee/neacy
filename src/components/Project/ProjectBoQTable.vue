<template>
  <v-card>
    <v-card-title>
      Bill of Quantities
      <v-spacer></v-spacer>

      <v-btn icon color="blue" @click="reloadProjectBoQItems" class="float-right">
        <v-icon icon="mdi-cached"></v-icon>
      </v-btn>
      <v-spacer></v-spacer>

      <v-text-field
        v-model="searchProjectBoQ"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon color="green" @click="openNewBoQItemFormDialog()" class="float-right">
        <v-icon icon="mdi-plus"></v-icon>
        <v-dialog v-model="dialogBoQItem">
          <v-card class="overflow-y-auto" min-height="700" max-height="700">
            <v-tabs dark v-model="tabs">
              <v-tab value="Details">Details</v-tab>
              <v-tab value="Measure" v-if="editedBoQItem.id != null">Measure</v-tab>
              <v-tab value="Quotations" v-if="editedBoQItem.id != null">Quotations</v-tab>
              <v-tab value="Valuations" v-if="editedBoQItem.id != null">Valuations</v-tab>
            </v-tabs>

            <v-window v-model="tabs">
              <v-window-item value="Details">
                <v-card class="overflow-y-auto" max-height="650">
                  <v-card-title>
                    <span>BoQ Item</span>
                  </v-card-title>
                  <v-card-text>
                    <v-layout row>
                      <v-select
                        :items="boQItemCategories"
                        v-model="editedBoQItem.categoryId"
                        item-value="id"
                        item-title="name"
                        label="BoQ Item Category"
                        v-on:change="loadBoQItemsByCategory"
                      ></v-select>
                    </v-layout>

                    <v-layout row>
                      <v-select
                        :items="loadedCategoryBoQItems"
                        item-title="name"
                        return-object
                        label="BoQ Item"
                        v-on:change="onBoQCategoryChangeEvent"
                      ></v-select>
                      <v-text-field
                        name="ref"
                        label="Bill Reference"
                        id="ref"
                        v-model="editedBoQItem.ref"
                        required
                      ></v-text-field>
                    </v-layout>

                    <v-layout row>
                      <v-text-field
                        name="name"
                        label="Name"
                        id="name"
                        v-model="editedBoQItem.name"
                        required
                      ></v-text-field>
                    </v-layout>

                    <v-layout row>
                      <v-textarea
                        name="description"
                        label="Description"
                        id="description"
                        v-model="editedBoQItem.description"
                      ></v-textarea>
                    </v-layout>
                    <!--
                <v-layout row>
                  <v-text-field
                    name="productId"
                    label="Product"
                    id="productId"
                    v-model="editedBoQItem.productId"
                  ></v-text-field>
                </v-layout>

                <v-layout row>
                  <v-text-field
                    name="productName"
                    label="Product Name"
                    id="productName"
                    v-model="editedBoQItem.productName"
                  ></v-text-field>
                </v-layout>

                <v-layout row>
                  <v-text-field
                    name="supplierId"
                    label="Supplier"
                    id="supplier"
                    v-model="editedBoQItem.supplierName"
                  ></v-text-field>
                </v-layout>

                <v-layout row>
                  <v-text-field
                    name="productQuotationDate"
                    label="Quote Date"
                    id="productQuotationDate"
                    v-model="editedBoQItem.productQuotationDate"
                  ></v-text-field>
                </v-layout>

                <v-layout row>
                  <v-text-field
                    name="productQuotationCost"
                    label="Quote"
                    id="productQuotationCost"
                    v-model="editedBoQItem.supplierCost"
                  ></v-text-field>
                </v-layout>
-->
                    <v-layout row>
                      <v-text-field
                        name="materialCost"
                        label="Material Cost"
                        id="materialCost"
                        v-model="editedBoQItem.materialCost"
                        required
                      ></v-text-field>

                      <v-spacer></v-spacer>

                      <v-text-field
                        name="materialMargin"
                        label="Material Magin"
                        id="materialMargin"
                        v-model="editedBoQItem.materialMargin"
                        required
                      ></v-text-field>

                      <v-spacer></v-spacer>
                    </v-layout>

                    <v-layout row>
                      <v-text-field
                        name="labourCost"
                        label="Labour Cost"
                        id="labourCost"
                        v-model="editedBoQItem.labourCost"
                        required
                      ></v-text-field>

                      <v-spacer></v-spacer>

                      <v-text-field
                        name="labourMargin"
                        label="Labour Magin"
                        id="labourMargin"
                        v-model="editedBoQItem.labourMargin"
                        required
                      ></v-text-field>

                      <v-spacer></v-spacer>
                    </v-layout>

                    <v-layout row>
                      <v-text-field
                        name="quantity"
                        label="Contract Quantity"
                        id="quantity"
                        v-model="editedBoQItem.quantity"
                        required
                      ></v-text-field>

                      <v-spacer></v-spacer>

                      <v-text-field
                        name="unit"
                        label="Unit"
                        id="contract_units"
                        v-model="editedBoQItem.unit"
                        required
                      ></v-text-field>
                    </v-layout>

                    <v-layout row>
                      <v-text-field
                        name="measuredQuantity"
                        label="Measured Quantity"
                        id="measured_quantity"
                        v-model="editedBoQItem.measuredQuantity"
                        required
                      >
                      </v-text-field>

                      <v-spacer></v-spacer>

                      <v-text-field
                        name="unit"
                        label="unit"
                        id="measured_units"
                        v-model="editedBoQItem.unit"
                        required
                      ></v-text-field>
                    </v-layout>

                    <v-layout row>
                      <v-text-field
                        name="contractRate"
                        label="Contract Rate"
                        id="contractRate"
                        v-model="editedBoQItem.contractRate"
                      >
                      </v-text-field>

                      <v-spacer></v-spacer>

                      <v-text-field
                        name="subContractRate"
                        label="SubContract Rate"
                        id="subContractRate"
                        v-model="editedBoQItem.subContractRate"
                      >
                      </v-text-field>
                    </v-layout>

                 

    
                    <v-layout row>
                      <date-picker
                        label="Start Date"
                        v-model="date"
                        v-on:update:modelValue="save"
                        color="primary"
                      ></date-picker>
                    </v-layout>
                    <!--
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
                        @click="save(date)">OK</v-btn>
                    </v-date-picker>
                  </v-dialog>


                  <v-spacer></v-spacer>

                </v-layout>
              <v-layout row>
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
                        @click="save(date);boQItemAnticipatedCompletionDateModal = false">OK</v-btn>
                    </v-date-picker>
                  </v-dialog>

                </v-layout>
               
                <v-layout v-if="editedBoQItem.quotations">
                  <v-card>
                    <v-card-title> SubContractor Quotations </v-card-title>
                    <v-card-text>
                      <v-data-table
                        :headers="boqItemQuotationTableHeaders"
                        :items="editedBoQItem.subContractorQuotations"
                        :search="search"
                      >
                      </v-data-table>
                    </v-card-text>
                  </v-card>
                </v-layout>
                 -->
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" @click="closeBoQItemDialog()"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" @click="saveOrUpdateProjectBoQItem"
                      >Save</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-window-item>
              <v-window-item value="Measure">
                <v-card class="overflow-y-auto" max-height="650">
                  <v-card-title>Take Off</v-card-title>
                  <project-boq-takeoff-table
                    :projectId="projectId"
                    :boQItemId="editedBoQItem.id"
                    v-on:update:measuredQuantityTotal="onUpdateMeasuredQuantityEvent"
                  >
                  </project-boq-takeoff-table>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" @click="closeBoQItemDialog()"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" @click="saveOrUpdateProjectBoQItem"
                      >Save</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-window-item>

              <v-window-item value="Quotations">
                <v-card class="overflow-y-auto" max-height="650">
                  <v-card-title>Subcontractor Quotations</v-card-title>
                  <v-card-text>
                    <v-card flat>
                        <v-card-subtitle> SubContractor Quotations </v-card-subtitle>
                        <v-card-text>
                          <v-data-table
                            :headers="boqItemQuotationTableHeaders"
                            :items="editedBoQItem.subContractorQuotations"
                            :search="search"
                          >
                          </v-data-table>
                        </v-card-text>
                      </v-card>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" @click="closeBoQItemDialog()"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" @click="saveOrUpdateProjectBoQItem"
                      >Save</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-window-item>

              <v-window-item value="Valuations">
                <v-card class="overflow-y-auto" max-height="650">
                  <v-card-title>Valuation Details</v-card-title>
                  <v-card-text>
                    <v-layout row>
                      <v-text-field
                        name="quantityDeliveredToDate"
                        label="Qty Delivered To Date"
                        id="quantityDeliveredToDate"
                        v-model="editedBoQItem.quantityDeliveredToDate"
                      >
                      </v-text-field>

                      <v-spacer></v-spacer>

                      <v-text-field
                        name="quantityClaimedToDate"
                        label="quantityClaimedToDate"
                        id="quantityClaimedToDate"
                        v-model="editedBoQItem.quantityClaimedToDate"
                      >
                      </v-text-field>
                    </v-layout>

                    <v-layout row>
                      <v-text-field
                        name="quantityCertifiedToDate"
                        label="quantityCertifiedToDate"
                        id="quantityCertifiedToDate"
                        v-model="editedBoQItem.quantityCertifiedToDate"
                      >
                      </v-text-field>

                      <v-spacer></v-spacer>

                      <v-text-field
                        name="quantityPaidToDate"
                        label="quantityPaidToDate"
                        id="quantityPaidToDate"
                        v-model="editedBoQItem.quantityPaidToDate"
                      >
                      </v-text-field>
                    </v-layout>

                        
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" @click="closeBoQItemDialog()"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" @click="saveOrUpdateProjectBoQItem"
                      >Save</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-window-item>
            </v-window>
          </v-card>
        </v-dialog>
      </v-btn>
      <v-btn icon color="orange" @click="openUploadBoQCsvFileDialog()" class="float-right" >
        <v-icon icon="mdi-upload"></v-icon>
        <v-dialog v-model="uploadBoQCsvFileDialog" >
          <v-card>
            <v-card-title>
              <span class="headline">Upload Project BoQ Csv Files</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-layout row>
                  <v-file-input
                    ref="file"
                    filled
                    multiple
                    prepend-icon="mdi-camera"
                    label="Upload BoQ Csv Files"
                    v-on:change="handleFileUpload()"
                  ></v-file-input>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" @click="closeUploadBoQCsvFileDialog">Cancel</v-btn>
              <v-btn color="blue darken-1" @click="uploadProjectBoQItemCsvFile">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <project-boq-summary-panel :projectId="projectId"></project-boq-summary-panel>

      <v-data-table
        :headers="boqTableHeaders"
        :items="boq"
        :search="searchProjectBoQ"
        show-select
      >
        <template v-slot:item="{ item }">
          <tr>
            <td><v-checkbox></v-checkbox></td>
            <td>{{ item.ref }}</td>
            <td>{{ item.categoryName }}</td>
            <td>{{ item.name }}</td>
            <td>
              <v-btn variant="flat" border="0"
                >{{ item.quantity }}
                <v-menu
                  ref="menu"
                  activator="parent"
                  :close-on-click="false"
                  :close-on-content-click="false"
                >
                  <v-list>
                    <v-list-item>
                      <v-list-item-title>
                        {{ item.name }}
                      </v-list-item-title>
                      <v-card>
                        <v-card-text style="min-width: 400px; max-width: 400px">
                          <v-text-field
                            label="Quantity"
                            v-model="item.quantity"
                          ></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="grey darken-2" @click="cancel()" dark
                            >CANCEL</v-btn
                          >
                          <v-btn color="primary" @click="updateBoQItem(item)">OK</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-btn>
            </td>
            <td>{{ item.unit }}</td>
            <td>
              {{ item.materialCost }}
              <v-menu
                ref="menu"
                activator="parent"
                :close-on-click="false"
                :close-on-content-click="false"
              >
                <v-list>
                  <v-list-item>
                    <v-list-item-title>
                      {{ item.name }}
                    </v-list-item-title>
                    <v-card>
                      <v-card-text style="min-width: 400px; max-width: 400px">
                        <v-text-field
                          label="Material Cost"
                          v-model="item.materialCost"
                        ></v-text-field>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="grey darken-2" @click="cancel()" dark>CANCEL</v-btn>
                        <v-btn color="primary" @click="updateBoQItem(item)">OK</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-list-item>
                </v-list>
              </v-menu>
            </td>
            <td>
              <v-btn variant="flat" border="0"
                >{{ item.labourCost }}
                <v-menu
                  ref="menu"
                  activator="parent"
                  :close-on-click="false"
                  :close-on-content-click="false"
                >
                  <v-list>
                    <v-list-item>
                      <v-list-item-title>
                        {{ item.name }}
                      </v-list-item-title>
                      <v-card>
                        <v-card-text style="min-width: 400px; max-width: 400px">
                          <v-text-field
                            label="Labour Cost"
                            v-model="item.labourCost"
                          ></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="grey darken-2" @click="cancel()" dark
                            >CANCEL</v-btn
                          >
                          <v-btn color="primary" @click="updateBoQItem(item)">OK</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-btn>
            </td>
            <td>
              <v-btn variant="flat" border="0" ref="button"
                >{{ item.contractRate }}
                <v-menu
                  ref="menu"
                  activator="parent"
                  :close-on-click="false"
                  :close-on-content-click="false"
                >
                  <v-list>
                    <v-list-item>
                      <v-list-item-title>
                        {{ item.name }}
                      </v-list-item-title>
                      <v-card>
                        <v-card-text style="min-width: 400px; max-width: 400px">
                          <v-text-field
                            label="Contract Rate"
                            v-model="item.contractRate"
                          ></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="grey darken-2" @click="cancel()" dark
                            >CANCEL</v-btn
                          >
                          <v-btn color="primary" @click="updateBoQItem(item)">OK</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-btn>
            </td>
            <td>{{ calculateTotalCost(item.contractRate, item.quantity) }}</td>
            <td>
              <v-btn icon @click="editBoQItem(item)">
                <v-icon icon="mdi-file-edit-outline"></v-icon>
              </v-btn>
            </td>
            <td>
              <v-btn icon @click="deleteProjectBoQItem(item)">
                <v-icon icon="mdi-delete-alert"></v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>

      <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
        {{ snackText }}
        <v-btn text @click="snack = false" :color="snackColor" class="float-right"
          >Close</v-btn
        >
      </v-snackbar>
    </v-card-text>
  </v-card>
</template>
<script setup>
import { computed, ref, reactive, defineProps, onMounted } from "vue";
import { useStore } from "vuex";

// eslint-disable-next-line
/* eslint-disable */
const { projectId, title, color } = defineProps(["projectId", "title", "color"]);
const store = useStore();

const searchProjectBoQ = ref("");
const boqTableHeaders = [
  { title: "Ref", key: "ref" },
  {
    title: "Category",
    align: "left",
    sortable: true,
    key: "categoryName",
  },
  { title: "Name", key: "name" },
  { title: "Qty (Contract)", key: "quantity" },
  { title: "Unit", key: "unit" },
  { title: "Material", key: "materialCost" },
  { title: "Labour", key: "labourCost" },
  { title: "Rate", key: "contractRate" },
  { title: "Total Contracted", key: "total", sortable: true },
  { title: "Edit", align: "left", key: "actionEditBoQItem" },
  { title: "Delete", align: "left", key: "actionDeleteBoQItem" },
];
const boqItemQuotationTableHeaders = [
  { title: "Company", key: "subContractorName" },
  { title: "Quantity", key: "quantity" },
  { title: "Unit", key: "unit" },
  { title: "Rate", key: "rate" },
  { title: "Comments", key: "subContractorComments" },
];
const dialogBoQItem = ref(false);
const editedBoQItemIndex = ref(-1);
const editedBoQItem = reactive({
  id: "",
  projectId: "",
  projectProcurementPackageId: "",
  categoryId: "",
  categoryName: "",
  category: "",
  ref: "",
  name: "",
  description: "",
  quantity: 0.0,
  measuredQuantity: 0.0,
  unit: "",
  contractRate: 0.0,
  subContractRate: 0.0,
  productId: "",
  supplierId: "",
  productQuotationId: "",
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
  anticipatedStartDate: null,
  anticipatedCompletionDate: null,
  actualStartDate: null,
  actualCompletionDate: null,
  subContractorQuotations: [],
});
const defaultBoQItem = reactive({
  id: null,
  projectId: "",
  projectProcurementPackageId: "",
  category: "",
  name: "",
  ref: "",
  description: "",
  quantity: 0.0,
  measuredQuantity: 0.0,
  unit: "",
  productId: "",
  supplierId: "",
  productQuotationId: "",
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
var snack = ref(false);
var snackColor = ref("");
var snackText = ref("");
const search = ref("");
const date = new Date();
const tabs = ref(null);
const menu = ref(null);
const button = ref(null);

const cancel = () => {
  console.log('Fix me - cancel called!!Close menu')
  //button.$emit("click");
};

onMounted(() => {
  console.log("Loading boq data for project id " + projectId);
  store.dispatch("projects/loadBoQItemCategories");
  store.dispatch("projects/loadProjectBoQItems", projectId);
  store.dispatch("projects/loadProjectBoQSummary", projectId);
  store.dispatch("projects/loadProjectBoQCategoryCosts", projectId);
  store.dispatch("projects/loadProjectRoomScheduleBoQ", projectId);
  console.log("Button is");
  console.log(button);
});

const projectBoQSummary = computed(() => {
  return store.getters["projects/loadedProjectBoQSummary"];
});

const boq = computed(() => {
  return store.getters["projects/loadedProjectBoQ"];
});

const loadedCategoryBoQItems = computed(() => {
  return store.getters["projects/loadedCategoryBoQItems"];
});

const boQItemCategories = computed(() => {
  return store.getters["projects/loadedBoQItemCategories"];
});

const file = ref();
const handleFileUpload = async () => {
  console.log("selected file", file.value.files);
  //Upload to server
};
const uploadBoQCsvFileDialog = ref(false);

const uploadProjectBoQItemCsvFile = () => {
 
  const formData = {
    projectId: projectId,
    boQCsvFiles: file.value,
  };
  store.dispatch("projects/uploadProjectBoQCsvFile", formData);
  console.log("Uploading project boq csv file");
  console.log(formData);
  closeUploadBoQCsvFileDialog();

};

const openNewBoQItemFormDialog = () => {
  //editedBoQItem = defaultBoQItem;
  Object.assign(editedBoQItem, defaultBoQItem);
  editedBoQItem.categoryId = '';
  console.log("new BoQItem is ");
  console.log(editedBoQItem);
  
  editedBoQItemIndex.value = -1;
  dialogBoQItem.value = true;
};

const openUploadBoQCsvFileDialog = () => {
  uploadBoQCsvFileDialog.value = true;
}

const closeUploadBoQCsvFileDialog = () => {
  uploadBoQCsvFileDialog.value = false;
}

const closeBoQItemDialog = () => {
  dialogBoQItem.value = false;
  Object.assign(editedBoQItem, defaultBoQItem);
};

const reloadProjectBoQItems = () => {
  searchProjectBoQ.value = "";
  store.dispatch("projects/loadProjectBoQItems", projectId);
};

const loadBoQItemsByCategory = (categoryId) => {
  return store.dispatch("projects/loadBoQItemsByCategory", categoryId);
};

const onBoQCategoryChangeEvent = (categoryBoQItem) => {
  console.log("Category BoQ Item Selected ");
  console.log(categoryBoQItem);
  editedBoQItem.categoryId = categoryBoQItem.categoryId;
  editedBoQItem.name = categoryBoQItem.name;
  editedBoQItem.ref = categoryBoQItem.ref;
  editedBoQItem.description = categoryBoQItem.description;
  editedBoQItem.labourCost = categoryBoQItem.labourCost;
  editedBoQItem.materialCost = categoryBoQItem.materialCost;
  editedBoQItem.contractRate = categoryBoQItem.contractRate;
  editedBoQItem.unit = categoryBoQItem.unit;
};

const editBoQItem = (item) => {
  console.log("Selected BoQItem is ");
  console.log(item);
  store.dispatch("projects/setSelectedProjectBoQItem", item);
  editedBoQItemIndex.value = boq.value.findIndex((bi) => bi.id == item.id);
  const obj = boq.value.find((bi) => bi.id == item.id);
  Object.assign(editedBoQItem, obj);
  console.log("editedBoQItem is ");
  console.log(editedBoQItem);
  if (editedBoQItem.anticipatedStartDate) {
    var anticipatedStartDate = new Date(editedBoQItem.anticipatedStartDate);
    editedBoQItem.anticipatedStartDate = anticipatedStartDate;
  }
  if (editedBoQItem.anticipatedCompletionDate) {
    var anticipatedCompletionDate = new Date(editedBoQItem.anticipatedCompletionDate);
    editedBoQItem.anticipatedCompletionDate = anticipatedCompletionDate;
  }
  if (editedBoQItem.actualStartDate) {
    var actualStartDate = new Date(editedBoQItem.actualStartDate);
    editedBoQItem.actualStartDate = actualStartDate;
  }
  if (editedBoQItem.actualCompletionDate) {
    var actualCompletionDate = new Date(editedBoQItem.actualCompletionDate);
    editedBoQItem.actualCompletionDate = actualCompletionDate;
  }
  dialogBoQItem.value = true;
};

const saveOrUpdateProjectBoQItem = () => {
  //  const packageId = projectProcurementPackages.filter(x => x.name == editedBoQItem.procurementPackage).map(y => y.id)
  if (editedBoQItemIndex.value > -1) {
    const formData = {
      category: editedBoQItem.category,
      categoryId: editedBoQItem.categoryId,
      id: editedBoQItem.id,
      projectId: projectId,
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
      actualCompletionDate: editedBoQItem.actualCompletionDate,
    };
    //  console.log('Updated project boq item')
    //  console.log(formData)
    store
      .dispatch("projects/updateProjectBoQItem", formData)
      .then(store.dispatch("projects/loadProjectProcurementPackages", projectId))
      .then(
        store.dispatch("projects/loadProjectProcurementPackageSummary", projectId)
        //$store.dispatch('loadProjectBoQSummary', id)
      );
  } else {
    const formData = {
      projectId: projectId,
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
      actualCompletionDate: editedBoQItem.actualCompletionDate,
    };
    store
      .dispatch("projects/createProjectBoQItem", formData)
      .then(store.dispatch("projects/loadProjectProcurementPackages", projectId))
      .then(store.dispatch("projects/loadProjectBoQSummary", projectId));
  }
  closeBoQItemDialog();
};



const deleteProjectBoQItem = (item) => {
  console.log("onDelete BoQItem Event Received..");
  console.log(item.value);
  const formData = {
    projectId: projectId,
    id: item.id,
  };
  store.dispatch("projects/deleteProjectBoQItem", formData);
  // confirm('Are you sure you want to delete drawing ' + $event.title + ' from the project register?') && drawings.splice(index, 1)
};

const updateBoQItem = (item) => {
  store
    .dispatch("projects/updateProjectBoQItem", item)
    .then(
      console.log("Updated BoQItem Quantity successfully"),
      (snack.value = true),
      (snackColor.value = "success"),
      (snackText.value = "Project Bill Item updated successfully")
    );
};

const save = () => {
  console.log("save method called..");
};

const onUpdateMeasuredQuantityEvent = (qty) => {
  console.log("processing update boq item measured quantity event..");
  editedBoQItem.quantity = qty;
  editedBoQItem.measuredQuantity = qty;
};

const calculateTotalCost = (rate, qty) => {
  return (rate * qty).toFixed(2);
};
</script>
