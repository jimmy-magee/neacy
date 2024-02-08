<template>
  <v-container fluid>
    <!--
  don't show errors at this point.
    <v-layout row v-if="error">
     
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      
    </v-layout>
    -->

    <v-card v-if="editedProjectDetails">
      <v-card-title>
        <h3 class="primary--text">{{ editedProjectDetails.name }}</h3>
      </v-card-title>
      <v-card-text>
        <h3 class="primary--text">Status: {{ editedProjectDetails.status }}</h3>
        <div>{{ editedProjectDetails.description }}</div>
        <div>{{ editedProjectDetails.address }}</div>

        <v-tabs v-model="outerTab" show-arrows>
          <v-tab value="one"> Project Details </v-tab>
          <v-tab value="two"> Design </v-tab>
          <v-tab value="three"> Build </v-tab>
          <v-tab value="four"> Finance </v-tab>
          <v-tab value="five"> Admin </v-tab>
        </v-tabs>

        <v-window v-model="outerTab">
          <v-window-item value="one">
            <v-tabs v-model="detailsTab" show-arrows>
              <v-tab value="detailsTab-1"> Details </v-tab>
              <v-tab value="detailsTab-2"> Contact List </v-tab>
            </v-tabs>

            <v-window v-model="detailsTab">
              <!-- Project Details -->

              <v-window-item value="detailsTab-1">
                <v-card>
                  <v-card-title>
                    Project Details
                    <v-spacer></v-spacer>
                  </v-card-title>
                  <v-card-text>
                    <form @submit.prevent="onUpdateProject">
                      <v-layout row>
                        <v-text-field
                          name="projectName"
                          label="Project Name"
                          id="projectName"
                          v-model="editedProjectDetails.name"
                          required
                        ></v-text-field>
                      </v-layout>
                      <v-layout row>
                        <v-text-field
                          name="siteId"
                          label="Site ID"
                          id="projectSiteId"
                          v-model="editedProjectDetails.siteId"
                        >
                        </v-text-field>
                      </v-layout>
                      <v-layout row>
                        <v-textarea
                          name="projectDescription"
                          label="Project Description"
                          id="projectDescription"
                          v-model="editedProjectDetails.description"
                          required
                        >
                        </v-textarea>
                      </v-layout>
                      <v-layout row>
                        <v-text-field
                          name="projectAddress"
                          label="Project Address"
                          id="projectAddress"
                          v-model="editedProjectDetails.address"
                          required
                        ></v-text-field>
                      </v-layout>
                      <v-layout row>
                        <v-select
                          v-model="editedProjectDetails.status"
                          :items="projectStatusList"
                          item-value="id"
                          item-text="name"
                          label="Project Status"
                        >
                        </v-select>
                      </v-layout>
                      <v-layout row>
                        <v-select
                          v-model="editedProjectDetails.customerId"
                          :items="customers"
                          item-value="id"
                          item-title="name"
                          label="Project Client"
                        >
                        </v-select>
                      </v-layout>
                      <v-layout row>
                        <v-text-field
                          name="projectClientQuantitySurveyor"
                          label="PQS"
                          id="projectClientQuantitySurveyor"
                          v-model="editedProjectDetails.clientQuantitySurveyor"
                        ></v-text-field>
                      </v-layout>
                      <v-layout row>
                        <v-text-field
                          name="projectArchitect"
                          label="Project Architect"
                          id="projectArchitect"
                          v-model="editedProjectDetails.architect"
                        ></v-text-field>
                      </v-layout>
                      <v-layout row>
                        <v-text-field
                          name="projectStructuralEngineer"
                          label="Project Structural Engineer"
                          id="projectStructuralEngineer"
                          v-model="editedProjectDetails.structuralEngineer"
                        >
                        </v-text-field>
                      </v-layout>
                      <v-layout row>
                        <v-text-field
                          name="status"
                          label="Project Mechanical & Electrical Engineer"
                          id="projectMechanicalAndElectricalEngineer"
                          v-model="editedProjectDetails.mechanicalAndElectricalEngineer"
                        ></v-text-field>
                      </v-layout>
                      <v-layout row>
                        <v-text-field
                          name="projectQuantitySurveyor"
                          label="Project Quantity Surveyor"
                          id="projectQuantitySurveyor"
                          v-model="editedProjectDetails.projectQuantitySurveyor"
                        >
                        </v-text-field>
                      </v-layout>
                      <v-layout row>
                        <v-text-field
                          name="projectManager"
                          label="Project Manager"
                          id="projectManager"
                          v-model="editedProjectDetails.projectManager"
                        ></v-text-field>
                      </v-layout>
                      <v-layout row>
                        <v-text-field
                          name="siteSafetyOfficer"
                          label="Site Safety Officer"
                          id="siteSafetyOfficerr"
                          v-model="editedProjectDetails.siteSafetyOfficer"
                        >
                        </v-text-field>
                      </v-layout>
                      <v-layout row>
                        <v-text-field
                          name="siteEngineer"
                          label="Site Engineer"
                          id="siteEngineer"
                          v-model="editedProjectDetails.siteEngineer"
                        ></v-text-field>
                      </v-layout>
                      <v-layout row>
                        <v-text-field
                          name="projectSupervisorDesignProcess"
                          label="Project H & S Supervisor Design Process"
                          id="projectSupervisorDesignProcess"
                          v-model="editedProjectDetails.projectSupervisorDesignProcess"
                        ></v-text-field>
                      </v-layout>
                      <v-layout row>
                        <v-text-field
                          name="projectSupervisorConstruction"
                          label="Project H & S Supervisor Construction"
                          id="projectSupervisorConstruction"
                          v-model="editedProjectDetails.projectSupervisorConstruction"
                        ></v-text-field>
                      </v-layout>

                      <v-layout row>
                        <v-btn class="primary" :disabled="!formIsValid" type="submit"
                          >Update Project</v-btn
                        >
                      </v-layout>
                    </form>
                  </v-card-text>
                </v-card>
              </v-window-item>
              <v-window-item value="detailsTab-2">
                <project-contacts-table :projectId="id"></project-contacts-table>
              </v-window-item>
            </v-window>
          </v-window-item>

          <v-window-item value="two">
            <v-tabs v-model="tab" show-arrows>
              <v-tab value="tab-1"> Drawings </v-tab>
              <v-tab value="tab-3"> Room Schedules </v-tab>
              <v-tab value="tab-2"> RFI Schedule </v-tab>
            </v-tabs>

            <v-window v-model="tab">
              <!-- Drawings -->
              <v-window-item value="tab-1">
                <project-drawings-table :projectId="id"></project-drawings-table>
              </v-window-item>
              <!--Schedules-->

              <v-window-item value="tab-2">
                <project-rfi-table :projectId="id"></project-rfi-table>
              </v-window-item>

              <v-window-item value="tab-3">
                <project-space-stats-table :projectId="id"></project-space-stats-table>
              </v-window-item>
            </v-window>
          </v-window-item>

          <v-window-item value="three">
            <v-tabs v-model="buildTab" show-arrows>
              <v-tab value="buildTab-1"> Project Plan </v-tab>
              <v-tab value="buildTab-2"> Gallery </v-tab>
              <v-tab value="buildTab-3"> Health and Safety </v-tab>
            </v-tabs>

            <v-window v-model="buildTab">
              <!-- Project Details -->

              <v-window-item value="buildTab-1">
                <project-tasks-table :projectId="id"></project-tasks-table>
              </v-window-item>

              <v-window-item value="buildTab-2">
                <project-image-table :projectId="id"></project-image-table>
              </v-window-item>

              <v-window-item value="buildTab-3">
                <v-card>
                  <v-card-title> Health & Safety </v-card-title>
                  <v-tabs fixed-tabs>
                    <v-tab> Site Inductions </v-tab>
                    <v-tab> Risk Assessments </v-tab>
                    <v-tab> Health & Safety Plan Design </v-tab>
                    <v-tab> Health & Safety Plan Construction </v-tab>
                    <v-tab> HSA AF1 & AF2 </v-tab>
                  </v-tabs>
                </v-card>
              </v-window-item>
            </v-window>
          </v-window-item>

          <v-window-item value="four">
            <v-tabs v-model="financeTab" show-arrows>
              <v-tab value="financeTab-6"> BoQ Summary </v-tab>
              <v-tab value="financeTab-10"> Room Schedule BoQ </v-tab>
              <v-tab value="financeTab-1"> Project BoQ </v-tab>
              <v-tab value="financeTab-11"> Quotations </v-tab>
              <v-tab value="financeTab-2"> Procurement Schedule </v-tab>
              <v-tab value="financeTab-31"> Products </v-tab>
              <v-tab value="financeTab-3"> Product Orders </v-tab>
              <v-tab value="financeTab-4"> Valuations </v-tab>
              <v-tab value="financeTab-5"> Payment Certs </v-tab>
              <v-tab value="financeTab-7"> Customer Invoices </v-tab>
              <v-tab value="financeTab-8"> SubContractor Invoices </v-tab>
              <v-tab value="financeTab-9"> Supplier Invoices </v-tab>
            </v-tabs>

            <v-window v-model="financeTab">
              <v-window-item value="financeTab-1">
                <project-boq-table :projectId="id"></project-boq-table>
              </v-window-item>

              <v-window-item value="financeTab-2">
                <project-procurement-table :projectId="id"></project-procurement-table>
              </v-window-item>

              <v-window-item value="financeTab-6">
                <project-boq-summary-table :projectId="id"></project-boq-summary-table>
              </v-window-item>

              <v-window-item value="financeTab-10">
                <project-space-boq-treeview :projectId="id"></project-space-boq-treeview>
              </v-window-item>

              <v-window-item value="financeTab-11">
                <project-quotation-table :projectId="id"></project-quotation-table>
              </v-window-item>

              <v-window-item value="financeTab-31">
                <project-boq-products-table :projectId="id"></project-boq-products-table>
              </v-window-item>

              <v-window-item value="financeTab-3">
                <project-orders-table :projectId="id"></project-orders-table>
              </v-window-item>

              <v-window-item value="financeTab-4">
                <project-valuations-table :project="id"></project-valuations-table>
              </v-window-item>

              <v-window-item value="financeTab-7">
                <project-customer-invoice-table :projectId="id"></project-customer-invoice-table>
              </v-window-item>

              <v-window-item value="financeTab-8">
                <project-subcontractor-invoice-table
                  :projectId="id"
                ></project-subcontractor-invoice-table>
              </v-window-item>

              <v-window-item value="financeTab-9">
                <project-supplier-invoice-table
                  :projectId="id"
                ></project-supplier-invoice-table>
              </v-window-item>
            </v-window>
          </v-window-item>

          <v-window-item value="five">
            <v-tabs v-model="adminTab" show-arrows>
              <v-tab href="adminTab-1"> Project Access Control List </v-tab>
              <v-tab href="adminTab-2"> Design Distribution List </v-tab>
              <v-tab href="adminTab-3"> Construction Distribution List </v-tab>
              <v-tab href="adminTab-4"> Financial Distribution List </v-tab>
              <v-tab href="adminTab-5"> </v-tab>
            </v-tabs>

            <v-window v-model="adminTab" v-if="userIsAuthenticatedAndHasRoleProjectAdmin">
              <v-window-item value="adminTab-1">
                <project-acl-table :projectId="id"></project-acl-table>
              </v-window-item>

              <v-window-item value="adminTab-2">
                <project-contacts-table :projectId="id"></project-contacts-table>
              </v-window-item>

              <v-window-item value="adminTab-3"> </v-window-item>
            </v-window>
          </v-window-item>
        </v-window>
      </v-card-text>
      <v-snackbar v-model="snack" :timeout="4000" :color="snackColor" shaped>
        {{ snackText }}

        <template v-slot:[`action`]="{ attrs }">
          <v-btn text v-bind="attrs" @click="snack.value = false"> X </v-btn>
        </template>
      </v-snackbar>
    </v-card>
  </v-container>
