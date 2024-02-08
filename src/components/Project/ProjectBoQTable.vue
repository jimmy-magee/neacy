<template>
  <v-card>
    <v-card-title>
      Bill of Quantities
      <v-spacer></v-spacer>

      <v-btn icon color="blue" @click="reloadBoQItems" class="float-right">
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
      <v-btn icon color="green" @click="openBoQItemDialog()" class="float-right">
        <v-icon icon="mdi-plus"></v-icon>
        <v-dialog v-model="dialogBoQItem" >
          <v-card class="overflow-y-auto"
            min-height="700"
            max-height="700"
          >
            <v-tabs dark v-model="tabs">
              <v-tab value="Details">Details</v-tab>
              <v-tab value="Measure">Measure</v-tab>
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
                        v-on:change="updateNewBoQItem"
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

                    <!--BoQ Item SubContractor Quotations -->

                    <v-layout row>
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
                    </v-layout>

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
                    <v-btn color="blue darken-1" @click="closeBoQItemDialog()">Cancel</v-btn>
                    <v-btn color="blue darken-1" @click="saveOrUpdateProjectBoQItem">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-window-item>
              <v-window-item value="Measure">
                <v-card class="overflow-y-auto" max-height="650">
                <v-card-title>Take Off</v-card-title>
                  <project-boq-takeoff-table
                    :projectId="projectId"
                    :boQItemId="editedBoQItem.id"
                    v-on:update:measuredQuantityTotal="updateMeasuredQuantity"
                  >
                  </project-boq-takeoff-table>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" @click="closeBoQItemDialog()">Cancel</v-btn>
                    <v-btn color="blue darken-1" @click="saveOrUpdateProjectBoQItem">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-window-item>
            </v-window>
          </v-card>
        </v-dialog>
      </v-btn>
    </v-card-title>
    <v-card-text>
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

      <v-data-table
        :headers="boqTableHeaders"
        :items="boq"
        :search="searchProjectBoQ"
        show-select
      >
        <!--
      <template v-slot:[`item.${quantity}`]="{ item }">
        {{ item }}
        {{ (item.props.title.quantity * item.contractRate).toFixed(2) }}
      </template>
      <template v-slot:[`item.totalDelivered`]="{ item }">
        {{ (item.quantityDeliveredToDate * item.contractRate).toFixed(2) }}
      </template> -->

        <template v-slot:item="{ item }">
          <tr>
            <td><v-checkbox></v-checkbox></td>
            <td>{{ item.ref }}</td>
            <td>{{ item.categoryName }}</td>
            <td>{{ item.name }}</td>
            <td>
              {{ item.quantity }}
            </td>
            <td>{{ item.unit }}</td>

            <!--
          <td><v-btn class="text-none text-subtitle-1" variant="flat" @click="editBoQItemUnits(item)">{{
            item.columns.unit }}



              <v-dialog v-model="boqItemUnitsDialog" v-overlay="false" width="250" origin="overlap">
                <v-card>
                  <v-card-text>
                    {{ item.columns.quantity }}
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="primary" block @click="boqItemUnitsDialog = false">Close Dialog</v-btn>
                    <v-btn color="primary" block @click="boqItemUnitsDialog = false">{{ item.unit }}</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-dialog v-model="dialog" persistent width="1024">
                <template v-slot:activator="{ props }">
                  <v-btn color="primary" v-bind="props">
                    Open Dialog
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">User Profile</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field label="Legal first name*" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field label="Legal middle name"
                            hint="example of helper text only on focus"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field label="Legal last name*" hint="example of persistent helper text"
                            persistent-hint required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field label="Email*" required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field label="Password*" type="password" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-select :items="['0-17', '18-29', '30-54', '54+']" label="Age*"
                            required></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-autocomplete
                            :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                            label="Interests" multiple></v-autocomplete>
                        </v-col>
                      </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                      Close
                    </v-btn>
                    <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-btn></td>-->
            <td>{{ item.materialCost }}</td>
            <td>{{ item.labourCost }}</td>

            <td>
              <v-btn variant="flat" border="0"
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
                                    <v-card-text
                                      style="min-width: 400px; max-width: 400px"
                                    >
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
                                      <v-btn
                                        color="primary"
                                        @click="saveOrUpdateProjectBoQItem(item)"
                                        >OK</v-btn
                                      >
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
              <v-btn icon @click="deleteBoQItem(item)">
                <v-icon icon="mdi-delete-alert"></v-icon>
              </v-btn>
            </td>
          </tr>
        </template>

        <!--  
      <template v-slot:[`item.${contractRate}`]="props">

        <v-btn @click="contractDialog = true">{{ props.item.props.title.contractRate }}
          <v-dialog v-model="contractDialog" snall persistent activator="parent"
            @save="saveContractRate(props.item.props.title.contractRate)" @cancel="cancel">
            <div>{{ props.item.props.title.contractRate }}</div>
            <v-text-field v-model="props.item.props.title.contractRate" :rules="[max25chars]" label="Edit"
              single-line counter autofocus></v-text-field>
            <template v-slot:[`input`]>
              <div class="mt-4 title">Update Contract Rate</div>

              <v-text-field v-model="props.item.props.title.contractRate" :rules="[max25chars]" label="Edit"
                single-line counter autofocus></v-text-field>
            </template>
          </v-dialog>
        </v-btn>
      </template>

      <template v-slot:[`item.materialCost`]="props">
        <v-btn flat @click="materialCostDialog = true">
          {{ props.value }}
          <v-edit-dialog v-model="materialCostDialog" large persistent @save="saveMaterialCost(props.item)"
            @cancel="cancel">
            <div>{{ props.raw }}</div>
            <template v-slot:[`input`]>
              <div class="mt-4 title">Update Material Cost</div>

              <v-text-field v-model="props.raw" :rules="[max25chars]" label="Edit" single-line counter
                autofocus></v-text-field>
            </template>
          </v-edit-dialog>
        </v-btn>
      </template>
    <template v-slot:[`item.materialCost`]="props">
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
        <!--
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
      </template>   -->
      </v-data-table>
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

