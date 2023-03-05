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


    <form @submit.prevent="onCreateProject">
      <v-layout wrap>

        <v-select v-model="project.customerId" :items="customers" item-value="id" item-title="name" label="Select Customer">
        </v-select>

      </v-layout>
      <v-layout row>

        <v-text-field name="name" label="Project Name" id="name" v-model="project.name" required></v-text-field>

      </v-layout>
      <v-layout row>

        <v-textarea name="description" label="Project Description" id="description" v-model="project.description"
          required></v-textarea>

      </v-layout>
      <v-layout row>

        <v-text-field name="address" label="Project Address" id="address" v-model="project.address" required></v-text-field>

      </v-layout>
      <v-layout row>

        <v-text-field name="status" label="Project Status" id="status" v-model="project.status"></v-text-field>

      </v-layout>
      <v-layout row>

        <v-text-field name="client" label="Project Funder/Client" id="client" v-model="project.projectFunder"></v-text-field>

      </v-layout>
      <v-layout row>

        <v-text-field name="projectClientQuantitySurveyor" label="PQS" id="projectClientQuantitySurveyor"
          v-model="project.projectClientQuantitySurveyor"></v-text-field>

      </v-layout>
      <v-layout row>

        <v-text-field name="projectArchitect" label="Project Architect" id="projectArchitect"
          v-model="project.projectArchitect"></v-text-field>

      </v-layout>
      <v-layout row>

        <v-text-field name="projectStructuralEngineer" label="Project Structural Engineer" id="projectStructuralEngineer"
          v-model="project.projectStructuralEngineer"></v-text-field>

      </v-layout>
      <v-layout row>

        <v-text-field name="status" label="Project Mechanical & Electrical Engineer"
          id="projectMechanicalAndElectricalEngineer" v-model="project.projectMechanicalAndElectricalEngineer"></v-text-field>

      </v-layout>
      <v-layout row>

        <v-text-field name="projectQuantitySurveyor" label="Project Quantity Surveyor" id="projectQuantitySurveyor"
          v-model="project.projectQuantitySurveyor"></v-text-field>

      </v-layout>
      <v-layout row>

        <v-text-field name="projectManager" label="Project Manager" id="projectManager"
          v-model="project.projectManager"></v-text-field>

      </v-layout>
      <v-layout row>

        <v-text-field name="projectSupervisorDesignProcess" label="Project H & S Supervisor Design Process"
          id="projectSupervisorDesignProcess" v-model="project.projectSupervisorDesignProcess"></v-text-field>

      </v-layout>
      <v-layout row>

        <v-text-field name="projectSupervisorConstruction" label="Project H & S Supervisor Construction"
          id="projectSupervisorConstruction" v-model="project.projectSupervisorConstruction"></v-text-field>

      </v-layout>

      <v-layout row>
        <v-btn class="primary" :disabled="!formIsValid" type="submit">Create Project</v-btn>
      </v-layout>
    </form>


  </v-container>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {

  setup() {
    const store = useStore();
    const router = useRouter();

    onMounted(() => {
      store.dispatch('customers/loadCustomers');
    });

    const project = reactive({
      id: '',
      name: '',
      description: '',
      address: '',
      customerId: '',
      clientId: '',
      status: '',
      projectFunder: '',
      projectClientQuantitySurveyor: '',
      projectArchitect: '',
      projectStructuralEngineer: '',
      projectMechanicalAndElectricalEngineer: '',
      projectQuantitySurveyor: '',
      cprojectManager: '',
      projectSupervisorDesignProcess: '',
      projectSupervisorConstruction: '',
    });

    const customers = computed(() => store.getters['customers/loadedCustomers']);

    const error = computed(() => store.getters['error', { root: true }]);

    const loading = computed(() => store.getters('loading', { root: true }));

    const formIsValid = (() => {
      return project.customerId !== '' && project.name !== '' && project.address !== ''
    });

    const onCreateProject = (() => {
  
      if (!formIsValid) {
        return
      }
      console.log('Creating project')
      console.log(project)

      store.dispatch('projects/createProject', project)
        .then(router.push('/projects'))
    });

    const onDismissed = () => (
      store.dispatch('clearError', { root: true })
    );

    return {
      project,
      customers,
      error,
      loading,
      onCreateProject,
      formIsValid,
      onDismissed,
    }
  }
}
</script>
