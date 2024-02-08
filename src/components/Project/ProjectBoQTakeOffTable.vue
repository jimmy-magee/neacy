<template>
  <v-card>
    <v-card-subtitle>
      <v-btn icon color="green" class="float-right">
        <v-icon icon="mdi-plus"></v-icon>
        <v-dialog v-model="projectBoQItemMeasureDialog" activator="parent">
          <v-card>
            <v-card-text>
              <v-container>
                <v-layout row>
                  <v-card>
                    <v-card-title>
                      <span class="Subtitle 2">Take-off Sheet</span>
                      
                      <v-spacer></v-spacer>
                      <v-text-field
                        v-model="searchProjectRoomMeasures"
                        label="Search"
                        prepend-inner-icon="mdi-magnify"
                        single-line
                        variant="outlined"
                        hide-details
                      ></v-text-field>

                      <v-spacer></v-spacer>
                    </v-card-title>
                    <v-card-text>
                      <v-data-table
                        :headers="projectRoomMeasureTableHeaders"
                        :calculate-widths="true"
                        :items="projectTakeOffQuantities"
                        :show-select="false"
                        :search="searchProjectRoomMeasures"
                      >
                        <template v-slot:[`item.qty`]="{ item }">
                          <v-btn variant="flat" border="0"
                            >{{ item.qty }}
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
                                        label="Quantity"
                                        v-model="item.qty"
                                      ></v-text-field>
                                    </v-card-text>
                                    <v-card-actions>
                                      <v-spacer></v-spacer>
                                      <v-btn color="grey darken-2" @click="cancel()" dark
                                        >CANCEL</v-btn
                                      >
                                      <v-btn
                                        color="primary"
                                        @click="saveOrUpdateProjectBoQItemMeasure(item)"
                                        >OK</v-btn
                                      >
                                    </v-card-actions>
                                  </v-card>
                                </v-list-item>
                              </v-list>
                            </v-menu>
                          </v-btn>
                        </template>
                      </v-data-table>
                    </v-card-text>
                  </v-card>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" @click="closeProjectBoQItemMeasureDialog"
                >Close</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-btn>
      <v-text-field
        v-model="searchBoQItemMeasures"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      >
      </v-text-field>
    </v-card-subtitle>
    <v-card-text>
      <v-data-table
        :headers="measureTableHeaders"
        :items="measures"
        :search="searchBoQItemMeasures"
        dense
      >
        <template v-slot:[`item.quantityMeasured`]="{ item }">
          <!-- <v-chip color="primary" dark>{{ item.quantityMeasured }}</v-chip>-->
          <v-text-field
            name="quantityMeasured"
            id="quantityMeasured"
            type="number"
            v-model="item.quantityMeasured"
          >
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
            <th class="subtitle">
              {{
                measures
                  .filter((m) => m.quantityMeasured != null)
                  .map((m) => parseInt(m.quantityMeasured))
                  .reduce((sum, val) => sum + val, 0)
                  .toFixed(2)
              }}
              {{ emitUpdateTotalMeasuredQuantityEvent() }}
            </th>
            <th class="title"></th>
            <th class="title"></th>
          </tr>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { computed, defineEmits, ref, reactive, onMounted } from "vue";
import { useStore } from "vuex";

//eslint-disable-next-line
const { projectId, boQItemId } = defineProps(["projectId", "boQItemId"]);

const store = useStore();

const emit = defineEmits(["update:measuredQuantityTotal"]);

onMounted(() => {
  console.log(
    "Loading boq take off for project id " + projectId + ", boqItemId :" + boQItemId
  );
  const payload = { projectId: projectId, boQItemId: boQItemId };
  store.dispatch("projects/loadProjectBoQItemMeasures", payload);
  store.dispatch("projects/loadProjectRooms", projectId);
});

const measures = computed(() => {
  return store.getters["projects/loadedProjectBoQItemMeasures"];
});

const projectTakeOffQuantities = computed(() =>
  projectRooms.value.map((r) => {
    console.log("Processing space " + r.name);
    var existing = false;
    var id = null;
    var qty = 0;
    // check for a previous measurement of the space
    measures.value.map((m) => {
      if (m.roomScheduleId == r.id) {
        console.log("Setting room measured qty to " + m.quantityMeasured);
        existing = true;
        id = m.id;
        qty = m.quantityMeasured;
      }
    });
    return makeRoomQuantity(existing, id, r.id, r.name, qty);
  })
);

const projectRooms = computed(() => {
  return store.getters["projects/loadedProjectRooms"];
});

// invoked from boq item measure table
const updateProjectBoQItemMeasure = (item) => {
  console.log("updat BoQItemMeasure Event Received..");
  console.log(item);
  store.dispatch("projects/updateProjectBoQItemMeasure", item);
  //emitUpdateTotalMeasuredQuantityEvent();
};