</template>

<script setup>
import { computed, ref, reactive, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";


    const store = useStore();
    const route = useRoute();

    const id = route.params.id;
    console.log("Looking up project by id " + id);

    onMounted(() => {
      store.dispatch("projects/loadProject", id);
      console.log("Loading project " + id);
      store.dispatch("projects/loadProjectStatusList");
    });

    const snack = ref(false);
    const snackColor = ref("");
    const snackText = ref("");
    const outerTab = ref(null);
    const detailsTab = ref(null);
    const buildTab = ref(null);
    const financeTab = ref(null);
    const adminTab = ref(null);
    const tab = ref(null);

    //const editedProjectDetailsIndex = ref(-1);
    const editedProjectDetails = reactive({
      id: "",
      siteId: "",
      projectName: "",
      projectDescription: "",
      projectAddress: "",
      status: "",
      customrerId: "",
      projectFunder: "",
      projectClientQuantitySurveyor: "",
      projectArchitect: "",
      projectStructuralEngineer: "",
      projectMechanicalAndElectricalEngineer: "",
      projectQuantitySurveyor: "",
      projectManager: "",
      siteEngineer: "",
      siteSafetyOfficer: "",
      projectSupervisorDesignProcess: "",
      projectSupervisorConstruction: "",
    });
    /*
    const defaultProjectDetails = reactive({
      projectName: "",
      siteId: "",
      projectDescription: "",
      projectAddress: "",
      status: "",
      projectFunder: "",
      projectClientQuantitySurveyor: "",
      projectArchitect: "",
      projectStructuralEngineer: "",
      projectMechanicalAndElectricalEngineer: "",
      projectQuantitySurveyor: "",
      projectManager: "",
      projectSupervisorDesignProcess: "",
      projectSupervisorConstruction: "",
    });
*/
    //const projects = computed(() => store.getters["projects/loadedProjects"]);
    const project = computed(() => store.getters["projects/loadedProject"]);
    //const error = computed(() => store.getters[("error", { root: true })]);
    /*
    const userIsAuthenticatedAndHasRoleAdmin = computed(
      () => store.getters["users/userIsAuthenticatedAndHasRoleAdmin"]
    );
    const userIsAuthenticated = computed(() => {
      return store.getters["users/userIsAuthenticated"];
    });
    const userIsAuthenticatedAndHasRoleUser = computed(() => {
      return store.getters["users/userIsAuthenticatedAndHasRoleUser"];
    });
    const userIsAuthenticatedAndHasRoleProjectAdmin = computed(() => {
      return store.getters["users/userIsAuthenticatedAndHasRoleProjectAdmin"];
    });
    const userIsProjectQuantitySurveyor = computed(() => {
      return store.getters["users/userIsAuthenticatedAndHasRoleProjectQuantitySurveyor"];
    });
    const userIsAuthenticatedAndHasRoleProjectConsultant = computed(() => {
      return store.getters["users/userIsAuthenticatedAndHasRoleProjectConsultant"];
    });
  */

    const projectStatusList = computed(() => {
      return store.getters["projects/loadedProjectStatusList"];
    });

    const customers = computed(() => {
      return store.getters["customers/loadedCustomers"];
    });
/*
    const loading = computed(() => {
      return store.getters[("loading", { root: true })];
    });
*/
    /*
    const groupBy: function evenOddGrouper(items, groupBy) {
      const key = groupBy[0]
      return items.reduce((rv, x) => {
        const group = x[key] % 2 ? 'odd' : 'even';
        (rv[group] = rv[group] || []).push(x)
        return rv
      }, {})
    },*/

    const onUpdateProject = () => {
      console.log("Updating project details with form");
      console.log(editedProjectDetails);
      store
        .dispatch("projects/updateProject", editedProjectDetails)
        .then((response) => {
          console.log("Project data updated successfully" + response);
          snack.value = true;
          snackColor.value = "success";
          snackText.value = "Project updated successfully!";
        })
        .catch((error) => {
          console.log(error);
          snack.value = true;
          snackColor.value = "error";
          snackText.value = "Error Updating Project, please try again!";
        });
    };
/*
    const cancel = () => {
      snack.value = true;
      snackColor.value = "error";
      snackText.value = "Canceled";
    };
    const open = () => {
      snack.value = true;
      snackColor.value = "info";
      snackText.value = "Dialog opened";
      console.log("Dialog opened");
    };
    const onDismissed = () => {
      store.dispatch("clearError", { root: true });
    };
*/
    watch(project, (newValue, oldValue) => {
      console.log(
        "computedProperty [ project ]  was " +
          oldValue +
          ". Now it is " +
          JSON.stringify(newValue) +
          "."
      );
      Object.assign(editedProjectDetails, newValue);
    });
    const formIsValid = () => {
      return true;
    };

</script>
