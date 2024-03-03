<template>
  <v-card>
    <v-card-title>
      Rates
      <v-spacer></v-spacer>

      <v-btn icon color="green" @click="openMasterBoQItemDialog``()" class="float-right">
        <v-icon icon="mdi-plus"></v-icon>
      </v-btn>
      <v-spacer></v-spacer>

      <v-text-field
        v-model="searchMasterBoQ"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="masterBoQTableHeaders"
        :items="masterBoQ"
        :search="searchMasterBoQ"
        item-key="id"
        return-object
        show-select
        v-model="selectedBoQItems"
        select-strategy="all"
      >
        <template v-slot:[`item.contractRate`]="{ item }">
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
                    <v-card-text style="min-width: 400px; max-width: 400px">
                      <v-text-field
                        label="Contract Rate"
                        v-model="item.contractRate"
                      ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="grey darken-2" @click="cancel()" dark>CANCEL</v-btn>
                      <v-btn color="primary" @click="saveOrUpdateMasterBoQItem(item)"
                        >OK</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-btn>
        </template>
        <template v-slot:[`item.actionEdit`]="{ item }">
          <v-btn
            icon="mdi-file-edit-outline"
            @click="editMasterBoQItemDialog(item)"
          ></v-btn>
        </template>
        <template v-slot:[`item.actionDelete`]="{ item }">
          <v-btn icon="mdi-delete-alert" @click="deleteMasterBoQItem(item)"></v-btn>
        </template>
      </v-data-table>

      <v-btn
        class="float-right"
        color="green"
        :disabled="selectedBoQItems.length == 0"
        @click="addSelectedMasterBoQItemsToProject()"
        >Add To Project</v-btn
      >
      <v-dialog v-model="masterBoQItemDialog">
        <v-card>
          <v-tabs dark v-model="tabs">
            <v-tab value="Details">Details</v-tab>
            <v-tab value="Documentation">Documentation</v-tab>
            <v-tab value="Materials" v-if="editedBoQItem.id != null">Materials</v-tab>
            <v-tab value="Labour" v-if="editedBoQItem.id != null">Labour</v-tab>
            <v-tab value="Plant" v-if="editedBoQItem.id != null">Plant</v-tab>
          </v-tabs>
          <v-window v-model="tabs">
            <v-window-item value="Details">
              <v-card class="overflow-y-auto" max-height="650">
                <v-card-title>
                  <span>Master BoQ Item</span>
                </v-card-title>
                <v-card-text>

                  <v-layout row>
                    <v-select
                      :items="boQItemCategories"
                      v-model="editedBoQItem.categoryId"
                      item-value="id"
                      item-title="name"
                      label="BoQ Item Category"
                     ></v-select>
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
                      name="unit"
                      label="Unit"
                      id="contract_units"
                      v-model="editedBoQItem.unit"
                      required
                    ></v-text-field>
                  </v-layout>

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
                      name="labourCost"
                      label="Labour Cost"
                      id="labourCost"
                      v-model="editedBoQItem.labourCost"
                      required
                    ></v-text-field>
                  </v-layout>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" @click="closeMasterBoQItemDialog()"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" @click="saveOrUpdateMasterBoQItem"
                    >Save</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-window-item>
            <v-window-item value="Documentation">
              <v-card class="overflow-y-auto" height="650">
                <v-card-title>
                  <span>Documentation</span>
                </v-card-title>
                <v-card-text> </v-card-text>
              </v-card>
            </v-window-item>
            <v-window-item value="Materials">
              <v-card class="overflow-y-auto" height="650">
                <v-card-title>
                  <span>Materials</span>
                </v-card-title>
                <v-card-text> </v-card-text>
              </v-card>
            </v-window-item>
            <v-window-item value="Labour">
              <v-card class="overflow-y-auto" height="650">
                <v-card-title>
                  <span>Labour</span>
                </v-card-title>
                <v-card-text> </v-card-text>
              </v-card>
            </v-window-item>
            <v-window-item value="Plant">
              <v-card class="overflow-y-auto" height="650">
                <v-card-title>
                  <span>Plant</span>
                </v-card-title>
                <v-card-text> </v-card-text>
              </v-card>
            </v-window-item>
          </v-window>
        </v-card>
      </v-dialog>
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
import { computed, defineEmits, ref, reactive, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

//eslint-disable-next-line
const { projectId } = defineProps(["projectId"]);

const emit = defineEmits(["update:modelValue"]);

const searchMasterBoQ = ref("");
const tabs = ref(null);
const masterBoQTableHeaders = [
  { title: "Id", key: "id", align: " d-none" },
  { title: "Ref", key: "ref" },
  {
    title: "Category",
    align: "left",
    sortable: true,
    key: "categoryId",
  },
  { title: "Name", key: "name" },
  { title: "Unit", key: "unit" },
  { title: "Material", key: "materialCost" },
  { title: "Labour", key: "labourCost" },
  { title: "Rate", key: "contractRate" },
  { title: "Update", align: "left", key: "actionEdit" },
  { title: "Delete", align: "left", key: "actionDelete" },
];

const editedBoQItemIndex = ref(-1);
const defaultBoQItem = reactive({
  id: "",
  procurementPackageId: "",
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
  subContractorQuotations: [],
});
const editedBoQItem = reactive({
  id: "",
  procurementPackageId: "",
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
  subContractorQuotations: [],
});
const selectedBoQItems = ref([]);

var snack = ref(false);
var snackColor = ref("");
var snackText = ref("");
//const menu = ref(null);
//const button = ref(null);
/*
const cancel = () => {
  console.log("Fix me - cancel called!!Close menu");
  //button.$emit("click");
};*/

onMounted(() => {
  console.log("Loading master masterBoQ data");
  store.dispatch("projects/loadBoQItemCategories");
  store.dispatch("masterboq/loadMasterBoQItems");
});

const masterBoQ = computed(() => {
  return store.getters["masterboq/loadedMasterBoQItems"];
});

const boQItemCategories = computed(() => {
  return store.getters["projects/loadedBoQItemCategories"];
});

const masterBoQItemDialog = ref(false);

const openMasterBoQItemDialog = () => {
  masterBoQItemDialog.value = true;
};

const editMasterBoQItemDialog = (item) => {
  editedBoQItemIndex.value = masterBoQ.value.findIndex((bi) => bi.id == item.id);
  Object.assign(editedBoQItem, item);
  console.log(editedBoQItem);
  masterBoQItemDialog.value = true;
};

const closeMasterBoQItemDialog = () => {
  Object.assign(editedBoQItem, defaultBoQItem);
  masterBoQItemDialog.value = false;
};

const addSelectedMasterBoQItemsToProject = () => {
  selectedBoQItems.value.map((item) => {
    Object.assign(editedBoQItem, item);
    editedBoQItem.projectId = projectId;
    editedBoQItem.quantity = 0.0;
    store.dispatch("projects/createProjectBoQItem", editedBoQItem);

    console.log(editedBoQItem);
  });
  emit("update:modelValue");
};

const saveOrUpdateMasterBoQItem = () => {
  //  const packageId = projectProcurementPackages.filter(x => x.name == editedBoQItem.procurementPackage).map(y => y.id)
  if (editedBoQItemIndex.value > -1) {
    const formData = {
      category: editedBoQItem.category,
      categoryId: editedBoQItem.categoryId,
      id: editedBoQItem.id,
      ref: editedBoQItem.ref,
      projectProcurementPackageId: editedBoQItem.projectProcurementPackageId,
      name: editedBoQItem.name,
      description: editedBoQItem.description,
      unit: editedBoQItem.unit,
      contractRate: editedBoQItem.contractRate,
      subContractRate: editedBoQItem.subContractRate,
      materialCost: editedBoQItem.materialCost,
      materialMargin: editedBoQItem.materialMargin,
      labourCost: editedBoQItem.labourCost,
      labourMargin: editedBoQItem.labourMargin,
      plantCost: editedBoQItem.plantCost,
      plantMargin: editedBoQItem.plantMargin,
    };
    //  console.log('Updated project boq item')
    //  console.log(formData)
    store.dispatch("masterboq/updateMasterBoQItem", formData);
  } else {
    const formData = {
      category: editedBoQItem.category,
      categoryId: editedBoQItem.categoryId,
      ref: editedBoQItem.ref,
      name: editedBoQItem.name,
      description: editedBoQItem.description,
      unit: editedBoQItem.unit,
      contractRate: editedBoQItem.contractRate,
      subContractRate: editedBoQItem.subContractRate,
    };
    store.dispatch("masterboq/createMasterBoQItem", formData);
  }
  closeMasterBoQItemDialog();
};

const deleteMasterBoQItem = (item) => {
  console.log("onDelete BoQItem Event Received..");
  console.log(item);
  store.dispatch("masterboq/deleteMasterBoQItem", item.id);
  // confirm('Are you sure you want to delete drawing ' + $event.title + ' from the project register?') && drawings.splice(index, 1)
};
</script>
