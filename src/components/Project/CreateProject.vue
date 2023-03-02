<template>
  <v-container>

    <v-layout row v-if="error">
      <v-sheet xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error"></app-alert>
      </v-sheet>
    </v-layout>

    <v-layout row>
      <v-sheet xs12 sm6 offset-sm3>
        <h4>Create a new Project</h4>
      </v-sheet>
    </v-layout>
    <v-layout row>
      <v-sheet xs12>
        <form @submit.prevent="onCreateProject">
          <v-layout wrap>
            <v-sheet xs12 sm6 offset-sm3>
              <v-select v-model="customerId" :items="customers" item-value="id" item-text="name"
                label="Select Customer">
              </v-select>
            </v-sheet>
          </v-layout>
          <v-layout row>
            <v-sheet xs12 sm6 offset-sm3>
              <v-text-field name="name" label="Project Name" id="name" v-model="name"
                required></v-text-field>
            </v-sheet>
          </v-layout>
          <v-layout row>
            <v-sheet xs12 sm6 offset-sm3>
              <v-textarea name="description" label="Project Description" id="description"
                v-model="description" required></v-textarea>
            </v-sheet>
          </v-layout>
          <v-layout row>
            <v-sheet xs12 sm6 offset-sm3>
              <v-text-field name="address" label="Project Address" id="address" v-model="address"
                required></v-text-field>
            </v-sheet>
          </v-layout>
          <v-layout row>
            <v-sheet xs12 sm6 offset-sm3>
              <v-text-field name="status" label="Project Status" id="status"
                v-model="status"></v-text-field>
            </v-sheet>
          </v-layout>
          <v-layout row>
            <v-sheet xs12 sm6 offset-sm3>
              <v-text-field name="client" label="Project Funder/Client" id="client"
                v-model="projectFunder"></v-text-field>
            </v-sheet>
          </v-layout>
          <v-layout row>
            <v-sheet xs12 sm6 offset-sm3>
              <v-text-field name="projectClientQuantitySurveyor" label="PQS" id="projectClientQuantitySurveyor"
                v-model="projectClientQuantitySurveyor"></v-text-field>
            </v-sheet>
          </v-layout>
          <v-layout row>
            <v-sheet xs12 sm6 offset-sm3>
              <v-text-field name="projectArchitect" label="Project Architect" id="projectArchitect"
                v-model="projectArchitect"></v-text-field>
            </v-sheet>
          </v-layout>
          <v-layout row>
            <v-sheet xs12 sm6 offset-sm3>
              <v-text-field name="projectStructuralEngineer" label="Project Structural Engineer"
                id="projectStructuralEngineer" v-model="projectStructuralEngineer"></v-text-field>
            </v-sheet>
          </v-layout>
          <v-layout row>
            <v-sheet xs12 sm6 offset-sm3>
              <v-text-field name="status" label="Project Mechanical & Electrical Engineer"
                id="projectMechanicalAndElectricalEngineer"
                v-model="projectMechanicalAndElectricalEngineer"></v-text-field>
            </v-sheet>
          </v-layout>
          <v-layout row>
            <v-sheet xs12 sm6 offset-sm3>
              <v-text-field name="projectQuantitySurveyor" label="Project Quantity Surveyor" id="projectQuantitySurveyor"
                v-model="projectQuantitySurveyor"></v-text-field>
            </v-sheet>
          </v-layout>
          <v-layout row>
            <v-sheet xs12 sm6 offset-sm3>
              <v-text-field name="projectManager" label="Project Manager" id="projectManager"
                v-model="projectManager"></v-text-field>
            </v-sheet>
          </v-layout>
          <v-layout row>
            <v-sheet xs12 sm6 offset-sm3>
              <v-text-field name="projectSupervisorDesignProcess" label="Project H & S Supervisor Design Process"
                id="projectSupervisorDesignProcess"
                v-model="projectSupervisorDesignProcess"></v-text-field>
            </v-sheet>
          </v-layout>
          <v-layout row>
            <v-sheet xs12 sm6 offset-sm3>
              <v-text-field name="projectSupervisorConstruction" label="Project H & S Supervisor Construction"
                id="projectSupervisorConstruction"
                v-model="projectSupervisorConstruction"></v-text-field>
            </v-sheet>
          </v-layout>

          <v-layout row>
            <v-sheet xs12 sm6 offset-sm3>
              <v-btn class="primary" :disabled="!formIsValid" type="submit">Create Project</v-btn>
            </v-sheet>
          </v-layout>
        </form>
      </v-sheet>
    </v-layout>
  </v-container>
</template>

<script>
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {

  setup() {
    const store = useStore();
    const router = useRouter();

    onMounted(() => {
      store.dispatch('customers/loadCustomers');
    });

    const id = ref('');
    const name = ref('');
    const description = ref('');
    const address = ref('');
    const customerId = ref('');
    const clientId = ref('');
    const status = ref('');
    const projectFunder = ref('');
    const projectClientQuantitySurveyor = ref('');
    const projectArchitect = ref('');
    const projectStructuralEngineer = ref('');
    const projectMechanicalAndElectricalEngineer = ref('');
    const projectQuantitySurveyor = ref('');
    const projectManager = ref('');
    const projectSupervisorDesignProcess = ref('');
    const projectSupervisorConstruction = ref('');



    const customers = computed(() => store.getters['customers/loadedCustomers']);

    const error = computed(() => store.getters['error', { root: true }]);

    const loading = computed(() => store.getters('loading', { root: true }));

    const formIsValid = (() => {
      return name.value !== '' && address.value !== ''
    });

    const onCreateProject = (() => {
      var editedProjectDetails = {
        name: name.value,
        address: address.value,
        description: description.value,
      }
      if (!formIsValid) {
        return
      }
      
      store.dispatch('projects/createProject', editedProjectDetails)
        .then(router.push('/projects'))
    });

    const onDismissed = () => (
      store.dispatch('clearError', { root: true })
    );

    return {
      customers,
      error,
      loading,
      onCreateProject,
      formIsValid,
      onDismissed,
      id,
      name,
      address,
      description,
      customerId,
      clientId,
      status,
      projectFunder,
      projectClientQuantitySurveyor,
      projectArchitect,
      projectStructuralEngineer,
      projectMechanicalAndElectricalEngineer,
      projectQuantitySurveyor,
      projectManager,
      projectSupervisorDesignProcess,
      projectSupervisorConstruction
    }
  }
}
</script>
