<template>
    <v-container fluid>
      <v-card>
        <v-card-title>
       Title: {{title}}
          <v-spacer></v-spacer>
          <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
          <v-spacer></v-spacer>
          <v-btn icon color="green">
            <v-icon icon="mdi-plus"></v-icon>
          <v-dialog v-model="dialog" activator="parent">
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
  
                  <v-layout row>
                   
                      <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                  
                  </v-layout>
  
                  <v-layout row>
                 
                      <v-text-field v-model="editedItem.description" label="Description"></v-text-field>
                 
                  </v-layout>
  
                </v-container>
              </v-card-text>
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" @click="updateDrawingCategory">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-btn>
        </v-card-title>

        <v-layout row v-if="error">
          <v-flex xs12 sm6 md10 offset-sm2>
            <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
          </v-flex>
        </v-layout>
  
  
        <v-data-table :headers="drawingCategoryTableHeaders" :items="drawingCategories" :search="search">
          <template v-slot:[`item.actionEdit`]="{ item }">
            <v-btn  icon="mdi-file-edit-outline" @click="editDrawingCategory(item)">
       
            </v-btn>
          </template>
          <template v-slot:[`item.actionDelete`]="{ item }">
            <v-btn  icon="mdi-delete-alert" @click="deleteDrawingCategory(item)">
          </v-btn>
          </template>
        </v-data-table>
  
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { computed, ref, reactive, defineProps,onMounted } from 'vue';
  import { useStore } from 'vuex';

  // eslint-disable-next-line 
  /* eslint-disable */
  const { title, color } = defineProps([
  "title",
  "color",
]);
      const store = useStore();
  
      onMounted(() => {
        store.dispatch('projects/loadProjectDrawingCategories')
      });
  
      const drawingCategoryTableHeaders = [
        {
          title: 'Name',
          align: 'left',
          sortable: true,
          key: 'name'
        },
        { title: 'Description', key: 'description' },
        { title: 'Edit', align: 'left', key: 'actionEdit' },
        { title: 'Delete', align: 'left', key: 'actionDelete' }
      ];
  
      const search = ref('');
      const dialog = ref(false);
      const editedIndex = ref(-1);
      const editedItem = reactive({
        id: '',
        name: '',
        description: '',
      });
      const defaultItem = reactive({
        id: '',
        name: '',
        description: '',
      })
      const drawingCategories = computed(() => store.getters['projects/loadedProjectDrawingCategories']);
      const formTitle = computed(() => editedIndex.value === -1 ? 'New Drawing Category' : 'Edit Drawing Category');
      //const loading = computed(() => store.getters['loading', { root: true }]);
     const error = computed(() => store.getters['error', { root: true }]);
      //const userIsAuthenticatedAndHasRoleAdmin = computed(() => store.getters['users/userIsAuthenticatedAndHasRoleAdmin']);
  
      const editDrawingCategory = ((item) => {
        editedIndex.value = drawingCategories.value.findIndex(dc => dc.id == item.value)
        const obj = drawingCategories.value.find(dc => dc.id == item.value)
        Object.assign(editedItem, obj)
        dialog.value = true
      });
  
      const updateDrawingCategory = (() => {
        if (editedIndex.value === -1) {
          console.log('Creating  drawing category')
          console.log(editedItem)
          store.dispatch('projects/createProjectDrawingCategory', editedItem)
        } else {
          console.log('Updating  drawing category')
          console.log(editedItem)
          store.dispatch('projects/updateProjectDrawingCategory', editedItem)
        }
        close()
      });
      const deleteDrawingCategory = ((item) => {
        console.log('Delete drawing category Event Received..')
        console.log(item.value)
        store.dispatch('projects/deleteProjectDrawingCategory', item.value)
      });
      const close = (() => {
        dialog.value = false;
        setTimeout(() => {
          Object.assign(editedItem, defaultItem)
          editedIndex.value = -1
        }, 300);
      });
   
      const onDismissed = (() => {
        store.dispatch('clearError', { root: true })
      });
   

  
  </script>
  