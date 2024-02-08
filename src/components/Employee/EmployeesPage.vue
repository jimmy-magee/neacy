<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        Employee Details
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn icon color="green">
          <v-icon icon="mdi-plus"></v-icon>
          <v-dialog v-model="employeeDialog" activator="parent">
            <v-card>
              <v-card-title>
                <span>Employee Details</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  {{ editedEmployee.id }}

                  <v-layout row>
                    <v-text-field
                      name="employeeCategory"
                      label="Category"
                      id="employeeCategory"
                      v-model="editedEmployee.category"
                    >
                    </v-text-field>
                  </v-layout>
                  <v-layout row>
                    <v-text-field
                      name="employeeName"
                      label="Employee Name"
                      id="employeeName"
                      v-model="editedEmployee.name"
                      required
                    ></v-text-field>
                  </v-layout>
                  <v-layout row>
                    <v-text-field
                      name="employeeDescription"
                      label="Employee Description"
                      id="employeeDescription"
                      v-model="editedEmployee.description"
                      required
                    ></v-text-field>
                  </v-layout>
                  <v-layout row>
                    <v-text-field
                      name="employeeAddress"
                      label="Employee Address"
                      id="employeeAddress"
                      v-model="editedEmployee.address"
                      required
                    ></v-text-field>
                  </v-layout>
                  <v-layout row>
                    <v-text-field
                      name="employeeContactName"
                      label="Employee Contact Name"
                      id="employeeContactName"
                      v-model="editedEmployee.contactName"
                      required
                    ></v-text-field>
                  </v-layout>
                  <v-layout row>
                    <v-text-field
                      name="employeeContactNumber"
                      label="Employee Contact Number"
                      id="employeeContactNumber"
                      v-model="editedEmployee.contactNumber"
                      required
                    ></v-text-field>
                  </v-layout>
                  <v-layout row>
                    <v-text-field
                      name="employeeWebsite"
                      label="Employee Website"
                      id="employeeWebsite"
                      v-model="editedEmployee.website"
                    >
                    </v-text-field>
                  </v-layout>
                  <v-layout row>
                    <v-text-field
                      name="employeeEmail"
                      label="Employee Email"
                      id="employeeEmail"
                      v-model="editedEmployee.contactEmail"
                    >
                    </v-text-field>
                  </v-layout>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" @click="closeEmployeeDialog">Cancel</v-btn>
                <v-btn
                  color="blue darken-1"
                  :disabled="!formIsValid"
                  @click="saveEmployee"
                  >Save</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-data-table :headers="employeeTableHeaders" :items="employees" :search="search">
          <template v-slot:[`item.name`]="{ item }">
            <v-btn
              >x {{ item.name }}
              <v-menu
                ref="menu"
                activator="parent"
                :close-on-click="false"
                :close-on-content-click="false"
              >
                <!--
              <template v-slot:activator="{ props: menu }">
                <v-tooltip location="top">
                  <template v-slot:activator="{ props: tooltip }">
                    <v-btn
                      style="
                        opacity: 0.5;
                        color: green;
                        width: 100%;
                        background-color: transparent;
                        outline: none;
                      "
                      v-bind="mergeProps(menu, tooltip)"
                    >
                      {{ item.name }}
                    </v-btn>
                  </template>
                  <span>Update Time Sheet for {{ item.name }}</span>
                </v-tooltip>
              </template>
              <template  #activator="{ isActive, props }">
    <v-btn  v-bind="props">{{ item.name }} {{ isActive ? 'open' : 'closed' }}</v-btn>
  </template>-->
                <v-list>
                  <v-list-item>
                    <v-list-item-title>xxx {{ item.name }}</v-list-item-title>
                    <v-card>
                      <v-card-text style="min-width: 400px; max-width: 400px">
                        <v-select
                          label="Select Project"
                          :items="projects"
                          :item-props="itemProps"
                          v-model="editedEmployeeTimeSheet.projectId"
                        ></v-select
                        ><v-text-field
                          label="Hours"
                          v-model="editedEmployeeTimeSheet.hours"
                        ></v-text-field>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="grey darken-2" @click="cancel()" dark>CANCEL</v-btn>
                        <v-btn
                          color="primary"
                          @click="updateEmployeeTimesheet(editedEmployeeTimeSheet)"
                          >OK</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-list-item>
                  <v-list-item @click="navigate(item)">
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="showEmployeeEditDialog(item)">
                    <v-list-item-title>View {{ item.name }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-btn>
          </template>

          <template v-slot:[`item.actionEditEmployee`]="{ item }">
            <v-btn icon="mdi-file-edit-outline" @click="showEmployeeEditDialog(item)">
            </v-btn>
          </template>

          <template v-slot:[`item.actionShowEmployeeDetails`]="{ item }">
            <v-btn icon="mdi-view-compact" @click="showEmployeeDetails(item.id)"> </v-btn>
          </template>
        </v-data-table>
        <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
          {{ snackText }}
          <v-btn text @click="snack = false">Close</v-btn>
        </v-snackbar>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { computed, ref, reactive, onMounted, mergeProps } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const timesheet = ref(false);

    onMounted(() => {
      store.dispatch("employees/loadEmployees");
      store.dispatch("projects/loadProjects");
    });

    // required for project select dropdown..
    const itemProps = (item) => {
      return {
        title: item.name,
        subtitle: item.description,
      };
    };

    const overlay = ref(false);

    const updateEmployeeTimesheet = (item) => {
      console.log("Updating employee timesheet");
      console.log(item);
      showEmployeeEditDialog(item);
      //menu.value.activatorEl.close();
    };

    const tenders = [];
    const date = new Date().toISOString().substr(0, 10);
    const search = ref("");
    var snack = ref(false);
    var snackColor = ref("");
    var snackText = ref("");
    const id = ref("");
    const name = ref("");
    const address = ref("");
    const users = [];

    const employeeDialog = ref(false);

    const editedEmployeeIndex = ref(-1);

    const employeeTableHeaders = [
      { title: "ID", key: "id" },
      { title: "Name", key: "name" },
      { title: "Description", key: "description" },
      { title: "Contact Name", key: "contactName" },
      { title: "Email", key: "contactEmail" },
      { title: "Number", key: "headOfficeTelephoneNumber" },
      { title: "Edit", align: "left", key: "actionEditEmployee" },
      { title: "View", align: "left", key: "actionShowEmployeeDetails" },
    ];
    // employee
    const defaultEmployee = reactive({
      id: "",
      name: "",
      description: "",
      address: "",
      eamil: "",
      website: "",
      contactName: "",
      contactNumber: "",
      headOfficeTelephoneNumber: "",
      companyRegistrationNumber: "",
      vatRegistered: false,
      vatNumber: "",
      biq: "",
      ban: "",
      bankAccountNumber: "",
    });
    const editedEmployee = reactive({
      id: "",
      name: "",
      description: "",
      address: "",
      eamil: "",
      website: "",
      contactName: "",
      contactNumber: "",
      headOfficeTelephoneNumber: "",
      companyRegistrationNumber: "",
      vatRegistered: false,
      vatNumber: "",
      biq: "",
      ban: "",
      bankAccountNumber: "",
    });

    const editedEmployeeTimeSheet = reactive({
      id: "",
      name: "",
      projectId: "",
      hours: 0.0,
    });

    const navigate = (item) => {
      router.push("/employees/" + item.id);
    };
    const showEmployeeDetails = (item) => {
      console.log("Navigate to Employee Details for employeeId ");
      console.log(item);
      router.push("/employees/" + item);
    };
    const showEmployeeEditDialog = (item) => {
      console.log("Showing Edit Employee Dialog for employee " + item.name);
      console.log(item.name);
      editedEmployeeIndex.value = employees.value.findIndex((s) => s.id == item.value);
      const obj = employees.value.find((s) => s.id == item.value);
      Object.assign(editedEmployee, obj);
      console.log(
        "Showing Edit Employee Dialog for editedEmployee " + editedEmployee.name
      );
      console.log(editedEmployee.name);
      employeeDialog.value = true;
    };
    const closeEmployeeDialog = () => {
      employeeDialog.value = false;
      setTimeout(() => {
        editedEmployee.value = Object.assign({}, defaultEmployee);
        editedEmployeeIndex.value = -1;
      }, 300);
    };
    const formIsValid = () => {
      return true;
    };
    const saveEmployee = () => {
      if (editedEmployeeIndex.value > -1) {
        console.log("Updating employee");
        console.log(editedEmployee);
        store.dispatch("employees/updateEmployee", editedEmployee);
      } else {
        console.log("Creating new employee");
        console.log(editedEmployee);
        store.dispatch("employees/createEmployee", editedEmployee);
      }
      closeEmployeeDialog();
      save();
    };
    const deleteEmployee = (item) => {
      console.log("Delete Employee Event Received..");
      console.log(item);
      store.dispatch("employees/deleteEmployee", item);
    };
    const save = () => {
      snack = true;
      snackColor = "success";
      snackText = "Data saved successfully";
    };
    const cancel = () => {
      console.log("Cancel Timesheet Called");

      menu.value.activatorEl.click();
      console.log(menu.value.activatorEl);
      console.log(menu.value.activatorProps);

      //menu.value.animateClick();
      //menu.value.setData({ isActive: false })
      snack = true;
      snackColor = "success";
      snackText = "Data saved successfully";
    };
    const error = computed(() => store.getters["error"]);
    const userIsAuthenticatedAndHasRoleAdmin = computed(
      () => store.getters["users/userIsAuthenticatedAndHasRoleAdmin"]
    );
    const employees = computed(() => store.getters["employees/loadedEmployees"]);
    const projects = computed(() => store.getters["projects/loadedProjects"]);

    const menu = ref(false);

    return {
      menu,
      timesheet,
      cancel,
      mergeProps,
      navigate,
      projects,
      itemProps,
      overlay,
      editedEmployeeTimeSheet,
      updateEmployeeTimesheet,
      userIsAuthenticatedAndHasRoleAdmin,
      error,
      employees,
      employeeTableHeaders,
      tenders,
      date,
      search,
      snack,
      snackColor,
      snackText,
      id,
      name,
      address,
      users,
      defaultEmployee,
      editedEmployee,
      employeeDialog,
      editedEmployeeIndex,
      showEmployeeDetails,
      showEmployeeEditDialog,
      closeEmployeeDialog,
      formIsValid,
      saveEmployee,
      deleteEmployee,
      save,
    };
  },
};
</script>
