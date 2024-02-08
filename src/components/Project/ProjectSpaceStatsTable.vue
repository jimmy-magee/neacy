<template>
  <v-card>
    <v-card-title>
      Room Schedule
      <v-spacer></v-spacer>
      <v-text-field
        v-model="searchProjectRooms"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
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
                  <v-text-field
                    v-model="editedProjectRoom.name"
                    label="Name"
                  ></v-text-field>
                </v-layout>

                <v-layout row>
                  <v-textarea v-model="editedProjectRoom.description" label="Description">
                  </v-textarea>
                </v-layout>

                <v-layout row>
                  <v-text-field
                    v-model="editedProjectRoom.level"
                    label="Level"
                  ></v-text-field>
                </v-layout>
                <v-layout row>
                  <v-textarea
                    v-model="editedProjectRoom.comments"
                    label="Comments"
                  ></v-textarea>
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

    <v-data-table
      :headers="projectRoomTableHeaders"
      :calculate-widths="true"
      :items="projectRoomsX"
      :search="searchProjectRooms"
    >
      <template v-slot:[`item.actionView`]="{ item }">
        <v-btn icon="mdi-file-edit-outline" @click="viewProjectRoom(item)"> </v-btn>
      </template>
      <template v-slot:[`item.actionEdit`]="{ item }">
        <v-btn icon="mdi-file-edit-outline" @click="openProjectRoomDialog(item)"> </v-btn>
      </template>
      <template v-slot:[`item.actionDelete`]="{ item }">
        <v-btn icon="mdi-delete-alert" @click="deleteProjectRoom(item)"> </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>
<script setup>
import { computed, ref, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

//eslint-disable-next-line
const { projectId } = defineProps(["projectId"]);

const store = useStore();

const router = useRouter();

onMounted(() => {
  console.log("Loading space stats for project id " + projectId);
  store.dispatch("projects/loadProjectRooms", projectId);
});

const searchProjectRooms = ref("");
const editedProjectRoomIndex = ref(-1);
const editedProjectRoom = reactive({
  id: "",
  projectId: projectId,
  name: "",
  description: "",
  level: "",
});
const defaultProjectRoom = reactive({
  projectId: projectId,
  name: "",
  description: "",
  level: "",
});
const projectRoomTableHeaders = [
  { title: "Id", key: "id" },
  { title: "Room Name", key: "name" },
  { title: "View", align: "left", key: "actionView" },
  { title: "Edit", align: "left", key: "actionEdit" },
  { title: "Delete", align: "left", key: "actionDelete" },
];

const projectRoomDialog = ref(false);
const projectRoomsX = computed(() => {
  return store.getters["projects/loadedProjectRooms"];
});

/*
const projectRooms = computed(() => {
  const projectRooms = store.getters.loadedProjectRooms;
  const roots = projectRooms.map((room) => makeProjectMeasure(room.name, 0));
  return roots;
});

const makeProjectMeasure = (name, qty) => {
  console.log("making room qty ");
  return { name: name, qty: qty };
};
*/
const saveOrUpdateProjectRoom = () => {
  editedProjectRoom.projectId = projectId;
  if (editedProjectRoomIndex.value == -1) {
    store.dispatch("projects/createProjectRoom", editedProjectRoom);
  } else {
    store.dispatch("projects/updateProjectRoom", editedProjectRoom);
  }
  closeProjectRoomDialog();
  console.log("Updating project room");
  console.log(editedProjectRoom);
};

const deleteProjectRoom = (item) => {
  store.dispatch("projects/deleteProjectRoom", item.value);
};

const viewProjectRoom = (item) => {
  // editedProjectRoomIndex.value = projectRoomsX.value.findIndex(r => r.id == item.value)
  const obj = projectRoomsX.value.find((r) => r.id == item.value);
  // Object.assign(editedProjectRoom, obj)
  console.log(item);

  console.log("edited Project Room = ");

  console.log(editedProjectRoom);
  router.push("/projects/" + projectId + "/space/" + obj.id);
};

const openProjectRoomDialog = (item) => {
  editedProjectRoomIndex.value = projectRoomsX.value.findIndex((r) => r.id == item.value);
  const obj = projectRoomsX.value.find((r) => r.id == item.value);
  Object.assign(editedProjectRoom, obj);
  console.log(item);

  console.log("edited Project Room = ");

  console.log(editedProjectRoom);
  projectRoomDialog.value = true;
};

const closeProjectRoomDialog = () => {
  projectRoomDialog.value = false;
  setTimeout(() => {
    Object.assign(editedProjectRoom, defaultProjectRoom);
    editedProjectRoomIndex.value = -1;
  }, 300);
};
</script>
