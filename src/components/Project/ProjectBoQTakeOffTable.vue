<template>
  <v-card>
    <v-card-subtitle>
      <v-btn icon color="green" class="float-right">
        <v-icon icon="mdi-plus"></v-icon>
        <v-dialog v-model="projectBoQItemMeasureDialog" activator="parent">
          <v-card max-width="50%">
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
                      <div>
                        <v-text-field
                        v-model="measuredQuantity"
                        label="Measured Quantity"
                        prepend-inner-icon="mdi-camera"
                        variant="outlined"
                        single-line
                        hide-details
                      ></v-text-field>
                      <v-btn @click="bulkUpdateProjectBoQItemMeasures">Apply</v-btn>
                    </div>
                    </v-card-title>
                    <v-card-text>
                      <v-data-table
                        :headers="projectRoomMeasureTableHeaders"
                        :calculate-widths="true"
                        :items="projectTakeOffQuantities"
                        show-select
                        v-model="selected"
                        return-object
                        :search="searchProjectRoomMeasures"
                      >
                    
                      <template v-slot:[`item.quantityMeasured`]="{ item }">
                     
                          <v-btn variant="flat" border="0"
                            >{{ item.quantityMeasured }}
                             
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
                                        label="Quantity Measured"
                                        v-model="item.quantityMeasured"
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
                      selected: {{ selected }}
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
              {{ emitTotalMeasuredQuantityUpdateEvent() }}
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
import { computed, ref, defineEmits, reactive, onMounted } from "vue";
import { useStore } from "vuex";

//eslint-disable-next-line
const { projectId, boQItemId } = defineProps(["projectId", "boQItemId"]);

const store = useStore();

const emit = defineEmits(["update:measuredQuantityTotal"]);
const selected = ref([]);
const measuredQuantity = ref(0);
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
    var measuredQuantity = 0;
    // check for a previous measurement of the space
    measures.value.map((m) => {
      if (m.roomScheduleId == r.id) {
        console.log("Setting room measured qty to " + m.quantityMeasured);
        existing = true;
        id = m.id;
        measuredQuantity = m.quantityMeasured;
      }
    });
    return makeRoomQuantity(existing, id, r.id, r.name, measuredQuantity);
  })
);

const projectRooms = computed(() => {
  return store.getters["projects/loadedProjectRooms"];
});

// invoked from boq item measure table
const updateProjectBoQItemMeasure = (item) => {
  console.log("update BoQItemMeasure Event Received..");
  console.log(item);
  store.dispatch("projects/updateProjectBoQItemMeasure", item);
};

const bulkUpdateProjectBoQItemMeasures = () => {
  console.log("update BoQItemMeasure Event Received..");
  let uqrm = selected.value.map(rm => {
    console.log("Updated rm "+ rm.roomName + "with quantity measured "+ measuredQuantity.value)
      rm.quantityMeasured = measuredQuantity.value;
      return rm;
   })
   console.log(uqrm);
  console.log(selected);
  let payload = {
    projectId: projectId,
    boQItemId: boQItemId,
    measures: selected.value,
  }
  store.dispatch("projects/bulkUpdateProjectBoQItemMeasures", payload);
};

const emitTotalMeasuredQuantityUpdateEvent = () => {
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
  setTimeout(() => {
    selected.value = [];
    //Object.assign(editedBoQItemMeasure, defaultBoQItemMeasure);
    //editedBoQItemMeasureIndex.value = -1;
  }, 300);
};

const saveOrUpdateProjectBoQItemMeasure = (item) => {
  console.log("onSave BoQItemMeasure Event Received..");
  console.log(item);
  editedBoQItemMeasure.roomScheduleId = item.roomScheduleId;
  editedBoQItemMeasure.quantityMeasured = item.quantityMeasured;
  editedBoQItemMeasure.projectId = projectId;
  editedBoQItemMeasure.boQItemId = boQItemId;
  if (!item.existing) {
    store.dispatch("projects/createProjectBoQItemMeasure", editedBoQItemMeasure);
    //.then(emitTotalMeasuredQuantityUpdateEvent());
  } else {
    editedBoQItemMeasure.id = item.id;
    store.dispatch("projects/updateProjectBoQItemMeasure", editedBoQItemMeasure);
    //.then(emitTotalMeasuredQuantityUpdateEvent());
  }
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


const deleteProjectBoQItemMeasure = (item) => {
  console.log("onDelete BoQItemMeasure Event Received..");
  console.log(item);
  store.dispatch("projects/deleteProjectBoQItemMeasure", item).then(
    setTimeout(() => {
      emitTotalMeasuredQuantityUpdateEvent();
    }, 300)
  );
};
const projectRoomMeasureTableHeaders = [
  { title: "Id", key: "id", align: " d-none" },
  { title: "Room Schedule Id", key: "roomScheduleId", align: " d-none" },
  { title: "Existing", key: "existing", align: " d-none" },
  { title: "Space", key: "roomName" },
  { title: "Quantity", key: "quantityMeasured", default: 0 },
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
    quantityMeasured: qty,
  };
}
</script>
