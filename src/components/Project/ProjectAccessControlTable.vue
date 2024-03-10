<template>
  <v-card>
    <v-card-title>
      Access Control
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
      <v-btn
        class="float-right"
        fab
        dark
        color="indigo"
        @click="openProjectAccessControlListDialog"
      >
        Update
        <v-dialog v-model="aclDialog">
          <v-card>
            <v-card-title>
              <span class="headline">Update Project AccessControlList</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-data-table
                  :headers="accessControlListHeaders"
                  :calculate-widths="true"
                  :items="users"
                  :search="search"
                  return-object
                  show-select
                  v-model="selectedProjectUsers"
                >
                </v-data-table>
              </v-container> </v-card-text
            >
            
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" @click="closeProjectAccessControlListDialog"
                >Cancel
              </v-btn>
              <v-btn color="blue darken-1" @click="updateProjectAccessControlList"
                >Save</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="accessControlListHeaders"
        :calculate-widths="true"
        :items="accessControlList"
        :search="search"
      >
      </v-data-table>
    </v-card-text>
  </v-card>
</template>
<script setup>
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";

//eslint-disable-next-line
const { projectId } = defineProps(["projectId"]);

const store = useStore();

onMounted(() => {
  console.log("Loading acl for project id " + projectId);
  store.dispatch("users/loadUsers");
});

const users = computed(() => {
  return store.getters["users/loadedUsers"];
});

const project = computed(() => {
  return store.getters["projects/loadedProject"];
});

const accessControlList = computed(() => {
  return project.value.projectAccessControlList;
});

const accessControlListHeaders = [
  {
    title: "Username",
    align: "left",
    sortable: false,
    key: "username",
  },
  {
    title: "Role",
    align: "left",
    sortable: false,
    key: "roles",
  },
];

const selectedProjectUsers = ref([]);
const aclDialog = ref(false);
const search = ref("");

const openProjectAccessControlListDialog = () => {
  var filteredUsernames = users.value
    .map((u) => u.username)
    .filter((value) => accessControlList.value.map((x) => x.username).includes(value));

  selectedProjectUsers.value = users.value.filter(u => u.username != null)
  .map((u) => {
    if (filteredUsernames.includes(u.username)) {
      return u;
    }
  });
  console.log("Selected users");
  console.log(selectedProjectUsers.value);
  aclDialog.value = true;
  //Object.assign(selectedProjectUsers.value, accessControlList.value);
};
const updateProjectAccessControlList = () => {
  const formData = {
    projectId: projectId,
    usernames: selectedProjectUsers.value.filter(u => u != null),
  };
  console.log(selectedProjectUsers.value);
  console.log(formData);
  store.dispatch("projects/updateProjectAccessControlList", formData);
  // console.log('Updating project control list')
  // console.log(formData)
  closeProjectAccessControlListDialog();
};

const closeProjectAccessControlListDialog = () => {
  aclDialog.value = false;
  setTimeout(() => {
    selectedProjectUsers.value = [];
  }, 300);
};
</script>