onMounted(() => {
  console.log("Loading boq data for project id " + projectId);
  store.dispatch("projects/loadBoQItemCategories");
  store.dispatch("projects/loadProjectBoQItems", projectId);
  store.dispatch("projects/loadProjectBoQSummary", projectId);
  store.dispatch("projects/loadProjectBoQCategoryCosts", projectId);
  store.dispatch("projects/loadProjectRoomScheduleBoQ", projectId);
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

const openBoQItemDialog = () => {
  dialogBoQItem.value = true;
};

const reloadBoQItems = () => {
  searchProjectBoQ.value = "";
  store.dispatch("projects/loadProjectBoQItems", projectId);
};

const loadBoQItemsByCategory = (categoryId) => {
  return store.dispatch("projects/loadBoQItemsByCategory", categoryId);
};
const updateNewBoQItem = (categoryBoQItem) => {
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
const editBoQItemUnits = (item) => {
  console.log("item is ");
  console.log(item);
  // store.dispatch('projects/setSelectedProjectBoQItem', item)
  //editedBoQItemIndex.value = boq.value.findIndex(boq => boq.id == item.value)
  //const obj = boq.value.find(boq => boq.id == item.value)
  //Object.assign(editedBoQItem, obj)
  boqItemUnitsDialog.value = true;
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
const closeBoQItemDialog = () => {
  dialogBoQItem.value = false;
};
const deleteProjectBoQItem = (item) => {
  console.log("onDelete BoQItem Event Received..");
  console.log(item.value);
  const formData = {
    projectId: projectId,
    id: item.value,
  };
  store.dispatch("projects/deleteProjectBoQItem", formData);
  // confirm('Are you sure you want to delete drawing ' + $event.title + ' from the project register?') && drawings.splice(index, 1)
};
// https://stackoverflow.com/questions/43002417/arrays-javascript-filter-array-of-objects-using-input-search
const filterList = (val) => {
  let dwgs = drawings;
  let dwgList = dwgs.filter(function (drawing) {
    return drawing.title.toLowerCase().indexOf(val) !== -1; // returns true or false
  });
  console.log("Filtered drawings = ");
  console.log(dwgList);
  Object.assign(filteredDrawings, dwgList);
};
const filterBoQItemList = (val) => {
  let items = boq;
  items = items.filter(function (item) {
    return item.name.toLowerCase().indexOf(val) !== -1; // returns true or false
  });
  console.log("Filtered boq = ");
  console.log(items);
  filteredBoQ.value = items;
};
const close = () => {
  console.log("close bulk upload dialog...");
  dialog.value = false;
  setTimeout(() => {
    Object.assign(editedItem, defaultItem);
    editedIndex.value = -1;
  }, 300);
};

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

const fav = ref(true);
const dialogx = ref(false);
const dialog2x = ref(false);
const dialog3x = ref(false);
const menu = ref(false);
const menu1 = ref(null);
const message = ref(false);
const hints = ref(true);

const materialCostDialog = ref(false);

const saveContractRate = (item) => {
  //console.log('update BoQItem ContractRate ')
  //console.log(item)
  store.dispatch("projects/updateProjectBoQItem", item);
  //console.log('Updated BoQItem Quantity successfully')
};
const saveMaterialCost = (item) => {
  store.dispatch("projects/updateProjectBoQItem", item);
  //console.log('Updated BoQItem Quantity successfully')
};
const saveLabourCost = (item) => {
  store.dispatch("projects/updateProjectBoQItem", item);
  //console.log('Updated BoQItem Quantity successfully')
};

const saveQuantity = (item) => {
  console.log("Save Quantity called");
  console.log(item);
  store
    .dispatch("projects/updateProjectBoQItem", item)
    .then(
      console.log("Updated BoQItem Quantity successfully"),
      (snack.value = true),
      (snackColor.value = "success"),
      (snackText.value = "Data saved")
    );
};
const saveQuantityDeliveredToDate = (item) => {
  console.log("Save Quantity Delivered called");
  console.log(item);
  store
    .dispatch("projects/updateProjectBoQItem", item)
    .then(
      console.log("Updated BoQItem Quantity successfully"),
      (snack.value = true),
      (snackColor.value = "success"),
      (snackText.value = "Data saved")
    );
};

const projectBoQItemDialog = ref(false);

const selectedBoQItems = ref([]);
const boqItemUnitsDialog = ref(false);
const search = ref("");
const date = new Date();
const tabs = ref(null);
const save = () => {
  console.log("save method called..");
};

const updateMeasuredQuantity = (qty) => {
  console.log("update boq item measured quantity event..");
  editedBoQItem.quantity = qty;
  editedBoQItem.measuredQuantity = qty;
};

const calculateTotalCost = (rate, qty) => {
      return (rate*qty).toFixed(2);
}

const boQItemAnticipatedStartDateModal = ref(false);
const boQItemAnticipatedStartDateDialog = ref(false);
const boQItemAnticipatedCompletionDateModal = ref(false);
const boQItemAnticipatedCompletionDateDialog = ref(false);
</script>
