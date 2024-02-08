<template>
<v-card>
                  <v-card-title>
                    Contact List
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
                              <v-text-field
                                v-model="editedProjectContact.companyId"
                                label="Company"
                              >
                              </v-text-field>
                            </v-layout>
                            <v-layout row>
                              <v-text-field
                                v-model="editedProjectContact.name"
                                label="Name"
                              ></v-text-field>
                            </v-layout>
                            <v-layout row>
                              <v-textarea
                                name="description"
                                label="Description"
                                id="description"
                                v-model="editedProjectContact.description"
                                required
                              >
                              </v-textarea>
                            </v-layout>
                            <v-layout row>
                              <v-text-field
                                v-model="editedProjectContact.mobileNumber"
                                label="Mobile"
                              >
                              </v-text-field>
                            </v-layout>
                            <v-layout row>
                              <v-text-field
                                v-model="editedProjectContact.emailAddress"
                                label="Email"
                              >
                              </v-text-field>
                            </v-layout>
                          </v-container>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" @click="closeProjectContactDialog"
                            >Cancel</v-btn
                          >
                          <v-btn color="blue darken-1" @click="saveProjectContact"
                            >Save</v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-card-title>
                  <v-data-table
                    :headers="projectContactHeaders"
                    :calculate-widths="true"
                    :items="projectContacts"
                    :search="search"
                  >
                    <template v-slot:[`item.actionEdit`]="{ item }">
                      <v-btn
                        icon="mdi-file-edit-outline"
                        @click="editProjectContact(item)"
                      >
                      </v-btn>
                    </template>

                    <template v-slot:[`item.actionDelete`]="{ item }">
                      <v-btn icon="mdi-delete-alert" @click="deleteProjectContact(item)">
                      </v-btn>
                    </template>
                  </v-data-table>
                </v-card>
</template>
<script setup>
import { computed, ref, reactive, onMounted } from "vue";
import { useStore } from "vuex";

//eslint-disable-next-line
const { projectId } = defineProps(["projectId"]);

const store = useStore();

onMounted(() => {
  console.log("Loading contacts for project id " + projectId);
  store.dispatch("projects/loadProjectContacts", projectId);
});

const projectContacts = computed(() => {
      return store.getters["projects/loadedProjectContacts"];
    });

    const projectContactHeaders = [
      { title: "Company", key: "companyId" },
      { title: "Name", key: "name" },
      { title: "Description", key: "description" },
      { title: "Email", key: "emailAddress" },
      { title: "Mobile", key: "mobileNumber", width: 150 },
      { title: "Edit", align: "left", key: "actionEdit" },
      { title: "Delete", align: "left", key: "actionDelete" },
    ];

    const search = ref('');
    const projectContactDialog = ref(false);
    const editedProjectContactIndex = ref(-1);
    const editedProjectContact = reactive({
      projectId: projectId,
      id: "",
      companyId: "",
      name: "",
      description: "",
      emailAddress: "",
      mobileNumber: "",
    });
    const defaultProjectContact = reactive({
      projectId: projectId,
      companyId: "",
      name: "",
      description: "",
      emailAddress: "",
      mobileNumber: "",
    });
    const saveProjectContact = () => {
      if (editedProjectContactIndex.value > -1) {
        const formData = {
          id: editedProjectContact.id,
          projectId: projectId,
          name: editedProjectContact.name,
          description: editedProjectContact.description,
          mobileNumber: editedProjectContact.mobileNumber,
          emailAddress: editedProjectContact.emailAddress,
          companyId: editedProjectContact.companyId,
        };
        store.dispatch("projects/updateProjectContact", formData);
        console.log("Updating project contact");
        console.log(formData);
      } else {
        const formData = {
          projectId: projectId,
          name: editedProjectContact.name,
          description: editedProjectContact.description,
          mobileNumber: editedProjectContact.mobileNumber,
          emailAddress: editedProjectContact.emailAddress,
          companyId: editedProjectContact.companyId,
        };
        store.dispatch("projects/createProjectContact", formData);
        console.log("Creating project contact");
        console.log(formData);
      }
      closeProjectContactDialog();
    };
    const editProjectContact = (item) => {
      editedProjectContactIndex.value = projectContacts.value.indexOf(item);
      Object.assign(editedProjectContact, item);
      console.log("Selected Project Contact  is ");
      console.log(editedProjectContact.name);
      projectContactDialog.value = true;
    };
    const deleteProjectContact = (item) => {
      const formData = {
        id: item.id,
      };
      console.log("deleting project contact..");
      console.log(formData);
      store.dispatch("projects/deleteProjectContact", formData);
    };
    const closeProjectContactDialog = () => {
      projectContactDialog.value = false;
      setTimeout(() => {
        Object.assign(editedProjectContact, defaultProjectContact);
        editedProjectContactIndex.value = -1;
      }, 300);
    };
</script>