<template>
  <v-container>
    <!--
    <v-layout row v-if="error">
      <v-sheet xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error"></app-alert>
      </v-sheet>
    </v-layout>
    -->
    <v-layout row wrap>
      <v-sheet xs12 sm12 md12>
        <v-card>
          <v-card-text>
          <v-btn v-if="userIsAuthenticatedAndHasRoleAdmin" absolute dark fab top right color="green" :to="'/projects/new'">
            <v-icon>add</v-icon>
          </v-btn>
          </v-card-text>
        </v-card>
      </v-sheet>
    </v-layout>


    <v-layout row wrap v-for="project in projects" :key="project.id" class="mb-2">
      <v-sheet xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="info">
          <v-container fluid>
            <v-layout row>
              <!--
              <v-sheet xs5 sm4 md3>
              <v-img
                :src="project.images[0]"
                :lazy-src="project.images[0]"
                aspect-ratio="1"
                class="grey lighten-2"
              >
              </v-img>
              </v-sheet>
              -->
              <v-sheet xs12 sm12 md10>
                <v-card-text>

                  <div class="title">{{ project.name }}</div>

                  <div class="title">{{ project.address }}</div>

                  <div class="title">{{ project.description }}</div>

                  <div class="title">Status: {{ project.status }}</div>

                </v-card-text>
                <v-card-actions>
                  <v-btn text :to="'/projects/' + project.id">
                    <v-icon left light>arrow_forward</v-icon>
                    View Project Details
                  </v-btn>
                </v-card-actions>
              </v-sheet>
            </v-layout>
          </v-container>
        </v-card>
      </v-sheet>
    </v-layout>
  </v-container>
</template>

<script>

import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
export default {

  setup() {
    const store = useStore();
    const projects = computed(() => store.getters['projects/loadedProjects']);
    const error = computed(() => store.getters['error', { root: true }]);
    const userIsAuthenticatedAndHasRoleAdmin = computed(() => store.getters['users/userIsAuthenticatedAndHasRoleAdmin']);


    onMounted(() => {
      store.dispatch('projects/loadProjects')
    });

    const onDismissed = () => (
      store.dispatch('clearError', {root: true})
    );

    return {
      projects,
      userIsAuthenticatedAndHasRoleAdmin,
      onDismissed,
      error
    }
  }

}
</script>