const saveOrUpdateProjectBoQItemMeasure = (item) => {
  console.log("onSave BoQItemMeasure Event Received..");
  console.log(item);
  editedBoQItemMeasure.roomScheduleId = item.roomScheduleId;
  editedBoQItemMeasure.quantityMeasured = item.qty;
  editedBoQItemMeasure.projectId = projectId;
  editedBoQItemMeasure.boQItemId = boQItemId;
  if (!item.existing) {
    store.dispatch("projects/createProjectBoQItemMeasure", editedBoQItemMeasure);
    //.then(emitUpdateTotalMeasuredQuantityEvent());
  } else {
    editedBoQItemMeasure.id = item.id;
    store.dispatch("projects/updateProjectBoQItemMeasure", editedBoQItemMeasure);
    //.then(emitUpdateTotalMeasuredQuantityEvent());
  }
};
const deleteProjectBoQItemMeasure = (item) => {
  console.log("onDelete BoQItemMeasure Event Received..");
  console.log(item);
  store.dispatch("projects/deleteProjectBoQItemMeasure", item).then(
    setTimeout(() => {
      emitUpdateTotalMeasuredQuantityEvent();
    }, 300)
  );
};

const emitUpdateTotalMeasuredQuantityEvent = () => {
  var qty = 0;
  qty = measures.value
    .filter((m) => m.quantityMeasured != null)
    .map((m) => parseInt(m.quantityMeasured))
    .reduce((sum, val) => sum + val, 0)
    .toFixed(2);
  emit("update:measuredQuantityTotal", qty);
  console.log("Emit update total measured qty now is " + qty);
};
const closeProjectBoQItemMeasureDialog = () => {
  projectBoQItemMeasureDialog.value = false;
  // var qty = measures.value.filter(m => m.quantityMeasured != null)
  //   .map(m => parseInt(m.quantityMeasured)).reduce((sum, val) => sum + val, 0).toFixed(2)

  // editedBoQItem.quantity = qty
  // editedBoQItem.measuredQuantity = qty
  //store.dispatch('projects/updateProjectBoQItem', editedBoQItem)
  console.log("XXXXX");
  //console.log(editedBoQItem.measuredQuantity);
  setTimeout(() => {
    Object.assign(editedBoQItemMeasure, defaultBoQItemMeasure);
    editedBoQItemMeasureIndex.value = -1;
  }, 300);
};
/*
const openMeasureDialog = (item) => {
  console.log("Opening measure dialog..");
  console.log(item);
  measureDialog.value = true;
  measureDialogTextFieldValue.value = item.qty;
};
const saveMeasureQuantity = (item) => {
  console.log("Save Measured Quantity called");
  console.log(item);

  var newMeasure = {
    clientId: item.clientId,
    projectId: item.projectId,
    roomScheduleId: item.id,
    drawingId: "",
    boQItemId: selectedProjectBoQItem.value, //?
    quantityMeasured: item.quantity,
  };
  console.log(newMeasure);

  store
    .dispatch("projects/createProjectBoQItemMeasure", newMeasure)
    .then(
      console.log("Updated BoQItem Quantity successfully"),
      (snack.value = true),
      (snackColor.value = "success"),
      (snackText.value = "Data saved")
    );
};*/
const menu = ref(null);
const editedBoQItemMeasureIndex = ref(-1);
const editedBoQItemMeasure = reactive({
  id: "",
  projectId: "",
  boQItemId: "",
  name: "",
  description: "",
  quantity: "",
  unit: "",
  roomScheduleId: "",
  drawings: [],
  comments: "",
});
const defaultBoQItemMeasure = reactive({
  projectId: "",
  boQItemId: "",
  name: "",
  description: "",
  quantity: "",
  unit: "",
  drawings: [],
  roomScheduleId: "",
  comments: "",
});
const projectRoomMeasureTableHeaders = [
  { title: "Id", key: "id", align: " d-none" },
  { title: "Room Schedule Id", key: "roomScheduleId", align: " d-none" },
  { title: "Existing", key: "existing", align: " d-none" },
  { title: "Space", key: "roomName" },
  { title: "Quantity", key: "qty", default: 0 },
];
const projectBoQItemMeasureDialog = ref(false);
const searchBoQItemMeasures = ref("");
const measureTableHeaders = [
  { title: "Ref", key: "roomName" },
  { title: "Measured", key: "quantityMeasured" },
  { title: "Delivered", key: "quantityDelivered" },
  { title: "Update", align: "left", key: "actionEdit" },
  { title: "Delete", align: "left", key: "actionDelete" },
];

const searchProjectRoomMeasures = ref("");
//const measureDialog = ref(false);
//const measureDialogTextFieldValue = ref(0);
//const snack = ref(false);
//const snackColor = ref("");
//const snackText = ref("");

function makeRoomQuantity(existing, id, roomScheduleId, roomName, qty) {
  console.log("making room qty " + roomName);
  return {
    id: id,
    roomScheduleId: roomScheduleId,
    existing: existing,
    roomName: roomName,
    qty: qty,
  };
}
</script>
